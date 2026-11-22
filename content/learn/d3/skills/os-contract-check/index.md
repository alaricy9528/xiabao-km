---
title: 换台机器就跑不通 · Skill 的环境契约
publish: true
description: D3-06 Skills 与能力封装 · 判断卡：Skill 换一台机器就失败时，怎么分清是 Skill 里写死的环境假设，还是模型/任务本身的问题。
---

<div class="ai-learn ka-view ka-view--card">
  <div class="ka-kp-crumb"><span>知识星图</span> / <span>D3 智能体工程</span> / <span>Skills 与能力封装</span> / 判断卡 03</div>
  <div class="ka-card-head">
    <div class="tagrow">
      <span class="ka-tag" style="--ka-dc: var(--ka-green)">D3-06 · 试点主题</span>
      <span class="ka-tag plain">判断卡 03 / 03</span>
      <span class="ka-tag plain">更新 2026-11-22</span>
    </div>
    <h1>换台机器就跑不通</h1>
    <p class="ka-card-question">一个在自己电脑上跑通的 Skill，换台机器就失败，怎么判断是 Skill 的问题还是环境的问题？</p>
  </div>
  <div class="ka-card-conclusion"><span class="clabel">结论</span><p>先查 Skill 里<em>写死的环境假设</em>——命令写法、脚本依赖、平台声明、安装方式，确认了再花一次动态复验。顺序反了，每次失败都要付一整轮执行才知道原因，而且大概率把环境问题记成模型能力问题。</p></div>
  <div class="ka-card-grid">
    <div class="ka-card-main">
      <section class="ka-card-sec">
        <h2><span>01</span> 证据与复验</h2>
        <ul class="ka-evidence">
          <li><b>资料支持</b>：SkillBridge（arXiv 2611.26256，北大高可信软件技术重点实验室 × 西北工大 × 中关村学院，2026-11-19 提交，ICSE 2027 录用）指出 OS 假设分散在五处：guide 里让 agent 跑 <code>./script.sh</code>、脚本依赖 AppleScript 或 Windows COM、metadata 的平台声明、安装契约只写 Homebrew 或 apt、本地入口点缺失；扫了 1,090 个 skill 在 Linux/macOS/Windows 上的 3,270 个用例。</li>
          <li><b>资料支持</b>：同一篇论文的预算账——先静态筛证据、再挑少量用例动态验证，拿到 38 个确认的 OS 问题用了 185 次动态验证，均匀随机选要约 865 次；把出错的那个契约字段修好，评审判定的目标任务通过率从 30.6% 升到 38.4%。</li>
          <li><b>设计判断</b>：给 Skill 加的最小验收集——一行「运行环境」（OS / 解释器版本 / 路径写法 / 依赖怎么装）、一条 30 秒能跑完的冒烟命令、一条已知会失败的样本。这是按上面的契约字段推的落地做法，不是论文结论。</li>
        </ul>
        <p class="ka-card-note">复验方式：拿自己手上的 Skill 按五个契约字段逐条自查（guide 命令写法、脚本依赖、metadata 平台声明、安装契约、入口点），再换一台不同 OS / 不同解释器的机器跑冒烟命令；两次结论不一致，就应该先改契约而不是改提示词。</p>
      </section>
      <section class="ka-card-sec">
        <h2><span>02</span> 边界与行动</h2>
        <p>只治运行环境这一层。凭证缺失、服务不可用、基准夹具缺失、agent 自己规划错，这四类失败长得一模一样，得先排除再谈契约。修完能跑也不等于可复用——论文里修完契约的通过率仍只有 38.4%。行动上：给跨机器跑的 Skill（统一待办、钉钉文档导出这类）在 SKILL.md 顶部加「运行环境」一节与冒烟命令，把「换个环境复跑一次」写进上线验收，而不是等别人报错才发现。</p>
      </section>
    </div>
    <aside class="ka-card-aside">
      <div class="ka-aside-card">
        <h5>卡片状态</h5>
        <div class="ka-meta-row"><span>发布状态</span><b class="st-live">已上线</b></div>
        <div class="ka-meta-row"><span>复核触发</span><b>换机器/换解释器复跑</b></div>
        <div class="ka-meta-row"><span>updated_at</span><b>2026-11-22</b></div>
      </div>
      <div class="ka-aside-card">
        <h5>关联主题</h5>
        <a class="ka-rel-link" href="learn/d3/skills/" data-no-popover="true">D3-06 Skills 与能力封装</a>
        <a class="ka-rel-link" href="learn/d3/" data-no-popover="true">D3-02 智能体运行时 · 延伸</a>
        <a class="ka-rel-link" href="learn/d5/" data-no-popover="true">D5-06 运行风险与事件响应 · 风险</a>
      </div>
      <div class="ka-aside-card">
        <h5>对我工作的意义</h5>
        <p class="ka-implication">统一待办、钉钉导出这类 Skill 迟早要在别人的 Windows 和服务器上跑；把「运行环境 + 冒烟命令」写进 SKILL.md，比事后改提示词省事得多。</p>
      </div>
    </aside>
  </div>
  <nav class="ka-kp-nav">
    <a class="prev" href="learn/d3/skills/" data-no-popover="true"><div class="kn">← 返回主题</div><div class="kt">Skills 与能力封装</div></a>
    <a class="next" href="learn/" data-no-popover="true"><div class="kn">回到总览 →</div><div class="kt">知识星图</div></a>
  </nav>
</div>
