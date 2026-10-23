import React, { useState } from 'react'
import AgenticFactory3D, { type StationId } from './ui/agentic-factory-3d'
import { Bot, Terminal } from 'lucide-react'

interface AgenticFactorySectionProps {
  onOpenInquiry?: () => void
}

export const AgenticFactorySection: React.FC<AgenticFactorySectionProps> = ({ onOpenInquiry }) => {
  const [activeStation, setActiveStation] = useState<StationId | null>(null)

  const stationDescriptions: Record<StationId, { title: string; desc: string }> = {
    engine: {
      title: '01. Engine de Conteúdo',
      desc: 'Geração autônoma de roteiro, síntese de voz neural, legendas e renderização do vídeo final.',
    },
    admin: {
      title: '02. Admin & Fila de Execução',
      desc: 'Orquestração de microsserviços, controle de tarefas em lote e telemetria operacional.',
    },
    storefront: {
      title: '03. Vitrine & Distribuição',
      desc: 'Deploy automático de assets, integração no catálogo de produtos e landing pages de conversão.',
    },
    cabinet: {
      title: '04. CRM & Gestão de Pedidos',
      desc: 'Ingestão de leads, histórico de transações e roteamento inteligente por agentes.',
    },
    cashdesk: {
      title: '05. Checkout & Faturamento',
      desc: 'Confirmação bancária em tempo real, emissão de recibos e encerramento do ciclo de entrega.',
    },
  }

  return (
    <section id="agentic-factory" className="relative py-28 px-6 sm:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4 backdrop-blur-md">
            <Bot className="w-3.5 h-3.5" />
            Engenharia de Sistemas Agênticos
          </div>
          <h2 className="font-['Syne',sans-serif] text-[clamp(1.5rem,7vw,2.25rem)] sm:text-4xl lg:text-5xl font-bold lg:font-extrabold text-white tracking-tight">
            A MÁQUINA AUTÔNOMA:
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              DA DEMANDA AO RESULTADO
            </span>
          </h2>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-sm sm:text-base mt-4 font-normal leading-relaxed">
            Interaja com o modelo 3D abaixo. Arraste para orbitar, use zoom ou selecione as estações para inspecionar cada etapa da linha de montagem construída por agentes de IA.
          </p>
        </div>

        {/* 3D Scene Container */}
        <div className="relative rounded-3xl border border-amber-500/30 bg-black/90 shadow-[0_0_50px_rgba(255,122,26,0.12)] overflow-hidden">
          {/* Station Status Overlay Header */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SISTEMA 3D OPERACIONAL</span>
            </div>
            {activeStation && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-amber-500/40 text-xs font-mono text-amber-300 animate-fadeIn">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>{stationDescriptions[activeStation]?.title}</span>
              </div>
            )}
          </div>

          {/* 3D Machine */}
          <AgenticFactory3D
            height={760}
            onStation={(id) => setActiveStation(id)}
          />

          {/* Bottom helper card if station clicked */}
          {activeStation && (
            <div className="p-4 sm:p-5 border-t border-amber-500/20 bg-black/90 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-0.5">
                  {stationDescriptions[activeStation].title}
                </span>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-xs sm:text-sm">
                  {stationDescriptions[activeStation].desc}
                </p>
              </div>
              {onOpenInquiry && (
                <button
                  onClick={onOpenInquiry}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase transition-colors shrink-0"
                >
                  Solicitar Arquitetura
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default AgenticFactorySection
