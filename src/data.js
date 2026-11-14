/* Portfolio content. This is the main file to edit for words, projects, posts and edits.
   Media paths ("assets/...") point into the public/assets folder.
   Spotted a typo? Anyone can suggest a fix: every page has an "Edit on GitHub" link that opens this file. */

export const PROFILE = {
  name: "Emmanuel Mensah",
  initials: "em",
  role: "Software engineer in training · AI agents · full stack · robotics",
  school: "Brunel University London",
  tagline: "I build software that does real work: agents that drive a desktop, full-stack maps, robots that find their way home, and the tools I need for my own edits.",
  bio: "Computer Science (Software Engineering) student at Brunel University London. Born in the UK, grew up in Accra, learned C++ in Dev-C++ at a summer school and built my first PC from other people's leftovers.",
  footerBio: "Computer Science at Brunel. Building agents, full-stack apps and robots. Editing anime as Ruto VFX.",
  location: "London, UK",
  status: "open to placements", // the little green badge on Home. Change or set to "" to hide it
  github: "mannycodes20",
  repo: "mannycodes20/Portfolio-Website", // this site's own repo, used for "Edit on GitHub" links
  youtube: "https://www.youtube.com/@rutovisualfx",
  tiktok: "https://www.tiktok.com/@rutovfx",
  handle: "@rutovfx",
  instagram: "https://www.instagram.com/rutovfx/",
  linkedin: "https://www.linkedin.com/in/emmanuelmensah20/",
  email: "emmanuel_mensah22@yahoo.com",
  cv: "", // put your CV at public/assets/cv.pdf, then set this to "assets/cv.pdf"
  // Your live address. Used in the RSS feed. On Vercel this is filled in automatically if left empty.
  site: "",
  // Newsletter: make a free account at buttondown.com and put your username here, e.g. "emmanuel".
  // Until then the footer shows "Follow via RSS" instead of the email box.
  buttondown: "",
};

/* Guestbook + post comments, stored in GitHub Discussions (free, no database).
   One-time setup (5 minutes):
     1. On GitHub: repo Settings → General → Features → tick "Discussions".
     2. Install the giscus app: https://github.com/apps/giscus (choose this repo).
     3. Open https://giscus.app, type your repo, pick a category (make one called "Guestbook"),
        then copy data-repo-id and data-category-id into repoId and categoryId below. */
export const GISCUS = {
  repo: "mannycodes20/Portfolio-Website",
  repoId: "",
  category: "Guestbook",
  categoryId: "",
};

/* What I'm working on right now (Home page). Keep it to 3 or 4. */
export const NOW = [
  { icon: "robot", title: "Agents that recover from their own mistakes", text: "Making my Gemini computer-use agent notice when a click went wrong in FreeCAD and try again instead of crashing.", link: "#project-general-computer-use-agent" },
  { icon: "drone", title: "Navigating without GPS", text: "A Python pipeline that turns LiDAR mapping data into something a drone can steer by.", link: "#project-lidar-drone-navigation" },
  { icon: "school", title: "Software Engineering at Brunel", text: "Java, robotics and team projects. Last term: A+ on robotics coursework, A* for code quality.", link: "#about" },
  { icon: "terminal-2", title: "This website", text: "React and Vite, with an RSS feed, a nightly GitHub sync and a guestbook. All of it is open source.", link: "https://github.com/mannycodes20/Portfolio-Website" },
];

/* Tech stack (Home page). Group name, then the tools. */
export const STACK = [
  { group: "Languages", icon: "code", items: ["Java", "Python", "C#", "TypeScript", "JavaScript", "C++", "SQL", "HTML/CSS"] },
  { group: "Web and backend", icon: "server-2", items: ["React", "Node.js", "Express", "Prisma", "SQLite", "Zod", "Vite", "Leaflet"] },
  { group: "AI and automation", icon: "brain", items: ["Gemini API", "Computer Use", "Playwright", "Real-ESRGAN", "Multi-agent planning"] },
  { group: "Desktop and systems", icon: "device-desktop", items: [".NET / WPF", "FFmpeg", "Linux", "xdotool", "Maven", "JUnit"] },
  { group: "Hardware", icon: "cpu", items: ["Raspberry Pi", "SwiftBot", "PC building and repair", "LiDAR data"] },
  { group: "Creative", icon: "brush", items: ["After Effects", "Blender", "Motion design", "3D modelling"] },
];

