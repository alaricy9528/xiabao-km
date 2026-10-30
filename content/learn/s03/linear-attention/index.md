---
title: 线性注意力与状态空间模型
publish: true
description: S-03 Transformer 与注意力机制 · 主题：线性注意力与状态空间模型——去掉 softmax 让结合律回来，把整张得分表换成一份随读随更新的状态，以及这条路线换来与没换来的东西。
---

<div class="ai-learn">
  <a class="ai-learn__back" href="learn/s03/" data-no-popover="true">← 返回 S-03 · Transformer 与注意力机制</a>
  <p class="ai-eyebrow"><span>TOPIC / S-03</span><span>线性注意力与状态空间模型</span></p>
  <p class="ai-learn__lede">注意力把每个 token 都留着回头查，缓存随长度线性变长；线性注意力只读一遍，随身带一份固定大小的状态。本主题整理这条「换掉缓存本身」的路线——核心的那一招、状态容量不够时的三步应对，以及它换来与没换来的那部分：每篇一张图、一段话，按日挂载。</p>
  <section class="ai-learn__block">
    <h2 class="ai-learn__h">本主题知识点</h2>
    <ul class="ai-lrows">
      <li class="ai-lrow"><a class="ai-lrow__link" href="learn/s03/linear-attention/2026-10-31-linear-attention" data-no-popover="true"><span class="ai-lrow__date">2026-10-31</span><span class="ai-lrow__title">线性注意力 · 不再回头看，只带一份状态</span><span class="ai-lrow__go">阅读 <span aria-hidden="true">→</span></span></a></li>
    </ul>
  </section>
  <nav class="ai-learn__pager" aria-label="主题导航">
    <a class="ai-learn__back" href="learn/s03/" data-no-popover="true">返回 S-03 阶段页 →</a>
  </nav>
</div>
