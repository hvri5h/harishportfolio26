import type { VercelRequest, VercelResponse } from "@vercel/node";
import { jwtVerify } from "jose";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyToken(req: VercelRequest): Promise<boolean> {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret");
    await jwtVerify(auth.slice(7), secret);
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(204).end();
  }

  if (req.method !== "GET") return res.status(405).end();
  if (!(await verifyToken(req))) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { domain, start, end } = req.query as Record<string, string>;
    const startDate = start || new Date(Date.now() - 7 * 86400000).toISOString();
    const endDate = end || new Date().toISOString();

    let query = supabase.from("visits").select("*").gte("created_at", startDate).lte("created_at", endDate);
    if (domain) query = query.eq("domain", domain);
    const { data: visits, error } = await query.order("created_at", { ascending: true });

    if (error) throw error;
    const rows = visits || [];

    // Aggregate stats
    const totalPageviews = rows.length;
    const uniqueSessions = new Set(rows.map((r) => r.session_id));
    const uniqueVisitors = uniqueSessions.size;
    const bounces = rows.filter((r) => r.is_bounce).length;
    const bounceRate = totalPageviews > 0 ? Math.round((bounces / totalPageviews) * 100) : 0;

    const sessionDurations: Record<string, number> = {};
    for (const r of rows) {
      if (r.session_duration > 0) {
        sessionDurations[r.session_id] = Math.max(sessionDurations[r.session_id] || 0, r.session_duration);
      }
    }
    const durValues = Object.values(sessionDurations);
    const avgSession = durValues.length > 0 ? Math.round(durValues.reduce((a, b) => a + b, 0) / durValues.length) : 0;

    // Time series — group by day (or hour if range <= 2 days)
    const rangeMs = new Date(endDate).getTime() - new Date(startDate).getTime();
    const useHourly = rangeMs <= 2 * 86400000;
    const timeMap: Record<string, { pageviews: number; sessions: Set<string> }> = {};
    for (const r of rows) {
      const d = new Date(r.created_at);
      const key = useHourly
        ? `${d.toISOString().slice(0, 13)}:00`
        : d.toISOString().slice(0, 10);
      if (!timeMap[key]) timeMap[key] = { pageviews: 0, sessions: new Set() };
      timeMap[key].pageviews++;
      timeMap[key].sessions.add(r.session_id);
    }
    const timeSeries = Object.entries(timeMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, v]) => ({ date, pageviews: v.pageviews, visitors: v.sessions.size }));

    // Top sources
    const sourceMap: Record<string, number> = {};
    for (const r of rows) {
      const src = r.ref_param || r.referrer || "Direct";
      sourceMap[src] = (sourceMap[src] || 0) + 1;
    }
    const sources = Object.entries(sourceMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));

    // Top pages
    const pageMap: Record<string, number> = {};
    for (const r of rows) {
      pageMap[r.path] = (pageMap[r.path] || 0) + 1;
    }
    const pages = Object.entries(pageMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    // Geography
    const geoMap: Record<string, number> = {};
    for (const r of rows) {
      const country = r.country || "Unknown";
      geoMap[country] = (geoMap[country] || 0) + 1;
    }
    const geography = Object.entries(geoMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, count]) => ({ country, count }));

    // Devices
    const deviceMap: Record<string, number> = {};
    const browserMap: Record<string, number> = {};
    const osMap: Record<string, number> = {};
    for (const r of rows) {
      const dt = r.device_type || "desktop";
      deviceMap[dt] = (deviceMap[dt] || 0) + 1;
      if (r.browser) browserMap[r.browser] = (browserMap[r.browser] || 0) + 1;
      if (r.os) osMap[r.os] = (osMap[r.os] || 0) + 1;
    }
    const devices = {
      types: Object.entries(deviceMap).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
      browsers: Object.entries(browserMap).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count })),
      os: Object.entries(osMap).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count })),
    };

    // UTM tracking
    const utmSourceMap: Record<string, number> = {};
    const utmMediumMap: Record<string, number> = {};
    const utmCampaignMap: Record<string, number> = {};
    for (const r of rows) {
      if (r.utm_source) utmSourceMap[r.utm_source] = (utmSourceMap[r.utm_source] || 0) + 1;
      if (r.utm_medium) utmMediumMap[r.utm_medium] = (utmMediumMap[r.utm_medium] || 0) + 1;
      if (r.utm_campaign) utmCampaignMap[r.utm_campaign] = (utmCampaignMap[r.utm_campaign] || 0) + 1;
    }
    const utm = {
      sources: Object.entries(utmSourceMap).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
      mediums: Object.entries(utmMediumMap).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
      campaigns: Object.entries(utmCampaignMap).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
    };

    // Live visitors (sessions in last 5 min)
    const fiveMinAgo = new Date(Date.now() - 5 * 60000).toISOString();
    let liveQuery = supabase.from("visits").select("session_id").gte("created_at", fiveMinAgo);
    if (domain) liveQuery = liveQuery.eq("domain", domain);
    const { data: liveRows } = await liveQuery;
    const liveVisitors = new Set((liveRows || []).map((r) => r.session_id)).size;

    return res.status(200).json({
      totalPageviews,
      uniqueVisitors,
      bounceRate,
      avgSession,
      liveVisitors,
      timeSeries,
      sources,
      pages,
      geography,
      devices,
      utm,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
