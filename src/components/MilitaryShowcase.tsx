import { motion } from 'motion/react';
import { Target, TrendingUp, UserCheck, HeartHandshake, ShieldCheck, AlertOctagon } from 'lucide-react';
import { PortfolioItem } from '../types';

interface MilitaryShowcaseProps {
  militaryData: (PortfolioItem & { category: string; shortDesc: string }) | undefined;
}

export default function MilitaryShowcase({ militaryData }: MilitaryShowcaseProps) {
  if (!militaryData) return null;

  const contributions = [
    {
      title: 'Crescimento Orgânico',
      desc: 'Mais de 1.500 novos seguidores engajados no Instagram oficial da Cia.',
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Comunicação Estratégica',
      desc: 'Formulação de campanhas institucionais alinhadas à imagem oficial do Exército Brasileiro.',
      icon: Target,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    },
    {
      title: 'Gestão de Crises',
      desc: 'Intervenção e mediação de crises nas mídias sociais, assegurando clareza e fidelidade às diretrizes.',
      icon: AlertOctagon,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10'
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
    <section id="militar" className="py-24 bg-[#020617] border-t border-white/10 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layout Grid columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-400 tracking-wide uppercase">
              Trajetória de Liderança
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              3 Anos de Serviço no Exército Brasileiro
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed font-light">
              Minha atuação estendeu-se além das responsabilidades cotidianas: planejei e liderei a seção de comunicação e produção de mídias para a <span className="text-white font-medium">13ª Cia DAM</span>. 
              Apliquei os maiores padrões de integridade, hierarquia sutil e resiliência estratégica no ambiente oficial.
            </p>
            <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed font-light">
              Essa experiência rigorosa consolidou minha maturidade profissional, foco inflexível em prazos e capacidade de manter a performance criativa sob altos níveis de exigência e confidencialidade.
            </p>

            {/* Badge Indicator row */}
            <div className="pt-4 flex items-center space-x-3 text-slate-500">
              <ShieldCheck className="h-5 w-5 text-indigo-400" />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">Foco em Disciplina • Liderança • Trabalho em Equipe</span>
            </div>
          </div>

          {/* Right graphics dashboard column */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contributions.map((contr, idx) => {
                const Icon = contr.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex flex-col justify-between text-left hover:border-cyan-500/20 transition-all duration-300 shadow-md shadow-black/10 group"
                  >
                    <div className="mb-4">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                        <Icon className={`h-5 w-5 ${contr.color}`} />
                      </div>
                      <h4 className="font-display font-semibold text-white text-base tracking-tight mb-2">
                        {contr.title}
                      </h4>
                      <p className="font-sans text-xs text-slate-450 leading-relaxed font-light">
                        {contr.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
