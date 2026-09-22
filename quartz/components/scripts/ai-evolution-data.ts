export type EvolutionModule = {
  code: string
  name: string
  summary: string
  topics: string[]
  status: "skeleton" | "growing" | "mature"
}

export type EvolutionLogEntry = {
  date: string
  title: string
  detail: string
}

export type EvolutionData = {
  version: number
  cycle: string
  lastUpdated: string
  modules: EvolutionModule[]
  log: EvolutionLogEntry[]
}

export const MAX_LOG_ENTRIES = 7
export const MAX_TOPICS_PER_MODULE = 6

const datePattern = /^\d{4}-\d{2}-\d{2}$/

export function isValidEvolutionData(value: unknown): value is EvolutionData {
  if (typeof value !== "object" || value === null) return false
  const data = value as Partial<EvolutionData>
  if (typeof data.lastUpdated !== "string" || !datePattern.test(data.lastUpdated)) return false
  if (!Array.isArray(data.modules) || data.modules.length === 0) return false
  return data.modules.every(
    (module) =>
      typeof module?.code === "string" &&
      typeof module?.name === "string" &&
      typeof module?.summary === "string" &&
      Array.isArray(module?.topics),
  )
}

export function normalizeEvolutionData(raw: unknown): EvolutionData | undefined {
  if (!isValidEvolutionData(raw)) return undefined
  const log = Array.isArray(raw.log) ? raw.log : []
  return {
    version: typeof raw.version === "number" ? raw.version : 1,
    cycle: typeof raw.cycle === "string" ? raw.cycle : "daily",
    lastUpdated: raw.lastUpdated,
    modules: raw.modules.map((module) => ({
      code: module.code,
      name: module.name,
      summary: module.summary,
      topics: module.topics.slice(0, MAX_TOPICS_PER_MODULE),
      status: module.status ?? "skeleton",
    })),
    log: log
      .filter(
        (entry): entry is EvolutionLogEntry =>
          typeof entry?.date === "string" &&
          datePattern.test(entry.date) &&
          typeof entry?.title === "string",
      )
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, MAX_LOG_ENTRIES),
  }
}

export function moduleProgress(module: EvolutionModule): number {
  if (module.status === "mature") return 1
  if (module.status === "growing") return Math.min(0.9, 0.35 + module.topics.length * 0.08)
  return 0.08
}

export function evolutionStats(data: EvolutionData): {
  moduleCount: number
  topicCount: number
  logCount: number
  lastUpdated: string
} {
  return {
    moduleCount: data.modules.length,
    topicCount: data.modules.reduce((total, module) => total + module.topics.length, 0),
    logCount: data.log.length,
    lastUpdated: data.lastUpdated,
  }
}

export function daysSince(dateIso: string, now: Date): number {
  const then = new Date(`${dateIso}T00:00:00Z`)
  if (Number.isNaN(then.valueOf())) return 0
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  return Math.max(0, Math.round((today.valueOf() - then.valueOf()) / 86400000))
}
