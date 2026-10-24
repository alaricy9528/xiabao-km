/* Learning-directory navigation runtime (site-wide, learn pages included).
   Two jobs:
   1. Mobile: prepend a stage shortcut row inside the explorer drawer, so the
      six stages are one tap away instead of buried three levels deep.
   2. Everywhere: mark the explorer entry that points at the current page,
      so the tree always shows where you are.
   The explorer tree is rendered by Quartz after DOM load, so everything is
   re-applied from a MutationObserver as well as on SPA navigation. */

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

/* Matches the mobile breakpoint in custom.scss, where the explorer becomes
   a floating drawer panel. */
const MOBILE_QUERY = "(max-width: 800px)"

function normalize(pathname: string): string {
  return pathname.replace(/\/+$/, "")
}

/* Site may be served from a subpath (GitHub Pages project site): keep the
   prefix so shortcut links work locally and online alike. */
function sitePrefix(): string {
  const path = window.location.pathname
  const idx = path.indexOf("/learn/")
  return idx >= 0 ? path.slice(0, idx) : ""
}

function pathOf(el: HTMLAnchorElement): string {
  try {
    return normalize(new URL(el.href, window.location.href).pathname)
  } catch {
    return ""
  }
}

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

function syncNav(): void {
  const mobile = window.matchMedia(MOBILE_QUERY).matches
  const current = normalize(window.location.pathname)
  const prefix = sitePrefix()

  document.querySelectorAll<HTMLElement>(".explorer-content").forEach((content) => {
    let bar = content.querySelector<HTMLElement>(".ai-lnav")

    if (mobile) {
      if (!bar) {
        bar = buildShortcuts(prefix)
        content.prepend(bar)
      }
      bar.querySelectorAll<HTMLAnchorElement>(".ai-lnav__chip").forEach((a) => {
        const target = pathOf(a)
        const active = target !== "" && (current === target || current.startsWith(`${target}/`))
        if (active) {
          a.setAttribute("aria-current", "page")
        } else {
          a.removeAttribute("aria-current")
        }
      })
    } else if (bar) {
      bar.remove()
    }

    // Current entry in the tree itself
    content.querySelectorAll<HTMLAnchorElement>("a").forEach((a) => {
      if (a.classList.contains("ai-lnav__chip")) return
      const target = pathOf(a)
      const active = target !== "" && target === current
      a.classList.toggle("is-current", active)
      if (active) {
        a.closest("li")?.classList.add("is-current")
      }
    })
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
