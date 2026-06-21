import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaDatabase } from 'react-icons/fa';
import { 
  FiMail, 
  FiPhone, 
  FiExternalLink, 
  FiCode, 
  FiAward, 
  FiBookOpen, 
  FiBriefcase, 
  FiCpu, 
  FiLayers, 
  FiSend, 
  FiTerminal, 
  FiChevronRight, 
  FiChevronUp, 
  FiMenu, 
  FiX, 
  FiCheckCircle, 
  FiDownload,
  FiSettings
} from 'react-icons/fi';

// 1. Magnetic Button Wrapper
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// 2. 3D Tilt Hover Glow Card
const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);

    // Track cursor location inside CSS custom properties for hover glow tracking
    cardRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`glass-panel rounded-2xl relative overflow-hidden group/card ${className}`}
    >
      {/* Glow highlight layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_250px_at_var(--x,50%)_var(--y,50%),rgba(99,102,241,0.12)_0%,transparent_100%)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

// 3. Scroll FadeIn wrapper component
const FadeIn = ({ children, delay = 0, duration = 0.6, direction = 'up' }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

// 4. Typewriter / Text Scramble Subtitle Component
const TypewriterScramble = ({ phrases, delay = 100, deleteDelay = 60, pauseTime = 1500 }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const phrase = phrases[currentIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(phrase.substring(0, displayText.length - 1));
      }, deleteDelay);
    } else {
      timer = setTimeout(() => {
        setDisplayText(phrase.substring(0, displayText.length + 1));
      }, delay);
    }

    if (!isDeleting && displayText === phrase) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIdx((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIdx, phrases, delay, deleteDelay, pauseTime]);

  return (
    <span className="text-gradient font-bold tracking-tight">
      {displayText}
      <span className="animate-[ping_1.2s_infinite] ml-1 font-extralight text-indigo-400">|</span>
    </span>
  );
};

const CursorGlow = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const isInteractive = 
        target.closest('a') !== null || 
        target.closest('button') !== null || 
        target.closest('.group') !== null;
      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const smoothX = useSpring(cursorX, { stiffness: 100, damping: 25, mass: 0.5 });
  const smoothY = useSpring(cursorY, { stiffness: 100, damping: 25, mass: 0.5 });

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[1] hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      <motion.div
        animate={{
          width: isHovering ? 350 : 200,
          height: isHovering ? 350 : 200,
          opacity: isHovering ? 0.3 : 0.15,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="rounded-full bg-gradient-to-tr from-[#8B5CF6] via-[#6366F1] to-[#3B82F6] blur-[60px]"
      />
    </motion.div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sections = ['home', 'about', 'projects', 'skills', 'education', 'achievements', 'contact'];

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Handle Scroll progress, Back to Top button, and Active Section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Calculate Scroll Progress Bar
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Show/Hide Back to Top button
      setShowBackToTop(window.scrollY > 400);

      // Track active section
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setErrorMessage('');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
      );
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setErrorMessage(err?.text || 'Failed to send message. Please check your network and try again.');
      setTimeout(() => setErrorMessage(''), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Sajith_Raja_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Project Content List
  const projectsData = [
    {
      id: 1,
      title: "QuickSlots Chrome Extension",
      shortDesc: "A productivity-focused Chrome Extension with 4 clipboard slots, keyboard shortcuts, recent history, and drag-and-drop reordering for faster text management.",
      longDesc: `QuickSlots is a modern multi-clipboard Chrome Extension built to improve productivity by allowing users to save, organize, and paste frequently used text with customizable keyboard shortcuts.

The extension provides four clipboard slots, enabling quick access to saved text without repeatedly copying and pasting. It also includes Recent History to keep track of recently saved content, drag-and-drop slot reordering for better organization, instant search, and editing capabilities.

Designed with performance and simplicity in mind, QuickSlots stores all data locally using the Chrome Storage API, ensuring user privacy and fast access without relying on external servers.`,
      img: "/images/project_quickslots_1782037942504.png",
      tags: ["JavaScript", "Chrome Extensions", "JSON", "HTML5", "CSS3"],
      github: "https://github.com/sajith48",
      features: [
        "Dynamic glassmorphic control center",
        "Configurable hotkey site mapping",
        "Low memory footprints (under 10MB runtime)",
        "Backup synchronization and recovery profiles"
      ]
    },
    {
      id: 2,
      title: "YouTube Focus Mode Extension",
      shortDesc: "Hides distracting platform components to maximize learning productivity.",
      longDesc: "A focus-oriented extension engineered to suppress distracting elements on video sites. It injects a highly responsive DOM-filtering script to seamlessly block recommender sidebars, Shorts reels, infinite feeds, and user comments. The extension includes a clean, togglable control popover allowing students to configure filter strengths based on their current focus needs.",
      img: "/images/project_focusmode_1782037956658.png",
      tags: ["JavaScript", "DOM Injection", "CSS Inject", "Productivity Tools"],
      github: "https://github.com/sajith48",
      features: [
        "Instant hides of Shorts reels and sidebar feeds",
        "Granular blocking filter toggles",
        "Zero-latency script injections",
        "Minimalist distraction-free dashboard toggle"
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#080A10] text-gray-300 font-sans antialiased overflow-hidden">
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Floating Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[8%] left-[10%] w-[38vw] h-[38vw] rounded-full bg-indigo-500/8 blur-[130px] animate-blob-1" />
        <div className="absolute top-[38%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-purple-500/6 blur-[110px] animate-blob-2" />
        <div className="absolute bottom-[12%] left-[18%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/8 blur-[125px] animate-blob-3" />
      </div>

      {/* Interactive Cursor Glow */}
      <CursorGlow />

      {/* 1. Floating Navbar */}
      <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto">
        <nav className="glass-panel rounded-full py-3 px-6 flex items-center justify-between border-white/10 shadow-lg">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm tracking-wider">
              SR
            </div>
            <span className="font-bold text-white text-lg tracking-tight hover:text-indigo-400 transition-colors duration-300">
              Sajith R
            </span>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 capitalize ${
                  activeSection === section 
                    ? 'bg-white/10 text-white shadow-md border border-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Contact Button Desktop */}
          <div className="hidden md:block">
            <Magnetic>
              <button 
                onClick={() => handleNavClick('contact')}
                className="relative group px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden transition-all duration-300 shadow-md"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-all duration-500 group-hover:scale-105" />
                <span className="absolute inset-[1px] bg-[#0F111E] rounded-full group-hover:opacity-0 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-1 group-hover:text-[#0F111E] transition-colors duration-300">
                  Connect <FiChevronRight className="w-4 h-4" />
                </span>
              </button>
            </Magnetic>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-lg focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel absolute top-20 left-4 right-4 rounded-3xl p-6 border-white/10 shadow-2xl flex flex-col space-y-3 z-40 md:hidden"
            >
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`w-full py-3 rounded-2xl text-base font-semibold capitalize text-left px-4 transition-all duration-300 ${
                    activeSection === section 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Wrapper */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-32 space-y-32 relative z-10">
        
        {/* 2. Hero Section */}
        <section id="home" className="min-h-[85vh] flex flex-col-reverse md:flex-row items-center justify-between py-12 gap-12">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-white/10 text-xs font-semibold text-indigo-400 tracking-wide uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Developer Portfolio
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-gradient">Sajith R</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-400">
              <TypewriterScramble phrases={['Problem Solver', 'Software Engineer', 'Java Full Stack Developer']} />
            </h2>
            
            <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed mx-auto md:mx-0">
              Passionate developer building high-quality software solutions. Focusing on core Java architectures, responsive frontends with React, and intelligent integrations using AI workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <Magnetic>
                <button 
                  onClick={handleDownloadResume}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 no-underline cursor-pointer border-none"
                >
                  <FiDownload className="w-5 h-5" /> Download Resume
                </button>
              </Magnetic>
              <Magnetic>
                <a 
                  href="https://github.com/sajith48" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 glass-panel border-white/10 hover:border-indigo-500/30 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <FaGithub className="w-5 h-5" /> GitHub Profile
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex-1 flex justify-center items-center"
          >
            <div className="relative group">
              {/* Outer spin lighting */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 opacity-60 blur-md group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-[spin_12s_linear_infinite]" />
              <div className="absolute -inset-1 rounded-full bg-[#080A10] z-0" />
              
              {/* Avatar Box */}
              <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-indigo-400/50 transition-all duration-500">
                <img 
                  src="/images/profile_avatar_1782037925482.jpg" 
                  alt="Sajith R Avatar" 
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Stats bubble */}
              <a 
                href="https://leetcode.com/u/SAJITH_24CSR252/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-4 -right-4 glass-panel border-white/10 rounded-2xl p-4 shadow-xl z-20 hidden sm:flex items-center gap-3 hover:scale-105 hover:shadow-indigo-500/40 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer no-underline"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <FiTerminal className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">DSA solver</div>
                  <div className="text-sm font-extrabold text-white">190+ Solved</div>
                </div>
              </a>
            </div>
          </motion.div>

        </section>

        {/* 3. About Section */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <FadeIn>
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                About <span className="text-gradient">Myself</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Discover my goals, drive, and personal trajectory.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Grid Item 1: About Me */}
            <TiltCard className="md:col-span-2 p-8 flex flex-col justify-between h-[360px]">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-indigo-400">
                  <FiCpu className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Who I Am</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                  I am a student currently studying for my Bachelor's Degree at Kongu Engineering College. 
                  My engineering journey revolves around writing robust systems, mastering web applications, and finding innovative ways to build AI plugins. 
                  I focus on core logic, algorithmic scalability, and delivering clean, production-ready code.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-xs font-semibold border border-indigo-500/20">Analytical</span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/20">Independent Learner</span>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/20">Colleague & Coordinator</span>
              </div>
            </TiltCard>

            {/* Bento Grid Item 2: Learning Journey */}
            <TiltCard className="p-8 flex flex-col justify-between h-[360px]">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-cyan-400">
                  <FiBookOpen className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Learning Journey</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Beyond college curricula, I dedicate hours to web engineering projects and coding platforms. 
                  I am learning design architectures, data structures, and the latest layout configurations in React.
                </p>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-500 font-semibold uppercase">Primary Interests</div>
                <div className="text-sm text-indigo-400 font-bold">Java Ecosystem & AI API Workflows</div>
              </div>
            </TiltCard>

            {/* Bento Grid Item 3: Career Goals */}
            <TiltCard className="p-8 flex flex-col justify-between h-[360px]">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-purple-400">
                  <FiLayers className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Career Goals</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  I want to become a full stack systems engineer capable of building reliable backend systems and beautiful, highly intuitive frontends. 
                  Developing developer tools, system wrappers, and AI plugins is my ultimate aim.
                </p>
              </div>
              <div className="flex items-center text-sm font-bold text-indigo-400 transition-colors">
                Aiming for Full Stack roles <FiChevronRight className="w-4 h-4 ml-1" />
              </div>
            </TiltCard>

            {/* Bento Grid Item 4: Stats */}
            <TiltCard className="md:col-span-2 p-8 flex flex-col justify-between h-[360px] md:h-auto">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white">
                  <FiAward className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-xl font-bold">Quick Overview</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="text-2xl font-bold text-indigo-400">190+ Problems</div>
                    <div className="text-xs text-gray-400">Solved across LeetCode & HackerRank, showcasing algorithms expertise.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="text-2xl font-bold text-purple-400">Club Coordinator</div>
                    <div className="text-xs text-gray-400">Led the Student Club, managing events, schedules, and developer meetups.</div>
                  </div>
                </div>
              </div>
            </TiltCard>
            
          </div>
        </section>

        {/* 4. Projects Section */}
        <section id="projects" className="space-y-12 scroll-mt-24">
          <FadeIn>
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Discover my Chrome extensions that simplify web surfing and boost focus. Click details to see feature deep dives.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projectsData.map((project) => (
              <FadeIn key={project.id}>
                <div className="glass-panel border-white/10 rounded-3xl overflow-hidden group flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 h-full">
                  
                  {/* Screenshot area */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900 border-b border-white/5">
                    <img 
                      src={project.img} 
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F111E] to-transparent opacity-60" />
                  </div>
                  
                  <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                          <FaGithub className="w-5 h-5" />
                        </a>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {project.shortDesc}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Stack badges */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 rounded bg-[#080A10] border border-white/5 text-xs text-indigo-300 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          Read Details <FiChevronRight className="w-4 h-4" />
                        </button>
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white font-medium"
                        >
                          GitHub Link <FiExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 5. Skills Bento Grid */}
        <section id="skills" className="space-y-12 scroll-mt-24">
          <FadeIn>
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Skills & <span className="text-gradient">Competencies</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Bento-grid representation of languages, web stacks, database paradigms, and tools.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* 1. Languages */}
            <div className="glass-panel border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3 text-indigo-400">
                <FiCode className="w-6 h-6" />
                <h3 className="text-xl font-bold text-white">Languages</h3>
              </div>
              <div className="flex flex-col space-y-3">
                {[
                  { name: "Java", level: "Advanced" },
                  { name: "C Language", level: "Prior Experience" },
                  { name: "JavaScript (ES6+)", level: "Intermediate" }
                ].map((s) => (
                  <div key={s.name} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-200">{s.name}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20 font-semibold">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Frontend */}
            <div className="glass-panel border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3 text-purple-400">
                <FiLayers className="w-6 h-6" />
                <h3 className="text-xl font-bold text-white">Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["HTML5", "CSS3", "React.js", "Tailwind CSS v4"].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-purple-500/10 text-purple-300 rounded-md text-xs font-semibold border border-purple-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Backend */}
            <div className="glass-panel border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <FiCpu className="w-6 h-6" />
                <h3 className="text-xl font-bold text-white">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["Node.js", "Express.js"].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-cyan-500/10 text-cyan-300 rounded-md text-xs font-semibold border border-cyan-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Database (Spans 1 col on desktop) */}
            <div className="glass-panel border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <FaDatabase className="w-5 h-5" />
                <h3 className="text-xl font-bold text-white">Database</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["MongoDB", "SQL Basics"].map((db) => (
                  <span key={db} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-300 rounded-md text-xs font-semibold border border-emerald-500/20">
                    {db}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Tools (Spans 2 cols on desktop) */}
            <div className="md:col-span-2 glass-panel border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3 text-white">
                <FiSettings className="w-5 h-5 text-gray-400" />
                <h3 className="text-xl font-bold">Developer Tools</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Git Version Control", "GitHub Hooks", "VS Code", "Chrome APIs"].map((tool) => (
                  <span key={tool} className="px-3.5 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-xs font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 6. Education Futuristic Timeline */}
        <section id="education" className="space-y-12 scroll-mt-24">
          <FadeIn>
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Education <span className="text-gradient">Milestones</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Academic milestones with vertical progress lines showing academic development.
              </p>
            </div>
          </FadeIn>

          <div className="relative max-w-3xl mx-auto">
            {/* Futuristic vertical line */}
            <div className="absolute left-[20px] md:left-[39px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500/30" />
            
            <div className="space-y-12 pl-12 md:pl-20">
              
              {/* Edu Card 1 */}
              <FadeIn delay={0.1}>
                <div className="relative group">
                  {/* Timeline dot with glowing indicator */}
                  <div className="absolute -left-[53px] md:-left-[71px] top-1.5 w-6 h-6 rounded-full bg-[#080A10] border-4 border-indigo-400 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform duration-300" />
                  </div>
                  
                  <div className="glass-panel border-white/10 rounded-2xl p-6 md:p-8 space-y-3 hover:border-indigo-500/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Bachelor's Degree</h3>
                      <span className="text-xs text-gray-500 font-semibold bg-white/5 px-2.5 py-1 rounded-full border border-white/5 w-fit">2024 - 2028</span>
                    </div>
                    <div className="text-sm font-semibold text-indigo-300">Kongu Engineering College</div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/20">
                      GPA: 8.13 / 10.0
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Edu Card 2 */}
              <FadeIn delay={0.2}>
                <div className="relative group">
                  <div className="absolute -left-[53px] md:-left-[71px] top-1.5 w-6 h-6 rounded-full bg-[#080A10] border-4 border-purple-400 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform duration-300" />
                  </div>
                  
                  <div className="glass-panel border-white/10 rounded-2xl p-6 md:p-8 space-y-3 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Class 12th (Higher Secondary)</h3>
                      <span className="text-xs text-gray-500 font-semibold bg-white/5 px-2.5 py-1 rounded-full border border-white/5 w-fit">2024</span>
                    </div>
                    <div className="text-sm font-semibold text-purple-300">Governement Boys Higher Secondary School</div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 text-purple-300 text-xs font-bold rounded-full border border-purple-500/20">
                      Grades: 89.83%
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Edu Card 3 */}
              <FadeIn delay={0.3}>
                <div className="relative group">
                  <div className="absolute -left-[53px] md:-left-[71px] top-1.5 w-6 h-6 rounded-full bg-[#080A10] border-4 border-cyan-400 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform duration-300" />
                  </div>
                  
                  <div className="glass-panel border-white/10 rounded-2xl p-6 md:p-8 space-y-3 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">Class 10th (Secondary School)</h3>
                      <span className="text-xs text-gray-500 font-semibold bg-white/5 px-2.5 py-1 rounded-full border border-white/5 w-fit">2022</span>
                    </div>
                    <div className="text-sm font-semibold text-cyan-300">St. Mary's High School</div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs font-bold rounded-full border border-cyan-500/20">
                      Grades: 75.00%
                    </div>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* 7. Achievements Section */}
        <section id="achievements" className="space-y-12 scroll-mt-24">
          <FadeIn>
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Key <span className="text-gradient">Achievements</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Prominent accomplishments and roles held during my academic path.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Achievement Card 1 */}
            <FadeIn delay={0.1}>
              <div className="glass-panel border-white/10 rounded-3xl p-8 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <FiLayers className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Student Club Leadership</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Directed and coordinated the Student Club at Kongu Engineering College. 
                    Planned multi-track technical events, coordinated speaker sessions, managed budgeting, and hosted development hackathons for junior students.
                  </p>
                </div>
                <div className="text-xs text-gray-500 font-semibold pt-6">Kongu Engineering College</div>
              </div>
            </FadeIn>

            {/* Achievement Card 2 */}
            <FadeIn delay={0.2}>
              <div className="glass-panel border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                    <FiTerminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">190+ DSA Problems Solved</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Solved over 100 challenges covering arrays, hashes, sliding windows, heaps, and tree searches across coding platforms. 
                    Maintained consistent solve patterns, optimizing script execution complexity and space usage.
                  </p>
                </div>
                <div className="text-xs text-gray-500 font-semibold pt-6">Platforms: LeetCode & HackerRank</div>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* 8. Contact Section */}
        <section id="contact" className="space-y-12 scroll-mt-24 max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Get In <span className="text-gradient">Touch</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Have a proposal or want to collaborate? Drop me a line!
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            
            {/* Contact Details Side */}
            <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Contact Info</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Feel free to send an email, dial the mobile link, or connect via LinkedIn and GitHub profiles. I look forward to connecting!
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <a href="mailto:sajith482007@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">Email Address</div>
                    <div className="text-sm font-bold text-white">sajith482007@gmail.com</div>
                  </div>
                </a>

                <a href="tel:+918825822124" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">Phone Number</div>
                    <div className="text-sm font-bold text-white">+91 88258 22124</div>
                  </div>
                </a>
              </div>

              {/* Social handles */}
              <div className="flex gap-4 pt-6">
                <Magnetic>
                  <a 
                    href="https://github.com/sajith48" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a 
                    href="https://www.linkedin.com/in/%EA%9C%B1%E1%B4%80%E1%B4%8A%C9%AA%E1%B4%9B%CA%9C-%CA%80%E1%B4%80%E1%B4%8A%E1%B4%80-856a12327/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Contact Form with Floating Labels & Validation */}
            <div className="md:col-span-3 glass-panel border-white/10 rounded-3xl p-6 md:p-8 relative">
              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#0C0E1A]/95 rounded-3xl p-6 z-20 text-center space-y-4"
                  >
                    <FiCheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
                    <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                    <p className="text-gray-400 text-sm max-w-xs">
                      Thank you for writing. Sajith R will check your inquiry and follow up shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name Input with Floating Label */}
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder=" " 
                      className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-[#080A10]/50 border border-white/10 text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:opacity-0"
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-4 top-4 -translate-y-1/2 text-gray-500 text-xs transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:text-xs peer-focus:text-indigo-400"
                    >
                      Your Name
                    </label>
                  </div>

                  {/* Email Input with Floating Label */}
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder=" " 
                      className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-[#080A10]/50 border border-white/10 text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:opacity-0"
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-4 top-4 -translate-y-1/2 text-gray-500 text-xs transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:text-xs peer-focus:text-indigo-400"
                    >
                      Email Address
                    </label>
                  </div>

                </div>

                {/* Message Input with Floating Label */}
                <div className="relative">
                  <textarea 
                    id="message" 
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder=" " 
                    className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-[#080A10]/50 border border-white/10 text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:opacity-0 resize-none"
                  />
                  <label 
                    htmlFor="message" 
                    className="absolute left-4 top-6 -translate-y-1/2 text-gray-500 text-xs transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:text-xs peer-focus:text-indigo-400"
                  >
                    Your Message
                  </label>
                </div>

                <Magnetic>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Send Message <FiSend className="w-4 h-4" /></>
                    )}
                  </button>
                </Magnetic>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* 9. Footer */}
      <footer className="mt-32 border-t border-white/5 bg-[#05060A]/85 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-base">Sajith R</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-500 text-xs">Last updated: June 21, 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/sajith48" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/SajithRaja" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p className="text-gray-600 text-xs text-center md:text-right">
            &copy; {new Date().getFullYear()} Sajith R. All rights reserved. Crafted with UI/UX Pro design system.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-40"
          >
            <Magnetic>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-12 h-12 rounded-full glass-panel border-white/10 hover:border-indigo-500/30 text-white flex items-center justify-center shadow-2xl cursor-pointer"
                aria-label="Back to top"
              >
                <FiChevronUp className="w-6 h-6 animate-pulse" />
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            {/* Modal content box */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="glass-panel border-white/10 rounded-3xl w-full max-w-3xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#080A10]/70 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>
              
              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Visual Image Header */}
                <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl bg-slate-900 border border-white/5">
                  <img 
                    src={selectedProject.img} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E1A] via-transparent to-transparent opacity-80" />
                  <h3 className="absolute bottom-4 left-6 text-2xl md:text-3xl font-extrabold text-white">{selectedProject.title}</h3>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Project Overview</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {selectedProject.longDesc}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">Key Features</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <FiCheckCircle className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack and Action Links */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded bg-[#080A10] border border-white/5 text-xs text-indigo-300 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <a 
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-full text-sm font-bold border border-white/5 flex items-center gap-2 transition-all"
                    >
                      <FaGithub className="w-4 h-4" /> GitHub
                    </a>
                    <a 
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-indigo-500/10"
                    >
                      Live Demo <FiExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
