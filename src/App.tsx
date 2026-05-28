import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import MilitaryShowcase from './components/MilitaryShowcase';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage';

import { getCleanedProjects, getBiographyData } from './portfolio_utils';
import { PortfolioItem, CategoryKey } from './types';

const PROJECTS_DATA = getCleanedProjects() as (PortfolioItem & { category: CategoryKey; shortDesc: string })[];
const BIO_DATA = getBiographyData();

export default function App() {
  // Selected project state for the full-screen dynamic project page
  const [activeProject, setActiveProject] = useState<(PortfolioItem & { category: CategoryKey; shortDesc: string }) | null>(null);

  // Helper to generate normalized URL slugs from project names
  const getSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Sync state with URL Hash changes (supports back/forward buttons, direct access links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/projeto/')) {
        const slug = hash.replace('#/projeto/', '');
        const found = PROJECTS_DATA.find(p => getSlug(p.name) === slug);
        if (found) {
          setActiveProject(found);
          return;
        }
      }
      setActiveProject(null);
    };

    // Initial load sync
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []); // Run code exactly once on mount to establish hash listeners securely

  // Unlock scrolling immediately on mount and ensure no leftovers
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }, []);

  // Handle scroll position memory and clean locks on page transitions
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    if (!activeProject) {
      // If we went back to home, restore the exact scroll position so they don't have to scroll down again
      if (scrollPosition > 0) {
        const t = setTimeout(() => {
          window.scrollTo({ top: scrollPosition, behavior: 'instant' });
        }, 30);
        return () => clearTimeout(t);
      }
    } else {
      // Scroll to top of project page immediately
      window.scrollTo(0, 0);
    }
  }, [activeProject, scrollPosition]);

  const handleProjectSelect = (project: (PortfolioItem & { category: CategoryKey; shortDesc: string }) | null) => {
    if (project) {
      // Remember exactly where they were scrolling
      setScrollPosition(window.scrollY);
      const slug = getSlug(project.name);
      window.location.hash = `#/projeto/${slug}`;
    } else {
      window.location.hash = '';
    }
  };

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  // Filter out military item from list if we render it in dedicated section
  const militaryProject = PROJECTS_DATA.find(p => p.category === 'military');

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 font-sans selection:bg-indigo-500/20 selection:text-indigo-400 overflow-x-hidden antialiased">
      {/* Dynamic Navigation Header */}
      <Header
        email={BIO_DATA.email}
        phone={BIO_DATA.phone}
      />

      {activeProject ? (
        /* Dynamic Full-Screen Subpage View with high resolution square artwork presentation */
        <div className="pt-24 min-h-[calc(100vh-200px)]">
          <ProjectPage
            project={activeProject}
            onBack={handleBackToHome}
            phone={BIO_DATA.phone}
          />
        </div>
      ) : (
        /* Main Landing Page Flow */
        <>
          {/* Hero Entrance Portal */}
          <Hero
            tagline={BIO_DATA.tagline}
            subtagline={BIO_DATA.subtagline}
            avatar={BIO_DATA.avatar}
            phone={BIO_DATA.phone}
          />

          {/* Main Filter Portfolio Card Grid */}
          <PortfolioGrid
            projects={PROJECTS_DATA}
            onProjectSelect={handleProjectSelect}
          />

          {/* Military Leadership Showcase */}
          <MilitaryShowcase
            militaryData={militaryProject}
          />

          {/* Interactive Contact & WhatsApp Composer Form */}
          <ContactSection
            email={BIO_DATA.email}
            phone={BIO_DATA.phone}
          />
        </>
      )}

      {/* Copyright footer */}
      <Footer
        name={BIO_DATA.name}
      />

      {/* Universal WhatsApp Floating Action Button */}
      <a
        href={`https://wa.me/${BIO_DATA.phone.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-2xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
        title="Fale conosco no WhatsApp"
      >
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-white/10 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl">
          Falar com Igor
        </span>
        <svg className="h-6 w-6 text-white shrink-0 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.428 1.975 13.96 1.95 11.48 1.95c-5.442 0-9.866 4.372-9.87 9.802 0 1.737.463 3.435 1.34 4.947l-.997 3.64 3.735-.979a9.782 9.782 0 0 0 4.359 1.035zm11.144-7.534c-.312-.156-1.85-.912-2.138-1.016-.288-.103-.497-.156-.705.156-.208.312-.806 1.016-.988 1.223-.182.208-.364.234-.676.078-1.03-.519-1.748-.966-2.441-2.152-.178-.314.178-.291.51-.956.11-.223.056-.417-.028-.574-.084-.156-.705-1.7-.965-2.327-.254-.614-.51-.53-.705-.54-.182-.01-.39-.012-.598-.012s-.546.078-.832.39c-.286.313-1.093 1.069-1.093 2.607 0 1.538 1.118 3.023 1.274 3.23.156.208 2.19 3.34 5.306 4.69.742.32 1.32.51 1.77.653.746.237 1.425.203 1.962.124.598-.088 1.85-.756 2.11-1.449.26-.693.26-1.288.182-1.41-.078-.122-.288-.195-.6-.352z"/>
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
        </span>
      </a>
    </div>
  );
}
