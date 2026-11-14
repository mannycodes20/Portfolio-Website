import { useEffect, useState } from "react";
import { Heading, Icon, ExtLink } from "./bits.jsx";

/* Today's top tech stories, loaded live from the free Hacker News API every time
   someone opens the page, so it's new every day without you doing anything.
   No API key needed. */

const API = "https://hacker-news.firebaseio.com/v0";
const COUNT = 10;

const domain = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "news.ycombinator.com";
  }
};

const ago = (unix) => {
  const mins = Math.max(1, Math.round((Date.now() / 1000 - unix) / 60));
  if (mins < 60) return `${mins}m ago`;
  const h = Math.round(mins / 60);
  return h < 24 ? `${h}h ago` : `${Math.round(h / 24)}d ago`;
};

export default function TechNews({ count = COUNT, title = "Tech news today", more = false }) {
  const [stories, setStories] = useState(null); // null = loading
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const ids = await fetch(`${API}/topstories.json`).then((r) => r.json());
        const items = await Promise.all(
          ids.slice(0, count * 2).map((id) => fetch(`${API}/item/${id}.json`).then((r) => r.json()))
        );
        // keep real stories with a link (skip job posts and text-only posts)
        const list = items.filter((s) => s && s.type === "story" && s.url && !s.dead).slice(0, count);
        if (!cancelled) setStories(list);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="news" aria-labelledby="news-title">
      <div className="section-head">
        <Heading d={0.1}><span id="news-title">{title}</span></Heading>
        {more ? <a className="more" href="#writing">More news <Icon name="arrow-right" /></a> : <span className="news-source">Live from Hacker News</span>}
      </div>

      {failed && <p className="news-msg">Couldn't load today's news. Try refreshing.</p>}
      {!failed && !stories && <p className="news-msg">Loading today's stories…</p>}

      {stories && (
        <ol className="news-list">
          {stories.map((s, i) => (
            <li key={s.id} className="news-item a-rise in" style={{ "--d": `${(i * 0.04).toFixed(2)}s` }}>
              <span className="news-rank">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <ExtLink className="news-link" href={s.url}>{s.title}</ExtLink>
                <div className="news-meta">
                  <span>{domain(s.url)}</span>
                  <span>{s.score} points</span>
                  <span>{ago(s.time)}</span>
                  <ExtLink href={`https://news.ycombinator.com/item?id=${s.id}`}>
                    <Icon name="message-circle" />{s.descendants ?? 0}
                  </ExtLink>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
