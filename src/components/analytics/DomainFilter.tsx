const domains = [
  { label: "All", value: "" },
  { label: "hari.sh", value: "hari.sh" },
  { label: "htiruna.com", value: "htiruna.com" },
];

interface DomainFilterProps {
  selected: string;
  onChange: (domain: string) => void;
}

export function DomainFilter({ selected, onChange }: DomainFilterProps) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {domains.map((d) => {
        const isActive = selected === d.value;
        return (
          <button
            key={d.value}
            onClick={() => onChange(d.value)}
            style={{
              background: isActive ? "#1e1e1e" : "transparent",
              color: isActive ? "#fff" : "#888",
              border: "1px solid",
              borderColor: isActive ? "#333" : "transparent",
              borderRadius: 6,
              padding: "6px 12px",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: isActive ? 500 : 400,
            }}
          >
            {d.label}
          </button>
        );
      })}
    </div>
  );
}
