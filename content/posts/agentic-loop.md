---
title: 一张动图看懂 Agent 的真实运行机制
publish: true
date: 2026-11-18
description: 从 Agentic Loop 的循环结构出发，拆清 LLM 与运行时的分工、回灌通道为什么是关键，以及画图时最容易出错的三个地方。
tags:
  - Agent
  - 智能体
  - 图解
---

<div class="post-view">
<h1>一张动图看懂 Agent 的真实运行机制</h1>
<div class="post-meta"><a href="../learn/d3/" data-no-popover="true">D3-01 智能体架构与执行循环</a><span>图文判断卡</span></div>
<div class="post-question"><span class="plabel">问题</span><p>Agent 到底怎么跑起来的？LLM 和运行时各管哪一段，为什么说「回灌」才是它能自我纠错的关键？</p></div>
<div class="post-conclusion"><span class="plabel">结论</span><p>Agent 不是一条走完就结束的流水线，而是一个可以转很多圈的 <strong>Agentic Loop</strong>：<em>LLM 每轮读上下文做决策，运行时按决策调工具，工具结果连报错一起回灌成下一轮输入</em>。转几圈不写死，由 LLM 每轮自己判断；所谓「自我纠错」，本质就是这条回灌通道。</p></div>
<figure class="post-figure"><img src="agentic-loop.gif" alt="Agentic Loop 运行机制动图"><figcaption>一圈四个动作：LLM 决策 → 运行时执行 → 结果回灌 → 回到起点，直到 LLM 判断可以作答</figcaption></figure>
<div class="post-section"><h2>一圈的四个动作</h2><p>一个问题进入循环体。LLM 读一遍上下文做判断，运行时按判断调工具，工具结果拼回上下文，回到起点。哪一轮 LLM 觉得能答了，就输出结果、退出循环。</p><p>先放下一个常见印象：它不是流水线。不是「调工具、总结、输出」走一遍就结束，而是一圈可以转很多次的环；转几圈由 LLM 每轮自己判断。</p></div>
<div class="post-section"><h2>决策与执行：LLM 和运行时怎么分工</h2><p><b>决策基本只有 LLM 在干活。</b>它读三样东西——对话历史、记忆、这一轮可用的工具与 Skill 清单，每项都带名字、描述和参数格式。读完只有两种输出：给一个 tool_call（工具名加一整套参数），或不调工具、直接回答。有个细节容易被忽略：<em>参数是 LLM 现场写的，不是运行时拼好的</em>。它写不出参数，往往说明信息已经够了，这时它会选直接回答——「能不能写出参数」本身就是隐形停止信号。</p><p><b>运行时只管跑腿。</b>拿到 tool_call 后做四件事：路由、鉴权、超时重试、把请求送到真正的系统；但用什么工具、参数是什么，都不归它管。这个分工画反，整张图的因果关系就错了。跑腿有两条路：走 MCP 的 tools/call 到 MCP Server 再到底层工具，或加载 Skill 执行里面的指令和脚本；一个 tool_call 也可能并发多个请求，等全部回来再往下走。</p></div>
<div class="post-section"><h2>回灌：循环能转起来的原因</h2><p>工具返回的东西，包括报错，会当成一条新消息加进上下文，成为下一轮 LLM 的输入。这是整个机制里最关键的一环：正因为能看见自己上一步干砸了，LLM 才会改参数、换工具，或承认这条路走不通。报错要是回不来，它就永远不知道自己错了，只会一遍遍发同样的调用。</p></div>
<div class="post-section"><h2>边界：画图最容易出错的三处</h2><p><b>把能力来源画成串行链路。</b>Skills、MCP Server、真实系统三块是并列的，不是「先 Skill、再 MCP、再系统」往下传。它们各自是独立入口：LLM 可以只用 Skill 不碰 MCP，也可以直接调 MCP，或都不用、凭自己的知识答。</p><p><b>把选工具的责任安在框架头上。</b>不少图把「工具调度器」画成决策节点，好像框架在挑工具。其实框架只给清单、给通路，挑哪个发生在 LLM 内部。</p><p><b>只画成功路径。</b>报错是正常路径的一部分，而且是循环里最高频的信息来源之一；图里只有「工具成功返回」，看的人会误以为报错是意外。</p></div>
<div class="post-section"><h2>停止：什么时候算跑完</h2><p>三种收尾：LLM 输出答案；到轮次上限被强行掐断；被外部中断。第一种是正常收尾，后两种都不算。所以一个 Agent 产品做得好不好，很大程度看它有多大比例能走到第一种就停下；经常撞上限，问题多半不在模型，而在工具描述写得含糊，让它反复试错。</p></div>
</div>
