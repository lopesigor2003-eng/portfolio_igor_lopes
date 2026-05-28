import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Mail, Send, Copy, Check, MessageCircle, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  email: string;
  phone: string;
}

export default function ContactSection({ email, phone }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [segment, setSegment] = useState('');
  const [deliverable, setDeliverable] = useState('social');
  const [description, setDescription] = useState('');
  
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const getDeliverableLabel = (val: string) => {
    switch (val) {
      case 'social': return 'Artes para Mídias Sociais';
      case 'wordpress': return 'Criação de Site WordPress';
      case 'editorial': return 'Diagramação Editorial / Capa';
      case 'sports': return 'Flyer Esportivo / Artes de Futebol';
      default: return 'Design Personalizado';
    }
  };

  // Live formatted pre-view text
  const getFormattedMessageText = () => {
    const dLabel = getDeliverableLabel(deliverable);
    return `Olá Igor! Meu nome é *${name || '[Seu Nome]'}* e atuo no segmento de *${segment || '[Seu Ramo/Segmento]'}*.\n\nEstou precisando de auxílio com: *${dLabel}*.\n\n*Detalhes do Projeto:* \n${description || '[Breve descrição do que você precisa...]'}\n\nVi seu portfólio moderno e gostaria de trocar uma ideia!`;
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } else {
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    }
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(getFormattedMessageText());
    window.open(`https://wa.me/${cleanPhone}?text=${encodedText}`, '_blank');
  };

  return (
    <section id="contato" className="py-24 bg-[#020617] relative border-t border-white/10">
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center select-none">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-400 tracking-wide uppercase mb-3 text-center">
            Orçamentos & Parcerias
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Vamos construir o seu projeto?
          </h2>
          <p className="font-sans text-base text-slate-400">
            Preencha o formulário interativo abaixo para enviar um briefing detalhado direto para o meu WhatsApp profissional. Economize tempo e obtenha respostas mais rápidas!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Left Info Panel (4 Grid cols) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h3 className="font-display font-semibold text-lg text-white tracking-tight">
              Informações de Contato
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              Você também pode entrar em contato por e-mail ou telefone. Meus horários de resposta padrão são de segunda a sexta, em horário comercial.
            </p>

            <div className="space-y-4 pt-4">
              {/* Email Block */}
              <div className="p-4 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-slate-500 uppercase block tracking-wider font-semibold">E-mail</span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-white">{email}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(email, 'email')}
                  className="p-1.5 rounded-lg bg-[#020617]/40 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Copiar e-mail"
                >
                  {emailCopied ? <Check className="h-3.5 w-3.5 text-emerald-450" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Phone Block */}
              <div className="p-4 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-slate-500 uppercase block tracking-wider font-semibold">Telefone WhatsApp</span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-white">{phone}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(phone, 'phone')}
                  className="p-1.5 rounded-lg bg-[#020617]/40 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Copiar telefone"
                >
                  {phoneCopied ? <Check className="h-3.5 w-3.5 text-emerald-450" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Design warning badge info */}
            <div className="p-4 rounded-3xl border border-dashed border-white/15 bg-white/[0.01] backdrop-blur flex items-start space-x-2.5">
              <AlertCircle className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-slate-500 leading-normal font-light">
                Disponibilizo artes abertas (.PSD/.AI) mediante contrato de liberação intelectual, garantindo segurança na administração da sua identidade visual.
              </p>
            </div>
          </div>

          {/* Right Messenger Form Mockup Panel (8 grid cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Interactive Composer Panel */}
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 text-left space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <h4 className="font-display font-medium text-white text-sm">Briefing do Projeto</h4>
                <span className="font-mono text-[9px] text-slate-550 uppercase tracking-widest font-bold">Etapa única • Auto-Brief</span>
              </div>

              <form onSubmit={handleWhatsAppSend} className="space-y-4 font-sans">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Seu Nome / Nome da Empresa</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos - Barbearia Vintage"
                    className="w-full px-3.5 py-2.5 text-xs text-white bg-[#020617]/50 border border-white/10 rounded-2xl focus:border-indigo-500/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* Segment */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nicho / Segmento</label>
                  <input
                    type="text"
                    required
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    placeholder="Ex: Automóvel, Advocacia, Estética"
                    className="w-full px-3.5 py-2.5 text-xs text-white bg-[#020617]/50 border border-white/10 rounded-2xl focus:border-indigo-500/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* Deliverable Type dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Serviço de Maior Interesse</label>
                  <select
                    value={deliverable}
                    onChange={(e) => setDeliverable(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-slate-300 bg-[#020617]/50 border border-white/10 rounded-2xl focus:border-indigo-500/50 focus:outline-none transition-colors"
                  >
                    <option value="social">Mídias Sociais (Feeds, Stories)</option>
                    <option value="wordpress">Criação de Website (WordPress)</option>
                    <option value="editorial">Projetos Editoriais (Diagramação, E-books, Capas)</option>
                    <option value="sports">Flyers Esportivos (Futebol, Campeonatos)</option>
                    <option value="other">Outros Serviços Personalizados</option>
                  </select>
                </div>

                {/* Description Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Detalhes sobre o Briefing</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="O que você precisa? Informações adicionais, cores preferidas ou referências..."
                    className="w-full px-3.5 py-2.5 text-xs text-white bg-[#020617]/50 border border-white/10 rounded-2xl focus:border-indigo-500/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* WhatsApp Dispatch Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-sans font-semibold text-xs rounded-2xl shadow-lg shadow-indigo-500/20 hover:from-indigo-450 hover:to-indigo-550 transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Enviar Briefing por WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Live Message Preview Mockup */}
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between h-full min-h-[380px] text-left">
              {/* Mock Header */}
              <div className="bg-[#020617]/70 px-4 py-3.5 border-b border-white/10 flex items-center justify-between select-none">
                <div className="flex items-center space-x-2.5">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-slate-300">Mensagem Visualizador</span>
                </div>
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">Pré-visualização</span>
              </div>

              {/* Chat Bubble Arena */}
              <div className="p-5 grow overflow-y-auto space-y-4 flex flex-col justify-end bg-[#020617]/40 relative">
                {/* Decorative Chat bubble of client */}
                <div className="self-end max-w-[85%] rounded-3xl rounded-tr-none px-4.5 py-3.5 bg-indigo-600/65 border border-white/10 text-slate-100 text-[11px] sm:text-xs font-sans shadow-lg space-y-2 relative text-left">
                  <div className="whitespace-pre-wrap font-sans font-light leading-relaxed">
                    {getFormattedMessageText()}
                  </div>
                  <span className="font-mono text-[8px] text-indigo-200 block text-right mt-1.5 font-bold">✔✔ Pré-visualização</span>
                </div>
              </div>

              {/* Chat Send interface footer placeholder */}
              <div className="p-3 bg-[#020617]/70 border-t border-white/10 flex items-center space-x-2 select-none">
                <div className="grow px-3 py-2 rounded-xl bg-[#020617]/60 border border-white/10 text-[10px] text-slate-500 font-sans font-light">
                  Pronto para enviar...
                </div>
                <div className="h-8 w-8 rounded-xl bg-indigo-600/60 border border-white/10 flex items-center justify-center text-white">
                  <Send className="h-3.5 w-3.5" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
