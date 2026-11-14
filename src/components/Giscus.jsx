import { useEffect, useRef } from "react";
import { GISCUS } from "../data.js";
import { ExtLink, Icon } from "./bits.jsx";

/* Comments stored in GitHub Discussions (giscus.app). `term` picks the thread:
   "guestbook" for the guestbook, the post slug for a post's comments.
   Until repoId/categoryId are filled in (see data.js), it shows a link to the Discussions page instead. */
export default function Giscus({ term }) {
  const ref = useRef(null);
  const ready = GISCUS.repoId && GISCUS.categoryId;

  useEffect(() => {
    if (!ready || !ref.current) return;
    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    const attrs = {
      repo: GISCUS.repo,
      "repo-id": GISCUS.repoId,
      category: GISCUS.category,
      "category-id": GISCUS.categoryId,
      mapping: "specific",
      term,
      strict: "1",
      "reactions-enabled": "1",
      "emit-metadata": "0",
      "input-position": "top",
      theme: "transparent_dark",
      lang: "en",
      loading: "lazy",
    };
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(`data-${k}`, v));
    ref.current.replaceChildren(s);
  }, [ready, term]);

  if (!ready) {
    return (
      <div className="giscus-setup">
        <p>Comments are powered by GitHub Discussions. Sign in with GitHub to leave a message.</p>
        <ExtLink className="pill pill-primary" href={`https://github.com/${GISCUS.repo}/discussions`}>
          <Icon name="brand-github" />Open the discussion board
        </ExtLink>
      </div>
    );
  }
  return <div ref={ref} className="giscus-wrap" />;
}
