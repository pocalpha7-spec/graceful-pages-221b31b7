import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getCategories, type Category } from "@/lib/data";
import { CategoryCard } from "@/components/CategoryCard";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Categories — POC Alpha Omega Christian Collection" },
      { name: "description", content: "Browse all Christian product categories — pastor garments, Bibles, communion supplies, crosses and gifts." },
      { property: "og:title", content: "All Categories — POC Alpha Omega" },
      { property: "og:description", content: "Explore our complete Christian product range." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => { getCategories().then(setCategories); }, []);

  return (
    <>
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container-px mx-auto max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Collection</h1>
          <p className="opacity-90 max-w-2xl mx-auto">Browse all categories of Christian products and church essentials.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="container-px mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>
    </>
  );
}
