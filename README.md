# mlluizdevtech — Portfólio

Site de Marcelo Luiz com foco em sistemas, automações e integrações. Interface editorial clara, navegação responsiva e contato direto por WhatsApp e e-mail.

## Desenvolvimento

```sh
npm ci
npm run dev
```

## Validação e produção

```sh
npm run build
npm run preview
```

O build verifica TypeScript e gera o site em `dist/`.

## Estrutura ativa

- `src/App.tsx`: apresentação, projetos em destaque, serviços, GitHub, sobre e contato.
- `src/components/ui/liquid-sculpture-hero.tsx`: hero com capas de projeto em WebGL, troca por índice e fallback estático.
- `src/components/ui/tilted-grid-hero.tsx`: vitrine curva em 3D, com capas clicáveis, selo de projeto de empresa e carregamento adiado.
- `src/data/projects.ts`: dados e links dos quatro projetos do hero e dos cinco projetos da vitrine.
- `src/index.css`: identidade visual e regras responsivas.
- `index.html`: metadados, fontes e dados estruturados.
- `public/projects/`: capas dos projetos em desktop e mobile.
- `public/projects/showcase/`: capas 16:9 da vitrine, em versões de 800×450 para o carrossel.
- `public/llms*.txt`: informações públicas alinhadas ao site.

React 19, TypeScript e Vite. A interface usa rolagem nativa, foco visível, link para pular ao conteúdo e suporte a movimento reduzido. O hero carrega a capa estática primeiro e só então ativa o WebGL; sem WebGL2, a capa permanece. Os índices 01–04 trocam o projeto sem recriar o contexto gráfico. Os frames e a escultura da versão cinematográfica anterior foram removidos do repositório; o histórico do Git preserva o material.

## Conteúdo

Os antigos AgroTrack, Krypton Pay, OmniLog e ClinicOS eram exemplos e não são apresentados como trabalhos reais. O hero apresenta quatro projetos reais — Cloudflare Tunnel Manager, ConectaCRM, voice-typer e OpenPass API — com link para cada repositório. A vitrine de trabalhos apresenta cinco projetos; Cloudflare Tunnel Manager, ConectaCRM e OpenPass API abrem o repositório público pela capa. Cowork-lite e Ditavo são projetos de empresa e aparecem apenas com a capa e o aviso de que o código não pode ser compartilhado por confidencialidade e LGPD. O contato usa WhatsApp no número (11) 95964-6307 e `mailto:`, sem simular envio de formulário.

- GitHub: https://github.com/Mlluiz39
- E-mail: mlluizpereira39@gmail.com

## Lighthouse no mobile

Use o **build de produção** para medir desempenho:

```sh
npm run build
npm run preview
```

Abra `http://localhost:4173` e execute o Lighthouse no modo Mobile. A porta
`5173` serve o ambiente de desenvolvimento, com React de desenvolvimento,
HMR e módulos sem minificação; sua nota não representa o site publicado.
O preview usa uma porta própria e falha se ela estiver ocupada, evitando
medir outro servidor sem perceber.

As fontes DM Sans e Instrument Serif são servidas pelo próprio site, em WOFF2
com preload, sem requisições ao Google Fonts. O conteúdo da primeira tela
aparece sem aguardar animações de entrada; as demais seções mantêm suas
animações.
