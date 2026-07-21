import React from "react";

export interface ComponentMetadata {
  id: string;
  name: string;
  type: string; // "CPU" | "Motherboard" | "RAM" | "GPU" | "PSU" | "SSD" | "HDD" | "Cooler" | "Case" | "Fan" | "Optical" | "Network" | "Sound" | "Paste" | "Cables"
  manufacturer: string;
  model: string;
  difficulty: "Beginner" | "Intermediate" | "Expert";
  specs: Record<string, string | number>;
  description: string;
  purpose: string;
  howItWorks: string;
  whereItConnects: string;
  facts: string;
  mistakes: string;
  color: string;
  /** Display label for grouping models within a brand, e.g. "13th Gen (Raptor Lake)" or "RTX 40 Series". Omitted for types without meaningful generations (RAM, PSU, Case, etc). */
  generation?: string;
  /** Higher = newer. Used to sort generations within a brand, newest first. */
  generationOrder?: number;
  /** Path to a real product photo (e.g. "/images/components/cpu/intel/i5-13600k.png"). Falls back to renderSvg when missing or failing to load. */
  image?: string;
  renderSvg: (className?: string) => React.ReactNode;
  quiz: {
    question: string;
    options: string[];
    answer: number; // Index of correct option
    explanation: string;
  }[];
}

export interface CategoryGroup {
  id: string;
  label: string;
  /** The underlying ComponentMetadata.type values that belong to this display category. */
  types: string[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  { id: "cpu", label: "CPU", types: ["CPU"] },
  { id: "motherboard", label: "Motherboard", types: ["Motherboard"] },
  { id: "ram", label: "RAM", types: ["RAM"] },
  { id: "gpu", label: "GPU", types: ["GPU"] },
  { id: "storage", label: "Storage (SSD/HDD)", types: ["SSD", "HDD"] },
  { id: "psu", label: "Power Supply", types: ["PSU"] },
  { id: "cooling", label: "Cooling & Fans", types: ["Cooler", "Fan"] },
  { id: "case", label: "Case", types: ["Case"] },
  { id: "other", label: "Other Peripherals", types: ["Optical", "Network", "Sound", "Paste", "Cables"] },
];

export function categoryForType(type: string): CategoryGroup | undefined {
  return CATEGORY_GROUPS.find(g => g.types.includes(type));
}

/** Groups components by manufacturer, then by generation (newest first) within each manufacturer. */
export function groupByBrandAndGeneration(components: ComponentMetadata[]) {
  const byBrand = new Map<string, ComponentMetadata[]>();
  for (const comp of components) {
    const list = byBrand.get(comp.manufacturer) ?? [];
    list.push(comp);
    byBrand.set(comp.manufacturer, list);
  }

  return Array.from(byBrand.entries()).map(([brand, items]) => {
    const byGen = new Map<string, ComponentMetadata[]>();
    for (const item of items) {
      const genKey = item.generation ?? "";
      const list = byGen.get(genKey) ?? [];
      list.push(item);
      byGen.set(genKey, list);
    }

    const generations = Array.from(byGen.entries())
      .map(([generation, models]) => ({
        generation: generation || undefined,
        order: models[0].generationOrder ?? 0,
        models
      }))
      .sort((a, b) => b.order - a.order);

    return { brand, generations };
  }).sort((a, b) => a.brand.localeCompare(b.brand));
}

export interface BuildScenario {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Expert";
  objectives: string[];
  validators: (components: Record<string, ComponentMetadata>) => { passed: boolean; reason?: string };
}
