"use client";

import dynamic from "next/dynamic";
import type { ContentBlock } from "@/content/types";
import InfoCallout from "@/components/shared/InfoCallout";
import KeyPointsGrid from "@/components/shared/KeyPointsGrid";
import StepTimeline from "@/components/shared/StepTimeline";
import StatsPanel from "@/components/shared/StatsPanel";
import AlertBanner from "@/components/shared/AlertBanner";
import RiskTable from "@/components/shared/RiskTable";
import FrequencyTable from "@/components/shared/FrequencyTable";
import PhasesDisplay from "@/components/shared/PhasesDisplay";
import AllowedAvoid from "@/components/shared/AllowedAvoid";
import MedicationTable from "@/components/shared/MedicationTable";

const Skeleton = () => <div className="animate-pulse bg-neutral-100 rounded-xl h-24" />;

const FaqAccordion = dynamic(() => import("@/components/interactive/FaqAccordion"), { loading: Skeleton });
const InteractiveChecklist = dynamic(() => import("@/components/interactive/InteractiveChecklist"), { loading: Skeleton });
const CountdownTimer = dynamic(() => import("@/components/interactive/CountdownTimer"), { loading: Skeleton });
const KnowledgeCheck = dynamic(() => import("@/components/interactive/KnowledgeCheck"), { loading: Skeleton });
const TabPanel = dynamic(() => import("@/components/interactive/TabPanel"), { loading: Skeleton });

function renderBlock(block: ContentBlock, index: number): React.ReactNode {
  switch (block.type) {
    case "intro":
      return (
        <div key={index} className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <p className="text-neutral-700 leading-relaxed pt-1.5">{block.text}</p>
          </div>
        </div>
      );

    case "key-points":
      return <KeyPointsGrid key={index} heading={block.heading} points={block.points} />;

    case "steps":
      return <StepTimeline key={index} heading={block.heading} steps={block.steps} />;

    case "stats":
      return <StatsPanel key={index} heading={block.heading} items={block.items} />;

    case "info-callout":
      return <InfoCallout key={index} variant={block.variant} text={block.text} title={block.title} />;

    case "faq":
      return <FaqAccordion key={index} questions={block.questions} />;

    case "checklist":
      return (
        <InteractiveChecklist
          key={index}
          items={block.items}
          storageKey={block.storageKey}
          heading={block.heading}
        />
      );

    case "allowed-avoid":
      return <AllowedAvoid key={index} heading={block.heading} allowed={block.allowed} avoid={block.avoid} />;

    case "medication-table":
      return (
        <MedicationTable
          key={index}
          heading={block.heading}
          warning={block.warning}
          items={block.items}
        />
      );

    case "risk-table":
      return <RiskTable key={index} heading={block.heading} intro={block.intro} items={block.items} />;

    case "frequency-table":
      return <FrequencyTable key={index} heading={block.heading} items={block.items} />;

    case "phases":
      return <PhasesDisplay key={index} phases={block.phases} afterNote={block.afterNote} />;

    case "countdown":
      return <CountdownTimer key={index} />;

    case "when-to-seek-help":
      return <AlertBanner key={index} heading={block.heading} items={block.items} />;

    case "references":
      return (
        <div key={index}>
          <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-4">References & Guidelines</h3>
          <ul className="space-y-2">
            {block.items.map((ref, i) => (
              <li key={i} className="text-sm text-neutral-600 leading-relaxed flex gap-2">
                <span className="text-brand-400 flex-shrink-0 mt-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </span>
                {ref.url ? (
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 underline">
                    {ref.text}
                  </a>
                ) : (
                  ref.text
                )}
              </li>
            ))}
          </ul>
        </div>
      );

    case "text":
      return (
        <div key={index}>
          {block.heading && (
            <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-2">{block.heading}</h3>
          )}
          <p className="text-neutral-600 leading-relaxed">{block.text}</p>
        </div>
      );

    case "knowledge-check":
      return <KnowledgeCheck key={index} heading={block.heading} items={block.items} />;

    case "tabs":
      return <TabPanel key={index} heading={block.heading} tabs={block.tabs} renderBlock={renderBlock} />;

    default:
      return null;
  }
}

interface SectionRendererProps {
  blocks: ContentBlock[];
}

export default function SectionRenderer({ blocks }: SectionRendererProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
