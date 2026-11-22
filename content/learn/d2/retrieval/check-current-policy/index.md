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
      <div class="ka-figcard">
        <div class="fhead"><i class="sig"></i>核心图解 · 顺着管道分三步查<span class="fhint">左右滑动看图</span></div>
        <svg viewBox="0 0 640 400" role="img" aria-label="检索验收分三步：来源是否进前三、答案对不对、引文指向哪一版">
          <rect class="ka-fblock" x="20" y="18" width="180" height="128" rx="11"/>
          <rect class="ka-fblock" x="230" y="18" width="180" height="128" rx="11"/>
          <rect class="ka-fblock" x="440" y="18" width="180" height="128" rx="11"/>
          <text class="ka-fnum" x="36" y="48" style="fill: var(--ka-rose)">01 问题</text>
          <text class="ka-ftitle" x="36" y="84">两版都像对的</text>
          <text class="ka-ftext" x="36" y="112">库里同时有</text>
          <text class="ka-ftext" x="36" y="134">现行版和作废版</text>
          <text class="ka-fnum" x="246" y="48" style="fill: var(--ka-amber)">02 做法</text>
          <text class="ka-ftitle" x="246" y="84">三步分开查</text>
          <text class="ka-ftext" x="246" y="112">来源、答案、引文</text>
          <text class="ka-ftext" x="246" y="134">不合成一个总分</text>
          <text class="ka-fnum" x="456" y="48" style="fill: var(--ka-green)">03 关键</text>
          <text class="ka-ftitle" x="456" y="84">题要带条件</text>
          <text class="ka-ftext" x="456" y="112">生效时间、有效来源</text>
          <text class="ka-ftext" x="456" y="134">都写进题目里</text>
          <rect class="ka-fblock" x="20" y="182" width="180" height="132" rx="11" style="stroke: color-mix(in srgb, var(--ka-cyan) 40%, transparent)"/>
          <text class="ka-fsmall" x="36" y="210" style="fill: var(--ka-cyan)">步 01</text>
          <text class="ka-ftitle" x="36" y="244">找来源</text>
          <text class="ka-ftext" x="36" y="272">正确那份进前三？</text>
          <text class="ka-ftext" x="36" y="294">进不去，模型就看不到</text>
          <path d="M198 247h28" stroke="var(--ka-cyan)" stroke-width="2.2" fill="none" opacity="0.6" marker-end="url(#cp-arrow)"/>
          <rect class="ka-fblock" x="230" y="182" width="180" height="132" rx="11" style="stroke: color-mix(in srgb, var(--ka-cyan) 40%, transparent)"/>
          <text class="ka-fsmall" x="246" y="210" style="fill: var(--ka-cyan)">步 02</text>
          <text class="ka-ftitle" x="246" y="244">看答案</text>
          <text class="ka-ftext" x="246" y="272">数字对不对？</text>
          <text class="ka-ftext" x="246" y="294">10 日还是 15 日</text>
          <path d="M412 247h28" stroke="var(--ka-cyan)" stroke-width="2.2" fill="none" opacity="0.6" marker-end="url(#cp-arrow)"/>
          <rect class="ka-fblock" x="440" y="182" width="180" height="132" rx="11" style="stroke: color-mix(in srgb, var(--ka-cyan) 40%, transparent)"/>
          <text class="ka-fsmall" x="456" y="210" style="fill: var(--ka-cyan)">步 03</text>
          <text class="ka-ftitle" x="456" y="244">验引文</text>
          <text class="ka-ftext" x="456" y="272">引的是哪一版？</text>
          <text class="ka-ftext" x="456" y="294">指向作废版就是错</text>
          <text class="ka-fsay" x="320" y="372" text-anchor="middle">三步都过才算合格，哪步挂了就在哪步修</text>
          <defs><marker id="cp-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="var(--ka-cyan)"/></marker></defs>
        </svg>
        <div class="ka-fcap">读法：检索是一条管道，验收就得顺着管道一段一段看。合成一个「准确率」分数，只会知道坏了，不知道坏在哪。</div>
      </div>
      <div class="ka-prose">
        <p>制度类资料最常见的坑，是同一个问题在库里有两个都像正确的答案：一份是现在的，一份是上个月刚作废的。检索按字面相似度找，它不知道哪份还有效，很可能把旧的那份排在前面。这时候你去看回答，会觉得「答得挺像」，其实引的是废文件。</p>
        <p>所以验收检索不能只问「答得对不对」，得拆成三步顺着查：先看正确那份资料有没有进前三——<em>进不了前三，模型根本没机会看到它</em>；再看回答里的关键数字对不对；最后看引文指的是不是那一版。合在一起查，只能得到一句「好像不太准」，没法改；分开查，卡在哪一步一眼就看出来。</p>
      </div>
      <section class="ka-card-sec">
        <h2><span>01</span> 证据与复验</h2>
        <ul class="ka-evidence">
          <li><b>模拟资料 A</b>：现行制度，报销提交期限 10 日，生效 2026-01-01。</li>
          <li><b>模拟资料 B</b>：已失效制度，期限 15 日，失效于 2025-12-31。</li>
          <li><b>回归题</b>：「按现行制度，报销提交期限是多少」——逐项检查 A 是否进入检索前三、是否送入上下文、回答是否为 10 日、引文是否指向 A。</li>
        </ul>
        <p class="ka-card-note">这是可复跑的测试方法，结果为待实际运行；换一次索引或检索参数，重跑同一套题即可对比。</p>
      </section>
      <section class="ka-card-sec ka-card-sec--action">
        <h2><span>02</span> 边界与行动</h2>
        <p>题目若不写清生效时间或读者权限，正确版本无法判定，这套回归就失效。落地时先补齐资料的生效时间与来源标注；在知识中心为每次检索变更保留同一套回归题、候选结果与引文记录。</p>
      </section>
      <div class="ka-takeaway">
        <h5>小结 · 记住这句</h5>
        <p>验证检索要<b>顺着管道一段一段查</b>：来源进没进前三 → 答案对不对 → 引文指向谁。哪一段断了，就在那一段修。</p>
        <p>前提是每份资料都标了生效时间，否则「正确版本」根本无从判定。</p>
      </div>
    </div>
    <aside class="ka-card-aside">
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
  <p class="ka-card-meta">复核触发：索引或检索参数变更 · 更新 2026-11-21</p>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d2/retrieval/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">知识召回与 RAG</div></a>
    <a class="next" href="learn/d2/retrieval/when-version-ambiguous/" data-no-popover="true"><div class="kn">下一张 →</div><div class="kt">版本条件不清时先补元数据</div></a>
  </nav>
</div>
