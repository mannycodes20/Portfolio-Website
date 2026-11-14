import { useRef } from "react";
import { PROFILE } from "../data.js";
import { gradient, platformIcon } from "../lib.js";
import { Trace, Icon, ExtLink } from "./bits.jsx";

const HEIGHTS = [300, 220, 360, 250, 320, 230, 280, 340, 240];

// One tile in the edits gallery. Hovering plays its preview video.
export default function EditTile({ edit: e, i, mode }) {
  const videoRef = useRef(null);
  const anim =
    mode === "drop"
      ? { cls: "a-drop", style: { "--r": `${(i % 2 ? 1 : -1) * (8 + (i % 5) * 3)}deg`, "--d": `${(i * 0.08).toFixed(2)}s` } }
      : { cls: "a-rise", style: { "--d": `${(0.1 + i * 0.07).toFixed(2)}s` } };

  // A TikTok/YouTube link with no poster or mp4: show the playable player itself (tap to play)
  if (e.embed && !e.poster && !e.video) {
    return (
      <div className={`tile tile-embed ${anim.cls}`} style={anim.style} data-reveal>
        <iframe
          src={e.embed.replace("autoplay=1", "autoplay=0")}
          title={e.title}
          allow="encrypted-media; picture-in-picture; fullscreen"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <ExtLink
      className={`tile ${anim.cls}${e.poster ? " has-poster" : ""}`}
      // with a real (landscape) poster the tile keeps its 16:9 shape; placeholders get varied heights
      style={{ ...anim.style, height: e.poster ? undefined : `${HEIGHTS[i % HEIGHTS.length]}px`, backgroundImage: gradient(e.colors) }}
      href={e.url}
      data-reveal
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      {e.poster && <img src={e.poster} alt="" loading="lazy" />}
      {e.video && <video ref={videoRef} src={e.video} muted loop playsInline preload="none" />}
      <span className="tile-label">
        <span>{e.title}</span>
        <span><Icon name={platformIcon(e.platform)} />{e.views}</span>
      </span>
    </ExtLink>
  );
}

// Shown instead of the gallery until EDITS in data.js has entries
export function EditsSoon() {
  return (
    <div className="edits-soon traced a-rise" style={{ "--d": ".1s" }} data-reveal>
      <Trace d={0.2} />
      <p>My edits live on YouTube and TikTok for now. A gallery is coming here soon.</p>
      <div className="hero-links">
        {PROFILE.youtube && (
          <ExtLink className="pill pill-primary" href={PROFILE.youtube}><Icon name="brand-youtube" />Watch on YouTube</ExtLink>
        )}
        {PROFILE.tiktok && (
          <ExtLink className="pill" href={PROFILE.tiktok}><Icon name="brand-tiktok" />TikTok</ExtLink>
        )}
      </div>
    </div>
  );
}
