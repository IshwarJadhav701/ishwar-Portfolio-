import React, { useState, useEffect, useRef } from "react";
import profilePhoto from "./assets/profile.jpg";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  User,
  Menu,
  X,
  ArrowUpRight,
  Play,
  Pause,
  ExternalLink,
  Code2,
  Database,
  Layers,
  Wrench,
  Download,
  FileText,
  Eye,
  GraduationCap
} from "lucide-react";

const skillsData = [
  {
    number: "01",
    title: "Frontend Development",
    icon: <Code2 size={24} />,
    description:
      "HTML5, CSS3, JavaScript (ES6+), React.js, JSX, Bootstrap, Responsive Web Design, Component Architecture, and Modern User Interface Development."
  },
  {
    number: "02",
    title: "Backend & Core Java",
    icon: <Layers size={24} />,
    description:
      "Core Java Fundamentals, JDBC, Spring Boot, REST API Integration, Object-Oriented Programming (OOP), and Backend Logic."
  },
  {
    number: "03",
    title: "Database & Storage",
    icon: <Database size={24} />,
    description:
      "MySQL, SQL Queries, Relational Database Management, Schema Design, and Structured Data Storage."
  },
  {
    number: "04",
    title: "Tools & Platforms",
    icon: <Wrench size={24} />,
    description:
      "Git, GitHub Version Control, VS Code, Eclipse IDE, Vite, Responsive Layouts, and Deployment Practices."
  }
];

const projectsData = [
  {
    number: "01",
    title: "ECartline",
    subtitle: "Full-Stack E-Commerce Platform",
    description:
      "Developed a responsive full-stack e-commerce web application using React.js for the frontend and Java Spring Boot for the backend with MySQL database. Features product browsing, product details, shopping cart management, user accounts, and an admin management panel. Deployed and live.",
    stack: ["React.js", "Java", "Spring Boot", "MySQL", "REST APIs"],
    github: "https://github.com/IshwarJadhav701/ECartline-",
    live: "https://ganeshcode.com/ishwar/ecartline/"
  },
  {
    number: "02",
    title: "Modern Interactive Portfolio",
    subtitle: "High-Performance Web Portfolio",
    description:
      "Modern developer portfolio built with React and Vite featuring dynamic SVG wave transitions, hanging portrait frame, interactive audio controls, and responsive UI.",
    stack: ["React.js", "Vite", "CSS3 Animations", "Lucide Icons"],
    github: "https://github.com/IshwarJadhav701",
    live: "#home"
  },
  {
    number: "03",
    title: "Interactive Web Applications",
    subtitle: "JavaScript & Frontend Projects",
    description:
      "A collection of responsive JavaScript web applications demonstrating state management, asynchronous data fetching, local storage, and dynamic user interfaces.",
    stack: ["JavaScript", "HTML5", "CSS3", "DOM APIs"],
    github: "https://github.com/IshwarJadhav701",
    live: null
  }
];

