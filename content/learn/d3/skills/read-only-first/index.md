---
title: 能力可加，权限不可逆 · 失败边界卡
publish: true
description: D3-06 Skills 与能力封装 · 判断卡：Skill 从只读升级到写入时，怎么防止一次演示变成一次不可逆的外部操作。
---

<div class="ai-learn ka-view ka-view--card">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 判断卡 02</div>
  <div class="ka-card-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · 试点主题</span>
      <span class="ka-tag plain">判断卡 02 / 03</span>
      <span class="ka-tag plain">更新 2026-11-21</span>
    </div>
    <h1>能力可加，权限不可逆</h1>
    <p class="ka-card-question">Skill 从「只读生成清单」升级到「修改或关闭待办」时，怎么防止一次演示变成不可逆的外部写入？</p>
  </div>
  <div class="ka-card-conclusion"><span class="clabel">结论</span><p>把操作分成<em>只读 / 草稿 / 外部影响</em>三档。只读可直接跑；草稿可自动产出但人工确认；产生外部影响的写入必须显式授权、逐次留痕。Skill 升级能力时，权限档位只能逐级放开。</p></div>
  <div class="ka-card-grid">
    <div class="ka-card-main">
      <div class="ka-figcard">
        <div class="fhead"><i class="sig"></i>核心图解 · 三档动作怎么分<span class="fhint">左右滑动看图</span></div>
        <svg viewBox="0 0 640 400" role="img" aria-label="按后果把 Skill 动作分成只读、草稿、外部影响三档，权限只能逐级放开">
          <rect class="ka-fblock" x="20" y="18" width="180" height="128" rx="11"/>
          <rect class="ka-fblock" x="230" y="18" width="180" height="128" rx="11"/>
          <rect class="ka-fblock" x="440" y="18" width="180" height="128" rx="11"/>
          <text class="ka-fnum" x="36" y="48" style="fill: var(--ka-rose)">01 问题</text>
          <text class="ka-ftitle" x="36" y="84">演示会变真操作</text>
          <text class="ka-ftext" x="36" y="112">Skill 一升到写入</text>
          <text class="ka-ftext" x="36" y="134">做错就落到系统里</text>
          <text class="ka-fnum" x="246" y="48" style="fill: var(--ka-amber)">02 做法</text>
          <text class="ka-ftitle" x="246" y="84">按后果分档</text>
          <text class="ka-ftext" x="246" y="112">不看功能多少</text>
          <text class="ka-ftext" x="246" y="134">看做错能不能回退</text>
          <text class="ka-fnum" x="456" y="48" style="fill: var(--ka-green)">03 关键</text>
          <text class="ka-ftitle" x="456" y="84">只能逐级放开</text>
          <text class="ka-ftext" x="456" y="112">先只读跑顺</text>
          <text class="ka-ftext" x="456" y="134">再谈写入授权</text>
          <rect class="ka-fblock" x="20" y="182" width="180" height="150" rx="11" style="stroke: color-mix(in srgb, var(--ka-green) 45%, transparent)"/>
          <text class="ka-fsmall" x="36" y="210" style="fill: var(--ka-green)">档 01</text>
          <text class="ka-ftitle" x="36" y="244" style="fill: var(--ka-green)">只读</text>
          <text class="ka-ftext" x="36" y="272">查待办、出清单</text>
          <rect x="36" y="286" width="86" height="28" rx="7" style="fill: color-mix(in srgb, var(--ka-green) 14%, transparent)"/>
          <text x="49" y="305" style="fill: var(--ka-green); font-size: 13px">可直接跑</text>
          <path d="M198 257h28" stroke="var(--ka-cyan)" stroke-width="2.2" fill="none" opacity="0.6" marker-end="url(#ur-arrow)"/>
          <rect class="ka-fblock" x="230" y="182" width="180" height="150" rx="11" style="stroke: color-mix(in srgb, var(--ka-amber) 45%, transparent)"/>
          <text class="ka-fsmall" x="246" y="210" style="fill: var(--ka-amber)">档 02</text>
          <text class="ka-ftitle" x="246" y="244" style="fill: var(--ka-amber)">草稿</text>
          <text class="ka-ftext" x="246" y="272">拟回执、改方案</text>
          <rect x="246" y="286" width="86" height="28" rx="7" style="fill: color-mix(in srgb, var(--ka-amber) 14%, transparent)"/>
          <text x="259" y="305" style="fill: var(--ka-amber); font-size: 13px">人工确认</text>
          <path d="M412 257h28" stroke="var(--ka-cyan)" stroke-width="2.2" fill="none" opacity="0.6" marker-end="url(#ur-arrow)"/>
          <rect class="ka-fblock" x="440" y="182" width="180" height="150" rx="11" style="stroke: color-mix(in srgb, var(--ka-rose) 45%, transparent)"/>
          <text class="ka-fsmall" x="456" y="210" style="fill: var(--ka-rose)">档 03</text>
          <text class="ka-ftitle" x="456" y="244" style="fill: var(--ka-rose)">外部影响</text>
          <text class="ka-ftext" x="456" y="272">关待办、发通知</text>
          <rect x="456" y="286" width="86" height="28" rx="7" style="fill: color-mix(in srgb, var(--ka-rose) 14%, transparent)"/>
          <text x="469" y="305" style="fill: var(--ka-rose); font-size: 13px">逐次授权</text>
          <text class="ka-fsay" x="320" y="372" text-anchor="middle">能力可以一级一级加，权限一旦放开就收不回来</text>
          <defs><marker id="ur-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="var(--ka-cyan)"/></marker></defs>
        </svg>
        <div class="ka-fcap">读法：从左往右是「做错了能不能撤回」的三个答案——能、要人点一下、不能。档位越靠右，授权要求越高。</div>
      </div>
      <div class="ka-prose">
        <p>Skill 一开始基本都只读：查一下待办、算个数、生成一份清单。这类动作做错了，最多是清单不准，重跑一次就好。但一旦它开始写，性质就变了——关掉一条待办、发出一封通知、提交一个审批，这些在系统里是真实发生过的，撤回往往要走另一套流程，有时候根本撤不回。</p>
        <p>所以判断一个 Skill 该给多大权限，不看它功能多不多，而看它<em>做错时能不能轻松回退</em>。这也解释了为什么必须按后果分档：同一个「整理待办」的 Skill，早上生成清单是只读，晚上批量关闭逾期项就是外部影响，两个动作得分开授权，不能因为「都是整理待办」就一起放开。</p>
      </div>
      <section class="ka-card-sec">
        <h2><span>01</span> 证据与复验</h2>
        <ul class="ka-evidence">
          <li><b>边界一</b>：Skill 直接批量关闭待办，一旦归类规则有误，误关无法自动回滚。</li>
          <li><b>边界二</b>：无人工确认环节，模型把「生成明日清单」理解为「已通知相关人」，造成越权动作。</li>
          <li><b>边界三</b>：连接器令牌权限过大，Skill 复用时继承了超出任务的读写范围。</li>
        </ul>
      </section>
      <section class="ka-card-sec ka-card-sec--action">
        <h2><span>02</span> 边界与行动</h2>
        <p>给 Skill 写清触发条件、步骤、验收与复用边界，并单列「动作档位」字段。首次上线只开放只读；写入能力先在模拟环境用可复跑任务验证，确认失败后能恢复，再申请授权。</p>
      </section>
      <div class="ka-takeaway">
        <h5>小结 · 记住这句</h5>
        <p>Skill 的权限不是一次给的，是<b>按动作后果一级一级放</b>：只读随便跑，草稿要人点一下，真动外部系统必须显式授权并留痕。</p>
        <p>自查一句：这个动作如果做错了，我能不能在五分钟内撤回来？不能，它就属于第三档。</p>
      </div>
    </div>
    <aside class="ka-card-aside">
      <div class="ka-aside-card">
        <h5>关联主题</h5>
        <a class="ka-rel-link" href="learn/d3/skills/skill-or-connector/" data-no-popover="true">做 Skill 还是做连接器 · 先学</a>
        <a class="ka-rel-link" href="learn/d3/skills/" data-no-popover="true">D3-06 Skills 与能力封装</a>
        <a class="ka-rel-link" href="learn/d5/" data-no-popover="true">D5-03 权限、人工审批与动作审计 · 强相关</a>
      </div>
      <div class="ka-aside-card">
        <h5>对我工作的意义</h5>
        <p class="ka-implication">这正是公众号「AI 支付守卫」那条红线在我自己系统里的翻版：对外写入必须先确认。</p>
      </div>
    </aside>
  </div>
  <p class="ka-card-meta">复核触发：Skill 动作档位变更 · 更新 2026-11-21</p>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/os-contract-check/" data-no-popover="true"><div class="kn">下一张 →</div><div class="kt">换台机器就跑不通</div></a>
  </nav>
</div>
