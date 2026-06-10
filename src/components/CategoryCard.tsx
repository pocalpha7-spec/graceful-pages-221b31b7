import { Link } from "@tanstack/react-router";
import type { Category } from "@/lib/data";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className="group relative aspect-[4/5] rounded-xl overflow-hidden block"
    >
      <img src={category.image} alt={category.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
        <h3 className="font-bold text-lg leading-tight mb-1" style={{ fontFamily: "var(--font-display)" }}>{category.name}</h3>
        <p className="text-xs opacity-90 line-clamp-2">{category.description}</p>
      </div>
    </Link>
  );
}
