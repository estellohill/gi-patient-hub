import Link from "next/link";
import { getAllConditions, getConditionsByCategory, getCategoryLabel } from "@/lib/content";
import type { ConditionColor } from "@/content/types";

const colorMap: Record<ConditionColor, { card: string; icon: string }> = {
  teal: { card: "hover:border-teal-400", icon: "bg-teal-50 text-teal-600" },
  blue: { card: "hover:border-brand-400", icon: "bg-brand-50 text-brand-600" },
  indigo: { card: "hover:border-brand-400", icon: "bg-brand-50 text-brand-600" },
  emerald: { card: "hover:border-success-500", icon: "bg-success-50 text-success-600" },
  sky: { card: "hover:border-brand-300", icon: "bg-brand-50 text-brand-500" },
  amber: { card: "hover:border-warning-400", icon: "bg-warning-50 text-warning-600" },
  rose: { card: "hover:border-restrict-400", icon: "bg-restrict-50 text-restrict-500" },
  purple: { card: "hover:border-brand-400", icon: "bg-brand-50 text-brand-600" },
  orange: { card: "hover:border-warning-400", icon: "bg-warning-50 text-warning-600" },
};

const trustPoints = [
  { icon: "🔬", text: "Evidence-based content from current Canadian and international guidelines" },
  { icon: "👨\u200D⚕️", text: "Created and reviewed by a Canadian gastroenterologist" },
  { icon: "📱", text: "Interactive tools: checklists, diet guides, FAQ — designed for patients" },
];

export default function Home() {
  const allConditions = getAllConditions();
  const grouped = getConditionsByCategory();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,178,172,0.15),transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/90 font-medium">Free patient education resource</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            GI Patient Hub
          </h1>
          <p className="text-xl md:text-2xl text-brand-200 mb-4 font-medium leading-relaxed">
            Evidence-based education for gastrointestinal conditions
          </p>
          <p className="text-brand-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Clear, trustworthy information to help you understand your diagnosis. Interactive tools, answers to common questions, and guidance on what to expect — all created by a Canadian gastroenterologist.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#conditions"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-brand-50 transition-colors shadow-lg shadow-brand-900/30"
            >
              Browse Conditions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link
              href="/for-physicians"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              For Physicians
            </Link>
          </div>
        </div>
      </section>

      {/* Condition Cards by Category */}
      <section id="conditions" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-neutral-800 mb-3">
            Patient Education by Condition
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto">
            Tap your condition for interactive, evidence-based information — including what to expect, treatment options, lifestyle guidance, and answers to common questions.
          </p>
        </div>

        {Object.entries(grouped).map(([category, conditions]) => (
          <div key={category} className="mb-10 last:mb-0">
            <h3 className="font-heading text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 px-1">
              {getCategoryLabel(category)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {conditions.map((condition) => {
                const colors = colorMap[condition.color] || colorMap.teal;
                return (
                  <Link
                    key={condition.slug}
                    href={`/conditions/${condition.slug}`}
                    className={`group block p-6 rounded-2xl border-2 border-neutral-200 bg-white transition-all duration-200 hover:shadow-lg ${colors.card}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl ${colors.icon}`}>
                        {condition.icon}
                      </span>
                      <span className="text-xs bg-neutral-100 text-neutral-500 px-2.5 py-1 rounded-full font-medium">
                        {condition.prevalence}
                      </span>
                    </div>
                    <h4 className="font-heading font-semibold text-neutral-800 text-lg mb-1.5 group-hover:text-brand-700 transition-colors">
                      {condition.title}
                    </h4>
                    <p className="text-sm text-neutral-400 mb-3 font-medium">{condition.subtitle}</p>
                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2">
                      {condition.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {allConditions.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            <p>Conditions coming soon.</p>
          </div>
        )}
      </section>

      {/* Trust Banner */}
      <section className="bg-white border-y border-neutral-200 py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold text-neutral-800 mb-3">
              Evidence-Based Information You Can Trust
            </h2>
            <p className="text-neutral-500 max-w-lg mx-auto">
              Built on current Canadian and international guidelines to give you accurate, reliable information about your condition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustPoints.map((point) => (
              <div key={point.text} className="flex gap-4 items-start p-5 rounded-xl bg-neutral-50 border border-neutral-100">
                <span className="text-2xl flex-shrink-0 mt-0.5">{point.icon}</span>
                <p className="text-sm text-neutral-600 leading-relaxed">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physician CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-brand-50 rounded-2xl border border-brand-200 p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-brand-800 mb-3">
            Are you a physician?
          </h2>
          <p className="text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed">
            Download QR codes and printable handouts for any condition. Attach to patient paperwork — patients scan at home for guided, interactive education.
          </p>
          <Link
            href="/for-physicians"
            className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors shadow-md"
          >
            Physician Resources
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
