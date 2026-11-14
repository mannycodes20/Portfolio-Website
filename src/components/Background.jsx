import { useEffect, useState } from "react";
import { gradient } from "../lib.js";

/* Blurred copy of the phone's current clip behind the page (Home only — the CSS
   hides it on other pages). New clips fade in over the old one. */
function Layer({ edit, front }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true)); // mount at 0 opacity, then fade in
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={`bg-layer${shown && front ? " show" : ""}`}
      style={{ backgroundImage: edit.video ? "none" : gradient(edit.colors) }}
    >
      {edit.video && <video src={edit.video} muted loop playsInline autoPlay />}
    </div>
  );
}

export default function Background({ edit }) {
  const [layers, setLayers] = useState([]);
  useEffect(() => {
    if (!edit) return;
    // keep at most two: the one fading out and the one fading in
    setLayers((ls) => [...ls.slice(-1), { id: Date.now() + Math.random(), edit }]);
  }, [edit]);

  return (
    <div className="bg" aria-hidden="true">
      {layers.map((l, i) => <Layer key={l.id} edit={l.edit} front={i === layers.length - 1} />)}
      <div className="bg-shade" />
    </div>
  );
}
