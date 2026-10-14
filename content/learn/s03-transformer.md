---
title: S-03 Transformer 与注意力机制
publish: true
description: 学习目录阶段骨架：Transformer 与注意力机制——注意力、位置编码与 KV 缓存，大模型如何读进并记住上下文。每日知识点按主题标题整理在本页。
---

<div class="ai-learn">
  <a class="ai-learn__back" href="./ai-learning-map" data-no-popover="true">← 返回学习目录</a>
  <p class="ai-eyebrow"><span>STAGE / S-03</span><span>SKELETON v0</span></p>
  <p class="ai-learn__lede">注意力、位置编码与 KV 缓存：大模型的核心架构，如何读进并记住上下文。每日知识点在本页按标题生长：二级标题是主题，三级标题是知识点，每个知识点一张图、一段话。</p>
  <section class="ai-learn__block">
    <h2 class="ai-learn__h">学习单元 · 每日挂载</h2>
    <section class="ai-kp">
      <h2 class="ai-kp__topic">稀疏架构与 MoE</h2>
      <section class="ai-kp__point">
        <h3 class="ai-kp__point-h"><span class="ai-kp__date">2026-10-14</span>混合专家 MoE · 按需唤醒的艺术</h3>
        <figure class="ai-kp__fig">
          <svg viewBox="0 0 560 830" role="img" aria-label="混合专家 MoE 信息图：路由按需唤醒专家、总参数与激活参数分离、稀疏的三笔账" xmlns="http://www.w3.org/2000/svg">
            <title>混合专家 MoE · Mixture-of-Experts</title>
            <defs>
              <marker id="moe-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
            </defs>
            <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-03 TRANSFORMER / 稀疏架构与 MOE</text>
            <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">混合专家 MoE <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">MIXTURE-OF-EXPERTS</tspan></text>
            <text x="24" y="80" fill="var(--ai-muted)" font-size="12">万亿级知识池，每个 token 只唤醒几个专家——2026 年讨论度最高的架构。</text>
            <text x="24" y="112" fill="var(--ai-ice)" font-size="13" font-weight="600">路由：每个 token 按需点将</text>
            <rect x="24" y="180" width="70" height="44" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
            <text x="59" y="207" text-anchor="middle" fill="var(--ai-ice)" font-size="12" font-weight="600">token x</text>
            <line x1="94" y1="202" x2="114" y2="202" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#moe-arrow)"></line>
            <rect x="120" y="168" width="96" height="68" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
            <text x="168" y="196" text-anchor="middle" fill="var(--ai-cyan)" font-size="12.5" font-weight="700">路由器</text>
            <text x="168" y="214" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">Router · top-k 门控</text>
            <rect x="260" y="150" width="60" height="54" rx="10" fill="none" stroke="var(--ai-line-strong)" stroke-dasharray="4 4"></rect>
            <text x="290" y="175" text-anchor="middle" fill="var(--ai-muted)" font-size="10">专家</text>
            <text x="290" y="190" text-anchor="middle" fill="var(--ai-muted)" font-size="8.5">休眠</text>
            <rect x="332" y="150" width="60" height="54" rx="10" fill="var(--ai-soft)" stroke="var(--ai-cyan)" stroke-width="1.4"></rect>
            <text x="362" y="175" text-anchor="middle" fill="var(--ai-cyan)" font-size="10" font-weight="600">专家</text>
            <text x="362" y="190" text-anchor="middle" fill="var(--ai-cyan)" font-size="8.5">唤醒</text>
            <rect x="404" y="150" width="60" height="54" rx="10" fill="none" stroke="var(--ai-line-strong)" stroke-dasharray="4 4"></rect>
            <text x="434" y="175" text-anchor="middle" fill="var(--ai-muted)" font-size="10">专家</text>
            <text x="434" y="190" text-anchor="middle" fill="var(--ai-muted)" font-size="8.5">休眠</text>
            <rect x="476" y="150" width="60" height="54" rx="10" fill="none" stroke="var(--ai-line-strong)" stroke-dasharray="4 4"></rect>
            <text x="506" y="175" text-anchor="middle" fill="var(--ai-muted)" font-size="10">专家</text>
            <text x="506" y="190" text-anchor="middle" fill="var(--ai-muted)" font-size="8.5">休眠</text>
            <rect x="260" y="230" width="60" height="54" rx="10" fill="none" stroke="var(--ai-line-strong)" stroke-dasharray="4 4"></rect>
            <text x="290" y="255" text-anchor="middle" fill="var(--ai-muted)" font-size="10">专家</text>
            <text x="290" y="270" text-anchor="middle" fill="var(--ai-muted)" font-size="8.5">休眠</text>
            <rect x="332" y="230" width="60" height="54" rx="10" fill="none" stroke="var(--ai-line-strong)" stroke-dasharray="4 4"></rect>
            <text x="362" y="255" text-anchor="middle" fill="var(--ai-muted)" font-size="10">专家</text>
            <text x="362" y="270" text-anchor="middle" fill="var(--ai-muted)" font-size="8.5">休眠</text>
            <rect x="404" y="230" width="60" height="54" rx="10" fill="var(--ai-soft)" stroke="var(--ai-cyan)" stroke-width="1.4"></rect>
            <text x="434" y="255" text-anchor="middle" fill="var(--ai-cyan)" font-size="10" font-weight="600">专家</text>
            <text x="434" y="270" text-anchor="middle" fill="var(--ai-cyan)" font-size="8.5">唤醒</text>
            <rect x="476" y="230" width="60" height="54" rx="10" fill="none" stroke="var(--ai-line-strong)" stroke-dasharray="4 4"></rect>
            <text x="506" y="255" text-anchor="middle" fill="var(--ai-muted)" font-size="10">专家</text>
            <text x="506" y="270" text-anchor="middle" fill="var(--ai-muted)" font-size="8.5">休眠</text>
            <line x1="216" y1="190" x2="326" y2="172" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#moe-arrow)"></line>
            <line x1="216" y1="214" x2="398" y2="252" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#moe-arrow)"></line>
            <line x1="362" y1="204" x2="362" y2="314" stroke="var(--ai-cyan)" stroke-width="1.4"></line>
            <line x1="434" y1="284" x2="434" y2="314" stroke="var(--ai-cyan)" stroke-width="1.4"></line>
            <rect x="300" y="318" width="170" height="40" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
            <text x="385" y="343" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">按路由权重加和 → 输出 y</text>
            <text x="24" y="300" fill="var(--ai-muted)" font-size="10">画了 8 个专家，只唤醒 2 个；</text>
            <text x="24" y="316" fill="var(--ai-muted)" font-size="10">注意力层仍然稠密共享，稀疏的只是专家层。</text>
            <text x="24" y="382" fill="var(--ai-muted)" font-size="10.5">top-k 路由：每 token 只有 k 个专家的输出参与加和，其余专家这一步完全不计算。</text>
            <line x1="24" y1="412" x2="536" y2="412" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
            <text x="24" y="440" fill="var(--ai-ice)" font-size="13" font-weight="600">两个数字：总参数 vs 激活参数</text>
            <text x="24" y="474" fill="var(--ai-muted)" font-size="10">稠密</text>
            <rect x="140" y="460" width="250" height="16" rx="4" fill="var(--ai-line-strong)"></rect>
            <text x="400" y="473" fill="var(--ai-muted)" font-size="9.5">总 = 激活，一个数字</text>
            <text x="24" y="506" fill="var(--ai-cyan)" font-size="10">MoE 总</text>
            <rect x="140" y="492" width="250" height="16" rx="4" fill="none" stroke="var(--ai-cyan)"></rect>
            <text x="400" y="505" fill="var(--ai-cyan)" font-size="9.5">2.8T · 决定内存账单</text>
            <text x="24" y="534" fill="var(--ai-green)" font-size="10">MoE 活</text>
            <rect x="140" y="520" width="10" height="16" rx="3" fill="var(--ai-green)"></rect>
            <text x="160" y="533" fill="var(--ai-green)" font-size="9.5">104B · 决定每 token 算力（≈3.7%）</text>
            <text x="24" y="560" fill="var(--ai-muted)" font-size="10.5">算力跟着激活参数走，内存跟着总参数走——2026 年这两个数字差出 1-2 个数量级。</text>
            <line x1="24" y1="580" x2="536" y2="580" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
            <text x="24" y="608" fill="var(--ai-ice)" font-size="13" font-weight="600">稀疏的三笔账</text>
            <rect x="24" y="622" width="160" height="92" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
            <text x="104" y="648" text-anchor="middle" fill="var(--ai-cyan)" font-size="12" font-weight="600">知识容量 ↑</text>
            <text x="104" y="670" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">总参数＝能装多少知识</text>
            <text x="104" y="688" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">万亿级专家池按需取用</text>
            <rect x="200" y="622" width="160" height="92" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
            <text x="280" y="648" text-anchor="middle" fill="var(--ai-green)" font-size="12" font-weight="600">单 token 算力 ↓</text>
            <text x="280" y="670" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">激活参数 ≈ 每步 FLOPs</text>
            <text x="280" y="688" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">像中型模型一样便宜地算</text>
            <rect x="376" y="622" width="160" height="92" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
            <text x="456" y="648" text-anchor="middle" fill="var(--ai-amber)" font-size="12" font-weight="600">内存账照付</text>
            <text x="456" y="670" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">全部专家常驻显存</text>
            <text x="456" y="688" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">路由器还要学负载均衡</text>
            <text x="280" y="790" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">MoE 把「知道多少」和「每 token 算多少」拆开——内存账一分不减。</tspan></text>
          </svg>
          <figcaption class="ai-kp__cap">上：路由按需点将，8 选 2 · 中：总参数与激活参数分离 · 下：稀疏的三笔账。</figcaption>
        </figure>
        <div class="ai-kp__text">
          <p>MoE 把稠密前馈层换成一堆专家子网加一个路由器：每个 token 只唤醒少数专家，于是「总参数」（知识容量、决定内存）与「激活参数」（每 token 算力）被拉开一到两个数量级——2026 年开源模型普遍「万亿参数、百亿算力」的底气。代价：全部专家仍须常驻显存，路由器还要学会负载均衡。</p>
        </div>
      </section>
    </section>
  </section>
  <nav class="ai-learn__pager" aria-label="阶段导航">
    <a class="ai-learn__back" href="./s02-deep-learning" data-no-popover="true">← 上一阶段：深度学习与神经网络</a>
    <a class="ai-learn__back" href="./s04-training-alignment" data-no-popover="true">下一阶段：大模型训练与对齐 →</a>
  </nav>
</div>
