---
title: 上下文折叠 · 折叠靠换分辨率，不靠重写
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 上下文工程）：一张图看懂 Folio 的可恢复多分辨率折叠——三层视图由运行时写，满窗时在代码里折成更粗一层并留下句柄，75 个长任务解 66 个、成本降到对照的 0.42 倍。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/context-engineering/" data-no-popover="true">← 返回主题 · 上下文工程</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-17</span><span>S-05 / 上下文工程</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="上下文折叠信息图：模型摘要重写历史的代价、三层视图（轮次笔记/事件清单/原始记录）、程序化折叠与按句柄恢复、LOCA-bench 实测数字与两条推论" xmlns="http://www.w3.org/2000/svg">
      <title>上下文折叠 · Recoverable Multi-Resolution Folding（Folio）</title>
      <text x="24" y="28" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 推理、智能体与记忆 / 上下文工程</text>
      <text x="24" y="58" fill="var(--ai-ice)" font-size="25" font-weight="700">上下文折叠 <tspan fill="var(--ai-violet)" font-size="11" letter-spacing="1.3">CONTEXT FOLDING</tspan></text>
      <text x="24" y="80" fill="var(--ai-muted)" font-size="12">窗口迟早会满；问题是满了之后，历史是被重写，还是被折小。</text>
      <text x="24" y="110" fill="var(--ai-ice)" font-size="13" font-weight="600">① 病根：满窗之后只剩重写这一条路</text>
      <text x="24" y="134" fill="var(--ai-muted)" font-size="10">长任务的历史 = 工具输出 + 自己的回复，一路滚到塞不进窗口。</text>
      <text x="24" y="152" fill="var(--ai-muted)" font-size="10">主流做法是让模型把旧历史写成摘要——每压一次，都要<tspan fill="var(--ai-amber)">重读并重写</tspan>被替换的那段。</text>
      <text x="24" y="170" fill="var(--ai-muted)" font-size="10">更要紧的是细节：留哪些、丢哪些全由<tspan fill="var(--ai-amber)">模型当场判断</tspan>，后面还要用的往往已经删了。</text>
      <text x="24" y="188" fill="var(--ai-muted)" font-size="10">于是「压缩」成了一个<tspan fill="var(--ai-ice)">不可逆动作</tspan>：折小了回不去，猜错就只能重跑。</text>
      <line x1="24" y1="206" x2="536" y2="206" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="228" fill="var(--ai-ice)" font-size="13" font-weight="600">② 换思路：三层视图边跑边记，折叠只是换分辨率</text>
      <rect x="24" y="240" width="512" height="42" rx="10" fill="var(--ai-panel)" stroke="var(--ai-ice)"></rect>
      <text x="40" y="259" fill="var(--ai-ice)" font-size="10.5" font-weight="600">L1 一行轮次笔记</text>
      <text x="40" y="276" fill="var(--ai-muted)" font-size="9.5">模型在正常回复里顺手写下这一轮干了什么——不额外调用、成本近零</text>
      <rect x="24" y="292" width="512" height="42" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="40" y="311" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">L2 事件清单</text>
      <text x="40" y="328" fill="var(--ai-muted)" font-size="9.5">每一次工具调用由运行时自己记：调了什么、参数与结果的要点</text>
      <rect x="24" y="344" width="512" height="42" rx="10" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="40" y="363" fill="var(--ai-green)" font-size="10.5" font-weight="600">L3 原始记录</text>
      <text x="40" y="380" fill="var(--ai-muted)" font-size="9.5">原样捕获的输出——不经过模型转述，折叠时也就不会被改写</text>
      <text x="24" y="404" fill="var(--ai-muted)" font-size="10">三层互相关联：<tspan fill="var(--ai-ice)">折叠 = 给旧轮次选一个更粗的视图</tspan>，不是把它们重写一遍；细的那层留在窗口外。</text>
      <line x1="24" y1="420" x2="536" y2="420" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="446" fill="var(--ai-ice)" font-size="13" font-weight="600">③ 折叠在代码里做，恢复按句柄做</text>
      <rect x="24" y="458" width="248" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="40" y="480" fill="var(--ai-cyan)" font-size="10.5" font-weight="600">折叠：运行时查表，零模型调用</text>
      <text x="40" y="500" fill="var(--ai-muted)" font-size="9.5">窗口快满 → 旧轮次换成 L1，</text>
      <text x="40" y="517" fill="var(--ai-muted)" font-size="9.5">顺手打印指向 L2 / L3 的句柄；</text>
      <text x="40" y="536" fill="var(--ai-ice)" font-size="10" font-weight="700">中位 0.6 秒一次</text>
      <rect x="288" y="458" width="248" height="96" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="304" y="480" fill="var(--ai-green)" font-size="10.5" font-weight="600">恢复：只在要证据时才花 token</text>
      <text x="304" y="500" fill="var(--ai-muted)" font-size="9.5">按句柄分页读一段、对整份文件</text>
      <text x="304" y="517" fill="var(--ai-muted)" font-size="9.5">做计算，结论存进持久 dossier；</text>
      <text x="304" y="536" fill="var(--ai-muted)" font-size="9.5">不必把原文整段搬回窗口。</text>
      <rect x="24" y="566" width="512" height="32" rx="9" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="587" fill="var(--ai-muted)" font-size="10">关键取舍：触发条件按「<tspan fill="var(--ai-ice)">还留多少预算</tspan>」定价，而不是把压缩结果的大小当成已知量。</text>
      <line x1="24" y1="610" x2="536" y2="610" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="634" fill="var(--ai-ice)" font-size="13" font-weight="600">④ 实测：75 个长任务，同一底座横向对比</text>
      <rect x="24" y="646" width="118" height="76" rx="11" fill="var(--ai-panel)" stroke="var(--ai-cyan)"></rect>
      <text x="36" y="674" fill="var(--ai-cyan)" font-size="17" font-weight="700">66/75</text>
      <text x="36" y="694" fill="var(--ai-muted)" font-size="9">Folio 解出</text>
      <text x="36" y="710" fill="var(--ai-muted)" font-size="9">LOCA-bench</text>
      <rect x="148" y="646" width="118" height="76" rx="11" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="160" y="674" fill="var(--ai-ice)" font-size="17" font-weight="700">54</text>
      <text x="160" y="694" fill="var(--ai-muted)" font-size="9">模型写摘要</text>
      <text x="160" y="710" fill="var(--ai-muted)" font-size="9">同一运行时</text>
      <rect x="272" y="646" width="118" height="76" rx="11" fill="var(--ai-panel)" stroke="var(--ai-green)"></rect>
      <text x="284" y="674" fill="var(--ai-green)" font-size="17" font-weight="700">≈0.5×</text>
      <text x="284" y="694" fill="var(--ai-muted)" font-size="9">工作时间</text>
      <text x="284" y="710" fill="var(--ai-muted)" font-size="9">相对该运行时</text>
      <rect x="396" y="646" width="118" height="76" rx="11" fill="var(--ai-panel)" stroke="var(--ai-violet)"></rect>
      <text x="408" y="674" fill="var(--ai-violet)" font-size="17" font-weight="700">0.42×</text>
      <text x="408" y="694" fill="var(--ai-muted)" font-size="9">成本</text>
      <text x="408" y="710" fill="var(--ai-muted)" font-size="9">对照记为 1</text>
      <text x="24" y="746" fill="var(--ai-muted)" font-size="10">同批任务上 Claude Code / Codex / SoL-Pi 解 49-59 个；所有系统同用 DeepSeek-V4-Pro 底座。</text>
      <text x="24" y="764" fill="var(--ai-muted)" font-size="10">附带一条：<tspan fill="var(--ai-cyan)">模型写的摘要本身就是写进未来上下文的通道</tspan>——L2/L3 由运行时写，折完的历史不是模型自述。</text>
      <text x="24" y="782" fill="var(--ai-muted)" font-size="9.5">边界：单一基准 75 个任务、单一底座，未测折叠后的前缀缓存命中率——真实账单还差这一笔。</text>
      <text x="280" y="812" text-anchor="middle" fill="var(--ai-muted)" font-size="11">一句话：<tspan fill="var(--ai-violet)">可恢复，才敢折——折叠是换分辨率，不是重写。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：重写历史的代价 · 中：三层视图与「折叠=换分辨率、恢复=按句柄」 · 下：LOCA-bench 实测、两条推论与边界。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>长任务的历史迟早塞满窗口。Folio 不让模型重写历史：边跑边记三层视图，快满时在代码里把旧轮次折成更粗的一层、留下句柄，需要证据再按句柄翻回。75 个长任务解 66 个，模型写摘要只解 54 个，成本降到 0.42 倍。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/context-engineering/" data-no-popover="true">返回主题 · 上下文工程 →</a>
  </nav>
</div>
