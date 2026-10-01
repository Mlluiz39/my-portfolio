import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Portfólio | mlluizdevtech",
  description: "Conheça alguns dos projetos que desenvolvemos. Cases de sucesso em sistemas web, apps mobile e automações com IA.",
}

const projects = [
  {
    id: 1,
    title: "Sistema de Gestão para Clínica",
    category: "Sistema Web",
    description: "Sistema completo de gestão para clínica de fisioterapia, com agendamento online, prontuários eletrônicos e controle financeiro.",
    problem: "Gestão manual com planilhas causava perda de tempo e erros frequentes.",
    solution: "Sistema web integrado que automatizou agendamentos e centralizou informações de pacientes.",
    result: "Redução de 60% no tempo administrativo e zero erros de agendamento.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    image: "/portfolio-clinic.jpg",
    imageAlt: "Dashboard de gestão de clínica com calendário de agendamentos e métricas de pacientes",
  },
  {
    id: 2,
    title: "App de Delivery Regional",
    category: "App Mobile",
    description: "Aplicativo de delivery para rede de restaurantes local, com rastreamento em tempo real e integração com cozinha.",
    problem: "Dependência de marketplaces com taxas altas e perda de relacionamento com clientes.",
    solution: "App próprio com sistema de fidelidade e comunicação direta com clientes.",
    result: "Aumento de 40% na margem de lucro e base de 5.000+ usuários ativos.",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Firebase"],
    image: "/portfolio-delivery.jpg",
    imageAlt: "App mobile de delivery com lista de restaurantes, categorias de comida e mapa de rastreamento de entrega",
  },
  {
    id: 3,
    title: "Chatbot para Atendimento",
    category: "Automação IA",
    description: "Chatbot inteligente para e-commerce que responde dúvidas, rastreia pedidos e processa trocas automaticamente.",
    problem: "Equipe de atendimento sobrecarregada com perguntas repetitivas.",
    solution: "Chatbot com IA que resolve 80% das solicitações sem intervenção humana.",
    result: "Redução de 70% nos tickets de suporte e satisfação do cliente em 4.8/5.",
    technologies: ["OpenAI", "LangChain", "Node.js", "WhatsApp API"],
    image: "/portfolio-chatbot.jpg",
    imageAlt: "Interface de chatbot com IA no WhatsApp mostrando conversação automatizada com botões de resposta rápida",
  },
  {
    id: 4,
    title: "Dashboard de BI para Logística",
    category: "Sistema Web",
    description: "Painel de business intelligence para empresa de logística, com KPIs em tempo real e previsão de demanda.",
    problem: "Decisões baseadas em relatórios manuais desatualizados.",
    solution: "Dashboard automatizado com dados em tempo real e insights preditivos.",
    result: "Melhoria de 25% na eficiência operacional e redução de custos.",
    technologies: ["Next.js", "Python", "PostgreSQL", "Recharts"],
    image: "/portfolio-Dashboard-BI-Logística.png",
    imageAlt: "Dashboard de business intelligence para logística com gráficos e KPIs em tempo real",
  },
  {
    id: 5,
    title: "MVP para Startup EdTech",
    category: "SaaS",
    description: "Plataforma de cursos online com gamificação, sistema de assinaturas e área do aluno completa.",
    problem: "Ideia validada manualmente, precisava de produto para escalar.",
    solution: "MVP funcional em 30 dias com todas features essenciais para começar a vender.",
    result: "Lançamento bem-sucedido com 500+ alunos no primeiro mês.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    image: "/portfolio-edtech.png",
    imageAlt: "Plataforma EdTech com lista de cursos, sistema de gamificação e área do aluno",
  },
  {
    id: 6,
    title: "Integração ERP Personalizada",
    category: "Backend/API",
    description: "API de integração entre sistemas legados e novo ERP, com migração de dados e sincronização automática.",
    problem: "Dados fragmentados em múltiplos sistemas sem comunicação.",
    solution: "Camada de integração que unificou todos os sistemas em tempo real.",
    result: "Eliminação de retrabalho e visão unificada dos dados da empresa.",
    technologies: ["Node.js", "Go", "PostgreSQL", "RabbitMQ"],
    image: "/portfolio-erp.png",
    imageAlt: "Diagrama de integração de sistemas ERP com fluxos de dados conectados",
  },
]

const categoryColors: Record<string, string> = {
  "Sistema Web": "bg-[var(--primary)]/10 text-[var(--primary)]",
  "App Mobile": "bg-[var(--success)]/10 text-[var(--success)]",
  "Automação IA": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "SaaS": "bg-[var(--warning)]/10 text-[var(--warning)]",
  "Backend/API": "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400",
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-[var(--canvas)] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-5xl font-medium text-[var(--ink-deep)] leading-tight tracking-tight text-balance">
                Nosso portfólio
              </h1>
              <p className="mt-6 text-lg md:text-xl text-[var(--slate)] leading-relaxed text-pretty">
                Alguns dos projetos que desenvolvemos para nossos clientes. Cada projeto é uma história de problema resolvido e resultado entregue.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24 bg-[var(--surface-soft)]">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <h2 className="sr-only">Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[var(--canvas)] border border-[var(--hairline-soft)] rounded-3xl overflow-hidden group hover:border-[var(--hairline)] hover:shadow-lg transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${categoryColors[project.category]}`}>
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-[var(--ink-deep)] mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-[var(--slate)] leading-relaxed mb-6">
                      {project.description}
                    </p>
                    
                    {/* Problem / Solution / Result */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="text-xs font-bold text-[var(--stone)] uppercase tracking-wider mb-1">
                          Desafio
                        </div>
                        <p className="text-sm text-[var(--ink)]">{project.problem}</p>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--stone)] uppercase tracking-wider mb-1">
                          Solução
                        </div>
                        <p className="text-sm text-[var(--ink)]">{project.solution}</p>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--success)] uppercase tracking-wider mb-1">
                          Resultado
                        </div>
                        <p className="text-sm text-[var(--ink)] font-medium">{project.result}</p>
                      </div>
                    </div>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium text-[var(--charcoal)] bg-[var(--surface-soft)] rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NDA Note */}
        <section className="py-12 bg-[var(--canvas)]">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="bg-[var(--surface-soft)] rounded-2xl p-6 md:p-8 text-center">
              <ExternalLink className="h-8 w-8 text-[var(--steel)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--ink-deep)] mb-2">
                Projetos sob NDA
              </h3>
              <p className="text-[var(--slate)] max-w-2xl mx-auto">
                Alguns projetos não podem ser divulgados publicamente por questões contratuais. 
                Em uma conversa privada, podemos compartilhar mais detalhes técnicos e referências adicionais.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-[var(--ink-deep)]">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-medium text-[var(--canvas)] text-balance">
                Quer ser o próximo case de sucesso?
              </h2>
              <p className="mt-4 text-lg text-[var(--stone)]">
                Conte-nos sobre seu projeto e vamos criar algo incrível juntos.
              </p>
              <div className="mt-10">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary-deep)] px-8 py-6 text-base font-bold"
                >
                  <Link href="/contato">
                    Iniciar meu projeto
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
