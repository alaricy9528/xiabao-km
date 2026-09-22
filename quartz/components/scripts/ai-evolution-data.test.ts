import assert from "node:assert/strict"
import test from "node:test"
import {
  daysSince,
  evolutionStats,
  isValidEvolutionData,
  moduleProgress,
  normalizeEvolutionData,
  type EvolutionData,
} from "./ai-evolution-data"

const module = (code: string, extras: Partial<EvolutionData["modules"][number]> = {}) => ({
  code,
  name: `模块 ${code}`,
  summary: `${code} 的摘要`,
  topics: [],
  status: "skeleton" as const,
  ...extras,
})

const data = (extras: Partial<EvolutionData> = {}): EvolutionData => ({
  version: 1,
  cycle: "daily",
  lastUpdated: "2026-09-22",
  modules: [module("M-01"), module("M-02")],
  log: [],
  ...extras,
})

test("rejects malformed evolution payloads", () => {
  assert.equal(isValidEvolutionData(null), false)
  assert.equal(isValidEvolutionData({}), false)
  assert.equal(isValidEvolutionData(data({ lastUpdated: "22/09/2026" })), false)
  assert.equal(isValidEvolutionData(data({ modules: [] })), false)
  assert.equal(isValidEvolutionData({ ...data(), modules: [{ code: "M-01" }] }), false)
  assert.equal(isValidEvolutionData(data()), true)
})

test("normalizes topics and log entries with caps and ordering", () => {
  const normalized = normalizeEvolutionData(
    data({
      modules: [module("M-01", { topics: ["a", "b", "c", "d", "e", "f", "g"] })],
      log: [
        { date: "2026-09-20", title: "旧", detail: "旧条目" },
        { date: "2026-09-22", title: "新", detail: "新条目" },
        { date: "bad-date", title: "坏", detail: "应被过滤" },
        ...Array.from({ length: 10 }, (_, i) => ({
          date: `2026-08-${String(i + 1).padStart(2, "0")}`,
          title: `填充 ${i}`,
          detail: "填充",
        })),
      ],
    }),
  )
  assert.ok(normalized)
  assert.equal(normalized.modules[0].topics.length, 6)
  assert.equal(normalized.log.length, 7)
  assert.equal(normalized.log[0].date, "2026-09-22")
  assert.equal(normalized.log[1].date, "2026-09-20")
})

test("maps module status to progress", () => {
  assert.equal(moduleProgress(module("M-01")), 0.08)
  assert.equal(moduleProgress(module("M-01", { status: "mature" })), 1)
  const growing = moduleProgress(module("M-01", { status: "growing", topics: ["a", "b"] }))
  assert.ok(growing > 0.35 && growing < 0.9)
  const capped = moduleProgress(
    module("M-01", { status: "growing", topics: ["a", "b", "c", "d", "e", "f", "g", "h"] }),
  )
  assert.equal(capped, 0.9)
})

test("aggregates evolution stats", () => {
  const stats = evolutionStats(
    data({
      modules: [module("M-01", { topics: ["a", "b"] }), module("M-02", { topics: ["c"] })],
      log: [{ date: "2026-09-22", title: "x", detail: "y" }],
    }),
  )
  assert.deepEqual(stats, {
    moduleCount: 2,
    topicCount: 3,
    logCount: 1,
    lastUpdated: "2026-09-22",
  })
})

test("computes days since last update", () => {
  const now = new Date("2026-09-22T10:00:00Z")
  assert.equal(daysSince("2026-09-22", now), 0)
  assert.equal(daysSince("2026-09-21", now), 1)
  assert.equal(daysSince("2026-09-15", now), 7)
  assert.equal(daysSince("not-a-date", now), 0)
})
