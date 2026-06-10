import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — POC Alpha Omega Christian Collection" },
      { name: "description", content: "Trusted supplier of Christian products, pastor accessories, BSI Bibles, ministry garments and church essentials across India." },
      { property: "og:title", content: "About POC Alpha Omega Christian Collection" },
      { property: "og:description", content: "Serving churches, pastors and ministries with quality Christian products across India." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container-px mx-auto max-w-5xl text-center">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About POC Alpha Omega Christian Collection</h1>
          <p className="opacity-90 max-w-3xl mx-auto">Faith • Hope • Love – Serving the Body of Christ</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-px mx-auto max-w-4xl prose prose-lg text-foreground">
          <p className="text-lg leading-relaxed mb-6">
            POC Alpha Omega Christian Collection is a trusted supplier of Christian products, church essentials, pastor accessories, ministry garments, Bibles, worship items, and Christian gift articles across India.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            We serve churches, pastors, ministries, Christian organizations, bookstores, and individual believers with quality products at affordable prices.
          </p>
          <p className="text-lg leading-relaxed mb-10">
            Whether you are looking for pastor attire, church communion supplies, Bible covers, Christian gifts, wooden crosses, or ministry accessories, we provide reliable products with all-India delivery.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/wholesale" className="btn-primary">Wholesale Inquiry</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
