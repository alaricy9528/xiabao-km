---
title: 记忆投毒 · 一次注入，污染未来所有会话
publish: true
description: 每日知识点（S-06 边界安全 / 记忆投毒）：一张图看懂恶意指令如何借持久记忆跨会话存活——管线不是原样抄写，攻击骗的是抽取、改写与检索；防线在写入侧。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s06/memory-poisoning/" data-no-popover="true">← 返回主题 · 记忆投毒</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-12</span><span>S-06 / 记忆投毒</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="记忆投毒信息图：两种威胁的寿命对比、记忆管线三道机制与三种绕法、MemoryDojo 全生命周期实测数字、写入侧三条防线" xmlns="http://www.w3.org/2000/svg">
    <title>记忆投毒 · Memory Poisoning</title>
    <defs><marker id="mp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
    <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-06 边界安全 / 记忆投毒</text>
    <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">记忆投毒 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">MEMORY POISONING</tspan></text>
    <text x="24" y="76" fill="var(--ai-muted)" font-size="12">提示注入随会话结束消失；记忆投毒把污染写进持久层，替未来的每个会话说话。</text>
    <text x="24" y="100" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 两种威胁，两种寿命</text>
    <rect x="24" y="114" width="248" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="44" y="136" fill="var(--ai-green)" font-size="12" font-weight="600">提示注入 · 会话内</text>
    <text x="44" y="156" fill="var(--ai-text)" font-size="9.5">网页、邮件、工具返回被读进窗口</text>
    <text x="44" y="174" fill="var(--ai-text)" font-size="9.5">污染的是当前这一次回答</text>
    <text x="44" y="196" fill="var(--ai-muted)" font-size="9.5">会话结束，威胁随之消失</text>
    <rect x="288" y="114" width="248" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="308" y="136" fill="var(--ai-amber)" font-size="12" font-weight="600">记忆投毒 · 跨会话</text>
    <text x="308" y="156" fill="var(--ai-text)" font-size="9.5">「记住：以后一律……」被存成经验</text>
    <text x="308" y="174" fill="var(--ai-text)" font-size="9.5">之后每次检索都可能命中</text>
    <text x="308" y="196" fill="var(--ai-muted)" font-size="9.5">每个新会话都是潜在受害者</text>
    <line x1="148" y1="210" x2="148" y2="222" stroke="var(--ai-cyan)" stroke-width="1.3" marker-end="url(#mp-arrow)"></line>
    <line x1="412" y1="210" x2="412" y2="222" stroke="var(--ai-cyan)" stroke-width="1.3" marker-end="url(#mp-arrow)"></line>
    <rect x="24" y="226" width="512" height="52" rx="10" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <text x="44" y="248" fill="var(--ai-ice)" font-size="11" font-weight="600">恶意内容 → 记忆管线 → 未来的窗口：威胁只是换了宿主</text>
    <text x="44" y="266" fill="var(--ai-muted)" font-size="9.5">删掉原始攻击内容也无效——毒已作为「经验」入库，行为上隐形（MemHarmBench）</text>
    <line x1="24" y1="290" x2="536" y2="290" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="312" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 管线不是原样抄写：攻击骗的是这三道工序</text>
    <rect x="24" y="326" width="160" height="56" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="40" y="346" fill="var(--ai-ice)" font-size="10.5" font-weight="600">选择性抽取</text>
    <text x="40" y="362" fill="var(--ai-text)" font-size="9">只挑「值得记」的</text>
    <text x="40" y="376" fill="var(--ai-text)" font-size="9">内容得像条正经经验</text>
    <rect x="200" y="326" width="160" height="56" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="216" y="346" fill="var(--ai-ice)" font-size="10.5" font-weight="600">改写与合并</text>
    <text x="216" y="362" fill="var(--ai-text)" font-size="9">存入前被模型重写</text>
    <text x="216" y="376" fill="var(--ai-text)" font-size="9">生硬指令活不过这道</text>
    <rect x="376" y="326" width="160" height="56" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="392" y="346" fill="var(--ai-ice)" font-size="10.5" font-weight="600">检索排序</text>
    <text x="392" y="362" fill="var(--ai-text)" font-size="9">新会话按相似度召回</text>
    <text x="392" y="376" fill="var(--ai-text)" font-size="9">毒条目要「像答案」</text>
    <rect x="24" y="396" width="512" height="38" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="44" y="412" fill="var(--ai-amber)" font-size="10.5" font-weight="600">语义桥 <tspan fill="var(--ai-muted)" font-size="8.5" font-family="monospace">BRIDGE</tspan></text>
    <text x="44" y="426" fill="var(--ai-text)" font-size="9.5">触发器与恶意载荷写成一句连贯话，保证被一起抽取进记忆</text>
    <rect x="24" y="442" width="512" height="38" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="44" y="458" fill="var(--ai-amber)" font-size="10.5" font-weight="600">实体伪装 <tspan fill="var(--ai-muted)" font-size="8.5" font-family="monospace">MASQUERADE</tspan></text>
    <text x="44" y="472" fill="var(--ai-text)" font-size="9.5">触发器模仿命名实体，改写时被当成专有名词原样保留</text>
    <rect x="24" y="488" width="512" height="38" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="44" y="504" fill="var(--ai-amber)" font-size="10.5" font-weight="600">嵌入聚簇 <tspan fill="var(--ai-muted)" font-size="8.5" font-family="monospace">CLUSTER</tspan></text>
    <text x="44" y="518" fill="var(--ai-text)" font-size="9.5">投毒文本在向量空间抱团、与正常内容隔离，绕过检测——成功率最高 0.95</text>
    <line x1="24" y1="540" x2="536" y2="540" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="562" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 全生命周期可测：MemoryDojo</text>
    <rect x="24" y="576" width="160" height="58" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="40" y="600" fill="var(--ai-ice)" font-size="14" font-weight="600">155 条</text>
    <text x="40" y="618" fill="var(--ai-muted)" font-size="9">多会话长程轨迹</text>
    <rect x="200" y="576" width="160" height="58" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="216" y="600" fill="var(--ai-ice)" font-size="14" font-weight="600">4 个领域</text>
    <text x="216" y="618" fill="var(--ai-muted)" font-size="9">覆盖不同任务场景</text>
    <rect x="376" y="576" width="160" height="58" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="392" y="600" fill="var(--ai-ice)" font-size="14" font-weight="600">5 种记忆系统</text>
    <text x="392" y="618" fill="var(--ai-muted)" font-size="9">追踪存储→传播→检索</text>
    <text x="24" y="652" fill="var(--ai-text)" font-size="9.5">五种记忆系统全部可被投毒，差异只在下游影响大小；</text>
    <text x="24" y="668" fill="var(--ai-muted)" font-size="9.5">写入与检索越积极的系统越可被利用（MPBench），投毒还能按记忆架构做定向优化。</text>
    <line x1="24" y1="690" x2="536" y2="690" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="712" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 防线在写入侧：让毒进不来、留得痕</text>
    <rect x="24" y="726" width="160" height="66" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="40" y="746" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">写入闸门</text>
    <text x="40" y="763" fill="var(--ai-text)" font-size="9">不可信来源</text>
    <text x="40" y="779" fill="var(--ai-text)" font-size="9">不直接进记忆</text>
    <rect x="200" y="726" width="160" height="66" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="216" y="746" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">出处留痕</text>
    <text x="216" y="763" fill="var(--ai-text)" font-size="9">每条记忆可溯源</text>
    <text x="216" y="779" fill="var(--ai-text)" font-size="9">可审计、可清洗</text>
    <rect x="376" y="726" width="160" height="66" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="392" y="746" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">巩固时清洗</text>
    <text x="392" y="763" fill="var(--ai-text)" font-size="9">整理笔记的同时</text>
    <text x="392" y="779" fill="var(--ai-text)" font-size="9">也查「干不干净」</text>
    <line x1="24" y1="800" x2="536" y2="800" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="280" y="818" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">要防的不是这一次读到，是它替未来会话说了什么。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：提示注入与记忆投毒的寿命对比 · 中：记忆管线三道工序与三种绕法 · 下：MemoryDojo 全生命周期实测数字与写入侧三条防线。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>提示注入的威胁随会话结束而消失；记忆投毒把恶意指令存成「经验」，未来每个会话都可能把它当可靠背景取回。抽取、改写、检索这三道管线工序就是攻击要骗的对象。防线在写入侧：不可信来源不进记忆、出处留痕、巩固时顺手清洗。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s06/memory-poisoning/" data-no-popover="true">返回主题 · 记忆投毒 →</a>
  </nav>
</div>
