---
title: AI 技术原理 · 学习目录
publish: true
description: 一张按 AI 技术原理铺开的学习地图：六个阶段从数学直觉到前沿边界，只问为什么与如何运作；每日知识点按主题挂载在阶段之下。
---

<div class="ai-learn ai-learn--map">
  <a class="ai-learn__back" href="../" data-no-popover="true">← 返回首页</a>
  <p class="ai-eyebrow"><span>PRINCIPLES PATH</span><span>9 个知识点 · 9 个主题</span></p>
  <p class="ai-learn__lede">这张地图写给想搞懂并掌握 AI 技术原理的人：只问为什么、如何运作，从数学直觉一路到前沿边界。工程实践不在这条线上——不部署、不服务化、不自己造系统；工程出现的地方，止步于看懂原理。六个阶段，原理通透。各阶段的学习单元按日整理挂载到主题下。</p>
  <p class="ai-lstats">
    <span class="ai-lstat"><b>6</b> 阶段</span>
    <span class="ai-lstat"><b>9</b> 主题</span>
    <span class="ai-lstat"><b>9</b> 知识点</span>
  </p>
  <div class="ai-lm" data-ai-lm-chart>
    <noscript>
      <p class="ai-lm__fallback">星座图需要 JavaScript；下方阶段卡片不受影响。</p>
    </noscript>
  </div>
  <ol class="ai-learn__path">
    <li class="ai-learn__stage">
      <header><span class="ai-learn__code">S-01</span><h2 class="ai-learn__name"><a class="ai-learn__link" href="learn/s01/" data-no-popover="true">数学直觉与学习原理</a></h2></header>
      <p class="ai-learn__aim">线性代数、概率、优化，与损失、梯度、泛化：一次看懂「模型如何从数据中学会规律」的数学语言。</p>
      <ul class="ai-ltopics">
        <li><a class="ai-ltopic" href="learn/s01/optimization/" data-no-popover="true"><span class="ai-ltopic__name">优化与梯度</span><span class="ai-ltopic__n">1 篇</span></a></li>
      </ul>
      <a class="ai-lgo" href="learn/s01/" data-no-popover="true">进入阶段<span aria-hidden="true">→</span></a>
    </li>
    <li class="ai-learn__stage">
      <header><span class="ai-learn__code">S-02</span><h2 class="ai-learn__name"><a class="ai-learn__link" href="learn/s02/" data-no-popover="true">深度学习与神经网络</a></h2></header>
      <p class="ai-learn__aim">分层表示与反向传播：为什么网络堆得越深，越能长出抽象的智能。</p>
      <ul class="ai-ltopics">
        <li><a class="ai-ltopic" href="learn/s02/world-model/" data-no-popover="true"><span class="ai-ltopic__name">世界模型</span><span class="ai-ltopic__n">1 篇</span></a></li>
      </ul>
      <a class="ai-lgo" href="learn/s02/" data-no-popover="true">进入阶段<span aria-hidden="true">→</span></a>
    </li>
    <li class="ai-learn__stage">
      <header><span class="ai-learn__code">S-03</span><h2 class="ai-learn__name"><a class="ai-learn__link" href="learn/s03/" data-no-popover="true">Transformer 与注意力机制</a></h2></header>
      <p class="ai-learn__aim">注意力、位置编码与 KV 缓存：大模型的核心架构，如何读进并记住上下文。</p>
      <ul class="ai-ltopics">
        <li><a class="ai-ltopic" href="learn/s03/moe/" data-no-popover="true"><span class="ai-ltopic__name">稀疏架构与 MoE</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s03/kv-cache/" data-no-popover="true"><span class="ai-ltopic__name">KV 缓存与上下文</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s03/sparse-attention/" data-no-popover="true"><span class="ai-ltopic__name">高效注意力与稀疏化</span><span class="ai-ltopic__n">1 篇</span></a></li>
      </ul>
      <a class="ai-lgo" href="learn/s03/" data-no-popover="true">进入阶段<span aria-hidden="true">→</span></a>
    </li>
    <li class="ai-learn__stage">
      <header><span class="ai-learn__code">S-04</span><h2 class="ai-learn__name"><a class="ai-learn__link" href="learn/s04/" data-no-popover="true">大模型训练与对齐</a></h2></header>
      <p class="ai-learn__aim">预训练、微调、强化学习与对齐：能力如何被炼出来，又被塑造成可用、可信的样子。</p>
      <ul class="ai-ltopics">
        <li><a class="ai-ltopic" href="learn/s04/rlvr/" data-no-popover="true"><span class="ai-ltopic__name">可验证奖励与策略优化</span><span class="ai-ltopic__n">1 篇</span></a></li>
      </ul>
      <a class="ai-lgo" href="learn/s04/" data-no-popover="true">进入阶段<span aria-hidden="true">→</span></a>
    </li>
    <li class="ai-learn__stage">
      <header><span class="ai-learn__code">S-05</span><h2 class="ai-learn__name"><a class="ai-learn__link" href="learn/s05/" data-no-popover="true">推理、智能体与记忆</a></h2></header>
      <p class="ai-learn__aim">推理、工具调用、检索增强、记忆与运行原理：智能在运行时如何被一步步组合出来——看懂原理，不动手造。</p>
      <ul class="ai-ltopics">
        <li><a class="ai-ltopic" href="learn/s05/agent-loop/" data-no-popover="true"><span class="ai-ltopic__name">智能体循环</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s05/context-engineering/" data-no-popover="true"><span class="ai-ltopic__name">上下文工程</span><span class="ai-ltopic__n">1 篇</span></a></li>
      </ul>
      <a class="ai-lgo" href="learn/s05/" data-no-popover="true">进入阶段<span aria-hidden="true">→</span></a>
    </li>
    <li class="ai-learn__stage">
      <header><span class="ai-learn__code">S-06</span><h2 class="ai-learn__name"><a class="ai-learn__link" href="learn/s06/" data-no-popover="true">边界、安全与前沿</a></h2></header>
      <p class="ai-learn__aim">幻觉、对齐失败、攻防现实与治理：知道 AI 的能力边界在哪里，以及它正在往哪里去。</p>
      <ul class="ai-ltopics">
        <li><a class="ai-ltopic" href="learn/s06/isolation/" data-no-popover="true"><span class="ai-ltopic__name">隔离与沙箱</span><span class="ai-ltopic__n">1 篇</span></a></li>
      </ul>
      <a class="ai-lgo" href="learn/s06/" data-no-popover="true">进入阶段<span aria-hidden="true">→</span></a>
    </li>
  </ol>
  <p class="ai-learn__note">这张地图与首页的六大知识模块互为经纬：模块记录「AI 正在变成什么」的前沿认知，地图规划「AI 如何运作」的学习顺序。上方星座图是六个阶段的关系总览：移动鼠标星图随之漂移，悬停节点点亮对应阶段卡片，点击节点直达该卡片。阶段骨架保持稳定，知识点按日在各自主题下生长。</p>
</div>
