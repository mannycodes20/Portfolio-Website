/* Portfolio content. This is the only file you need to edit for content.
   Media paths ("assets/...") point into the public/assets folder. */

export const PROFILE = {
  name: "Emmanuel Mensah",
  initials: "em",
  role: "Student · developer · video editor",
  school: "Brunel University London",
  bio: "I study Computer Science at Brunel University London. I grew up in Ghana, where I built my first PC from salvaged parts. Now I build software and make anime vfx edits as Ruto VFX.",
  footerBio: "I study Computer Science at Brunel, build software and make anime edits as Ruto VFX.",
  github: "mannycodes20",
  youtube: "https://www.youtube.com/@rutovisualfx",
  tiktok: "https://www.tiktok.com/@rutovfx",
  handle: "@rutovfx",
  instagram: "https://www.instagram.com/rutovfx/",
  linkedin: "https://www.linkedin.com/in/emmanuelmensah20/",
  email: "emmanuel_mensah22@yahoo.com",
  cv: "", // put your CV at public/assets/cv.pdf, then set this to "assets/cv.pdf"
};

export const STORY = {
  title: "From Ghana to the UK",
  steps: [
    {
      label: "Ghana",
      title: "My first computer",
      text: [
        "I grew up in Ghana with my grandmother. We couldn't afford to buy a PC, so I collected old computers from friends and kept the parts that still worked.",
        "I taught myself how the parts fit together. It took a lot of trial and error to get the computer working. Building it showed me how much I could figure out by being curious and sticking with a problem.",
      ],
    },
    {
      label: "",
      title: "Moving to the UK",
      text: [
        "I moved from Ghana to the UK. At college, I became the Computer Science student representative and spoke for students in department meetings. I also worked as a peer mentor, helping new students settle in.",
      ],
    },
    {
      label: "",
      title: "Studying Computer Science at Brunel",
      text: [
        "I went on to study Computer Science at Brunel University London. My coursework has included programming robots in Java, and I've been learning React and Next.js alongside my degree.",
      ],
    },
    {
      label: "Now",
      title: "Building and editing",
      text: [
        "Outside my degree, I've built a multi-agent system for a hackathon and written a Python pipeline for LiDAR mapping data. On the creative side, I make anime loops as Ruto VFX and have taught myself After Effects and Blender.",
      ],
    },
  ],
};

export const PROJECTS = [
  {
    slug: "multi-agent-engineering-design",
    featured: true,
    category: "AI",
    year: "",
    title: "Multi-agent AI for engineering design",
    summary: "I built a multi-agent AI system to automate engineering design tasks for the Google Gemini Live Agent Challenge.",
    tags: ["AI agents"],
    image: "",
    links: { github: "", site: "", demo: "" },
    what: "I used the challenge to explore how multiple AI agents could work together on engineering design tasks.",
    how: [],
    run: "",
  },
  {
    slug: "lidar-drone-navigation",
    featured: true,
    category: "Software",
    year: "",
    title: "LiDAR for drone navigation",
    summary: "I'm exploring how LiDAR mapping data could help drones navigate when GPS is unavailable.",
    tags: ["Python", "LiDAR"],
    image: "",
    links: { github: "", site: "", demo: "" },
    what: "I built a Python pipeline to process LiDAR mapping data for this ongoing project.",
    how: ["I use Python to process the mapping data."],
    run: "",
  },
  {
    slug: "java-robotics",
    featured: false,
    category: "Coursework",
    year: "",
    title: "Java robotics coursework",
    summary: "I programmed robots in Java as part of my Computer Science degree.",
    tags: ["Java", "Robotics"],
    image: "",
    links: { github: "", site: "", demo: "" },
    what: "I earned an A+ on the robotics coursework, with an A* for code quality.",
    how: [],
    run: "",
  },
];

/* Add individual edits when their titles and media are available.
   Example:
   { title: "Gojo loop", platform: "TikTok", views: "12K views",
     url: "https://www.tiktok.com/@rutovfx/video/...",
     video: "assets/videos/gojo.mp4", poster: "assets/posters/gojo.jpg",
     colors: ["#26215c", "#0c0c0d", "#993556"] }, */
export const EDITS = [];

export const POSTS = [
  {
    slug: "my-first-pc",
    type: "Journal",
    title: "How I built my first PC",
    date: "",
    minutes: 1,
    excerpt: "I built my first computer from parts I salvaged from friends' old PCs in Ghana.",
    body: [
      "I grew up in Ghana with my grandmother. When I wanted a computer, I knew we couldn't afford to buy one. I started collecting old computers from friends and taking out whatever still worked.",
      "I had to teach myself how the parts fitted together. It took time and a lot of trial and error before I had a working PC. The parts were old, but I'd put it together myself.",
      "That was where my interest in computers started. I still approach new problems the same way I approached that first build. I try something, see what happens and keep going until I understand why it works.",
    ],
  },
];

/* Add tracks once the audio files and credits are available.
   Example: { title: "Late night", artist: "Artist", src: "assets/music/track1.mp3",
              cover: "assets/covers/track1.jpg", credit: "Artist via Pixabay" } */
export const TRACKS = [];
