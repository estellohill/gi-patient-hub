interface StatsPanelProps {
  heading: string;
  items: string[];
}

export default function StatsPanel({ heading, items }: StatsPanelProps) {
  return (
    <div className="bg-brand-900 rounded-2xl p-6 sm:p-8 shadow-lg">
      <h3 className="font-heading text-lg font-semibold text-white mb-5">{heading}</h3>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-xs flex items-center justify-center font-semibold mt-0.5">
              {i + 1}
            </span>
            <p className="text-white/90 text-sm leading-relaxed">{item}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
