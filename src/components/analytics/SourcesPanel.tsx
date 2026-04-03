interface SourcesPanelProps {
  sources: { name: string; count: number }[];
}

export function SourcesPanel({ sources }: SourcesPanelProps) {
  const max = sources[0]?.count || 1;

  return (
    <div style={panelStyle}>
      <h3 style={titleStyle}>Sources</h3>
      {sources.length === 0 ? (
        <p style={emptyStyle}>No data</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sources.map((s) => (
            <div key={s.name}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ color: "#fff", fontSize: 13 }}>{s.name}</span>
                <span style={{ color: "#888", fontSize: 13 }}>{s.count}</span>
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
                    width: `${(s.count / max) * 100}%`,
                    background: "#3b82f6",
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          ))}
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

const emptyStyle: React.CSSProperties = {
  color: "#555",
  fontSize: 13,
  margin: 0,
};
