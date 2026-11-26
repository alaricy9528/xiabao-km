---
title: Skills 与能力封装 · D3-06
publish: true
description: D3 智能体工程 · 主题 D3-06：为可重复任务写一份 Skill，写清触发条件、步骤、验收与复用边界。试点主题，6 篇知识文章。
---

<div class="ai-learn ka-view ka-view--topic">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span></div>
  <div class="ka-card-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · 试点主题</span>
      <span class="ka-tag plain">6 篇知识文章</span>
    </div>
    <h1>Skills 与能力封装</h1>
    <p class="lede">学完能<em>为可重复任务写一份 Skill，写清触发条件、步骤、验收与复用边界</em>。先看它怎么跑、跟 MCP 各自负责什么、为什么会越改越差、为什么没被触发，最后看它的脚本跑在谁的权限里、长会话压缩后指令还剩多少。</p>
  </div>
  <div class="ka-topic-block">
    <h2><span>◆</span> 知识文章</h2>
    <a class="ka-topic-row" href="learn/d3/skills/skill-runtime/" data-no-popover="true"><span class="kn">01</span><span class="kt">Skill 是怎么跑起来的<small>目录结构、三层加载、脚本执行</small></span><span class="ko">→</span></a>
    <a class="ka-topic-row" href="learn/d3/skills/skill-vs-mcp/" data-no-popover="true"><span class="kn">02</span><span class="kt">Skill 和 MCP 差在哪<small>两条链路、两件事、一个任务里怎么接</small></span><span class="ko">→</span></a>
    <a class="ka-topic-row" href="learn/d3/skills/skill-drift/" data-no-popover="true"><span class="kn">03</span><span class="kt">Skill 为什么会越改越差<small>无反馈重写、先验漂移、专家知识的价值</small></span><span class="ko">→</span></a>
    <a class="ka-topic-row" href="learn/d3/skills/skill-trigger/" data-no-popover="true"><span class="kn">04</span><span class="kt">Skill 为什么没被触发<small>两关串联、库规模、前置全文只救触发</small></span><span class="ko">→</span></a>
    <a class="ka-topic-row" href="learn/d3/skills/skill-sandbox/" data-no-popover="true"><span class="kn">05</span><span class="kt">Skill 的脚本跑在谁的权限里<small>权限继承、沙箱默认、装前四步</small></span><span class="ko">→</span></a>
    <a class="ka-topic-row" href="learn/d3/skills/skill-compaction/" data-no-popover="true"><span class="kn">06</span><span class="kt">Skill 指令在压缩后的去向<small>一条消息常驻、5,000 与 25,000 额度、静默降级</small></span><span class="ko">→</span></a>
  </div>
  <div class="ka-topic-block">
    <h2><span>↗</span> 跨域依赖</h2>
    <p class="ka-topic-note"><b>先学</b> · D3-10 智能体评测与可靠性——先有可复跑的验收用例，换环境复验才有判据。<br><b>延伸</b> · <a href="learn/d4/" data-no-popover="true">D4-01 智能体开发平台</a>——平台如何注册、发现与管控 Skill。<br><b>风险</b> · <a href="learn/d5/" data-no-popover="true">D5-03 权限、人工审批与动作审计</a>——写入动作如何授权与留痕。</p>
  </div>
  <nav class="ka-kp-nav"><a class="prev" href="learn/d3/" data-no-popover="true"><div class="kn">← 返回知识域</div><div class="kt">D3 智能体工程</div></a><a class="next" href="learn/" data-no-popover="true"><div class="kn">回到总览 →</div><div class="kt">知识星图</div></a></nav>
</div>
