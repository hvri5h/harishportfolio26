interface PagesPanelProps {
  pages: { path: string; count: number }[];
}

export function PagesPanel({ pages }: PagesPanelProps) {
  const max = pages[0]?.count || 1;

  return (
    <div style={panelStyle}>
      <h3 style={titleStyle}>Pages</h3>
      {pages.length === 0 ? (
        <p style={emptyStyle}>No data</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {pages.map((p) => (
            <div key={p.path}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: 13,
                    fontFamily: "monospace",
                  }}
                >
                  {p.path}
                </span>
                <span style={{ color: "#888", fontSize: 13 }}>{p.count}</span>
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
                    width: `${(p.count / max) * 100}%`,
                    background: "#8b5cf6",
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
