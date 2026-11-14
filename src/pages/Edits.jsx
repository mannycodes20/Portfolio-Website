import { EDITS_FULL as EDITS } from "../lib.js";
import { Heading } from "../components/bits.jsx";
import EditTile, { EditsSoon } from "../components/EditTile.jsx";

// Edits page: tiles drop in with a little tilt
export default function Edits() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Edits</p>
        <Heading d={0.1} as="h1">Gallery</Heading>
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
