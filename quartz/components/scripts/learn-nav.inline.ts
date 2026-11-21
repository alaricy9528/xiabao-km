/* Learning-directory navigation runtime (site-wide, learn pages included).
   Three jobs:
   1. Prepend a four-domain navigation panel to the explorer (D1 live, D2-D4
      "growing") — the desktop explorer tree was previously almost undecorated.
   2. Mobile: prepend a stage shortcut row inside the explorer drawer so the
      six stages are one tap away instead of buried three levels deep.
   3. Everywhere: semantic-class the tree nodes (stage / topic / knowledge
      point) by folderpath + href, and mark the current page + its ancestor
      chain so the tree always shows where you are.
   The explorer tree is rendered by Quartz after DOM load, so everything is
   re-applied from a MutationObserver as well as on SPA navigation. All work is
   idempotent to avoid observer feedback loops. */

type NavWindow = Window & { __aiLearnNavRuntime?: boolean }

const navWindow = window as NavWindow

type Stage = { code: string; slug: string; short: string }

const STAGES: Stage[] = [
  { code: "S-01", slug: "s01", short: "数学直觉" },
  { code: "S-02", slug: "s02", short: "深度学习" },
  { code: "S-03", slug: "s03", short: "Transformer" },
  { code: "S-04", slug: "s04", short: "训练对齐" },
  { code: "S-05", slug: "s05", short: "推理智能体" },
  { code: "S-06", slug: "s06", short: "边界安全" },
]

type Domain = {
  code: string
  name: string
  note: string
  slug: string | null
}

const DOMAINS: Domain[] = [
  { code: "D1", name: "智能原理", note: "32 篇", slug: "" },
  { code: "D2", name: "知识工程", note: "生长中", slug: null },
  { code: "D3", name: "智能体工程", note: "生长中", slug: null },
  { code: "D4", name: "应用与治理", note: "生长中", slug: null },
]

/* Matches the mobile breakpoint in custom.scss, where the explorer becomes
   a floating drawer panel. */
const MOBILE_QUERY = "(max-width: 800px)"

/* Quartz publishes the project-site basepath on <body data-basepath>. */
function basePath(): string {
  return (document.body.dataset.basepath || "").replace(/\/+$/, "")
}

function normalize(pathname: string): string {
  let p = pathname.replace(/\/+$/, "")
  // Local static preview appends .html; the live site uses clean URLs. Treat
  // both as the same page so current-page highlighting works in either place.
  if (p.endsWith(".html")) p = p.slice(0, -5)
  const base = basePath()
  if (base && p.startsWith(`${base}/`)) p = p.slice(base.length)
  return p || "/"
}

/* Links must carry the basepath so they resolve online ("/xiabao-km"). */
function sitePrefix(): string {
  return basePath()
}

function pathOf(el: HTMLAnchorElement): string {
  try {
    return normalize(new URL(el.href, window.location.href).pathname)
  } catch {
    return ""
  }
}

/* ---- four-domain panel ------------------------------------------------- */

function buildEnav(prefix: string): HTMLDivElement {
  const panel = document.createElement("div")
  panel.className = "ai-enav"

  const brand = document.createElement("div")
  brand.className = "ai-enav__brand"
  const mark = document.createElement("span")
  mark.className = "ai-enav__mark"
  mark.setAttribute("aria-hidden", "true")
  mark.textContent = "◈"
  const texts = document.createElement("span")
  texts.className = "ai-enav__brandtext"
  const title = document.createElement("b")
  title.textContent = "知识地图"
  const sub = document.createElement("small")
  sub.textContent = "KNOWLEDGE MAP · 4 域 6 阶"
  texts.append(title, sub)
  brand.append(mark, texts)

  const list = document.createElement("nav")
  list.className = "ai-enav__domains"
  list.setAttribute("aria-label", "知识域导航")
  for (const domain of DOMAINS) {
    const live = domain.slug !== null
    const node = document.createElement(live ? "a" : "span")
    node.className = `ai-enav__dom ai-enav__dom--${domain.code.toLowerCase()}`
    if (live && node instanceof HTMLAnchorElement) {
      node.href = `${prefix}/learn/`
    } else {
      node.setAttribute("aria-disabled", "true")
    }
    const code = document.createElement("span")
    code.className = "ai-enav__dcode"
    code.textContent = domain.code
    const name = document.createElement("span")
    name.className = "ai-enav__dname"
    name.textContent = domain.name
    const note = document.createElement("span")
    note.className = "ai-enav__dnote"
    note.textContent = domain.note
    node.append(code, name, note)
    list.append(node)
  }

  const divider = document.createElement("div")
  divider.className = "ai-enav__divider"
  const dividerText = document.createElement("span")
  dividerText.textContent = "原理线 · 六个阶段"
  divider.append(dividerText)

  panel.append(brand, list, divider)
  return panel
}

/* ---- mobile stage shortcuts ------------------------------------------- */

