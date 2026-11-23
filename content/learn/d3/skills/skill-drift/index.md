---
title: Skill 为什么会越改越差
publish: true
description: 无反馈反复重写会让 Skill 越写越没用：模型先丢掉自己写不出来的那部分，而那部分恰恰是专家写的价值。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · Skills 与能力封装</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-23</span>
    </div>
    <h1>Skill 为什么会越改越差</h1>
    <p class="ka-art-lede">一份 Skill 让模型自己反复重写，不给它任何任务反馈，它会写得越来越顺，也越来越没用。问题不在文笔，在于它先丢掉了自己写不出来的那部分。</p>
  </div>
  <h2 class="ka-art-h2">01 重写没有锚</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 拿自己写的当下一版</div>
    <svg class="fig-w" viewBox="0 0 640 304" role="img" aria-label="无反馈重写循环：专家写的 Skill 经模型读一遍、按自己写法重写、下一轮再读这份，三十轮后 SkillsBench 平均掉 15 分">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">无反馈重写 · 三十轮</text>
      <rect class="ka-fblock" x="16" y="42" width="136" height="104" rx="9"/>
      <text class="ka-fnum" x="30" y="68" style="fill: var(--ka-amber)">01</text>
      <text class="ka-ftitle" x="30" y="102">专家写的</text>
      <text class="ka-ftext" x="30" y="130">带经验的原版</text>
      <path d="M156 94h8" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M160 89l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="168" y="42" width="136" height="104" rx="9"/>
      <text class="ka-fnum" x="182" y="68" style="fill: var(--ka-cyan)">02</text>
      <text class="ka-ftitle" x="182" y="102">模型读一遍</text>
      <text class="ka-ftext" x="182" y="130">只看到字面</text>
      <path d="M308 94h8" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M312 89l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="320" y="42" width="136" height="104" rx="9"/>
      <text class="ka-fnum" x="334" y="68" style="fill: var(--ka-cyan)">03</text>
      <text class="ka-ftitle" x="334" y="102">按自己写法改</text>
      <text class="ka-ftext" x="334" y="130">更顺、更通用</text>
      <path d="M460 94h8" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M464 89l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="472" y="42" width="136" height="104" rx="9"/>
      <text class="ka-fnum" x="486" y="68" style="fill: var(--ka-green)">04</text>
      <text class="ka-ftitle" x="486" y="102">下一轮再读</text>
      <text class="ka-ftext" x="486" y="130">新版成了原版</text>
      <path d="M540 150v18H236v-18" fill="none" stroke="var(--ka-green)" stroke-width="2" opacity="0.5"/>
      <path d="M230 162l6 6 6-6z" fill="var(--ka-green)" opacity="0.5"/>
      <text class="ka-fsmall" x="388" y="188" text-anchor="middle">没有任务、没有对错、没有评分</text>
      <rect class="ka-fblock" x="16" y="204" width="608" height="84" rx="10"/>
      <text class="ka-fsay" x="36" y="236">越写越顺，也越写越没用</text>
      <text class="ka-ftext" x="36" y="266">三十轮后，每个被测模型在每个基准上都变差；SkillsBench 平均掉 15 分</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 548" role="img" aria-label="无反馈重写循环：专家写的 Skill 经模型读一遍、按自己写法重写、下一轮再读这份，三十轮后 SkillsBench 平均掉 15 分">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">无反馈重写 · 三十轮</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="30" y="68" style="fill: var(--ka-amber)">01</text>
      <text class="ka-ftitle" x="30" y="98">专家写的：带经验的原版</text>
      <path d="M175 126l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="140" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="30" y="166" style="fill: var(--ka-cyan)">02</text>
      <text class="ka-ftitle" x="30" y="196">模型读一遍：只看到字面</text>
      <path d="M175 224l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="238" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="30" y="264" style="fill: var(--ka-cyan)">03</text>
      <text class="ka-ftitle" x="30" y="294">按自己写法改：更顺更通用</text>
      <path d="M175 322l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="336" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="30" y="362" style="fill: var(--ka-green)">04</text>
      <text class="ka-ftitle" x="30" y="392">下一轮再读：新版成了原版</text>
      <text class="ka-fsmall" x="180" y="444" text-anchor="middle">没有任务、没有对错、没有评分</text>
      <rect class="ka-fblock" x="14" y="458" width="332" height="76" rx="10"/>
      <text class="ka-fsay" x="30" y="488">越写越顺，也越写越没用</text>
      <text class="ka-ftext" x="30" y="516">三十轮后 SkillsBench 平均掉 15 分</text>
    </svg>
    <div class="ka-fcap">图注：这是一个循环——后面每一轮读到的，都是上一轮自己改过的版本。</div>
  </div>
  <div class="ka-art-note">
    <p>把一份专家 Skill 交给模型重写，再拿重写版继续重写，循环三十轮，全程不给任务、不给对错、不给评分。结果不是慢慢变好，而是每个被测模型、每个基准都变差，SkillsBench 上平均掉 15 分。</p>
    <p>这里要分清两件事：「读起来更顺」和「用起来更有用」不是一回事。没有任务反馈，模型手上只剩一个锚——它自己习惯的写法。</p>
  </div>
  <h2 class="ka-art-h2">02 先丢的是什么</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 两类内容，命运不同</div>
    <svg class="fig-w" viewBox="0 0 640 332" role="img" aria-label="Skill 中模型自己写得出来的通用步骤、标准格式会被保留，模型写不出来的踩坑记录、反常识约束与具体边界会先被丢掉">
      <rect x="16" y="30" width="258" height="182" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="36" y="62" style="fill: var(--ka-cyan)">模型写得出来的</text>
      <text class="ka-ftext" x="36" y="100">通用步骤：先取数、再校验</text>
      <text class="ka-ftext" x="36" y="134">标准格式：三段式输出</text>
      <text class="ka-ftext" x="36" y="168">常见做法：出错就重试</text>
      <text class="ka-fsmall" x="36" y="198">重写后基本还在</text>
      <rect x="366" y="30" width="258" height="182" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="386" y="62" style="fill: var(--ka-amber)">模型写不出来的</text>
      <text class="ka-ftext" x="386" y="100">踩过的坑：这里会静默失败</text>
      <text class="ka-ftext" x="386" y="134">反常识约束：别自动重试</text>
      <text class="ka-ftext" x="386" y="168">具体边界：超过这个数就停</text>
      <text class="ka-fsmall" x="386" y="198">重写最先动这一类</text>
      <path d="M360 108h-16" stroke="var(--ka-amber)" stroke-width="2" opacity="0.55"/>
      <path d="M348 103l-8 5 8 5z" fill="var(--ka-amber)" opacity="0.55"/>
      <text class="ka-fsmall" x="320" y="140" text-anchor="middle">重写</text>
      <rect class="ka-fblock" x="16" y="236" width="608" height="80" rx="10"/>
      <text class="ka-fsay" x="36" y="268">被先丢掉的，正是专家那份的价值</text>
      <text class="ka-ftext" x="36" y="298">因为它不符合模型自己的写法，看起来像多余的废话</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 444" role="img" aria-label="Skill 中模型自己写得出来的通用步骤、标准格式会被保留，模型写不出来的踩坑记录、反常识约束与具体边界会先被丢掉">
      <rect x="14" y="14" width="332" height="132" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="32" y="46" style="fill: var(--ka-cyan)">模型写得出来的</text>
      <text class="ka-ftext" x="32" y="78">通用步骤、标准格式、常见做法</text>
      <text class="ka-fsmall" x="32" y="112">重写后基本还在</text>
      <path d="M175 154l5 8 5-8z" fill="var(--ka-amber)" opacity="0.6"/>
      <text class="ka-fsmall" x="180" y="180" text-anchor="middle">重写先动下面这一类</text>
      <rect x="14" y="196" width="332" height="132" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="32" y="228" style="fill: var(--ka-amber)">模型写不出来的</text>
      <text class="ka-ftext" x="32" y="260">踩过的坑、反常识约束、具体边界</text>
      <text class="ka-fsmall" x="32" y="294">先被丢掉，因为看着像废话</text>
      <rect class="ka-fblock" x="14" y="342" width="332" height="88" rx="10"/>
      <text class="ka-fsay" x="32" y="374">先丢的正是专家那份的价值</text>
      <text class="ka-ftext" x="32" y="406">它不符合模型习惯的写法</text>
    </svg>
    <div class="ka-fcap">图注：同一份 Skill 里的两类内容，重写对它们的态度不一样——越往后，第二类越薄。</div>
  </div>
  <div class="ka-art-note">
    <p>重写的方向来自模型自己的先验。通用步骤、标准格式、常见做法，这些它本来就写得出来，改完还在；而踩过的坑、反常识的约束、具体数字和边界，往往只有专家写得出，在模型眼里像多余的啰嗦。</p>
    <p>于是重写先把这一类抹平。研究者用模型自己写的 Skill 去采样它的先验，发现被放弃的正是先验之外的知识。</p>
  </div>
  <h2 class="ka-art-h2">03 把丢掉的放回去</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 三笔账</div>
    <svg class="fig-w" viewBox="0 0 640 316" role="img" aria-label="原版 Skill 为基准，三十轮重写后平均掉 15 分，放回先验外知识后大部分恢复，SkillDiff 原位标记不改文本平均加 4.8 分">
      <rect class="ka-fblock" x="16" y="20" width="608" height="56" rx="9"/>
      <text class="ka-ftext" x="34" y="54">专家写的原版</text>
      <text class="ka-fnum" x="600" y="55" text-anchor="end" style="fill: var(--ka-muted)">基准</text>
      <rect class="ka-fblock" x="16" y="86" width="608" height="56" rx="9"/>
      <text class="ka-ftext" x="34" y="120">三十轮重写后</text>
      <text class="ka-fnum" x="600" y="121" text-anchor="end" style="fill: var(--ka-amber)">−15 分</text>
      <rect class="ka-fblock" x="16" y="152" width="608" height="56" rx="9"/>
      <text class="ka-ftext" x="34" y="186">把丢掉的知识放回去</text>
      <text class="ka-fnum" x="600" y="187" text-anchor="end" style="fill: var(--ka-cyan)">大部分恢复</text>
      <rect class="ka-fblock" x="16" y="218" width="608" height="56" rx="9"/>
      <text class="ka-ftext" x="34" y="252">原位标记，一个字不改</text>
      <text class="ka-fnum" x="600" y="253" text-anchor="end" style="fill: var(--ka-green)">+4.8 分</text>
      <text class="ka-fsay" x="320" y="302" text-anchor="middle">专家写的价值，主要在模型写不出来的那部分</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 468" role="img" aria-label="原版 Skill 为基准，三十轮重写后平均掉 15 分，放回先验外知识后大部分恢复，SkillDiff 原位标记不改文本平均加 4.8 分">
      <rect class="ka-fblock" x="14" y="14" width="332" height="76" rx="9"/>
      <text class="ka-ftext" x="32" y="44">专家写的原版</text>
      <text class="ka-fnum" x="328" y="45" text-anchor="end" style="fill: var(--ka-muted)">基准</text>
      <text class="ka-fsmall" x="32" y="70">从这里出发</text>
      <rect class="ka-fblock" x="14" y="100" width="332" height="76" rx="9"/>
      <text class="ka-ftext" x="32" y="130">三十轮重写后</text>
      <text class="ka-fnum" x="328" y="131" text-anchor="end" style="fill: var(--ka-amber)">−15 分</text>
      <text class="ka-fsmall" x="32" y="156">每个模型、每个基准都变差</text>
      <rect class="ka-fblock" x="14" y="186" width="332" height="76" rx="9"/>
      <text class="ka-ftext" x="32" y="216">把丢掉的知识放回去</text>
      <text class="ka-fnum" x="328" y="217" text-anchor="end" style="fill: var(--ka-cyan)">大部分恢复</text>
      <text class="ka-fsmall" x="32" y="242">说明丢的正是有用的</text>
      <rect class="ka-fblock" x="14" y="272" width="332" height="76" rx="9"/>
      <text class="ka-ftext" x="32" y="302">原位标记，一个字不改</text>
      <text class="ka-fnum" x="328" y="303" text-anchor="end" style="fill: var(--ka-green)">+4.8 分</text>
      <text class="ka-fsmall" x="32" y="328">SkillDiff 的做法</text>
      <rect class="ka-fblock" x="14" y="362" width="332" height="90" rx="10"/>
      <text class="ka-fsay" x="32" y="396">专家写的价值</text>
      <text class="ka-fsay" x="32" y="428">在模型写不出来的那部分</text>
    </svg>
    <div class="ka-fcap">图注：越往后越接近根因——不是文字不好，是那部分独有信息丢了。</div>
  </div>
  <div class="ka-art-note">
    <p>把丢掉的知识再放回去，通过率能大部分恢复。SkillDiff 干脆一个字不改，只在原位标出「这是模型自己写不出来的」，SkillsBench 上平均多了 4.8 分。</p>
    <p>这给出一个很实用的判据：更新 Skill 时该盯住的不是措辞顺不顺，而是那些模型不会自己写的内容还在不在。有真实运行反馈的进化是另一回事，那是拿结果当锚，不是拿写法当锚。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://arxiv.org/abs/2611.25534" target="_blank" rel="noopener">How Feedback-Free Self-Evolution Reshapes Agent Skills（arXiv 2611.25534）</a> · <a href="https://arxiv.org/abs/2611.25429" target="_blank" rel="noopener">Evolve Where It Matters: Coverage-Guided Self-Evolution of Agent Skills（arXiv 2611.25429）</a>。15 分、4.8 分与实验设置来自前者摘要；后者作为「有反馈时结论相反」的对照。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/skill-runtime/" data-no-popover="true"><div class="kn">下一篇 →</div><div class="kt">Skill 是怎么跑起来的</div></a>
  </nav>
</div>
