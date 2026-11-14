import { POSTS } from "../data.js";
import { join } from "../lib.js";
import { Heading, Trace } from "../components/bits.jsx";

// Writing page: a highlighter sweeps across each title
export default function Writing() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Writing</p>
        <Heading d={0.1} as="h1">Posts</Heading>
      </div>
      <div className="post-list">
        {POSTS.map((p, i) => (
          <a
            key={p.slug}
            className="post-card traced a-rise"
            style={{ "--d": `${(0.1 + i * 0.12).toFixed(2)}s` }}
            href={`#post-${p.slug}`}
            data-reveal
          >
            <Trace d={0.2 + i * 0.12} />
            <span className="eyebrow">{p.type}</span>
            <h3><span className="a-mark" style={{ "--d": `${(0.7 + i * 0.12).toFixed(2)}s` }}>{p.title}</span></h3>
            <p>{p.excerpt}</p>
            <span className="post-meta">{join(p.date, `${p.minutes} min read`)}</span>
          </a>
        ))}
      </div>
    </>
  );
}
