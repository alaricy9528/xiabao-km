---
title: Skill 为什么没被触发
publish: true
description: 装上 Skill 不等于会被想起：触发是一道独立的关，库越大越认不出来，掉的是「一次都没用」而不是「用错了」。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · Skills 与能力封装</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-24</span>
    </div>
    <h1>Skill 为什么没被触发</h1>
    <p class="ka-art-lede">装上 Skill 不等于会被想起。触发是一道单独的关：它和「照着做」分开失效，而且库一变大，先坏的就是它。</p>
  </div>
  <h2 class="ka-art-h2">01 两关，不是一个闸</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 一次任务要过两道关</div>
    <svg class="fig-w" viewBox="0 0 640 304" role="img" aria-label="一次任务要过两道关：只看到名字与描述，先要认出该用它，打开正文后才谈得上照着做；没过第一关，后面的分不算，最强一组总分 0.613">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">一次任务，要过两关</text>
      <rect class="ka-fblock" x="16" y="42" width="136" height="104" rx="9"/>
      <text class="ka-fnum" x="30" y="68" style="fill: var(--ka-muted)">01</text>
      <text class="ka-ftitle" x="30" y="102">任务进来</text>
      <text class="ka-ftext" x="30" y="130">只看名字描述</text>
      <path d="M156 94h8" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M160 89l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="168" y="42" width="136" height="104" rx="9"/>
      <text class="ka-fnum" x="182" y="68" style="fill: var(--ka-cyan)">02</text>
      <text class="ka-ftitle" x="182" y="102">认出用它</text>
      <text class="ka-ftext" x="182" y="130">认不出零调用</text>
      <path d="M308 94h8" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M312 89l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="320" y="42" width="136" height="104" rx="9"/>
      <text class="ka-fnum" x="334" y="68" style="fill: var(--ka-muted)">03</text>
      <text class="ka-ftitle" x="334" y="102">打开正文</text>
      <text class="ka-ftext" x="334" y="130">流程才进上下文</text>
      <path d="M460 94h8" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M464 89l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="472" y="42" width="136" height="104" rx="9"/>
      <text class="ka-fnum" x="486" y="68" style="fill: var(--ka-green)">04</text>
      <text class="ka-ftitle" x="486" y="102">照做交付</text>
      <text class="ka-ftext" x="486" y="130">做没做完都算</text>
      <rect class="ka-fblock" x="16" y="204" width="608" height="84" rx="10"/>
      <text class="ka-fsay" x="36" y="236">没过第一关，后面的分不算</text>
      <text class="ka-ftext" x="36" y="266">只有触发之后才记执行分；最强一组（GPT-5.5 + Claude Code）总分 0.613</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 548" role="img" aria-label="一次任务要过两道关：只看到名字与描述，先要认出该用它，打开正文后才谈得上照着做；没过第一关，后面的分不算，最强一组总分 0.613">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">一次任务，要过两关</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="30" y="68" style="fill: var(--ka-muted)">01</text>
      <text class="ka-ftitle" x="30" y="98">任务进来：只看到名字</text>
      <path d="M175 126l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="140" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="30" y="166" style="fill: var(--ka-cyan)">02</text>
      <text class="ka-ftitle" x="30" y="196">第一关：认出该用它</text>
      <path d="M175 224l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="238" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="30" y="264" style="fill: var(--ka-muted)">03</text>
      <text class="ka-ftitle" x="30" y="294">打开正文：流程才进来</text>
      <path d="M175 322l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="336" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="30" y="362" style="fill: var(--ka-green)">04</text>
      <text class="ka-ftitle" x="30" y="392">第二关：照着做完</text>
      <text class="ka-fsmall" x="180" y="444" text-anchor="middle">认不出，就一次都不会调用</text>
      <rect class="ka-fblock" x="14" y="458" width="332" height="76" rx="10"/>
      <text class="ka-fsay" x="30" y="488">最强一组总分 0.613</text>
      <text class="ka-ftext" x="30" y="516">没过第一关，后面的分不算</text>
    </svg>
    <div class="ka-fcap">图注：两道关串在一起，但打分只在第一关之后才开始——所以第一关的漏，看起来最像「不会做」。</div>
  </div>
  <div class="ka-art-note">
    <p>Skill 装上，模型不会自动照着做：它先只看到名字、一行描述和文件路径，要自己判断现在用不用得上，才去打开正文。所以一次任务里有两道关——认出来、照着做。</p>
    <p>研究把两件事分开打分，并规定只有触发之后执行才计分。最强一组总分 0.613；没过第一关的跑法，连被评判做得对不对的资格都没有。</p>
  </div>
  <h2 class="ka-art-h2">02 库越大，越认不出</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 库里塞进 N 个技能</div>
    <svg class="fig-w" viewBox="0 0 640 392" role="img" aria-label="库规模从 1 个涨到 10 个时选中率跌幅最大，之后 20 个、30 个几乎持平；掉下去的是「一个都没调用」，不是「选错了」">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">同一道题，库里塞 N 个技能</text>
      <path d="M60 252h540" stroke="var(--ka-line-strong)" stroke-width="1"/>
      <rect x="100" y="62" width="76" height="190" rx="6" fill="var(--ka-cyan)" opacity="0.75"/>
      <rect x="240" y="152" width="76" height="100" rx="6" fill="var(--ka-amber)" opacity="0.55"/>
      <rect x="380" y="157" width="76" height="95" rx="6" fill="var(--ka-amber)" opacity="0.45"/>
      <rect x="520" y="160" width="76" height="92" rx="6" fill="var(--ka-amber)" opacity="0.4"/>
      <text class="ka-ftext" x="138" y="274" text-anchor="middle">1 个</text>
      <text class="ka-ftext" x="278" y="274" text-anchor="middle">10 个</text>
      <text class="ka-ftext" x="418" y="274" text-anchor="middle">20 个</text>
      <text class="ka-ftext" x="558" y="274" text-anchor="middle">30 个</text>
      <text class="ka-fsmall" x="286" y="132" text-anchor="middle">最大跌幅在这两步之间</text>
      <text class="ka-fsmall" x="498" y="140" text-anchor="middle">之后几乎不再降</text>
      <rect class="ka-fblock" x="16" y="292" width="608" height="80" rx="10"/>
      <text class="ka-fsay" x="36" y="324">掉的是「一个都没用」，不是「用错了」</text>
      <text class="ka-ftext" x="36" y="354">真调错的一直停在几个百分点，且集中在描述重叠的技能对上</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 512" role="img" aria-label="库规模从 1 个涨到 10 个时选中率跌幅最大，之后 20 个、30 个几乎持平；掉下去的是「一个都没调用」，不是「选错了」">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">同一道题，库里塞 N 个技能</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="76" rx="9"/>
      <text class="ka-ftext" x="32" y="68">1 个技能</text>
      <rect x="32" y="80" width="280" height="8" rx="4" fill="var(--ka-cyan)" opacity="0.8"/>
      <text class="ka-fsmall" x="32" y="108">基本都能选中</text>
      <rect class="ka-fblock" x="14" y="130" width="332" height="76" rx="9"/>
      <text class="ka-ftext" x="32" y="156">10 个技能</text>
      <rect x="32" y="168" width="150" height="8" rx="4" fill="var(--ka-amber)" opacity="0.7"/>
      <text class="ka-fsmall" x="32" y="196">最大跌幅在这一段</text>
      <rect class="ka-fblock" x="14" y="218" width="332" height="76" rx="9"/>
      <text class="ka-ftext" x="32" y="244">20 个技能</text>
      <rect x="32" y="256" width="142" height="8" rx="4" fill="var(--ka-amber)" opacity="0.6"/>
      <text class="ka-fsmall" x="32" y="284">几乎不再降</text>
      <rect class="ka-fblock" x="14" y="306" width="332" height="76" rx="9"/>
      <text class="ka-ftext" x="32" y="332">30 个技能</text>
      <rect x="32" y="344" width="140" height="8" rx="4" fill="var(--ka-amber)" opacity="0.55"/>
      <text class="ka-fsmall" x="32" y="372">差不多持平</text>
      <rect class="ka-fblock" x="14" y="402" width="332" height="88" rx="10"/>
      <text class="ka-fsay" x="30" y="436">掉的是「一个都没用」</text>
      <text class="ka-ftext" x="30" y="466">不是「用错了」——真调错只有几个百分点</text>
    </svg>
    <div class="ka-fcap">图注：柱高为趋势示意——论文报的是各档排序与最大跌幅位置，未给逐点数值。</div>
  </div>
  <div class="ka-art-note">
    <p>技能变多，直觉是更容易选错。实测相反：从 1 个涨到 10 个跌幅最大，之后几乎不再掉；掉下来的部分几乎全是「一个都没调」，真调错的始终停在几个百分点。</p>
    <p>这不是挑花眼，是想不起来：前者靠排序，后者只能靠描述之间的区分度。</p>
  </div>
  <h2 class="ka-art-h2">03 前置只救一关</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 把正文提前塞进去</div>
    <svg class="fig-w" viewBox="0 0 640 316" role="img" aria-label="同一任务两种给法：原生只给名字与描述时经常想不起来；全文前置后触发明显上升、总分上升，但两边都触发时执行分几乎重合">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">同一道题，两种给法</text>
      <rect x="16" y="40" width="258" height="180" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="36" y="72" style="fill: var(--ka-cyan)">原生：只给名字</text>
      <text class="ka-ftext" x="36" y="108">触发：常想不起来</text>
      <text class="ka-ftext" x="36" y="142">触发后执行：还行</text>
      <text class="ka-fsmall" x="36" y="176">正文要它自己去打开</text>
      <text class="ka-fsmall" x="36" y="200">库里越多越容易漏</text>
      <path d="M284 130h66" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M350 125l9 5-9 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect x="366" y="40" width="258" height="180" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="386" y="72" style="fill: var(--ka-green)">全文前置</text>
      <text class="ka-ftext" x="386" y="108">触发：明显上升</text>
      <text class="ka-ftext" x="386" y="142">触发后执行：还是还行</text>
      <text class="ka-fsmall" x="386" y="176">正文一上来就在眼前</text>
      <text class="ka-fsmall" x="386" y="200">改善几乎全落在触发上</text>
      <rect class="ka-fblock" x="16" y="240" width="608" height="72" rx="10"/>
      <text class="ka-fsay" x="36" y="270">看得见，决定想不想起来</text>
      <text class="ka-ftext" x="36" y="296">不决定做不做对——两边都触发时，执行分几乎重合</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 470" role="img" aria-label="同一任务两种给法：原生只给名字与描述时经常想不起来；全文前置后触发明显上升、总分上升，但两边都触发时执行分几乎重合">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">同一道题，两种给法</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="30" y="70" style="fill: var(--ka-cyan)">原生</text>
      <text class="ka-ftitle" x="30" y="102">只给名字与一行描述</text>
      <text class="ka-ftext" x="30" y="134">触发：常想不起来</text>
      <path d="M175 168l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="182" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="30" y="210" style="fill: var(--ka-green)">前置</text>
      <text class="ka-ftitle" x="30" y="242">整份正文塞进上下文</text>
      <text class="ka-ftext" x="30" y="274">触发：明显上升</text>
      <text class="ka-fsmall" x="180" y="330" text-anchor="middle">两边都触发时，执行分几乎重合</text>
      <rect class="ka-fblock" x="14" y="350" width="332" height="88" rx="10"/>
      <text class="ka-fsay" x="30" y="384">看得见，决定想不想起来</text>
      <text class="ka-ftext" x="30" y="414">不决定做不做对</text>
    </svg>
    <div class="ka-fcap">图注：改的只是「怎么给」，不是「怎么用」——所以涨的和不涨的分得很干净。</div>
  </div>
  <div class="ka-art-note">
    <p>最直接的验证是改一个变量：把整份正文塞进上下文，不让模型自己找。触发率明显上升，总分跟着涨；但只挑「两边都触发」的轨迹比，执行分几乎重合。</p>
    <p>看得见只解决想不想起来，不解决做不做对。这也是换个 harness 排名就变的原因——触发属于模型加环境。</p>
  </div>
  <h2 class="ka-art-h2">04 错的那几个长什么样</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 4 · 两份 Skill，两种关系</div>
    <svg class="fig-w" viewBox="0 0 640 354" role="img" aria-label="描述都写「写代码前的规范」的两份 Skill 会抢同一批任务、谁先被想起就用谁；把输入输出写死的描述不跟别人重叠，该用的时候才被想起">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">两份 Skill，两种关系</text>
      <rect x="16" y="40" width="290" height="200" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="34" y="68">描述都写「写代码前的规范」</text>
      <rect class="ka-fblock" x="34" y="80" width="120" height="48" rx="8"/>
      <text class="ka-ftext" x="46" y="110">测试驱动开发</text>
      <rect class="ka-fblock" x="166" y="80" width="120" height="48" rx="8"/>
      <text class="ka-ftext" x="178" y="110">软件架构</text>
      <path d="M160 130v14" stroke="var(--ka-rose)" stroke-width="2" opacity="0.6"/>
      <path d="M155 144l5 9 5-9z" fill="var(--ka-rose)" opacity="0.6"/>
      <text class="ka-ftext" x="34" y="186">同一批任务，谁先被想起就用谁</text>
      <text class="ka-fsmall" x="34" y="214">错选就挤在这里</text>
      <rect x="334" y="40" width="290" height="200" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="352" y="68">描述把输入输出写死</text>
      <rect class="ka-fblock" x="352" y="80" width="254" height="48" rx="8"/>
      <text class="ka-ftext" x="364" y="110">导出为 CSV：给表格，出文件</text>
      <path d="M479 130v14" stroke="var(--ka-green)" stroke-width="2" opacity="0.6"/>
      <path d="M474 144l5 9 5-9z" fill="var(--ka-green)" opacity="0.6"/>
      <text class="ka-ftext" x="352" y="186">和谁都不重叠，不用抢</text>
      <text class="ka-fsmall" x="352" y="214">该用的时候才被想起</text>
      <rect class="ka-fblock" x="16" y="258" width="608" height="76" rx="10"/>
      <text class="ka-fsay" x="36" y="288">认错的少数，都挤在描述重叠的地方</text>
      <text class="ka-ftext" x="36" y="316">它只占几个百分点，但完全可以避免</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 466" role="img" aria-label="描述都写「写代码前的规范」的两份 Skill 会抢同一批任务、谁先被想起就用谁；把输入输出写死的描述不跟别人重叠，该用的时候才被想起">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">两份 Skill，两种关系</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="30" y="70" style="fill: var(--ka-rose)">重叠</text>
      <text class="ka-ftitle" x="30" y="102">都写「写代码前的规范」</text>
      <text class="ka-ftext" x="30" y="134">测试驱动开发 / 软件架构 抢任务</text>
      <path d="M175 168l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="182" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="30" y="210" style="fill: var(--ka-green)">清晰</text>
      <text class="ka-ftitle" x="30" y="242">输入输出写死在描述里</text>
      <text class="ka-ftext" x="30" y="274">和谁都不重叠，不用抢</text>
      <text class="ka-fsmall" x="180" y="326" text-anchor="middle">错选只占几个百分点</text>
      <rect class="ka-fblock" x="14" y="346" width="332" height="88" rx="10"/>
      <text class="ka-fsay" x="30" y="380">错选都挤在描述重叠处</text>
      <text class="ka-ftext" x="30" y="410">它不多，但完全可以避免</text>
    </svg>
    <div class="ka-fcap">图注：同一批任务被两份描述同时覆盖时，先被想起的那份就赢了——跟哪份更对无关。</div>
  </div>
  <div class="ka-art-note">
    <p>真正选错的少数几乎都一个样：两份描述在说同一件事。都写「写代码前的规范」，一份讲测试先行、一份讲分层，任务一来谁先被想起就用谁。</p>
    <p>把输入输出写死的描述不跟别人抢——「给表格，出文件」。想让它在该用的时候被想起，先让它在不该用的时候不像别人。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://arxiv.org/abs/2608.04828" target="_blank" rel="noopener">Skill-Use: Can LLMs Actually Use Skills in Agentic Harnesses?（arXiv 2608.04828）</a>。79 个真实技能 × 177 个可执行任务 × 9 个域、8 个模型 × 2 个落架（harness）；0.613、0.972 与库规模、前置两组对照均据正文与 Table 1。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/skill-runtime/" data-no-popover="true"><div class="kn">下一篇 →</div><div class="kt">Skill 是怎么跑起来的</div></a>
  </nav>
</div>
