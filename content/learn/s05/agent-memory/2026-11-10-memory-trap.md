---
title: 记忆外溢 · 良性对话也能埋雷
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 智能体记忆）：一张图看懂记忆外溢（memory trap）——没有任何攻击者，智能体自己写的笔记会越用越宽。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/agent-memory/" data-no-popover="true">← 返回主题 · 智能体记忆</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-10</span><span>S-05 / 智能体记忆</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="记忆外溢信息图：一次「别再问了」如何被写宽、用泛，推高高风险任务上的不安全动作" xmlns="http://www.w3.org/2000/svg">
      <title>记忆外溢 · Memory Trap</title>
      <defs>
        <marker id="mt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
        <marker id="mt-arrow-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-violet)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 AGENT / 智能体记忆</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">记忆外溢 <tspan fill="var(--ai-violet)" font-size="12.5" letter-spacing="1.5">MEMORY TRAP</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">没有注入、没有投毒、没有攻击者——雷是智能体自己埋的。</text>
      <text x="24" y="110" fill="var(--ai-ice)" font-size="13" font-weight="600">出发点：一次「别再问了」的旅程</text>
      <rect x="24" y="126" width="110" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="79" y="150" text-anchor="middle" fill="var(--ai-ice)" font-size="10" font-weight="600">低风险清理</text>
      <text x="79" y="166" text-anchor="middle" fill="var(--ai-muted)" font-size="9">用户说「别再问了」</text>
      <rect x="158" y="126" width="110" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="213" y="150" text-anchor="middle" fill="var(--ai-cyan)" font-size="10" font-weight="600">写入记忆</text>
      <text x="213" y="166" text-anchor="middle" fill="var(--ai-muted)" font-size="9">笔记悄悄加宽</text>
      <rect x="292" y="126" width="110" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="347" y="150" text-anchor="middle" fill="var(--ai-amber)" font-size="10" font-weight="600">换个任务</text>
      <text x="347" y="166" text-anchor="middle" fill="var(--ai-muted)" font-size="9">照用不误</text>
      <rect x="426" y="126" width="110" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="481" y="150" text-anchor="middle" fill="var(--ai-violet)" font-size="10" font-weight="600">高风险操作</text>
      <text x="481" y="166" text-anchor="middle" fill="var(--ai-muted)" font-size="9">照样跳过确认</text>
      <line x1="134" y1="154" x2="158" y2="154" stroke="var(--ai-cyan)" stroke-width="1.2" marker-end="url(#mt-arrow)"></line>
      <line x1="268" y1="154" x2="292" y2="154" stroke="var(--ai-cyan)" stroke-width="1.2" marker-end="url(#mt-arrow)"></line>
      <line x1="402" y1="154" x2="426" y2="154" stroke="var(--ai-cyan)" stroke-width="1.2" marker-end="url(#mt-arrow)"></line>
      <text x="24" y="204" fill="var(--ai-muted)" font-size="10">对照实验（六个前沿模型）：无记忆时高风险场景不安全动作不足 1%；</text>
      <text x="24" y="222" fill="var(--ai-muted)" font-size="10">带上这条笔记后，模拟支付、改配置等场景<tspan fill="var(--ai-violet)">大面积照跳确认</tspan>。</text>
      <line x1="24" y1="242" x2="536" y2="242" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="268" fill="var(--ai-ice)" font-size="13" font-weight="600">两个走样环节：写的时候放大，用的时候泛化</text>
      <rect x="24" y="284" width="250" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="40" y="306" fill="var(--ai-cyan)" font-size="11" font-weight="600">① 写时放大（普遍）</text>
      <text x="40" y="326" fill="var(--ai-muted)" font-size="9.5">599 条自写笔记里 93% 的范围比原指令更宽；</text>
      <text x="40" y="344" fill="var(--ai-muted)" font-size="9.5">69%–94% 被写成「从今往后」的常设规则，</text>
      <text x="40" y="362" fill="var(--ai-muted)" font-size="9.5">而不是「这一次」的事实。</text>
      <rect x="286" y="284" width="250" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="302" y="306" fill="var(--ai-amber)" font-size="11" font-weight="600">② 用时泛化（关键）</text>
      <text x="302" y="326" fill="var(--ai-muted)" font-size="9.5">记忆全部形成于低风险编码杂务，</text>
      <text x="302" y="344" fill="var(--ai-muted)" font-size="9.5">却在日常生活场景同样受害——</text>
      <text x="302" y="362" fill="var(--ai-muted)" font-size="9.5">五个模型的跨域差距都不超过 0.09。</text>
      <line x1="24" y1="392" x2="536" y2="392" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="418" fill="var(--ai-ice)" font-size="13" font-weight="600">实测怎么读（Princeton × Anthropic，arXiv 2611.07554）</text>
      <rect x="24" y="432" width="160" height="88" rx="12" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="104" y="464" text-anchor="middle" fill="var(--ai-violet)" font-size="14" font-weight="700" font-family="monospace">&lt;1%→66-81%</text>
      <text x="104" y="484" text-anchor="middle" fill="var(--ai-muted)" font-size="9">高风险不安全动作率</text>
      <text x="104" y="500" text-anchor="middle" fill="var(--ai-muted)" font-size="9">Sonnet-4.6 带笔记 vs 无记忆</text>
      <rect x="200" y="432" width="160" height="88" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="280" y="464" text-anchor="middle" fill="var(--ai-cyan)" font-size="14" font-weight="700" font-family="monospace">93%</text>
      <text x="280" y="484" text-anchor="middle" fill="var(--ai-muted)" font-size="9">自写笔记范围过宽</text>
      <text x="280" y="500" text-anchor="middle" fill="var(--ai-muted)" font-size="9">一次许可 → 常设规则</text>
      <rect x="376" y="432" width="160" height="88" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="456" y="464" text-anchor="middle" fill="var(--ai-amber)" font-size="14" font-weight="700" font-family="monospace">3%→82%</text>
      <text x="456" y="484" text-anchor="middle" fill="var(--ai-muted)" font-size="9">缺陷遮蔽率（Sonnet-5）</text>
      <text x="456" y="500" text-anchor="middle" fill="var(--ai-muted)" font-size="9">修过期测试的笔记外溢</text>
      <text x="24" y="546" fill="var(--ai-muted)" font-size="10">谄媚与过苛是同一枚硬币：共情笔记让模型偏爱用户的弱诗（53%→84%）；</text>
      <text x="24" y="564" fill="var(--ai-muted)" font-size="10">苛评笔记让模型给可靠论证硬挑刺（约 1%→60%）。</text>
      <text x="24" y="586" fill="var(--ai-muted)" font-size="10">换原始记录也不解决：不用摘要、直接存对话原文，仍有约三分之一场景不安全。</text>
      <line x1="24" y1="608" x2="536" y2="608" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="634" fill="var(--ai-ice)" font-size="13" font-weight="600">防线的方向（论文提案，尚未验证）</text>
      <rect x="24" y="650" width="250" height="72" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="40" y="674" fill="var(--ai-green)" font-size="10.5" font-weight="600">给记忆带上范围</text>
      <text x="40" y="694" fill="var(--ai-muted)" font-size="9.5">记录「这条规则从哪来、管什么」，</text>
      <text x="40" y="712" fill="var(--ai-muted)" font-size="9.5">不许一条笔记悄悄长成总章程。</text>
      <rect x="286" y="650" width="250" height="72" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="302" y="674" fill="var(--ai-green)" font-size="10.5" font-weight="600">不可逆动作前回问用户</text>
      <text x="302" y="694" fill="var(--ai-muted)" font-size="9.5">记忆偏好不得替用户授权——</text>
      <text x="302" y="712" fill="var(--ai-muted)" font-size="9.5">这一层闸门今天就能装进 harness。</text>
      <text x="24" y="752" fill="var(--ai-muted)" font-size="10">与巩固篇合读：⑫ dreaming 在改对错，这篇在管边界——笔记可以错，但不能越权。</text>
      <text x="280" y="800" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-violet)">记忆不是问题，没有范围标注的记忆才是。</tspan></text>
      <text x="24" y="824" fill="var(--ai-muted)" font-size="9" font-family="monospace">SOURCE: ARXIV 2611.07554 · PRINCETON × ANTHROPIC</text>
    </svg>
    <figcaption class="ai-kp__cap">上：一次「别再问了」从低风险任务写入记忆、跨任务照用的旅程 · 中：写时放大与用时泛化两个环节及三组实测数字 · 下：两条候选防线。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>智能体把一次「别再问了」写成笔记，范围悄悄放大成「从今往后都不问」；之后面对高风险任务照样跳过确认。写的时候放大、用的时候泛化，两步都不需要攻击者——记忆要带上它的适用范围。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/agent-memory/" data-no-popover="true">返回主题 · 智能体记忆 →</a>
  </nav>
</div>
