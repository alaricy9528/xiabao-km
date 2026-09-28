import {
  daysSince,
  evolutionStats,
  moduleProgress,
  normalizeEvolutionData,
  splitTopic,
  type EvolutionData,
  type EvolutionModule,
} from "./ai-evolution-data"

type EvolutionWindow = Window & { __aiEvolutionRuntime?: boolean }

const runtimeWindow = window as EvolutionWindow
let activeCleanup: (() => void) | undefined
let mountGeneration = 0

function statusLabel(status: EvolutionModule["status"]): string {
  switch (status) {
    case "mature":
      return "成熟"
    case "growing":
      return "生长中"
    default:
      return "骨架"
  }
}

/* ---------- rendering ---------- */

function renderTopic(raw: string): HTMLElement {
  const { title, body, source } = splitTopic(raw)
  const item = document.createElement("li")
  item.className = "ai-topic"

  const head = document.createElement("button")
  head.type = "button"
  head.className = "ai-topic__head"
  head.setAttribute("aria-expanded", "false")
  const titleSpan = document.createElement("span")
  titleSpan.className = "ai-topic__title"
  titleSpan.textContent = title
  const chevron = document.createElement("span")
  chevron.className = "ai-topic__chevron"
  chevron.setAttribute("aria-hidden", "true")
  head.append(titleSpan, chevron)

  const fold = document.createElement("div")
  fold.className = "ai-topic__fold"
  const inner = document.createElement("div")
  inner.className = "ai-topic__inner"
  if (body) {
    const bodyP = document.createElement("p")
    bodyP.className = "ai-topic__body"
    bodyP.textContent = body
    inner.append(bodyP)
  }
  if (source) {
    const sourceP = document.createElement("p")
    sourceP.className = "ai-topic__source"
    sourceP.textContent = `来源：${source}`
    inner.append(sourceP)
  }
  fold.append(inner)

  item.append(head, fold)
  return item
}

function renderModuleCard(module: EvolutionModule, index: number): HTMLElement {
  const card = document.createElement("article")
  card.className = "ai-module ai-reveal ai-spot"
  card.style.setProperty("--d", String(index))
  card.dataset.status = module.status

  const head = document.createElement("header")
  const code = document.createElement("span")
  code.className = "ai-module__code"
  code.textContent = module.code
  const badge = document.createElement("span")
  badge.className = "ai-module__badge"
  badge.textContent = statusLabel(module.status)
  head.append(code, badge)

  const name = document.createElement("h3")
  name.className = "ai-module__name"
  name.textContent = module.name

  const summary = document.createElement("p")
  summary.className = "ai-module__summary"
  summary.textContent = module.summary

  const pct = Math.round(moduleProgress(module) * 100)
  const bar = document.createElement("div")
  bar.className = "ai-module__bar"
  bar.setAttribute("role", "img")
  bar.setAttribute("aria-label", `${module.name} 演进进度 ${pct}%`)
  const fill = document.createElement("span")
  // Start collapsed; the reveal observer grows it to the real width.
  fill.dataset.w = `${pct}%`
  fill.style.width = "0%"
  bar.append(fill)

  const meta = document.createElement("p")
  meta.className = "ai-module__meta"
  meta.textContent = module.topics.length > 0 ? `${module.topics.length} 个知识点` : "尚无知识点"

  const meter = document.createElement("div")
  meter.className = "ai-module__meter"
  meter.append(bar, meta)

  card.append(head, name, summary, meter)

  if (module.topics.length > 0) {
    const list = document.createElement("ul")
    list.className = "ai-module__topics"
    for (const topic of module.topics) list.append(renderTopic(topic))
    card.append(list)
  }
  return card
}

