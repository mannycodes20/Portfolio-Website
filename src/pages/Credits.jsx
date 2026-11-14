import { TRACKS, IMAGE_CREDITS } from "../data.js";
import { Heading, ExtLink } from "../components/bits.jsx";

export default function Credits() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Site</p>
        <Heading d={0.1} as="h1">Credits</Heading>
      </div>
      <div className="article" data-reveal>
        <h2 className="a-rise">Images</h2>
        <p className="a-rise">Some photos on this site come from Wikimedia Commons and are used under their open licences.</p>
        <ul className="credit-list">
          {IMAGE_CREDITS.map((c, i) => (
            <li key={c.file} className="a-rise" style={{ "--d": `${(0.05 + i * 0.04).toFixed(2)}s` }}>
              <img src={c.file} alt="" loading="lazy" />
              <span>
                <ExtLink href={c.source}>{c.what}</ExtLink>
                <span className="mono">by {c.author} · {c.license}</span>
              </span>
            </li>
          ))}
        </ul>
        <h2 className="a-rise">Tools</h2>
        <p className="a-rise">Built with React and Vite. Icons from Tabler Icons. Fonts: Unbounded, Outfit, Space Mono and Sacramento from Google Fonts. Tech news from the Hacker News API. Comments by giscus.</p>
        {TRACKS.length > 0 && (
          <>
            <h2 className="a-rise">Music</h2>
            {TRACKS.map((t) => <p key={t.src} className="a-rise">{t.title}: {t.credit || t.artist}</p>)}
          </>
        )}
      </div>
    </>
  );
}
