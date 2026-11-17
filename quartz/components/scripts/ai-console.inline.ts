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

type EvolutionWindow = Window & { __aiConsoleRuntime?: boolean }

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

function renderLinkedTopic(topic: TopicEntry, conceptNames: Map<string, string>): HTMLElement {
  const item = document.createElement("li")
  item.className = "ac-frontier-item"
  const head = document.createElement("button")
  head.type = "button"
  head.className = "ac-frontier-item__head"
  head.setAttribute("aria-expanded", "false")
  const title = document.createElement("span")
  title.className = "ac-frontier-item__title"
  title.textContent = topic.title
  const chevron = document.createElement("span")
  chevron.className = "ac-chevron"
  chevron.setAttribute("aria-hidden", "true")
  head.append(title, chevron)
  const fold = document.createElement("div")
  fold.className = "ac-fold"
  const inner = document.createElement("div")
  inner.className = "ac-fold__inner"
  if (topic.concepts.length > 0) {
    const chips = document.createElement("p")
    chips.className = "ac-frontier-item__concepts"
    for (const id of topic.concepts) {
      const chip = document.createElement("span")
      chip.textContent = conceptNames.get(id) ?? id
      chips.append(chip)
    }
    inner.append(chips)
  }
  if (topic.tldr) {
    const tldr = document.createElement("p")
    tldr.className = "ac-frontier-item__tldr"
    tldr.textContent = topic.tldr
    inner.append(tldr)
  }
  if (topic.body) {
    const body = document.createElement("p")
    body.className = "ac-frontier-item__body"
    body.textContent = topic.body
    inner.append(body)
  }
  if (topic.source) {
    const source = document.createElement("p")
    source.className = "ac-frontier-item__source"
    source.textContent = `来源：${topic.source}`
    inner.append(source)
  }
  fold.append(inner)
  item.append(head, fold)
  return item
}

