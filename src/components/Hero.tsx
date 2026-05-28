import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Instagram, MessageSquare, Shield, Code } from 'lucide-react';

interface HeroProps {
  tagline: string;
  subtagline: string;
  avatar: string;
  phone: string;
}

export default function Hero({ tagline, subtagline, avatar, phone }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const stats = [
    { value: '8+ Anos', label: 'Projetos Freelance', icon: Sparkles, color: 'text-emerald-400' },
    { value: '17+ Nichos', label: 'Segmentos de Clientes', icon: Code, color: 'text-indigo-400' },
    { value: '+1.5k Seg.', label: 'Crescimento de Mídia', icon: Instagram, color: 'text-pink-400' },
    { value: '3 Anos', label: 'Exército (Social Media)', icon: Shield, color: 'text-amber-400' },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-[#020617]">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[15%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 select-none text-left"
          >
            {/* Greeting Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-400 tracking-wide uppercase mb-6"
            >
              <span className="w-2 h-2 bg-indigo-450 rounded-full animate-pulse" />
              <span>Disponível para novos projetos freelancers</span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6"
            >
              Criando {' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-400">
                Experiências
              </span>{' '}
              <br />visuais de alto impacto.
            </motion.h1>

            {/* Profile Bio Description */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-lg text-slate-400 max-w-xl mb-10 leading-relaxed font-light"
            >
              Sou <span className="text-white font-medium">Igor Lopes</span>, designer gráfico e especialista em mídias sociais. 
              Crio identidades visuais de alto impacto, diagramações de alto padrão e websites integrados no WordPress.
            </motion.p>

            {/* Core Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <a
                href="#portfolio"
                className="group inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-sans font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:from-indigo-450 hover:to-indigo-550 transition-all duration-300"
              >
                <span>Ver Portfólio</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contato"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-sans font-semibold text-sm"
              >
                <MessageSquare className="h-4 w-4 text-cyan-400" />
                <span>Solicitar Proposta</span>
              </a>
            </motion.div>

            {/* Mini Dashboard Style Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10"
            >
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center space-x-1.5 mb-1">
                      <Icon className={`h-3.5 w-3.5 ${stat.color}`} />
                      <span className="font-display font-medium text-xl text-white tracking-tight">
                        {stat.value}
                      </span>
                    </div>
                    <span className="font-sans text-xs text-slate-500 leading-normal font-medium">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Hero Right Graphic Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 1, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual design container representing a canvas art board / creative layout */}
            <div className="relative aspect-square w-full max-w-[400px] mx-auto lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-white/5 p-4 animate-[spin_100s_linear_infinite]" />
              
              {/* Profile Card frame (Glassmorphic Container) */}
              <div className="absolute inset-4 rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 flex flex-col justify-between shadow-2xl shadow-black/80 group">
                
                {/* Board header */}
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500/40" />
                    <span className="w-2 h-2 rounded-full bg-cyan-500/40" />
                    <span className="w-2 h-2 rounded-full bg-purple-500/40" />
                  </div>
                  <span>PORTFOLIO_CANVAS.PNG</span>
                </div>

                {/* Avatar Canvas with modern design accents */}
                <div className="relative my-6 grow flex items-center justify-center">
                  <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 filter blur-3xl opacity-20 animate-pulse" />
                  <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-white/10 p-1 bg-white/[0.02] shadow-xl group-hover:border-cyan-500/30 transition-colors duration-500">
                    <img
                      src={avatar}
                      alt="Igor Lopes Portfolio avatar"
                      className="w-full h-full object-cover object-top rounded-xl"
                    />
                  </div>
                </div>

                {/* Card footer details */}
                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-display font-medium text-white text-base">Igor Lopes</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold uppercase">
                      8+ Anos freelancer
                    </span>
                  </div>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                    Graduando em Design Gráfico especializado em mídias corporativas, desenvolvimento WordPress e soluções visuais estratégicas.
                  </p>
                </div>

              </div>

              {/* Decorative Absolute elements Floating icons */}
              <div className="absolute -top-2 -right-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-lg z-20 animate-bounce [animation-duration:4s]">
                <div className="font-mono text-[9px] text-slate-500 mb-0.5 font-bold uppercase">Layout Stack</div>
                <div className="font-sans font-bold text-xs text-indigo-400">Ps • Id • Ai • Figma</div>
              </div>

              <div className="absolute -bottom-2 -left-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-lg z-20 animate-bounce [animation-duration:5s]">
                <div className="font-mono text-[9px] text-slate-500 mb-0.5 font-bold uppercase font-semibold">Web Focus</div>
                <div className="font-sans font-bold text-xs text-cyan-400">Webdesign</div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
