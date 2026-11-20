/* Learning-map constellation runtime (content/learn/index.md, .ai-learn--map).
   Renders an interactive SVG star chart of the D1 principle stages:
   - triple orbit rings + drifting starfield for depth
   - pointer parallax: the whole constellation drifts with the cursor
   - hover: node blooms, orbiting pulse rides the link, its stage card lifts
   - click: smooth-scrolls to the stage card and flashes it
   Stage data is read from the static DOM (the no-JS skeleton) so the chart
   can never drift from the page content. All colors use --ai-* tokens so the
   chart flips correctly in both themes. */

type LearnWindow = Window & { __aiLearnMapRuntime?: boolean }

const learnWindow = window as LearnWindow
let learnCleanup: (() => void) | undefined
let learnGeneration = 0

type StageDatum = {
  code: string
  name: string
  accent: string
  href: string
}

/* Cool single-family ramp built from the .ai-learn token set (NOT --ac-signal,
   which only exists inside .ai-atlas). color-mix keeps it theme-aware: both
   the base token and the ice token flip in light mode. */
const STAGE_ACCENTS = [
  "var(--ai-cyan)",
  "var(--ai-violet)",
  "var(--ai-magenta)",
  "var(--ai-green)",
  "var(--ai-amber)",
  "var(--ai-blue)",
]

/* Elliptical orbit for six nodes, sitting on the outer ring
   (center 520,245 / rx 200 / ry 138), starting top-right, clockwise. */
const NODE_POSITIONS: Array<{ x: number; y: number }> = [
  { x: 620, y: 128 },
  { x: 720, y: 245 },
  { x: 620, y: 362 },
  { x: 420, y: 362 },
  { x: 320, y: 245 },
  { x: 420, y: 128 },
]

const CX = 520
const CY = 245

function readStages(root: HTMLElement): StageDatum[] {
  const stages = Array.from(root.querySelectorAll<HTMLElement>(".ai-learn__stage"))
  return stages.map((stage, index) => {
    const code = stage.querySelector<HTMLElement>(".ai-learn__code")?.textContent?.trim() ?? ""
    const link = stage.querySelector<HTMLAnchorElement>("a.ai-learn__link")
    return {
      code,
      name: link?.textContent?.trim() ?? "",
      accent: STAGE_ACCENTS[index % STAGE_ACCENTS.length],
      href: link?.getAttribute("href") ?? "",
    }
  })
}

function el(NS: string, tag: string, cls?: string): SVGElement {
  const node = document.createElementNS(NS, tag) as SVGElement
  if (cls) node.classList.add(cls)
  return node
}

