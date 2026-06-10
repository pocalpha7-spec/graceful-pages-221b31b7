import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSiteConfig, type SiteConfig } from "@/lib/data";
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

function Contact() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { getSiteConfig().then(setConfig); }, []);

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

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-primary mb-2">Send a Message</h2>
            {submitted && <div className="bg-accent text-primary border border-primary/20 rounded-md p-3 text-sm">Thank you! Please reach out on phone or WhatsApp for the fastest response.</div>}
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Name" required />
              <Input label="Phone" type="tel" required />
            </div>
            <Input label="Email" type="email" />
            <Input label="Subject" />
            <Textarea label="Message" required />
            <button type="submit" className="btn-primary w-full">Send Inquiry</button>
          </form>
        </div>
      </section>
    </>
  );
}

function Input({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}{required && <span className="text-destructive"> *</span>}</span>
      <input type={type} required={required} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
function Textarea({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}{required && <span className="text-destructive"> *</span>}</span>
      <textarea required={required} rows={5} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
