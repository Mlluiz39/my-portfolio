import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import TiltedGridHero from "@/components/ui/tilted-grid-hero";
import { projects, showcaseProjects } from "@/data/projects";

const email = "mlluizpereira39@gmail.com";
const whatsapp = "https://wa.me/5511959646307";
const github = "https://github.com/Mlluiz39";
const services = [
  {
    number: "01",
    title: "Sistemas sob medida",
    description:
      "Aplicações web, plataformas SaaS e ferramentas internas pensadas para a rotina de quem vai usar.",
    detail: "Do planejamento à aplicação em produção.",
  },
  {
    number: "02",
    title: "Automação de processos",
    description:
      "Menos tarefas repetitivas. Integrações e fluxos que conectam informações e simplificam a operação.",
    detail: "IA aplicada quando faz sentido para o problema.",
  },
  {
    number: "03",
    title: "Integrações e evolução",
    description:
      "APIs, conexão entre serviços e melhorias em sistemas existentes para acompanhar o seu negócio.",
    detail: "Continuidade técnica para o que você já construiu.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (
            preference.matches ||
            entry.target.contains(document.activeElement)
          )
            return;
          const animation = entry.target.animate(
            [
              { opacity: 0, translate: "0 18px" },
              { opacity: 1, translate: "0 0" },
            ],
            { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".section-heading, .service-row, .contact-layout > *",
      )
      // The first viewport is readable immediately; animate only later sections.
      .forEach((element) => {
        if (element.getBoundingClientRect().top >= window.innerHeight) {
          observer.observe(element);
        }
      });
    const finishAnimations = () => {
      animations.forEach((animation) => animation.finish());
      animations.clear();
    };
    const onPreferenceChange = () => {
      if (preference.matches) finishAnimations();
    };
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("focusin", finishAnimations);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("focusin", finishAnimations);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="wordmark"
            href="#inicio"
            aria-label="mlluizdevtech — início"
            onClick={closeMenu}
          >
            ml<span className="brand-dot">.</span>
            <span className="brand-name">mlluizdevtech</span>
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav
            id="navigation"
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Navegação principal"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                closeMenu();
                document
                  .querySelector<HTMLButtonElement>(".menu-toggle")
                  ?.focus();
              }
            }}
          >
            <a href="#servicos" onClick={closeMenu}>
              O que faço
            </a>
            <a href="#portfolio" onClick={closeMenu}>
              Trabalhos
            </a>
            <a href="#about" onClick={closeMenu}>
              Sobre
            </a>
            <a className="nav-contact" href="#contato" onClick={closeMenu}>
              Vamos conversar <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <div id="inicio">
          <SculptureHero
            className="portfolio-hero"
            showNav={false}
            src={projects[0].cover}
            imageAlt="Capas dos projetos em destaque"
            projects={projects}
            eyebrow="Projetos selecionados — 2026"
            headline={`Software bem feito.
Rotina mais leve.`}
            headlineAccent="Rotina mais leve."
            body="Quatro sistemas que construí de ponta a ponta — da infraestrutura ao atendimento, da produtividade à segurança."
            primaryCta={{ label: "Vamos falar do seu projeto", href: "#contato" }}
            secondaryCta={{ label: "Conheça meu trabalho", href: "#servicos" }}
            hint="Passe o cursor pela capa"
            hintTouch="Toque na capa"
            background="#f7f7f2"
            darkBackground="#0d1210"
            textColor="#252b27"
            accentColor="#285343"
            headingFont="'DM Sans', sans-serif"
            accentFont="'Instrument Serif', 'Times New Roman', serif"
            bodyFont="'DM Sans', sans-serif"
            loadFonts={false}
            backdropText=""
            showCredit={false}
            sculptureScale={0.9}
            mobileSculptureScale={0.82}
            sculptureY={0}
          />
        </div>

        <section className="process-band" aria-label="Da rotina à solução">
          <div className="container process-band-inner">
            <span className="eyebrow">Da rotina à solução</span>
            <ol className="process-steps">
              <li className="process-step">
                <span className="process-step-index">01</span>
                <div>
                  <strong>Entender o processo</strong>
                  <small>O ponto de partida é o seu dia a dia.</small>
                </div>
              </li>
              <li className="process-step">
                <span className="process-step-index">02</span>
                <div>
                  <strong>Construir o sistema</strong>
                  <small>Cada parte com um propósito.</small>
                </div>
              </li>
              <li className="process-step">
                <span className="process-step-index">03</span>
                <div>
                  <strong>Simplificar a operação</strong>
                  <small>Mais clareza para seguir em frente.</small>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="services section container"
          id="servicos"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <span className="eyebrow">01 — O que faço</span>
            <div>
              <h2 id="services-title">
                A tecnologia certa.
                <br />
                Para o seu contexto.
              </h2>
              <p>
                O projeto começa pelo que precisa melhorar. A solução vem
                depois.
              </p>
            </div>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number}>
                <span className="row-number">{service.number}</span>
                <h3>{service.title}</h3>
                <div>
                  <p>{service.description}</p>
                  <span className="service-detail">{service.detail}</span>
                </div>
                <ArrowUpRight
                  className="service-arrow"
                  size={22}
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </section>

        <section
          className="work-section"
          id="portfolio"
          aria-labelledby="work-title"
        >
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">02 — Trabalhos &amp; código</span>
              <div>
                <h2 id="work-title">
                  O trabalho também
                  <br />
                  está no código.
                </h2>
                <p>
                  Projetos que construí de ponta a ponta — da infraestrutura
                  ao atendimento, da produtividade à segurança. Onde o código
                  é público, a capa abre o repositório.
                </p>
                <a
                  className="text-link work-repositories"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver todos os repositórios{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="projects-stage">
            <TiltedGridHero
              images={showcaseProjects.map((project) => ({
                src: project.tile,
                alt: project.name,
                href: project.href,
                private: project.private,
              }))}
              speed={5}
              tileHeight={26}
              aspectRatio={16 / 9}
              gap={5}
              axis={50}
              curve={72}
              fade={10}
              className="projects-band"
            />
          </div>

          <div className="container projects-footer">
            <ul className="projects-legend" aria-label="Projetos">
              {showcaseProjects.map((project) => (
                <li key={project.name}>
                  <span className="projects-legend-index">
                    {project.index}
                  </span>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.name}
                      <ArrowUpRight size={13} aria-hidden="true" />
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  ) : (
                    <span className="projects-legend-name">
                      {project.name}
                      <small>Projeto de empresa · LGPD</small>
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="projects-note">
              Projetos de empresa não podem ter o código compartilhado por
              confidencialidade e LGPD. As capas permanecem no portfólio como
              demonstração de escopo e interface.
            </p>
          </div>
        </section>

        <section
          className="about section container"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-heading">
            <span className="eyebrow">03 — Quem desenvolve</span>
            <div>
              <h2 id="about-title">Prazer, Marcelo Luiz.</h2>
              <p className="about-intro">
                À frente da mlluizdevtech, trabalho com desenvolvimento full
                stack, integração de sistemas e automação de processos.
              </p>
              <p>
                Meu foco é transformar necessidades do dia a dia em software
                útil, com uma estrutura que possa evoluir junto com o negócio.
                Do entendimento do problema à entrega, a conversa é direta e as
                decisões técnicas têm um porquê.
              </p>
              <div className="technology">
                <span className="eyebrow">Ferramentas de trabalho</span>
                <p>
                  TypeScript <span>·</span> React <span>·</span> Node.js{" "}
                  <span>·</span> Python <span>·</span> PostgreSQL
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="contact-section"
          id="contato"
          aria-labelledby="contact-title"
        >
          <div className="container contact-layout">
            <div>
              <span className="eyebrow">Vamos conversar</span>
              <h2 id="contact-title">
                O que podemos
                <br />
                simplificar por aí?
              </h2>
              <p>
                Conte um pouco sobre o seu negócio e o que você precisa
                resolver.
              </p>
            </div>
            <div className="contact-action">
              <a
                className="button button-light"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conversar pelo WhatsApp
                <ArrowUpRight size={19} aria-hidden="true" />
                <span className="sr-only"> (11) 95964-6307 — abre em nova aba</span>
              </a>
              <a
                className="button button-outline"
                href={`mailto:${email}?subject=Vamos%20conversar%20sobre%20um%20projeto`}
              >
                Conversar por e-mail{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
              <a className="email-address" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="container footer">
        <a className="footer-brand" href="#inicio">
          mlluizdevtech<span>.</span>
        </a>
        <span>© {new Date().getFullYear()} Marcelo Luiz</span>
        <a href={github} target="_blank" rel="noopener noreferrer">
          GitHub <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </footer>
    </>
  );
}