function buildChart(stages: StageDatum[], reduced: boolean): SVGSVGElement {
  const NS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(NS, "svg")
  svg.setAttribute("viewBox", "230 40 580 410")
  svg.setAttribute("role", "img")
  svg.setAttribute("aria-label", "智能原理六阶段星图：六个节点沿轨道排布，点击节点跳转到对应阶段")
  svg.classList.add("ai-lm__svg")

  const drift = el(NS, "g", "ai-lm__drift") as SVGGElement
  svg.append(drift)

  // Starfield: deterministic pseudo-random dots for depth, no per-frame cost.
  const stars = el(NS, "g", "ai-lm__stars") as SVGGElement
  for (let i = 0; i < 46; i++) {
    const sx = 250 + ((i * 97) % 540)
    const sy = 60 + ((i * 61) % 370)
    const star = el(NS, "circle", "ai-lm__star")
    star.setAttribute("cx", String(sx))
    star.setAttribute("cy", String(sy))
    star.setAttribute("r", i % 7 === 0 ? "1.8" : "1.1")
    if (!reduced) (star as SVGElement).style.setProperty("--d", `${(i % 9) * 380}ms`)
    stars.append(star)
  }
  drift.append(stars)

  // Three concentric orbit rings: the visual "gravity" of the atlas.
  const orbits = el(NS, "g", "ai-lm__orbits") as SVGGElement
  ;[
    { rx: 200, ry: 138, cls: "ai-lm__orbit ai-lm__orbit--outer" },
    { rx: 128, ry: 88, cls: "ai-lm__orbit ai-lm__orbit--mid" },
    { rx: 58, ry: 40, cls: "ai-lm__orbit ai-lm__orbit--inner" },
  ].forEach((o) => {
    const ellipse = el(NS, "ellipse", "ai-lm__orbit") as SVGEllipseElement
    ellipse.classList.add(o.cls.split(" ")[1])
    ellipse.setAttribute("cx", String(CX))
    ellipse.setAttribute("cy", String(CY))
    ellipse.setAttribute("rx", String(o.rx))
    ellipse.setAttribute("ry", String(o.ry))
    orbits.append(ellipse)
  })
  drift.append(orbits)

  // Center data-core: a hub showing the domain count.
  const core = el(NS, "g", "ai-lm__core") as SVGGElement
  const coreHalo = el(NS, "circle", "ai-lm__core-halo") as SVGCircleElement
  coreHalo.setAttribute("cx", String(CX))
  coreHalo.setAttribute("cy", String(CY))
  coreHalo.setAttribute("r", "34")
  const coreDot = el(NS, "circle", "ai-lm__core-dot") as SVGCircleElement
  coreDot.setAttribute("cx", String(CX))
  coreDot.setAttribute("cy", String(CY))
  coreDot.setAttribute("r", "20")
  const coreLabel = el(NS, "text", "ai-lm__core-label") as SVGTextElement
  coreLabel.setAttribute("x", String(CX))
  coreLabel.setAttribute("y", String(CY - 3))
  coreLabel.setAttribute("text-anchor", "middle")
  coreLabel.textContent = "D1"
  const coreSub = el(NS, "text", "ai-lm__core-sub") as SVGTextElement
  coreSub.setAttribute("x", String(CX))
  coreSub.setAttribute("y", String(CY + 12))
  coreSub.setAttribute("text-anchor", "middle")
  coreSub.textContent = "原理"
  core.append(coreHalo, coreDot, coreLabel, coreSub)
  drift.append(core)

  // Links between consecutive stages (closed loop) + a travelling pulse.
  const links = el(NS, "g", "ai-lm__links") as SVGGElement
  for (let i = 0; i < stages.length; i++) {
    const a = NODE_POSITIONS[i]
    const b = NODE_POSITIONS[(i + 1) % stages.length]
    if (!a || !b) continue
    const line = el(NS, "line", "ai-lm__link") as SVGLineElement
    line.setAttribute("x1", String(a.x))
    line.setAttribute("y1", String(a.y))
    line.setAttribute("x2", String(b.x))
    line.setAttribute("y2", String(b.y))
    line.style.setProperty("--d", `${i * 260}ms`)
    links.append(line)
    if (!reduced) {
      const pulse = el(NS, "circle", "ai-lm__pulse") as SVGCircleElement
      pulse.setAttribute("r", "3")
      pulse.style.setProperty("--d", `${i * 260}ms`)
      const motion = document.createElementNS(NS, "animateMotion")
      motion.setAttribute("dur", "4.5s")
      motion.setAttribute("begin", `${i * 260}ms`)
      motion.setAttribute("repeatCount", "indefinite")
      motion.setAttribute("path", `M${a.x},${a.y} L${b.x},${b.y}`)
      pulse.append(motion)
      links.append(pulse)
    }
  }
  drift.append(links)

  // Stage nodes: halo + breathing ring + dot + code + name.
  stages.forEach((stage, index) => {
    const pos = NODE_POSITIONS[index]
    if (!pos) return
    const anchor = el(NS, "a", "ai-lm__node") as SVGAElement
    anchor.setAttribute("href", stage.href)
    anchor.setAttribute("data-stage-index", String(index))
    anchor.setAttribute("data-router-ignore", "")
    anchor.style.setProperty("--accent", stage.accent)
    anchor.style.setProperty("--d", `${index * 90}ms`)

    const halo = el(NS, "circle", "ai-lm__halo") as SVGCircleElement
    halo.setAttribute("cx", String(pos.x))
    halo.setAttribute("cy", String(pos.y))
    halo.setAttribute("r", "30")

    const ring = el(NS, "circle", "ai-lm__ring") as SVGCircleElement
    ring.setAttribute("cx", String(pos.x))
    ring.setAttribute("cy", String(pos.y))
    ring.setAttribute("r", "19")

    const dot = el(NS, "circle", "ai-lm__dot") as SVGCircleElement
    dot.setAttribute("cx", String(pos.x))
    dot.setAttribute("cy", String(pos.y))
    dot.setAttribute("r", "10")

    const code = el(NS, "text", "ai-lm__code") as SVGTextElement
    code.setAttribute("x", String(pos.x))
    code.setAttribute("y", String(pos.y - 42))
    code.setAttribute("text-anchor", "middle")
    code.textContent = stage.code

    const name = el(NS, "text", "ai-lm__name") as SVGTextElement
    name.setAttribute("x", String(pos.x))
    name.setAttribute("y", String(pos.y + 54))
    name.setAttribute("text-anchor", "middle")
    name.textContent = stage.name

    anchor.append(halo, ring, dot, code, name)
    drift.append(anchor)
  })

  return svg
}

