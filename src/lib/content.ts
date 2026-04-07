import { conditions } from "@/content/conditions/_registry";
import type { ConditionMeta, ConditionContent, Section, ContentBlock } from "@/content/types";

// ── Condition metadata ──────────────────────────────────────────────

export function getAllConditions(): ConditionMeta[] {
  return conditions;
}

export function getCondition(slug: string): ConditionMeta | undefined {
  return conditions.find((c) => c.slug === slug);
}

// ── Condition content (sections) ────────────────────────────────────

const contentCache = new Map<string, ConditionContent>();

export function getConditionContent(slug: string): ConditionContent {
  if (contentCache.has(slug)) return contentCache.get(slug)!;

  // Dynamic import resolved at build time via require (static analysis friendly)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require(`@/content/conditions/${slug}/sections.json`) as ConditionContent;
  contentCache.set(slug, data);
  return data;
}

export function getSection(slug: string, sectionId: string): Section | undefined {
  const content = getConditionContent(slug);
  return content.sections.find((s) => s.id === sectionId);
}

export function getAllSectionSlugs(conditionSlug: string): string[] {
  const content = getConditionContent(conditionSlug);
  return content.sections.map((s) => s.id);
}

// ── Category helpers ────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  "upper-gi": "Upper GI",
  "lower-gi": "Lower GI",
  liver: "Liver",
  pancreas: "Pancreas",
  procedure: "Procedures",
};

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] ?? category;
}

export function getConditionsByCategory(): Record<string, ConditionMeta[]> {
  const grouped: Record<string, ConditionMeta[]> = {};
  for (const c of conditions) {
    if (!grouped[c.category]) grouped[c.category] = [];
    grouped[c.category].push(c);
  }
  return grouped;
}

// ── Handout helpers ────────────────────────────────────────────────

export function getKeyTakeaways(slug: string): string[] {
  const content = getConditionContent(slug);
  const takeaways: string[] = [];

  for (const section of content.sections) {
    for (const block of section.content) {
      if (block.type === "key-points") {
        for (const p of block.points) {
          takeaways.push(`${p.heading}: ${p.text}`);
          if (takeaways.length >= 5) return takeaways;
        }
      }
    }
  }
  return takeaways;
}

export function getWhenToSeekHelp(slug: string): string[] {
  const content = getConditionContent(slug);
  for (const section of content.sections) {
    for (const block of section.content) {
      if (block.type === "when-to-seek-help") {
        return block.items.slice(0, 6);
      }
    }
  }
  return [];
}
