import { PROFILE } from "../data.js";
import { Icon } from "./bits.jsx";

const LINKS = [
  ["home", "Home", "layout-grid"],
  ["story", "My story", "user"],
  ["projects", "Projects", "code"],
  ["edits", "Edits", "player-play"],
  ["writing", "Writing", "notes"],
];

// "em." logo with the underline that draws on.
// Header passes key={routeKey}, which remounts it on every page change so the animation replays.
export function Logo() {
  return (
    <a className="logo in" href="#home" aria-label={`${PROFILE.name}, home`}>
      <span className="logo-em">em.</span>
      <svg className="logo-line" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        <path className="trim" pathLength="1" d="M4 7C28 2 62 1 96 4" />
      </svg>
    </a>
  );
}

export default function Header({ nav, routeKey }) {
  return (
    <header className="site-header">
      <Logo key={routeKey} />
      <nav className="nav" aria-label="Main">
        {LINKS.map(([id, label, icon]) => (
          <a
            key={id}
            href={`#${id}`}
            className={nav === id ? "on" : undefined}
            aria-current={nav === id ? "page" : undefined}
            aria-label={label}
            title={label}
          >
            <Icon name={icon} />
          </a>
        ))}
      </nav>
      <span className="header-spacer" aria-hidden="true" />
    </header>
  );
}
