import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS } from "../data.js";
import { avatarUrl, CLIPS, EDITS_FULL as EDITS, gradient, join, platformIcon, reduceMotion } from "../lib.js";
import { Heading, Letters, Icon, SocialPills } from "../components/bits.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import EditTile, { EditsSoon } from "../components/EditTile.jsx";

const FALLBACK_MS = 4500; // how long a clip without a video stays on the phone

const clock = () => new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: false });

/* The app-style interface drawn on top of the phone screen:
   status bar, tabs, side buttons, caption, progress line and bottom bar. */
function ScreenUI({ edit: e, barRef }) {
  const [time, setTime] = useState(clock);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  // A tall TikTok/Shorts player brings its own buttons, so ours step aside
  const tallEmbed = e.embed && e.embedKind.includes("tall");

  useEffect(() => {
    const id = setInterval(() => setTime(clock()), 15000);
    return () => clearInterval(id);
  }, []);
  // reset the buttons for each new clip
  useEffect(() => {
    setLiked(false);
    setSaved(false);
    setCopied(false);
  }, [e]);

  const share = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };
    if (navigator.clipboard && e.url) navigator.clipboard.writeText(e.url).then(done, done);
    else done();
  };

  return (
    <div className={`screen-ui${tallEmbed ? " tall-embed" : ""}`}>
      <div className="status-bar">
        <span>{time}</span>
        <span className="island" />
        <span className="status-icons"><Icon name="antenna-bars-5" /><Icon name="wifi" /><Icon name="battery-3" /></span>
      </div>

      {!tallEmbed && (
        <>
          <div className="screen-tabs">
            <Icon name="sparkles" />
            <span className="tabs"><b>Latest</b><a href="#edits">All edits</a></span>
            <a href="#edits" aria-label="All edits"><Icon name="adjustments-horizontal" /></a>
          </div>

          <div className="screen-rail">
            <button type="button" aria-label="Like" aria-pressed={liked} onClick={() => setLiked(!liked)}>
              <Icon name={liked ? "heart-filled" : "heart"} /><span>{liked ? "liked" : "like"}</span>
            </button>
            <a href={e.url} target="_blank" rel="noopener" aria-label={`Comment on ${e.platform}`}>
              <Icon name="message-circle" /><span>chat</span>
            </a>
            <button type="button" aria-label="Save" aria-pressed={saved} onClick={() => setSaved(!saved)}>
              <Icon name={saved ? "bookmark-filled" : "bookmark"} /><span>save</span>
            </button>
            <button type="button" aria-label="Copy link" onClick={share}>
              <Icon name={copied ? "check" : "link"} /><span>{copied ? "copied" : "share"}</span>
            </button>
          </div>

          <a className="screen-caption" href={e.url} target="_blank" rel="noopener">
            <b>{PROFILE.handle}</b>
            <span className="cap-meta">{join(e.platform, e.views)}</span>
            <span className="cap-title">{e.title}</span>
            <span className="watch">Watch on {e.platform} <Icon name="arrow-up-right" /></span>
          </a>

          {!e.embed && <div className="screen-progress"><i ref={barRef} /></div>}
        </>
      )}

      <nav className="screen-nav" aria-label="Phone menu">
        <a href="#home" aria-label="Home"><Icon name="home" /></a>
        <span className="on" aria-hidden="true"><Icon name="player-play" /></span>
        <a href="#story" className="mini-logo" aria-label="My story">em.</a>
        <a href="#projects" aria-label="Projects"><Icon name="code" /></a>
        {PROFILE.tiktok && <a href={PROFILE.tiktok} target="_blank" rel="noopener" aria-label="TikTok"><Icon name="brand-tiktok" /></a>}
      </nav>
      <div className="home-bar" />
    </div>
  );
}

