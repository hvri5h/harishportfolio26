import { useState, useEffect, useCallback } from "react";
import { AuthGate, useAuth } from "../components/analytics/AuthGate";
import { StatsCard } from "../components/analytics/StatsCard";
import { TimeSeriesChart } from "../components/analytics/TimeSeriesChart";
import { SourcesPanel } from "../components/analytics/SourcesPanel";
import { PagesPanel } from "../components/analytics/PagesPanel";
import { GeoPanel } from "../components/analytics/GeoPanel";
import { DevicesPanel } from "../components/analytics/DevicesPanel";
import { TrackingPanel } from "../components/analytics/TrackingPanel";
import {
  DateRangePicker,
  getDefaultRange,
  type DateRange,
} from "../components/analytics/DateRangePicker";
import { DomainFilter } from "../components/analytics/DomainFilter";
import { fetchAnalytics, type AnalyticsData } from "../lib/analyticsApi";

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

function Dashboard({ token }: { token: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<DateRange>(getDefaultRange());
  const [domain, setDomain] = useState("");
  const [liveCount, setLiveCount] = useState(0);

  const loadData = useCallback(async () => {
    try {
      const result = await fetchAnalytics(token, {
        domain: domain || undefined,
        start: range.start,
        end: range.end,
      });
      setData(result);
      setLiveCount(result.liveVisitors);
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoading(false);
    }
  }, [token, domain, range]);

  useEffect(() => {
    setLoading(true);
    loadData();
  }, [loadData]);

  // Auto-refresh live visitors every 60s
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const result = await fetchAnalytics(token, {
          domain: domain || undefined,
          start: range.start,
          end: range.end,
        });
        setLiveCount(result.liveVisitors);
      } catch {
        // silent
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [token, domain, range]);

  return (
    <div
      data-standard-cursor
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        color: "#111",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: "24px",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Analytics</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <DomainFilter selected={domain} onChange={setDomain} />
          <DateRangePicker selected={range.label} onChange={setRange} />
        </div>
      </div>

      {loading && !data ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400,
            color: "#888",
          }}
        >
          Loading...
        </div>
      ) : data ? (
        <>
          {/* Stats Row */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            <StatsCard label="Live Visitors" value={liveCount} live />
            <StatsCard label="Unique Visitors" value={data.uniqueVisitors.toLocaleString()} />
            <StatsCard
              label="Total Pageviews"
              value={data.totalPageviews.toLocaleString()}
            />
            <StatsCard label="Bounce Rate" value={`${data.bounceRate}%`} />
            <StatsCard
              label="Avg Session"
              value={formatDuration(data.avgSession)}
            />
          </div>

          {/* Time Series Chart */}
          <div style={{ marginBottom: 24 }}>
            <TimeSeriesChart data={data.timeSeries} />
          </div>

          {/* Bottom Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            <SourcesPanel sources={data.sources} />
            <PagesPanel pages={data.pages} />
            <GeoPanel geography={data.geography} />
            <DevicesPanel devices={data.devices} />
            <TrackingPanel utm={data.utm} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function Analytics() {
  const { token, loading, authenticate } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <AuthGate token={token} authenticate={authenticate}>
      {token && <Dashboard token={token} />}
    </AuthGate>
  );
}
