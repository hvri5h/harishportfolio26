import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { UAParser } from "ua-parser-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Reject known bots and headless browsers
    const userAgent = req.headers["user-agent"] || "";
    const botPatterns = /bot|crawl|spider|headless|lighthouse|pagespeed|pingdom|uptimerobot|vercel|preview/i;
    if (botPatterns.test(userAgent)) {
      return res.status(204).end();
    }

    // Only accept visits from production domains
    const allowedDomains = ["hari.sh", "www.hari.sh", "htiruna.com", "www.htiruna.com"];
    if (body.domain && !allowedDomains.includes(body.domain)) {
      return res.status(204).end();
    }

    const ua = UAParser(userAgent);
    const browser = ua.browser.name || "Unknown";
    const os = ua.os.name || "Unknown";
    const deviceType = ua.device.type || "desktop";

    const country = (req.headers["x-vercel-ip-country"] as string) || null;
    const city = (req.headers["x-vercel-ip-city"] as string) || null;
    const region = (req.headers["x-vercel-ip-country-region"] as string) || null;

    await supabase.from("visits").insert({
      session_id: body.session_id,
      domain: body.domain,
      path: body.path || "/",
      referrer: body.referrer || null,
      ref_param: body.ref_param || null,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      browser,
      os,
      device_type: deviceType,
      country,
      city,
      region,
      is_bounce: body.is_bounce !== undefined ? body.is_bounce : true,
      session_duration: body.session_duration || 0,
    });

    return res.status(204).end();
  } catch {
    return res.status(204).end();
  }
}
