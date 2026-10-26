---
title: 沙箱隔离 · 软件关得住，硅片关不住
publish: true
description: 每日知识点（S-06 边界安全 / 隔离与沙箱）：一张图看懂沙箱隔离为什么止步于操作系统边界——架构状态被严格切分，微架构状态天生共享，缓存时序能把时间差变成比特。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s06/isolation/" data-no-popover="true">← 返回主题 · 隔离与沙箱</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-10-27</span><span>S-06 / 隔离与沙箱</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="沙箱隔离信息图：三层隔离强度、架构状态与微架构状态的对比、Prime+Probe 三步时序信道" xmlns="http://www.w3.org/2000/svg">
    <title>沙箱隔离 · Sandbox Isolation</title>
    <defs><marker id="sb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
    <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-06 边界安全 / 隔离与沙箱</text>
    <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">沙箱隔离 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">SANDBOX ISOLATION</tspan></text>
    <text x="24" y="76" fill="var(--ai-muted)" font-size="12">隔离切断的是「看得见」，不是「影响得到」——后者靠共享资源照样成立。</text>
    <text x="24" y="100" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 三层隔离：越往上越严，但都止步于同一条线</text>
    <rect x="24" y="114" width="160" height="112" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="104" y="136" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">容器</text>
    <text x="104" y="154" text-anchor="middle" fill="var(--ai-muted)" font-size="9" font-family="monospace">CONTAINER</text>
    <text x="44" y="176" fill="var(--ai-text)" font-size="9.5">命名空间 + cgroup 隔离</text>
    <text x="44" y="194" fill="var(--ai-text)" font-size="9.5">共用同一个宿主内核</text>
    <text x="44" y="216" fill="var(--ai-amber)" font-size="9.5">内核漏洞 = 共同失效</text>
    <rect x="200" y="114" width="160" height="112" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="280" y="136" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">轻量虚拟机</text>
    <text x="280" y="154" text-anchor="middle" fill="var(--ai-muted)" font-size="9" font-family="monospace">MICRO VM</text>
    <text x="220" y="176" fill="var(--ai-text)" font-size="9.5">独立内核 + 硬件虚拟化</text>
    <text x="220" y="194" fill="var(--ai-text)" font-size="9.5">切换时保存架构状态</text>
    <text x="220" y="216" fill="var(--ai-amber)" font-size="9.5">仍共用同一颗物理 CPU</text>
    <rect x="376" y="114" width="160" height="112" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="456" y="136" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">物理机</text>
    <text x="456" y="154" text-anchor="middle" fill="var(--ai-muted)" font-size="9" font-family="monospace">BARE METAL</text>
    <text x="396" y="176" fill="var(--ai-text)" font-size="9.5">整机独占，气隙断网</text>
    <text x="396" y="194" fill="var(--ai-text)" font-size="9.5">不共用硅片与内核</text>
    <text x="396" y="216" fill="var(--ai-green)" font-size="9.5">剩下温度、功耗等慢通道</text>
    <text x="24" y="248" fill="var(--ai-muted)" font-size="10.5">前两层的共同点：它们切分的是「软件能看见的东西」，而两个负载仍压在同一块硅片上。</text>
    <line x1="24" y1="264" x2="536" y2="264" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="286" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 一颗 CPU 里其实住着两套状态</text>
    <rect x="24" y="300" width="250" height="132" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="44" y="322" fill="var(--ai-green)" font-size="12" font-weight="600">架构状态 · 被严格切分</text>
    <text x="44" y="342" fill="var(--ai-muted)" font-size="9" font-family="monospace">ARCHITECTURAL STATE</text>
    <text x="44" y="364" fill="var(--ai-text)" font-size="9.5">寄存器、内存数值、指令指针、文件</text>
    <text x="44" y="382" fill="var(--ai-text)" font-size="9.5">芯片说明书上写明的契约</text>
    <text x="44" y="404" fill="var(--ai-text)" font-size="9.5">虚拟机切换时逐项保存与恢复</text>
    <text x="44" y="422" fill="var(--ai-muted)" font-size="9.5">VM A 读不到 VM B 的半个字节</text>
    <rect x="286" y="300" width="250" height="132" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="306" y="322" fill="var(--ai-amber)" font-size="12" font-weight="600">微架构状态 · 默认共享</text>
    <text x="306" y="342" fill="var(--ai-muted)" font-size="9" font-family="monospace">MICROARCHITECTURAL STATE</text>
    <text x="306" y="364" fill="var(--ai-text)" font-size="9.5">末级缓存、TLB、DRAM 行缓冲</text>
    <text x="306" y="382" fill="var(--ai-text)" font-size="9.5">分支预测器、主频波动</text>
    <text x="306" y="404" fill="var(--ai-text)" font-size="9.5">为多核共享提速而生，不归权限管</text>
    <text x="306" y="422" fill="var(--ai-muted)" font-size="9.5">虚拟机监控器默认不去切分它</text>
    <text x="24" y="452" fill="var(--ai-muted)" font-size="10.5">一侧改变共享设施的状态，另一侧测量自己的快慢——不需要网络，也不需要共享文件。</text>
    <line x1="24" y1="468" x2="536" y2="468" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="490" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ Prime + Probe：三步把时间差变成比特</text>
    <rect x="24" y="504" width="512" height="54" rx="10" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <circle cx="46" cy="531" r="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.3"></circle>
    <text x="46" y="535" text-anchor="middle" fill="var(--ai-cyan)" font-size="11" font-weight="700">1</text>
    <text x="70" y="527" fill="var(--ai-ice)" font-size="11" font-weight="600">预填 Prime <tspan fill="var(--ai-muted)" font-size="9">FILL</tspan></text>
    <text x="70" y="545" fill="var(--ai-text)" font-size="9.5">接收端读满目标缓存组，把自己的数据铺进去</text>
    <rect x="24" y="566" width="512" height="54" rx="10" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <circle cx="46" cy="593" r="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.3"></circle>
    <text x="46" y="597" text-anchor="middle" fill="var(--ai-cyan)" font-size="11" font-weight="700">2</text>
    <text x="70" y="589" fill="var(--ai-ice)" font-size="11" font-weight="600">编码 Evict / Idle <tspan fill="var(--ai-muted)" font-size="9">SEND</tspan></text>
    <text x="70" y="607" fill="var(--ai-text)" font-size="9.5">发 1 就狂读同组地址把对方挤走；发 0 则静默不动</text>
    <rect x="24" y="628" width="512" height="54" rx="10" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <circle cx="46" cy="655" r="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.3"></circle>
    <text x="46" y="659" text-anchor="middle" fill="var(--ai-cyan)" font-size="11" font-weight="700">3</text>
    <text x="70" y="651" fill="var(--ai-ice)" font-size="11" font-weight="600">探测 Probe <tspan fill="var(--ai-muted)" font-size="9">READ</tspan></text>
    <text x="70" y="669" fill="var(--ai-text)" font-size="9.5">接收端掐表重载：快记 0，慢记 1，逐槽拼出比特流</text>
    <text x="24" y="706" fill="var(--ai-ice)" font-size="11" font-weight="600">一个时间槽里的两次重载</text>
    <rect x="24" y="716" width="240" height="46" rx="8" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="44" y="736" fill="var(--ai-green)" font-size="10.5" font-weight="600">命中 · 约 4 纳秒 → 记 0</text>
    <text x="44" y="753" fill="var(--ai-muted)" font-size="9.5">数据还在缓存里，未被挤走</text>
    <rect x="296" y="716" width="240" height="46" rx="8" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="316" y="736" fill="var(--ai-amber)" font-size="10.5" font-weight="600">未命中 · 约 100 纳秒 → 记 1</text>
    <text x="316" y="753" fill="var(--ai-muted)" font-size="9.5">被迫去主存取，慢二十几倍</text>
    <text x="24" y="784" fill="var(--ai-muted)" font-size="10.5">二十几倍的延迟鸿沟清晰可辨，一段同步帧头即可对齐节拍，编码方案无需事先约定。</text>
    <line x1="24" y1="796" x2="536" y2="796" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="280" y="818" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">隔离的正确单位不是进程，是共享资源。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：容器到物理机的三层隔离强度 · 中：架构状态被切分而微架构状态共享 · 下：Prime+Probe 三步时序与快慢判定。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>沙箱靠命名空间、独立内核与防火墙切断可见性，但两个负载压在同一颗 CPU 上时，末级缓存、TLB 一类微架构资源仍共用。一方改变缓存占用，另一方测量自己的读取耗时，快慢差就被还原成比特——无需网络也无需共享文件。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s06/isolation/" data-no-popover="true">返回主题 · 隔离与沙箱 →</a>
  </nav>
</div>
