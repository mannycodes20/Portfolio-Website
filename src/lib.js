import { PROFILE, EDITS } from "./data.js";

export const reduceMotion =
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export const gradient = (c) => `linear-gradient(120deg, ${c[0]}, ${c[1]}, ${c[2]}, ${c[0]})`;

export const avatarUrl = () =>
  PROFILE.github ? `https://github.com/${encodeURIComponent(PROFILE.github)}.png?size=240` : "";

export const platformIcon = (p = "") =>
  /youtube/i.test(p) ? "brand-youtube" : /tiktok/i.test(p) ? "brand-tiktok" : "player-play";

// Joins the non-empty parts with " · " (so an empty year or date leaves no stray dot)
export const join = (...parts) => parts.filter(Boolean).join(" · ");

// Colours used for the phone and ring until real edits are added to data.js
const PLACEHOLDER_COLORS = [
  ["#1a3d6b", "#0c0c0d", "#378add"],
  ["#26215c", "#0c0c0d", "#993556"],
  ["#2b2b30", "#0c0c0d", "#85b7eb"],
  ["#3a2a18", "#0c0c0d", "#c07a3a"],
  ["#163a2e", "#0c0c0d", "#3aa37a"],
];

export const PLACEHOLDER_CLIPS = PLACEHOLDER_COLORS.map((colors, i) => {
  const yt = i % 2 === 0;
  return {
    title: "New edits coming soon",
    platform: yt ? "YouTube" : "TikTok",
    views: "",
    url: yt ? PROFILE.youtube : PROFILE.tiktok,
    video: "",
    poster: "",
    colors,
  };
});

// What the phone and ring show: your real edits, or placeholders if there are none yet
export const CLIPS = EDITS.length ? EDITS.slice(0, 5) : PLACEHOLDER_CLIPS;
export const RING = EDITS.length ? EDITS.slice(0, 12) : PLACEHOLDER_CLIPS;
