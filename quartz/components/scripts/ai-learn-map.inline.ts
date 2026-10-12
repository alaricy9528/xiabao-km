/* Learning-map constellation runtime (content/learn/ai-learning-map).
   Renders an interactive SVG star chart of the six principle stages:
   - pointer parallax: the whole constellation drifts subtly with the cursor
   - hover: node brightens, its halo grows and the linked stage card lifts
   - click: smooth-scrolls to the stage card on the same page and flashes it
   Stage data is read from the static DOM (the no-JS skeleton) so the chart
   never drifts from the page content. */

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

const STAGE_ACCENTS = [
  "var(--ai-cyan)",
  "var(--ai-violet)",
  "var(--ai-magenta)",
  "var(--ai-green)",
  "var(--ai-amber)",
  "var(--ai-blue)",
]

/* Elliptical orbit for six nodes, sitting exactly on the decorative ring
   (center 520,245 / rx 190 / ry 130), starting top-right, clockwise. */
const NODE_POSITIONS: Array<{ x: number; y: number }> = [
  { x: 615, y: 132 },
  { x: 710, y: 245 },
  { x: 615, y: 358 },
  { x: 425, y: 358 },
  { x: 330, y: 245 },
  { x: 425, y: 132 },
]

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

function buildChart(stages: StageDatum[]): SVGSVGElement {
  const NS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(NS, "svg")
  // Tight viewBox around the ring + labels so the constellation fills the
  // panel instead of floating in empty margin.
  svg.setAttribute("viewBox", "250 55 540 385")
  svg.setAttribute("role", "img")
  svg.setAttribute("aria-label", "学习路线星座图：六个阶段，点击节点跳转到对应阶段")
  svg.classList.add("ai-lm__svg")

  const drift = document.createElementNS(NS, "g")
  drift.classList.add("ai-lm__drift")
  svg.append(drift)

  // Faint orbit ring behind the constellation
  const orbit = document.createElementNS(NS, "ellipse")
  orbit.setAttribute("cx", "520")
  orbit.setAttribute("cy", "245")
  orbit.setAttribute("rx", "190")
  orbit.setAttribute("ry", "130")
  orbit.classList.add("ai-lm__orbit")
  drift.append(orbit)

  // Links between consecutive stages (closed loop)
  const links = document.createElementNS(NS, "g")
  links.classList.add("ai-lm__links")
  for (let i = 0; i < stages.length; i++) {
    const a = NODE_POSITIONS[i]
    const b = NODE_POSITIONS[(i + 1) % stages.length]
    if (!a || !b) continue
    const line = document.createElementNS(NS, "line")
    line.setAttribute("x1", String(a.x))
    line.setAttribute("y1", String(a.y))
    line.setAttribute("x2", String(b.x))
    line.setAttribute("y2", String(b.y))
    links.append(line)
  }
  drift.append(links)

  // Stage nodes
  stages.forEach((stage, index) => {
    const pos = NODE_POSITIONS[index]
    if (!pos) return
    const anchor = document.createElementNS(NS, "a")
    anchor.setAttribute("href", stage.href)
    anchor.setAttribute("data-stage-index", String(index))
    anchor.setAttribute("data-router-ignore", "")
    anchor.classList.add("ai-lm__node")
    anchor.style.setProperty("--accent", stage.accent)
    anchor.style.setProperty("--d", `${index * 90}ms`)

    const halo = document.createElementNS(NS, "circle")
    halo.setAttribute("cx", String(pos.x))
    halo.setAttribute("cy", String(pos.y))
    halo.setAttribute("r", "30")
    halo.classList.add("ai-lm__halo")

    const dot = document.createElementNS(NS, "circle")
    dot.setAttribute("cx", String(pos.x))
    dot.setAttribute("cy", String(pos.y))
    dot.setAttribute("r", "11")
    dot.classList.add("ai-lm__dot")

    const code = document.createElementNS(NS, "text")
    code.setAttribute("x", String(pos.x))
    code.setAttribute("y", String(pos.y - 40))
    code.setAttribute("text-anchor", "middle")
    code.classList.add("ai-lm__code")
    code.textContent = stage.code

    const name = document.createElementNS(NS, "text")
    name.setAttribute("x", String(pos.x))
    name.setAttribute("y", String(pos.y + 52))
    name.setAttribute("text-anchor", "middle")
    name.classList.add("ai-lm__name")
    name.textContent = stage.name

    anchor.append(halo, dot, code, name)
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
  const chart = buildChart(stages)
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

  // Click: smooth-scroll to the stage card and flash it. The anchors carry
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
        chart.style.setProperty("--lm-px", `${(nx * -22).toFixed(2)}px`)
        chart.style.setProperty("--lm-py", `${(ny * -16).toFixed(2)}px`)
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
