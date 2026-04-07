"use client";

import { useState } from "react";
import type { ContentBlock } from "@/content/types";

interface Tab {
  label: string;
  icon?: string;
  blocks: ContentBlock[];
}

interface TabPanelProps {
  heading?: string;
  tabs: Tab[];
  renderBlock: (block: ContentBlock, index: number) => React.ReactNode;
}

export default function TabPanel({ heading, tabs, renderBlock }: TabPanelProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      {heading && (
        <div className="px-5 sm:px-6 pt-5 sm:pt-6">
          <h3 className="font-heading font-semibold text-neutral-800 text-lg">{heading}</h3>
        </div>
      )}

      {/* Tab buttons */}
      <div className="flex border-b border-neutral-200 px-5 sm:px-6 mt-3 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === i
                ? "border-brand-500 text-brand-600"
                : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
            }`}
          >
            {tab.icon && <span className="text-base">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5 sm:p-6">
        <div className="space-y-6">
          {tabs[activeTab].blocks.map((block, index) => renderBlock(block, index))}
        </div>
      </div>
    </div>
  );
}
