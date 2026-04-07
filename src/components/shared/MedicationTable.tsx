interface MedicationTableProps {
  heading: string;
  warning?: string;
  items: { med: string; note: string }[];
}

export default function MedicationTable({ heading, warning, items }: MedicationTableProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-5">{heading}</h3>
      {warning && (
        <div className="bg-warning-50 rounded-2xl p-5 border border-warning-200 mb-4">
          <div className="flex gap-3 items-start">
            <span className="text-warning-500 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            <p className="text-sm text-neutral-700">
              <strong className="text-warning-700">Important:</strong> {warning}
            </p>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.med} className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm">
            <p className="font-semibold text-neutral-800 text-sm">{item.med}</p>
            <p className="text-sm text-neutral-500 mt-1 leading-relaxed">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
