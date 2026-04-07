interface RiskTableProps {
  heading: string;
  intro?: string;
  items: { name: string; risk: string; description: string }[];
}

const riskColors: Record<string, string> = {
  Low: "bg-success-50 text-success-700 border-success-200",
  Moderate: "bg-warning-50 text-warning-700 border-warning-200",
  "Moderate to High": "bg-warning-50 text-warning-700 border-warning-200",
  High: "bg-restrict-50 text-restrict-600 border-restrict-200",
};

export default function RiskTable({ heading, intro, items }: RiskTableProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-2">{heading}</h3>
      {intro && <p className="text-neutral-600 leading-relaxed mb-5">{intro}</p>}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.name} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-heading font-semibold text-neutral-800">{item.name}</h4>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${riskColors[item.risk] || riskColors.Low}`}>
                {item.risk} risk
              </span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
