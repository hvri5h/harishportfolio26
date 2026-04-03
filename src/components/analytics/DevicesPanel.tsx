interface DevicesPanelProps {
  devices: {
    types: { name: string; count: number }[];
    browsers: { name: string; count: number }[];
    os: { name: string; count: number }[];
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
            <span style={{ color: "#111", fontSize: 13 }}>{item.name}</span>
            <span style={{ color: "#6b7280", fontSize: 13 }}>{item.count}</span>
          </div>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: "#e5e7eb",
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

export function DevicesPanel({ devices }: DevicesPanelProps) {
  return (
    <div style={panelStyle}>
      <h3 style={titleStyle}>Devices</h3>
      {devices.types.length === 0 ? (
        <p style={emptyStyle}>No data</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h4 style={subtitleStyle}>Type</h4>
            <BarList items={devices.types} color="#f59e0b" />
          </div>
          {devices.browsers.length > 0 && (
            <div>
              <h4 style={subtitleStyle}>Browser</h4>
              <BarList items={devices.browsers} color="#3b82f6" />
            </div>
          )}
          {devices.os.length > 0 && (
            <div>
              <h4 style={subtitleStyle}>OS</h4>
              <BarList items={devices.os} color="#8b5cf6" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};

const titleStyle: React.CSSProperties = {
  color: "#111",
  fontSize: 15,
  fontWeight: 600,
  margin: "0 0 16px",
};

const subtitleStyle: React.CSSProperties = {
  color: "#6b7280",
  fontSize: 12,
  fontWeight: 500,
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const emptyStyle: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: 13,
  margin: 0,
};
