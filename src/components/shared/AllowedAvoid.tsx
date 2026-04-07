interface AllowedAvoidProps {
  heading: string;
  allowed: string[];
  avoid: string[];
}

export default function AllowedAvoid({ heading, allowed, avoid }: AllowedAvoidProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-5">{heading}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 border-2 border-success-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-success-500 rounded-lg flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <h4 className="font-heading font-semibold text-success-700">OK to have</h4>
          </div>
          <ul className="space-y-2.5">
            {allowed.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-neutral-700">
                <span className="text-success-500 flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-restrict-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-restrict-500 rounded-lg flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            <h4 className="font-heading font-semibold text-restrict-600">Avoid</h4>
          </div>
          <ul className="space-y-2.5">
            {avoid.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-neutral-700">
                <span className="text-restrict-500 flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
