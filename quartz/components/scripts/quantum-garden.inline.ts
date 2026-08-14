import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferGeometry,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  FogExp2,
  Group,
  IcosahedronGeometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Raycaster,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Material,
  type Object3D,
} from "three"
import {
  performanceTier,
  selectGardenNotes,
  tierSettings,
  type GardenNote,
  type KnowledgeIndex,
} from "./quantum-garden-data"

type GardenWindow = Window & { __quantumGardenRuntime?: boolean }
type DeviceNavigator = Navigator & { deviceMemory?: number }

const runtimeWindow = window as GardenWindow
let activeCleanup: (() => void) | undefined
let mountGeneration = 0

function noteHref(slug: string): string {
  return new URL(`./${slug}`, window.location.href).href
}

function staticNotes(root: HTMLElement): GardenNote[] {
  return Array.from(root.querySelectorAll<HTMLElement>("[data-featured-slug]")).map((link) => ({
    slug: link.dataset.featuredSlug ?? "",
    title: link.querySelector("strong")?.textContent?.trim() ?? "未命名信号",
    description:
      link.querySelector<HTMLElement>(".quantum-signal__body > span")?.textContent?.trim() ??
      "一束等待被阅读的知识信号。",
    tags: [],
    featured: true,
  }))
}

function replaceNodeControls(container: HTMLElement, notes: GardenNote[]): void {
  container.replaceChildren(
    ...notes.map((note, index) => {
      const button = document.createElement("button")
      const number = document.createElement("span")
      button.className = `quantum-node-button${index === 0 ? " is-selected" : ""}`
      button.type = "button"
      button.setAttribute("aria-pressed", index === 0 ? "true" : "false")
      button.dataset.noteSlug = note.slug
      number.textContent = String(index + 1).padStart(2, "0")
      button.append(number, document.createTextNode(note.title))
      return button
    }),
  )
}

function replaceRail(container: HTMLElement, notes: GardenNote[]): void {
  container.replaceChildren(
    ...notes.map((note, index) => {
      const link = document.createElement("a")
      const number = document.createElement("span")
      const title = document.createElement("strong")
      const action = document.createElement("small")
      link.href = noteHref(note.slug)
      number.textContent = String(index + 1).padStart(2, "0")
      title.textContent = note.title
      action.textContent = note.date
        ? `${new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit" }).format(note.date)} · 读取信号 ↗`
        : "读取信号 ↗"
      link.append(number, title, action)
      return link
    }),
  )
}

function makeParticleGeometry(count: number): BufferGeometry {
  let seed = 0x1a2b3c4d
  const random = () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
  const positions = new Float32Array(count * 3)
  for (let index = 0; index < count; index++) {
    const radius = 3.7 + random() * 5.3
    const angle = random() * Math.PI * 2
    const elevation = (random() - 0.5) * Math.PI
    positions[index * 3] = Math.cos(angle) * Math.cos(elevation) * radius
    positions[index * 3 + 1] = Math.sin(elevation) * radius * 0.72
    positions[index * 3 + 2] = Math.sin(angle) * Math.cos(elevation) * radius
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3))
  return geometry
}

function makeOrbit(radiusX: number, radiusZ: number, tilt: Vector3, color: Color): Group {
  const points: Vector3[] = []
  for (let index = 0; index <= 128; index++) {
    const angle = (index / 128) * Math.PI * 2
    points.push(new Vector3(Math.cos(angle) * radiusX, 0, Math.sin(angle) * radiusZ))
  }
  const line = new Line(
    new BufferGeometry().setFromPoints(points),
    new LineBasicMaterial({ color, transparent: true, opacity: 0.24 }),
  )
  const group = new Group()
  group.rotation.set(tilt.x, tilt.y, tilt.z)
  group.add(line)
  return group
}

function disposeObject(object: Object3D): void {
  object.traverse((child) => {
    const disposable = child as Object3D & {
      geometry?: BufferGeometry
      material?: Material | Material[]
    }
    disposable.geometry?.dispose()
    if (Array.isArray(disposable.material)) {
      disposable.material.forEach((material) => material.dispose())
    } else {
      disposable.material?.dispose()
    }
  })
}

