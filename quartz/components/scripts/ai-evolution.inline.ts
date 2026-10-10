import {
  daysSince,
  evolutionStats,
  moduleProgress,
  normalizeEvolutionData,
  type ConceptCard,
  type EvolutionData,
  type EvolutionModule,
  type TopicEntry,
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

function renderConcept(
  concept: ConceptCard,
  linkedTopics: TopicEntry[],
  resolveRelated: (ref: string) => string | undefined,
  renderLinkedTopic: (topic: TopicEntry) => HTMLElement,
): HTMLElement {
  const item = document.createElement("li")
  item.className = "ai-concept"
  item.dataset.concept = concept.id

  const head = document.createElement("button")
  head.type = "button"
  head.className = "ai-concept__head"
  head.setAttribute("aria-expanded", "false")
  const nameRow = document.createElement("span")
  nameRow.className = "ai-concept__namerow"
  const kind = document.createElement("em")
  kind.className = "ai-concept__kind"
  kind.textContent = concept.kind
  const name = document.createElement("span")
  name.className = "ai-concept__name"
  name.textContent = concept.name
  nameRow.append(kind, name)
  const definition = document.createElement("span")
  definition.className = "ai-concept__definition"
  definition.textContent = concept.definition
  const meta = document.createElement("span")
  meta.className = "ai-concept__meta"
  meta.textContent = linkedTopics.length > 0 ? `前沿 ×${linkedTopics.length}` : "待挂载前沿"
  head.append(nameRow, definition, meta)

  const fold = document.createElement("div")
  fold.className = "ai-concept__fold"
  const inner = document.createElement("div")
  inner.className = "ai-concept__inner"
  for (const field of concept.fields) {
    const block = document.createElement("div")
    block.className = "ai-concept__col"
    const heading = document.createElement("strong")
    heading.textContent = field.label
    const list = document.createElement("ul")
    for (const point of field.points) {
      const li = document.createElement("li")
      li.textContent = point
      list.append(li)
    }
    block.append(heading, list)
    inner.append(block)
  }
  if (concept.related.length > 0) {
    const rel = document.createElement("div")
    rel.className = "ai-concept__col ai-concept__related"
    const heading = document.createElement("strong")
    heading.textContent = "关联概念"
    const chips = document.createElement("p")
    for (const ref of concept.related) {
      const label = resolveRelated(ref)
      if (!label) continue
      const chip = document.createElement("span")
      chip.textContent = label
      chips.append(chip)
    }
    if (chips.childElementCount > 0) {
      rel.append(heading, chips)
      inner.append(rel)
    }
  }
  if (linkedTopics.length > 0) {
    const frontier = document.createElement("div")
    frontier.className = "ai-concept__frontier"
    const heading = document.createElement("strong")
    heading.textContent = `挂载前沿 · ${linkedTopics.length}`
    const list = document.createElement("ul")
    list.className = "ai-concept__topics"
    for (const topic of linkedTopics) list.append(renderLinkedTopic(topic))
    frontier.append(heading, list)
    inner.append(frontier)
  }
  fold.append(inner)

  item.append(head, fold)
  return item
}

function renderTopic(
  topic: TopicEntry,
  conceptNames: Map<string, string>,
  showChips = true,
): HTMLElement {
  const item = document.createElement("li")
  item.className = "ai-topic"

  const head = document.createElement("button")
  head.type = "button"
  head.className = "ai-topic__head"
  head.setAttribute("aria-expanded", "false")
  const titleWrap = document.createElement("span")
  titleWrap.className = "ai-topic__titlewrap"
  const titleSpan = document.createElement("span")
  titleSpan.className = "ai-topic__title"
  titleSpan.textContent = topic.title
  titleWrap.append(titleSpan)
  if (topic.tldr) {
    const tldr = document.createElement("span")
    tldr.className = "ai-topic__tldr"
    tldr.textContent = topic.tldr
    titleWrap.append(tldr)
  }
  const chevron = document.createElement("span")
  chevron.className = "ai-topic__chevron"
  chevron.setAttribute("aria-hidden", "true")
  head.append(titleWrap, chevron)

  const fold = document.createElement("div")
  fold.className = "ai-topic__fold"
  const inner = document.createElement("div")
  inner.className = "ai-topic__inner"
  if (showChips && topic.concepts.length > 0) {
    const chips = document.createElement("p")
    chips.className = "ai-topic__concepts"
    for (const id of topic.concepts) {
      const chip = document.createElement("span")
      chip.textContent = conceptNames.get(id) ?? id
      chips.append(chip)
    }
    inner.append(chips)
  }
  if (topic.body) {
    const bodyP = document.createElement("p")
    bodyP.className = "ai-topic__body"
    bodyP.textContent = topic.body
    inner.append(bodyP)
  }
  if (topic.source) {
    const sourceP = document.createElement("p")
    sourceP.className = "ai-topic__source"
    sourceP.textContent = `来源：${topic.source}`
    inner.append(sourceP)
  }
  fold.append(inner)

  item.append(head, fold)
  return item
}

function renderModuleCard(
  module: EvolutionModule,
  index: number,
  relatedIndex: Map<string, string>,
): HTMLElement {
  const card = document.createElement("article")
  card.className = "ai-module ai-reveal ai-spot"
  card.id = `ai-module-${module.code}`
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
  const parts: string[] = []
  if (module.concepts.length > 0) parts.push(`${module.concepts.length} 概念`)
  parts.push(module.topics.length > 0 ? `${module.topics.length} 前沿` : "尚无前沿")
  meta.textContent = parts.join(" · ")

  const meter = document.createElement("div")
  meter.className = "ai-module__meter"
  meter.append(bar, meta)

  card.append(head, name, summary, meter)

  const conceptNames = new Map(module.concepts.map((concept) => [concept.id, concept.name]))
  // Global resolver for cross-module related refs shaped like "M-02:c5".
  const resolveRelated = (ref: string): string | undefined => {
    const local = conceptNames.get(ref)
    if (local) return local
    const sep = ref.indexOf(":")
    if (sep < 0) return undefined
    const code = ref.slice(0, sep)
    const id = ref.slice(sep + 1)
    return relatedIndex.get(`${code}:${id}`)
  }

  if (module.concepts.length > 0) {
    const linkedByConcept = new Map<string, TopicEntry[]>()
    for (const topic of module.topics) {
      for (const id of topic.concepts) {
        const bucket = linkedByConcept.get(id)
        if (bucket) bucket.push(topic)
        else linkedByConcept.set(id, [topic])
      }
    }
    const conceptSection = document.createElement("div")
    conceptSection.className = "ai-module__layer"
    const label = document.createElement("p")
    label.className = "ai-module__layer-label"
    label.textContent = "概念骨架 · 展开看分析镜头与挂载前沿"
    const list = document.createElement("ul")
    list.className = "ai-concepts"
    // Group concept cards by sub-theme cluster, preserving first-seen order.
    let currentGroup: string | undefined
    for (const concept of module.concepts) {
      const group = concept.group || ""
      if (group !== currentGroup) {
        currentGroup = group
        if (group) {
          const groupItem = document.createElement("li")
          groupItem.className = "ai-concept-group"
          groupItem.textContent = group
          list.append(groupItem)
        }
      }
      list.append(
        renderConcept(concept, linkedByConcept.get(concept.id) ?? [], resolveRelated, (topic) =>
          renderTopic(topic, conceptNames, false),
        ),
      )
    }
    conceptSection.append(label, list)
    card.append(conceptSection)
  }

  // Safety net only: topics left with no concept reference (e.g. normalization
  // dropped unknown refs) would otherwise be invisible anywhere on the page.
  // In the normal case every topic is mounted inside its concept cards, so
  // this section renders nothing and the card tail stays clean; chronological
  // browsing lives in the evolution log section instead.
  const orphans = module.topics.filter((topic) => topic.concepts.length === 0)
  if (orphans.length > 0) {
    const allSection = document.createElement("div")
    allSection.className = "ai-module__layer ai-module__all-topics"
    const toggle = document.createElement("button")
    toggle.type = "button"
    toggle.className = "ai-module__all-toggle"
    toggle.setAttribute("aria-expanded", "false")
    const toggleLabel = document.createElement("span")
    toggleLabel.textContent = `未挂载前沿 · ${orphans.length} 条（待挂到概念）`
    const chevron = document.createElement("span")
    chevron.className = "ai-topic__chevron"
    chevron.setAttribute("aria-hidden", "true")
    toggle.append(toggleLabel, chevron)
    const fold = document.createElement("div")
    fold.className = "ai-topic__fold"
    const inner = document.createElement("div")
    inner.className = "ai-topic__inner"
    const list = document.createElement("ul")
    list.className = "ai-module__topics"
    for (const topic of orphans) list.append(renderTopic(topic, conceptNames))
    inner.append(list)
    fold.append(inner)
    allSection.append(toggle, fold)
    card.append(allSection)
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
  const holder = button.closest(".ai-topic, .ai-concept, .ai-log__entry, .ai-module__all-topics")
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
  const statConcepts = root.querySelector<HTMLElement>("[data-ai-stat-concepts]")
  const statTopics = root.querySelector<HTMLElement>("[data-ai-stat-topics]")
  const statUpdated = root.querySelector<HTMLElement>("[data-ai-stat-updated]")
  const statCycle = root.querySelector<HTMLElement>("[data-ai-stat-cycle]")
  const coreNodes = root.querySelector<HTMLElement>("[data-ai-core-nodes]")
  const coreTopics = root.querySelector<HTMLElement>("[data-ai-core-topics]")
  const coreVersion = root.querySelector<HTMLElement>("[data-ai-core-version]")

  if (data) {
    root.dataset.evolutionState = "live"
    const stats = evolutionStats(data)
    if (grid) {
      // Global "moduleCode:conceptId" → concept name index for cross-module
      // related references on concept cards.
      const relatedIndex = new Map<string, string>()
      for (const m of data.modules) {
        for (const concept of m.concepts) relatedIndex.set(`${m.code}:${concept.id}`, concept.name)
      }
      grid.replaceChildren(...data.modules.map((m, i) => renderModuleCard(m, i, relatedIndex)))
    }
    if (logList) logList.replaceChildren(...renderLog(data.log))
    if (statModules) countUp(statModules, stats.moduleCount, reduced)
    if (statConcepts) countUp(statConcepts, stats.conceptCount, reduced)
    if (statTopics) countUp(statTopics, stats.topicCount, reduced)
    // Constellation nodes mirror the live module data: status, progress dial,
    // topic count and jump target all refresh with every daily evolution.
    if (coreNodes) {
      const nodes = coreNodes.querySelectorAll<HTMLAnchorElement>("a.ai-node")
      data.modules.forEach((module, index) => {
        const node = nodes[index]
        if (!node) return
        node.dataset.status = module.status
        node.style.setProperty("--p", String(Math.round(moduleProgress(module) * 100)))
        node.setAttribute("href", `#ai-module-${module.code}`)
        const code = node.querySelector<HTMLElement>(".ai-node__code")
        if (code) code.textContent = module.code
        const name = node.querySelector<HTMLElement>(".ai-node__name")
        if (name) name.textContent = module.name
        const count = node.querySelector<HTMLElement>(".ai-node__count")
        if (count)
          count.textContent =
            module.concepts.length > 0 || module.topics.length > 0
              ? `${module.concepts.length} 概念 · ${module.topics.length} 前沿`
              : "0 点"
      })
    }
    if (coreTopics) countUp(coreTopics, stats.conceptCount + stats.topicCount, reduced)
    if (coreVersion) coreVersion.textContent = `v${data.version}`
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
      ".ai-topic__head, .ai-concept__head, .ai-log__head, .ai-module__all-toggle",
    )
    if (button && root.contains(button)) toggleFold(button)
  }
  root.addEventListener("click", onClick)
  cleanups.push(() => root.removeEventListener("click", onClick))

  // Constellation node clicks: smooth-scroll to the target module card and
  // flash it. The SPA router would otherwise scroll instantly on same-page
  // hash links, so we handle these anchors ourselves (capture phase, before
  // the router's window-level listener) and mirror the hash into the URL.
  const onNodeClick = (event: MouseEvent) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0)
      return
    const node = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a.ai-node")
    if (!node || !root.contains(node)) return
    const id = node.getAttribute("href")?.slice(1)
    if (!id) return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    event.stopPropagation()
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" })
    history.pushState({}, "", `#${encodeURIComponent(id)}`)
    target.classList.remove("is-flash")
    // Restart the flash animation even on rapid repeated clicks.
    void target.offsetWidth
    target.classList.add("is-flash")
    const stop = () => target.classList.remove("is-flash")
    target.addEventListener("animationend", stop, { once: true })
    cleanups.push(() => target.removeEventListener("animationend", stop))
  }
  root.addEventListener("click", onNodeClick, true)
  cleanups.push(() => root.removeEventListener("click", onNodeClick, true))

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
