import { useState } from "react";
import { PROFILE, PROJECTS, POSTS, NOW, STACK, ABOUT } from "../data.js";
import { avatarUrl, CLIPS, join } from "../lib.js";
import { Heading, Letters, Icon, ExtLink, Trace } from "../components/bits.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Terminal from "../components/Terminal.jsx";
import GitHubActivity from "../components/GitHubActivity.jsx";
import TechNews from "../components/TechNews.jsx";

/* Home: technical sections. The edits (phone + ring) live on the Edits page now,
   with a small teaser at the bottom of this page. */
export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);
  const [photoOk, setPhotoOk] = useState(true);
  const photo = avatarUrl();
  const journey = ABOUT.story.filter((s) => s.image);
  const stops = [journey[0], journey[3], journey[4]].filter(Boolean); // Accra, London, Brunel

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="hero" data-reveal aria-label="Introduction">
        <div>
          <div className="hero-top a-fade" style={{ "--d": ".1s" }}>
            <div className="avatar small">
              <span aria-hidden="true">{PROFILE.initials}</span>
              {photo && photoOk && <img src={photo} alt={`Photo of ${PROFILE.name}`} onError={() => setPhotoOk(false)} />}
            </div>
            {PROFILE.status && <span className="status"><i />{PROFILE.location} · {PROFILE.status}</span>}
          </div>
          <h1 className="hero-name" aria-label={PROFILE.name}>
            <span aria-hidden="true"><Letters text={PROFILE.name} d={0.15} /></span>
          </h1>
          <p className="hero-role mono a-fade" style={{ "--d": ".6s" }}>{PROFILE.role}</p>
          <p className="hero-bio a-rise" style={{ "--d": ".7s" }}>{PROFILE.tagline}</p>
          <div className="hero-links a-rise" style={{ "--d": ".85s" }}>
            <a className="pill pill-primary" href="#about">About me <Icon name="arrow-right" /></a>
            <a className="pill" href="#projects"><Icon name="code" />Projects</a>
            <ExtLink className="pill" href={`https://github.com/${PROFILE.github}`}><Icon name="brand-github" />GitHub</ExtLink>
            {PROFILE.cv && <ExtLink className="pill" href={PROFILE.cv}><Icon name="file-cv" />CV</ExtLink>}
          </div>
        </div>
        <Terminal />
      </section>

      {/* ---------- now ---------- */}
      <div className="section-head">
        <Heading d={0.1}>What I'm building now</Heading>
      </div>
      <div className="now-grid">
        {NOW.map((n, i) => {
          const ext = n.link.startsWith("http");
          const Tag = ext ? ExtLink : "a";
          return (
            <Tag key={n.title} href={n.link} className="now-card traced a-rise" style={{ "--d": `${(i * 0.08).toFixed(2)}s` }} data-reveal>
              <Trace d={0.1 + i * 0.08} />
              <Icon name={n.icon} />
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </Tag>
          );
        })}
      </div>

      {/* ---------- featured projects ---------- */}
      <div className="section-head">
        <Heading d={0.2}>Featured projects</Heading>
        <a className="more" href="#projects">All {PROJECTS.length} projects <Icon name="arrow-right" /></a>
      </div>
      <div className="project-grid">
        {featured.map((p, i) => <ProjectCard key={p.slug} project={p} i={i} />)}
      </div>

      {/* ---------- stack ---------- */}
      <div className="section-head">
        <Heading d={0.1}>Stack</Heading>
        <span className="news-source">What I've shipped with</span>
      </div>
      <div className="stack-grid">
        {STACK.map((g, i) => (
          <div key={g.group} className="stack-card a-rise" style={{ "--d": `${(i * 0.06).toFixed(2)}s` }} data-reveal>
            <p className="eyebrow"><Icon name={g.icon} />{g.group}</p>
            <div className="tags">{g.items.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>

      {/* ---------- journey ---------- */}
      <div className="section-head">
        <Heading d={0.1}>The route here</Heading>
        <a className="more" href="#about">Read the full story <Icon name="arrow-right" /></a>
      </div>
      <div className="journey">
        {stops.map((s, i) => (
          <a key={s.title} href="#about" className="journey-card a-rise" style={{ "--d": `${(i * 0.1).toFixed(2)}s` }} data-reveal>
            <img src={s.image} alt={s.alt} loading="lazy" />
            <span className="journey-text">
              <span className="eyebrow">{String(i + 1).padStart(2, "0")} · {s.label}</span>
              <b>{s.title}</b>
            </span>
          </a>
        ))}
      </div>

      {/* ---------- github ---------- */}
      <GitHubActivity />

      {/* ---------- writing + news ---------- */}
      <div className="home-split">
        <section>
          <div className="section-head">
            <Heading d={0.1}>Writing</Heading>
            <a className="more" href="#writing">All posts <Icon name="arrow-right" /></a>
          </div>
          <div className="post-list">
            {POSTS.slice(0, 3).map((p, i) => (
              <a key={p.slug} className="post-card traced a-rise" style={{ "--d": `${(i * 0.1).toFixed(2)}s` }} href={`#post-${p.slug}`} data-reveal>
                <Trace d={0.1 + i * 0.1} />
                <span className="eyebrow">{p.type}</span>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="post-meta">{join(p.date, `${p.minutes} min read`)}</span>
              </a>
            ))}
            <a className="rss-link" href="feed.xml"><Icon name="rss" />Subscribe via RSS</a>
          </div>
        </section>
        <TechNews count={5} title="In tech today" more />
      </div>

      {/* ---------- edits teaser ---------- */}
      <a className="edits-teaser a-rise" href="#edits" data-reveal>
        <span className="teaser-posters" aria-hidden="true">
          {CLIPS.filter((c) => c.poster).slice(0, 3).map((c) => <img key={c.poster} src={c.poster} alt="" loading="lazy" />)}
        </span>
        <span className="teaser-text">
          <span className="eyebrow">Off the clock · Ruto VFX</span>
          <b>I also edit anime in After Effects and Blender.</b>
          <span>{CLIPS.length} edits, played on a phone in a 3D ring <Icon name="arrow-right" /></span>
        </span>
      </a>
    </>
  );
}
