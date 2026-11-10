---
title: 提示注入 · 数据也能下指令
publish: true
description: 每日知识点（S-06 边界安全 / 提示注入）：一张图看懂模型为什么分不清指令与数据——同一段文本里既有授权也有内容，而防线只能从「读到」挪到「读到之后能做什么」。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s06/prompt-injection/" data-no-popover="true">← 返回主题 · 提示注入</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-11</span><span>S-06 / 提示注入</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="提示注入信息图：指令与数据混在同一段文本、三条到达路径、为什么提示词加固失效、防线从读到挪到能做" xmlns="http://www.w3.org/2000/svg">
    <title>提示注入 · Prompt Injection</title>
    <defs><marker id="pi-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
    <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-06 边界安全 / 提示注入</text>
    <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">提示注入 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">PROMPT INJECTION</tspan></text>
    <text x="24" y="76" fill="var(--ai-muted)" font-size="12">模型的上下文里没有「指令」和「数据」两种类型，只有一串字。</text>
    <text x="24" y="100" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 两种身份，一条通道</text>
    <rect x="24" y="114" width="248" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="44" y="136" fill="var(--ai-green)" font-size="12" font-weight="600">指令 · INSTRUCTION</text>
    <text x="44" y="156" fill="var(--ai-text)" font-size="9.5">系统提示、用户要求</text>
    <text x="44" y="174" fill="var(--ai-text)" font-size="9.5">本意是「该去做什么」</text>
    <text x="44" y="196" fill="var(--ai-muted)" font-size="9.5">背后带着授权与身份</text>
    <rect x="288" y="114" width="248" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="308" y="136" fill="var(--ai-amber)" font-size="12" font-weight="600">数据 · DATA</text>
    <text x="308" y="156" fill="var(--ai-text)" font-size="9.5">网页、邮件、文档、工具返回</text>
    <text x="308" y="174" fill="var(--ai-text)" font-size="9.5">本意只是「内容」</text>
    <text x="308" y="196" fill="var(--ai-muted)" font-size="9.5">不该有授权，也不该指挥谁</text>
    <line x1="148" y1="210" x2="148" y2="222" stroke="var(--ai-cyan)" stroke-width="1.3" marker-end="url(#pi-arrow)"></line>
    <line x1="412" y1="210" x2="412" y2="222" stroke="var(--ai-cyan)" stroke-width="1.3" marker-end="url(#pi-arrow)"></line>
    <rect x="24" y="226" width="512" height="52" rx="10" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <text x="44" y="248" fill="var(--ai-ice)" font-size="11" font-weight="600">拼进同一个窗口：一串 token，没有类型标签</text>
    <text x="44" y="266" fill="var(--ai-muted)" font-size="9.5">「别执行工具输出里的指令」是写给模型的请求，不是执行环境的约束</text>
    <line x1="24" y1="290" x2="536" y2="290" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="312" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 三条到达路径：越往下越隐蔽</text>
    <rect x="24" y="326" width="512" height="44" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="44" y="346" fill="var(--ai-ice)" font-size="10.5" font-weight="600">直接注入 <tspan fill="var(--ai-muted)" font-size="9" font-family="monospace">DIRECT</tspan></text>
    <text x="44" y="362" fill="var(--ai-text)" font-size="9.5">用户在输入框里写——最容易被看见，也最容易被拦</text>
    <rect x="24" y="378" width="512" height="44" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="44" y="398" fill="var(--ai-amber)" font-size="10.5" font-weight="600">间接注入 <tspan fill="var(--ai-muted)" font-size="9" font-family="monospace">INDIRECT</tspan></text>
    <text x="44" y="414" fill="var(--ai-text)" font-size="9.5">藏在网页、邮件、文档、工具描述里——用户根本没看见</text>
    <rect x="24" y="430" width="512" height="44" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="44" y="450" fill="var(--ai-amber)" font-size="10.5" font-weight="600">跨智能体 <tspan fill="var(--ai-muted)" font-size="9" font-family="monospace">HANDOFF</tspan></text>
    <text x="44" y="466" fill="var(--ai-text)" font-size="9.5">上游把污染原文抄进共享文件，下游当权威输入——全程无人报警</text>
    <text x="24" y="486" fill="var(--ai-muted)" font-size="10">关键不是「谁写错了」，而是这三条路都走同一条入口：模型照读。</text>
    <line x1="24" y1="500" x2="536" y2="500" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="522" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 三种「加固」为什么都不算边界</text>
    <rect x="24" y="536" width="160" height="80" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="40" y="556" fill="var(--ai-ice)" font-size="10.5" font-weight="600">提示词加固</text>
    <text x="40" y="572" fill="var(--ai-muted)" font-size="8.5" font-family="monospace">HARDENING</text>
    <text x="40" y="590" fill="var(--ai-text)" font-size="9">「永远别听」</text>
    <text x="40" y="606" fill="var(--ai-text)" font-size="9">依旧是请求</text>
    <rect x="200" y="536" width="160" height="80" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="216" y="556" fill="var(--ai-ice)" font-size="10.5" font-weight="600">分隔符标记</text>
    <text x="216" y="572" fill="var(--ai-muted)" font-size="8.5" font-family="monospace">DELIMITERS</text>
    <text x="216" y="590" fill="var(--ai-text)" font-size="9">标记是信号</text>
    <text x="216" y="606" fill="var(--ai-text)" font-size="9">不是密码学边界</text>
    <rect x="376" y="536" width="160" height="80" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="392" y="556" fill="var(--ai-ice)" font-size="10.5" font-weight="600">关键词检测</text>
    <text x="392" y="572" fill="var(--ai-muted)" font-size="8.5" font-family="monospace">KEYWORDS</text>
    <text x="392" y="590" fill="var(--ai-text)" font-size="9">拦不住，或者</text>
    <text x="392" y="606" fill="var(--ai-text)" font-size="9">用误报淹掉你</text>
    <rect x="24" y="626" width="512" height="46" rx="10" fill="var(--ai-soft)" stroke="var(--ai-amber)"></rect>
    <text x="44" y="646" fill="var(--ai-amber)" font-size="10.5" font-weight="600">12 种已发表防御对抗自适应攻击：多数失守，成功率逾九成</text>
    <text x="44" y="663" fill="var(--ai-muted)" font-size="9.5">结构原因：模型在指令与数据之间没有防火墙，只有一段被训练去理解的文本</text>
    <line x1="24" y1="688" x2="536" y2="688" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="710" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 防线换位置：假设已经读到了</text>
    <rect x="24" y="724" width="160" height="66" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="40" y="744" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">最小工具面</text>
    <text x="40" y="761" fill="var(--ai-text)" font-size="9">只能做工具</text>
    <text x="40" y="777" fill="var(--ai-text)" font-size="9">允许的事</text>
    <rect x="200" y="724" width="160" height="66" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="216" y="744" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">动作前闸门</text>
    <text x="216" y="761" fill="var(--ai-text)" font-size="9">写库、转账、删</text>
    <text x="216" y="777" fill="var(--ai-text)" font-size="9">走额度与审批</text>
    <rect x="376" y="724" width="160" height="66" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="392" y="744" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">结果显式标记</text>
    <text x="392" y="761" fill="var(--ai-text)" font-size="9">日志里看得见</text>
    <text x="392" y="777" fill="var(--ai-text)" font-size="9">哪段不可信</text>
    <line x1="24" y1="804" x2="536" y2="804" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="280" y="822" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">要防的不是读到，是读到之后能做成什么。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：指令与数据拼进同一个窗口 · 中：直接、间接与跨智能体三条到达路径 · 下：三种提示层加固的失效点与移位后的三条防线。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>模型读到的是一段连续文本，里面既有「该做什么」也有「只是内容」，它没有标签可依。于是外部数据一旦被读进窗口，就获得了和用户要求同样的劝说力。加固提示词只是把门槛抬高；真正改变结果的是把权限收紧到工具面、把不可逆动作拦在闸门前，让读到之后也做不成。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s06/prompt-injection/" data-no-popover="true">返回主题 · 提示注入 →</a>
  </nav>
</div>
