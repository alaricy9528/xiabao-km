---
title: Skill 有没有用，得跟「没有它」比
publish: true
description: 跑通了只证明这条路走得通。要判断一份 Skill 值不值，得让同一批任务在不带它的情况下再跑一遍，逐条比对差出来的那部分。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · Skills 与能力封装</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-26</span>
    </div>
    <h1>Skill 有没有用，得跟「没有它」比</h1>
    <p class="ka-art-lede">跑通了只证明这条路走得通。要判断一份 Skill 值不值，得让同一批任务在不带它的情况下再跑一遍，逐条比对差出来的那部分。</p>
  </div>
  <h2 class="ka-art-h2">01 跑通了算什么</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 同一份 Skill，两个不同的问题</div>
    <svg class="fig-w" viewBox="0 0 640 290" role="img" aria-label="带一份 Skill 跑一遍只回答能不能做完，同一批任务不带它再跑一遍才回答值不值；跑通了不等于有用，模型本来就能过的任务加上说明书只是多花一次 token">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">先分清两个问题</text>
      <rect x="16" y="42" width="280" height="124" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fnum" x="36" y="72" style="fill: var(--ka-muted)">问题一</text>
      <text class="ka-ftitle" x="36" y="104">能不能</text>
      <text class="ka-ftext" x="36" y="134">带它跑一遍，过了</text>
      <text class="ka-fsmall" x="36" y="156">只证明这条路走得通</text>
      <path d="M300 100h28" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M328 95l9 5-9 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect x="344" y="42" width="280" height="124" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fnum" x="364" y="72" style="fill: var(--ka-cyan)">问题二</text>
      <text class="ka-ftitle" x="364" y="104">值不值</text>
      <text class="ka-ftext" x="364" y="134">同一批任务，不带它再跑一遍</text>
      <text class="ka-fsmall" x="364" y="156">差出来的才算它的贡献</text>
      <rect class="ka-fblock" x="16" y="190" width="608" height="76" rx="10"/>
      <text class="ka-fsay" x="36" y="222">跑通了，不等于有用</text>
      <text class="ka-ftext" x="36" y="252">模型本来就能过的任务，加一份说明书只是多读一页、多花一次</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 390" role="img" aria-label="带一份 Skill 跑一遍只回答能不能做完，同一批任务不带它再跑一遍才回答值不值；跑通了不等于有用，模型本来就能过的任务加上说明书只是多花一次 token">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">先分清两个问题</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="96" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-muted)">问题一</text>
      <text class="ka-ftitle" x="32" y="100">能不能</text>
      <text class="ka-ftext" x="32" y="124" style="font-size:13.5px">带它跑一遍，过了</text>
      <path d="M175 142l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="158" width="332" height="96" rx="9"/>
      <text class="ka-fnum" x="32" y="184" style="fill: var(--ka-cyan)">问题二</text>
      <text class="ka-ftitle" x="32" y="216">值不值</text>
      <text class="ka-ftext" x="32" y="240" style="font-size:13.5px">不带它，同一批任务再跑一遍</text>
      <rect class="ka-fblock" x="14" y="280" width="332" height="88" rx="10"/>
      <text class="ka-fsay" x="32" y="312">跑通了，不等于有用</text>
      <text class="ka-ftext" x="32" y="342">模型本来能过的，加它只多花钱</text>
    </svg>
    <div class="ka-fcap">图注：两个问题共用同一份 Skill，答案却来自两次不同的运行。</div>
  </div>
  <div class="ka-art-note">
    <p>一份 Skill 写完，最直接的验证就是跑一遍、过了。但这只回答了一个很窄的问题：这条路走得通。</p>
    <p>它没回答值不值——同一批任务，模型不带这份说明书也可能过。官方文档把话说得很直：看到 Skill 被触发，只说明模型找到了它，不说明它做出了你想要的输出。</p>
  </div>
  <h2 class="ka-art-h2">02 对照只差一个变量</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 一次对照要同时满足四个条件</div>
    <svg class="fig-w" viewBox="0 0 640 350" role="img" aria-label="基线对照的四个条件：同一批从真实失败里挑的任务、同一份能自动判对错的判据、干净会话、带与不带各跑一遍；只有带不带是变量，差出来的才是这份 Skill 的贡献">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">对照要只差一个变量</text>
      <rect class="ka-fblock" x="16" y="42" width="608" height="56" rx="10"/>
      <text class="ka-ftitle" x="36" y="78">同一批任务，从真实失败里挑</text>
      <path d="M320 100v28" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M315 128l5 9 5-9z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="16" y="142" width="192" height="76" rx="10"/>
      <text class="ka-fsmall" x="34" y="170" style="fill: var(--ka-muted)">判据</text>
      <text class="ka-ftext" x="34" y="196">同一份，自动判对错</text>
      <rect class="ka-fblock" x="224" y="142" width="192" height="76" rx="10"/>
      <text class="ka-fsmall" x="242" y="170" style="fill: var(--ka-muted)">会话</text>
      <text class="ka-ftext" x="242" y="196">干净，无作者残留</text>
      <rect class="ka-fblock" x="432" y="142" width="192" height="76" rx="10"/>
      <text class="ka-fsmall" x="450" y="170" style="fill: var(--ka-muted)">次数</text>
      <text class="ka-ftext" x="450" y="196">带一遍、不带一遍</text>
      <path d="M320 222v28" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M315 250l5 9 5-9z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="16" y="264" width="608" height="76" rx="10"/>
      <text class="ka-fsay" x="36" y="296">只差一个变量，差出来的才是它的贡献</text>
      <text class="ka-fsmall" x="36" y="322">四个条件少一个，对照就不再是对照</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 460" role="img" aria-label="基线对照的四个条件：同一批从真实失败里挑的任务、同一份能自动判对错的判据、干净会话、带与不带各跑一遍；只有带不带是变量，差出来的才是这份 Skill 的贡献">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">对照要只差一个变量</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="76" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-muted)">起点</text>
      <text class="ka-ftitle" x="32" y="100">同一批任务</text>
      <path d="M175 122l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="138" width="332" height="56" rx="9"/>
      <text class="ka-ftext" x="32" y="172">判据：同一份，自动判对错</text>
      <path d="M175 198l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="212" width="332" height="56" rx="9"/>
      <text class="ka-ftext" x="32" y="246">会话：干净，无作者残留</text>
      <path d="M175 272l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="286" width="332" height="56" rx="9"/>
      <text class="ka-ftext" x="32" y="320">次数：带一遍、不带一遍</text>
      <rect class="ka-fblock" x="14" y="362" width="332" height="84" rx="10"/>
      <text class="ka-fsay" x="32" y="394">只差一个变量</text>
      <text class="ka-ftext" x="32" y="424">差出来的才是这份 Skill 的贡献</text>
    </svg>
    <div class="ka-fcap">图注：四个条件里只有「带不带」是变量，其余三个必须一模一样。</div>
  </div>
  <div class="ka-art-note">
    <p>同一批任务，带 Skill 跑一遍，再关掉它跑一遍，两边用同一份判据打分。差别只在这一个变量上，差出来的才是它的贡献。</p>
    <p>两个细节决定对照成不成立：判据要能自动判对错，靠感觉打分的对照等于没做；要开干净会话，刚写完 Skill 的那个会话里做法还留在上下文，缺口会被盖住。</p>
  </div>
  <h2 class="ka-art-h2">03 平均分只回答一半</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 87 条任务的平均，与 13 条回退</div>
    <svg class="fig-w" viewBox="0 0 640 340" role="img" aria-label="87 条任务、18 组模型与框架配置的公开基准里，平均通过率从 33.9% 升到 50.5%，涨 16.6 个百分点；但各组配置增益从 4.1 到 25.7 差六倍，87 条里 13 条反而更差；平均分回答配置级问题，不回答单条任务">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">87 条任务：平均涨 16.6 分，13 条反而更差</text>
      <rect class="ka-fblock" x="16" y="42" width="180" height="104" rx="10"/>
      <text class="ka-fsmall" x="34" y="68" style="fill: var(--ka-muted)">不带 Skill</text>
      <text class="ka-fbig" x="34" y="112" style="fill: var(--ka-muted)">33.9%</text>
      <rect class="ka-fblock" x="216" y="42" width="180" height="104" rx="10"/>
      <text class="ka-fsmall" x="234" y="68" style="fill: var(--ka-muted)">带上 Skill</text>
      <text class="ka-fbig" x="234" y="112" style="fill: var(--ka-green)">50.5%</text>
      <rect class="ka-fblock" x="416" y="42" width="208" height="104" rx="10"/>
      <text class="ka-fsmall" x="434" y="68" style="fill: var(--ka-muted)">平均涨幅</text>
      <text class="ka-fbig" x="434" y="112" style="fill: var(--ka-amber)">+16.6</text>
      <rect class="ka-fblock" x="16" y="166" width="608" height="76" rx="10"/>
      <text class="ka-fsay" x="36" y="198">但平均分遮住了两件事</text>
      <text class="ka-ftext" x="36" y="226">各组配置的增益从 +4.1 到 +25.7（差六倍）；87 条里 13 条为负</text>
      <rect class="ka-fblock" x="16" y="256" width="608" height="64" rx="10"/>
      <text class="ka-fsay" x="36" y="288">平均分回答配置级问题</text>
      <text class="ka-ftext" x="36" y="312">不回答「你手上这条任务变好没」</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 370" role="img" aria-label="87 条任务、18 组模型与框架配置的公开基准里，平均通过率从 33.9% 升到 50.5%，涨 16.6 个百分点；但各组配置增益从 4.1 到 25.7 差六倍，87 条里 13 条反而更差；平均分回答配置级问题，不回答单条任务">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">87 条任务的平均，与 13 条回退</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="92" rx="9"/>
      <text class="ka-fsmall" x="32" y="68" style="fill: var(--ka-muted)">33.9% → 50.5%（87 条 × 18 组配置）</text>
      <text class="ka-fbig" x="32" y="112" style="fill: var(--ka-green)">+16.6 点</text>
      <rect class="ka-fblock" x="14" y="150" width="332" height="92" rx="9"/>
      <text class="ka-fsmall" x="32" y="176" style="fill: var(--ka-amber)">但是</text>
      <text class="ka-ftext" x="32" y="204">13 条加上它反而更差</text>
      <text class="ka-fsmall" x="32" y="230">各组增益 +4.1 到 +25.7</text>
      <rect class="ka-fblock" x="14" y="258" width="332" height="92" rx="10"/>
      <text class="ka-fsay" x="32" y="290">平均分管配置</text>
      <text class="ka-ftext" x="32" y="320">不管「你这条任务变好没」</text>
    </svg>
    <div class="ka-fcap">图注：平均分是配置级的结论，逐条比对才是任务级的结论。</div>
  </div>
  <div class="ka-art-note">
    <p>公开基准给出的数字：87 条任务、18 组模型与框架配置，平均通过率从 33.9% 升到 50.5%。同一份结果里还有两件事——各组增益从 +4.1 到 +25.7，差六倍；87 条里有 13 条加上 Skill 反而更差。</p>
    <p>也就是说，平均分回答的是「这套配置整体变好没」，不回答「你手上这条任务变好没」。11 月另一份基准也得出同向结论：整体增益与单条回退可以同时成立。</p>
  </div>
  <h2 class="ka-art-h2">04 三种结果，三种处置</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 4 · 逐条比对之后只会有三种情况</div>
    <svg class="fig-w" viewBox="0 0 640 300" role="img" aria-label="逐条比对后只有三种结果：更好就留下并记下改了哪一步，一样好说明模型本来就会应当删掉或瘦身，更差先回退再查是否有互相冲突的指令；一样好最容易被放过，测试全过其实什么都没证明">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">同一条任务，只会落到三种结果</text>
      <rect x="16" y="42" width="190" height="150" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fnum" x="34" y="70" style="fill: var(--ka-green)">更好</text>
      <text class="ka-ftext" x="34" y="104">留下</text>
      <text class="ka-fsmall" x="34" y="132">记下它改的是哪一步</text>
      <text class="ka-fsmall" x="34" y="158">下次照这条改</text>
      <rect x="222" y="42" width="190" height="150" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fnum" x="240" y="70" style="fill: var(--ka-amber)">一样好</text>
      <text class="ka-ftext" x="240" y="104">删掉或瘦身</text>
      <text class="ka-fsmall" x="240" y="132">模型本来就会</text>
      <text class="ka-fsmall" x="240" y="158">它只是多读一页</text>
      <rect x="428" y="42" width="196" height="150" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fnum" x="446" y="70" style="fill: var(--ka-rose)">更差</text>
      <text class="ka-ftext" x="446" y="104">先回退</text>
      <text class="ka-fsmall" x="446" y="132">再看是不是塞了</text>
      <text class="ka-fsmall" x="446" y="158">互相冲突的指令</text>
      <rect class="ka-fblock" x="16" y="210" width="608" height="76" rx="10"/>
      <text class="ka-fsay" x="36" y="242">「一样好」最容易被放过</text>
      <text class="ka-ftext" x="36" y="272">「测试全过」听起来像好消息，其实什么都没证明</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 450" role="img" aria-label="逐条比对后只有三种结果：更好就留下并记下改了哪一步，一样好说明模型本来就会应当删掉或瘦身，更差先回退再查是否有互相冲突的指令；一样好最容易被放过，测试全过其实什么都没证明">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">同一条任务，只会落到三种结果</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="92" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-green)">更好</text>
      <text class="ka-ftitle" x="32" y="100">留下</text>
      <text class="ka-ftext" x="32" y="124" style="font-size:13.5px">记下它改的是哪一步</text>
      <rect class="ka-fblock" x="14" y="146" width="332" height="92" rx="9"/>
      <text class="ka-fnum" x="32" y="172" style="fill: var(--ka-amber)">一样好</text>
      <text class="ka-ftitle" x="32" y="204">删掉或瘦身</text>
      <text class="ka-ftext" x="32" y="228" style="font-size:13.5px">模型本来就会，它只多读一页</text>
      <rect class="ka-fblock" x="14" y="250" width="332" height="92" rx="9"/>
      <text class="ka-fnum" x="32" y="276" style="fill: var(--ka-rose)">更差</text>
      <text class="ka-ftitle" x="32" y="308">先回退</text>
      <text class="ka-ftext" x="32" y="332" style="font-size:13.5px">再查是不是塞了冲突指令</text>
      <rect class="ka-fblock" x="14" y="364" width="332" height="72" rx="10"/>
      <text class="ka-fsay" x="32" y="396">一样好最容易被放过</text>
      <text class="ka-ftext" x="32" y="422">测试全过，其实什么都没证明</text>
    </svg>
    <div class="ka-fcap">图注：三种结果对应三种处置，「一样好」是唯一容易被当成好消息的一种。</div>
  </div>
  <div class="ka-art-note">
    <p>逐条比对之后只会落到三种情况：更好，留下并记下它改的是哪一步；一样好，说明模型本来就会，这份说明书现在只是多读一页、多花一次；更差，先回退，再看是不是塞进了互相冲突的指令。</p>
    <p>第三种最容易发现，第二种最容易被放过——「测试全过」听起来像好消息，其实什么都没证明。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：Anthropic 官方博客<a href="https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills" target="_blank" rel="noopener">《Improving skill-creator: Test, measure, and refine Agent Skills》</a>（eval、benchmark、盲比与描述调优；作者多为业务专家而非工程师）；Claude Code 官方文档<a href="https://docs.claude.com/en/docs/claude-code/skills" target="_blank" rel="noopener">《Extend Claude with skills》</a>（触发≠做对、基线对照、干净会话、低于阈值返回非零）；SkillsBench（arXiv:2602.12670，87 任务 / 8 领域 / 18 组配置，平均 33.9%→50.5%，配置级增益 +4.1~+25.7，13 条为负）；RecurSciBench（arXiv:2611.32508，2026-11-25 公开，整体增益与单条回退并存）。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/skill-sandbox/" data-no-popover="true"><div class="kn">← 上一篇</div><div class="kt">Skill 的脚本跑在谁的权限里</div></a>
    <a class="next" href="learn/d3/skills/skill-runtime/" data-no-popover="true"><div class="kn">回到第一篇 →</div><div class="kt">Skill 是怎么跑起来的</div></a>
  </nav>
</div>
