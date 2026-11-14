import { PROFILE } from "../data.js";
import { reduceMotion } from "../lib.js";
import { CopyButton, ExtLink, Icon } from "./bits.jsx";

export default function Footer() {
  const socials = [
    PROFILE.github && ["brand-github", "GitHub", `https://github.com/${PROFILE.github}`],
    PROFILE.youtube && ["brand-youtube", "YouTube", PROFILE.youtube],
    PROFILE.tiktok && ["brand-tiktok", "TikTok", PROFILE.tiktok],
    PROFILE.instagram && ["brand-instagram", "Instagram", PROFILE.instagram],
    PROFILE.linkedin && ["brand-linkedin", "LinkedIn", PROFILE.linkedin],
  ].filter(Boolean);

  const toTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <footer className="site-footer">
      <div className="footer-card" data-reveal>
        <div className="footer-grid">
          <div>
            <a className="logo footer-logo" href="#home" aria-label={`${PROFILE.name}, home`}>
              <span className="logo-em">em.</span>
              <svg className="logo-line" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                <path className="trim" pathLength="1" style={{ "--d": "1.1s", "--dur": ".7s" }} d="M4 7C28 2 62 1 96 4" />
              </svg>
              <span className="wordmark a-fade" style={{ "--d": "1.5s" }}>{PROFILE.name.toLowerCase()}</span>
            </a>
            <p className="footer-bio">{PROFILE.footerBio}</p>
            <div className="socials">
              {socials.map(([icon, label, href]) => (
                <ExtLink key={label} href={href} aria-label={label}><Icon name={icon} /></ExtLink>
              ))}
            </div>
            {PROFILE.email && (
              <div className="email-row">
                <span>{PROFILE.email}</span>
                <CopyButton text={PROFILE.email} style={{ position: "static" }} />
              </div>
            )}
          </div>

          <nav className="footer-col" aria-label="Explore">
            <h4>EXPLORE</h4>
            <a href="#home">About me</a>
            <a href="#story">My story</a>
            <a href="#projects">Projects</a>
            <a href="#edits">Edits</a>
            <a href="#writing">Writing</a>
          </nav>

          <nav className="footer-col" aria-label="Elsewhere">
            <h4>ELSEWHERE</h4>
            {socials.map(([, label, href]) => <ExtLink key={label} href={href}>{label}</ExtLink>)}
          </nav>

          <nav className="footer-col" aria-label="Contact">
            <h4>CONTACT</h4>
            {PROFILE.email && <a href={`mailto:${PROFILE.email}`}>Email me</a>}
            {PROFILE.cv && <ExtLink href={PROFILE.cv}>My CV</ExtLink>}
            <a href="#credits">Music credits</a>
          </nav>
        </div>

        <svg className="footer-divider" viewBox="0 0 400 6" preserveAspectRatio="none" aria-hidden="true">
          <path className="trim" pathLength="1" style={{ "--d": ".3s" }} d="M200 3H400" />
          <path className="trim" pathLength="1" style={{ "--d": ".3s" }} d="M200 3H0" />
        </svg>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {PROFILE.name}. Built with React.</span>
          <button type="button" onClick={toTop}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  );
}
