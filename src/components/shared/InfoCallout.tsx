const variants = {
  info: {
    bg: "bg-brand-50 border-brand-200",
    icon: "bg-brand-600 text-white",
    title: "text-brand-700",
  },
  warning: {
    bg: "bg-warning-50 border-warning-200",
    icon: "bg-warning-500 text-white",
    title: "text-warning-700",
  },
  success: {
    bg: "bg-success-50 border-success-200",
    icon: "bg-success-600 text-white",
    title: "text-success-700",
  },
};

const icons = {
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
};

interface InfoCalloutProps {
  variant: "info" | "warning" | "success";
  text: string;
  title?: string;
}

export default function InfoCallout({ variant, text, title }: InfoCalloutProps) {
  const v = variants[variant];

  return (
    <div className={`rounded-2xl p-6 border ${v.bg}`}>
      <div className="flex gap-3 items-start">
        <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${v.icon}`}>
          {icons[variant]}
        </span>
        <div className="pt-1.5">
          {title && <p className={`font-heading font-semibold mb-1 ${v.title}`}>{title}</p>}
          <p className="text-neutral-700 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}
