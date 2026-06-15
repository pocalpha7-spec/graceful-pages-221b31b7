//src/components/ProductCard.tsx
import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  console.log(product.image);
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all"
    >
      <div className="aspect-square overflow-hidden bg-accent">
        <img
          src={product.image}
          // src="https://drive.google.com/thumbnail?id=1fwV-hHW4owSh2dW_m0EUF0S4aO9IBf1s&sz=w1000"
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-foreground mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          <span className="text-xs font-medium text-gold">View →</span>
        </div>
      </div>
    </Link>
  );
}
