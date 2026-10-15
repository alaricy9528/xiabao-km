---
title: Agent 循环 · 给模型装上手脚
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / Agent 循环）：一张图看懂 Agent——推理、行动、观察自主循环，加上最小四件套。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="./" data-no-popover="true">← 返回主题 · Agent 循环</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-10-15</span><span>S-05 / Agent 循环</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="Agent 循环信息图：推理-行动-观察的自主循环、与纯对话的差别、最小四件套" xmlns="http://www.w3.org/2000/svg">
      <title>Agent 循环 · Agent Loop</title>
      <defs>
        <marker id="ag-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
        <marker id="ag-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-green)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 推理、智能体与记忆 / AGENT 循环</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">Agent 循环 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">AGENT LOOP</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">Chat 一次作答；Agent 在循环里滚动——模型 + 工具 + 记忆，自主把任务做完。</text>
      <text x="24" y="112" fill="var(--ai-ice)" font-size="13" font-weight="600">核心：一个循环</text>
      <rect x="215" y="132" width="130" height="40" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="280" y="157" text-anchor="middle" fill="var(--ai-ice)" font-size="12" font-weight="600">任务 · GOAL</text>
      <line x1="280" y1="172" x2="280" y2="190" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#ag-arrow)"></line>
      <rect x="215" y="196" width="130" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="280" y="222" text-anchor="middle" fill="var(--ai-ice)" font-size="12.5" font-weight="700">推理 THINK</text>
      <text x="280" y="240" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">模型：决定下一步</text>
      <line x1="280" y1="252" x2="280" y2="270" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#ag-arrow)"></line>
      <rect x="215" y="276" width="130" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="280" y="302" text-anchor="middle" fill="var(--ai-ice)" font-size="12.5" font-weight="700">行动 ACT</text>
      <text x="280" y="320" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">调用合适的工具</text>
      <line x1="280" y1="332" x2="280" y2="350" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#ag-arrow)"></line>
      <rect x="215" y="356" width="130" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="280" y="382" text-anchor="middle" fill="var(--ai-ice)" font-size="12.5" font-weight="700">观察 OBSERVE</text>
      <text x="280" y="400" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">结果回填上下文</text>
      <path d="M215,384 C120,384 120,224 213,224" fill="none" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#ag-arrow)"></path>
      <text x="98" y="296" text-anchor="middle" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">循环</text>
      <text x="98" y="312" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">直到任务完成</text>
      <line x1="345" y1="224" x2="394" y2="224" stroke="var(--ai-green)" stroke-width="1.6" marker-end="url(#ag-arrow-green)"></line>
      <rect x="398" y="206" width="138" height="36" rx="10" fill="var(--ai-soft)" stroke="var(--ai-green)"></rect>
      <text x="467" y="229" text-anchor="middle" fill="var(--ai-green)" font-size="11" font-weight="600">任务完成 → 输出</text>
      <text x="398" y="164" fill="var(--ai-muted)" font-size="10">推理：看进度，自己决定</text>
      <text x="398" y="180" fill="var(--ai-muted)" font-size="10">下一步做什么</text>
      <text x="398" y="304" fill="var(--ai-muted)" font-size="10">工具：搜索、代码、</text>
      <text x="398" y="320" fill="var(--ai-muted)" font-size="10">API、文件系统…</text>
      <text x="398" y="384" fill="var(--ai-muted)" font-size="10">观察结果堆进上下文，</text>
      <text x="398" y="400" fill="var(--ai-muted)" font-size="10">成为下一轮推理的原料</text>
      <text x="24" y="440" fill="var(--ai-muted)" font-size="10.5">每一轮 = 一次推理 + 一次行动；观察回填为下一轮的输入——这就是 Agent 的心跳。</text>
      <line x1="24" y1="456" x2="536" y2="456" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="478" fill="var(--ai-ice)" font-size="13" font-weight="600">与纯对话的差别</text>
      <rect x="24" y="494" width="245" height="84" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="146" y="520" text-anchor="middle" fill="var(--ai-muted)" font-size="12" font-weight="600">纯对话 CHAT</text>
      <text x="146" y="542" text-anchor="middle" fill="var(--ai-text)" font-size="10">一次输入 → 一次输出</text>
      <text x="146" y="558" text-anchor="middle" fill="var(--ai-muted)" font-size="10">碰不到外部世界，单步作答</text>
      <rect x="292" y="494" width="245" height="84" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="414" y="520" text-anchor="middle" fill="var(--ai-cyan)" font-size="12" font-weight="600">Agent</text>
      <text x="414" y="542" text-anchor="middle" fill="var(--ai-text)" font-size="10">目标进，循环出</text>
      <text x="414" y="558" text-anchor="middle" fill="var(--ai-text)" font-size="10">调工具、自己决定何时停</text>
      <line x1="24" y1="596" x2="536" y2="596" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="618" fill="var(--ai-ice)" font-size="13" font-weight="600">最小四件套</text>
      <rect x="24" y="636" width="245" height="52" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <circle cx="50" cy="662" r="10" fill="none" stroke="var(--ai-violet)" stroke-width="1.4"></circle>
      <text x="50" y="666" text-anchor="middle" fill="var(--ai-violet)" font-size="10.5" font-weight="700">1</text>
      <text x="70" y="658" fill="var(--ai-ice)" font-size="12" font-weight="600">模型 · 大脑</text>
      <text x="70" y="676" fill="var(--ai-muted)" font-size="9.5">推理与决策</text>
      <rect x="292" y="636" width="245" height="52" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <circle cx="318" cy="662" r="10" fill="none" stroke="var(--ai-cyan)" stroke-width="1.4"></circle>
      <text x="318" y="666" text-anchor="middle" fill="var(--ai-cyan)" font-size="10.5" font-weight="700">2</text>
      <text x="338" y="658" fill="var(--ai-ice)" font-size="12" font-weight="600">工具 · 手脚</text>
      <text x="338" y="676" fill="var(--ai-muted)" font-size="9.5">搜索、代码、API、文件</text>
      <rect x="24" y="700" width="245" height="52" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <circle cx="50" cy="726" r="10" fill="none" stroke="var(--ai-green)" stroke-width="1.4"></circle>
      <text x="50" y="730" text-anchor="middle" fill="var(--ai-green)" font-size="10.5" font-weight="700">3</text>
      <text x="70" y="722" fill="var(--ai-ice)" font-size="12" font-weight="600">上下文 · 草稿纸</text>
      <text x="70" y="740" fill="var(--ai-muted)" font-size="9.5">承载每一轮的状态</text>
      <rect x="292" y="700" width="245" height="52" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <circle cx="318" cy="726" r="10" fill="none" stroke="var(--ai-amber)" stroke-width="1.4"></circle>
      <text x="318" y="730" text-anchor="middle" fill="var(--ai-amber)" font-size="10.5" font-weight="700">4</text>
      <text x="338" y="722" fill="var(--ai-ice)" font-size="12" font-weight="600">停止条件 · 刹车</text>
      <text x="338" y="740" fill="var(--ai-muted)" font-size="9.5">完成判据、最大步数</text>
      <text x="280" y="790" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">给模型一个循环——自己想、自己做、自己看结果、自己决定何时停。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：推理 → 行动 → 观察的自主循环与退出条件 · 中：与纯对话的差别 · 下：最小四件套。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>Chat 是一问一答；Agent 把模型放进「推理 → 行动 → 观察」的循环里：每一轮自己决定调用哪个工具，把结果回填给下一轮推理，直到任务完成才退出。最小四件套：模型管决策、工具管动手、上下文管记忆、停止条件管刹车——模型没变，变的是循环。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="./" data-no-popover="true">返回主题 · Agent 循环 →</a>
  </nav>
</div>
