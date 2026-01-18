import { Marketplace } from "@/lib/types";

/**
 * Filter preset identifiers
 * Presets are mutually exclusive with category filters
 */
export type FilterPreset = "all" | "common";

/**
 * Configuration for a filter preset
 */
export interface FilterPresetConfig {
  id: FilterPreset;
  label: string;
  description: string;
  predicate: (marketplace: Marketplace) => boolean;
}

/**
 * Check if a marketplace is in the common list
 * Common marketplaces are curated for frequent use
 */
export function isCommonMarketplace(marketplace: Marketplace): boolean {
  const commonMarketplaces = [
    "anthropics/claude-code",
    "upstash/context7", 
    "ChromeDevTools/chrome-devtools-mcp",
    "ccplugins/awesome-claude-code-plugins"
  ];
  
  return commonMarketplaces.includes(marketplace.repo);
}

/**
 * All available filter presets
 * Order determines display order in UI
 */
export const FILTER_PRESETS: FilterPresetConfig[] = [
  {
    id: "all",
    label: "全部",
    description: "显示全部市场",
    predicate: () => true,
  },
  {
    id: "common",
    label: "常用",
    description: "显示常用的精选市场",
    predicate: isCommonMarketplace,
  },
];

/**
 * Get a filter preset by ID
 */
export function getFilterPreset(id: string): FilterPresetConfig | undefined {
  return FILTER_PRESETS.find((preset) => preset.id === id);
}
