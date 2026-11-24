---
title: Skill 的脚本跑在谁的权限里
publish: true
description: Skill 不自带权限：脚本借宿主的身份干活。所以边界不靠 Skill 里写一句「别碰 XX」，靠宿主给它的环境。
---

<div class="ai-learn ka-view ka-view--article">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 知识文章</div>
  <div class="ka-art-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · Skills 与能力封装</span>
      <span class="ka-tag plain">知识文章</span>
      <span class="ka-tag plain">更新 2026-11-25</span>
    </div>
    <h1>Skill 的脚本跑在谁的权限里</h1>
    <p class="ka-art-lede">Skill 不自带权限：脚本借宿主的身份干活。所以边界不靠 Skill 里写一句「别碰 XX」，靠宿主给它的环境。</p>
  </div>
  <h2 class="ka-art-h2">01 权限是借来的</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 1 · 脚本跑起来那一刻，权限是谁的</div>
    <svg class="fig-w" viewBox="0 0 640 320" role="img" aria-label="宿主握有全量权限，加载 Skill 只是读一份说明书，脚本运行时借用宿主的身份读写文件、跑命令、发请求；权限只有一份，恶意 Skill 不是越权而是正当使用">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">脚本跑起来那一刻，权限是谁的</text>
      <rect class="ka-fblock" x="16" y="42" width="180" height="116" rx="10"/>
      <text class="ka-fnum" x="34" y="70" style="fill: var(--ka-muted)">01</text>
      <text class="ka-ftitle" x="34" y="104">宿主全量权限</text>
      <text class="ka-ftext" x="34" y="134">文件 · 命令 · 网络</text>
      <path d="M200 100h16" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M216 95l9 5-9 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="222" y="42" width="180" height="116" rx="10"/>
      <text class="ka-fnum" x="240" y="70" style="fill: var(--ka-muted)">02</text>
      <text class="ka-ftitle" x="240" y="104">加载 Skill</text>
      <text class="ka-ftext" x="240" y="134">只是读一份说明书</text>
      <path d="M406 100h16" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M422 95l9 5-9 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="428" y="42" width="180" height="116" rx="10"/>
      <text class="ka-fnum" x="446" y="70" style="fill: var(--ka-cyan)">03</text>
      <text class="ka-ftitle" x="446" y="104">脚本运行</text>
      <text class="ka-ftext" x="446" y="134">借宿主的身份干活</text>
      <rect class="ka-fblock" x="16" y="178" width="592" height="112" rx="10"/>
      <text class="ka-fsay" x="36" y="214">权限只有一份——宿主的那份</text>
      <text class="ka-ftext" x="36" y="246">Skill 不带自己的账号，也没有自己的权限清单</text>
      <text class="ka-ftext" x="36" y="272">恶意 Skill 不是「越权」，是正当使用你交给 agent 的权限</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 470" role="img" aria-label="宿主握有全量权限，加载 Skill 只是读一份说明书，脚本运行时借用宿主的身份读写文件、跑命令、发请求；权限只有一份，恶意 Skill 不是越权而是正当使用">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">脚本跑起来那一刻，权限是谁的</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="84" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-muted)">01</text>
      <text class="ka-ftitle" x="32" y="100">宿主全量权限</text>
      <text class="ka-ftext" x="32" y="122" style="font-size:13.5px">文件 · 命令 · 网络</text>
      <path d="M175 130l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="142" width="332" height="84" rx="9"/>
      <text class="ka-fnum" x="32" y="168" style="fill: var(--ka-muted)">02</text>
      <text class="ka-ftitle" x="32" y="200">加载 Skill</text>
      <text class="ka-ftext" x="32" y="222" style="font-size:13.5px">只是读一份说明书</text>
      <path d="M175 230l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="242" width="332" height="84" rx="9"/>
      <text class="ka-fnum" x="32" y="268" style="fill: var(--ka-cyan)">03</text>
      <text class="ka-ftitle" x="32" y="300">脚本运行</text>
      <text class="ka-ftext" x="32" y="322" style="font-size:13.5px">借宿主的身份干活</text>
      <rect class="ka-fblock" x="14" y="356" width="332" height="96" rx="10"/>
      <text class="ka-fsay" x="32" y="388">权限只有一份——宿主的那份</text>
      <text class="ka-ftext" x="32" y="418">恶意 Skill 不是「越权」</text>
      <text class="ka-ftext" x="32" y="440">是正当使用你交给 agent 的权限</text>
    </svg>
    <div class="ka-fcap">图注：权限只有一份——宿主的那份；Skill 被加载、脚本被执行，从头到尾都在借用它。</div>
  </div>
  <div class="ka-art-note">
    <p>Skill 的脚本没有自己的账号，也没有自己的权限清单：跑起来那一刻，用的是 agent 手里的那把钥匙——agent 能读的文件它就能读，agent 能发的网络请求它就能发。</p>
    <p>所以一份恶意 Skill 的可怕之处，不是它「突破」了什么，而是它正大光明地使用了你交给 agent 的全部权限。审查一个 Skill，本质上是在审查一次授权。</p>
  </div>
  <h2 class="ka-art-h2">02 边界在环境，不在说明书</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 2 · 沙箱的三层默认</div>
    <svg class="fig-w" viewBox="0 0 640 404" role="img" aria-label="沙箱对三类资源给三种默认：读默认放行除非 denyRead，写默认拒绝除非 allowWrite，网络默认拒绝由白名单放行且黑名单先查；限制覆盖命令派生的一切子进程，越关键的资源默认越保守">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">沙箱对三类资源，给三种默认</text>
      <rect class="ka-fblock" x="16" y="42" width="608" height="72" rx="10"/>
      <text class="ka-ftitle" x="36" y="86">读</text>
      <text class="ka-ftext" x="140" y="86" style="fill: var(--ka-green)">默认放行</text>
      <text class="ka-fsmall" x="300" y="86">除非清单里明确写了 denyRead</text>
      <rect class="ka-fblock" x="16" y="126" width="608" height="72" rx="10"/>
      <text class="ka-ftitle" x="36" y="170">写</text>
      <text class="ka-ftext" x="140" y="170" style="fill: var(--ka-rose)">默认拒绝</text>
      <text class="ka-fsmall" x="300" y="170">除非清单里明确写了 allowWrite</text>
      <rect class="ka-fblock" x="16" y="210" width="608" height="72" rx="10"/>
      <text class="ka-ftitle" x="36" y="254">网络</text>
      <text class="ka-ftext" x="140" y="254" style="fill: var(--ka-rose)">默认拒绝</text>
      <text class="ka-fsmall" x="300" y="254">白名单放行 · 黑名单先查</text>
      <text class="ka-fsmall" x="16" y="312">限制覆盖命令派生的一切子进程；配置缺失或写错时拒绝启动，而不是放行</text>
      <rect class="ka-fblock" x="16" y="324" width="608" height="64" rx="10"/>
      <text class="ka-fsay" x="36" y="354">默认姿态是关，不是开</text>
      <text class="ka-ftext" x="36" y="378">官方内部口径：这样一套沙箱让权限提示减少 84%（厂商自报）</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 468" role="img" aria-label="沙箱对三类资源给三种默认：读默认放行除非 denyRead，写默认拒绝除非 allowWrite，网络默认拒绝由白名单放行且黑名单先查；限制覆盖命令派生的一切子进程，越关键的资源默认越保守">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">沙箱对三类资源，给三种默认</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="84" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-green)">读</text>
      <text class="ka-ftitle" x="32" y="100">默认放行</text>
      <text class="ka-ftext" x="32" y="122" style="font-size:13.5px">除非清单里明确写了 denyRead</text>
      <rect class="ka-fblock" x="14" y="138" width="332" height="84" rx="9"/>
      <text class="ka-fnum" x="32" y="164" style="fill: var(--ka-rose)">写</text>
      <text class="ka-ftitle" x="32" y="196">默认拒绝</text>
      <text class="ka-ftext" x="32" y="218" style="font-size:13.5px">除非清单里明确写了 allowWrite</text>
      <rect class="ka-fblock" x="14" y="234" width="332" height="84" rx="9"/>
      <text class="ka-fnum" x="32" y="260" style="fill: var(--ka-rose)">网络</text>
      <text class="ka-ftitle" x="32" y="292">默认拒绝</text>
      <text class="ka-ftext" x="32" y="314" style="font-size:13.5px">白名单放行 · 黑名单先查</text>
      <text class="ka-fsmall" x="180" y="352" text-anchor="middle">覆盖子进程 · 配置写错就拒启</text>
      <rect class="ka-fblock" x="14" y="368" width="332" height="84" rx="10"/>
      <text class="ka-fsay" x="32" y="400">默认姿态是关，不是开</text>
      <text class="ka-ftext" x="32" y="430">官方内部口径：权限提示减少 84%</text>
    </svg>
    <div class="ka-fcap">图注：三层默认各管一类资源——越关键的资源，默认姿态越保守。</div>
  </div>
  <div class="ka-art-note">
    <p>有人会在 Skill 里写一句「不要访问 XX」。这句话属于模型层的第一道检查——有用，但可以被误导，也拦不住混进来的注入指令。官方企业安全指南把它列为典型的弱答案。</p>
    <p>强答案是环境层：内核级沙箱、失败即关闭、网络出口白名单。它的默认姿态值得记住——读默认放行，写和网络默认拒绝，而且限制跟着子进程走，命令再怎么套娃也出不去。</p>
  </div>
  <h2 class="ka-art-h2">03 一句话和一道墙</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 3 · 声明的边界 vs 环境的边界</div>
    <svg class="fig-w" viewBox="0 0 640 336" role="img" aria-label="声明的边界写在 Skill 里，属模型层检查，可被误导与注入绕过，是官方指南里的弱答案；环境的边界由内核级沙箱与出口白名单划定，agent 改不动，被绕过也拦得住，是强答案；出事时拦得住才算边界">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">同样是「不许碰」，两种划法</text>
      <rect x="16" y="42" width="292" height="204" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="36" y="74" style="fill: var(--ka-amber)">声明的边界</text>
      <text class="ka-ftext" x="36" y="108">Skill 里写「别碰 XX」</text>
      <text class="ka-fsmall" x="36" y="140">模型层的第一道检查</text>
      <text class="ka-fsmall" x="36" y="166">可被误导与注入绕过</text>
      <text class="ka-fsmall" x="36" y="192">官方指南里的弱答案</text>
      <path d="M312 144h16" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M328 139l9 5-9 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect x="334" y="42" width="290" height="204" rx="12" fill="none" stroke="var(--ka-line-strong)"/>
      <text class="ka-ftitle" x="354" y="74" style="fill: var(--ka-green)">环境的边界</text>
      <text class="ka-ftext" x="354" y="108">内核沙箱 · fail-closed</text>
      <text class="ka-fsmall" x="354" y="140">出口白名单管到子进程</text>
      <text class="ka-fsmall" x="354" y="166">agent 自己改不动</text>
      <text class="ka-fsmall" x="354" y="192">被绕过也拦得住</text>
      <rect class="ka-fblock" x="16" y="262" width="608" height="64" rx="10"/>
      <text class="ka-fsay" x="36" y="292">出事时拦得住，才算边界</text>
      <text class="ka-ftext" x="36" y="316">模型自觉与环境兜底都要有，验收只认环境那道</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 456" role="img" aria-label="声明的边界写在 Skill 里，属模型层检查，可被误导与注入绕过，是官方指南里的弱答案；环境的边界由内核级沙箱与出口白名单划定，agent 改不动，被绕过也拦得住，是强答案；出事时拦得住才算边界">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">同样是「不许碰」，两种划法</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="128" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-amber)">声明</text>
      <text class="ka-ftitle" x="32" y="100">Skill 里写「别碰 XX」</text>
      <text class="ka-ftext" x="32" y="126" style="font-size:13.5px">模型层检查 · 可被注入绕过</text>
      <text class="ka-ftext" x="32" y="150" style="font-size:13.5px">官方指南里的弱答案</text>
      <path d="M175 174l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="186" width="332" height="128" rx="9"/>
      <text class="ka-fnum" x="32" y="212" style="fill: var(--ka-green)">环境</text>
      <text class="ka-ftitle" x="32" y="244">内核沙箱 · fail-closed</text>
      <text class="ka-ftext" x="32" y="270" style="font-size:13.5px">出口白名单管到子进程</text>
      <text class="ka-ftext" x="32" y="294" style="font-size:13.5px">agent 改不动 · 被绕过也拦得住</text>
      <rect class="ka-fblock" x="14" y="344" width="332" height="88" rx="10"/>
      <text class="ka-fsay" x="32" y="376">出事时拦得住，才算边界</text>
      <text class="ka-ftext" x="32" y="408">两者都要有，验收只认环境那道</text>
    </svg>
    <div class="ka-fcap">图注：声明靠模型自觉，环境靠机制兜底——出事时真正拦得住的，是划在环境里的那道。</div>
  </div>
  <div class="ka-art-note">
    <p>对照读官方那张「六问」清单最直观：评估一个 coding agent，其中一问就是爆炸半径有没有被环境限定。好答案是内核级沙箱加 fail-closed，弱答案是「我们提示过它别离开工作目录」。</p>
    <p>两层不是二选一：模型自觉便宜、覆盖面广，环境兜底贵、但骗不过去。出事那一刻能拦住的，只有环境那道。</p>
  </div>
  <h2 class="ka-art-h2">04 装第三方 Skill 的四步</h2>
  <div class="ka-figcard">
    <div class="fhead"><i class="sig"></i>图 4 · 从看到用到能放心用</div>
    <svg class="fig-w" viewBox="0 0 640 312" role="img" aria-label="装第三方 Skill 的四步：读全部文件、查脚本与外连目标、固定版本防漂移、沙箱里用样本数据与不该触发的负例试跑；装一个 Skill 等于引一个依赖包，按依赖包的标准审">
      <text class="ka-fnum" x="16" y="26" style="fill: var(--ka-amber)">装一个第三方 Skill，四步</text>
      <rect class="ka-fblock" x="16" y="42" width="136" height="112" rx="10"/>
      <text class="ka-fnum" x="30" y="68" style="fill: var(--ka-muted)">01</text>
      <text class="ka-ftitle" x="30" y="100">读全部文件</text>
      <text class="ka-ftext" x="30" y="130">SKILL.md 与引用</text>
      <path d="M156 98h8" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M160 93l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="168" y="42" width="136" height="112" rx="10"/>
      <text class="ka-fnum" x="182" y="68" style="fill: var(--ka-muted)">02</text>
      <text class="ka-ftitle" x="182" y="100">查脚本外连</text>
      <text class="ka-ftext" x="182" y="130">依赖 · 命令 · 目标</text>
      <path d="M308 98h8" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M312 93l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="320" y="42" width="136" height="112" rx="10"/>
      <text class="ka-fnum" x="334" y="68" style="fill: var(--ka-muted)">03</text>
      <text class="ka-ftitle" x="334" y="100">固定版本</text>
      <text class="ka-ftext" x="334" y="130">pin 住 commit</text>
      <path d="M460 98h8" stroke="var(--ka-cyan)" stroke-width="2" opacity="0.55"/>
      <path d="M464 93l7 5-7 5z" fill="var(--ka-cyan)" opacity="0.55"/>
      <rect class="ka-fblock" x="472" y="42" width="136" height="112" rx="10"/>
      <text class="ka-fnum" x="486" y="68" style="fill: var(--ka-green)">04</text>
      <text class="ka-ftitle" x="486" y="100">沙箱试跑</text>
      <text class="ka-ftext" x="486" y="130">样本数据 + 负例</text>
      <rect class="ka-fblock" x="16" y="196" width="592" height="92" rx="10"/>
      <text class="ka-fsay" x="36" y="230">装一个 Skill，等于引一个依赖包</text>
      <text class="ka-ftext" x="36" y="262">按依赖包的标准审：来源固定、内容读过、行为试过</text>
    </svg>
    <svg class="fig-n" viewBox="0 0 360 560" role="img" aria-label="装第三方 Skill 的四步：读全部文件、查脚本与外连目标、固定版本防漂移、沙箱里用样本数据与不该触发的负例试跑；装一个 Skill 等于引一个依赖包，按依赖包的标准审">
      <text class="ka-fnum" x="14" y="28" style="fill: var(--ka-amber)">装一个第三方 Skill，四步</text>
      <rect class="ka-fblock" x="14" y="42" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="32" y="68" style="fill: var(--ka-muted)">01</text>
      <text class="ka-ftitle" x="32" y="100">读全部文件</text>
      <path d="M175 126l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="140" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="32" y="166" style="fill: var(--ka-muted)">02</text>
      <text class="ka-ftitle" x="32" y="198">查脚本与外连目标</text>
      <path d="M175 224l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="238" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="32" y="264" style="fill: var(--ka-muted)">03</text>
      <text class="ka-ftitle" x="32" y="296">固定版本，pin 住 commit</text>
      <path d="M175 322l5 8 5-8z" fill="var(--ka-cyan)" opacity="0.6"/>
      <rect class="ka-fblock" x="14" y="336" width="332" height="80" rx="9"/>
      <text class="ka-fnum" x="32" y="362" style="fill: var(--ka-green)">04</text>
      <text class="ka-ftitle" x="32" y="394">沙箱试跑：样本 + 负例</text>
      <text class="ka-fsmall" x="180" y="448" text-anchor="middle">负例 = 专门塞几个不该触发的任务</text>
      <rect class="ka-fblock" x="14" y="464" width="332" height="80" rx="10"/>
      <text class="ka-fsay" x="32" y="494">装 Skill 等于引依赖包</text>
      <text class="ka-ftext" x="32" y="522">来源固定 · 内容读过 · 行为试过</text>
    </svg>
    <div class="ka-fcap">图注：四步依次做——前两步看内容，后两步管行为；少一步，信任就多一分缺口。</div>
  </div>
  <div class="ka-art-note">
    <p>Anthropic 对第三方 Skill 的警告很直白：恶意 Skill 可以带漏洞，也可以引导 agent 外传数据。装之前按依赖包的标准走四步：读全部文件、查脚本和网络目标、固定 commit、沙箱里用样本数据试跑。</p>
    <p>试跑别只测「该用的时候」，要专门塞几个不该触发的任务进去。一份好 Skill 不只在该干活时干活，还得在不该动手时忍住。</p>
  </div>
  <div class="ka-art-src">
    <p>来源：<a href="https://claude.com/resources/articles/enterprise-guide-to-securing-coding-agents" target="_blank" rel="noopener">Anthropic《The enterprise guide to securing coding agents》</a>（六问框架与强弱答案对照）；Agent Skills 官方文档与 anthropics/skills 仓库安全提示（装前审查、恶意 Skill 风险）；Claude Code 沙箱文档与开源 <a href="https://www.npmjs.com/package/@anthropic-ai/sandbox-runtime" target="_blank" rel="noopener">@anthropic-ai/sandbox-runtime</a>（读/写/网络默认规则、子进程覆盖、fail-closed 拒启；84% 为官方内部口径、非独立测量）。</p>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/d3/skills/skill-runtime/" data-no-popover="true"><div class="kn">下一篇 →</div><div class="kt">Skill 是怎么跑起来的</div></a>
  </nav>
</div>
