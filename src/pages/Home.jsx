import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS, EDITS } from "../data.js";
import { avatarUrl, CLIPS, RING, gradient, join, reduceMotion } from "../lib.js";
import { Heading, Letters, Icon, SocialPills } from "../components/bits.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import EditTile, { EditsSoon } from "../components/EditTile.jsx";

const FALLBACK_MS = 4500; // how long a clip without a video stays on the phone
const RING_COUNT = 12;

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
          {EDITS.slice(0, 6).map((e, i) => <EditTile key={e.url + i} edit={e} i={i} mode="rise" />)}
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

  const n = CLIPS.length;
  const go = (step) => setClip((c) => (c + step + n) % n);
  const e = CLIPS[clip];

  // New clip: load its video (if any) and tell the background to match
  useEffect(() => {
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

  // One animation loop: spins the ring and moves the clip progress line
  useEffect(() => {
    const cards = [...ringRef.current.children];
    let rot = 0;
    let raf;
    const tick = (now) => {
      if (!document.hidden) {
        if (!hover.current && !reduceMotion) rot += 0.12;
        const radius = Math.min(360, window.innerWidth * 0.5); // smaller ring on phones
        cards.forEach((card, k) => {
          const angle = k * (360 / cards.length) + rot;
          const facing = Math.cos((angle * Math.PI) / 180); // 1 = front, -1 = back
          card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
          card.style.opacity = (0.22 + (0.78 * (facing + 1)) / 2).toFixed(2);
        });

        const cur = CLIPS[clipRef.current];
        const v = videoRef.current;
        const p = cur.video && v.duration ? v.currentTime / v.duration : (now - clipStart.current) / FALLBACK_MS;
        if (barRef.current) barRef.current.style.width = Math.min(100, p * 100).toFixed(1) + "%";
        if (!cur.video && p >= 1 && !reduceMotion) {
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
        {Array.from({ length: RING_COUNT }, (_, k) => {
          const r = RING[k % RING.length];
          return (
            <div key={k} className="ring-card" style={{ backgroundImage: r.poster ? `url("${r.poster}")` : gradient(r.colors) }} />
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
                <div className="screen-fallback" style={{ backgroundImage: gradient(e.colors) }} />
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  preload="metadata"
                  style={{ opacity: e.video ? 1 : 0 }}
                  onEnded={() => go(1)}
                />
                <div className="island" />
                <a className="screen-caption" href={e.url} target="_blank" rel="noopener">
                  <b>{PROFILE.handle}</b>
                  <br />
                  {e.title}
                  <br />
                  <span style={{ opacity: 0.75 }}>{join(e.platform, e.views)}</span>
                  <br />
                  <span className="watch">Watch on {e.platform} <Icon name="arrow-up-right" /></span>
                </a>
                <div className="screen-progress"><i ref={barRef} /></div>
                <div className="home-bar" />
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
        <button className="phone-flip" type="button" onClick={() => setFlipped((f) => !f)}>
          <Icon name="rotate-360" />Flip
        </button>
      </div>
    </section>
  );
}
