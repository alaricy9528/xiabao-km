---
title: 循环计算与有效深度
publish: true
description: S-03 Transformer 与注意力机制 · 主题：循环计算与有效深度——把中间层用共享权重连跑两遍，用计算换深度而不是用参数换深度，以及这笔账哪里省了、哪里没省。
---

<div class="ai-learn">
  <a class="ai-learn__back" href="learn/s03/" data-no-popover="true">← 返回 S-03 · Transformer 与注意力机制</a>
  <p class="ai-eyebrow"><span>TOPIC / S-03</span><span>循环计算与有效深度</span></p>
  <p class="ai-learn__lede">把网络做深不一定要多买权重：同一组权重可以再走一遍，深度由「层数 × 轮数」决定。本主题整理这条「用计算换深度」的路线——核心的那一招、两遍之间信息怎么传，以及它省了什么、没省什么：每篇一张图、一段话，按日挂载。</p>
  <section class="ai-learn__block">
    <h2 class="ai-learn__h">本主题知识点</h2>
    <ul class="ai-lrows">
      <li class="ai-lrow"><a class="ai-lrow__link" href="learn/s03/looped-transformer/2026-11-02-looped-transformer" data-no-popover="true"><span class="ai-lrow__date">2026-11-02</span><span class="ai-lrow__title">循环 Transformer · 同一组权重，跑两遍</span><span class="ai-lrow__go">阅读 <span aria-hidden="true">→</span></span></a></li>
    </ul>
  </section>
  <nav class="ai-learn__pager" aria-label="主题导航">
    <a class="ai-learn__back" href="learn/s03/" data-no-popover="true">返回 S-03 阶段页 →</a>
  </nav>
</div>
