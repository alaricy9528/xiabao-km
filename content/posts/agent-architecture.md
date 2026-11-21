---
title: Agent 架构：模块再多，圈只有一个
publish: true
date: 2026-11-21
description: 一张流传很广的 Agent 架构图，模块方向都对，但把循环画错了因果、把协议当成了步骤。修正后的骨架只有五样：大脑、循环、手脚、旁路、刹车。
tags:
  - Agent
  - 智能体
  - 图解
---

<div class="post-view">
<h1>Agent 架构：模块再多，圈只有一个</h1>
<div class="post-meta"><a href="../learn/d3/" data-no-popover="true">D3-01 智能体架构与执行循环</a><span>图文判断卡</span></div>
<div class="post-question"><span class="plabel">问题</span><p>一张被转发很多的「AI Agent 完整架构」图，六个模块、方向都对，为什么照着搭还是跑不起来？</p></div>
<div class="post-conclusion"><span class="plabel">结论</span><p>因为它把环和旁路压成了流水线。<em>Agent 只有一个圈：想清楚、动手、把结果读回来、判断成没成</em>；记忆、工具、协议挂在圈外，刹车独立兜底。</p></div>
<figure class="post-figure"><img src="agent-architecture.jpg" alt="AI Agent 架构：目标、规划、核心循环、记忆、工具、刹车"><figcaption>一圈三步加一个判定：思考 → 行动 → 观察 → 反思。记忆是旁路，工具是手脚，刹车在圈外兜底</figcaption></figure>
<div class="post-section"><h2>结构</h2><div class="post-key">六个模块摆成一条线，读起来顺，但它是错的</div><p>真实的主链只有一条：目标进来，拆成清单，进循环。记忆在左、工具在右，都是圈外旁路，不是流程里的一站。排进主链，因果就反了——反思要基于观察，观察要基于工具真的跑完。</p></div>
<div class="post-section"><h2>观察</h2><div class="post-key">最容易被漏掉的，是「把结果读回来」</div><p>工具跑完不写回上下文，下一步就没有依据，反思也无从谈起——圈在空转。成没成，也是在这一步之后判断：成了出圈，没成回思考，报错就换个工具重试。</p></div>
<div class="post-section"><h2>角色</h2><div class="post-key">思考、行动、观察、反思，是同一个模型在换角色</div><p>真正要搭的只有两样：把上下文喂进去，把工具接进来。以为要搭四套系统，是最常见的误解，也是最贵的误解。</p></div>
<div class="post-section"><h2>记忆</h2><div class="post-key">每轮要做的是取出相关那段，不是想象一段上下文</div>
<div class="post-list"><div class="post-li"><b>长期记忆</b><span>存在外部，跨会话保留偏好与事实</span></div><div class="post-li"><b>上下文窗口</b><span>这一轮能看到的全部，有上限，满了挤掉旧的</span></div><div class="post-li"><b>工作记忆</b><span>已完成的步骤与结论，就躺在上下文里</span></div></div>
<p>窗口有限，所以必须挑、必须压。这才是上下文工程真正要解决的问题。</p></div>
<div class="post-section"><h2>工具</h2><div class="post-key">读可以自动跑，写必须卡授权</div><p>搜索、读文件不改外部状态，可以放手；发邮件、改数据、下单这类真动外部系统的，得停在授权上。多数产品把工具画成一个框，落地时最容易在这里出事。</p><p>MCP 不是第五个步骤，也不是工具清单。它是「外部系统怎么被统一接进来」的插头规格：<em>只管接，自己不干活</em>。</p></div>
<div class="post-section"><h2>刹车</h2><div class="post-key">少了一样东西，它会一直转到钱烧完</div>
<div class="post-chips"><span>目标达成</span><span>步数到顶</span><span>预算烧完</span><span>超时</span><span>人工确认</span></div>
<p>至少要有一样。这是 Agent 落地最关键的设计，也是最常整块漏掉的。</p></div>
<div class="post-section"><h2>边界</h2><div class="post-key">这套骨架不是唯一答案，三处都可以改</div>
<div class="post-list"><div class="post-li"><b>规划可以省</b><span>简单任务边想边做，ReAct 本身就是隐式规划</span></div><div class="post-li"><b>反思可以外挂</b><span>同模型自评、独立评审模型、规则校验都行</span></div><div class="post-li"><b>MCP 可选</b><span>直接函数调用一样能接，它解决的是多系统统一接入</span></div></div></div>
<div class="post-verdict"><div><b>看得准</b><span>观察和反思的质量，决定能否自纠</span></div><div><b>停得早</b><span>停止条件的设计，决定是否可控</span></div></div>
<p class="post-tail">判断一个 Agent 好不好，不用数它列了多少模块。</p>
</div>
