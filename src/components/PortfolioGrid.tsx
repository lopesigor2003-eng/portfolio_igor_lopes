import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Smartphone, Code, BookOpen, Trophy } from 'lucide-react';
import { PortfolioItem, CategoryKey } from '../types';
import ProjectCard from './ProjectCard';

interface PortfolioGridProps {
  projects: (PortfolioItem & { category: CategoryKey; shortDesc: string })[];
  onProjectSelect: (project: PortfolioItem & { category: CategoryKey; shortDesc: string }) => void;
}

export default function PortfolioGrid({ projects, onProjectSelect }: PortfolioGridProps) {
  const [activeTab, setActiveTab] = useState<CategoryKey>('all');

  const categories = [
    { key: 'all', label: 'Todos os Projetos', icon: LayoutGrid },
    { key: 'social', label: 'Portfólio Social', icon: Smartphone },
    { key: 'wordpress', label: 'WordPress Web', icon: Code },
    { key: 'editorial', label: 'Projetos Editoriais', icon: BookOpen },
    { key: 'sports', label: 'Flyers Esportivos', icon: Trophy },
  ] as const;

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="py-24 bg-[#020617] relative border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Title Heading */}
        <div className="max-w-3xl mx-auto mb-16 select-none">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-400 tracking-wide uppercase mb-3 text-center">
            Mostruário Completo
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Meus Trabalhos Realizados
          </h2>
          <p className="font-sans text-base text-slate-400">
            Explore projetos reais desenvolvidos ao longo da minha trajetória para empresas, profissionais autônomos e instituições de destaque.
          </p>
        </div>

        {/* Tab Controls Navigation bar with Framer Motion LayoutId */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full overflow-x-auto max-w-full scrollbar-none shadow-inner shadow-black/40">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`relative flex items-center space-x-2 px-5 py-2.5 rounded-full font-sans text-xs font-bold whitespace-nowrap transition-colors duration-150 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <Icon className="h-3.5 w-3.5 relative z-10" />
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Staggered Portfolio Card Grid Container */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl text-center">
            <p className="font-sans text-sm text-slate-450">Nenhum projeto encontrado nesta categoria.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  onClick={() => onProjectSelect(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