function mountLearnMap(): void {
  const generation = ++learnGeneration
  learnCleanup?.()
  learnCleanup = undefined
  const root = document.querySelector<HTMLElement>(".ai-learn--map")
  if (!root) return

  const stages = readStages(root)
  if (stages.length === 0) return

  const slot = root.querySelector<HTMLElement>("[data-ai-lm-chart]")
  if (!slot) return

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const chart = buildChart(stages, reduced)
  slot.replaceChildren(chart)
  root.classList.add("ai-anim")

  const cleanups: Array<() => void> = []
  const cleanup = () => {
    for (const fn of cleanups.splice(0)) {
      try {
        fn()
      } catch {
        /* best effort */
      }
    }
  }
  learnCleanup = cleanup
  window.addCleanup(cleanup)

  const stageCards = Array.from(root.querySelectorAll<HTMLElement>(".ai-learn__stage"))

  // Hover: brighten the matching stage card while a node is hovered.
  const onOver = (event: Event) => {
    const node = (event.target as Element | null)?.closest?.(".ai-lm__node") as
      SVGAElement | undefined
    const index = node?.dataset.stageIndex
    if (index === undefined) return
    stageCards[Number(index)]?.classList.add("is-lit")
  }
  const onOut = (event: Event) => {
    const node = (event.target as Element | null)?.closest?.(".ai-lm__node") as
      SVGAElement | undefined
    const index = node?.dataset.stageIndex
    if (index === undefined) return
    stageCards[Number(index)]?.classList.remove("is-lit")
  }
  chart.addEventListener("pointerover", onOver)
  chart.addEventListener("pointerout", onOut)
  cleanups.push(() => {
    chart.removeEventListener("pointerover", onOver)
    chart.removeEventListener("pointerout", onOut)
  })

  // Click: smooth-scroll to the stage card and flash it. Anchors carry
  // data-router-ignore so the SPA router leaves them alone.
  const onClick = (event: MouseEvent) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0)
      return
    const node = (event.target as Element | null)?.closest?.(".ai-lm__node") as
      SVGAElement | undefined
    if (!node) return
    const index = Number(node.dataset.stageIndex)
    const card = stageCards[index]
    if (!card) return
    event.preventDefault()
    event.stopPropagation()
    card.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" })
    card.classList.remove("is-flash")
    void card.offsetWidth
    card.classList.add("is-flash")
    const stop = () => card.classList.remove("is-flash")
    card.addEventListener("animationend", stop, { once: true })
    cleanups.push(() => card.removeEventListener("animationend", stop))
  }
  chart.addEventListener("click", onClick, true)
  cleanups.push(() => chart.removeEventListener("click", onClick, true))

  // Pointer parallax: constellation drifts against the cursor.
  if (!reduced) {
    let pendingFrame = 0
    let lastEvent: PointerEvent | undefined
    const onPointerMove = (event: PointerEvent) => {
      lastEvent = event
      if (pendingFrame) return
      pendingFrame = requestAnimationFrame(() => {
        pendingFrame = 0
        const e = lastEvent
        if (!e || generation !== learnGeneration) return
        const rect = chart.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return
        const nx = (e.clientX - rect.left) / rect.width - 0.5
        const ny = (e.clientY - rect.top) / rect.height - 0.5
        chart.style.setProperty("--lm-px", `${(nx * -24).toFixed(2)}px`)
        chart.style.setProperty("--lm-py", `${(ny * -18).toFixed(2)}px`)
      })
    }
    root.addEventListener("pointermove", onPointerMove, { passive: true })
    cleanups.push(() => {
      root.removeEventListener("pointermove", onPointerMove)
      if (pendingFrame) cancelAnimationFrame(pendingFrame)
    })
  }
}

if (!learnWindow.__aiLearnMapRuntime) {
  learnWindow.__aiLearnMapRuntime = true
  document.addEventListener("prenav", () => learnCleanup?.())
  document.addEventListener("nav", () => mountLearnMap())
}
