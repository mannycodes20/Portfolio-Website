import { PROFILE } from "../data.js";
import { EDITS_FULL as EDITS } from "../lib.js";
import { Heading, SocialPills } from "../components/bits.jsx";
import Stage from "../components/Stage.jsx";
import EditTile, { EditsSoon } from "../components/EditTile.jsx";

// Edits page: the phone and 3D ring of cards, then the full gallery
export default function Edits({ onClip }) {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Ruto VFX · {PROFILE.handle}</p>
        <Heading d={0.1} as="h1">Edits</Heading>
        <p className="story-intro a-rise" style={{ "--d": ".2s" }} data-reveal>
          Anime edits I make in After Effects and Blender, upscaled with my own tool, FookUpscaler. Scroll or swipe on the phone to change edits, or tap a card in the ring.
        </p>
        <div className="hero-links a-rise" style={{ "--d": ".3s" }} data-reveal><SocialPills /></div>
      </div>

      <Stage onClip={onClip} />

      <div className="section-head">
        <Heading d={0.2}>Gallery</Heading>
      </div>
      {EDITS.length ? (
        <div className="masonry">
          {EDITS.map((e, i) => <EditTile key={e.url + i} edit={e} i={i} mode="drop" />)}
        </div>
      ) : (
        <EditsSoon />
      )}
    </>
  );
}
