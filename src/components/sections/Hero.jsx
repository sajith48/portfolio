import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiDownload, FiTerminal } from 'react-icons/fi';
import { TypewriterScramble } from '../ui/TypewriterScramble';
import { Magnetic } from '../ui/Magnetic';

export const Hero = () => {
  const handleDownloadResume = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Sajith_Raja_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-[85vh] flex flex-col-reverse md:flex-row items-center justify-between py-12 gap-12">
      
      {/* Left Hero Content */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-6 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-[var(--card-border)] text-xs font-semibold text-indigo-400 tracking-wide uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Developer Portfolio
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-[var(--color-text)] leading-tight">
          Hi, I'm <span className="text-gradient">Sajith R</span>
        </h1>
        
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[var(--text-muted)]">
          <TypewriterScramble phrases={['Problem Solver', 'Software Engineer', 'Java Full Stack Developer']} />
        </h2>
        
        <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl leading-relaxed mx-auto md:mx-0">
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
              className="w-full sm:w-auto px-8 py-4 glass-panel border-[var(--card-border)] hover:border-indigo-500/30 text-[var(--color-text)] rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300"
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
          <div className="absolute -inset-1 rounded-full bg-[var(--bg-color)] z-0 transition-colors duration-300" />
          
          {/* Avatar Box */}
          <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-[var(--card-border)] group-hover:border-indigo-400/50 transition-all duration-500">
            <img 
              src="/images/profile_avatar_1782037925482.jpg" 
              alt="Sajith R Avatar" 
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Sajith+R&background=random'; }}
            />
          </div>
          
          {/* Stats bubble */}
          <a 
            href="https://leetcode.com/u/SAJITH_24CSR252/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -bottom-4 -right-4 glass-panel border-[var(--card-border)] rounded-2xl p-4 shadow-xl z-20 hidden sm:flex items-center gap-3 hover:scale-105 hover:shadow-indigo-500/40 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer no-underline"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <FiTerminal className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] font-semibold">DSA solver</div>
              <div className="text-sm font-extrabold text-[var(--color-text)]">190+ Solved</div>
            </div>
          </a>
        </div>
      </motion.div>

    </section>
  );
};
