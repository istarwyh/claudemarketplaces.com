"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";
import { Plugin } from "@/lib/types";

/**
 * Plugin filtering hook - mirrors marketplace filtering pattern
 * Manages URL-based state for search and category filters
 */
export function usePluginFilters(plugins: Plugin[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("q") || "";
  const selectedCategories = useMemo(
    () => searchParams.get("categories")?.split(",").filter(Boolean) || [],
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

  // Filter and sort plugins
  const filteredPlugins = useMemo(() => {
    let filtered = plugins;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.keywords?.some((k) => k.toLowerCase().includes(query)) ||
          p.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Sort by name alphabetically
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [plugins, searchQuery, selectedCategories]);

  return {
    searchQuery,
    selectedCategories,
    filteredPlugins,
    filteredCount: filteredPlugins.length,
    setSearchQuery: (q: string) => updateURL({ q: q || null }),
    toggleCategory: (cat: string) => {
      const newCats = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat];
      updateURL({
        categories: newCats.length ? newCats.join(",") : null,
      });
    },
    clearFilters: () => updateURL({ q: null, categories: null }),
  };
}
