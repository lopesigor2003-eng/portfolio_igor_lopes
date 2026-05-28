import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  name: string;
}

export default function Footer({ name }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020617] border-t border-white/10 py-12 relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between space-y-6 md:space-y-0">
          
          {/* Copyright description */}
          <div className="text-left md:text-left space-y-1.5 flex-col flex">
            <p className="font-display font-semibold text-sm text-white">
              {name} • Designer Gráfico
            </p>
            <p className="font-sans text-xs text-slate-500">
              © {currentYear} Todos os direitos reservados. Conectado via Frosted Glass Theme.
            </p>
          </div>

          {/* Quick legal details or other resources */}
          <div className="text-left md:text-right space-y-1.5 flex flex-col md:items-end">
            <span className="font-mono text-[9px] text-slate-500 tracking-wider uppercase font-bold">
              Portfólio Profissional
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-305 hover:bg-white/10 hover:text-white transition-all text-xs font-bold"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