export default function Home({ onClip }) {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 2);
  const [photoOk, setPhotoOk] = useState(true);
  const photo = avatarUrl();

  return (
    <>
      <section className="about" data-reveal aria-label="About me">
        <div className="avatar a-pop" style={{ "--d": ".1s" }}>
          <span aria-hidden="true">{PROFILE.initials}</span>
          {photo && photoOk && <img src={photo} alt={`Photo of ${PROFILE.name}`} onError={() => setPhotoOk(false)} />}
        </div>
        <div>
          <p className="eyebrow a-fade" style={{ "--d": ".1s" }}>About me</p>
          <h1 className="hero-name" aria-label={PROFILE.name}>
            <span aria-hidden="true"><Letters text={PROFILE.name} d={0.15} /></span>
          </h1>
          <p className="hero-bio a-rise" style={{ "--d": ".7s" }}>{PROFILE.bio}</p>
          <div className="hero-links a-rise" style={{ "--d": ".85s" }}>
            <a className="pill pill-primary" href="#story">Read my story <Icon name="arrow-right" /></a>
            <SocialPills />
          </div>
        </div>
      </section>

      <Stage onClip={onClip} />

      <div className="section-head">
        <Heading d={0.2}>Featured projects</Heading>
        <a className="more" href="#projects">All projects <Icon name="arrow-right" /></a>
      </div>
      <div className="project-grid">
        {featured.map((p, i) => <ProjectCard key={p.slug} project={p} i={i} />)}
      </div>

      <div className="section-head">
        <Heading d={0.2}>Edits</Heading>
        {EDITS.length > 0 && <a className="more" href="#edits">All edits <Icon name="arrow-right" /></a>}
      </div>
      {EDITS.length ? (
        <div className="masonry">
          {/* players are heavier than pictures, so show one row of 3 when the tiles are TikTok players */}
          {EDITS.slice(0, EDITS[0].embed && !EDITS[0].poster ? 3 : 6).map((e, i) => (
            <EditTile key={e.url + i} edit={e} i={i} mode="rise" />
          ))}
        </div>
      ) : (
        <EditsSoon />
      )}
    </>
  );
}

