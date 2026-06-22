import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { FiMoon, FiSun, FiGithub, FiLinkedin, FiDownload, FiCode } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import './CommandPalette.css';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    setOpen(false);
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Sajith_Raja_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <Command className="cmd-palette glass-panel rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <Command.Input placeholder="Type a command or search..." className="w-full bg-transparent px-4 py-4 text-white outline-none border-b border-white/10 placeholder:text-gray-500" />
              
              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="p-4 text-sm text-gray-400 text-center">No results found.</Command.Empty>
                
                <Command.Group heading="Navigation">
                  <Command.Item onSelect={() => scrollTo('home')}>Go to Home</Command.Item>
                  <Command.Item onSelect={() => scrollTo('about')}>Go to About</Command.Item>
                  <Command.Item onSelect={() => scrollTo('projects')}>Go to Projects</Command.Item>
                  <Command.Item onSelect={() => scrollTo('skills')}>Go to Skills</Command.Item>
                  <Command.Item onSelect={() => scrollTo('contact')}>Go to Contact</Command.Item>
                </Command.Group>
                
                <Command.Group heading="Actions">
                  <Command.Item onSelect={() => { toggleTheme(); setOpen(false); }}>
                    {theme === 'dark' ? <><FiSun className="mr-2" /> Switch to Light Mode</> : <><FiMoon className="mr-2" /> Switch to Dark Mode</>}
                  </Command.Item>
                  <Command.Item onSelect={handleDownloadResume}>
                    <FiDownload className="mr-2" /> Download Resume
                  </Command.Item>
                </Command.Group>
                
                <Command.Group heading="Socials">
                  <Command.Item onSelect={() => { window.open('https://github.com/sajith48', '_blank'); setOpen(false); }}>
                    <FiGithub className="mr-2" /> GitHub
                  </Command.Item>
                  <Command.Item onSelect={() => { window.open('https://www.linkedin.com/in/%EA%9C%B1%E1%B4%80%E1%B4%8A%C9%AA%E1%B4%9B%CA%9C-%CA%80%E1%B4%80%E1%B4%8A%E1%B4%80-856a12327/', '_blank'); setOpen(false); }}>
                    <FiLinkedin className="mr-2" /> LinkedIn
                  </Command.Item>
                  <Command.Item onSelect={() => { window.open('https://leetcode.com/u/SAJITH_24CSR252/', '_blank'); setOpen(false); }}>
                    <FiCode className="mr-2" /> LeetCode Profile
                  </Command.Item>
                </Command.Group>

              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
