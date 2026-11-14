import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS, POSTS } from "./data.js";
import { useHash, useReveals } from "./hooks.js";
import Background from "./components/Background.jsx";
import Grain from "./components/Grain.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Player from "./components/Player.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Guestbook from "./pages/Guestbook.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Edits from "./pages/Edits.jsx";
import Writing from "./pages/Writing.jsx";
import Post from "./pages/Post.jsx";
import Credits from "./pages/Credits.jsx";

// Works out which page to show from the # part of the address
function resolve(hash, onClip) {
  const simple = {
    about: [<About />, "About"],
    story: [<About />, "About", "about"], // old links to #story still work
    projects: [<Projects />, "Projects"],
    edits: [<Edits onClip={onClip} />, "Edits"],
    writing: [<Writing />, "Writing"],
    guestbook: [<Guestbook />, "Guestbook"],
    credits: [<Credits />, "Credits"],
  };
  if (simple[hash]) return { page: simple[hash][0], nav: simple[hash][2] || hash, title: simple[hash][1] };

  if (hash.startsWith("project-")) {
    const p = PROJECTS.find((x) => "project-" + x.slug === hash);
    if (p) return { page: <ProjectDetail project={p} />, nav: "projects", title: p.title };
  }
  if (hash.startsWith("post-")) {
    const p = POSTS.find((x) => "post-" + x.slug === hash);
    if (p) return { page: <Post post={p} />, nav: "writing", title: p.title };
  }
  return { page: <Home />, nav: "home", title: "" };
}

export default function App() {
  const hash = useHash();
  const [bgEdit, setBgEdit] = useState(null);
  const mainRef = useRef(null);
  const firstLoad = useRef(true);
  const { page, nav, title } = resolve(hash, setBgEdit);

  useEffect(() => {
    document.body.dataset.view = nav;
    document.title = (title ? title + " · " : "") + PROFILE.name;
    if (!firstLoad.current) {
      window.scrollTo(0, 0);
      mainRef.current?.focus({ preventScroll: true });
    }
    firstLoad.current = false;
  }, [hash, nav, title]);

  useReveals([hash]);

  const skipToContent = (e) => {
    e.preventDefault(); // keep the # router from treating "#view" as a page
    mainRef.current?.focus();
  };

  return (
    <>
      <Background edit={bgEdit} />
      <Grain />
      <a className="skip" href="#view" onClick={skipToContent}>Skip to content</a>
      <Header nav={nav} routeKey={hash} />
      {/* key={hash} remounts the page on every route change, replaying its entrance animation */}
      <main id="view" className="view" tabIndex={-1} ref={mainRef} key={hash}>
        {page}
      </main>
      <Footer />
      <Player />
    </>
  );
}
