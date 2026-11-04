---
title: 智能体记忆 · 记住什么，比记住多少更重要
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 智能体记忆）：一张图看懂记忆与上下文窗口的分工——三层记忆各管什么、写读忘三个动作，以及为什么「检索到」不等于「用对了」。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/agent-memory/" data-no-popover="true">← 返回主题 · 智能体记忆</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-05</span><span>S-05 / 智能体记忆</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="智能体记忆信息图：上下文窗口与记忆库两层账、工作记忆情节记忆语义记忆三层、写读忘三个动作，以及检索到不等于用对的失效" xmlns="http://www.w3.org/2000/svg">
      <title>智能体记忆 · Agent Memory</title>
      <defs><marker id="mem-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
      <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 推理、智能体与记忆 / 智能体记忆</text>
      <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">智能体记忆 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">AGENT MEMORY</tspan></text>
      <text x="24" y="76" fill="var(--ai-muted)" font-size="12">记忆不是把上下文拉长，是另开一套存储——写什么、怎么找、何时忘。</text>
      <text x="24" y="104" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 两层不同的账：工作台与仓库</text>
      <rect x="24" y="116" width="252" height="140" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">上下文窗口 · 工作台</text>
      <text x="40" y="164" fill="var(--ai-text)" font-size="9.5">只对「这一次」有效</text>
      <text x="40" y="184" fill="var(--ai-text)" font-size="9.5">会话一结束就没了</text>
      <text x="40" y="204" fill="var(--ai-text)" font-size="9.5">每走一步都全量重写一遍</text>
      <text x="40" y="224" fill="var(--ai-muted)" font-size="9.5">越长，注意力越被稀释</text>
      <text x="40" y="244" fill="var(--ai-muted)" font-size="9.5">想拉长只能花钱买位置</text>
      <rect x="288" y="116" width="248" height="140" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="304" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">记忆库 · 仓库</text>
      <text x="304" y="164" fill="var(--ai-text)" font-size="9.5">对「下一次」也还算数</text>
      <text x="304" y="184" fill="var(--ai-text)" font-size="9.5">要写入、要检索、要淘汰</text>
      <text x="304" y="204" fill="var(--ai-text)" font-size="9.5">每次只取回相关的一小撮</text>
      <text x="304" y="224" fill="var(--ai-amber)" font-size="9.5">带时间、带来源，才可追溯</text>
      <text x="304" y="244" fill="var(--ai-muted)" font-size="9.5">拉长的是时间，不是位置</text>
      <text x="24" y="274" fill="var(--ai-muted)" font-size="10.5">左边解决「这一次想得清」，右边解决「下一次还记得」——两笔账混着记，必然有一头崩。</text>
      <line x1="24" y1="286" x2="536" y2="286" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="306" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 记忆分三层：越往上越短，越往下越持久</text>
      <rect x="24" y="318" width="512" height="146" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <rect x="40" y="330" width="480" height="34" rx="8" fill="var(--ai-soft)" stroke="var(--ai-cyan)" stroke-width="1.1"></rect>
      <text x="54" y="352" fill="var(--ai-ice)" font-size="10.5" font-weight="600">工作记忆</text>
      <text x="126" y="352" fill="var(--ai-text)" font-size="9.5">当前窗口里的几件事，用完即弃</text>
      <text x="470" y="352" fill="var(--ai-muted)" font-size="8.5" font-family="monospace">WORKING</text>
      <line x1="280" y1="364" x2="280" y2="374" stroke="var(--ai-cyan)" stroke-width="1.5" marker-end="url(#mem-arrow)"></line>
      <rect x="40" y="374" width="480" height="34" rx="8" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="54" y="396" fill="var(--ai-ice)" font-size="10.5" font-weight="600">情节记忆</text>
      <text x="126" y="396" fill="var(--ai-text)" font-size="9.5">发生过什么，带时间与上下文原貌</text>
      <text x="470" y="396" fill="var(--ai-muted)" font-size="8.5" font-family="monospace">EPISODIC</text>
      <line x1="280" y1="408" x2="280" y2="418" stroke="var(--ai-cyan)" stroke-width="1.5" marker-end="url(#mem-arrow)"></line>
      <rect x="40" y="418" width="480" height="34" rx="8" fill="var(--ai-panel)" stroke="var(--ai-violet)" stroke-width="1.1"></rect>
      <text x="54" y="440" fill="var(--ai-ice)" font-size="10.5" font-weight="600">语义记忆</text>
      <text x="126" y="440" fill="var(--ai-text)" font-size="9.5">提炼出的事实、偏好、约定，跨会话复用</text>
      <text x="470" y="440" fill="var(--ai-muted)" font-size="8.5" font-family="monospace">SEMANTIC</text>
      <text x="24" y="480" fill="var(--ai-muted)" font-size="10.5">三层靠三个动作连起来：<tspan fill="var(--ai-cyan)">写</tspan>（要不要存）·<tspan fill="var(--ai-cyan)">读</tspan>（怎么找回来）·<tspan fill="var(--ai-cyan)">忘</tspan>（哪条已经不算数）。</text>
      <line x1="24" y1="492" x2="536" y2="492" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="512" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 真正的失效：检索到，不等于用对了</text>
      <rect x="24" y="524" width="512" height="116" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="548" fill="var(--ai-green)" font-size="11.5" font-weight="600">「找到」与「用上」是两件事</text>
      <text x="40" y="572" fill="var(--ai-text)" font-size="9.5">离线夹具：召回 1.000</text>
      <text x="40" y="592" fill="var(--ai-amber)" font-size="9.5">真实十场景：任务成功 0.60</text>
      <text x="40" y="616" fill="var(--ai-muted)" font-size="9.5">检索对了，不等于决策时真的参考了它</text>
      <line x1="272" y1="536" x2="272" y2="628" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="3 4"></line>
      <text x="288" y="548" fill="var(--ai-amber)" font-size="11.5" font-weight="600">过期 ≠ 无关</text>
      <text x="288" y="572" fill="var(--ai-text)" font-size="9.5">旧偏好对检索高度相关</text>
      <text x="288" y="592" fill="var(--ai-text)" font-size="9.5">但对下一步判断已经是错的</text>
      <text x="288" y="616" fill="var(--ai-muted)" font-size="9.5">失效是安静的：不报错、不怀疑</text>
      <text x="24" y="656" fill="var(--ai-muted)" font-size="10.5">所以评价记忆不能只看召回率，要看「这条记忆有没有改变那一步的决定」。</text>
      <line x1="24" y1="668" x2="536" y2="668" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="688" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 换来什么，没换什么</text>
      <rect x="24" y="700" width="250" height="78" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
      <text x="44" y="722" fill="var(--ai-green)" font-size="11.5" font-weight="600">换来：连续性</text>
      <text x="44" y="742" fill="var(--ai-text)" font-size="9.5">跨会话接着上次往下做</text>
      <text x="44" y="762" fill="var(--ai-muted)" font-size="9.5">成本从「全量」变成「一小撮」</text>
      <rect x="286" y="700" width="250" height="78" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
      <text x="306" y="722" fill="var(--ai-amber)" font-size="11.5" font-weight="600">没换：判断仍在</text>
      <text x="306" y="742" fill="var(--ai-text)" font-size="9.5">写什么、何时忘，仍是取舍</text>
      <text x="306" y="762" fill="var(--ai-muted)" font-size="9.5">删了源，不等于删干净派生片段</text>
      <line x1="24" y1="788" x2="536" y2="788" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="280" y="808" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">窗口决定这一次能想多清，记忆决定下一次还认不认得你。</tspan></text>
      <text x="280" y="824" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">2026 年的新证据在往同一处收：切分单元从「固定时间窗」换成「应用与事件」，召回才变成真的记得。</text>
    </svg>
    <figcaption class="ai-kp__cap">上：上下文窗口与记忆库是两笔账 · 中：工作/情节/语义三层与写读忘三个动作 · 下：检索到不等于用对，以及换来与没换。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>上下文窗口是工作台，记忆是仓库：前者关了就没，后者要写入、检索、淘汰。三层里工作记忆管当下，情节记忆留原始经过，语义记忆沉淀结论。真正难的不是存多少，而是记住什么、何时该忘，以及找到之后有没有真的用上。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/agent-memory/" data-no-popover="true">返回主题 · 智能体记忆 →</a>
  </nav>
</div>
