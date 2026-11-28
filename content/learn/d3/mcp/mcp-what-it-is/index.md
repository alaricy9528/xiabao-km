---
title: MCP 到底约定了什么
publish: true
description: MCP 把「每个应用各写各的集成」变成「每边实现一次协议」。它约定了三方角色、JSON-RPC 2.0 消息、能力协商与两侧能力清单——安全原则写在协议里，执行在宿主手里。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>MCP</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-05 · MCP</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-29</span>
    </div>
    <h1>MCP 到底约定了什么</h1>
    <p class="ka-art-lede">把「每个应用各写各的集成」变成「每边实现一次协议」。MCP 约定了角色、消息、协商与两侧能力，也划出了它不管的部分。</p>
  </div>
  <h2 class="ka-art-h2">01 它解决的根本问题：N×M 变 N+M</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · MCP 补的是哪一格</div>
    <svg class="fig-w" viewBox="0 0 640 300" role="img" aria-label="架构定位：宿主与外部系统之间由 MCP 提供公共接口层，没有公共接口时 N 个应用乘 M 个系统要写 N×M 份定制集成，有了协议每边只实现一次、降成 N+M 份，灵感来自语言服务器协议 LSP">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">先定位：补的是哪一格</text>
      <rect class="ka-fblock" x="16" y="40" width="176" height="110" rx="9"/>
      <text class="ka-ftitle" x="32" y="72">宿主（AI 应用）</text>
      <text class="ka-ftext" x="32" y="100">每家都要接外部系统</text>
      <text class="ka-ftext" x="32" y="124">模型、数据、工具各一套</text>
      <path d="M200 95h20" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M224 90l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="240" y="40" width="156" height="110" rx="9"/>
      <text class="ka-ftitle" x="256" y="72" style="fill: var(--ka-cyan)">MCP 接口层</text>
      <text class="ka-ftext" x="256" y="100">一套公共约定</text>
      <text class="ka-ftext" x="256" y="124">双方照着实现</text>
      <path d="M404 95h20" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M428 90l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="448" y="40" width="176" height="110" rx="9"/>
      <text class="ka-ftitle" x="464" y="72">外部系统</text>
      <text class="ka-ftext" x="464" y="100">数据、工具、服务</text>
      <text class="ka-ftext" x="464" y="124">各家接口都不一样</text>
      <rect class="ka-fblock" x="16" y="170" width="608" height="70" rx="10"/>
      <text class="ka-ftext" x="36" y="200">没有公共接口：N 个应用 × M 个系统 = N×M 份定制集成</text>
      <text class="ka-ftext" x="36" y="226" style="fill: var(--ka-green)">有了公共约定：每边实现一次 = N+M 份</text>
      <rect class="ka-fblock" x="16" y="254" width="608" height="40" rx="10"/>
      <text class="ka-fsay" x="36" y="280">它占的是宿主与外部系统之间的接口层——灵感来自 LSP</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 626" role="img" aria-label="架构定位：宿主与外部系统之间由 MCP 提供公共接口层，没有公共接口时 N 个应用乘 M 个系统要写 N×M 份定制集成，有了协议每边只实现一次、降成 N+M 份，灵感来自语言服务器协议 LSP">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">先定位：补的是哪一格</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-rose)">没有公共接口</text>
      <text class="ka-ftitle" x="32" y="104">N×M 份定制集成</text>
      <text class="ka-ftext" x="32" y="130">每个应用各写各的胶水代码</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196" style="fill: var(--ka-cyan)">MCP 补的一格</text>
      <text class="ka-ftitle" x="32" y="232">宿主与外部系统之间</text>
      <text class="ka-ftext" x="32" y="258">一层公共接口约定</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324" style="fill: var(--ka-green)">账怎么变</text>
      <text class="ka-ftitle" x="32" y="360">N×M 变 N+M</text>
      <text class="ka-ftext" x="32" y="386">每边只实现一次协议</text>
      <path d="M169 410l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="424" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="452">同类先例</text>
      <text class="ka-ftitle" x="32" y="488">灵感来自 LSP</text>
      <text class="ka-ftext" x="32" y="514">编辑器生态用同一招接语言</text>
      <rect class="ka-fblock" x="14" y="552" width="332" height="60" rx="10"/>
      <text class="ka-fsay" x="32" y="580">它是接口约定</text>
      <text class="ka-ftext" x="32" y="602">不是智能体之间的协议</text>
    </svg>
    <div class="ka-fcap">图注：MCP 占的是宿主与外部系统之间的接口层；集成账从 N×M 份收敛到 N+M 份，越往后越省。</div>
  </div>
  <div class="ka-art-note">
    <p>MCP 解决的根本问题是一对一的重复集成：没有公共接口时，N 个 AI 应用接 M 个外部系统，就要写 N×M 份定制胶水代码；大家都实现同一套协议后，每边只做一次，成本降成 N+M。它在架构里占的是「宿主与外部系统之间的接口层」，灵感来自编辑器生态接编程语言的语言服务器协议（LSP）。</p>
  </div>
  <h2 class="ka-art-h2">02 约定了三方角色与一种消息格式</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 三方角色与一条信封</div>
    <svg class="fig-w" viewBox="0 0 640 340" role="img" aria-label="三方角色：宿主内含模型与客户端，一个客户端对一个服务器，服务器包住内部系统或外部工具，全部消息统一用 JSON-RPC 2.0 一种格式">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">三方角色与一种信封</text>
      <rect class="ka-fblock" x="16" y="40" width="296" height="240" rx="10"/>
      <text class="ka-ftitle" x="36" y="70">宿主（AI 应用）</text>
      <rect class="ka-fblock" x="36" y="84" width="120" height="44" rx="8"/>
      <text class="ka-ftext" x="52" y="112">模型</text>
      <rect class="ka-fblock" x="36" y="146" width="120" height="46" rx="8"/>
      <text class="ka-ftext" x="52" y="175">客户端 ①</text>
      <rect class="ka-fblock" x="36" y="210" width="120" height="46" rx="8"/>
      <text class="ka-ftext" x="52" y="239">客户端 ②</text>
      <path d="M316 169h24" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M344 164l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="352" y="132" width="120" height="64" rx="9"/>
      <text class="ka-ftitle" x="368" y="162">服务器 A</text>
      <text class="ka-ftext" x="368" y="186">包住内部系统</text>
      <path d="M316 233h24" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M344 228l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="352" y="210" width="120" height="64" rx="9"/>
      <text class="ka-ftitle" x="368" y="240">服务器 B</text>
      <text class="ka-ftext" x="368" y="264">包住外部工具</text>
      <rect class="ka-fblock" x="486" y="40" width="138" height="240" rx="10"/>
      <text class="ka-ftitle" x="502" y="72" style="fill: var(--ka-cyan)">消息信封</text>
      <text class="ka-ftext" x="502" y="104">JSON-RPC 2.0</text>
      <text class="ka-ftext" x="502" y="132">全程一种格式</text>
      <text class="ka-fsmall" x="502" y="160">请求、响应、通知</text>
      <rect class="ka-fblock" x="16" y="296" width="608" height="44" rx="10"/>
      <text class="ka-ftext" x="36" y="318">一个客户端只对一个服务器；服务器只管把能力包起来提供</text>
      <text class="ka-ftext" x="36" y="334">模型始终待在宿主里，不直接接触外部系统</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 626" role="img" aria-label="三方角色：宿主内含模型与客户端，一个客户端对一个服务器，服务器包住内部系统或外部工具，全部消息统一用 JSON-RPC 2.0 一种格式">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">三方角色与一种信封</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">宿主</text>
      <text class="ka-ftitle" x="32" y="104">内含模型与客户端</text>
      <text class="ka-ftext" x="32" y="130">一个客户端对一个服务器</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196" style="fill: var(--ka-amber)">服务器</text>
      <text class="ka-ftitle" x="32" y="232">包住外部系统与数据</text>
      <text class="ka-ftext" x="32" y="258">只管把能力提供出来</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324" style="fill: var(--ka-green)">消息格式</text>
      <text class="ka-ftitle" x="32" y="360">全程 JSON-RPC 2.0</text>
      <text class="ka-ftext" x="32" y="386">宿主与服务器说同一种话</text>
      <path d="M169 410l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="424" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="452">结论</text>
      <text class="ka-ftitle" x="32" y="488">三方角色先站对位置</text>
      <text class="ka-ftext" x="32" y="514">接口约定才立得住</text>
      <rect class="ka-fblock" x="14" y="552" width="332" height="60" rx="10"/>
      <text class="ka-fsay" x="32" y="580">一个客户端对一个服务器</text>
      <text class="ka-ftext" x="32" y="602">服务器之间互不相认</text>
    </svg>
    <div class="ka-fcap">图注：宿主、客户端、服务器依次站位；一个客户端对一个服务器，全程只用 JSON-RPC 2.0 一种信封。</div>
  </div>
  <div class="ka-art-note">
    <p>协议约定三方角色：发起连接的宿主、宿主内部的客户端、提供能力的服务器——一个客户端只对一个服务器，服务器之间互不相认。所有往来消息统一用 JSON-RPC 2.0 这一种信封，这是整套约定的地基。</p>
  </div>
  <h2 class="ka-art-h2">03 约定了先协商再干活</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 能力协商与两个修订档</div>
    <svg class="fig-w" viewBox="0 0 640 340" role="img" aria-label="能力协商三步：建立连接、互报版本与能力、按声明行事；2025-11-25 修订在握手时一次协商且连接有状态，2026-07-28 修订取消握手按请求声明且无状态，扩展另册管理双方自愿启用">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">先问有什么，再干活</text>
      <rect class="ka-fblock" x="16" y="40" width="180" height="110" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">01</text>
      <text class="ka-ftitle" x="32" y="100">建立连接</text>
      <text class="ka-ftext" x="32" y="128">宿主发起，服务器接住</text>
      <path d="M196 95h24" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M222 90l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="230" y="40" width="180" height="110" rx="9"/>
      <text class="ka-fnum" x="246" y="68" style="fill: var(--ka-amber)">02</text>
      <text class="ka-ftitle" x="246" y="100">互报版本与能力</text>
      <text class="ka-ftext" x="246" y="128">各自声明能做什么</text>
      <path d="M410 95h24" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M436 90l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="444" y="40" width="180" height="110" rx="9"/>
      <text class="ka-fnum" x="460" y="68" style="fill: var(--ka-green)">03</text>
      <text class="ka-ftitle" x="460" y="100">按声明行事</text>
      <text class="ka-ftext" x="460" y="128">没声明的能力不能用</text>
      <rect class="ka-fblock" x="16" y="170" width="608" height="104" rx="10"/>
      <text class="ka-ftext" x="36" y="200">2025-11-25 修订：握手时一次协商，连接有状态</text>
      <text class="ka-ftext" x="36" y="226">2026-07-28 修订：取消握手，每个请求自带声明，连接无状态</text>
      <text class="ka-fsmall" x="36" y="252">扩展（Tasks、Skills over MCP、MCP Apps）另册管理，双方自愿启用</text>
      <rect class="ka-fblock" x="16" y="288" width="608" height="44" rx="10"/>
      <text class="ka-fsay" x="36" y="316">能力不是猜出来的——协议要求显式声明</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 748" role="img" aria-label="能力协商三步：建立连接、互报版本与能力、按声明行事；2025-11-25 修订在握手时一次协商且连接有状态，2026-07-28 修订取消握手按请求声明且无状态">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">先问有什么，再干活</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">01 建立连接</text>
      <text class="ka-ftitle" x="32" y="104">宿主发起，服务器接住</text>
      <text class="ka-ftext" x="32" y="130">连接的起点</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196" style="fill: var(--ka-amber)">02 互报版本与能力</text>
      <text class="ka-ftitle" x="32" y="232">各自声明能做什么</text>
      <text class="ka-ftext" x="32" y="258">协商就发生在这一步</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324" style="fill: var(--ka-green)">03 按声明行事</text>
      <text class="ka-ftitle" x="32" y="360">没声明的能力不能用</text>
      <text class="ka-ftext" x="32" y="386">边界来自声明</text>
      <path d="M169 410l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="424" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="452">修订档一</text>
      <text class="ka-ftitle" x="32" y="488">握手时一次协商</text>
      <text class="ka-ftext" x="32" y="514">连接有状态（2025-11-25）</text>
      <path d="M169 538l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="552" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="580">修订档二</text>
      <text class="ka-ftitle" x="32" y="616">按请求自带声明</text>
      <text class="ka-ftext" x="32" y="642">连接无状态（2026-07-28）</text>
      <rect class="ka-fblock" x="14" y="680" width="332" height="60" rx="10"/>
      <text class="ka-fsay" x="32" y="708">能力靠显式声明</text>
      <text class="ka-ftext" x="32" y="730">不是猜出来的</text>
    </svg>
    <div class="ka-fcap">图注：连接、互报、按声明行事依次进行；协商的具体做法有两个修订档，越往后越轻。</div>
  </div>
  <div class="ka-art-note">
    <p>第二层约定是「先问有什么，再干活」：连接时双方互报协议版本与各自能力，之后只按声明过的能力行事。具体做法有两个档：2025-11-25 修订在握手时一次协商，连接有状态；2026-07-28 修订取消握手，每个请求自带能力声明，连接无状态。常见误读：以为能力是猜出来的——规范要求显式声明。</p>
  </div>
  <h2 class="ka-art-h2">04 约定了两侧各能提供什么</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 4 · 服务器三原语与客户端反向能力</div>
    <svg class="fig-w" viewBox="0 0 640 340" role="img" aria-label="服务器提供资源、提示、工具三原语，客户端可反向提供采样、根目录、信息征询，两侧清单合起来才是 MCP 的能力面">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">两侧各能提供什么</text>
      <rect class="ka-fblock" x="16" y="40" width="300" height="34" rx="8"/>
      <text class="ka-ftext" x="36" y="63" style="fill: var(--ka-cyan)">服务器提供</text>
      <rect class="ka-fblock" x="16" y="84" width="300" height="56" rx="8"/>
      <text class="ka-ftitle" x="36" y="112">资源</text>
      <text class="ka-ftext" x="36" y="132">给人和模型读的数据</text>
      <rect class="ka-fblock" x="16" y="150" width="300" height="56" rx="8"/>
      <text class="ka-ftitle" x="36" y="178">提示</text>
      <text class="ka-ftext" x="36" y="198">给用户的模板化工作流</text>
      <rect class="ka-fblock" x="16" y="216" width="300" height="56" rx="8"/>
      <text class="ka-ftitle" x="36" y="244">工具</text>
      <text class="ka-ftext" x="36" y="264">给模型执行的函数</text>
      <rect class="ka-fblock" x="352" y="40" width="272" height="34" rx="8"/>
      <text class="ka-ftext" x="372" y="63" style="fill: var(--ka-amber)">客户端可反向提供</text>
      <rect class="ka-fblock" x="352" y="84" width="272" height="56" rx="8"/>
      <text class="ka-ftitle" x="372" y="112">采样</text>
      <text class="ka-ftext" x="372" y="132">借宿主的模型算一轮</text>
      <rect class="ka-fblock" x="352" y="150" width="272" height="56" rx="8"/>
      <text class="ka-ftitle" x="372" y="178">根目录</text>
      <text class="ka-ftext" x="372" y="198">划定可操作的边界</text>
      <rect class="ka-fblock" x="352" y="216" width="272" height="56" rx="8"/>
      <text class="ka-ftitle" x="372" y="244">信息征询</text>
      <text class="ka-ftext" x="372" y="264">请宿主去问用户</text>
      <rect class="ka-fblock" x="16" y="288" width="608" height="44" rx="10"/>
      <text class="ka-fsay" x="36" y="316">不是单向接入——反方向也能借力</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 626" role="img" aria-label="服务器提供资源、提示、工具三原语，客户端可反向提供采样、根目录、信息征询，两侧清单合起来才是 MCP 的能力面">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">两侧各能提供什么</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">服务器提供</text>
      <text class="ka-ftitle" x="32" y="104">资源与提示</text>
      <text class="ka-ftext" x="32" y="130">一个给数据读、一个给模板</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196" style="fill: var(--ka-cyan)">服务器提供</text>
      <text class="ka-ftitle" x="32" y="232">工具</text>
      <text class="ka-ftext" x="32" y="258">给模型执行的函数</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324" style="fill: var(--ka-amber)">客户端反向</text>
      <text class="ka-ftitle" x="32" y="360">采样、根目录、征询</text>
      <text class="ka-ftext" x="32" y="386">借模型、划边界、问用户</text>
      <path d="M169 410l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="424" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="452">结论</text>
      <text class="ka-ftitle" x="32" y="488">不是单向接入</text>
      <text class="ka-ftext" x="32" y="514">反方向也能借力</text>
      <rect class="ka-fblock" x="14" y="552" width="332" height="60" rx="10"/>
      <text class="ka-fsay" x="32" y="580">两侧清单对着记</text>
      <text class="ka-ftext" x="32" y="602">合起来才是 MCP 的能力面</text>
    </svg>
    <div class="ka-fcap">图注：服务器侧依次是资源、提示、工具三原语；客户端侧可反向提供采样、根目录与信息征询，越往后越完整。</div>
  </div>
  <div class="ka-art-note">
    <p>第三层约定两侧各能提供什么。服务器侧三原语：资源是给人和模型读的数据，提示是给用户的模板化工作流，工具是给模型执行的函数；客户端侧也能反向提供采样、根目录与信息征询。误读：以为 MCP 只是单向把工具接进来——它同样约定了反方向：服务器可以借宿主的模型、请宿主去问用户。</p>
  </div>
  <h2 class="ka-art-h2">05 没约定的：安全边界在宿主手里</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 5 · 协议写原则，宿主管执行</div>
    <svg class="fig-w" viewBox="0 0 640 336" role="img" aria-label="协议层写的与宿主自己实现的对照：协议写消息格式、协商、原语与安全原则，宿主实现同意界面、权限审批、数据不外传与审计；工具描述视为不可信；接了 MCP 不等于安全">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">协议写原则，宿主管执行</text>
      <rect class="ka-fblock" x="16" y="40" width="300" height="190" rx="10"/>
      <text class="ka-ftitle" x="36" y="72" style="fill: var(--ka-cyan)">协议层写的</text>
      <text class="ka-ftext" x="36" y="104">JSON-RPC 2.0 消息格式</text>
      <text class="ka-ftext" x="36" y="130">能力怎么协商</text>
      <text class="ka-ftext" x="36" y="156">三原语与反向能力</text>
      <text class="ka-ftext" x="36" y="182">安全原则四条线</text>
      <rect class="ka-fblock" x="352" y="40" width="272" height="190" rx="10"/>
      <text class="ka-ftitle" x="372" y="72" style="fill: var(--ka-amber)">宿主自己实现的</text>
      <text class="ka-ftext" x="372" y="104">同意的界面</text>
      <text class="ka-ftext" x="372" y="130">权限与审批</text>
      <text class="ka-ftext" x="372" y="156">数据不外传的执行</text>
      <text class="ka-ftext" x="372" y="182">审计与留痕</text>
      <rect class="ka-fblock" x="16" y="244" width="608" height="40" rx="10"/>
      <text class="ka-ftext" x="36" y="270">工具描述要当不可信信息对待——除非来自可信服务器</text>
      <rect class="ka-fblock" x="16" y="296" width="608" height="40" rx="10"/>
      <text class="ka-fsay" x="36" y="322">最常见误读：接了 MCP 不等于安全</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 498" role="img" aria-label="协议层写的与宿主自己实现的对照：协议写消息格式、协商、原语与安全原则，宿主实现同意界面、权限审批与审计；工具描述视为不可信；接了 MCP 不等于安全">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">协议写原则，宿主管执行</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">协议层</text>
      <text class="ka-ftitle" x="32" y="104">写的是约定</text>
      <text class="ka-ftext" x="32" y="130">格式、协商、原语、原则</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196" style="fill: var(--ka-amber)">宿主层</text>
      <text class="ka-ftitle" x="32" y="232">管的是执行</text>
      <text class="ka-ftext" x="32" y="258">同意界面、权限、审计</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324" style="fill: var(--ka-rose)">红线</text>
      <text class="ka-ftitle" x="32" y="360">工具描述不可信</text>
      <text class="ka-ftext" x="32" y="386">除非来自可信服务器</text>
      <rect class="ka-fblock" x="14" y="424" width="332" height="60" rx="10"/>
      <text class="ka-fsay" x="32" y="452">接了 MCP 不等于安全</text>
      <text class="ka-ftext" x="32" y="474">安全边界在宿主手里</text>
    </svg>
    <div class="ka-fcap">图注：协议层与宿主层各管一摊，对照着看；工具描述按不可信信息对待，安全边界落在宿主手里。</div>
  </div>
  <div class="ka-art-note">
    <p>最重要的一层边界：协议只写安全原则，不强制执行。规范明说宿主调工具前必须取得用户同意、工具描述要当不可信信息对待——但同意界面、权限审批、审计都由宿主自己实现。误读：以为「接了 MCP 就安全了」——安全边界从来在宿主手里，不在协议里。</p>
    <p>遇到 MCP 相关决策可按序自问三句：这是数据访问还是动作执行？宿主有没有同意与审计？双方声明的是哪一版能力？三句过完再谈集成。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://modelcontextprotocol.io/specification/2026-07-28" target="_blank" rel="noopener">MCP · Specification 2026-07-28</a>——无状态、按请求协商、扩展与安全原则；<a href="https://modelcontextprotocol.io/specification/2025-11-25" target="_blank" rel="noopener">MCP · Specification 2025-11-25</a>——initialize 握手、有状态协商与客户端功能；<a href="https://modelcontextprotocol.io/specification/2024-11-05" target="_blank" rel="noopener">MCP · Specification 2024-11-05</a>——JSON-RPC 2.0 基础协议与生命周期，认证不在核心规范；<a href="https://www.anthropic.com/news/model-context-protocol" target="_blank" rel="noopener">Anthropic · Introducing the Model Context Protocol</a>——2024-11-25 开源发布。均于 2026-11-29 核验可访问。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/mcp/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">MCP</div></a>
    <a class="next" href="learn/d3/" data-no-popover="true"><div class="kn">知识域 →</div><div class="kt">D3 智能体工程</div></a>
  </nav>
</div>
