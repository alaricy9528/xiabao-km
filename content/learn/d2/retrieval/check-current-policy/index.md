---
title: 前三条命中了哪一版 · 检索回归的判断卡
publish: true
description: D2-05 知识召回与 RAG · 判断卡：知识中心同时收录现行与失效规则时，怎么用一套回归题验证检索把正确版本排进前三。
---

<div class="ai-learn ka-view ka-view--card">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D2 知识工程</span> / <span>知识召回与 RAG</span> / 判断卡 01</div>
  <div class="ka-card-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-violet)">D2-05 · 试点主题</span>
      <span class="ka-tag plain">判断卡 01 / 02</span>
      <span class="ka-tag plain">更新 2026-11-21</span>
    </div>
    <h1>前三条命中了哪一版？</h1>
    <p class="ka-card-question">知识中心同时收录了现行规则和旧规则，怎么检查检索阶段把正确版本排进了前三？</p>
  </div>
  <div class="ka-card-conclusion"><span class="clabel">结论</span><p>给每道回归题标注<em>生效时间与有效来源</em>，先验证有效来源是否进入 Top 3，再单独验证答案和引文。三步分开查，失败点才定位得出来。</p></div>
  <div class="ka-card-grid">
    <div class="ka-card-main">
      <section class="ka-card-sec">
        <h2><span>01</span> 证据与复验</h2>
        <ul class="ka-evidence">
          <li><b>模拟资料 A</b>：现行制度，报销提交期限 10 日，生效 2026-01-01。</li>
          <li><b>模拟资料 B</b>：已失效制度，期限 15 日，失效于 2025-12-31。</li>
          <li><b>回归题</b>：「按现行制度，报销提交期限是多少」——逐项检查 A 是否进入检索前三、是否送入上下文、回答是否为 10 日、引文是否指向 A。</li>
        </ul>
        <p class="ka-card-note">这是可复跑的测试方法，结果为待实际运行；换一次索引或检索参数，重跑同一套题即可对比。</p>
      </section>
      <section class="ka-card-sec">
        <h2><span>02</span> 边界与行动</h2>
        <p>题目若不写清生效时间或读者权限，正确版本无法判定，这套回归就失效。落地时先补齐资料的生效时间与来源标注；在知识中心为每次检索变更保留同一套回归题、候选结果与引文记录。</p>
      </section>
    </div>
    <aside class="ka-card-aside">
      <div class="ka-aside-card">
        <h5>卡片状态</h5>
        <div class="ka-meta-row"><span>发布状态</span><b class="st-live">已上线</b></div>
        <div class="ka-meta-row"><span>复核触发</span><b>索引或检索参数变更</b></div>
        <div class="ka-meta-row"><span>updated_at</span><b>2026-11-21</b></div>
      </div>
      <div class="ka-aside-card">
        <h5>关联主题</h5>
        <a class="ka-rel-link" href="learn/d2/retrieval/" data-no-popover="true">D2-05 知识召回与 RAG</a>
        <a class="ka-rel-link" href="learn/d4/" data-no-popover="true">D4-04 RAG 应用交付 · 延伸</a>
        <a class="ka-rel-link" href="learn/d5/" data-no-popover="true">D5-05 事实可信与引文 · 风险</a>
      </div>
      <div class="ka-aside-card">
        <h5>对我工作的意义</h5>
        <p class="ka-implication">知识中心升级时，把「版本召回正确率」做成可回归的验收项，而不是上线后靠人工发现问题。</p>
      </div>
    </aside>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d2/retrieval/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">知识召回与 RAG</div></a>
    <a class="next" href="learn/d2/retrieval/when-version-ambiguous/" data-no-popover="true"><div class="kn">下一张 →</div><div class="kt">版本条件不清时先补元数据</div></a>
  </nav>
</div>
