import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Network, 
  Boxes, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ServicesGridProps {
  onOpenInquiry: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenInquiry }) => {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      id: '01',
      title: 'Websites & Sistemas',
      subtitle: 'Aplicações web modernas, portais corporativos e dashboards de alta performance.',
      icon: Globe,
      features: [
        'Interfaces responsivas e ultrarrápidas com Next.js & React',
        'Painéis administrativos e dashboards em tempo real',
        'Otimização extrema para SEO técnico e Core Web Vitals',
        'Arquitetura segura com autenticação RBAC e proteção de dados',
      ],
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      metric: 'Sub-1s Page Load',
    },
    {
      id: '02',
      title: 'Aplicativos Mobile',
      subtitle: 'Apps fluidos para iOS e Android com arquitetura offline-first e alta taxa de retenção.',
      icon: Smartphone,
      features: [
        'Desenvolvimento cross-platform de alta fidelidade com React Native & Flutter',
        'Notificações push inteligentes e sincronização em segundo plano',
        'Integração nativa com biometria, câmera, Bluetooth e geolocalização',
        'Publicação completa e conformidade com Apple App Store & Google Play',
      ],
      stack: ['React Native', 'Flutter', 'Expo', 'Firebase', 'SQLite'],
      metric: 'iOS & Android Parity',
    },
    {
      id: '03',
      title: 'IA & Automação',
      subtitle: 'Transforme rotinas repetitivas em fluxos automatizados com agentes e LLMs.',
      icon: Cpu,
      features: [
        'Agentes autônomos para atendimento e triagem (WhatsApp, Web & CRM)',
        'Pipelines de RAG (Busca semântica em base documental da empresa)',
        'Automação de processos operacionais (RPA) com redução drástica de erros',
        'Modelos multimodais de visão e processamento de linguagem natural',
      ],
      stack: ['Gemini 2.5', 'OpenAI', 'LangChain', 'Python', 'Vector DBs'],
      metric: 'Até 70% Menos Trabalho Manual',
    },
    {
      id: '04',
      title: 'APIs & Integrações',
      subtitle: 'Comunicação robusta entre serviços, microsserviços e gateways corporativos.',
      icon: Network,
      features: [
        'Construção de APIs RESTful e GraphQL resilientes e documentadas (Swagger/OpenAPI)',
        'Integração segura com meios de pagamento (Stripe, Asaas, Mercado Pago, PIX)',
        'Arquitetura orientada a eventos com mensageria (RabbitMQ, Redis Streams)',
        'Webhooks, filas assíncronas e alta tolerância a falhas',
      ],
      stack: ['Node.js', 'FastAPI', 'Redis', 'Docker', 'GraphQL'],
      metric: '99.99% Uptime',
    },
    {
      id: '05',
      title: 'SaaS sob medida',
      subtitle: 'Do MVP à plataforma multi-tenant completa, pronta para faturar e escalar.',
      icon: Boxes,
      features: [
        'Arquitetura multi-tenancy com isolamento de dados por cliente',
        'Gestão de assinaturas, planos recorrentes, upgrades e faturamento',
        'Dashboards analíticos de retenção, churn e receita (MRR/ARR)',
        'Setup de infraestrutura na nuvem escalável (AWS, GCP, Cloud Run)',
      ],
      stack: ['Cloud Native', 'PostgreSQL', 'Stripe Billing', 'Docker', 'CI/CD'],
      metric: 'Pronto para Escala Global',
    },
    {
      id: '06',
      title: 'Evolução & Suporte',
      subtitle: 'Sustentação contínua, monitoramento 24/7 e melhorias contínuas de produto.',
      icon: Activity,
      features: [
        'Monitoramento ativo de erros e latência em tempo real',
        'Refatoração e migração de sistemas legados para tecnologias modernas',
        'Pipelines de deploy contínuo (CI/CD) com testes automatizados',
        'Acordo de Nível de Serviço (SLA) com tempo de resposta garantido',
      ],
      stack: ['Datadog', 'Sentry', 'GitHub Actions', 'Terraform', 'Kubernetes'],
      metric: 'SLA Garantido em Contrato',
    },
  ];

  return (
    <section id="services" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-black/60 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Especialidades de Engenharia
            </div>
            <h2 className="font-['Syne',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              DO CONCEITO
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                AO PRODUTO.
              </span>
            </h2>
          </div>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-zinc-300 text-sm sm:text-base max-w-md mt-4 md:mt-0 font-normal leading-relaxed">
            Desenvolvemos tecnologia com padrão de excelência internacional. Cada linha de código é arquitetada para gerar tração, velocidade e valor real para o seu negócio.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            const isSelected = selectedService === idx;
            return (
              <div
                key={svc.id}
                onClick={() => setSelectedService(idx)}
                className={`group relative rounded-3xl p-7 sm:p-8 bg-[#060a14] border transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-amber-500/70 shadow-2xl shadow-amber-500/10'
                    : 'border-white/10 hover:border-amber-500/40'
                }`}
              >
                {/* Ambient top light */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 group-hover:bg-amber-500/10 rounded-full blur-2xl transition-colors pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,140,40,0.15)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-400/80">
                      {svc.id}
                    </span>
                  </div>

                  <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                    {svc.subtitle}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-8">
                    {svc.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <span className="text-xs text-zinc-300 font-normal leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack & Metric Footer */}
                <div className="pt-5 border-t border-white/5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase text-zinc-400">Destaque</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-semibold">
                      {svc.metric}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {svc.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-400 font-mono text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenInquiry();
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/[0.03] group-hover:bg-amber-500 group-hover:text-black border border-white/10 group-hover:border-amber-400 text-zinc-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <span>SOLICITAR PROPOSTA</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
