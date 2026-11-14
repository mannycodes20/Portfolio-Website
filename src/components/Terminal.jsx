import { useEffect, useState } from "react";
import { PROFILE, PROJECTS } from "../data.js";
import { reduceMotion, since } from "../lib.js";
import GH from "../github.json";

/* A small terminal on the Home page that types out who I am.
   The last line comes from src/github.json, so it changes when the nightly sync runs. */
const latest = Object.values(GH.repos).sort((a, b) => (a.pushed < b.pushed ? 1 : -1))[0];

const SCRIPT = [
  ["cmd", "whoami"],
  ["out", `${PROFILE.name.toLowerCase()} · cs (software engineering) @ brunel`],
  ["cmd", "cat origin.txt"],
  ["out", "accra, ghana → london, 2022. first pc: built from leftovers"],
  ["cmd", "ls ~/projects"],
  ["out", PROJECTS.slice(0, 6).map((p) => p.slug).join("  ")],
  ["cmd", "git log -1 --format='%s'"],
  ["out", latest ? `pushed to ${latest.name} ${since(latest.pushed)}` : "no pushes yet"],
];

export default function Terminal() {
  const total = SCRIPT.reduce((n, [, t]) => n + t.length, 0);
  const [shown, setShown] = useState(reduceMotion ? total : 0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setShown((s) => {
        if (s >= total) {
          clearInterval(id);
          return s;
        }
        return s + 2;
      });
    }, 28);
    return () => clearInterval(id);
  }, [total]);

  let left = shown;
  return (
    <div className="terminal a-rise" style={{ "--d": ".5s" }} aria-label="Terminal introduction">
      <div className="term-bar">
        <i /><i /><i />
        <span>~/emmanuel — zsh</span>
      </div>
      <pre className="term-body">
        {SCRIPT.map(([kind, text], k) => {
          if (left <= 0) return null;
          const part = text.slice(0, left);
          left -= text.length;
          return (
            <div key={k} className={kind}>
              {kind === "cmd" && <span className="prompt">➜ </span>}
              {part}
            </div>
          );
        })}
        <span className="caret" aria-hidden="true" />
      </pre>
    </div>
  );
}
