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
      <div class="ka-figcard">
        <div class="fhead"><i class="sig"></i>核心图解 · 先问数据进不进得来</div>
        <svg class="fig-w" viewBox="0 0 640 380" role="img" aria-label="决策流程：现有接口能用就直接写 Skill，读不到数据就先做连接器">
          <rect class="ka-fblock" x="20" y="18" width="180" height="128" rx="11"/>
          <rect class="ka-fblock" x="230" y="18" width="180" height="128" rx="11"/>
          <rect class="ka-fblock" x="440" y="18" width="180" height="128" rx="11"/>
          <text class="ka-fnum" x="36" y="48" style="fill: var(--ka-cyan)">01 分清</text>
          <text class="ka-ftitle" x="36" y="84">两层不同事</text>
          <text class="ka-ftext" x="36" y="112">连接器管怎么进来</text>
          <text class="ka-ftext" x="36" y="134">Skill 管怎么加工</text>
          <text class="ka-fnum" x="246" y="48" style="fill: var(--ka-amber)">02 判断</text>
          <text class="ka-ftitle" x="246" y="84">接口够不够</text>
          <text class="ka-ftext" x="246" y="112">能不能直接读到</text>
          <text class="ka-ftext" x="246" y="134">要的数据</text>
          <text class="ka-fnum" x="456" y="48" style="fill: var(--ka-green)">03 顺序</text>
          <text class="ka-ftitle" x="456" y="84">够就先 Skill</text>
          <text class="ka-ftext" x="456" y="112">不够先接数据源</text>
          <text class="ka-ftext" x="456" y="134">接完再包一层</text>
          <rect class="ka-fblock" x="20" y="182" width="140" height="76" rx="10"/>
          <text class="ka-ftitle" x="36" y="214" style="font-size: 15px">一件重复任务</text>
          <text class="ka-ftext" x="36" y="240" style="font-size: 13px">归类、生成、交付</text>
          <path d="M162 220h30" stroke="var(--ka-cyan)" stroke-width="2.2" fill="none" opacity="0.6" marker-end="url(#sc-arrow)"/>
          <rect class="ka-fblock" x="196" y="182" width="150" height="76" rx="10" style="stroke: color-mix(in srgb, var(--ka-amber) 45%, transparent)"/>
          <text class="ka-ftitle" x="212" y="214" style="font-size: 15px">接口够用吗</text>
          <text class="ka-ftext" x="212" y="240" style="font-size: 13px">现有接口能读到？</text>
          <path d="M348 212l34-10" stroke="var(--ka-cyan)" stroke-width="2.2" fill="none" opacity="0.6" marker-end="url(#sc-arrow)"/>
          <path d="M348 228l34 10" stroke="var(--ka-cyan)" stroke-width="2.2" fill="none" opacity="0.6" marker-end="url(#sc-arrow)"/>
          <rect class="ka-fblock" x="384" y="164" width="236" height="66" rx="10" style="stroke: color-mix(in srgb, var(--ka-green) 45%, transparent)"/>
          <text class="ka-ftitle" x="400" y="192" style="fill: var(--ka-green); font-size: 15px">够 → 直接写 Skill</text>
          <text class="ka-ftext" x="400" y="216" style="font-size: 13px">规则、例外、交付格式</text>
          <rect class="ka-fblock" x="384" y="242" width="236" height="66" rx="10" style="stroke: color-mix(in srgb, var(--ka-amber) 45%, transparent)"/>
          <text class="ka-ftitle" x="400" y="270" style="fill: var(--ka-amber); font-size: 15px">不够 → 先做连接器</text>
          <text class="ka-ftext" x="400" y="294" style="font-size: 13px">接完再在外面包 Skill</text>
          <text class="ka-fsay" x="320" y="352" text-anchor="middle">先解决数据进不进得来，再谈按什么规则加工</text>
          <defs><marker id="sc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="var(--ka-cyan)"/></marker></defs>
        </svg>
        <svg class="fig-n" viewBox="0 0 360 496" role="img" aria-label="决策流程：现有接口能用就直接写 Skill，读不到数据就先做连接器">
          <rect class="ka-fblock" x="14" y="14" width="332" height="118" rx="11"/>
          <text class="ka-fnum" x="32" y="42" style="fill: var(--ka-cyan)">01 分清</text>
          <text class="ka-ftitle" x="32" y="78">两层不同事</text>
          <text class="ka-ftext" x="32" y="104">连接器管数据进来，Skill 管怎么加工</text>
          <text class="ka-fnum" x="32" y="168" style="fill: var(--ka-amber)">02 判断</text>
          <rect class="ka-fblock" x="32" y="182" width="296" height="58" rx="10"/>
          <text class="ka-ftitle" x="48" y="206" style="font-size: 16px">一件重复任务</text>
          <text class="ka-ftext" x="48" y="228" style="font-size: 13.5px">归类、生成、交付</text>
          <path d="M180 240v11" stroke="var(--ka-cyan)" stroke-width="2.4" fill="none" opacity="0.6"/>
          <path d="M175 251l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
          <rect class="ka-fblock" x="32" y="259" width="296" height="58" rx="10" style="stroke: color-mix(in srgb, var(--ka-amber) 45%, transparent)"/>
          <text class="ka-ftitle" x="48" y="283" style="font-size: 16px">接口够用吗</text>
          <text class="ka-ftext" x="48" y="305" style="font-size: 13.5px">现有接口能直接读到数据吗</text>
          <path d="M180 317v9M103 326h154" stroke="var(--ka-cyan)" stroke-width="2.4" fill="none" opacity="0.6"/>
          <path d="M103 326v6M257 326v6" stroke="var(--ka-cyan)" stroke-width="2.4" fill="none" opacity="0.6"/>
          <path d="M98 332l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
          <path d="M252 332l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
          <rect class="ka-fblock" x="32" y="340" width="142" height="86" rx="10" style="stroke: color-mix(in srgb, var(--ka-green) 45%, transparent)"/>
          <text class="ka-fsmall" x="48" y="362" style="fill: var(--ka-green)">够</text>
          <text class="ka-ftitle" x="48" y="388" style="fill: var(--ka-green); font-size: 16px">写 Skill</text>
          <text class="ka-ftext" x="48" y="410" style="font-size: 13px">规则、例外、格式</text>
          <rect class="ka-fblock" x="186" y="340" width="142" height="86" rx="10" style="stroke: color-mix(in srgb, var(--ka-amber) 45%, transparent)"/>
          <text class="ka-fsmall" x="202" y="362" style="fill: var(--ka-amber)">不够</text>
          <text class="ka-ftitle" x="202" y="388" style="fill: var(--ka-amber); font-size: 16px">做连接器</text>
          <text class="ka-ftext" x="202" y="410" style="font-size: 13px">接完再包一层</text>
          <text class="ka-fsay" x="180" y="456" text-anchor="middle">先解决数据进不进得来</text>
          <text class="ka-fsay" x="180" y="478" text-anchor="middle">再谈按什么规则加工</text>
        </svg>
        <div class="ka-fcap">读法：这两层不是二选一，是有先后。数据进不来，Skill 写得再漂亮也跑不动；数据能进来，Skill 立刻就能见效。</div>
      </div>
      <div class="ka-prose">
        <p>想做「把待办按紧急程度归类、生成明日清单」，第一件纠结的事往往是「这算 Skill 还是连接器」。这两个东西管的事其实不一样：连接器解决「怎么把外部系统的数据拿进来」，Skill 解决「拿到数据之后按什么规则加工、交付成什么样」。</p>
        <p>所以判断顺序是：先看现有接口够不够用。待办已经有只读接口了，数据这一层不缺，缺的是<em>归类规则、缺失截止时间怎么处理、清单长什么样</em>——这些都是 Skill 该写的。反过来，如果要去读一个还没有接口的系统，那才先做连接器（可能需要经 MCP 接），接完再在外面包一层 Skill。</p>
      </div>
      <section class="ka-card-sec">
        <h2><span>01</span> 证据与复验</h2>
        <ul class="ka-evidence">
          <li><b>输入</b>：仅含「紧急 / 普通 / 缺失截止时间」三类的模拟待办。</li>
          <li><b>检查</b>：清单按预设规则分组、缺失项单列、对业务系统的操作为只读。</li>
          <li><b>规范依据</b>：Agent Skills 规范界定 Skill 的指令与资源组织方式；MCP 架构概览界定其接入角色与能力交换。</li>
        </ul>
        <p class="ka-card-note">选型结论是本案例的工程判断；规范只界定各自职责，不替你决定先做哪一层。</p>
      </section>
      <section class="ka-card-sec ka-card-sec--action">
        <h2><span>02</span> 边界与行动</h2>
        <p>若任务还要修改或关闭待办，先定义写入授权、人工确认与操作记录，再动手。首发演示一律走只读路径——能力可加，权限不可逆。</p>
      </section>
      <div class="ka-takeaway">
        <h5>小结 · 记住这句</h5>
        <p>先问<b>数据能不能进来</b>：能，就写 Skill；不能，先做连接器。两件事别混在一次里做。</p>
        <p>接口可复用的情况下，Skill 见效更快、风险也更小——它只需要读。</p>
      </div>
    </div>
    <aside class="ka-card-aside">
      <div class="ka-aside-card">
        <h5>关联主题</h5>
        <a class="ka-rel-link" href="learn/d3/skills/" data-no-popover="true">D3-06 Skills 与能力封装</a>
        <a class="ka-rel-link" href="learn/d3/skills/read-only-first/" data-no-popover="true">只读先行 · 风险</a>
        <a class="ka-rel-link" href="learn/d5/" data-no-popover="true">D5-03 权限与动作审计 · 风险</a>
      </div>
    </aside>
  </div>
  <p class="ka-card-meta">复核触发：Skill/MCP 规范更新或接口变更 · 更新 2026-11-21</p>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/read-only-first/" data-no-popover="true"><div class="kn">下一张 →</div><div class="kt">能力可加，权限不可逆</div></a>
  </nav>
</div>
