import { siteConfig } from "@/lib/site-config"

// ─── Organization + ProfessionalService (main business schema) ───────
export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Organization"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: "mlluiz dev tech",
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneFormatted,
    areaServed: {
      "@type": "Country",
      name: "Brazil",
      sameAs: "https://www.wikidata.org/wiki/Q155",
    },
    serviceType: [
      "Software Development",
      "Web Development",
      "Mobile App Development",
      "API Development",
      "AI Automation",
      "SaaS Development",
      "System Maintenance",
    ],
    knowsAbout: [
      "React", "Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL",
      "React Native", "Docker", "Cloudflare", "REST APIs",
      "Artificial Intelligence", "LLM Integration", "ChatGPT",
      "Software Architecture", "Agile Development",
    ],
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Pix, Transferência Bancária, Cartão de Crédito",
    foundingDate: "2022",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 10,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "SP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.55,
      longitude: -46.63,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}/opengraph-image`,
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de Desenvolvimento de Software",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Desenvolvimento Web",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Desenvolvimento Web",
                description: "Sites e sistemas web modernos com React e Next.js. Responsivos, rápidos e otimizados para SEO.",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "500",
                priceCurrency: "BRL",
                minPrice: "500",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Apps Mobile",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Desenvolvimento de Apps Mobile",
                description: "Aplicativos Android e iOS com React Native. Uma única base de código para ambas plataformas.",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "1000",
                priceCurrency: "BRL",
                minPrice: "1000",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Backend e APIs",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Desenvolvimento de Backend e APIs",
                description: "APIs REST escaláveis com Node.js e PostgreSQL. Arquitetura limpa e documentação completa.",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "1500",
                priceCurrency: "BRL",
                minPrice: "1500",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Automação com IA",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Automação com Inteligência Artificial",
                description: "Chatbots, pipelines de dados e integração com LLMs para automatizar processos do seu negócio.",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "2000",
                priceCurrency: "BRL",
                minPrice: "2000",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "SaaS e MVP",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Desenvolvimento de SaaS e MVP",
                description: "Transformamos sua ideia em um produto SaaS completo, pronto para escalar e monetizar. MVP em até 30 dias.",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "3000",
                priceCurrency: "BRL",
                minPrice: "3000",
              },
            },
          ],
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "50",
      reviewCount: "50",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ─── WebSite Schema (helps Google and AI with sitelinks) ─────────────
export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: "mlluiz dev tech",
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: "pt-BR",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/faq?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ─── FAQ Schema (critical for AI snippets and featured answers) ──────
export function FAQPageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quanto custa desenvolver um sistema ou aplicativo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Depende do escopo. Referências: sites institucionais a partir de R$500, sistemas web a partir de R$2.500, apps mobile a partir de R$1.000. A mlluizdevtech faz análise gratuita antes de qualquer proposta.",
        },
      },
      {
        "@type": "Question",
        name: "A mlluizdevtech é mais barata que uma agência tradicional?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Na maioria dos casos, sim - até 30-40% mais barato. Isso acontece porque a mlluizdevtech usa automação e IA para acelerar partes do desenvolvimento, reduzindo horas de trabalho sem abrir mão de qualidade.",
        },
      },
      {
        "@type": "Question",
        name: "Quanto tempo leva para a mlluizdevtech entregar meu projeto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sites simples: 1-2 semanas. Sistemas web: 3-8 semanas. Apps mobile: 4-10 semanas. MVPs: até 30 dias. Prazos acordados no início são cumpridos.",
        },
      },
      {
        "@type": "Question",
        name: "Que tecnologias a mlluizdevtech usa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "React e Next.js para web, React Native para mobile, Node.js e Go para backend, PostgreSQL para banco de dados, e Docker para infraestrutura. Sempre tecnologias modernas e bem estabelecidas.",
        },
      },
      {
        "@type": "Question",
        name: "O código fonte do projeto é meu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim, 100%. A mlluizdevtech entrega o repositório completo com código documentado. Você é dono do código e pode contratar qualquer desenvolvedor para dar continuidade se desejar.",
        },
      },
      {
        "@type": "Question",
        name: "A mlluizdevtech oferece suporte após a entrega?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. Todo projeto inclui 30 dias de suporte pós-entrega com correção de bugs, pequenos ajustes e treinamento da equipe. Após esse período, oferece planos de manutenção a partir de R$100/mês com SLA de 24h úteis.",
        },
      },
      {
        "@type": "Question",
        name: "Como funciona o processo de desenvolvimento da mlluizdevtech?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O processo tem 5 etapas: 1) Análise gratuita para entender suas necessidades; 2) Definição de arquitetura e escopo; 3) Desenvolvimento em sprints de 1-2 semanas com entregas parciais; 4) Deploy e lançamento; 5) 30 dias de suporte pós-entrega inclusos.",
        },
      },
      {
        "@type": "Question",
        name: "Preciso pagar tudo adiantado para a mlluizdevtech?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Não. A mlluizdevtech trabalha com 30-50% de entrada e o restante em marcos de entrega ou no deploy final. Para projetos maiores, parcela em até 3x.",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ─── BreadcrumbList Schema ───────────────────────────────────────────
interface BreadcrumbItem {
  name: string
  href: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ─── Service Schema (for individual service pages) ───────────────────
interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  minPrice?: string
}

export function ServiceJsonLd({ name, description, url, minPrice }: ServiceSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteConfig.url}${url}`,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Brazil",
    },
    ...(minPrice && {
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: minPrice,
          priceCurrency: "BRL",
          minPrice,
        },
        availability: "https://schema.org/InStock",
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
