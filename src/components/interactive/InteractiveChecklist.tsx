"use client";

import { useState, useEffect } from "react";

interface InteractiveChecklistProps {
  items: string[];
  storageKey: string;
  heading: string;
}

export default function InteractiveChecklist({ items, storageKey, heading }: InteractiveChecklistProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(`checklist-${storageKey}`);
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, [storageKey]);

  const toggle = (index: number) => {
    const next = { ...checked, [index]: !checked[index] };
    setChecked(next);
    localStorage.setItem(`checklist-${storageKey}`, JSON.stringify(next));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;
  const allDone = completedCount === items.length;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-heading font-semibold text-neutral-800 text-sm">{heading}</h3>
        <span className={`text-sm font-semibold ${allDone ? "text-success-600" : "text-neutral-400"}`}>
          {completedCount}/{items.length}
        </span>
      </div>

      <div className="w-full bg-neutral-100 rounded-full h-2 mb-5">
        <div
          className={`h-2 rounded-full transition-all duration-500 ease-out ${allDone ? "bg-success-500" : "bg-brand-500"}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {allDone && (
        <div className="bg-success-50 border border-success-200 rounded-xl p-3 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-success-700 font-medium">All done! Great job.</span>
        </div>
      )}

      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex items-start gap-3 w-full text-left p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
            >
              <span
                className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  checked[i]
                    ? "bg-success-500 border-success-500 text-white scale-105"
                    : "border-neutral-300 group-hover:border-brand-400"
                }`}
              >
                {checked[i] && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={`text-sm leading-relaxed transition-colors ${checked[i] ? "text-neutral-400 line-through" : "text-neutral-700"}`}>
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
