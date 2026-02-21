import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Services", "Projects", "Testimonials", "Contact"];

const SERVICES = [
  { icon: "◈", title: "Web Development", desc: "Blazing-fast, pixel-perfect websites built with React, Next.js, and modern stacks.", time: "3–7 days" },
  { icon: "◉", title: "Mobile Apps", desc: "Native-feel cross-platform apps with React Native that work flawlessly on iOS & Android.", time: "5–14 days" },
  { icon: "⬡", title: "SaaS Platforms", desc: "End-to-end SaaS products with auth, billing, dashboards, and real-time data.", time: "7–21 days" },
  { icon: "◫", title: "UI/UX Design", desc: "Award-winning interfaces that convert. Wireframes, prototypes, and design systems.", time: "2–5 days" },
  { icon: "⬢", title: "Custom Software", desc: "Bespoke automation tools, APIs, integrations, and backend systems tailored to you.", time: "7–14 days" },
];

const PROJECTS = [
  { cat: "Web", title: "NexaFlow", desc: "SaaS analytics dashboard for e-commerce brands tracking real-time revenue.", color: "#0ff", img: "◈" },
  { cat: "Mobile", title: "TrailSync", desc: "Fitness tracking app with GPS routes, community challenges & wearable sync.", color: "#f0f", img: "◉" },
  { cat: "Startup", title: "LaunchPad AI", desc: "AI-powered landing page generator for early-stage startups. Closed beta.", color: "#ff0", img: "⬡" },
  { cat: "Custom", title: "OpsCore", desc: "Internal operations platform replacing 6 legacy tools for a 200-person team.", color: "#0f0", img: "◫" },
  { cat: "Web", title: "Aurum Store", desc: "Luxury e-commerce for a jewelry brand — 3D product viewer, AR try-on.", color: "#fa0", img: "⬢" },
  { cat: "Mobile", title: "Pocketly", desc: "Personal finance app with AI spending insights and automated savings rules.", color: "#0af", img: "◈" },
];

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "CEO, Luminary SaaS", text: "Delivered our entire MVP in under 2 weeks. The quality was beyond what we expected. We went from idea to paying customers in record time.", rating: 5 },
  { name: "Marcus Reid", role: "Founder, TrailSync", text: "Unreal attention to detail. Every animation, every micro-interaction — the app feels like it cost 10x what we paid.", rating: 5 },
  { name: "Priya Nair", role: "CTO, NexaCorp", text: "Fast, professional, and genuinely brilliant. Our dashboard revamp increased user engagement by 47%. Highly recommend.", rating: 5 },
];

const CATS = ["All", "Web", "Mobile", "Startup", "Custom"];

