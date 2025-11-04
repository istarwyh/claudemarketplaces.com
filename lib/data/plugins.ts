import { Plugin } from "@/lib/types";
import { readPlugins } from "@/lib/search/storage";

/**
 * Fetch all plugins across all marketplaces
 */
export async function getAllPlugins(): Promise<Plugin[]> {
  try {
    return await readPlugins();
  } catch (error) {
    console.error("Error fetching plugins:", error);
    return [];
  }
}

/**
 * Get plugins for a specific marketplace by slug
 */
export async function getPluginsByMarketplace(slug: string): Promise<Plugin[]> {
  const plugins = await getAllPlugins();
  return plugins.filter(p => p.marketplace === slug);
}

/**
 * Get unique categories from plugins in a marketplace
 */
export async function getPluginCategories(marketplaceSlug: string): Promise<string[]> {
  const plugins = await getPluginsByMarketplace(marketplaceSlug);
  const categories = new Set<string>();

  plugins.forEach(plugin => {
    if (plugin.category) {
      categories.add(plugin.category);
    }
  });

  return Array.from(categories).sort();
}
