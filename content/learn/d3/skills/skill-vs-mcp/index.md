---
title: Skill 和 MCP 差在哪
publish: true
description: 一个负责让模型够得着外部系统，一个负责告诉模型该怎么干——两条链路、两件事，最后在同一份任务里叠着用。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · Skills 与能力封装</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-22</span>
    </div>
    <h1>Skill 和 MCP 差在哪</h1>
    <p class="ka-art-lede">这两个词总被摆在一起比，其实它们答的不是同一个问题：一个负责让模型够得着外部系统，一个负责告诉模型该怎么干。</p>
  </div>
  <h2 class="ka-art-h2">01 两条不一样的链路</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 同一句话，两种送达方式</div>
    <svg class="fig-w" viewBox="0 0 640 326" role="img" aria-label="Skill 走本地目录，模型用 bash 打开文件；MCP 走 JSON-RPC 协议，经宿主 client 转发到 server 再连外部系统">
      <text class="ka-fnum" x="16" y="20" style="fill: var(--ka-cyan)">SKILL · 磁盘上的目录</text>
      <rect class="ka-fblock" x="22" y="30" width="176" height="78" rx="9"/>
      <text class="ka-ftitle" x="40" y="62">用户请求</text>
      <text class="ka-ftext" x="40" y="86">跟 description 比对</text>
      <path d="M200 69h20" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M214 64l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="232" y="30" width="176" height="78" rx="9"/>
      <text class="ka-ftitle" x="250" y="62">模型</text>
      <text class="ka-ftext" x="250" y="86">用 bash 读文件</text>
      <path d="M410 69h20" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M424 64l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="442" y="30" width="176" height="78" rx="9"/>
      <text class="ka-ftitle" x="460" y="62">本地目录</text>
      <text class="ka-ftext" x="460" y="86">SKILL.md + 脚本</text>
      <text class="ka-fsmall" x="320" y="132" text-anchor="middle">不需要协议、不需要起服务、不需要账号</text>
      <text class="ka-fnum" x="16" y="172" style="fill: var(--ka-amber)">MCP · 一条协议</text>
      <rect class="ka-fblock" x="25" y="182" width="128" height="78" rx="9"/>
      <text class="ka-ftitle" x="41" y="214">模型</text>
      <text class="ka-ftext" x="41" y="238">发 tool_call</text>
      <path d="M155 221h18" stroke="var(--ka-amber)" stroke-width="2" opacity="0.55"/>
      <path d="M167 216l8 5-8 5z" fill="var(--ka-amber)" opacity="0.55"/>
      <rect class="ka-fblock" x="179" y="182" width="128" height="78" rx="9"/>
      <text class="ka-ftitle" x="195" y="214">宿主 client</text>
      <text class="ka-ftext" x="195" y="238">JSON-RPC 2.0</text>
      <path d="M309 221h18" stroke="var(--ka-amber)" stroke-width="2" opacity="0.55"/>
      <path d="M321 216l8 5-8 5z" fill="var(--ka-amber)" opacity="0.55"/>
      <rect class="ka-fblock" x="333" y="182" width="128" height="78" rx="9"/>
      <text class="ka-ftitle" x="349" y="214">MCP server</text>
      <text class="ka-ftext" x="349" y="238">执行 tools/call</text>
      <path d="M463 221h18" stroke="var(--ka-amber)" stroke-width="2" opacity="0.55"/>
      <path d="M475 216l8 5-8 5z" fill="var(--ka-amber)" opacity="0.55"/>
      <rect class="ka-fblock" x="487" y="182" width="128" height="78" rx="9"/>
      <text class="ka-ftitle" x="503" y="214">外部系统</text>
      <text class="ka-ftext" x="503" y="238">数据库 / SaaS</text>
      <text class="ka-fsmall" x="320" y="284" text-anchor="middle">先握手协商版本与能力，走授权，能跨应用复用</text>
      <text class="ka-fsay" x="320" y="314" text-anchor="middle">一条给做法，一条给能力——不是替代关系</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 776" role="img" aria-label="Skill 走本地目录，模型用 bash 打开文件；MCP 走 JSON-RPC 协议，经宿主 client 转发到 server 再连外部系统">
      <text class="ka-fnum" x="14" y="30" style="fill: var(--ka-cyan)">SKILL · 磁盘上的目录</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="72">用户请求</text>
      <text class="ka-ftext" x="32" y="98">模型拿它跟每份 description 比对</text>
      <path d="M175 116l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="126" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="156">模型</text>
      <text class="ka-ftext" x="32" y="182">用 bash 打开文件，像人在终端 cat</text>
      <path d="M175 200l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="210" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="240">本地目录</text>
      <text class="ka-ftext" x="32" y="266">SKILL.md、参考文档、脚本、素材</text>
      <text class="ka-fsmall" x="180" y="306" text-anchor="middle">不需要协议、不需要起服务、不需要账号</text>
      <text class="ka-fnum" x="14" y="350" style="fill: var(--ka-amber)">MCP · 一条协议</text>
      <rect class="ka-fblock" x="14" y="362" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="392">模型</text>
      <text class="ka-ftext" x="32" y="418">看到工具清单，发一个 tool_call</text>
      <path d="M175 436l5 8 5-8z" fill="var(--ka-amber)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="446" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="476">宿主里的 client</text>
      <text class="ka-ftext" x="32" y="502">把调用包成 JSON-RPC 2.0 发出去</text>
      <path d="M175 520l5 8 5-8z" fill="var(--ka-amber)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="530" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="560">MCP server</text>
      <text class="ka-ftext" x="32" y="586">执行 tools/call，做真实的动作</text>
      <path d="M175 604l5 8 5-8z" fill="var(--ka-amber)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="614" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="644">外部系统</text>
      <text class="ka-ftext" x="32" y="670">数据库、SaaS、内部接口</text>
      <text class="ka-fsmall" x="180" y="712" text-anchor="middle">先握手协商版本与能力，走授权，能跨应用复用</text>
      <text class="ka-fsay" x="180" y="750" text-anchor="middle">一条给做法，一条给能力</text>
    </svg>
    <div class="ka-fcap">图注：上排是 Skill 的路径，下排是 MCP 的路径。后面一条多了协议、授权和一个要长期运行的服务。</div>
  </div>
  <div class="ka-art-note">
    <p>同样是取一条数据。Skill 走本地目录：模型用 bash 打开文件，读完照着做，不要协议、不用起服务。MCP 走协议：模型发 <code>tool_call</code>，宿主里的 client 包成 JSON-RPC 发给 server，server 去连真实系统，结果原路返回。</p>
    <p>这也决定了它们坏起来的样子不同。前者的故障是「文件读不到」或「描述对不上，没想起它」；后者的故障是「连不上」「没授权」「版本不匹配」。排查方向完全不在一处。</p>
  </div>
  <h2 class="ka-art-h2">02 一个管能力，一个管做法</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 各自解决什么</div>
    <svg class="fig-w" viewBox="0 0 640 326" role="img" aria-label="MCP 负责能碰到什么：外部系统、工具、真实动作；Skill 负责该怎么做：顺序、判据、输出格式">
      <rect x="26" y="26" width="256" height="196" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="46" y="58">MCP · 能碰到什么</text>
      <text class="ka-ftext" x="46" y="92">外部系统、数据库、SaaS</text>
      <text class="ka-ftext" x="46" y="122">把真实动作暴露成工具</text>
      <text class="ka-ftext" x="46" y="152">要授权、要起服务、要处理断连</text>
      <text class="ka-fsmall" x="46" y="196">它让模型够得着</text>
      <text class="ka-fbig" x="320" y="136" text-anchor="middle" style="fill: var(--ka-faint)">+</text>
      <rect x="358" y="26" width="256" height="196" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="378" y="58">Skill · 该怎么做</text>
      <text class="ka-ftext" x="378" y="92">先查什么、按什么顺序做</text>
      <text class="ka-ftext" x="378" y="122">什么情况下别硬上</text>
      <text class="ka-ftext" x="378" y="152">输出该长什么样</text>
      <text class="ka-fsmall" x="378" y="196">它让模型做得对</text>
      <text class="ka-fsay" x="320" y="256" text-anchor="middle">有厨房没菜谱，设备摆着不会用</text>
      <text class="ka-fsay" x="320" y="284" text-anchor="middle">有菜谱没厨房，步骤再细也做不出来</text>
      <text class="ka-fsmall" x="320" y="312" text-anchor="middle">能力是加法，做法改的是判断</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 452" role="img" aria-label="MCP 负责能碰到什么：外部系统、工具、真实动作；Skill 负责该怎么做：顺序、判据、输出格式">
      <rect x="14" y="14" width="332" height="150" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="32" y="46">MCP · 能碰到什么</text>
      <text class="ka-ftext" x="32" y="78">外部系统、数据库、SaaS</text>
      <text class="ka-ftext" x="32" y="104">把真实动作暴露成工具</text>
      <text class="ka-ftext" x="32" y="130">要授权、起服务、处理断连</text>
      <text class="ka-fsmall" x="32" y="152">它让模型够得着</text>
      <text class="ka-fbig" x="180" y="200" text-anchor="middle" style="fill: var(--ka-faint)">+</text>
      <rect x="14" y="214" width="332" height="150" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="32" y="246">Skill · 该怎么做</text>
      <text class="ka-ftext" x="32" y="278">先查什么、按什么顺序做</text>
      <text class="ka-ftext" x="32" y="304">什么情况下别硬上</text>
      <text class="ka-ftext" x="32" y="330">输出该长什么样</text>
      <text class="ka-fsmall" x="32" y="352">它让模型做得对</text>
      <text class="ka-fsay" x="180" y="404" text-anchor="middle">有厨房没菜谱，设备摆着不会用</text>
      <text class="ka-fsay" x="180" y="430" text-anchor="middle">有菜谱没厨房，步骤再细也做不出来</text>
    </svg>
    <div class="ka-fcap">图注：两件事互不替代——一个管能力的有无，一个管做法的好坏。</div>
  </div>
  <div class="ka-art-note">
    <p>MCP 解决「够不着」。模型再聪明也碰不到你的数据库，协议把它接进来，代价是服务、授权和连接状态要有人管。</p>
    <p>Skill 不新增任何能力，它改的是判断：先查什么、什么情况别硬上、输出长什么样。同一套工具，配一份好 Skill 和没有，结果差得很远。</p>
  </div>
  <h2 class="ka-art-h2">03 一个任务里怎么接</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 两者叠在一起用</div>
    <svg class="fig-w" viewBox="0 0 640 292" role="img" aria-label="同一个任务里，Skill 提供顺序、判据和输出格式，MCP 提供订单接口、库存数据库、邮件发送等真实能力">
      <text class="ka-fsmall" x="22" y="18">SKILL 给的</text>
      <text class="ka-fsmall" x="428" y="18">MCP 给的</text>
      <rect class="ka-fblock" x="22" y="26" width="190" height="56" rx="9"/>
      <text class="ka-ftext" x="38" y="60">先取数，再校验</text>
      <rect class="ka-fblock" x="22" y="92" width="190" height="56" rx="9"/>
      <text class="ka-ftext" x="38" y="126">取不到就报空，别猜</text>
      <rect class="ka-fblock" x="22" y="158" width="190" height="56" rx="9"/>
      <text class="ka-ftext" x="38" y="192">输出三行结论</text>
      <path d="M212 54L234 128" stroke="var(--ka-cyan)" stroke-width="1.5" opacity="0.45"/>
      <path d="M212 120h22" stroke="var(--ka-cyan)" stroke-width="1.5" opacity="0.45"/>
      <path d="M212 186L234 172" stroke="var(--ka-cyan)" stroke-width="1.5" opacity="0.45"/>
      <rect class="ka-fblock" x="236" y="104" width="168" height="96" rx="9"/>
      <text class="ka-ftitle" x="256" y="138">一次任务</text>
      <text class="ka-ftext" x="256" y="164">模型 + 当前上下文</text>
      <text class="ka-fsmall" x="256" y="186">边做边判断</text>
      <path d="M404 128L428 58" stroke="var(--ka-amber)" stroke-width="1.5" opacity="0.45"/>
      <path d="M404 146h22" stroke="var(--ka-amber)" stroke-width="1.5" opacity="0.45"/>
      <path d="M404 168L428 188" stroke="var(--ka-amber)" stroke-width="1.5" opacity="0.45"/>
      <rect class="ka-fblock" x="428" y="26" width="190" height="56" rx="9"/>
      <text class="ka-ftext" x="444" y="60">订单接口</text>
      <rect class="ka-fblock" x="428" y="92" width="190" height="56" rx="9"/>
      <text class="ka-ftext" x="444" y="126">库存数据库</text>
      <rect class="ka-fblock" x="428" y="158" width="190" height="56" rx="9"/>
      <text class="ka-ftext" x="444" y="192">邮件发送</text>
      <text class="ka-fsay" x="320" y="244" text-anchor="middle">Skill 决定怎么想，MCP 决定能碰到什么</text>
      <text class="ka-fsmall" x="320" y="274" text-anchor="middle">两个都缺，任务要么做不对，要么做不了</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 492" role="img" aria-label="同一个任务里，Skill 提供顺序、判据和输出格式，MCP 提供订单接口、库存数据库、邮件发送等真实能力">
      <rect class="ka-fblock" x="14" y="14" width="332" height="130" rx="9"/>
      <text class="ka-fnum" x="32" y="44" style="fill: var(--ka-cyan)">01 · Skill 给的</text>
      <text class="ka-ftitle" x="32" y="76">做法</text>
      <text class="ka-ftext" x="32" y="104">先取数、取不到就报空、输出三行</text>
      <text class="ka-ftext" x="32" y="128">这套顺序不随工具换而变</text>
      <path d="M175 152l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="162" width="332" height="88" rx="9"/>
      <text class="ka-fnum" x="32" y="192">02 · 任务里</text>
      <text class="ka-ftitle" x="32" y="222">模型照它做</text>
      <text class="ka-ftext" x="32" y="244">在同一份上下文里边做边判断</text>
      <path d="M175 258l5 8 5-8z" fill="var(--ka-amber)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="268" width="332" height="130" rx="9"/>
      <text class="ka-fnum" x="32" y="298" style="fill: var(--ka-amber)">03 · MCP 给的</text>
      <text class="ka-ftitle" x="32" y="330">能力</text>
      <text class="ka-ftext" x="32" y="358">订单接口、库存数据库、邮件发送</text>
      <text class="ka-ftext" x="32" y="382">换一家系统，只换这一段</text>
      <text class="ka-fsay" x="180" y="436" text-anchor="middle">Skill 决定怎么想</text>
      <text class="ka-fsay" x="180" y="464" text-anchor="middle">MCP 决定能碰到什么，都缺就做不成</text>
    </svg>
    <div class="ka-fcap">图注：两条供给汇到同一次执行——一条给做法，一条给能力。</div>
  </div>
  <div class="ka-art-note">
    <p>实际项目里两者几乎总是叠着用：Skill 正文里写「用那个工具取数，取不到就报空，别猜」，MCP 负责把那个工具送到模型手上。换一家后台系统，Skill 那套步骤能原样留下，只换 MCP 那一段。</p>
    <p>一句话记分界：<em>Skill 管怎么做，MCP 管能碰到什么</em>。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://modelcontextprotocol.io/docs/learn/architecture" target="_blank" rel="noopener">MCP 规范 · Architecture overview</a>（JSON-RPC 2.0、initialize 协商、tools 原语）· <a href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview" target="_blank" rel="noopener">Claude 平台文档 · Agent Skills</a>。厨房与菜谱的类比出自 Anthropic 对 Skills 的公开说明。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/skill-runtime/" data-no-popover="true"><div class="kn">上一篇 →</div><div class="kt">Skill 是怎么跑起来的</div></a>
  </nav>
</div>
