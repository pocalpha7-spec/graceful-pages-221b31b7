import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, BookOpen, Store, GraduationCap, HeartHandshake, Gift } from "lucide-react";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale Inquiry — POC Alpha Omega Christian Collection" },
      { name: "description", content: "Bulk Christian products for churches, ministries, Christian schools, Bible colleges, bookstores and gift shops. Submit your wholesale inquiry today." },
      { property: "og:title", content: "Wholesale Christian Products — POC Alpha Omega" },
      { property: "og:description", content: "Special pricing for bulk orders of Bibles, pastor garments, communion supplies and church essentials." },
      { property: "og:url", content: "/wholesale" },
    ],
    links: [{ rel: "canonical", href: "/wholesale" }],
  }),
  component: Wholesale,
});

const targets = [
  { icon: Building2, label: "Churches" },
  { icon: HeartHandshake, label: "Ministries" },
  { icon: GraduationCap, label: "Christian Schools" },
  { icon: BookOpen, label: "Bible Colleges" },
  { icon: Store, label: "Bookstores" },
  { icon: Gift, label: "Gift Shops" },
];

function Wholesale() {
  const [done, setDone] = useState(false);
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-px mx-auto max-w-5xl text-center">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">Wholesale Program</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Wholesale Inquiry</h1>
          <p className="opacity-90 max-w-2xl mx-auto">Special pricing and dedicated support for churches, ministries and stores ordering in bulk.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-px mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">Who We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {targets.map((t) => (
              <div key={t.label} className="bg-card border border-border rounded-xl p-5 text-center hover:shadow-md transition">
                <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-accent text-primary flex items-center justify-center">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-medium text-foreground">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-accent/40">
        <div className="container-px mx-auto max-w-3xl">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-2">Submit Your Inquiry</h2>
            <p className="text-muted-foreground text-sm mb-6">Tell us about your organization and what you'd like to order. Our team will get back within 24 hours.</p>
            {done && <div className="bg-accent text-primary border border-primary/20 rounded-md p-3 text-sm mb-4">Inquiry recorded. For the fastest response please call 9451005232.</div>}
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Organization Name" required />
                <Field label="Contact Person" required />
                <Field label="Phone" type="tel" required />
                <Field label="Email" type="email" />
                <Field label="City" />
                <Field label="State" />
              </div>
              <Select label="Organization Type" options={["Church", "Ministry", "Christian School", "Bible College", "Bookstore", "Gift Shop", "Other"]} />
              <label className="block">
                <span className="text-sm font-medium">Products of Interest & Quantity</span>
                <textarea rows={5} required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. 50 Pastor Gowns, 100 BSI Hindi Bibles, 200 Bible Covers..." />
              </label>
              <button className="btn-primary w-full">Send Wholesale Inquiry</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}{required && <span className="text-destructive"> *</span>}</span>
      <input type={type} required={required} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
