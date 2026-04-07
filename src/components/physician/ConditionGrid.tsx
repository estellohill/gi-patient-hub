"use client";

import { useState } from "react";
import Link from "next/link";
import QRCodeModal from "./QRCodeModal";
import PrintHandout from "./PrintHandout";
import type { ConditionMeta } from "@/content/types";

interface ConditionWithHandout {
  condition: ConditionMeta;
  keyTakeaways: string[];
  whenToSeekHelp: string[];
}

interface ConditionGridProps {
  grouped: Record<string, ConditionWithHandout[]>;
  categoryLabels: Record<string, string>;
  baseUrl: string;
}

export default function ConditionGrid({ grouped, categoryLabels, baseUrl }: ConditionGridProps) {
  const [qrModal, setQrModal] = useState<{ title: string; slug: string } | null>(null);

  return (
    <>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h3 className="font-heading text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
            {categoryLabels[category] || category}
          </h3>
          <div className="space-y-3">
            {items.map(({ condition: c, keyTakeaways, whenToSeekHelp }) => (
              <div key={c.slug} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-2xl flex-shrink-0">{c.icon}</span>
                    <div className="min-w-0">
                      <p className="font-heading font-semibold text-neutral-800">{c.title}</p>
                      <p className="text-sm text-neutral-500">
                        {c.prevalence} &middot; Last reviewed {c.lastReviewed}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setQrModal({ title: c.title, slug: c.slug })}
                      className="flex items-center gap-2 text-sm font-semibold bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      QR Code
                    </button>
                    <PrintHandout
                      condition={c}
                      baseUrl={baseUrl}
                      keyTakeaways={keyTakeaways}
                      whenToSeekHelp={whenToSeekHelp}
                    />
                    <Link
                      href={`/conditions/${c.slug}`}
                      className="text-sm bg-brand-50 text-brand-700 px-4 py-2 rounded-lg font-semibold hover:bg-brand-100 transition-colors"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
                {/* Guidelines */}
                {c.guidelines.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.guidelines.map((g, i) => (
                      <span key={i} className="text-xs bg-neutral-50 border border-neutral-200 text-neutral-500 px-2 py-1 rounded-md">
                        {g.society} ({g.year})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {qrModal && (
        <QRCodeModal
          isOpen={true}
          onClose={() => setQrModal(null)}
          conditionTitle={qrModal.title}
          conditionSlug={qrModal.slug}
          baseUrl={baseUrl}
        />
      )}
    </>
  );
}
