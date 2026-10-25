---
title: 上下文工程 · 窗口是个要分配的预算
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 上下文工程）：一张图看懂上下文工程——窗口是一格配额，四类内容在抢同一片空间，靠挑、压、找回三个动作来经营。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/context-engineering/" data-no-popover="true">← 返回主题 · 上下文工程</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-10-26</span><span>S-05 / 上下文工程</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="上下文工程信息图：append-only 与经营后的窗口配额对比、三条退化规律、挑压找回三个动作与两条边界" xmlns="http://www.w3.org/2000/svg">
    <title>上下文工程 · Context Engineering</title>
    <defs><marker id="ce-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
    <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 AGENT / 上下文工程</text>
    <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">上下文工程 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">CONTEXT ENGINEERING</tspan></text>
    <text x="24" y="76" fill="var(--ai-muted)" font-size="12">模型开口之前的那一步：这一格窗口里放什么、删什么。</text>
    <line x1="24" y1="96" x2="536" y2="96" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="120" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 窗口是一笔预算：四类内容在抢同一格空间</text>
    <text x="44" y="156" fill="var(--ai-muted)" font-size="10.5">只 append · 历史一路累积</text>
    <rect x="44" y="164" width="44" height="36" rx="4" fill="var(--ai-soft)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="66" y="186" text-anchor="middle" fill="var(--ai-text)" font-size="9">任务</text>
    <rect x="88" y="164" width="344" height="36" rx="4" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="260" y="186" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">累积的工具输出与旧历史</text>
    <rect x="432" y="164" width="96" height="36" rx="4" fill="var(--ai-soft)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="480" y="186" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">本次检索</text>
    <text x="44" y="222" fill="var(--ai-muted)" font-size="10.5">经营后 · 每一格都有归属</text>
    <rect x="44" y="230" width="60" height="36" rx="4" fill="var(--ai-soft)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="74" y="252" text-anchor="middle" fill="var(--ai-text)" font-size="9">目标</text>
    <rect x="104" y="230" width="116" height="36" rx="4" fill="var(--ai-soft)" stroke="var(--ai-violet)" stroke-width="1.2"></rect>
    <text x="162" y="252" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">长期压缩记忆</text>
    <rect x="220" y="230" width="176" height="36" rx="4" fill="var(--ai-soft)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="308" y="252" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">近期交互保持原样</text>
    <rect x="396" y="230" width="132" height="36" rx="4" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="462" y="252" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">旧记录折叠成卡</text>
    <text x="24" y="286" fill="var(--ai-muted)" font-size="10.5">同一格窗口像打包上路：只带下一段路要用的，其余留在能重新取回的地方。</text>
    <line x1="24" y1="302" x2="536" y2="302" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="326" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 窗口变大不等于变好：三条反复被验证的退化</text>
    <rect x="24" y="340" width="168" height="118" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="44" y="366" fill="var(--ai-ice)" font-size="11" font-weight="600">放得越多越薄</text>
    <text x="44" y="392" fill="var(--ai-text)" font-size="9.5">n 个 token 意味着</text>
    <text x="44" y="410" fill="var(--ai-cyan)" font-size="10.5">n² 组两两关系</text>
    <text x="44" y="432" fill="var(--ai-muted)" font-size="9.5">放得越长，注意力</text>
    <text x="44" y="448" fill="var(--ai-muted)" font-size="9.5">摊得越薄</text>
    <rect x="200" y="340" width="168" height="118" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="220" y="366" fill="var(--ai-ice)" font-size="11" font-weight="600">中间的最容易丢</text>
    <text x="220" y="392" fill="var(--ai-text)" font-size="9.5">材料摆在中段时</text>
    <text x="220" y="410" fill="var(--ai-text)" font-size="9.5">模型最容易看不见</text>
    <text x="220" y="432" fill="var(--ai-muted)" font-size="9">lost-in-the-middle</text>
    <text x="220" y="448" fill="var(--ai-muted)" font-size="9">沾边却不回答的段落最拖后腿</text>
    <rect x="376" y="340" width="168" height="118" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="396" y="366" fill="var(--ai-ice)" font-size="11" font-weight="600">越堆越跑偏</text>
    <text x="396" y="392" fill="var(--ai-text)" font-size="9.5">工具噪声不断累积</text>
    <text x="396" y="410" fill="var(--ai-text)" font-size="9.5">语义逐步漂移</text>
    <text x="396" y="432" fill="var(--ai-muted)" font-size="9.5">推理质量随之下降</text>
    <text x="396" y="448" fill="var(--ai-muted)" font-size="9.5">叫 context rot</text>
    <text x="24" y="478" fill="var(--ai-muted)" font-size="10.5">窗口从 8K 扩到 1M，解决的是「装不下」，没有自动解决「装得太杂」。</text>
    <line x1="24" y1="494" x2="536" y2="494" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="518" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 三个动作：挑出来、压下去、找回来</text>
    <rect x="24" y="532" width="168" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="44" y="558" fill="var(--ai-ice)" font-size="11" font-weight="600">① 挑 · 先筛再给</text>
    <text x="44" y="582" fill="var(--ai-text)" font-size="9.5">检索结果进窗口之前</text>
    <text x="44" y="600" fill="var(--ai-text)" font-size="9.5">先按下一步会不</text>
    <text x="44" y="618" fill="var(--ai-muted)" font-size="9.5">会用吗？筛一遍再放</text>
    <line x1="196" y1="580" x2="226" y2="580" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#ce-arrow)"></line>
    <rect x="200" y="532" width="168" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-violet)" stroke-width="1.2"></rect>
    <text x="220" y="558" fill="var(--ai-ice)" font-size="11" font-weight="600">② 压 · 定期整理</text>
    <text x="220" y="582" fill="var(--ai-text)" font-size="9.5">摘要、折成一行、</text>
    <text x="220" y="600" fill="var(--ai-text)" font-size="9.5">换成短卡片</text>
    <text x="220" y="618" fill="var(--ai-muted)" font-size="9.5">在固定节点判定留什么</text>
    <line x1="372" y1="580" x2="402" y2="580" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#ce-arrow)"></line>
    <rect x="376" y="532" width="168" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="396" y="558" fill="var(--ai-ice)" font-size="11" font-weight="600">③ 找回 · 保持可逆</text>
    <text x="396" y="582" fill="var(--ai-text)" font-size="9.5">压缩前把原文留底，</text>
    <text x="396" y="600" fill="var(--ai-text)" font-size="9.5">需要时能重新取出</text>
    <text x="396" y="618" fill="var(--ai-muted)" font-size="9.5">顺带保住 prompt 缓存</text>
    <text x="24" y="648" fill="var(--ai-muted)" font-size="10.5">判断准则只有一句：这条信息在下一步还用得上吗？用不上就别占配额。</text>
    <line x1="24" y1="664" x2="536" y2="664" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="688" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 边界：这里没有通用配方</text>
    <rect x="24" y="702" width="250" height="62" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="44" y="724" fill="var(--ai-amber)" font-size="11" font-weight="600">同一招对不同 agent 效果相反</text>
    <text x="44" y="746" fill="var(--ai-text)" font-size="9.5">爱啰嗦的要压，容易早停的要留——先看行为</text>
    <rect x="286" y="702" width="250" height="62" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="306" y="724" fill="var(--ai-ice)" font-size="11" font-weight="600">编排收益缺标准度量</text>
    <text x="306" y="746" fill="var(--ai-text)" font-size="9.5">尚无基准能把编排质量与基座能力分开来算</text>
    <text x="24" y="786" fill="var(--ai-muted)" font-size="10.5">所以「上下文工程优于提示词」目前仍是一个待检验的工作假设，不是定论。</text>
    <line x1="24" y1="800" x2="536" y2="800" stroke="var(--ai-line)" stroke-width="1"></line>
    <text x="280" y="822" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">把功夫从「这一句怎么说」，移到「模型每一步看到什么」。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：append-only 与经营后的窗口配额对比 · 中：三条退化规律与挑、压、找回三个动作 · 下：两条边界与一句话总结。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>提示词管的是「这一句怎么措辞」，上下文工程管的是模型每次开口前能看到的那格窗口：任务目标、近期交互、长期记忆、工具输出与检索材料，全在里面抢同一片配额。窗口是配额而不是容器——放得越多，注意力越薄，中段的材料越容易被漏掉。经营它只有三个动作：挑出来、压下去，并把原文留底以便找回。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/context-engineering/" data-no-popover="true">返回主题 · 上下文工程 →</a>
  </nav>
</div>
