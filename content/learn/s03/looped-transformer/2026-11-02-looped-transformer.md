---
title: 循环 Transformer · 同一组权重，跑两遍
publish: true
description: 每日知识点（S-03 Transformer / 循环计算与有效深度）：一张图看懂循环 Transformer——把中间层用共享权重连跑两遍，用计算换深度而不是用参数换深度，以及这笔账哪里省了、哪里没省。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s03/looped-transformer/" data-no-popover="true">← 返回主题 · 循环计算与有效深度</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-02</span><span>S-03 / 循环计算与有效深度</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="循环 Transformer 信息图：堆新层与循环同一组权重的对比、同一组权重跑两遍为什么不白跑、省下权重与没省算力的两笔账，以及换来与没换来的东西" xmlns="http://www.w3.org/2000/svg">
    <title>循环 Transformer · Looped Transformer</title>
    <defs><marker id="lt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
    <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-03 TRANSFORMER / 循环计算与有效深度</text>
    <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">循环 Transformer <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">LOOPED TRANSFORMER</tspan></text>
    <text x="24" y="76" fill="var(--ai-muted)" font-size="12">想把网络做深，不一定要多买权重：同一组权重，可以再走一遍。</text>
    <text x="24" y="104" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 变强的两条路：多买一层，还是把一层用两遍</text>
    <rect x="24" y="116" width="252" height="150" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="40" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">堆新层 · 权重跟着涨</text>
    <rect x="40" y="152" width="26" height="14" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect>
    <rect x="40" y="170" width="26" height="14" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect>
    <rect x="40" y="188" width="26" height="14" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect>
    <rect x="40" y="206" width="26" height="14" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect>
    <rect x="40" y="224" width="26" height="14" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect>
    <rect x="40" y="242" width="26" height="14" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect>
    <text x="80" y="164" fill="var(--ai-text)" font-size="9.5">每加深一层</text>
    <text x="80" y="182" fill="var(--ai-text)" font-size="9.5">就多一组新权重</text>
    <text x="80" y="200" fill="var(--ai-muted)" font-size="9.5">显存、带宽、加载</text>
    <text x="80" y="218" fill="var(--ai-muted)" font-size="9.5">全部跟着一起涨</text>
    <text x="40" y="252" fill="var(--ai-muted)" font-size="9.5">深度 = 层数，买来的</text>
    <rect x="288" y="116" width="248" height="150" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="304" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">循环同一组 · 权重不涨</text>
    <rect x="304" y="150" width="70" height="34" rx="7" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="339" y="172" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">模块 B</text>
    <line x1="374" y1="167" x2="392" y2="167" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#lt-arrow)"></line>
    <rect x="392" y="150" width="70" height="34" rx="7" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="427" y="172" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">同一组 B</text>
    <path d="M427,184 C427,214 339,214 339,186" fill="none" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#lt-arrow)"></path>
    <text x="383" y="222" text-anchor="middle" fill="var(--ai-text)" font-size="10">输出回灌：B(B(h))</text>
    <text x="304" y="242" fill="var(--ai-muted)" font-size="9.5">两组方框共用同一套权重</text>
    <text x="304" y="258" fill="var(--ai-muted)" font-size="9.5">深度 = 层数 × 轮数，租来的</text>
    <text x="24" y="284" fill="var(--ai-muted)" font-size="10.5">左边是「再买一套」，右边是「再走一遍」——同一个目标的两种付法。</text>
    <line x1="24" y1="296" x2="536" y2="296" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="316" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 同一组权重跑两遍，为什么不是白跑</text>
    <rect x="24" y="328" width="512" height="140" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <rect x="40" y="342" width="152" height="112" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="116" y="366" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">① 输入已经不同</text>
    <text x="116" y="386" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">第二遍读到的</text>
    <text x="116" y="402" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">是第一遍加工过的</text>
    <text x="116" y="422" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">同一组权重</text>
    <text x="116" y="438" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">不等于同一件事</text>
    <line x1="192" y1="398" x2="204" y2="398" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#lt-arrow)"></line>
    <rect x="204" y="342" width="152" height="112" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="280" y="366" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">② 深度被租来了</text>
    <text x="280" y="386" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">有效深度看轮数</text>
    <text x="280" y="402" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">参数量却不变</text>
    <text x="280" y="422" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">学界老想法：</text>
    <text x="280" y="438" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">循环深度、跨层共享</text>
    <line x1="356" y1="398" x2="368" y2="398" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#lt-arrow)"></line>
    <rect x="368" y="342" width="152" height="112" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="444" y="366" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">③ 真正的难点</text>
    <text x="444" y="386" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">两遍之间怎么传</text>
    <text x="444" y="402" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">双残差流 + 约束混合</text>
    <text x="444" y="422" text-anchor="middle" fill="var(--ai-amber)" font-size="9.5">消融：推理题与多步</text>
    <text x="444" y="438" text-anchor="middle" fill="var(--ai-amber)" font-size="9.5">Agent 题均涨（自报）</text>
    <text x="24" y="482" fill="var(--ai-muted)" font-size="10.5">循环不是把计算重复一遍，而是让同一组权重在不同深度各做各的事——前提是两遍之间信息传得动。</text>
    <line x1="24" y1="494" x2="536" y2="494" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="514" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 账要分开算：省了权重，没省算力</text>
    <rect x="24" y="526" width="250" height="112" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="44" y="550" fill="var(--ai-green)" font-size="12" font-weight="600">省下：权重与显存</text>
    <text x="44" y="572" fill="var(--ai-text)" font-size="9.5">只存 32 组层权重，约 9B</text>
    <text x="44" y="590" fill="var(--ai-text)" font-size="9.5">显存与带宽按 9B 算</text>
    <text x="44" y="608" fill="var(--ai-text)" font-size="9.5">小显存也能装下深网络</text>
    <text x="44" y="626" fill="var(--ai-muted)" font-size="9.5">权重一份，用两次</text>
    <rect x="286" y="526" width="250" height="112" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="306" y="550" fill="var(--ai-amber)" font-size="12" font-weight="600">没省：算力与延迟</text>
    <text x="306" y="572" fill="var(--ai-text)" font-size="9.5">一次前向 56 次层计算</text>
    <text x="306" y="590" fill="var(--ai-text)" font-size="9.5">等效约 14.6B 推理参数</text>
    <text x="306" y="608" fill="var(--ai-text)" font-size="9.5">每遍各算各的 KV 缓存</text>
    <text x="306" y="626" fill="var(--ai-muted)" font-size="9.5">省的是存储，不是时间</text>
    <line x1="24" y1="652" x2="536" y2="652" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="672" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 换来什么，没换什么</text>
    <rect x="24" y="684" width="250" height="90" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="44" y="708" fill="var(--ai-green)" font-size="12" font-weight="600">换来：轮数成了新旋钮</text>
    <text x="44" y="730" fill="var(--ai-text)" font-size="9.5">简单题少跑、难题多跑</text>
    <text x="44" y="748" fill="var(--ai-text)" font-size="9.5">深度可以在推理时决定</text>
    <text x="44" y="766" fill="var(--ai-muted)" font-size="9.5">小模型逼近大模型复杂任务</text>
    <rect x="286" y="684" width="250" height="90" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="306" y="708" fill="var(--ai-amber)" font-size="12" font-weight="600">没换：这笔权衡仍在</text>
    <text x="306" y="730" fill="var(--ai-text)" font-size="9.5">轮数、缓存、训练稳定性</text>
    <text x="306" y="748" fill="var(--ai-text)" font-size="9.5">自报成绩，报告待公布</text>
    <text x="306" y="766" fill="var(--ai-muted)" font-size="9.5">并非全胜，编码类仍落后</text>
    <line x1="24" y1="788" x2="536" y2="788" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="280" y="808" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">堆层是买新权重，循环是把同一组权重再走一遍——买的是显存，欠的是算力。</tspan></text>
    <text x="280" y="824" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">所以循环换来的不是「更小」，而是「同样显存里能跑多深」；轮数与两遍之间的通路，才是这条线真正的战场。</text>
    </svg>
    <figcaption class="ai-kp__cap">上：堆新层与循环同一组权重的对比 · 中：同一组权重跑两遍为什么不白跑，以及省了什么没省什么 · 下：换来什么、没换什么。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>堆层要复制权重，循环是把同一组权重再执行一遍：B(B(h))——第二遍读到的已是第一遍加工过的表示。存 32 组权重却做 56 次计算，省下的是显存与带宽，算力与延迟照付，每遍还要各算各的 KV。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s03/looped-transformer/" data-no-popover="true">返回主题 · 循环计算与有效深度 →</a>
  </nav>
</div>
