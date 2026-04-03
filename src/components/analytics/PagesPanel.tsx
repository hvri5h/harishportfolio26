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
                    color: "#111",
                    fontSize: 13,
                    fontFamily: "monospace",
                  }}
                >
                  {p.path}
                </span>
                <span style={{ color: "#6b7280", fontSize: 13 }}>{p.count}</span>
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

const emptyStyle: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: 13,
  margin: 0,
};
