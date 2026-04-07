"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllConditions, getConditionsByCategory, getCategoryLabel } from "@/lib/content";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [conditionsOpen, setConditionsOpen] = useState(false);
  const grouped = getConditionsByCategory();
  const allConditions = getAllConditions();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="flex items-center justify-center w-9 h-9 bg-brand-600 rounded-xl text-white text-sm font-bold shadow-sm group-hover:bg-brand-700 transition-colors">
              GI
            </span>
            <span className="font-heading font-semibold text-brand-700 text-lg hidden sm:inline">
              GI Patient Hub
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setConditionsOpen(!conditionsOpen)}
                onBlur={() => setTimeout(() => setConditionsOpen(false), 200)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-brand-700 hover:bg-brand-50 transition-colors inline-flex items-center gap-1"
              >
                Conditions
                <svg className={`w-3.5 h-3.5 transition-transform ${conditionsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {conditionsOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl border border-neutral-200 shadow-lg p-3 z-50">
                  {Object.entries(grouped).map(([category, conditions]) => (
                    <div key={category} className="mb-3 last:mb-0">
                      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-2 mb-1">
                        {getCategoryLabel(category)}
                      </p>
                      {conditions.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/conditions/${c.slug}`}
                          className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-brand-50 text-sm text-neutral-700 hover:text-brand-700 transition-colors"
                          onClick={() => setConditionsOpen(false)}
                        >
                          <span className="text-lg">{c.icon}</span>
                          <span className="font-medium">{c.shortTitle}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {allConditions.length > 0 && (
              <Link
                href="/for-physicians"
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-brand-700 hover:bg-brand-50 transition-colors"
              >
                For Physicians
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-neutral-100">
            <div className="space-y-1">
              {Object.entries(grouped).map(([category, conditions]) => (
                <div key={category}>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-4 pt-3 pb-1">
                    {getCategoryLabel(category)}
                  </p>
                  {conditions.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/conditions/${c.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-neutral-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors font-medium"
                    >
                      <span className="text-lg">{c.icon}</span>
                      {c.shortTitle}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                href="/for-physicians"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-neutral-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors font-medium mt-2 border-t border-neutral-100 pt-4"
              >
                For Physicians
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
