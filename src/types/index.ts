export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string;
  sort_order: number;
}

export interface ProductSize {
  id: string;
  product_id: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  stock: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  category_id: string | null;
  brand: string;
  tags: string[];
  colors: ProductColor[];
  keywords: string[];
  is_trending: boolean;
  is_featured: boolean;
  is_active: boolean;
  rating_avg: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  product_images?: ProductImage[];
  product_sizes?: ProductSize[];
  categories?: Category;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  size: string;
  quantity: number;
  created_at: string;
  products?: Product & { product_images?: ProductImage[] };
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  products?: Product & { product_images?: ProductImage[] };
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  created_at: string;
  profiles?: { full_name: string; avatar_url: string };
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount: number;
  usage_limit: number;
  usage_count: number;
  is_active: boolean;
  expires_at: string | null;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  coupon_code: string;
  shipping_address: ShippingAddress;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string;
  payment_id: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_code: string;
  product_image: string;
  size: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  avatar_url: string;
  role: 'customer' | 'admin';
  created_at: string;
  updated_at: string;
}

export type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface LocalCartItem {
  product: Product & { product_images?: ProductImage[] };
  size: string;
  color: string;
  quantity: number;
}
