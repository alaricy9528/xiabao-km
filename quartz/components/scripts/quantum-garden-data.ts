export type KnowledgeIndexEntry = {
  slug: string
  filePath?: string
  title?: string
  links?: string[]
  tags?: string[]
  content?: string
  date?: Date | string
  description?: string
}

export type KnowledgeIndex = Record<string, KnowledgeIndexEntry>

export type GardenNote = {
  slug: string
  title: string
  description: string
  tags: string[]
  date?: Date
  featured: boolean
}

export type PerformanceTier = "high" | "medium" | "low"

export type PerformanceSignals = {
  width: number
  hardwareConcurrency?: number
  deviceMemory?: number
  reducedMotion?: boolean
}

const excludedSlug = /^(?:index|tags(?:\/|$)|404$)/i
const directoryIndex = /(?:^|\/)index\.md$/i
const markup = /<[^>]*>|[#>*_`~\[\](){}|\\]/g
const whitespace = /\s+/g

export function isDiscoverableNote(entry: KnowledgeIndexEntry): boolean {
  const slug = entry.slug.trim()
  const content = entry.content?.replace(whitespace, " ").trim() ?? ""
  if (!slug || excludedSlug.test(slug) || directoryIndex.test(entry.filePath ?? "")) return false
  return Boolean(entry.title?.trim() && content)
}

export function noteDescription(entry: KnowledgeIndexEntry, length = 80): string {
  const explicit = entry.description?.replace(whitespace, " ").trim()
  if (explicit) return explicit

  let plain = (entry.content ?? "").replace(markup, " ").replace(whitespace, " ").trim()
  const title = entry.title?.trim()
  if (title && plain.startsWith(title)) plain = plain.slice(title.length).trim()
  const characters = Array.from(plain)
  return characters.length > length ? `${characters.slice(0, length).join("")}…` : plain
}

function noteDate(value: KnowledgeIndexEntry["date"]): Date | undefined {
  if (!value) return undefined
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.valueOf()) ? undefined : date
}

function compareRecentThenTitle(a: GardenNote, b: GardenNote): number {
  if (a.date && b.date) return b.date.valueOf() - a.date.valueOf()
  if (a.date) return -1
  if (b.date) return 1
  return a.title.localeCompare(b.title, "zh-CN")
}

export function selectGardenNotes(
  index: KnowledgeIndex,
  featuredSlugs: string[],
  limit = 6,
): GardenNote[] {
  const featuredOrder = new Map(featuredSlugs.map((slug, order) => [slug, order]))
  return Object.values(index)
    .filter(isDiscoverableNote)
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title!.trim(),
      description: noteDescription(entry),
      tags: entry.tags ?? [],
      date: noteDate(entry.date),
      featured: featuredOrder.has(entry.slug),
    }))
    .sort((a, b) => {
      const aOrder = featuredOrder.get(a.slug)
      const bOrder = featuredOrder.get(b.slug)
      if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder
      if (aOrder !== undefined) return -1
      if (bOrder !== undefined) return 1
      return compareRecentThenTitle(a, b)
    })
    .slice(0, Math.max(0, limit))
}

export function performanceTier(signals: PerformanceSignals): PerformanceTier {
  if (signals.reducedMotion || signals.width < 640) return "low"
  const cores = signals.hardwareConcurrency ?? 4
  const memory = signals.deviceMemory ?? 4
  if (signals.width >= 1100 && cores >= 8 && memory >= 8) return "high"
  if (signals.width >= 720 && cores >= 4 && memory >= 4) return "medium"
  return "low"
}

export const tierSettings: Record<
  PerformanceTier,
  { particles: number; dpr: number; antialias: boolean }
> = {
  high: { particles: 1200, dpr: 1.5, antialias: true },
  medium: { particles: 700, dpr: 1.25, antialias: true },
  low: { particles: 300, dpr: 1, antialias: false },
}
