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

/* Turns a TikTok or YouTube link into a player the phone can show.
   Works with links like:
     https://www.tiktok.com/@rutovfx/video/7312345678901234567
     https://www.youtube.com/shorts/AbCdEfGhIjK   or   https://youtu.be/AbCdEfGhIjK */
export function parseLink(url = "") {
  let m = url.match(/tiktok\.com\/.*?\/video\/(\d+)/);
  if (m) {
    return {
      kind: "tiktok tall",
      embed: `https://www.tiktok.com/player/v1/${m[1]}?autoplay=1&muted=1&loop=1&music_info=0&description=0&rel=0&fullscreen_button=0&timestamp=0&progress_bar=0`,
      thumb: "",
    };
  }
  const short = url.match(/youtube\.com\/shorts\/([\w-]{11})/);
  m = short || url.match(/youtu\.be\/([\w-]{11})/) || url.match(/[?&]v=([\w-]{11})/);
  if (m) {
    const id = m[1];
    return {
      // Shorts are tall and fill the screen; normal videos sit in the middle, letterboxed
      kind: short ? "youtube tall" : "youtube wide",
      embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0`,
      thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }
  return null;
}

// Once any edit has its own mp4, edits without one are left out, so every card has a video
const WITH_VIDEO = EDITS.filter((e) => e.video);
const SOURCE = WITH_VIDEO.length ? WITH_VIDEO : EDITS;

// Fills in anything an edit in data.js leaves out (platform, colours, poster, player)
const ALL_EDITS = SOURCE.map((e, i) => {
  const link = parseLink(e.url);
  return {
    views: "",
    video: "",
    ...e,
    title: e.title || "Ruto VFX edit",
    platform: e.platform || (link?.kind.startsWith("tiktok") ? "TikTok" : link?.kind.startsWith("youtube") ? "YouTube" : ""),
    colors: e.colors || PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length],
    poster: e.poster || link?.thumb || "",
    // an mp4 in assets/videos wins; otherwise play the TikTok/YouTube link itself
    embed: e.video ? "" : link?.embed || "",
    embedKind: link?.kind || "",
  };
});
export { ALL_EDITS as EDITS_FULL };

// The phone's play queue (up to 12 edits). The ring of cards shows the same queue.
export const CLIPS = ALL_EDITS.length ? ALL_EDITS.slice(0, 12) : PLACEHOLDER_CLIPS;

/* Live-ish repo stats for a project (stars, language, last push), from src/github.json,
   which the nightly GitHub Action refreshes. */
import GH from "./github.json";
export function repoStats(project) {
  const url = project.links?.github;
  if (!url) return null;
  const name = url.replace(/\/$/, "").split("/").pop().toLowerCase();
  return GH.repos[name] || null;
}
export const since = (iso) => {
  const d = Math.round((Date.now() - new Date(iso)) / 86400000);
  if (d < 1) return "today";
  if (d < 30) return `${d}d ago`;
  if (d < 365) return `${Math.round(d / 30)}mo ago`;
  return `${Math.round(d / 365)}y ago`;
};
