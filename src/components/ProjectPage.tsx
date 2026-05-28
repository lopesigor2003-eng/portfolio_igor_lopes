import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Smartphone, Copy, Check, MessageSquare, ImageIcon, Sparkles, Send, Eye, Video, Plus, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioItem, CategoryKey } from '../types';

interface ProjectPageProps {
  project: PortfolioItem & { category: CategoryKey; shortDesc: string };
  onBack: () => void;
  phone: string;
}

const AUTHOR_BOOKS = [
  "https://i.postimg.cc/qM8ysVsb/unnamed.jpg",
  "https://i.postimg.cc/bv6QZxxJ/unnamed-(1).jpg",
  "https://i.postimg.cc/d0W8h223/unnamed-(2).jpg",
  "https://i.postimg.cc/9MryZDb1/unnamed-(3).jpg",
  "https://i.postimg.cc/mDJCwTp5/unnamed-(4).jpg",
  "https://i.postimg.cc/MHBR3ghp/unnamed-(5).jpg",
  "https://i.postimg.cc/05KpNJbv/unnamed-(6).jpg",
  "https://i.postimg.cc/02g7K2wM/unnamed-(7).jpg",
  "https://i.postimg.cc/15pwGhGK/unnamed-(8).jpg"
];

export default function ProjectPage({ project, onBack, phone }: ProjectPageProps) {
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoDesc, setNewVideoDesc] = useState('');
  const [showMediaForm, setShowMediaForm] = useState(false);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [manualCount, setManualCount] = useState(0);
  const [authorActiveIndex, setAuthorActiveIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Set the current photo index to 0 whenever project changes
  useEffect(() => {
    setImages(project.images || []);
    setVideos((project as any).videos || []);
    setActiveIndex(0);
    setActiveVideoIndex(0);
    setManualCount(0);
    setAuthorActiveIndex(0);
    setShowMediaForm(false);
    setZoomImage(null);
    // Scroll to top when loading a new project page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project]);

  // Safe clamped index to prevent rendering out-of-bounds array items during project transitions
  const safeActiveIndex = activeIndex < images.length ? activeIndex : 0;
  const currentImage = images[safeActiveIndex] || '';

  // Automatic slideshow rotation every 10 seconds (resets whenever length or manual interaction happens)
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length, manualCount]);

  const handleSelectImage = (idx: number) => {
    setActiveIndex(idx);
    setManualCount(prev => prev + 1);
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    setImages(prev => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle.trim() || !newVideoUrl.trim()) return;
    const newVid = {
      title: newVideoTitle.trim(),
      url: newVideoUrl.trim(),
      desc: newVideoDesc.trim() || 'vídeos produzidos durante o trabalho na comunicação social'
    };
    setVideos(prev => {
      const updated = [...prev, newVid];
      setActiveVideoIndex(updated.length - 1);
      return updated;
    });
    setNewVideoTitle('');
    setNewVideoUrl('');
    setNewVideoDesc('');
  };

  const copyLink = async () => {
    // Generate page URL with hash
    const slug = project.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    const fullUrl = `${window.location.origin}${window.location.pathname}#/projeto/${slug}`;
    
    let success = false;
    try {
      await navigator.clipboard.writeText(fullUrl);
      success = true;
    } catch (err) {
      // Fallback for iframes and unfocused documents
      try {
        const textArea = document.createElement("textarea");
        textArea.value = fullUrl;
        
        // Avoid styling and layout impacts
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      // Ultimate manual fallback if both fails
      try {
        window.prompt("Copie o link abaixo manualmente:", fullUrl);
      } catch (promptErr) {
        console.error('Manual prompt failed:', promptErr);
      }
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'social': return 'Social Media • Criação de Artes';
      case 'wordpress': return 'Webdesign & WordPress';
      case 'editorial': return 'Editoriais & Capas';
      case 'sports': return 'Flyers Esportivos';
      case 'military': return 'Experiência Militar';
      default: return 'Trabalho de Design';
    }
  };

  // Pre-fill WhatsApp message
  const preFilledMessage = encodeURIComponent(
    `Olá Igor! Vi seu site e fiquei muito interessado no projeto *${project.name}*. Gostaria de tirar algumas dúvidas e solicitar um orçamento personalizado para o meu negócio!`
  );
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${preFilledMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen bg-[#020617] text-slate-100 font-sans pb-24"
    >
      {/* Decorative ambient glowing grids */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* High-contrast Breadcrumbs / Top Navigation Strip */}
      <div className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center space-x-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-all duration-200"
          >
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 group-hover:text-cyan-400 group-hover:scale-105 transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="group-hover:translate-x-1 transition-transform">Voltar para o Portfólio</span>
          </button>

          <span className="hidden md:inline-flex items-center text-[10px] font-mono text-slate-500 tracking-wider uppercase">
            Página do Projeto • {project.name}
          </span>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all"
          >
            <Smartphone className="h-3.5 w-3.5 text-cyan-300" />
            <span>Entrar em Contato</span>
          </a>
        </div>
      </div>

      {/* Main Single Page Responsive Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column Left: High-resolution Aspect-Square Image Presentation & Selector */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visualizer Shell - strictly square and aligned */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl shadow-indigo-950/20">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={`${project.name} original high res`}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                  <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                  <span className="text-xs">Nenhum criativo cadastrado</span>
                </div>
              )}

              {/* Floating Counter info */}
              <div className="absolute bottom-4 left-4 z-20 flex space-x-2 select-none">
                <span className="text-[9px] uppercase font-mono font-bold tracking-widest px-3 py-1.5 bg-slate-950/90 border border-white/10 backdrop-blur rounded-full text-slate-300 shadow-md shadow-black/80">
                  Capa {safeActiveIndex + 1} de {images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation Rack */}
            {images.length > 1 && (
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4">
                <p className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 text-center sm:text-left">
                  Galeria de Trabalhos ({images.length} Peças) • Clique para Visualizar
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectImage(idx)}
                      className={`relative h-16 w-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-150 ${
                        safeActiveIndex === idx
                          ? 'border-cyan-400 scale-[1.05] bg-cyan-500/10 shadow-lg shadow-black/50'
                          : 'border-white/10 opacity-70 hover:opacity-100 hover:scale-[1.02]'
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumbnail"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Column Right: Portfolio Description & Interaction Panels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Project Header card */}
            <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold uppercase tracking-widest text-cyan-300 rounded-full mb-4">
                <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
                {getCategoryLabel(project.category)}
              </span>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none mb-3">
                {project.name}
              </h1>

              {project.shortDesc && (
                <p className="font-sans text-sm text-cyan-200/80 font-medium leading-relaxed italic border-l-2 border-cyan-400 pl-4 mt-2">
                  {project.shortDesc}
                </p>
              )}
            </div>

            {/* Detailed paragraphs information list */}
            {project.paragraphs && project.paragraphs.length > 0 && (
              <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl text-left">
                <h4 className="font-display font-bold text-base text-white tracking-tight flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 block animate-pulse" />
                  Concepção & Detalhes do Trabalho
                </h4>
                <div className="space-y-3">
                  {project.paragraphs.map((p, idx) => {
                    // Do not render standard shortDesc duplicates or contact info that normally starts or ends paragraphs
                    if (p === project.name || p === project.shortDesc || p.includes('Gestão de Redes') || p.includes('photoshopeditores@') || p.includes('55 55 99664')) {
                      return null;
                    }
                    
                    // Style bullet points elegantly if they describe a strategy list
                    const isBullet = p.startsWith('Planejei') || p.startsWith('Aumentei') || p.startsWith('Monitorei') || p.startsWith('Gerenciei') || p.startsWith('Atuei como');
                    return (
                      <p 
                        key={idx} 
                        className={`font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-light ${
                          isBullet ? 'pl-4 border-l border-indigo-500/30 text-slate-200' : ''
                        }`}
                      >
                        {p}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Premium CTA Panel to trigger conversion */}
            <div className="bg-gradient-to-r from-indigo-950/30 to-slate-950/30 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="text-center sm:text-left">
                <h4 className="font-display font-bold text-lg text-white">Precisa de algo semelhante?</h4>
                <p className="font-sans text-xs text-slate-400 font-light mt-1">
                  Atendimento personalizado, design voltado à conversão e entrega veloz. Fale comigo agora!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 font-sans font-bold text-xs hover:from-cyan-400 hover:to-indigo-400 hover:scale-[1.01] shadow-2xl shadow-indigo-500/10 transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                  <span>Chamar no WhatsApp</span>
                </a>

                <button
                  onClick={copyLink}
                  className="inline-flex items-center justify-center space-x-1.5 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white font-sans text-xs font-semibold transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-cyan-400" />
                      <span>Link Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Compartilhar</span>
                    </>
                  )}
                </button>
              </div>


            </div>

          </div>
        </div>

        {/* If category is editorial, add the second carousel for the books I did for authors */}
        {project.category === 'editorial' && (
          <div className="mt-16 pt-12 border-t border-white/10 space-y-8">
            <div className="text-center md:text-left space-y-1">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
                <span className="p-1 px-2.5 bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider text-cyan-300 rounded">Coleção Especial</span>
                Outros Livros de Autores que Fiz
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
                Portfólio de diagramação, capas personalizadas e design interno completo criados sob medida para autores de diversos gêneros.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-3xl p-6 sm:p-8">
              {/* Left visual mock showing the currently selected author book */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative group max-w-[280px] w-full aspect-[3/4] bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/85 flex items-center justify-center">
                  <img
                    src={AUTHOR_BOOKS[authorActiveIndex]}
                    alt={`Livro de Autor ${authorActiveIndex + 1}`}
                    className="w-full h-full object-contain p-2 hover:scale-[1.02] transition-transform duration-300"
                  />
                  
                  {/* Glowing book edges/corners indicators */}
                  <div className="absolute top-2 right-2 bg-slate-950/85 border border-white/15 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-slate-300 tracking-wider">
                    {authorActiveIndex + 1} / {AUTHOR_BOOKS.length}
                  </div>
                </div>
              </div>

              {/* Right panel showing thumbnails to click with navigation buttons */}
              <div className="md:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] font-bold text-indigo-400 uppercase tracking-widest block">Galeria Autoral</span>
                  <h4 className="font-display font-bold text-lg text-white">Selecione uma Capa para Ampliar</h4>
                  <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                    Clique sobre cada um dos volumes abaixo para visualizar o criativo central do volume ampliado à esquerda. Uma linha editorial que concilia harmoniosa diagramação aos apelos das prateleiras.
                  </p>
                </div>

                {/* Thumbnails list */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {AUTHOR_BOOKS.map((bookUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setAuthorActiveIndex(index)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${
                        authorActiveIndex === index
                          ? 'border-cyan-400 scale-[1.05] shadow-lg shadow-cyan-400/20 bg-cyan-400/5'
                          : 'border-white/10 opacity-75 hover:opacity-100 hover:scale-[1.02]'
                      }`}
                    >
                      <img
                        src={bookUrl}
                        alt={`capa thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5 font-mono text-[10px] text-slate-500">
                  <span>Diagramações Editoriais</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setAuthorActiveIndex(prev => (prev - 1 + AUTHOR_BOOKS.length) % AUTHOR_BOOKS.length)}
                      className="p-1 px-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-all"
                    >
                      Anterior
                    </button>
                    <button 
                      onClick={() => setAuthorActiveIndex(prev => (prev + 1) % AUTHOR_BOOKS.length)}
                      className="p-1 px-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-all"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If name is Comunicação Social, add the Before / After metrics section */}
        {project.name === 'Comunicação Social' && (
          <div className="mt-16 pt-12 border-t border-white/10 space-y-8">
            <div className="text-center md:text-left space-y-1">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
                <span className="p-1 px-2.5 bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold uppercase tracking-wider text-cyan-300 rounded">Métricas & Impacto</span>
                Evolução e Crescimento de Audiência
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
                Resultados obtidos com o planejamento estratégico e gerenciamento das redes sociais durante o trabalho na Comunicação Social.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Antes */}
              <div className="group bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-3xl p-5 space-y-4 hover:border-red-500/10 transition-all duration-300 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base text-slate-300">Antes</h4>
                  <span className="font-mono text-[10px] text-red-400 font-bold uppercase px-2.5 py-0.5 bg-red-500/10 rounded-full border border-red-500/20">
                    Início
                  </span>
                </div>
                <div 
                  onClick={() => setZoomImage("https://i.postimg.cc/KvyZC4VP/antes.jpg")}
                  className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/10 group-hover:border-white/20 transition-all shadow-xl cursor-zoom-in"
                >
                  <img
                    src="https://i.postimg.cc/KvyZC4VP/antes.jpg"
                    alt="Métricas antes do início do trabalho"
                    className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-slate-950/80 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 shadow-lg">
                      <Eye className="h-4 w-4 text-red-400" /> Ampliar
                    </span>
                  </div>
                </div>
                <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                  Status inicial dos canais de comunicação com menor frequência de publicações e engajamento inicial.
                </p>
              </div>

              {/* Depois */}
              <div className="group bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-3xl p-5 space-y-4 hover:border-cyan-500/20 transition-all duration-300 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base text-white">Depois (6 Meses)</h4>
                  <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase px-2.5 py-0.5 bg-cyan-500/10 rounded-full border border-cyan-500/20 shadow-[0_0_8px_rgba(34,211,238,0.2)] animate-pulse">
                    Resultado
                  </span>
                </div>
                <div 
                  onClick={() => setZoomImage("https://i.postimg.cc/5NMxDjG8/Whats-App-Image-2026-05-28-at-10-05-02.jpg")}
                  className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-all shadow-xl shadow-cyan-950/20 cursor-zoom-in"
                >
                  <img
                    src="https://i.postimg.cc/5NMxDjG8/Whats-App-Image-2026-05-28-at-10-05-02.jpg"
                    alt="Métricas após 6 meses de trabalho"
                    className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-slate-950/80 text-white text-xs font-semibold flex items-center gap-1.5 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
                      <Eye className="h-4 w-4 text-cyan-400" /> Ampliar
                    </span>
                  </div>
                </div>
                <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                  Resultados consolidados apresentando crescimento expressivo de visitas, impressões, alcance e novo posicionamento digital.
                </p>
              </div>
            </div>

            {/* Outdoor Section */}
            <div className="mt-12 pt-8 border-t border-white/5 space-y-8">
              <div className="text-center md:text-left space-y-1">
                <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
                  <span className="p-1 px-2.5 bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider text-purple-350 rounded">Mídia Offline</span>
                  Campanha Oficial de Outdoor
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
                  Criação de identidade visual e diagramação para outdoor veiculado nas ruas, unindo design digital e impacto urbano.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Design do Outdoor */}
                <div className="group bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-3xl p-5 space-y-4 hover:border-purple-500/20 transition-all duration-300 text-left">
                  <div className="flex items-center justify-between">
                    <h5 className="font-display font-bold text-sm text-slate-350">Arte Final (Design Digital)</h5>
                    <span className="font-mono text-[10px] text-purple-300 font-bold uppercase px-2.5 py-0.5 bg-purple-500/10 rounded-full border border-purple-500/20">
                      Vetor / Layout
                    </span>
                  </div>
                  <div 
                    onClick={() => setZoomImage("https://i.postimg.cc/j2MZ6DJs/paroquia(definitivo).png")}
                    className="relative aspect-[3/1] md:aspect-[3/1] rounded-xl overflow-hidden bg-slate-950 border border-white/10 group-hover:border-purple-500/30 transition-all shadow-xl cursor-zoom-in flex items-center justify-center"
                  >
                    <img
                      src="https://i.postimg.cc/j2MZ6DJs/paroquia(definitivo).png"
                      alt="Design do Outdoor Definitivo"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-slate-950/80 text-white text-xs font-semibold flex items-center gap-1.5 border border-purple-500/20 shadow-lg">
                        <Eye className="h-4 w-4 text-purple-400" /> Ampliar Arte
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                    Layout publicitário desenvolvido para divulgação da Paróquia com tipografia expressiva e alta legibilidade para leitura rápida.
                  </p>
                </div>

                {/* Foto no Outdoor nas Ruas */}
                <div className="group bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-3xl p-5 space-y-4 hover:border-purple-500/20 transition-all duration-300 text-left">
                  <div className="flex items-center justify-between">
                    <h5 className="font-display font-bold text-sm text-white">Outdoor Instalado nas Ruas</h5>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase px-2.5 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.1)] animate-pulse">
                      Exibição Real
                    </span>
                  </div>
                  <div 
                    onClick={() => setZoomImage("https://i.postimg.cc/c4dpQ32R/Whats-App-Image-2026-05-28-at-10-05-52.jpg")}
                    className="relative aspect-[3/2] md:aspect-[3/1] rounded-xl overflow-hidden bg-slate-950 border border-white/10 group-hover:border-purple-500/30 transition-all shadow-xl cursor-zoom-in flex items-center justify-center"
                  >
                    <img
                      src="https://i.postimg.cc/c4dpQ32R/Whats-App-Image-2026-05-28-at-10-05-52.jpg"
                      alt="Outdoor veiculado de fato nas ruas"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-slate-950/80 text-white text-xs font-semibold flex items-center gap-1.5 border border-purple-500/20 shadow-lg">
                        <Eye className="h-4 w-4 text-emerald-400" /> Ver Foto Reais
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                    Registro fotográfico do painel físico de outdoor instalado e visível para motoristas e pedestres locais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If name is Desenvolvimento WordPress, add the beautiful custom WordPress health/psychology sites stack */}
        {project.name === 'Desenvolvimento WordPress' && (
          <div className="mt-16 pt-12 border-t border-white/10 space-y-12">
            <div className="text-center md:text-left space-y-2">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
                <span className="p-1 px-2.5 bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider text-indigo-300 rounded">Portfólio WordPress</span>
                Plataformas Desenvolvidas para Profissionais da Saúde
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
                Apresentação detalhada com gravação de navegação de cada site criado, demonstrando a estrutura de agendamento online, usabilidade e identidade visual desenvolvidas para psicólogos e clínicas médicas.
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  id: "wp-vid-1",
                  title: "Dra. Camila Kurtz — Emagrecimento & Performance",
                  badge: "Nutrição & Performance",
                  desc: "Especialista em emagrecimento, hipertrofia e reeducação alimentar em Timbó. Planos personalizados com base científica para resultados sustentáveis.",
                  url: "https://drive.google.com/file/d/1bBTvWQKKMSSOfpK00dsY0JhZX6BRaNuS/preview",
                  features: ["Emagrecimento", "Hipertrofia", "Base Científica", "Resultados Sustentáveis"]
                },
                {
                  id: "wp-vid-2",
                  title: "Clínica VittaPro — Referência em Saúde",
                  badge: "Clínica Multidisciplinar",
                  desc: "A Clínica VittaPro é uma referência em Timbó/SC, unindo tecnologia de ponta e uma equipe multidisciplinar dedicada à sua saúde. Nossa missão é oferecer um novo padrão de cuidado em um ambiente técnico e humanizado.",
                  url: "https://drive.google.com/file/d/1dvGfV4ob6FrbTfq2FO_uUS2A0bdLCuHX/preview",
                  features: ["Multidisciplinar", "Alta Tecnologia", "Cuidado Humanizado", "Agendamento Prático"]
                },
                {
                  id: "wp-vid-3",
                  title: "Camila Krause Righi — Psicologia Clínica",
                  badge: "Psicoterapia Psicodinâmica",
                  desc: "Dedicada ao atendimento de adolescentes e adultos. Minha prática é fundamentada na abordagem psicodinâmica, que busca compreender os processos inconscientes que influenciam nossos comportamentos e emoções.",
                  url: "https://drive.google.com/file/d/1qA6CPnNW1rIb3Z_I8hlQJ-xnwvSvTqKW/preview",
                  features: ["Adolescentes & Adultos", "Abordagem Psicodinâmica", "Processos Inconscientes", "Acolhimento Clínico"]
                },
                {
                  id: "wp-vid-4",
                  title: "Danuza Rodrigues — Psicanálise",
                  badge: "Psicanálise Singular",
                  desc: "Psicanálise, uma abordagem que não parte de diagnósticos nem de soluções prontas, mas da escuta do que cada sujeito traz de singular.",
                  url: "https://drive.google.com/file/d/1zbU8zHAWRCgUxtls8u8fJjE-QANiJqQM/preview",
                  features: ["Escuta Singular", "Foco no Sujeito", "Sem Rótulos Prontos", "Sessões Online"]
                },
                {
                  id: "wp-vid-5",
                  title: "Anne Elise — Terapia Bioquântica",
                  badge: "Equilíbrio & Conexão",
                  desc: "Terapeuta Bioquântica especializada em autoconhecimento e equilíbrio emocional. Com uma abordagem humanizada, dedico minha carreira a ajudar pessoas a encontrarem harmonia em suas vidas.",
                  url: "https://drive.google.com/file/d/1BjJNm-BoSklWIAI8YMaHHG3Uvf1ekfuq/preview",
                  features: ["Autoconhecimento", "Equilíbrio Emocional", "Abordagem Humanizada", "Harmonia de Vida"]
                }
              ].map((site, index) => (
                <div key={site.id} className="group bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-3xl p-6 hover:border-indigo-500/20 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left side: Interactive Video player */}
                    <div className="lg:col-span-7 space-y-2">
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 group-hover:border-indigo-500/30 transition-all shadow-2xl">
                        <iframe
                          src={site.url}
                          className="absolute inset-0 w-full h-full border-0"
                          allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          allowFullScreen
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Right side: Information of the project */}
                    <div className="lg:col-span-5 space-y-4 text-left">
                      <div className="space-y-1">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="font-mono text-[9px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                            Projeto {index + 1}
                          </span>
                          <span className="font-mono text-[9px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                            {site.badge}
                          </span>
                        </div>
                        <h4 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight leading-snug">
                          {site.title}
                        </h4>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {site.desc}
                      </p>

                      <div className="pt-2">
                        <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">Características Principais:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {site.features.map(f => (
                            <span key={f} className="font-sans text-[10px] text-slate-300 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Video Section if project has videos */}
        {videos && videos.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/10 space-y-8 text-left">
            <div className="text-center md:text-left space-y-1">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
                <span className="p-1 px-2.5 bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold uppercase tracking-wider text-cyan-300 rounded">Produção Audiovisual</span>
                Vídeos e Campanhas de Comunicação
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
                Cobertura de eventos, chamadas institucionais e pílulas de engajamento através do carrossel interativo abaixo.
              </p>
            </div>

            {/* Video Carousel Container */}
            <div className="relative max-w-[340px] mx-auto space-y-6">
              {/* Outer border/glow container */}
              <div className="group relative bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/10 rounded-3xl p-3 transition-all duration-300 hover:border-cyan-500/20">
                
                {/* Embedded Video Area */}
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/10 group-hover:border-white/20 transition-all shadow-2xl">
                  {(() => {
                    const activeVid = videos[activeVideoIndex] || videos[0];
                    if (!activeVid) return null;
                    const isDrive = activeVid.url && activeVid.url.includes('drive.google.com');
                    let embedUrl = activeVid.url;
                    if (isDrive) {
                      const match = activeVid.url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                      if (match && match[1]) {
                        embedUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
                      }
                    }

                    return isDrive ? (
                      <iframe
                        src={embedUrl}
                        className="absolute inset-0 w-full h-full border-0 rounded-2xl"
                        allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        referrerPolicy="no-referrer"
                        key={`${activeVideoIndex}-${activeVid.url}`}
                      />
                    ) : (
                      <video
                        src={activeVid.url}
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                        controls
                        playsInline
                        preload="metadata"
                        key={`${activeVideoIndex}-${activeVid.url}`}
                      />
                    );
                  })()}
                </div>

                {/* Left/Right controls inside card */}
                {videos.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveVideoIndex(prev => (prev - 1 + videos.length) % videos.length)}
                      aria-label="Vídeo anterior"
                      className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-slate-950/95 hover:bg-cyan-500 text-white hover:text-slate-950 border border-white/10 shadow-lg hover:shadow-cyan-500/10 cursor-pointer transition-all active:scale-95"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setActiveVideoIndex(prev => (prev + 1) % videos.length)}
                      aria-label="Próximo vídeo"
                      className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-slate-950/95 hover:bg-cyan-500 text-white hover:text-slate-950 border border-white/10 shadow-lg hover:shadow-cyan-500/10 cursor-pointer transition-all active:scale-95"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Active Video Info Card */}
              {videos[activeVideoIndex] && (
                <div className="px-2 text-center transition-all duration-300">
                  <span className="inline-block font-mono text-[10px] text-cyan-400 font-semibold tracking-wider uppercase px-2.5 py-0.5 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                    Vídeo {activeVideoIndex + 1} de {videos.length}
                  </span>
                </div>
              )}

              {/* Carousel Indicator Dots */}
              {videos.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {videos.map((vid, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveVideoIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === activeVideoIndex 
                          ? 'w-8 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]' 
                          : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                      }`}
                      title={vid.title}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}



        {/* Zoom Modal Lightbox */}
        {zoomImage && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md cursor-zoom-out transition-all duration-300 animate-fade-in"
            onClick={() => setZoomImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <button 
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all text-xs font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                onClick={() => setZoomImage(null)}
              >
                <span>Fechar</span> ✕
              </button>
              <img 
                src={zoomImage} 
                alt="Métricas Ampliadas" 
                className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <p className="mt-4 font-sans text-xs text-slate-400 font-light text-center">
                Toque ou clique em qualquer lugar fora da imagem para fechar
              </p>
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
}
