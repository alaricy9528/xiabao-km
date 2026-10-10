export type ConceptField = {
  label: string
  points: string[]
}

export type ConceptCard = {
  id: string
  name: string
  /** Knowledge kind (机制/模式/阶段/规律/实践/格局/攻防) — decides the analysis lens, i.e. which fields the card carries. */
  kind: string
  /** Sub-theme cluster inside a module, used to group concept cards for scannability. */
  group: string
  definition: string
  fields: ConceptField[]
  /** Cross-references to related concepts, global refs shaped like "M-02:c5". */
  related: string[]
}

export type TopicEntry = {
  title: string
  tldr: string
  body: string
  source?: string
  concepts: string[]
}

export type EvolutionModule = {
  code: string
  name: string
  summary: string
  concepts: ConceptCard[]
  topics: TopicEntry[]
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
export const MAX_CONCEPTS_PER_MODULE = 8

const datePattern = /^\d{4}-\d{2}-\d{2}$/

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : []
}

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

function normalizeConcept(raw: unknown): ConceptCard | undefined {
  if (typeof raw !== "object" || raw === null) return undefined
  const concept = raw as Partial<ConceptCard>
  if (
    typeof concept.id !== "string" ||
    concept.id.length === 0 ||
    typeof concept.name !== "string" ||
    typeof concept.definition !== "string"
  )
    return undefined
  const fields = Array.isArray(concept.fields)
    ? concept.fields
        .filter(
          (field): field is ConceptField =>
            typeof field?.label === "string" &&
            field.label.length > 0 &&
            Array.isArray(field.points),
        )
        .map((field) => ({
          label: field.label,
          points: field.points.filter((point): point is string => typeof point === "string"),
        }))
        .filter((field) => field.points.length > 0)
    : []
  return {
    id: concept.id,
    name: concept.name,
    kind: typeof concept.kind === "string" && concept.kind ? concept.kind : "概念",
    group: typeof concept.group === "string" ? concept.group : "",
    definition: concept.definition,
    fields,
    related: stringArray(concept.related).filter((ref) => ref.length > 0),
  }
}

function normalizeTopic(raw: unknown): TopicEntry | undefined {
  // Legacy shape: a single long string produced by older automation runs.
  if (typeof raw === "string") {
    const { title, body, source } = splitTopic(raw)
    if (!title) return undefined
    return { title, tldr: "", body, source, concepts: [] }
  }
  if (typeof raw !== "object" || raw === null) return undefined
  const topic = raw as Partial<TopicEntry>
  if (typeof topic.title !== "string" || topic.title.length === 0) return undefined
  return {
    title: topic.title,
    tldr: typeof topic.tldr === "string" ? topic.tldr : "",
    body: typeof topic.body === "string" ? topic.body : "",
    source: typeof topic.source === "string" && topic.source ? topic.source : undefined,
    concepts: stringArray(topic.concepts),
  }
}

export function normalizeEvolutionData(raw: unknown): EvolutionData | undefined {
  if (!isValidEvolutionData(raw)) return undefined
  const log = Array.isArray(raw.log) ? raw.log : []
  return {
    version: typeof raw.version === "number" ? raw.version : 1,
    cycle: typeof raw.cycle === "string" ? raw.cycle : "daily",
    lastUpdated: raw.lastUpdated,
    modules: raw.modules.map((module) => {
      const rawConcepts = Array.isArray((module as Partial<EvolutionModule>).concepts)
        ? ((module as Partial<EvolutionModule>).concepts as unknown[])
        : []
      const concepts = rawConcepts
        .map(normalizeConcept)
        .filter((concept): concept is ConceptCard => concept !== undefined)
        .slice(0, MAX_CONCEPTS_PER_MODULE)
      const knownIds = new Set(concepts.map((concept) => concept.id))
      const topics = (module.topics as unknown[])
        .map(normalizeTopic)
        .filter((topic): topic is TopicEntry => topic !== undefined)
        .slice(0, MAX_TOPICS_PER_MODULE)
        // Drop references to unknown concept ids so the UI never shows blanks.
        .map((topic) => ({ ...topic, concepts: topic.concepts.filter((id) => knownIds.has(id)) }))
      return {
        code: module.code,
        name: module.name,
        summary: module.summary,
        concepts,
        topics,
        status: module.status ?? "skeleton",
      }
    }),
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
  if (module.status === "growing")
    return Math.min(0.9, 0.3 + module.topics.length * 0.05 + module.concepts.length * 0.04)
  return 0.08
}

export function evolutionStats(data: EvolutionData): {
  moduleCount: number
  conceptCount: number
  topicCount: number
  logCount: number
  lastUpdated: string
} {
  return {
    moduleCount: data.modules.length,
    conceptCount: data.modules.reduce((total, module) => total + module.concepts.length, 0),
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

export type ParsedTopic = {
  title: string
  body: string
  source: string | undefined
}

// Only treat a leading full-width colon as a title separator when the title
// stays short; otherwise the colon is likely mid-sentence punctuation.
// (Real data: the longest observed title segment is ~92 chars.)
const TITLE_MAX = 100

const SOURCE_PATTERN = /（来源：([^）]*)）\s*$/
const DIRECTION_PATTERN = /，方向：[^，]*$/

/**
 * Split a long raw topic string (produced by the daily evolution automation)
 * into a short title, body text, and optional source citation.
 *
 * Expected shape: "<title>：<body>（来源：<who/arXiv/date>，方向：<module>）".
 * All parts are optional; parsing never throws and never loses text —
 * unrecognized shapes fall back to using the whole string as the title.
 */
export function splitTopic(raw: string): ParsedTopic {
  let body = raw.trim()
  let source: string | undefined
  const sourceMatch = body.match(SOURCE_PATTERN)
  if (sourceMatch && sourceMatch.index !== undefined) {
    source = sourceMatch[1].replace(DIRECTION_PATTERN, "").trim()
    body = body.slice(0, sourceMatch.index).trim()
  }
  const colon = body.indexOf("：")
  if (colon > 0 && colon <= TITLE_MAX) {
    return { title: body.slice(0, colon).trim(), body: body.slice(colon + 1).trim(), source }
  }
  return { title: body, body: "", source }
}
