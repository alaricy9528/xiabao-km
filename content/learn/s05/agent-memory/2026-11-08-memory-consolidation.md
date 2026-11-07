---
title: 记忆巩固 · 空闲时改自己的笔记
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 智能体记忆）：一张图看懂记忆巩固（dreaming）——智能体空闲时对照原始会话记录，修正自己写过的笔记。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/agent-memory/" data-no-popover="true">← 返回主题 · 智能体记忆</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-08</span><span>S-05 / 智能体记忆</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="记忆巩固信息图：四层记忆结构与 dreaming 修正循环——空闲时对照原始记录改自己的笔记" xmlns="http://www.w3.org/2000/svg">
      <title>记忆巩固 · Memory Consolidation</title>
      <defs>
        <marker id="mc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
        <marker id="mc-arrow-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-violet)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 AGENT / 智能体记忆</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">记忆巩固 <tspan fill="var(--ai-violet)" font-size="12.5" letter-spacing="1.5">DREAMING</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">写与读之外的第三个动作：空闲时对照原始记录，修正自己写过的笔记。</text>
      <text x="24" y="112" fill="var(--ai-ice)" font-size="13" font-weight="600">出发点：会话里写的笔记不会自己变对</text>
      <text x="24" y="134" fill="var(--ai-muted)" font-size="10">笔记可能一开始就错，也可能随环境变化过时——而后面的会话照样会信它；</text>
      <text x="24" y="152" fill="var(--ai-muted)" font-size="10">一条错误笔记若进了顶层注入区，还会<tspan fill="var(--ai-violet)">进入每一个新会话</tspan>。</text>
      <line x1="24" y1="172" x2="536" y2="172" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="198" fill="var(--ai-ice)" font-size="13" font-weight="600">记忆的四层：底层是事实，顶层要小</text>
      <rect x="24" y="214" width="512" height="44" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="40" y="232" fill="var(--ai-amber)" font-size="11" font-weight="600">④ 注入上下文 · 每个新会话预载</text>
      <text x="40" y="250" fill="var(--ai-muted)" font-size="9.5">必须小——它是索引不是全量，错一条污染全部会话</text>
      <rect x="24" y="264" width="512" height="44" rx="10" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="40" y="282" fill="var(--ai-violet)" font-size="11" font-weight="600">③ 记忆表示 · wiki 等由下层算出</text>
      <text x="40" y="300" fill="var(--ai-muted)" font-size="9.5">整理主题、互相链接，是查找记忆的地图，也要持续维护</text>
      <rect x="24" y="314" width="512" height="44" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="40" y="332" fill="var(--ai-cyan)" font-size="11" font-weight="600">② 记忆笔记 · 会话中随手写</text>
      <text x="40" y="350" fill="var(--ai-muted)" font-size="9.5">对未来的预测：写下一条规则，就是赌它会再次用上</text>
      <rect x="24" y="364" width="512" height="44" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="382" fill="var(--ai-ice)" font-size="11" font-weight="600">① 会话记录 · 可搜索的原始日志</text>
      <text x="40" y="400" fill="var(--ai-muted)" font-size="9.5">事实来源（ground truth）：核对笔记对不对，只能回到这里</text>
      <text x="24" y="430" fill="var(--ai-muted)" font-size="10">dreaming 就是拿着底层的原文<tspan fill="var(--ai-violet)">逐层向上修</tspan>：改笔记、重建 wiki、重选注入内容。</text>
      <line x1="24" y1="448" x2="536" y2="448" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="474" fill="var(--ai-ice)" font-size="13" font-weight="600">修正循环：空闲时做，不占会话</text>
      <rect x="24" y="490" width="122" height="64" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="85" y="516" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5" font-weight="600">读原始日志</text>
      <text x="85" y="536" text-anchor="middle" fill="var(--ai-muted)" font-size="9">对照底层记录</text>
      <rect x="154" y="490" width="122" height="64" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="215" y="516" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5" font-weight="600">找错改写</text>
      <text x="215" y="536" text-anchor="middle" fill="var(--ai-muted)" font-size="9">修正或删除笔记</text>
      <rect x="284" y="490" width="122" height="64" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="345" y="516" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5" font-weight="600">补建表示</text>
      <text x="345" y="536" text-anchor="middle" fill="var(--ai-muted)" font-size="9">索引、wiki、去重</text>
      <rect x="414" y="490" width="122" height="64" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="475" y="516" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5" font-weight="600">决定预载</text>
      <text x="475" y="536" text-anchor="middle" fill="var(--ai-muted)" font-size="9">下个会话装什么</text>
      <line x1="146" y1="522" x2="154" y2="522" stroke="var(--ai-cyan)" stroke-width="1.2" marker-end="url(#mc-arrow)"></line>
      <line x1="276" y1="522" x2="284" y2="522" stroke="var(--ai-cyan)" stroke-width="1.2" marker-end="url(#mc-arrow)"></line>
      <line x1="406" y1="522" x2="414" y2="522" stroke="var(--ai-cyan)" stroke-width="1.2" marker-end="url(#mc-arrow)"></line>
      <path d="M 475 554 L 475 570 L 85 570 L 85 558" fill="none" stroke="var(--ai-violet)" stroke-width="1.2" stroke-dasharray="4 4" marker-end="url(#mc-arrow-v)"></path>
      <text x="280" y="584" text-anchor="middle" fill="var(--ai-violet)" font-size="9.5">随记忆被使用的频率安排下一轮整理，而不是全量复查</text>
      <line x1="24" y1="600" x2="536" y2="600" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="626" fill="var(--ai-ice)" font-size="13" font-weight="600">证据怎么读（Anthropic，2026-11-06）</text>
      <rect x="24" y="640" width="160" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="104" y="672" text-anchor="middle" fill="var(--ai-cyan)" font-size="14" font-weight="700" font-family="monospace">0.655→0.838</text>
      <text x="104" y="692" text-anchor="middle" fill="var(--ai-muted)" font-size="9">CL-Bench 数据库任务</text>
      <text x="104" y="708" text-anchor="middle" fill="var(--ai-muted)" font-size="9">Opus 5.5 带记忆库后</text>
      <rect x="200" y="640" width="160" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="280" y="672" text-anchor="middle" fill="var(--ai-violet)" font-size="14" font-weight="700" font-family="monospace">9 vs 413</text>
      <text x="280" y="692" text-anchor="middle" fill="var(--ai-muted)" font-size="9">9 个文件 4 徽章 vs 413 个文件 1 徽章</text>
      <text x="280" y="708" text-anchor="middle" fill="var(--ai-muted)" font-size="9">记忆是预测，不是事件归档</text>
      <rect x="376" y="640" width="160" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="456" y="672" text-anchor="middle" fill="var(--ai-green)" font-size="14" font-weight="700" font-family="monospace">13%→48%</text>
      <text x="456" y="692" text-anchor="middle" fill="var(--ai-muted)" font-size="9">35 万文件语料建 wiki</text>
      <text x="456" y="708" text-anchor="middle" fill="var(--ai-muted)" font-size="9">128 个整理会话后 25 题覆盖</text>
      <text x="24" y="750" fill="var(--ai-muted)" font-size="10">记忆收益随模型代际递增：弱模型写「未验证的猜测」，强模型写「带验证依据的规则」。</text>
      <text x="24" y="768" fill="var(--ai-muted)" font-size="10">硬规则会帮倒忙：「只记录失败」这类指令反而削掉强模型的大半记忆收益。</text>
      <text x="280" y="800" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-violet)">记忆不是写下就完，要回头对着原文改。</tspan></text>
      <text x="24" y="824" fill="var(--ai-muted)" font-size="9" font-family="monospace">SOURCE: ANTHROPIC ENGINEERING BLOG · THE COMPONENTS OF AGENT MEMORY</text>
    </svg>
    <figcaption class="ai-kp__cap">上：四层记忆，底层原文是事实来源 · 中：空闲时读日志→改笔记→建表示→定预载的修正循环 · 下：三个实测数字与代价。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>会话中随手写的笔记可能一开始就错，也可能过时，而后面的会话照样会信它。记忆巩固让智能体在空闲时重读自己的会话记录，对照原始日志修正笔记、重建索引，再决定下个会话预载什么——原始记录是事实来源，必须保留在底层。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/agent-memory/" data-no-popover="true">返回主题 · 智能体记忆 →</a>
  </nav>
</div>
