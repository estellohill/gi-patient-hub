interface KeyPointsGridProps {
  heading?: string;
  points: { heading: string; text: string }[];
}

export default function KeyPointsGrid({ heading, points }: KeyPointsGridProps) {
  return (
    <div>
      {heading && (
        <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-4">{heading}</h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {points.map((point) => (
          <div key={point.heading} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
            <h4 className="font-heading font-semibold text-neutral-800 mb-1.5">{point.heading}</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">{point.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
