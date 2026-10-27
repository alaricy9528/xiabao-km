---
title: 世界模型 · 学的是动作之后会怎样
publish: true
description: 每日知识点（S-02 深度学习 / 世界模型）：一张图看懂世界模型与视频生成的分界——它预测的是状态在动作下如何演化，而不是画面像不像。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s02/world-model/" data-no-popover="true">← 返回主题 · 世界模型</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-10-28</span><span>S-02 / 世界模型</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="世界模型信息图：与视频生成模型的对比、状态与动作交替的 rollout、像素级与潜空间预测的分野、三条硬约束" xmlns="http://www.w3.org/2000/svg">
    <title>世界模型 · World Model</title>
    <defs><marker id="wm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
    <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-02 深度学习 / 世界模型</text>
    <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">世界模型 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">WORLD MODEL</tspan></text>
    <text x="24" y="76" fill="var(--ai-muted)" font-size="12">它不问「这一帧像不像」，它问「我做了这个动作之后，接下来会怎样」。</text>
    <text x="24" y="98" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 同样生成画面，问的问题完全不同</text>
    <rect x="24" y="110" width="250" height="118" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="44" y="132" fill="var(--ai-amber)" font-size="12" font-weight="600">视频生成模型</text>
    <text x="44" y="150" fill="var(--ai-muted)" font-size="9" font-family="monospace">VIDEO GENERATION</text>
    <text x="44" y="172" fill="var(--ai-text)" font-size="9.5">输入：一段提示词</text>
    <text x="44" y="190" fill="var(--ai-text)" font-size="9.5">目标：每一帧看起来都对</text>
    <text x="44" y="208" fill="var(--ai-text)" font-size="9.5">不接收动作，无法反事实</text>
    <text x="44" y="226" fill="var(--ai-amber)" font-size="9.5">一次生成即结束</text>
    <rect x="286" y="110" width="250" height="118" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="306" y="132" fill="var(--ai-green)" font-size="12" font-weight="600">世界模型</text>
    <text x="306" y="150" fill="var(--ai-muted)" font-size="9" font-family="monospace">WORLD MODEL</text>
    <text x="306" y="172" fill="var(--ai-text)" font-size="9.5">输入：当前状态 + 动作</text>
    <text x="306" y="190" fill="var(--ai-text)" font-size="9.5">目标：下一个状态推得对</text>
    <text x="306" y="208" fill="var(--ai-text)" font-size="9.5">每一步都要接新动作</text>
    <text x="306" y="226" fill="var(--ai-green)" font-size="9.5">可交互、可回放、可反事实</text>
    <text x="24" y="246" fill="var(--ai-muted)" font-size="10.5">一个优化的是观感，一个优化的是因果——所以「很像」与「能用来推演」是两件事。</text>
    <line x1="24" y1="258" x2="536" y2="258" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="280" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 一次 rollout：状态与动作交替往前推</text>
    <rect x="24" y="292" width="150" height="84" rx="11" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <text x="99" y="314" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">状态 s</text>
    <text x="99" y="330" text-anchor="middle" fill="var(--ai-muted)" font-size="9" font-family="monospace">STATE</text>
    <text x="44" y="352" fill="var(--ai-text)" font-size="9.5">观察被压成一个</text>
    <text x="44" y="368" fill="var(--ai-text)" font-size="9.5">抽象的潜状态</text>
    <line x1="180" y1="334" x2="200" y2="334" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#wm-arrow)"></line>
    <text x="190" y="326" text-anchor="middle" fill="var(--ai-cyan)" font-size="10" font-weight="600">a</text>
    <rect x="205" y="292" width="150" height="84" rx="11" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.3"></rect>
    <text x="280" y="314" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">预测 s′</text>
    <text x="280" y="330" text-anchor="middle" fill="var(--ai-muted)" font-size="9" font-family="monospace">PREDICTION</text>
    <text x="225" y="352" fill="var(--ai-text)" font-size="9.5">f(s, a) 的输出仍是</text>
    <text x="225" y="368" fill="var(--ai-text)" font-size="9.5">同一个空间里的状态</text>
    <line x1="361" y1="334" x2="381" y2="334" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#wm-arrow)"></line>
    <text x="371" y="326" text-anchor="middle" fill="var(--ai-cyan)" font-size="10" font-weight="600">a′</text>
    <rect x="386" y="292" width="150" height="84" rx="11" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <text x="461" y="314" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">再预测 s″</text>
    <text x="461" y="330" text-anchor="middle" fill="var(--ai-muted)" font-size="9" font-family="monospace">ROLLOUT</text>
    <text x="406" y="352" fill="var(--ai-text)" font-size="9.5">上一步的输出</text>
    <text x="406" y="368" fill="var(--ai-text)" font-size="9.5">成了下一步的输入</text>
    <text x="24" y="394" fill="var(--ai-muted)" font-size="10.5">关键就在箭头回到框里：模型开始吃自己的输出，一步的偏差会被下一步放大。</text>
    <line x1="24" y1="406" x2="536" y2="406" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="428" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 为什么在潜空间预测，而不是逐像素</text>
    <rect x="24" y="440" width="250" height="130" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="44" y="462" fill="var(--ai-amber)" font-size="12" font-weight="600">像素级预测</text>
    <text x="44" y="480" fill="var(--ai-muted)" font-size="9" font-family="monospace">PIXEL SPACE</text>
    <text x="44" y="502" fill="var(--ai-text)" font-size="9.5">连草叶怎么晃都要算对</text>
    <text x="44" y="522" fill="var(--ai-text)" font-size="9.5">算力耗在不可预测的细节</text>
    <text x="44" y="542" fill="var(--ai-text)" font-size="9.5">预测模糊、易塌缩</text>
    <text x="44" y="562" fill="var(--ai-muted)" font-size="9.5">容量被「像」吃掉了</text>
    <rect x="286" y="440" width="250" height="130" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="306" y="462" fill="var(--ai-green)" font-size="12" font-weight="600">潜空间预测</text>
    <text x="306" y="480" fill="var(--ai-muted)" font-size="9" font-family="monospace">LATENT SPACE</text>
    <text x="306" y="502" fill="var(--ai-text)" font-size="9.5">只预测抽象状态怎么变</text>
    <text x="306" y="522" fill="var(--ai-text)" font-size="9.5">无关细节由表示本身丢掉</text>
    <text x="306" y="542" fill="var(--ai-text)" font-size="9.5">省下的容量给长程动力学</text>
    <text x="306" y="562" fill="var(--ai-muted)" font-size="9.5">JEPA 一类路线的出发点</text>
    <text x="24" y="588" fill="var(--ai-muted)" font-size="10.5">预测目标越抽象，越不要求模型猜中世界每一个不可预测的像素。</text>
    <line x1="24" y1="600" x2="536" y2="600" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="618" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 三条硬约束：现在卡在哪</text>
    <rect x="24" y="630" width="512" height="46" rx="10" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <circle cx="46" cy="653" r="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.3"></circle>
    <text x="46" y="657" text-anchor="middle" fill="var(--ai-amber)" font-size="11" font-weight="700">1</text>
    <text x="70" y="649" fill="var(--ai-ice)" font-size="11" font-weight="600">复合误差 <tspan fill="var(--ai-muted)" font-size="9">COMPOUNDING</tspan></text>
    <text x="70" y="667" fill="var(--ai-text)" font-size="9.5">自回归每步偏差被喂回输入：连续时长从约 1 分钟推到约 2 分钟，仍会漂走</text>
    <rect x="24" y="684" width="512" height="46" rx="10" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <circle cx="46" cy="707" r="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.3"></circle>
    <text x="46" y="711" text-anchor="middle" fill="var(--ai-amber)" font-size="11" font-weight="700">2</text>
    <text x="70" y="703" fill="var(--ai-ice)" font-size="11" font-weight="600">物体恒存 <tspan fill="var(--ai-muted)" font-size="9">OBJECT PERMANENCE</tspan></text>
    <text x="70" y="721" fill="var(--ai-text)" font-size="9.5">跑久了细节与物体会变，多次改写提示或大幅移动视角后更明显</text>
    <rect x="24" y="738" width="512" height="46" rx="10" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <circle cx="46" cy="761" r="12" fill="var(--ai-panel)" stroke="var(--ai-violet)" stroke-width="1.3"></circle>
    <text x="46" y="765" text-anchor="middle" fill="var(--ai-violet)" font-size="11" font-weight="700">3</text>
    <text x="70" y="757" fill="var(--ai-ice)" font-size="11" font-weight="600">反事实可控 <tspan fill="var(--ai-muted)" font-size="9">COUNTERFACTUAL</tspan></text>
    <text x="70" y="775" fill="var(--ai-text)" font-size="9.5">要能答「如果不这么做会怎样」：像素似然高并不保证动作真的可控</text>
    <line x1="24" y1="800" x2="536" y2="800" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="280" y="822" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">世界模型拼的不是画面，是「动作 → 后果」这张表。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：世界模型与视频生成模型的分野 · 中：状态-动作交替的 rollout 与像素/潜空间两条预测路线 · 下：复合误差、物体恒存与反事实可控三条硬约束。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>世界模型学的不是画面像不像，而是「在这个状态下做这个动作，接下来会怎样」：把观察压成潜状态，再预测它的下一步。只预测抽象变化、不逐像素重建，省下容量也扛住细节噪声；代价是自回归 rollout 的误差会累积，跑久了物体与细节会漂。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s02/world-model/" data-no-popover="true">返回主题 · 世界模型 →</a>
  </nav>
</div>
