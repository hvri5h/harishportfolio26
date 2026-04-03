export interface AnalyticsData {
  totalPageviews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSession: number;
  liveVisitors: number;
  timeSeries: { date: string; pageviews: number; visitors: number }[];
  sources: { name: string; count: number }[];
  pages: { path: string; count: number }[];
  geography: { country: string; count: number }[];
  devices: {
    types: { name: string; count: number }[];
    browsers: { name: string; count: number }[];
    os: { name: string; count: number }[];
  };
  utm: {
    sources: { name: string; count: number }[];
    mediums: { name: string; count: number }[];
    campaigns: { name: string; count: number }[];
  };
}

export async function login(password: string): Promise<string> {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error("Invalid password");
  const { token } = await res.json();
  return token;
}

export async function fetchAnalytics(
  token: string,
  params: { domain?: string; start: string; end: string }
): Promise<AnalyticsData> {
  const query = new URLSearchParams();
  if (params.domain) query.set("domain", params.domain);
  query.set("start", params.start);
  query.set("end", params.end);

  const res = await fetch(`/api/analytics?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Failed to fetch analytics");
  return res.json();
}

export function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
