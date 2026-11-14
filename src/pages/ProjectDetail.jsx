import { join } from "../lib.js";
import { Heading, Icon, ExtLink, CopyButton } from "../components/bits.jsx";
import { Shot } from "../components/ProjectCard.jsx";

// Write-up page for one project. Empty sections (no steps, no run command) are left out.
export default function ProjectDetail({ project: p }) {
  return (
    <article className="detail" data-reveal>
      <a className="back-link a-fade" href="#projects"><Icon name="arrow-left" />All projects</a>
      <div className="a-rise" style={{ "--d": ".05s" }}>
        <p className="eyebrow">{join(p.category, p.year)}</p>
      </div>
      <Heading d={0.1} as="h1">{p.title}</Heading>
      <div className="shot a-rise" style={{ "--d": ".2s" }}><Shot project={p} /></div>
      <div className="tags a-rise" style={{ "--d": ".25s" }}>
        {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
      </div>
      <section className="a-rise" style={{ "--d": ".3s" }}>
        <h3>What it does</h3>
        <p>{p.what}</p>
      </section>
      {p.how.length > 0 && (
        <section className="a-rise" style={{ "--d": ".35s" }}>
          <h3>How it works</h3>
          <ul>{p.how.map((x, k) => <li key={k}>{x}</li>)}</ul>
        </section>
      )}
      {p.run && (
        <section className="a-rise" style={{ "--d": ".4s" }}>
          <h3>How to run it</h3>
          <div className="code">
            <CopyButton text={p.run} />
            <pre><code>{p.run}</code></pre>
          </div>
        </section>
      )}
      <div className="link-row a-rise" style={{ "--d": ".45s" }}>
        {p.links.github && <ExtLink className="pill pill-primary" href={p.links.github}><Icon name="brand-github" />View the code</ExtLink>}
        {p.links.site && <ExtLink className="pill" href={p.links.site}><Icon name="world" />Website</ExtLink>}
        {p.links.demo && <ExtLink className="pill" href={p.links.demo}><Icon name="external-link" />Live demo</ExtLink>}
      </div>
    </article>
  );
}
