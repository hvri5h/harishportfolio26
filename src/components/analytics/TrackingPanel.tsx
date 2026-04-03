interface TrackingPanelProps {
  utm: {
    sources: { name: string; count: number }[];
    mediums: { name: string; count: number }[];
    campaigns: { name: string; count: number }[];
  };
}

function BarList({
  items,
  color,
}: {
  items: { name: string; count: number }[];
  color: string;
}) {
  const max = items[0]?.count || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((item) => (
        <div key={item.name}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <span style={{ color: "#fff", fontSize: 13 }}>{item.name}</span>
            <span style={{ color: "#888", fontSize: 13 }}>{item.count}</span>
          </div>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: "#1e1e1e",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(item.count / max) * 100}%`,
                background: color,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TrackingPanel({ utm }: TrackingPanelProps) {
  const hasData =
    utm.sources.length > 0 ||
    utm.mediums.length > 0 ||
    utm.campaigns.length > 0;

  return (
    <div style={panelStyle}>
      <h3 style={titleStyle}>UTM Tracking</h3>
      {!hasData ? (
        <p style={emptyStyle}>No UTM data</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {utm.sources.length > 0 && (
            <div>
              <h4 style={subtitleStyle}>Source</h4>
              <BarList items={utm.sources} color="#ec4899" />
            </div>
          )}
          {utm.mediums.length > 0 && (
            <div>
              <h4 style={subtitleStyle}>Medium</h4>
              <BarList items={utm.mediums} color="#f59e0b" />
            </div>
          )}
          {utm.campaigns.length > 0 && (
            <div>
              <h4 style={subtitleStyle}>Campaign</h4>
              <BarList items={utm.campaigns} color="#22c55e" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  background: "#141414",
  border: "1px solid #1e1e1e",
  borderRadius: 12,
  padding: 20,
};

const titleStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  margin: "0 0 16px",
};

const subtitleStyle: React.CSSProperties = {
  color: "#888",
  fontSize: 12,
  fontWeight: 500,
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const emptyStyle: React.CSSProperties = {
  color: "#555",
  fontSize: 13,
  margin: 0,
};
