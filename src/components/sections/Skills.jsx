import React from 'react';
import { FiCode, FiLayers, FiCpu, FiSettings } from 'react-icons/fi';
import { FaDatabase } from 'react-icons/fa';
import { skillsData } from '../../data/skills';
import { FadeIn } from '../ui/FadeIn';

const getIconForCategory = (category) => {
  switch (category) {
    case 'Languages': return <FiCode className="w-6 h-6 text-indigo-400" />;
    case 'Frontend': return <FiLayers className="w-6 h-6 text-purple-400" />;
    case 'Backend': return <FiCpu className="w-6 h-6 text-cyan-400" />;
    case 'Database': return <FaDatabase className="w-5 h-5 text-emerald-400" />;
    case 'Developer Tools': return <FiSettings className="w-5 h-5 text-gray-400" />;
    default: return <FiCode className="w-6 h-6" />;
  }
};

export const Skills = () => {
  return (
    <section id="skills" className="space-y-12 scroll-mt-24">
      <FadeIn>
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)]">
            Skills & <span className="text-gradient">Competencies</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Bento-grid representation of languages, web stacks, database paradigms, and tools.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {skillsData.map((group, idx) => (
          <FadeIn key={group.category} delay={idx * 0.1} className={group.category === 'Developer Tools' ? 'md:col-span-2' : ''}>
            <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-4 h-full hover:border-[var(--card-hover-border)] transition-colors">
              <div className="flex items-center gap-3">
                {getIconForCategory(group.category)}
                <h3 className="text-xl font-bold text-[var(--color-text)]">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <span key={skill.name} className="px-3 py-1.5 bg-[var(--color-text)]/5 text-[var(--color-text)] rounded-md text-xs font-semibold border border-[var(--color-text)]/10 hover:bg-[var(--color-text)]/10 transition-colors">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
