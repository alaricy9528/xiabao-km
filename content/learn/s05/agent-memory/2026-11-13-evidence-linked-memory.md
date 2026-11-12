---
title: 证据链记忆 · 每条经验都要能回查出处
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 智能体记忆）：一张图看懂证据链记忆（evidence-linked memory）——给每条经验挂回产生它的原始轨迹，让智能体在照做之前能先核对。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/agent-memory/" data-no-popover="true">← 返回主题 · 智能体记忆</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-13</span><span>S-05 / 智能体记忆</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="证据链记忆信息图：经验只带结论不带原因、三个指针的结构、何时下钻核对的触发条件与代价" xmlns="http://www.w3.org/2000/svg">
      <title>证据链记忆 · Evidence-Linked Memory</title>
      <defs>
        <marker id="wt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
        <marker id="wt-arrow-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-violet)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 AGENT / 智能体记忆</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">证据链记忆 <tspan fill="var(--ai-violet)" font-size="12" letter-spacing="1.2">EVIDENCE-LINKED</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">记忆能让人变强，也能让人做错本来会做的题——差别只在有没有出处。</text>
      <text x="24" y="110" fill="var(--ai-ice)" font-size="13" font-weight="600">出发点：经验只带结论，不带原因</text>
      <rect x="24" y="126" width="110" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="79" y="150" text-anchor="middle" fill="var(--ai-ice)" font-size="10" font-weight="600">跑任务</text>
      <text x="79" y="166" text-anchor="middle" fill="var(--ai-muted)" font-size="9">记下轨迹</text>
      <rect x="158" y="126" width="110" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="213" y="150" text-anchor="middle" fill="var(--ai-cyan)" font-size="10" font-weight="600">压成经验</text>
      <text x="213" y="166" text-anchor="middle" fill="var(--ai-muted)" font-size="9">只剩成 / 败标签</text>
      <rect x="292" y="126" width="110" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="347" y="150" text-anchor="middle" fill="var(--ai-amber)" font-size="10" font-weight="600">换个任务</text>
      <text x="347" y="166" text-anchor="middle" fill="var(--ai-muted)" font-size="9">直接照做</text>
      <rect x="426" y="126" width="110" height="56" rx="12" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="481" y="150" text-anchor="middle" fill="var(--ai-violet)" font-size="10" font-weight="600">本该做对</text>
      <text x="481" y="166" text-anchor="middle" fill="var(--ai-muted)" font-size="9">却做错了</text>
      <line x1="134" y1="154" x2="158" y2="154" stroke="var(--ai-cyan)" stroke-width="1.2" marker-end="url(#wt-arrow)"></line>
      <line x1="268" y1="154" x2="292" y2="154" stroke="var(--ai-cyan)" stroke-width="1.2" marker-end="url(#wt-arrow)"></line>
      <line x1="402" y1="154" x2="426" y2="154" stroke="var(--ai-cyan)" stroke-width="1.2" marker-end="url(#wt-arrow)"></line>
      <text x="24" y="204" fill="var(--ai-muted)" font-size="10">经验是从「只标了成功或失败」的轨迹里推出来的，交到手上时却不带那条轨迹——</text>
      <text x="24" y="222" fill="var(--ai-muted)" font-size="10">模型手里只有结论，<tspan fill="var(--ai-violet)">没有可以核对的原文</tspan>，只能照做，包括照做错的那条。</text>
      <line x1="24" y1="240" x2="536" y2="240" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="266" fill="var(--ai-ice)" font-size="13" font-weight="600">结构：一条经验的三个指针</text>
      <rect x="24" y="282" width="160" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="40" y="306" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">① 编译摘要</text>
      <text x="40" y="326" fill="var(--ai-muted)" font-size="9.5">这段轨迹为什么成、</text>
      <text x="40" y="344" fill="var(--ai-muted)" font-size="9.5">为什么败——把原因</text>
      <text x="40" y="362" fill="var(--ai-muted)" font-size="9.5">单独写下来。</text>
      <rect x="200" y="282" width="160" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="216" y="306" fill="var(--ai-amber)" font-size="10.5" font-weight="600">② 至多三条洞见</text>
      <text x="216" y="326" fill="var(--ai-muted)" font-size="9.5">短、能读、进首条</text>
      <text x="216" y="344" fill="var(--ai-muted)" font-size="9.5">消息；日常就靠它</text>
      <text x="216" y="362" fill="var(--ai-muted)" font-size="9.5">省掉翻原文。</text>
      <rect x="376" y="282" width="160" height="86" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="392" y="306" fill="var(--ai-green)" font-size="10.5" font-weight="600">③ 原始轨迹指针</text>
      <text x="392" y="326" fill="var(--ai-muted)" font-size="9.5">工具调用、观察、轮次</text>
      <text x="392" y="344" fill="var(--ai-muted)" font-size="9.5">全部留着，记忆只读</text>
      <text x="392" y="362" fill="var(--ai-muted)" font-size="9.5">挂载，随时下钻。</text>
      <text x="24" y="390" fill="var(--ai-muted)" font-size="10">关键发现：那条轨迹里往往还留着能推翻错误经验的证据——所以不必少记，只需记得住出处。</text>
      <text x="24" y="408" fill="var(--ai-muted)" font-size="10">另加一道指纹校验：配置、提示词或 commit 一变就拒绝读取，防止拿到过期语料。</text>
      <line x1="24" y1="426" x2="536" y2="426" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="452" fill="var(--ai-ice)" font-size="13" font-weight="600">什么时候往下钻：三个触发条件</text>
      <rect x="24" y="468" width="160" height="80" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="40" y="492" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">缺细节</text>
      <text x="40" y="512" fill="var(--ai-muted)" font-size="9.5">这条经验不够</text>
      <text x="40" y="530" fill="var(--ai-muted)" font-size="9.5">照着做。</text>
      <rect x="200" y="468" width="160" height="80" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="216" y="492" fill="var(--ai-amber)" font-size="10.5" font-weight="600">互相冲突</text>
      <text x="216" y="512" fill="var(--ai-muted)" font-size="9.5">两条经验打架，</text>
      <text x="216" y="530" fill="var(--ai-muted)" font-size="9.5">得回到源头。</text>
      <rect x="376" y="468" width="160" height="80" rx="12" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="392" y="492" fill="var(--ai-violet)" font-size="10.5" font-weight="600">来自失败任务</text>
      <text x="392" y="512" fill="var(--ai-muted)" font-size="9.5">那次成功可能</text>
      <text x="392" y="530" fill="var(--ai-muted)" font-size="9.5">只是例外。</text>
      <text x="24" y="572" fill="var(--ai-muted)" font-size="10">下钻率：简单任务 22%，难任务 44%；一旦下钻，<tspan fill="var(--ai-cyan)">43% 的情况改变了原计划</tspan>——</text>
      <text x="24" y="590" fill="var(--ai-muted)" font-size="10">24% 修订了经验、14% 补上细节、4% 补出经验里根本没有的事实。</text>
      <text x="24" y="608" fill="var(--ai-muted)" font-size="10">最有分量的对比：卡住之后再下钻，比只给经验高 17.3 分；而例行预检只高 3.4 分。</text>
      <line x1="24" y1="626" x2="536" y2="626" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="652" fill="var(--ai-ice)" font-size="13" font-weight="600">代价与边界</text>
      <rect x="24" y="668" width="250" height="78" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="40" y="692" fill="var(--ai-green)" font-size="10.5" font-weight="600">换来什么（五个 agentic 基准）</text>
      <text x="40" y="712" fill="var(--ai-muted)" font-size="9.5">平均比无记忆高 10.7 分、比只给经验高 3.2 分；</text>
      <text x="40" y="730" fill="var(--ai-muted)" font-size="9.5">回归率 6.5%→4.5%，测试时成本 1.17 倍。</text>
      <rect x="286" y="668" width="250" height="78" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="302" y="692" fill="var(--ai-amber)" font-size="10.5" font-weight="600">还没解决什么</text>
      <text x="302" y="712" fill="var(--ai-muted)" font-size="9.5">所有洞见都进首条消息，prompt 随记忆变长；</text>
      <text x="302" y="730" fill="var(--ai-muted)" font-size="9.5">超大记忆怎么检索仍是开放问题。</text>
      <text x="24" y="766" fill="var(--ai-muted)" font-size="10">标签只有成 / 败两种，失败原因由 LLM 判官读推理标注——它描述的是「推理里说的原因」，</text>
      <text x="24" y="782" fill="var(--ai-muted)" font-size="10">不是真实原因。失败过的做法：先只给索引让模型自己决定开不开，结果它常看摘要就动手。</text>
      <text x="280" y="808" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-violet)">记忆要带收据——不是记得少，而是每条都回得去。</tspan></text>
      <text x="24" y="826" fill="var(--ai-muted)" font-size="9" font-family="monospace">SOURCE: ARXIV 2611.14320 · KAIST × DEEPAUTO.AI</text>
    </svg>
    <figcaption class="ai-kp__cap">上：经验只带成败标签、不带产生它的轨迹 · 中：一条经验的三个指针与三个下钻触发条件 · 下：换来什么、还缺什么。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>智能体把过去任务压成几条经验，只带「成 / 败」标签、不带产生它的轨迹，于是照着错经验把会做的题做错。证据链记忆给每条经验挂回原始轨迹：缺细节、互相冲突或来自失败任务时才下钻核对——回归率 6.5%→4.5%，代价 1.17 倍测试开销。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/agent-memory/" data-no-popover="true">返回主题 · 智能体记忆 →</a>
  </nav>
</div>