function createScene(
  root: HTMLElement,
  viewport: HTMLElement,
  host: HTMLElement,
  notes: GardenNote[],
  selectNote: (index: number, announce?: boolean) => void,
): () => void {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const nav = navigator as DeviceNavigator
  const tier = performanceTier({
    width: window.innerWidth,
    hardwareConcurrency: nav.hardwareConcurrency,
    deviceMemory: nav.deviceMemory,
    reducedMotion: reducedMotion.matches,
  })
  const settings = tierSettings[tier]
  const qualityLabel = root.querySelector<HTMLElement>("[data-quality-label]")
  if (qualityLabel)
    qualityLabel.textContent = `${tier.toUpperCase()} FIELD / ${settings.particles} PTS`

  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({
      alpha: true,
      antialias: settings.antialias,
      powerPreference: "high-performance",
    })
  } catch {
    root.classList.add("quantum-webgl-fallback")
    if (qualityLabel) qualityLabel.textContent = "STATIC FIELD / WEBGL OFFLINE"
    return () => undefined
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, settings.dpr))
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.12
  renderer.setClearColor(0x000000, 0)
  renderer.domElement.setAttribute("aria-hidden", "true")
  renderer.domElement.setAttribute("tabindex", "-1")
  host.replaceChildren(renderer.domElement)
  root.classList.add("quantum-webgl-active")

  const scene = new Scene()
  scene.fog = new FogExp2(0x050713, 0.072)
  const camera = new PerspectiveCamera(40, 1, 0.1, 60)
  camera.position.set(0, 0.15, 8.2)

  const field = new Group()
  field.rotation.set(-0.12, -0.28, 0.04)
  scene.add(field)

  const seed = new Group()
  const coreGeometry = new IcosahedronGeometry(1.18, 2)
  const coreMaterial = new MeshStandardMaterial({
    color: 0x14234b,
    emissive: 0x164d69,
    emissiveIntensity: 1.35,
    metalness: 0.62,
    roughness: 0.26,
    flatShading: true,
  })
  const core = new Mesh(coreGeometry, coreMaterial)
  core.scale.set(0.88, 1.28, 0.88)
  core.rotation.set(0.15, 0.42, -0.18)
  seed.add(core)

  const shellMaterial = new ShaderMaterial({
    uniforms: { uColor: { value: new Color(0x5df7ff) }, uOpacity: { value: 0.52 } },
    vertexShader: `
      varying float vFresnel;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vec3 viewDirection = normalize(-mvPosition.xyz);
        vec3 worldNormal = normalize(normalMatrix * normal);
        vFresnel = pow(1.0 - max(dot(worldNormal, viewDirection), 0.0), 2.4);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vFresnel;
      void main() {
        gl_FragColor = vec4(uColor, vFresnel * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const shell = new Mesh(new IcosahedronGeometry(1.38, 3), shellMaterial)
  shell.scale.set(0.9, 1.28, 0.9)
  seed.add(shell)

  const innerMaterial = new MeshStandardMaterial({
    color: 0xeafbff,
    emissive: 0x8a63ff,
    emissiveIntensity: 2.2,
    metalness: 0.15,
    roughness: 0.08,
  })
  const inner = new Mesh(new IcosahedronGeometry(0.38, 1), innerMaterial)
  inner.scale.set(0.7, 1.32, 0.7)
  seed.add(inner)
  field.add(seed)

  const orbitColor = new Color(0x5df7ff)
  field.add(
    makeOrbit(3.15, 1.42, new Vector3(0.2, 0.16, 0.44), orbitColor),
    makeOrbit(2.6, 1.92, new Vector3(-0.62, 0.18, -0.24), new Color(0x8a63ff)),
    makeOrbit(2.15, 2.82, new Vector3(0.7, 0.06, 0.72), new Color(0xff5cd9)),
  )

  const positions = [
    new Vector3(2.62, 0.72, 0.18),
    new Vector3(-2.34, -0.62, 0.92),
    new Vector3(0.9, -1.92, -1.1),
    new Vector3(-0.82, 1.85, -1.34),
    new Vector3(2.02, -0.82, -1.68),
    new Vector3(-2.18, 1.02, -0.82),
  ]
  const palette = [0x5df7ff, 0x8a63ff, 0xff5cd9, 0xeafbff, 0x67b6ff, 0xc6ffef]
  const nodeMeshes: Mesh[] = []
  notes.forEach((_note, index) => {
    const geometry = new IcosahedronGeometry(index === 0 ? 0.2 : 0.16, 1)
    const material = new MeshStandardMaterial({
      color: palette[index % palette.length],
      emissive: palette[index % palette.length],
      emissiveIntensity: index === 0 ? 3.2 : 1.7,
      metalness: 0.2,
      roughness: 0.18,
    })
    const node = new Mesh(geometry, material)
    node.position.copy(positions[index])
    node.userData.noteIndex = index
    node.userData.baseScale = index === 0 ? 1.18 : 1
    node.scale.setScalar(node.userData.baseScale)
    nodeMeshes.push(node)
    field.add(node)

    const glow = new Mesh(
      new SphereGeometry(index === 0 ? 0.36 : 0.29, 12, 8),
      new MeshStandardMaterial({
        color: palette[index % palette.length],
        emissive: palette[index % palette.length],
        emissiveIntensity: 2,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
    glow.userData.glowFor = index
    node.add(glow)
  })

  const particleMaterial = new PointsMaterial({
    color: 0xaeefff,
    size: tier === "low" ? 0.018 : 0.025,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
    blending: AdditiveBlending,
    sizeAttenuation: true,
  })
  const particles = new Points(makeParticleGeometry(settings.particles), particleMaterial)
  scene.add(particles)

  scene.add(new AmbientLight(0x9ecfff, 1.45))
  const keyLight = new DirectionalLight(0xeafbff, 4.2)
  keyLight.position.set(3, 4, 5)
  scene.add(keyLight)
  const rimLight = new DirectionalLight(0x8a63ff, 3.4)
  rimLight.position.set(-4, -1, -3)
  scene.add(rimLight)

  const raycaster = new Raycaster()
  const pointer = new Vector2()
  let frame = 0
  let visible = true
  let disposed = false
  let dragging = false
  let dragDistance = 0
  let pointerId = -1
  let previousX = 0
  let previousY = 0
  let velocityX = 0
  let velocityY = 0
  let selectedIndex = 0
  let lastTime = performance.now()

  const applySelection = (index: number) => {
    selectedIndex = index
    nodeMeshes.forEach((node, nodeIndex) => {
      const material = node.material as MeshStandardMaterial
      material.emissiveIntensity = nodeIndex === selectedIndex ? 3.2 : 1.7
      node.userData.baseScale = nodeIndex === selectedIndex ? 1.2 : 1
    })
    requestRender()
  }

  const applyTheme = () => {
    const light = document.documentElement.getAttribute("saved-theme") === "light"
    ;(scene.fog as FogExp2).color.set(light ? 0xdce8f2 : 0x050713)
    particleMaterial.color.set(light ? 0x52728f : 0xaeefff)
    particleMaterial.opacity = light ? 0.26 : 0.46
    orbitColor.set(light ? 0x168492 : 0x5df7ff)
    coreMaterial.color.set(light ? 0x95b7c9 : 0x14234b)
    coreMaterial.emissive.set(light ? 0x4c8391 : 0x164d69)
    shellMaterial.uniforms.uColor.value.set(light ? 0x0f92a0 : 0x5df7ff)
    renderer.toneMappingExposure = light ? 0.88 : 1.12
    requestRender()
  }

  const render = (time = performance.now()) => {
    frame = 0
    if (disposed || !visible || document.hidden) return
    const delta = Math.min((time - lastTime) / 16.67, 2)
    lastTime = time
    if (!reducedMotion.matches) {
      if (!dragging) {
        field.rotation.y += 0.0017 * delta + velocityX
        field.rotation.x = Math.max(-0.7, Math.min(0.7, field.rotation.x + velocityY))
        velocityX *= 0.925
        velocityY *= 0.925
      }
      seed.rotation.y += 0.0038 * delta
      seed.rotation.z += 0.0012 * delta
      particles.rotation.y -= 0.00022 * delta
      nodeMeshes.forEach((node, index) => {
        const pulse =
          1 + Math.sin(time * 0.0024 + index * 1.7) * (index === selectedIndex ? 0.08 : 0.035)
        node.scale.setScalar(node.userData.baseScale * pulse)
      })
    }
    renderer.render(scene, camera)
    if (!reducedMotion.matches) frame = window.requestAnimationFrame(render)
  }

  function requestRender(): void {
    if (disposed || frame || !visible || document.hidden) return
    frame = window.requestAnimationFrame(render)
  }

  const resize = () => {
    const rect = host.getBoundingClientRect()
    const width = Math.max(1, Math.round(rect.width))
    const height = Math.max(1, Math.round(rect.height))
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    requestRender()
  }

  const pickNode = (event: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect()
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    )
    scene.updateMatrixWorld(true)
    raycaster.setFromCamera(pointer, camera)
    const hit = raycaster.intersectObjects(nodeMeshes, false)[0]
    return hit ? (hit.object.userData.noteIndex as number) : undefined
  }

  const onPointerDown = (event: PointerEvent) => {
    dragging = true
    dragDistance = 0
    pointerId = event.pointerId
    previousX = event.clientX
    previousY = event.clientY
    velocityX = 0
    velocityY = 0
    renderer.domElement.setPointerCapture(event.pointerId)
    viewport.classList.add("is-dragging")
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) {
      renderer.domElement.style.cursor = pickNode(event) === undefined ? "grab" : "pointer"
      return
    }
    const deltaX = event.clientX - previousX
    const deltaY = event.clientY - previousY
    dragDistance += Math.hypot(deltaX, deltaY)
    previousX = event.clientX
    previousY = event.clientY
    if (event.pointerType !== "touch" || Math.abs(deltaX) >= Math.abs(deltaY))
      event.preventDefault()
    const xMotion = deltaX * 0.0055
    const yMotion = deltaY * 0.0036
    field.rotation.y += xMotion
    field.rotation.x = Math.max(-0.7, Math.min(0.7, field.rotation.x + yMotion))
    velocityX = reducedMotion.matches ? 0 : xMotion * 0.18
    velocityY = reducedMotion.matches ? 0 : yMotion * 0.18
    requestRender()
  }

  const finishPointer = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) return
    dragging = false
    viewport.classList.remove("is-dragging")
    if (renderer.domElement.hasPointerCapture(event.pointerId)) {
      renderer.domElement.releasePointerCapture(event.pointerId)
    }
    if (dragDistance < 7) {
      const index = pickNode(event)
      if (index !== undefined) {
        selectNote(index, true)
        applySelection(index)
      }
    }
    requestRender()
  }

  const onThemeChange = () => applyTheme()
  const onRender = () => requestRender()
  const onVisibility = () => {
    lastTime = performance.now()
    if (!document.hidden) requestRender()
  }
  const onContextLost = (event: Event) => {
    event.preventDefault()
    root.classList.remove("quantum-webgl-active")
    root.classList.add("quantum-webgl-fallback")
    if (qualityLabel) qualityLabel.textContent = "STATIC FIELD / CONTEXT LOST"
  }
  const onMotionChange = () => requestRender()

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        lastTime = performance.now()
        requestRender()
      } else if (frame) {
        window.cancelAnimationFrame(frame)
        frame = 0
      }
    },
    { rootMargin: "100px" },
  )
  intersectionObserver.observe(viewport)

  renderer.domElement.addEventListener("pointerdown", onPointerDown)
  renderer.domElement.addEventListener("pointermove", onPointerMove)
  renderer.domElement.addEventListener("pointerup", finishPointer)
  renderer.domElement.addEventListener("pointercancel", finishPointer)
  renderer.domElement.addEventListener("webglcontextlost", onContextLost)
  document.addEventListener("themechange", onThemeChange)
  document.addEventListener("render", onRender)
  document.addEventListener("visibilitychange", onVisibility)
  reducedMotion.addEventListener("change", onMotionChange)

  resize()
  applyTheme()
  applySelection(0)
  requestRender()

  return () => {
    disposed = true
    if (frame) window.cancelAnimationFrame(frame)
    resizeObserver.disconnect()
    intersectionObserver.disconnect()
    renderer.domElement.removeEventListener("pointerdown", onPointerDown)
    renderer.domElement.removeEventListener("pointermove", onPointerMove)
    renderer.domElement.removeEventListener("pointerup", finishPointer)
    renderer.domElement.removeEventListener("pointercancel", finishPointer)
    renderer.domElement.removeEventListener("webglcontextlost", onContextLost)
    document.removeEventListener("themechange", onThemeChange)
    document.removeEventListener("render", onRender)
    document.removeEventListener("visibilitychange", onVisibility)
    reducedMotion.removeEventListener("change", onMotionChange)
    disposeObject(scene)
    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.remove()
    root.classList.remove("quantum-webgl-active")
  }
}

async function mountGarden(): Promise<void> {
  const generation = ++mountGeneration
  activeCleanup?.()
  activeCleanup = undefined
  const root = document.querySelector<HTMLElement>(".quantum-home")
  if (!root) return

  let disposed = false
  let sceneCleanup: (() => void) | undefined
  const localCleanups: Array<() => void> = []
  const cleanup = () => {
    if (disposed) return
    disposed = true
    sceneCleanup?.()
    localCleanups.forEach((fn) => fn())
  }
  activeCleanup = cleanup
  window.addCleanup(cleanup)

  const featuredSlugs = Array.from(root.querySelectorAll<HTMLElement>("[data-featured-slug]"))
    .map((element) => element.dataset.featuredSlug ?? "")
    .filter(Boolean)
  let notes = staticNotes(root)
  try {
    if (typeof fetchData !== "undefined") {
      notes = selectGardenNotes((await fetchData) as unknown as KnowledgeIndex, featuredSlugs, 6)
    }
  } catch {
    root.dataset.indexState = "static"
  }
  if (disposed || generation !== mountGeneration || !root.isConnected) return
  if (notes.length === 0) notes = staticNotes(root)

  const controls = root.querySelector<HTMLElement>("[data-quantum-nodes]")
  const rail = root.querySelector<HTMLElement>("[data-quantum-rail]")
  const viewport = root.querySelector<HTMLElement>("[data-quantum-viewport]")
  const canvasHost = root.querySelector<HTMLElement>("[data-quantum-canvas]")
  const title = root.querySelector<HTMLElement>("[data-selected-title]")
  const description = root.querySelector<HTMLElement>("[data-selected-description]")
  const selectedIndexLabel = root.querySelector<HTMLElement>("[data-selected-index]")
  const selectedType = root.querySelector<HTMLElement>("[data-selected-type]")
  const openNote = root.querySelector<HTMLAnchorElement>("[data-quantum-open]")
  const status = root.querySelector<HTMLElement>("[data-quantum-status]")
  const noteCount = root.querySelector<HTMLElement>("[data-note-count]")
  if (!controls || !rail || !viewport || !canvasHost || !title || !description || !openNote) return

  replaceNodeControls(controls, notes)
  replaceRail(rail, notes)
  if (noteCount) noteCount.textContent = String(notes.length).padStart(2, "0")
  root.dataset.indexState = "ready"
  let selectedIndex = 0

  const selectNote = (index: number, announce = false) => {
    const note = notes[index]
    if (!note) return
    selectedIndex = index
    title.textContent = note.title
    description.textContent = note.description
    openNote.href = noteHref(note.slug)
    if (selectedIndexLabel) selectedIndexLabel.textContent = String(index + 1).padStart(2, "0")
    if (selectedType) selectedType.textContent = note.featured ? "FEATURED SIGNAL" : "RECENT SIGNAL"
    controls.querySelectorAll<HTMLButtonElement>("[data-note-slug]").forEach((button, i) => {
      const selected = i === index
      button.classList.toggle("is-selected", selected)
      button.setAttribute("aria-pressed", String(selected))
    })
    if (announce && status)
      status.textContent = `已选择：${note.title}。按 Enter 或使用“打开笔记”继续。`
  }

  const onControlsClick = (event: Event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>("[data-note-slug]")
    if (!button) return
    const index = notes.findIndex((note) => note.slug === button.dataset.noteSlug)
    if (index >= 0) selectNote(index, true)
  }
  const onControlsKeydown = (event: KeyboardEvent) => {
    const button = (event.target as Element).closest<HTMLButtonElement>("[data-note-slug]")
    if (!button) return
    if (event.key === "Enter") {
      event.preventDefault()
      const index = notes.findIndex((note) => note.slug === button.dataset.noteSlug)
      if (index >= 0) selectNote(index)
      openNote.click()
      return
    }
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    event.preventDefault()
    const direction = event.key === "ArrowRight" ? 1 : -1
    const next = (selectedIndex + direction + notes.length) % notes.length
    selectNote(next, true)
    controls.querySelectorAll<HTMLButtonElement>("[data-note-slug]")[next]?.focus()
  }
  controls.addEventListener("click", onControlsClick)
  controls.addEventListener("keydown", onControlsKeydown)
  localCleanups.push(() => controls.removeEventListener("click", onControlsClick))
  localCleanups.push(() => controls.removeEventListener("keydown", onControlsKeydown))

  const searchTrigger = root.querySelector<HTMLButtonElement>("[data-open-search]")
  const onSearch = () => document.querySelector<HTMLButtonElement>(".search-button")?.click()
  searchTrigger?.addEventListener("click", onSearch)
  if (searchTrigger) localCleanups.push(() => searchTrigger.removeEventListener("click", onSearch))

  selectNote(0)
  sceneCleanup = createScene(root, viewport, canvasHost, notes, selectNote)
}

if (!runtimeWindow.__quantumGardenRuntime) {
  runtimeWindow.__quantumGardenRuntime = true
  document.addEventListener("prenav", () => activeCleanup?.())
  document.addEventListener("nav", () => void mountGarden())
}
