import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/poc-logo.asset.json";
import { getCategories, type Category } from "@/lib/data";
import { Menu, X, ChevronDown } from "lucide-react";

export function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  console.log("logoAsset", logoAsset);

  return (
    <header
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-md" : "border-b border-border"}`}
    >
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="POC Alpha Omega Christian Collection logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-foreground object-contain p-1"
          />
          <div className="hidden sm:block leading-tight">
            <div
              className="text-sm md:text-base font-bold text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              POC Alpha Omega
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground">Christian Collection</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-primary"
            activeProps={{ className: "text-primary" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-primary">
              Products <ChevronDown className="h-4 w-4" />
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 pt-2 w-64">
                <div className="bg-card border border-border rounded-lg shadow-xl py-2">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link
            to="/wholesale"
            className="hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Wholesale Inquiry
          </Link>
          <Link
            to="/about"
            className="hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            About Us
          </Link>
          <Link
            to="/shipping"
            className="hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Shipping
          </Link>
          <Link
            to="/contact"
            className="hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Contact
          </Link>
        </nav>

        <Link to="/contact" className="hidden lg:inline-flex btn-primary !py-2 !px-4 text-sm">
          Get In Touch
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-md hover:bg-accent"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
          <div className="container-px mx-auto py-4 flex flex-col gap-1 text-sm">
            <Link to="/" onClick={() => setOpen(false)} className="py-2">
              Home
            </Link>
            <div className="py-2 font-semibold text-primary">Products</div>
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="pl-4 py-2 text-muted-foreground"
              >
                {c.name}
              </Link>
            ))}
            <Link to="/wholesale" onClick={() => setOpen(false)} className="py-2">
              Wholesale Inquiry
            </Link>
            <Link to="/about" onClick={() => setOpen(false)} className="py-2">
              About Us
            </Link>
            <Link to="/shipping" onClick={() => setOpen(false)} className="py-2">
              Shipping
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="py-2">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
