import assert from "node:assert/strict"
import test from "node:test"
import {
  isDiscoverableNote,
  noteDescription,
  performanceTier,
  selectGardenNotes,
  tierSettings,
  type KnowledgeIndex,
} from "./quantum-garden-data"

const entry = (slug: string, extras: Partial<KnowledgeIndex[string]> = {}) => ({
  slug,
  filePath: `${slug}.md`,
  title: slug,
  content: `${slug} 的正文内容`,
  tags: [],
  links: [],
  ...extras,
})

test("filters home, tag, directory and empty pages", () => {
  assert.equal(isDiscoverableNote(entry("index")), false)
  assert.equal(isDiscoverableNote(entry("tags/design")), false)
  assert.equal(isDiscoverableNote(entry("docs", { filePath: "docs/index.md" })), false)
  assert.equal(isDiscoverableNote(entry("empty", { content: "  " })), false)
  assert.equal(isDiscoverableNote(entry("一篇笔记")), true)
})

test("uses description first and falls back to trimmed body", () => {
  assert.equal(noteDescription(entry("标题", { description: "  人工摘要  " })), "人工摘要")
  assert.equal(
    noteDescription(entry("标题", { content: "标题\n**这是** 一段正文", description: undefined })),
    "这是 一段正文",
  )
  assert.match(noteDescription(entry("长文", { content: `长文${"字".repeat(100)}` })), /…$/)
})

test("keeps featured order then sorts dated and undated notes", () => {
  const index: KnowledgeIndex = {
    older: entry("older", { title: "旧笔记", date: "2025-01-01" }),
    beta: entry("beta", { title: "乙" }),
    latest: entry("latest", { title: "最新", date: "2026-08-14" }),
    alpha: entry("alpha", { title: "甲" }),
  }
  assert.deepEqual(
    selectGardenNotes(index, ["beta", "older"]).map((note) => note.slug),
    ["beta", "older", "latest", "alpha"],
  )
})

test("caps the WebGL content nodes", () => {
  const index = Object.fromEntries(
    Array.from({ length: 9 }, (_, i) => [`note-${i}`, entry(`note-${i}`)]),
  )
  assert.equal(selectGardenNotes(index, [], 6).length, 6)
})

test("chooses adaptive particle and DPR budgets", () => {
  assert.equal(performanceTier({ width: 1440, hardwareConcurrency: 12, deviceMemory: 16 }), "high")
  assert.equal(performanceTier({ width: 900, hardwareConcurrency: 4, deviceMemory: 4 }), "medium")
  assert.equal(performanceTier({ width: 390, hardwareConcurrency: 8, deviceMemory: 8 }), "low")
  assert.equal(
    performanceTier({
      width: 1440,
      hardwareConcurrency: 12,
      deviceMemory: 16,
      reducedMotion: true,
    }),
    "low",
  )
  assert.deepEqual(
    [tierSettings.high.particles, tierSettings.medium.particles, tierSettings.low.particles],
    [1200, 700, 300],
  )
})
