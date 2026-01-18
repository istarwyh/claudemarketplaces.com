import { Marketplace } from "@/lib/types";
import { readInternalMarketplaces, readMarketplaces } from "@/lib/search/storage";
import { repoToSlug } from "@/lib/utils/slug";
import { TaxonomyCategory, getTaxonomyCategory } from "@/lib/config/taxonomy";

/**
 * Fetch all marketplaces with slugs computed
 * Optionally filter out marketplaces with 0 plugins
 */
export async function getAllMarketplaces(options?: {
  includeEmpty?: boolean;
}): Promise<Marketplace[]> {
  const { includeEmpty = true } = options || {};

  try {
    const [publicMarketplaces, internalMarketplaces] = await Promise.all([
      readMarketplaces(),
      readInternalMarketplaces(),
    ]);

    const internal = internalMarketplaces.map((m) => ({
      ...m,
      origin: "internal" as const,
    }));
    const publicOnes = publicMarketplaces.map((m) => ({
      ...m,
      origin: "public" as const,
    }));

    const marketplaces = [...internal, ...publicOnes];

    // Add slug to each marketplace
    const withSlugs = marketplaces.map((m) => ({
      ...m,
      slug: repoToSlug(m.repo),
    }));

    // Filter empty marketplaces if requested
    const nonEmpty = includeEmpty
      ? withSlugs
      : withSlugs.filter((m) => m.pluginCount > 0);

    return nonEmpty.sort((a, b) => {
      const aRank = a.origin === "internal" ? 0 : 1;
      const bRank = b.origin === "internal" ? 0 : 1;
      return aRank - bRank;
    });
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

export async function getTaxonomyCategories(): Promise<TaxonomyCategory[]> {
  const marketplaces = await getAllMarketplaces();
  const taxonomySet = new Set<TaxonomyCategory>();

  for (const marketplace of marketplaces) {
    const taxonomy = getTaxonomyCategory(marketplace.categories);
    taxonomySet.add(taxonomy);
  }

  return Array.from(taxonomySet);
}
