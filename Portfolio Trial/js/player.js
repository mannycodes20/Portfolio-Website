/* =====================================================================
   data.js  —  YOUR CONTENT LIVES HERE
   ---------------------------------------------------------------------
   Edit this file to change what the site says. You should not need to
   touch main.js or style.css to add a project, an edit, a post or a song.

   Rules of thumb:
   - Text goes in "quotes". Keep the commas between items.
   - Paths like "assets/videos/loop1.mp4" are relative to index.html.
   - Leave a field as "" if you don't have it yet; the site copes.
   ===================================================================== */

const PROFILE = {
  name: "Emmanuel Mensah",
  initials: "em",
  role: "Student · developer · video editor",
  school: "Your School",
  bio: "Student at Your School. Grew up in Ghana, moved to the UK in 20XX. I write code and edit anime loops.",
  footerBio: "Student at Your School. I build software and edit anime loops. Open to internships, collabs and commissions.",

  github: "mannycodes20",                              // just the username, e.g. "emmanuelmensah"
  youtube: "https://www.youtube.com/@rutovisualfx",
  tiktok: "https://www.tiktok.com/@rutovfx",
  handle: "@rutovfx",                             // shown on the phone screen
  instagram: "https://www.instagram.com/rutovfx/",                                     // full link, or "" to hide
  linkedin: "https://www.linkedin.com/in/emmanuelmensah20/",                                      // full link, or "" to hide
  email: "emmanuel_mensah22@yahoo.com",
  cv: "assets/cv.pdf",                               // put your CV here, or set to ""
};

/* ---------------- My story (the timeline page) ---------------- */
const STORY = {
  title: "My Tech Journey",
  steps: [
    {
      label: "Ghana",
      title: "Where I grew up",
      text: [
        "Write about your city, your family, and what first got you into computers or editing.",
      ],
    },
    {
      label: "20XX",
      title: "Moving to the UK",
      text: [
        "What the move was like: first impressions, what was hard, what surprised you.",
      ],
    },
    {
      label: "20XX",
      title: "Starting at Your School",
      text: [
        "Your course, the people who helped you, and your first wins.",
      ],
    },
    {
      label: "Now",
      title: "Building and editing",
      text: [
        "The projects and edits you're proud of, and where you're heading next.",
      ],
    },
  ],
};

/* ---------------- Projects ----------------
   slug     : short id used in the link, e.g. #project-study-planner (letters, numbers, hyphens)
   featured : true = shows on the home page (first two featured are used)
   image    : screenshot in assets/projects/ (16:9 works best). "" shows a placeholder window.
   run      : the commands someone types to run it. Use \n for new lines.          */
const PROJECTS = [
  {
    slug: "your-app",
    featured: true,
    category: "Software",
    year: "2026",
    title: "Your App: What it does",
    summary: "Two or three sentences on the problem it solves, who it's for and what makes it different.",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "Vitest", "GitHub Actions"],
    image: "",
    links: { github: "https://github.com/yourgithub/your-app", site: "", demo: "" },
    what: "A short paragraph explaining what the app does and why you built it.",
    how: [
      "Frontend built with React and TypeScript",
      "Data saved in the browser with localStorage",
      "Deployed automatically with GitHub Actions",
    ],
    run: "git clone https://github.com/yourgithub/your-app\ncd your-app\nnpm install\nnpm run dev",
  },
  {
    slug: "second-project",
    featured: true,
    category: "Web",
    year: "2025",
    title: "Second Project: Short tagline",
    summary: "What you built, the tech behind it and what you learned building it.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    image: "",
    links: { github: "https://github.com/yourgithub/second-project", site: "", demo: "" },
    what: "A short paragraph explaining what this API or site does.",
    how: ["FastAPI backend with REST endpoints", "PostgreSQL database", "Interactive docs at /docs"],
    run: "git clone https://github.com/yourgithub/second-project\ncd second-project\npip install -r requirements.txt\nuvicorn main:app --reload",
  },
  {
    slug: "hardware-build",
    featured: false,
    category: "Embedded",
    year: "2025",
    title: "Third Project: Hardware build",
    summary: "A physical build: what it does, the parts you used and how you wired it.",
    tags: ["Arduino", "C++", "Soldering"],
    image: "",
    links: { github: "", site: "", demo: "" },
    what: "What the device does and what you learned.",
    how: ["Arduino Uno", "Custom wiring on perfboard"],
    run: "Open the .ino file in the Arduino IDE\nSelect your board and port\nClick Upload",
  },
];

