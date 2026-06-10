import { createFileRoute } from "@tanstack/react-router";
import { Truck, Package, Clock, MapPin, Boxes } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Delivery & Shipping — POC Alpha Omega Christian Collection" },
      { name: "description", content: "All-India delivery, secure packaging and reliable dispatch for Christian products, Bibles and church supplies. Bulk order shipping available." },
      { property: "og:title", content: "Delivery & Shipping Policy" },
      { property: "og:description", content: "Reliable nationwide shipping for churches, ministries and individual customers." },
      { property: "og:url", content: "/shipping" },
    ],
    links: [{ rel: "canonical", href: "/shipping" }],
  }),
  component: Shipping,
});

const items = [
  { icon: MapPin, title: "Delivery Coverage", text: "We dispatch to all states across India through trusted courier and logistics partners." },
  { icon: Package, title: "Secure Packaging", text: "Every order is carefully packed to protect Bibles, garments and fragile communion items." },
  { icon: Truck, title: "Dispatch Process", text: "Orders are typically processed within 1–2 business days of confirmation." },
  { icon: Clock, title: "Estimated Timelines", text: "Metro cities: 3–5 business days. Other locations: 5–8 business days." },
  { icon: Boxes, title: "Bulk Order Shipping", text: "Wholesale and bulk orders ship via dedicated freight; timelines confirmed at order time." },
];

function Shipping() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-px mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Delivery & Shipping</h1>
          <p className="opacity-90 max-w-2xl mx-auto">Reliable, all-India delivery for churches, ministries and believers.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-px mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
          {items.map((i) => (
            <div key={i.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition">
              <div className="h-12 w-12 rounded-full bg-accent text-primary flex items-center justify-center mb-4">
                <i.icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-primary mb-2">{i.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{i.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
