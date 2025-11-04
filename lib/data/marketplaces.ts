import { Marketplace } from "@/lib/types";
import { readMarketplaces } from "@/lib/search/storage";
import { repoToSlug } from "@/lib/utils/slug";

/**
 * Fetch all marketplaces with slugs computed
 * Optionally filter out marketplaces with 0 plugins
 */
export async function getAllMarketplaces(options?: {
  includeEmpty?: boolean;
}): Promise<Marketplace[]> {
  const { includeEmpty = true } = options || {};

  try {
    const marketplaces = await readMarketplaces();

    // Add slug to each marketplace
    const withSlugs = marketplaces.map(m => ({
      ...m,
      slug: repoToSlug(m.repo),
    }));

    // Filter empty marketplaces if requested
    if (!includeEmpty) {
      return withSlugs.filter(m => m.pluginCount > 0);
    }

    return withSlugs;
  } catch (error) {
    console.error("Error fetching marketplaces:", error);
    return [];
  }
}

/**
 * Get a single marketplace by slug
 */
export async function getMarketplaceBySlug(slug: string): Promise<Marketplace | null> {
  const marketplaces = await getAllMarketplaces();
  return marketplaces.find(m => m.slug === slug) || null;
}

export async function getMarketplacesByCategory(
  category: string
): Promise<Marketplace[]> {
  const marketplaces = await getAllMarketplaces();
  return marketplaces.filter((m) => m.categories.includes(category));
}

export async function getCategories(): Promise<string[]> {
  const marketplaces = await getAllMarketplaces();
  const categories = new Set(marketplaces.flatMap((m) => m.categories));
  return Array.from(categories).sort();
}
