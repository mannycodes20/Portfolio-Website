import { Trace, Icon, ExtLink } from "./bits.jsx";

// Screenshot, or a drawn browser window if there's no image yet
export function Shot({ project: p }) {
  if (p.image) return <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" />;
  return (
    <div className="shot-fake" aria-hidden="true">
      <div className="dots"><i /><i /><i /></div>
      <div className="ln" style={{ width: "55%" }} />
      <div className="ln" style={{ width: "80%" }} />
      <div className="blocks"><i /><i /><i /></div>
    </div>
  );
}

export function ProjectLinks({ project: p }) {
  return (
    <>
      {p.links.github && (
        <ExtLink href={p.links.github} aria-label={`${p.title} on GitHub`}><Icon name="brand-github" /></ExtLink>
      )}
      {p.links.site && (
        <ExtLink href={p.links.site} aria-label={`${p.title} website`}><Icon name="world" /></ExtLink>
      )}
      {p.links.demo && (
        <ExtLink href={p.links.demo} aria-label={`${p.title} live demo`}><Icon name="external-link" /></ExtLink>
      )}
    </>
  );
}

export default function ProjectCard({ project: p, i, deal = false }) {
  const shown = p.tags.slice(0, 4);
  const extra = p.tags.length - shown.length;
  const d = 0.15 + i * 0.15;
  const dealStyle = deal ? { "--dx": `${(1 - i) * 140}px`, "--d": `${(i * 0.15).toFixed(2)}s` } : undefined;

  return (
    <article className={`project traced${deal ? " a-deal" : ""}`} style={dealStyle} data-reveal>
      <Trace d={d} />
      <div className="shot a-fade" style={{ "--d": `${d + 0.6}s` }}>
        <Shot project={p} />
      </div>
      <div className="project-body a-fade" style={{ "--d": `${d + 0.7}s` }}>
        <div className="project-meta">
          <span className="eyebrow">{p.category}</span>
          <span className="project-year">{p.year}</span>
        </div>
        <h3 className="project-title"><a href={`#project-${p.slug}`}>{p.title}</a></h3>
        <p className="project-summary">{p.summary}</p>
        <div className="tags">
          {shown.map((t) => <span className="tag" key={t}>{t}</span>)}
          {extra > 0 && <span className="tag">+{extra}</span>}
        </div>
        <div className="project-foot">
          <a href={`#project-${p.slug}`}>View details</a>
          <span className="grow" />
          <ProjectLinks project={p} />
        </div>
      </div>
    </article>
  );
}
