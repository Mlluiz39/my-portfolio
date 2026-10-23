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
