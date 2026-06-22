import React, { useState } from 'react';
import { FiMenu, FiX, FiChevronRight, FiMoon, FiSun } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from '../ui/Magnetic';
import { useTheme } from '../../context/ThemeContext';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const sections = ['home', 'about', 'projects', 'skills', 'education', 'achievements', 'contact'];

  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto">
      <nav className="glass-panel rounded-full py-3 px-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm tracking-wider">
            SR
          </div>
          <span className="font-bold text-[var(--color-text)] text-lg tracking-tight hover:text-indigo-500 transition-colors duration-300">
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
                  ? 'bg-indigo-500/10 text-indigo-500 shadow-md border border-indigo-500/20' 
                  : 'text-gray-500 hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/5 border border-transparent'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-[var(--color-text)] transition-colors rounded-full hover:bg-[var(--color-text)]/5 cursor-pointer">
            {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          <Magnetic>
            <button 
              onClick={() => handleNavClick('contact')}
              className="relative group px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden transition-all duration-300 shadow-md"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-all duration-500 group-hover:scale-105" />
              <span className="absolute inset-[1px] bg-[var(--bg-color)] rounded-full group-hover:opacity-0 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-1 text-[var(--color-text)] group-hover:text-white transition-colors duration-300">
                Connect <FiChevronRight className="w-4 h-4" />
              </span>
            </button>
          </Magnetic>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-[var(--color-text)] transition-colors cursor-pointer">
            {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-500 hover:text-[var(--color-text)] rounded-lg focus:outline-none cursor-pointer"
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
            className="glass-panel absolute top-20 left-4 right-4 rounded-3xl p-6 shadow-2xl flex flex-col space-y-3 z-40 md:hidden"
          >
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className={`w-full py-3 rounded-2xl text-base font-semibold capitalize text-left px-4 transition-all duration-300 ${
                  activeSection === section 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                    : 'text-[var(--color-text)] hover:bg-[var(--color-text)]/5'
                }`}
              >
                {section}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
