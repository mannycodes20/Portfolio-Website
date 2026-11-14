import { join } from "../lib.js";
import { Heading, Icon } from "../components/bits.jsx";

// One blog post. A body line starting with "## " becomes a sub-heading.
export default function Post({ post: p }) {
  return (
    <article className="article" data-reveal>
      <a className="back-link a-fade" href="#writing"><Icon name="arrow-left" />All posts</a>
      <p className="eyebrow a-fade">{join(p.type, p.date, `${p.minutes} min read`)}</p>
      <Heading d={0.1} as="h1">{p.title}</Heading>
      {p.body.map((para, i) => {
        const style = { "--d": `${(0.2 + i * 0.05).toFixed(2)}s` };
        return para.startsWith("## ")
          ? <h2 key={i} className="a-rise" style={style}>{para.slice(3)}</h2>
          : <p key={i} className="a-rise" style={style}>{para}</p>;
      })}
    </article>
  );
}
