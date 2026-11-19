---
title: 有用性检索 · 相似不等于有用
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 检索增强生成）：一张图看懂检索该按「有没有用」打分而不是按「像不像」——认出靠世界知识，排第一靠概率校准。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/rag/" data-no-popover="true">← 返回主题 · 检索增强生成</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-20</span><span>S-05 / 检索增强生成</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="有用性检索信息图：相似度在间接提问上失效、把记忆池逐条按有用性打分、认出与排第一的两段能力拆解、以及端到端结果" xmlns="http://www.w3.org/2000/svg">
      <title>有用性检索 · Similarity Is Not Utility</title>
      <defs>
        <marker id="ur-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 / 检索增强生成</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">有用性检索 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">SIMILARITY IS NOT UTILITY</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">问题里没有一个词，长得像那条答案。</text>
      <text x="24" y="106" fill="var(--ai-ice)" font-size="13" font-weight="600">① 相似度在间接提问上失效 <tspan fill="var(--ai-muted)" font-size="8.5" letter-spacing="1">INDIRECT QUERY</tspan></text>
      <rect x="24" y="116" width="512" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <rect x="38" y="126" width="190" height="30" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="50" y="146" fill="var(--ai-text)" font-size="11">“我对坚果过敏”</text>
      <rect x="240" y="126" width="282" height="30" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="252" y="146" fill="var(--ai-text)" font-size="11">“马卡龙怎么做？”</text>
      <text x="38" y="176" fill="var(--ai-muted)" font-size="10">马卡龙用杏仁粉——这条记忆与问题零字面重合，却必须被召回</text>
      <text x="38" y="196" fill="var(--ai-amber)" font-size="10">相似度把 gold 排到第 1 位：BM25 1.6% · MiniLM 0.0%（InMind 125 题）</text>
      <text x="24" y="240" fill="var(--ai-ice)" font-size="13" font-weight="600">② 换个问法：有没有用，而不是像不像 <tspan fill="var(--ai-muted)" font-size="8.5" letter-spacing="1">FULL-POOL SCORING</tspan></text>
      <rect x="24" y="250" width="512" height="106" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="38" y="272" fill="var(--ai-text)" font-size="10.5">记忆池是有限的 → 不必猜查询，直接对每一条打分：它对这道题有用吗</text>
      <rect x="38" y="284" width="90" height="30" rx="8" fill="var(--ai-soft)" stroke="var(--ai-cyan)" stroke-width="1.6"></rect>
      <text x="83" y="303" text-anchor="middle" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">坚果 0.94</text>
      <rect x="136" y="284" width="90" height="30" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="181" y="303" text-anchor="middle" fill="var(--ai-muted)" font-size="10">改配置 0.07</text>
      <rect x="234" y="284" width="90" height="30" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="279" y="303" text-anchor="middle" fill="var(--ai-muted)" font-size="10">口味 0.31</text>
      <rect x="332" y="284" width="90" height="30" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="377" y="303" text-anchor="middle" fill="var(--ai-muted)" font-size="10">README 0.05</text>
      <rect x="430" y="284" width="90" height="30" rx="8" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="475" y="303" text-anchor="middle" fill="var(--ai-muted)" font-size="10">记录 0.12</text>
      <text x="38" y="334" fill="var(--ai-muted)" font-size="10">打分靠的是世界知识（马卡龙→杏仁粉→坚果），不是字面相似</text>
      <text x="38" y="348" fill="var(--ai-muted)" font-size="10">改写查询这条路走不通：可能的联想是无穷的，记忆池却是有限的</text>
      <text x="24" y="386" fill="var(--ai-ice)" font-size="13" font-weight="600">③ 认出 ≠ 排到第一 <tspan fill="var(--ai-muted)" font-size="8.5" letter-spacing="1">RECOGNIZE VS RANK</tspan></text>
      <rect x="24" y="396" width="512" height="28" rx="6" fill="var(--ai-line-strong)" opacity="0.45"></rect>
      <text x="38" y="415" fill="var(--ai-ice)" font-size="10.5" font-weight="600">同一批 20 道题</text>
      <text x="242" y="415" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5" font-weight="600">top-50 里认得出</text>
      <text x="430" y="415" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5" font-weight="600">排到第 1 位</text>
      <rect x="24" y="428" width="512" height="30" rx="6" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="38" y="448" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">Jev 决策模型</text>
      <text x="242" y="448" text-anchor="middle" fill="var(--ai-text)" font-size="11">90%</text>
      <text x="430" y="448" text-anchor="middle" fill="var(--ai-cyan)" font-size="11" font-weight="600">85%</text>
      <rect x="24" y="462" width="512" height="30" rx="6" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="38" y="482" fill="var(--ai-text)" font-size="10.5">Qwen3.5-9B 生成模型</text>
      <text x="242" y="482" text-anchor="middle" fill="var(--ai-text)" font-size="11">90%</text>
      <text x="430" y="482" text-anchor="middle" fill="var(--ai-amber)" font-size="11" font-weight="600">40%</text>
      <rect x="24" y="496" width="512" height="30" rx="6" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="38" y="516" fill="var(--ai-muted)" font-size="10.5">Laya BERT 决策模型</text>
      <text x="242" y="516" text-anchor="middle" fill="var(--ai-muted)" font-size="11">30%</text>
      <text x="430" y="516" text-anchor="middle" fill="var(--ai-muted)" font-size="11">—</text>
      <rect x="24" y="536" width="512" height="46" rx="10" fill="var(--ai-soft)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="38" y="556" fill="var(--ai-text)" font-size="10.5">认出靠世界知识：两个大模型都能在 top-50 捞回 90%</text>
      <text x="38" y="572" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">排第一靠概率校准：同样捞得到，一个 85%，一个 40%</text>
      <text x="24" y="610" fill="var(--ai-ice)" font-size="13" font-weight="600">④ 只换打分函数，别的一概不动 <tspan fill="var(--ai-muted)" font-size="8.5" letter-spacing="1">RESULTS</tspan></text>
      <rect x="24" y="620" width="250" height="52" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="646" fill="var(--ai-cyan)" font-size="17" font-weight="700">76.0%</text>
      <text x="40" y="662" fill="var(--ai-muted)" font-size="9.5">端到端成功率（此前最好 16.0%）</text>
      <rect x="286" y="620" width="250" height="52" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="302" y="646" fill="var(--ai-text)" font-size="17" font-weight="700">84.0%</text>
      <text x="302" y="662" fill="var(--ai-muted)" font-size="9.5">oracle 上限——距天花板只剩 8 点</text>
      <rect x="24" y="682" width="250" height="52" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="708" fill="var(--ai-text)" font-size="17" font-weight="700">55.4%</text>
      <text x="40" y="724" fill="var(--ai-muted)" font-size="9.5">MemoryAgentBench 四维均分（44.3%）</text>
      <rect x="286" y="682" width="250" height="52" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="302" y="708" fill="var(--ai-amber)" font-size="17" font-weight="700">$0.008</text>
      <text x="302" y="724" fill="var(--ai-muted)" font-size="9.5">每题检索成本：全池打分也付得起</text>
      <text x="24" y="756" fill="var(--ai-muted)" font-size="10">索引、切块、提示词都没动——换掉的只是「拿什么量相关性」。</text>
      <line x1="24" y1="782" x2="536" y2="782" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="280" y="806" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">检索要比的不是「像不像问题」，而是「帮不帮得上答案」。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：间接提问让相似度失效 · 中：全池逐条按有用性打分 · 下：认出与排第一拆成两段能力，以及端到端结果。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>相似度问的是「像不像问题」，有用性问的是「帮不帮得上答案」。马卡龙与坚果过敏零字面重合，却必须被召回；全池逐条打分把 gold 排到第一从 1.6% 提到 84.8%。真正的难点不在认出而在校准——认出靠世界知识，排第一靠概率校准。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/rag/" data-no-popover="true">返回主题 · 检索增强生成 →</a>
  </nav>
</div>
