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
          background: "#141414",
          border: "1px solid #1e1e1e",
          borderRadius: 12,
          padding: 40,
          textAlign: "center",
          color: "#888",
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
        background: "#141414",
        border: "1px solid #1e1e1e",
        borderRadius: 12,
        padding: "20px 20px 12px",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradPageviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="#333"
            tick={{ fill: "#888", fontSize: 12 }}
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
          <YAxis stroke="#333" tick={{ fill: "#888", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#fff",
              fontSize: 13,
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
