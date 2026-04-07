interface PhasesDisplayProps {
  phases: { phase: string; icon: string; items: string[] }[];
  afterNote?: { heading: string; items: string[] };
}

export default function PhasesDisplay({ phases, afterNote }: PhasesDisplayProps) {
  return (
    <div className="space-y-6">
      {phases.map((phase) => (
        <div key={phase.phase} className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{phase.icon}</span>
            <h3 className="font-heading text-lg font-semibold text-neutral-800">{phase.phase}</h3>
          </div>
          <ul className="space-y-2.5">
            {phase.items.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-neutral-700">
                <span className="text-brand-500 flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {afterNote && (
        <div className="bg-warning-50 rounded-2xl border border-warning-200 p-6">
          <h3 className="font-heading font-semibold text-warning-700 mb-3">{afterNote.heading}</h3>
          <ul className="space-y-2.5">
            {afterNote.items.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-neutral-700">
                <span className="text-warning-500 flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
