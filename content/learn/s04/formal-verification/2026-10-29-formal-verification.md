---
title: 形式化验证 · 生成归模型，判定归内核
publish: true
description: 每日知识点（S-04 大模型训练与对齐 / 形式化验证与机器可检查证明）：一张图看懂形式化验证——把证明写成程序，让一个小内核逐条重算，信任边界因此从四千万行收缩到顶层命题。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s04/formal-verification/" data-no-popover="true">← 返回主题 · 形式化验证与机器可检查证明</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-10-29</span><span>S-04 / 形式化验证与机器可检查证明</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="形式化验证信息图：自然语言证明与形式化证明的差别、信任边界如何收缩到顶层命题、内核的三条铁律、1986 年闭包断言被反例击穿的路径" xmlns="http://www.w3.org/2000/svg">
    <title>形式化验证 · Formal Verification</title>
    <defs><marker id="fv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
    <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-04 TRAINING / 形式化验证与机器可检查证明</text>
    <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">形式化验证 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">FORMAL VERIFICATION</tspan></text>
    <text x="24" y="76" fill="var(--ai-muted)" font-size="12">证明写成程序：每一步都要能被一个小内核重算一遍。</text>
    <line x1="24" y1="96" x2="536" y2="96" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="120" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 两种证明：一份靠人读，一份靠机器查</text>
    <rect x="24" y="134" width="250" height="150" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="44" y="158" fill="var(--ai-ice)" font-size="11.5" font-weight="600">自然语言证明</text>
    <text x="44" y="182" fill="var(--ai-text)" font-size="9.5">约 1.5 万页 / 500+ 篇 / 约 100 人</text>
    <text x="44" y="204" fill="var(--ai-text)" font-size="9.5">惯例省略的前提，跨年代记号不一</text>
    <text x="44" y="226" fill="var(--ai-muted)" font-size="9.5">一个漏洞能躺四十年没人发现</text>
    <rect x="44" y="240" width="26" height="30" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect>
    <rect x="74" y="240" width="26" height="30" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect>
    <rect x="104" y="240" width="26" height="30" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect>
    <rect x="134" y="240" width="26" height="30" rx="2" fill="var(--ai-soft)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="170" y="260" fill="var(--ai-amber)" font-size="9.5">← 空的那块砖</text>
    <rect x="286" y="134" width="250" height="150" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="306" y="158" fill="var(--ai-ice)" font-size="11.5" font-weight="600">Lean 形式化证明</text>
    <text x="306" y="182" fill="var(--ai-text)" font-size="9.5">4310 万行代码 / 205 万条声明</text>
    <text x="306" y="204" fill="var(--ai-text)" font-size="9.5">每个前提都必须显式写出来</text>
    <text x="306" y="226" fill="var(--ai-muted)" font-size="9.5">内核逐条重算，错一步就报错</text>
    <rect x="306" y="240" width="26" height="30" rx="2" fill="var(--ai-soft)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <rect x="336" y="240" width="26" height="30" rx="2" fill="var(--ai-soft)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <rect x="366" y="240" width="26" height="30" rx="2" fill="var(--ai-soft)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <rect x="396" y="240" width="26" height="30" rx="2" fill="var(--ai-green)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="432" y="260" fill="var(--ai-green)" font-size="9.5">全查过</text>
    <text x="24" y="300" fill="var(--ai-muted)" font-size="10.5">差别不在写得多认真，而在「谁来判」：一份靠同行抽读，一份靠程序通读。</text>
    <line x1="24" y1="316" x2="536" y2="316" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="340" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 信任边界：从四千万行收缩到顶层命题</text>
    <rect x="24" y="354" width="512" height="46" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="44" y="376" fill="var(--ai-text)" font-size="10">4310 万行：机器逐条检查</text>
    <text x="520" y="376" text-anchor="end" fill="var(--ai-muted)" font-size="9.5">不必人读</text>
    <rect x="64" y="412" width="432" height="46" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="84" y="434" fill="var(--ai-text)" font-size="10">依赖链可追溯：每个结论看得到它靠了谁</text>
    <text x="480" y="434" text-anchor="end" fill="var(--ai-muted)" font-size="9.5">可按需翻</text>
    <rect x="104" y="470" width="352" height="46" rx="10" fill="var(--ai-soft)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="124" y="492" fill="var(--ai-ice)" font-size="10">顶层命题：有限单群都在清单里</text>
    <text x="440" y="492" text-anchor="end" fill="var(--ai-cyan)" font-size="9.5">人类审计这一层</text>
    <text x="24" y="536" fill="var(--ai-muted)" font-size="10.5">人要读的从「全部证明」变成「那条命题是不是我想问的问题」。</text>
    <line x1="24" y1="552" x2="536" y2="552" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="576" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 内核凭什么可信：小、冷酷、可审计</text>
    <rect x="24" y="590" width="160" height="64" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="104" y="612" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5">零 sorry</text>
    <text x="104" y="634" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">不许留占位跳过</text>
    <rect x="200" y="590" width="160" height="64" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="280" y="612" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5">禁用 native_decide</text>
    <text x="280" y="634" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">不许绕过内核求值</text>
    <rect x="376" y="590" width="160" height="64" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="456" y="612" text-anchor="middle" fill="var(--ai-ice)" font-size="10.5">只留三条标准公理</text>
    <text x="456" y="634" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">不引入新假设</text>
    <text x="24" y="674" fill="var(--ai-muted)" font-size="10.5">生成与判定解耦：模型可以在草稿纸上胡思乱想，门口的检查器不会。</text>
    <line x1="24" y1="690" x2="536" y2="690" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="714" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 一个反例击穿 1986 年的闭包断言</text>
    <rect x="24" y="730" width="92" height="34" rx="6" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <text x="70" y="752" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">PSL₂(49)</text>
    <line x1="120" y1="747" x2="144" y2="747" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#fv-arrow)"></line>
    <rect x="148" y="730" width="92" height="34" rx="6" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <text x="194" y="752" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">域对合中心化子</text>
    <line x1="244" y1="747" x2="264" y2="747" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#fv-arrow)"></line>
    <rect x="268" y="730" width="72" height="34" rx="6" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <text x="304" y="752" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">PSL₂(7)</text>
    <line x1="344" y1="747" x2="364" y2="747" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#fv-arrow)"></line>
    <rect x="368" y="730" width="80" height="34" rx="6" fill="var(--ai-soft)" stroke="var(--ai-line-strong)"></rect>
    <text x="408" y="752" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">7 = 梅森素数</text>
    <line x1="452" y1="747" x2="472" y2="747" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#fv-arrow)"></line>
    <rect x="476" y="730" width="60" height="34" rx="6" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="506" y="752" text-anchor="middle" fill="var(--ai-amber)" font-size="9.5">出界</text>
    <text x="24" y="786" fill="var(--ai-muted)" font-size="10.5">被推翻的是那条推理路线，不是定理：结论仍真，但这一步得换个走法。</text>
    <line x1="24" y1="798" x2="536" y2="798" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="280" y="818" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">机器检查推导，不检查含义——顶层命题只能由人来读。</tspan></text>
    </svg>
    <figcaption class="ai-kp__cap">上：两种证明的差别与信任边界的收缩 · 中：内核的三条铁律 · 下：1986 年闭包断言被反例击穿的路径。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>形式化验证把证明写成程序，每一步都由一个内核重算。自然语言靠同行抽读，省略的前提能躺四十年；Lean 里每个前提必须写出来，「生成归模型、判定归内核」——人不必读完全部证明，只需审计顶层命题问的是不是这件事。机器检查推导，不检查含义。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s04/formal-verification/" data-no-popover="true">返回主题 · 形式化验证与机器可检查证明 →</a>
  </nav>
</div>
