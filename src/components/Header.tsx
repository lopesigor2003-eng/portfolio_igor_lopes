import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Smartphone, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  email: string;
  phone: string;
}

export default function Header({ email, phone }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Militar', href: '#militar' },
    { label: 'Sobre Mim', href: '#sobre-mim' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/[0.02] backdrop-blur-2xl border-b border-white/10 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a href="#header" className="group flex items-center space-x-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-display font-bold text-slate-950 text-lg tracking-wider shadow-lg shadow-indigo-500/10 group-hover:shadow-cyan-500/20 group-hover:scale-105 transition-all duration-300">
              I.
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-white tracking-widest text-sm leading-tight uppercase">
                Igor<span className="text-cyan-400">.</span>Lopes
              </span>
              <span className="font-mono text-[9px] text-slate-400 tracking-wider">
                DESIGN & DEV
              </span>
            </div>
          </a>

          {/* Desktop Navigation in Frosted Glass Pill wrapper */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-xs font-semibold px-5 py-2 text-slate-300 hover:text-white rounded-full hover:bg-white/5 transition-all duration-205"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={`mailto:${email}`}
              className="p-2 text-slate-400 hover:text-white bg-white/5 border border-white/10 rounded-xl transition-all duration-205"
              title="Enviar Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="referrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 hover:from-indigo-450 hover:to-indigo-550 transition-all duration-200"
            >
              <Smartphone className="h-3.5 w-3.5 text-cyan-300" />
              <span>Entrar em Contato</span>
              <ArrowUpRight className="h-3 w-3 text-slate-300" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white bg-white/5 border border-white/10 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#020617]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-2 pb-6 space-y-4"
          >
            <div className="flex flex-col space-y-1.5">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans text-sm font-semibold text-slate-300 hover:text-white py-2 px-3 hover:bg-white/5 rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Mobile Actions */}
            <div className="flex flex-col space-y-2 pt-2">
              <a
                href={`mailto:${email}`}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300"
              >
                <Mail className="h-4 w-4 text-indigo-400" />
                <span>{email}</span>
              </a>
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="referrer"
                className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-xs text-white font-semibold"
              >
                <Smartphone className="h-4 w-4 text-cyan-300" />
                <span>Entrar em Contato</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
