---
title: 语言建模即压缩 · 预测得好就是压得小
publish: true
description: 每日知识点（S-01 数学直觉 / 压缩与预测）：一张图看懂语言建模即压缩——字母的价格是它的意外程度，预测得多准文本就压得多小。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s01/compression-prediction/" data-no-popover="true">← 返回主题 · 压缩与预测</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-19</span><span>S-01 / 压缩与预测</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="语言建模即压缩信息图：香农猜字母游戏、算术编码概率区间、三个压缩器的比特数对比与压缩预测一体两面" xmlns="http://www.w3.org/2000/svg">
      <title>语言建模即压缩 · Compression Is Prediction</title>
      <defs>
        <marker id="cp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-01 数学直觉 / 压缩与预测</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">语言建模即压缩 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">COMPRESSION IS PREDICTION</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">一个 token 的价格，是它的意外程度。</text>
      <text x="24" y="110" fill="var(--ai-ice)" font-size="13" font-weight="600">香农猜字母游戏 <tspan fill="var(--ai-muted)" font-size="8.5" letter-spacing="1">SHANNON · 1951</tspan></text>
      <rect x="24" y="120" width="512" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="146" fill="var(--ai-text)" font-size="11" font-family="monospace">THE ROOM WAS NOT VERY LIGHT A SMALL OBLONG</text>
      <text x="40" y="166" fill="var(--ai-cyan)" font-size="11" font-family="monospace">----ROO------NOT-V-----I------SM----OBL---</text>
      <text x="40" y="196" fill="var(--ai-muted)" font-size="10">猜对 = 付 0 比特 · 猜错 = 付 −log₂p 比特：字母的价格是它的意外程度</text>
      <rect x="24" y="228" width="248" height="42" rx="10" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="148" y="254" text-anchor="middle" fill="var(--ai-green)" font-size="11.5" font-weight="600">英语 ≈ 1 bit/字母</text>
      <rect x="288" y="228" width="248" height="42" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="412" y="254" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">随机 26 字母 ≈ 4.7 bit/字母</text>
      <line x1="280" y1="276" x2="280" y2="292" stroke="var(--ai-cyan)" stroke-width="1.5" marker-end="url(#cp-arrow)"></line>
      <text x="24" y="316" fill="var(--ai-ice)" font-size="13" font-weight="600">算术编码 <tspan fill="var(--ai-muted)" font-size="8.5" letter-spacing="1">ARITHMETIC CODING</tspan></text>
      <text x="24" y="334" fill="var(--ai-muted)" font-size="10">模型给出下一个 token 的概率分布，把整句编进 [0,1) 区间——段越宽越便宜：</text>
      <rect x="24" y="346" width="204.8" height="30" fill="var(--ai-cyan)" opacity="0.85"></rect>
      <rect x="228.8" y="346" width="102.4" height="30" fill="var(--ai-violet)" opacity="0.8"></rect>
      <rect x="331.2" y="346" width="51.2" height="30" fill="var(--ai-amber)" opacity="0.8"></rect>
      <rect x="382.4" y="346" width="153.6" height="30" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="126" y="366" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5" font-weight="600">the · 0.40</text>
      <text x="280" y="366" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5">a · 0.20</text>
      <text x="356" y="366" text-anchor="middle" fill="var(--ai-ice)" font-size="10">my · 0.10</text>
      <text x="459" y="366" text-anchor="middle" fill="var(--ai-muted)" font-size="10">其他 · 0.30</text>
      <text x="24" y="402" fill="var(--ai-cyan)" font-size="10.5">选中的段越宽越便宜：若 p=0.9，只付 −log₂(0.9) ≈ 0.15 bit</text>
      <text x="24" y="420" fill="var(--ai-amber)" font-size="10.5">落在窄段就是「意外」——而意外，正是信息本身</text>
      <line x1="280" y1="432" x2="280" y2="448" stroke="var(--ai-cyan)" stroke-width="1.5" marker-end="url(#cp-arrow)"></line>
      <text x="24" y="472" fill="var(--ai-ice)" font-size="13" font-weight="600">同一个句子，三个压缩器 <tspan fill="var(--ai-muted)" font-size="8.5" letter-spacing="1">ONE SENTENCE · THREE COMPRESSORS</tspan></text>
      <text x="24" y="492" fill="var(--ai-muted)" font-size="10.5" font-family="monospace">"To be or not to be, that is the question."（41 字符 = 328 bit）</text>
      <text x="24" y="514" fill="var(--ai-text)" font-size="10.5">原文（ASCII，每字符 8 bit）</text>
      <rect x="24" y="520" width="480" height="18" rx="4" fill="var(--ai-line-strong)" opacity="0.5"></rect>
      <text x="496" y="534" fill="var(--ai-muted)" font-size="10.5">328</text>
      <text x="24" y="556" fill="var(--ai-text)" font-size="10.5">gzip（DEFLATE：只复读见过的片段）</text>
      <rect x="24" y="562" width="468" height="18" rx="4" fill="var(--ai-violet)" opacity="0.75"></rect>
      <text x="496" y="576" fill="var(--ai-violet)" font-size="10.5">320</text>
      <text x="24" y="598" fill="var(--ai-text)" font-size="10.5">0.5B 小模型 + 算术编码（按模型概率付费）</text>
      <rect x="24" y="604" width="44" height="18" rx="4" fill="var(--ai-green)"></rect>
      <text x="76" y="618" fill="var(--ai-green)" font-size="10.5" font-weight="600">30 bit</text>
      <text x="24" y="644" fill="var(--ai-muted)" font-size="10">gzip 的模型是「复读过去」——32KB 窗口就是它的全部上下文；</text>
      <text x="24" y="660" fill="var(--ai-muted)" font-size="10">模型读过莎士比亚，「to be」之后几乎零意外。会预测 = 会压缩。</text>
      <line x1="280" y1="672" x2="280" y2="688" stroke="var(--ai-cyan)" stroke-width="1.5" marker-end="url(#cp-arrow)"></line>
      <text x="24" y="712" fill="var(--ai-ice)" font-size="13" font-weight="600">压缩与预测，一枚硬币的两面</text>
      <rect x="24" y="724" width="160" height="56" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="104" y="746" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">预训练 = 学压缩</text>
      <text x="104" y="766" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">交叉熵 ≈ 平均 −log₂p</text>
      <rect x="200" y="724" width="160" height="56" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="280" y="746" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">压得多好 = 预测多准</text>
      <text x="280" y="766" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">同一个量的两种说法</text>
      <rect x="376" y="724" width="160" height="56" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="456" y="746" text-anchor="middle" fill="var(--ai-amber)" font-size="11.5" font-weight="600">边界</text>
      <text x="456" y="766" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">压缩 ≠ 理解，但误差是唯一老师</text>
      <line x1="24" y1="796" x2="536" y2="796" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="280" y="818" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">预测得好就是压得小——语言模型是被训练来压缩世界的机器。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：香农 1951 猜字母游戏 · 中：算术编码按概率付费 · 下：三个压缩器同句对比与压缩-预测一体两面。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p><strong>字母的价格是它的意外程度</strong>：猜中付 0 比特，猜错付 −log₂p。香农 1951 年量出英语约 1 比特/字母。语言模型做同一件事：训练最小化交叉熵，就是学一个更好的压缩器——预测得多准，压得就多小；压得多小，说明学到了多少规律。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s01/compression-prediction/" data-no-popover="true">返回主题 · 压缩与预测 →</a>
  </nav>
</div>
