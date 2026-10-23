'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export type PortfolioStationId = 'cabinet' | 'engine' | 'admin' | 'storefront' | 'cashdesk'

export type PortfolioFactory3DProps = {
  height?: number | string
  className?: string
  onStationSelect?: (id: PortfolioStationId) => void
  activeStation?: PortfolioStationId | null
  onOpenInquiry?: () => void
  isPaused?: boolean
}

export default function PortfolioFactory3D({
  height = '100vh',
  className,
  onStationSelect,
  activeStation,
  onOpenInquiry,
  isPaused = false,
}: PortfolioFactory3DProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const handlers = useRef({ onStationSelect })

  useEffect(() => {
    handlers.current = { onStationSelect }
  }, [onStationSelect])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let dispose: (() => void) | undefined
    let cancelled = false

    document.fonts.ready.then(() => {
      if (cancelled) return
      dispose = initPortfolioMachine(root, getComputedStyle(root).fontFamily, {
        onStation: (id) => handlers.current.onStationSelect?.(id),
      })
    })

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [])

  // Sync external station focus with 3D camera
  useEffect(() => {
    if (activeStation && window.__portfolioMachine) {
      window.__portfolioMachine.focusStation(activeStation)
    }
  }, [activeStation])

  // Pause / Resume animation when tab or view changes
  useEffect(() => {
    if (window.__portfolioMachine) {
      if (isPaused) {
        window.__portfolioMachine.pause()
      } else {
        window.__portfolioMachine.play()
      }
    }
  }, [isPaused])

  return (
    <div
      ref={rootRef}
      className={['portfolio-factory-3d', className].filter(Boolean).join(' ')}
      style={{ height }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        id="scene"
        role="img"
        aria-label="Fábrica 3D Interativa MLLUIZ: Demandas, Engenharia, Serviços, Portfólio e Contratação."
      />
      <div className="vignette" />

      {/* Top Branding & Status */}
      <header className="topbar">
        <div className="identity">
          <div className="mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <strong>MLLUIZ · DEV & IA</strong>
            <small className="hidden sm:block">Fábrica de Software & Sistemas Inteligentes</small>
            <small className="sm:hidden">Software & IA</small>
          </div>
        </div>
        <div className="status" id="status">
          <i />
          <span id="status-text" className="hidden sm:inline">Pipeline Ativo</span>
          <span className="hidden sm:inline">DISPONÍVEL</span>
          <span className="sm:hidden">ONLINE</span>
        </div>
      </header>

      {/* Section Sub-heading (Desktop only) */}
      <div className="scene-heading hidden md:flex">
        Engenharia Digital de Alto Impacto <span className="index">5 MÓDULOS · 1 SISTEMA</span>
      </div>
      <div className="coordinates hidden lg:block">DO CONCEITO AO FATURAMENTO — 2026</div>

      {/* Journey Step (Visible in One-Order mode) */}
      <div id="journey">
        <div className="journey-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div>
          <strong id="journey-title">01. Nova Demanda</strong>
          <small id="journey-detail">Briefing e modelagem de arquitetura com o cliente</small>
        </div>
        <div className="track">
          <i id="journey-progress" />
        </div>
      </div>

      <div id="labels" />
      <div id="tooltip" role="tooltip">
        <strong />
        <p />
      </div>

      {/* Camera & Modes Navigation HUD */}
      <div className="controls">
        <nav className="mode-bar" aria-label="Modo da Máquina">
          <button data-mode="assembled" aria-pressed="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5l6 3.3v6.4l-6 3.3-6-3.3V4.8L8 1.5zM2 4.8l6 3.4 6-3.4M8 8.2v6.3"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Visão Geral</span>
            <span className="sm:hidden">Geral</span>
          </button>
          <button data-mode="stations" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5l6 3-6 3-6-3 6-3zM2 8l6 3 6-3M2 11.5l6 3 6-3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Estações
          </button>
          <button data-mode="cutaway" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M3 2h10v12H3zM8 2v12M10.5 4l2.5 2.5m-2.5 0L13 9m-2.5 0 2.5 2.5"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
            Mecânica
          </button>
          <button data-mode="order" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M5 2.5l8 5.5-8 5.5v-11z" stroke="currentColor" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Ciclo de Entrega</span>
            <span className="sm:hidden">Fluxo</span>
          </button>
        </nav>

        <nav className="camera-row" aria-label="Câmera">
          <span className="caption hidden sm:inline">CÂMERA</span>
          <button data-camera="overview" aria-pressed="true">
            Geral
          </button>
          <button data-camera="side" aria-pressed="false">
            Lateral
          </button>
          <button data-camera="top" aria-pressed="false">
            Topo
          </button>
          <button data-camera="station" aria-pressed="false">
            Módulo
          </button>
          <button data-camera="flight" aria-pressed="false">
            Órbita
          </button>
          <span className="divider" />
          <button id="play" aria-label="Pausar animação" aria-pressed="false">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="1" width="2.5" height="10" rx=".5" />
              <rect x="7.5" y="1" width="2.5" height="10" rx=".5" />
            </svg>
          </button>
        </nav>
      </div>

      {/* Footer Info */}
      <footer className="footer">
        <div className="wordmark">
          mlluiz.dev · <span>Sistemas Full-Stack & IA</span>
        </div>
        <span className="footer-center hidden md:inline">ENGENHARIA ORIENTADA A RESULTADOS</span>
        <span className="hint">
          <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
            <rect x="2" y="1" width="9" height="14" rx="4.5" stroke="currentColor" />
            <path d="M6.5 4v3" stroke="currentColor" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">Arraste para girar · Clique nos módulos para inspecionar</span>
          <span className="sm:hidden">Gire e toque nos módulos</span>
        </span>
      </footer>

      <div id="loading">
        <i />
        <span>Inicializando ambiente 3D...</span>
      </div>

      <div id="error" role="alert">
        <strong>WebGL indisponível</strong>
        <p>Ative aceleração de hardware no seu navegador para ver a experiência 3D.</p>
        <button onClick={() => location.reload()}>Recarregar</button>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    __portfolioMachine?: {
      setMode: (name: string) => boolean
      focusStation: (id: string) => boolean
      setCamera: (name: string) => boolean
      play: () => boolean
      pause: () => boolean
    }
  }
}

