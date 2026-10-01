import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { MotionProvider } from '@/components/motion-provider'
import { LocalBusinessJsonLd, WebSiteJsonLd, FAQPageJsonLd } from '@/components/json-ld'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mlluizdevtech.com.br'),
  title: {
    default: 'mlluizdevtech | Software House com IA e Automação — MVP em 30 dias',
    template: '%s | mlluizdevtech',
  },
  description: 'Software house brasileira que usa IA e automação para criar sistemas web, apps mobile e automações até 40% mais rápido. MVP em 30 dias, preço justo. React, Next.js, Node.js, React Native.',
  keywords: [
    'software house',
    'software house brasil',
    'desenvolvimento de sistemas',
    'desenvolvimento web',
    'desenvolvimento de aplicativos',
    'automação com IA',
    'inteligência artificial',
    'MVP startup',
    'aplicativo mobile',
    'React Native',
    'Next.js',
    'Node.js',
    'software sob medida',
    'sistema web personalizado',
    'chatbot IA',
    'SaaS desenvolvimento',
    'software house barata',
    'desenvolvedor freelancer brasil',
    'criar aplicativo',
    'criar site profissional',
    'mlluizdevtech',
  ],
  authors: [{ name: 'mlluizdevtech', url: 'https://mlluizdevtech.com.br' }],
  creator: 'mlluizdevtech',
  publisher: 'mlluizdevtech',
  generator: 'Next.js',
  category: 'Technology',
  classification: 'Software Development',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'mlluizdevtech',
    title: 'mlluizdevtech | Software House com IA e Automação',
    description: 'Software house brasileira que usa IA para entregar sistemas em metade do tempo. Sistemas web, apps mobile, automação com IA. MVP em 30 dias.',
    url: 'https://mlluizdevtech.com.br',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'mlluizdevtech - Software House com IA e Automação',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mlluizdevtech | Software House com IA e Automação',
    description: 'Software house que usa IA para entregar sistemas em metade do tempo. MVP em 30 dias.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mlluizdevtech.com.br',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1317' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Pular para o conteúdo principal
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionProvider>
            <LocalBusinessJsonLd />
            <WebSiteJsonLd />
            <FAQPageJsonLd />
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