function renderLog(list: EvolutionData["log"]): HTMLElement[] {
  if (list.length === 0) {
    const empty = document.createElement("li")
    empty.className = "ai-log__empty"
    empty.textContent = "演进日志尚未开始。每日自我更新启动后，这里会记录框架的每一次生长。"
    return [empty]
  }
  return list.map((entry, index) => {
    const item = document.createElement("li")
    item.className = "ai-log__entry ai-reveal ai-spot"
    item.style.setProperty("--d", String(index))
    if (index === 0) item.classList.add("is-open")

    const head = document.createElement("button")
    head.type = "button"
    head.className = "ai-log__head"
    head.setAttribute("aria-expanded", index === 0 ? "true" : "false")

    const date = document.createElement("time")
    date.dateTime = entry.date
    date.textContent = entry.date

    const titleWrap = document.createElement("span")
    titleWrap.className = "ai-log__title"
    const title = document.createElement("strong")
    title.textContent = entry.title
    titleWrap.append(title)
    if (index === 0) {
      const fresh = document.createElement("em")
      fresh.className = "ai-log__new"
      fresh.textContent = "最新"
      titleWrap.append(fresh)
    }

    const chevron = document.createElement("span")
    chevron.className = "ai-log__chevron"
    chevron.setAttribute("aria-hidden", "true")

    head.append(date, titleWrap, chevron)

    const fold = document.createElement("div")
    fold.className = "ai-log__fold"
    const inner = document.createElement("div")
    inner.className = "ai-log__inner"
    const detail = document.createElement("p")
    detail.textContent = entry.detail
    inner.append(detail)
    fold.append(inner)

    item.append(head, fold)
    return item
  })
}

/* ---------- interaction helpers ---------- */

function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
}

