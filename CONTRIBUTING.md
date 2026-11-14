# Contributing

Thanks for wanting to help. This is my personal site, but fixes and ideas are very welcome.

## Quick fixes (no setup)

Found a typo or a broken link? Every project and post page has a **Suggest an edit on GitHub** link.
It opens `src/data.js` in GitHub's editor. Make the change, then GitHub will help you open a pull request.

## Ideas and bugs

[Open an issue](../../issues/new/choose) using the bug or idea template. Screenshots help a lot.

## Leave a message

The [guestbook](https://github.com/mannycodes20/Portfolio-Website/discussions) lives in GitHub Discussions.

## Running it locally

```bash
git clone https://github.com/mannycodes20/Portfolio-Website.git
cd Portfolio-Website
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

## Where things are

| What | Where |
|---|---|
| All words, projects, posts, edits | `src/data.js` |
| Pages | `src/pages/` |
| Reusable pieces (footer, terminal, GitHub activity…) | `src/components/` |
| Styles | `src/styles.css` |
| RSS feed generator | `scripts/feed.mjs` (runs on every build) |
| GitHub stats sync | `scripts/sync-github.mjs` (runs nightly via GitHub Actions) |

## Pull requests

- Keep each pull request to one change.
- Run `npm run build` before you open it, to make sure it builds.
- Describe what you changed and why, and add a screenshot for anything visual.
