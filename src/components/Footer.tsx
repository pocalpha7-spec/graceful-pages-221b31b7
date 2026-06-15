import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/poc-logo.asset.json";
import { getCategories, getSiteConfig, type Category, type SiteConfig } from "@/lib/data";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getSiteConfig()
      .then(setConfig)
      .catch(() => {});
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container-px mx-auto max-w-7xl py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.jpeg"
              alt=""
              className="h-12 w-12 rounded-full bg-primary-foreground/10 p-1"
            />
            <div>
              <div className="font-bold" style={{ fontFamily: "var(--font-display)" }}>
                POC ALPHA OMEGA CHRISTIAN PRODUCT IN INDIA
              </div>
              <div className="text-xs opacity-80">Christian Collection</div>
            </div>
          </div>
          <p className="text-sm opacity-85 leading-relaxed">{config?.tagline}</p>
        </div>

        <div>
          <h4
            className="text-base font-semibold mb-4 text-gold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/wholesale" className="hover:text-gold">
                Wholesale Inquiry
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-gold">
                Delivery & Shipping
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4
            className="text-base font-semibold mb-4 text-gold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Categories
          </h4>
          <ul className="space-y-2 text-sm opacity-90">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-gold">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            className="text-base font-semibold mb-4 text-gold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact
          </h4>
          <ul className="space-y-3 text-sm opacity-90">
            {config?.phones.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <a href={`tel:${p}`} className="hover:text-gold">
                  {p}
                </a>
              </li>
            ))}
            {config && (
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <a href={`mailto:${config.email}`} className="hover:text-gold">
                  {config.email}
                </a>
              </li>
            )}
            {config && (
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                {config.address}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-px mx-auto max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-90">
          <p>
            © {new Date().getFullYear()} {config?.name ?? "POC Alpha Omega Christian Collection"}.
            All rights reserved.
          </p>
          <p>
            Website Developed By{" "}
            <a
              href={config?.developer.url ?? "https://umidinfotech.in"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold hover:underline"
            >
              {config?.developer.name ?? "UMID Infotech"}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
