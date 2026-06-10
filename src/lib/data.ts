export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phones: string[];
  whatsapp: string;
  email: string;
  address: string;
  developer: { name: string; url: string };
  social: { facebook: string; instagram: string; youtube: string };
  whyChooseUs: { title: string; description: string }[];
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  price: number;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  availability: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

async function loadJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json() as Promise<T>;
}

export const getSiteConfig = () => loadJson<SiteConfig>("/data/site-config.json");
export const getHeroSlides = () => loadJson<HeroSlide[]>("/data/hero-slides.json");
export const getCategories = () => loadJson<Category[]>("/data/categories.json");
export const getProducts = () => loadJson<Product[]>("/data/products.json");
export const getTestimonials = () => loadJson<Testimonial[]>("/data/testimonials.json");

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
