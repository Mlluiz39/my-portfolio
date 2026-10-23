import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Github,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const email = "mlluizpereira39@gmail.com";
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
        ".engineering-note, .section-heading, .service-row, .work-layout > *, .contact-layout > *",
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
        <section
          className="hero container"
          id="inicio"
          aria-labelledby="hero-title"
        >
          <div className="hero-topline">
            <span className="eyebrow">
              Desenvolvimento de software & automação
            </span>
            <span className="location">Brasil / Atendimento remoto</span>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <h1 id="hero-title">
                Software bem feito.
                <br />
                <span>Rotina mais simples.</span>
              </h1>
              <p>
                Sou Marcelo Luiz. Desenvolvo sistemas e automações para
                organizar processos, conectar ferramentas e resolver problemas
                do seu negócio.
              </p>
              <a className="button button-primary" href="#contato">
                Vamos falar do seu projeto{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </div>
            <div
              className="engineering-note"
              aria-label="Do processo à solução: entender, desenvolver e simplificar"
            >
              <div className="note-heading">
                <span>Da rotina à solução</span>
                <span aria-hidden="true">↗</span>
              </div>
              <div className="flow-step">
                <span className="flow-index">01</span>
                <div>
                  <strong>Entender o processo</strong>
                  <small>O ponto de partida é o seu dia a dia.</small>
                </div>
              </div>
              <div className="flow-connector" aria-hidden="true" />
              <div className="flow-step">
                <span className="flow-index">02</span>
                <div>
                  <strong>Construir o sistema</strong>
                  <small>Cada parte com um propósito.</small>
                </div>
              </div>
              <div className="flow-connector" aria-hidden="true" />
              <div className="flow-step final-step">
                <span className="flow-index">03</span>
                <div>
                  <strong>Simplificar a operação</strong>
                  <small>Mais clareza para seguir em frente.</small>
                </div>
              </div>
              <div className="note-footer">
                Tecnologia a serviço do trabalho.
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <span>
              Sistemas web <i>/</i> Automações <i>/</i> Integrações
            </span>
            <a href="#servicos">
              Conheça meu trabalho <ArrowDown size={16} aria-hidden="true" />
            </a>
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
          <div className="container work-layout">
            <div>
              <span className="eyebrow">02 — Trabalhos & código</span>
              <h2 id="work-title">
                O trabalho também
                <br />
                está no código.
              </h2>
              <p>
                Meus repositórios públicos estão no GitHub. Por lá, você pode
                explorar os projetos, acompanhar o desenvolvimento e conhecer
                minhas escolhas técnicas.
              </p>
              <a
                className="text-link"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explorar repositórios{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
            <a
              className="github-panel"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="github-panel-top">
                <Github size={30} strokeWidth={1.4} aria-hidden="true" />
                <span>
                  Perfil público <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
              <div>
                <span className="repository-label">github.com/</span>
                <h3>Mlluiz39</h3>
              </div>
              <div className="github-panel-bottom">
                <span>Repositórios e desenvolvimento</span>
                <ArrowRight size={20} aria-hidden="true" />
              </div>
              <span className="sr-only">Abrir GitHub em nova aba</span>
            </a>
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
