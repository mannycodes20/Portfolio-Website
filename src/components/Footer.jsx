import { PROFILE } from "../data.js";
import { reduceMotion } from "../lib.js";
import { ExtLink, Icon } from "./bits.jsx";

const gh = (path = "") => `https://github.com/${PROFILE.repo}${path}`;

// Newsletter box: Buttondown if a username is set in data.js, otherwise "Follow via RSS"
function Newsletter() {
  if (PROFILE.buttondown) {
    return (
      <form
        className="newsletter"
        action={`https://buttondown.com/api/emails/embed-subscribe/${PROFILE.buttondown}`}
        method="post"
        target="_blank"
      >
        <label className="sr-only" htmlFor="nl-email">Email address</label>
        <input id="nl-email" type="email" name="email" placeholder="you@example.com" required autoComplete="email" />
        <button className="pill pill-primary" type="submit">Subscribe</button>
      </form>
    );
  }
  return (
    <div className="newsletter">
      <a className="pill pill-primary" href="feed.xml"><Icon name="rss" />Follow via RSS</a>
    </div>
  );
}

export default function Footer() {
  const socials = [
    PROFILE.email && ["mail", "Email", `mailto:${PROFILE.email}`],
    ["rss", "RSS feed", "feed.xml"],
    PROFILE.linkedin && ["brand-linkedin", "LinkedIn", PROFILE.linkedin],
    PROFILE.github && ["brand-github", "GitHub", `https://github.com/${PROFILE.github}`],
    PROFILE.youtube && ["brand-youtube", "YouTube", PROFILE.youtube],
    PROFILE.tiktok && ["brand-tiktok", "TikTok", PROFILE.tiktok],
    PROFILE.instagram && ["brand-instagram", "Instagram", PROFILE.instagram],
  ].filter(Boolean);

  const toTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  const cols = [
    ["Explore", [["Home", "#home"], ["About", "#about"], ["Projects", "#projects"], ["Writing", "#writing"], ["Edits", "#edits"]]],
    ["Work", [
      ["GitHub", `https://github.com/${PROFILE.github}`],
      ["Open source", `https://github.com/${PROFILE.github}?tab=repositories`],
      PROFILE.cv && ["CV", PROFILE.cv],
      PROFILE.linkedin && ["LinkedIn", PROFILE.linkedin],
    ]],
    ["Community", [["Guestbook", "#guestbook"], ["Contribute", gh("/blob/main/CONTRIBUTING.md")], ["Report an issue", gh("/issues/new/choose")]]],
    ["Site", [["RSS feed", "feed.xml"], ["Changelog", gh("/commits/main")], ["Source code", gh()], ["Credits", "#credits"]]],
  ];

  return (
    <footer className="site-footer">
      <div className="footer-card" data-reveal>
        <div className="footer-grid">
          <div className="footer-news">
            <h4>Newsletter</h4>
            <p>Notes on what I'm building, new projects and posts. Straight to your inbox or reader.</p>
            <Newsletter />
            <div className="socials">
              {socials.map(([icon, label, href]) =>
                href.startsWith("http") ? (
                  <ExtLink key={label} href={href} aria-label={label} title={label}><Icon name={icon} /></ExtLink>
                ) : (
                  <a key={label} href={href} aria-label={label} title={label}><Icon name={icon} /></a>
                )
              )}
            </div>
          </div>

          {cols.map(([title, links]) => (
            <nav className="footer-col" aria-label={title} key={title}>
              <h4>{title}</h4>
              {links.filter(Boolean).map(([label, href]) =>
                href.startsWith("http") ? <ExtLink key={label} href={href}>{label}</ExtLink> : <a key={label} href={href}>{label}</a>
              )}
            </nav>
          ))}

          <div className="footer-contact">
            <h4>Get in touch</h4>
            <p>Have a question, a project or an opportunity?</p>
            {PROFILE.email && <a className="pill pill-wide" href={`mailto:${PROFILE.email}`}><Icon name="mail" />Send a message</a>}
            {PROFILE.linkedin && <ExtLink className="pill pill-wide pill-primary" href={PROFILE.linkedin}><Icon name="brand-linkedin" />Connect on LinkedIn</ExtLink>}
          </div>
        </div>

        <svg className="footer-divider" viewBox="0 0 400 6" preserveAspectRatio="none" aria-hidden="true">
          <path className="trim" pathLength="1" style={{ "--d": ".3s" }} d="M200 3H400" />
          <path className="trim" pathLength="1" style={{ "--d": ".3s" }} d="M200 3H0" />
        </svg>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} <a href="#about">{PROFILE.name}</a>. Built with React · open source.</span>
          <span className="footer-legal">
            <a href="#credits">Credits</a>
            <a href="feed.xml">RSS</a>
            <ExtLink href={gh()}>Source</ExtLink>
          </span>
          <button type="button" className="to-top" onClick={toTop}>Back to top <span><Icon name="arrow-up" /></span></button>
        </div>
      </div>
    </footer>
  );
}
