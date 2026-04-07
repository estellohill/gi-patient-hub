// ── Condition Metadata ──────────────────────────────────────────────

export interface ConditionMeta {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  icon: string;
  color: ConditionColor;
  description: string;
  category: "upper-gi" | "lower-gi" | "liver" | "pancreas" | "procedure";
  prevalence: "Very Common" | "Common" | "Less Common";
  lastReviewed: string;
  guidelines: { society: string; title: string; year: number; url?: string }[];
  enabled: boolean;
}

export type ConditionColor =
  | "teal"
  | "blue"
  | "indigo"
  | "emerald"
  | "sky"
  | "amber"
  | "rose"
  | "purple"
  | "orange";

// ── Content Blocks (discriminated union) ────────────────────────────

export type ContentBlock =
  | IntroBlock
  | KeyPointsBlock
  | StepsBlock
  | StatsBlock
  | InfoCalloutBlock
  | FaqBlock
  | ChecklistBlock
  | AllowedAvoidBlock
  | MedicationTableBlock
  | RiskTableBlock
  | FrequencyTableBlock
  | PhasesBlock
  | CountdownBlock
  | WhenToSeekHelpBlock
  | ReferencesBlock
  | TextBlock
  | KnowledgeCheckBlock
  | TabsBlock;

export interface IntroBlock {
  type: "intro";
  text: string;
}

export interface KeyPointsBlock {
  type: "key-points";
  heading?: string;
  points: { heading: string; text: string }[];
}

export interface StepsBlock {
  type: "steps";
  heading: string;
  steps: string[];
}

export interface StatsBlock {
  type: "stats";
  heading: string;
  items: string[];
}

export interface InfoCalloutBlock {
  type: "info-callout";
  variant: "info" | "warning" | "success";
  text: string;
  title?: string;
}

export interface FaqBlock {
  type: "faq";
  questions: { q: string; a: string }[];
}

export interface ChecklistBlock {
  type: "checklist";
  heading: string;
  storageKey: string;
  items: string[];
}

export interface AllowedAvoidBlock {
  type: "allowed-avoid";
  heading: string;
  allowed: string[];
  avoid: string[];
}

export interface MedicationTableBlock {
  type: "medication-table";
  heading: string;
  warning?: string;
  items: { med: string; note: string }[];
}

export interface RiskTableBlock {
  type: "risk-table";
  heading: string;
  intro?: string;
  items: { name: string; risk: string; description: string }[];
}

export interface FrequencyTableBlock {
  type: "frequency-table";
  heading: string;
  items: { scenario: string; interval: string }[];
}

export interface PhasesBlock {
  type: "phases";
  phases: { phase: string; icon: string; items: string[] }[];
  afterNote?: { heading: string; items: string[] };
}

export interface CountdownBlock {
  type: "countdown";
  // CountdownTimer is self-contained — no data needed
}

export interface WhenToSeekHelpBlock {
  type: "when-to-seek-help";
  heading?: string;
  items: string[];
}

export interface ReferencesBlock {
  type: "references";
  items: { text: string; url?: string }[];
}

export interface TextBlock {
  type: "text";
  heading?: string;
  text: string;
}

export interface KnowledgeCheckBlock {
  type: "knowledge-check";
  heading?: string;
  items: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
}

export interface TabsBlock {
  type: "tabs";
  heading?: string;
  tabs: {
    label: string;
    icon?: string;
    blocks: ContentBlock[];
  }[];
}

// ── Section & Condition Content ─────────────────────────────────────

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: ConditionColor;
  summary: string;
  content: ContentBlock[];
}

export interface ConditionContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    reassurance?: string;
  };
  sections: Section[];
}
