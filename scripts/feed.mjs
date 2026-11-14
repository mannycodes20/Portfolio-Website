/* Builds public/feed.xml (RSS) from your posts and projects in src/data.js.
   Runs automatically before every build (npm run build) and when you start the dev server. */
import { writeFileSync } from "node:fs";
import { PROFILE, POSTS, PROJECTS } from "../src/data.js";

const site = (
  process.env.SITE_URL ||
  PROFILE.site ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  `https://${PROFILE.github}.github.io/Portfolio-Website`
).replace(/\/$/, "");

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const date = (d) => {
  const t = d ? new Date(d) : null;
  return t && !isNaN(t) ? t.toUTCString() : null;
};

const items = [
  ...POSTS.map((p) => ({
    title: p.title,
    link: `${site}/#post-${p.slug}`,
    date: date(p.date),
    category: p.type || "Post",
    text: p.excerpt,
    html: p.body.map((x) => (x.startsWith("## ") ? `<h2>${esc(x.slice(3))}</h2>` : `<p>${esc(x)}</p>`)).join(""),
  })),
  ...PROJECTS.map((p) => ({
    title: `Project: ${p.title}`,
    link: `${site}/#project-${p.slug}`,
    date: date(p.year ? `${p.year}-01-01` : ""),
    category: p.category,
    text: p.summary,
    html: `<p>${esc(p.what)}</p>${p.links.github ? `<p><a href="${esc(p.links.github)}">Code on GitHub</a></p>` : ""}`,
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>${esc(PROFILE.name)}</title>
  <link>${site}/</link>
  <atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>${esc(PROFILE.footerBio)}</description>
  <language>en-gb</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .map(
    (it) => `  <item>
    <title>${esc(it.title)}</title>
    <link>${it.link}</link>
    <guid isPermaLink="true">${it.link}</guid>
    <category>${esc(it.category)}</category>${it.date ? `\n    <pubDate>${it.date}</pubDate>` : ""}
    <description>${esc(it.text)}</description>
    <content:encoded><![CDATA[${it.html}]]></content:encoded>
  </item>`
  )
  .join("\n")}
</channel>
</rss>
`;

writeFileSync(new URL("../public/feed.xml", import.meta.url), xml);
console.log(`feed.xml: ${items.length} items for ${site}`);
