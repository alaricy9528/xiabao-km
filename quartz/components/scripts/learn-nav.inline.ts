/* Knowledge Atlas shell runtime — learning-directory pages only.
   Rebuilds the explorer slot into a product-grade sidebar (brand / search /
   four-domain accordion / stage tree / live footer) and injects a sticky
   topbar above the article. Stage/topic/knowledge-point data is EXTRACTED from
   Quartz's native explorer tree, so daily-grown knowledge points sync
   automatically — no hardcoded content to drift out of date.
   All DOM work is idempotent + signature-guarded to avoid observer feedback
   loops, and re-applied on SPA navigation. */

type ShellWindow = Window & { __kaShellRuntime?: boolean }

const shellWindow = window as ShellWindow

const MOBILE_QUERY = "(max-width: 800px)"

const STAGE_CODE: Record<string, string> = {
  s01: "S01",
  s02: "S02",
  s03: "S03",
  s04: "S04",
  s05: "S05",
  s06: "S06",
}
const STAGE_NAME: Record<string, string> = {
  s01: "数学直觉与学习原理",
  s02: "深度学习与神经网络",
  s03: "Transformer 与注意力机制",
  s04: "大模型训练与对齐",
  s05: "推理、智能体与记忆",
  s06: "边界、安全与前沿",
}

const DOMAINS: { key: string; code: string; name: string; note: string; live: boolean }[] = [
  { key: "d1", code: "D1", name: "智能原理", note: "32", live: true },
  { key: "d2", code: "D2", name: "知识工程", note: "生长中", live: false },
  { key: "d3", code: "D3", name: "智能体工程", note: "生长中", live: false },
  { key: "d4", code: "D4", name: "应用与治理", note: "生长中", live: false },
]

type KP = { title: string; href: string; current: boolean }
type Topic = { key: string; title: string; href: string; kps: KP[]; current: boolean }
type Stage = {
  key: string
  code: string
  title: string
  href: string
  topics: Topic[]
  current: boolean
}

function basePath(): string {
  return (document.body.dataset.basepath || "").replace(/\/+$/, "")
}

