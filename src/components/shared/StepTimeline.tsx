interface StepTimelineProps {
  heading: string;
  steps: string[];
}

export default function StepTimeline({ heading, steps }: StepTimelineProps) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-5">{heading}</h3>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              {i + 1}
            </span>
            <p className="text-neutral-700 leading-relaxed pt-1">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
