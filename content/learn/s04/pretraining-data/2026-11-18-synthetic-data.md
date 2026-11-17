---
title: 合成数据 · 瓶颈不是生成器，是验证器
publish: true
description: 每日知识点（S-04 大模型训练与对齐 / 预训练数据）：一张图看懂合成数据的两笔账——递归训练先抹掉分布尾部（1% 稀有事件一代缺席 36.6%），而能合成多少取决于有没有模型之外的验证器。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s04/pretraining-data/" data-no-popover="true">← 返回主题 · 预训练数据</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-18</span><span>S-04 / 预训练数据</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="合成数据信息图：为什么转向合成、递归训练让尾部先消失、能验证多少才能合成多少、配比倒 U 形与真实锚点" xmlns="http://www.w3.org/2000/svg">
      <title>合成数据 · Synthetic Data（验证器决定上限）</title>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-04 大模型训练与对齐 / 预训练数据</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">合成数据 <tspan fill="var(--ai-violet)" font-size="11" letter-spacing="1.3">SYNTHETIC DATA</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">训练集开始由模型自己写；能写多少，由检验它的那只手决定。</text>
      <text x="24" y="110" fill="var(--ai-ice)" font-size="13" font-weight="600">① 为什么要合成：真实语料见底</text>
      <text x="24" y="134" fill="var(--ai-muted)" font-size="10">可爬的高质量文本接近见底，模型要的 token 却还在涨。</text>
      <text x="24" y="152" fill="var(--ai-muted)" font-size="10">于是把「模型生成 + 筛选」当成新的语料来源。</text>
      <text x="24" y="170" fill="var(--ai-muted)" font-size="10">行业估算：前沿训练里 <tspan fill="var(--ai-cyan)">30%–60%</tspan> 的 token 已是合成；Gartner 预测 2026 年底合成占七成。</text>
      <text x="24" y="188" fill="var(--ai-muted)" font-size="10">K2-Horizon（11-16）公开的合成管线产出约 <tspan fill="var(--ai-cyan)">10 万亿</tspan> 预训练 token——这笔账第一次可查。</text>
      <line x1="24" y1="206" x2="536" y2="206" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="228" fill="var(--ai-ice)" font-size="13" font-weight="600">② 代价：递归训练先抹掉分布的尾部</text>
      <text x="24" y="252" fill="var(--ai-muted)" font-size="10">模型只在有限样本上学，稀有事件可能一个都没抽到；</text>
      <text x="24" y="270" fill="var(--ai-muted)" font-size="10">下一代只照抄这批数据的频率，那个事件的概率就成了零，而且<tspan fill="var(--ai-amber)">回不来</tspan>。</text>
      <text x="24" y="288" fill="var(--ai-muted)" font-size="10">算一笔：真实概率 1% 的事件，抽 100 个样本全缺席的概率 ≈ <tspan fill="var(--ai-amber)">36.6%</tspan>。</text>
      <text x="24" y="306" fill="var(--ai-muted)" font-size="10">Nature 2024 实测（OPT-125m）：逐代只用生成数据，困惑度劣化 20–28 点；</text>
      <text x="24" y="324" fill="var(--ai-muted)" font-size="10">每代保留 10% 原始真实数据，就只剩轻微退化。</text>
      <line x1="24" y1="342" x2="536" y2="342" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="364" fill="var(--ai-ice)" font-size="13" font-weight="600">③ 判据：能验证多少，才能合成多少</text>
      <rect x="24" y="376" width="248" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="40" y="398" fill="var(--ai-green)" font-size="10.5" font-weight="600">有模型之外的验证器</text>
      <text x="40" y="418" fill="var(--ai-muted)" font-size="9.5">答案可判、代码可编译、棋局分胜负、</text>
      <text x="40" y="435" fill="var(--ai-muted)" font-size="9.5">物理仿真能给真伪——错的那条</text>
      <text x="40" y="452" fill="var(--ai-muted)" font-size="9.5">进不了下一轮，自我博弈可无限扩张。</text>
      <rect x="288" y="376" width="248" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="304" y="398" fill="var(--ai-amber)" font-size="10.5" font-weight="600">只有内部判断</text>
      <text x="304" y="418" fill="var(--ai-muted)" font-size="9.5">创意写作、分寸、审美取舍——</text>
      <text x="304" y="435" fill="var(--ai-muted)" font-size="9.5">没人能可靠地说「这个更好」，</text>
      <text x="304" y="452" fill="var(--ai-muted)" font-size="9.5">合成只会把均值再压一遍。</text>
      <text x="24" y="496" fill="var(--ai-muted)" font-size="10">分界不在生成器强弱，而在<tspan fill="var(--ai-ice)">有没有一只模型之外的手能判对错</tspan>——</text>
      <text x="24" y="514" fill="var(--ai-muted)" font-size="10">可验证奖励之所以敢无限造数据，就是因为它先有了那只手。</text>
      <line x1="24" y1="532" x2="536" y2="532" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="554" fill="var(--ai-ice)" font-size="13" font-weight="600">④ 配比：倒 U 形，不是越多越好</text>
      <rect x="24" y="566" width="118" height="76" rx="11" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="36" y="594" fill="var(--ai-cyan)" font-size="17" font-weight="700">30–60%</text>
      <text x="36" y="614" fill="var(--ai-muted)" font-size="9">前沿训练</text>
      <text x="36" y="630" fill="var(--ai-muted)" font-size="9">合成占比（估算）</text>
      <rect x="154" y="566" width="118" height="76" rx="11" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="166" y="594" fill="var(--ai-green)" font-size="17" font-weight="700">10%</text>
      <text x="166" y="614" fill="var(--ai-muted)" font-size="9">真实数据留底</text>
      <text x="166" y="630" fill="var(--ai-muted)" font-size="9">退化只剩轻微</text>
      <rect x="284" y="566" width="118" height="76" rx="11" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="296" y="594" fill="var(--ai-violet)" font-size="17" font-weight="700">1:5</text>
      <text x="296" y="614" fill="var(--ai-muted)" font-size="9">机器人增强</text>
      <text x="296" y="630" fill="var(--ai-muted)" font-size="9">甜点区（CoRL 2026）</text>
      <rect x="414" y="566" width="118" height="76" rx="11" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="426" y="594" fill="var(--ai-amber)" font-size="17" font-weight="700">1/1000</text>
      <text x="426" y="614" fill="var(--ai-muted)" font-size="9">合成样本占比</text>
      <text x="426" y="630" fill="var(--ai-muted)" font-size="9">就足以拖住增量</text>
      <text x="24" y="666" fill="var(--ai-muted)" font-size="10">增强比例从 1:5 推到 1:15 之后，未见背景上的成功率反而下降——合成放大的是分布偏差。</text>
      <text x="24" y="684" fill="var(--ai-muted)" font-size="10">所以配方几乎是同一个形状：合成占三四成、真实数据做锚点、生成端就带验证。</text>
      <text x="24" y="702" fill="var(--ai-muted)" font-size="10">反例也在：AlphaGo 靠自我对弈超越人类棋谱——它每一步都有胜负这个绝对验证器。</text>
      <line x1="24" y1="720" x2="536" y2="720" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="742" fill="var(--ai-muted)" font-size="9.5">边界：合成比例与 Gartner 预测均为行业估算；崩溃实验多在小模型上做，大模型是否同轨未定；</text>
      <text x="24" y="760" fill="var(--ai-muted)" font-size="9.5">「真实数据」的定义本身也在漂移——网上的文本已混入大量生成内容，锚点也得先溯源。</text>
      <text x="280" y="812" text-anchor="middle" fill="var(--ai-muted)" font-size="11">一句话：<tspan fill="var(--ai-violet)">合成数据的上限，由验证器的分辨率决定。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：为什么转向合成 · 中：尾部先消失的机制与「验证器决定上限」 · 下：配比倒 U、真实锚点与边界。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>真实语料见底，合成数据成了预训练的主料。但递归训练会先抹掉分布的尾部：稀有事件一旦漏掉就再也学不回来。所以能合成多少，取决于有没有一只模型之外的手能判对错——答案可验、代码可编译、棋局分胜负；只靠人审美的领域，合成只会加速退化。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s04/pretraining-data/" data-no-popover="true">返回主题 · 预训练数据 →</a>
  </nav>
</div>
