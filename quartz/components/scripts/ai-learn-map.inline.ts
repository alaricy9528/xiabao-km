/* Learning-map constellation runtime (content/learn/*).
   Two jobs:
   1. Overview page: interactive SVG star chart of the six principle stages
      (pointer parallax, hover halo + linked card lift, click to jump & flash).
   2. Sidebar: replaces the stock canvas force-graph on learn pages with a
      mini constellation in the same visual language (accent dots, halos,
      dashed links, hover glow, click = SPA navigation).
   Stage data is read from the static DOM / contentIndex so charts never
   drift from the page content. */

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
  document.addEventListener("nav", () => {
    mountLearnMap()
    mountSidebarChart()
  })
}

/* ---------- sidebar mini constellation ----------
   On learn pages the stock canvas force-graph is hidden by CSS and replaced
   by a mini chart in the main constellation's visual language: hub = the
   overview page, six stage satellites in stage accent colors, dashed links,
   hover halo, click = SPA navigation. The current page's node wears a ring. */

const SIDEBAR_HUB = "learn/ai-learning-map"

function sidebarPositions(count: number): Array<{ x: number; y: number }> {
  const pts: Array<{ x: number; y: number }> = []
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(count, 1)
    pts.push({ x: 120 + 86 * Math.cos(angle), y: 122 + 86 * Math.sin(angle) })
  }
  return pts
}

async function mountSidebarChart(): Promise<void> {
  const slug = document.body.dataset.slug ?? ""
  if (!slug.startsWith("learn/")) return
  const outer = document.querySelector<HTMLElement>(".graph .graph-outer")
  if (!outer) return
  // Re-mount cleanly on SPA navigation.
  outer.querySelector(".ai-lms")?.remove()

  let titles = new Map<string, string>()
  try {
    if (typeof fetchData !== "undefined") {
      const index = (await fetchData) ?? {}
      for (const [key, value] of Object.entries(index)) {
        if (key.startsWith("learn/") && typeof value?.title === "string") {
          titles.set(key, value.title)
        }
      }
    }
  } catch {
    titles = new Map()
  }
  if (!outer.isConnected) return

  const stageSlugs = Array.from(titles.keys())
    .filter((key) => key !== SIDEBAR_HUB && /\/s0\d/.test(key))
    .sort()
  if (stageSlugs.length === 0) return

  const heading = document.querySelector<HTMLElement>(".graph > h3")
  if (heading) heading.textContent = "学习关系图谱"

  const NS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(NS, "svg")
  svg.setAttribute("viewBox", "0 0 240 244")
  svg.setAttribute("role", "img")
  svg.setAttribute("aria-label", "学习关系星座：中心为学习目录，周围为六个阶段，点击跳转")
  svg.classList.add("ai-lms")

  const links = document.createElementNS(NS, "g")
  const positions = sidebarPositions(stageSlugs.length)
  stageSlugs.forEach((_stageSlug, index) => {
    const pos = positions[index]
    if (!pos) return
    const line = document.createElementNS(NS, "line")
    line.setAttribute("x1", "120")
    line.setAttribute("y1", "122")
    line.setAttribute("x2", String(pos.x))
    line.setAttribute("y2", String(pos.y))
    line.classList.add("ai-lms__link")
    links.append(line)
  })
  svg.append(links)

  const makeNode = (
    seg: string,
    fullSlug: string,
    x: number,
    y: number,
    accent: string | undefined,
    isCurrent: boolean,
    label?: string,
  ) => {
    const anchor = document.createElementNS(NS, "a")
    anchor.setAttribute("href", `./${seg}`)
    anchor.classList.add("ai-lms__node")
    if (accent) anchor.style.setProperty("--accent", accent)
    if (isCurrent) anchor.classList.add("ai-lms__node--current")
    const title = document.createElementNS(NS, "title")
    title.textContent = titles.get(fullSlug) ?? seg
    const halo = document.createElementNS(NS, "circle")
    halo.setAttribute("cx", String(x))
    halo.setAttribute("cy", String(y))
    halo.setAttribute("r", "16")
    halo.classList.add("ai-lms__halo")
    const dot = document.createElementNS(NS, "circle")
    dot.setAttribute("cx", String(x))
    dot.setAttribute("cy", String(y))
    dot.setAttribute("r", "6")
    dot.classList.add("ai-lms__dot")
    anchor.append(title, halo, dot)
    if (label) {
      const text = document.createElementNS(NS, "text")
      text.setAttribute("x", String(x))
      text.setAttribute("y", String(y + 27))
      text.setAttribute("text-anchor", "middle")
      text.classList.add("ai-lms__label")
      text.textContent = label
      anchor.append(text)
    }
    return anchor
  }

  // Hub first, then satellites in stage order.
  svg.append(
    makeNode(
      "ai-learning-map",
      SIDEBAR_HUB,
      120,
      122,
      "var(--ai-cyan)",
      slug === SIDEBAR_HUB,
      "目录",
    ),
  )
  stageSlugs.forEach((stageSlug, index) => {
    const pos = positions[index]
    if (!pos) return
    const seg = stageSlug.slice("learn/".length)
    svg.append(
      makeNode(
        seg,
        stageSlug,
        pos.x,
        pos.y,
        STAGE_ACCENTS[index % STAGE_ACCENTS.length],
        slug === stageSlug,
      ),
    )
  })

  outer.prepend(svg)
}
