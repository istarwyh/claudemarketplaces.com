"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";
import { Marketplace } from "@/lib/types";
import { FilterPreset, getFilterPreset } from "@/lib/config/filter-presets";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { TaxonomyCategory, getRawCategoriesByTaxonomy } from "@/lib/config/taxonomy";

export function useMarketplaceFilters(
  marketplaces: Marketplace[],
  searchQuery: string = "" // Accept search query as parameter (local state)
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Debounce search query for better filtering performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  // Validate filter preset from URL params
  const filterParam = searchParams.get("filter");
  const filterPreset: FilterPreset =
    filterParam === "common" ? filterParam : "all";
  
  // Support both raw categories and taxonomy categories in URL
  const selectedCategories = useMemo(
    () => searchParams.get("categories")?.split(",").filter(Boolean) || [],
    [searchParams]
  );
  
  const selectedTaxonomy = useMemo(
    () => searchParams.get("taxonomy") as TaxonomyCategory | null,
    [searchParams]
  );

  const updateURL = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Filter and sort marketplaces
  const filteredMarketplaces = useMemo(() => {
    let filtered = marketplaces;

    // Search filter (searches marketplace fields + aggregated plugin keywords)
    // Uses debounced query to reduce expensive filtering on every keystroke
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.repo.toLowerCase().includes(query) ||
          m.slug.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.categories.some((cat) => cat.toLowerCase().includes(query)) ||
          m.pluginKeywords?.some((kw) => kw.includes(query))
      );
    }

    // Apply filter preset (mutually exclusive with categories)
    if (filterPreset && filterPreset !== "all") {
      const presetConfig = getFilterPreset(filterPreset);
      if (presetConfig) {
        filtered = filtered.filter(presetConfig.predicate);
      }
    }
    // Category filter (only if no preset filter is active)
    else if (selectedTaxonomy || selectedCategories.length > 0) {
      if (selectedTaxonomy) {
        // Filter by taxonomy: get all raw categories that map to this taxonomy
        const rawCategoriesForTaxonomy = getRawCategoriesByTaxonomy(selectedTaxonomy);
        filtered = filtered.filter((m) =>
          rawCategoriesForTaxonomy.some((cat) => m.categories.includes(cat))
        );
      } else {
        // Legacy: filter by raw categories
        filtered = filtered.filter((m) =>
          selectedCategories.some((cat) => m.categories.includes(cat))
        );
      }
    }

    // Sort by stars (highest first)
    return filtered.sort((a, b) => {
      const aOriginRank = a.origin === "internal" ? 0 : 1;
      const bOriginRank = b.origin === "internal" ? 0 : 1;
      if (aOriginRank !== bOriginRank) {
        return aOriginRank - bOriginRank;
      }

      const starsA = a.stars ?? 0;
      const starsB = b.stars ?? 0;
      return starsB - starsA;
    });
  }, [marketplaces, debouncedSearchQuery, filterPreset, selectedCategories, selectedTaxonomy]);

  return {
    filterPreset,
    selectedCategories,
    selectedTaxonomy,
    filteredMarketplaces,
    filteredCount: filteredMarketplaces.length,
    setFilterPreset: (preset: FilterPreset) => {
      updateURL({
        filter: preset === "all" ? null : preset,
        categories: null, // Clear categories when setting a preset
        taxonomy: null, // Clear taxonomy when setting a preset
      });
    },
    toggleCategory: (cat: string) => {
      const newCats = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat];
      updateURL({
        categories: newCats.length ? newCats.join(",") : null,
        filter: null, // Clear preset when selecting a category
        taxonomy: null, // Clear taxonomy when selecting raw category
      });
    },
    toggleTaxonomy: (taxonomy: TaxonomyCategory) => {
      updateURL({
        taxonomy: selectedTaxonomy === taxonomy ? null : taxonomy,
        categories: null, // Clear raw categories when selecting taxonomy
        filter: null, // Clear preset when selecting taxonomy
      });
    },
    clearFilters: () => updateURL({ categories: null, filter: null, taxonomy: null }),
  };
}
