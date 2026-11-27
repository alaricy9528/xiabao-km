---
title: Skill 更新为什么停在旧版本
publish: true
description: 插件 Skill 的更新检测只比对版本字符串：设了 version 不涨就收不到，省了 version 就跟踪提交；自动更新默认关，固定与回滚是配置不是按钮。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · Skills 与能力封装</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-28</span>
    </div>
    <h1>Skill 更新为什么停在旧版本</h1>
    <p class="ka-art-lede">Skill 装上不等于一劳永逸。作者改完代码推了仓库，用户那边可能毫无动静——更新检测看的不是内容，是版本字符串。</p>
  </div>
  <h2 class="ka-art-h2">01 更新看的不是内容，是版本字符串</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 写没写 version，两种更新节奏</div>
    <svg class="fig-w" viewBox="0 0 640 330" role="img" aria-label="作者推新提交后：设了 version 字段的插件停在缓存副本，直到字符串变化才收到新副本；省略 version 则跟踪提交，每次都拿接近最新的版本——更新检测比对的是版本字符串不是内容">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">同一份推送，两种结果</text>
      <rect class="ka-fblock" x="16" y="40" width="608" height="46" rx="10"/>
      <text class="ka-ftext" x="36" y="70">作者改完代码，push 新提交到仓库</text>
      <path d="M164 90v28" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M159 118l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <path d="M476 90v28" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M471 118l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="16" y="130" width="296" height="140" rx="10"/>
      <text class="ka-ftitle" x="34" y="160">设了 version：1.0.0</text>
      <text class="ka-ftext" x="34" y="192">字符串没变，推了也白推</text>
      <text class="ka-fsmall" x="34" y="216">更新检测只比对版本字符串</text>
      <text class="ka-ftext" x="34" y="248" style="fill: var(--ka-rose)">用户停在缓存副本</text>
      <rect class="ka-fblock" x="328" y="130" width="296" height="140" rx="10"/>
      <text class="ka-ftitle" x="346" y="160" style="fill: var(--ka-green)">省略 version</text>
      <text class="ka-ftext" x="346" y="192">改成跟踪提交</text>
      <text class="ka-fsmall" x="346" y="216">官方写明的另一种语义</text>
      <text class="ka-ftext" x="346" y="248" style="fill: var(--ka-green)">每次都拿接近最新</text>
      <rect class="ka-fblock" x="16" y="284" width="608" height="40" rx="10"/>
      <text class="ka-fsay" x="36" y="310">更新检测比对的是版本字符串，不是代码内容</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 620" role="img" aria-label="作者推新提交后：设了 version 字段的插件停在缓存副本，直到字符串变化才收到新副本；省略 version 则跟踪提交，每次都拿接近最新的版本——更新检测比对的是版本字符串不是内容">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">同一份推送，两种结果</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">起点</text>
      <text class="ka-ftitle" x="32" y="104">作者 push 新提交</text>
      <text class="ka-ftext" x="32" y="130">代码改了，仓库更新了</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196" style="fill: var(--ka-rose)">设了 version</text>
      <text class="ka-ftitle" x="32" y="232">字符串没变就停在缓存副本</text>
      <text class="ka-ftext" x="32" y="258">推了也白推</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324" style="fill: var(--ka-green)">省略 version</text>
      <text class="ka-ftitle" x="32" y="360">改成跟踪提交</text>
      <text class="ka-ftext" x="32" y="386">每次都拿接近最新</text>
      <path d="M169 410l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="424" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="452">结论</text>
      <text class="ka-ftitle" x="32" y="488">检测比对的是版本字符串</text>
      <text class="ka-ftext" x="32" y="514">不是代码内容</text>
      <rect class="ka-fblock" x="14" y="548" width="332" height="60" rx="10"/>
      <text class="ka-fsay" x="32" y="576">写不写 version</text>
      <text class="ka-ftext" x="32" y="598">决定两种完全不同的更新节奏</text>
    </svg>
    <div class="ka-fcap">图注：同一份推送，结果全看 version 字段；设了它就等字符串变化，省了它就跟踪提交，越往后越新。</div>
  </div>
  <div class="ka-art-note">
    <p>官方文档写得直白：设了 version 就停在缓存副本，字符串不变、推了也不收；把 version 整个省掉，用户改成跟踪提交，每次拿接近最新的版本。写不写这个字段，是两种完全不同的更新节奏。</p>
  </div>
  <h2 class="ka-art-h2">02 更新动作本身也是关卡</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 从推送落地要过的两道关</div>
    <svg class="fig-w" viewBox="0 0 640 330" role="img" aria-label="更新链路：作者仓库推送后经插件市场比对版本字符串，再经手动更新命令或默认关闭的后台自动更新才落地为新副本；后台检查连不上远端时静默保留旧检出，Skill 照常运行">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">更新不会自动发生</text>
      <rect class="ka-fblock" x="16" y="42" width="120" height="110" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">01</text>
      <text class="ka-ftitle" x="32" y="100">作者仓库</text>
      <text class="ka-ftext" x="32" y="128">新代码已推送</text>
      <path d="M142 97h20" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M162 92l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="176" y="42" width="120" height="110" rx="9"/>
      <text class="ka-fnum" x="192" y="68" style="fill: var(--ka-amber)">02</text>
      <text class="ka-ftitle" x="192" y="100">插件市场</text>
      <text class="ka-ftext" x="192" y="128">比对版本字符串</text>
      <path d="M302 97h20" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M322 92l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="336" y="42" width="120" height="110" rx="9"/>
      <text class="ka-fnum" x="352" y="68" style="fill: var(--ka-green)">03</text>
      <text class="ka-ftitle" x="352" y="100">更新动作</text>
      <text class="ka-ftext" x="352" y="128">手动敲命令</text>
      <text class="ka-ftext" x="352" y="148">或开自动更新</text>
      <path d="M462 97h20" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.6"/>
      <path d="M482 92l8 5-8 5z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="496" y="42" width="120" height="110" rx="9"/>
      <text class="ka-fnum" x="512" y="68" style="fill: var(--ka-green)">04</text>
      <text class="ka-ftitle" x="512" y="100">落地</text>
      <text class="ka-ftext" x="512" y="128">本地换新副本</text>
      <rect class="ka-fblock" x="16" y="178" width="608" height="64" rx="10"/>
      <text class="ka-ftext" x="36" y="206">自动更新默认关闭——要用户在设置里开，或管理员下发</text>
      <text class="ka-ftext" x="36" y="230">后台检查连不上远端：静默保留旧检出，Skill 照常运行</text>
      <rect class="ka-fblock" x="16" y="268" width="608" height="40" rx="10"/>
      <text class="ka-fsay" x="36" y="294">两道关都要人动手：一敲命令，一开设置</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 700" role="img" aria-label="更新链路：作者仓库推送后经插件市场比对版本字符串，再经手动更新命令或默认关闭的后台自动更新才落地为新副本；后台检查连不上远端时静默保留旧检出，Skill 照常运行">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">更新不会自动发生</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">01</text>
      <text class="ka-ftitle" x="32" y="104">作者仓库</text>
      <text class="ka-ftext" x="32" y="130">新代码已推送</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196" style="fill: var(--ka-amber)">02</text>
      <text class="ka-ftitle" x="32" y="232">插件市场</text>
      <text class="ka-ftext" x="32" y="258">比对版本字符串，决定发不发新版</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324" style="fill: var(--ka-green)">03</text>
      <text class="ka-ftitle" x="32" y="360">更新动作</text>
      <text class="ka-ftext" x="32" y="386">手动敲命令，或开默认关闭的自动更新</text>
      <path d="M169 410l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="424" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="452" style="fill: var(--ka-green)">落地</text>
      <text class="ka-ftitle" x="32" y="488">本地副本换成新版</text>
      <text class="ka-ftext" x="32" y="514">两道关都要人动手</text>
      <rect class="ka-fblock" x="14" y="548" width="332" height="78" rx="10"/>
      <text class="ka-fsay" x="32" y="578">检查失败也不断供</text>
      <text class="ka-ftext" x="32" y="604">连不上远端就保留旧检出，照常运行</text>
    </svg>
    <div class="ka-fcap">图注：从推送到落地依次经过市场比对与更新动作两道关；检查失败时静默保留旧副本，服务不中断。</div>
  </div>
  <div class="ka-art-note">
    <p>更新也不会自动发生：手动更新要敲命令，后台自动更新默认关闭，得用户或管理员开启。后台检查连不上远端时静默保留上次同步的旧检出，Skill 照常运行。</p>
  </div>
  <h2 class="ka-art-h2">03 固定与回滚是配置，不是按钮</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 想停在某个版本，得自己写配置</div>
    <svg class="fig-w" viewBox="0 0 640 300" role="img" aria-label="三种版本固定手段：插件条目写 ref 或 sha 钉住分支或提交，用户加市场时带井号 ref 钉住轨道，双市场分稳定与尝鲜轨道；回滚没有专门命令，把引用指回旧提交即可">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">固定是可配项，不是默认</text>
      <rect class="ka-fblock" x="16" y="40" width="192" height="140" rx="9"/>
      <text class="ka-fnum" x="32" y="66" style="fill: var(--ka-cyan)">A</text>
      <text class="ka-ftitle" x="32" y="98">写 ref 或 sha</text>
      <text class="ka-ftext" x="32" y="128">插件条目钉住</text>
      <text class="ka-ftext" x="32" y="150">分支或提交</text>
      <rect class="ka-fblock" x="224" y="40" width="192" height="140" rx="9"/>
      <text class="ka-fnum" x="240" y="66" style="fill: var(--ka-amber)">B</text>
      <text class="ka-ftitle" x="240" y="98">加市场带 #ref</text>
      <text class="ka-ftext" x="240" y="128">用户侧钉住轨道</text>
      <text class="ka-ftext" x="240" y="150">各装各的时点</text>
      <rect class="ka-fblock" x="432" y="40" width="192" height="140" rx="9"/>
      <text class="ka-fnum" x="448" y="66" style="fill: var(--ka-green)">C</text>
      <text class="ka-ftitle" x="448" y="98">双市场分轨道</text>
      <text class="ka-ftext" x="448" y="128">稳定与尝鲜各指</text>
      <text class="ka-ftext" x="448" y="150">一个 ref</text>
      <rect class="ka-fblock" x="16" y="206" width="608" height="40" rx="10"/>
      <text class="ka-ftext" x="36" y="232">压缩包源可再加 sha256 校验——下载变了就拒收</text>
      <rect class="ka-fblock" x="16" y="252" width="608" height="40" rx="10"/>
      <text class="ka-fsay" x="36" y="278">回滚没有专门命令——把引用指回旧提交，就是回滚</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 620" role="img" aria-label="三种版本固定手段：插件条目写 ref 或 sha 钉住分支或提交，用户加市场时带井号 ref 钉住轨道，双市场分稳定与尝鲜轨道；回滚没有专门命令，把引用指回旧提交即可">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">固定是可配项，不是默认</text>
      <rect class="ka-fblock" x="14" y="40" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-cyan)">A</text>
      <text class="ka-ftitle" x="32" y="104">插件条目写 ref 或 sha</text>
      <text class="ka-ftext" x="32" y="130">钉住分支或提交</text>
      <path d="M169 154l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="168" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="196" style="fill: var(--ka-amber)">B</text>
      <text class="ka-ftitle" x="32" y="232">加市场带 #ref</text>
      <text class="ka-ftext" x="32" y="258">用户侧钉住轨道</text>
      <path d="M169 282l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="296" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="324" style="fill: var(--ka-green)">C</text>
      <text class="ka-ftitle" x="32" y="360">双市场分轨道</text>
      <text class="ka-ftext" x="32" y="386">稳定与尝鲜各指一个 ref</text>
      <path d="M169 410l6 12 6-12z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="424" width="332" height="112" rx="9"/>
      <text class="ka-fnum" x="32" y="452">补充</text>
      <text class="ka-ftitle" x="32" y="488">压缩包源加 sha256</text>
      <text class="ka-ftext" x="32" y="514">下载变了就拒收</text>
      <rect class="ka-fblock" x="14" y="548" width="332" height="60" rx="10"/>
      <text class="ka-fsay" x="32" y="576">没有回滚按钮</text>
      <text class="ka-ftext" x="32" y="598">把引用指回旧提交，就是回滚</text>
    </svg>
    <div class="ka-fcap">图注：三种固定手段依次是条目级钉提交、用户级钉轨道、市场级分轨道；回滚即把引用指回旧提交。</div>
  </div>
  <div class="ka-art-note">
    <p>想停在某个版本得自己动手：插件条目写 ref 或 sha，加市场时带 #stable，或者用两个市场分稳定与尝鲜轨道。回滚没有专门命令，把引用指回旧提交就是回滚。</p>
    <p>独立 Skill 更原始：目录就是版本，更新等于重新拷贝或 pull，规范里可选的 metadata.version 只是给人看的标注。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://code.claude.com/docs/en/plugins/host-marketplace.md" target="_blank" rel="noopener">Claude Code · Host and maintain a marketplace</a>——版本字符串比对、自动更新默认关闭、失败保留旧检出、ref/sha 固定；<a href="https://code.claude.com/docs/en/plugins/create-marketplace" target="_blank" rel="noopener">Claude Code · Create a marketplace</a>——version 触发更新的发布指引；<a href="https://agentskills.io/specification" target="_blank" rel="noopener">Agent Skills 规范</a>——独立 Skill 必填与可选字段。均于 2026-11-28 核验可访问。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/skill-sandbox/" data-no-popover="true"><div class="kn">下一篇 →</div><div class="kt">Skill 的脚本跑在谁的权限里</div></a>
  </nav>
</div>
