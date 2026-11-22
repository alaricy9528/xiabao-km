---
title: Skill 是怎么跑起来的
publish: true
description: Skill 的运行原理：它是一个磁盘上的目录，模型不预先读完，而是按 L1/L2/L3 三档边做边翻，用到哪页读哪页。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · Skills 与能力封装</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-22</span>
    </div>
    <h1>Skill 是怎么跑起来的</h1>
    <p class="ka-art-lede">一个 Skill 就是装着说明书的文件夹。模型开工前不会读完它，而是用到哪页翻哪页。这条机制决定了它花多少 token，也决定了它能干什么。</p>
  </div>
  <h2 class="ka-art-h2">01 它的形状</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 一个 Skill 就是一个目录</div>
    <svg class="fig-w" viewBox="0 0 640 356" role="img" aria-label="Skill 目录结构：SKILL.md 含 frontmatter 与正文，另带 scripts、references、assets，按 L1 L2 L3 三档加载">
      <rect x="16" y="16" width="340" height="284" rx="12" fill="none" stroke="var(--ka-line-strong)" stroke-dasharray="5 4"/>
      <text class="ka-fsay" x="34" y="46">my-skill/</text>
      <text class="ka-fsmall" x="34" y="66">一个目录，四件东西</text>
      <rect class="ka-fblock" x="34" y="80" width="304" height="120" rx="9"/>
      <text class="ka-fnum" x="50" y="106" style="fill: var(--ka-cyan)">SKILL.md</text>
      <text class="ka-fsmall" x="50" y="130">① frontmatter：name + description</text>
      <text class="ka-ftext" x="50" y="158">② 正文：怎么做事、什么时候别用</text>
      <text class="ka-ftext" x="50" y="182">③ 指向别的文件：填表见 forms.md</text>
      <rect class="ka-fblock" x="34" y="212" width="96" height="72" rx="9"/>
      <text class="ka-fnum" x="50" y="238">scripts/</text>
      <text class="ka-ftext" x="50" y="262">跑，不读</text>
      <rect class="ka-fblock" x="138" y="212" width="108" height="72" rx="9"/>
      <text class="ka-fnum" x="154" y="238">references/</text>
      <text class="ka-ftext" x="154" y="262">用到才读</text>
      <rect class="ka-fblock" x="254" y="212" width="84" height="72" rx="9"/>
      <text class="ka-fnum" x="270" y="238">assets/</text>
      <text class="ka-ftext" x="270" y="262">模板素材</text>
      <rect class="ka-fblock" x="372" y="16" width="252" height="88" rx="9"/>
      <text class="ka-fnum" x="390" y="42" style="fill: var(--ka-amber)">L1 · 启动时</text>
      <text class="ka-ftext" x="390" y="66">每个 Skill 只把 name 与</text>
      <text class="ka-ftext" x="390" y="86">description 塞进系统提示</text>
      <rect class="ka-fblock" x="372" y="114" width="252" height="88" rx="9"/>
      <text class="ka-fnum" x="390" y="140" style="fill: var(--ka-cyan)">L2 · 命中后</text>
      <text class="ka-ftext" x="390" y="164">请求对上描述，才用 bash</text>
      <text class="ka-ftext" x="390" y="184">读 SKILL.md 正文</text>
      <rect class="ka-fblock" x="372" y="212" width="252" height="88" rx="9"/>
      <text class="ka-fnum" x="390" y="238" style="fill: var(--ka-green)">L3 · 用到时</text>
      <text class="ka-ftext" x="390" y="262">正文提到哪个文件才读哪个，</text>
      <text class="ka-ftext" x="390" y="282">脚本直接执行</text>
      <text class="ka-fsay" x="320" y="334" text-anchor="middle">没被读到的文件，占 0 个 token</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 684" role="img" aria-label="Skill 目录结构：SKILL.md 含 frontmatter 与正文，另带 scripts 与 references 等附属文件，按 L1 L2 L3 三档加载">
      <rect x="14" y="14" width="332" height="306" rx="12" fill="none" stroke="var(--ka-line-strong)" stroke-dasharray="5 4"/>
      <text class="ka-fsay" x="32" y="44">my-skill/</text>
      <text class="ka-fsmall" x="32" y="64">一个目录，四件东西</text>
      <rect class="ka-fblock" x="32" y="78" width="296" height="124" rx="9"/>
      <text class="ka-fnum" x="48" y="104" style="fill: var(--ka-cyan)">SKILL.md</text>
      <text class="ka-fsmall" x="48" y="128">① frontmatter：name + description</text>
      <text class="ka-ftext" x="48" y="154">② 正文：怎么做事、何时别用</text>
      <text class="ka-ftext" x="48" y="178">③ 指向别的文件：填表见 forms.md</text>
      <rect class="ka-fblock" x="32" y="212" width="296" height="96" rx="9"/>
      <text class="ka-fnum" x="48" y="238">scripts/ · references/ · assets/</text>
      <text class="ka-ftext" x="48" y="266">脚本跑起来、参考按需读、素材拿来用</text>
      <text class="ka-ftext" x="48" y="290">都在同一个目录里，用相对路径引用</text>
      <rect class="ka-fblock" x="14" y="336" width="332" height="84" rx="9"/>
      <text class="ka-fnum" x="32" y="362" style="fill: var(--ka-amber)">L1 · 启动时</text>
      <text class="ka-ftext" x="32" y="386">每个 Skill 只把 name 与 description</text>
      <text class="ka-ftext" x="32" y="408">塞进系统提示，约 100 token</text>
      <rect class="ka-fblock" x="14" y="428" width="332" height="84" rx="9"/>
      <text class="ka-fnum" x="32" y="454" style="fill: var(--ka-cyan)">L2 · 命中后</text>
      <text class="ka-ftext" x="32" y="478">请求对上描述，才用 bash 读正文</text>
      <text class="ka-ftext" x="32" y="500">一份 SKILL.md 通常不超过 5k</text>
      <rect class="ka-fblock" x="14" y="520" width="332" height="84" rx="9"/>
      <text class="ka-fnum" x="32" y="546" style="fill: var(--ka-green)">L3 · 用到时</text>
      <text class="ka-ftext" x="32" y="570">正文提到哪个文件才读哪个，</text>
      <text class="ka-ftext" x="32" y="592">脚本直接执行</text>
      <text class="ka-fsay" x="180" y="638" text-anchor="middle">没被读到的文件，占 0 个 token</text>
      <text class="ka-fsmall" x="180" y="662" text-anchor="middle">所以一个 Skill 可以带上几十份参考资料</text>
    </svg>
    <div class="ka-fcap">图注：虚线框是磁盘上真实的目录，后面三档是加载时机——只有被读到的部分才进上下文。</div>
  </div>
  <div class="ka-art-note">
    <p>Skill 不是一段长提示词，是磁盘上的一个目录：里面必有一份 <code>SKILL.md</code>（YAML 头只有 name 和 description，正文写怎么做、什么情况下别用），旁边是脚本、参考文档和素材。模型访问它的方式也不是 API 调用，而是用 bash 打开文件——跟人在命令行 <code>cat</code> 一份文档没区别。</p>
  </div>
  <h2 class="ka-art-h2">02 一次触发怎么走</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 从一句话到一个结果</div>
    <svg class="fig-w" viewBox="0 0 640 268" role="img" aria-label="一次 Skill 触发的五个动作：启动载入元数据、请求命中描述、读 SKILL.md、按需读附件、执行脚本">
      <rect class="ka-fblock" x="7" y="26" width="114" height="160" rx="9"/>
      <text class="ka-fnum" x="23" y="54" style="fill: var(--ka-amber)">01</text>
      <text class="ka-ftitle" x="23" y="90">启动</text>
      <text class="ka-ftext" x="23" y="122">只有 name 与</text>
      <text class="ka-ftext" x="23" y="144">description</text>
      <text class="ka-ftext" x="23" y="166">进系统提示</text>
      <path d="M126 106h10" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M132 101l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="135" y="26" width="114" height="160" rx="9"/>
      <text class="ka-fnum" x="151" y="54" style="fill: var(--ka-amber)">02</text>
      <text class="ka-ftitle" x="151" y="90">命中</text>
      <text class="ka-ftext" x="151" y="122">请求跟</text>
      <text class="ka-ftext" x="151" y="144">description</text>
      <text class="ka-ftext" x="151" y="166">对上了</text>
      <path d="M254 106h10" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M260 101l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="263" y="26" width="114" height="160" rx="9"/>
      <text class="ka-fnum" x="279" y="54" style="fill: var(--ka-cyan)">03</text>
      <text class="ka-ftitle" x="279" y="90">读正文</text>
      <text class="ka-ftext" x="279" y="122">bash 打开</text>
      <text class="ka-ftext" x="279" y="144">SKILL.md</text>
      <text class="ka-ftext" x="279" y="166">全文进上下文</text>
      <path d="M382 106h10" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M388 101l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="391" y="26" width="114" height="160" rx="9"/>
      <text class="ka-fnum" x="407" y="54" style="fill: var(--ka-green)">04</text>
      <text class="ka-ftitle" x="407" y="90">读附件</text>
      <text class="ka-ftext" x="407" y="122">正文提到</text>
      <text class="ka-ftext" x="407" y="144">forms.md</text>
      <text class="ka-ftext" x="407" y="166">才去读它</text>
      <path d="M510 106h10" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M516 101l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="519" y="26" width="114" height="160" rx="9"/>
      <text class="ka-fnum" x="535" y="54" style="fill: var(--ka-green)">05</text>
      <text class="ka-ftitle" x="535" y="90">跑脚本</text>
      <text class="ka-ftext" x="535" y="122">只回 stdout</text>
      <text class="ka-ftext" x="535" y="144">代码本身</text>
      <text class="ka-ftext" x="535" y="166">不进上下文</text>
      <text class="ka-fsay" x="320" y="222" text-anchor="middle">边做边翻，不是先读完再开工</text>
      <text class="ka-fsmall" x="320" y="248" text-anchor="middle">脚本跑完只把输出（如 Validation passed）放进上下文</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 632" role="img" aria-label="一次 Skill 触发的五个动作：启动载入元数据、请求命中描述、读 SKILL.md、按需读附件、执行脚本">
      <rect class="ka-fblock" x="14" y="14" width="332" height="96" rx="9"/>
      <text class="ka-fnum" x="32" y="42" style="fill: var(--ka-amber)">01</text>
      <text class="ka-ftitle" x="32" y="72">启动：只有元数据</text>
      <text class="ka-ftext" x="32" y="96">name + description 进系统提示</text>
      <path d="M175 110l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="124" width="332" height="96" rx="9"/>
      <text class="ka-fnum" x="32" y="152" style="fill: var(--ka-amber)">02</text>
      <text class="ka-ftitle" x="32" y="182">命中：请求对上描述</text>
      <text class="ka-ftext" x="32" y="206">对不上的 Skill 一个 token 都不花</text>
      <path d="M175 220l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="234" width="332" height="96" rx="9"/>
      <text class="ka-fnum" x="32" y="262" style="fill: var(--ka-cyan)">03</text>
      <text class="ka-ftitle" x="32" y="292">读正文：bash 打开</text>
      <text class="ka-ftext" x="32" y="316">SKILL.md 全文这才进上下文</text>
      <path d="M175 330l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="344" width="332" height="96" rx="9"/>
      <text class="ka-fnum" x="32" y="372" style="fill: var(--ka-green)">04</text>
      <text class="ka-ftitle" x="32" y="402">读附件：提到才读</text>
      <text class="ka-ftext" x="32" y="426">没提到的 forms.md 还躺在磁盘上</text>
      <path d="M175 440l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="454" width="332" height="96" rx="9"/>
      <text class="ka-fnum" x="32" y="482" style="fill: var(--ka-green)">05</text>
      <text class="ka-ftitle" x="32" y="512">跑脚本：只取输出</text>
      <text class="ka-ftext" x="32" y="536">代码不进上下文，只有结果回来</text>
      <text class="ka-fsay" x="180" y="586" text-anchor="middle">边做边翻，不是先读完再开工</text>
      <text class="ka-fsmall" x="180" y="612" text-anchor="middle">05 是它比「让模型现写代码」省的地方</text>
    </svg>
    <div class="ka-fcap">图注：依次是一次触发里发生的动作。后面的步骤能不能发生，取决于前面的请求有没有对上描述。</div>
  </div>
  <div class="ka-art-note">
    <p>启动时进上下文的只有元数据。用户说一句话，模型拿它跟每份 description 比对，觉得相关才去读正文——没有关键词匹配，也没有索引。所以 description 写得准不准，直接决定这个 Skill 会不会被想起。</p>
    <p>正文提到哪个附件，模型才去开哪个；没提到的文件躺在磁盘上，一个 token 都不花。脚本同理：bash 执行，只有返回值进上下文。</p>
  </div>
  <h2 class="ka-art-h2">03 上下文花在哪</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 三层加载的账</div>
    <svg class="fig-w" viewBox="0 0 640 316" role="img" aria-label="上下文开销对比：十个 Skill 的元数据约 1k，命中一份正文不到 5k，只读一份参考，脚本代码占 0">
      <text class="ka-ftext" x="16" y="40">装 10 个 Skill 的元数据</text>
      <rect x="220" y="24" width="50" height="20" rx="4" fill="color-mix(in srgb, var(--ka-amber) 45%, transparent)"/>
      <text class="ka-fnum" x="284" y="40" style="fill: var(--ka-amber)">~1k</text>
      <text class="ka-ftext" x="16" y="90">命中 1 个，读正文</text>
      <rect x="220" y="74" width="250" height="20" rx="4" fill="color-mix(in srgb, var(--ka-cyan) 42%, transparent)"/>
      <text class="ka-fnum" x="484" y="90" style="fill: var(--ka-cyan)">&lt; 5k</text>
      <text class="ka-ftext" x="16" y="140">只读了其中 forms.md</text>
      <rect x="220" y="124" width="100" height="20" rx="4" fill="color-mix(in srgb, var(--ka-green) 42%, transparent)"/>
      <text class="ka-fnum" x="348" y="140" style="fill: var(--ka-green)">只付这一份</text>
      <text class="ka-ftext" x="16" y="190">跑一个 200 行脚本</text>
      <rect x="220" y="174" width="3" height="20" rx="1" fill="var(--ka-line-strong)"/>
      <text class="ka-fnum" x="238" y="190" style="fill: var(--ka-muted)">0</text>
      <rect class="ka-fblock" x="16" y="214" width="608" height="84" rx="10"/>
      <text class="ka-fsay" x="36" y="244">同样一件事，交给脚本比让模型现写一遍便宜</text>
      <text class="ka-ftext" x="36" y="272">200 行校验脚本在上下文里占 0 行，只回一句 Validation passed</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 420" role="img" aria-label="上下文开销对比：十个 Skill 的元数据约 1k，命中一份正文不到 5k，只读一份参考，脚本代码占 0">
      <rect class="ka-fblock" x="14" y="14" width="332" height="64" rx="9"/>
      <text class="ka-ftext" x="32" y="40">装 10 个 Skill 的元数据</text>
      <text x="330" y="41" text-anchor="end" style="fill: var(--ka-amber);font-family: var(--ka-mono);font-size:20px;font-weight:700">~1k</text>
      <text class="ka-fsmall" x="32" y="64">每个约 100 token</text>
      <rect class="ka-fblock" x="14" y="86" width="332" height="64" rx="9"/>
      <text class="ka-ftext" x="32" y="112">命中 1 个，读正文</text>
      <text x="330" y="113" text-anchor="end" style="fill: var(--ka-cyan);font-family: var(--ka-mono);font-size:20px;font-weight:700">&lt; 5k</text>
      <text class="ka-fsmall" x="32" y="136">这一份才进上下文</text>
      <rect class="ka-fblock" x="14" y="158" width="332" height="64" rx="9"/>
      <text class="ka-ftext" x="32" y="184">只读了其中 forms.md</text>
      <text x="330" y="185" text-anchor="end" style="fill: var(--ka-green);font-family: var(--ka-mono);font-size:20px;font-weight:700">1 份</text>
      <text class="ka-fsmall" x="32" y="208">其余文件仍然是 0</text>
      <rect class="ka-fblock" x="14" y="230" width="332" height="64" rx="9"/>
      <text class="ka-ftext" x="32" y="256">跑一个 200 行脚本</text>
      <text x="330" y="257" text-anchor="end" style="fill: var(--ka-muted);font-family: var(--ka-mono);font-size:20px;font-weight:700">0</text>
      <text class="ka-fsmall" x="32" y="280">代码不进，只回一句输出</text>
      <rect class="ka-fblock" x="14" y="306" width="332" height="100" rx="10"/>
      <text class="ka-fsay" x="32" y="340">交给脚本比让模型现写便宜</text>
      <text class="ka-fsmall" x="32" y="366">200 行校验脚本占 0 行，</text>
      <text class="ka-fsmall" x="32" y="388">只回一句 Validation passed</text>
    </svg>
    <div class="ka-fcap">图注：越往后越按需。前两条是常驻与命中，第三条只付读到的那一份，最后一条是零——代码本身从不进上下文。</div>
  </div>
  <div class="ka-art-note">
    <p>所以成本不看「装了多少」，只看「这一次用了多少」：装一百个只是多几 k 元数据，一次任务可能只付一份参考。最后一行最值得注意——让模型现写 200 行校验代码，这 200 行要先进上下文、可能还要改几轮；写成脚本只回一句结果，省下的不只是 token，还有临场发挥的不稳定。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://www.anthropic.com/research/equipping-agents-for-the-real-world-with-agent-skills" target="_blank" rel="noopener">Anthropic · Equipping agents for the real world with Agent Skills</a> · <a href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview" target="_blank" rel="noopener">Claude 平台文档 · Agent Skills</a>。三层加载的 token 量级（约 100 / 5k 以内 / 按需）与「脚本代码不进上下文」均为官方文档表述。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/skill-vs-mcp/" data-no-popover="true"><div class="kn">下一篇 →</div><div class="kt">Skill 和 MCP 差在哪</div></a>
  </nav>
</div>
