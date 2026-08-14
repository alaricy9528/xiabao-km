---
title: Quartz v5 + GitHub Pages 执行方案
type: project
status: evergreen
aliases:
  - Obsidian 公网发布方案
  - Quartz 知识库发布方案
  - Codex 部署 Quartz 方案
tags:
  - Obsidian
  - Quartz
  - GitHub-Pages
  - 知识库发布
created: 2026-08-11
updated: 2026-08-14
publish: true
---

# Quartz v5 + GitHub Pages 执行方案

## 1. 目标

把 Obsidian 中明确允许公开的笔记构建成静态 HTML，并通过 GitHub Pages 提供外网访问。

推荐链路：

```text
Obsidian/Public
      ↓
Quartz Syncer（首次可由 Codex 人工同步验证）
      ↓
Quartz v5 仓库的 content/
      ↓
GitHub v5 分支
      ↓
GitHub Actions 自动构建
      ↓
GitHub Pages 公网访问
```

> [!important]
> Codex 负责首次搭建、配置、验证和上线，WorkBuddy 继续负责日常协助整理 Obsidian。两者都不充当公网服务器。禁止通过路由器端口映射、临时隧道或直接暴露 `npx quartz build --serve` 的 8080 预览服务实现公网访问。

## 2. 推荐结论

- Obsidian 是唯一内容源。
- Vault 中建立独立的 `Public/` 公开区。
- 只有明确标记 `publish: true` 的笔记可以发布。
- Quartz v5 负责把 Markdown 构建为 HTML、CSS 和 JavaScript。
- GitHub Actions 负责云端构建。
- GitHub Pages 负责公网托管。
- GitHub 仓库中的 `content/` 只是公开发布副本，不作为第二个 Vault 使用。
- Codex 负责首次部署和故障处理；WorkBuddy 不需要接管 Quartz 仓库，也不会因此影响日常 Obsidian 使用。
- 部署完成后，Quartz Syncer 负责常规发布，避免 Codex 和 WorkBuddy 同时操作同一篇笔记。

### 工具分工

| 工具 | 职责 | 不承担的职责 |
|---|---|---|
| Codex | 首次搭建、配置、构建、GitHub Actions、Pages 验收、故障处理 | 不长期占用 Obsidian，不保存 Token |
| WorkBuddy | 日常整理、编辑和辅助管理 Obsidian 笔记 | 不直接维护 Quartz 框架和部署工作流 |
| Quartz Syncer | 把 `Public/` 中批准的笔记单向发布到 Quartz 仓库 | 不作为双向同步或备份工具 |
| GitHub Pages | 托管 Quartz 构建出的静态 HTML | 不读取本地私密 Vault |

## 3. 环境要求

| 组件 | 建议要求 |
|---|---|
| Node.js | ≥ 22 |
| npm | ≥ 10.9.2 |
| Git | 可用 |
| Obsidian | 使用 Quartz Syncer 时建议 ≥ 1.13.0 |
| GitHub CLI | 推荐安装，亦可使用 Git + GitHub 网页 |

Node.js 与 npm 的安装位置由本机环境决定，例如：

```text
<Node.js 安装目录>
```

Quartz 项目建议放在：

```text
<项目根目录>\quartz-knowledge
```

## 4. 执行前需要确定的参数

```powershell
$GitHubUser = '<GitHub 用户名>'
$RepoName = 'quartz-knowledge'
$ProjectRoot = "<项目根目录>\$RepoName"
$BaseUrl = "$GitHubUser.github.io/$RepoName"
```

还需要确定：

- GitHub 用户名；
- 仓库名称；
- 是否使用 GitHub Pages 默认域名；
- 网站标题；
- Obsidian Vault 的绝对路径；
- 是否安装 Quartz Syncer，还是首次先由 Codex 手动同步两篇测试笔记。

首发建议使用 GitHub Pages 默认域名，自定义域名等链路稳定后再配置。

## 5. 阶段一：准备 Obsidian 公开区

在 Vault 中建立：

```text
Public/
├── index.md
├── 发布链路测试.md
└── attachments/
```

公开笔记使用以下属性：

```yaml
---
title: 我的数字花园
publish: true
---
```

### 禁止进入公开区的内容

- 日记、任务、客户资料、账号资料；
- `.obsidian/`；
- 模板、脚本和插件配置；
- 未确认公开的附件；
- API Key、Token、密码或个人身份信息；
- 本机绝对路径；
- 只在内部有效的 frontmatter 字段。

## 6. 阶段二：创建 GitHub Quartz 仓库

1. 在 GitHub 使用官方 `jackyzha0/quartz` 模板创建仓库。
2. 仓库名称建议使用 `quartz-knowledge`。
3. 勾选 **Include all branches**。
4. 确认仓库包含 `v5` 分支。
5. 首次搭建建议使用公开仓库。
6. 创建远程仓库前，由用户确认仓库名称和公开状态。

## 7. 阶段三：本地初始化 Quartz v5

由 Codex 执行：

