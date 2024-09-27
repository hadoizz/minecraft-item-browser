import { SitemapStream } from "sitemap";
import { readFileSync, createWriteStream } from "fs";
import path from "path";

const BASE_URL = "https://minecraft-item.weplayold.com/";

const OUTPUT_PATH = path.join(process.cwd(), "public", "sitemap.xml");

async function generateSitemap() {
  try {
    // Read items.json
    const items = JSON.parse(readFileSync(path.join(process.cwd(), "public", "js", "items.json"), "utf8"));
    console.log(items.length);

    // Create sitemap
    const sitemapStream = new SitemapStream({ hostname: BASE_URL });
    const writeStream = createWriteStream(OUTPUT_PATH);

    sitemapStream.pipe(writeStream);

    items.forEach(item => 
      sitemapStream.write({
        url: `${BASE_URL}/${item.name}`,
        changefreq: "weekly",
        priority: 0.5
      })
    );

    sitemapStream.end();

    // Ensure write stream is properly closed
    writeStream.on('finish', () => {
      console.log('Sitemap created successfully at', OUTPUT_PATH);
    });
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
