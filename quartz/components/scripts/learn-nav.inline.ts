/* Knowledge Atlas shell runtime — v2 five-domain structure.
   Loads the structured registry (static/atlas-registry.json) as the single
   publishing view, and reconciles it with Quartz's explorer tree for the set
   of actually-published domains/topics/cards. Rebuilds the explorer slot into
   a product-grade sidebar (brand / search / five-domain accordion / topic +
   card tree / live footer) and injects a sticky topbar. All DOM work is
   idempotent + signature-guarded and re-applied on SPA navigation. */

type ShellWindow = Window & { __kaShellRuntime?: boolean; __kaRegistry?: Registry }

const shellWindow = window as ShellWindow

type Topic = {
  id: string
  name: string
  outcome: string
  core: boolean
  pilot: boolean
  enabled: boolean
  slug: string
}
type Domain = {
  id: string
  code: string
  name: string
  question: string
  decision: string
  color: string
  enabled: boolean
  topics: Topic[]
}
type RecentCard = { date: string; title: string; domain: string; topic: string; card: string }
type Registry = {
  version: number
  lastUpdated: string
  domains: Domain[]
  launch: {
    enabledDomains: number
    publishedTopics: number
    publishedCards: number
    plannedTopics: number
    pilotTopics: string[]
    coursePath: string[]
  }
  recent: RecentCard[]
}

const DOMAIN_COLOR: Record<string, string> = {
  d1: "cyan",
  d2: "violet",
  d3: "green",
  d4: "amber",
  d5: "rot",
  cyan: "cyan",
  violet: "violet",
  green: "green",
  amber: "amber",
  rot: "rot",
}

function siteRoot(): string {
  // Must return an ABSOLUTE URL usable as the base of `new URL(rel, base)`.
  // Deriving it from the icon href keeps local preview (origin-only) and
  // GitHub Pages subpath (/xiabao-km/) both correct without hardcoding.
  const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (icon?.href) {
    try {
      const u = new URL(icon.href, window.location.href)
      const marker = "/static/icon.png"
      if (u.pathname.endsWith(marker)) return u.origin + u.pathname.slice(0, -marker.length) + "/"
    } catch {
      /* fall through */
    }
  }
  return window.location.origin + (basePath() ? `${basePath()}/` : "/")
}

async function loadRegistry(): Promise<Registry | undefined> {
  if (shellWindow.__kaRegistry) return shellWindow.__kaRegistry
  try {
    const res = await fetch(new URL("static/atlas-registry.json", siteRoot()), {
      cache: "no-store",
    })
    if (!res.ok) return undefined
    const data = (await res.json()) as Registry
    if (!Array.isArray(data.domains) || !data.launch || !Array.isArray(data.recent))
      return undefined
    shellWindow.__kaRegistry = data
    return data
  } catch {
    return undefined
  }
}

function basePath(): string {
  const cfg = (document.body.dataset.basepath || "").replace(/\/+$/, "")
  if (!cfg) return ""
  // Local preview serves public/ at the origin with no subpath; the configured
  // basepath (e.g. /xiabao-km) is then absent from the URL — don't prefix links.
  const p = window.location.pathname
  if (!p.startsWith(`${cfg}/`) && p !== cfg) return ""
  return cfg
}

function normalize(pathname: string): string {
  let p = pathname.replace(/\/+$/, "")
  if (p.endsWith(".html")) p = p.slice(0, -5)
  // Quartz directory-index pages are addressed by folder URL; local preview
  // hits /learn/index.html, so strip the trailing /index to match both.
  if (p.endsWith("/index")) p = p.slice(0, -6)
  const base = basePath()
  if (base && p.startsWith(`${base}/`)) p = p.slice(base.length)
  return p || "/"
}

function currentPath(): string {
  return normalize(window.location.pathname)
}

function isLearnPage(): boolean {
  const p = currentPath()
  return p === "/learn" || p.startsWith("/learn/")
}

function pathHref(normalizedPath: string): string {
  return `${basePath()}${normalizedPath}`
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;"
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case '"':
        return "&quot;"
      default:
        return "&#39;"
    }
  })
}

/* ---- published tree from Quartz's explorer folders ------------------- */

type Tree = { domains: Set<string>; topics: Set<string>; cards: Set<string> }

