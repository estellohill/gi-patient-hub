import type { Metadata } from "next";
import { getConditionsByCategory, getCategoryLabel, getKeyTakeaways, getWhenToSeekHelp } from "@/lib/content";
import ConditionGrid from "@/components/physician/ConditionGrid";

export const metadata: Metadata = {
  title: "For Physicians — Patient Education Resources",
  description: "Download QR codes and printable handouts for GI conditions. Attach to patient paperwork for guided, interactive education.",
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://gipatienthub.com";

const categoryLabels: Record<string, string> = {
  "upper-gi": "Upper GI",
  "lower-gi": "Lower GI",
  liver: "Liver",
  pancreas: "Pancreas",
  procedure: "Procedures",
};

export default function ForPhysicians() {
  const grouped = getConditionsByCategory();

  // Pre-compute handout data for each condition
  const groupedWithHandout: Record<string, { condition: typeof grouped[string][number]; keyTakeaways: string[]; whenToSeekHelp: string[] }[]> = {};
  for (const [category, conditions] of Object.entries(grouped)) {
    groupedWithHandout[category] = conditions.map((c) => ({
      condition: c,
      keyTakeaways: getKeyTakeaways(c.slug),
      whenToSeekHelp: getWhenToSeekHelp(c.slug),
    }));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-3">
          Patient Education Resources
        </h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
          Download QR codes and print handouts for {Object.values(grouped).flat().length} GI conditions. Attach to patient paperwork for guided, interactive education.
        </p>
      </div>

      {/* How it works */}
      <div className="bg-brand-50 rounded-2xl border border-brand-200 p-8 mb-12">
        <h2 className="font-heading font-semibold text-brand-800 text-lg mb-5 text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { step: "1", label: "Find", desc: "Browse conditions below", icon: "🔍" },
            { step: "2", label: "Download", desc: "Get the QR code (PNG or SVG)", icon: "📥" },
            { step: "3", label: "Print", desc: "Print the one-page handout", icon: "🖨️" },
            { step: "4", label: "Attach", desc: "Add to patient paperwork", icon: "📋" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <span className="text-3xl mb-2 inline-block">{item.icon}</span>
              <p className="font-heading font-semibold text-neutral-800 text-sm">{item.label}</p>
              <p className="text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats banner */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <p className="font-heading font-bold text-2xl text-brand-600">{Object.values(grouped).flat().length}</p>
          <p className="text-xs text-neutral-500 font-medium">Conditions</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <p className="font-heading font-bold text-2xl text-brand-600">6th</p>
          <p className="text-xs text-neutral-500 font-medium">Grade Reading Level</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <p className="font-heading font-bold text-2xl text-brand-600">100%</p>
          <p className="text-xs text-neutral-500 font-medium">Guideline-Based</p>
        </div>
      </div>

      {/* Condition list with QR + Print */}
      <ConditionGrid
        grouped={groupedWithHandout}
        categoryLabels={categoryLabels}
        baseUrl={BASE_URL}
      />

      {/* About section */}
      <div className="mt-12 bg-neutral-50 rounded-2xl border border-neutral-200 p-8">
        <h2 className="font-heading font-semibold text-neutral-800 text-lg mb-4">About This Resource</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-neutral-600">
          <div>
            <h3 className="font-semibold text-neutral-800 mb-1">Evidence-Based</h3>
            <p>All content is based on current Canadian and international gastroenterology guidelines (CAG, ACG, AGA, AASLD, EASL).</p>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-800 mb-1">Patient-Friendly</h3>
            <p>Written at a 6th grade reading level with plain language. Interactive checklists, quizzes, and progress tracking.</p>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-800 mb-1">Privacy-First</h3>
            <p>No login required. No patient data collected. Progress is stored locally on the patient&apos;s device only.</p>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-800 mb-1">Always Available</h3>
            <p>Works offline as a Progressive Web App. Patients can access education anytime, even without internet.</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-xs text-neutral-400">
          Created by a Canadian gastroenterologist. For educational purposes only. Does not replace individualized medical advice.
        </p>
      </div>
    </div>
  );
}