export default function LandingPage() {
  const [dark, setDark] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [tIdx, setTIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project: "" });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === activeFilter);

  // Particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accent = dark ? "0, 255, 200" : "59, 130, 246";
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, ${p.alpha})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accent}, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [dark]);

  // Testimonial auto-advance
  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const bg = dark ? "#080c10" : "#f8fafc";
  const fg = dark ? "#e8f4f0" : "#0f172a";
  const accent = dark ? "#00ffc8" : "#2563eb";
  const accentDim = dark ? "rgba(0,255,200,0.12)" : "rgba(37,99,235,0.1)";
  const cardBg = dark ? "#0d1520" : "#ffffff";
  const borderCol = dark ? "rgba(0,255,200,0.15)" : "rgba(37,99,235,0.15)";
  const mutedFg = dark ? "#7a9e96" : "#64748b";
  const secondBg = dark ? "#0a1018" : "#f1f5f9";

  const styles = {
    root: { fontFamily: "'DM Mono', 'Courier New', monospace", background: bg, color: fg, minHeight: "100vh", transition: "all 0.3s", overflowX: "hidden" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2.5rem", background: dark ? "rgba(8,12,16,0.85)" : "rgba(248,250,252,0.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${borderCol}` },
    logo: { fontSize: "1.1rem", fontWeight: 700, color: accent, letterSpacing: "0.05em", cursor: "pointer" },
    navLinks: { display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 },
    navLink: { color: mutedFg, cursor: "pointer", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s", fontWeight: 500 },
    toggleBtn: { background: accentDim, border: `1px solid ${borderCol}`, color: accent, padding: "0.4rem 0.9rem", borderRadius: "20px", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" },
    hero: { position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden", paddingTop: "5rem" },
    canvas: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
    heroContent: { position: "relative", zIndex: 2, maxWidth: "820px", padding: "0 1.5rem" },
    badge: { display: "inline-block", background: accentDim, border: `1px solid ${borderCol}`, color: accent, padding: "0.35rem 1rem", borderRadius: "20px", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" },
    h1: { fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, lineHeight: 1.05, marginBottom: "1.5rem", letterSpacing: "-0.02em" },
    accentWord: { color: accent, fontStyle: "italic" },
    heroDesc: { fontSize: "clamp(1rem, 2vw, 1.2rem)", color: mutedFg, marginBottom: "2.5rem", maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.7 },
    btnRow: { display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" },
    btnPrimary: { background: accent, color: dark ? "#080c10" : "#fff", padding: "0.85rem 2rem", borderRadius: "6px", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em", transition: "transform 0.2s, box-shadow 0.2s" },
    btnSecondary: { background: "transparent", color: accent, padding: "0.85rem 2rem", borderRadius: "6px", border: `1px solid ${accent}`, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em", transition: "background 0.2s" },
    section: { padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto" },
    sectionLabel: { fontSize: "0.75rem", color: accent, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 },
    h2: { fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, lineHeight: 1.15, marginBottom: "1rem" },
    divider: { width: "40px", height: "2px", background: accent, marginBottom: "3rem" },
    aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "4rem", alignItems: "center" },
    avatarWrap: { position: "relative" },
    avatar: { width: "100%", aspectRatio: "1", borderRadius: "12px", background: `linear-gradient(135deg, ${accentDim}, ${dark ? "#1a2a22" : "#dbeafe"})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", border: `1px solid ${borderCol}`, position: "relative", overflow: "hidden" },
    avatarGlyph: { fontSize: "8rem", opacity: 0.15, position: "absolute" },
    statsRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "2rem" },
    stat: { textAlign: "center", padding: "1rem", background: cardBg, borderRadius: "8px", border: `1px solid ${borderCol}` },
    statNum: { fontSize: "1.8rem", fontWeight: 700, color: accent, fontFamily: "'Playfair Display', Georgia, serif" },
    statLabel: { fontSize: "0.7rem", color: mutedFg, textTransform: "uppercase", letterSpacing: "0.1em" },
    skillPill: { display: "inline-block", background: accentDim, border: `1px solid ${borderCol}`, color: accent, padding: "0.3rem 0.8rem", borderRadius: "4px", fontSize: "0.75rem", margin: "0.25rem", letterSpacing: "0.05em" },
    servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" },
    serviceCard: { background: cardBg, border: `1px solid ${borderCol}`, borderRadius: "10px", padding: "1.75rem", cursor: "default", transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s", position: "relative", overflow: "hidden" },
    serviceIcon: { fontSize: "1.8rem", color: accent, marginBottom: "1rem" },
    serviceTitle: { fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" },
    serviceDesc: { fontSize: "0.85rem", color: mutedFg, lineHeight: 1.6, marginBottom: "1rem" },
    serviceTime: { fontSize: "0.7rem", color: accent, background: accentDim, padding: "0.25rem 0.6rem", borderRadius: "4px", letterSpacing: "0.1em", display: "inline-block" },
    filterRow: { display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" },
    filterBtn: (active) => ({ background: active ? accent : "transparent", color: active ? (dark ? "#080c10" : "#fff") : mutedFg, border: `1px solid ${active ? accent : borderCol}`, padding: "0.4rem 1rem", borderRadius: "4px", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem", letterSpacing: "0.1em", transition: "all 0.2s" }),
    projectGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "1.25rem" },
    projectCard: { background: cardBg, border: `1px solid ${borderCol}`, borderRadius: "10px", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" },
    projectImg: (color) => ({ height: "160px", background: `linear-gradient(135deg, ${color}22, ${color}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", borderBottom: `1px solid ${borderCol}` }),
    projectBody: { padding: "1.25rem" },
    projectCat: { fontSize: "0.7rem", color: accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.4rem" },
    projectTitle: { fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem" },
    projectDesc: { fontSize: "0.82rem", color: mutedFg, lineHeight: 1.5 },
    testimonialWrap: { background: secondBg, borderRadius: "16px", border: `1px solid ${borderCol}`, padding: "3rem", position: "relative", overflow: "hidden", maxWidth: "720px", margin: "0 auto" },
    tQuote: { fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7, fontStyle: "italic", marginBottom: "1.5rem", color: fg },
    tAuthor: { fontWeight: 700, fontSize: "0.9rem" },
    tRole: { fontSize: "0.8rem", color: mutedFg },
    tDots: { display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "2rem" },
    tDot: (active) => ({ width: active ? "20px" : "8px", height: "8px", borderRadius: "4px", background: active ? accent : borderCol, transition: "all 0.3s", cursor: "pointer" }),
    tStars: { color: accent, fontSize: "0.9rem", marginBottom: "1rem" },
    contactWrap: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" },
    form: { display: "flex", flexDirection: "column", gap: "1rem" },
    input: { background: cardBg, border: `1px solid ${borderCol}`, borderRadius: "6px", padding: "0.85rem 1rem", color: fg, fontFamily: "inherit", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s" },
    textarea: { background: cardBg, border: `1px solid ${borderCol}`, borderRadius: "6px", padding: "0.85rem 1rem", color: fg, fontFamily: "inherit", fontSize: "0.9rem", outline: "none", minHeight: "140px", resize: "vertical", transition: "border-color 0.2s" },
    socialRow: { display: "flex", gap: "1rem", marginTop: "1.5rem" },
    socialBtn: { background: accentDim, border: `1px solid ${borderCol}`, color: accent, padding: "0.6rem 1.2rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit", transition: "background 0.2s", textDecoration: "none", display: "inline-block" },
    footer: { background: dark ? "#060a0d" : "#0f172a", color: dark ? "#4a6b62" : "#94a3b8", padding: "2.5rem", textAlign: "center", borderTop: `1px solid ${borderCol}`, fontSize: "0.8rem" },
    footerLogo: { color: accent, fontWeight: 700, fontSize: "1.1rem", display: "block", marginBottom: "0.75rem" },
    footerLinks: { display: "flex", gap: "1.5rem", justifyContent: "center", marginBottom: "1.5rem", flexWrap: "wrap" },
    footerLink: { color: dark ? "#4a6b62" : "#94a3b8", cursor: "pointer", transition: "color 0.2s", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" },
    successMsg: { background: accentDim, border: `1px solid ${accent}`, borderRadius: "8px", padding: "1.5rem", textAlign: "center", color: accent, fontWeight: 600 },
    hamburger: { display: "none", flexDirection: "column", gap: "4px", cursor: "pointer", background: "none", border: "none", padding: "4px" },
    mobileMenu: { position: "fixed", top: 0, right: 0, bottom: 0, width: "260px", background: dark ? "#0d1520" : "#fff", borderLeft: `1px solid ${borderCol}`, zIndex: 200, display: "flex", flexDirection: "column", padding: "5rem 2rem 2rem", gap: "1.5rem", transform: menuOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.3s" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${accent}; border-radius: 2px; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .hover-glow:hover { border-color: ${accent} !important; box-shadow: 0 0 20px ${accent}22; }
        .nav-link:hover { color: ${accent} !important; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px ${accent}44; }
        .btn-secondary:hover { background: ${accentDim} !important; }
        .social-btn:hover { background: ${accent} !important; color: ${dark ? "#080c10" : "#fff"} !important; }
        input:focus, textarea:focus { border-color: ${accent} !important; }
        @keyframes fadeUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.8s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.8s 0.3s ease both; }
        .fade-up-4 { animation: fadeUp 0.8s 0.45s ease both; }
        .accent-pulse { animation: pulse 2s infinite; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 640px) {
          .section-pad { padding: 4rem 1.25rem !important; }
          .stats-row { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

      <div style={styles.root}>
        {/* NAV */}
        <nav style={styles.nav}>
          <span style={styles.logo} onClick={() => scrollTo("hero")}>{"<DEV />"}</span>
          <ul style={styles.navLinks} className="desktop-nav">
            {NAV_LINKS.map(l => (
              <li key={l} style={styles.navLink} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button style={styles.toggleBtn} onClick={() => setDark(!dark)}>{dark ? "☀ Light" : "◑ Dark"}</button>
            <button className="hamburger" style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
              {[0,1,2].map(i => <span key={i} style={{ width: "22px", height: "2px", background: accent, display: "block" }} />)}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div style={styles.mobileMenu}>
          <span style={{ position: "absolute", top: "1.5rem", right: "1.5rem", cursor: "pointer", color: accent, fontSize: "1.2rem" }} onClick={() => setMenuOpen(false)}>✕</span>
          {NAV_LINKS.map(l => (
            <span key={l} style={{ ...styles.navLink, fontSize: "1rem" }} onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
          ))}
        </div>
        {menuOpen && <div style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(0,0,0,0.5)" }} onClick={() => setMenuOpen(false)} />}

        {/* HERO */}
        <section id="hero" style={styles.hero}>
          <canvas ref={canvasRef} style={styles.canvas} />
          <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 50% 40%, rgba(0,255,200,0.05) 0%, transparent 70%)" : "radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
          <div style={styles.heroContent}>
            <div style={styles.badge} className="fade-up accent-pulse">⚡ Available for new projects</div>
            <h1 style={styles.h1} className="fade-up-2">
              I Build <span style={styles.accentWord}>Custom</span> Web & Mobile Solutions <span style={styles.accentWord}>Fast</span>
            </h1>
            <p style={styles.heroDesc} className="fade-up-3">
              From idea to launch in days. Full-stack web apps, mobile products, SaaS tools, and custom software — built for startups & businesses that can't afford to wait.
            </p>
            <div style={styles.btnRow} className="fade-up-4">
              <button style={styles.btnPrimary} className="btn-primary" onClick={() => scrollTo("contact")}>Hire Me →</button>
              <button style={styles.btnSecondary} className="btn-secondary" onClick={() => scrollTo("projects")}>View Projects</button>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div style={{ ...styles.section }} className="section-pad">
            <div style={{ ...styles.aboutGrid }} className="about-grid">
              <div style={styles.avatarWrap}>
                <div style={styles.avatar}>
                  <span style={styles.avatarGlyph}>◈</span>
                  <span style={{ fontSize: "4rem", zIndex: 1, position: "relative" }}>👨‍💻</span>
                </div>
                <div style={{ ...styles.statsRow }} className="stats-row">
                  {[["50+", "Projects"], ["3yr", "Experience"], ["100%", "Satisfaction"]].map(([n, l]) => (
                    <div key={l} style={styles.stat}>
                      <div style={styles.statNum}>{n}</div>
                      <div style={styles.statLabel}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={styles.sectionLabel}>About Me</div>
                <h2 style={styles.h2}>Fast. Precise. <span style={{ color: accent }}>Obsessed</span> with quality.</h2>
                <div style={styles.divider} />
                <p style={{ color: mutedFg, lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.95rem" }}>
                  I'm a full-stack developer who builds production-grade digital products for startups and businesses — rapidly. My mission: eliminate the months-long agency timelines and deliver polished, scalable solutions that generate real results.
                </p>
                <p style={{ color: mutedFg, lineHeight: 1.8, marginBottom: "1.75rem", fontSize: "0.95rem" }}>
                  With expertise spanning frontend, backend, mobile, and system design, I handle the entire product lifecycle — from concept to deployment and beyond. No bloat, no bureaucracy.
                </p>
                <div>
                  {["React / Next.js", "React Native", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Figma / Prototyping", "Stripe / Auth", "REST & GraphQL", "Docker & CI/CD"].map(s => (
                    <span key={s} style={styles.skillPill}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={{ background: secondBg }}>
          <div style={styles.section} className="section-pad">
            <div style={styles.sectionLabel}>What I Offer</div>
            <h2 style={styles.h2}>Services built for <span style={{ color: accent }}>speed & scale</span></h2>
            <div style={styles.divider} />
            <div style={styles.servicesGrid}>
              {SERVICES.map(s => (
                <div key={s.title} style={styles.serviceCard} className="hover-lift hover-glow">
                  <div style={{ position: "absolute", top: "-20px", right: "-20px", fontSize: "6rem", opacity: 0.04, color: accent }}>{s.icon}</div>
                  <div style={styles.serviceIcon}>{s.icon}</div>
                  <div style={styles.serviceTitle}>{s.title}</div>
                  <div style={styles.serviceDesc}>{s.desc}</div>
                  <span style={styles.serviceTime}>⏱ Delivered in {s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div style={styles.section} className="section-pad">
            <div style={styles.sectionLabel}>Portfolio</div>
            <h2 style={styles.h2}>Recent <span style={{ color: accent }}>Work</span></h2>
            <div style={styles.divider} />
            <div style={styles.filterRow}>
              {CATS.map(c => (
                <button key={c} style={styles.filterBtn(activeFilter === c)} onClick={() => setActiveFilter(c)}>{c}</button>
              ))}
            </div>
            <div style={styles.projectGrid}>
              {filtered.map(p => (
                <div key={p.title} style={styles.projectCard} className="hover-lift hover-glow">
                  <div style={styles.projectImg(p.color)}>{p.img}</div>
                  <div style={styles.projectBody}>
                    <div style={styles.projectCat}>{p.cat}</div>
                    <div style={styles.projectTitle}>{p.title}</div>
                    <div style={styles.projectDesc}>{p.desc}</div>
                    <div style={{ marginTop: "1rem", fontSize: "0.78rem", color: accent, cursor: "pointer" }}>View Case Study →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" style={{ background: secondBg }}>
          <div style={styles.section} className="section-pad">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={styles.sectionLabel}>Client Feedback</div>
              <h2 style={styles.h2}>What clients <span style={{ color: accent }}>say</span></h2>
            </div>
            <div style={styles.testimonialWrap}>
              <div style={{ position: "absolute", top: "1.5rem", right: "2rem", fontSize: "4rem", opacity: 0.07, color: accent }}>❝</div>
              <div style={styles.tStars}>{"★".repeat(TESTIMONIALS[tIdx].rating)}</div>
              <p style={styles.tQuote}>"{TESTIMONIALS[tIdx].text}"</p>
              <div style={styles.tAuthor}>{TESTIMONIALS[tIdx].name}</div>
              <div style={styles.tRole}>{TESTIMONIALS[tIdx].role}</div>
              <div style={styles.tDots}>
                {TESTIMONIALS.map((_, i) => (
                  <div key={i} style={styles.tDot(i === tIdx)} onClick={() => setTIdx(i)} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div style={styles.section} className="section-pad">
            <div style={{ ...styles.contactWrap }} className="contact-grid">
              <div>
                <div style={styles.sectionLabel}>Get In Touch</div>
                <h2 style={styles.h2}>Start Your <span style={{ color: accent }}>Project</span> Today</h2>
                <div style={styles.divider} />
                <p style={{ color: mutedFg, lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                  Have an idea? A deadline? A half-finished product? Let's talk. I respond within a few hours and can typically start within 24 hours.
                </p>
                <div style={{ color: mutedFg, fontSize: "0.85rem", marginBottom: "0.5rem" }}>📧 hello@devstudio.io</div>
                <div style={{ color: mutedFg, fontSize: "0.85rem", marginBottom: "1.5rem" }}>📍 Remote — Worldwide</div>
                <div style={styles.socialRow}>
                  {["GitHub", "LinkedIn", "Twitter"].map(s => (
                    <a key={s} href="#" style={styles.socialBtn} className="social-btn">{s}</a>
                  ))}
                </div>
              </div>
              <div>
                {submitted ? (
                  <div style={styles.successMsg}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✓</div>
                    <div>Message received! I'll be in touch within a few hours.</div>
                  </div>
                ) : (
                  <form style={styles.form} onSubmit={handleSubmit}>
                    <input required style={styles.input} placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <input required type="email" style={styles.input} placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    <textarea required style={styles.textarea} placeholder="Describe your project — what are you building, what's the timeline, budget?" value={form.project} onChange={e => setForm({...form, project: e.target.value})} />
                    <button type="submit" style={{ ...styles.btnPrimary, width: "100%", padding: "1rem" }} className="btn-primary">
                      Get a Free Quote →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <span style={styles.footerLogo}>{"<DEV />"}</span>
          <div style={styles.footerLinks}>
            {NAV_LINKS.map(l => (
              <span key={l} style={styles.footerLink} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
            ))}
          </div>
          <div>© {new Date().getFullYear()} DevStudio. Built with precision. Delivered with speed.</div>
        </footer>
      </div>
    </>
  );
}