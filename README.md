# Portfolio-Website

My personal portfolio site, built with React and Vite. It shows my projects, my story from Ghana to the UK, my anime edits (Ruto VFX) and my writing.

## Run it locally

You need [Node.js](https://nodejs.org) (version 20 or newer).

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Edit the content

Everything you see on the site comes from `src/data.js`: profile, story, projects, edits, posts and music. Put media files in `public/assets/` and refer to them as `assets/...`.

## Publish

Every push to `main` builds the site and publishes it to GitHub Pages using `.github/workflows/deploy.yml`.
One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Automation

- **RSS feed:** `scripts/feed.mjs` builds `feed.xml` from your posts and projects on every `npm run build` (and `npm run dev`).
- **Nightly GitHub sync:** `.github/workflows/sync-github.yml` runs `npm run sync` every night. It refreshes `src/github.json` (stars, languages, last push) and commits if anything changed, which makes Vercel redeploy. You can also run it by hand from the repo's Actions tab.
- **Live data:** the Home page fetches your latest GitHub pushes and today's Hacker News stories in the browser.

## One-time setup

- **Newsletter:** make a free account at buttondown.com and put your username in `PROFILE.buttondown` in `src/data.js`.
- **Guestbook and comments:** turn on Discussions for this repo, install the giscus app, then copy the two IDs from giscus.app into `GISCUS` in `src/data.js`.
- **Vercel:** import the repo with the Vite preset. The feed picks up your Vercel address automatically, or you can set `PROFILE.site`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how other people can suggest changes.