function renderConcept(
  concept: ConceptCard,
  linkedTopics: TopicEntry[],
  resolveRelated: (ref: string) => string | undefined,
  conceptNames: Map<string, string>,
): HTMLElement {
  const item = document.createElement("li")
  item.className = "ac-concept"
  item.dataset.concept = concept.id

  const head = document.createElement("button")
  head.type = "button"
  head.className = "ac-concept__head"
  head.setAttribute("aria-expanded", "false")
  const namerow = document.createElement("span")
  namerow.className = "ac-concept__namerow"
  const kind = document.createElement("em")
  kind.className = "ac-concept__kind"
  kind.textContent = concept.kind
  const name = document.createElement("span")
  name.className = "ac-concept__name"
  name.textContent = concept.name
  namerow.append(kind, name)
  const meta = document.createElement("span")
  meta.className = "ac-concept__meta"
  meta.textContent = linkedTopics.length > 0 ? `前沿 ${linkedTopics.length}` : "待挂载"
  const chevron = document.createElement("span")
  chevron.className = "ac-chevron"
  chevron.setAttribute("aria-hidden", "true")
  head.append(namerow, meta, chevron)

  const fold = document.createElement("div")
  fold.className = "ac-fold"
  const inner = document.createElement("div")
  inner.className = "ac-fold__inner ac-concept__inner"

  const definition = document.createElement("p")
  definition.className = "ac-concept__definition"
  definition.textContent = concept.definition
  inner.append(definition)

  if (concept.fields.length > 0) {
    const fields = document.createElement("div")
    fields.className = "ac-concept__fields"
    for (const field of concept.fields) {
      const col = document.createElement("div")
      col.className = "ac-concept__field"
      const heading = document.createElement("strong")
      heading.textContent = field.label
      const list = document.createElement("ul")
      for (const point of field.points) {
        const li = document.createElement("li")
        li.textContent = point
        list.append(li)
      }
      col.append(heading, list)
      fields.append(col)
    }
    inner.append(fields)
  }

  if (concept.related.length > 0) {
    const rel = document.createElement("div")
    rel.className = "ac-concept__related"
    const heading = document.createElement("span")
    heading.textContent = "关联"
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
    frontier.className = "ac-concept__frontier"
    const heading = document.createElement("strong")
    heading.textContent = `挂载前沿 · ${linkedTopics.length}`
    const list = document.createElement("ul")
    list.className = "ac-frontier"
    for (const topic of linkedTopics) list.append(renderLinkedTopic(topic, conceptNames))
    frontier.append(heading, list)
    inner.append(frontier)
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
  card.className = "ac-module ac-reveal"
  card.id = `ac-module-${module.code}`
  card.style.setProperty("--d", String(index))
  card.dataset.status = module.status

  const head = document.createElement("header")
  head.className = "ac-module__head"
  const code = document.createElement("span")
  code.className = "ac-module__idx"
  code.textContent = module.code
  const badge = document.createElement("span")
  badge.className = "ac-module__state"
  badge.textContent = statusLabel(module.status)
  head.append(code, badge)

  const name = document.createElement("h3")
  name.className = "ac-module__name"
  name.textContent = module.name

  const summary = document.createElement("p")
  summary.className = "ac-module__sum"
  summary.textContent = module.summary

  const pct = Math.round(moduleProgress(module) * 100)
  const meter = document.createElement("div")
  meter.className = "ac-module__meter"
  const track = document.createElement("span")
  track.className = "ac-module__track"
  const fill = document.createElement("span")
  fill.dataset.w = `${pct}%`
  fill.style.width = "0%"
  track.append(fill)
  const count = document.createElement("span")
  count.className = "ac-module__count"
  const parts: string[] = []
  if (module.concepts.length > 0)
    parts.push(`${String(module.concepts.length).padStart(2, "0")} 概念`)
  parts.push(
    module.topics.length > 0 ? `${String(module.topics.length).padStart(2, "0")} 前沿` : "尚无前沿",
  )
  count.textContent = parts.join(" · ")
  meter.append(track, count)

  card.append(head, name, summary, meter)

  const conceptNames = new Map(module.concepts.map((concept) => [concept.id, concept.name]))
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
    const layer = document.createElement("div")
    layer.className = "ac-layer"
    const toggle = document.createElement("button")
    toggle.type = "button"
    toggle.className = "ac-layer__toggle"
    toggle.setAttribute("aria-expanded", "false")
    const label = document.createElement("span")
    label.textContent = "概念骨架"
    const n = document.createElement("b")
    n.textContent = String(module.concepts.length).padStart(2, "0")
    const hint = document.createElement("i")
    hint.textContent = "展开"
    const chevron = document.createElement("span")
    chevron.className = "ac-chevron"
    chevron.setAttribute("aria-hidden", "true")
    toggle.append(label, n, hint, chevron)

    const fold = document.createElement("div")
    fold.className = "ac-fold"
    const inner = document.createElement("div")
    inner.className = "ac-fold__inner"
    const list = document.createElement("ul")
    list.className = "ac-concepts"
    const linkedByConcept = new Map<string, TopicEntry[]>()
    for (const topic of module.topics) {
      for (const id of topic.concepts) {
        const bucket = linkedByConcept.get(id)
        if (bucket) bucket.push(topic)
        else linkedByConcept.set(id, [topic])
      }
    }
    let currentGroup: string | undefined
    for (const concept of module.concepts) {
      const group = concept.group || ""
      if (group !== currentGroup) {
        currentGroup = group
        if (group) {
          const groupItem = document.createElement("li")
          groupItem.className = "ac-concept-group"
          groupItem.textContent = group
          list.append(groupItem)
        }
      }
      list.append(
        renderConcept(concept, linkedByConcept.get(concept.id) ?? [], resolveRelated, conceptNames),
      )
    }
    inner.append(list)
    fold.append(inner)
    layer.append(toggle, fold)
    card.append(layer)
  }

  // Only render a fallback for genuinely unmounted topics; normally empty.
  const orphans = module.topics.filter((topic) => topic.concepts.length === 0)
  if (orphans.length > 0) {
    const layer = document.createElement("div")
    layer.className = "ac-layer ac-layer--orphan"
    const toggle = document.createElement("button")
    toggle.type = "button"
    toggle.className = "ac-layer__toggle"
    toggle.setAttribute("aria-expanded", "false")
    const label = document.createElement("span")
    label.textContent = `未挂载前沿 · ${orphans.length}`
    const chevron = document.createElement("span")
    chevron.className = "ac-chevron"
    chevron.setAttribute("aria-hidden", "true")
    toggle.append(label, chevron)
    const fold = document.createElement("div")
    fold.className = "ac-fold"
    const inner = document.createElement("div")
    inner.className = "ac-fold__inner"
    const list = document.createElement("ul")
    list.className = "ac-frontier"
    for (const topic of orphans) list.append(renderLinkedTopic(topic, conceptNames))
    inner.append(list)
    fold.append(inner)
    layer.append(toggle, fold)
    card.append(layer)
  }

  return card
}