/* About page */
export const ABOUT = {
  title: "About me",
  lead: [
    "I'm Emmanuel Mensah, a Computer Science (Software Engineering) student at Brunel University London. I build full-stack web apps, AI agents that can operate a computer by themselves, and robots that have to cope with real floors and draining batteries. I also edit anime as Ruto VFX, which is how I ended up writing my own AI video upscaler.",
    "I grew up in Accra, Ghana, where internet was a luxury and my school didn't teach computer science. I learned anyway. I learned C++ in Dev-C++ at a summer school, web development from my father at 14, and PC hardware from YouTube videos I had to ration my data for. My first computer was built from other people's leftovers. In 2022, at 17, I came back to the UK, where I was born, with no GCSEs. I took them in seven months, earned a D*DD in BTEC Computer Science and Games Development, and got a place at Brunel.",
    "Technically, I work across the stack. I use Java for robotics and coursework, and Python for agents and data pipelines. I write C# and WPF for desktop tools, TypeScript and React for the web, and Node.js, Express and Prisma for APIs. Real projects have taught me FFmpeg, Playwright, GitHub Actions and the Gemini API. Every project has a full write-up on the Projects page, and the code is on my GitHub.",
  ],
  approach: `// how I work, from a black screen in Accra to Brunel
const me = { curiosity: Infinity, feelsLikeIKnowEnough: false };

while (!me.feelsLikeIKnowEnough) {
  const result = build(somethingNew);   // even if it breaks
  listen(result.feedback);              // criticism too, nobody's perfect
  changeOneThing();                     // one part at a time
  me.feelsLikeIKnowEnough = false;      // there's always more to learn
}

// failure isn't the crash. failure is when you stop trying.`,
  story: [
    {
      label: "Accra, Ghana",
      title: "Where Wi-Fi was a luxury",
      image: "assets/img/accra.jpg",
      alt: "The Accra skyline",
      text: [
        "I was born in the UK, but I didn't grow up here. My mum was new to the country and couldn't look after a baby while she found her feet, so she made the hardest sacrifice a parent can make and sent me to Ghana. My grandma took me in and raised me in Accra. That's where I fell for computers. From primary school to the end of secondary school, I was the top student in my IT class every year.",
        "Wanting to learn and being able to were two different things. We didn't have Wi-Fi at home, and free Wi-Fi didn't exist where I lived. Every YouTube video cost mobile data, so I had to choose what to research. I spent most of it on PC hardware and on trying to build my first app. When I got a chance to learn something, I took it, because I didn't know when the next one would come.",
      ],
    },
    {
      label: "Accra, Ghana",
      title: "A computer made of other computers",
      image: "assets/img/pc-case.jpg",
      alt: "An open desktop computer case with its parts showing",
      text: [
        "Buying a computer wasn't an option, so I stopped waiting for one. Whenever a friend's family replaced an old PC, I asked if I could have it. Most of them didn't work. I'd carry them home, open them up and test every part I could get out: power supplies, RAM, hard drives, cables. Anything that worked went into a pile. Anything that didn't, I kept anyway, in case it could teach me something.",
        "There was no manual and nobody to ask. I plugged things into the wrong slots and booted machines that showed nothing but a black screen. Then I swapped one part at a time until I knew which one had failed. Eventually the screen came on. That machine was my first computer, and the black screen was my first error message. It's still how I debug: change one thing, watch what happens, ask why.",
      ],
    },
    {
      label: "Accra, Ghana",
      title: "Hello, World, twice",
      image: "assets/img/devcpp.jpg",
      alt: "A Hello World program open in the Dev-C++ editor",
      text: [
        "My first real code was C++. It was part of a summer programme at Happy Kids School, where we wrote our first programs in Dev-C++ and learned the basics: variables, loops, conditions and the joy of a program that compiles first time.",
        "At 14 my father taught me web development. It wasn't anything fancy, but seeing \"Hello World\" on a live web page felt like magic. My secondary school didn't offer computer science, so I studied Business instead, which I found interesting but which wasn't my first choice. So I signed up for a part-time IT school alongside it, and kept learning computing on my own time.",
      ],
    },
    {
      label: "London, 2022",
      title: "Seventeen, and starting from zero",
      image: "assets/img/stratford.jpg",
      alt: "The Stratford skyline in East London",
      text: [
        "In 2022 I came back to the UK. My mum wanted me to study something health-related. I knew what was in my heart: computer science. For the first time in my life I could actually study it, but there was a problem. To do A-levels I needed GCSEs, and at 17 no sixth form would take me.",
        "So I went to a sixth form college and did my GCSEs in seven months. I got a 6 in Maths, a 5 in English, 6-5 in Combined Science and a 6 in Media Studies. The college offered me A-level Computer Science, but I'd need two more subjects, and the ones I wanted were Maths and Physics, which needed stronger grades. I asked what the best alternative was, and they found me a place on their BTEC Computer Science and Games Development course. There was one condition: I had to keep my grades excellent the whole way through, or I'd be withdrawn. I agreed.",
      ],
    },
    {
      label: "NewVIc",
      title: "From \"on condition\" to top of the department",
      text: [
        "By the end of my first year I was the top student in my class and in the whole computer science department. I was chosen as the Computer Science student representative, sitting in department meetings to work through problems in IT with staff. I was also a Student Council representative and a peer mentor for new students, because I knew exactly what it felt like to be new.",
        "When Ofsted inspected the college, I was one of the students selected to speak to the inspectors. They asked what studying there was really like and challenged us with technical questions, and it went really well for the college. I finished the course with D*DD, which got me into Brunel.",
      ],
    },
    {
      label: "Brunel University London",
      title: "Software Engineering, and robots that don't behave",
      image: "assets/img/brunel.jpg",
      alt: "Brunel University London campus",
      text: [
        "At Brunel I study Computer Science (Software Engineering). I've met amazing people, explored careers I didn't know existed and pushed my knowledge much further. Some of the most fun I've had is programming SwiftBots, small Raspberry Pi robots, in Java. In SwiftZig you hold up a QR code, and the robot drives a zigzag, lights up and then retraces its path back to the start.",
        "Real robots aren't predictable. Battery level, the floor, even the direction a robot last turned all change the result. So I wrote a calibration tool, timed every turn and measured each run. On a six-section zigzag the robot comes back within 5 cm of where it started. I earned an A+ on the coursework, with an A* for code quality.",
      ],
    },
    {
      label: "Ruto VFX",
      title: "Where editing and code collided",
      text: [
        "Outside of code I edit anime as Ruto VFX. I taught myself After Effects and Blender and post my edits to TikTok and YouTube. Editing is how I relax, and it's also where some of my best engineering ideas have come from.",
        "I got tired of paying for video upscalers that were slow or gave bad results, so I built my own. FookUpscaler is a C# desktop app that runs every frame through Real-ESRGAN. Building it meant learning FFmpeg pipelines and patching MP4 metadata byte by byte when the usual libraries couldn't handle my files. It's the same lesson as that first PC: when the thing you need doesn't exist or costs too much, build it yourself.",
      ],
    },
    {
      label: "Now",
      title: "Curiosity is the engine",
      text: [
        "Lately I've been building AI agents. For the Google Gemini Live Agent Challenge I built a multi-agent system that operates a Linux desktop on its own: it designs parts in FreeCAD, researches specs online and writes reports. I also built TickTrack UK, a full-stack map of tick sightings, for the Elanco Placement Programme, and I'm working on LiDAR-based navigation for drones without GPS.",
        "Sometimes it feels like I don't know enough. That's where my curiosity comes in, and it's what got me here. To me, failure is when you stop trying. I give everything I do my full effort, and I listen to feedback, setbacks and criticism, because none of us are perfect. We look for challenges because they give us experience. That's what makes it worth it.",
      ],
    },
  ],
  education: [
    {
      place: "Brunel University London",
      where: "Uxbridge, London",
      url: "https://www.brunel.ac.uk/",
      course: "BSc (Hons) Computer Science (Software Engineering)",
      grade: "In progress",
      text: "Software engineering, Java, robotics and team projects. Robotics coursework: A+, with an A* for code quality.",
      modules: ["Java programming", "Robotics with SwiftBot", "Software engineering", "Team project (Simon Swift)"],
    },
    {
      place: "Newham Sixth Form College (NewVIc)",
      where: "London",
      url: "https://www.newvic.ac.uk/",
      course: "BTEC Level 3, Computer Science and Games Development",
      grade: "D*DD",
      text: "Accepted on condition of excellent grades throughout. Finished as the top student in the computer science department. Course rep, Student Council rep, peer mentor and student speaker for the Ofsted inspection.",
      modules: ["Object-oriented programming", "Games development", "Mobile development"],
    },
    {
      place: "Newham Sixth Form College (NewVIc)",
      where: "London",
      url: "https://www.newvic.ac.uk/",
      course: "GCSEs in seven months",
      grade: "Maths 6 · Combined Science 6-5 · Media Studies 6 · English 5",
      text: "I arrived in the UK at 17 with no GCSEs and took them in a single seven-month push.",
      modules: [],
    },
    {
      place: "Secondary school, Accra",
      where: "Ghana",
      url: "",
      course: "Business, plus a part-time IT school alongside it",
      grade: "Top of my IT class every year",
      text: "My school didn't offer computer science, so I studied Business and took IT classes part time. Before that, I learned C++ in Dev-C++ in a summer programme at Happy Kids School.",
      modules: [],
    },
  ],
  roles: [
    { title: "Computer Science student representative", org: "NewVIc", text: "Spoke for students in department meetings and helped work through problems in IT with staff." },
    { title: "Student speaker, Ofsted inspection", org: "NewVIc", text: "Chosen to speak to inspectors about student life and answer their technical questions." },
    { title: "Student Council representative", org: "NewVIc", text: "Represented students across the college." },
    { title: "Peer mentor", org: "NewVIc", text: "Helped new students settle in, because I'd been the new one too." },
  ],
  languages: [
    ["English", "Fluent"],
    ["Twi", "Native"],
  ],
  interests: [
    { group: "Software", items: ["Full-stack web apps", "Developer tools", "Open source", "Desktop apps"] },
    { group: "AI", items: ["Computer-use agents", "Multi-agent planning", "AI upscaling", "Computer vision"] },
    { group: "Hardware", items: ["PC building and repair", "Raspberry Pi robots", "Drones and LiDAR"] },
    { group: "Creative tech", items: ["VFX and motion design", "3D in Blender", "Video pipelines with FFmpeg"] },
  ],
  outside: "When I'm not coding or editing, I'm usually making small 3D designs and animations in Blender just for fun, watching anime, gaming, at the gym or playing football. I listen to a lot of music, and I still can't walk past a broken PC without wanting to open it up.",
  hobbies: ["3D design", "Blender animation", "Anime", "Gaming", "Gym", "Football", "Music", "Fixing hardware", "Video editing"],
};

