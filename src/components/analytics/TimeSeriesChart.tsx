import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

interface TimeSeriesChartProps {
  data: { date: string; pageviews: number; visitors: number }[];
}

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  if (!data.length) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 40,
          textAlign: "center",
          color: "#9ca3af",
        }}
      >
        No data for this period
      </div>
    );
  }

  const isHourly = data[0]?.date.includes("T");

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "20px 20px 12px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradPageviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="#e5e7eb"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(v: string) => {
              try {
                return isHourly
                  ? format(parseISO(v), "HH:mm")
                  : format(parseISO(v), "MMM d");
              } catch {
                return v;
              }
            }}
          />
          <YAxis stroke="#e5e7eb" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              color: "#111",
              fontSize: 13,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            labelFormatter={(v) => {
              try {
                const s = String(v);
                return isHourly
                  ? format(parseISO(s), "MMM d, HH:mm")
                  : format(parseISO(s), "MMM d, yyyy");
              } catch {
                return String(v);
              }
            }}
          />
          <Area
            type="monotone"
            dataKey="pageviews"
            stroke="#3b82f6"
            fill="url(#gradPageviews)"
            strokeWidth={2}
            name="Pageviews"
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#8b5cf6"
            fill="url(#gradVisitors)"
            strokeWidth={2}
            name="Visitors"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
