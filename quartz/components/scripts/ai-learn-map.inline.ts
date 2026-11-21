/* Knowledge Atlas star-chart runtime (content/learn/index.md, .ai-learn--map).
   Prototype-faithful interactive SVG:
   - three orbit rings (two counter-rotating) + two flowing light dots
   - D1 data core at center
   - six stage nodes on the outer orbit with breathing halos
   - hover blooms a node; click highlights it and updates the topbar crumb
   Stage data comes from the hidden .ai-learn__stage skeleton in the DOM, so
   the chart can never drift from page content. All colors are --ka-* tokens
   so the chart flips correctly in both themes. Idempotent across SPA nav. */

type LearnWindow = Window & { __aiLearnMapRuntime?: boolean }

const learnWindow = window as LearnWindow
let learnCleanup: (() => void) | undefined

type StageDatum = {
  code: string
  name: string
  count: string
  color: string
  href: string
  angle: number
}

const STAGE_COLORS = [
  "var(--ka-cyan)",
  "var(--ka-violet)",
  "var(--ka-rot)",
  "var(--ka-green)",
  "var(--ka-amber)",
  "#6fa8ff",
]
const SHORT_NAME: Record<string, string> = {
  "S-01": "数学直觉",
  "S-02": "深度网络",
  "S-03": "稀疏与MoE",
  "S-04": "推理效率",
  "S-05": "记忆与智能体",
  "S-06": "安全与治理",
}
const ANGLES = [-150, -90, -30, 30, 90, 150]
const CX = 400
const CY = 210
const NS = "http://www.w3.org/2000/svg"

function el(tag: string, cls?: string): SVGElement {
  const node = document.createElementNS(NS, tag) as SVGElement
  if (cls)
    cls
      .split(/\s+/)
      .filter(Boolean)
      .forEach((c) => node.classList.add(c))
  return node
}

function readStages(root: HTMLElement): StageDatum[] {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(".ai-learn__stage"))
  return nodes.map((stage, i) => {
    const code =
      stage.querySelector<HTMLElement>(".ai-learn__code")?.textContent?.trim() || `S-0${i + 1}`
    const link = stage.querySelector<HTMLAnchorElement>("a.ai-learn__link")
    return {
      code,
      name: SHORT_NAME[code] || (link?.textContent?.trim() || "").slice(0, 8),
      count: "",
      color: STAGE_COLORS[i % STAGE_COLORS.length],
      href: link?.getAttribute("href") || "",
      angle: ANGLES[i % ANGLES.length],
    }
  })
}

