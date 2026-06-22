import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { educationData } from '../../data/education';

export const Education = () => {
  return (
    <section id="education" className="space-y-12 scroll-mt-24">
      <FadeIn>
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)]">
            Education <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Academic milestones with vertical progress lines showing my educational development.
          </p>
        </div>
      </FadeIn>

      <div className="relative max-w-3xl mx-auto">
        {/* Futuristic vertical line */}
        <div className="absolute left-[20px] md:left-[39px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500/30" />
        
        <div className="space-y-12 pl-12 md:pl-20">
          {educationData.map((edu, idx) => (
            <FadeIn key={edu.id} delay={idx * 0.1}>
              <div className="relative group">
                <div className={`absolute -left-[53px] md:-left-[71px] top-1.5 w-6 h-6 rounded-full bg-[var(--bg-color)] border-4 ${idx === 0 ? 'border-indigo-400' : idx === 1 ? 'border-purple-400' : 'border-cyan-400'} flex items-center justify-center z-10 transition-colors duration-300`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:scale-150 transition-transform duration-300" />
                </div>
                
                <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-3 hover:border-[var(--card-hover-border)] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-xl font-bold text-[var(--color-text)]">{edu.degree}</h3>
                    <span className="text-xs text-[var(--text-muted)] font-semibold bg-[var(--color-text)]/5 px-2.5 py-1 rounded-full border border-[var(--color-text)]/10 w-fit">
                      {edu.years}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-indigo-400">{edu.school}</div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-bold rounded-full border border-indigo-500/20">
                    {edu.score}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