function renderLog(list: EvolutionData["log"]): HTMLElement[] {
  if (list.length === 0) {
    const empty = document.createElement("li")
    empty.className = "ac-log__empty"
    empty.textContent = "演进日志尚未开始。每日更新启动后，这里会记录框架的每一次生长。"
    return [empty]
  }
  return list.map((entry, index) => {
    const item = document.createElement("li")
    item.className = "ac-log__entry ac-reveal"
    item.style.setProperty("--d", String(index))
    if (index === 0) item.classList.add("is-open")

    const head = document.createElement("button")
    head.type = "button"
    head.className = "ac-log__head"
    head.setAttribute("aria-expanded", index === 0 ? "true" : "false")
    const date = document.createElement("time")
    date.dateTime = entry.date
    date.textContent = entry.date
    const titleWrap = document.createElement("span")
    titleWrap.className = "ac-log__title"
    const title = document.createElement("strong")
    title.textContent = entry.title
    titleWrap.append(title)
    if (index === 0) {
      const fresh = document.createElement("em")
      fresh.className = "ac-log__new"
      fresh.textContent = "最新"
      titleWrap.append(fresh)
    }
    const chevron = document.createElement("span")
    chevron.className = "ac-chevron"
    chevron.setAttribute("aria-hidden", "true")
    head.append(date, titleWrap, chevron)

    const fold = document.createElement("div")
    fold.className = "ac-fold"
    const inner = document.createElement("div")
    inner.className = "ac-fold__inner"
    const detail = document.createElement("p")
    detail.className = "ac-log__detail"
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
  const targets = root.querySelectorAll<HTMLElement>(".ac-reveal")
  if (reduced) {
    for (const el of targets) {
      el.classList.add("is-visible")
      const fill = el.querySelector<HTMLElement>(".ac-module__track span[data-w]")
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
        const fill = el.querySelector<HTMLElement>(".ac-module__track span[data-w]")
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
  const holder = button.closest(
    ".ac-frontier-item, .ac-concept, .ac-log__entry, .ac-layer, .ac-module",
  )
  if (!holder) return
  const open = holder.classList.toggle("is-open")
  button.setAttribute("aria-expanded", open ? "true" : "false")
  const hint = button.querySelector<HTMLElement>("i")
  if (hint) hint.textContent = open ? "收起" : "展开"
}

/* ---------- data loading ---------- */

function siteRoot(): string {
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

/* ---------- toolbar relocation ---------- */

interface RelocatedNode {
  node: HTMLElement
  parent: HTMLElement
  next: Node | null
}

let toolbarCleanup: (() => void) | undefined

function remember(node: HTMLElement | null, list: RelocatedNode[]): void {
  if (node?.parentElement) list.push({ node, parent: node.parentElement, next: node.nextSibling })
}

function restoreAll(list: RelocatedNode[]): void {
  for (const { node, parent, next } of list) {
    if (!parent.isConnected) continue
    if (next && next.parentElement === parent) parent.insertBefore(node, next)
    else parent.appendChild(node)
  }
}

/**
 * Quartz renders search + theme toggles inside `.sidebar.left`. On the home
 * console that sidebar is a fixed overlay; its backdrop-filter (and the
 * topbar's own blur) becomes the containing block for the search panel's
 * `position: fixed`, so opening search collapses the full-screen overlay into
 * the little toolbar. Lift the controls into a body-level `.ac-toolbar` that
 * has no transformed/filtered ancestor, and put them back before SPA nav so
 * micromorph still sees the original DOM shape.
 */
function mountToolbar(): void {
  toolbarCleanup?.()
  toolbarCleanup = undefined

  if (!document.querySelector<HTMLElement>(".ai-console")) return
  const sidebar = document.querySelector<HTMLElement>(".sidebar.left")
  if (!sidebar) return
  const search = sidebar.querySelector<HTMLElement>(".search")
  const darkmode = sidebar.querySelector<HTMLElement>(".darkmode")
  if (!search && !darkmode) return

  const relocated: RelocatedNode[] = []
  remember(search, relocated)
  remember(darkmode, relocated)

  const toolbar = document.createElement("div")
  toolbar.className = "ac-toolbar"
  if (search) toolbar.appendChild(search)
  if (darkmode) toolbar.appendChild(darkmode)
  document.body.appendChild(toolbar)
  sidebar.classList.add("ac-sidebar-relocated")

  toolbarCleanup = () => {
    restoreAll(relocated)
    toolbar.remove()
    sidebar.classList.remove("ac-sidebar-relocated")
  }
}

/* ---------- mount ---------- */

async function mountConsole(): Promise<void> {
  const generation = ++mountGeneration
  activeCleanup?.()
  activeCleanup = undefined
  const root = document.querySelector<HTMLElement>(".ai-console")
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

  root.classList.add("ac-anim")

  const grid = root.querySelector<HTMLElement>("[data-ac-modules]")
  const logList = root.querySelector<HTMLElement>("[data-ac-log]")
  const rail = root.querySelector<HTMLElement>("[data-ac-rail]")
  const statModules = root.querySelector<HTMLElement>("[data-ac-stat-modules]")
  const statConcepts = root.querySelector<HTMLElement>("[data-ac-stat-concepts]")
  const statTopics = root.querySelector<HTMLElement>("[data-ac-stat-topics]")
  const statLog = root.querySelector<HTMLElement>("[data-ac-stat-log]")
  const statUpdated = root.querySelector<HTMLElement>("[data-ac-updated]")
  const statCycle = root.querySelector<HTMLElement>("[data-ac-cycle]")
  const version = root.querySelector<HTMLElement>("[data-ac-version]")
  const freshness = root.querySelector<HTMLElement>("[data-ac-freshness]")

  if (data) {
    root.dataset.evolutionState = "live"
    const stats = evolutionStats(data)
    if (grid) {
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
    if (statLog) countUp(statLog, stats.logCount, reduced)
    if (rail) {
      const links = rail.querySelectorAll<HTMLAnchorElement>("a.ac-rail")
      data.modules.forEach((module, index) => {
        const link = links[index]
        if (!link) return
        link.dataset.status = module.status
        link.setAttribute("href", `#ac-module-${module.code}`)
        const code = link.querySelector<HTMLElement>("b")
        if (code) code.textContent = module.code
        const name = link.querySelector<HTMLElement>("span")
        if (name) name.textContent = module.name
      })
    }
    if (version) version.textContent = `v${data.version}`
    if (statUpdated) statUpdated.textContent = data.lastUpdated
    if (statCycle) statCycle.textContent = data.cycle === "daily" ? "每日" : data.cycle
    if (freshness && statUpdated) {
      const age = daysSince(statUpdated.textContent ?? data.lastUpdated, new Date())
      freshness.textContent = age === 0 ? "今日已演进" : age === 1 ? "昨日演进" : `${age} 天前演进`
    }
  } else {
    root.dataset.evolutionState = "static"
    if (freshness) freshness.textContent = "静态骨架"
    for (const el of root.querySelectorAll<HTMLElement>(".ac-reveal"))
      el.classList.add("is-visible")
  }

  const revealObserver = setupReveal(root, reduced)
  if (revealObserver) cleanups.push(() => revealObserver.disconnect())

  const onClick = (event: MouseEvent) => {
    const button = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      ".ac-frontier-item__head, .ac-concept__head, .ac-log__head, .ac-layer__toggle",
    )
    if (button && root.contains(button)) toggleFold(button)
  }
  root.addEventListener("click", onClick)
  cleanups.push(() => root.removeEventListener("click", onClick))

  // In-page rail links: smooth-scroll to the module card and flash it. The SPA
  // router would otherwise jump instantly, so we handle these ourselves.
  const onRailClick = (event: MouseEvent) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0)
      return
    const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a.ac-rail")
    if (!link || !root.contains(link)) return
    const id = link.getAttribute("href")?.slice(1)
    if (!id) return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    event.stopPropagation()
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
    history.pushState({}, "", `#${encodeURIComponent(id)}`)
    target.classList.remove("is-flash")
    void target.offsetWidth
    target.classList.add("is-flash")
    const stop = () => target.classList.remove("is-flash")
    target.addEventListener("animationend", stop, { once: true })
    cleanups.push(() => target.removeEventListener("animationend", stop))
  }
  root.addEventListener("click", onRailClick, true)
  cleanups.push(() => root.removeEventListener("click", onRailClick, true))
}

if (!runtimeWindow.__aiConsoleRuntime) {
  runtimeWindow.__aiConsoleRuntime = true
  document.addEventListener("prenav", () => {
    activeCleanup?.()
    toolbarCleanup?.()
    toolbarCleanup = undefined
  })
  document.addEventListener("nav", () => {
    mountToolbar()
    void mountConsole()
  })
}
