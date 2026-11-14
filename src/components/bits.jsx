/* Small building blocks used across pages */
import { useLayoutEffect, useRef, useState } from "react";
import { PROFILE } from "../data.js";

// Section heading with the looping draw-and-erase underline
export function Heading({ children, d = 0, as: Tag = "h2" }) {
  return (
    <Tag className="heading" data-reveal>
      <span>{children}</span>
      <svg className="heading-line" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
        <path className="uline" pathLength="1" style={{ "--d": `${d}s` }} d="M2 8C60 2 120 11 180 5s90 2 116 0" />
      </svg>
    </Tag>
  );
}

// Border that traces around its parent, plus a running light on hover.
// It is sized to the card's real pixels so the line stays 1px thin.
export function Trace({ d = 0 }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const svg = ref.current;
    const size = () => {
      const w = Math.max(1, svg.clientWidth);
      const h = Math.max(1, svg.clientHeight);
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.querySelectorAll("rect").forEach((r) => {
        r.setAttribute("width", w - 1);
        r.setAttribute("height", h - 1);
      });
    };
    size();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(size);
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);
  return (
    <svg ref={ref} className="trace" aria-hidden="true">
      <rect className="trim" pathLength="1" style={{ "--d": `${d}s` }} x=".5" y=".5" width="100" height="100" />
      <rect className="run" pathLength="1" x=".5" y=".5" width="100" height="100" />
    </svg>
  );
}

// Splits text into letters that bounce in one by one
// (grouped per word so a name never breaks in the middle of a word)
export function Letters({ text, d = 0 }) {
  let i = 0;
  const words = text.split(" ");
  return words.map((word, w) => (
    <span key={w}>
      <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {[...word].map((ch, k) => (
          <span key={k} className="a-letter" style={{ "--d": `${(d + i++ * 0.035).toFixed(3)}s` }}>
            {ch}
          </span>
        ))}
      </span>
      {w < words.length - 1 ? " " : ""}
    </span>
  ));
}

export function CopyButton({ text, style }) {
  const [label, setLabel] = useState("Copy");
  const copy = () => {
    const done = () => {
      setLabel("Copied");
      setTimeout(() => setLabel("Copy"), 1500);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
    else done();
  };
  return (
    <button className="copy-btn" type="button" style={style} onClick={copy}>
      {label}
    </button>
  );
}

export const Icon = ({ name }) => <i className={`ti ti-${name}`} aria-hidden="true" />;

export const ExtLink = ({ href, children, ...rest }) => (
  <a href={href} target="_blank" rel="noopener" {...rest}>
    {children}
  </a>
);

// GitHub / YouTube / TikTok pills under the bio
export function SocialPills() {
  return (
    <>
      {PROFILE.github && (
        <ExtLink className="pill" href={`https://github.com/${PROFILE.github}`}>
          <Icon name="brand-github" />GitHub
        </ExtLink>
      )}
      {PROFILE.youtube && (
        <ExtLink className="pill" href={PROFILE.youtube}>
          <Icon name="brand-youtube" />YouTube
        </ExtLink>
      )}
      {PROFILE.tiktok && (
        <ExtLink className="pill" href={PROFILE.tiktok}>
          <Icon name="brand-tiktok" />TikTok
        </ExtLink>
      )}
    </>
  );
}

// "Edit on GitHub": opens a file of this site's repo in GitHub's editor, so anyone can suggest a fix
export function EditOnGitHub({ file = "src/data.js", label = "Suggest an edit on GitHub" }) {
  if (!PROFILE.repo) return null;
  return (
    <ExtLink className="edit-gh" href={`https://github.com/${PROFILE.repo}/edit/main/${file}`}>
      <Icon name="pencil" />{label}
    </ExtLink>
  );
}
