"use client"

import Link from "next/link"
import { ArrowRight, Code, Smartphone, Server, Bot, Wrench, Layers, Zap, Clock, HeadphonesIcon, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  FadeInUp, 
  StaggerContainer, 
  StaggerItem, 
} from "@/components/animations"
import {
  TiltCard3D,
  Grid3DBackground,
  ParallaxDepth,
  PerspectiveContainer,
  Floating3D,
  ScrollReveal3D,
  Text3D,
  FloatingParticles,
  MorphingBlob,
  GlowTiltCard,
  ScrollTilt3D,
} from "@/components/effects-3d"
import { motion, useScroll, useTransform } from "framer-motion"
import { getWhatsAppUrl } from "@/lib/site-config"
import { useRef } from "react"

const services = [
  {
    icon: Code,
    title: "Desenvolvimento Web",
    description: "Sites e sistemas web modernos com React e Next.js. Responsivos, rápidos e otimizados para SEO.",
    href: "/servicos#web",
    color: "#0064e0",
  },
  {
    icon: Smartphone,
    title: "Apps Mobile",
    description: "Aplicativos Android e iOS com React Native. Uma única base de código para ambas plataformas.",
    href: "/servicos#mobile",
    color: "#0091ff",
  },
  {
    icon: Server,
    title: "Backends e APIs",
    description: "APIs REST escaláveis com Node.js e PostgreSQL. Arquitetura limpa e documentação completa.",
    href: "/servicos#backend",
    color: "#0457cb",
  },
  {
    icon: Bot,
    title: "Automação com IA",
    description: "Chatbots, pipelines de dados e integração com LLMs para automatizar processos do seu negócio.",
    href: "/servicos#ia",
    color: "#31a24c",
  },
  {
    icon: Wrench,
    title: "Manutenção",
    description: "Suporte contínuo, correções, atualizações de segurança e evolução do seu sistema.",
    href: "/servicos#manutencao",
    color: "#f2a918",
  },
  {
    icon: Layers,
    title: "SaaS Personalizado",
    description: "Transformamos sua ideia em um produto SaaS completo, pronto para escalar e monetizar.",
    href: "/servicos#saas",
    color: "#0064e0",
  },
]

const differentials = [
  {
    icon: Bot,
    title: "IA aplicada ao desenvolvimento",
    description: "Usamos automação e IA para reduzir tempo e custo sem abrir mão de qualidade.",
    metric: "Até 40% mais rápido",
  },
  {
    icon: Clock,
    title: "Entrega em sprints",
    description: "Entregas parciais a cada 1-2 semanas. Você valida antes de continuar.",
    metric: "MVP em 30 dias",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte pós-entrega",
    description: "30 dias de suporte incluso em todo projeto. Planos de manutenção a partir de R$100/mês.",
    metric: "SLA 24h úteis",
  },
]

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Go", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Docker", category: "Infra" },
  { name: "Cloudflare", category: "Infra" },
  { name: "React Native", category: "Mobile" },
]

const testimonials = [
  {
    quote: "A mlluizdevtech entregou nosso MVP em tempo recorde. O sistema funciona perfeitamente e já estamos captando clientes.",
    author: "Carlos Silva",
    role: "CEO, StartupXYZ",
  },
  {
    quote: "Finalmente conseguimos digitalizar nossos processos. O que era feito em planilhas agora está automatizado e integrado.",
    author: "Ana Costa",
    role: "Gestora, Clínica Saúde+",
  },
  {
    quote: "Preço justo, entrega rápida e suporte excelente. Recomendo para quem precisa de software de qualidade.",
    author: "Pedro Santos",
    role: "Proprietário, Loja Virtual",
  },
]

