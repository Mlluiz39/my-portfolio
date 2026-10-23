export type Project = {
  index: string;
  name: string;
  short: string;
  mobileShort: string;
  category: string;
  summary: string;
  stack: string[];
  href: string;
  cover: string;
  mobileCover: string;
};

export type ShowcaseProject = {
  index: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  /** Absent when the repository is private. */
  href?: string;
  /** Company project that cannot be shared, shown with the LGPD note. */
  private?: boolean;
  /** 800×450 image used by the curved band. */
  tile: string;
  cover: string;
  mobileCover: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "Cloudflare Tunnel Manager",
    short: "Cloudflare Tunnel Manager",
    mobileShort: "Túnel",
    category: "Infraestrutura",
    summary:
      "App desktop para publicar serviços locais com Cloudflare Tunnel: subdomínio, DNS, serviço no boot e teste HTTPS.",
    stack: ["Electron", "Node.js", "Cloudflare API"],
    href: "https://github.com/Mlluiz39/cloudflare-tunnel-full",
    cover: "/projects/cloudflare-tunnel.webp",
    mobileCover: "/projects/cloudflare-tunnel-mobile.webp",
  },
  {
    index: "02",
    name: "ConectaCRM",
    short: "ConectaCRM",
    mobileShort: "CRM",
    category: "Atendimento & IA",
    summary:
      "CRM multicanal com agentes de IA para WhatsApp, Instagram e Messenger, com caixa única e handoff humano.",
    stack: ["Next.js", "Supabase", "Claude API"],
    href: "https://github.com/Mlluiz39/conecta-crm",
    cover: "/projects/conecta-crm.webp",
    mobileCover: "/projects/conecta-crm-mobile.webp",
  },
  {
    index: "03",
    name: "voice-typer",
    short: "voice-typer",
    mobileShort: "Voz",
    category: "Produtividade",
    summary:
      "Ditado por voz local no Linux que injeta texto no campo focado de qualquer aplicativo.",
    stack: ["Python", "faster-whisper", "GTK3"],
    href: "https://github.com/Mlluiz39/voice-typer",
    cover: "/projects/voice-typer.webp",
    mobileCover: "/projects/voice-typer-mobile.webp",
  },
  {
    index: "04",
    name: "OpenPass API",
    short: "OpenPass API",
    mobileShort: "Vault",
    category: "Segurança",
    summary:
      "Gerenciador de segredos self-hosted em Go, multiusuário e compatível com os clientes do Bitwarden.",
    stack: ["Go", "PostgreSQL", "Docker"],
    href: "https://github.com/Mlluiz39/openpass-api",
    cover: "/projects/openpass-api.webp",
    mobileCover: "/projects/openpass-api-mobile.webp",
  },
];

/**
 * The five current covers. Public repositories open from the cover; company
 * projects show the cover only, with their access restriction stated.
 */
export const showcaseProjects: ShowcaseProject[] = [
  {
    index: "01",
    name: "Cloudflare Tunnel Manager",
    category: "Infraestrutura",
    summary:
      "Aplicativo desktop para publicar serviços locais com Cloudflare Tunnel: subdomínio, DNS, serviço no boot e teste HTTPS.",
    stack: ["Electron", "Node.js", "Cloudflare API"],
    href: "https://github.com/Mlluiz39/cloudflare-tunnel-full",
    tile: "/projects/showcase/cloudflared-tunnel-tile.webp",
    cover: "/projects/showcase/cloudflared-tunnel.webp",
    mobileCover: "/projects/showcase/cloudflared-tunnel-mobile.webp",
  },
  {
    index: "02",
    name: "ConectaCRM",
    category: "Atendimento & IA",
    summary:
      "CRM multicanal com agentes de IA para WhatsApp, Instagram e Messenger, com caixa única e handoff humano.",
    stack: ["Next.js", "Supabase", "Claude API"],
    href: "https://github.com/Mlluiz39/conecta-crm",
    tile: "/projects/showcase/conecta-crm-tile.webp",
    cover: "/projects/showcase/conecta-crm.webp",
    mobileCover: "/projects/showcase/conecta-crm-mobile.webp",
  },
  {
    index: "03",
    name: "Cowork-lite",
    category: "IA local",
    summary:
      "Agente de IA local em um único arquivo Python, com CLI, Web UI e tray app, sandbox Landlock e audit trail.",
    stack: ["Python", "Landlock", "SHA-256"],
    private: true,
    tile: "/projects/showcase/cowork-lite-tile.webp",
    cover: "/projects/showcase/cowork-lite.webp",
    mobileCover: "/projects/showcase/cowork-lite-mobile.webp",
  },
  {
    index: "04",
    name: "Ditavo",
    category: "Atendimento",
    summary:
      "Transcrição automática de áudios do WhatsApp com Whisper, Evolution API e painel de controle.",
    stack: ["Whisper", "Evolution API", "Docker"],
    private: true,
    tile: "/projects/showcase/ditavo-tile.webp",
    cover: "/projects/showcase/ditavo.webp",
    mobileCover: "/projects/showcase/ditavo-mobile.webp",
  },
  {
    index: "05",
    name: "OpenPass API",
    category: "Segurança",
    summary:
      "Gerenciador de segredos self-hosted em Go, multiusuário e compatível com os clientes do Bitwarden.",
    stack: ["Go", "PostgreSQL", "Docker"],
    href: "https://github.com/Mlluiz39/openpass-api",
    tile: "/projects/showcase/openpass-tile.webp",
    cover: "/projects/showcase/openpass.webp",
    mobileCover: "/projects/showcase/openpass-mobile.webp",
  },
];
