import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const CATEGORY_SLUGS = [
  "pastor-shirts", "pastor-ties", "pastor-gowns", "wedding-gowns",
  "bible-covers", "bsi-bibles", "pastor-stoles", "wooden-crosses",
  "key-rings", "other-church-items",
];

const STATIC_PATHS = ["/", "/products", "/about", "/contact", "/wholesale", "/shipping"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          ...STATIC_PATHS,
          ...CATEGORY_SLUGS.map((s) => `/category/${s}`),
        ];
        const urls = paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
