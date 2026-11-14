import { ABOUT, PROFILE } from "../data.js";
import { Heading, Icon, ExtLink, CopyButton, EditOnGitHub } from "../components/bits.jsx";

// About page: intro, how I work, the full story with pictures, then the details
export default function About() {
  const a = ABOUT;
  const n = a.story.length;
  return (
    <>
      <div className="page-head">
        <p className="eyebrow" data-reveal><span className="a-fade">{PROFILE.location}</span></p>
        <Heading d={0.1} as="h1">{a.title}</Heading>
      </div>

      <div className="about-lead">
        <div className="article" data-reveal>
          {a.lead.map((t, i) => <p key={i} className="a-rise" style={{ "--d": `${(0.15 + i * 0.08).toFixed(2)}s` }}>{t}</p>)}
        </div>
        <div className="code approach a-rise" style={{ "--d": ".35s" }} data-reveal>
          <div className="term-bar"><i /><i /><i /><span>approach.js</span></div>
          <CopyButton text={a.approach} />
          <pre><code>{a.approach}</code></pre>
        </div>
      </div>

      <div className="section-head"><Heading d={0.1}>My story</Heading></div>
      <div className="timeline long" data-reveal>
        <svg className="timeline-line" viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="trim" pathLength="1" style={{ "--d": ".3s", "--dur": `${(0.6 * n).toFixed(1)}s` }} d="M2 0V100" />
        </svg>
        {a.story.map((s, i) => (
          <div className={`step${s.image ? " has-image" : ""}`} key={s.title} data-reveal>
            <span className="step-dot a-pop" style={{ "--d": ".1s" }} aria-hidden="true" />
            <div className="a-slide" style={{ "--d": ".15s" }}>
              <p className="eyebrow">{String(i + 1).padStart(2, "0")} · {s.label}</p>
              <h3>{s.title}</h3>
              {s.text.map((t, k) => <p key={k}>{t}</p>)}
            </div>
            {s.image && (
              <figure className="step-img a-rise" style={{ "--d": ".3s" }}>
                <img src={s.image} alt={s.alt} loading="lazy" />
              </figure>
            )}
          </div>
        ))}
      </div>

      <div className="section-head"><Heading d={0.1}>Education</Heading></div>
      <div className="edu-list">
        {a.education.map((e, i) => (
          <article key={e.course} className="edu a-rise" style={{ "--d": `${(i * 0.06).toFixed(2)}s` }} data-reveal>
            <div className="edu-head">
              <h3>{e.url ? <ExtLink href={e.url}>{e.place}</ExtLink> : e.place}</h3>
              <span className="mono">{e.where}</span>
            </div>
            <p className="edu-course">{e.course}</p>
            <p className="edu-grade mono">{e.grade}</p>
            <p>{e.text}</p>
            {e.modules.length > 0 && <div className="tags">{e.modules.map((m) => <span className="tag" key={m}>{m}</span>)}</div>}
          </article>
        ))}
      </div>

      <div className="about-cols">
        <section>
          <div className="section-head"><Heading d={0.1}>Leadership</Heading></div>
          <ul className="role-list">
            {a.roles.map((r) => (
              <li key={r.title} className="a-rise" data-reveal>
                <b>{r.title}</b> <span className="mono">· {r.org}</span>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <div className="section-head"><Heading d={0.1}>Languages</Heading></div>
          <ul className="role-list">
            {a.languages.map(([l, lvl]) => (
              <li key={l} className="a-rise" data-reveal><b>{l}</b> <span className="mono">· {lvl}</span></li>
            ))}
          </ul>
          <div className="section-head"><Heading d={0.1}>Interests</Heading></div>
          <div className="interest-list">
            {a.interests.map((g) => (
              <div key={g.group} className="a-rise" data-reveal>
                <p className="eyebrow">{g.group}</p>
                <p>{g.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="section-head"><Heading d={0.1}>Outside engineering</Heading></div>
      <div className="article" data-reveal>
        <p className="a-rise">{a.outside}</p>
        <div className="tags a-rise" style={{ "--d": ".1s" }}>{a.hobbies.map((h) => <span className="tag" key={h}>{h}</span>)}</div>
      </div>

      <div className="about-end a-rise" data-reveal>
        <a className="pill pill-primary" href="#projects">See what I've built <Icon name="arrow-right" /></a>
        {PROFILE.email && <a className="pill" href={`mailto:${PROFILE.email}`}><Icon name="mail" />Get in touch</a>}
        <EditOnGitHub />
      </div>
    </>
  );
}
