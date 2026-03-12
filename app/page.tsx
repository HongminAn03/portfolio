"use client";
import { useState, useEffect, useRef } from "react";

const timeline = [
  { date: "v2003.03.03", title: "Born in Seoul, South Korea", description: "Date of Birth: March 3, 2003." },
  { date: "v2004.02", title: "Moved to Europe", description: "2004 - 2005: Amsterdam, Netherlands.\n2005 - 2006: Paris, France.\n2006 - 2019: Düsseldorf, Germany.\nNotes: English in school, Korean at home, and German in public spaces.\nNaturally Trilingual from a young age." },
  { date: "v2019.08", title: "Moved back to Korea", description: "2019 - 2021: Seoul, South Korea.\nNotes: Reconnected with Korean culture, clashing with my European upbringing." },
  { date: "v2021.09", title: "Penn State", description: "2021 - 2022: College of Engineering, Computer Science major.\nNotes: First year of college, first taste of autonomy and independence." },
  { date: "v2022.11", title: "Republic of Korea Army", description: "2022 - 2024: Served at the coastal frontlines as a coastal surveillance radar operator.\nNotes: Developed drone tracking software in Excel, awarded Special Warrior at discharge." },
  { date: "v2024.09", title: "Back to Penn State", description: "2024 - Present: Declaration of Computer Science major.\nNotes: Keeping up with AI trends and building to solve." },
  { date: "v2025.01", title: "Founded the Korean Band Association", description: "2025 - Present: Founded KBA, built a community of 30+ members, performed at large stages (Krazy About Korea, Spring Festival, Spring Banquet)." },
  { date: "v2025.06", title: "Interned at Displicare", description: "2025: Fabless display driver IC company in Seoul.\nNotes: Solved a real flicker problem in PWM dimming, and built a hardware sensor tool from spare parts just because I was curious." },
  { date: "v2025.09", title: "MyCord + Nittany AI Challenge", description: "2025: Participated in Nittany AI Challenge and HackPSU.\nNotes: Built a Discord-inspired messaging system in C, and co-created Nittany Buddy — a gamified study app powered by LLMs for the Nittany AI Challenge." },
  { date: "Current Patch", title: "Loading...", description: "Building to Solve." },
];

const projects = [
  {
    title: "Nittany Buddy",
    date: "2025 - 2026",
    status: "WIP",
    problem: "Studying is boring — how can we gamify it with AI?",
    solution: "Built an LLM-powered study companion that turns notes into interactive quests and challenges.",
    tags: ["TypeScript", "React", "Python", "SQL", "Docker", "Figma"],
    link: "https://github.com/jalo0228/Nittany-AI-Challenge",
    image: "/nittany-buddy.png",
  },
  {
    title: "UART Brightness Sensor",
    date: "2025",
    status: "Live",
    problem: "Spare parts, no budget, a real engineering problem.",
    solution: "Wired a brightness sensor from spare parts at Displicare to read ambient light over UART and plot real-time data.",
    tags: ["C", "Python", "Arduino", "UART"],
    link: "https://github.com/HongminAn03/UART-Brightness-Sensor",
    image: "/soldering-image.jpg",
  },
  {
    title: "MyCord",
    date: "2025",
    status: "Archived",
    problem: "Can you build Discord from scratch, in C?",
    solution: "Multi-channel messaging system with socket I/O and concurrent client handling — no libraries, no shortcuts.",
    tags: ["C", "Linux", "POSIX"],
    link: "https://github.com/PSU-CMPSC-311-FA25/mycord-HongminAn03",
    image: "/mycord.png",
  },
  {
    title: "EM Pulse Dimming Algorithm",
    date: "2025",
    status: "Live",
    problem: "PWM dimming makes displays flicker — what's the right algorithm to fix it?",
    solution: "Built a spread-spectrum pulse algorithm that distributes switching noise and exports analysis to Excel.",
    tags: ["C", "Python", "Excel"],
    link: "https://github.com/HongminAn03/EM-Pulse-Algorithm",
    image: "/pulse-sequence.png",
  },
  {
    title: "Course Scheduler",
    date: "2024",
    status: "Live",
    problem: "Hard to navigate your school's schedule builder?",
    solution: "Built a Java Swing app with student/admin roles, live seat tracking, waitlists, and a real embedded database.",
    tags: ["Java", "Swing", "Apache Derby", "JDBC", "SQL"],
    link: "https://github.com/HongminAn03/CourseScheduler",
    snippet: ["conn = DriverManager.getConnection(", '  "jdbc:derby:schedDB"', ");", "stmt.executeQuery(", '  "SELECT * FROM courses"', "  \"WHERE seats > 0\"", ");"],
  },
  {
    title: "Drone Tracking Tool",
    date: "2022 - 2024",
    status: "Private",
    problem: "Tired of manually calculating drone locations with a calculator?",
    solution: "Wrote a VBA tracking tool on the frontlines that automated target logging — awarded Special Warrior at discharge.",
    tags: ["Excel VBA"],
    link: "#",
    image: "/drone.jpg",
  },
];