type StationDef = {
  id: PortfolioStationId
  name: string
  step: number
  output: string
  pos: [number, number, number]
  desc: string
  sublabel: string
}

function initPortfolioMachine(
  root: HTMLElement,
  fontFamily: string,
  options: { onStation?: (id: PortfolioStationId) => void }
): () => void {
  const cleanups: Array<() => void> = []
  const frameWidth = () => root.clientWidth || window.innerWidth
  const frameHeight = () => root.clientHeight || window.innerHeight

  const listen = (target: EventTarget, type: string, handler: (event: never) => void) => {
    const fn = handler as unknown as EventListener
    target.addEventListener(type, fn, { passive: type === 'touchstart' || type === 'touchmove' ? true : undefined })
    cleanups.push(() => target.removeEventListener(type, fn))
  }

  function $<T extends HTMLElement = HTMLElement>(id: string): T {
    const el = root.querySelector<T>(`#${id}`)
    if (!el) throw new Error(`Missing element #${id}`)
    return el
  }

  function showError(msg?: string) {
    const loadEl = root.querySelector('#loading')
    const errEl = root.querySelector<HTMLElement>('#error')
    if (loadEl) loadEl.classList.add('done')
    if (errEl) {
      errEl.style.display = 'block'
      if (msg) errEl.querySelector('p')!.textContent = msg
    }
  }

  try {
    const TAU = Math.PI * 2
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const palette = { amber: 0xff7a1a, white: 0xf4f1ea, dark: 0x171b21, steel: 0x59616b }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(33, frameWidth() / frameHeight(), 0.1, 150)
    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch (e) {
      showError('WebGL não suportado pelo navegador.')
      throw e
    }

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(devicePixelRatio, frameWidth() < 900 ? 1.5 : 1.75))
    renderer.setSize(frameWidth(), frameHeight())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.localClippingEnabled = true

    $('scene').appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.065
    controls.enablePan = false
    controls.minDistance = 6
    controls.maxDistance = 65
    controls.minPolarAngle = 0.08
    controls.maxPolarAngle = Math.PI * 0.48
    controls.rotateSpeed = frameWidth() < 768 ? 0.6 : 0.48
    controls.zoomSpeed = 0.7
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    }

    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    scene.environment = env.texture
    scene.environmentIntensity = 0.65
    room.dispose()
    pmrem.dispose()

    scene.add(new THREE.HemisphereLight(0xdbe5f4, 0x29211a, 2.1))
    const key = new THREE.DirectionalLight(0xfff1d8, 4.2)
    key.position.set(-4, 12, 7)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    key.shadow.normalBias = 0.035
    scene.add(key)

    const rim = new THREE.DirectionalLight(0xc4d4ed, 3.1)
    rim.position.set(3, 7, -8)
    scene.add(rim)

    const warm = new THREE.PointLight(0xffbd42, 28, 20, 2)
    warm.position.set(-4, 5, 3)
    scene.add(warm)

    const mat = (
      color: number,
      metalness = 0.1,
      roughness = 0.4,
      extra: THREE.MeshStandardMaterialParameters = {}
    ) => new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra })

    const M = {
      body: mat(0x30363f, 0.75, 0.29),
      base: mat(0x292f37, 0.85, 0.32),
      edge: mat(0x707986, 0.85, 0.24),
      chrome: mat(0xc3cad0, 0.92, 0.18),
      dark: mat(0x12171d, 0.45, 0.38),
      amber: mat(palette.amber, 0.52, 0.28),
      ivory: mat(0xe0ded4, 0.48, 0.26),
      copper: mat(0xc57e45, 0.85, 0.3),
      light: mat(0xff7a1a, 0.2, 0.25, { emissive: 0xff7a1a, emissiveIntensity: 1.6 }),
      green: mat(0xc6d9a1, 0.1, 0.3, { emissive: 0x91b364, emissiveIntensity: 0.7 }),
    }

    const geometries = new Map<string, THREE.BufferGeometry>()
    function boxGeo(w: number, h: number, d: number, r = 0.04) {
      const k = `b${w},${h},${d},${r}`
      if (!geometries.has(k)) {
        geometries.set(
          k,
          r ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 3, h / 3, d / 3)) : new THREE.BoxGeometry(w, h, d)
        )
      }
      return geometries.get(k)!
    }

    function box(
      parent: THREE.Object3D,
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      m: THREE.Material = M.body,
      r = 0.04
    ) {
      const o = new THREE.Mesh(boxGeo(w, h, d, r), m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }

    function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) {
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')!
      draw(ctx, w, h)
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
      return { texture: t, canvas: c, ctx }
    }

    function print(
      ctx: CanvasRenderingContext2D,
      txt: string,
      x: number,
      y: number,
      size = 20,
      color = '#f4f1ea',
      weight = 500
    ) {
      ctx.fillStyle = color
      ctx.font = `${weight} ${size}px ${fontFamily}`
      ctx.fillText(txt, x, y)
    }

    function screen(
      parent: THREE.Object3D,
      w: number,
      h: number,
      x: number,
      y: number,
      z: number,
      tex: THREE.Texture | { texture: THREE.Texture }
    ) {
      const map = 'texture' in tex ? tex.texture : tex
      const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map, toneMapped: false }))
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }

    const machine = new THREE.Group()
    scene.add(machine)

    // Floor shadow
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(70, 70), new THREE.ShadowMaterial({ opacity: 0.25 }))
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.43
    floor.receiveShadow = true
    scene.add(floor)

    // Chassis
    box(machine, 12.8, 0.38, 8.25, 0, -0.09, 0, M.base, 0.17)
    box(machine, 12.6, 0.055, 8.08, 0, 0.13, 0, M.edge, 0.11)
    box(machine, 12.49, 0.09, 7.96, 0, 0.19, 0, M.body, 0.1)

    // Engraved Nomenclature Plate: MLLUIZ IDENTITY
    const engraving = canvasTexture(1536, 176, (c, w, h) => {
      c.fillStyle = '#1c2127'
      c.fillRect(0, 0, w, h)
      c.strokeStyle = '#ff7a1a44'
      c.lineWidth = 2
      c.strokeRect(2, 2, w - 4, h - 4)
      print(c, 'MLLUIZ DEV TECH', 45, 78, 42, '#f4f1ea', 700)
      print(c, '·  full-stack  ·  sistemas  ·  agentes de IA', 420, 78, 32, '#ffaa44', 500)
      print(c, 'ENGENHARIA ORIENTADA A ROI    /    PRODUÇÃO 2026', 47, 134, 18, '#88919b', 600)
      print(c, 'SÉRIE 01', 1370, 130, 23, '#ff7a1a')
    })
    const plate = screen(machine, 7.35, 0.84, -0.4, 0.25, 3.51, engraving)
    plate.rotation.x = -Math.PI / 2

    // 5 Stations Definition
    const definitions: StationDef[] = [
      {
        id: 'cabinet',
        name: 'Demandas',
        step: 1,
        output: 'Briefing',
        pos: [4.03, 0.29, 0.12],
        desc: 'Ingestão de requisitos, modelo de dados e alinhamento com seu negócio.',
        sublabel: 'Briefing · Clientes',
      },
      {
        id: 'engine',
        name: 'Core & IA',
        step: 2,
        output: 'Código',
        pos: [-4.15, 0.29, -0.65],
        desc: 'Next.js 15, React 19, Python, microsserviços e integração profunda com LLMs.',
        sublabel: 'Arquitetura · Código',
      },
      {
        id: 'admin',
        name: 'Serviços',
        step: 3,
        output: 'Sistemas',
        pos: [-1.65, 0.29, -2.03],
        desc: 'SaaS, aplicativos móveis, integrações de webhook e automações sem atrito.',
        sublabel: 'Soluções · Fila',
      },
      {
        id: 'storefront',
        name: 'Portfólio',
        step: 4,
        output: 'Casos Reais',
        pos: [1.5, 0.29, -2.08],
        desc: 'Projetos reais em produção: AgroTrack, Krypton Pay e plataformas de escala.',
        sublabel: 'Vitrine · Cases',
      },
      {
        id: 'cashdesk',
        name: 'Fechamento',
        step: 5,
        output: 'Faturamento',
        pos: [0.93, 0.29, 1.85],
        desc: 'Contratação, cronograma garantido, recibo e lançamento do seu MVP no ar.',
        sublabel: 'Proposta · Contrato',
      },
    ]

    const stations: Array<StationDef & {
      group: THREE.Group
      base: THREE.Vector3
      glowMat: THREE.MeshStandardMaterial
      label: HTMLDivElement
      index: number
      anchor: THREE.Vector3
    }> = []

    const cutPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10)

    definitions.forEach((d, i) => {
      const group = new THREE.Group()
      group.position.fromArray(d.pos)
      machine.add(group)

      const glowMat = M.light.clone()
      glowMat.emissiveIntensity = 0.5
      box(group, 2.05, 0.12, 1.78, 0, 0.03, 0, M.dark, 0.1)
      box(group, 1.97, 0.03, 1.7, 0, 0.12, 0, glowMat, 0.09)
      box(group, 2.03, 0.17, 1.75, 0, 0.215, 0, M.body, 0.1)

      const plaque = canvasTexture(512, 116, (c, w, h) => {
        c.fillStyle = '#151a20'
        c.fillRect(0, 0, w, h)
        print(c, String(i + 1).padStart(2, '0'), 24, 76, 42, '#ff7a1a', 700)
        print(c, d.name.toUpperCase(), 111, 73, 34, '#e6e8dc', 600)
      })
      screen(group, 1.54, 0.345, 0, 0.27, 0.891, plaque)

      const label = document.createElement('div')
      label.className = 'station-label'
      label.innerHTML = `
        <div class="stem"></div>
        <div class="label-card">
          <div class="label-title"><span>${String(i + 1).padStart(2, '0')}</span>${d.name}</div>
          <div class="label-meta">${d.sublabel} · Passo ${d.step}</div>
        </div>
      `
      $('labels').appendChild(label)
      cleanups.push(() => label.remove())

      stations.push({
        ...d,
        group,
        base: new THREE.Vector3(...d.pos),
        glowMat,
        label,
        index: i,
        anchor: new THREE.Vector3(0, 2.5, 0),
      })
    })

    // Station 1: CABINET (Demandas)
    const cabinet = stations.find((s) => s.id === 'cabinet')!.group
    box(cabinet, 1.75, 1.77, 1.02, 0, 1.24, -0.13, M.body, 0.12)
    box(cabinet, 1.58, 0.13, 1.09, 0, 2.16, -0.13, M.amber, 0.04)

    const demandTex = canvasTexture(480, 460, (c, w, h) => {
      c.fillStyle = '#12181f'
      c.fillRect(0, 0, w, h)
      print(c, 'PIPELINE DE DEMANDAS', 25, 48, 24, '#e8e8d8', 700)
      print(c, 'Projetos Recentes & Ingestão', 25, 78, 15, '#ffaa44', 500)
      const clients = [
        { name: 'AgroTrack', tag: 'Telemetria & IA' },
        { name: 'Krypton Pay', tag: 'Fintech & PIX' },
        { name: 'HealthSync', tag: 'Gestão Clínica' },
      ]
      clients.forEach((item, idx) => {
        const y = 108 + idx * 102
        c.fillStyle = '#1e2631'
        c.beginPath()
        c.roundRect(20, y, 440, 84, 8)
        c.fill()
        c.fillStyle = '#ff7a1a'
        c.beginPath()
        c.arc(56, y + 42, 18, 0, TAU)
        c.fill()
        print(c, item.name[0], 48, y + 49, 19, '#111', 700)
        print(c, item.name, 90, y + 36, 22, '#fff', 600)
        print(c, item.tag, 90, y + 62, 14, '#9ca3af', 500)
        print(c, '↗', 416, y + 50, 24, '#ff7a1a')
      })
    })
    screen(cabinet, 1.31, 1.255, 0, 1.37, 0.44, demandTex)

    // Station 2: ENGINE (Core & IA)
    const engine = stations.find((s) => s.id === 'engine')!.group
    box(engine, 1.74, 0.62, 1.33, 0, 0.65, -0.05, M.ivory, 0.13)
    box(engine, 1.82, 0.27, 0.4, 0, 2.28, -0.35, M.amber, 0.045)

    const techTex = canvasTexture(384, 640, (c, w, h) => {
      c.fillStyle = '#1a202c'
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#ff7a1a'
      c.fillRect(0, 0, w, 110)
      print(c, 'MLLUIZ CORE', 24, 52, 26, '#111827', 750)
      print(c, 'ARQUITETURA & IA', 24, 86, 20, '#1f2937', 600)
      print(c, 'STACK TECNOLÓGICA:', 24, 155, 17, '#ffaa44', 600)
      const stack = ['Next.js 15 & React 19', 'TypeScript Estrito', 'Python / FastAPI', 'PostgreSQL / Prisma', 'LLMs & Modelos de IA', 'Docker & CI/CD']
      stack.forEach((st, i) => {
        c.fillStyle = '#2d3748'
        c.fillRect(24, 178 + i * 50, 336, 36)
        print(c, `✓ ${st}`, 36, 202 + i * 50, 15, '#e2e8f0', 500)
      })
      c.fillStyle = '#ff7a1a'
      c.fillRect(24, 520, 336, 70)
      print(c, '3.5x MAIS RÁPIDO', 48, 550, 20, '#111', 750)
      print(c, 'Sem caixas pretas.', 48, 574, 14, '#111', 500)
    })
    screen(engine, 0.56, 0.98, 0, 1.36, 0.641, techTex)

    // Station 3: ADMIN (Serviços)
    const admin = stations.find((s) => s.id === 'admin')!.group
    box(admin, 1.9, 0.66, 1.36, 0, 0.67, -0.04, M.body, 0.11)
    const consoleTop = new THREE.Group()
    consoleTop.position.set(0, 1.01, -0.08)
    consoleTop.rotation.x = -0.32
    admin.add(consoleTop)

    const servicesTex = canvasTexture(640, 340, (c) => {
      c.fillStyle = '#0f172a'
      c.fillRect(0, 0, 640, 340)
      print(c, 'CATÁLOGO DE SERVIÇOS', 25, 45, 22, '#cbd5e1', 700)
      print(c, 'STATUS: ATIVO', 495, 45, 17, '#ff7a1a', 600)
      const srvs = [
        { t: 'Websites & SaaS de Alta Performance', s: 'SUB-1S LOAD' },
        { t: 'Aplicativos Mobile iOS & Android', s: 'OFFLINE-FIRST' },
        { t: 'Automação & Agentes com IA', s: 'PRODUÇÃO 24/7' },
      ]
      srvs.forEach((srv, i) => {
        const y = 74 + i * 78
        c.fillStyle = '#1e293b'
        c.beginPath()
        c.roundRect(20, y, 600, 64, 6)
        c.fill()
        c.fillStyle = '#ff7a1a'
        c.fillRect(34, y + 12, 10, 40)
        print(c, srv.t, 58, y + 36, 19, '#f8fafc', 600)
        print(c, srv.s, 58, y + 54, 12, '#94a3b8', 500)
        print(c, 'ONLINE', 525, y + 40, 15, '#10b981', 600)
      })
    })
    const qs = screen(consoleTop, 1.53, 0.79, 0, 0.067, -0.17, servicesTex)
    qs.rotation.x = -Math.PI / 2

    // Station 4: STOREFRONT (Portfólio)
    const storefront = stations.find((s) => s.id === 'storefront')!.group
    box(storefront, 2.42, 1.72, 0.2, 0, 1.94, -0.17, M.ivory, 0.08)
    box(storefront, 2.28, 1.59, 0.1, 0, 1.94, -0.044, M.dark, 0.045)

    const showcaseTex = canvasTexture(896, 592, (c, w, h) => {
      c.fillStyle = '#0f172a'
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#1e293b'
      c.fillRect(0, 0, w, 56)
      print(c, 'PORTFÓLIO · CASOS REAIS', 33, 98, 24, '#f8fafc', 700)
      print(c, 'AgroTrack    Krypton    HealthSync', 510, 96, 16, '#94a3b8')

      c.fillStyle = '#1e293b'
      c.beginPath()
      c.roundRect(32, 130, 832, 410, 12)
      c.fill()
      c.fillStyle = '#ff7a1a'
      c.fillRect(52, 155, 300, 360)
      print(c, 'AGROTRACK', 70, 210, 32, '#111', 800)
      print(c, 'TELEMETRIA & IA', 70, 245, 20, '#111', 600)
      print(c, '+34% Produtividade', 70, 460, 22, '#111', 700)
      print(c, '120k hectares', 70, 485, 18, '#222', 500)

      print(c, 'Krypton Pay & Billing', 380, 200, 28, '#f8fafc', 700)
      print(c, 'R$ 48M transacionados/mês', 380, 238, 20, '#ffaa44', 600)
      print(c, 'Integração PIX sub-650ms,', 380, 290, 18, '#94a3b8')
      print(c, 'conciliação 100% automática.', 380, 318, 18, '#94a3b8')

      c.fillStyle = '#ff7a1a'
      c.beginPath()
      c.roundRect(380, 420, 260, 56, 8)
      c.fill()
      print(c, 'Ver Detalhes do Case  ↗', 405, 456, 18, '#111', 700)
    })
    screen(storefront, 2.16, 1.43, 0, 1.95, 0.011, showcaseTex)

    // Station 5: CASHDESK (Fechamento)
    const cashdesk = stations.find((s) => s.id === 'cashdesk')!.group
    box(cashdesk, 1.91, 0.63, 1.32, 0, 0.65, -0.06, M.ivory, 0.12)
    box(cashdesk, 1.13, 0.46, 0.19, -0.35, 1.98, -0.56, M.body, 0.045)

    const cashTex = canvasTexture(512, 176, (c) => {
      c.fillStyle = '#064e3b'
      c.fillRect(0, 0, 512, 176)
      print(c, 'PROJETO APROVADO', 24, 48, 22, '#a7f3d0', 600)
      print(c, 'DISPONÍVEL AGORA', 26, 130, 56, '#f0fdf4', 800)
    })
    screen(cashdesk, 1.015, 0.349, -0.35, 1.98, -0.459, cashTex)

    const receipt = new THREE.Group()
    receipt.position.set(0.59, 1.37, -0.1)
    receipt.userData.moving = true
    cashdesk.add(receipt)

    const receiptTex = canvasTexture(280, 540, (c) => {
      c.fillStyle = '#f8fafc'
      c.fillRect(0, 0, 280, 540)
      print(c, 'MLLUIZ DEV TECH', 24, 50, 22, '#0f172a', 700)
      print(c, 'PROPOSTA & CONTRATO', 24, 82, 16, '#64748b', 600)
      c.strokeStyle = '#cbd5e1'
      c.setLineDash([4, 4])
      c.beginPath()
      c.moveTo(20, 110)
      c.lineTo(260, 110)
      c.stroke()
      print(c, '• MVP em 30 dias', 24, 150, 18, '#0f172a', 600)
      print(c, '• Garantia de Código', 24, 185, 18, '#0f172a', 600)
      print(c, '• Automações de IA', 24, 220, 18, '#0f172a', 600)
      print(c, 'STATUS: PRONTO', 24, 280, 24, '#ff7a1a', 750)
      print(c, 'Clique p/ iniciar!', 24, 320, 17, '#0f172a', 500)
      print(c, 'mlluiz.dev', 80, 495, 17, '#64748b')
    })
    const rp = screen(receipt, 0.41, 0.83, 0, 0.415, 0.01, receiptTex)
    rp.material.side = THREE.DoubleSide

    // Conveyor Belt Spline
    const path = new THREE.CatmullRomCurve3(
      [
        [-3.95, 0.84, 0.65],
        [-3.1, 0.84, -0.12],
        [-1.45, 0.84, -0.79],
        [1.32, 0.84, -0.8],
        [3.3, 0.84, 0.19],
        [3.43, 0.84, 1.21],
        [1.35, 0.84, 2.7],
        [-1.4, 0.84, 2.52],
        [-3.54, 0.84, 1.65],
      ].map((p) => new THREE.Vector3(...p)),
      true,
      'catmullrom',
      0.25
    )

    const belt = new THREE.Group()
    machine.add(belt)
    const beltCount = 148
    const beltSlats = new THREE.InstancedMesh(boxGeo(0.135, 0.065, 0.63, 0.012), M.body, beltCount)
    belt.add(beltSlats)

    const dummy = new THREE.Object3D()
    const pVec = new THREE.Vector3()
    const tVec = new THREE.Vector3()

    function updateBelt(t: number) {
      for (let i = 0; i < beltCount; i++) {
        const u = (i / beltCount + t * 0.012) % 1
        path.getPointAt(u, pVec)
        path.getTangentAt(u, tVec)
        dummy.position.copy(pVec)
        dummy.rotation.set(0, -Math.atan2(tVec.z, tVec.x), 0)
        dummy.updateMatrix()
        beltSlats.setMatrixAt(i, dummy.matrix)
      }
      beltSlats.instanceMatrix.needsUpdate = true
    }

    compact(machine)

    stations.forEach((s) => {
      s.group.traverse((o) => {
        o.userData.station = s.id
      })
    })

    const pickables = stations.map((s) => s.group)

    let mode = 'assembled'
    let cameraMode = 'overview'
    let playing = !reduceMotion
    let simTime = 0
    let spread = 0
    let selected = 'cabinet'
    let hovered: string | null = null

    let width = frameWidth()
    let height = frameHeight()
    let mobile = width <= 900
    let lastInteraction = performance.now()
    let dragging = false
    let wasDragged = false
    let downX = 0
    let downY = 0
    let cameraAnimating = true
    let flightTime = 0

    const desiredPosition = new THREE.Vector3()
    const desiredTarget = new THREE.Vector3(0, 1, 0)
    const viewDirection = new THREE.Vector3(10.5, 10.8, 17).normalize()
    let baseDistance = 25

    // MOBILE CAMERA FIT FORMULA: dynamically computes distance so the 16.5-unit machine always fits in portrait!
    function layoutCamera() {
      if (!frameWidth() || !frameHeight()) return
      width = frameWidth()
      height = frameHeight()
      mobile = width <= 900
      renderer.setSize(width, height)
      camera.aspect = width / height

      const aspect = width / height
      const vFovRad = THREE.MathUtils.degToRad(camera.fov / 2)
      // Horizontal fit ensures the entire width fits across the phone screen:
      const hFit = 16.2 / (2 * Math.tan(vFovRad) * aspect)
      const vFit = 11.2 / (2 * Math.tan(vFovRad))
      baseDistance = Math.max(hFit, vFit) * (mobile ? 1.05 : 1.0)
      controls.maxDistance = Math.max(70, baseDistance * 1.8)

      camera.updateProjectionMatrix()
      setCameraGoal()
      cameraAnimating = true
    }

    function setCameraGoal() {
      const expand = mode === 'stations' ? 1.2 : 1
      if (cameraMode === 'station') {
        const s = stations.find((st) => st.id === selected)!
        desiredTarget.copy(s.group.position).add(new THREE.Vector3(0, 1.25, 0))
        desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 11 : 12)
      } else {
        desiredTarget.set(0, 1, 0)
        const distance = baseDistance * expand
        if (cameraMode === 'side') {
          desiredPosition.set(13, 5, 20).normalize().multiplyScalar(distance).add(desiredTarget)
        } else if (cameraMode === 'top') {
          desiredPosition.set(0.01, distance, 0.8).add(desiredTarget)
        } else {
          desiredPosition.copy(viewDirection).multiplyScalar(distance).add(desiredTarget)
        }
      }
    }

    function syncButtons() {
      root.querySelectorAll<HTMLElement>('[data-mode]').forEach((b) => {
        b.setAttribute('aria-pressed', String(b.dataset.mode === mode))
      })
      root.querySelectorAll<HTMLElement>('[data-camera]').forEach((b) => {
        b.setAttribute('aria-pressed', String(b.dataset.camera === cameraMode))
      })
      $('journey').classList.toggle('visible', mode === 'order')
    }

    function setMode(name: string) {
      mode = name
      lastInteraction = performance.now()
      if (mode === 'order') {
        simTime = 0
        play()
        cameraMode = 'overview'
      } else if (cameraMode === 'station') {
        cameraMode = 'overview'
      }
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }

    function focusStation(id: string) {
      const s = stations.find((st) => st.id === id)
      if (!s) return false
      selected = id
      if (mode === 'order') mode = 'assembled'
      cameraMode = 'station'
      lastInteraction = performance.now()
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }

    function setCamera(name: string) {
      cameraMode = name
      if (mode === 'order') mode = 'assembled'
      lastInteraction = performance.now()
      flightTime = 0
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }

    function play() {
      playing = true
      const stEl = root.querySelector('#status')
      const txtEl = root.querySelector('#status-text')
      if (stEl) stEl.classList.remove('paused')
      if (txtEl) txtEl.textContent = 'Pipeline Ativo'
      return true
    }

    function pause() {
      playing = false
      const stEl = root.querySelector('#status')
      const txtEl = root.querySelector('#status-text')
      if (stEl) stEl.classList.add('paused')
      if (txtEl) txtEl.textContent = 'Pipeline Pausado'
      return true
    }

    window.__portfolioMachine = {
      setMode,
      focusStation,
      setCamera,
      play,
      pause,
    }

    cleanups.push(() => {
      delete window.__portfolioMachine
    })

    root.querySelectorAll<HTMLElement>('[data-mode]').forEach((b) => {
      listen(b, 'click', () => setMode(b.dataset.mode ?? ''))
    })
    root.querySelectorAll<HTMLElement>('[data-camera]').forEach((b) => {
      listen(b, 'click', () => setCamera(b.dataset.camera ?? ''))
    })
    listen($('play'), 'click', () => (playing ? pause() : play()))

    layoutCamera()
    camera.position.copy(desiredPosition)
    controls.target.copy(desiredTarget)
    controls.update()
    cameraAnimating = false

    listen(window, 'resize', layoutCamera)

    controls.addEventListener('start', () => {
      dragging = true
      cameraAnimating = false
      lastInteraction = performance.now()
    })
    controls.addEventListener('end', () => {
      dragging = false
      lastInteraction = performance.now()
    })

    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const tooltip = $('tooltip')

    function hitStation(x: number, y: number) {
      pointer.set((x / width) * 2 - 1, (-y / height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(pickables, true)
      return hits.length ? stations.find((s) => s.id === hits[0].object.userData.station) : null
    }

    // Pointer Events for both touch & mouse
    listen(renderer.domElement, 'pointermove', (e: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (Math.hypot(x - downX, y - downY) > 8) wasDragged = true
      if (dragging) return

      // Only show hover tooltip on mouse devices
      if (e.pointerType === 'mouse') {
        const s = hitStation(x, y)
        hovered = s ? s.id : null
        renderer.domElement.style.cursor = s ? 'pointer' : 'grab'
        tooltip.classList.toggle('visible', !!s)

        if (s) {
          tooltip.querySelector('strong')!.innerHTML = `<span>${String(s.index + 1).padStart(2, '0')}</span>${s.name}`
          tooltip.querySelector('p')!.textContent = s.desc
          tooltip.style.left = `${Math.min(width - 255, Math.max(10, x + 16))}px`
          tooltip.style.top = `${Math.max(10, Math.min(height - 95, y - 65))}px`
        }
      }
    })

    listen(renderer.domElement, 'pointerdown', (e: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      downX = e.clientX - rect.left
      downY = e.clientY - rect.top
      wasDragged = false
      tooltip.classList.remove('visible')
    })

    listen(renderer.domElement, 'pointerup', (e: PointerEvent) => {
      if (wasDragged) return
      const rect = root.getBoundingClientRect()
      const s = hitStation(e.clientX - rect.left, e.clientY - rect.top)
      if (!s) return
      focusStation(s.id)
      options.onStation?.(s.id as PortfolioStationId)
    })

    let lastFrame = performance.now()
    let rafId = 0
    const anchor = new THREE.Vector3()

    function animate(now: number) {
      rafId = requestAnimationFrame(animate)
      const dt = Math.max(0, Math.min((now - lastFrame) / 1000, 0.045))
      lastFrame = now

      if (playing) {
        simTime += dt
        flightTime += dt
      }

      const t = simTime
      const smooth = 1 - Math.exp(-dt * 5)
      spread = THREE.MathUtils.lerp(spread, mode === 'stations' ? 1 : 0, smooth)
      cutPlane.constant = THREE.MathUtils.lerp(cutPlane.constant, mode === 'cutaway' ? 0.99 : 10, smooth)

      stations.forEach((s, i) => {
        s.group.position.copy(s.base)
        s.group.position.x *= 1 + spread * 0.29
        s.group.position.z *= 1 + spread * 0.37
        s.group.position.y += spread * (i % 2 ? 0.32 : 0.55)
        const pulse = Math.pow(Math.max(0, Math.sin((t * TAU) / 4 - i * 0.9)), 7)
        s.glowMat.emissiveIntensity = THREE.MathUtils.lerp(
          s.glowMat.emissiveIntensity,
          hovered === s.id || (cameraMode === 'station' && selected === s.id) ? 3.5 : 0.55 + pulse * 0.65,
          smooth
        )
      })

      updateBelt(t)

      if (cameraMode === 'flight' && playing && !dragging) {
        const a = flightTime * 0.12
        const d = baseDistance * (mode === 'stations' ? 1.2 : 1)
        desiredTarget.set(0, 1, 0)
        desiredPosition.set(Math.sin(a + 0.55) * d * 0.83, d * (0.5 + Math.sin(a * 0.7) * 0.09), Math.cos(a + 0.55) * d * 0.83).add(desiredTarget)
        cameraAnimating = true
      }

      if (cameraAnimating && !dragging) {
        const speed = 1 - Math.exp(-dt * 3)
        camera.position.lerp(desiredPosition, speed)
        controls.target.lerp(desiredTarget, speed)
        if (camera.position.distanceTo(desiredPosition) < 0.015 && controls.target.distanceTo(desiredTarget) < 0.015) {
          cameraAnimating = false
        }
      }

      controls.autoRotate = playing && !reduceMotion && !dragging && !cameraAnimating && cameraMode === 'overview' && now - lastInteraction > 6500
      controls.autoRotateSpeed = 0.24
      controls.update(dt)

      // Project labels
      stations.forEach((s) => {
        const show = mode === 'stations'
        s.label.classList.toggle('visible', show)
        if (!show) return
        anchor.copy(s.group.position).add(s.anchor).project(camera)
        const x = (anchor.x * 0.5 + 0.5) * width - 40
        const y = (-anchor.y * 0.5 + 0.5) * height - 52
        s.label.style.transform = `translate(${x}px,${y}px)`
      })

      renderer.render(scene, camera)
    }

    rafId = requestAnimationFrame(animate)

    cleanups.push(() => {
      cancelAnimationFrame(rafId)
      controls.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    })

    const loadEl = root.querySelector('#loading')
    if (loadEl) loadEl.classList.add('done')
  } catch (err) {
    console.error('Portfolio 3D Scene Error:', err)
    showError()
  }

  return () => {
    for (const fn of cleanups.reverse()) fn()
    cleanups.length = 0
  }
}