const stats = [
  { value: "50+", label: "Projetos entregues" },
  { value: "30", label: "Dias para MVP" },
  { value: "40%", label: "Mais barato" },
  { value: "24h", label: "Resposta" },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" className="flex-1">
        {/* ═══════════ Hero Section — 3D Immersive ═══════════ */}
        <section 
          ref={heroRef} 
          className="relative overflow-hidden bg-[var(--canvas)] py-20 md:py-28 lg:py-36 min-h-[90vh] flex items-center"
        >
          <Grid3DBackground />
          <FloatingParticles count={25} />
          
          {/* Morphing blobs */}
          <MorphingBlob className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-[var(--primary)] opacity-[0.04] blur-[80px]" />
          <MorphingBlob className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-[var(--primary-soft)] opacity-[0.03] blur-[60px]" />
          
          <motion.div 
            className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10 w-full"
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          >
            <PerspectiveContainer className="mx-auto max-w-3xl text-center" intensity={3}>
              {/* Badge */}
              <Floating3D depth={40} delay={0}>
                <motion.div 
                  className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-medium text-[var(--charcoal)] bg-[var(--surface-soft)] rounded-full glow-pulse animated-border"
                  initial={{ opacity: 0, y: 20, rotateX: 30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Sparkles className="h-4 w-4 text-[var(--primary)]" />
                  Software com IA e automação
                </motion.div>
              </Floating3D>
              
              {/* Title with 3D word-by-word reveal */}
              <Floating3D depth={20} delay={0.2}>
                <Text3D 
                  text="Software sob medida com automação e IA para acelerar seu negócio"
                  className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--ink-deep)] leading-[1.1] tracking-tight text-balance"
                  as="h1"
                />
              </Floating3D>
              
              {/* Subtitle */}
              <Floating3D depth={10} delay={0.4}>
                <motion.p 
                  className="mt-8 text-lg md:text-xl text-[var(--slate)] leading-relaxed text-pretty max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Criamos sistemas web, apps mobile e automações com entrega rápida e custo acessível. MVP em até 30 dias.
                </motion.p>
              </Floating3D>
              
              {/* CTA Buttons with 3D hover */}
              <motion.div 
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ perspective: "600px" }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, z: 20 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto rounded-full bg-[var(--ink-button)] text-[var(--on-ink-button)] hover:bg-[var(--charcoal)] px-8 py-6 text-base font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Link href="/contato">
                      Solicitar Orçamento
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, z: 20 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto rounded-full border-2 border-[var(--ink-deep)] text-[var(--ink-deep)] hover:bg-[var(--surface-soft)] px-8 py-6 text-base font-bold"
                  >
                    <a
                      href={getWhatsAppUrl("general")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Falar no WhatsApp
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </PerspectiveContainer>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs text-[var(--stone)] font-medium">Scroll</span>
            <motion.div 
              className="w-5 h-8 border-2 border-[var(--hairline)] rounded-full flex items-start justify-center p-1"
            >
              <motion.div 
                className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════ Stats Section — 3D floating cards ═══════════ */}
        <section className="bg-[var(--ink-deep)] py-16 overflow-hidden relative">
          <FloatingParticles count={10} />
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <ScrollReveal3D key={stat.label} delay={index * 0.1}>
                  <TiltCard3D intensity={10}>
                    <motion.div 
                      className="text-center p-6 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06]"
                      whileHover={{ 
                        backgroundColor: "rgba(255,255,255,0.08)",
                        borderColor: "rgba(0, 100, 224, 0.3)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="text-4xl md:text-5xl font-bold text-gradient"
                        style={{
                          background: "linear-gradient(135deg, #fff 0%, var(--primary-soft) 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="mt-2 text-sm text-[var(--stone)] font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  </TiltCard3D>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ Services Section — 3D tilt cards ═══════════ */}
        <section className="py-20 md:py-28 bg-[var(--canvas)] relative overflow-hidden" id="servicos">
          <FloatingParticles count={12} />
          
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <ScrollReveal3D>
              <div className="text-center mb-16 md:mb-20">
                <Text3D
                  text="Serviços que transformam seu negócio"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--ink-deep)] text-balance"
                  as="h2"
                />
                <motion.p 
                  className="mt-5 text-lg text-[var(--slate)] max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Do desenvolvimento ao suporte, entregamos soluções completas para digitalizar e automatizar sua empresa.
                </motion.p>
              </div>
            </ScrollReveal3D>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ScrollReveal3D 
                  key={service.title} 
                  delay={index * 0.08}
                  direction={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "center"}
                >
                  <GlowTiltCard glowColor={service.color}>
                    <Link
                      href={service.href}
                      className="group block p-7 md:p-8 bg-[var(--canvas)] border border-[var(--hairline-soft)] rounded-3xl hover:border-[var(--hairline)] transition-all h-full relative overflow-hidden"
                    >
                      {/* Subtle background gradient on hover */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at 30% 20%, ${service.color}08 0%, transparent 60%)`,
                        }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className="flex h-14 w-14 items-center justify-center rounded-2xl mb-5 transition-colors duration-300"
                          style={{ 
                            backgroundColor: `${service.color}12`,
                            color: service.color,
                          }}
                          whileHover={{ 
                            scale: 1.15, 
                            rotate: -5,
                            backgroundColor: service.color,
                            color: "#ffffff",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <service.icon className="h-7 w-7" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-[var(--ink-deep)] mb-3">
                          {service.title}
                        </h3>
                        <p className="text-[var(--slate)] leading-relaxed">
                          {service.description}
                        </p>
                        <motion.div 
                          className="mt-5 flex items-center text-sm font-bold"
                          style={{ color: service.color }}
                          whileHover={{ x: 8 }}
                          transition={{ duration: 0.2 }}
                        >
                          Saiba mais
                          <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </div>
                    </Link>
                  </GlowTiltCard>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ Differentials Section — 3D Depth ═══════════ */}
        <section className="py-20 md:py-28 bg-[var(--surface-soft)] relative overflow-hidden">
          <MorphingBlob className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[var(--primary)] opacity-[0.03] blur-[100px]" />
          
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <ScrollReveal3D>
              <div className="text-center mb-16 md:mb-20">
                <Text3D
                  text="Por que escolher a mlluizdevtech"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--ink-deep)] text-balance"
                  as="h2"
                />
                <motion.p 
                  className="mt-5 text-lg text-[var(--slate)] max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Combinamos tecnologia de ponta com processos ágeis para entregar mais rápido e mais barato.
                </motion.p>
              </div>
            </ScrollReveal3D>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {differentials.map((diff, index) => (
                <ScrollReveal3D 
                  key={diff.title} 
                  delay={index * 0.12}
                  direction={index === 0 ? "left" : index === 2 ? "right" : "center"}
                >
                  <TiltCard3D intensity={12}>
                    <div className="p-7 md:p-8 bg-[var(--canvas)] border border-[var(--hairline-soft)] rounded-3xl h-full relative overflow-hidden group">
                      {/* Animated corner accent */}
                      <motion.div
                        className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: "radial-gradient(circle at 100% 0%, var(--primary) 0%, transparent 70%)",
                          opacity: 0.08,
                        }}
                      />
                      
                      <motion.div 
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)] text-white mb-5"
                        whileHover={{ scale: 1.1, rotate: -8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <diff.icon className="h-7 w-7" />
                      </motion.div>
                      <motion.div 
                        className="inline-flex px-3.5 py-1.5 mb-4 text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 rounded-full"
                        whileHover={{ scale: 1.08 }}
                      >
                        {diff.metric}
                      </motion.div>
                      <h3 className="text-xl font-bold text-[var(--ink-deep)] mb-3">
                        {diff.title}
                      </h3>
                      <p className="text-[var(--slate)] leading-relaxed">
                        {diff.description}
                      </p>
                    </div>
                  </TiltCard3D>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ Technologies Section — 3D floating chips ═══════════ */}
        <section className="py-20 md:py-28 bg-[var(--canvas)] overflow-hidden relative">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <ScrollReveal3D>
              <div className="text-center mb-14">
                <Text3D
                  text="Tecnologias que usamos"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--ink-deep)] text-balance"
                  as="h2"
                />
                <motion.p 
                  className="mt-5 text-lg text-[var(--slate)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Stack moderna e consolidada para garantir qualidade e escalabilidade.
                </motion.p>
              </div>
            </ScrollReveal3D>
            
            <ParallaxDepth speed={0.15}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {technologies.map((tech, index) => (
                  <ScrollReveal3D key={tech.name} delay={index * 0.06}>
                    <TiltCard3D intensity={8}>
                      <motion.div
                        className="flex items-center gap-2.5 px-6 py-3.5 bg-[var(--surface-soft)] border border-[var(--hairline-soft)] rounded-full cursor-default"
                        whileHover={{ 
                          scale: 1.12, 
                          backgroundColor: "var(--primary)",
                          color: "white",
                          borderColor: "var(--primary)",
                          boxShadow: "0 8px 30px rgba(0, 100, 224, 0.3)",
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <span className="text-sm font-bold text-[var(--ink-deep)]">
                          {tech.name}
                        </span>
                        <span className="text-xs text-[var(--stone)] font-medium">
                          {tech.category}
                        </span>
                      </motion.div>
                    </TiltCard3D>
                  </ScrollReveal3D>
                ))}
              </div>
            </ParallaxDepth>
          </div>
        </section>

        {/* ═══════════ Testimonials Section — 3D scroll ═══════════ */}
        <section className="py-20 md:py-28 bg-[var(--surface-soft)] relative overflow-hidden">
          <MorphingBlob className="absolute bottom-[5%] left-[-10%] w-[400px] h-[400px] bg-[var(--primary)] opacity-[0.03] blur-[80px]" />
          
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <ScrollReveal3D>
              <div className="text-center mb-16 md:mb-20">
                <Text3D
                  text="O que nossos clientes dizem"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--ink-deep)] text-balance"
                  as="h2"
                />
              </div>
            </ScrollReveal3D>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal3D 
                  key={index} 
                  delay={index * 0.15}
                  direction={index === 0 ? "left" : index === 2 ? "right" : "center"}
                >
                  <TiltCard3D intensity={10} className="h-full">
                    <div className="p-7 md:p-8 bg-[var(--canvas)] border border-[var(--hairline-soft)] rounded-3xl h-full flex flex-col relative overflow-hidden">
                      {/* Quote decoration */}
                      <motion.div
                        className="absolute -top-2 -left-1 text-7xl font-serif text-[var(--primary)] opacity-10 select-none"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 0.1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        "
                      </motion.div>
                      
                      <motion.div 
                        className="flex gap-1 mb-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.svg
                            key={i}
                            className="h-5 w-5 text-[var(--warning)]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            initial={{ opacity: 0, scale: 0, rotateY: 90 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.06 }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </motion.div>
                      <p className="text-[var(--ink)] leading-relaxed mb-6 flex-1 relative z-10">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div>
                        <div className="font-bold text-[var(--ink-deep)]">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-[var(--steel)]">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </TiltCard3D>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CTA Section — Immersive 3D ═══════════ */}
        <section className="py-20 md:py-28 bg-[var(--ink-deep)] relative overflow-hidden">
          {/* Animated background orbs */}
          <motion.div 
            className="absolute top-0 left-0 w-80 h-80 bg-[var(--primary)] rounded-full opacity-[0.08] blur-[120px]"
            animate={{
              x: [0, 120, 0],
              y: [0, 60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--primary-soft)] rounded-full opacity-[0.06] blur-[150px]"
            animate={{
              x: [0, -80, 0],
              y: [0, -120, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <FloatingParticles count={15} />
          
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
            <PerspectiveContainer className="mx-auto max-w-3xl text-center" intensity={4}>
              <ScrollReveal3D>
                <Text3D
                  text="Pronto para transformar sua ideia em realidade?"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--canvas)] text-balance"
                  as="h2"
                />
              </ScrollReveal3D>
              
              <Floating3D depth={15} delay={0.2}>
                <motion.p 
                  className="mt-6 text-lg text-[var(--stone)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Solicite uma análise gratuita do seu projeto e receba um orçamento sem compromisso.
                </motion.p>
              </Floating3D>
              
              <ScrollReveal3D delay={0.2}>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, z: 20 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="w-full sm:w-auto rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary-deep)] px-8 py-6 text-base font-bold shadow-lg hover:shadow-2xl transition-shadow"
                    >
                      <Link href="/contato">
                        Solicitar Análise Gratuita
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, z: 20 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto rounded-full border-2 border-[var(--canvas)] text-[var(--canvas)] bg-transparent hover:bg-white/10 px-8 py-6 text-base font-bold"
                    >
                      <Link href="/portfolio">
                        Ver Portfólio
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </ScrollReveal3D>
              
              <motion.div 
                className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[var(--stone)]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { text: "Resposta em 24h" },
                  { text: "Sem compromisso" },
                  { text: "Orçamento detalhado" }
                ].map((item, index) => (
                  <motion.span 
                    key={item.text}
                    className="flex items-center gap-1.5"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
                    {item.text}
                  </motion.span>
                ))}
              </motion.div>
            </PerspectiveContainer>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