const tagIcons: Record<string, string> = {
  "Java":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "C":          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  "Python":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "React":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "Git":        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "Linux":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  "SQL":        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "Docker":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "Figma":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  "Arduino":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg",
  "HTML":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS":        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "Bash":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  "NumPy":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  "MongoDB":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "GitHub":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "Jupyter":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
  "Node.js":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "TensorFlow": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  "VS Code":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "JSON":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg",
  "Terminal":   "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  "PuTTY":      "/putty%20icon.png",
  "MS Office":  "/office-365%20icon.png",
  "Cursor":     "/cursor%20icon.png",
  "Vercel":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
};

const stackCategories = [
  { label: "Languages", skills: ["Java", "C", "Python", "JavaScript", "TypeScript", "Bash"] },
  { label: "Frontend",  skills: ["React", "Next.js", "HTML", "CSS", "Figma"] },
  { label: "Backend",   skills: ["SQL", "Docker", "MongoDB", "Node.js", "JSON"] },
  { label: "Data",      skills: ["NumPy", "Jupyter", "TensorFlow"] },
  { label: "Systems",   skills: ["Linux", "Git", "GitHub", "MS Office"] },
  { label: "Tools",     skills: ["VS Code", "Cursor", "Vercel", "PuTTY", "Arduino", "Terminal"] },
];


const roles = ["Software Engineer", "Systems Developer", "AI Tinkerer", "Full Stack Developer"];

