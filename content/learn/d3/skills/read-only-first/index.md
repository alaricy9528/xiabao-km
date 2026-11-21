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
      <span class="ka-tag plain">判断卡 02 / 02</span>
      <span class="ka-tag plain">更新 2026-11-21</span>
    </div>
    <h1>能力可加，权限不可逆</h1>
    <p class="ka-card-question">Skill 从「只读生成清单」升级到「修改或关闭待办」时，怎么防止一次演示变成不可逆的外部写入？</p>
  </div>
  <div class="ka-card-conclusion"><span class="clabel">结论</span><p>把操作分成<em>只读 / 草稿 / 外部影响</em>三档。只读可直接跑；草稿可自动产出但人工确认；产生外部影响的写入必须显式授权、逐次留痕。Skill 升级能力时，权限档位只能逐级放开。</p></div>
  <div class="ka-card-grid">
    <div class="ka-card-main">
      <section class="ka-card-sec">
        <h2><span>01</span> 失败边界</h2>
        <ul class="ka-evidence">
          <li><b>边界一</b>：Skill 直接批量关闭待办，一旦归类规则有误，误关无法自动回滚。</li>
          <li><b>边界二</b>：无人工确认环节，_agent_ 把「生成明日清单」理解为「已通知相关人」，造成越权动作。</li>
          <li><b>边界三</b>：连接器令牌权限过大，Skill 复用时继承了超出任务的读写范围。</li>
        </ul>
      </section>
      <section class="ka-card-sec">
        <h2><span>02</span> 复验与行动</h2>
        <p>给 Skill 写清触发条件、步骤、验收与复用边界，并单列「动作档位」字段。首次上线只开放只读；写入能力先在模拟环境用可复跑任务验证，确认失败后能恢复，再申请授权。</p>
      </section>
    </div>
    <aside class="ka-card-aside">
      <div class="ka-aside-card">
        <h5>卡片状态</h5>
        <div class="ka-meta-row"><span>复核状态</span><b class="st-pass">草稿 · 待复验</b></div>
        <div class="ka-meta-row"><span>复核触发</span><b>Skill 动作档位变更</b></div>
        <div class="ka-meta-row"><span>updated_at</span><b>2026-11-21</b></div>
      </div>
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
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d2/" data-no-popover="true"><div class="kn">回到知识域 →</div><div class="kt">D2 知识工程</div></a>
  </nav>
</div>
