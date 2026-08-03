export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subCategory?: string;
  childCategory?: string;
  sku: string;
  price: number;
  originalPrice: number;
  discount: number;
  currency: string;
  inStock: boolean;
  stockCount: number;
  images: string[];
  thumbnail: string;
  badge?: 'New' | 'Best Seller' | 'Hot' | 'Sale' | 'Limited' | 'Trending' | 'Premium' | 'Championship';
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  features: string[];
  specifications: ProductSpecification;
  careInstructions: string[];
  warranty: string;
  deliveryInfo: string;
  tags: string[];
  relatedIds: string[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isTrending: boolean;
  isLimitedEdition: boolean;
  createdAt: string;
}

export interface ProductSpecification {
  willowType: 'English Willow' | 'Kashmir Willow';
  grade: string;
  weight: string;
  handle: string;
  handleType: 'Oval' | 'Round' | 'Semi-Oval';
  spine: string;
  sweetSpot: 'Low' | 'Mid' | 'High' | 'Extended Mid';
  edges: string;
  balance: 'Light' | 'Medium' | 'Heavy' | 'End Loaded' | 'Balanced';
  face: string;
  bow: string;
  playerLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional' | 'Junior';
  playStyle: string;
  surface: string;
  origin: string;
  warranty: string;
  grainCount: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  banner?: string;
  productCount: number;
  icon?: string;
  color?: string;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: { [key: string]: string };
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CompareItem {
  product: Product;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  team?: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  product?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  experience: string;
  social?: { linkedin?: string; twitter?: string; }
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  milestone?: boolean;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  maxDiscount?: number;
  description: string;
  valid: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  billing: Address;
  shipping: Address;
  paymentMethod: string;
  subtotal: number;
  gst: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  coupon?: Coupon;
}

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface PromoOffer {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  cta: string;
  link: string;
  bgColor?: string;
}
