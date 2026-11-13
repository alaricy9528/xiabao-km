---
title: 终止滞后 · 做对了，却不知道已经做完
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 智能体循环）：一张图看懂终止滞后（termination lag）——编码智能体很早就改对了，却把成功运行三分之一以上的步数花在之后。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/agent-loop/" data-no-popover="true">← 返回主题 · 智能体循环</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-14</span><span>S-05 / 智能体循环</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="终止滞后信息图：一段轨迹里做对与停下是两个时刻、TTFCP 与 TL 两个指标、实测数字与后续步构成、为什么停不下来" xmlns="http://www.w3.org/2000/svg">
      <title>终止滞后 · Termination Lag</title>
      <defs>
        <marker id="tl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
        <marker id="tl-arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-amber)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 推理、智能体与记忆 / 智能体循环</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">终止滞后 <tspan fill="var(--ai-violet)" font-size="11" letter-spacing="1.3">TERMINATION LAG</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">最终补丁是对的，不代表它知道自己做完了——中间空着一段。</text>
      <text x="24" y="110" fill="var(--ai-ice)" font-size="13" font-weight="600">① 一段轨迹里，做对与停下是两个时刻</text>
      <rect x="24" y="124" width="36" height="26" rx="7" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="42" y="141" text-anchor="middle" fill="var(--ai-muted)" font-size="10">1</text>
      <rect x="66" y="124" width="36" height="26" rx="7" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="84" y="141" text-anchor="middle" fill="var(--ai-muted)" font-size="10">2</text>
      <rect x="108" y="124" width="36" height="26" rx="7" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="126" y="141" text-anchor="middle" fill="var(--ai-muted)" font-size="10">3</text>
      <rect x="150" y="124" width="36" height="26" rx="7" fill="var(--ai-soft)" stroke="var(--ai-green)"></rect>
      <text x="168" y="141" text-anchor="middle" fill="var(--ai-green)" font-size="10" font-weight="700">4</text>
      <rect x="192" y="124" width="36" height="26" rx="7" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="210" y="141" text-anchor="middle" fill="var(--ai-amber)" font-size="10">5</text>
      <rect x="234" y="124" width="36" height="26" rx="7" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="252" y="141" text-anchor="middle" fill="var(--ai-amber)" font-size="10">6</text>
      <rect x="276" y="124" width="36" height="26" rx="7" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="294" y="141" text-anchor="middle" fill="var(--ai-amber)" font-size="10">7</text>
      <rect x="318" y="124" width="36" height="26" rx="7" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="336" y="141" text-anchor="middle" fill="var(--ai-amber)" font-size="10">8</text>
      <rect x="360" y="124" width="36" height="26" rx="7" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="378" y="141" text-anchor="middle" fill="var(--ai-amber)" font-size="10">9</text>
      <rect x="402" y="124" width="36" height="26" rx="7" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="420" y="141" text-anchor="middle" fill="var(--ai-amber)" font-size="10">10</text>
      <text x="452" y="134" fill="var(--ai-green)" font-size="9">绿 · 首次改对</text>
      <text x="452" y="150" fill="var(--ai-amber)" font-size="9">琥珀 · 还在跑</text>
      <line x1="26" y1="170" x2="166" y2="170" stroke="var(--ai-cyan)" stroke-width="1.3" marker-end="url(#tl-arrow)"></line>
      <text x="180" y="174" fill="var(--ai-cyan)" font-size="10">TTFCP · 到第 4 步才首次改对</text>
      <line x1="172" y1="194" x2="436" y2="194" stroke="var(--ai-amber)" stroke-width="1.3" marker-end="url(#tl-arrow-amber)"></line>
      <text x="24" y="214" fill="var(--ai-amber)" font-size="10">TL · 之后又跑了 6 步才自己停（这一段就是终止滞后）</text>
      <text x="24" y="238" fill="var(--ai-muted)" font-size="10">评测只看最终补丁，等于把两种能力混成一种：<tspan fill="var(--ai-ice)">产生正确修复</tspan>，与</text>
      <text x="24" y="256" fill="var(--ai-muted)" font-size="10"><tspan fill="var(--ai-ice)">识别修复已经完成</tspan>。两条轨迹最终补丁一样，成本与风险却可能差好几倍。</text>
      <line x1="24" y1="274" x2="536" y2="274" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="300" fill="var(--ai-ice)" font-size="13" font-weight="600">② 两个指标：一个测做对，一个测知道做完</text>
      <rect x="24" y="316" width="160" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="40" y="340" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">TTFCP · 做对</text>
      <text x="40" y="362" fill="var(--ai-muted)" font-size="9.5">首个正确补丁</text>
      <text x="40" y="380" fill="var(--ai-muted)" font-size="9.5">出现在第几步。</text>
      <rect x="200" y="316" width="160" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="216" y="340" fill="var(--ai-amber)" font-size="10.5" font-weight="600">TL · 做完</text>
      <text x="216" y="362" fill="var(--ai-muted)" font-size="9.5">之后又花了</text>
      <text x="216" y="380" fill="var(--ai-muted)" font-size="9.5">多少步才停。</text>
      <rect x="376" y="316" width="160" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="392" y="340" fill="var(--ai-violet)" font-size="10.5" font-weight="600">NTL · 占比</text>
      <text x="392" y="362" fill="var(--ai-muted)" font-size="9.5">TL ÷ 总步数，</text>
      <text x="392" y="380" fill="var(--ai-muted)" font-size="9.5">长度不一也能比。</text>
      <text x="24" y="424" fill="var(--ai-muted)" font-size="10">怎么量：每一步都把仓库补丁存下来，事后在隔离容器里用官方测试离线评——</text>
      <text x="24" y="442" fill="var(--ai-muted)" font-size="10">agent 全程看不到测试，所以量到的是它自己的行为，不是被测试引导出来的行为。</text>
      <line x1="24" y1="460" x2="536" y2="460" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="486" fill="var(--ai-ice)" font-size="13" font-weight="600">③ 实测：做对得很早，停得很晚</text>
      <rect x="24" y="502" width="122" height="74" rx="11" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="36" y="530" fill="var(--ai-green)" font-size="16" font-weight="700">38–82%</text>
      <text x="36" y="550" fill="var(--ai-muted)" font-size="9">成功运行在</text>
      <text x="36" y="564" fill="var(--ai-muted)" font-size="9">首次源码编辑</text>
      <rect x="146" y="502" width="122" height="74" rx="11" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="158" y="530" fill="var(--ai-amber)" font-size="16" font-weight="700">35–60%</text>
      <text x="158" y="550" fill="var(--ai-muted)" font-size="9">成功运行中位</text>
      <text x="158" y="564" fill="var(--ai-muted)" font-size="9">NTL：正确之后</text>
      <rect x="268" y="502" width="122" height="74" rx="11" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="280" y="530" fill="var(--ai-violet)" font-size="16" font-weight="700">1–8%</text>
      <text x="280" y="550" fill="var(--ai-muted)" font-size="9">终局反而更差：</text>
      <text x="280" y="564" fill="var(--ai-muted)" font-size="9">改坏了正确补丁</text>
      <rect x="390" y="502" width="122" height="74" rx="11" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="402" y="530" fill="var(--ai-cyan)" font-size="16" font-weight="700">+28–78%</text>
      <text x="402" y="550" fill="var(--ai-muted)" font-size="9">上下文膨胀：</text>
      <text x="402" y="564" fill="var(--ai-muted)" font-size="9">首改到末步</text>
      <text x="24" y="598" fill="var(--ai-muted)" font-size="10">这之后的时间花在哪：<tspan fill="var(--ai-cyan)">验证 48–63%</tspan>（跑已有测试、写额外脚本、构建）、</text>
      <text x="24" y="616" fill="var(--ai-muted)" font-size="10"><tspan fill="var(--ai-cyan)">探索 15–29%</tspan>（看文件、搜代码、查 git）、再次改源码 2–6%。</text>
      <text x="24" y="634" fill="var(--ai-muted)" font-size="10">oracle 实验：在首个正确补丁处停下，能省掉成功运行 35–60% 的步数，且不损失任何已解任务。</text>
      <line x1="24" y1="652" x2="536" y2="652" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="678" fill="var(--ai-ice)" font-size="13" font-weight="600">④ 为什么停不下来，又为什么不能砍掉验证</text>
      <rect x="24" y="694" width="250" height="80" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="40" y="716" fill="var(--ai-amber)" font-size="10.5" font-weight="600">停不下来：没有「完成」信号</text>
      <text x="40" y="736" fill="var(--ai-muted)" font-size="9.5">它看不到官方测试，只能靠自己的证据判断；</text>
      <text x="40" y="754" fill="var(--ai-muted)" font-size="9.5">每多一步都是在更长的上下文上再调一次模型。</text>
      <rect x="286" y="694" width="250" height="80" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="302" y="716" fill="var(--ai-green)" font-size="10.5" font-weight="600">但验证不是浪费</text>
      <text x="302" y="736" fill="var(--ai-muted)" font-size="9.5">近一半后续步确实在验证；一刀砍掉，</text>
      <text x="302" y="754" fill="var(--ai-muted)" font-size="9.5">只是把「停太晚」换成「没做完就交」。</text>
      <text x="24" y="794" fill="var(--ai-muted)" font-size="10">所以这不是「让它少想」的问题，而是把两件事拆开做：评测同时报 TTFCP 与 TL，</text>
      <text x="24" y="812" fill="var(--ai-muted)" font-size="10">控制上把「还没做完」与「做完了还想再确认」区别对待。</text>
      <text x="280" y="826" text-anchor="middle" fill="var(--ai-muted)" font-size="11">一句话：<tspan fill="var(--ai-violet)">做对只是半程——另一半，是知道什么时候停。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：同一段轨迹里「首次改对」与「停下」隔着一整段 · 中：TTFCP / TL / NTL 三个量 · 下：实测数字、后续步构成与停不下来的原因。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>编码智能体常常很早就改对了：38–82% 的成功运行在首次源码编辑就已正确。但它看不到官方测试，只能靠自己判断是否做完，于是把成功运行中位 35–60% 的步数花在之后，1–8% 还把正确补丁改坏。「做对」与「知道做完了」是两种能力。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/agent-loop/" data-no-popover="true">返回主题 · 智能体循环 →</a>
  </nav>
</div>
