import { subDays, startOfDay } from "date-fns";

export type DateRange = {
  start: string;
  end: string;
  label: string;
};

const ranges: { label: string; days: number }[] = [
  { label: "Today", days: 0 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

interface DateRangePickerProps {
  selected: string;
  onChange: (range: DateRange) => void;
}

export function DateRangePicker({ selected, onChange }: DateRangePickerProps) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {ranges.map((r) => {
        const isActive = selected === r.label;
        return (
          <button
            key={r.label}
            onClick={() => {
              const end = new Date().toISOString();
              const start =
                r.days === 0
                  ? startOfDay(new Date()).toISOString()
                  : subDays(new Date(), r.days).toISOString();
              onChange({ start, end, label: r.label });
            }}
            style={{
              background: isActive ? "#3b82f6" : "#f3f4f6",
              color: isActive ? "#fff" : "#6b7280",
              border: "none",
              borderRadius: 6,
              padding: "6px 12px",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: isActive ? 500 : 400,
            }}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}

export function getDefaultRange(): DateRange {
  return {
    start: subDays(new Date(), 7).toISOString(),
    end: new Date().toISOString(),
    label: "7d",
  };
}