```powershell
$GitHubUser = '<GitHub 用户名>'
$RepoName = 'quartz-knowledge'
$ProjectRoot = "<项目根目录>\$RepoName"

if (Test-Path -LiteralPath $ProjectRoot) {
    throw "目标目录已存在，禁止直接覆盖：$ProjectRoot"
}

git clone "https://github.com/$GitHubUser/$RepoName.git" $ProjectRoot
Set-Location -LiteralPath $ProjectRoot
git switch v5

$upstream = git remote get-url upstream 2>$null
if (-not $upstream) {
    git remote add upstream https://github.com/jackyzha0/quartz.git
} elseif ($upstream -ne 'https://github.com/jackyzha0/quartz.git') {
    throw "upstream 指向意外地址，请人工检查：$upstream"
}

npm ci

npx quartz create `
  --template obsidian `
  --strategy new `
  --baseUrl "$GitHubUser.github.io/$RepoName"

npx quartz plugin install --from-config
npx quartz build
```

### 初始化验收

必须存在：

```text
quartz.config.yaml
quartz.lock.json
content/
public/
```

检查：

```powershell
git status --short
git remote -v
npx quartz build
```

确认：

- 当前分支是 `v5`；
- `upstream` 指向官方 Quartz；
- 使用 `quartz.config.yaml`，不是 Quartz v4 的 TypeScript 配置；
- 插件安装成功；
- 构建输出目录为 `public/`；
- 仓库中没有 Vault 私密目录和 Token。

## 8. 阶段四：本地预览

```powershell
Set-Location -LiteralPath $ProjectRoot
npx quartz build --serve
```

本机访问：

```text
http://localhost:8080
```

检查：

- 首页可以打开；
- 中文标题和正文正常；
- 内部链接正常；
- 图片和附件正常；
- 桌面端没有明显破版；
- 手机窄屏下菜单和正文可用；
- 页面中没有私密路径或 Token。

完成检查后停止本地预览服务。

## 9. 阶段五：配置 GitHub Pages

在仓库中创建：

```text
.github/workflows/deploy.yml
```

内容：

```yaml
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - v5
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v6
        with:
          node-version: 24

      - name: Cache npm
        uses: actions/cache@v5
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

      - name: Cache Quartz plugins
        uses: actions/cache@v5
        with:
          path: .quartz/plugins
          key: ${{ runner.os }}-plugins-${{ hashFiles('quartz.lock.json') }}

      - name: Install dependencies
        run: npm ci

      - name: Install Quartz plugins
        run: npx quartz plugin install

      - name: Build Quartz
        run: npx quartz build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

进入 GitHub 仓库：

```text
Settings → Pages → Source → GitHub Actions
```

## 10. 阶段六：接入 Obsidian 内容

### 方案 A：Quartz Syncer（推荐）

使用前把 Obsidian 升级到 1.13.0 或更高版本。

Quartz Syncer 设置：

| 设置 | 值 |
|---|---|
| Vault root folder name | `Public` |
| Remote URL | `https://github.com/<用户名>/quartz-knowledge.git` |
| Branch | `v5` |
| Provider | GitHub |
| Authentication | Username & Token/Password |

GitHub Token 使用 fine-grained personal access token：

- 只授权 `quartz-knowledge` 仓库；
- Repository permissions → Contents → Read and write；
- 设置合理到期时间；
- Token 只由用户亲自在 Quartz Syncer 设置界面输入；
- 禁止把 Token 发给 Codex 或 WorkBuddy，也不得写入脚本、终端日志或仓库。

### 方案 B：Codex 首次手动同步

如果暂时不安装 Syncer：

1. Codex 只读取用户指定的 `Public/`；
2. 展示准备复制的文件清单；
3. 用户确认后复制到 Quartz 的 `content/`；
4. 不使用未审阅的整库镜像；
5. 不自动删除远端已有内容；
6. 复制后执行本地构建并检查差异。

此方式只用于首次验证或 Syncer 尚未就绪时；长期维护优先选择方案 A，避免 Codex 成为日常发布的必需依赖。

## 11. 阶段七：最小化首发

首发只发布两篇无敏感信息的笔记：

```text
Public/index.md
Public/发布链路测试.md
```

`Public/index.md` 示例：

```markdown
---
title: 我的数字花园
publish: true
---

# 我的数字花园

这里是公开知识库的首页。
```

`Public/发布链路测试.md` 示例：

```markdown
---
title: 发布链路测试
publish: true
---

# 发布链路测试

如果你能看到这段文字，说明 Obsidian → Quartz → GitHub Pages 发布链路正常。
```

提交前执行：

```powershell
Set-Location -LiteralPath $ProjectRoot

npx quartz plugin install
npx quartz build

git status --short
git diff --check

git add quartz.config.yaml quartz.lock.json .github/workflows/deploy.yml content
git diff --cached --stat
git diff --cached
```

确认暂存内容没有隐私信息后：

```powershell
git commit -m "Initialize Quartz v5 site"
git push origin v5
```

> [!warning]
> `git push` 会修改远程仓库并触发公网部署。Codex 必须在执行前展示文件清单、构建结果和目标分支，并获得用户确认。

## 12. 阶段八：公网验收

等待 GitHub Actions 构建成功，访问：

