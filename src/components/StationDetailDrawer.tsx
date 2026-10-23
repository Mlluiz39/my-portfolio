import React from 'react'
import {
  X,
  Sparkles,
  ArrowRight,
  Cpu,
  Globe,
  Smartphone,
  Zap,
  Layers,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react'
import type { PortfolioStationId } from './PortfolioFactory3D'

interface StationDetailDrawerProps {
  stationId: PortfolioStationId | null
  onClose: () => void
  onOpenInquiry: () => void
}

export const StationDetailDrawer: React.FC<StationDetailDrawerProps> = ({
  stationId,
  onClose,
  onOpenInquiry,
}) => {
  if (!stationId) return null

  const renderContent = () => {
    switch (stationId) {
      case 'cabinet':
        return (
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Módulo 01 · Ingestão de Projetos
            </div>
            <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white">
              Demandas, Briefing & Alinhamento
            </h3>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-xs sm:text-sm leading-relaxed">
              O projeto começa com entendimento profundo do seu modelo de negócio. Não desenvolvemos código sem objetivo claro de redução de custo ou aumento de faturamento.
            </p>

            <div className="space-y-2.5 pt-1">
              <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Clientes & Casos em Andamento
              </h4>
              <div className="grid gap-2.5">
                {[
                  { name: 'AgroTrack', domain: 'Agrotech & Telemetria', stat: '120k hectares monitorados' },
                  { name: 'Krypton Pay', domain: 'Fintech & Pagamentos', stat: 'R$ 48M transacionados/mês' },
                  { name: 'HealthSync', domain: 'Healthtech & Agendamentos', stat: 'Zero no-shows com IA' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <strong className="text-white text-xs sm:text-sm block">{item.name}</strong>
                      <span className="text-zinc-400 text-[11px]">{item.domain}</span>
                    </div>
                    <span className="text-amber-400 font-mono text-xs font-semibold">{item.stat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenInquiry}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>Enviar Minha Demanda de Projeto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )

      case 'engine':
        return (
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
              <Cpu className="w-3.5 h-3.5" />
              Módulo 02 · Motor Tecnológico
            </div>
            <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white">
              IA Não É o Produto. É o Multiplicador.
            </h3>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Integramos IA generativa e agentes autônomos nos pontos de maior fricção da sua operação. Redução drástica no ciclo de desenvolvimento e entrega contínua.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                { title: 'Frontend', stack: 'Next.js 15, React 19, Tailwind v4' },
                { title: 'Backend', stack: 'FastAPI (Python), Node.js, Go' },
                { title: 'Bancos & Vetores', stack: 'PostgreSQL, Redis, pgvector' },
                { title: 'Modelos de IA', stack: 'Gemini, Claude API, OpenAI, RAG' },
              ].map((tech, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-mono text-xs text-amber-400 block font-semibold mb-1">{tech.title}</span>
                  <span className="text-zinc-300 text-xs leading-snug block">{tech.stack}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-xs text-amber-200">
                Tipagem estrita TypeScript, testes automatizados e arquitetura pronta para milhões de requisições.
              </span>
            </div>
          </div>
        )

      case 'admin':
        return (
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
              <Layers className="w-3.5 h-3.5" />
              Módulo 03 · Catálogo de Serviços
            </div>
            <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white">
              Sistemas Completos de Ponta a Ponta
            </h3>

            <div className="space-y-2.5">
              {[
                {
                  icon: Globe,
                  title: 'Websites & SaaS',
                  desc: 'Portais corporativos, dashboards com WebSockets e tempo de carregamento sub-1 segundo.',
                },
                {
                  icon: Smartphone,
                  title: 'Aplicativos Mobile',
                  desc: 'iOS e Android com React Native & Flutter, arquitetura offline-first e sincronização em background.',
                },
                {
                  icon: Zap,
                  title: 'Automação & Integrações',
                  desc: 'Fluxos autônomos com webhooks, bots de WhatsApp, integrações de ERP e zero rotinas manuais.',
                },
              ].map((srv, idx) => {
                const Icon = srv.icon
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-white text-xs sm:text-sm block mb-0.5">{srv.title}</strong>
                      <p className="text-zinc-400 text-xs leading-relaxed">{srv.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={onOpenInquiry}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>Consultar Escopo para Minha Empresa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )

      case 'storefront':
        return (
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
              <TrendingUp className="w-3.5 h-3.5" />
              Módulo 04 · Portfólio de Casos Reais
            </div>
            <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white">
              Resultados Validados em Produção
            </h3>

            {/* AgroTrack */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-black to-black border border-amber-500/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-amber-400 font-semibold">AGROTRACK TELEMETRIA</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  +34% PRODUTIVIDADE
                </span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Plataforma web e mobile para monitoramento preditivo de safras em 120 mil hectares com processamento local e alertas inteligentes via IA.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['Next.js 15', 'React Native', 'FastAPI', 'Gemini AI', 'PostGIS'].map((t) => (
                  <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Krypton Pay */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white font-semibold">KRYPTON PAY & BILLING</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  R$ 48M / MÊS
                </span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed">
                Infraestrutura SaaS financeira para conciliação bancária automática e liquidação PIX instantânea sub-650ms.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['React 19', 'Node.js', 'Redis', 'Docker', 'PostgreSQL'].map((t) => (
                  <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenInquiry}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>Quero um Sistema Desse Nível</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )

      case 'cashdesk':
        return (
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              Módulo 05 · Fechamento & Proposta
            </div>
            <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white">
              Seu Projeto no Ar em até 30 Dias
            </h3>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Trabalhamos com sprints ágeis, código sob seu controle e comunicação direta sem intermediários.
            </p>

            <div className="space-y-2 pt-1">
              {[
                'MVP funcional entregue no prazo acordado',
                'Propriedade 100% sua do repositório e código-fonte',
                'Acompanhamento transparente a cada commit e sprint',
                'Suporte técnico e evolução pós-lançamento',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenInquiry}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/25"
            >
              <span>Solicitar Proposta Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* Backdrop for tapping outside */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] animate-fade-in"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 z-[100] w-full sm:max-w-md bg-[#0b0f17]/98 backdrop-blur-2xl border-l border-amber-500/30 shadow-2xl p-5 sm:p-7 overflow-y-auto">
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
            Inspecionando Estação 3D
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
            aria-label="Fechar painel"
          >
            <span>Fechar</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {renderContent()}
      </div>
    </>
  )
}
export default StationDetailDrawer
