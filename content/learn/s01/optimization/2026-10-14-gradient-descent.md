---
title: 梯度下降 · 一步步走下山
publish: true
description: 每日知识点（S-01 数学直觉 / 优化与梯度）：一张图看懂梯度下降——梯度指向上坡，参数反着走，步长决定旅程。
---

<div class="ai-learn ai-kp ka-view ka-view--kp">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D1 智能原理</span> / <span>S01 数学直觉</span> / <span>优化与梯度</span> / 梯度下降</div>
  <div class="ka-kp-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-cyan)">DAILY · 2026-10-14</span>
      <span class="ka-tag plain">S01 / 优化与梯度</span>
      <span class="ka-tag plain">系列 · 优化入门 1/4</span>
    </div>
    <h1>梯度下降 · 一步步走下山</h1>
    <p class="lede">当参数多到没法一步算最优解时，<b>沿着坡度最陡的方向小步走，重复几千次</b>，就能走到山谷的最低处——这就是几乎所有模型训练的底层动作。</p>
  </div>
  <div class="ka-kp-grid">
    <div>
      <div class="ka-figcard">
        <div class="fhead"><i class="sig"></i>核心图解 · 一张图看懂机制</div>
        <svg viewBox="0 0 720 400" role="img" aria-label="梯度下降三段式图解：问题、机制、关键坑，以及学习率步幅对比">
          <defs><marker id="ka-ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="var(--ka-line-strong)"></path></marker></defs>
          <rect class="ka-fblock" x="30" y="30" width="200" height="150" rx="12"></rect>
          <rect class="ka-fblock" x="260" y="30" width="200" height="150" rx="12"></rect>
          <rect class="ka-fblock" x="490" y="30" width="200" height="150" rx="12"></rect>
          <text class="ka-fnum" x="52" y="62" style="fill:var(--ka-cyan)">01</text>
          <text class="ka-fnum" x="282" y="62" style="fill:var(--ka-violet)">02</text>
          <text class="ka-fnum" x="512" y="62" style="fill:var(--ka-green)">03</text>
          <text class="ka-ftitle" x="52" y="96">问题</text>
          <text class="ka-ftext" x="52" y="124">参数上亿，没有公式</text>
          <text class="ka-ftext" x="52" y="146">能一步算出最优值</text>
          <text class="ka-ftitle" x="282" y="96">机制</text>
          <text class="ka-ftext" x="282" y="124">算梯度 → 反方向</text>
          <text class="ka-ftext" x="282" y="146">小步更新 → 重复</text>
          <text class="ka-ftitle" x="512" y="96">关键</text>
          <text class="ka-ftext" x="512" y="124">步子太大跳过谷底</text>
          <text class="ka-ftext" x="512" y="146">太小又走得过慢</text>
          <path d="M232 105h24M462 105h24" stroke="var(--ka-line-strong)" stroke-width="2" fill="none" marker-end="url(#ka-ar)"></path>
          <rect x="30" y="210" width="660" height="160" rx="12" style="fill:color-mix(in srgb, var(--ka-cyan) 6%, var(--ka-panel-solid));stroke:var(--ka-line-strong)"></rect>
          <text x="60" y="250" style="fill:var(--ka-muted);font-family:var(--ka-mono);font-size:11px;letter-spacing:.1em">学习率 · 决定每一步走多远</text>
          <text class="ka-fbig" x="60" y="305">0.001</text>
          <text x="150" y="305" style="fill:var(--ka-muted);font-family:var(--ka-sans);font-size:13px">太小：收敛慢，可能卡在半路</text>
          <text class="ka-fbig" x="420" y="305" style="fill:var(--ka-amber)">0.1</text>
          <text x="478" y="305" style="fill:var(--ka-muted);font-family:var(--ka-sans);font-size:13px">太大：来回震荡，越过最优点</text>
          <text x="60" y="345" style="fill:var(--ka-text);font-family:var(--ka-sans);font-size:14px">一句话：方向由梯度给，节奏由学习率定。</text>
        </svg>
        <div class="fcap">图解遵循「问题 → 机制 → 关键坑」三段式，一屏只讲一个问题。</div>
      </div>
      <div class="ka-prose">
        <p>训练模型，本质是给上亿个参数找一组「最合适」的值。参数一多，就不可能像解方程那样一步算出答案。梯度下降给了一个笨但有效的办法：<em>先随便猜一组值，看看往哪个方向调整能让误差变小，就朝那个方向挪一小步</em>，然后重复几万次。</p>
        <p>这里的「方向」由梯度给出——它大致指向误差上升最快的方向，所以往它的反方向走。「一小步」迈多大，则由<em>学习率</em>控制。这两个量，一个定方向、一个定节奏，是理解几乎所有优化器的钥匙。</p>
      </div>
      <div class="ka-kbox">
        <div class="kt">反直觉的关键点</div>
        <p>直觉上觉得「步子越大越快到谷底」，其实步子太大会直接越过谷底、在两侧来回弹跳，永远落不下去。所以慢，有时反而更快收敛。</p>
      </div>
      <div class="ka-kp-nav">
        <a class="prev" href="learn/s01/optimization/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">优化与梯度 · 更多知识点</div></a>
        <a class="next" href="learn/s01/" data-no-popover="true"><div class="kn">下一阶段 →</div><div class="kt">S02 深度学习与神经网络</div></a>
      </div>
    </div>
    <aside>
      <div class="ka-aside-card">
        <h5>系列进度 · 优化入门</h5>
        <div class="ka-ser-row done"><i class="si">✓</i><span>反向传播</span></div>
        <div class="ka-ser-row cur"><i class="si">2</i><span>梯度下降</span></div>
        <div class="ka-ser-row"><i class="si">3</i><span>动量与自适应</span></div>
        <div class="ka-ser-row"><i class="si">4</i><span>实战中的坑</span></div>
      </div>
      <div class="ka-aside-card">
        <h5>相关知识点</h5>
        <div class="ka-rel-link">学习率调度策略</div>
        <div class="ka-rel-link">局部最优与鞍点</div>
        <div class="ka-rel-link">批量与随机梯度</div>
        <div class="ka-rel-link">梯度消失与爆炸</div>
      </div>
      <div class="ka-aside-card">
        <h5>来源</h5>
        <div style="font-size:12px;color:var(--ka-muted);line-height:1.7">Goodfellow《Deep Learning》第 4 章；教学共识，多处教材交叉验证。</div>
      </div>
    </aside>
  </div>
</div>
