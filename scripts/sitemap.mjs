import { SitemapStream } from "sitemap";
import { readFileSync, createWriteStream } from "fs";

const BASE_URL = process.env.GITHUB_ACTIONS
  ? "https://minecraft-item.weplayold.com/"
  : "http://localhost:8080/";

const OUTPUT_PATH = process.env.GITHUB_ACTIONS
  ? "./dist/sitemap.xml"
  : "./public/sitemap.xml";

const items = JSON.parse(readFileSync("./public/js/items.json"));
console.log(items.length);

const sitemap = new SitemapStream();
const writeStream = createWriteStream(OUTPUT_PATH);
sitemap.pipe(writeStream);

items.map(item =>
  sitemap.write({
    url: `${BASE_URL}/${item.name}`,
    changefreq: "weekly",
    priority: 0.5
  })
);

sitemap.end();
