import { useEffect, useMemo, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import AnimatedName from "./components/AnimatedName";
import ScrollProgressCircle from "./components/ScrollProgressCircle";
import {
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  GraduationCap,
  Briefcase,
  BookOpen,
  Code2,
  Menu,
  X,
  FolderGit2,
  Code,
} from "lucide-react";
import {
  FaBootstrap,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiNextdotjs,
  SiExpress,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { useInView } from "react-intersection-observer";
import "./index.css";
import { SiCplusplus, SiSharp, SiOracle, SiFlask } from "react-icons/si";

// Content sourced from the provided CV
const PROFILE = {
  name: "SYED HASSAN HUSSAIN SHAH",
  title: "Web Developer, Programmer",
  location: "Gujranwala, Pakistan",
  email: "ssyedhassan667@gmail.com",
  github: "github.com/SyedHasanHussainShah ",
  linkedin: "linkedin.com/in/syed-hassan-shah-a3351b2b5",
};

const SKILL_ROTATION = [
  "C++",
  "C#",
  "HTML",
  "CSS",
  "JavaScript",
  "Tailwind CSS",
  "Bootstrap",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
];

const PROJECTS = [
  {
    title: "Islam 360",
    stack: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Axios",
      "ShadCN UI",
      "Context API",
    ],
    description:
      "A full‑featured Islamic utility app with prayer times, offline Dhikr, Tasbih counter, Islamic content, and an integrated AI chatbot trained on Islamic content. Deployed on Vercel.",
    image: "/Islam360.png",
    link: "https://islam-1xr3.vercel.app/",
  },
  {
    title: "Train Reservation System",
    stack: [
      "HTML",
      "Bootstrap",
      "Tailwind CSS",
      "JavaScript",
      "DB integration",
    ],
    description:
      "Responsive booking platform with real‑time train data, secure ticket booking, cancellation, reminders, and account management. Optimized for mobile.",
    image: "/Train.png",
    link: "https://train-delta-bice.vercel.app/",
  },
  {
    title: "ChainWallet DApp",
    stack: [
      "HTML",
      "CSS",
      "Tailwind",
      "JavaScript",
      "ethers.js",
      "jSOPD",
      "QRCode.js",
      "OTPAuth",
      "Web3",
    ],
    description:
      "Decentralized crypto wallet with MetaMask integration, ETH contract transfers, transaction history, 2FA security, contacts, and PDF/QR export; multi‑network support.",
    image: "/ChainVallet.png",
    link: "https://syedhasanhussainshah.github.io/bc/",
  },
  {
    title: "Drive Sense AI",
    stack: [
      "HTML",
      "Tailwind CSS",
      "Bootstrap",
      "Python",
      "Flask",
      "AI model training",
    ],
    description:
      "AI-powered driving analysis with 92% hazard detection accuracy, adjustable sensitivity, and PDF/video reports using Flask & ML models.",
    image: "/DriveSense.png",
    link: "https://syedhasanhussainshah.github.io/Ai-project/",
  },
  {
    title: "Transpomate App",
    stack: ["C++", "DSA", "API", "HTMl", "CSS", "JavaScript", "Github"],
    description:
      "Bus booking app to check availability, calculate distance, and estimate travel time with efficient algorithms and API integration.",
    image: "/Transpomate.png",
    link: "https://github.com/SyedHasanHussainShah/Transpomate-App-Admin-View-", // Will trigger "Coming Soon" alert
  },
  {
    title: "Spotify",
    stack: ["HTML", "Tailwind CSS", "Bootstrap", "JavaScript", "Spotify API"],
    description:
      "Spotify clone with dynamic playlists, real-time music streaming, and sleek UI powered by the Spotify API for authentic functionality.",
    image: "/Spotify.png",
    link: "https://github.com/SyedHasanHussainShah/Spotify-clone-using-html-css-and-javascript",
  },
];

const EDUCATION = [
  {
    school:
      "University of Engineering and Technology Lahore — Gujranwala Campus",
    degree: "BSC Computer Science",
    period: "12/2027 (In progress)",
  },
  {
    school: "Punjab Colleges — Gujranwala",
    degree: "FSC Pre‑Engineering",
    period: "12/2023",
  },
];

const SKILLS = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, level: 95 },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" />, level: 90 },
  {
    name: "JavaScript",
    icon: <SiTypescript className="text-sky-500" />,
    level: 75,
  },
  {
    name: "Bootstrap",
    icon: <FaBootstrap className="text-purple-600" />,
    level: 85,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-sky-400" />,
    level: 90,
  },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, level: 80 },
  { name: "React", icon: <FaReact className="text-sky-400" />, level: 65 },
  { name: "Vite", icon: <SiVite className="text-purple-500" />, level: 80 },
  { name: "Next.js", icon: <SiNextdotjs />, level: 50 },
  { name: "Express.js", icon: <SiExpress />, level: 48 },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-700" />,
    level: 70,
  },
  { name: "Python", icon: <FaPython className="text-yellow-500" />, level: 75 },
  { name: "Flask", icon: <SiFlask className="text-green-500" />, level: 60 },
  { name: "C++", icon: <SiCplusplus className="text-sky-500" />, level: 80 },
  { name: "C#", icon: <SiSharp className="text-purple-500" />, level: 78 },
  { name: "Oracle", icon: <SiOracle className="text-red-500" />, level: 70 },
];

