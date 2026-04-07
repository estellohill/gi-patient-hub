import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCondition, getConditionContent, getAllConditions } from "@/lib/content";
import ConditionBreadcrumb from "@/components/layout/ConditionBreadcrumb";
import StructuredData from "@/components/seo/StructuredData";
import SectionProgress from "@/components/interactive/SectionProgress";
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

export async function generateStaticParams() {
  return getAllConditions().map((c) => ({ conditionSlug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ conditionSlug: string }>;
}): Promise<Metadata> {
  const { conditionSlug } = await params;
  const condition = getCondition(conditionSlug);
  if (!condition) return {};
  return {
    title: condition.title,
    description: condition.description,
  };
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ conditionSlug: string }>;
}) {
  const { conditionSlug } = await params;
  const condition = getCondition(conditionSlug);
  if (!condition) notFound();

  const content = getConditionContent(conditionSlug);

  return (
    <div>
      <StructuredData
        condition={{
          name: condition.title,
          description: condition.description,
          url: `/conditions/${condition.slug}`,
          lastReviewed: condition.lastReviewed,
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,178,172,0.15),transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
          <span className="text-5xl mb-4 inline-block">{condition.icon}</span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {content.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-brand-200 mb-3 font-medium leading-relaxed">
            {content.hero.subtitle}
          </p>
          <p className="text-brand-300 max-w-xl mx-auto leading-relaxed">
            {content.hero.description}
          </p>
          {content.hero.reassurance && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3">
              <svg className="w-5 h-5 text-success-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-white/90 font-medium">{content.hero.reassurance}</span>
            </div>
          )}
        </div>
      </section>

      {/* Section Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <ConditionBreadcrumb conditionTitle={condition.title} conditionSlug={condition.slug} />

        <SectionProgress
          conditionSlug={conditionSlug}
          sections={content.sections.map((s) => ({
            id: s.id,
            title: s.title,
            icon: s.icon,
            color: s.color,
            summary: s.summary,
          }))}
          colorMap={colorMap}
        />

        {/* Guidelines */}
        {condition.guidelines.length > 0 && (
          <div className="mt-12 bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-heading font-semibold text-neutral-700 text-sm">Based on Current Guidelines</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {condition.guidelines.map((g, i) => (
                <span key={i} className="text-xs bg-white border border-neutral-200 text-neutral-600 px-3 py-1.5 rounded-lg font-medium">
                  {g.society} ({g.year})
                </span>
              ))}
            </div>
            <p className="text-xs text-neutral-400 mt-3">Last reviewed: {condition.lastReviewed}</p>
          </div>
        )}
      </section>
    </div>
  );
}
