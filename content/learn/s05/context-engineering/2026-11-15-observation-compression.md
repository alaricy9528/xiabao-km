---
title: 观察压缩 · 压得好不好，由下一步动作说了算
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 上下文工程）：一张图看懂 CoACT 的观察压缩——评价函数从「像不像原文」换成「下一步动作变不变」，token 省 33% 分数还涨。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/context-engineering/" data-no-popover="true">← 返回主题 · 上下文工程</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-15</span><span>S-05 / 上下文工程</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="观察压缩信息图：观察占 token 大头、改历史与压新观察两条路线、NAP 下一步动作保持判据、实测数字与反例" xmlns="http://www.w3.org/2000/svg">
      <title>观察压缩 · Observation Compression（CoACT）</title>
      <defs>
        <marker id="oc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker>
        <marker id="oc-arrow-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-violet)"></path></marker>
      </defs>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 推理、智能体与记忆 / 上下文工程</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">观察压缩 <tspan fill="var(--ai-violet)" font-size="11" letter-spacing="1.3">OBSERVATION COMPRESSION</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">agent 最贵的不是思考，是读环境——近一半 token 花在观察上。</text>
      <text x="24" y="110" fill="var(--ai-ice)" font-size="13" font-weight="600">① 钱花在哪：观察占 token 的大头</text>
      <text x="24" y="134" fill="var(--ai-muted)" font-size="10">SWE-bench Verified</text>
      <rect x="170" y="122" width="300" height="16" rx="8" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <rect x="170" y="122" width="137" height="16" rx="8" fill="var(--ai-cyan)"></rect>
      <text x="478" y="134" fill="var(--ai-cyan)" font-size="11" font-weight="700">45.7%</text>
      <text x="24" y="164" fill="var(--ai-muted)" font-size="10">Terminal-Bench（最高）</text>
      <rect x="170" y="152" width="300" height="16" rx="8" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <rect x="170" y="152" width="203" height="16" rx="8" fill="var(--ai-violet)"></rect>
      <text x="478" y="164" fill="var(--ai-violet)" font-size="11" font-weight="700">67.8%</text>
      <text x="24" y="192" fill="var(--ai-muted)" font-size="10">观察 = 文件内容、搜索结果、报错日志——每一步都要整段重新带上。</text>
      <text x="24" y="210" fill="var(--ai-muted)" font-size="10">难点：删掉的内容后面还会不会被用到，压缩时<tspan fill="var(--ai-ice)">事先不知道</tspan>。</text>
      <line x1="24" y1="228" x2="536" y2="228" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="254" fill="var(--ai-ice)" font-size="13" font-weight="600">② 两条路线：动不动历史，账完全不同</text>
      <rect x="24" y="268" width="248" height="106" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)"></rect>
      <text x="40" y="290" fill="var(--ai-amber)" font-size="10.5" font-weight="600">改写历史（窗口/回看自删）</text>
      <text x="40" y="312" fill="var(--ai-muted)" font-size="9.5">旧 KV Cache 失效，要重新预填充；</text>
      <text x="40" y="330" fill="var(--ai-muted)" font-size="9.5">token 少了，钱未必少——实测叠加</text>
      <text x="40" y="348" fill="var(--ai-muted)" font-size="9.5">AgentDiet 估算费用</text>
      <text x="40" y="366" fill="var(--ai-amber)" font-size="10.5" font-weight="700">41.26 → 45.65 美元反涨</text>
      <rect x="288" y="268" width="248" height="106" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="304" y="290" fill="var(--ai-green)" font-size="10.5" font-weight="600">压新观察（CoACT 路线）</text>
      <text x="304" y="312" fill="var(--ai-muted)" font-size="9.5">历史原封不动，缓存照常复用；</text>
      <text x="304" y="330" fill="var(--ai-muted)" font-size="9.5">观察进入上下文之前先压一道，</text>
      <text x="304" y="348" fill="var(--ai-muted)" font-size="9.5">压缩器是 4B 级轻量小模型，</text>
      <text x="304" y="366" fill="var(--ai-muted)" font-size="9.5">省下的是主模型每一步的重读。</text>
      <line x1="24" y1="392" x2="536" y2="392" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="418" fill="var(--ai-ice)" font-size="13" font-weight="600">③ 判据换成 NAP：下一步动作保持</text>
      <rect x="24" y="432" width="172" height="88" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="110" y="456" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5" font-weight="600">原始观察</text>
      <text x="110" y="476" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">同目标 · 同历史</text>
      <text x="110" y="494" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">读原文</text>
      <rect x="364" y="432" width="172" height="88" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="450" y="456" text-anchor="middle" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">压缩观察</text>
      <text x="450" y="476" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">同目标 · 同历史</text>
      <text x="450" y="494" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">读压缩版</text>
      <line x1="110" y1="520" x2="248" y2="546" stroke="var(--ai-line-strong)" stroke-width="1.3" marker-end="url(#oc-arrow-v)"></line>
      <line x1="450" y1="520" x2="312" y2="546" stroke="var(--ai-cyan)" stroke-width="1.3" marker-end="url(#oc-arrow)"></line>
      <text x="130" y="540" fill="var(--ai-muted)" font-size="9.5">→ 下一步动作 A</text>
      <text x="312" y="540" fill="var(--ai-muted)" font-size="9.5">→ 下一步动作 A′</text>
      <rect x="204" y="552" width="152" height="44" rx="10" fill="var(--ai-soft)" stroke="var(--ai-green)"></rect>
      <text x="280" y="572" text-anchor="middle" fill="var(--ai-green)" font-size="10.5" font-weight="700">A == A′ ？</text>
      <text x="280" y="589" text-anchor="middle" fill="var(--ai-muted)" font-size="8.5">相等才算压对（逐次可检）</text>
      <text x="24" y="618" fill="var(--ai-muted)" font-size="10">动作按<tspan fill="var(--ai-ice)">操作类型 + 目标文件 + 读取范围</tspan>比较，写法不同读同一段算同一个；</text>
      <text x="24" y="636" fill="var(--ai-muted)" font-size="10">不看像不像原文——agent 读观察是为了决定下一步，不是复述它。</text>
      <line x1="24" y1="654" x2="536" y2="654" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="680" fill="var(--ai-ice)" font-size="13" font-weight="600">④ 实测：省三分之一，分数还涨了</text>
      <rect x="24" y="694" width="122" height="74" rx="11" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="36" y="722" fill="var(--ai-cyan)" font-size="16" font-weight="700">−33.0%</text>
      <text x="36" y="742" fill="var(--ai-muted)" font-size="9">总 token</text>
      <text x="36" y="756" fill="var(--ai-muted)" font-size="9">三模型平均</text>
      <rect x="146" y="694" width="122" height="74" rx="11" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="158" y="722" fill="var(--ai-green)" font-size="16" font-weight="700">69→71</text>
      <text x="158" y="742" fill="var(--ai-muted)" font-size="9">PASS@1</text>
      <text x="158" y="756" fill="var(--ai-muted)" font-size="9">不降反升 2 点</text>
      <rect x="268" y="694" width="122" height="74" rx="11" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="280" y="722" fill="var(--ai-violet)" font-size="16" font-weight="700">−5.3</text>
      <text x="280" y="742" fill="var(--ai-muted)" font-size="9">平均步数</text>
      <text x="280" y="756" fill="var(--ai-muted)" font-size="9">56.5 → 51.2</text>
      <rect x="390" y="694" width="122" height="74" rx="11" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="402" y="722" fill="var(--ai-ice)" font-size="16" font-weight="700">−43.3%</text>
      <text x="402" y="742" fill="var(--ai-muted)" font-size="9">叠加历史回看</text>
      <text x="402" y="756" fill="var(--ai-muted)" font-size="9">的估算费用</text>
      <text x="24" y="788" fill="var(--ai-muted)" font-size="10">反例：LLMLingua-2 只求压短，PASS@1 掉 7 点、总 token 反而涨数倍——</text>
      <text x="24" y="806" fill="var(--ai-muted)" font-size="10"><tspan fill="var(--ai-amber)">压短 ≠ 降本</tspan>；−33.0% 为 200 实例 × 3 模型的平均，非单模型口径。</text>
      <text x="280" y="826" text-anchor="middle" fill="var(--ai-muted)" font-size="11">一句话：<tspan fill="var(--ai-violet)">凡是给下游决策用的内容，都用「决策变没变」来衡量压缩质量。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：观察占 token 45.7%–67.8% · 中：改历史与压新观察两条路线、NAP 判据（下一步动作相等才算压对） · 下：实测数字与「压短≠降本」反例。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>编码智能体近一半 token 花在读环境返回的观察上。CoACT 把评价函数从「像不像原文」换成「下一步动作变不变」：token 省 33%，PASS@1 还从 69.0% 升到 71.0%。压得对不对，由决策说了算。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/context-engineering/" data-no-popover="true">返回主题 · 上下文工程 →</a>
  </nav>
</div>
