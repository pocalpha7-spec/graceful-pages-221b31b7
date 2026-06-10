import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getSiteConfig, getCategories, getProducts, type SiteConfig, type Category, type Product } from "@/lib/data";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — POC Alpha Omega Christian Collection" },
      { name: "description", content: "Get in touch with POC Alpha Omega — call 9451005232 / 9889728815 or send an inquiry for Christian products and wholesale orders." },
      { property: "og:title", content: "Contact POC Alpha Omega Christian Collection" },
      { property: "og:description", content: "Reach our team for orders, custom requests and bulk inquiries." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const INQUIRY_WHATSAPP = "919451005232";

function Contact() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSiteConfig().then(setConfig);
    getCategories().then(setCategories);
    getProducts().then(setProducts);
  }, []);

  const filteredProducts = useMemo(
    () => (categoryId ? products.filter((p) => p.categoryId === categoryId) : []),
    [products, categoryId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === categoryId);
    const prod = products.find((p) => p.id === productId);
    const lines = [
      "New Inquiry from POC Alpha Omega website",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Category: ${cat?.name ?? "Not specified"}`,
      `Product: ${prod?.name ?? "Any / Not sure"}`,
      `Message: ${message}`,
    ];
    const url = `https://wa.me/${INQUIRY_WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-px mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="opacity-90">We'd love to hear from you — churches, ministries, retailers and believers welcome.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-px mx-auto max-w-6xl grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-primary mb-4">Get In Touch</h2>
            {config?.phones.map((p) => (
              <a key={p} href={`tel:${p}`} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-accent transition">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Phone className="h-5 w-5" /></div>
                <div><div className="text-xs text-muted-foreground">Call us</div><div className="font-semibold text-foreground">{p}</div></div>
              </a>
            ))}
            {config && (
              <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-accent transition">
                <div className="h-12 w-12 rounded-full bg-gold text-gold-foreground flex items-center justify-center"><MessageCircle className="h-5 w-5" /></div>
                <div><div className="text-xs text-muted-foreground">Chat with us</div><div className="font-semibold text-foreground">WhatsApp</div></div>
              </a>
            )}
            {config && (
              <a href={`mailto:${config.email}`} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-accent transition">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Mail className="h-5 w-5" /></div>
                <div><div className="text-xs text-muted-foreground">Email</div><div className="font-semibold text-foreground">{config.email}</div></div>
              </a>
            )}
            {config && (
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><MapPin className="h-5 w-5" /></div>
                <div><div className="text-xs text-muted-foreground">Service Area</div><div className="font-semibold text-foreground">All India Delivery</div></div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-2">Send a Message</h2>
            <p className="text-xs text-muted-foreground -mt-1 mb-2">
              Submitting opens WhatsApp with your inquiry pre-filled — just tap send.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-foreground">Name <span className="text-destructive">*</span></span>
                <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">Phone <span className="text-destructive">*</span></span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Category</span>
              <select
                value={categoryId}
                onChange={(e) => { setCategoryId(e.target.value); setProductId(""); }}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Product</span>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                disabled={!categoryId}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">{categoryId ? "Any / Not sure" : "Select a category first"}</option>
                {filteredProducts.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Message <span className="text-destructive">*</span></span>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Tell us about your requirement, quantity, location..." />
            </label>

            <button type="submit" className="btn-gold w-full">
              <MessageCircle className="h-4 w-4" /> Send via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
