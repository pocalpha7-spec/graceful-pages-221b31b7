// src/lib/data.ts

import { loadSheet } from "./googleSheets";

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

  if (!res.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return res.json() as Promise<T>;
}

// Still using JSON
export const getSiteConfig = () =>
  loadJson<SiteConfig>("/data/site-config.json");

export const getHeroSlides = () =>
  loadJson<HeroSlide[]>("/data/hero-slides.json");

export const getTestimonials = () =>
  loadJson<Testimonial[]>("/data/testimonials.json");

// Now using Google Sheets
export const getCategories = async (): Promise<Category[]> => {
  return await loadSheet<Category>("Categories");
};

export const getProducts = async (): Promise<Product[]> => {
  const data = await loadSheet<any>("Products");

  return data.map((item) => ({
    ...item,

    // Convert string -> number
    price: Number(item.price),

    // Convert comma-separated string -> array
    gallery: item.gallery
      ? item.gallery.split(",").map((x: string) => x.trim())
      : [],

    // Convert comma-separated string -> array
    features: item.features
      ? item.features.split(",").map((x: string) => x.trim())
      : [],
  }));
};

export const formatPrice = (n: number) =>
  `₹${n.toLocaleString("en-IN")}`;