/* The 3D ring of cards and the phone in the middle */
function Stage({ onClip }) {
  const ringRef = useRef(null);
  const screenRef = useRef(null);
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const hover = useRef(false);
  const clipRef = useRef(0);
  const clipStart = useRef(0);
  const swiped = useRef(false);
  const startY = useRef(null);
  const [clip, setClip] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const targetRot = useRef(0);

  const n = CLIPS.length;
  const step = 360 / n;
  const go = (s) => setClip((c) => (c + s + n) % n);
  const e = CLIPS[clip % n];

  // New clip: turn the ring so this clip's card sits behind the phone (shortest way round),
  // load its video (if any) and tell the background to match
  useEffect(() => {
    let d = clip - clipRef.current;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    targetRot.current -= d * step;
    clipRef.current = clip;
    clipStart.current = performance.now();
    const v = videoRef.current;
    if (e.video) {
      v.src = e.video;
      v.play().catch(() => {});
    } else {
      v.removeAttribute("src");
      v.load();
    }
    onClip(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clip]);

  // One animation loop: turns the ring (the queue) and moves the clip progress line
  useEffect(() => {
    const cards = [...ringRef.current.children];
    let rot = 0;
    let raf;
    const tick = (now) => {
      if (!document.hidden) {
        // glide towards the current clip; a gentle sway keeps it alive while idle
        rot += (targetRot.current - rot) * (reduceMotion ? 1 : 0.07);
        const sway = hover.current || reduceMotion ? 0 : Math.sin(now / 2200) * 5;
        const radius = Math.min(470, window.innerWidth * 0.5); // smaller ring on phones
        cards.forEach((card, k) => {
          const angle = k * (360 / cards.length) + rot + sway;
          const facing = Math.cos((angle * Math.PI) / 180); // 1 = front, -1 = back
          card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
          card.style.opacity = (0.22 + (0.78 * (facing + 1)) / 2).toFixed(2);
        });

        const cur = CLIPS[clipRef.current];
        const v = videoRef.current;
        // TikTok/YouTube players don't tell us their length, so those stay until you press next
        const p = cur.embed ? 0 : cur.video && v.duration ? v.currentTime / v.duration : (now - clipStart.current) / FALLBACK_MS;
        if (barRef.current) barRef.current.style.width = Math.min(100, p * 100).toFixed(1) + "%";
        if (!cur.video && !cur.embed && p >= 1 && !reduceMotion) {
          clipStart.current = now;
          setClip((c) => (c + 1) % CLIPS.length);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Scroll wheel on the screen changes clip (needs passive:false to stop the page scrolling)
  useEffect(() => {
    const screen = screenRef.current;
    let lock = false;
    const onWheel = (ev) => {
      ev.preventDefault();
      if (lock) return;
      lock = true;
      go(ev.deltaY > 0 ? 1 : -1);
      setTimeout(() => (lock = false), 500);
    };
    screen.addEventListener("wheel", onWheel, { passive: false });
    return () => screen.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swipe / drag up or down on the screen
  const onPointerDown = (ev) => {
    startY.current = ev.clientY;
    swiped.current = false;
  };
  const onPointerUp = (ev) => {
    if (startY.current === null) return;
    const dy = startY.current - ev.clientY;
    if (Math.abs(dy) > 30) {
      swiped.current = true;
      go(dy > 0 ? 1 : -1);
    }
    startY.current = null;
  };
  // A swipe shouldn't also count as a tap on the "Watch" link
  const onClickCapture = (ev) => {
    if (swiped.current) {
      ev.preventDefault();
      swiped.current = false;
    }
  };

  return (
    <section
      className="stage a-rise"
      style={{ "--d": ".4s" }}
      data-reveal
      aria-label="Latest edits"
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
    >
      <div className="ring" ref={ringRef} aria-hidden="true">
        {/* One card per clip in the queue. The current one sits behind the phone,
            what's coming up lines up to the right. Click a card to jump to it. */}
        {CLIPS.map((c, k) => {
          const state = k === clip ? "now" : k === (clip + 1) % n ? "next" : "";
          return (
            <button
              key={k}
              type="button"
              tabIndex={-1}
              className={`ring-card${state ? " " + state : ""}${c.poster ? " has-poster" : ""}`}
              style={{ backgroundImage: c.poster ? `url("${c.poster}")` : gradient(c.colors) }}
              onClick={() => setClip(k)}
            >
              <span className="rc-top">
                <span className="rc-num">{String(k + 1).padStart(2, "0")}</span>
                {state === "next" && <span className="rc-badge">Up next</span>}
                {state === "now" && <span className="rc-badge">Playing</span>}
              </span>
              <span className="rc-bottom">
                <span className="rc-title">{c.title}</span>
                <span className="rc-plat"><Icon name={platformIcon(c.platform)} />{c.platform}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="phone-wrap">
        <div className={`phone${flipped ? " flipped" : ""}`}>
          <div className="phone-face phone-front">
            <span className="side-btn" style={{ left: -3, top: 92, height: 24 }} />
            <span className="side-btn" style={{ left: -3, top: 132, height: 44 }} />
            <span className="side-btn" style={{ left: -3, top: 184, height: 44 }} />
            <span className="side-btn" style={{ right: -3, top: 146, height: 62 }} />
            <span className="side-btn" style={{ right: -3, top: 290, height: 36 }} />
            <div className="phone-bezel">
              <div
                className="phone-screen"
                ref={screenRef}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onClickCapture={onClickCapture}
                onDragStart={(ev) => ev.preventDefault()}
              >
                {/* Placeholder: a 16:9 "video" in the middle of the screen until real edits are added */}
                {!e.video && !e.embed && (
                  <div className="screen-fallback" style={{ backgroundImage: gradient(e.colors) }} />
                )}
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  preload="metadata"
                  style={{ opacity: e.video ? 1 : 0 }}
                  onEnded={() => go(1)}
                />
                {e.embed && (
                  <iframe
                    key={e.embed}
                    className={`phone-embed ${e.embedKind}`}
                    src={e.embed}
                    title={e.title || `${e.platform} video`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    loading="lazy"
                  />
                )}
                <ScreenUI edit={e} barRef={barRef} />
              </div>
            </div>
          </div>
          <div className="phone-face phone-back" aria-hidden="true">
            <div className="plateau">
              <div className="lens" />
              <span style={{ flex: 1 }} />
              <div className="mic" />
              <div className="flash" />
            </div>
          </div>
        </div>
        <div className="phone-controls">
          <button className="phone-flip" type="button" aria-label="Previous edit" onClick={() => go(-1)}>
            <Icon name="chevron-up" />
          </button>
          <button className="phone-flip" type="button" onClick={() => setFlipped((f) => !f)}>
            <Icon name="rotate-360" />Flip
          </button>
          <button className="phone-flip" type="button" aria-label="Next edit" onClick={() => go(1)}>
            <Icon name="chevron-down" />
          </button>
        </div>
      </div>
    </section>
  );
}
