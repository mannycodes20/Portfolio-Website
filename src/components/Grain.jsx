import { useEffect, useRef } from "react";
import { reduceMotion } from "../lib.js";

/* Film grain: draws 6 small squares of random noise once, then swaps between
   them every 120ms. Much lighter than redrawing noise every frame. */
export default function Grain() {
  const ref = useRef(null);
  useEffect(() => {
    const size = 96;
    const frames = [];
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    for (let f = 0; f < 6; f++) {
      const img = ctx.createImageData(size, size);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      frames.push(`url(${c.toDataURL()})`);
    }
    let f = 0;
    ref.current.style.backgroundImage = frames[0];
    if (reduceMotion) return;
    const id = setInterval(() => {
      f = (f + 1) % frames.length;
      if (ref.current) ref.current.style.backgroundImage = frames[f];
    }, 120);
    return () => clearInterval(id);
  }, []);
  return <div className="grain" ref={ref} aria-hidden="true" />;
}
