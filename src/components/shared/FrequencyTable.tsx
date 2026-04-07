interface FrequencyTableProps {
  heading: string;
  items: { scenario: string; interval: string }[];
}

export default function FrequencyTable({ heading, items }: FrequencyTableProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-5">{heading}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.scenario} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="font-medium text-neutral-800 text-sm flex-1">{item.scenario}</p>
            <span className="text-sm bg-brand-50 text-brand-700 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap">
              {item.interval}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
