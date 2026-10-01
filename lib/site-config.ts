export const siteConfig = {
  name: "mlluizdevtech",
  tagline: "Software House com IA e Automação",
  description:
    "Software sob medida com automação e IA para acelerar seu negócio. Criamos sistemas web, apps mobile e automações com entrega rápida e custo acessível. MVP em até 30 dias.",
  url: "https://mlluizdevtech.com.br",

  contact: {
    phone: "5511959646307",
    phoneFormatted: "(11) 95964-6307",
    email: "contato@mlluizdevtech.com.br",
    location: "Brasil - Atendimento remoto",
    responseTime: "Até 24h úteis",
  },

  whatsapp: {
    baseUrl: "https://wa.me/5511959646307",
    messages: {
      general:
        "Olá! Vim pelo site e gostaria de saber mais sobre os serviços.",
      project:
        "Olá! Vim pelo site e gostaria de conversar sobre um projeto.",
      form: "Olá! Acabei de enviar um formulário pelo site.",
      doubt: "Olá! Tenho uma dúvida sobre os serviços.",
      custom: "Olá! Preciso de uma solução personalizada.",
    },
  },
} as const

export function getWhatsAppUrl(
  messageKey: keyof typeof siteConfig.whatsapp.messages = "general"
) {
  const text = siteConfig.whatsapp.messages[messageKey]
  return `${siteConfig.whatsapp.baseUrl}?text=${encodeURIComponent(text)}`
}

export function getMailtoUrl(subject?: string) {
  const base = `mailto:${siteConfig.contact.email}`
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base
}
