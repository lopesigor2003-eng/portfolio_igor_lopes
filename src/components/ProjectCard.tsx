import React from 'react';
import { motion } from 'motion/react';
import { Eye, Image as ImageIcon } from 'lucide-react';
import { PortfolioItem, CategoryKey } from '../types';

interface ProjectCardProps {
  key?: any;
  project: PortfolioItem & { category: CategoryKey; shortDesc: string };
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  // Use the first image from project.images as the card thumbnail
  const thumbnail = project.images[0] || '';
  const totalArtes = project.images.length;

  // Pretty Brazilian portuguese labels for different categories
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'social':
        return 'Portfólio Social';
      case 'wordpress':
        return 'WordPress Web';
      case 'sports':
        return 'Flyers Esportivos';
      case 'editorial':
        return 'Projetos Editoriais';
      case 'military':
        return 'Gestão Militar';
      default:
        return 'Design Gráfico';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 shadow-xl shadow-black/30 group cursor-pointer"
    >
      {/* Background Graphic Asset */}
      {thumbnail ? (
        <div className="absolute inset-0 z-0">
          <img
            src={thumbnail}
            alt={`${project.name} preview`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Rich hybrid gradient overlays to ensure extreme text readability over any light/high-contrast artwork */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 z-10" />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#020617] to-slate-900 z-0">
          <ImageIcon className="h-8 w-8 text-slate-800" />
          <div className="absolute inset-0 bg-slate-950/80 z-10" />
        </div>
      )}

      {/* Interactive hover actions overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 select-none text-left">
        {/* Metric counts and categories */}
        <div className="flex justify-between items-center mb-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <span className="font-mono text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-black/80">
            {getCategoryLabel(project.category)}
          </span>
          {totalArtes > 0 && (
            <span className="font-mono text-[9px] text-white flex items-center space-x-1 py-1 px-2.5 rounded-full bg-slate-950/80 border border-white/10 shadow-lg backdrop-blur-md">
              <ImageIcon className="h-3 w-3 text-cyan-400" />
              <span>{totalArtes} {totalArtes === 1 ? 'Arte' : 'Artes'}</span>
            </span>
          )}
        </div>

        {/* Title & Short tagline */}
        <h3 className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {project.name}
        </h3>
        
        {/* Expandable description on hover */}
        <p className="font-sans text-xs text-slate-300 mt-1 lines-clamp-2 max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-350 ease-in-out font-light leading-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          {project.shortDesc || 'Clique para ver os trabalhos neste segmento.'}
        </p>

        {/* Floating "View button" design effect */}
        <div className="mt-4 flex items-center text-xs font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          <span>Ver projetos realizados</span>
          <Eye className="ml-1.5 h-3.5 w-3.5 text-cyan-400" />
        </div>
      </div>
    </motion.div>
  );
}
