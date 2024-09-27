import { SitemapStream } from "sitemap";
import { readFileSync, createWriteStream } from "fs";
import path from "path";

// Use the URL of your deployed site
const BASE_URL = "https://minecraft-item.weplayold.com";

// Adjust the OUTPUT_PATH based on the deployment environment
const OUTPUT_PATH = path.join(process.cwd(), "public", "sitemap.xml");

// Read items.json from the public directory
const items = JSON.parse(readFileSync(path.join(process.cwd(), "public", "js", "items.json"), "utf8"));
console.log(items.length);

// Create sitemap and write it to the specified output path
const sitemap = new SitemapStream({ hostname: BASE_URL });
const writeStream = createWriteStream(OUTPUT_PATH);

sitemap.pipe(writeStream);

items.forEach(item =>
  sitemap.write({
    url: `${BASE_URL}/${item.name}`,
    changefreq: "weekly",
    priority: 0.5
  })
);

sitemap.end();

writeStream.on('finish', () => {
  console.log('Sitemap created successfully at', OUTPUT_PATH);
});
