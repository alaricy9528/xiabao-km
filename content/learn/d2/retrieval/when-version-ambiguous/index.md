---
title: 版本条件不清时先补元数据 · 失败边界卡
publish: true
description: D2-05 知识召回与 RAG · 判断卡：当题目没有生效时间或读者权限，检索回归必然失败，先补元数据而不是调模型。
---

<div class="ai-learn ka-view ka-view--card">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D2 知识工程</span> / <span>知识召回与 RAG</span> / 判断卡 02</div>
  <div class="ka-card-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-violet)">D2-05 · 试点主题</span>
      <span class="ka-tag plain">判断卡 02 / 02</span>
      <span class="ka-tag plain">更新 2026-11-21</span>
    </div>
    <h1>版本条件不清，先别调模型</h1>
    <p class="ka-card-question">检索回归题失败时，怎么判断是检索排序的问题，还是题目本身没定义清楚？</p>
  </div>
  <div class="ka-card-conclusion"><span class="clabel">结论</span><p>如果题目没写生效时间、没限定读者权限，<em>「正确版本」本身就无从定义</em>——这时候调排序、换模型都是白费。先补资料元数据与题目条件，再谈检索质量。</p></div>
  <div class="ka-card-grid">
    <div class="ka-card-main">
      <div class="ka-figcard">
        <div class="fhead"><i class="sig"></i>核心图解 · 顺序换一下，结论完全不同</div>
        <figure class="ka-figimg">
          <img class="fig-on-light" src="when-version-ambiguous-light.png" alt="两条路对比：先调模型判据仍然缺，先补元数据才有得比">
          <img class="fig-on-dark" src="when-version-ambiguous-dark.png" alt="">
        </figure>
        <div class="ka-fcap">读法：先调模型那条走到底，你会得到「好像还是不太准」；先补元数据那条走到底，你才知道检索到底行不行。</div>
      </div>
      <div class="ka-prose">
        <p>检索答错了，人的第一反应通常是去调参数、换个更大的模型。但如果题目本身没说清「时间是哪个时点、读者是哪个岗位」，那就不存在唯一正确答案——一份资料说 10 天、另一份说 15 天，两份都没标生效时间，模型返回哪个你都判不了对错。这时候调模型，只是把同一个不确定性换个地方发生。</p>
        <p>顺序应该反过来：先给制度类资料补三个字段——<em>什么时候生效、什么时候失效、对谁适用</em>；再把时间点和读者角色写进回归题。补齐之后重跑同一套题，如果还是错，那才是检索排序或向量模型的问题，这时候动手调才有意义。</p>
      </div>
      <section class="ka-card-sec">
        <h2><span>01</span> 失败边界</h2>
        <ul class="ka-evidence">
          <li><b>边界一</b>：资料 A（10 日）与 B（15 日）都无生效时间标注时，两版都算「正确」，Top 3 验收失去判据。</li>
          <li><b>边界二</b>：题目未限定读者角色，某版本仅对特定岗位生效，检索返回结果无法判定对错。</li>
          <li><b>边界三</b>：已失效资料未下架、也未标失效日期，检索把它当现行内容召回，属于数据治理问题而非算法问题。</li>
        </ul>
      </section>
      <section class="ka-card-sec ka-card-sec--action">
        <h2><span>02</span> 复验与行动</h2>
        <p>在知识中心给每条制度类资料补三个字段：生效时间、失效时间、适用角色；回归题写明时间点和读者角色。补齐后重跑「命中哪一版」那套题，若仍失败，才进入检索排序与向量模型的排查。</p>
      </section>
      <div class="ka-takeaway">
        <h5>小结 · 记住这句</h5>
        <p>回归失败时先问一句：<b>这题有唯一正确答案吗？</b>没有，就先去补元数据，别急着换模型。</p>
        <p>三个字段是底线：生效时间、失效时间、适用角色。少一个，验收就站不住。</p>
      </div>
    </div>
    <aside class="ka-card-aside">
      <div class="ka-aside-card">
        <h5>关联主题</h5>
        <a class="ka-rel-link" href="learn/d2/retrieval/check-current-policy/" data-no-popover="true">前三条命中了哪一版 · 先学</a>
        <a class="ka-rel-link" href="learn/d2/retrieval/" data-no-popover="true">D2-05 知识召回与 RAG</a>
        <a class="ka-rel-link" href="learn/d2/" data-no-popover="true">D2-06 元数据与标签 · 延伸</a>
      </div>
    </aside>
  </div>
  <p class="ka-card-meta">复核触发：元数据字段或题目口径变化 · 更新 2026-11-21</p>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d2/retrieval/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">知识召回与 RAG</div></a>
    <a class="next" href="learn/d3/skills/" data-no-popover="true"><div class="kn">下一主题 →</div><div class="kt">D3-06 Skills 与能力封装</div></a>
  </nav>
</div>
