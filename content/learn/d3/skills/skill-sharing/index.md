---
title: 一个 Skill 怎么装到别人的 Agent 里
publish: true
description: Skill 没有安装包——文件夹即技能：整个文件夹放进宿主扫描的目录就算装上；三条分发路殊途同归，陌生仓库带来的 Skill 要过信任检查才会加载。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · Skills 与能力封装</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-27</span>
    </div>
    <h1>一个 Skill 怎么装到别人的 Agent 里</h1>
    <p class="ka-art-lede">Skill 是装在磁盘上的说明书，没有安装包，也不进应用商店。共享它只需要把一个文件夹交出去；真正要紧的是最后一步——装进来之前，信不信它。</p>
  </div>
  <h2 class="ka-art-h2">01 文件夹就是安装包</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 自包含文件夹与宿主目录</div>
    <svg class="fig-w" viewBox="0 0 640 316" role="img" aria-label="Skill 是一个自包含文件夹，内含 SKILL.md、脚本与参考资料；安装动作是把整个文件夹放进宿主扫描的目录，启动时只登记名字和描述，正文等任务触发才读">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">一个自包含的文件夹就是全部</text>
      <rect class="ka-fblock" x="16" y="42" width="396" height="170" rx="10"/>
      <text class="ka-ftitle" x="34" y="70">技能文件夹</text>
      <rect x="34" y="88" width="112" height="56" rx="7" fill="var(--ka-cyan)" opacity="0.28"/>
      <text class="ka-fsmall" x="46" y="112" style="fill: var(--ka-cyan)">SKILL.md</text>
      <text class="ka-fsmall" x="46" y="132">指令+元数据</text>
      <rect x="158" y="88" width="112" height="56" rx="7" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="170" y="112">scripts/</text>
      <text class="ka-fsmall" x="170" y="132">可执行脚本</text>
      <rect x="282" y="88" width="112" height="56" rx="7" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-fsmall" x="294" y="112">references/</text>
      <text class="ka-fsmall" x="294" y="132">模板与资料</text>
      <text class="ka-fsmall" x="34" y="172">没有注册中心，也不用打包发布</text>
      <text class="ka-fsmall" x="34" y="194">文件夹里还带使用边界说明</text>
      <path d="M420 127h30" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M450 122l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="466" y="42" width="158" height="170" rx="10"/>
      <text class="ka-ftitle" x="482" y="70" style="fill: var(--ka-green)">宿主</text>
      <text class="ka-ftext" x="482" y="102">项目目录里的</text>
      <text class="ka-ftext" x="482" y="126">skills/ 文件夹</text>
      <text class="ka-ftext" x="482" y="154">或全局目录</text>
      <text class="ka-fsmall" x="482" y="186">启动时扫一遍</text>
      <text class="ka-fsmall" x="482" y="204">只登记名字和描述</text>
      <rect class="ka-fblock" x="16" y="236" width="608" height="64" rx="10"/>
      <text class="ka-fsay" x="36" y="264">安装只有一个动作：整个文件夹放进宿主扫描的目录</text>
      <text class="ka-ftext" x="36" y="290">启动时先登记元数据（每个约 50–100 token），正文等任务触发才读</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 620" role="img" aria-label="Skill 是一个自包含文件夹，内含 SKILL.md、脚本与参考资料；安装动作是把整个文件夹放进宿主扫描的目录，启动时只登记名字和描述，正文等任务触发才读">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">一个自包含的文件夹就是全部</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">SKILL.md</text>
      <text class="ka-ftitle" x="32" y="104">指令 + 元数据</text>
      <text class="ka-ftext" x="32" y="130">必填名字和一句话描述</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196">scripts/</text>
      <text class="ka-ftitle" x="32" y="232">可执行脚本</text>
      <text class="ka-ftext" x="32" y="258">固定操作写成脚本跟着走</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324">references /</text>
      <text class="ka-ftitle" x="32" y="360">模板与参考资料</text>
      <text class="ka-ftext" x="32" y="386">用到哪页读哪页</text>
      <path d="M169 410l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="424" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="452" style="fill: var(--ka-green)">宿主</text>
      <text class="ka-ftitle" x="32" y="488">扫目录，登记名字和描述</text>
      <text class="ka-ftext" x="32" y="514">正文等任务触发才读</text>
      <rect class="ka-fblock" x="14" y="548" width="332" height="60" rx="10"/>
      <text class="ka-fsay" x="32" y="576">安装就是拷文件夹</text>
      <text class="ka-ftext" x="32" y="598">放进宿主扫描的目录，没有别的步骤</text>
    </svg>
    <div class="ka-fcap">图注：安装动作只有一个——整个文件夹放进宿主扫描的目录；启动时先登记名字与描述（每个约 50–100 token），正文等任务触发才读。</div>
  </div>
  <div class="ka-art-note">
    <p>Skill 没有安装包，也没有注册中心：指令、脚本、模板全在一个自包含文件夹里，整个拷过去就能用。宿主启动时只把每个技能的名字和一句话描述登记进清单，约 50–100 token。</p>
    <p>云端或沙箱里的宿主没有本地文件系统，发现机制要换成接口、远程仓库或随部署打包——落点变了，逻辑不变。</p>
  </div>
  <h2 class="ka-art-h2">02 三条路，同一个落点</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 三条分发路汇入同一目录</div>
    <svg class="fig-w" viewBox="0 0 640 340" role="img" aria-label="三条分发路：手动拷贝、插件市场、Git 仓库，三条路汇入宿主扫描的同一个 skills 目录，装完之后的行为与安装方式无关">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">三条路，落点是同一个目录</text>
      <rect class="ka-fblock" x="16" y="42" width="176" height="118" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">01</text>
      <text class="ka-ftitle" x="32" y="102">手动拷贝</text>
      <text class="ka-ftext" x="32" y="130">放进项目目录</text>
      <text class="ka-ftext" x="32" y="150">或全局目录</text>
      <rect class="ka-fblock" x="232" y="42" width="176" height="118" rx="9"/>
      <text class="ka-fnum" x="248" y="68" style="fill: var(--ka-amber)">02</text>
      <text class="ka-ftitle" x="248" y="102">插件市场</text>
      <text class="ka-ftext" x="248" y="130">注册市场后</text>
      <text class="ka-ftext" x="248" y="150">一条命令装一组</text>
      <rect class="ka-fblock" x="448" y="42" width="176" height="118" rx="9"/>
      <text class="ka-fnum" x="464" y="68" style="fill: var(--ka-green)">03</text>
      <text class="ka-ftitle" x="464" y="102">Git 仓库</text>
      <text class="ka-ftext" x="464" y="130">clone 进目录，</text>
      <text class="ka-ftext" x="464" y="150">pull 一下就更新</text>
      <path d="M104 164v40" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M99 204l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <path d="M320 164v40" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M315 204l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <path d="M536 164v40" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M531 204l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="16" y="216" width="608" height="56" rx="10"/>
      <text class="ka-fsay" x="36" y="252">宿主扫描的 skills 目录——同一个落点</text>
      <rect class="ka-fblock" x="16" y="286" width="608" height="44" rx="10"/>
      <text class="ka-ftext" x="36" y="314">路只是搬运方式不同：装完之后，触发、权限、压缩照旧是宿主管的</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 620" role="img" aria-label="三条分发路：手动拷贝、插件市场、Git 仓库，三条路汇入宿主扫描的同一个 skills 目录，装完之后的行为与安装方式无关">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">三条路，落点是同一个目录</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">01 手动拷贝</text>
      <text class="ka-ftitle" x="32" y="104">把文件夹放进目录</text>
      <text class="ka-ftext" x="32" y="130">项目级或全局都行</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196" style="fill: var(--ka-amber)">02 插件市场</text>
      <text class="ka-ftitle" x="32" y="232">一条命令装一组</text>
      <text class="ka-ftext" x="32" y="258">先注册市场，再选装</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324" style="fill: var(--ka-green)">03 Git 仓库</text>
      <text class="ka-ftitle" x="32" y="360">clone 进目录</text>
      <text class="ka-ftext" x="32" y="386">作者更新后 pull 即新版</text>
      <path d="M169 410l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="424" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="452" style="fill: var(--ka-cyan)">落点</text>
      <text class="ka-ftitle" x="32" y="488">宿主扫描的 skills 目录</text>
      <text class="ka-ftext" x="32" y="514">三条路汇进同一个目录</text>
      <rect class="ka-fblock" x="14" y="548" width="332" height="60" rx="10"/>
      <text class="ka-fsay" x="32" y="576">路不同，落点相同</text>
      <text class="ka-ftext" x="32" y="598">装完之后，触发与权限照旧由宿主管</text>
    </svg>
    <div class="ka-fcap">图注：三条路只是搬运方式不同，越往后越省事；落点都是同一个目录，装完之后的行为与安装方式无关。</div>
  </div>
  <div class="ka-art-note">
    <p>手动拷贝最笨也最可靠；插件市场一条命令装一组；从 Git 仓库 clone 进来，作者更新后拉一下就是新版。</p>
    <p>三条路的落点是宿主扫描的同一个目录，装上之后触发、权限、压缩照旧是宿主管的。</p>
  </div>
  <h2 class="ka-art-h2">03 最后一关是信任</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 加载前的信任检查</div>
    <svg class="fig-w" viewBox="0 0 640 300" role="img" aria-label="项目级 Skill 随仓库进入：用户标记可信的目录通过信任检查加载，指令进上下文；未标记的不加载，指令不进上下文，防止陌生仓库悄悄注入指令">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">装进来之前，还有一道信任关</text>
      <rect class="ka-fblock" x="16" y="40" width="608" height="52" rx="10"/>
      <text class="ka-ftext" x="36" y="72">项目级 Skill 跟着仓库走——刚 clone 的陌生项目可能带着没人看过的 Skill</text>
      <rect x="16" y="108" width="290" height="132" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="34" y="140" style="fill: var(--ka-green)">标记了可信</text>
      <text class="ka-ftext" x="34" y="170">信任检查通过，加载</text>
      <text class="ka-ftext" x="34" y="196">指令进上下文</text>
      <text class="ka-fsmall" x="34" y="224">用户主动标记过的目录</text>
      <rect x="334" y="108" width="290" height="132" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="352" y="140" style="fill: var(--ka-rose)">没有标记</text>
      <text class="ka-ftext" x="352" y="170">检查不通过，不加载</text>
      <text class="ka-ftext" x="352" y="196">指令不进上下文</text>
      <text class="ka-fsmall" x="352" y="224">防陌生仓库悄悄注入</text>
      <rect class="ka-fblock" x="16" y="252" width="608" height="40" rx="10"/>
      <text class="ka-ftext" x="36" y="278">信任检查在加载之前——这是官方宿主指南写明的防御位置</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 510" role="img" aria-label="项目级 Skill 随仓库进入：用户标记可信的目录通过信任检查加载，指令进上下文；未标记的不加载，指令不进上下文，防止陌生仓库悄悄注入指令">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">装进来之前，还有一道信任关</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-amber)">背景</text>
      <text class="ka-ftitle" x="32" y="104">项目级 Skill 跟仓库走</text>
      <text class="ka-ftext" x="32" y="130">陌生项目可能带没人看过的 Skill</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196" style="fill: var(--ka-green)">标记了可信</text>
      <text class="ka-ftitle" x="32" y="232">信任检查通过，加载</text>
      <text class="ka-ftext" x="32" y="258">指令才进上下文</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324" style="fill: var(--ka-rose)">没有标记</text>
      <text class="ka-ftitle" x="32" y="360">不加载</text>
      <text class="ka-ftext" x="32" y="386">指令不进上下文</text>
      <rect class="ka-fblock" x="14" y="420" width="332" height="78" rx="10"/>
      <text class="ka-fsay" x="32" y="450">信任检查在加载之前</text>
      <text class="ka-ftext" x="32" y="478">用户没标记可信的目录，宿主就不加载</text>
    </svg>
    <div class="ka-fcap">图注：加载与否取决于信任标记，不由 Skill 自己声明；检查发生在加载之前，这是官方宿主指南写明的防御位置。</div>
  </div>
  <div class="ka-art-note">
    <p>项目级 Skill 跟着仓库走，刚 clone 的陌生项目可能带着没人审过的文件夹——它一旦加载，内容就进了模型上下文。</p>
    <p>官方宿主指南的建议很直白：用户没把目录标记为可信，就不加载。防的是陌生仓库把指令悄悄塞进上下文。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://github.com/anthropics/skills" target="_blank" rel="noopener">anthropics/skills 官方技能库 README</a>——自包含文件夹、插件市场安装命令、演示与生产差异说明；<a href="https://agentskills.io/integrate-skills" target="_blank" rel="noopener">Agent Skills · How to add skills support to your agent</a>——宿主发现机制、云端宿主的替代发现、项目级 Skill 信任检查；<a href="https://agentskills.io/specification" target="_blank" rel="noopener">Agent Skills 规范</a>——三层渐进披露与元数据 token 量级。均于 2026-11-27 核验可访问。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/skill-update/" data-no-popover="true"><div class="kn">下一篇 →</div><div class="kt">Skill 更新为什么停在旧版本</div></a>
  </nav>
</div>
