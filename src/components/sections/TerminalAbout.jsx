import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export const TerminalAbout = () => {
  return (
    <section id="about" className="space-y-8 scroll-mt-24 max-w-4xl mx-auto">
      <FadeIn>
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)]">
            Terminal <span className="text-gradient">About Me</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            A developer's way of introducing themselves.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0F111A] font-mono text-sm sm:text-base">
          {/* Terminal Header */}
          <div className="bg-[#1E2132] px-4 py-3 flex items-center gap-2 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="mx-auto text-gray-400 text-xs font-semibold select-none">guest@sajith-portfolio:~</div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 space-y-4 text-gray-300 h-[300px] overflow-y-auto">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">whoami</span>
              </div>
              <div className="pl-4 text-gray-400">Sajith R</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">education</span>
              </div>
              <div className="pl-4 text-gray-400">B.E @ Kongu Engineering College</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">interests</span>
              </div>
              <div className="pl-4 text-gray-400">
                ["Web Development", "Chrome Extensions", "Full Stack Development", "AI Integrations"]
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">currently_building</span>
              </div>
              <div className="pl-4 text-gray-400">QuickSlots Extension & Portfolio v2</div>
            </div>

            <div className="flex items-center gap-2 text-emerald-400 animate-pulse">
              <span>➜</span>
              <span className="text-blue-400">~</span>
              <span className="w-2 h-5 bg-gray-400 inline-block" />
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};
