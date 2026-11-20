---
title: AI 技术原理 · 学习目录
publish: true
description: 一张按认知对象铺开的学习地图：四大知识域从智能原理到应用治理，只问为什么与如何运作；每日知识点按主题挂载在域下的阶段里。
---

<div class="ai-learn ai-learn--map">
  <a class="ai-learn__back" href="../" data-no-popover="true">← 返回首页</a>
  <p class="ai-eyebrow"><span>KNOWLEDGE ATLAS</span><span>4 个知识域 · 33 个知识点</span></p>
  <p class="ai-learn__lede">这张地图写给想搞懂并掌握智能技术的人：只问为什么、如何运作。它按「认知对象」分成四域——先看清智能从哪来，再看知识怎么表示与流动，然后是怎么把智能体搭成系统，最后是怎么落地与治理。工程实践不在这条原理线上——不部署、不服务化、不自己造系统；工程出现的地方，止步于看懂原理。各域的学习单元按日整理挂载到主题之下。</p>
  <p class="ai-lstats">
    <span class="ai-lstat"><b>4</b> 知识域</span>
    <span class="ai-lstat"><b>6</b> 阶段</span>
    <span class="ai-lstat"><b>24</b> 主题</span>
    <span class="ai-lstat"><b>33</b> 知识点</span>
  </p>
  <section class="ai-domains" aria-label="四大知识域">
    <a class="ai-domain ai-domain--d1" href="learn/s01/" data-no-popover="true">
      <span class="ai-domain__idx">D1</span>
      <span class="ai-domain__body"><span class="ai-domain__name">智能原理</span><span class="ai-domain__q">智能为什么这样运作</span><span class="ai-domain__meta">6 阶段 · 18 系列 · 32 篇 · 已开放</span></span>
      <span class="ai-domain__arrow" aria-hidden="true">→</span>
    </a>
    <div class="ai-domain ai-domain--d2 ai-domain--seed">
      <span class="ai-domain__idx">D2</span>
      <span class="ai-domain__body"><span class="ai-domain__name">知识工程</span><span class="ai-domain__q">知识如何被表示与加工</span><span class="ai-domain__meta">本体 · 加工消费 · 生长中</span></span>
      <span class="ai-domain__arrow" aria-hidden="true">◌</span>
    </div>
    <div class="ai-domain ai-domain--d3 ai-domain--seed">
      <span class="ai-domain__idx">D3</span>
      <span class="ai-domain__body"><span class="ai-domain__name">智能体工程</span><span class="ai-domain__q">智能体系统如何被搭建</span><span class="ai-domain__meta">开发平台 · Skill · 生长中</span></span>
      <span class="ai-domain__arrow" aria-hidden="true">◌</span>
    </div>
    <div class="ai-domain ai-domain--d4 ai-domain--seed">
      <span class="ai-domain__idx">D4</span>
      <span class="ai-domain__body"><span class="ai-domain__name">应用与治理</span><span class="ai-domain__q">智能如何落地、如何被约束</span><span class="ai-domain__meta">落地 · 评测 · 治理 · 生长中</span></span>
      <span class="ai-domain__arrow" aria-hidden="true">◌</span>
    </div>
  </section>
  <section class="ai-learn__section" aria-label="原理线星座图">
    <h2 class="ai-learn__h">D1 智能原理 · 六阶段星图</h2>
    <p class="ai-learn__h-sub">这是一条从数学直觉到前沿边界的认知链。轻移光标星图随之漂移，悬停节点点亮对应阶段，点击直达。</p>
  </section>
  <div class="ai-lm" data-ai-lm-chart>
    <noscript>
      <p class="ai-lm__fallback">星图需要 JavaScript；下方阶段卡片不受影响。</p>
    </noscript>
  </div>
  <ol class="ai-learn__path">
    <li class="ai-learn__stage">
      <header><span class="ai-learn__code">S-01</span><h2 class="ai-learn__name"><a class="ai-learn__link" href="learn/s01/" data-no-popover="true">数学直觉与学习原理</a></h2></header>
      <p class="ai-learn__aim">线性代数、概率、优化，与损失、梯度、泛化：一次看懂「模型如何从数据中学会规律」的数学语言。</p>
      <ul class="ai-ltopics">
        <li><a class="ai-ltopic" href="learn/s01/optimization/" data-no-popover="true"><span class="ai-ltopic__name">优化与梯度</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s01/compression-prediction/" data-no-popover="true"><span class="ai-ltopic__name">压缩与预测</span><span class="ai-ltopic__n">1 篇</span></a></li>
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
        <li><a class="ai-ltopic" href="learn/s03/kv-cache/" data-no-popover="true"><span class="ai-ltopic__name">KV 缓存与上下文</span><span class="ai-ltopic__n">2 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s03/sparse-attention/" data-no-popover="true"><span class="ai-ltopic__name">高效注意力与稀疏化</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s03/diffusion-lm/" data-no-popover="true"><span class="ai-ltopic__name">扩散语言模型与并行解码</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s03/linear-attention/" data-no-popover="true"><span class="ai-ltopic__name">线性注意力与状态空间模型</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s03/looped-transformer/" data-no-popover="true"><span class="ai-ltopic__name">循环计算与有效深度</span><span class="ai-ltopic__n">1 篇</span></a></li>
      </ul>
      <a class="ai-lgo" href="learn/s03/" data-no-popover="true">进入阶段<span aria-hidden="true">→</span></a>
    </li>
    <li class="ai-learn__stage">
      <header><span class="ai-learn__code">S-04</span><h2 class="ai-learn__name"><a class="ai-learn__link" href="learn/s04/" data-no-popover="true">大模型训练与对齐</a></h2></header>
      <p class="ai-learn__aim">预训练、微调、强化学习与对齐：能力如何被炼出来，又被塑造成可用、可信的样子。</p>
      <ul class="ai-ltopics">
        <li><a class="ai-ltopic" href="learn/s04/rlvr/" data-no-popover="true"><span class="ai-ltopic__name">可验证奖励与策略优化</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s04/formal-verification/" data-no-popover="true"><span class="ai-ltopic__name">形式化验证与机器可检查证明</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s04/distillation/" data-no-popover="true"><span class="ai-ltopic__name">蒸馏与能力迁移</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s04/reward-hacking/" data-no-popover="true"><span class="ai-ltopic__name">奖励作弊与对齐失效</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s04/pretraining-data/" data-no-popover="true"><span class="ai-ltopic__name">预训练数据与合成数据</span><span class="ai-ltopic__n">1 篇</span></a></li>
      </ul>
      <a class="ai-lgo" href="learn/s04/" data-no-popover="true">进入阶段<span aria-hidden="true">→</span></a>
    </li>
    <li class="ai-learn__stage">
      <header><span class="ai-learn__code">S-05</span><h2 class="ai-learn__name"><a class="ai-learn__link" href="learn/s05/" data-no-popover="true">推理、智能体与记忆</a></h2></header>
      <p class="ai-learn__aim">推理、工具调用、检索增强、记忆与运行原理：智能在运行时如何被一步步组合出来——看懂原理，不动手造。</p>
      <ul class="ai-ltopics">
        <li><a class="ai-ltopic" href="learn/s05/agent-loop/" data-no-popover="true"><span class="ai-ltopic__name">智能体循环</span><span class="ai-ltopic__n">2 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s05/context-engineering/" data-no-popover="true"><span class="ai-ltopic__name">上下文工程</span><span class="ai-ltopic__n">3 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s05/test-time-compute/" data-no-popover="true"><span class="ai-ltopic__name">测试时计算与推理算力</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s05/quantization/" data-no-popover="true"><span class="ai-ltopic__name">数值精度与量化</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s05/agent-memory/" data-no-popover="true"><span class="ai-ltopic__name">智能体记忆</span><span class="ai-ltopic__n">4 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s05/rag/" data-no-popover="true"><span class="ai-ltopic__name">检索增强生成</span><span class="ai-ltopic__n">3 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s05/multi-agent/" data-no-popover="true"><span class="ai-ltopic__name">多智能体协作</span><span class="ai-ltopic__n">1 篇</span></a></li>
      </ul>
      <a class="ai-lgo" href="learn/s05/" data-no-popover="true">进入阶段<span aria-hidden="true">→</span></a>
    </li>
    <li class="ai-learn__stage">
      <header><span class="ai-learn__code">S-06</span><h2 class="ai-learn__name"><a class="ai-learn__link" href="learn/s06/" data-no-popover="true">边界、安全与前沿</a></h2></header>
      <p class="ai-learn__aim">幻觉、对齐失败、攻防现实与治理：知道 AI 的能力边界在哪里，以及它正在往哪里去。</p>
      <ul class="ai-ltopics">
        <li><a class="ai-ltopic" href="learn/s06/isolation/" data-no-popover="true"><span class="ai-ltopic__name">隔离与沙箱</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s06/prompt-injection/" data-no-popover="true"><span class="ai-ltopic__name">提示注入</span><span class="ai-ltopic__n">1 篇</span></a></li>
        <li><a class="ai-ltopic" href="learn/s06/memory-poisoning/" data-no-popover="true"><span class="ai-ltopic__name">记忆投毒</span><span class="ai-ltopic__n">1 篇</span></a></li>
      </ul>
      <a class="ai-lgo" href="learn/s06/" data-no-popover="true">进入阶段<span aria-hidden="true">→</span></a>
    </li>
  </ol>
  <p class="ai-learn__note">这张地图与首页的六大知识模块互为经纬：模块记录「AI 正在变成什么」的前沿认知，地图规划「AI 如何运作」的学习顺序。四域是认知对象的分类：D1 已开放，D2–D4 随每日知识点整理逐步生长。星图展示 D1 六阶段的关系：阶段骨架保持稳定，知识点按日在各自主题下生长。</p>
</div>
