import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getCategories, getProducts, getSiteConfig, formatPrice, type Category, type Product, type SiteConfig } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Check, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${titleize(params.slug)} — POC Alpha Omega Christian Collection` },
      { name: "description", content: `Buy ${titleize(params.slug)} from POC Alpha Omega Christian Collection.` },
      { property: "og:title", content: `${titleize(params.slug)} — POC Alpha Omega` },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `/product/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/product/${params.slug}` }],
  }),
  component: ProductPage,
  notFoundComponent: () => <div className="py-20 text-center">Product not found.</div>,
  errorComponent: ({ error }) => <div className="py-20 text-center text-destructive">{error.message}</div>,
});

function titleize(slug: string) {
  return slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

function ProductPage() {
  const { slug } = Route.useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
    getSiteConfig().then(setConfig);
  }, []);

  const product = useMemo(() => products.find((p) => p.slug === slug), [products, slug]);
  const category = useMemo(() => product && categories.find((c) => c.id === product.categoryId), [product, categories]);
  const related = useMemo(() => product ? products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4) : [], [products, product]);

  if (products.length > 0 && !product) throw notFound();
  if (!product) return <div className="py-20 text-center text-muted-foreground">Loading...</div>;

  const waMsg = encodeURIComponent(`Hi, I'm interested in: ${product.name} (${formatPrice(product.price)})`);

  return (
    <>
      <section className="bg-accent/40 border-b border-border py-4">
        <div className="container-px mx-auto max-w-7xl text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          {category && (
            <>
              <Link to="/category/$slug" params={{ slug: category.slug }} className="hover:text-primary">{category.name}</Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-foreground">{product.name}</span>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10">
          <div className="aspect-square rounded-2xl overflow-hidden bg-accent">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            {category && <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-2">{category.name}</p>}
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{product.name}</h1>
            <div className="text-3xl font-bold text-foreground mb-4">{formatPrice(product.price)}</div>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {product.features.length > 0 && (
              <ul className="space-y-2 mb-6">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-gold mt-0.5" />{f}</li>
                ))}
              </ul>
            )}

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold mb-6">
              {product.availability}
            </div>

            <div className="flex flex-wrap gap-3">
              {config && (
                <a href={`https://wa.me/${config.whatsapp}?text=${waMsg}`} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  <MessageCircle className="h-4 w-4" /> Order on WhatsApp
                </a>
              )}
              {config && (
                <a href={`tel:${config.phones[0]}`} className="btn-outline">
                  <Phone className="h-4 w-4" /> Call {config.phones[0]}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-12 bg-accent/40">
          <div className="container-px mx-auto max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
