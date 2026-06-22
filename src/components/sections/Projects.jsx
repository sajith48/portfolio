import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink, FiChevronRight, FiCheckCircle, FiX, FiSearch } from 'react-icons/fi';
import { FadeIn } from '../ui/FadeIn';
import { projectsData } from '../../data/projects';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Chrome Extensions', 'Full Stack', 'Web Apps'];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="space-y-12 scroll-mt-24">
      <FadeIn>
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)]">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Discover my recent work. Click details to see feature deep dives.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-indigo-500 text-white shadow-md' 
                    : 'bg-[var(--color-text)]/5 text-[var(--text-muted)] hover:bg-[var(--color-text)]/10 hover:text-[var(--color-text)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[var(--color-text)]/5 border border-[var(--card-border)] text-[var(--color-text)] focus:outline-none focus:border-indigo-500 transition-colors placeholder-[var(--text-muted)]"
            />
          </div>
        </div>
      </FadeIn>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="glass-panel rounded-3xl overflow-hidden group flex flex-col justify-between hover:border-[var(--card-hover-border)] transition-all duration-300 h-full"
            >
              
              {/* Screenshot area */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900 border-b border-[var(--card-border)]">
                <img 
                  src={project.img} 
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Project+Image'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F111E] to-transparent opacity-60" />
              </div>
              
              <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[var(--color-text)] group-hover:text-indigo-500 transition-colors">{project.title}</h3>
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-500 transition-colors">
                      <FaGithub className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {/* Stack badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 text-xs text-indigo-500 font-medium">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2.5 py-1 rounded bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 text-xs text-[var(--text-muted)] font-medium">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      Read Details <FiChevronRight className="w-4 h-4" />
                    </button>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--color-text)] font-medium"
                    >
                      Live Demo <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="glass-panel rounded-3xl w-full max-w-3xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/30 border border-white/10 text-white hover:bg-black/50 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>
              
              <div className="p-6 md:p-8 space-y-6">
                <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl bg-slate-900 border border-[var(--card-border)]">
                  <img 
                    src={selectedProject.img} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Project+Image'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  <h3 className="absolute bottom-4 left-6 text-2xl md:text-3xl font-extrabold text-white">{selectedProject.title}</h3>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-500">Project Overview</div>
                  <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {selectedProject.longDesc}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-purple-500">Key Features</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--color-text)]">
                        <FiCheckCircle className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-[var(--card-border)]">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 text-xs text-indigo-500 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <a 
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 bg-[var(--color-text)]/10 hover:bg-[var(--color-text)]/15 text-[var(--color-text)] rounded-full text-sm font-bold flex items-center gap-2 transition-all"
                    >
                      <FaGithub className="w-4 h-4" /> GitHub
                    </a>
                    <a 
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-md"
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
    </section>
  );
};
