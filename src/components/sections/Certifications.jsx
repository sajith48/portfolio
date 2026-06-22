import React from 'react';
import { FiLayers, FiTerminal, FiAward, FiExternalLink } from 'react-icons/fi';
import { FadeIn } from '../ui/FadeIn';
import { TiltCard } from '../ui/TiltCard';
import { achievementsData, certificationsData } from '../../data/achievements';

export const Certifications = () => {
  const getIcon = (type) => {
    if (type === 'leadership') return <FiLayers className="w-6 h-6" />;
    if (type === 'code') return <FiTerminal className="w-6 h-6" />;
    return <FiAward className="w-6 h-6" />;
  };

  return (
    <section id="achievements" className="space-y-20 scroll-mt-24">
      {/* Achievements Part */}
      <div className="space-y-12">
        <FadeIn>
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)]">
              Key <span className="text-gradient">Achievements</span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto">
              Prominent accomplishments and roles held during my academic path.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {achievementsData.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 0.1}>
              <TiltCard className="p-8 h-full">
                <div className="space-y-4 flex flex-col h-full justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover/card:bg-indigo-500 group-hover/card:text-white transition-all duration-300">
                      {getIcon(item.iconType)}
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-text)]">{item.title}</h3>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] font-semibold pt-6">
                    {item.organization}
                  </div>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Certifications Part */}
      <div className="space-y-12">
        <FadeIn>
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)]">
              Licenses & <span className="text-gradient">Certifications</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certificationsData.map((cert, idx) => (
            <FadeIn key={cert.id} delay={idx * 0.1}>
              <div className="glass-panel p-6 rounded-2xl flex items-start justify-between hover:border-[var(--card-hover-border)] transition-colors group">
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <FiAward className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-text)] text-lg">{cert.title}</h4>
                    <p className="text-sm text-[var(--text-muted)] font-medium">{cert.issuer}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Issued {cert.date}</p>
                  </div>
                </div>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 text-gray-400 hover:text-indigo-500 transition-colors"
                >
                  <FiExternalLink className="w-5 h-5" />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
