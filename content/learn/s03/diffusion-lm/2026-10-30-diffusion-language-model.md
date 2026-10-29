---
title: 扩散语言模型 · 先铺满，再擦干净
publish: true
description: 每日知识点（S-03 Transformer / 扩散语言模型与并行解码）：一张图看懂扩散语言模型——掩码去噪的多轮并行改写、块扩散的串行与并行折中，以及它换来与没换来的东西。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s03/diffusion-lm/" data-no-popover="true">← 返回主题 · 扩散语言模型与并行解码</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-10-30</span><span>S-03 / 扩散语言模型与并行解码</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="扩散语言模型信息图：自回归串行与扩散并行的对比、掩码扩散三步、块扩散结构与换来没换来的两笔账" xmlns="http://www.w3.org/2000/svg">
    <title>扩散语言模型 · Diffusion Language Model</title>
    <defs><marker id="dlm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
    <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-03 TRANSFORMER / 扩散语言模型与并行解码</text>
    <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">扩散语言模型 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">DIFFUSION LM</tspan></text>
    <text x="24" y="76" fill="var(--ai-muted)" font-size="12">自回归一个一个往外吐字；扩散先把整段铺满，再一轮轮擦干净。</text>
    <text x="24" y="104" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 两种写法：串行往外吐 vs 整段一起擦</text>
    <rect x="24" y="116" width="252" height="116" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="40" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">自回归 AR</text>
    <rect x="34" y="152" width="24" height="24" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect>
    <rect x="62" y="152" width="24" height="24" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect>
    <rect x="90" y="152" width="24" height="24" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect>
    <rect x="118" y="152" width="24" height="24" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect>
    <rect x="146" y="152" width="24" height="24" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect>
    <rect x="174" y="152" width="24" height="24" rx="3" fill="var(--ai-amber)" fill-opacity="0.5" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <rect x="202" y="152" width="24" height="24" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect>
    <rect x="230" y="152" width="24" height="24" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect>
    <line x1="46" y1="196" x2="226" y2="196" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#dlm-arrow)"></line>
    <text x="234" y="200" fill="var(--ai-cyan)" font-size="9">时间</text>
    <text x="40" y="220" fill="var(--ai-muted)" font-size="9.5">第 t 个必须等前 t−1 个写完</text>
    <rect x="288" y="116" width="248" height="116" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="306" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">扩散 Diffusion</text>
    <line x1="298" y1="150" x2="298" y2="206" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#dlm-arrow)"></line>
    <rect x="306" y="146" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="333" y="146" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="360" y="146" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="387" y="146" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="414" y="146" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="441" y="146" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="468" y="146" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="495" y="146" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect>
    <rect x="306" y="168" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="333" y="168" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="360" y="168" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="387" y="168" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="414" y="168" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="441" y="168" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="468" y="168" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="495" y="168" width="23" height="18" rx="2" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect>
    <rect x="306" y="190" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="333" y="190" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="360" y="190" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="387" y="190" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="414" y="190" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="441" y="190" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="468" y="190" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="495" y="190" width="23" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.55"></rect>
    <text x="306" y="224" fill="var(--ai-muted)" font-size="9.5">三轮：每轮全部位置一起改</text>
    <text x="24" y="250" fill="var(--ai-muted)" font-size="10.5">左边是「写完才能写下一个」；右边是「整段一起改」，改几轮是可调的预算。</text>
    <line x1="24" y1="266" x2="536" y2="266" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="288" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 掩码扩散三步：加噪 → 并行重预测 → 定稿</text>
    <rect x="24" y="300" width="160" height="118" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="104" y="322" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">① 加噪 · t=T</text>
    <rect x="43" y="334" width="22" height="22" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="69" y="334" width="22" height="22" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="95" y="334" width="22" height="22" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="121" y="334" width="22" height="22" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="147" y="334" width="22" height="22" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect>
    <rect x="43" y="360" width="22" height="22" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="69" y="360" width="22" height="22" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="95" y="360" width="22" height="22" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="121" y="360" width="22" height="22" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="147" y="360" width="22" height="22" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect>
    <text x="104" y="404" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">全部位置换成 [MASK]</text>
    <line x1="184" y1="359" x2="196" y2="359" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#dlm-arrow)"></line>
    <rect x="196" y="300" width="160" height="118" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="276" y="322" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">② 重预测 · t=k</text>
    <rect x="215" y="334" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="241" y="334" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="267" y="334" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="293" y="334" width="22" height="22" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="319" y="334" width="22" height="22" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect>
    <rect x="215" y="360" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="241" y="360" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="267" y="360" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="293" y="360" width="22" height="22" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="319" y="360" width="22" height="22" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect>
    <text x="276" y="404" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">不确定的重抽，已定的留住</text>
    <line x1="356" y1="359" x2="368" y2="359" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#dlm-arrow)"></line>
    <rect x="368" y="300" width="160" height="118" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="448" y="322" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">③ 定稿 · t=0</text>
    <rect x="387" y="334" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="413" y="334" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="439" y="334" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="465" y="334" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="491" y="334" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect>
    <rect x="387" y="360" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="413" y="360" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="439" y="360" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="465" y="360" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="491" y="360" width="22" height="22" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect>
    <text x="448" y="404" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">不再改写，直接输出</text>
    <line x1="24" y1="432" x2="536" y2="432" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="454" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 块扩散：块间按顺序出，块内同时写</text>
    <rect x="24" y="468" width="152" height="88" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="100" y="488" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">块 1 · 已定稿</text>
    <rect x="40" y="496" width="36" height="26" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="82" y="496" width="36" height="26" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="124" y="496" width="36" height="26" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect>
    <rect x="40" y="526" width="36" height="26" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="82" y="526" width="36" height="26" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><rect x="124" y="526" width="36" height="26" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect>
    <line x1="176" y1="512" x2="200" y2="512" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#dlm-arrow)"></line>
    <rect x="200" y="468" width="152" height="88" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="276" y="488" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">块 2 · 正在写</text>
    <rect x="216" y="496" width="36" height="26" rx="3" fill="var(--ai-amber)" fill-opacity="0.5" stroke="var(--ai-amber)" stroke-width="1.1"></rect><rect x="258" y="496" width="36" height="26" rx="3" fill="var(--ai-amber)" fill-opacity="0.5" stroke="var(--ai-amber)" stroke-width="1.1"></rect><rect x="300" y="496" width="36" height="26" rx="3" fill="var(--ai-amber)" fill-opacity="0.5" stroke="var(--ai-amber)" stroke-width="1.1"></rect>
    <rect x="216" y="526" width="36" height="26" rx="3" fill="var(--ai-amber)" fill-opacity="0.5" stroke="var(--ai-amber)" stroke-width="1.1"></rect><rect x="258" y="526" width="36" height="26" rx="3" fill="var(--ai-amber)" fill-opacity="0.5" stroke="var(--ai-amber)" stroke-width="1.1"></rect><rect x="300" y="526" width="36" height="26" rx="3" fill="var(--ai-amber)" fill-opacity="0.5" stroke="var(--ai-amber)" stroke-width="1.1"></rect>
    <line x1="352" y1="512" x2="376" y2="512" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#dlm-arrow)"></line>
    <rect x="376" y="468" width="152" height="88" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="452" y="488" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">块 3 · 待写</text>
    <rect x="392" y="496" width="36" height="26" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="434" y="496" width="36" height="26" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="476" y="496" width="36" height="26" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect>
    <rect x="392" y="526" width="36" height="26" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="434" y="526" width="36" height="26" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect><rect x="476" y="526" width="36" height="26" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect>
    <text x="24" y="578" fill="var(--ai-text)" font-size="10">块内双向：同一块的 token 互相看得见，且每轮可以推翻重来；块间仍按顺序推进。</text>
    <text x="24" y="596" fill="var(--ai-muted)" font-size="10">已定稿的块被压成一份持续更新的状态，后块只读写这份状态——块扩散的常见做法。</text>
    <line x1="24" y1="610" x2="536" y2="610" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="632" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 换来什么，没换什么</text>
    <rect x="24" y="644" width="250" height="100" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="44" y="670" fill="var(--ai-green)" font-size="12" font-weight="600">换来：并行与可回头修改</text>
    <text x="44" y="692" fill="var(--ai-text)" font-size="9.5">一块里的所有位置同时算，延迟不再线性跟随长度</text>
    <text x="44" y="710" fill="var(--ai-text)" font-size="9.5">写坏的位置下一轮能改，不必推倒重来</text>
    <text x="44" y="728" fill="var(--ai-muted)" font-size="9.5">天然支持任意位置填空，编辑与约束生成更容易</text>
    <rect x="286" y="644" width="250" height="100" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="306" y="670" fill="var(--ai-amber)" font-size="12" font-weight="600">没换：缓存、步数与质量账</text>
    <text x="306" y="692" fill="var(--ai-text)" font-size="9.5">块内双向且每轮改写，因果 KV 缓存不再直接成立</text>
    <text x="306" y="710" fill="var(--ai-text)" font-size="9.5">轮数少则质量掉，轮数多则并行省下的时间被吃掉</text>
    <text x="306" y="728" fill="var(--ai-muted)" font-size="9.5">「快几倍」多为厂商自报，须看轮数与质量是否同时给出</text>
    <line x1="24" y1="760" x2="536" y2="760" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="280" y="786" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">自回归是「一次写对一个」，扩散是「多轮一起改对」。</tspan></text>
    <text x="280" y="806" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">代价是把「串行时间」换成了「并行轮数」，而轮数本身就是质量与延迟之间的新旋钮。</text>
    </svg>
    <figcaption class="ai-kp__cap">上：自回归与扩散的写法对比 · 中：掩码扩散三步与块扩散 · 下：换来什么、没换什么。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>自回归一次只写一个 token，第 t 个必须等前 t−1 个写完。扩散语言模型反过来：先把整段铺成掩码，再一轮轮并行地把所有位置一起重预测，把不确定处逐步抹平。它换来并行与可回头修改，代价是因果 KV 缓存不再直接成立，步数少了质量就掉。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s03/diffusion-lm/" data-no-popover="true">返回主题 · 扩散语言模型与并行解码 →</a>
  </nav>
</div>
