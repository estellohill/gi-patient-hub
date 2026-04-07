"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ConditionColor } from "@/content/types";

interface SectionInfo {
  id: string;
  title: string;
  icon: string;
  color: ConditionColor;
  summary: string;
}

interface SectionProgressProps {
  conditionSlug: string;
  sections: SectionInfo[];
  colorMap: Record<string, { card: string; icon: string }>;
}

export default function SectionProgress({ conditionSlug, sections, colorMap }: SectionProgressProps) {
  const [visited, setVisited] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(`progress-${conditionSlug}`);
    if (saved) {
      setVisited(JSON.parse(saved));
    }
  }, [conditionSlug]);

  const markVisited = (sectionId: string) => {
    const next = { ...visited, [sectionId]: true };
    setVisited(next);
    localStorage.setItem(`progress-${conditionSlug}`, JSON.stringify(next));
  };

  const visitedCount = Object.values(visited).filter(Boolean).length;
  const totalSections = sections.length;
  const progress = totalSections > 0 ? Math.round((visitedCount / totalSections) * 100) : 0;

  return (
    <div>
      {/* Progress bar */}
      {visitedCount > 0 && (
        <div className="mb-6 bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-neutral-700">Your Progress</span>
            </div>
            <span className="text-sm font-semibold text-brand-600">
              {visitedCount}/{totalSections} sections
            </span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                visitedCount === totalSections ? "bg-success-500" : "bg-brand-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {visitedCount === totalSections && (
            <p className="text-xs text-success-600 font-medium mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              You&apos;ve reviewed all sections!
            </p>
          )}
        </div>
      )}

      {/* Section cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map((section) => {
          const colors = colorMap[section.color] || colorMap.teal;
          const isVisited = visited[section.id];
          return (
            <Link
              key={section.id}
              href={`/conditions/${conditionSlug}/${section.id}`}
              onClick={() => markVisited(section.id)}
              className={`group block p-6 rounded-2xl border-2 bg-white transition-all duration-200 hover:shadow-lg ${
                isVisited ? "border-success-200" : "border-neutral-200"
              } ${colors.card}`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl ${colors.icon}`}>
                  {section.icon}
                </span>
                {isVisited && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-success-600 bg-success-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Read
                  </span>
                )}
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 text-lg mb-1.5 group-hover:text-brand-700 transition-colors">
                {section.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {section.summary}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
