import Link from "next/link";

interface BreadcrumbProps {
  conditionTitle: string;
  conditionSlug: string;
  sectionTitle?: string;
}

export default function ConditionBreadcrumb({ conditionTitle, conditionSlug, sectionTitle }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm mb-8 flex-wrap" aria-label="Breadcrumb">
      <Link href="/" className="text-brand-600 hover:text-brand-700 font-medium">
        Home
      </Link>
      <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
      {sectionTitle ? (
        <>
          <Link href={`/conditions/${conditionSlug}`} className="text-brand-600 hover:text-brand-700 font-medium">
            {conditionTitle}
          </Link>
          <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-neutral-500">{sectionTitle}</span>
        </>
      ) : (
        <span className="text-neutral-500">{conditionTitle}</span>
      )}
    </nav>
  );
}
