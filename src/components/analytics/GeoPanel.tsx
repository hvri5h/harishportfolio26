const countryFlags: Record<string, string> = {
  US: "\u{1f1fa}\u{1f1f8}",
  GB: "\u{1f1ec}\u{1f1e7}",
  AU: "\u{1f1e6}\u{1f1fa}",
  CA: "\u{1f1e8}\u{1f1e6}",
  DE: "\u{1f1e9}\u{1f1ea}",
  FR: "\u{1f1eb}\u{1f1f7}",
  JP: "\u{1f1ef}\u{1f1f5}",
  IN: "\u{1f1ee}\u{1f1f3}",
  BR: "\u{1f1e7}\u{1f1f7}",
  NL: "\u{1f1f3}\u{1f1f1}",
  SG: "\u{1f1f8}\u{1f1ec}",
  KR: "\u{1f1f0}\u{1f1f7}",
  SE: "\u{1f1f8}\u{1f1ea}",
  NZ: "\u{1f1f3}\u{1f1ff}",
  ES: "\u{1f1ea}\u{1f1f8}",
  IT: "\u{1f1ee}\u{1f1f9}",
  CH: "\u{1f1e8}\u{1f1ed}",
  IE: "\u{1f1ee}\u{1f1ea}",
  CN: "\u{1f1e8}\u{1f1f3}",
  MX: "\u{1f1f2}\u{1f1fd}",
};

function getFlag(code: string): string {
  if (countryFlags[code]) return countryFlags[code];
  // Generate flag emoji from country code
  try {
    const codePoints = [...code.toUpperCase()].map(
      (c) => 0x1f1e6 + c.charCodeAt(0) - 65
    );
    return String.fromCodePoint(...codePoints);
  } catch {
    return "\u{1f30d}";
  }
}

interface GeoPanelProps {
  geography: { country: string; count: number }[];
}

export function GeoPanel({ geography }: GeoPanelProps) {
  const max = geography[0]?.count || 1;

  return (
    <div style={panelStyle}>
      <h3 style={titleStyle}>Geography</h3>
      {geography.length === 0 ? (
        <p style={emptyStyle}>No data</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {geography.map((g) => (
            <div key={g.country}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ color: "#111", fontSize: 13 }}>
                  {getFlag(g.country)} {g.country}
                </span>
                <span style={{ color: "#6b7280", fontSize: 13 }}>{g.count}</span>
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
                    width: `${(g.count / max) * 100}%`,
                    background: "#22c55e",
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
