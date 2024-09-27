import { SitemapStream } from "sitemap";
import { readFileSync, createWriteStream } from "fs";

// Set BASE_URL to your production domain and fallback to localhost for development
const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://minecraft-item.weplayold.com"  // Your live domain on Vercel
  : "http://localhost:8080";  // Local development URL

// Output the sitemap in the public directory (works for both development and Vercel)
const OUTPUT_PATH = "./public/sitemap.xml";

// Read items from the JSON file
const items = JSON.parse(readFileSync("./public/js/items.json"));
console.log(`Number of items: ${items.length}`);

// Create the sitemap stream
const sitemap = new SitemapStream();
const writeStream = createWriteStream(OUTPUT_PATH);
sitemap.pipe(writeStream);

// Add each item to the sitemap
items.forEach(item => {
  sitemap.write({
    url: `${BASE_URL}/${item.name}`,
    changefreq: "weekly",
    priority: 0.5
  });
});

// End the sitemap stream
sitemap.end();