function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return [theme, toggle];
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 dark:bg-slate-800 text-sky-600 dark:text-indigo-400">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          <span className="gradient-text">{title}</span>
        </h2>
        {subtitle && (
          <p className="text-sm text-white dark:text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function useReveal() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const variants = useMemo(
    () => ({ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }),
    []
  );
  return { ref, variants, inView };
}

export default function App() {
  const [theme, toggleTheme] = useTheme();

  const { ref: heroRef, inView: heroInView } = useReveal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 
        bg-white/90 text-slate-900 dark:bg-slate-900/80 dark:text-white 
        backdrop-blur-md shadow-md 
        border-b border-slate-200 dark:border-slate-800
        transition-all duration-300 ease-in-out"
      >
        <div className="container-responsive flex items-center justify-between py-3">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 text-lg font-extrabold"
          >
            <Code2 className="text-sky-500" />
            <span className="hidden sm:inline">{PROFILE.name}</span>
            <span className="sm:hidden">SHHS</span>
          </a>

          {/* Desktop Links with Icons */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a
              href="#projects"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <FolderGit2 size={16} /> Projects
            </a>
            <a
              href="#education"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <GraduationCap size={16} /> Education
            </a>
            <a
              href="#skills"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <Code size={16} /> Skills
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <Mail size={16} /> Contact
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/SyedHasanHussainShah"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/syed-hassan-hussain-shah-a3351b2b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-outline"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {/* Mobile Menu Button - only show on mobile */}
            {window.innerWidth < 768 && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden btn-outline "
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-md animate-slide-down">
            <div className="flex flex-col p-4 space-y-3 text-sm font-semibold">
              <a
                href="#projects"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-sky-500"
              >
                <FolderGit2 size={16} /> Projects
              </a>
              <a
                href="#education"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-sky-500"
              >
                <GraduationCap size={16} /> Education
              </a>
              <a
                href="#skills"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-sky-500"
              >
                <Code size={16} /> Skills
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-sky-500"
              >
                <Mail size={16} /> Contact
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* Hero */}
      <header id="home" className="container-responsive">
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16"
        >
          {/* LEFT SIDE */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40 },
              show: { opacity: 1, x: 0 },
            }}
            className="order-2 lg:order-1 space-y-6"
          >
            {/* Badge */}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: -20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-sky-100 text-sky-600 dark:bg-slate-800 dark:text-indigo-400 px-4 py-1 text-xs font-bold tracking-widest uppercase"
            >
              {PROFILE.title}
            </motion.span>

            {/* Animated Name */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 70 }}
            >
              <AnimatedName />
            </motion.div>

            {/* Main Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl"
            >
              I build responsive, scalable, and secure digital experiences —
              from sleek UI designs to robust backend systems. I’m passionate
              about crafting{" "}
              <span className="italic">delightful user journeys</span> powered
              by modern technology and clean, maintainable code.
            </motion.p>

            {/* Skills Rotation */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium"
            >
              I work with{" "}
              <span className="font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                <Typewriter
                  words={SKILL_ROTATION}
                  loop={0}
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={1400}
                />
              </span>
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              className="flex gap-4 mt-6"
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out"
              >
                🚀 View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
              >
                💼 Hire Me
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - IMAGE */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, rotate: -5 },
              show: { opacity: 1, scale: 1, rotate: 0 },
            }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative mx-auto h-60 w-60 sm:h-72 sm:w-72 lg:h-80 lg:w-80 rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200/70 dark:ring-slate-700">
              <img
                src="/Profile1.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-indigo-500/10 mix-blend-overlay" />
            </div>
          </motion.div>
        </motion.section>
      </header>

      {/* Projects */}
      <main className="space-y-24">
        <section id="projects" className="container-responsive">
          <SectionHeader
            icon={<Briefcase />}
            title="Projects"
            subtitle="A selection of recently built apps and experiments"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {PROJECTS.map((p, idx) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.15,
                  type: "spring",
                  stiffness: 80,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                  transition: { duration: 0.4 },
                }}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <motion.img
                  src={p.image}
                  alt={p.title}
                  className="h-44 w-full object-cover"
                  initial={{ scale: 1.1 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="p-5 space-y-4">
                  <motion.h3
                    className="text-xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 + 0.2, duration: 0.4 }}
                  >
                    {p.title}
                  </motion.h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((t, tagIdx) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: tagIdx * 0.05 }}
                        className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-100 via-slate-100 to-purple-100 
                             dark:from-blue-900 dark:via-slate-800 dark:to-purple-900 
                             text-slate-700 dark:text-slate-300 shadow-sm"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <motion.a
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                      }}
                      className="btn-primary"
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Project
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="container-responsive">
          <SectionHeader
            icon={<Code2 />}
            title="Skills"
            subtitle="Core technologies I use"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {SKILLS.map((s, idx) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 
                   bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl 
                   hover:scale-105 transition-all duration-300 
                   relative overflow-hidden group"
              >
                {/* Shiny hover overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                        animate-shimmer pointer-events-none"
                />

                <div className="flex items-center gap-3">
                  <div className="text-2xl text-sky-500">{s.icon}</div>
                  <div className="font-semibold">{s.name}</div>
                </div>

                {/* Progress bar with animation */}
                <div className="mt-4 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    transition={{ duration: 1.2, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <style>
          {`
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
`}
        </style>

        {/*EDucation*/}
        <section id="education" className="container-responsive">
          <SectionHeader
            icon={<GraduationCap />}
            title="Education"
            subtitle="Academic background"
          />
          <ol className="relative border-s-4 border-transparent before:absolute before:top-0 before:bottom-0 before:left-2 before:w-1 before:bg-gradient-to-b before:from-sky-400 before:via-cyan-500 before:to-blue-500 before:rounded-full before:shadow-[0_0_15px_rgba(56,189,248,0.6)]">
            {EDUCATION.map((e, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -80, rotate: -2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                className="ms-10 mb-10 relative group"
              >
                {/* Dot Marker */}
                <span className="absolute -left-6 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-500 text-white shadow-lg ring-4 ring-white dark:ring-slate-900 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                  <BookOpen size={16} />
                </span>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 0.5 }}
                  className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {e.school}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    {e.degree}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    {e.period}
                  </p>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </section>
        {/* Resume*/}

        <section id="resume" className="container-responsive py-20">
          <div className="rounded-3xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 p-10 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
            {/* Background Glow Animation */}
            <div className="absolute inset-0">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-sky-400/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            {/* Text Content */}
            <div className="max-w-lg space-y-4 z-10">
              <h2 className="text-4xl font-extrabold drop-shadow-lg">
                Download My Resume
              </h2>
              <p className="text-lg opacity-90 leading-relaxed">
                Explore my{" "}
                <span className="font-semibold">
                  skills, experience, and achievements
                </span>{" "}
                in one place. Perfect for recruiters, clients, and collaborators
                who want a <span className="italic">detailed insight</span> into
                my professional journey.
              </p>
            </div>

            {/* Download Button */}

            <a
              href="https://drive.google.com/file/d/17uEe9T9TmZqEFvpqv6tYoh2ZwoDC5kBP/view?usp=sharing"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 bg-white text-sky-700 font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-3 z-10 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:translate-y-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8l-4 4m4-4l4 4m-4-12v4"
                />
              </svg>
              Download PDF
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container-responsive py-16">
          <SectionHeader
            icon={<Mail />}
            title="Contact"
            subtitle="Let’s build something amazing together"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5"
            >
              {/* Email Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center gap-3 px-5 py-3 rounded-xl 
                   border border-sky-500 text-sky-500 font-medium shadow-md
                   hover:bg-sky-500 hover:text-white transition-all duration-300"
                href="mailto:ssyedhassan667@gmail.com"
              >
                <Mail size={18} /> Email Us
              </motion.a>

              {/* Social Buttons */}
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700
                     hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-300"
                  href="https://github.com/SyedHasanHussainShah"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={18} /> GitHub
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700
                     hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-300"
                  href="https://www.linkedin.com/in/syed-hassan-hussain-shah-a3351b2b5/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={18} /> LinkedIn
                </motion.a>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Got a project idea or collaboration in mind? Fill out the form
                and I’ll get back to you within 24 hours.
              </p>
            </motion.div>

            {/* RIGHT SIDE - CONTACT FORM */}
            <motion.form
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-4"
              onSubmit={sendEmail}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700
                     bg-white dark:bg-slate-900 text-slate-900 dark:text-white
                     placeholder-slate-400 dark:placeholder-slate-500
                     focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700
                     bg-white dark:bg-slate-900 text-slate-900 dark:text-white
                     placeholder-slate-400 dark:placeholder-slate-500
                     focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700
                   bg-white dark:bg-slate-900 text-slate-900 dark:text-white
                   placeholder-slate-400 dark:placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-sky-500"
              />

              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700
                   bg-white dark:bg-slate-900 text-slate-900 dark:text-white
                   placeholder-slate-400 dark:placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-sky-500"
              ></textarea>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-sky-500 text-white font-semibold
                   hover:bg-sky-600 shadow-lg hover:shadow-xl
                   transition-all duration-300"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 relative overflow-hidden border-t border-slate-200 dark:border-slate-800">
        {/* Background Glow Animation */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-sky-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Footer Content */}
        <div className="relative container-responsive py-6 flex flex-col items-center gap-3 text-center z-10">
          {/* Gradient Line */}
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 animate-gradient-x"></div>

          {/* Name */}
          <p className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">
            © {new Date().getFullYear()} Syed Hassan Hussain Shah
          </p>
        </div>
      </footer>
      <ScrollProgressCircle />
    </div>
  );
}

import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  Swal.fire({
    title: "Sending...",
    text: "Please wait while we send your message.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  emailjs
    .sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      e.currentTarget,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting me. I’ll reply soon.",
        showConfirmButton: false,
        timer: 2500,
        background: "#1e293b", // dark blue background
        color: "#fff", // white text
        backdrop: `
          rgba(0,0,0,0.5)
          url("https://i.gifer.com/7efs.gif")
          left top
          no-repeat
        `,
      });
      e.currentTarget.reset();
    })
    .catch(() => {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting me. I’ll reply soon",
        confirmButtonColor: "#1e293b",
      });
    });
};
