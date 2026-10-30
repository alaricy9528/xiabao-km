---
title: 线性注意力 · 不再回头看，只带一份状态
publish: true
description: 每日知识点（S-03 Transformer / 线性注意力与状态空间模型）：一张图看懂线性注意力——去掉 softmax 让结合律回来，把整张得分表换成一份 d×d 的累积状态，以及它换来与没换来的东西。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s03/linear-attention/" data-no-popover="true">← 返回主题 · 线性注意力与状态空间模型</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-10-31</span><span>S-03 / 线性注意力与状态空间模型</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="线性注意力信息图：全都留着与只带状态的对比、去掉 softmax 让结合律回来的三步、状态容量不足与二级矩路由、以及换来与没换来的两笔账" xmlns="http://www.w3.org/2000/svg">
    <title>线性注意力 · Linear Attention</title>
    <defs><marker id="la-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
    <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-03 TRANSFORMER / 线性注意力与状态空间模型</text>
    <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">线性注意力 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">LINEAR ATTENTION</tspan></text>
    <text x="24" y="76" fill="var(--ai-muted)" font-size="12">注意力把每个 token 都留着回头看；线性注意力只读一遍，随身带份状态。</text>
    <text x="24" y="104" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 两种记账法：全都留着 vs 只带一份状态</text>
    <rect x="24" y="116" width="252" height="132" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="40" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">标准注意力 · 全都留着</text>
    <rect x="34" y="152" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><rect x="60" y="152" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect>
    <rect x="34" y="174" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><rect x="60" y="174" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><rect x="86" y="174" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><rect x="112" y="174" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect>
    <rect x="34" y="196" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><rect x="60" y="196" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><rect x="86" y="196" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><rect x="112" y="196" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><rect x="138" y="196" width="22" height="16" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><rect x="164" y="196" width="22" height="16" rx="3" fill="none" stroke="var(--ai-line)" stroke-dasharray="3 3"></rect>
    <text x="196" y="210" fill="var(--ai-muted)" font-size="9.5">越往后越长</text>
    <text x="40" y="228" fill="var(--ai-muted)" font-size="9.5">缓存随上下文线性变长，预测时回忆全部</text>
    <rect x="288" y="116" width="248" height="132" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="304" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">线性注意力 · 只带状态</text>
    <rect x="304" y="150" width="23" height="16" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="331" y="150" width="23" height="16" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="358" y="150" width="23" height="16" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="385" y="150" width="23" height="16" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="412" y="150" width="23" height="16" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="439" y="150" width="23" height="16" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="466" y="150" width="23" height="16" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect><rect x="493" y="150" width="23" height="16" rx="3" fill="var(--ai-soft)" stroke="var(--ai-line)"></rect>
    <line x1="340" y1="174" x2="340" y2="186" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#la-arrow)"></line>
    <rect x="304" y="188" width="150" height="42" rx="7" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="379" y="214" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">状态 S（d×d）</text>
    <text x="470" y="206" fill="var(--ai-muted)" font-size="9.5">大小与长度</text>
    <text x="470" y="222" fill="var(--ai-muted)" font-size="9.5">完全无关</text>
    <text x="304" y="240" fill="var(--ai-muted)" font-size="9.5">读完就丢，只把信息叠进 S</text>
    <text x="24" y="266" fill="var(--ai-muted)" font-size="10.5">左边是「什么都留着」；右边是「读完即走」——同一件事的两种账本。</text>
    <line x1="24" y1="282" x2="536" y2="282" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="304" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 关键一招：去掉 softmax，把括号换个地方</text>
    <rect x="24" y="316" width="160" height="126" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="104" y="340" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">① 标准做法</text>
    <text x="104" y="366" text-anchor="middle" fill="var(--ai-text)" font-size="11" font-family="monospace">softmax(QKᵀ)V</text>
    <text x="104" y="392" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">先算 n×n 的得分表</text>
    <text x="104" y="410" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">代价随长度平方涨</text>
    <text x="104" y="428" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">整张表都得留着</text>
    <line x1="184" y1="379" x2="196" y2="379" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#la-arrow)"></line>
    <rect x="196" y="316" width="160" height="126" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="276" y="340" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">② 线性注意力</text>
    <text x="276" y="366" text-anchor="middle" fill="var(--ai-text)" font-size="11" font-family="monospace">Q(KᵀV)</text>
    <text x="276" y="392" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">先算 d×d 的小矩阵</text>
    <text x="276" y="410" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">大小与长度无关</text>
    <text x="276" y="428" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">可以累加着更新</text>
    <line x1="356" y1="379" x2="368" y2="379" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#la-arrow)"></line>
    <rect x="368" y="316" width="160" height="126" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="448" y="340" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">③ 递推地更新</text>
    <text x="448" y="366" text-anchor="middle" fill="var(--ai-text)" font-size="11" font-family="monospace">Sₜ = Sₜ₋₁ + vₜ⊗kₜ</text>
    <text x="448" y="392" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">读一个就叠一份外积进去</text>
    <text x="448" y="410" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">输出 yₜ = qₜᵀ Sₜ</text>
    <text x="448" y="428" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">本质是 RNN 形态</text>
    <text x="24" y="456" fill="var(--ai-muted)" font-size="10.5">softmax 把乘法顺序卡死了；去掉之后结合律回来，(QKᵀ)V 就等于 Q(KᵀV)。</text>
    <line x1="24" y1="470" x2="536" y2="470" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="490" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 代价：d×d 装不下无限长，精确召回最先失手</text>
    <rect x="24" y="500" width="512" height="140" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <rect x="40" y="514" width="152" height="112" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="116" y="540" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">① 一份状态装全部</text>
    <text x="116" y="560" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">后写的把先写的盖掉</text>
    <text x="116" y="576" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">越早的细节越先糊掉</text>
    <text x="116" y="596" text-anchor="middle" fill="var(--ai-amber)" font-size="9.5">「大海捞针」最先失手</text>
    <text x="116" y="612" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">d×d 是写死的容量</text>
    <line x1="192" y1="570" x2="204" y2="570" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#la-arrow)"></line>
    <rect x="204" y="514" width="152" height="112" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="280" y="540" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">② 切多段各存一份</text>
    <text x="280" y="560" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">MSLA：每段一个状态</text>
    <text x="280" y="576" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">不再互相覆盖</text>
    <text x="280" y="596" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">新问题：该读哪一段？</text>
    <text x="280" y="612" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">只比均值，针会被平均掉</text>
    <line x1="356" y1="570" x2="368" y2="570" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#la-arrow)"></line>
    <rect x="368" y="514" width="152" height="112" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="444" y="540" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">③ 挑段时看分布</text>
    <text x="444" y="560" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">MERLIN 再记二阶矩</text>
    <text x="444" y="576" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">方差大 ⇒ 少量强相关</text>
    <text x="444" y="596" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">正是「针躺在草堆里」</text>
    <text x="444" y="612" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">上限不改，只是读得更准</text>
    <line x1="24" y1="656" x2="536" y2="656" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="676" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 换来什么，没换什么</text>
    <rect x="24" y="688" width="250" height="90" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="44" y="712" fill="var(--ai-green)" font-size="12" font-weight="600">换来：长度不再是成本项</text>
    <text x="44" y="734" fill="var(--ai-text)" font-size="9.5">解码内存恒定 O(1)，不随上下文涨</text>
    <text x="44" y="752" fill="var(--ai-text)" font-size="9.5">计算随长度线性，而不是平方</text>
    <text x="44" y="770" fill="var(--ai-muted)" font-size="9.5">训练走并行、推理走递推，两份都对</text>
    <rect x="286" y="688" width="250" height="90" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="306" y="712" fill="var(--ai-amber)" font-size="12" font-weight="600">没换：召回精度和一堆旋钮</text>
    <text x="306" y="734" fill="var(--ai-text)" font-size="9.5">压缩必有损：精确逐字召回不如留缓存</text>
    <text x="306" y="752" fill="var(--ai-text)" font-size="9.5">状态是新瓶颈：段数、衰减、路由都得调</text>
    <text x="306" y="770" fill="var(--ai-muted)" font-size="9.5">好坏看这些旋钮怎么配，不是一句更快</text>
    <line x1="24" y1="790" x2="536" y2="790" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="280" y="812" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">注意力是「全都留着回头查」，线性注意力是「读一遍，只带摘要上路」。</tspan></text>
    <text x="280" y="826" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">代价从「显存随长度涨」换成了「固定容量里能记住多少」——后者才是这条路线真正的战场。</text>
    </svg>
    <figcaption class="ai-kp__cap">上：两种账本对比 · 中：去掉 softmax 后的递推形式，以及状态容量不足的三步应对 · 下：换来什么、没换什么。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>标准注意力先算 n×n 得分表，每个字都要回头看历史。去掉 softmax 后结合律回来，Q(KᵀV)：KᵀV 是一份 d×d 累积量，读一个 token 叠一次。预测只带这份状态走，内存不再随上下文变长；代价是 d×d 容量是硬上限。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s03/linear-attention/" data-no-popover="true">返回主题 · 线性注意力与状态空间模型 →</a>
  </nav>
</div>
