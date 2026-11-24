---
title: Agent 模式、计划模式、思考模式：三层控制，各管一件事
publish: true
description: 三个名字落在三层上——交互形态决定它能自己做多少事，权限审批决定什么时候停下来问你，推理深度决定想多久。层没分对，切多少次都不对。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>智能体运行时</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-02 · 智能体运行时</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-24</span>
    </div>
    <h1>Agent 模式、计划模式、思考模式：三层控制，各管一件事</h1>
    <p class="ka-art-lede">同一个助手能叫出三个名字：计划模式、思考模式、Agent 模式。听起来像一串可以来回切的档位，其实它们不在同一层——一层决定它替你做多少，一层决定它什么时候停下来问你，一层决定它想多久。层没分对，切多少次都不对。</p>
  </div>
  <h2 class="ka-art-h2">01 三层各管一件事</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 控制分成三层，各管一件事</div>
    <svg class="fig-w" viewBox="0 0 640 340" role="img" aria-label="智能体的控制分为三层：第一层交互形态决定它替你做多少，Agent 模式落在这层；第二层权限审批决定什么时候停下来问你，计划模式落在这层；第三层推理深度决定想多久，思考模式落在这层">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">三层控制，各管一件事</text>
      <rect x="16" y="42" width="414" height="68" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="34" y="74" style="fill: var(--ka-cyan)">① 交互形态</text>
      <text class="ka-ftext" x="34" y="98">只给答案 / 你圈范围它改 / 它自己找自己跑</text>
      <rect x="446" y="42" width="178" height="68" rx="10" fill="none" stroke="var(--ka-cyan)"/>
      <text class="ka-fsmall" x="462" y="72" style="fill: var(--ka-cyan)">Agent 模式</text>
      <text class="ka-fsmall" x="462" y="96">落在这层</text>
      <rect x="16" y="118" width="414" height="68" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="34" y="150" style="fill: var(--ka-amber)">② 权限审批</text>
      <text class="ka-ftext" x="34" y="174">何时停下来问你 + 技术上碰得到哪</text>
      <rect x="446" y="118" width="178" height="68" rx="10" fill="none" stroke="var(--ka-amber)"/>
      <text class="ka-fsmall" x="462" y="148" style="fill: var(--ka-amber)">计划模式</text>
      <text class="ka-fsmall" x="462" y="172">落在这层</text>
      <rect x="16" y="194" width="414" height="68" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="34" y="226" style="fill: var(--ka-violet)">③ 推理深度</text>
      <text class="ka-ftext" x="34" y="250">五档努力 + 一个独立开关</text>
      <rect x="446" y="194" width="178" height="68" rx="10" fill="none" stroke="var(--ka-violet)"/>
      <text class="ka-fsmall" x="462" y="224" style="fill: var(--ka-violet)">思考模式</text>
      <text class="ka-fsmall" x="462" y="248">落在这层</text>
      <rect class="ka-fblock" x="16" y="274" width="608" height="52" rx="10"/>
      <text class="ka-fsay" x="36" y="306">三层可以同时调，互不替代</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 420" role="img" aria-label="智能体的控制分为三层：第一层交互形态决定它替你做多少，Agent 模式落在这层；第二层权限审批决定什么时候停下来问你，计划模式落在这层；第三层推理深度决定想多久，思考模式落在这层">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">三层控制，各管一件事</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="88" rx="9"/>
      <text class="ka-fnum" x="30" y="68" style="fill: var(--ka-cyan)">① 交互形态</text>
      <text class="ka-ftext" x="30" y="94">只给答案 / 你圈范围 / 它自己跑</text>
      <text class="ka-fsmall" x="30" y="116" style="fill: var(--ka-cyan)">Agent 模式在这层</text>
      <rect class="ka-fblock" x="14" y="142" width="332" height="88" rx="9"/>
      <text class="ka-fnum" x="30" y="168" style="fill: var(--ka-amber)">② 权限审批</text>
      <text class="ka-ftext" x="30" y="194">何时问你 + 技术上碰得到哪</text>
      <text class="ka-fsmall" x="30" y="216" style="fill: var(--ka-amber)">计划模式在这层</text>
      <rect class="ka-fblock" x="14" y="242" width="332" height="88" rx="9"/>
      <text class="ka-fnum" x="30" y="268" style="fill: var(--ka-violet)">③ 推理深度</text>
      <text class="ka-ftext" x="30" y="294">五档努力 + 一个独立开关</text>
      <text class="ka-fsmall" x="30" y="316" style="fill: var(--ka-violet)">思考模式在这层</text>
      <rect class="ka-fblock" x="14" y="342" width="332" height="64" rx="10"/>
      <text class="ka-fsay" x="30" y="372">三层可同时调</text>
      <text class="ka-ftext" x="30" y="396">互不替代</text>
    </svg>
    <div class="ka-fcap">图注：先认一个名字落在哪一层，再谈怎么调——记住名字不如记住层级。</div>
  </div>
  <div class="ka-art-note">
    <p>把一个助手能调的东西摊开，只有三层。交互形态决定它替你做到哪一步；权限审批决定它动手前要不要停下来问你、技术上又碰得到哪里；推理深度决定回答前想多久。</p>
    <p>三层互不替代。把推理提到最高，换不来动手的许可；把权限放到底，也不会让它想得更周全。</p>
  </div>
  <h2 class="ka-art-h2">02 交互形态：谁圈定工作范围</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 三档的分界在「谁划范围」</div>
    <svg class="fig-w" viewBox="0 0 640 320" role="img" aria-label="交互形态分三档：Ask 只给答案不写文件，范围是你问的那段；Edit 由你圈定文件范围，它跨文件照改；Agent 自己判断读哪些文件、自己跑命令自己修错">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">交互形态：谁圈定工作范围</text>
      <rect x="16" y="42" width="190" height="150" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="32" y="70" style="fill: var(--ka-muted)">Ask</text>
      <text class="ka-ftitle" x="32" y="104">只给答案</text>
      <text class="ka-ftext" x="32" y="134">不写文件</text>
      <text class="ka-fsmall" x="32" y="162">范围：你问的那段</text>
      <rect x="222" y="42" width="190" height="150" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="238" y="70" style="fill: var(--ka-muted)">Edit</text>
      <text class="ka-ftitle" x="238" y="104">你圈范围</text>
      <text class="ka-ftext" x="238" y="134">跨文件照着改</text>
      <text class="ka-fsmall" x="238" y="162">范围：你给的文件</text>
      <rect x="428" y="42" width="190" height="150" rx="10" fill="none" stroke="var(--ka-cyan)" stroke-width="2.5"/>
      <text class="ka-fsmall" x="444" y="70" style="fill: var(--ka-cyan)">Agent</text>
      <text class="ka-ftitle" x="444" y="104" style="fill: var(--ka-cyan)">它自己找</text>
      <text class="ka-ftext" x="444" y="134">自己读、跑、修错</text>
      <text class="ka-fsmall" x="444" y="162">范围：它自己判断</text>
      <rect class="ka-fblock" x="16" y="206" width="608" height="94" rx="10"/>
      <text class="ka-fsay" x="36" y="238">差别不在强弱，在谁决定范围</text>
      <text class="ka-ftext" x="36" y="266">问的只给答案，改的要你圈范围，干的自己圈范围</text>
      <text class="ka-fsmall" x="36" y="290">三档回答的是同一个问题：这活的范围谁来划</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 456" role="img" aria-label="交互形态分三档：Ask 只给答案不写文件，范围是你问的那段；Edit 由你圈定文件范围，它跨文件照改；Agent 自己判断读哪些文件、自己跑命令自己修错">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">交互形态：谁圈范围</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="96" rx="9"/>
      <text class="ka-fsmall" x="30" y="68" style="fill: var(--ka-muted)">Ask</text>
      <text class="ka-ftitle" x="30" y="100">只给答案</text>
      <text class="ka-ftext" x="30" y="124">不写文件 · 范围=你问的那段</text>
      <rect class="ka-fblock" x="14" y="150" width="332" height="96" rx="9"/>
      <text class="ka-fsmall" x="30" y="176" style="fill: var(--ka-muted)">Edit</text>
      <text class="ka-ftitle" x="30" y="208">你圈范围</text>
      <text class="ka-ftext" x="30" y="232">跨文件改 · 范围=你给的文件</text>
      <rect class="ka-fblock" x="14" y="258" width="332" height="96" rx="9" stroke="var(--ka-cyan)" stroke-width="2.5"/>
      <text class="ka-fsmall" x="30" y="284" style="fill: var(--ka-cyan)">Agent</text>
      <text class="ka-ftitle" x="30" y="316" style="fill: var(--ka-cyan)">它自己找</text>
      <text class="ka-ftext" x="30" y="340">自己读跑修 · 范围=它判断</text>
      <rect class="ka-fblock" x="14" y="366" width="332" height="76" rx="10"/>
      <text class="ka-fsay" x="30" y="396">差别在谁划范围</text>
      <text class="ka-ftext" x="30" y="422">不在谁更强</text>
    </svg>
    <div class="ka-fcap">图注：三档都只回答一个问题——这活的范围由谁划定，而不是谁的能力更强。</div>
  </div>
  <div class="ka-art-note">
    <p>官方文档里这三档的分界不在「强弱」，在「谁划定工作范围」。Ask 只在你给的上下文里回答，不写文件；Edit 由你指定文件范围，它照着改；Agent 自己决定读哪些文件、按什么顺序做，边做边验证。</p>
    <p>这也是 Agent 模式最常被误读的地方：它的核心是自主多步，不是「全部放行」。Cursor 的 Agent 默认仍会在动手前征求同意，Copilot 的 Agent 也会把危险命令交给你确认——自主和放行是两件事。</p>
  </div>
  <h2 class="ka-art-h2">03 权限层：碰得到，和会不会问你</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 权限层其实是两个旋钮</div>
    <svg class="fig-w" viewBox="0 0 640 380" role="img" aria-label="权限层由两个独立旋钮组成：一个是审批，从每步都问、只改文件不问、先出方案、沙箱内自动到从不问；另一个是技术边界，分只读、工作区写、全放行三档；两者可以自由组合">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">权限层：两件独立的事</text>
      <text class="ka-fsmall" x="16" y="54" style="fill: var(--ka-amber)">A · 什么时候停下来问你</text>
      <line x1="40" y1="100" x2="600" y2="100" stroke="var(--ka-amber)" stroke-width="2" opacity="0.6"/>
      <path d="M600 95l8 5-8 5z" fill="var(--ka-amber)" opacity="0.6"/>
      <circle cx="70" cy="100" r="6" fill="var(--ka-amber)"/>
      <circle cx="190" cy="100" r="6" fill="var(--ka-amber)"/>
      <circle cx="310" cy="100" r="6" fill="var(--ka-amber)"/>
      <circle cx="430" cy="100" r="6" fill="var(--ka-amber)"/>
      <circle cx="550" cy="100" r="6" fill="var(--ka-amber)"/>
      <text class="ka-fsmall" x="70" y="78" text-anchor="middle">每步都问</text>
      <text class="ka-fsmall" x="310" y="78" text-anchor="middle" style="fill: var(--ka-amber)">先出方案</text>
      <text class="ka-fsmall" x="550" y="78" text-anchor="middle">从不问</text>
      <text class="ka-fsmall" x="190" y="126" text-anchor="middle">只改文件不问</text>
      <text class="ka-fsmall" x="430" y="126" text-anchor="middle">沙箱内自动</text>
      <text class="ka-fsmall" x="310" y="152" text-anchor="middle" style="fill: var(--ka-amber)">只读探路，交方案</text>
      <text class="ka-fsmall" x="16" y="192" style="fill: var(--ka-cyan)">B · 技术上碰得到哪（沙箱）</text>
      <rect x="16" y="208" width="190" height="64" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="32" y="238">只读</text>
      <text class="ka-fsmall" x="32" y="260">能看，不能改</text>
      <rect x="222" y="208" width="190" height="64" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="238" y="238">工作区写</text>
      <text class="ka-fsmall" x="238" y="260">只在当前目录改</text>
      <rect x="428" y="208" width="190" height="64" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="444" y="238">全放行</text>
      <text class="ka-fsmall" x="444" y="260">无边界，只给隔离环境</text>
      <rect class="ka-fblock" x="16" y="288" width="608" height="76" rx="10"/>
      <text class="ka-fsay" x="36" y="318">碰得到，和会不会问你，是两件事</text>
      <text class="ka-ftext" x="36" y="346">所谓全放行，是两个旋钮一起拧到底</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 468" role="img" aria-label="权限层由两个独立旋钮组成：一个是审批，从每步都问、只改文件不问、先出方案、沙箱内自动到从不问；另一个是技术边界，分只读、工作区写、全放行三档；两者可以自由组合">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">权限层：两件独立的事</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="170" rx="9"/>
      <text class="ka-fsmall" x="30" y="68" style="fill: var(--ka-amber)">A · 什么时候问你</text>
      <text class="ka-ftext" x="30" y="94">每步都问</text>
      <text class="ka-ftext" x="30" y="116">只改文件不问</text>
      <text class="ka-ftext" x="30" y="138" style="fill: var(--ka-amber)">先出方案（只读探路）</text>
      <text class="ka-ftext" x="30" y="160">沙箱内自动</text>
      <text class="ka-ftext" x="30" y="182">从不问</text>
      <rect class="ka-fblock" x="14" y="224" width="332" height="140" rx="9"/>
      <text class="ka-fsmall" x="30" y="250" style="fill: var(--ka-cyan)">B · 技术上碰得到哪</text>
      <text class="ka-ftext" x="30" y="286">只读：能看不能改</text>
      <text class="ka-ftext" x="30" y="308">工作区写：只在当前目录</text>
      <text class="ka-ftext" x="30" y="330">全放行：无边界</text>
      <rect class="ka-fblock" x="14" y="376" width="332" height="76" rx="10"/>
      <text class="ka-fsay" x="30" y="406">碰得到 ≠ 会问你</text>
      <text class="ka-ftext" x="30" y="432">两个旋钮，各拧各的</text>
    </svg>
    <div class="ka-fcap">图注：审批管「什么时候必须先问你」，沙箱管「技术上碰得到哪里」；两层可独立配置，不绑定。</div>
  </div>
  <div class="ka-art-note">
    <p>这一层其实是两个旋钮。审批决定动手前要不要停下来问你；技术边界（沙箱）决定它物理上能碰哪里——只能读、能改当前工作区，还是完全放开。Codex 官方文档写得很直白：沙箱决定「技术上能做什么」，审批决定「什么时候必须先问你」，两者可以独立配置。</p>
    <p>计划模式落在审批这一层：只读探路，把方案交给你，等你点头。它不是「中等松紧」，更不是「想得更深」——它是最紧的那一档，目的是让你在动手前先看一遍。</p>
  </div>
  <h2 class="ka-art-h2">04 推理层：档位之外还有个开关</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 4 · 五档努力 + 一个独立开关</div>
    <svg class="fig-w" viewBox="0 0 640 380" role="img" aria-label="推理努力分 low、medium、high、xhigh、max 五档，越低越快越省，越高想得越深；extended thinking 是可以单独开关的功能，与努力档位相互独立">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">推理层：从快答到想透</text>
      <rect x="64" y="200" width="88" height="40" rx="6" fill="var(--ka-violet)" opacity="0.35"/>
      <rect x="176" y="170" width="88" height="70" rx="6" fill="var(--ka-violet)" opacity="0.5"/>
      <rect x="288" y="140" width="88" height="100" rx="6" fill="var(--ka-violet)" opacity="0.65"/>
      <rect x="400" y="110" width="88" height="130" rx="6" fill="var(--ka-violet)" opacity="0.8"/>
      <rect x="512" y="80" width="88" height="160" rx="6" fill="var(--ka-violet)" opacity="0.95"/>
      <text class="ka-fsmall" x="108" y="268" text-anchor="middle">low</text>
      <text class="ka-fsmall" x="220" y="268" text-anchor="middle">medium</text>
      <text class="ka-fsmall" x="332" y="268" text-anchor="middle">high</text>
      <text class="ka-fsmall" x="444" y="268" text-anchor="middle">xhigh</text>
      <text class="ka-fsmall" x="556" y="268" text-anchor="middle">max</text>
      <text class="ka-fsmall" x="108" y="292" text-anchor="middle" style="fill: var(--ka-muted)">快 · 省</text>
      <text class="ka-fsmall" x="556" y="292" text-anchor="middle" style="fill: var(--ka-muted)">慢 · 贵</text>
      <rect class="ka-fblock" x="16" y="308" width="608" height="58" rx="10"/>
      <text class="ka-fsay" x="36" y="336">五档之外，还有一个独立开关</text>
      <text class="ka-fsmall" x="36" y="358">低档配开思考、高档配关思考，都成立</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 480" role="img" aria-label="推理努力分 low、medium、high、xhigh、max 五档，越低越快越省，越高想得越深；extended thinking 是可以单独开关的功能，与努力档位相互独立">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">推理层：快答 → 想透</text>
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
      <text class="ka-ftext" x="30" y="358">思考可以单独开或关</text>
      <rect class="ka-fblock" x="14" y="382" width="332" height="84" rx="10"/>
      <text class="ka-fsay" x="30" y="414">档位与开关各自独立</text>
      <text class="ka-ftext" x="30" y="444">可以同时调，也可只调一个</text>
    </svg>
    <div class="ka-fcap">图注：柱长只表示思考深度的趋势，不是固定数值；越往后每轮花得越多，适合的问题也越难。</div>
  </div>
  <div class="ka-art-note">
    <p>努力档从 low 到 max 五级，越低每轮花的 token（按字数算的钱）越少、回得越快；越高越肯反复推敲。extended thinking 是另一个开关，跟档位独立——低档配开思考、高档配关思考，都成立。</p>
    <p>官方给的用法很实在：查文件、列目录这类事用 low 就够，高档留给重构和调试。想得久不等于答得对，简单任务硬开最高档，只是更慢更贵。</p>
  </div>
  <h2 class="ka-art-h2">05 怎么选：先认层，再选档</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 5 · 三句问话定形态</div>
    <svg class="fig-w" viewBox="0 0 640 420" role="img" aria-label="选型三步：只要答案不动文件就用 Ask；要改且范围清楚就用 Edit；要它自己找文件自己跑命令自己修错才用 Agent；定完形态再叠权限与推理两层">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">怎么选：先问三句</text>
      <rect x="16" y="46" width="290" height="86" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftext" x="34" y="82">只要答案，不动文件？</text>
      <text class="ka-fsmall" x="34" y="112" style="fill: var(--ka-muted)">解释、查资料、想方案</text>
      <line x1="312" y1="89" x2="340" y2="89" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M340 84l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect x="356" y="46" width="268" height="86" rx="10" fill="none" stroke="var(--ka-cyan)"/>
      <text class="ka-fsmall" x="374" y="76" style="fill: var(--ka-cyan)">Ask</text>
      <text class="ka-ftext" x="374" y="106">只读问答，不落盘</text>
      <rect x="16" y="146" width="290" height="86" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftext" x="34" y="182">要改，范围你清楚？</text>
      <text class="ka-fsmall" x="34" y="212" style="fill: var(--ka-muted)">改一处、批量替换、照着规范修</text>
      <line x1="312" y1="189" x2="340" y2="189" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M340 184l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect x="356" y="146" width="268" height="86" rx="10" fill="none" stroke="var(--ka-cyan)"/>
      <text class="ka-fsmall" x="374" y="176" style="fill: var(--ka-cyan)">Edit</text>
      <text class="ka-ftext" x="374" y="206">你给文件，它照着改</text>
      <rect x="16" y="246" width="290" height="86" rx="10" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftext" x="34" y="282">要它自己找、自己跑？</text>
      <text class="ka-fsmall" x="34" y="312" style="fill: var(--ka-muted)">多文件改动、跑测试、修到通过</text>
      <line x1="312" y1="289" x2="340" y2="289" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M340 284l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect x="356" y="246" width="268" height="86" rx="10" fill="none" stroke="var(--ka-cyan)" stroke-width="2.5"/>
      <text class="ka-fsmall" x="374" y="276" style="fill: var(--ka-cyan)">Agent</text>
      <text class="ka-ftext" x="374" y="306">它定步骤，边做边验</text>
      <rect class="ka-fblock" x="16" y="348" width="608" height="62" rx="10"/>
      <text class="ka-fsay" x="36" y="374">形态定完，再叠另外两层</text>
      <text class="ka-fsmall" x="36" y="396">要审方案 → 权限层；任务难 → 推理层</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 470" role="img" aria-label="选型三步：只要答案不动文件就用 Ask；要改且范围清楚就用 Edit；要它自己找文件自己跑命令自己修错才用 Agent；定完形态再叠权限与推理两层">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">怎么选：先问三句</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="64" rx="9"/>
      <text class="ka-ftext" x="30" y="72">只要答案，不动文件？</text>
      <text class="ka-fsmall" x="30" y="94" style="fill: var(--ka-cyan)">→ Ask 只读问答</text>
      <rect class="ka-fblock" x="14" y="118" width="332" height="64" rx="9"/>
      <text class="ka-ftext" x="30" y="148">要改，范围你清楚？</text>
      <text class="ka-fsmall" x="30" y="170" style="fill: var(--ka-cyan)">→ Edit 你给文件</text>
      <rect class="ka-fblock" x="14" y="194" width="332" height="64" rx="9" stroke="var(--ka-cyan)" stroke-width="2.5"/>
      <text class="ka-ftext" x="30" y="224">要它自己找、自己跑？</text>
      <text class="ka-fsmall" x="30" y="246" style="fill: var(--ka-cyan)">→ Agent 它定步骤</text>
      <rect class="ka-fblock" x="14" y="270" width="332" height="100" rx="9"/>
      <text class="ka-fnum" x="30" y="296" style="fill: var(--ka-amber)">再叠另外两层</text>
      <text class="ka-ftext" x="30" y="322">想先审方案 → 权限层 plan</text>
      <text class="ka-ftext" x="30" y="346">任务确实难 → 推理层提档</text>
      <rect class="ka-fblock" x="14" y="382" width="332" height="76" rx="10"/>
      <text class="ka-fsay" x="30" y="412">先认层，再选档</text>
      <text class="ka-ftext" x="30" y="438">别在同一层里反复切</text>
    </svg>
    <div class="ka-fcap">图注：三句问话只决定形态；权限与推理是另外两层，定完形态再叠上去。</div>
  </div>
  <div class="ka-art-note">
    <p>选法只有三句：只要答案不要改，用 Ask；要改而且范围你清楚，用 Edit；要它自己找文件、自己跑命令、自己修错，才用 Agent。</p>
    <p>定完形态，再叠另外两层：需要先审方案，就把它挡在 plan；风险高，就把审批收紧、边界缩小；任务确实难，再提推理档。三层分开调，比在一个下拉菜单里反复切有用。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://code.claude.com/docs/en/agent-sdk/agent-loop" target="_blank" rel="noopener">Claude Code · Agent loop 文档</a>（permission mode 六档、effort 五档、两者为独立字段）；<a href="https://cursor.com/help/ai-features/agent" target="_blank" rel="noopener">Cursor · Agent 模式对照表</a>（Agent / Ask / Plan / Debug 各自能否改文件）；<a href="https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide" target="_blank" rel="noopener">GitHub Docs · Copilot 三种模式</a>（ask / edit / agent 的分工）；<a href="https://developers.openai.com/codex/agent-approvals-security" target="_blank" rel="noopener">OpenAI Codex · 审批与沙箱</a>（沙箱与审批两层独立配置）；<a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noopener">Building Effective Agents（Anthropic）</a>（工作流与智能体的分野）。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/agent-modes/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">智能体运行时</div></a>
    <a class="next" href="learn/d3/" data-no-popover="true"><div class="kn">知识域 →</div><div class="kt">D3 智能体工程</div></a>
  </nav>
</div>
