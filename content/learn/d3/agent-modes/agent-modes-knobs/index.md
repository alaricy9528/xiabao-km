---
title: Agent 模式，其实是两根旋钮
publish: true
description: 计划、思考、Agent 不是一串档位，而是两根正交旋钮——一根管能不能动手，一根管想多深，两者可以同时调。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>智能体运行时</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-02 · 智能体运行时</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-24</span>
    </div>
    <h1>Agent 模式，其实是两根旋钮</h1>
    <p class="ka-art-lede">同一个助手被叫作「计划模式」「思考模式」「Agent 模式」，听起来像一串来回切的档位。其实它们不在同一根轴上——拧错轴，再怎么切也得不到想要的行为。</p>
  </div>
  <h2 class="ka-art-h2">01 两根旋钮，不是一串档位</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 控制权有两个独立维度</div>
    <svg class="fig-w" viewBox="0 0 640 320" role="img" aria-label="控制权由两根独立旋钮决定：权限旋钮从先问人到全放行，计划模式落在只读档；推理旋钮从快答到想透，思考模式落在深档；两根各拧各的，互不牵连">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">两根旋钮，不是一串档位</text>
      <rect x="16" y="42" width="296" height="186" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="36" y="78" style="fill: var(--ka-cyan)">旋钮 A · 权限</text>
      <text class="ka-ftext" x="36" y="110">决定它能不能动手</text>
      <path d="M40 160h240" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M280 155l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <text class="ka-fsmall" x="40" y="190">先问人</text>
      <text class="ka-fsmall" x="288" y="190" text-anchor="end">全放行</text>
      <circle cx="160" cy="160" r="8" fill="var(--ka-amber)"/>
      <text class="ka-fsmall" x="160" y="146" text-anchor="middle" style="fill: var(--ka-amber)">计划 = 只读档</text>
      <rect x="328" y="42" width="296" height="186" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="348" y="78" style="fill: var(--ka-violet)">旋钮 B · 推理</text>
      <text class="ka-ftext" x="348" y="110">决定它想多深</text>
      <path d="M352 160h240" stroke="var(--ka-violet)" stroke-width="2" opacity="0.6"/>
      <path d="M592 155l8 5-8 5z" fill="var(--ka-violet)" opacity="0.6"/>
      <text class="ka-fsmall" x="352" y="190">快答</text>
      <text class="ka-fsmall" x="600" y="190" text-anchor="end">想透</text>
      <circle cx="472" cy="160" r="8" fill="var(--ka-amber)"/>
      <text class="ka-fsmall" x="472" y="146" text-anchor="middle" style="fill: var(--ka-amber)">思考 = 深档</text>
      <rect class="ka-fblock" x="16" y="244" width="608" height="60" rx="10"/>
      <text class="ka-fsay" x="36" y="274">两根各拧各的，互不牵连</text>
      <text class="ka-ftext" x="36" y="296">把一根拧到底，另一根还停在原处</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 372" role="img" aria-label="控制权由两根独立旋钮决定：权限旋钮从先问人到全放行，计划模式落在只读档；推理旋钮从快答到想透，思考模式落在深档；两根各拧各的，互不牵连">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">两根旋钮，不是一串档位</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="96" rx="9"/>
      <text class="ka-fnum" x="30" y="70" style="fill: var(--ka-cyan)">旋钮 A</text>
      <text class="ka-ftitle" x="30" y="102">权限：能不能动手</text>
      <text class="ka-fsmall" x="30" y="128">先问人 → 全放行 · 计划落在只读</text>
      <rect class="ka-fblock" x="14" y="150" width="332" height="96" rx="9"/>
      <text class="ka-fnum" x="30" y="178" style="fill: var(--ka-violet)">旋钮 B</text>
      <text class="ka-ftitle" x="30" y="210">推理：想多深</text>
      <text class="ka-fsmall" x="30" y="236">快答 → 想透 · 思考落在深档</text>
      <rect class="ka-fblock" x="14" y="258" width="332" height="96" rx="10"/>
      <text class="ka-fsay" x="30" y="292">两根各拧各的</text>
      <text class="ka-ftext" x="30" y="322">把一根拧到底，另一根不动</text>
      <text class="ka-fsmall" x="30" y="346">这是所有模式的前提</text>
    </svg>
    <div class="ka-fcap">图注：权限与推理彼此正交——一根描述「做不做」，一根描述「想多久」，不能互相替代。</div>
  </div>
  <div class="ka-art-note">
    <p>控制权其实有两个独立的维度。一根是权限：它能不能动文件、调工具，要不要先问你。另一根是推理：它回答前想多久，是脱口而出还是反复推敲。</p>
    <p>两根彼此独立。把权限拧到「只读」，不影响你想让它想多深；把推理拧到「想透」，也不会自动给它动手的许可。</p>
  </div>
  <h2 class="ka-art-h2">02 权限轴：从「都问」到「都不问」</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 官方的六档权限模式</div>
    <svg class="fig-w" viewBox="0 0 640 368" role="img" aria-label="权限模式六档按人的介入程度排列：default 每次都问、plan 只出方案、acceptEdits 改文件不问、dontAsk 一律不弹窗、auto 由分类器逐条判断、bypassPermissions 全部放行；计划模式是只读那一档">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">权限轴：从「都问」到「都不问」</text>
      <rect x="16" y="42" width="190" height="118" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="30" y="70" style="fill: var(--ka-muted)">default</text>
      <text class="ka-ftitle" x="30" y="104">每次都问</text>
      <text class="ka-ftext" x="30" y="134">动手前先征求同意</text>
      <rect x="222" y="42" width="190" height="118" rx="10" fill="none" stroke="var(--ka-amber)" stroke-width="2.5"/>
      <text class="ka-fsmall" x="236" y="70" style="fill: var(--ka-amber)">plan</text>
      <text class="ka-ftitle" x="236" y="104" style="fill: var(--ka-amber)">只出方案</text>
      <text class="ka-ftext" x="236" y="134">看清计划再放行</text>
      <rect x="428" y="42" width="190" height="118" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="442" y="70" style="fill: var(--ka-muted)">acceptEdits</text>
      <text class="ka-ftitle" x="442" y="104">改文件不问</text>
      <text class="ka-ftext" x="442" y="134">只放行文件编辑</text>
      <rect x="16" y="172" width="190" height="118" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="30" y="200" style="fill: var(--ka-muted)">dontAsk</text>
      <text class="ka-ftitle" x="30" y="234">一律不弹窗</text>
      <text class="ka-ftext" x="30" y="264">只跑已批准的规则</text>
      <rect x="222" y="172" width="190" height="118" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="236" y="200" style="fill: var(--ka-muted)">auto</text>
      <text class="ka-ftitle" x="236" y="234">模型来判</text>
      <text class="ka-ftext" x="236" y="264">分类器逐条放行</text>
      <rect x="428" y="172" width="190" height="118" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="442" y="200" style="fill: var(--ka-muted)">bypassPermissions</text>
      <text class="ka-ftitle" x="442" y="234">全部放行</text>
      <text class="ka-ftext" x="442" y="264">只适合隔离环境</text>
      <rect class="ka-fblock" x="16" y="304" width="608" height="52" rx="10"/>
      <text class="ka-fsay" x="36" y="338">计划模式只是权限轴上的一档</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 546" role="img" aria-label="权限模式六档按人的介入程度排列：default 每次都问、plan 只出方案、acceptEdits 改文件不问、dontAsk 一律不弹窗、auto 由分类器逐条判断、bypassPermissions 全部放行；计划模式是只读那一档">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">权限轴：都问 → 都不问</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="60" rx="9"/>
      <text class="ka-fsmall" x="30" y="66" style="fill: var(--ka-muted)">default · 每次都问</text>
      <text class="ka-ftext" x="30" y="90">动手前先征求同意</text>
      <rect x="14" y="110" width="332" height="60" rx="9" fill="none" stroke="var(--ka-amber)" stroke-width="2.5"/>
      <text class="ka-fsmall" x="30" y="134" style="fill: var(--ka-amber)">plan · 只出方案</text>
      <text class="ka-ftext" x="30" y="158">看清计划再放行</text>
      <rect class="ka-fblock" x="14" y="178" width="332" height="60" rx="9"/>
      <text class="ka-fsmall" x="30" y="202" style="fill: var(--ka-muted)">acceptEdits · 改文件不问</text>
      <text class="ka-ftext" x="30" y="226">只放行文件编辑</text>
      <rect class="ka-fblock" x="14" y="246" width="332" height="60" rx="9"/>
      <text class="ka-fsmall" x="30" y="270" style="fill: var(--ka-muted)">dontAsk · 一律不弹窗</text>
      <text class="ka-ftext" x="30" y="294">只跑已批准的规则</text>
      <rect class="ka-fblock" x="14" y="314" width="332" height="60" rx="9"/>
      <text class="ka-fsmall" x="30" y="338" style="fill: var(--ka-muted)">auto · 模型来判</text>
      <text class="ka-ftext" x="30" y="362">分类器逐条放行</text>
      <rect class="ka-fblock" x="14" y="382" width="332" height="60" rx="9"/>
      <text class="ka-fsmall" x="30" y="406" style="fill: var(--ka-muted)">bypassPermissions · 全部放行</text>
      <text class="ka-ftext" x="30" y="430">只适合隔离环境</text>
      <rect class="ka-fblock" x="14" y="454" width="332" height="76" rx="10"/>
      <text class="ka-fsay" x="30" y="486">计划只是其中一档</text>
      <text class="ka-ftext" x="30" y="516">它不是想得更深</text>
    </svg>
    <div class="ka-fcap">图注：六档按「人要介入多少」依次排列；越往后放手越多，但决定的是同一件事——让不让动手。</div>
  </div>
  <div class="ka-art-note">
    <p>官方把权限分成六档：default 每次都问，plan 只出方案，acceptEdits 改文件不问，dontAsk 一律不弹窗，auto 让分类器逐条判，bypassPermissions 全部放行。</p>
    <p>计划模式就落在第二档——它的动作是「先看、别动手」，跟你让它想多久无关。</p>
  </div>
  <h2 class="ka-art-h2">03 推理轴：档位之外还有个开关</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 五档努力 + 一个独立开关</div>
    <svg class="fig-w" viewBox="0 0 640 360" role="img" aria-label="推理努力分 low、medium、high、xhigh、max 五档，越高想得越深、每轮花费的 token 越多；extended thinking 是一个可以单独开关的功能，与努力档位相互独立">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">推理轴：从「快答」到「想透」</text>
      <rect x="64" y="200" width="88" height="50" rx="6" fill="var(--ka-violet)" opacity="0.35"/>
      <rect x="176" y="166" width="88" height="84" rx="6" fill="var(--ka-violet)" opacity="0.5"/>
      <rect x="288" y="132" width="88" height="118" rx="6" fill="var(--ka-violet)" opacity="0.65"/>
      <rect x="400" y="98" width="88" height="152" rx="6" fill="var(--ka-violet)" opacity="0.8"/>
      <rect x="512" y="64" width="88" height="186" rx="6" fill="var(--ka-violet)" opacity="0.95"/>
      <text class="ka-fsmall" x="108" y="272" text-anchor="middle">low</text>
      <text class="ka-fsmall" x="220" y="272" text-anchor="middle">medium</text>
      <text class="ka-fsmall" x="332" y="272" text-anchor="middle">high</text>
      <text class="ka-fsmall" x="444" y="272" text-anchor="middle">xhigh</text>
      <text class="ka-fsmall" x="556" y="272" text-anchor="middle">max</text>
      <rect class="ka-fblock" x="16" y="292" width="608" height="60" rx="10"/>
      <text class="ka-fsay" x="36" y="322">档位与思考开关，相互独立</text>
      <text class="ka-ftext" x="36" y="344">可低档位配开思考，也可高档位配关思考</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 476" role="img" aria-label="推理努力分 low、medium、high、xhigh、max 五档，越高想得越深、每轮花费的 token 越多；extended thinking 是一个可以单独开关的功能，与努力档位相互独立">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">推理轴：快答 → 想透</text>
      <rect x="32" y="48" width="60" height="36" rx="6" fill="var(--ka-violet)" opacity="0.35"/>
      <text class="ka-fsmall" x="100" y="72">low</text>
      <rect x="32" y="100" width="96" height="36" rx="6" fill="var(--ka-violet)" opacity="0.5"/>
      <text class="ka-fsmall" x="136" y="124">medium</text>
      <rect x="32" y="152" width="132" height="36" rx="6" fill="var(--ka-violet)" opacity="0.65"/>
      <text class="ka-fsmall" x="172" y="176">high</text>
      <rect x="32" y="204" width="168" height="36" rx="6" fill="var(--ka-violet)" opacity="0.8"/>
      <text class="ka-fsmall" x="208" y="228">xhigh</text>
      <rect x="32" y="256" width="204" height="36" rx="6" fill="var(--ka-violet)" opacity="0.95"/>
      <text class="ka-fsmall" x="244" y="280">max</text>
      <rect class="ka-fblock" x="14" y="306" width="332" height="64" rx="9"/>
      <text class="ka-fnum" x="30" y="332" style="fill: var(--ka-amber)">另有开关</text>
      <text class="ka-ftext" x="30" y="358">思考过程可单独开或关</text>
      <rect class="ka-fblock" x="14" y="382" width="332" height="84" rx="10"/>
      <text class="ka-fsay" x="30" y="414">档位与开关各自独立</text>
      <text class="ka-ftext" x="30" y="444">两件事可以同时调</text>
    </svg>
    <div class="ka-fcap">图注：柱长表示思考深度的趋势，不代表固定数值；越往后每轮花得越多，适合的问题也越难。</div>
  </div>
  <div class="ka-art-note">
    <p>推理档位从 low 到 max 共五级，越低每轮花的 token（按字数算的钱）越少、答得越快，越高想得越深。Extended thinking 是另一个开关，负责把回答前的内部推演真正展开。</p>
    <p>官方明确说两者可以分开：低档位配开思考，或高档位配关思考，都成立。所以「想得更深」不是一个跟权限绑在一起的按钮。</p>
  </div>
  <h2 class="ka-art-h2">04 名字都叫模式，落点各不同</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 4 · 三种叫法对回两根轴</div>
    <svg class="fig-w" viewBox="0 0 640 332" role="img" aria-label="三种叫法分属两根轴：计划模式调权限落在只读，思考模式调推理落在深档，Agent 模式调权限落在放行；三者可以同时打开，不是二选一">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">三个叫法，落点分属两根轴</text>
      <rect x="16" y="42" width="190" height="176" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="30" y="80">计划模式</text>
      <text class="ka-fsmall" x="30" y="112" style="fill: var(--ka-cyan)">权限轴 · 只读</text>
      <text class="ka-ftext" x="30" y="146">先出方案，</text>
      <text class="ka-ftext" x="30" y="174">不动手</text>
      <rect x="222" y="42" width="190" height="176" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="236" y="80">思考模式</text>
      <text class="ka-fsmall" x="236" y="112" style="fill: var(--ka-violet)">推理轴 · 深档</text>
      <text class="ka-ftext" x="236" y="146">想得更久，</text>
      <text class="ka-ftext" x="236" y="174">权限不变</text>
      <rect x="428" y="42" width="190" height="176" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="442" y="80">Agent 模式</text>
      <text class="ka-fsmall" x="442" y="112" style="fill: var(--ka-cyan)">权限轴 · 放行</text>
      <text class="ka-ftext" x="442" y="146">能改文件，</text>
      <text class="ka-ftext" x="442" y="174">能调工具</text>
      <rect class="ka-fblock" x="16" y="232" width="608" height="84" rx="10"/>
      <text class="ka-fsay" x="36" y="266">名字都叫「模式」，落点不同</text>
      <text class="ka-ftext" x="36" y="298">所以可以同时打开，不是二选一</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 474" role="img" aria-label="三种叫法分属两根轴：计划模式调权限落在只读，思考模式调推理落在深档，Agent 模式调权限落在放行；三者可以同时打开，不是二选一">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">三个叫法，两根轴</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="104" rx="9"/>
      <text class="ka-fsmall" x="30" y="68" style="fill: var(--ka-cyan)">权限轴 · 只读</text>
      <text class="ka-ftitle" x="30" y="104">计划模式</text>
      <text class="ka-ftext" x="30" y="130">先出方案，不动手</text>
      <rect class="ka-fblock" x="14" y="158" width="332" height="104" rx="9"/>
      <text class="ka-fsmall" x="30" y="184" style="fill: var(--ka-violet)">推理轴 · 深档</text>
      <text class="ka-ftitle" x="30" y="220">思考模式</text>
      <text class="ka-ftext" x="30" y="246">想得更久，权限不变</text>
      <rect class="ka-fblock" x="14" y="274" width="332" height="104" rx="9"/>
      <text class="ka-fsmall" x="30" y="300" style="fill: var(--ka-cyan)">权限轴 · 放行</text>
      <text class="ka-ftitle" x="30" y="336">Agent 模式</text>
      <text class="ka-ftext" x="30" y="362">能改文件，能调工具</text>
      <rect class="ka-fblock" x="14" y="390" width="332" height="76" rx="10"/>
      <text class="ka-fsay" x="30" y="422">名字都叫模式</text>
      <text class="ka-ftext" x="30" y="452">落点不同，可同时开</text>
    </svg>
    <div class="ka-fcap">图注：先认落点再谈组合——同一根轴上的叫法互斥，不同轴上的叫法可以叠加。</div>
  </div>
  <div class="ka-art-note">
    <p>把三个叫法对回轴：计划模式调的是权限，落在只读；思考模式调的是推理，落在深档；Agent 模式调的也是权限，落在放行——它能连续改文件、调工具。</p>
    <p>看清落点，组合就自由了：想让它先出方案又想得深，就把权限拧到只读、推理拧到高档；两件事可以同时开，不是二选一。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noopener">Building Effective Agents（Anthropic）</a>——区分工作流（代码写死路径）与智能体（模型自定路径）；<a href="https://code.claude.com/docs/en/agent-sdk/agent-loop" target="_blank" rel="noopener">Agent SDK · Agent loop 文档</a>——permission mode 六档与 effort 五档、两者相互独立的原文。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/agent-modes/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">智能体运行时</div></a>
    <a class="next" href="learn/d3/" data-no-popover="true"><div class="kn">知识域 →</div><div class="kt">D3 智能体工程</div></a>
  </nav>
</div>