function readTree(content: HTMLElement): Tree {
  const tree: Tree = { domains: new Set(), topics: new Set(), cards: new Set() }
  content.querySelectorAll<HTMLElement>(".folder-container[data-folderpath]").forEach((folder) => {
    // Quartz folder-index pages carry a trailing "/index" in data-folderpath
    // (e.g. learn/d2/retrieval/check-current-policy/index); strip it first.
    let fp = (folder.dataset.folderpath || "").replace(/\/+$/, "")
    if (fp.endsWith("/index")) fp = fp.slice(0, -6)
    const c = /^learn\/(d[1-5])\/([^/]+)\/([^/]+)$/.exec(fp)
    if (c) {
      tree.domains.add(c[1])
      tree.topics.add(`${c[1]}/${c[2]}`)
      tree.cards.add(`${c[1]}/${c[2]}/${c[3]}`)
      return
    }
    const t = /^learn\/(d[1-5])\/([^/]+)$/.exec(fp)
    if (t) {
      tree.domains.add(t[1])
      tree.topics.add(`${t[1]}/${t[2]}`)
      return
    }
    const d = /^learn\/(d[1-5])$/.exec(fp)
    if (d) tree.domains.add(d[1])
  })
  return tree
}

/* ---- sidebar markup -------------------------------------------------- */

function domainColor(d: Domain): string {
  return DOMAIN_COLOR[d.color] || "cyan"
}

function renderDomains(reg: Registry, tree: Tree): string {
  const cur = currentPath()
  let html = ""
  for (const d of reg.domains) {
    // enabled is the single source of truth. The explorer tree also contains
    // planning-only folders (empty d1/d4/d5) which must not count as launched.
    const live = d.enabled
    const color = domainColor(d)
    const cardCount = [...tree.cards].filter((c) => c.startsWith(`${d.id}/`)).length
    const publishedTopics = d.topics.filter(
      (t) => t.enabled || tree.topics.has(`${d.id}/${t.slug}`),
    )
    const note = live
      ? `${publishedTopics.length}/${d.topics.length} 主题`
      : `${d.topics.length} 主题 · 规划`
    html += `<div class="ka-domain${live ? " open" : ""} ka-domain--${d.id}" data-dom="${d.id}" style="--ka-dc: var(--ka-${color})">`
    html += `<div class="ka-dhead" role="button" tabindex="0"><i class="ka-dot"></i><span>${esc(d.name)}</span>`
    if (live) html += `<span class="ka-code">${esc(note)}</span>`
    else html += `<span class="ka-grow">${esc(note)}</span>`
    html += `<span class="ka-caret">▶</span></div>`
    html += `<div class="ka-dtree">`
    if (live) {
      html += `<a class="ka-leaf${cur === `/learn/${d.id}` ? " cur" : ""}" href="${esc(pathHref(`/learn/${d.id}/`))}" data-no-popover="true">域总览 · ${esc(d.name)}</a>`
      for (const t of d.topics) {
        const topicLive = t.enabled || tree.topics.has(`${d.id}/${t.slug}`)
        const topicKey = `${d.id}/${t.slug}`
        const topicCur = cur === `/learn/${topicKey}` || cur.startsWith(`/learn/${topicKey}/`)
        if (topicLive && t.slug) {
          html += `<a class="ka-leaf${topicCur && !cur.startsWith(`/learn/${topicKey}/`) ? " cur" : ""}" href="${esc(pathHref(`/learn/${topicKey}/`))}" data-no-popover="true">${esc(t.name)}</a>`
          for (const card of reg.recent) {
            if (card.domain !== d.id || card.topic !== t.slug) continue
            const cardKey = `${topicKey}/${card.card}`
            if (!tree.cards.has(cardKey)) continue
            const kpCur = cur === `/learn/${cardKey}`
            html += `<a class="ka-kp${kpCur ? " cur" : ""}" href="${esc(pathHref(`/learn/${cardKey}/`))}" data-no-popover="true">${esc(card.title)}</a>`
          }
        } else {
          html += `<div class="ka-seed">${esc(t.id)} ${esc(t.name)}${t.core ? " · 核心" : ""}</div>`
        }
      }
      if (cardCount === 0) html += `<div class="ka-seed">知识文章待生长</div>`
    } else {
      for (const t of d.topics) {
        html += `<div class="ka-seed">${esc(t.id)} ${esc(t.name)}${t.core ? " · 核心" : ""}</div>`
      }
    }
    html += `</div></div>`
  }
  return html
}