function countUp(el: HTMLElement, target: number, reduced: boolean): void {
  const text = String(target).padStart(2, "0")
  if (reduced || target === 0) {
    el.textContent = text
    return
  }
  const duration = 900
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    el.textContent = String(Math.round(target * eased)).padStart(2, "0")
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function setupReveal(root: HTMLElement, reduced: boolean): IntersectionObserver | undefined {
  const targets = root.querySelectorAll<HTMLElement>(".ai-reveal")
  if (reduced) {
    for (const el of targets) {
      el.classList.add("is-visible")
      const fill = el.querySelector<HTMLElement>(".ai-module__bar span[data-w]")
      if (fill) fill.style.width = fill.dataset.w ?? ""
    }
    return undefined
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        el.classList.add("is-visible")
        const fill = el.querySelector<HTMLElement>(".ai-module__bar span[data-w]")
        if (fill) fill.style.width = fill.dataset.w ?? ""
        observer.unobserve(el)
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
  )
  for (const el of targets) observer.observe(el)
  return observer
}

function toggleFold(button: HTMLElement): void {
  const holder = button.closest(".ai-topic, .ai-log__entry")
  if (!holder) return
  const open = holder.classList.toggle("is-open")
  button.setAttribute("aria-expanded", open ? "true" : "false")
}

/* ---------- data loading ---------- */

function siteRoot(): string {
  // Derive the site root at runtime: the favicon link is always emitted as an
  // absolute URL ending in /static/icon.png, so stripping that suffix yields the
  // baseDir-aware root (e.g. https://host/xiabao-km/). Falls back to origin root.
  const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (icon?.href) {
    try {
      const url = new URL(icon.href, window.location.href)
      url.pathname = url.pathname.replace(/\/static\/icon\.png.*$/, "/")
      url.search = ""
      url.hash = ""
      return url.href
    } catch {
      /* fall through */
    }
  }
  return new URL("/", window.location.href).href
}

async function loadEvolutionData(): Promise<EvolutionData | undefined> {
  try {
    const response = await fetch(new URL("static/ai-evolution.json", siteRoot()), {
      cache: "no-store",
    })
    if (!response.ok) return undefined
    return normalizeEvolutionData(await response.json())
  } catch {
    return undefined
  }
}

/* ---------- mount ---------- */

async function mountEvolutionHome(): Promise<void> {
  const generation = ++mountGeneration
  activeCleanup?.()
  activeCleanup = undefined
  const root = document.querySelector<HTMLElement>(".ai-home")
  if (!root) return

  let disposed = false
  const cleanups: Array<() => void> = []
  const cleanup = () => {
    disposed = true
    for (const fn of cleanups.splice(0)) {
      try {
        fn()
      } catch {
        /* best effort */
      }
    }
  }
  activeCleanup = cleanup
  window.addCleanup(cleanup)

  const reduced = prefersReducedMotion()

  const data = await loadEvolutionData()
  if (disposed || generation !== mountGeneration || !root.isConnected) return

  // Gate all entrance animations behind this class so no-JS visitors keep the
  // fully visible static skeleton.
  root.classList.add("ai-anim")

  const grid = root.querySelector<HTMLElement>("[data-ai-modules]")
  const logList = root.querySelector<HTMLElement>("[data-ai-log]")
  const statModules = root.querySelector<HTMLElement>("[data-ai-stat-modules]")
  const statTopics = root.querySelector<HTMLElement>("[data-ai-stat-topics]")
  const statUpdated = root.querySelector<HTMLElement>("[data-ai-stat-updated]")
  const statCycle = root.querySelector<HTMLElement>("[data-ai-stat-cycle]")

  if (data) {
    root.dataset.evolutionState = "live"
    const stats = evolutionStats(data)
    if (grid) grid.replaceChildren(...data.modules.map(renderModuleCard))
    if (logList) logList.replaceChildren(...renderLog(data.log))
    if (statModules) countUp(statModules, stats.moduleCount, reduced)
    if (statTopics) countUp(statTopics, stats.topicCount, reduced)
    if (statUpdated) {
      statUpdated.textContent = data.lastUpdated
      const age = daysSince(data.lastUpdated, new Date())
      const freshness = root.querySelector<HTMLElement>("[data-ai-freshness]")
      if (freshness)
        freshness.textContent =
          age === 0 ? "今日已演进" : age === 1 ? "昨日演进" : `${age} 天前演进`
    }
    if (statCycle) statCycle.textContent = data.cycle === "daily" ? "每日" : data.cycle
  } else {
    root.dataset.evolutionState = "static"
    const freshness = root.querySelector<HTMLElement>("[data-ai-freshness]")
    if (freshness) freshness.textContent = "静态骨架"
    // Reveal static skeleton elements too.
    for (const el of root.querySelectorAll<HTMLElement>(".ai-reveal")) {
      el.classList.add("is-visible")
    }
  }

  // Stagger reveal for static sections (protocol / hero) as well.
  const revealObserver = setupReveal(root, reduced)
  if (revealObserver) cleanups.push(() => revealObserver.disconnect())

  // Fold toggling via delegation (works for dynamically rendered items).
  const onClick = (event: MouseEvent) => {
    const button = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      ".ai-topic__head, .ai-log__head",
    )
    if (button && root.contains(button)) toggleFold(button)
  }
  root.addEventListener("click", onClick)
  cleanups.push(() => root.removeEventListener("click", onClick))

  if (!reduced) {
    // Pointer spotlight + hero parallax, rAF-throttled and delegated.
    let pendingFrame = 0
    let lastEvent: PointerEvent | undefined
    const onPointerMove = (event: PointerEvent) => {
      lastEvent = event
      if (pendingFrame) return
      pendingFrame = requestAnimationFrame(() => {
        pendingFrame = 0
        const e = lastEvent
        if (!e || disposed) return
        const spot = (e.target as HTMLElement | null)?.closest<HTMLElement>(".ai-spot")
        if (spot && root.contains(spot)) {
          const rect = spot.getBoundingClientRect()
          spot.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`)
          spot.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`)
        }
        const core = (e.target as HTMLElement | null)?.closest<HTMLElement>(".ai-core")
        if (core && root.contains(core)) {
          const rect = core.getBoundingClientRect()
          const nx = (e.clientX - rect.left) / rect.width - 0.5
          const ny = (e.clientY - rect.top) / rect.height - 0.5
          core.style.setProperty("--px", `${(nx * 18).toFixed(2)}px`)
          core.style.setProperty("--py", `${(ny * 14).toFixed(2)}px`)
        }
      })
    }
    root.addEventListener("pointermove", onPointerMove, { passive: true })
    cleanups.push(() => {
      root.removeEventListener("pointermove", onPointerMove)
      if (pendingFrame) cancelAnimationFrame(pendingFrame)
    })
  }
}

if (!runtimeWindow.__aiEvolutionRuntime) {
  runtimeWindow.__aiEvolutionRuntime = true
  document.addEventListener("prenav", () => activeCleanup?.())
  document.addEventListener("nav", () => void mountEvolutionHome())
}
