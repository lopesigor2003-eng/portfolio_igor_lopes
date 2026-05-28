import { motion } from 'motion/react';
import { Target, TrendingUp, UserCheck, AlertOctagon, BookOpen, PenTool, Award, GraduationCap, Calendar, FileText, Globe } from 'lucide-react';
import { PortfolioItem } from '../types';

interface MilitaryShowcaseProps {
  militaryData: (PortfolioItem & { category: string; shortDesc: string }) | undefined;
}

export default function MilitaryShowcase({ militaryData }: MilitaryShowcaseProps) {
  const armyContributions = [
    {
      title: 'Crescimento Orgânico',
      desc: 'Mais de 1.500 novos seguidores engajados no Instagram oficial da Cia.',
      icon: TrendingUp,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    {
      title: 'Comunicação Estratégica',
      desc: 'Formulação de campanhas institucionais alinhadas à imagem oficial do Exército Brasileiro.',
      icon: Target,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    {
      title: 'Gestão de Crises',
      desc: 'Intervenção e mediação de crises nas mídias sociais, assegurando clareza e fidelidade às diretrizes.',
      icon: AlertOctagon,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    {
      title: 'Trabalho em Equipe e Disciplina',
      desc: 'Atuação coordenada com a Seção de Comunicação Social para cobertura fotográfica e redação de notícias.',
      icon: UserCheck,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    }
  ];

  return (
    <section id="trajetoria" className="py-24 bg-[#020617] border-t border-white/10 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-400 tracking-wide uppercase">
            Jornada Profissional
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Minha Trajetória
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            Uma visão cronológica e detalhada das experiências que moldaram minhas habilidades de liderança, comunicação estratégica e excelência em design.
          </p>
        </div>

        {/* Timeline Line & Milestones Container */}
        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-16">
          
          {/* MILESTONE 1: EXÉRCITO BRASILEIRO */}
          <div className="relative pl-8 md:pl-12 group">
            {/* Dot marker */}
            <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-amber-500 border-4 border-slate-950 group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-amber-500/50" />
            
            <div className="space-y-6">
              {/* Header metadata */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider bg-amber-500/10 border border-amber-500/25 text-amber-400">
                  Defesa & Liderança
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono font-medium text-slate-400">
                  <Calendar className="h-3 w-3" />
                  3 Anos de Serviço Ativo
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-2xl text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  Exército Brasileiro — Seção de Comunicação Social
                </h3>
                <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-3xl">
                  Minha atuação estendeu-se além das responsabilidades cotidianas: planejei e liderei a seção de comunicação e produção de mídias para a <span className="text-white font-medium">13ª Cia DAM</span>. 
                  Apliquei os maiores padrões de integridade, hierarquia sutil e resiliência estratégica no ambiente oficial.
                </p>
                <p className="font-sans text-sm text-slate-400 leading-relaxed font-light max-w-3xl">
                  Essa experiência rigorosa consolidou minha maturidade profissional, foco inflexível em prazos e capacidade de manter a performance criativa sob altos níveis de exigência e confidencialidade.
                </p>
              </div>

              {/* Sub-grid of key achievements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl pt-2">
                {armyContributions.map((contr, idx) => {
                  const Icon = contr.icon;
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all duration-300 flex gap-4 text-left">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center animate-pulse">
                        <Icon className="h-5 w-5 text-amber-400" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-semibold text-white text-sm">
                          {contr.title}
                        </h4>
                        <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                          {contr.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MILESTONE 2: PROJETOS EDITORIAIS */}
          <div className="relative pl-8 md:pl-12 group">
            {/* Dot marker */}
            <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-purple-500 border-4 border-slate-950 group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-purple-500/50" />
            
            <div className="space-y-6">
              {/* Header metadata */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider bg-purple-500/10 border border-purple-500/25 text-purple-400">
                  Design & Diagramação
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono font-medium text-slate-400">
                  <Calendar className="h-3 w-3" />
                  9 Meses de Atuação
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-2xl text-white tracking-tight group-hover:text-purple-300 transition-colors">
                  Projetos Editoriais — Editora e Produtora HL
                </h3>
                <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-3xl">
                  Desenvolvimento de publicações completas de alta qualidade estética e técnica, garantindo a perfeita harmonia entre texto, ilustração e layout comercial.
                </p>
              </div>

              {/* Grid of details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                
                {/* Services Card */}
                <div className="p-5 rounded-2xl bg-[#090e24]/40 border border-white/5 hover:border-purple-500/20 transition-all duration-300 space-y-3 text-left">
                  <div className="h-9 w-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <PenTool className="h-4 w-4 text-purple-400" />
                  </div>
                  <h4 className="font-display font-bold text-white text-sm">Serviços Realizados</h4>
                  <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                    Diagramação completa, criação de capa e contra capa, ilustração interna, design gráfico e preparação para impressão/digital.
                  </p>
                </div>

                {/* Tools Card */}
                <div className="p-5 rounded-2xl bg-[#090e24]/40 border border-white/5 hover:border-purple-500/20 transition-all duration-300 space-y-3 text-left">
                  <div className="h-9 w-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-pink-400" />
                  </div>
                  <h4 className="font-display font-bold text-white text-sm">Ferramentas Utilizadas</h4>
                  <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                    Word, InDesign, Photoshop e Canva para finalizações digitais e editoriais.
                  </p>
                </div>

                {/* Final format Card */}
                <div className="p-5 rounded-2xl bg-[#090e24]/40 border border-white/5 hover:border-purple-500/20 transition-all duration-300 space-y-3 text-left">
                  <div className="h-9 w-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Award className="h-4 w-4 text-indigo-400" />
                  </div>
                  <h4 className="font-display font-bold text-white text-sm">Formato Final</h4>
                  <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                    Configuração milimétrica de materiais híbridos para entrega em versão impressa + e-book.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* MILESTONE 3: COMUNICAÇÃO SOCIAL DE UMA FACULDADE */}
          <div className="relative pl-8 md:pl-12 group">
            {/* Dot marker */}
            <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-cyan-500 border-4 border-slate-950 group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-cyan-500/50" />
            
            <div className="space-y-6">
              {/* Header metadata */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
                  Assessoria & Estratégia de Mídia
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono font-medium text-slate-400 animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  Faculdade (Atualmente)
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-2xl text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  Comunicação Social — Faculdade de Direito
                </h3>
                <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-3xl">
                  Atuação estratégica no planejamento e desenvolvimento de posicionamento institucional para ambiente acadêmico altamente competitivo.
                </p>
              </div>

              {/* Dynamic highlights for college role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                
                {/* Highlight 1 */}
                <div className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-cyan-500/25 transition-all flex items-start gap-4 text-left">
                  <div className="h-10 w-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <GraduationCap className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-white text-sm">Produção de Conteúdo</h5>
                    <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                      Atuei no planejamento estratégico de mídias, assessoria de imprensa e produção de conteúdos visuais e audiovisuais para a Faculdade de Direito.
                    </p>
                  </div>
                </div>

                {/* Highlight 2 */}
                <div className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-cyan-500/25 transition-all flex items-start gap-4 text-left">
                  <div className="h-10 w-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-white text-sm">Campanhas & Coberturas</h5>
                    <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                      Desenvolvimento de campanhas de captação de alunos, cobertura de eventos acadêmicos, gravação de júris simulados e palestras institucionais.
                    </p>
                  </div>
                </div>

                {/* Highlight 3 */}
                <div className="p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-cyan-500/25 transition-all flex items-start gap-4 text-left md:col-span-2">
                  <div className="h-10 w-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Globe className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-white text-sm">Identidade & Redes Sociais</h5>
                    <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                      Criação de identidade visual, gerenciamento de marca e gestão de canais sociais com foco em posicionamento e autoridade no segmento educacional jurídico.
                    </p>
                  </div>
                </div>

                {/* Metric Stats Cards */}
                <div className="grid grid-cols-2 gap-4 md:col-span-2">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-[#090e24]/40 border border-cyan-500/20 text-left hover:border-cyan-500/30 transition-all">
                    <span className="font-mono text-xl sm:text-3xl font-extrabold text-cyan-300 tracking-tight">192.000+</span>
                    <p className="font-sans text-xs text-slate-300 font-medium mt-1">Visualizações no Perfil</p>
                    <p className="font-sans text-[11px] text-slate-400 font-light mt-0.5">Alcançadas de forma orgânica diretamente no perfil do Instagram.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-[#090e24]/40 border border-emerald-500/20 text-left hover:border-emerald-500/30 transition-all">
                    <span className="font-mono text-xl sm:text-3xl font-extrabold text-emerald-300 tracking-tight">889.000+</span>
                    <p className="font-sans text-xs text-slate-300 font-medium mt-1">Pessoas Alcançadas</p>
                    <p className="font-sans text-[11px] text-slate-400 font-light mt-0.5">Maximizando a relevância, engajamento e a autoridade da marca.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