function renderSidebar(reg: Registry, tree: Tree): string {
  return [
    `<div class="ka-brand">`,
    `<div class="ka-brand-mark"></div>`,
    `<div class="ka-brand-txt"><b>知识星图</b><span>Knowledge Atlas · v2</span></div>`,
    `</div>`,
    `<button class="ka-navsearch" type="button" data-ka-action="search">`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>`,
    `<span>搜索知识点</span><kbd>⌘K</kbd>`,
    `</button>`,
    `<div class="ka-navcap">知识域 · Domains</div>`,
    `<div class="ka-domains">${renderDomains(reg, tree)}</div>`,
    `<div class="ka-navfoot"><i class="ka-live-dot"></i>系统在线 · 台账 v${reg.version} · ${esc(reg.lastUpdated)}</div>`,
  ].join("")
}

/* ---- overview feed + counts (from registry + published tree) ---------- */

function renderFeed(reg: Registry, tree: Tree): string {
  const items = reg.recent
    .filter((it) => tree.cards.has(`${it.domain}/${it.topic}/${it.card}`))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, 5)
  if (!items.length) return ""
  return items
    .map((it) => {
      const d = reg.domains.find((x) => x.id === it.domain)
      const color = d ? domainColor(d) : "cyan"
      const short = d ? `${d.code} ${d.name}` : it.domain.toUpperCase()
      const href = pathHref(`/learn/${it.domain}/${it.topic}/${it.card}/`)
      return (
        `<a class="ka-feed-row" href="${esc(href)}" data-no-popover="true">` +
        `<span class="date">${esc(it.date)}</span>` +
        `<span class="stag" style="--ka-dc: var(--ka-${color})">${esc(short)}</span>` +
        `<span class="ttl">${esc(it.title)}</span>` +
        `<span class="arw">→</span></a>`
      )
    })
    .join("")
}

function syncOverview(reg: Registry, tree: Tree): void {
  const view = document.querySelector<HTMLElement>(".ka-view--overview")
  if (!view) return
  // v2 launch view counts come from the registry (single source of truth):
  // enabled domains / published topics / published cards / planned topics.
  // The explorer tree is used only for feed + current-page highlighting, since
  // it contains planning-only folders that would inflate a naive count.
  const counts: Record<string, number> = {
    domains: reg.launch.enabledDomains,
    topics: reg.launch.publishedTopics,
    points: reg.launch.publishedCards,
    planned: reg.launch.plannedTopics,
  }
  view.querySelectorAll<HTMLElement>("[data-ka-count]").forEach((el) => {
    const key = el.dataset.kaCount || ""
    const target = counts[key] ?? Number(el.dataset.num || 0)
    el.setAttribute("data-num", String(target))
    if (view.dataset.kaCounted === "1") el.textContent = String(target)
  })
  runCounters(view)

  const feed = view.querySelector<HTMLElement>(".ka-feed")
  if (feed) {
    const html = renderFeed(reg, tree)
    if (html && feed.dataset.kaFeed !== html) {
      feed.dataset.kaFeed = html
      feed.innerHTML = html
    }
  }
}

function runCounters(root: HTMLElement): void {
  if (root.dataset.kaCounted === "1") return
  root.dataset.kaCounted = "1"
  root.querySelectorAll<HTMLElement>("[data-num]").forEach((el) => {
    const t0 = performance.now()
    const dur = 900
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur)
      const e = 1 - Math.pow(1 - k, 3)
      const target = Number(el.dataset.num || "0")
      el.textContent = String(Math.round(target * e))
      if (k < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
}

/* ---- topbar ---------------------------------------------------------- */

function renderCrumb(reg: Registry): string {
  const cur = currentPath()
  const parts = ["<span>知识星图</span>"]
  if (cur === "/learn" || cur === "") {
    parts.push("<b>总览</b>")
    return parts.join('<span class="ka-sep"> / </span>')
  }
  parts.push('<a href="' + esc(pathHref("/learn/")) + '" data-no-popover="true">总览</a>')
  const m = /^\/learn\/(d[1-5])(?:\/([^/]+))?(?:\/([^/]+))?/.exec(cur)
  if (!m) {
    parts.push("<b>知识星图</b>")
    return parts.join('<span class="ka-sep"> / </span>')
  }
  const d = reg.domains.find((x) => x.id === m[1])
  parts.push(
    `<a href="${esc(pathHref(`/learn/${m[1]}/`))}" data-no-popover="true">${esc(d ? `${d.code} ${d.name}` : m[1])}</a>`,
  )
  if (m[2]) {
    const t = d?.topics.find((x) => x.slug === m[2] || x.id === m[2])
    parts.push(
      `<a href="${esc(pathHref(`/learn/${m[1]}/${m[2]}/`))}" data-no-popover="true">${esc(t?.name || m[2])}</a>`,
    )
  }
  if (m[3]) {
    const card = reg.recent.find((c) => c.card === m[3] && c.topic === m[2] && c.domain === m[1])
    parts.push(`<b>${esc(card?.title || m[3])}</b>`)
  }
  return parts.join('<span class="ka-sep"> / </span>')
}

function topbarMarkup(reg: Registry): string {
  return [
    `<button class="ka-menu-btn" type="button" data-ka-action="menu" aria-label="打开目录">`,
    `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
    `</button>`,
    `<div class="ka-crumb">${renderCrumb(reg)}</div>`,
    `<div class="ka-spacer"></div>`,
    `<button class="ka-icon-btn" type="button" data-ka-action="search" title="搜索" aria-label="搜索">`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>`,
    `</button>`,
    `<button class="ka-icon-btn" type="button" data-ka-action="theme" title="切换主题" aria-label="切换主题">`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 109 9c0-5-4-9-9-9z"/></svg>`,
    `</button>`,
  ].join("")
}

