---
title: 引文失实 · 引文对得上，不等于真用了
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 检索增强生成）：一张图看懂 RAG 的引文为什么可能挂错——模型先凭记忆答完，再挑一条与答案一致的资料挂上去，引文验证查不出来。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/rag/" data-no-popover="true">← 返回主题 · 检索增强生成</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-21</span><span>S-05 / 检索增强生成</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="引文失实信息图：三道校验关卡都通过仍有 1.2% 到 15.7% 的可引用论断来自参数记忆、反事实替换怎么测出来源、以及引文验证为什么查不出来" xmlns="http://www.w3.org/2000/svg">
      <title>引文失实 · Cited but Unused</title>
      <text x="24" y="30" fill="var(--ai-muted)" font-size="11.5" letter-spacing="2" font-family="monospace">DAILY KNOWLEDGE · S-05 / 检索增强生成</text>
      <text x="24" y="62" fill="var(--ai-ice)" font-size="26" font-weight="700">引文失实</text>
      <text x="24" y="86" fill="var(--ai-muted)" font-size="13">引文对得上，不等于真读了那份资料。</text>
      <text x="24" y="120" fill="var(--ai-ice)" font-size="15" font-weight="600">① 三道关卡全过，结论仍可能没读资料</text>
      <rect x="24" y="130" width="512" height="126" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <rect x="38" y="144" width="152" height="34" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="114" y="166" text-anchor="middle" fill="var(--ai-text)" font-size="12.5">接了 RAG 检索</text>
      <rect x="198" y="144" width="152" height="34" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="274" y="166" text-anchor="middle" fill="var(--ai-text)" font-size="12.5">每句都带引文</text>
      <rect x="358" y="144" width="164" height="34" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="440" y="166" text-anchor="middle" fill="var(--ai-text)" font-size="12.5">引文支持校验</text>
      <text x="38" y="202" fill="var(--ai-muted)" font-size="12.5">三关都通过，仍然有相当一部分论断不是从资料里读出来的：</text>
      <text x="38" y="234" fill="var(--ai-amber)" font-size="30" font-weight="700">1.2% – 15.7%</text>
      <text x="238" y="234" fill="var(--ai-text)" font-size="12.5">的可引用论断</text>
      <text x="38" y="252" fill="var(--ai-muted)" font-size="12">实际来自模型自己的参数记忆（ASQA 事实题）</text>
      <text x="24" y="292" fill="var(--ai-ice)" font-size="15" font-weight="600">② 怎么测：把资料里的值换成假的，再问一遍</text>
      <rect x="24" y="302" width="512" height="146" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <rect x="38" y="316" width="222" height="44" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="50" y="336" fill="var(--ai-muted)" font-size="11.5">检索到的原文</text>
      <text x="50" y="352" fill="var(--ai-text)" font-size="12.5">「CEO 是 A」</text>
      <path d="M272 338 L300 338" stroke="var(--ai-cyan)" stroke-width="1.6"></path>
      <path d="M296 333 L303 338 L296 343 Z" fill="var(--ai-cyan)"></path>
      <rect x="310" y="316" width="212" height="44" rx="8" fill="var(--ai-soft)" stroke="var(--ai-cyan)" stroke-width="1.6"></rect>
      <text x="322" y="336" fill="var(--ai-muted)" font-size="11.5">连标题一起替换成假值</text>
      <text x="322" y="352" fill="var(--ai-cyan)" font-size="12.5" font-weight="600">「CEO 是 Z」</text>
      <text x="38" y="386" fill="var(--ai-text)" font-size="13">同一个问题再问一遍，只看它答哪个字：</text>
      <rect x="38" y="396" width="232" height="38" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="154" y="420" text-anchor="middle" fill="var(--ai-cyan)" font-size="13" font-weight="600">答 Z = 真用了资料</text>
      <rect x="290" y="396" width="232" height="38" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="406" y="420" text-anchor="middle" fill="var(--ai-amber)" font-size="13" font-weight="600">答 A = 用的是记忆</text>
      <text x="38" y="452" fill="var(--ai-muted)" font-size="12">来源标签由这次替换构造出来，不靠猜模型内部状态</text>
      <text x="24" y="492" fill="var(--ai-ice)" font-size="15" font-weight="600">③ 为什么引文验证查不出来</text>
      <rect x="24" y="502" width="512" height="180" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <circle cx="46" cy="528" r="9" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></circle>
      <text x="46" y="532" text-anchor="middle" fill="var(--ai-ice)" font-size="11">1</text>
      <text x="66" y="533" fill="var(--ai-text)" font-size="13">先凭记忆把答案写出来，检索到的资料没起作用</text>
      <circle cx="46" cy="566" r="9" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></circle>
      <text x="46" y="570" text-anchor="middle" fill="var(--ai-ice)" font-size="11">2</text>
      <text x="66" y="571" fill="var(--ai-text)" font-size="13">回头挑一条与这个答案一致的资料，挂上引文</text>
      <circle cx="46" cy="604" r="9" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></circle>
      <text x="46" y="608" text-anchor="middle" fill="var(--ai-ice)" font-size="11">3</text>
      <text x="66" y="609" fill="var(--ai-text)" font-size="13">引文「必然支持」结论——这份支持是模型自己配出来的</text>
      <text x="38" y="642" fill="var(--ai-amber)" font-size="22" font-weight="700">0.79 → 0.65</text>
      <text x="176" y="642" fill="var(--ai-text)" font-size="12.5">最好的检测信号，只算它本来就会的题就掉下来</text>
      <text x="38" y="668" fill="var(--ai-muted)" font-size="12">引文验证看到的那份「支持」，与随机猜测无异——模型越大越会这样</text>
      <text x="24" y="716" fill="var(--ai-muted)" font-size="12.5">代价：它量的是「模型知道什么」，不是「模型用了什么」。</text>
      <text x="24" y="740" fill="var(--ai-muted)" font-size="12.5">把这类答案自动标出来并不划算——基率太低，标一个错一个。</text>
      <line x1="24" y1="782" x2="536" y2="782" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="280" y="806" text-anchor="middle" fill="var(--ai-muted)" font-size="13">一句话：<tspan fill="var(--ai-cyan)">引文对得上，不等于真用了那份资料。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：三道校验关卡都通过仍有 1.2%–15.7% 的论断来自记忆 · 中：反事实替换怎么判来源 · 下：引文验证查不出来的结构性原因。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>三道关卡都过了——接了 RAG、每句带引文、引文支持校验——结论仍可能不是从资料里读出来的。把资料里的事实换成假的再问，答假值是真读了，复述原值是用记忆。事实题上这个比例 1.2%–15.7%，模型越大越高。顺序反了：先凭记忆写答案，再挑一条一致的资料挂上，引文按构造必然「支持」。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/rag/" data-no-popover="true">返回主题 · 检索增强生成 →</a>
  </nav>
</div>
