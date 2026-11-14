import { useEffect, useState } from "react";
import { reduceMotion } from "./lib.js";

/* The part of the address after # decides the page (#home, #story, #project-slug…).
   Hash links work on GitHub Pages without any server setup. */
export function useHash() {
  const read = () => decodeURIComponent(window.location.hash.slice(1)) || "home";
  const [hash, setHash] = useState(read);
  useEffect(() => {
    const onChange = () => setHash(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

/* Scroll reveals: anything with data-reveal gets the class "in" when it scrolls
   into view, which un-pauses its CSS animations. */
const observer =
  typeof IntersectionObserver !== "undefined" && !reduceMotion
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              observer.unobserve(e.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      )
    : null;

export function useReveals(deps) {
  useEffect(() => {
    document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) =>
      observer ? observer.observe(el) : el.classList.add("in")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* Small wrapper around localStorage that never throws (private mode etc.) */
export const store = {
  get(k, fallback) {
    try {
      const v = localStorage.getItem(k);
      return v === null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* ignore */
    }
  },
};
