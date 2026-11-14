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
