import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getCategories, getProducts, type Category, type Product } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Search } from "lucide-react";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${slugTitle(params.slug)} — POC Alpha Omega Christian Collection` },
      { name: "description", content: `Shop ${slugTitle(params.slug)} from POC Alpha Omega — quality Christian products with all-India delivery.` },
      { property: "og:title", content: `${slugTitle(params.slug)} — POC Alpha Omega` },
      { property: "og:description", content: `Browse our ${slugTitle(params.slug)} collection.` },
      { property: "og:url", content: `/category/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/category/${params.slug}` }],
  }),
  component: CategoryPage,
  notFoundComponent: () => <div className="py-20 text-center">Category not found.</div>,
  errorComponent: ({ error }) => <div className="py-20 text-center text-destructive">{error.message}</div>,
});

function slugTitle(slug: string) {
  return slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

function CategoryPage() {
  const { slug } = Route.useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getCategories().then(setCategories);
    getProducts().then(setProducts);
  }, []);

  const category = useMemo(() => categories.find((c) => c.slug === slug), [categories, slug]);
  const filtered = useMemo(() => {
    const list = products.filter((p) => p.categoryId === slug);
    if (!query) return list;
    const q = query.toLowerCase();
    return list.filter((p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q));
  }, [products, slug, query]);

  if (categories.length > 0 && !category) {
    throw notFound();
  }

  return (
    <>
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container-px mx-auto max-w-7xl">
          <nav className="text-sm opacity-80 mb-4">
            <Link to="/" className="hover:text-gold">Home</Link> <span className="mx-1">/</span> <span>{category?.name ?? slugTitle(slug)}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{category?.name ?? slugTitle(slug)}</h1>
          {category?.description && <p className="opacity-90 max-w-2xl">{category.description}</p>}
        </div>
      </section>

      <section className="py-12">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="text-sm text-muted-foreground">{filtered.length} product{filtered.length !== 1 && "s"}</div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search in this category..."
                className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">No products found.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
