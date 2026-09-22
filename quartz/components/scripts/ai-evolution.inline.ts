import {
  daysSince,
  evolutionStats,
  moduleProgress,
  normalizeEvolutionData,
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

function renderModuleCard(module: EvolutionModule): HTMLElement {
  const card = document.createElement("article")
  card.className = "ai-module"
  card.dataset.status = module.status

  const head = document.createElement("header")
  const code = document.createElement("span")
  code.className = "ai-module__code"
  code.textContent = module.code
  const name = document.createElement("h3")
  name.className = "ai-module__name"
  name.textContent = module.name
  const badge = document.createElement("span")
  badge.className = "ai-module__badge"
  badge.textContent = statusLabel(module.status)
  head.append(code, name, badge)

  const summary = document.createElement("p")
  summary.className = "ai-module__summary"
  summary.textContent = module.summary

  const bar = document.createElement("div")
  bar.className = "ai-module__bar"
  bar.setAttribute("role", "img")
  bar.setAttribute(
    "aria-label",
    `${module.name} 演进进度 ${Math.round(moduleProgress(module) * 100)}%`,
  )
  const fill = document.createElement("span")
  fill.style.width = `${Math.round(moduleProgress(module) * 100)}%`
  bar.append(fill)

  card.append(head, summary, bar)

  if (module.topics.length > 0) {
    const list = document.createElement("ul")
    list.className = "ai-module__topics"
    for (const topic of module.topics) {
      const item = document.createElement("li")
      item.textContent = topic
      list.append(item)
    }
    card.append(list)
  } else {
    const empty = document.createElement("p")
    empty.className = "ai-module__empty"
    empty.textContent = "待每日演进填充"
    card.append(empty)
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
  return list.map((entry) => {
    const item = document.createElement("li")
    item.className = "ai-log__entry"
    const date = document.createElement("time")
    date.dateTime = entry.date
    date.textContent = entry.date
    const body = document.createElement("div")
    const title = document.createElement("strong")
    title.textContent = entry.title
    const detail = document.createElement("p")
    detail.textContent = entry.detail
    body.append(title, detail)
    item.append(date, body)
    return item
  })
}

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

async function mountEvolutionHome(): Promise<void> {
  const generation = ++mountGeneration
  activeCleanup?.()
  activeCleanup = undefined
  const root = document.querySelector<HTMLElement>(".ai-home")
  if (!root) return

  let disposed = false
  const cleanup = () => {
    disposed = true
  }
  activeCleanup = cleanup
  window.addCleanup(cleanup)

  const data = await loadEvolutionData()
  if (disposed || generation !== mountGeneration || !root.isConnected) return

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
    if (statModules) statModules.textContent = String(stats.moduleCount).padStart(2, "0")
    if (statTopics) statTopics.textContent = String(stats.topicCount).padStart(2, "0")
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
  }
}

if (!runtimeWindow.__aiEvolutionRuntime) {
  runtimeWindow.__aiEvolutionRuntime = true
  document.addEventListener("prenav", () => activeCleanup?.())
  document.addEventListener("nav", () => void mountEvolutionHome())
}
