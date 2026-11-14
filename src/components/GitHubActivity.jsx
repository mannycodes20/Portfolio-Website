import { useEffect, useState } from "react";
import { PROFILE } from "../data.js";
import GH from "../github.json";
import { Heading, Icon, ExtLink } from "./bits.jsx";

/* Live GitHub activity: latest pushes and their commit messages, fetched from the public GitHub API when the page opens,
   plus a "push pulse" grid of the last 12 weeks. Stars and repo counts come from
   src/github.json, which the nightly GitHub Action refreshes. */

const WEEKS = 13; // GitHub only shares the last 90 days of events
const ago = (iso) => {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso)) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const h = Math.round(mins / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return d < 30 ? `${d}d ago` : `${Math.round(d / 30)}mo ago`;
};
const dayKey = (d) => d.toISOString().slice(0, 10);

export default function GitHubActivity() {
  const [events, setEvents] = useState(null);
  const [failed, setFailed] = useState(false);
  const [latest, setLatest] = useState([]);
  const user = PROFILE.github;

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      [1, 2, 3].map((page) =>
        fetch(`https://api.github.com/users/${user}/events/public?per_page=100&page=${page}`).then((r) =>
          r.ok ? r.json() : []
        )
      )
    )
      .then(async (pages) => {
        const all = pages.flat();
        if (cancelled) return;
        setEvents(all);
        // the newest 5 pushes: look up each one's head commit to get its message
        const seen = new Set();
        const pushes = all.filter((e) => e.type === "PushEvent" && e.payload?.head && !seen.has(e.payload.head) && seen.add(e.payload.head)).slice(0, 5);
        const commits = await Promise.all(
          pushes.map((e) =>
            fetch(`https://api.github.com/repos/${e.repo.name}/commits/${e.payload.head}`)
              .then((r) => (r.ok ? r.json() : null))
              .then((c) => ({
                sha: e.payload.head,
                msg: c?.commit?.message?.split("\n")[0] || `Pushed to ${e.payload.ref?.replace("refs/heads/", "")}`,
                repo: e.repo.name,
                time: e.created_at,
              }))
              .catch(() => null)
          )
        );
        if (!cancelled) setLatest(commits.filter(Boolean));
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [user]);

  // pushes per day for the pulse grid
  // (GitHub's events feed no longer lists the commits inside a push, so we count pushes)
  const perDay = {};
  (events || []).forEach((ev) => {
    if (ev.type !== "PushEvent") return;
    const k = ev.created_at.slice(0, 10);
    perDay[k] = (perDay[k] || 0) + 1;
  });

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - (WEEKS * 7 - 1) - today.getDay());
  const days = [];
  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const k = dayKey(d);
    days.push({ k, n: perDay[k] || 0 });
  }
  const total = days.reduce((s, d) => s + d.n, 0);
  const level = (n) => (n === 0 ? 0 : n < 2 ? 1 : n < 3 ? 2 : n < 5 ? 3 : 4);

  const stats = [
    ["Public repos", GH.publicRepos],
    ["Stars earned", GH.stars],
    ["Top language", GH.languages[0]?.[0] || "—"],
    ["Coding on GitHub since", GH.since],
  ];

  return (
    <section className="gh" aria-labelledby="gh-title">
      <div className="section-head">
        <Heading d={0.1}><span id="gh-title">On GitHub</span></Heading>
        <ExtLink className="more" href={`https://github.com/${user}`}>@{user} <Icon name="arrow-up-right" /></ExtLink>
      </div>

      <div className="gh-grid">
        <div className="gh-card a-rise" data-reveal>
          <div className="gh-stats">
            {stats.map(([label, value]) => (
              <div key={label}>
                <b>{value}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="pulse-head">
            <span className="eyebrow">Push pulse · last {WEEKS} weeks</span>
            <span className="mono">{events ? `${total} pushes` : "…"}</span>
          </div>
          <div className="pulse" role="img" aria-label={`${total} pushes in the last ${WEEKS} weeks`}>
            {days.map((d) => (
              <i key={d.k} className={`l${level(d.n)}`} title={`${d.k}: ${d.n} push${d.n === 1 ? "" : "es"}`} />
            ))}
          </div>
          <div className="gh-langs">
            {GH.languages.slice(0, 5).map(([lang, n]) => (
              <span className="tag" key={lang}>{lang} · {n}</span>
            ))}
          </div>
          <p className="gh-note mono">Repo stats synced nightly · {GH.synced}</p>
        </div>

        <div className="gh-card a-rise" style={{ "--d": ".1s" }} data-reveal>
          <p className="eyebrow">Latest commits</p>
          {failed && <p className="news-msg">GitHub didn't answer. Try again later.</p>}
          {!failed && !events && <p className="news-msg">Loading commits…</p>}
          {events && !latest.length && !total && (
            <p className="news-msg">No public commits in the last 90 days. Recent repos: {Object.values(GH.repos).slice(0, 3).map((r) => r.name).join(", ")}.</p>
          )}
          <ul className="commits">
            {latest.map((c) => (
              <li key={c.sha}>
                <Icon name="git-commit" />
                <div>
                  <ExtLink href={`https://github.com/${c.repo}/commit/${c.sha}`}>{c.msg}</ExtLink>
                  <span className="mono">{c.repo.split("/")[1]} · {c.sha.slice(0, 7)} · {ago(c.time)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
