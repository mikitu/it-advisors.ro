const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiItem<T> {
  id: number;
  documentId: string;
  attributes: T;
}

async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Types for content
export interface Testimonial {
  id: number;
  documentId: string;
  clientName: string;
  clientRole?: string;
  clientCompany?: string;
  clientImage?: { url: string };
  review: string;
  rating: number;
  featured: boolean;
}

export interface Showcase {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  clientName: string;
  clientLogo?: { url: string };
  coverImage?: { url: string };
  gallery?: { url: string }[];
  challenge?: string;
  solution?: string;
  results?: string[];
  stats?: Record<string, string | number>;
  featured: boolean;
  completedAt?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  features: string[];
  fullDescription?: string;
  order: number;
  heroImage?: { url: string };
  gallery?: { url: string }[];
  benefits?: string[];
  process?: ProcessStep[];
  stats?: Record<string, string | number>;
  testimonials?: Testimonial[];
  showcases?: Showcase[];
}

export interface Solution {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  order: number;
}

export interface ProductCategory {
  id: number;
  documentId: string;
  name: string;
  order: number;
  products?: Product[];
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  fullDescription?: string;
  sku?: string;
  price: number;
  salePrice?: number;
  stock: number;
  brand?: string;
  popularity?: number;
  icon: string;
  image?: { url: string };
  gallery?: { url: string }[];
  featured: boolean;
  order: number;
  category?: ProductCategory;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: number;
  documentId: string;
  productName: string;
  productSku?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: Product;
}

export interface Order {
  id: number;
  documentId: string;
  orderNumber: string;
  status: OrderStatus;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCounty: string;
  shippingPostalCode?: string;
  billingAddress?: string;
  billingCity?: string;
  billingCounty?: string;
  billingPostalCode?: string;
  companyName?: string;
  companyCUI?: string;
  companyRegCom?: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  notes?: string;
  items?: OrderItem[];
  createdAt: string;
}

export interface CreateOrderData {
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCounty: string;
  shippingPostalCode?: string;
  billingAddress?: string;
  billingCity?: string;
  billingCounty?: string;
  billingPostalCode?: string;
  companyName?: string;
  companyCUI?: string;
  companyRegCom?: string;
  notes?: string;
  items: {
    productId: number;
    productName: string;
    productSku?: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface BlogCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  publishedDate: string;
  readTime: string;
  category?: BlogCategory;
  featuredImage?: {
    url: string;
    alternativeText?: string;
  };
}

// API functions
export async function getServices(): Promise<Service[]> {
  const response = await fetchStrapi<Service[]>('/services?sort=order:asc&populate=*');
  return response.data || [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const response = await fetchStrapi<Service[]>(
    `/services?filters[slug][$eq]=${slug}&populate[testimonials][populate]=*&populate[showcases][populate]=*&populate=heroImage,gallery`
  );
  return response.data?.[0] || null;
}

export async function getSolutions(): Promise<Solution[]> {
  const response = await fetchStrapi<Solution[]>('/solutions?sort=order:asc&populate=*');
  return response.data || [];
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const response = await fetchStrapi<ProductCategory[]>('/product-categories?sort=order:asc&populate[products][sort]=order:asc');
  return response.data || [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetchStrapi<BlogPost[]>('/blog-posts?sort=publishedDate:desc&populate=*');
  return response.data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await fetchStrapi<BlogPost[]>(`/blog-posts?filters[slug][$eq]=${slug}&populate=*`);
  return response.data?.[0] || null;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const response = await fetchStrapi<BlogCategory[]>('/blog-categories?sort=name:asc');
  return response.data || [];
}

// Products API
export async function getProducts(): Promise<Product[]> {
  const response = await fetchStrapi<Product[]>('/products?sort=order:asc&populate=*');
  return response.data || [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await fetchStrapi<Product[]>('/products?filters[featured][$eq]=true&sort=order:asc&populate=*');
  return response.data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await fetchStrapi<Product[]>(`/products?filters[slug][$eq]=${slug}&populate=*`);
  return response.data?.[0] || null;
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const response = await fetchStrapi<Product[]>(`/products?filters[category][id][$eq]=${categoryId}&sort=order:asc&populate=*`);
  return response.data || [];
}

// Orders API
export async function createOrder(orderData: CreateOrderData): Promise<Order> {
  // Generate order number
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

  // Calculate totals
  const subtotal = orderData.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const shippingCost = subtotal >= 500 ? 0 : 25; // Free shipping over 500 RON
  const total = subtotal + shippingCost;

  // First create the order
  const orderResponse = await fetch(`${STRAPI_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        orderNumber,
        status: 'pending',
        customerEmail: orderData.customerEmail,
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        shippingAddress: orderData.shippingAddress,
        shippingCity: orderData.shippingCity,
        shippingCounty: orderData.shippingCounty,
        shippingPostalCode: orderData.shippingPostalCode,
        billingAddress: orderData.billingAddress,
        billingCity: orderData.billingCity,
        billingCounty: orderData.billingCounty,
        billingPostalCode: orderData.billingPostalCode,
        companyName: orderData.companyName,
        companyCUI: orderData.companyCUI,
        companyRegCom: orderData.companyRegCom,
        notes: orderData.notes,
        subtotal,
        shippingCost,
        total,
      }
    }),
  });

  if (!orderResponse.ok) {
    throw new Error('Failed to create order');
  }

  const { data: order } = await orderResponse.json();

  // Then create order items
  for (const item of orderData.items) {
    await fetch(`${STRAPI_URL}/api/order-items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          order: order.id,
          product: item.productId,
          productName: item.productName,
          productSku: item.productSku,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.unitPrice * item.quantity,
        }
      }),
    });
  }

  return order;
}

export async function getOrdersByEmail(email: string): Promise<Order[]> {
  const response = await fetchStrapi<Order[]>(
    `/orders?filters[customerEmail][$eq]=${encodeURIComponent(email)}&sort=createdAt:desc&populate[items][populate]=product`
  );
  return response.data || [];
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const response = await fetchStrapi<Order[]>(
    `/orders?filters[orderNumber][$eq]=${orderNumber}&populate[items][populate]=product`
  );
  return response.data?.[0] || null;
}
