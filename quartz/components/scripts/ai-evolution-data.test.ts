import assert from "node:assert/strict"
import test from "node:test"
import {
  daysSince,
  evolutionStats,
  isValidEvolutionData,
  moduleProgress,
  normalizeEvolutionData,
  splitTopic,
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

test("splits a full-shaped topic into title/body/source", () => {
  const parsed = splitTopic(
    "HySparse2 混合稀疏注意力（MiMo-V3 核心架构）：两级 KV 共享——外层 KV Bridging + 内层 KV Reuse；1M tokens 下预填充 FLOPs 降低 5.02 倍（来源：小米 arXiv 2609.26368，2026-09-23，方向：模型与架构）",
  )
  assert.equal(parsed.title, "HySparse2 混合稀疏注意力（MiMo-V3 核心架构）")
  assert.ok(parsed.body.includes("1M tokens 下预填充 FLOPs 降低 5.02 倍"))
  assert.ok(!parsed.body.includes("来源"))
  assert.equal(parsed.source, "小米 arXiv 2609.26368，2026-09-23")
})

test("splits topic without source citation", () => {
  const parsed = splitTopic(
    "从 RLHF 到 Agentic RL 的转向：对齐目标从「优化语气/偏好」转为「优化多步任务完成」（来源：Towards AI / MiMo 技术报告，方向：训练与对齐）",
  )
  assert.equal(parsed.title, "从 RLHF 到 Agentic RL 的转向")
  assert.ok(parsed.body.startsWith("对齐目标"))
  assert.equal(parsed.source, "Towards AI / MiMo 技术报告")
})

test("handles long titles with embedded parentheses and colons safely", () => {
  // Real data shape: title contains（…）and body contains further full-width colons.
  const parsed = splitTopic(
    "RSI 全球技术标准提案 + 第三方安全评估原则（OpenAI 2026-09-21《Building standards for the next phase of AI》，两条同源合并）：呼吁美国牵头、依托各国 AI 安全机构网络制定前沿 AI 技术标准：重点覆盖前沿模型（来源：OpenAI 官方博客 / The Decoder，方向：安全与治理）",
  )
  assert.equal(
    parsed.title,
    "RSI 全球技术标准提案 + 第三方安全评估原则（OpenAI 2026-09-21《Building standards for the next phase of AI》，两条同源合并）",
  )
  assert.ok(parsed.body.includes("重点覆盖前沿模型"))
  assert.equal(parsed.source, "OpenAI 官方博客 / The Decoder")
})

test("falls back to whole string as title when shape is unrecognized", () => {
  const noColon = splitTopic("一段没有冒号的普通描述文字")
  assert.equal(noColon.title, "一段没有冒号的普通描述文字")
  assert.equal(noColon.body, "")
  assert.equal(noColon.source, undefined)

  // Colon too deep (>TITLE_MAX or past half the string) → not a title separator.
  const deepColon = splitTopic("a".repeat(120) + "：尾部")
  assert.equal(deepColon.title, "a".repeat(120) + "：尾部")
  assert.equal(deepColon.body, "")
})
