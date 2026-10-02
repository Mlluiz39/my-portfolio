import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('Websites & Sistemas');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: 'R$ 15.000 - R$ 30.000 (MVP)',
    timeline: '30 dias (MVP Ágil)',
    message: '',
  });

  if (!isOpen) return null;

  const services = [
    'Websites & Sistemas',
    'Aplicativos Mobile (iOS/Android)',
    'IA & Automação de Processos',
    'APIs & Integrações',
    'SaaS sob medida',
    'Evolução & Suporte Contínuo',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 1000);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Olá Luiz (mlluizdevtech)! Tenho interesse em desenvolver um projeto:\n\n` +
      `*Nome:* ${formData.name || 'Não informado'}\n` +
      `*Serviço:* ${selectedService}\n` +
      `*Orçamento estimado:* ${formData.budget}\n` +
      `*Prazo desejado:* ${formData.timeline}\n` +
      `*Detalhes:* ${formData.message || 'Gostaria de agendar uma conversa inicial.'}`
    );
    window.open(`https://wa.me/5511959646307?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#060a14] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#040710]">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              mlluizdevtech • Iniciação de Projeto
            </div>
            <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white tracking-tight">
              Vamos construir seu software
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-['Syne',sans-serif] text-2xl font-bold text-white mb-2">
              Proposta Solicitada com Sucesso!
            </h4>
            <p className="text-zinc-300 text-sm max-w-md mx-auto mb-6">
              Recebemos suas informações. Nossa equipe de engenharia analisará o escopo e entrará em contato em até 24 horas pelo seu e-mail e WhatsApp.
            </p>
            <button
              onClick={handleWhatsAppDirect}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ACELERAR VIA WHATSAPP AGORA</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Service selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                1. Selecione o tipo de solução
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {services.map((svc) => (
                  <button
                    type="button"
                    key={svc}
                    onClick={() => setSelectedService(svc)}
                    className={`p-2.5 rounded-xl border text-xs font-mono text-left transition-all ${
                      selectedService === svc
                        ? 'border-amber-500 bg-amber-500/15 text-amber-200 font-bold shadow-md shadow-amber-500/20'
                        : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {svc}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs: Name, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Seu Nome
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: João Silva"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-amber-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  E-mail de Contato
                </label>
                <input
                  type="email"
                  required
                  placeholder="joao@empresa.com.br"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-amber-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  WhatsApp / Celular
                </label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-amber-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Faixa de Investimento
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090e1a] border border-white/10 text-white text-sm focus:border-amber-500 focus:outline-none transition-all"
                >
                  <option value="R$ 10.000 - R$ 20.000">R$ 10.000 - R$ 20.000</option>
                  <option value="R$ 20.000 - R$ 40.000">R$ 20.000 - R$ 40.000</option>
                  <option value="R$ 40.000 - R$ 80.000+">R$ 40.000 - R$ 80.000+</option>
                  <option value="Enterprise / Sustentação Contínua">Enterprise / Sustentação Contínua</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Expectativa de Lançamento
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090e1a] border border-white/10 text-white text-sm focus:border-amber-500 focus:outline-none transition-all"
                >
                  <option value="30 dias (MVP Ágil)">30 dias (MVP Ágil)</option>
                  <option value="1 a 2 meses">1 a 2 meses</option>
                  <option value="3 meses ou mais">3 meses ou mais</option>
                </select>
              </div>
            </div>

            {/* Message details */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Descreva brevemente sua ideia ou necessidade técnica
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Precisamos criar um sistema web para gerenciar vendas e automatizar notificações no WhatsApp dos nossos clientes..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-amber-500 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Submit Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Sigilo comercial (NDA) garantido</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold uppercase transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WHATSAPP</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold font-mono text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all transform hover:scale-[1.02]"
                >
                  <span>SOLICITAR PROPOSTA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
