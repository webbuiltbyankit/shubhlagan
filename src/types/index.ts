export interface Product {
  id: string;
  name: string;
  displayName: string;
  slug: string;
  category: FabricCategory;
  fabric: string;
  fabricDetails?: string;
  price: number;
  mrp: number | null;
  formattedPrice: string;
  formattedMrp?: string | null;
  discount?: string | null;
  currency: string;
  primaryColor: string;
  borderDetails?: string;
  dimensions?: string;
  careInstructions?: string;
  description: string;
  availability: string;
  images: [string, string]; // Each PDP has exactly 2 photos
  thumbnail: string;
  inStock: boolean;
  badge?: string | null;
  sourcePost?: string;
  personInImage?: boolean;
  confidence?: string;
}

export type FabricCategory =
  | 'Fandy Sarees'
  | 'Georgette Sarees'
  | 'Silk Sarees'
  | 'Chiffon Sarees'
  | 'Chinon Sarees'
  | 'Crepe Sarees';

export interface CategoryMetadata {
  name: FabricCategory;
  slug: string;
  title: string;
  coverImage: string;
  count: number;
  description: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface FilterState {
  fabrics: string[];
  shades: string[];
  minPrice: number;
  maxPrice: number;
  sort: SortOption;
  searchQuery?: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export interface CheckoutFormState {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  deliveryMethod: string;
  paymentMethod: string;
}

