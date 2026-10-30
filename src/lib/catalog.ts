import rawCatalog from '../data/catalog.json';
import { Product, FabricCategory, CategoryMetadata, SortOption } from '../types';

export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}

export const products: Product[] = (rawCatalog as any[]).map((item) => ({
  id: item.id,
  name: item.name,
  displayName: item.displayName || `${item.name} — ${item.id}`,
  slug: item.slug,
  category: item.category as FabricCategory,
  fabric: item.fabric,
  fabricDetails: item.fabricDetails || '',
  price: Number(item.price),
  mrp: item.mrp ? Number(item.mrp) : null,
  formattedPrice: formatINR(Number(item.price)),
  formattedMrp: item.mrp ? formatINR(Number(item.mrp)) : null,
  discount: item.mrp && Number(item.mrp) > Number(item.price) 
    ? `Save ${Math.round(((Number(item.mrp) - Number(item.price)) / Number(item.mrp)) * 100)}%`
    : null,
  currency: item.currency || 'INR',
  primaryColor: item.primaryColor || 'Multicolor',
  borderDetails: item.borderDetails || '',
  dimensions: item.dimensions || 'Saree: 5.5 meters, Blouse: 0.80 meter',
  careInstructions: item.careInstructions || 'Dry Clean Only recommended',
  description: item.description || '',
  availability: item.availability || 'in_stock',
  images: [getAssetUrl(item.images[0]), getAssetUrl(item.images[1])] as [string, string],
  thumbnail: getAssetUrl(item.thumbnail || item.images[0]),
  inStock: item.inStock ?? true,
  badge: item.badge || null,
  sourcePost: item.sourcePost || '',
  personInImage: item.personInImage ?? false,
  confidence: item.confidence || 'high'
}));

export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateSavings(mrp: number | null, price: number): { amount: number; percentage: number } | null {
  if (!mrp || mrp <= price) return null;
  const amount = mrp - price;
  const percentage = Math.round((amount / mrp) * 100);
  return { amount, percentage };
}

export const CATEGORY_DEFINITIONS: { name: FabricCategory; slug: string; title: string; cover: string; description: string }[] = [
  {
    name: 'Fandy Sarees',
    slug: 'fandy-sarees',
    title: 'Fandy Sarees',
    cover: getAssetUrl('/images/collections/fandy_sarees_cover.jpg'),
    description: 'Textured surfaces and rich celebratory embroidery crafted for timeless festive wear.'
  },
  {
    name: 'Georgette Sarees',
    slug: 'georgette-sarees',
    title: 'Georgette Sarees',
    cover: getAssetUrl('/images/collections/georgette_sarees_cover.jpg'),
    description: 'Lightweight fluid silhouettes that flow with graceful movement and modern poise.'
  },
  {
    name: 'Silk Sarees',
    slug: 'silk-sarees',
    title: 'Silk Sarees',
    cover: getAssetUrl('/images/collections/silk_sarees_cover.jpg'),
    description: 'Lustrous, heirloom drapes with classic woven motifs and dignified sheen.'
  },
  {
    name: 'Chiffon Sarees',
    slug: 'chiffon-sarees',
    title: 'Chiffon Sarees',
    cover: getAssetUrl('/images/collections/chiffon_sarees_cover.jpg'),
    description: 'Delicate, airy, gossamer textures for effortless day-to-evening dressing.'
  },
  {
    name: 'Chinon Sarees',
    slug: 'chinon-sarees',
    title: 'Chinon Sarees',
    cover: getAssetUrl('/images/collections/chinon_sarees_cover.jpg'),
    description: 'Subtle sheen with fine crepe drape, ideal for refined celebratory ensembles.'
  },
  {
    name: 'Crepe Sarees',
    slug: 'crepe-sarees',
    title: 'Crepe Sarees',
    cover: getAssetUrl('/images/collections/crepe_sarees_cover.jpg'),
    description: 'Crisp structured drape with modern aesthetic lines and graceful fall.'
  }
];

export function getCategories(): CategoryMetadata[] {
  return CATEGORY_DEFINITIONS.map(def => {
    const count = products.filter(p => p.category === def.name).length;
    return {
      name: def.name,
      slug: def.slug,
      title: def.title,
      coverImage: def.cover,
      count,
      description: def.description
    };
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id.toUpperCase() === id.toUpperCase());
}

export function getCategoryBySlug(slug: string): CategoryMetadata | undefined {
  return getCategories().find(c => c.slug.toLowerCase() === slug.toLowerCase());
}

export function getProductsByCategory(categoryName: FabricCategory): Product[] {
  return products.filter(p => p.category === categoryName);
}

export function getAllShades(): string[] {
  const shadeSet = new Set<string>();
  products.forEach(p => {
    if (p.primaryColor) {
      shadeSet.add(p.primaryColor.trim());
    }
  });
  return Array.from(shadeSet).sort();
}

export function getPriceBounds(): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  products.forEach(p => {
    if (p.price < min) min = p.price;
    if (p.price > max) max = p.price;
  });
  return { min, max };
}

export function filterAndSortProducts(options: {
  fabrics?: string[];
  shades?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  query?: string;
  categorySlug?: string;
}): Product[] {
  let filtered = [...products];

  // Specific category page slug constraint
  if (options.categorySlug) {
    const cat = getCategoryBySlug(options.categorySlug);
    if (cat) {
      filtered = filtered.filter(p => p.category === cat.name);
    } else {
      return [];
    }
  }

  // Fabric filter
  if (options.fabrics && options.fabrics.length > 0) {
    filtered = filtered.filter(p => options.fabrics!.includes(p.category));
  }

  // Shade filter
  if (options.shades && options.shades.length > 0) {
    filtered = filtered.filter(p => options.shades!.includes(p.primaryColor));
  }

  // Price range
  if (options.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= options.minPrice!);
  }
  if (options.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= options.maxPrice!);
  }

  // Query search
  if (options.query && options.query.trim()) {
    const q = options.query.toLowerCase().trim();
    filtered = filtered.filter(p => {
      const haystack = `${p.name} ${p.id} ${p.category} ${p.fabric} ${p.primaryColor} ${p.borderDetails || ''} ${p.description || ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }

  // Sort
  switch (options.sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price || a.id.localeCompare(b.id));
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price || a.id.localeCompare(b.id));
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
      break;
    case 'featured':
    default:
      // Keep original curated catalog order
      break;
  }

  return filtered;
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  const current = getProductById(currentId);
  if (!current) return products.slice(0, limit);

  // Prioritize same fabric category, then complementary shade, exclude current
  const others = products.filter(p => p.id !== currentId);
  const sameCategory = others.filter(p => p.category === current.category);
  const differentCategory = others.filter(p => p.category !== current.category);

  return [...sameCategory, ...differentCategory].slice(0, limit);
}

