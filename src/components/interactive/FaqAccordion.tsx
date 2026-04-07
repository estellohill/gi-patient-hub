"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ questions }: { questions: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {questions.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all duration-200 ${isOpen ? "border-brand-300 shadow-md" : "border-neutral-200"}`}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-neutral-50 transition-colors"
            >
              <span className={`font-heading font-semibold pr-4 transition-colors ${isOpen ? "text-brand-700" : "text-neutral-800"}`}>
                {item.q}
              </span>
              <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${isOpen ? "bg-brand-100 text-brand-600 rotate-180" : "bg-neutral-100 text-neutral-400"}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <div className="border-t border-neutral-100 pt-4">
                  <p className="text-neutral-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
