---
title: KV 缓存压缩 · 让大多数层不看原文
publish: true
description: 每日知识点（S-03 Transformer / KV 缓存与长上下文）：一张图看懂 KV 缓存压缩——不对称分层怎么把显存账单压到一成多，代价记在哪。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s03/kv-cache/" data-no-popover="true">← 返回主题 · KV 缓存与长上下文</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-07</span><span>S-03 / KV 缓存与长上下文</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="KV 缓存压缩信息图：不对称分层注意力——多数层看摘要、少数层看原文，账单压到 14.6% 及其代价" xmlns="http://www.w3.org/2000/svg">
      <title>KV 缓存压缩 · KV Cache Compression</title>
      <defs>
        <marker id="kvc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-03 TRANSFORMER / KV 缓存与长上下文</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">KV 缓存压缩 <tspan fill="var(--ai-violet)" font-size="12.5" letter-spacing="1.5">ASYMMETRIC TIERING</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">让大多数层不看原文：把「记住多少」按层分配，而不是每层都存全量。</text>
      <text x="24" y="112" fill="var(--ai-ice)" font-size="13" font-weight="600">出发点：远期历史不需要逐字记住</text>
      <text x="24" y="136" fill="var(--ai-muted)" font-size="10">全注意力模型每一层都为每个 token 存一条 K/V——但注意力的真实需求是分层的：</text>
      <text x="24" y="154" fill="var(--ai-muted)" font-size="10">多数层只靠对远期历史的<tspan fill="var(--ai-violet)">粗略印象</tspan>就能干活；需要逐字细看的层是少数。</text>
      <rect x="24" y="172" width="240" height="66" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="144" y="196" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">全注意力：43 层全存</text>
      <rect x="40" y="208" width="200" height="10" rx="5" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="144" y="232" text-anchor="middle" fill="var(--ai-muted)" font-size="9">账单 = 层数 × 上下文长 × 每 token 宽度</text>
      <rect x="284" y="172" width="252" height="66" rx="12" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="410" y="196" text-anchor="middle" fill="var(--ai-violet)" font-size="11" font-weight="600">分层：各层选自己的记法</text>
      <rect x="300" y="208" width="29" height="10" rx="5" fill="var(--ai-violet)"></rect>
      <rect x="337" y="208" width="191" height="10" rx="5" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="410" y="232" text-anchor="middle" fill="var(--ai-muted)" font-size="9">少量全量层 + 大量压缩层，可叠加量化</text>
      <line x1="24" y1="262" x2="536" y2="262" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="290" fill="var(--ai-ice)" font-size="13" font-weight="600">怎么分：一个量产架构的答案（ERNIE 5.5 Flash）</text>
      <rect x="24" y="306" width="296" height="150" rx="12" fill="var(--ai-panel)" stroke="var(--ai-violet)" stroke-width="1.2"></rect>
      <text x="40" y="330" fill="var(--ai-violet)" font-size="11.5" font-weight="600">压缩层 × 37（HCA 重度压缩注意力）</text>
      <text x="40" y="352" fill="var(--ai-text)" font-size="10">每 128 个 token 压成 1 条缓存条目</text>
      <text x="40" y="370" fill="var(--ai-text)" font-size="10">只对最近一小段窗口保留逐 token 状态</text>
      <text x="40" y="392" fill="var(--ai-muted)" font-size="9.5">远期历史 = 摘要，省下 127/128 的缓存</text>
      <text x="40" y="412" fill="var(--ai-muted)" font-size="9.5">计算随长度按 1/128 增长 → 长度外推有依据</text>
      <text x="40" y="436" fill="var(--ai-muted)" font-size="9.5" font-family="monospace">37/43 LAYERS · 512-dim WIDE HEADS</text>
      <rect x="336" y="306" width="200" height="150" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="352" y="330" fill="var(--ai-cyan)" font-size="11.5" font-weight="600">全量层 × 6（MLA + DSA）</text>
      <text x="352" y="352" fill="var(--ai-text)" font-size="10">保留逐 token 完整访问</text>
      <text x="352" y="370" fill="var(--ai-text)" font-size="10">轻量 indexer 给历史位置打分</text>
      <text x="352" y="390" fill="var(--ai-text)" font-size="10">注意力只算 top-k 个位置</text>
      <text x="352" y="412" fill="var(--ai-muted)" font-size="9.5">逐字检索的活全压在这一小撮层</text>
      <text x="352" y="436" fill="var(--ai-muted)" font-size="9.5" font-family="monospace">6/43 LAYERS · 256-dim HEADS</text>
      <text x="24" y="482" fill="var(--ai-muted)" font-size="10">同一思路的变体早就各有阵营：MLA 存低秩潜向量（攻宽度）、滑窗与稀疏选择（攻长度）、</text>
      <text x="24" y="500" fill="var(--ai-muted)" font-size="10">跨层共享（攻层数）——分层压缩的新意在<tspan fill="var(--ai-violet)">按层分配记法</tspan>，让三条路线在同一个模型里各管一摊。</text>
      <line x1="24" y1="522" x2="536" y2="522" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="550" fill="var(--ai-ice)" font-size="13" font-weight="600">账怎么算：把 43 层折成 6.29 层</text>
      <rect x="24" y="566" width="512" height="64" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="590" fill="var(--ai-text)" font-size="10.5" font-family="monospace">6 × 1 + 37 × 1/128 ≈ 6.29 层 / 43 层 ≈ <tspan fill="var(--ai-violet)" font-weight="700">14.6%</tspan></text>
      <text x="40" y="614" fill="var(--ai-muted)" font-size="9.5">全量层一条顶一条、压缩层一条顶 1/128 条；宽头差异未计，实际还略更省。</text>
      <text x="24" y="656" fill="var(--ai-muted)" font-size="10">128K 训练、1M 推理：上下文翻 8 倍时，全注意力的注意力计算量翻 64 倍，</text>
      <text x="24" y="674" fill="var(--ai-muted)" font-size="10">而压缩层的工作量只按 1/128 跟着涨、全量层被 top-k 卡住——外推才推得动。</text>
      <line x1="24" y1="696" x2="536" y2="696" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="724" fill="var(--ai-ice)" font-size="13" font-weight="600">代价记在哪</text>
      <text x="24" y="748" fill="var(--ai-muted)" font-size="10.5">· 逐字检索能力集中在少数层：超长文本里精确找回某一句，恰是该架构的失分点（InfiniteBench 微弱落败）</text>
      <text x="24" y="768" fill="var(--ai-muted)" font-size="10.5">· 训练 128K、推理 1M 隔着 8 倍外推：「能跑」与「精度不掉」是两件事，官方长文评测未给全部数字</text>
      <text x="24" y="788" fill="var(--ai-muted)" font-size="10.5">· 每层该看多细是个设计判断：压太狠丢细节，压太轻省不下账——分层比例本身就是新的超参数</text>
      <text x="280" y="818" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-violet)">压缩不是把历史变小，是决定哪些层配看原文。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：远期历史不必逐字记 · 中：37 层压缩看摘要 + 6 层全量配 top-k 看原文 · 下：账单折算 14.6%，代价是逐字检索集中。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>KV 缓存比权重更早吃满显存，压缩的思路是不对称分层：多数层只留远期历史的摘要——如每 128 个 token 折成一条缓存，近窗才留全量；少数层保留逐 token 访问并配 top-k 稀疏。账可压到全注意力的一成多，代价是逐字检索集中在少数层，超长文本精确召回变弱。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s03/kv-cache/" data-no-popover="true">返回主题 · KV 缓存与长上下文 →</a>
  </nav>
</div>
