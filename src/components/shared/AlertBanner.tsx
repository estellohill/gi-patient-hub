interface AlertBannerProps {
  heading?: string;
  items: string[];
}

export default function AlertBanner({ heading, items }: AlertBannerProps) {
  return (
    <div className="bg-restrict-50 border-2 border-restrict-200 rounded-2xl p-6">
      <div className="flex gap-3 items-start mb-4">
        <span className="flex-shrink-0 w-10 h-10 bg-restrict-500 rounded-xl flex items-center justify-center text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </span>
        <h3 className="font-heading font-semibold text-restrict-600 text-lg pt-1.5">
          {heading || "When to Seek Help"}
        </h3>
      </div>
      <ul className="space-y-2.5 ml-13">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-neutral-700">
            <span className="text-restrict-500 flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
              </svg>
            </span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
