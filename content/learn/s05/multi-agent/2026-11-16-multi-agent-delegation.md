---
title: 多智能体委派 · 拆开之后，收益去哪了
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 多智能体协作）：一张图看懂委派为什么不保证收益——复合可靠性、Lost in Delegation 的三种失败模式、MAMUBench 的统筹者优势与竞态数字，以及读型/写型这条判据。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/multi-agent/" data-no-popover="true">← 返回主题 · 多智能体协作</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-16</span><span>S-05 / 多智能体协作</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="多智能体委派信息图：复合可靠性乘法、委派不保证收益的两处反证、送达与被读到的竞态、读型与写型判据" xmlns="http://www.w3.org/2000/svg">
      <title>多智能体委派 · Delegation Is Not Free Parallelism</title>
      <defs>
        <marker id="ma-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
        <marker id="ma-arrow-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-amber)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 推理、智能体与记忆 / 多智能体协作</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">多智能体委派 <tspan fill="var(--ai-violet)" font-size="11" letter-spacing="1.3">DELEGATION</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">把一个任务拆给几个智能体，收益不会自动跟着拆出来。</text>
      <text x="24" y="106" fill="var(--ai-ice)" font-size="13" font-weight="600">① 拆分不是加法：可靠性按乘法衰减</text>
      <text x="24" y="132" fill="var(--ai-muted)" font-size="10">单步：一次动作做对</text>
      <rect x="176" y="120" width="300" height="16" rx="8" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <rect x="176" y="120" width="285" height="16" rx="8" fill="var(--ai-cyan)"></rect>
      <text x="484" y="132" fill="var(--ai-cyan)" font-size="11" font-weight="700">95%</text>
      <text x="24" y="166" fill="var(--ai-muted)" font-size="10">20 步串联：0.95²⁰</text>
      <rect x="176" y="154" width="300" height="16" rx="8" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <rect x="176" y="154" width="108" height="16" rx="8" fill="var(--ai-amber)"></rect>
      <text x="292" y="166" fill="var(--ai-amber)" font-size="11" font-weight="700">36%</text>
      <text x="24" y="194" fill="var(--ai-muted)" font-size="10">每一步都合格，系统仍可能不合格——协调本身也是一步要付失败率的动作。</text>
      <text x="24" y="212" fill="var(--ai-muted)" font-size="10">MAST 1,642 条轨迹：规格 41.77% · 协调 36.94% · 验证 21.30%。</text>
      <text x="24" y="230" fill="var(--ai-muted)" font-size="10">Google 180 种配置：独立多 agent 错误放大 <tspan fill="var(--ai-amber)">17.2×</tspan>，集中协调 <tspan fill="var(--ai-green)">4.4×</tspan>。</text>
      <line x1="24" y1="250" x2="536" y2="250" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="276" fill="var(--ai-ice)" font-size="13" font-weight="600">② 两处独立反证：委派不保证收益</text>
      <rect x="24" y="288" width="248" height="132" rx="12" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="40" y="310" fill="var(--ai-violet)" font-size="10.5" font-weight="600">Lost in Delegation</text>
      <text x="40" y="328" fill="var(--ai-muted)" font-size="9">arXiv 2611.16526 · 11-12</text>
      <text x="40" y="348" fill="var(--ai-muted)" font-size="9.5">委派相比不委派，没有稳定的</text>
      <text x="40" y="364" fill="var(--ai-muted)" font-size="9.5">精度增益，换模型换任务就翻向；</text>
      <text x="40" y="380" fill="var(--ai-muted)" font-size="9.5">碰上编排者自己不知道的知识，</text>
      <text x="40" y="396" fill="var(--ai-muted)" font-size="9.5">委派显著掉分，同一模型直接</text>
      <text x="40" y="412" fill="var(--ai-muted)" font-size="9.5">调工具反而更好。</text>
      <rect x="288" y="288" width="248" height="132" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="304" y="310" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">Worse Together</text>
      <text x="304" y="328" fill="var(--ai-muted)" font-size="9">Anthropic · 11-11 · MAMUBench</text>
      <text x="304" y="348" fill="var(--ai-muted)" font-size="9.5">每人各派一个 agent 去抢同一份</text>
      <text x="304" y="364" fill="var(--ai-muted)" font-size="9.5">共享资源，四个模拟环境全部输给</text>
      <text x="304" y="380" fill="var(--ai-muted)" font-size="9.5">一个替所有人安排的统筹者，</text>
      <text x="304" y="400" fill="var(--ai-cyan)" font-size="11" font-weight="700">差 10–45 个百分点</text>
      <text x="304" y="412" fill="var(--ai-muted)" font-size="8.5">（Opus 5：88 比 44 / 92 比 81）</text>
      <text x="24" y="440" fill="var(--ai-muted)" font-size="10">三条反复出现的失效：委派出去的查询被改写失真、工具用得低效、信息在交接处没被保留。</text>
      <text x="24" y="458" fill="var(--ai-muted)" font-size="10">队伍 4 人扩到 16 人，动手过的成员比例 66%→10%；还会擅自取消别人的任务 3.9–7.1 次/集。</text>
      <line x1="24" y1="478" x2="536" y2="478" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="504" fill="var(--ai-ice)" font-size="13" font-weight="600">③ 送达 ≠ 被读到：写型任务上的竞态</text>
      <rect x="24" y="516" width="150" height="66" rx="11" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="99" y="540" text-anchor="middle" fill="var(--ai-ice)" font-size="10" font-weight="600">要求发出</text>
      <text x="99" y="560" text-anchor="middle" fill="var(--ai-muted)" font-size="9">94%–99% 送达</text>
      <rect x="205" y="516" width="150" height="66" rx="11" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="280" y="540" text-anchor="middle" fill="var(--ai-amber)" font-size="10" font-weight="600">下单时读到</text>
      <text x="280" y="560" text-anchor="middle" fill="var(--ai-muted)" font-size="9">只有 47%–67%</text>
      <rect x="386" y="516" width="150" height="66" rx="11" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="461" y="540" text-anchor="middle" fill="var(--ai-violet)" font-size="10" font-weight="600">要求被满足</text>
      <text x="461" y="560" text-anchor="middle" fill="var(--ai-muted)" font-size="9">56–68% → 19–36%</text>
      <line x1="178" y1="549" x2="201" y2="549" stroke="var(--ai-line-strong)" stroke-width="1.3" marker-end="url(#ma-arrow)"></line>
      <line x1="359" y1="549" x2="382" y2="549" stroke="var(--ai-amber)" stroke-width="1.3" marker-end="url(#ma-arrow-a)"></line>
      <text x="24" y="600" fill="var(--ai-muted)" font-size="10">消息送出去了、也确实读了，读的却是旧版本——两个写者落在同一份可变状态上；</text>
      <text x="24" y="618" fill="var(--ai-muted)" font-size="10">后到的覆盖先到的，汇总侧看到「章节齐全」判成功，内容已经自相矛盾。</text>
      <line x1="24" y1="638" x2="536" y2="638" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="664" fill="var(--ai-ice)" font-size="13" font-weight="600">④ 判据：先问有没有共享的可变状态</text>
      <rect x="24" y="676" width="248" height="88" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="40" y="698" fill="var(--ai-green)" font-size="10.5" font-weight="600">可以拆 · 读型任务</text>
      <text x="40" y="718" fill="var(--ai-muted)" font-size="9.5">检索、调研、比对、汇总：子任务</text>
      <text x="40" y="735" fill="var(--ai-muted)" font-size="9.5">不共享可变状态，结果可合并，</text>
      <text x="40" y="752" fill="var(--ai-muted)" font-size="9.5">错了丢弃重算代价低。</text>
      <rect x="288" y="676" width="248" height="88" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="304" y="698" fill="var(--ai-amber)" font-size="10.5" font-weight="600">先别拆 · 写型任务</text>
      <text x="304" y="718" fill="var(--ai-muted)" font-size="9.5">改库、下单、编辑同一份文档：多个</text>
      <text x="304" y="735" fill="var(--ai-muted)" font-size="9.5">写者碰同一份状态，副作用不可逆，</text>
      <text x="304" y="752" fill="var(--ai-muted)" font-size="9.5">出事也归责不到唯一决策者。</text>
      <text x="24" y="788" fill="var(--ai-muted)" font-size="10">处方分场景：共享预算里设一个有拍板权的队长、按价值排序释放额度，能把团队拉回</text>
      <text x="24" y="806" fill="var(--ai-muted)" font-size="10">统筹者水平；下单前必须先读消息，比重跑一遍更能救回失败订单。</text>
      <text x="280" y="826" text-anchor="middle" fill="var(--ai-muted)" font-size="11">一句话：<tspan fill="var(--ai-violet)">并行买的是吞吐，代价记在交接、竞态与失败半径上。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：复合可靠性 0.95²⁰=36% 与 MAST 三类失效 · 中：委派不保证收益的两处反证、送达与被读到的漏斗 · 下：读型/写型判据与两条分场景处方。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>拆分不是免费的加法：20 步各 95% 可靠，串联只剩 36%。委派也换不来稳定收益——交给子智能体常不如同模型直接调工具，每人各派一个抢共享资源更是全输给一个统筹者 10 到 45 点。判据只有一条：有没有共享的可变状态。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/multi-agent/" data-no-popover="true">返回主题 · 多智能体协作 →</a>
  </nav>
</div>