/* ---------------- Edits (videos) ----------------
   video  : a short MP4 in assets/videos/ (muted, 720p, under ~5 MB). "" = colour placeholder.
   poster : a still image in assets/posters/ used as the thumbnail.
   url    : link to the real post on TikTok / YouTube.
   colors : three colours used as a placeholder until you add the video.
   The first 5 edits play on the phone on the home page.                      */
const EDITS = [
  { title: "Epic loop",        platform: "TikTok",  views: "1.1M", url: "https://www.tiktok.com/@yourhandle", video: "", poster: "", colors: ["#993556", "#26215C", "#D4537E"] },
  { title: "Speed ramp edit",  platform: "YouTube", views: "240K", url: "https://www.youtube.com/@yourchannel", video: "", poster: "", colors: ["#185FA5", "#04342C", "#5DCAA5"] },
  { title: "Colour grade",     platform: "YouTube", views: "86K",  url: "https://www.youtube.com/@yourchannel", video: "", poster: "", colors: ["#993C1D", "#26215C", "#FAC775"] },
  { title: "Sync transitions", platform: "TikTok",  views: "420K", url: "https://www.tiktok.com/@yourhandle", video: "", poster: "", colors: ["#534AB7", "#0b0b0b", "#85B7EB"] },
  { title: "Neon",             platform: "TikTok",  views: "77K",  url: "https://www.tiktok.com/@yourhandle", video: "", poster: "", colors: ["#0F6E56", "#04342C", "#5DCAA5"] },
  { title: "Scribbles",        platform: "TikTok",  views: "52K",  url: "https://www.tiktok.com/@yourhandle", video: "", poster: "", colors: ["#3C3489", "#26215C", "#AFA9EC"] },
  { title: "Flow",             platform: "YouTube", views: "31K",  url: "https://www.youtube.com/@yourchannel", video: "", poster: "", colors: ["#72243E", "#26215C", "#ED93B1"] },
  { title: "They cooked",      platform: "TikTok",  views: "19K",  url: "https://www.tiktok.com/@yourhandle", video: "", poster: "", colors: ["#085041", "#0b0b0b", "#9FE1CB"] },
  { title: "Rain",             platform: "TikTok",  views: "12K",  url: "https://www.tiktok.com/@yourhandle", video: "", poster: "", colors: ["#0C447C", "#042C53", "#85B7EB"] },
];

/* ---------------- Writing (blog posts) ----------------
   body: each string is one paragraph. Lines starting with "## " become sub-headings. */
const POSTS = [
  {
    slug: "seamless-loop",
    type: "Blog",
    title: "How I edit a seamless loop",
    date: "12 Nov 2026",
    minutes: 5,
    excerpt: "My process from clip selection to the final sync.",
    body: [
      "Intro paragraph: what a seamless loop is and why people love them.",
      "## Picking the clip",
      "How you choose the moment that will loop.",
      "## Matching the first and last frame",
      "The trick that makes the loop invisible.",
    ],
  },
  {
    slug: "first-year",
    type: "Journal",
    title: "My first year at Your School",
    date: "2 Nov 2026",
    minutes: 4,
    excerpt: "What I learned and what I'm building next.",
    body: ["Write your post here, one paragraph per string."],
  },
];

/* ---------------- Music player ----------------
   Use music you have the rights to (see the guide: Pixabay Music, YouTube Audio Library, etc).
   src   : an MP3 in assets/music/
   cover : a square image in assets/covers/ ("" = gradient)
   credit: shown on the Music credits list in the footer area                  */
const TRACKS = [
  { title: "Late night loops", artist: "Artist name", src: "assets/music/track1.mp3", cover: "", credit: "Track by Artist name (Pixabay)" },
  { title: "Rainy edit session", artist: "Artist name", src: "assets/music/track2.mp3", cover: "", credit: "Track by Artist name (Pixabay)" },
];