function buildChart(stages: StageDatum[], reduced: boolean): SVGSVGElement {
  const svg = el("svg", "ka-starmap") as SVGSVGElement
  svg.setAttribute("viewBox", "0 0 800 420")
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
  svg.setAttribute("role", "img")
  svg.setAttribute("aria-label", "智能原理六阶段认知星图：沿轨道分布的六个阶段节点，点击进入")

  // Two counter-rotating orbit groups + one static outer ring.
  const rot1 = el("g", "ka-orbit-rot")
  const o1 = el("ellipse", "ka-orbit") as SVGEllipseElement
  o1.setAttribute("cx", String(CX))
  o1.setAttribute("cy", String(CY))
  o1.setAttribute("rx", "120")
  o1.setAttribute("ry", "52")
  rot1.append(o1)
  const rot2 = el("g", "ka-orbit-rot rev")
  const o2 = el("ellipse", "ka-orbit") as SVGEllipseElement
  o2.setAttribute("cx", String(CX))
  o2.setAttribute("cy", String(CY))
  o2.setAttribute("rx", "210")
  o2.setAttribute("ry", "92")
  rot2.append(o2)
  const o3 = el("ellipse", "ka-orbit") as SVGEllipseElement
  o3.setAttribute("cx", String(CX))
  o3.setAttribute("cy", String(CY))
  o3.setAttribute("rx", "300")
  o3.setAttribute("ry", "140")
  o3.style.opacity = "0.5"
  svg.append(rot1, rot2, o3)

  // Link lines from the core to each node.
  const links = el("g")
  const positions = stages.map((s) => {
    const rad = (s.angle * Math.PI) / 180
    return { x: CX + 285 * Math.cos(rad), y: CY + 128 * Math.sin(rad) }
  })
  stages.forEach((_, i) => {
    const p = positions[i]
    const line = el("line", "ka-linkline") as SVGLineElement
    line.setAttribute("x1", String(CX))
    line.setAttribute("y1", String(CY))
    line.setAttribute("x2", String(p.x))
    line.setAttribute("y2", String(p.y))
    links.append(line)
  })
  svg.append(links)

  // Flowing light dots riding the orbits (SVG-native, no JS frames).
  if (!reduced) {
    const f1 = el("circle", "ka-flowdot") as SVGCircleElement
    f1.setAttribute("r", "3")
    const m1 = document.createElementNS(NS, "animateMotion")
    m1.setAttribute("dur", "9s")
    m1.setAttribute("repeatCount", "indefinite")
    m1.setAttribute("path", "M400,210 m-210,0 a210,92 0 1,1 420,0 a210,92 0 1,1 -420,0")
    f1.append(m1)
    const f2 = el("circle", "ka-flowdot") as SVGCircleElement
    f2.setAttribute("r", "2.5")
    f2.style.setProperty("fill", "var(--ka-violet)")
    const m2 = document.createElementNS(NS, "animateMotion")
    m2.setAttribute("dur", "13s")
    m2.setAttribute("repeatCount", "indefinite")
    m2.setAttribute("path", "M400,210 m-300,0 a300,140 0 1,0 600,0 a300,140 0 1,0 -600,0")
    f2.append(m2)
    svg.append(f1, f2)
  }

  // D1 data core.
  const core = el("g", "ka-core")
  const glow = el("circle", "glow") as SVGCircleElement
  glow.setAttribute("cx", String(CX))
  glow.setAttribute("cy", String(CY))
  glow.setAttribute("r", "44")
  const disc = el("circle", "disc") as SVGCircleElement
  disc.setAttribute("cx", String(CX))
  disc.setAttribute("cy", String(CY))
  disc.setAttribute("r", "34")
  const big = el("text", "big") as SVGTextElement
  big.setAttribute("x", String(CX))
  big.setAttribute("y", "208")
  big.setAttribute("text-anchor", "middle")
  big.textContent = "D1"
  const sub = el("text", "sub") as SVGTextElement
  sub.setAttribute("x", String(CX))
  sub.setAttribute("y", "224")
  sub.setAttribute("text-anchor", "middle")
  sub.textContent = "CORE"
  core.append(glow, disc, big, sub)
  svg.append(core)

  // Six stage nodes.
  stages.forEach((s, i) => {
    const p = positions[i]
    const node = el("g", "ka-node") as SVGGElement
    node.setAttribute("style", `--ka-nc: ${s.color}`)
    node.dataset.stageIndex = String(i)
    node.setAttribute("role", "link")
    node.setAttribute("tabindex", "0")
    node.setAttribute("aria-label", `${s.code} ${s.name}`)
    const halo = el("circle", "halo") as SVGCircleElement
    halo.setAttribute("cx", String(p.x))
    halo.setAttribute("cy", String(p.y))
    halo.setAttribute("r", "30")
    const ring = el("circle", "ring") as SVGCircleElement
    ring.setAttribute("cx", String(p.x))
    ring.setAttribute("cy", String(p.y))
    ring.setAttribute("r", "19")
    const dot = el("circle", "core") as SVGCircleElement
    dot.setAttribute("cx", String(p.x))
    dot.setAttribute("cy", String(p.y))
    dot.setAttribute("r", "6")
    const code = el("text", "code") as SVGTextElement
    code.setAttribute("x", String(p.x))
    code.setAttribute("y", String(p.y - 26))
    code.setAttribute("text-anchor", "middle")
    code.textContent = s.code
    const name = el("text", "name") as SVGTextElement
    name.setAttribute("x", String(p.x))
    name.setAttribute("y", String(p.y + 34))
    name.setAttribute("text-anchor", "middle")
    name.textContent = s.name
    node.append(halo, ring, dot, code, name)
    svg.append(node)
  })

  return svg
}

function mountLearnMap(): void {
  learnCleanup?.()
  learnCleanup = undefined
  const root = document.querySelector<HTMLElement>(".ai-learn--map")
  if (!root) return
  const slot = root.querySelector<HTMLElement>("[data-ai-lm-chart]")
  if (!slot) return
  const stages = readStages(root)
  if (!stages.length) return

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const chart = buildChart(stages, reduced)
  slot.replaceChildren(chart)

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

  const activate = (node: SVGGElement) => {
    const index = node.dataset.stageIndex
    if (index === undefined) return
    chart.querySelectorAll<SVGGElement>(".ka-node").forEach((n) => n.classList.remove("hot"))
    node.classList.add("hot")
    const s = stages[Number(index)]
    if (!s) return
    const crumb = document.querySelector<HTMLElement>(".ka-crumb")
    if (crumb) {
      crumb.innerHTML =
        `<span>知识星图</span><span class="ka-sep"> / </span>` +
        `<span>D1 智能原理</span><span class="ka-sep"> / </span>` +
        `<b>${s.code} ${s.name}</b>`
    }
  }
  const onActivateEvent = (event: Event) => {
    const node = (event.target as Element | null)?.closest?.(".ka-node") as SVGGElement | undefined
    if (node) activate(node)
  }
  const onKey = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return
    const node = (event.target as Element | null)?.closest?.(".ka-node") as SVGGElement | undefined
    if (!node) return
    event.preventDefault()
    const s = stages[Number(node.dataset.stageIndex)]
    if (s?.href) window.location.assign(s.href)
  }
  chart.addEventListener("pointerover", onActivateEvent)
  chart.addEventListener("click", onActivateEvent)
  chart.addEventListener("keydown", onKey)
  cleanups.push(() => {
    chart.removeEventListener("pointerover", onActivateEvent)
    chart.removeEventListener("click", onActivateEvent)
    chart.removeEventListener("keydown", onKey)
  })
}

if (!learnWindow.__aiLearnMapRuntime) {
  learnWindow.__aiLearnMapRuntime = true
  document.addEventListener("prenav", () => learnCleanup?.())
  document.addEventListener("nav", () => mountLearnMap())
}
