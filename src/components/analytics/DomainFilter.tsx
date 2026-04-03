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
              background: isActive ? "#f3f4f6" : "transparent",
              color: isActive ? "#111" : "#6b7280",
              border: "1px solid",
              borderColor: isActive ? "#d1d5db" : "transparent",
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
