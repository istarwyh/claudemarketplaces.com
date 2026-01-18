"use client";

import { useState } from "react";
import { MarketplaceGrid } from "@/components/marketplace-grid";
import { MarketplaceSearch } from "@/components/marketplace-search";
import { Badge } from "@/components/ui/badge";
import { useMarketplaceFilters } from "@/lib/hooks/use-marketplace-filters";
import { Marketplace } from "@/lib/types";
import { FILTER_PRESETS } from "@/lib/config/filter-presets";
import { getCategoryLabel } from "@/lib/config/category-labels";
import { TAXONOMY_CATEGORIES, getTaxonomyConfig } from "@/lib/config/taxonomy";

interface MarketplaceContentProps {
  marketplaces: Marketplace[];
  taxonomyCategories: string[];
}

export function MarketplaceContent({
  marketplaces,
  taxonomyCategories,
}: MarketplaceContentProps) {
  // Local state for search query (not in URL)
  const [searchQuery, setSearchQuery] = useState("");

  const {
    filterPreset,
    selectedCategories,
    selectedTaxonomy,
    filteredMarketplaces,
    filteredCount,
    setFilterPreset,
    toggleCategory,
    toggleTaxonomy,
    clearFilters: clearUrlFilters,
  } = useMarketplaceFilters(marketplaces, searchQuery);

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedTaxonomy !== null ||
    (filterPreset && filterPreset !== "all");

  // Clear both local search and URL filters
  const clearFilters = () => {
    setSearchQuery("");
    clearUrlFilters();
  };

  return (
    <div className="container mx-auto px-4 pt-8">
      {/* Search Bar */}
      <div className="mb-6">
        <MarketplaceSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Horizontal Scrollable Filter Presets and Categories */}
      <div className="mb-6 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {/* Filter Presets */}
          {FILTER_PRESETS.map((preset) => (
            <Badge
              key={preset.id}
              variant={filterPreset === preset.id ? "default" : "outline"}
              className="cursor-pointer capitalize shrink-0"
              onClick={() => setFilterPreset(preset.id)}
            >
              {preset.label}
            </Badge>
          ))}
          {/* Taxonomy Category Filters */}
          {TAXONOMY_CATEGORIES.filter(cat => taxonomyCategories.includes(cat.id)).map((taxonomy) => {
            const isSelected = selectedTaxonomy === taxonomy.id;
            return (
              <Badge
                key={taxonomy.id}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer shrink-0"
                onClick={() => toggleTaxonomy(taxonomy.id)}
              >
                {taxonomy.label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          共 {filteredCount} 个市场
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:underline"
          >
            清除筛选
          </button>
        )}
      </div>

      {/* Marketplace Grid */}
      {filteredMarketplaces.length > 0 ? (
        <MarketplaceGrid marketplaces={filteredMarketplaces} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            未找到符合当前条件的市场。
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-primary hover:underline"
            >
              清除全部筛选
            </button>
          )}
        </div>
      )}
    </div>
  );
}
