import { SitemapStream } from "sitemap";
import { readFileSync, createWriteStream } from "fs";
import path from "path";

// Determine base URL for production or local development
const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://minecraft-item.weplayold.com"
  : "http://localhost:8080";

// Define output path for sitemap.xml
const OUTPUT_PATH = path.resolve(process.cwd(), "public/sitemap.xml");

// Read items from the JSON file
const items = JSON.parse(readFileSync(path.resolve(process.cwd(), "public/js/items.json"), "utf-8"));
console.log(`Number of items: ${items.length}`);

// Create and write sitemap
const sitemap = new SitemapStream();
const writeStream = createWriteStream(OUTPUT_PATH);
sitemap.pipe(writeStream);

// Add items to sitemap
items.forEach(item => {
  sitemap.write({
    url: `${BASE_URL}/${item.name}`,
    changefreq: "weekly",
    priority: 0.5
  });
});

// End sitemap stream
sitemap.end();