function normalize(pathname: string): string {
  let p = pathname.replace(/\/+$/, "")
  if (p.endsWith(".html")) p = p.slice(0, -5)
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

function anchorHref(a: HTMLAnchorElement): string {
  const u = new URL(a.href, window.location.href)
  return u.pathname + u.search + u.hash
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

/* ---- extract the tree from Quartz's native explorer -------------------- */

function extractStages(content: HTMLElement): Stage[] {
  const cur = currentPath()
  const stageMap = new Map<string, Stage>()

  content.querySelectorAll<HTMLElement>(".folder-container[data-folderpath]").forEach((folder) => {
    const fp = folder.dataset.folderpath || ""
    const stageMatch = /^learn\/(s0\d)\/index$/.exec(fp)
    if (stageMatch) {
      const key = stageMatch[1]
      const btn = folder.querySelector<HTMLElement>("a.folder-button")
      const title = STAGE_NAME[key] || btn?.textContent?.trim() || key
      const href = btn ? anchorHref(btn as HTMLAnchorElement) : pathHref(`/learn/${key}/`)
      stageMap.set(key, {
        key,
        code: STAGE_CODE[key] || key.toUpperCase(),
        title,
        href,
        topics: [],
        current: cur === `/learn/${key}` || cur.startsWith(`/learn/${key}/`),
      })
      return
    }
    const topicMatch = /^learn\/(s0\d)\/([^/]+)\/index$/.exec(fp)
    if (topicMatch) {
      const key = topicMatch[1]
      const tk = topicMatch[2]
      const stage = stageMap.get(key)
      if (!stage) return
      const btn = folder.querySelector<HTMLElement>("a.folder-button")
      const title = btn?.textContent?.trim() || tk
      const href = btn ? anchorHref(btn as HTMLAnchorElement) : pathHref(`/learn/${key}/${tk}/`)
      stage.topics.push({
        key: tk,
        title,
        href,
        kps: [],
        current: cur === `/learn/${key}/${tk}` || cur.startsWith(`/learn/${key}/${tk}/`),
      })
    }
  })

  content.querySelectorAll<HTMLAnchorElement>("a.nav-file-title").forEach((a) => {
    const p = normalize(new URL(a.href, window.location.href).pathname)
    const m = /^\/learn\/(s0\d)\/([^/]+)\/(\d{4}-\d{2}-\d{2}-.+)$/.exec(p)
    if (!m) return
    const key = m[1]
    const tk = m[2]
    const stage = stageMap.get(key)
    if (!stage) return
    let topic = stage.topics.find((t) => t.key === tk)
    if (!topic) {
      topic = {
        key: tk,
        title: tk,
        href: pathHref(`/learn/${key}/${tk}/`),
        kps: [],
        current: cur.startsWith(`/learn/${key}/${tk}`),
      }
      stage.topics.push(topic)
    }
    topic.kps.push({
      title: a.textContent?.trim() || m[3],
      href: anchorHref(a),
      current: cur === p,
    })
  })

  return [...stageMap.values()]
}

/* ---- sidebar markup ---------------------------------------------------- */

function renderDomains(stages: Stage[]): string {
  const activeStage = stages.find((s) => s.current)?.key || "s01"
  let html = ""
  for (const d of DOMAINS) {
    const open = d.live
    html += `<div class="ka-domain${open ? " open" : ""} ka-domain--${d.key}" data-dom="${d.key}" style="--ka-dc: var(--ka-${d.key === "d1" ? "cyan" : d.key === "d2" ? "violet" : d.key === "d3" ? "green" : "amber"})">`
    html += `<div class="ka-dhead" role="button" tabindex="0"><i class="ka-dot"></i><span>${d.name}</span>`
    if (d.live) html += `<span class="ka-code">${d.note}</span>`
    else html += `<span class="ka-grow">${d.note}</span>`
    html += `<span class="ka-caret">▶</span></div>`
    html += `<div class="ka-dtree">`
    if (d.live) {
      for (const s of stages) {
        const sActive = s.key === activeStage
        html += `<div class="ka-stage">`
        html += `<a class="ka-stage-btn${s.current ? " active" : ""}" href="${esc(s.href)}" data-no-popover="true"><span class="ka-badge">${s.code}</span>${esc(s.title)}</a>`
        if (sActive && s.topics.length) {
          for (const t of s.topics) {
            const tActive = t.current || t.kps.some((k) => k.current)
            html += `<a class="ka-leaf${t.current ? " cur" : ""}" href="${esc(t.href)}" data-no-popover="true">${esc(t.title)}</a>`
            if (tActive) {
              for (const k of t.kps) {
                html += `<a class="ka-kp${k.current ? " cur" : ""}" href="${esc(k.href)}" data-no-popover="true">${esc(k.title)}</a>`
              }
            }
          }
        }
        html += `</div>`
      }
    } else {
      const seeds: Record<string, string[]> = {
        d2: ["知识本体 · 待生长", "知识加工与消费 · 待生长"],
        d3: ["开发平台 · 待生长", "Skill 与能力封装 · 待生长"],
        d4: ["新范式 · 待生长"],
      }
      html += `<div class="ka-stage">`
      for (const seed of seeds[d.key] || []) html += `<div class="ka-seed">${esc(seed)}</div>`
      html += `</div>`
    }
    html += `</div></div>`
  }
  return html
}

function renderSidebar(stages: Stage[]): string {
  return [
    `<div class="ka-brand">`,
    `<div class="ka-brand-mark"></div>`,
    `<div class="ka-brand-txt"><b>知识星图</b><span>Knowledge Atlas</span></div>`,
    `</div>`,
    `<button class="ka-navsearch" type="button" data-ka-action="search">`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>`,
    `<span>搜索知识点</span><kbd>⌘K</kbd>`,
    `</button>`,
    `<div class="ka-navcap">知识域 · Domains</div>`,
    `<div class="ka-domains">${renderDomains(stages)}</div>`,
    `<div class="ka-navfoot"><i class="ka-live-dot"></i>系统在线 · 每日 03:00 生长</div>`,
  ].join("")
}

/* ---- overview feed + metrics (auto-grown from the tree) ---------------- */

function renderFeed(content: HTMLElement): string {
  const items: { date: string; title: string; href: string; stage: string; color: string }[] = []
  const colorOf = (stage: string): string =>
    ({ s01: "cyan", s02: "violet", s03: "rot", s04: "green", s05: "amber", s06: "blue" })[stage] ||
    "cyan"
  const shortStage = (stage: string): string =>
    ({
      s01: "S01 原理",
      s02: "S02 深度",
      s03: "S03 架构",
      s04: "S04 训练",
      s05: "S05 智能体",
      s06: "S06 安全",
    })[stage] || stage
  content.querySelectorAll<HTMLAnchorElement>("a.nav-file-title").forEach((a) => {
    const p = normalize(new URL(a.href, window.location.href).pathname)
    const m = /^\/learn\/(s0\d)\/([^/]+)\/(\d{4}-\d{2}-\d{2}-.+)$/.exec(p)
    if (!m) return
    items.push({
      date: m[3].slice(0, 10),
      title: a.textContent?.trim() || m[3],
      href: anchorHref(a),
      stage: m[1],
      color: colorOf(m[1]),
    })
  })
  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  const latest = items.slice(0, 5)
  if (!latest.length) return ""
  return latest
    .map(
      (it) =>
        `<a class="ka-feed-row" href="${esc(it.href)}" data-no-popover="true">` +
        `<span class="date">${it.date}</span>` +
        `<span class="stag" style="--ka-dc: var(--ka-${it.color})">${shortStage(it.stage)}</span>` +
        `<span class="ttl">${esc(it.title)}</span>` +
        `<span class="arw">→</span></a>`,
    )
    .join("")
}

function syncOverview(content: HTMLElement): void {
  const view = document.querySelector<HTMLElement>(".ka-view--overview")
  if (!view) return

  // Count straight from the explorer DOM — this is robust even before the
  // tree's anchor hrefs are normalized, unlike extractStages().
  let stageCount = 0
  let topicCount = 0
  content.querySelectorAll<HTMLElement>(".folder-container[data-folderpath]").forEach((f) => {
    const fp = f.dataset.folderpath || ""
    if (/^learn\/s0\d\/index$/.test(fp)) stageCount++
    else if (/^learn\/s0\d\/.+\/index$/.test(fp)) topicCount++
  })
  let kpCount = 0
  content.querySelectorAll<HTMLAnchorElement>("a.nav-file-title").forEach((a) => {
    if (/\d{4}-\d{2}-\d{2}-/.test(a.getAttribute("href") || "")) kpCount++
  })
  const counts: Record<string, number> = {
    domains: DOMAINS.length,
    stages: stageCount,
    topics: topicCount,
    points: kpCount,
  }
  const applyCounts = (c: Record<string, number>) => {
    view.querySelectorAll<HTMLElement>("[data-ka-count]").forEach((el) => {
      const key = el.dataset.kaCount || ""
      const target = c[key] ?? Number(el.dataset.num || 0)
      el.setAttribute("data-num", String(target))
      // If the entrance animation already ran, just set the final value so a
      // late-arriving explorer tree still produces correct counts.
      if (view.dataset.kaCounted === "1") el.textContent = String(target)
    })
  }
  applyCounts(counts)
  // The explorer tree is Preact-rendered; an observer tick can land in a
  // re-render gap where the tree is momentarily empty. Retry shortly after so
  // counts always reflect the settled tree.
  if (counts.stages === 0) {
    window.setTimeout(() => {
      const settled: Record<string, number> = {
        domains: DOMAINS.length,
        stages: 0,
        topics: 0,
        points: 0,
      }
      content.querySelectorAll<HTMLElement>(".folder-container[data-folderpath]").forEach((f) => {
        const fp = f.dataset.folderpath || ""
        if (/^learn\/s0\d\/index$/.test(fp)) settled.stages++
        else if (/^learn\/s0\d\/.+\/index$/.test(fp)) settled.topics++
      })
      content.querySelectorAll<HTMLAnchorElement>("a.nav-file-title").forEach((a) => {
        if (/\d{4}-\d{2}-\d{2}-/.test(a.getAttribute("href") || "")) settled.points++
      })
      if (settled.stages > 0) applyCounts(settled)
    }, 500)
  }
  runCounters(view)

  // Auto-grown "latest" feed.
  const feed = view.querySelector<HTMLElement>(".ka-feed")
  if (feed) {
    const html = renderFeed(content)
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
      // Read the target every frame: the explorer tree can settle a few
      // hundred ms after first paint, updating data-num mid-animation.
      const target = Number(el.dataset.num || "0")
      el.textContent = String(Math.round(target * e))
      if (k < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
}

/* ---- topbar ------------------------------------------------------------ */

function renderCrumb(stages: Stage[]): string {
  const cur = currentPath()
  const parts = ["<span>知识星图</span>"]
  if (cur === "/learn" || cur === "") {
    parts.push("<b>总览</b>")
    return parts.join('<span class="ka-sep"> / </span>')
  }
  parts.push('<a href="' + esc(pathHref("/learn/")) + '" data-no-popover="true">总览</a>')
  for (const s of stages) {
    if (!cur.startsWith(`/learn/${s.key}`)) continue
    parts.push(`<a href="${esc(s.href)}" data-no-popover="true">D1 ${esc(s.title)}</a>`)
    for (const t of s.topics) {
      if (!cur.startsWith(`/learn/${s.key}/${t.key}`)) continue
      parts.push(`<a href="${esc(t.href)}" data-no-popover="true">${esc(t.title)}</a>`)
      const kp = t.kps.find((k) => k.current)
      if (kp) parts.push(`<b>${esc(kp.title)}</b>`)
      break
    }
    break
  }
  return parts.join('<span class="ka-sep"> / </span>')
}

function topbarMarkup(stages: Stage[]): string {
  return [
    `<button class="ka-menu-btn" type="button" data-ka-action="menu" aria-label="打开目录">`,
    `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
    `</button>`,
    `<div class="ka-crumb">${renderCrumb(stages)}</div>`,
    `<div class="ka-spacer"></div>`,
    `<button class="ka-icon-btn" type="button" data-ka-action="search" title="搜索" aria-label="搜索">`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>`,
    `</button>`,
    `<button class="ka-icon-btn" type="button" data-ka-action="theme" title="切换主题" aria-label="切换主题">`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 109 9c0-5-4-9-9-9z"/></svg>`,
    `</button>`,
  ].join("")
}

/* ---- bind interactions (event delegation, bound once) ------------------ */

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
    if (head) {
      head.parentElement?.classList.toggle("open")
    }
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

/* ---- orchestration ----------------------------------------------------- */

function sync(): void {
  const learn = isLearnPage()
  const center = document.querySelector<HTMLElement>(".center")
  const contents = document.querySelectorAll<HTMLElement>(".explorer-content")

  // Clean up injected shell when leaving learn pages.
  if (!learn) {
    document
      .querySelectorAll<HTMLElement>(".ka-shell-sidebar, .ka-topbar, .ka-scrim")
      .forEach((el) => el.remove())
    document.body.classList.remove("ka-active")
    return
  }

  document.body.classList.add("ka-active")

  // Scrim for the mobile drawer (outside explorer so CSS can overlay fully).
  if (!document.querySelector(".ka-scrim")) {
    const scrim = document.createElement("div")
    scrim.className = "ka-scrim"
    scrim.addEventListener("click", () => document.body.classList.remove("ka-drawer"))
    document.body.appendChild(scrim)
  }

  contents.forEach((content) => {
    const stages = extractStages(content)
    const sig = stages
      .map(
        (s) =>
          `${s.key}|${s.current}|${s.topics
            .map(
              (t) =>
                `${t.key}|${t.current}|${t.kps.map((k) => `${k.href}|${k.current}`).join(",")}`,
            )
            .join(";")}`,
      )
      .join("||")

    let shell = content.querySelector<HTMLElement>(".ka-shell-sidebar")
    if (!shell) {
      shell = document.createElement("div")
      shell.className = "ka-shell-sidebar"
      content.prepend(shell)
      bindActions(shell)
    }

    // Rebuild only when the underlying tree/current page actually changed.
    if (content.dataset.kaSig !== sig) {
      content.dataset.kaSig = sig
      shell.innerHTML = renderSidebar(stages)
    }
  })

  // Overview metrics + auto-grown feed.
  contents.forEach((content) => syncOverview(content))

  // Topbar (once), refreshed on navigation.
  if (center) {
    let topbar = center.querySelector<HTMLElement>(":scope > .ka-topbar")
    if (!topbar) {
      topbar = document.createElement("div")
      topbar.className = "ka-topbar"
      center.prepend(topbar)
      bindActions(topbar)
    }
    const stages = contents.length ? extractStages(contents[0]) : []
    topbar.innerHTML = topbarMarkup(stages)
  }
}

if (!shellWindow.__kaShellRuntime) {
  shellWindow.__kaShellRuntime = true

  let observer: MutationObserver | undefined
  const start = () => {
    sync()
    observer?.disconnect()
    const target = document.querySelector<HTMLElement>(".explorer-content")
    if (target) {
      observer = new MutationObserver(() => sync())
      // childList only: attribute/class updates must not feed the loop.
      observer.observe(target, { childList: true, subtree: true })
    }
  }

  document.addEventListener("nav", () => start())
  document.addEventListener("DOMContentLoaded", () => start())
  if (document.readyState !== "loading") start()
}
