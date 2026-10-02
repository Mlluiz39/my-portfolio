<div align="center">

# ⚡ mlluizdevtech • Brazilian Software House

<p align="center">
  <strong>Software que transforma ideias em negócios digitais.</strong>
  <br />
  Aplicações de alto desempenho, IA integrada e experiência visual cinematográfica impulsionada por scroll.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-FF9900?style=for-the-badge" alt="Lenis Scroll" />
</p>

[Visualizar Demonstração](#-início-rápido) • [Arquitetura](#-arquitetura-e-funcionalidades) • [Tecnologias](#-stack-tecnológica) • [Contato](#-contato)

---

</div>

<br />

## 🌟 Visão Geral

O **mlluizdevtech Portfolio** é uma experiência web cinematográfica construída para posicionar uma software house moderna de alto padrão. Utiliza uma renderização de fundo via `<canvas>` com **300 frames fotorealistas** que respondem dinamicamente ao scroll do usuário:

```
[ Ideia / Visão ] ──> [ Fluxo de Código Dourado ] ──> [ Multiplicador IA ] ──> [ Produto em Produção ]
      Frame 1                 Frame 150                      Frame 220                 Frame 300
```

Conforme a página é rolada, o desenvolvedor imerso no vórtice de dados transforma código em um produto real em um laptop, enquanto cada seção de conteúdo surge suavemente na tela através de microinterações e glassmorphism.

---

## ✨ Destaques de Engenharia

- 🎬 **Canvas Scroll Animation (300 Frames)**: Renderização sob demanda com pré-carregamento assíncrono em memória, interpolação linear (`lerp`) e suporte a High-DPI (`devicePixelRatio`). Zero flickering com fallback inteligente para o frame mais próximo.
- 🌊 **Inércia e Rolagem Suave (Lenis)**: Integração com o motor Lenis para amortecimento natural do scroll em mouse wheel, trackpads e dispositivos móveis.
- 👁️ **Scroll Reveal Progressivo**: Cada seção possui observação de interseção (`FadeInSection`) com curvas `cubic-bezier(0.16, 1, 0.3, 1)` para uma entrada fluida e sem saltos visuais.
- 💎 **Glassmorphism Escuro**: Cartões com desfoque de fundo (`backdrop-blur-md`) e bordas sutis com acentos em âmbar (`#ff9900`), garantindo legibilidade perfeita com a animação ao fundo.
- ⚡ **Desempenho Extremo**: Build de produção gerado em menos de 2 segundos via Vite, sem bibliotecas pesadas de 3D desnecessárias.

---

## 🏗️ Estrutura do Projeto

```bash
portfolio/
├── public/
│   └── frames/                 # Sequência de 300 frames fotorealistas (JPG)
├── src/
│   ├── components/
│   │   ├── ScrollCanvas.tsx    # Motor de renderização e sincronização do scroll
│   │   ├── FadeInSection.tsx   # Wrapper com IntersectionObserver para revelação suave
│   │   ├── NavbarMlluiz.tsx    # Header flutuante responsivo com navegação rápida
│   │   ├── HeroCinematic.tsx   # Hero com proposta de valor, kickers e CTAs principais
│   │   ├── TrustMetrics.tsx    # Indicadores e métricas de autoridade técnica
│   │   ├── ServicesGrid.tsx    # Grade de especialidades (Full Stack, IA, Mobile, APIs)
│   │   ├── CinematicTransition.tsx # Linha editorial conectando pensamento a software
│   │   ├── PortfolioCaseStudies.tsx# Estudos de caso estruturados (Desafio, Solução, Resultado)
│   │   ├── AICoreSection.tsx   # Núcleo digital interativo demonstrando IA como multiplicador
│   │   ├── ProcessTimeline.tsx # Timeline do ciclo de desenvolvimento de software
│   │   ├── AboutEditorial.tsx  # Manifesto e identidade profissional
│   │   ├── FinalVortexCTA.tsx  # Chamada para ação final sobre o frame do notebook
│   │   ├── FooterMlluiz.tsx    # Rodapé institucional com links de contato e status
│   │   └── ProjectModal.tsx    # Modal interativo para levantamento de requisitos de projeto
│   ├── App.tsx                 # Composição da página principal e estados globais
│   ├── main.tsx                # Entrada React 19
│   └── index.css               # Design tokens e Tailwind CSS v4
├── index.html                  # HTML5 otimizado com fontes Syne, Plus Jakarta Sans & JetBrains Mono
├── vite.config.ts              # Configuração Vite com plugins oficiais React e Tailwind v4
├── tsconfig.json               # Configurações estritas do TypeScript
└── package.json                # Dependências e scripts do projeto
```

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Interface** | React 19 | Componentes funcionais e reatividade moderna |
| **Tipagem** | TypeScript 5.7 | Segurança de tipos estrita e inteligência de código |
| **Estilização** | Tailwind CSS v4 | Utilitários de CSS com compilação direta via `@tailwindcss/vite` |
| **Animação & Scroll**| HTML5 Canvas + Lenis | Canvas 2D acelerado por hardware e rolagem inercial |
| **Ícones** | Lucide React | Pacote de ícones minimalistas e modernos |
| **Bundler** | Vite 6 | Servidor de desenvolvimento ultrarrápido e build otimizado |

---

## 🚀 Início Rápido

### Pré-requisitos
- **Node.js** `>= 18.0.0`
- **npm** ou **pnpm**

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Mlluiz39/portfolio.git
cd portfolio
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra no seu navegador:
```
http://localhost:5173
```

### Build para Produção

Para gerar o pacote otimizado:
```bash
npm run build
```

Para visualizar localmente o resultado de produção:
```bash
npm run preview
```

---

## 💬 Contato & Negócios

Disponível para novos projetos de desenvolvimento de software, consultoria de arquitetura e integração de inteligência artificial.

- 🌐 **Software House**: [mlluizdevtech](https://github.com/Mlluiz39)
- 📧 **E-mail**: [contato@mlluizdevtech.com.br](mailto:contato@mlluizdevtech.com.br)
- 💬 **WhatsApp**: [+55 (11) 95964-6307](https://wa.me/5511959646307)
- 💼 **GitHub**: [@Mlluiz39](https://github.com/Mlluiz39)

---

<div align="center">
  <sub>Construído com excelência técnica por <strong>Marcelo Luiz (mlluizdevtech)</strong> • 2026</sub>
</div>
