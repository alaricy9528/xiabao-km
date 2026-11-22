---
title: Skill 是怎么跑起来的
publish: true
description: 从目录结构、三层加载、脚本执行讲到它和 MCP 的分工——Skill 是装在磁盘上的说明书，模型边做边翻，用到哪页读哪页。
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
    <p class="ka-art-lede">一个 Skill 就是一个装着说明书的文件夹。模型开工前不会把它读完，而是用到哪页翻哪页——这条机制决定了它花多少 token、能干什么，也决定了它跟 MCP 根本不是同一类东西。</p>
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
    <p>Skill 不是一段长提示词，是放在磁盘上的目录。目录里必有一份 <code>SKILL.md</code>：开头是 YAML 头信息，只有 name 和 description 两个字段；后面是正文，写这件事该怎么做、什么情况下别用。正文可以指向同目录下的其他文件，也可以让模型去跑 <code>scripts/</code> 里的脚本。</p>
    <p>关键在于模型访问它的方式——不是通过 API 调用，而是用 bash 打开文件，跟人在命令行里 <code>cat</code> 一份文档没区别。官方的说法是「给新同事写的入职指南」：先给他看目录，需要哪一章再翻。</p>
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
    <p>启动时进上下文的只有元数据。用户说一句话，模型拿这句话去跟每份 description 比对，觉得相关才去读正文。这一步是模型的判断，没有关键词匹配，也没有索引——所以 description 写得准不准，直接决定这个 Skill 会不会被想起。</p>
    <p>读正文之后，如果里面写着「填表见 forms.md」，模型才会再开一次文件；没提到的文件一直躺在磁盘上，一个 token 都不花。脚本同理：用 bash 执行，只有返回值进上下文，代码本身不进。</p>
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
    <p>所以 Skill 的成本不是「装了多少」，而是「这一次用了多少」。装一百个也只是多几 k 元数据；一次任务可能只付一份 reference。反过来，把整份手册直接铺进系统提示，每一轮对话都要为它付钱，而且用不上的部分也一起付。</p>
    <p>最后一行最值得注意。同样是校验一份表单：让模型现写 200 行代码，这 200 行要先生成进上下文、可能还要改几轮；写好的脚本只回一句结果，又快又稳，因为这段逻辑不再由模型临场发挥。</p>
  </div>
  <h2 class="ka-art-h2">04 和 MCP 的分界</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 4 · 两条不同的路</div>
    <svg class="fig-w" viewBox="0 0 640 356" role="img" aria-label="Skill 走本地目录，模型用 bash 打开文件；MCP 走 JSON-RPC 协议，经 host 转发到 server 再连外部系统">
      <text class="ka-fnum" x="16" y="30" style="fill: var(--ka-cyan)">SKILL · 本地目录</text>
      <rect class="ka-fblock" x="22" y="44" width="176" height="78" rx="9"/>
      <text class="ka-ftitle" x="40" y="76">用户请求</text>
      <text class="ka-ftext" x="40" y="100">跟 description 比对</text>
      <path d="M200 83h22" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M216 78l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="232" y="44" width="176" height="78" rx="9"/>
      <text class="ka-ftitle" x="250" y="76">模型</text>
      <text class="ka-ftext" x="250" y="100">用 bash 读文件</text>
      <path d="M410 83h22" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M426 78l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="442" y="44" width="176" height="78" rx="9"/>
      <text class="ka-ftitle" x="460" y="76">本地目录</text>
      <text class="ka-ftext" x="460" y="100">SKILL.md + 脚本</text>
      <text class="ka-fsmall" x="320" y="144" text-anchor="middle">不需要协议、不需要起服务、不需要账号</text>
      <text class="ka-fnum" x="16" y="184" style="fill: var(--ka-amber)">MCP · 协议接入</text>
      <rect class="ka-fblock" x="26" y="196" width="132" height="78" rx="9"/>
      <text class="ka-ftitle" x="42" y="228">模型</text>
      <text class="ka-ftext" x="42" y="252">发 tool_call</text>
      <path d="M160 235h16" stroke="var(--ka-amber)" stroke-width="2" opacity="0.55"/>
      <path d="M170 230l8 5-8 5z" fill="var(--ka-amber)" opacity="0.55"/>
      <rect class="ka-fblock" x="178" y="196" width="132" height="78" rx="9"/>
      <text class="ka-ftitle" x="194" y="228">宿主 client</text>
      <text class="ka-ftext" x="194" y="252">JSON-RPC 2.0</text>
      <path d="M312 235h16" stroke="var(--ka-amber)" stroke-width="2" opacity="0.55"/>
      <path d="M322 230l8 5-8 5z" fill="var(--ka-amber)" opacity="0.55"/>
      <rect class="ka-fblock" x="330" y="196" width="132" height="78" rx="9"/>
      <text class="ka-ftitle" x="346" y="228">MCP server</text>
      <text class="ka-ftext" x="346" y="252">执行 tools/call</text>
      <path d="M464 235h16" stroke="var(--ka-amber)" stroke-width="2" opacity="0.55"/>
      <path d="M474 230l8 5-8 5z" fill="var(--ka-amber)" opacity="0.55"/>
      <rect class="ka-fblock" x="482" y="196" width="132" height="78" rx="9"/>
      <text class="ka-ftitle" x="498" y="228">外部系统</text>
      <text class="ka-ftext" x="498" y="252">数据库 / SaaS</text>
      <text class="ka-fsmall" x="320" y="296" text-anchor="middle">要先握手协商版本与能力，走授权，能跨应用复用</text>
      <text class="ka-fsay" x="320" y="334" text-anchor="middle">一条给能力，一条给做法——能叠着用</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 772" role="img" aria-label="Skill 走本地目录，模型用 bash 打开文件；MCP 走 JSON-RPC 协议，经 host 转发到 server 再连外部系统">
      <text class="ka-fnum" x="14" y="32" style="fill: var(--ka-cyan)">SKILL · 本地目录</text>
      <rect class="ka-fblock" x="14" y="44" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="74">用户请求</text>
      <text class="ka-ftext" x="32" y="100">模型拿它跟每份 description 比对</text>
      <path d="M175 120l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="130" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="160">模型用 bash 读文件</text>
      <text class="ka-ftext" x="32" y="186">像人在终端里 cat 一份文档</text>
      <path d="M175 206l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="216" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="246">本地目录</text>
      <text class="ka-ftext" x="32" y="272">SKILL.md、参考文档、脚本、素材</text>
      <text class="ka-fsmall" x="180" y="310" text-anchor="middle">不需要协议、不需要起服务、不需要账号</text>
      <text class="ka-fnum" x="14" y="352" style="fill: var(--ka-amber)">MCP · 协议接入</text>
      <rect class="ka-fblock" x="14" y="364" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="394">模型</text>
      <text class="ka-ftext" x="32" y="420">看到工具清单，发一个 tool_call</text>
      <path d="M175 440l5 8 5-8z" fill="var(--ka-amber)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="450" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="480">宿主里的 client</text>
      <text class="ka-ftext" x="32" y="506">把调用包成 JSON-RPC 2.0 发出去</text>
      <path d="M175 526l5 8 5-8z" fill="var(--ka-amber)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="536" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="566">MCP server</text>
      <text class="ka-ftext" x="32" y="592">执行 tools/call，做真实的动作</text>
      <path d="M175 612l5 8 5-8z" fill="var(--ka-amber)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="622" width="332" height="70" rx="9"/>
      <text class="ka-ftitle" x="32" y="652">外部系统</text>
      <text class="ka-ftext" x="32" y="678">数据库、SaaS、内部接口</text>
      <text class="ka-fsmall" x="180" y="716" text-anchor="middle">先握手协商版本与能力，走授权，能跨应用复用</text>
      <text class="ka-fsay" x="180" y="756" text-anchor="middle">一条给能力，一条给做法</text>
    </svg>
    <div class="ka-fcap">图注：上排是 Skill 的路径，下排是 MCP 的路径。下排多了一层协议和授权，也多了一个要长期运行的 server。</div>
  </div>
  <div class="ka-art-note">
    <p>两个词常被摆在一起比，其实解的不是同一个问题。MCP 是一条协议：宿主里的 client 与服务端握手，协商版本和能力，把外部的工具、数据、提示暴露出来；模型发一个 <code>tool_call</code>，client 转发给 server 执行，结果回来。要起服务、要授权、要处理断连——换来的是能碰到真实系统。</p>
    <p>Skill 没有协议这一层，就是一个目录，模型用 bash 打开它。它不新增任何能力，只改变模型做事的顺序和判断标准：先查什么、什么情况下别硬上、输出该长什么样。同一份能力，配一份好 Skill 和没有，表现差得很远。</p>
    <p>官方的类比是厨房：MCP 提供厨房——灶台、食材、设备；Skill 提供菜谱。有厨房没菜谱，设备摆着不知道怎么用；有菜谱没厨房，步骤写得再细也做不出来。实际项目里两者叠着用的最多：Skill 正文里直接写「用那个工具的第几个方法取数」，MCP 负责把那个方法送到模型手上。</p>
    <p>一句话记住分界：<em>Skill 管怎么做，MCP 管能碰到什么</em>。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://www.anthropic.com/research/equipping-agents-for-the-real-world-with-agent-skills" target="_blank" rel="noopener">Anthropic · Equipping agents for the real world with Agent Skills</a> · <a href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview" target="_blank" rel="noopener">Claude 平台文档 · Agent Skills</a> · <a href="https://modelcontextprotocol.io/docs/learn/architecture" target="_blank" rel="noopener">MCP 规范 · Architecture overview</a>。三层加载的 token 量级（约 100 / 5k 以内 / 按需）与「脚本代码不进上下文」均为官方文档表述。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/" data-no-popover="true"><div class="kn">回到总览 →</div><div class="kt">知识星图</div></a>
  </nav>
</div>
