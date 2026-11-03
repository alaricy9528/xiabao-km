---
title: 模型量化 · 每个数少占几位，代价记在哪
publish: true
description: 每日知识点（S-05 推理、智能体与记忆 / 数值精度与量化）：一张图看懂模型量化——位宽、缩放因子与舍入误差，PTQ 与 QAT 的分工，以及训练与生成必须说同一套数值语言。
---

<div class="ai-learn ai-kp">
  <a class="ai-learn__back" href="learn/s05/quantization/" data-no-popover="true">← 返回主题 · 数值精度与量化</a>
  <p class="ai-eyebrow"><span>DAILY · 2026-11-04</span><span>S-05 / 数值精度与量化</span></p>
  <figure class="ai-kp__fig">
    <svg viewBox="0 0 560 830" role="img" aria-label="模型量化信息图：位宽与格点密度、scale 与 zero point 的映射和舍入误差、PTQ 与 QAT 两条路线以及训练与生成精度一致的第三条缝，最后列出换来与没换来的东西" xmlns="http://www.w3.org/2000/svg">
      <title>模型量化 · Quantization</title>
      <defs><marker id="quan-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--ai-cyan)"></path></marker></defs>
      <text x="24" y="26" fill="var(--ai-muted)" font-size="10.5" letter-spacing="2.2" font-family="monospace">DAILY KNOWLEDGE · S-05 推理、智能体与记忆 / 数值精度与量化</text>
      <text x="24" y="54" fill="var(--ai-ice)" font-size="24" font-weight="700">模型量化 <tspan fill="var(--ai-cyan)" font-size="12.5" letter-spacing="1.5">QUANTIZATION</tspan></text>
      <text x="24" y="76" fill="var(--ai-muted)" font-size="12">权重与激活不必一直用 16 位存：少几位能省下显存与带宽，代价藏在舍入里。</text>
      <text x="24" y="104" fill="var(--ai-ice)" font-size="12.5" font-weight="600">① 一个数怎么存：位宽同时决定范围与间隔</text>
      <rect x="24" y="116" width="512" height="150" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="140" fill="var(--ai-ice)" font-size="11.5" font-weight="600">位宽 BIT WIDTH → 格点 CODEWORD 密度</text>
      <text x="40" y="178" fill="var(--ai-cyan)" font-size="10" font-weight="600">BF16 · 16 位</text>
      <rect x="190" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="207.5" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="225" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="242.5" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="260" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="277.5" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="295" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="312.5" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="330" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="347.5" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="365" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="382.5" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="400" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="417.5" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="435" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <rect x="452.5" y="162" width="15" height="18" rx="2" fill="var(--ai-cyan)" fill-opacity="0.35" stroke="var(--ai-cyan)"></rect>
      <text x="480" y="178" fill="var(--ai-muted)" font-size="9.5">格点密</text>
      <text x="40" y="216" fill="var(--ai-violet)" font-size="10" font-weight="600">INT8 · 8 位</text>
      <rect x="190" y="200" width="32.5" height="18" rx="2" fill="var(--ai-violet)" fill-opacity="0.35" stroke="var(--ai-violet)"></rect>
      <rect x="225" y="200" width="32.5" height="18" rx="2" fill="var(--ai-violet)" fill-opacity="0.35" stroke="var(--ai-violet)"></rect>
      <rect x="260" y="200" width="32.5" height="18" rx="2" fill="var(--ai-violet)" fill-opacity="0.35" stroke="var(--ai-violet)"></rect>
      <rect x="295" y="200" width="32.5" height="18" rx="2" fill="var(--ai-violet)" fill-opacity="0.35" stroke="var(--ai-violet)"></rect>
      <rect x="330" y="200" width="32.5" height="18" rx="2" fill="var(--ai-violet)" fill-opacity="0.35" stroke="var(--ai-violet)"></rect>
      <rect x="365" y="200" width="32.5" height="18" rx="2" fill="var(--ai-violet)" fill-opacity="0.35" stroke="var(--ai-violet)"></rect>
      <rect x="400" y="200" width="32.5" height="18" rx="2" fill="var(--ai-violet)" fill-opacity="0.35" stroke="var(--ai-violet)"></rect>
      <rect x="435" y="200" width="32.5" height="18" rx="2" fill="var(--ai-violet)" fill-opacity="0.35" stroke="var(--ai-violet)"></rect>
      <text x="480" y="216" fill="var(--ai-muted)" font-size="9.5">折中</text>
      <text x="40" y="254" fill="var(--ai-amber)" font-size="10" font-weight="600">FP4 · 4 位</text>
      <rect x="190" y="238" width="67.5" height="18" rx="2" fill="var(--ai-amber)" fill-opacity="0.35" stroke="var(--ai-amber)"></rect>
      <rect x="260" y="238" width="67.5" height="18" rx="2" fill="var(--ai-amber)" fill-opacity="0.35" stroke="var(--ai-amber)"></rect>
      <rect x="330" y="238" width="67.5" height="18" rx="2" fill="var(--ai-amber)" fill-opacity="0.35" stroke="var(--ai-amber)"></rect>
      <rect x="400" y="238" width="67.5" height="18" rx="2" fill="var(--ai-amber)" fill-opacity="0.35" stroke="var(--ai-amber)"></rect>
      <text x="480" y="254" fill="var(--ai-muted)" font-size="9.5">格点疏</text>
      <text x="24" y="284" fill="var(--ai-muted)" font-size="10.5">位宽砍半，显存与带宽跟着砍半；但可取的值也砍半——范围与分辨率是一对矛盾，误差从格点不够用来。</text>
      <line x1="24" y1="296" x2="536" y2="296" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="316" fill="var(--ai-ice)" font-size="12.5" font-weight="600">② 映射怎么定：scale 与 zero point</text>
      <rect x="24" y="328" width="512" height="140" rx="12" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="40" y="350" fill="var(--ai-ice)" font-size="11.5" font-weight="600">CALIBRATION · 把连续区间压进有限格点</text>
      <rect x="40" y="366" width="136" height="36" rx="8" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="108" y="389" text-anchor="middle" fill="var(--ai-ice)" font-size="10">实数 x · 连续</text>
      <line x1="176" y1="384" x2="198" y2="384" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#quan-arrow)"></line>
      <rect x="200" y="366" width="160" height="36" rx="8" fill="var(--ai-panel)" stroke="var(--ai-cyan)" stroke-width="1.2"></rect>
      <text x="280" y="384" text-anchor="middle" fill="var(--ai-ice)" font-size="9.5">÷ scale + zero point</text>
      <text x="280" y="397" text-anchor="middle" fill="var(--ai-muted)" font-size="9">缩放与零点</text>
      <line x1="360" y1="384" x2="382" y2="384" stroke="var(--ai-cyan)" stroke-width="1.6" marker-end="url(#quan-arrow)"></line>
      <rect x="384" y="366" width="136" height="36" rx="8" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="452" y="384" text-anchor="middle" fill="var(--ai-ice)" font-size="10">代码字 q · 离散</text>
      <text x="452" y="397" text-anchor="middle" fill="var(--ai-amber)" font-size="9">舍入误差在此产生</text>
      <text x="40" y="424" fill="var(--ai-text)" font-size="9.5">落不进格点的只能就近舍入——这一步的偏差会随层数逐层累积，是精度损失的直接来源。</text>
      <text x="40" y="443" fill="var(--ai-text)" font-size="9.5">校准用一小批代表性数据统计分布来挑 scale；少数离群大值会把 scale 撑大，把大多数普通值挤进少数格点。</text>
      <text x="40" y="461" fill="var(--ai-muted)" font-size="9.5">应对：按通道或分组各自定 scale（per-channel / per-group），别让整张张量共用一个范围。</text>
      <text x="24" y="482" fill="var(--ai-muted)" font-size="10.5">量化不是把数变小，是把连续区间压进有限格点；误差生在压不下的那一段。</text>
      <line x1="24" y1="494" x2="536" y2="494" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="514" fill="var(--ai-ice)" font-size="12.5" font-weight="600">③ 两条路线，与今天补上的第三条缝</text>
      <rect x="40" y="526" width="152" height="100" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="116" y="546" text-anchor="middle" fill="var(--ai-cyan)" font-size="11" font-weight="600">① PTQ</text>
      <text x="116" y="566" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">训练后量化</text>
      <text x="116" y="584" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">只校准，不改权重</text>
      <text x="116" y="602" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">快，敏感层无力自修</text>
      <text x="116" y="618" text-anchor="middle" fill="var(--ai-muted)" font-size="8.5" letter-spacing="0.6">POST-TRAINING</text>
      <rect x="204" y="526" width="152" height="100" rx="10" fill="var(--ai-panel)" stroke="var(--ai-line-strong)"></rect>
      <text x="280" y="546" text-anchor="middle" fill="var(--ai-violet)" font-size="11" font-weight="600">② QAT</text>
      <text x="280" y="566" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">量化感知训练</text>
      <text x="280" y="584" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">前向模拟舍入</text>
      <text x="280" y="602" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">反向直通估计传梯度</text>
      <text x="280" y="618" text-anchor="middle" fill="var(--ai-muted)" font-size="8.5" letter-spacing="0.6">AWARE TRAINING</text>
      <rect x="368" y="526" width="152" height="100" rx="10" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
      <text x="444" y="546" text-anchor="middle" fill="var(--ai-amber)" font-size="11" font-weight="600">③ 第三条缝</text>
      <text x="444" y="566" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">生成 FP4 / 训练 BF16</text>
      <text x="444" y="584" text-anchor="middle" fill="var(--ai-text)" font-size="9.5">各自都准却各说各话</text>
      <text x="444" y="602" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">对齐舍入才不累积</text>
      <text x="444" y="618" text-anchor="middle" fill="var(--ai-muted)" font-size="8.5" letter-spacing="0.6">PATH CONSISTENCY</text>
      <text x="24" y="642" fill="var(--ai-muted)" font-size="10.5">前两条在选「什么时候压」，第三条问的是「两条路径压出来是不是同一个数」——策略在 A 路径采样却在 B 路径更新，梯度会越走越偏。</text>
      <line x1="24" y1="652" x2="536" y2="652" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="24" y="672" fill="var(--ai-ice)" font-size="12.5" font-weight="600">④ 换来什么，没换什么</text>
      <rect x="24" y="684" width="250" height="90" rx="12" fill="var(--ai-panel)" stroke="var(--ai-green)" stroke-width="1.2"></rect>
      <text x="44" y="708" fill="var(--ai-green)" font-size="12" font-weight="600">换来：位宽本身省钱</text>
      <text x="44" y="730" fill="var(--ai-text)" font-size="9.5">显存与带宽同步下降</text>
      <text x="44" y="748" fill="var(--ai-text)" font-size="9.5">低位宽张量核心吞吐更高</text>
      <text x="44" y="766" fill="var(--ai-muted)" font-size="9.5">模型会逐渐适应粗糙数系</text>
      <rect x="286" y="684" width="250" height="90" rx="12" fill="var(--ai-panel)" stroke="var(--ai-amber)" stroke-width="1.2"></rect>
      <text x="306" y="708" fill="var(--ai-amber)" font-size="12" font-weight="600">没换：误差与自证义务</text>
      <text x="306" y="730" fill="var(--ai-text)" font-size="9.5">舍入误差、校准成本仍在</text>
      <text x="306" y="748" fill="var(--ai-text)" font-size="9.5">训练与推理须同一套配置</text>
      <text x="306" y="766" fill="var(--ai-muted)" font-size="9.5">只压权重会落回反量化路径</text>
      <line x1="24" y1="788" x2="536" y2="788" stroke="var(--ai-line)" stroke-width="1" stroke-dasharray="4 5"></line>
      <text x="280" y="808" text-anchor="middle" fill="var(--ai-muted)" font-size="11.5">一句话：<tspan fill="var(--ai-cyan)">量化省的不是计算量，是每个数的位宽；真正的坑是训练与生成说了两套数值语言。</tspan></text>
      <text x="280" y="824" text-anchor="middle" fill="var(--ai-muted)" font-size="9.5">与同阶段「测试时计算」并列：一个决定想多久，一个决定每个数占几位，都是训练之后才付的资源账。</text>
    </svg>
    <figcaption class="ai-kp__cap">上：位宽与格点密度 · 中：scale / zero point 映射、PTQ 与 QAT 及路径一致性 · 下：换来什么、没换什么。</figcaption>
  </figure>
  <div class="ai-kp__text">
    <p>量化把权重与激活从 16 位压到 8 位、4 位：用缩放因子把浮点区间映射进有限格点，落不进的只能舍入；省下显存与带宽，代价是误差。PTQ 只校准，QAT 在训练里模拟舍入。真正的坑是训练与生成精度不同：各说各话，梯度越走越偏。</p>
  </div>
  <nav class="ai-learn__pager" aria-label="知识点导航">
    <a class="ai-learn__back" href="learn/s05/quantization/" data-no-popover="true">返回主题 · 数值精度与量化 →</a>
  </nav>
</div>
