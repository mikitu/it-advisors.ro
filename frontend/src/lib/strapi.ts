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
  description: string;
  icon: string;
  order: number;
  category?: ProductCategory;
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

