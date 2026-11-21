---
title: 做 Skill 还是做连接器 · 判断卡
publish: true
description: D3-06 Skills 与能力封装 · 判断卡：已有只读待办接口时，把「按紧急程度归类并生成明日清单」做成可复用任务，先封装 Skill 还是先做连接器。
---

<div class="ai-learn ka-view ka-view--card">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 判断卡 01</div>
  <div class="ka-card-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · 试点主题</span>
      <span class="ka-tag plain">判断卡 01 / 03</span>
      <span class="ka-tag plain">更新 2026-11-21</span>
    </div>
    <h1>做 Skill，还是做连接器？</h1>
    <p class="ka-card-question">已有只读待办接口，要把「按紧急程度归类并生成明日清单」做成可重复任务，应该先做哪一层？</p>
  </div>
  <div class="ka-card-conclusion"><span class="clabel">结论</span><p>读待办的接口可复用时，<em>先把归类规则、例外处理和交付格式封装成 Skill</em>。新增数据源或授权方式时，再评估连接器、以及是否需要经 MCP 接入。</p></div>
  <div class="ka-card-grid">
    <div class="ka-card-main">
      <section class="ka-card-sec">
        <h2><span>01</span> 证据与复验</h2>
        <ul class="ka-evidence">
          <li><b>输入</b>：仅含「紧急 / 普通 / 缺失截止时间」三类的模拟待办。</li>
          <li><b>检查</b>：清单按预设规则分组、缺失项单列、对业务系统的操作为只读。</li>
          <li><b>规范依据</b>：Agent Skills 规范界定 Skill 的指令与资源组织方式；MCP 架构概览界定其接入角色与能力交换。</li>
        </ul>
        <p class="ka-card-note">选型结论是本案例的工程判断；规范只界定各自职责，不替你决定先做哪一层。</p>
      </section>
      <section class="ka-card-sec">
        <h2><span>02</span> 边界与行动</h2>
        <p>若任务还要修改或关闭待办，先定义写入授权、人工确认与操作记录，再动手。首发演示一律走只读路径——能力可加，权限不可逆。</p>
      </section>
    </div>
    <aside class="ka-card-aside">
      <div class="ka-aside-card">
        <h5>卡片状态</h5>
        <div class="ka-meta-row"><span>复核状态</span><b class="st-pass">草稿 · 待复验</b></div>
        <div class="ka-meta-row"><span>复核触发</span><b>Skill/MCP 规范更新或接口变更</b></div>
        <div class="ka-meta-row"><span>updated_at</span><b>2026-11-21</b></div>
      </div>
      <div class="ka-aside-card">
        <h5>关联主题</h5>
        <a class="ka-rel-link" href="learn/d3/skills/" data-no-popover="true">D3-06 Skills 与能力封装</a>
        <a class="ka-rel-link" href="learn/d3/skills/read-only-first/" data-no-popover="true">只读先行 · 风险</a>
        <a class="ka-rel-link" href="learn/d5/" data-no-popover="true">D5-03 权限与动作审计 · 风险</a>
      </div>
      <div class="ka-aside-card">
        <h5>对我工作的意义</h5>
        <p class="ka-implication">统一待办集成里，先沉淀可复用 Skill 比先堆连接器更快见效，也更安全。</p>
      </div>
    </aside>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/read-only-first/" data-no-popover="true"><div class="kn">下一张 →</div><div class="kt">能力可加，权限不可逆</div></a>
  </nav>
</div>