const resumePdfUrl = "/Ishwar_Jadhav_Resume.pdf";
const linkedinUrl = "https://www.linkedin.com/in/ishwar-jadhav-b79658414";
const githubUrl = "https://github.com/IshwarJadhav701";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorRefs = useRef([]);

  const closeMenu = () => setMenuOpen(false);
  const navLinks = ["home", "about", "skills", "projects", "contact"];

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowResumeModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Ambient sound synthesizer for Play/Pause toggle
  const toggleAudio = () => {
    try {
      if (isPlaying) {
        if (audioCtxRef.current) {
          audioCtxRef.current.suspend();
        }
        setIsPlaying(false);
      } else {
        if (!audioCtxRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            audioCtxRef.current = ctx;

            // Soft soothing chord notes: C4, E4, G4, B4
            const freqs = [261.63, 329.63, 392.0, 493.88];
            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
            masterGain.connect(ctx.destination);

            oscillatorRefs.current = freqs.map((f, i) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = "sine";
              osc.frequency.setValueAtTime(f, ctx.currentTime);
              gain.gain.setValueAtTime(0.25 / (i + 1), ctx.currentTime);
              osc.connect(gain);
              gain.connect(masterGain);
              osc.start();
              return osc;
            });
          }
        } else {
          audioCtxRef.current.resume();
        }
        setIsPlaying(true);
      }
    } catch (err) {
      console.log("Audio toggle feedback:", err);
      setIsPlaying(!isPlaying);
    }
  };

  // Scroll Reveal & Active Navigation Observer
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    const sections = navLinks.map((id) => document.getElementById(id)).filter(Boolean);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach((sec) => sectionObserver.observe(sec));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="app-shell">
      {/* ================= HEADER / TOPBAR ================= */}
      <header className="topbar">
        <a className="brand-badge" href="#home" onClick={closeMenu}>
          <span className="brand-eyebrow">PORTFOLIO</span>
          <span className="brand-title">
            Ishwar<span>.dev</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          {navLinks.map((link) => (
            <a
              key={link}
              className={active === link ? "active" : ""}
              href={"#" + link}
              onClick={() => {
                setActive(link);
                closeMenu();
              }}
            >
              {link}
            </a>
          ))}
          <button
            className="nav-resume-btn"
            onClick={() => {
              setShowResumeModal(true);
              closeMenu();
            }}
          >
            <FileText size={14} /> Resume
          </button>
        </nav>
      </header>

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="hero-section" id="home">
          <div className="hero-container">
            {/* Left Hero Content */}
            <div className="hero-content reveal">
              <p className="eyebrow-tag">PORTFOLIO</p>
              <h1 className="hero-title">
                Hi, I'm <span>Ishwar Jadhav</span>
              </h1>
              <h2 className="hero-subtitle">
                <span className="accent-red">Frontend &</span> Software Developer
              </h2>
              <p className="hero-description">
                BCS Graduate (7.54 CGPA) from Dr. Babasaheb Ambedkar Marathwada University with hands-on
                experience in JavaScript, React.js, HTML5, CSS3, Core Java, Spring Boot, MySQL, and Full
                Stack Web Development. Passionate about building clean, responsive web applications, modern
                REST APIs, and high-performance digital experiences.
              </p>

              {/* 4 Action Pill Buttons + Audio Controller */}
              <div className="hero-actions-row">
                <div className="hero-buttons">
                  {/* Button 1: View Projects */}
                  <a className="btn btn-red" href="#projects">
                    View Projects <ArrowUpRight className="btn-arrow" size={16} />
                  </a>

                  {/* Button 2: View Resume (Opens Modal / Viewer) */}
                  <button
                    className="btn btn-white"
                    onClick={() => setShowResumeModal(true)}
                    title="View Ishwar's Resume"
                  >
                    <Eye size={15} /> View Resume
                  </button>

                  {/* Button 3: Download Resume (Direct PDF Download) */}
                  <a
                    className="btn btn-gold"
                    href={resumePdfUrl}
                    download="Ishwar_Jadhav_Resume.pdf"
                    title="Download Ishwar's Resume PDF"
                  >
                    <Download size={15} /> Download Resume
                  </a>

                  {/* Button 4: Contact Me */}
                  <a className="btn btn-dark" href="#contact">
                    Contact Me
                  </a>
                </div>

                {/* Music / Audio Controller Button */}
                <div className="audio-controller">
                  <button
                    className={`audio-btn ${isPlaying ? "playing" : ""}`}
                    onClick={toggleAudio}
                    aria-label="Toggle ambient audio"
                    title={isPlaying ? "Pause ambient music" : "Play ambient music"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="play-icon" />}
                  </button>
                  <span className="audio-label">{isPlaying ? "Pause" : "Play"}</span>
                </div>
              </div>
            </div>

            {/* Right Hero: Hanging Portrait Frame on Crimson Canvas */}
            <div className="hero-frame-wrapper reveal reveal-delay-1">
              <div className="crimson-canvas">
                {/* Sparkle Stars */}
                <span className="sparkle sparkle-top-right">✦</span>
                <span className="sparkle sparkle-bottom-left">✦</span>
                <span className="sparkle sparkle-top-left">✦</span>

                {/* Hanging Cord & Anchor */}
                <div className="hanging-wire"></div>
                <div className="hanging-clip"></div>

                {/* Framed Photo Card */}
                <div className="framed-card">
                  <img
                    src={imgError ? "/profile-placeholder.svg" : profilePhoto}
                    onError={() => setImgError(true)}
                    alt="Ishwar Jadhav"
                    className="framed-photo"
                  />
                  <div className="framed-glass-bar">
                    <span className="live-status-dot"></span>
                    <span className="framed-name">Ishwar Jadhav</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ME (RED SECTION) ================= */}
        <section className="about-section" id="about">
          <div className="about-container reveal">
            <span className="about-badge">ABOUT ME</span>
            <h2 className="about-title">Hello, I'm Ishwar</h2>
            <div className="about-text-content">
              <p>
                I am <strong>Ishwar Jadhav</strong>, a 2026 <strong>BSc Computer Science (BCS)</strong> graduate
                (<strong>7.54 CGPA</strong>) from <strong>Dr. Babasaheb Ambedkar Marathwada University Sambhajinagar</strong>,
                currently based in <strong>Pune, Maharashtra</strong>, specializing in Frontend Development, React.js, and Full Stack Web
                Technologies.
              </p>
              <p>
                I have hands-on experience in building responsive web applications, interactive user interfaces,
                RESTful API integration, and database-driven solutions using{" "}
                <strong>HTML5, CSS3, JavaScript (ES6+), React.js, JSX, Bootstrap, Core Java, Spring Boot, JDBC, and MySQL</strong>.
              </p>
              <p>
                My major featured project is <strong>ECartline</strong>—a full-stack e-commerce web application with
                product catalog browsing, shopping cart workflows, account creation, admin panel, and clean responsive design. I enjoy
                solving real-world problems through clean code, modern web design, and continuously learning new tools and
                frameworks.
              </p>
              <p>
                My goal is to launch my career as an <strong>Entry-Level Frontend Developer or Full Stack Developer</strong> and
                contribute to forward-thinking engineering teams with dedication, fast learning, and high-quality work.
              </p>
            </div>

            {/* Quick Education Highlights */}
            <div className="about-edu-cards">
              <div className="edu-item-box">
                <div className="edu-item-head">
                  <GraduationCap size={18} className="edu-icon" />
                  <span className="edu-period">2023 – 2026</span>
                </div>
                <h4>BSc Bachelor Computer Science (7.54 CGPA)</h4>
                <p>Dr. Babasaheb Ambedkar Marathwada University Sambhajinagar</p>
              </div>
              <div className="edu-item-box">
                <div className="edu-item-head">
                  <GraduationCap size={18} className="edu-icon" />
                  <span className="edu-period">2022 – 2023</span>
                </div>
                <h4>HSC — 65.00%</h4>
                <p>Bhagwan Mahavidhyalya College Ashti</p>
              </div>
              <div className="edu-item-box">
                <div className="edu-item-head">
                  <GraduationCap size={18} className="edu-icon" />
                  <span className="edu-period">2020 – 2021</span>
                </div>
                <h4>SSC — 77.00%</h4>
                <p>Shri Ganesh Vidhyalya Ashti</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SVG WAVE 1: RED TO WHITE ================= */}
        <div className="wave-divider wave-red-to-white">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path
              d="M0,0 C320,100 520,120 720,70 C920,20 1120,90 1440,30 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* ================= TECHNICAL SKILLS (WHITE SECTION) ================= */}
        <section className="skills-section-light" id="skills">
          <div className="skills-container reveal">
            <div className="skills-header">
              <span className="pill-badge">Technical Skills</span>
              <h2 className="skills-title">My Technical Expertise</h2>
              <p className="skills-subtitle">
                Skilled in Frontend Web Development, React.js, JavaScript, HTML5, CSS3, Core Java, Spring Boot,
                Database Management with MySQL, Git, GitHub, and Modern Web Deployment.
              </p>
            </div>

            <div className="skills-card-grid">
              {skillsData.map((skill, idx) => (
                <div className={`skill-white-card reveal reveal-delay-${idx + 1}`} key={skill.number}>
                  <div className="skill-card-top">
                    <span className="skill-card-icon">{skill.icon}</span>
                    <span className="skill-card-number">{skill.number}</span>
                  </div>
                  <h3 className="skill-card-title">{skill.title}</h3>
                  <p className="skill-card-desc">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SVG WAVE 2: WHITE TO BLACK ================= */}
        <div className="wave-divider wave-white-to-black">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path
              d="M0,0 C280,80 500,10 720,60 C940,110 1180,30 1440,70 L1440,120 L0,120 Z"
              fill="#090909"
            />
          </svg>
        </div>

        {/* ================= FEATURED WORK / PROJECTS (DARK SECTION) ================= */}
        <section className="projects-section-dark" id="projects">
          <div className="projects-container reveal">
            <div className="projects-header">
              <p className="eyebrow-tag accent">MY PROJECTS</p>
              <h2 className="projects-title">Featured Work</h2>
              <p className="projects-subtitle">
                A collection of projects showcasing my skills in Frontend Development, React.js, Full Stack Development,
                Database Design, and Modern Web Applications.
              </p>
            </div>

            <div className="projects-stack-grid">
              {projectsData.map((p, idx) => (
                <article
                  className={`project-card-dark reveal reveal-delay-${idx + 1}`}
                  key={p.number}
                >
                  <div className="project-card-header">
                    <span className="project-num">{p.number}</span>
                    {p.live && (
                      <span className="live-pill-badge">
                        <span className="dot"></span> Live Project
                      </span>
                    )}
                  </div>

                  <h3 className="project-title-text">{p.title}</h3>
                  <h4 className="project-subtitle-text">{p.subtitle}</h4>

                  <div className="project-badges">
                    {p.stack.map((tag) => (
                      <span className="tag-badge" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="project-description-text">{p.description}</p>

                  <div className="project-buttons-row">
                    {p.github && (
                      <a
                        className="btn-project-outline"
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github size={15} /> GitHub <ArrowUpRight className="btn-arrow" size={14} />
                      </a>
                    )}
                    {p.live && (
                      <a
                        className="btn-project-live"
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo <ArrowUpRight className="btn-arrow" size={14} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION (CRIMSON/DARK RED CARD UI) ================= */}
        <section className="contact-section" id="contact">
          <div className="contact-card-box reveal">
            <p className="contact-intro-text">
              I am open to <strong>Frontend Developer</strong>, <strong>React Developer</strong>, and{" "}
              <strong>Full Stack Developer</strong> opportunities. Feel free to contact me for projects,
              internships, or job opportunities.
            </p>

            {/* 4 Info Tiles with Ishwar's details */}
            <div className="contact-tiles-grid">
              {/* Tile 1: Name */}
              <div className="contact-tile">
                <span className="tile-label">Name</span>
                <span className="tile-value">
                  <User size={16} className="tile-icon" /> Ishwar Jadhav
                </span>
              </div>

              {/* Tile 2: Location */}
              <div className="contact-tile">
                <span className="tile-label">Location</span>
                <span className="tile-value">
                  <MapPin size={16} className="tile-icon" /> Pune, Maharashtra, India
                </span>
              </div>

              {/* Tile 3: Email */}
              <a href="mailto:ishwarjadhav701@gmail.com" className="contact-tile tile-link">
                <span className="tile-label">Email</span>
                <span className="tile-value">
                  <Mail size={16} className="tile-icon" /> ishwarjadhav701@gmail.com
                </span>
              </a>

              {/* Tile 4: Phone */}
              <a href="tel:+918459856135" className="contact-tile tile-link">
                <span className="tile-label">Phone</span>
                <span className="tile-value">
                  <Phone size={16} className="tile-icon" /> +91 8459856135
                </span>
              </a>
            </div>

            {/* Direct Action Buttons */}
            <div className="contact-actions-row">
              <a className="btn-email-primary" href="mailto:ishwarjadhav701@gmail.com">
                <Mail size={17} /> Send Email
              </a>
              <button
                className="btn-resume-cta"
                onClick={() => setShowResumeModal(true)}
              >
                <FileText size={16} /> View Resume
              </button>
              <a
                className="btn-social-pill"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> GitHub <ExternalLink size={13} />
              </a>
              <a
                className="btn-social-pill"
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> LinkedIn <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ================= RESUME MODAL VIEWER ================= */}
      {showResumeModal && (
        <div
          className="resume-modal-overlay"
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className="resume-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resume-modal-header">
              <div className="resume-header-title">
                <FileText size={18} className="text-red" />
                <span>Ishwar_Jadhav_Resume.pdf</span>
              </div>
              <div className="resume-header-actions">
                <a
                  className="modal-action-btn"
                  href={resumePdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Open in new tab"
                >
                  <ExternalLink size={15} /> Open in Tab
                </a>
                <a
                  className="modal-action-btn primary"
                  href={resumePdfUrl}
                  download="Ishwar_Jadhav_Resume.pdf"
                  title="Download Resume PDF"
                >
                  <Download size={15} /> Download PDF
                </a>
                <button
                  className="modal-close-btn"
                  onClick={() => setShowResumeModal(false)}
                  aria-label="Close resume modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="resume-modal-body">
              <object
                data={resumePdfUrl}
                type="application/pdf"
                className="resume-pdf-frame"
              >
                <div className="pdf-fallback-box">
                  <FileText size={48} className="text-red" />
                  <h3>Preview Resume</h3>
                  <p>Your browser doesn't support inline PDF preview.</p>
                  <div className="fallback-buttons">
                    <a
                      className="btn btn-red"
                      href={resumePdfUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open PDF in New Tab <ArrowUpRight size={16} />
                    </a>
                    <a
                      className="btn btn-gold"
                      href={resumePdfUrl}
                      download="Ishwar_Jadhav_Resume.pdf"
                    >
                      <Download size={16} /> Download PDF
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-links-list">
            <span>Frontend Web Development</span>
            <span>React.js & JavaScript</span>
            <span>Full Stack Web Development</span>
          </div>

          <div className="footer-grad-info">
            <p>BSc Computer Science (7.54 CGPA) • 2023-2026</p>
            <p>Dr. Babasaheb Ambedkar Marathwada University Sambhajinagar</p>
            <a href="#projects" className="footer-work-link">
              View Work
            </a>
          </div>

          <div className="footer-thankyou">
            <p>Thank you 😊</p>
            <span>2026</span>
          </div>

          {/* Giant Stylish Watermark */}
          <div className="footer-giant-watermark">ishwar..</div>

          <div className="footer-bottom-bar">
            <a href="#contact" className="footer-contact-link">
              Contact
            </a>
            <p>© 2026 Ishwar Jadhav | Software Developer • Pune, India</p>
            <a href="#home" className="footer-top-link">
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