export default function Home() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [scrolled, setScrolled] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [activeProject, setActiveProject] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const leafPosRefs = useRef<(HTMLDivElement | null)[]>([]);
  const branchRefs = useRef<(HTMLDivElement | null)[]>([]);
  const branchPhysics = useRef(stackCategories.map(() => ({ angle: 0, vel: 0 })));
  const wheelState = useRef({ offset: 0, velocity: 0, isDragging: false, dragStartX: 0, dragStartOffset: 0, prevX: 0 });
  const stackRafRef = useRef<number>(0);

  // Typewriter state
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
      setScrolled(window.scrollY > heroHeight * 0.4);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 45);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);


  // Timeline scroll-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 }
    );
    timelineRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Wheel drag + swing physics
  useEffect(() => {
    const N = stackCategories.length;

    const SLOT_W = 340;
    const MIN_OFF = -(N - 1) * SLOT_W;

    const onMouseMove = (e: MouseEvent) => {
      const ws = wheelState.current;
      if (!ws.isDragging) return;
      ws.velocity = e.clientX - ws.prevX;
      ws.prevX = e.clientX;
      ws.offset = ws.dragStartOffset + (e.clientX - ws.dragStartX);
    };

    const onMouseUp = () => {
      wheelState.current.isDragging = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const loop = () => {
      const ws = wheelState.current;

      if (!ws.isDragging) {
        ws.velocity *= 0.94;
        ws.offset += ws.velocity;
        // Snap to nearest slot when nearly stopped
        if (Math.abs(ws.velocity) < 1.5) {
          const nearest = -Math.round(-ws.offset / SLOT_W) * SLOT_W;
          ws.offset += (nearest - ws.offset) * 0.1;
        }
        // Soft-bounce at edges
        if (ws.offset > 0)        { ws.offset *= 0.8; ws.velocity *= -0.4; }
        if (ws.offset < MIN_OFF)  { ws.offset = MIN_OFF + (ws.offset - MIN_OFF) * 0.8; ws.velocity *= -0.4; }
      }

      for (let i = 0; i < N; i++) {
        const posX  = ws.offset + i * SLOT_W;
        const dist  = posX / SLOT_W;
        const abs   = Math.abs(dist);
        const scale = Math.max(0.75, 1 - abs * 0.13);
        const opacity = Math.max(0, 1 - abs * 0.5);

        const card = leafPosRefs.current[i];
        if (card) {
          card.style.transform = `translateX(${posX}px) scale(${scale.toFixed(3)})`;
          card.style.opacity   = opacity.toFixed(3);
          card.style.zIndex    = String(Math.round(10 - abs * 4));
        }

        const p = branchPhysics.current[i];
        p.vel = p.vel * 0.86 - p.angle * 0.08 + ws.velocity * 0.025;
        p.angle = Math.max(-15, Math.min(15, p.angle + p.vel));

        const content = branchRefs.current[i];
        if (content) {
          content.style.transform = `rotate(${p.angle}deg)`;
          content.style.transformOrigin = "top center";
          const glow = Math.max(0, 1 - abs * 1.5);
          content.style.boxShadow = glow > 0.05 ? `0 0 ${Math.round(glow * 48)}px rgba(96,165,250,${(glow * 0.18).toFixed(3)})` : "none";
          content.style.borderColor = glow > 0.05 ? `rgba(96,165,250,${(glow * 0.4).toFixed(3)})` : "";
        }
      }

      stackRafRef.current = requestAnimationFrame(loop);
    };
    stackRafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(stackRafRef.current);
    };
  }, []);

  const prevProject = () => setActiveProject((a) => Math.max(0, a - 1));
  const nextProject = () => setActiveProject((a) => Math.min(projects.length - 1, a + 1));

  return (
    <main className="bg-[#0a0a0f] text-white cursor-none">

      {/* Floating avatar — bottom-right, visible after scrolling past hero */}
      <div
        className="fixed bottom-6 right-6 z-40 transition-all duration-500"
        style={{
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)",
          pointerEvents: scrolled ? "auto" : "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/avatar.png" alt="Hongmin An" className="w-20 h-20 object-contain" />
      </div>


      {/* Global particle canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HERO */}
      <section id="hero" ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        {/* Aurora blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora-1 absolute w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" style={{ top: "5%", left: "10%" }} />
          <div className="aurora-2 absolute w-[420px] h-[420px] rounded-full bg-violet-600/15 blur-[100px]" style={{ top: "35%", right: "8%" }} />
          <div className="aurora-3 absolute w-[360px] h-[360px] rounded-full bg-indigo-500/15 blur-[90px]" style={{ bottom: "8%", left: "28%" }} />
        </div>
        <div className="flex flex-col items-center text-center z-10">
          <div className="hero-entrance mb-6" style={{ animationDelay: "2.3s" }}>
            <div className="w-56 h-56 animate-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatar.png" alt="Hongmin An" className="w-full h-full object-contain" />
            </div>
          </div>
          <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-3 hero-entrance" style={{ animationDelay: "2.45s" }}>Hello, I&apos;m</p>
          <div className="hero-entrance mb-3" style={{ animationDelay: "2.6s" }}>
            <h1 className="text-7xl font-bold tracking-tight gradient-name">Hongmin An</h1>
          </div>
          {/* Typewriter subtitle */}
          <p className="text-gray-400 text-lg mb-2 h-7 hero-entrance" style={{ animationDelay: "2.75s" }}>
            {roles[roleIndex].slice(0, charIndex)}
            <span className="inline-block w-0.5 h-5 bg-blue-400 ml-0.5 align-middle animate-pulse" />
          </p>
          <div className="mb-10 flex flex-col items-center gap-1 hero-entrance" style={{ animationDelay: "2.9s" }}>
            <p className="text-gray-600 text-sm italic">&ldquo;Talk is cheap. Show me the code.&rdquo;</p>
            <p className="text-gray-700 text-xs">— Linus Torvalds</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-900/80 border border-gray-800 rounded-2xl px-3 py-3 hero-entrance" style={{ animationDelay: "3.05s" }}>
            {[
              { id: "about", label: "About Me", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              )},
              { id: "projects", label: "Projects", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              )},
              { id: "skills", label: "Stack", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/></svg>
              )},
              { id: "contact", label: "Contact", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              )},
            ].map(({ id, label, icon }) => (
              <div key={id} className="relative group">
                <button
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                  className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-500 hover:text-white hover:bg-gray-800 transition-all"
                >
                  {icon}
                </button>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 bg-gray-900 border border-gray-800 rounded-md px-2 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-xs text-gray-600 hover:text-blue-400 transition-colors tracking-widest font-mono hero-entrance"
            style={{ animationDelay: "3.2s" }}
          >
            view resume →
          </a>
        </div>
        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-700 text-xs animate-bounce">
          <span>↓</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-2xl mx-auto px-6 py-28 border-t border-gray-800/50">
        <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-2">Who I Am</p>
        <h2 className="text-3xl font-bold mb-2">Character Profile</h2>
        <p className="text-gray-500 text-sm mb-12">Version History &amp; Patch Notes — click any patch to expand.</p>

        <div className="relative">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-800" />
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div
                key={i}
                ref={(el) => { timelineRefs.current[i] = el; }}
                data-index={i}
                className="pl-10 relative group transition-all duration-700"
                style={{
                  opacity: visibleItems.has(i) ? 1 : 0,
                  transform: visibleItems.has(i) ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div
                  data-cursor="pointer"
                  className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 bg-[#0a0a0f] transition-all duration-300 hover:scale-125 hover:border-blue-400 hover:shadow-[0_0_8px_rgba(96,165,250,0.7)]"
                  style={{
                    borderColor: visibleItems.has(i) ? (expanded.has(i) ? "rgb(96,165,250)" : "rgb(75,85,99)") : "rgb(55,65,81)",
                    boxShadow: expanded.has(i) ? "0 0 8px rgba(96,165,250,0.6)" : "none",
                  }}
                  onClick={() => setExpanded((prev) => { const next = new Set(prev); next.add(i); return next; })}
                />
                <p className="text-xs text-gray-600 mb-1">{item.date}</p>
                <h3
                  {...(!expanded.has(i) && { "data-cursor": "pointer" })}
                  className={`font-semibold text-sm mb-1 font-mono tracking-wider inline-block transition-colors ${expanded.has(i) ? "text-gray-200" : "text-gray-400 hover:text-blue-400"}`}
                  onClick={() => setExpanded((prev) => { const next = new Set(prev); next.add(i); return next; })}
                >
                  {expanded.has(i) ? item.title : `// LEVEL_${String(i + 1).padStart(2, "0")}`}
                </h3>
                {expanded.has(i) && (
                  <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line mt-2">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 border-t border-gray-800/50 overflow-hidden">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-2">What I&apos;ve Built</p>
          <h2 className="text-3xl font-bold mb-16">Projects</h2>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center" style={{ height: 540 }}>
          {projects.map((p, i) => {
            const dist = i - activeProject;

            const isActive = dist === 0;
            const isSide = Math.abs(dist) === 1;
            const isVisible = Math.abs(dist) <= 1;

            const statusColor =
              p.status === "Live" ? "text-green-400 bg-green-400/10 border-green-400/30" :
              p.status === "WIP"  ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" :
                                    "text-gray-500 bg-gray-500/10 border-gray-500/30";

            return (
              <div
                key={i}
                onClick={() => {
                  if (dist === -1) prevProject();
                  else if (dist === 1) nextProject();
                }}
                style={{
                  position: "absolute",
                  width: 320,
                  transform: `translateX(${dist * 360}px) scale(${isActive ? 1 : 0.82})`,
                  opacity: isActive ? 1 : isSide ? 0.45 : 0,
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: isActive ? 10 : isSide ? 5 : 0,
                  pointerEvents: isVisible ? "auto" : "none",
                  cursor: isSide ? "pointer" : "default",
                  boxShadow: isActive ? "0 0 48px rgba(96,165,250,0.15)" : "none",
                  borderColor: isActive ? "rgba(96,165,250,0.3)" : undefined,
                }}
                className="flex flex-col bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden"
              >
                {/* Thumbnail */}
                {"image" in p && p.image ? (
                  <div className="w-full h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image as string} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                ) : "snippet" in p && p.snippet ? (
                  <div className="w-full h-44 bg-[#0d1117] border-b border-gray-800 flex flex-col justify-center px-5 py-4 overflow-hidden">
                    <div className="flex gap-1.5 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                    </div>
                    {(p.snippet as string[]).map((line, li) => (
                      <p key={li} className="font-mono text-xs leading-5 text-green-400/70 truncate">{line}</p>
                    ))}
                  </div>
                ) : null}

                {/* Info */}
                <div className="flex flex-col p-5 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-gray-600">#{String(i + 1).padStart(2, "0")}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor}`}>{p.status}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-0.5">{p.title}</h3>
                  <span className="text-xs text-gray-600 mb-3">{p.date}</span>
                  <p className="text-sm text-red-400/80 font-medium mb-1">{p.problem}</p>
                  <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-3">{p.solution}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map((tag) => (
                      tagIcons[tag] ? (
                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full text-xs">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={tagIcons[tag]} alt={tag} className="w-3.5 h-3.5" />
                          {tag}
                        </span>
                      ) : (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">{tag}</span>
                      )
                    ))}
                  </div>
                  {isActive && p.link !== "#" && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-mono"
                    >
                      view project →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Nav */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={prevProject}
            disabled={activeProject === 0}
            className="w-10 h-10 rounded-full border border-gray-700 hover:border-blue-400 text-gray-400 hover:text-white transition-all flex items-center justify-center text-lg disabled:opacity-20 disabled:pointer-events-none"
          >
            ←
          </button>
          <span className="text-xs font-mono text-gray-600">{activeProject + 1} / {projects.length}</span>
          <button
            onClick={nextProject}
            disabled={activeProject === projects.length - 1}
            className="w-10 h-10 rounded-full border border-gray-700 hover:border-blue-400 text-gray-400 hover:text-white transition-all flex items-center justify-center text-lg disabled:opacity-20 disabled:pointer-events-none"
          >
            →
          </button>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 border-t border-gray-800/50">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-2">Technologies</p>
          <h2 className="text-3xl font-bold mb-3">Stack</h2>
          <p className="text-xs text-gray-700 font-mono mb-12 tracking-widest">swipe to explore</p>
        </div>

        {/* Horizontal drag carousel */}
        <div
          ref={wheelContainerRef}
          data-cursor="drag"
          className="relative flex justify-center select-none"
          style={{ height: 420, overflow: "visible" }}
          onMouseDown={(e) => {
            const ws = wheelState.current;
            ws.isDragging = true;
            ws.dragStartX = e.clientX;
            ws.dragStartOffset = ws.offset;
            ws.prevX = e.clientX;
            ws.velocity = 0;
            e.preventDefault();
          }}
        >
          {stackCategories.map((cat, ci) => (
            <div
              key={ci}
              ref={el => { leafPosRefs.current[ci] = el; }}
              className="absolute flex flex-col"
              style={{
                width: 260,
                transform: `translateX(${ci * 340}px) scale(${Math.max(0.75, 1 - ci * 0.13).toFixed(3)})`,
                opacity: Math.max(0, 1 - ci * 0.5).toFixed(3),
                transformOrigin: "top center",
                zIndex: 10 - ci,
              }}
              suppressHydrationWarning
            >
              {/* Card */}
              <div
                ref={el => { branchRefs.current[ci] = el; }}
                className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 flex flex-col gap-3"
                style={{ transformOrigin: "top center" }}
              >
                {/* Category header */}
                <div className="text-xs font-mono text-gray-500 tracking-widest border-b border-gray-800 pb-3">
                  {cat.label}
                </div>
                {/* Skills */}
                <div className="flex flex-col gap-1.5">
                  {cat.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-900 border border-gray-800 rounded-lg">
                      {tagIcons[skill] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={tagIcons[skill]} alt={skill} className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <span className="w-4 h-4 flex-shrink-0" />
                      )}
                      <span className="text-xs text-gray-400">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-2xl mx-auto px-6 py-28 border-t border-gray-800/50">
        <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mb-2">Get In Touch</p>
        <h2 className="text-3xl font-bold mb-3">Contact Me</h2>
        <p className="text-gray-500 text-sm mb-12">Have a question, opportunity, or just want to say hi? My inbox is open.</p>

        <div className="flex flex-col gap-4">
          <a
            href="mailto:hpa5199@psu.edu"
            className="flex items-center gap-4 p-4 bg-gray-900/80 border border-gray-800 rounded-xl hover:border-blue-400/50 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-blue-400 transition-colors">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <p className="text-sm text-gray-300 group-hover:text-white transition-colors">Email</p>
          </a>

          <a
            href="https://www.linkedin.com/in/hongmin-an-417994349/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-gray-900/80 border border-gray-800 rounded-xl hover:border-blue-400/50 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-blue-400 transition-colors">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <p className="text-sm text-gray-300 group-hover:text-white transition-colors">LinkedIn</p>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-gray-900/80 border border-gray-800 rounded-xl hover:border-blue-400/50 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-blue-400 transition-colors">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <p className="text-sm text-gray-300 group-hover:text-white transition-colors">Resume</p>
          </a>

          <a
            href="https://www.instagram.com/hongmin_03/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-gray-900/80 border border-gray-800 rounded-xl hover:border-blue-400/50 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-blue-400 transition-colors">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </div>
            <p className="text-sm text-gray-300 group-hover:text-white transition-colors">Instagram</p>
          </a>
        </div>
      </section>

    </main>
  );
}
