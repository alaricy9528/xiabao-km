---
title: 知识蒸馏 · 抄的不是答案，是分布
publish: true
description: 每日知识点（S-04 大模型训练与对齐 / 蒸馏与能力迁移）：一张图看懂知识蒸馏——硬标签只说哪个对，软标签说其余的有多错；温度把分布烫平让暗知识显形，以及蒸馏到底能传来什么、传不了什么。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s04/distillation/" data-no-popover="true">← 返回主题 · 蒸馏与能力迁移</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-01</span><span>S-04 / 蒸馏与能力迁移</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="知识蒸馏信息图：硬标签与软标签的差别、温度 T 把分布烫平的三档对比、蒸馏损失加真实标签损失的两项训练目标，以及蒸馏能传来与传不来的两笔账" xmlns="http://www.w3.org/2000/svg">
    <title>知识蒸馏 · Knowledge Distillation</title>
    <defs><marker id="kd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
    <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-04 大模型训练与对齐 / 蒸馏与能力迁移</text>
    <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">知识蒸馏 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">KNOWLEDGE DISTILLATION</tspan></text>
    <text x="24" y="76" fill="var(--ai-muted)" font-size="12">让小模型去学大模型：不是抄它的答案，而是抄它给每个选项分配的概率。</text>
    <text x="24" y="104" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 同一道题的两种标签：只给答案 vs 给出全部分配</text>
    <rect x="24" y="116" width="252" height="132" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="40" y="138" fill="var(--ai-ice)" font-size="11.5" font-weight="600">硬标签 · 只说哪个对</text>
    <text x="40" y="160" fill="var(--ai-muted)" font-size="9.5">猫</text><rect x="76" y="152" width="150" height="12" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><text x="232" y="161" fill="var(--ai-text)" font-size="9">1.00</text>
    <text x="40" y="180" fill="var(--ai-muted)" font-size="9.5">狐</text><rect x="76" y="172" width="2" height="12" rx="1" fill="var(--ai-line-strong)"></rect><text x="232" y="181" fill="var(--ai-muted)" font-size="9">0.00</text>
    <text x="40" y="200" fill="var(--ai-muted)" font-size="9.5">狗</text><rect x="76" y="192" width="2" height="12" rx="1" fill="var(--ai-line-strong)"></rect><text x="232" y="201" fill="var(--ai-muted)" font-size="9">0.00</text>
    <text x="40" y="224" fill="var(--ai-text)" font-size="9.5">一个 1 配一堆 0</text>
    <text x="40" y="240" fill="var(--ai-muted)" font-size="9.5">没说「有多像狐狸」</text>
    <rect x="288" y="116" width="248" height="132" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="304" y="138" fill="var(--ai-ice)" font-size="11.5" font-weight="600">软标签 · 说出全部分配</text>
    <text x="304" y="160" fill="var(--ai-muted)" font-size="9.5">猫</text><rect x="340" y="152" width="102" height="12" rx="3" fill="var(--ai-cyan)" fill-opacity="0.55"></rect><text x="448" y="161" fill="var(--ai-text)" font-size="9">0.68</text>
    <text x="304" y="180" fill="var(--ai-muted)" font-size="9.5">狐</text><rect x="340" y="172" width="31" height="12" rx="3" fill="var(--ai-violet)" fill-opacity="0.5"></rect><text x="448" y="181" fill="var(--ai-text)" font-size="9">0.21</text>
    <text x="304" y="200" fill="var(--ai-muted)" font-size="9.5">狗</text><rect x="340" y="192" width="11" height="12" rx="3" fill="var(--ai-violet)" fill-opacity="0.5"></rect><text x="448" y="201" fill="var(--ai-text)" font-size="9">0.07</text>
    <text x="304" y="220" fill="var(--ai-muted)" font-size="9.5">车</text><rect x="340" y="212" width="6" height="12" rx="3" fill="var(--ai-violet)" fill-opacity="0.5"></rect><text x="448" y="221" fill="var(--ai-text)" font-size="9">0.04</text>
    <text x="304" y="240" fill="var(--ai-amber)" font-size="9.5">非答案位的大小就是暗知识</text>
    <text x="24" y="266" fill="var(--ai-muted)" font-size="10.5">硬标签只说「是猫」；软标签说「像猫，也有点像狐狸，几乎不像车」——排序与间距才是教师真正能教的东西。</text>
    <line x1="24" y1="282" x2="536" y2="282" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="304" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 温度 T 做的事：把分布烫平，让暗知识显形</text>
    <rect x="24" y="316" width="160" height="126" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="104" y="338" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">T = 1 · 原样</text>
    <text x="104" y="360" text-anchor="middle" fill="var(--ai-text)" font-size="11" font-family="monospace">softmax(z / T)</text>
    <rect x="44" y="372" width="118" height="10" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><text x="44" y="396" fill="var(--ai-muted)" font-size="9">0.93</text>
    <rect x="44" y="400" width="8" height="10" rx="3" fill="var(--ai-line-strong)"></rect><text x="60" y="424" fill="var(--ai-muted)" font-size="9">0.05 / 0.02</text>
    <text x="104" y="440" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">峰值独占，次选项被压平</text>
    <line x1="184" y1="379" x2="196" y2="379" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#kd-arrow)"></line>
    <rect x="196" y="316" width="160" height="126" rx="12" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="276" y="338" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">T ≈ 4 · 烫平</text>
    <text x="276" y="360" text-anchor="middle" fill="var(--ai-text)" font-size="11" font-family="monospace">拉近 logits 差</text>
    <rect x="216" y="372" width="76" height="10" rx="3" fill="var(--ai-cyan)" fill-opacity="0.5"></rect><text x="216" y="396" fill="var(--ai-muted)" font-size="9">0.52</text>
    <rect x="216" y="400" width="41" height="10" rx="3" fill="var(--ai-violet)" fill-opacity="0.5"></rect><text x="264" y="424" fill="var(--ai-muted)" font-size="9">0.28 / 0.13</text>
    <text x="276" y="440" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">次选项显形：排序与间距可读</text>
    <line x1="356" y1="379" x2="368" y2="379" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#kd-arrow)"></line>
    <rect x="368" y="316" width="160" height="126" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="448" y="338" text-anchor="middle" fill="var(--ai-ice)" font-size="11.5" font-weight="600">T 过大 · 抹平</text>
    <text x="448" y="360" text-anchor="middle" fill="var(--ai-text)" font-size="11" font-family="monospace">T → ∞ 即均匀</text>
    <rect x="388" y="372" width="50" height="10" rx="3" fill="var(--ai-line-strong)"></rect>
    <rect x="388" y="388" width="50" height="10" rx="3" fill="var(--ai-line-strong)"></rect>
    <rect x="388" y="404" width="50" height="10" rx="3" fill="var(--ai-line-strong)"></rect>
    <text x="448" y="426" text-anchor="middle" fill="var(--ai-muted)" font-size="9">0.34 / 0.33 / 0.33</text>
    <text x="448" y="440" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">信息被温度抹掉：T 是旋钮</text>
    <text x="24" y="456" fill="var(--ai-muted)" font-size="10.5">同一个 logits，除以 T 再 softmax：T 越大分布越平，次选项露出来——但大到极限就什么都不剩了。</text>
    <line x1="24" y1="470" x2="536" y2="470" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="490" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 训练目标：跟教师对齐，同时别放开真实答案</text>
    <rect x="24" y="500" width="512" height="140" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="280" y="526" text-anchor="middle" fill="var(--ai-text)" font-size="11.5" font-family="monospace">Loss = α · T² · KL(教师_T ‖ 学生_T) + (1 − α) · CE(y, 学生)</text>
    <rect x="40" y="540" width="224" height="84" rx="10" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
    <text x="152" y="562" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">蒸馏项 · 学教师</text>
    <text x="56" y="582" fill="var(--ai-text)" font-size="9.5">学生要在同一个 T 下匹配整个分布</text>
    <text x="56" y="598" fill="var(--ai-text)" font-size="9.5">T² 把被温度缩小的梯度还回来</text>
    <text x="56" y="614" fill="var(--ai-muted)" font-size="9.5">换监督层级：从词表到动作语义</text>
    <rect x="296" y="540" width="224" height="84" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
    <text x="408" y="562" text-anchor="middle" fill="var(--ai-ice)" font-size="11" font-weight="600">真实项 · 别跑偏</text>
    <text x="312" y="582" fill="var(--ai-text)" font-size="9.5">仍用硬标签 CE 锚住正确答案</text>
    <text x="312" y="598" fill="var(--ai-text)" font-size="9.5">教师也会错，全信会一起错</text>
    <text x="312" y="614" fill="var(--ai-muted)" font-size="9.5">α 是两边权重的取舍旋钮</text>
    <line x1="24" y1="656" x2="536" y2="656" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="24" y="676" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 能传来什么，传不来什么</text>
    <rect x="24" y="688" width="250" height="90" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
    <text x="44" y="712" fill="var(--ai-green)" font-size="12" font-weight="600">传来：行为与组合能力</text>
    <text x="44" y="734" fill="var(--ai-text)" font-size="9.5">决策边界的形状、类间相似性</text>
    <text x="44" y="752" fill="var(--ai-text)" font-size="9.5">风格、格式与推理的组织方式</text>
    <text x="44" y="770" fill="var(--ai-muted)" font-size="9.5">组合技能可稳定迁到未见结构上</text>
    <rect x="286" y="688" width="250" height="90" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
    <text x="306" y="712" fill="var(--ai-amber)" font-size="12" font-weight="600">传不来：教师没有的知识</text>
    <text x="306" y="734" fill="var(--ai-text)" font-size="9.5">事实记忆几乎零扩张：教不了新知</text>
    <text x="306" y="752" fill="var(--ai-text)" font-size="9.5">要灌事实得换目标或补数据</text>
    <text x="306" y="770" fill="var(--ai-muted)" font-size="9.5">学生的上限仍由自身容量决定</text>
    <line x1="24" y1="790" x2="536" y2="790" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
    <text x="280" y="812" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">蒸馏传的是「教师怎么分配概率」，不是「教师知道什么」。</tspan></text>
    <text x="280" y="826" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">所以监督单元选在哪一层，决定了传得过去的是措辞、动作还是知识——这是今天蒸馏研究真正的分水岭。</text>
    </svg>
    <figcaption class="ai-kp__cap">上：硬标签与软标签的差别，以及温度 T 的三档对比 · 中：训练目标的两项各管什么 · 下：蒸馏能传来与传不来的两笔账。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>硬标签只说「哪个对」，软标签还说「其余的有多错」——这份排序就是暗知识。温度 T 把分布烫平让次选项显形，学生用 KL 去匹配教师的整个分布，再乘 T² 补回被缩小的梯度。蒸馏传的是教师分配概率的方式，不是它肚子里的事实。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s04/distillation/" data-no-popover="true">返回主题 · 蒸馏与能力迁移 →</a>
  </nav>
</div>
