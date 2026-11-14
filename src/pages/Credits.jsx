import { TRACKS } from "../data.js";
import { Heading } from "../components/bits.jsx";

export default function Credits() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Music</p>
        <Heading d={0.1} as="h1">Music credits</Heading>
      </div>
      <div className="article" data-reveal>
        {TRACKS.length ? (
          TRACKS.map((t, i) => (
            <p key={t.src} className="a-rise" style={{ "--d": `${(0.1 + i * 0.08).toFixed(2)}s` }}>
              {t.title}: {t.credit || t.artist}
            </p>
          ))
        ) : (
          <p className="a-rise">No music yet.</p>
        )}
      </div>
    </>
  );
}
