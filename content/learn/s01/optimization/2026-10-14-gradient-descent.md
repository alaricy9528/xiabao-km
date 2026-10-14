---
title: 梯度下降 · 一步步走下山
publish: true
description: 每日知识点（S-01 数学直觉 / 优化与梯度）：一张图看懂梯度下降——梯度指向上坡，参数反着走，步长决定旅程。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="./" data-no-popover="true">← 返回主题 · 优化与梯度</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-10-14</span><span>S-01 / 优化与梯度</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="梯度下降信息图：损失面上的下山路径、三步循环与学习率对比" xmlns="http://www.w3.org/2000/svg">
      <title>梯度下降 · Gradient Descent</title>
      <defs>
        <marker id="gd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
        <marker id="gd-arrow-up" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-amber)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-01 数学直觉 / 优化与梯度</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">梯度下降 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">GRADIENT DESCENT</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">模型如何「从错误里学习」？——朝着误差最小的地方，一步一步走下去。</text>
      <g transform="rotate(-10 210 240)">
        <ellipse cx="210" cy="240" rx="160" ry="108" fill="none" stroke="var(--ai-line-strong)" stroke-width="1" stroke-dasharray="4 5"></ellipse>
        <ellipse cx="210" cy="240" rx="124" ry="84" fill="none" stroke="var(--ai-line-strong)" stroke-width="1" stroke-dasharray="4 5"></ellipse>
        <ellipse cx="210" cy="240" rx="90" ry="60" fill="none" stroke="var(--ai-line-strong)" stroke-width="1.1" stroke-dasharray="4 5" opacity="0.9"></ellipse>
        <ellipse cx="210" cy="240" rx="56" ry="37" fill="none" stroke="var(--ai-cyan)" stroke-width="1.1" opacity="0.45"></ellipse>
        <ellipse cx="210" cy="240" rx="25" ry="16" fill="none" stroke="var(--ai-cyan)" stroke-width="1.3" opacity="0.75"></ellipse>
      </g>
      <polyline points="345,152 300,184 259,212 232,231" fill="none" stroke="var(--ai-cyan)" stroke-width="2" marker-end="url(#gd-arrow)"></polyline>
      <circle cx="345" cy="152" r="4.5" fill="var(--ai-amber)"></circle>
      <circle cx="300" cy="184" r="3.5" fill="var(--ai-cyan)"></circle>
      <circle cx="259" cy="212" r="3.5" fill="var(--ai-cyan)"></circle>
      <circle cx="210" cy="240" r="6" fill="var(--ai-green)"></circle>
      <circle cx="210" cy="240" r="10.5" fill="none" stroke="var(--ai-green)" stroke-width="1" opacity="0.5"></circle>
      <text x="390" y="132" text-anchor="end" fill="var(--ai-amber)" font-size="10.5">起点 · 随机初始化</text>
      <line x1="259" y1="212" x2="294" y2="188" stroke="var(--ai-amber)" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#gd-arrow-up)"></line>
      <text x="304" y="205" fill="var(--ai-amber)" font-size="10.5">∇L 上坡</text>
      <text x="304" y="219" fill="var(--ai-muted)" font-size="9.5">误差上升最快的方向</text>
      <text x="225" y="174" fill="var(--ai-cyan)" font-size="10.5">走一步：θ ← θ − η·∇L</text>
      <text x="210" y="282" text-anchor="middle" fill="var(--ai-green)" font-size="11">谷底 · 损失 L 最小</text>
      <text x="210" y="297" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">梯度 ≈ 0，参数不再移动</text>
      <text x="46" y="372" fill="var(--ai-muted)" font-size="10" letter-spacing="1">LOSS SURFACE · 损失面等高线</text>
      <rect x="398" y="104" width="146" height="84" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <circle cx="420" cy="128" r="11" fill="none" stroke="var(--ai-cyan)" stroke-width="1.4"></circle>
      <text x="420" y="132" text-anchor="middle" fill="var(--ai-cyan)" font-size="11" font-weight="700">1</text>
      <text x="438" y="126" fill="var(--ai-ice)" font-size="12.5" font-weight="600">看方向 <tspan fill="var(--ai-muted)" font-size="8.5" letter-spacing="1">GRADIENT</tspan></text>
      <text x="438" y="147" fill="var(--ai-text)" font-size="10">计算梯度 ∇L(θ)：指向</text>
      <text x="438" y="163" fill="var(--ai-text)" font-size="10">当前误差上升最快方向</text>
      <rect x="398" y="198" width="146" height="84" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <circle cx="420" cy="222" r="11" fill="none" stroke="var(--ai-cyan)" stroke-width="1.4"></circle>
      <text x="420" y="226" text-anchor="middle" fill="var(--ai-cyan)" font-size="11" font-weight="700">2</text>
      <text x="438" y="220" fill="var(--ai-ice)" font-size="12.5" font-weight="600">走一步 <tspan fill="var(--ai-muted)" font-size="8.5" letter-spacing="1">UPDATE</tspan></text>
      <text x="438" y="242" fill="var(--ai-cyan)" font-size="11" font-family="monospace">θ ← θ − η·∇L(θ)</text>
      <text x="438" y="263" fill="var(--ai-text)" font-size="10">逆梯度走，η 定步幅</text>
      <rect x="398" y="292" width="146" height="84" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <circle cx="420" cy="316" r="11" fill="none" stroke="var(--ai-green)" stroke-width="1.4"></circle>
      <text x="420" y="320" text-anchor="middle" fill="var(--ai-green)" font-size="11" font-weight="700">3</text>
      <text x="438" y="314" fill="var(--ai-ice)" font-size="12.5" font-weight="600">到谷底 <tspan fill="var(--ai-muted)" font-size="8.5" letter-spacing="1">CONVERGE</tspan></text>
      <text x="438" y="335" fill="var(--ai-text)" font-size="10">重复 1→2 直到梯度 ≈ 0：</text>
      <text x="438" y="351" fill="var(--ai-text)" font-size="10">误差最低，学习完成</text>
      <line x1="24" y1="412" x2="536" y2="412" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="438" fill="var(--ai-ice)" font-size="13" font-weight="600">学习率 η：步幅决定旅程</text>
      <path d="M30,462 Q110,526 190,462" fill="none" stroke="var(--ai-line-strong)" stroke-width="1" stroke-dasharray="3 4"></path>
      <polyline points="42,468 162,472 74,488 134,490 106,494" fill="none" stroke="var(--ai-amber)" stroke-width="1.8"></polyline>
      <circle cx="42" cy="468" r="3" fill="var(--ai-amber)"></circle>
      <circle cx="162" cy="472" r="3" fill="var(--ai-amber)"></circle>
      <circle cx="74" cy="488" r="3" fill="var(--ai-amber)"></circle>
      <circle cx="134" cy="490" r="3" fill="var(--ai-amber)"></circle>
      <text x="110" y="524" text-anchor="middle" fill="var(--ai-amber)" font-size="11" font-weight="600">η 太大</text>
      <text x="110" y="541" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">越过谷底来回震荡，甚至发散</text>
      <path d="M200,462 Q280,526 360,462" fill="none" stroke="var(--ai-line-strong)" stroke-width="1" stroke-dasharray="3 4"></path>
      <polyline points="218,466 252,480 269,489 278,494" fill="none" stroke="var(--ai-cyan)" stroke-width="1.8"></polyline>
      <circle cx="218" cy="466" r="3" fill="var(--ai-cyan)"></circle>
      <circle cx="252" cy="480" r="3" fill="var(--ai-cyan)"></circle>
      <circle cx="269" cy="489" r="3" fill="var(--ai-cyan)"></circle>
      <circle cx="278" cy="494" r="4" fill="var(--ai-green)"></circle>
      <text x="280" y="524" text-anchor="middle" fill="var(--ai-green)" font-size="11" font-weight="600">η 合适</text>
      <text x="280" y="541" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">几步就平稳落到谷底</text>
      <path d="M370,462 Q450,526 530,462" fill="none" stroke="var(--ai-line-strong)" stroke-width="1" stroke-dasharray="3 4"></path>
      <polyline points="383,467 390,469.5 397,472 404,474.5 411,477 418,479.5 425,482" fill="none" stroke="var(--ai-muted)" stroke-width="1.8"></polyline>
      <circle cx="383" cy="467" r="2.6" fill="var(--ai-muted)"></circle>
      <circle cx="397" cy="472" r="2.6" fill="var(--ai-muted)"></circle>
      <circle cx="411" cy="477" r="2.6" fill="var(--ai-muted)"></circle>
      <circle cx="425" cy="482" r="2.6" fill="var(--ai-muted)"></circle>
      <text x="450" y="524" text-anchor="middle" fill="var(--ai-muted)" font-size="11" font-weight="600">η 太小</text>
      <text x="450" y="541" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">小步蠕动，学得太慢</text>
      <line x1="24" y1="568" x2="536" y2="568" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="594" fill="var(--ai-ice)" font-size="13" font-weight="600">把一次「学习」拆开看</text>
      <rect x="24" y="608" width="150" height="64" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="99" y="634" text-anchor="middle" fill="var(--ai-ice)" font-size="12" font-weight="600">前向：算误差</text>
      <text x="99" y="653" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">数据进模型，得损失 L</text>
      <line x1="174" y1="640" x2="198" y2="640" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#gd-arrow)"></line>
      <rect x="205" y="608" width="150" height="64" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="280" y="634" text-anchor="middle" fill="var(--ai-ice)" font-size="12" font-weight="600">反向：找方向</text>
      <text x="280" y="653" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">链式法则求出 ∇L(θ)</text>
      <line x1="355" y1="640" x2="379" y2="640" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#gd-arrow)"></line>
      <rect x="386" y="608" width="150" height="64" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="461" y="634" text-anchor="middle" fill="var(--ai-ice)" font-size="12" font-weight="600">更新：挪参数</text>
      <text x="461" y="653" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">θ ← θ − η·∇L(θ)</text>
      <path d="M461,672 L461,690 L99,690 L99,676" fill="none" stroke="var(--ai-violet)" stroke-width="1.3" stroke-dasharray="4 4" marker-end="url(#gd-arrow)"></path>
      <text x="280" y="706" text-anchor="middle" fill="var(--ai-violet)" font-size="9.5">循环亿万次，直到收敛</text>
      <text x="280" y="790" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">梯度是指南针，步长是步伐——「学习」就是无数次下山。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：损失面上的下山路径与三步循环 · 中：步长 η 的三种结局 · 下：一次学习的三个动作。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p><strong>损失函数 L</strong> 给「模型错得有多离谱」打分，<strong>参数 θ</strong> 决定「模型怎么想」。梯度 ∇L 指向误差上升最快的方向，反过来就是下坡；每一步把参数沿反方向挪一小段（步幅由学习率 η 控制），亿万次重复后，参数滑进谷底、误差最低。深度学习的训练，本质上就是这一个动作的无数次循环。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="./" data-no-popover="true">返回主题 · 优化与梯度 →</a>
  </nav>
</div>
