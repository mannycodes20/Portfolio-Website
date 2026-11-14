/* Pulls your public GitHub repos (stars, language, last push) into src/github.json.
   Runs every night from .github/workflows/sync-github.yml, and you can run it yourself:
     npm run sync
   Without a token GitHub allows 60 requests an hour, which is plenty for this. */
import { writeFileSync } from "node:fs";
import { PROFILE } from "../src/data.js";

const user = PROFILE.github;
const headers = { "User-Agent": "portfolio-sync", Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const get = async (url) => {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} for ${url}`);
  return r.json();
};

const profile = await get(`https://api.github.com/users/${user}`);
const list = await get(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`);

const repos = {};
const languages = {};
for (const r of list) {
  if (r.fork) continue;
  repos[r.name.toLowerCase()] = {
    name: r.name,
    url: r.html_url,
    description: r.description || "",
    language: r.language || "",
    stars: r.stargazers_count,
    forks: r.forks_count,
    pushed: r.pushed_at,
  };
  if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
}

const data = {
  user,
  synced: new Date().toISOString().slice(0, 10),
  publicRepos: profile.public_repos,
  followers: profile.followers,
  since: profile.created_at?.slice(0, 4) || "",
  stars: Object.values(repos).reduce((n, r) => n + r.stars, 0),
  languages: Object.entries(languages).sort((a, b) => b[1] - a[1]),
  repos,
};

writeFileSync(new URL("../src/github.json", import.meta.url), JSON.stringify(data, null, 2) + "\n");
console.log(`Synced ${Object.keys(repos).length} repos for ${user}`);