/* ---- bind interactions (event delegation, bound once) ---------------- */

function bindActions(root: HTMLElement): void {
  root.addEventListener("click", (ev) => {
    const target = ev.target as HTMLElement
    const actionEl = target.closest<HTMLElement>("[data-ka-action]")
    if (actionEl) {
      const action = actionEl.dataset.kaAction
      if (action === "search") {
        const searchBtn = document.querySelector<HTMLElement>(
          ".sidebar.left .search button, .sidebar.left button.search-button, .search-button",
        )
        if (searchBtn) searchBtn.click()
        else
          document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true, bubbles: true }),
          )
      } else if (action === "theme") {
        document.querySelector<HTMLElement>(".darkmode")?.click()
      } else if (action === "menu") {
        document.body.classList.toggle("ka-drawer")
      }
      return
    }
    const head = target.closest<HTMLElement>(".ka-dhead")
    if (head) head.parentElement?.classList.toggle("open")
  })
  root.addEventListener("keydown", (ev) => {
    if (ev.key !== "Enter" && ev.key !== " ") return
    const head = (ev.target as HTMLElement).closest<HTMLElement>(".ka-dhead")
    if (head) {
      ev.preventDefault()
      head.parentElement?.classList.toggle("open")
    }
  })
}

/* ---- orchestration --------------------------------------------------- */

let syncing = false

async function sync(): Promise<void> {
  if (!isLearnPage()) {
    document
      .querySelectorAll<HTMLElement>(".ka-shell-sidebar, .ka-topbar, .ka-scrim")
      .forEach((el) => el.remove())
    document.body.classList.remove("ka-active")
    return
  }
  if (syncing) return
  const reg = await loadRegistry()
  if (!reg) return
  syncing = true
  try {
    document.body.classList.add("ka-active")

    if (!document.querySelector(".ka-scrim")) {
      const scrim = document.createElement("div")
      scrim.className = "ka-scrim"
      scrim.addEventListener("click", () => document.body.classList.remove("ka-drawer"))
      document.body.appendChild(scrim)
    }

    const center = document.querySelector<HTMLElement>(".center")
    const contents = document.querySelectorAll<HTMLElement>(".explorer-content")

    contents.forEach((content) => {
      const tree = readTree(content)
      const sig = [
        [...tree.domains].sort().join(","),
        [...tree.topics].sort().join(","),
        [...tree.cards].sort().join(","),
        currentPath(),
        reg.version,
      ].join("||")

      let shell = content.querySelector<HTMLElement>(".ka-shell-sidebar")
      if (!shell) {
        shell = document.createElement("div")
        shell.className = "ka-shell-sidebar"
        content.prepend(shell)
        bindActions(shell)
      }
      if (content.dataset.kaSig !== sig) {
        content.dataset.kaSig = sig
        shell.innerHTML = renderSidebar(reg, tree)
      }
      syncOverview(reg, tree)
    })

    if (center) {
      let topbar = center.querySelector<HTMLElement>(":scope > .ka-topbar")
      if (!topbar) {
        topbar = document.createElement("div")
        topbar.className = "ka-topbar"
        center.prepend(topbar)
        bindActions(topbar)
      }
      topbar.innerHTML = topbarMarkup(reg)
    }
  } finally {
    syncing = false
  }
}

if (!shellWindow.__kaShellRuntime) {
  shellWindow.__kaShellRuntime = true

  let observer: MutationObserver | undefined
  const start = () => {
    void sync()
    observer?.disconnect()
    const target = document.querySelector<HTMLElement>(".explorer-content")
    if (target) {
      observer = new MutationObserver(() => void sync())
      observer.observe(target, { childList: true, subtree: true })
    }
  }

  document.addEventListener("nav", () => start())
  document.addEventListener("DOMContentLoaded", () => start())
  if (document.readyState !== "loading") start()
}