function compact(group: THREE.Object3D) {
  for (const child of [...group.children]) {
    if ((child as THREE.Group).isGroup) compact(child)
  }
  const buckets = new Map<string, THREE.Mesh<THREE.BufferGeometry, THREE.Material>[]>()
  for (const object of group.children) {
    const child = object as THREE.Mesh<THREE.BufferGeometry, THREE.Material> & { isInstancedMesh?: boolean }
    if (!child.isMesh || child.isInstancedMesh || child.userData.moving || Array.isArray(child.material)) continue
    const key = child.material.uuid
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key)!.push(child)
  }
  for (const list of buckets.values()) {
    if (list.length < 2) continue
    const geos = list.map((m) => {
      m.updateMatrix()
      const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()
      return g.applyMatrix4(m.matrix)
    })
    const merged = mergeGeometries(geos, false)
    for (const geo of geos) geo.dispose()
    if (!merged) continue
    const mesh = new THREE.Mesh(merged, list[0].material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    for (const m of list) group.remove(m)
    group.add(mesh)
  }
}

const STYLES = String.raw`
.portfolio-factory-3d {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #000;
  color-scheme: dark;
  --bg: #000;
  --white: #f4f1ea;
  --amber: #ff7a1a;
  --muted: #81848b;
  --line: rgba(244, 241, 234, 0.11);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--white);
  font-size: 13px;
}
.portfolio-factory-3d * {
  box-sizing: border-box;
}
.portfolio-factory-3d #scene {
  position: absolute;
  inset: 0;
  touch-action: none;
}
.portfolio-factory-3d #scene canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.portfolio-factory-3d .vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 48%, transparent 30%, rgba(0,0,0,0.2) 64%, rgba(0,0,0,0.8) 100%);
}
.portfolio-factory-3d .topbar {
  position: absolute;
  inset: 14px 16px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 20;
}
.portfolio-factory-3d .identity {
  display: flex;
  gap: 10px;
  align-items: center;
}
.portfolio-factory-3d .mark {
  width: 32px;
  height: 32px;
  border: 1px solid #ff7a1a44;
  border-radius: 9px;
  display: grid;
  place-items: center;
  color: var(--amber);
  background: #1c1b14;
}
.portfolio-factory-3d .identity strong {
  display: block;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -0.2px;
}
.portfolio-factory-3d .identity small {
  display: block;
  margin-top: 2px;
  font-size: 9px;
  letter-spacing: 1.1px;
  color: #a0a6b2;
  text-transform: uppercase;
}
.portfolio-factory-3d .status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: #a6a79f;
  background: rgba(20,24,30,0.85);
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
}
.portfolio-factory-3d .status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}
.portfolio-factory-3d .status.paused i {
  background: #777;
  box-shadow: none;
}
.portfolio-factory-3d .scene-heading {
  position: absolute;
  top: 76px;
  left: 20px;
  right: 20px;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  letter-spacing: 1.8px;
  color: #959790;
  text-transform: uppercase;
  z-index: 10;
}
.portfolio-factory-3d .scene-heading:before {
  content: '';
  width: 22px;
  height: 1px;
  background: var(--amber);
}
.portfolio-factory-3d .scene-heading .index {
  margin-left: auto;
  color: #ffaa44;
  font-size: 10px;
  font-weight: 600;
}
.portfolio-factory-3d .coordinates {
  position: absolute;
  top: 130px;
  right: 20px;
  color: #64748b;
  writing-mode: vertical-rl;
  font: 10px ui-monospace, monospace;
  letter-spacing: 2px;
  pointer-events: none;
  z-index: 10;
}
.portfolio-factory-3d .controls {
  position: absolute;
  bottom: 46px;
  left: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  z-index: 20;
}
.portfolio-factory-3d .mode-bar {
  display: flex;
  gap: 3px;
  align-items: center;
  padding: 4px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  background: rgba(18, 22, 28, 0.92);
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  max-width: 100%;
}
.portfolio-factory-3d .mode-bar button {
  border: 0;
  background: none;
  color: #a2a4a8;
  padding: 8px 12px;
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.portfolio-factory-3d .mode-bar button:hover {
  background: rgba(255,255,255,0.06);
  color: #fff;
}
.portfolio-factory-3d .mode-bar button[aria-pressed='true'] {
  background: var(--amber);
  color: #111;
  font-weight: 600;
  box-shadow: 0 2px 14px rgba(255,122,26,0.3);
}
.portfolio-factory-3d .mode-bar svg {
  width: 13px;
  height: 13px;
}
.portfolio-factory-3d .camera-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.portfolio-factory-3d .camera-row .caption {
  font-size: 9px;
  letter-spacing: 1.4px;
  color: #64748b;
  margin-right: 6px;
}
.portfolio-factory-3d .camera-row button {
  border: 0;
  background: transparent;
  color: #8a919d;
  padding: 4px 8px;
  font-size: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: color 0.2s;
}
.portfolio-factory-3d .camera-row button:hover,
.portfolio-factory-3d .camera-row button[aria-pressed='true'] {
  color: #fff;
  background: rgba(255,255,255,0.08);
}
.portfolio-factory-3d .camera-row .divider {
  width: 1px;
  height: 12px;
  background: rgba(255,255,255,0.15);
  margin: 0 4px;
}
.portfolio-factory-3d .camera-row #play {
  padding: 4px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
}
.portfolio-factory-3d .footer {
  position: absolute;
  bottom: 12px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  pointer-events: none;
  font-size: 10px;
  color: #64748b;
  z-index: 10;
}
.portfolio-factory-3d .footer .wordmark {
  color: #94a3b8;
}
.portfolio-factory-3d .footer .wordmark span {
  color: #ffaa44;
}
.portfolio-factory-3d .footer-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font: 9px ui-monospace, monospace;
  letter-spacing: 1.5px;
  color: #64748b;
}
.portfolio-factory-3d .hint {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 10px;
}
.portfolio-factory-3d #labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.portfolio-factory-3d .station-label {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  min-width: 120px;
}
.portfolio-factory-3d .station-label.visible {
  opacity: 1;
}
.portfolio-factory-3d .station-label .stem {
  height: 18px;
  width: 1px;
  background: linear-gradient(transparent, #ff7a1a);
  margin-left: 10px;
}
.portfolio-factory-3d .station-label .label-card {
  background: rgba(15, 23, 42, 0.94);
  backdrop-filter: blur(10px);
  border: 1px solid #ff7a1a66;
  border-radius: 7px;
  padding: 7px 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
.portfolio-factory-3d .station-label .label-title {
  font-weight: 600;
  font-size: 11px;
  display: flex;
  gap: 6px;
  align-items: center;
  color: #fff;
}
.portfolio-factory-3d .station-label .label-title span {
  color: var(--amber);
  font: 9px ui-monospace, monospace;
}
.portfolio-factory-3d .station-label .label-meta {
  font-size: 8px;
  color: #94a3b8;
  margin-top: 3px;
}
.portfolio-factory-3d #tooltip {
  position: absolute;
  pointer-events: none;
  z-index: 40;
  opacity: 0;
  transition: opacity 0.15s;
  padding: 8px 12px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  border-radius: 8px;
  max-width: 220px;
}
.portfolio-factory-3d #tooltip.visible {
  opacity: 1;
}
.portfolio-factory-3d #tooltip strong {
  font-size: 12px;
  font-weight: 600;
  display: block;
}
.portfolio-factory-3d #tooltip strong span {
  font-size: 10px;
  color: var(--amber);
  margin-right: 6px;
}
.portfolio-factory-3d #tooltip p {
  font-size: 10px;
  color: #94a3b8;
  margin: 4px 0 0;
  line-height: 1.35;
}
.portfolio-factory-3d #journey {
  position: absolute;
  left: 12px;
  right: 12px;
  top: 115px;
  opacity: 0;
  transform: translateY(-5px);
  transition: 0.4s;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(15,23,42,0.9);
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid #ff7a1a44;
  backdrop-filter: blur(8px);
  z-index: 20;
}
.portfolio-factory-3d #journey.visible {
  opacity: 1;
  transform: none;
}
.portfolio-factory-3d .journey-icon {
  width: 26px;
  height: 26px;
  border: 1px solid #ff7a1a44;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--amber);
  background: rgba(255,122,26,0.1);
}
.portfolio-factory-3d #journey strong {
  font-size: 11px;
  font-weight: 600;
}
.portfolio-factory-3d #journey small {
  display: block;
  font-size: 9px;
  color: #94a3b8;
  margin-top: 1px;
}
.portfolio-factory-3d #journey .track {
  height: 3px;
  background: rgba(255,255,255,0.1);
  flex: 1;
  border-radius: 2px;
  overflow: hidden;
}
.portfolio-factory-3d #journey .track i {
  display: block;
  height: 100%;
  background: var(--amber);
  width: 0;
}
.portfolio-factory-3d #loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 10px;
  color: #94a3b8;
  font-size: 11px;
  z-index: 50;
  background: rgba(0,0,0,0.85);
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.1);
}
.portfolio-factory-3d #loading i {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255,122,26,0.2);
  border-top-color: var(--amber);
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.portfolio-factory-3d #loading.done {
  opacity: 0;
  pointer-events: none;
}
.portfolio-factory-3d #error {
  position: absolute;
  inset: 25% 15%;
  background: #111;
  border: 1px solid #ff7a1a44;
  padding: 20px;
  border-radius: 12px;
  display: none;
  z-index: 50;
}
@media (min-width: 640px) {
  .portfolio-factory-3d .topbar {
    inset: 20px 24px auto;
  }
  .portfolio-factory-3d .controls {
    bottom: 54px;
    gap: 10px;
  }
  .portfolio-factory-3d #journey {
    left: 20%;
    right: 20%;
    top: 130px;
    padding: 10px 16px;
  }
  .portfolio-factory-3d .footer {
    bottom: 16px;
    left: 24px;
    right: 24px;
    font-size: 11px;
  }
}
`
