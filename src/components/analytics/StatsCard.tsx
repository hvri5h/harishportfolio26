interface StatsCardProps {
  label: string;
  value: string | number;
  live?: boolean;
}

export function StatsCard({ label, value, live }: StatsCardProps) {
  return (
    <div
      style={{
        background: "#141414",
        border: "1px solid #1e1e1e",
        borderRadius: 12,
        padding: "20px 24px",
        flex: "1 1 0",
        minWidth: 140,
      }}
    >
      <div
        style={{
          color: "#888",
          fontSize: 13,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {live && (
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
        )}
        {label}
      </div>
      <div style={{ color: "#fff", fontSize: 28, fontWeight: 600 }}>
        {value}
      </div>
    </div>
  );
}
