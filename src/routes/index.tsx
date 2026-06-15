import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HeroSlider } from "@/components/HeroSlider";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProducts, getTestimonials, getSiteConfig, type Category, type Product, type Testimonial, type SiteConfig } from "@/lib/data";
import { Check, Star, Truck, ShieldCheck, Phone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "POC Alpha Omega Christian Collection — Pastor Gowns, BSI Bibles & Church Supplies" },
      { name: "description", content: "Faith • Hope • Love. Premium pastor shirts, gowns, BSI Bibles, communion supplies and church essentials. Wholesale & all-India delivery." },
      { property: "og:title", content: "POC Alpha Omega Christian Collection" },
      { property: "og:description", content: "Premium Christian products, pastor garments, Bibles and church essentials across India." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    getCategories().then(setCategories);
    getProducts().then(setProducts);
    getTestimonials().then(setTestimonials);
    getSiteConfig().then(setConfig);
  }, []);

  return (
    <>
      <HeroSlider />

      {/* Welcome */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container-px mx-auto max-w-5xl text-center">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">Welcome to POC ALPHA OMEGA CHRISTIAN PRODUCT</p>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Serving the Body of Christ Across India</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            We are a trusted supplier of Christian products, church essentials, pastor accessories, ministry garments, Bibles, worship items and Christian gift articles — delivered to churches, ministries and believers nationwide.
          </p>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-accent/40">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Shop By Category</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Featured Collections</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.slice(0, 10).map((c) => <CategoryCard key={c.id} category={c} />)}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Bestsellers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Featured Products</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold">Built On Faith. Trusted For Quality.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {config?.whyChooseUs.map((w) => (
              <div key={w.title} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6 hover:bg-primary-foreground/10 transition">
                <div className="h-10 w-10 rounded-full bg-gold text-gold-foreground flex items-center justify-center mb-4">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{w.title}</h3>
                <p className="text-sm opacity-85">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Church Supply */}
      <section className="py-16">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Church Supplies</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Everything Your Ministry Needs</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              From communion sets and prayer cloths to wooden crosses and Bible covers — equip your congregation with quality essentials sourced for ministry use.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/category/$slug" params={{ slug: "other-church-items" }} className="btn-primary">Browse Supplies</Link>
              <Link to="/wholesale" className="btn-outline">Bulk Orders</Link>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1200&q=80" alt="Church supplies" className="rounded-2xl aspect-[4/3] object-cover" loading="lazy" />
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="py-16 bg-accent/40">
        <div className="container-px mx-auto max-w-6xl bg-gradient-to-br from-primary to-primary/85 rounded-3xl p-10 md:p-14 text-primary-foreground relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Wholesale Orders for Churches & Ministries</h2>
              <p className="opacity-90 max-w-xl">Special pricing and dedicated support for bulk orders. Perfect for churches, Christian schools, bookstores and mission organizations.</p>
            </div>
            <Link to="/wholesale" className="btn-gold whitespace-nowrap">Submit Inquiry</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Loved By Ministries</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex gap-0.5 mb-3 text-gold">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">"{t.quote}"</p>
                <div className="text-sm">
                  <div className="font-semibold text-primary">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-12 bg-accent/40 border-y border-border">
        <div className="container-px mx-auto max-w-7xl grid sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: Truck, title: "All India Delivery", text: "Reliable nationwide dispatch" },
            { icon: ShieldCheck, title: "Authentic Products", text: "Genuine BSI Bibles & quality garments" },
            { icon: Phone, title: "Direct Support", text: "Call 9451005232 / 9889728815" },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-4 justify-center">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <b.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-primary">{b.title}</div>
                <div className="text-sm text-muted-foreground">{b.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