function buildShortcuts(prefix: string): HTMLDivElement {
  const bar = document.createElement("div")
  bar.className = "ai-lnav"
  const chips = document.createElement("div")
  chips.className = "ai-lnav__chips"

  const overview = document.createElement("a")
  overview.className = "ai-lnav__chip"
  overview.href = `${prefix}/learn/`
  overview.textContent = "总览"
  chips.append(overview)

  for (const stage of STAGES) {
    const a = document.createElement("a")
    a.className = "ai-lnav__chip"
    a.href = `${prefix}/learn/${stage.slug}/`
    const b = document.createElement("b")
    b.textContent = stage.code
    a.append(b, document.createTextNode(stage.short))
    chips.append(a)
  }

  const summary = document.createElement("p")
  summary.className = "ai-lnav__hint"
  summary.textContent = "左右滑动切换阶段"

  bar.append(chips, summary)
  return bar
}

/* ---- tree semantics ---------------------------------------------------- */

function decorateTree(content: HTMLElement, current: string): void {
  // Folder nodes: stage (learn/sNN/index) vs topic (deeper index folder).
  content.querySelectorAll<HTMLElement>(".folder-container[data-folderpath]").forEach((folder) => {
    const fp = folder.dataset.folderpath || ""
    const stageMatch = /^learn\/(s0\d)\/index$/.exec(fp)
    const topicMatch = /^learn\/(s0\d)\/.+\/index$/.exec(fp)
    if (stageMatch) {
      folder.classList.add("ai-enav__stage")
      folder.classList.remove("ai-enav__topic")
      folder.dataset.stage = stageMatch[1]
      const btn = folder.querySelector<HTMLElement>(":scope > div > a.folder-button")
      if (btn) btn.dataset.stageLabel = `S-${stageMatch[1].slice(1)}`
    } else if (topicMatch) {
      folder.classList.add("ai-enav__topic")
      folder.classList.remove("ai-enav__stage")
      folder.dataset.stage = topicMatch[1]
    }
  })

  // Knowledge-point files + current-page chain.
  content.querySelectorAll<HTMLAnchorElement>("a.nav-file-title").forEach((a) => {
    const target = pathOf(a)
    const kpMatch = /\/learn\/(s0\d)\//.exec(target)
    if (kpMatch) {
      a.classList.add("ai-enav__kp")
      a.dataset.stage = kpMatch[1]
    }
  })

  content.querySelectorAll<HTMLAnchorElement>("a").forEach((a) => {
    if (a.closest(".ai-enav") || a.classList.contains("ai-lnav__chip")) return
    const target = pathOf(a)
    const active = target !== "" && target === current
    a.classList.toggle("is-current", active)
    const li = a.closest("li")
    if (li) li.classList.toggle("is-current", active)
  })

  // Branch highlight: mark ancestor folder rows of the current entry.
  content.querySelectorAll<HTMLElement>(".folder-container").forEach((folder) => {
    const li = folder.closest("li")
    const onBranch = !!li && !!li.querySelector("a.is-current")
    folder.classList.toggle("is-branch", onBranch)
  })
}

/* ---- orchestration ----------------------------------------------------- */

function syncNav(): void {
  const mobile = window.matchMedia(MOBILE_QUERY).matches
  const current = normalize(window.location.pathname)
  const prefix = sitePrefix()

  document.querySelectorAll<HTMLElement>(".explorer-content").forEach((content) => {
    // 1. Four-domain panel (idempotent, always present).
    let enav = content.querySelector<HTMLElement>(":scope > .ai-enav")
    if (!enav) {
      enav = buildEnav(prefix)
      content.prepend(enav)
    }
    enav.querySelectorAll<HTMLAnchorElement>("a.ai-enav__dom").forEach((a) => {
      const target = pathOf(a)
      const active = target !== "" && (current === target || current.startsWith(`${target}/`))
      if (active) a.setAttribute("aria-current", "page")
      else a.removeAttribute("aria-current")
    })

    // 2. Mobile stage shortcuts (only inside the drawer).
    let bar = content.querySelector<HTMLElement>(".ai-lnav")
    if (mobile) {
      if (!bar) {
        bar = buildShortcuts(prefix)
        content.prepend(bar)
      }
      bar.querySelectorAll<HTMLAnchorElement>(".ai-lnav__chip").forEach((a) => {
        const target = pathOf(a)
        const active = target !== "" && (current === target || current.startsWith(`${target}/`))
        if (active) a.setAttribute("aria-current", "page")
        else a.removeAttribute("aria-current")
      })
    } else if (bar) {
      bar.remove()
    }

    // 3. Tree semantics + current-page chain.
    decorateTree(content, current)
  })
}

if (!navWindow.__aiLearnNavRuntime) {
  navWindow.__aiLearnNavRuntime = true

  let observer: MutationObserver | undefined
  const start = () => {
    observer?.disconnect()
    syncNav()
    const target = document.querySelector<HTMLElement>(".explorer-content")
    if (target) {
      observer = new MutationObserver(() => syncNav())
      observer.observe(target, { childList: true, subtree: true })
    }
  }

  document.addEventListener("nav", () => start())
  document.addEventListener("DOMContentLoaded", () => start())
  if (document.readyState !== "loading") start()
}
