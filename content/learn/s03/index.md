---
title: Transformer 与注意力机制
publish: true
description: 学习目录阶段 S-03：Transformer 与注意力机制——注意力、位置编码与 KV 缓存，大模型如何读进并记住上下文。三个主题按日挂载知识点。
---

<div class="ai-learn">
  <a class="ai-learn__back" href="learn/" data-no-popover="true">← 返回学习目录</a>
  <p class="ai-eyebrow"><span>STAGE / S-03</span><span>3 个主题 · 3 篇知识点</span></p>
  <p class="ai-learn__lede">注意力、位置编码与 KV 缓存：大模型的核心架构，如何读进并记住上下文。本阶段的知识按主题分册，每个主题一条线往下讲。</p>
  <ul class="ai-lchips">
    <li><a class="ai-lchip" href="learn/s01/" data-no-popover="true"><b>S-01</b> 数学直觉</a></li>
    <li><a class="ai-lchip" href="learn/s02/" data-no-popover="true"><b>S-02</b> 深度学习</a></li>
    <li><a class="ai-lchip" href="learn/s03/" data-no-popover="true" aria-current="page"><b>S-03</b> Transformer</a></li>
    <li><a class="ai-lchip" href="learn/s04/" data-no-popover="true"><b>S-04</b> 训练对齐</a></li>
    <li><a class="ai-lchip" href="learn/s05/" data-no-popover="true"><b>S-05</b> 推理智能体</a></li>
    <li><a class="ai-lchip" href="learn/s06/" data-no-popover="true"><b>S-06</b> 边界安全</a></li>
  </ul>
  <section class="ai-learn__block">
    <h2 class="ai-learn__h">本阶段主题</h2>
    <ul class="ai-lcards">
      <li class="ai-lcard"><a class="ai-lcard__link" href="learn/s03/moe/" data-no-popover="true">
        <span class="ai-lcard__tag">TOPIC</span>
        <span class="ai-lcard__title">稀疏架构与 MoE</span>
        <p class="ai-lcard__desc">把参数量与计算量拆开：每层只激活少数专家，用路由换取模型容量。</p>
        <span class="ai-lcard__foot"><span><b>1</b> 篇知识点 · 最近 10-14</span><span class="ai-lcard__go">进入 <span aria-hidden="true">→</span></span></span>
      </a></li>
      <li class="ai-lcard"><a class="ai-lcard__link" href="learn/s03/kv-cache/" data-no-popover="true">
        <span class="ai-lcard__tag">TOPIC</span>
        <span class="ai-lcard__title">KV 缓存与长上下文</span>
        <p class="ai-lcard__desc">长上下文的显存与带宽账：解码为何被带宽卡住，缓存又从哪来。</p>
        <span class="ai-lcard__foot"><span><b>1</b> 篇知识点 · 最近 10-15</span><span class="ai-lcard__go">进入 <span aria-hidden="true">→</span></span></span>
      </a></li>
      <li class="ai-lcard"><a class="ai-lcard__link" href="learn/s03/sparse-attention/" data-no-popover="true">
        <span class="ai-lcard__tag">TOPIC</span>
        <span class="ai-lcard__title">高效注意力与稀疏化</span>
        <p class="ai-lcard__desc">把 n 平方算得起的几类办法：滑窗、全局 token 与块稀疏，各自没省下的那部分。</p>
        <span class="ai-lcard__foot"><span><b>1</b> 篇知识点 · 最近 10-25</span><span class="ai-lcard__go">进入 <span aria-hidden="true">→</span></span></span>
      </a></li>
    </ul>
  </section>
  <nav class="ai-learn__pager" aria-label="阶段导航">
    <a class="ai-learn__back" href="learn/s02/" data-no-popover="true">← 上一阶段：深度学习与神经网络</a>
    <a class="ai-learn__back" href="learn/s04/" data-no-popover="true">下一阶段：大模型训练与对齐 →</a>
  </nav>
</div>