```text
https://<GitHub用户名>.github.io/quartz-knowledge/
```

验收清单：

- [ ] GitHub Actions 最新构建为绿色；
- [ ] 首页可以访问；
- [ ] 发布链路测试笔记可以访问；
- [ ] 内部链接正确；
- [ ] 图片和附件正常；
- [ ] 手机窄屏可用；
- [ ] 仓库只包含批准公开的内容；
- [ ] 页面、仓库和 Actions 日志中没有 Token；
- [ ] 没有 `.obsidian/`；
- [ ] 没有本机 Vault 绝对路径；
- [ ] `baseUrl` 与实际网址一致。

全部通过后，首发才算完成。

## 13. 日常发布流程

### 使用 Quartz Syncer

```powershell
obsidian quartz-syncer:status format=json
obsidian quartz-syncer:publish dry-run format=json
```

确认预览结果后：

```powershell
obsidian quartz-syncer:publish
```

不允许默认执行：

```powershell
obsidian quartz-syncer:sync force
obsidian quartz-syncer:delete force
```

删除或完整同步必须先 dry-run，并单独确认。

### 手动发布

```powershell
Set-Location -LiteralPath $ProjectRoot
npx quartz plugin install
npx quartz build
git status --short
git add content quartz.config.yaml quartz.lock.json
git diff --cached
git commit -m "Publish knowledge updates"
git push origin v5
```

## 14. 回滚方案

### 本地初始化失败

- 保留错误信息；
- 核对绝对路径；
- 把失败目录重命名为带时间戳的备份；
- 不递归删除或覆盖未知目录；
- 从官方模板重新开始。

### 错误内容已经发布

- 先在 Syncer Publication Center 取消发布，或准备一个 Git revert；
- 查看删除清单；
- 用户确认后再移除远端内容；
- 不删除 Obsidian 原稿。

### 构建失败

- 停止继续推送；
- 检查 GitHub Actions 日志；
- 本地重新执行 `npm ci`、插件安装和构建；
- 修复或回退最近一次配置提交。

### Token 疑似泄露

- 立即在 GitHub 撤销 Token；
- 检查仓库提交历史和 Actions 日志；
- 创建权限更小的新 Token；
- 不复用旧 Token。

### 网站紧急下线

- 在 GitHub Pages 设置中禁用发布；
- 再处理错误内容；
- 如果配置了自定义域名，再移除 DNS 指向。

## 15. Codex 部署规则

Codex 执行部署时遵循以下规则：

1. 先只读检查实际版本、路径、分支和仓库状态。
2. 不扫描整个 Vault，只处理用户指定的 `Public/`。
3. 不读取或输出 Token。
4. 建仓库、安装软件、push、公开 Pages、删除、强制同步、升级和 DNS 修改前暂停确认。
5. 所有删除操作先 dry-run。
6. 首发只处理两篇测试笔记。
7. 每阶段报告实际命令结果、修改文件、外部状态变化、风险和下一步。
8. 如果实际状态与方案不一致，停止并报告，不猜测、不覆盖。
9. Codex 只在首次部署、升级和故障处理时直接操作 Quartz 仓库；日常笔记编辑仍由 Obsidian 和 WorkBuddy 完成。
10. Codex 与 Quartz Syncer 不同时发布同一批内容；开始操作前先检查仓库状态，结束后记录提交和公开 URL。

### Codex 可以直接执行

- 读取本机版本和路径；
- 在 `<项目根目录>\quartz-knowledge` 创建和修改 Quartz 项目；
- 生成 `quartz.config.yaml`、锁文件和 GitHub Actions 工作流；
- 运行依赖安装、本地构建和 8080 预览；
- 检查 Git 差异、敏感信息和构建产物；
- 在用户指定的 `Public/` 中创建两篇无敏感信息的测试笔记。

### Codex 必须停下来确认

- 创建或公开 GitHub 仓库；
- 安装或升级 Obsidian；
- 首次 `git push`；
- 开启 GitHub Pages；
- 远端删除、强制同步或回退；
- 自定义域名和 DNS 修改；
- 任何需要用户输入 Token、验证码或登录凭据的步骤。

### 部署完成后的稳定状态

```text
WorkBuddy / Obsidian：日常编辑
Quartz Syncer：按需发布 Public/
Codex：升级、排错、配置变更
GitHub Actions：自动构建
GitHub Pages：公网托管
```

## 16. 官方参考

- [Quartz v5 Getting Started](https://quartz.jzhao.xyz/getting-started/)
- [Quartz Hosting](https://quartz.jzhao.xyz/hosting)
- [Quartz Syncer Setup Guide](https://saberzero1.github.io/quartz-syncer-docs/setup-guide)
- [Quartz Syncer GitHub Setup](https://saberzero1.github.io/quartz-syncer-docs/guides/github-setup)
- [Quartz Syncer Usage Guide](https://saberzero1.github.io/quartz-syncer-docs/usage-guide)
- [Configure a specific Vault folder](https://saberzero1.github.io/quartz-syncer-docs/guides/configuring-a-specific-folder-for-quartz-content)
