import { useEffect, useRef, useState } from "react";
import { TRACKS } from "../data.js";
import { store } from "../hooks.js";
import { Icon } from "./bits.jsx";

/* Music bar at the bottom. Plays TRACKS from data.js with a normal <audio>.
   Browsers only allow sound after a click, so it never autoplays.
   With no tracks listed, the bar is hidden. */

const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

export default function Player() {
  useEffect(() => {
    if (!TRACKS.length) document.documentElement.style.setProperty("--player-h", "0px");
  }, []);
  if (!TRACKS.length) return null;
  return <PlayerBar />;
}

function PlayerBar() {
  const audio = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(null); // value while dragging the seek bar
  const [volume, setVolume] = useState(() => Number(store.get("volume", 60)));
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const autoplayNext = useRef(false);

  const track = TRACKS[index];

  // Load a track whenever the index changes
  useEffect(() => {
    const a = audio.current;
    a.src = track.src;
    setTime(0);
    setDuration(0);
    setError(false);
    setLiked(store.get("liked:" + track.src, false));
    if (autoplayNext.current) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    audio.current.volume = volume / 100;
    store.set("volume", volume);
  }, [volume]);

  function play() {
    audio.current.play().then(
      () => setPlaying(true),
      () => setError(true) // file missing or blocked
    );
  }
  function pause() {
    audio.current.pause();
    setPlaying(false);
  }
  function go(i, keepPlaying) {
    autoplayNext.current = keepPlaying;
    setIndex((i + TRACKS.length) % TRACKS.length);
  }
  function nextIndex() {
    if (shuffle && TRACKS.length > 1) {
      let n;
      do n = Math.floor(Math.random() * TRACKS.length);
      while (n === index);
      return n;
    }
    return index + 1;
  }
  function onEnded() {
    const last = index === TRACKS.length - 1 && !shuffle;
    if (last && !repeat) {
      setPlaying(false);
      go(0, false);
      return;
    }
    go(nextIndex(), true);
  }
  function prev() {
    // Like Spotify: more than 3s in restarts the song, otherwise goes back one
    if (audio.current.currentTime > 3) audio.current.currentTime = 0;
    else go(index - 1, playing);
  }
  function toggleLike() {
    const v = !liked;
    store.set("liked:" + track.src, v);
    setLiked(v);
  }

  const seekValue = seek ?? (duration ? Math.round((time / duration) * 1000) : 0);
  const shownTime = seek !== null && duration ? (seek / 1000) * duration : time;
  const volIcon = volume === 0 ? "volume-off" : volume < 50 ? "volume-2" : "volume";

  return (
    <section className={`player${playing ? " playing" : ""}`} aria-label="Music player">
      <div className="player-now">
        <div className="player-art" style={{ backgroundImage: track.cover ? `url("${track.cover}")` : undefined }} />
        <div className="player-text">
          <div className="player-title">{track.title}</div>
          <div className="player-artist">{error ? "Can't play: check the file path in data.js" : track.artist}</div>
        </div>
        <button className="icon-btn" aria-label="Like" aria-pressed={liked} onClick={toggleLike}>
          <Icon name={liked ? "heart-filled" : "heart"} />
        </button>
      </div>

      <div className="player-main">
        <div className="player-controls">
          <button className="icon-btn" aria-label="Shuffle" aria-pressed={shuffle} onClick={() => setShuffle(!shuffle)}>
            <Icon name="arrows-shuffle" />
          </button>
          <button className="icon-btn" aria-label="Previous track" onClick={prev}><Icon name="player-skip-back" /></button>
          <button className="icon-btn play-btn" aria-label={playing ? "Pause" : "Play"} onClick={() => (playing ? pause() : play())}>
            <Icon name={playing ? "player-pause" : "player-play"} />
          </button>
          <button className="icon-btn" aria-label="Next track" onClick={() => go(nextIndex(), playing)}>
            <Icon name="player-skip-forward" />
          </button>
          <button className={`icon-btn${repeat ? " on" : ""}`} aria-label="Repeat" aria-pressed={repeat} onClick={() => setRepeat(!repeat)}>
            <Icon name="repeat" />
          </button>
        </div>
        <div className="player-seek">
          <span>{fmt(shownTime)}</span>
          <input
            type="range" min="0" max="1000" step="1" aria-label="Seek"
            value={seekValue}
            style={{ "--fill": `${seekValue / 10}%` }}
            onChange={(e) => setSeek(Number(e.target.value))}
            onPointerUp={() => {
              if (seek !== null && duration) audio.current.currentTime = (seek / 1000) * duration;
              setSeek(null);
            }}
            onKeyUp={() => {
              if (seek !== null && duration) audio.current.currentTime = (seek / 1000) * duration;
              setSeek(null);
            }}
          />
          <span>{fmt(duration)}</span>
        </div>
      </div>

      <div className="player-volume">
        <Icon name={volIcon} />
        <input
          type="range" min="0" max="100" step="1" aria-label="Volume"
          value={volume}
          style={{ "--fill": `${volume}%` }}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>

      <audio
        ref={audio}
        preload="none"
        onEnded={onEnded}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
      />
    </section>
  );
}
