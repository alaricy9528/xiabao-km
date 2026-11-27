---
title: Skill 指令在压缩后的去向
publish: true
description: Skill 激活后不是每次重读文件，而是作为一条消息留在上下文里；Claude Code 压缩会话时按预算重附，额度按最近调用顺序分配，调用多了最早的那几份会被整条丢掉。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · Skills 与能力封装</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-26</span>
    </div>
    <h1>Skill 指令在压缩后的去向</h1>
    <p class="ka-art-lede">Skill 是装在磁盘上的说明书，token 是按字数付的钱。Skill 被用上后，正文不是每轮重读，而是作为一条消息留在对话里——还能不能生效，取决于压缩那一刻的取舍。</p>
  </div>
  <h2 class="ka-art-h2">01 进来一次，之后是副本</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 一条 Skill 指令的四个阶段</div>
    <svg class="fig-w" viewBox="0 0 640 316" role="img" aria-label="Skill 指令的四个阶段：激活时渲染整份正文作为一条消息，后续轮次不再重读文件，上下文压缩时按预算重新附加，超预算的整条丢弃">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">一份 Skill 正文的四个阶段</text>
      <rect class="ka-fblock" x="16" y="42" width="126" height="120" rx="9"/>
      <text class="ka-fnum" x="30" y="68" style="fill: var(--ka-muted)">01</text>
      <text class="ka-ftitle" x="30" y="100">激活</text>
      <text class="ka-ftext" x="30" y="128">整份正文渲染</text>
      <text class="ka-ftext" x="30" y="150">成一条消息</text>
      <path d="M146 102h26" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M172 97l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="180" y="42" width="126" height="120" rx="9"/>
      <text class="ka-fnum" x="194" y="68" style="fill: var(--ka-cyan)">02</text>
      <text class="ka-ftitle" x="194" y="100">常驻</text>
      <text class="ka-ftext" x="194" y="128">后面几轮不再</text>
      <text class="ka-ftext" x="194" y="150">重读那个文件</text>
      <path d="M310 102h26" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M336 97l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="344" y="42" width="126" height="120" rx="9"/>
      <text class="ka-fnum" x="358" y="68" style="fill: var(--ka-amber)">03</text>
      <text class="ka-ftitle" x="358" y="100">压缩</text>
      <text class="ka-ftext" x="358" y="128">旧消息被摘要</text>
      <text class="ka-ftext" x="358" y="150">正文可能退出</text>
      <path d="M474 102h26" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M500 97l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="508" y="42" width="116" height="120" rx="9"/>
      <text class="ka-fnum" x="522" y="68" style="fill: var(--ka-green)">04</text>
      <text class="ka-ftitle" x="522" y="100">重附</text>
      <text class="ka-ftext" x="522" y="128">有预算才塞</text>
      <text class="ka-ftext" x="522" y="150">回来一份</text>
      <rect class="ka-fblock" x="16" y="196" width="608" height="88" rx="10"/>
      <text class="ka-fsay" x="36" y="228">上下文里放的是一份消息副本</text>
      <text class="ka-ftext" x="36" y="260">激活时读一次文件，常规轮次不再重读</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 650" role="img" aria-label="Skill 指令的四个阶段：激活时渲染整份正文作为一条消息，后续轮次不再重读文件，上下文压缩时按预算重新附加，超预算的整条丢弃">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">一份 Skill 正文的四个阶段</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="66" style="fill: var(--ka-muted)">01 激活</text>
      <text class="ka-ftitle" x="32" y="98">整份正文渲染成一条消息</text>
      <text class="ka-ftext" x="32" y="126">这一刻才真正读文件</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="194" style="fill: var(--ka-cyan)">02 常驻</text>
      <text class="ka-ftitle" x="32" y="226">后面几轮不再重读文件</text>
      <text class="ka-ftext" x="32" y="254">每一行都占着额度</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="322" style="fill: var(--ka-amber)">03 压缩</text>
      <text class="ka-ftitle" x="32" y="354">旧消息被摘要掉</text>
      <text class="ka-ftext" x="32" y="382">正文可能一起退出</text>
      <path d="M169 410l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="424" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="450" style="fill: var(--ka-green)">04 重附</text>
      <text class="ka-ftitle" x="32" y="482">有预算才塞回一份</text>
      <text class="ka-ftext" x="32" y="510">没预算就整条丢掉</text>
      <rect class="ka-fblock" x="14" y="560" width="332" height="84" rx="10"/>
      <text class="ka-fsay" x="32" y="592">上下文里放的是副本</text>
      <text class="ka-ftext" x="32" y="622">激活时读一次，常规轮次不再重读</text>
    </svg>
    <div class="ka-fcap">图注：四个阶段依次发生，只有第一步真的在读磁盘；之后处理的是上下文里那份副本，压缩时按预算重新附加（按预算重附为 Claude Code 的做法）。</div>
  </div>
  <div class="ka-art-note">
    <p>Skill 被用上时，整份正文渲染成一条消息进对话。之后宿主（跑大模型的那个程序）不再每轮重读文件——它就在里面放着，每行都占额度。</p>
    <p>常规轮次沿用的就是那份副本，所以官方建议把贯穿任务的指导写成常驻指令，而不是一次性步骤。</p>
  </div>
  <h2 class="ka-art-h2">02 压缩时按预算分名额</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 压缩后的重附额度</div>
        <svg class="fig-w" viewBox="0 0 640 348" role="img" aria-label="压缩后重附时每个技能最多保留最近一次调用的前 5000 token，所有技能合计 25000 token，按最近调用优先填充；按 8 个技能各占满 5000 的算例，只有 5 个能整份留下">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">压缩之后，额度是这么分的</text>
      <rect class="ka-fblock" x="16" y="42" width="290" height="96" rx="10"/>
      <text class="ka-fsmall" x="34" y="68">单个技能最多留</text>
      <text class="ka-fbig" x="34" y="112" style="fill: var(--ka-cyan)">5,000</text>
      <text class="ka-ftext" x="132" y="112">token</text>
      <text class="ka-fsmall" x="34" y="130">超出的部分直接截掉</text>
      <rect class="ka-fblock" x="322" y="42" width="302" height="96" rx="10"/>
      <text class="ka-fsmall" x="340" y="68">所有技能合计只有</text>
      <text class="ka-fbig" x="340" y="112" style="fill: var(--ka-amber)">25,000</text>
      <text class="ka-ftext" x="438" y="112">token</text>
      <text class="ka-fsmall" x="340" y="130">名额按最近调用往回分</text>
      <text class="ka-fsmall" x="16" y="176">用了 8 个技能，每个占满 5,000，合计 40,000</text>
      <rect x="16" y="192" width="72" height="44" rx="7" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="94" y="192" width="72" height="44" rx="7" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="172" y="192" width="72" height="44" rx="7" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="250" y="192" width="72" height="44" rx="7" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="328" y="192" width="72" height="44" rx="7" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="406" y="192" width="72" height="44" rx="7" fill="none" stroke="var(--ka-rose)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <rect x="484" y="192" width="72" height="44" rx="7" fill="none" stroke="var(--ka-rose)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <rect x="562" y="192" width="62" height="44" rx="7" fill="none" stroke="var(--ka-rose)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text class="ka-fsmall" x="16" y="258">最近调用的一次</text>
      <text class="ka-fsmall" x="624" y="258" text-anchor="end">最早调用的几份</text>
      <rect class="ka-fblock" x="16" y="272" width="608" height="60" rx="10"/>
      <text class="ka-fsay" x="36" y="300">名额只够 5 个，另外 3 个整份省略</text>
      <text class="ka-ftext" x="36" y="322">两种结果：单个超长截到 5,000；名额不够整份不进上下文</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 620" role="img" aria-label="压缩后重附时每个技能最多保留最近一次调用的前 5000 token，所有技能合计 25000 token，按最近调用优先填充；按 8 个技能各占满 5000 的算例，只有 5 个能整份留下">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">压缩之后，额度是这么分的</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="92" rx="10"/>
      <text class="ka-fsmall" x="32" y="66">单个技能最多保留</text>
      <text class="ka-fbig" x="32" y="110" style="fill: var(--ka-cyan)">5,000</text>
      <text class="ka-ftext" x="130" y="110">token</text>
      <rect class="ka-fblock" x="14" y="144" width="332" height="92" rx="10"/>
      <text class="ka-fsmall" x="32" y="170">所有技能合计只有</text>
      <text class="ka-fbig" x="32" y="214" style="fill: var(--ka-amber)">25,000</text>
      <text class="ka-ftext" x="146" y="214">token</text>
      <text class="ka-fsmall" x="14" y="264">每个占满 5,000，8 个共 40,000，只装下 5 个</text>
      <rect x="32" y="280" width="56" height="34" rx="6" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="94" y="280" width="56" height="34" rx="6" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="156" y="280" width="56" height="34" rx="6" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="218" y="280" width="56" height="34" rx="6" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="280" y="280" width="46" height="34" rx="6" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="32" y="326" width="56" height="34" rx="6" fill="none" stroke="var(--ka-rose)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <rect x="94" y="326" width="56" height="34" rx="6" fill="none" stroke="var(--ka-rose)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <rect x="156" y="326" width="56" height="34" rx="6" fill="none" stroke="var(--ka-rose)" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text class="ka-fsmall" x="220" y="350" style="fill: var(--ka-rose)">被挤掉 3 份</text>
      <rect class="ka-fblock" x="14" y="382" width="332" height="96" rx="10"/>
      <text class="ka-fsay" x="32" y="416">从最近调用往回填</text>
      <text class="ka-ftext" x="32" y="446">越早用的越先丢，不是截短</text>
      <text class="ka-ftext" x="32" y="470">是整条从头就不在了</text>
      <rect class="ka-fblock" x="14" y="494" width="332" height="106" rx="10"/>
      <text class="ka-fsay" x="32" y="528">名额不够，整份省略</text>
      <text class="ka-ftext" x="32" y="558">单个本身超长，才截到 5,000</text>
      <text class="ka-ftext" x="32" y="582">两者不是一回事</text>
    </svg>
    <div class="ka-fcap">图注：额度按最近调用依次填满，越往后的技能越先失去名额——这和「谁更重要」无关。</div>
  </div>
  <div class="ka-art-note">
    <p>Claude Code 的做法是重新分名额：每个 Skill 只留最近一次调用的前 5,000 token（超出的截掉），全部共享 25,000 token（名额不够的整份省略），从最近调用填。</p>
    <p>8 个 Skill 各占满额要 40,000，名额只够 5 个——更早的那几份整份不进上下文，模型仍会继续运行。</p>
  </div>
  <h2 class="ka-art-h2">03 不保护，就可能悄悄失效</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 两种宿主的两种结果</div>
        <svg class="fig-w" viewBox="0 0 640 260" role="img" aria-label="宿主把 Skill 内容标记为受保护时压缩会跳过它，指令仍留在上下文里；当普通消息时可能被摘要吞掉，模型照跑且没有可见报错">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">同样一次压缩，两种宿主的处理</text>
      <rect x="16" y="40" width="290" height="196" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="34" y="72" style="fill: var(--ka-green)">保留指令</text>
      <text class="ka-ftext" x="34" y="106">Skill 内容打上标记</text>
      <text class="ka-ftext" x="34" y="134">压缩时被跳过</text>
      <text class="ka-ftext" x="34" y="162">指令仍在上下文里</text>
      <text class="ka-fsmall" x="34" y="196">实现指南第 5 步的明确要求</text>
      <text class="ka-fsmall" x="34" y="220">结构化标签就是为了能被认出来</text>
      <path d="M316 138h30" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M346 133l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect x="356" y="40" width="268" height="196" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="374" y="72" style="fill: var(--ka-rose)">当普通消息</text>
      <text class="ka-ftext" x="374" y="106">混在其他消息里</text>
      <text class="ka-ftext" x="374" y="134">可能被一起摘要掉</text>
      <text class="ka-ftext" x="374" y="162">模型照跑，没有可见报错</text>
      <text class="ka-fsmall" x="374" y="196">不报错，也不提示</text>
      <text class="ka-fsmall" x="374" y="220">但可能从此不再照它做</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 300" role="img" aria-label="宿主把 Skill 内容标记为受保护时压缩会跳过它，指令仍留在上下文里；当普通消息时可能被摘要吞掉，模型照跑且没有可见报错">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">同样一次压缩，两种处理</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="66" style="fill: var(--ka-green)">做对了</text>
      <text class="ka-ftitle" x="32" y="98">Skill 内容打标记</text>
      <text class="ka-ftext" x="32" y="126">压缩时跳过，指令仍留着</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="194" style="fill: var(--ka-rose)">没做</text>
      <text class="ka-ftitle" x="32" y="226">当普通消息处理</text>
      <text class="ka-ftext" x="32" y="254">可能和别的消息一起被摘要掉</text>
    </svg>
    <div class="ka-fcap">图注：差别只在压缩时认不认得这段是 Skill 的指令——认不出，它可能和普通旧消息一起被摘要掉，而整个过程没有可见报错。</div>
  </div>
  <div class="ka-art-note">
    <p>实现指南要求：宿主截断旧消息时，要把 Skill 内容从剪枝（压缩时删消息）里豁免，它是<strong>贯穿任务的约束</strong>，丢了不报错，模型也不因此停下。</p>
    <p>做法是给输出打保护标记，或靠结构化标签认出它。没做这步，长会话里「Skill 忽然不管用」就有了机制解释。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener">Claude Code 文档 · Skill content lifecycle</a>——压缩后重附、单技能 5,000 token 上限、合计 25,000 token 预算、按最近调用填充，均出自该节；<a href="https://agentskills.io/client-implementation/adding-skills-support" target="_blank" rel="noopener">Agent Skills · How to add skills support to your agent</a>——第 4 步结构化包装、第 5 步豁免剪枝与去重（含「丢失时无任何可见报错」的表述）。两处均于 2026-11-26 核验可访问。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/skill-sharing/" data-no-popover="true"><div class="kn">下一篇 →</div><div class="kt">一个 Skill 怎么装到别人的 Agent 里</div></a>
  </nav>
</div>
