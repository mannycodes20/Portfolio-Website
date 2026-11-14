import { STORY } from "../data.js";
import { Heading } from "../components/bits.jsx";

// Story page: the timeline line draws down while each step slides in
export default function Story() {
  const n = STORY.steps.length;
  return (
    <>
      <div className="page-head">
        <p className="eyebrow" data-reveal><span className="a-fade">My story</span></p>
        <Heading d={0.1} as="h1">{STORY.title}</Heading>
      </div>
      <div className="timeline" data-reveal>
        <svg className="timeline-line" viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="trim" pathLength="1" style={{ "--d": ".3s", "--dur": `${(0.6 * n).toFixed(1)}s` }} d="M2 0V100" />
        </svg>
        {STORY.steps.map((s, i) => (
          <div className="step" key={s.title}>
            <span className="step-dot a-pop" style={{ "--d": `${(0.35 + i * 0.55).toFixed(2)}s` }} aria-hidden="true" />
            <div className="a-slide" style={{ "--d": `${(0.45 + i * 0.55).toFixed(2)}s` }}>
              {s.label && <p className="eyebrow">{s.label}</p>}
              <h3>{s.title}</h3>
              {s.text.map((t, k) => <p key={k}>{t}</p>)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
