import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-32 border-t border-white/5 bg-[var(--bg-color)] py-12 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[var(--color-text)] text-base">Sajith R</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-500 text-xs">Last updated: June 2026</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/sajith48" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-indigo-500 transition-colors font-medium">GitHub</a>
          <a href="https://www.linkedin.com/in/%EA%9C%B1%E1%B4%80%E1%B4%8A%C9%AA%E1%B4%9B%CA%9C-%CA%80%E1%B4%80%E1%B4%8A%E1%B4%80-856a12327/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-indigo-500 transition-colors font-medium">LinkedIn</a>
        </div>
        <p className="text-gray-500 text-xs text-center md:text-right">
          &copy; {new Date().getFullYear()} Sajith R. All rights reserved. Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
};
