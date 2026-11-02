---
title: 测试时计算 · 同一个模型，想久一点
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 测试时计算与推理算力）：一张图看懂测试时计算——训练之外多出的那条算力轴，想久一点为什么有用、为什么很快就不再有用，以及验证器为什么是天花板。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/test-time-compute/" data-no-popover="true">← 返回主题 · 测试时计算与推理算力</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-03</span><span>S-05 / 测试时计算与推理算力</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="测试时计算信息图：训练算力与推理算力两条轴、想久一点为什么有用、收益递减与过度思考的代价，以及验证器为什么决定上限" xmlns="http://www.w3.org/2000/svg">
      <title>测试时计算 · Test-Time Compute</title>
      <defs><marker id="ttc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
      <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 推理、智能体与记忆 / 测试时计算与推理算力</text>
      <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">测试时计算 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">TEST-TIME COMPUTE</tspan></text>
      <text x="24" y="76" fill="var(--ai-muted)" font-size="12">同一个模型，答完之后还能不能更好——取决于愿意再花多少算力想一遍。</text>
      <text x="24" y="104" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 两条算力轴：练大一次，还是想久一点</text>
      <rect x="24" y="116" width="252" height="150" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">训练时算力 · 一次性付清</text>
      <rect x="40" y="152" width="42" height="22" rx="5" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="61" y="168" text-anchor="middle" fill="var(--ai-ice)" font-size="10">参数</text>
      <line x1="82" y1="163" x2="96" y2="163" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#ttc-arrow)"></line>
      <rect x="96" y="152" width="42" height="22" rx="5" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="117" y="168" text-anchor="middle" fill="var(--ai-ice)" font-size="10">数据</text>
      <line x1="138" y1="163" x2="152" y2="163" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#ttc-arrow)"></line>
      <rect x="152" y="152" width="42" height="22" rx="5" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="173" y="168" text-anchor="middle" fill="var(--ai-ice)" font-size="10">FLOPs</text>
      <text x="40" y="196" fill="var(--ai-text)" font-size="9.5">训练完就固定了</text>
      <text x="40" y="214" fill="var(--ai-text)" font-size="9.5">谁拿到权重，能力都一样</text>
      <text x="40" y="232" fill="var(--ai-muted)" font-size="9.5">想变强只能重训一遍</text>
      <text x="40" y="252" fill="var(--ai-muted)" font-size="9.5">账单在训练期，一次付清</text>
      <rect x="288" y="116" width="248" height="150" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="304" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">推理时算力 · 每问一次付一次</text>
      <rect x="304" y="152" width="66" height="26" rx="6" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="337" y="170" text-anchor="middle" fill="var(--ai-ice)" font-size="10">尝试一</text>
      <rect x="378" y="152" width="66" height="26" rx="6" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="411" y="170" text-anchor="middle" fill="var(--ai-ice)" font-size="10">尝试二</text>
      <rect x="452" y="152" width="66" height="26" rx="6" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect>
      <text x="485" y="170" text-anchor="middle" fill="var(--ai-muted)" font-size="10">尝试 N</text>
      <line x1="337" y1="178" x2="337" y2="196" stroke="var(--ai-cyan)" stroke-width="1.4" marker-end="url(#ttc-arrow)"></line>
      <line x1="411" y1="178" x2="411" y2="196" stroke="var(--ai-cyan)" stroke-width="1.4" marker-end="url(#ttc-arrow)"></line>
      <line x1="485" y1="178" x2="485" y2="196" stroke="var(--ai-line)" stroke-width="1.4" stroke-dasharray="3 3"></line>
      <rect x="340" y="196" width="142" height="24" rx="6" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="411" y="213" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5">挑一个当答案</text>
      <text x="304" y="240" fill="var(--ai-text)" font-size="9.5">同一个权重，可以想得不一样久</text>
      <text x="304" y="258" fill="var(--ai-muted)" font-size="9.5">账单在每次请求，按题轻重付</text>
      <text x="24" y="284" fill="var(--ai-muted)" font-size="10.5">左边是「把模型练大」，右边是「让模型想久」——第二条轴不需要重训，但要每次付费。</text>
      <line x1="24" y1="296" x2="536" y2="296" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="316" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 想久一点为什么有用：一次作答变成一次搜索</text>
      <rect x="24" y="328" width="512" height="140" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <rect x="40" y="342" width="152" height="112" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="116" y="366" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">① 并行采样</text>
      <text x="116" y="386" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">同一题多写几份</text>
      <text x="116" y="402" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">投票选最多的那个</text>
      <text x="116" y="422" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">代价：N 倍算力</text>
      <text x="116" y="438" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">只对有唯一答案的题有效</text>
      <line x1="192" y1="398" x2="204" y2="398" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#ttc-arrow)"></line>
      <rect x="204" y="342" width="152" height="112" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="280" y="366" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">② 顺序修订</text>
      <text x="280" y="386" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">写出长推理再回头改</text>
      <text x="280" y="402" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">错误在链上被纠正</text>
      <text x="280" y="422" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">代价：延迟线性变长</text>
      <text x="280" y="438" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">步数越多，越易跑偏</text>
      <line x1="356" y1="398" x2="368" y2="398" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#ttc-arrow)"></line>
      <rect x="368" y="342" width="152" height="112" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="444" y="366" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">③ 搜索 + 验证器</text>
      <text x="444" y="386" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">展开成一棵推理树</text>
      <text x="444" y="402" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">验证器给分支打分剪枝</text>
      <text x="444" y="422" text-anchor="middle" fill="var(--ai-amber)" font-size="9.5">多算只在这里才划算</text>
      <text x="444" y="438" text-anchor="middle" fill="var(--ai-amber)" font-size="9.5">验证器不准就白烧钱</text>
      <text x="24" y="482" fill="var(--ai-muted)" font-size="10.5">三种做法花的都是同一笔钱，区别只在于：多出来的算力是重复一遍，还是真的换来了新信息。</text>
      <line x1="24" y1="494" x2="536" y2="494" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="514" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 想太久会怎样：收益递减与过度思考</text>
      <rect x="24" y="526" width="250" height="112" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
      <text x="44" y="548" fill="var(--ai-green)" font-size="12" font-weight="600">准确率随思考时长：对数式</text>
      <line x1="56" y1="628" x2="244" y2="628" stroke="var(--ai-line-strong)" stroke-width="1"></line>
      <line x1="56" y1="628" x2="56" y2="560" stroke="var(--ai-line-strong)" stroke-width="1"></line>
      <polyline points="56,624 84,600 112,582 140,570 168,563 196,558 224,555 244,553" fill="none" stroke="var(--ai-green)" stroke-width="2"></polyline>
      <text x="60" y="642" fill="var(--ai-muted)" font-size="9.5">思考时长（算力）→</text>
      <text x="160" y="642" fill="var(--ai-muted)" font-size="9.5">前一半算力贡献大部分增益</text>
      <rect x="286" y="526" width="250" height="112" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
      <text x="306" y="548" fill="var(--ai-amber)" font-size="12" font-weight="600">过度思考：反而改错</text>
      <text x="306" y="572" fill="var(--ai-text)" font-size="9.5">首个答案往往已经是对的</text>
      <text x="306" y="590" fill="var(--ai-text)" font-size="9.5">初始错时，延长思考只修好少数</text>
      <text x="306" y="608" fill="var(--ai-text)" font-size="9.5">后续步骤会把对的「说」成错的</text>
      <text x="306" y="626" fill="var(--ai-muted)" font-size="9.5">重复抽样常犯同一个错，不是独立票</text>
      <line x1="24" y1="652" x2="536" y2="652" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="672" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 换来什么，没换什么</text>
      <rect x="24" y="684" width="250" height="90" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="44" y="708" fill="var(--ai-green)" font-size="12" font-weight="600">换来：算力成了可调旋钮</text>
      <text x="44" y="730" fill="var(--ai-text)" font-size="9.5">同一个模型分低中高三档</text>
      <text x="44" y="748" fill="var(--ai-text)" font-size="9.5">简单题速通，难题才放开想</text>
      <text x="44" y="766" fill="var(--ai-muted)" font-size="9.5">小模型靠想久逼近大模型</text>
      <rect x="286" y="684" width="250" height="90" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
      <text x="306" y="708" fill="var(--ai-amber)" font-size="12" font-weight="600">没换：验证器仍是天花板</text>
      <text x="306" y="730" fill="var(--ai-text)" font-size="9.5">判不出对错，多算就是重复</text>
      <text x="306" y="748" fill="var(--ai-text)" font-size="9.5">开放领域没有可机器验证的标尺</text>
      <text x="306" y="766" fill="var(--ai-muted)" font-size="9.5">延迟与账单跟着一起涨</text>
      <line x1="24" y1="788" x2="536" y2="788" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="280" y="808" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">训练把潜力写进权重，测试时计算决定你愿意花多少钱把它取出来——而取不取得出，看验证器。</tspan></text>
      <text x="280" y="824" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">所以 2026 年这条轴的竞争已经从「能不能想久」转到「会不会省」：按难度分配预算，比无脑拉满更接近正解。</text>
    </svg>
    <figcaption class="ai-kp__cap">上：训练算力与推理算力两条轴 · 中：想久一点的三种做法，以及收益递减与过度思考 · 下：换来什么、没换什么。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>训练把潜力练进权重，测试时计算决定愿意花多少算力把它取出来：一次作答变成多试几次再挑一个。收益是对数式的——前半程涨得快，之后迅速变平；想太久还会把对的改成错的。真正决定上限的是有没有可靠的验证器。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/test-time-compute/" data-no-popover="true">返回主题 · 测试时计算与推理算力 →</a>
  </nav>
</div>
