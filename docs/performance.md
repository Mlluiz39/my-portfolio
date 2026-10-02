# Medição de desempenho — 2 de outubro de 2026

Comparação com o commit `350f7bd`, que já contém o carregamento sob demanda dos frames.
Resultados locais de uma build de produção, com três execuções por cenário e cache desativado.
Os valores abaixo são as medianas das três execuções.

| Medida | Antes | Depois |
| --- | ---: | ---: |
| Rolagem no desktop | 23,4 FPS | 56,8 FPS |
| Rolagem no celular simulado | 43,2 FPS | 57,5 FPS |
| Primeiro desenho do fundo no celular simulado | 1,85 s | 1,40 s |
| Primeiro desenho do fundo no desktop | 0,375 s | 0,369 s |
| Nove frames iniciais no celular | 503.105 bytes | 180.382 bytes |
| Sequência completa de imagens para celular | 10.223.440 bytes | 7.316.600 bytes |

## Causa e alterações

O teste de isolamento dos filtros de fundo elevou a rolagem de aproximadamente 22 para 55 FPS.
Os filtros `backdrop-blur` das quatro seções grandes, dos dois painéis de IA e do cabeçalho
rolado foram removidos. Os painéis de IA e o cabeçalho ganharam fundos mais opacos para manter
a legibilidade. Os efeitos menores de botões e badges foram preservados.

Telas com largura inicial de até 767 pixels usam frames WebP em 768×432, qualidade 55.
O desktop mantém os JPG originais de 1280×720: a conversão indiscriminada para WebP aumentava
o peso de parte das imagens. O primeiro frame de cada versão tem preload condicionado ao
mesmo breakpoint usado pelo canvas, iniciando seu download antes da execução do React.

## Método e limites

- Desktop: viewport 1440×900, DPR 1, sem limitação de rede ou CPU.
- Celular simulado: viewport 390×844, DPR 2, CPU quatro vezes mais lenta, latência de 100 ms,
  download de 200.000 bytes/s (aproximadamente 1,6 Mbps).
- Navegação em contexto novo do Chromium, sem cache, usando `vite preview` na porta 5180.
- O primeiro desenho foi registrado interceptando `CanvasRenderingContext2D.drawImage`.
- A rolagem percorreu a página inteira em quatro segundos, usando `scrollTo` a cada
  `requestAnimationFrame`; FPS representa a cadência desses callbacks, e não quantos frames
  distintos da sequência já foram baixados. Em rede lenta, o fundo pode repetir o frame
  disponível mais próximo enquanto o próximo carrega.
- Esses resultados medem uma simulação local; dispositivos reais e a hospedagem podem variar.
  Não se trata de uma auditoria completa de Core Web Vitals. O ganho na abertura do desktop
  foi pequeno; o ganho claro está na fluidez e na abertura do fundo no celular.

As amostras completas estão em [performance-results.json](performance-results.json).

## Validação e manutenção

`npm test` executa seis testes de carregamento, concorrência, descarte e seleção de assets
para celular. `npm run build` valida TypeScript e gera a versão de produção. Foram verificadas
a navegação até o portfólio e a troca de case no desktop e no celular, sem erros JavaScript
ou overflow horizontal. Os frames 1, 150 e 300 também foram comparados visualmente.

Ao substituir os JPG originais, regenere os assets móveis antes da build. Com Python e Pillow:

```sh
python3 scripts/optimize-mobile-frames.py
npm test
npm run build
```

Os WebP gerados ficam versionados em `public/frames/mobile`, portanto a build normal não
depende de Python ou Pillow.