/* Pictures from the internet used on the site, with their licences (shown on the Credits page).
   Replace any of them with your own photos whenever you like. */
export const IMAGE_CREDITS = [
  { file: "assets/img/accra.jpg", what: "Accra skyline", author: "Synth85", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Accra_Skyline.jpg" },
  { file: "assets/img/pc-case.jpg", what: "ATX computer case", author: "Tiia Monto", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:ATX_computer_case.jpg" },
  { file: "assets/img/devcpp.jpg", what: "Hello World in Dev-C++", author: "OxyLight", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Hello_World_program_in_Dev_C%2B%2B.png" },
  { file: "assets/img/stratford.jpg", what: "Stratford skyline", author: "The wub", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Stratford_skyline_from_north_end_of_Hackney_Marshes_2022-03-12.jpg" },
  { file: "assets/img/brunel.jpg", what: "Brunel University London campus", author: "DiscoA340", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Brunel_University_London_Campus_(August_2023)_05.jpg" },
  { file: "assets/img/raspberry-pi.jpg", what: "Raspberry Pi 4 Model B", author: "Laserlicht", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Raspberry_Pi_4_Model_B_-_Top.jpg" },
  { file: "assets/img/freecad.jpg", what: "FreeCAD", author: "Tony Rotondas", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:FreeCAD_Arrays.png" },
  { file: "assets/img/lidar.jpg", what: "Ouster lidar point cloud", author: "Daniel L. Lu", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Ouster_OS1-64_lidar_point_cloud_of_intersection_of_Folsom_and_Dore_St,_San_Francisco.png" },
];

const GH = "https://github.com/mannycodes20/";

export const PROJECTS = [
  {
    slug: "ticktrack-uk",
    featured: true,
    category: "Full stack",
    year: "2026",
    title: "TickTrack UK",
    summary: "A free map of tick sightings that shows pet owners where ticks are being found across the UK. Built for the Elanco Placement Programme technical task.",
    tags: ["React", "TypeScript", "Leaflet", "Express", "Prisma", "SQLite", "Zod"],
    image: "assets/projects/ticktrack.jpg",
    links: { github: GH + "ticktrack-uk", site: "", demo: "https://youtu.be/N7NBXSH8kqI" },
    what: "TickTrack takes Elanco's tick sighting data, stores it in its own database and turns it into an interactive map of the UK's 12 regions, a guide to the five tick species and a form where anyone can report a tick they've found. Regions are shaded by how many sightings they have, and you can filter by species and date, search for a city, and share a link straight to any region.",
    how: [
      "The frontend is React 19 with TypeScript, built with Vite. The map uses Leaflet with OpenStreetMap tiles and GeoJSON region outlines.",
      "The backend is Node.js with Express 5. Data lives in SQLite through Prisma, so there's no database server to install.",
      "Zod checks every query, form submission and incoming Elanco record, with a clear error message for each field. helmet and cors lock down the API.",
      "I worked like a team: every feature had its own GitHub issue and branch, and GitHub Actions CI had to pass before I merged a pull request.",
      "The seasonal chart and timeline are plain HTML and CSS, with no chart library, to keep the site small.",
    ],
    run: `git clone https://github.com/mannycodes20/ticktrack-uk.git
cd ticktrack-uk

# 1. API (first terminal)
cd server
npm install
cp .env.example .env
npx prisma migrate deploy
npm run dev

# 2. Website (second terminal)
cd client
npm install
npm run dev
# open http://localhost:5173`,
  },
  {
    slug: "general-computer-use-agent",
    featured: true,
    category: "AI agents",
    year: "2026",
    title: "General Computer Use Agent",
    summary: "A multi-agent system that operates a Linux desktop on its own to do engineering design: it models parts in FreeCAD, researches specs online and writes reports. Built for the Google Gemini Live Agent Challenge.",
    tags: ["Python", "Gemini", "Computer Use", "FreeCAD", "Playwright", "Multi-agent"],
    image: "assets/img/freecad.jpg",
    links: { github: GH + "General_Computer_Use_Agent-", site: "", demo: "" },
    what: "You give it a request like \"Make a bracket for an M6 bolt\". A planner decides which agents to use. The Research agent finds the real bolt dimensions online, the Documentation agent writes them up as a Word and PDF report, and the CAD agent builds the 3D part in FreeCAD by looking at the screen and using the mouse and keyboard like a person would.",
    how: [
      "The CAD and Research agents use Gemini's Computer Use vision model. They take a screenshot, decide what to do, then click and type using xdotool.",
      "For precise geometry, the CAD agent runs Python macros directly in FreeCAD's console instead of drawing everything by hand.",
      "A planner powered by Gemini 3.1 Pro routes each request across the specialist agents and passes results between them.",
      "The Research agent drives Chromium through Playwright, reads pages and pulls out structured data with source links. The Documentation agent turns that into reports with fpdf2 and python-docx.",
      "The hardest part was getting the agents to notice their own mistakes and recover instead of crashing.",
    ],
    run: `# Runs on an Ubuntu desktop VM (setup steps are in the README)
python main.py

# or one command
python main.py "Make a bracket for an M6 bolt"
python main.py --cad "Create a 30mm cube in FreeCAD"`,
  },
  {
    slug: "fookupscaler",
    featured: true,
    category: "Desktop app",
    year: "2026",
    title: "FookUpscaler",
    summary: "An AI-powered video upscaler using Real-ESRGAN. I built it as a free alternative to Topaz Video AI, and I use it on my own edits.",
    tags: ["C#", "WPF", ".NET", "Real-ESRGAN", "FFmpeg"],
    image: "",
    links: { github: GH + "FookUpscaler", site: "", demo: "" },
    what: "I got tired of paying for upscalers that were slow or gave bad results, so I built my own Windows app. FookUpscaler takes a video, upscales every frame with the Real-ESRGAN AI model and puts it back together at a higher resolution, ready to use in an edit.",
    how: [
      "The app is written in C# with WPF on .NET.",
      "FFmpeg pipelines split the video into frames and rebuild it after Real-ESRGAN has upscaled them.",
      "Some of my files had edge cases standard libraries couldn't handle, so I patched the MP4 metadata myself at the byte level.",
    ],
    run: `git clone https://github.com/mannycodes20/FookUpscaler.git
# open FookUpscaler.slnx in Visual Studio 2022, then press F5`,
  },
  {
    slug: "swiftzig",
    featured: false,
    category: "Robotics",
    year: "2026",
    title: "SwiftZig",
    summary: "Scan a QR code and a SwiftBot robot drives a zigzag, lights up and then retraces its path back to where it started.",
    tags: ["Java", "Maven", "Raspberry Pi", "JUnit"],
    image: "assets/img/raspberry-pi.jpg",
    links: { github: GH + "SwiftZig-Public", site: "", demo: "" },
    what: "SwiftZig is a Java program for the Brunel SwiftBot. Instead of a hard-coded route, you hold a QR code up to the robot's camera. It sets the section length, the number of sections and the LED colours. The robot drives the zigzag, lighting its underlights a different colour for each turn, then pivots 180° and drives the same path home. Every journey is timed and logged.",
    how: [
      "A parent class handles movement, turns and LEDs, and the main program reads and validates the QR input.",
      "A separate calibration tool tunes wheel drift and turn timing before a live run. I settled on 475 ms for a 90° turn.",
      "Distance is calculated from speed. 50 cm at full speed takes about 1000 ms, and other distances scale from that.",
      "On a 6-section zigzag the robot returns within 5 cm of where it started, after 12 corners.",
    ],
    run: `git clone https://github.com/mannycodes20/SwiftZig-Public.git
cd SwiftZig-Public
mvn clean package
java -cp target/classes:src/main/java/SwiftBot-API-6.0.0.jar Main`,
  },
  {
    slug: "simon-swift",
    featured: false,
    category: "Robotics",
    year: "2025",
    title: "Simon Swift",
    summary: "A group SwiftBot project written in Java with Maven.",
    tags: ["Java", "Maven", "Team project"],
    image: "",
    links: { github: GH + "Simon-Swift---SwiftBot", site: "", demo: "" },
    what: "A group coursework project for the SwiftBot robot, built in Java with Maven.",
    how: [],
    run: `git clone https://github.com/mannycodes20/Simon-Swift---SwiftBot.git
cd Simon-Swift---SwiftBot
mvn clean package`,
  },
  {
    slug: "lidar-drone-navigation",
    featured: false,
    category: "Research",
    year: "",
    title: "LiDAR for drone navigation",
    summary: "I'm exploring how LiDAR mapping data could help drones navigate when GPS isn't available.",
    tags: ["Python", "LiDAR"],
    image: "assets/img/lidar.jpg",
    links: { github: "", site: "", demo: "" },
    what: "I built a Python pipeline to process LiDAR mapping data for this ongoing project.",
    how: ["I use Python to process the mapping data."],
    run: "",
  },
  {
    slug: "shopping-cart-system",
    featured: false,
    category: "Java",
    year: "2026",
    title: "Shopping Cart System",
    summary: "A Java console app that simulates a simple shopping cart.",
    tags: ["Java", "Console"],
    image: "",
    links: { github: GH + "Shoping-Cart-System", site: "", demo: "" },
    what: "A basic Java console application that simulates a simple shopping cart experience.",
    how: [],
    run: "",
  },
  {
    slug: "madlib-game",
    featured: false,
    category: "Java",
    year: "2026",
    title: "MadLibs Game",
    summary: "The classic MadLibs word game as a Java console app.",
    tags: ["Java", "Console"],
    image: "",
    links: { github: GH + "Madlib-Game", site: "", demo: "" },
    what: "A Java console application implementing the classic MadLibs game. It prompts you for words, then fills them into a story.",
    how: [],
    run: "",
  },
];

/* Your edits, newest first. They all play on the phone (in this order) and show in the gallery.

   EASIEST: just paste the video link. TikTok and YouTube links play right in the phone.
     { title: "Gojo loop", url: "https://www.tiktok.com/@rutovfx/video/7312345678901234567" },
     { title: "Itachi AMV", url: "https://www.youtube.com/shorts/AbCdEfGhIjK" },

   BEST LOOKING: also add your own mp4 (put it in public/assets/videos).
   It autoplays, loops and fills the screen with no TikTok/YouTube buttons or cookie popups.
     { title: "Gojo loop", url: "https://www.tiktok.com/@rutovfx/video/...",
       video: "assets/videos/gojo.mp4", poster: "assets/posters/gojo.jpg", views: "12K views" },

   Optional: platform ("TikTok"/"YouTube", worked out from the link if left out),
   colors: three colours for the glow, e.g. ["#26215c", "#0c0c0d", "#993556"]. */
const TT = "https://www.tiktok.com/@rutovfx/video/";

export const EDITS = [
  { title: "Rockwav", url: TT + "7703977535012392214",
    video: "assets/videos/rockwav.mp4", poster: "assets/posters/rockwav.jpg" },
  { title: "Daytona · Obito vs Kakashi", url: TT + "7696584058813402390",
    video: "assets/videos/daytona-obito-vs-kakashi.mp4", poster: "assets/posters/daytona-obito-vs-kakashi.jpg" },
  { title: "The Dairy · Mushoku Tensei", url: TT + "7690697573635476758",
    video: "assets/videos/mushoku-tensei.mp4", poster: "assets/posters/mushoku-tensei.jpg" },
  { title: "Monogatari", url: TT + "7686064053998931222",
    video: "assets/videos/monogatari.mp4", poster: "assets/posters/monogatari.jpg" },
  { title: "Black Clover (experimental)", url: TT + "7680661724806139158",
    video: "assets/videos/black-clover.mp4", poster: "assets/posters/black-clover.jpg" },
  { title: "Aang vs Ozai", url: TT + "7673418664468630806",
    video: "assets/videos/aang-vs-ozai.mp4", poster: "assets/posters/aang-vs-ozai.jpg" },
  { title: "Static · Evangelion", url: TT + "7669737753210342678",
    video: "assets/videos/static-evangelion.mp4", poster: "assets/posters/static-evangelion.jpg" },
  { title: "", url: TT + "7663243362689928470",
    video: "assets/videos/finished.mp4", poster: "assets/posters/finished.jpg" },
  // Edits without a video file are hidden, so this one only shows once you add its mp4:
  { title: "", url: TT + "7659343705039457558" },
];

export const POSTS = [
  {
    slug: "my-first-pc",
    type: "Journal",
    title: "How I built my first PC",
    date: "",
    minutes: 1,
    excerpt: "I built my first computer from parts I salvaged from friends' old PCs in Ghana.",
    body: [
      "I grew up in Accra with my grandma. When I wanted a computer, I knew we couldn't afford to buy one. I started collecting old computers from friends and taking out whatever still worked.",
      "I had to teach myself how the parts fitted together. It took time and a lot of trial and error before I had a working PC. The parts were old, but I'd put it together myself.",
      "That was where my interest in computers started. I still approach new problems the same way I approached that first build. I try something, see what happens and keep going until I understand why it works.",
    ],
  },
];

/* Add tracks once the audio files and credits are available.
   Example: { title: "Late night", artist: "Artist", src: "assets/music/track1.mp3",
              cover: "assets/covers/track1.jpg", credit: "Artist via Pixabay" } */
export const TRACKS = [];
