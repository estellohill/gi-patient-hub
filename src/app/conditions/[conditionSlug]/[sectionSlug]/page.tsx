import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCondition, getConditionContent, getSection, getAllConditions, getAllSectionSlugs } from "@/lib/content";
import ConditionBreadcrumb from "@/components/layout/ConditionBreadcrumb";
import SectionRenderer from "@/components/condition/SectionRenderer";
import ReadingProgress from "@/components/interactive/ReadingProgress";

export async function generateStaticParams() {
  const params: { conditionSlug: string; sectionSlug: string }[] = [];
  for (const c of getAllConditions()) {
    for (const s of getAllSectionSlugs(c.slug)) {
      params.push({ conditionSlug: c.slug, sectionSlug: s });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ conditionSlug: string; sectionSlug: string }>;
}): Promise<Metadata> {
  const { conditionSlug, sectionSlug } = await params;
  const condition = getCondition(conditionSlug);
  const section = getSection(conditionSlug, sectionSlug);
  if (!condition || !section) return {};
  return {
    title: `${section.title} — ${condition.title}`,
    description: section.summary,
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ conditionSlug: string; sectionSlug: string }>;
}) {
  const { conditionSlug, sectionSlug } = await params;
  const condition = getCondition(conditionSlug);
  if (!condition) notFound();

  const section = getSection(conditionSlug, sectionSlug);
  if (!section) notFound();

  const content = getConditionContent(conditionSlug);
  const sectionIndex = content.sections.findIndex((s) => s.id === sectionSlug);
  const prevSection = sectionIndex > 0 ? content.sections[sectionIndex - 1] : null;
  const nextSection = sectionIndex < content.sections.length - 1 ? content.sections[sectionIndex + 1] : null;

  const colorBgMap: Record<string, string> = {
    teal: "bg-teal-50",
    blue: "bg-brand-50",
    indigo: "bg-brand-50",
    emerald: "bg-success-50",
    sky: "bg-brand-50",
    amber: "bg-warning-50",
    rose: "bg-restrict-50",
    purple: "bg-brand-50",
    orange: "bg-warning-50",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <ReadingProgress />
      <ConditionBreadcrumb
        conditionTitle={condition.title}
        conditionSlug={condition.slug}
        sectionTitle={section.title}
      />

      <div className="mb-10">
        <span className={`inline-flex items-center justify-center w-14 h-14 ${colorBgMap[section.color] || "bg-neutral-50"} rounded-2xl text-3xl mb-4`}>
          {section.icon}
        </span>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
          {section.title}
        </h1>
        <p className="text-lg text-neutral-500 font-medium">{section.subtitle}</p>
      </div>

      <SectionRenderer blocks={section.content} />

      {/* Still have questions CTA (for FAQ sections) */}
      {sectionSlug === "faq" && (
        <div className="bg-brand-50 rounded-2xl p-8 border border-brand-200 mt-12 text-center">
          <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="font-heading font-semibold text-brand-800 text-lg mb-2">Still have questions?</h2>
          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Contact your doctor&apos;s office. They&apos;re happy to answer any questions specific to your situation.
          </p>
        </div>
      )}

      {/* Prev/Next navigation */}
      <div className="flex justify-between items-center pt-6 mt-10 border-t border-neutral-200">
        {prevSection ? (
          <Link
            href={`/conditions/${conditionSlug}/${prevSection.id}`}
            className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {prevSection.title}
          </Link>
        ) : (
          <Link
            href={`/conditions/${conditionSlug}`}
            className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to {condition.title}
          </Link>
        )}
        {nextSection ? (
          <Link
            href={`/conditions/${conditionSlug}/${nextSection.id}`}
            className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold text-sm"
          >
            {nextSection.title}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <Link
            href={`/conditions/${conditionSlug}`}
            className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold text-sm"
          >
            Back to {condition.title}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
