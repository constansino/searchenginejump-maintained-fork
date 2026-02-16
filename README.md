# searchEngineJump Maintained Fork / searchEngineJump 接手维护版

> **Project status / 项目状态 (2026-02-16):**
>
> - **中文：** 原项目在 Google 新版结果页上的定位问题长期缺乏稳定维护，这个交互思路本身很好，所以我接手维护此分支，优先保证“搜索后立刻可跳转”的体验。
> - **English:** The original project has not kept a stable maintenance pace for newer Google result-page anchoring changes. The interaction model is still excellent, so I am taking over maintenance in this fork with a focus on reliable jump-bar UX.

## Why This Plugin Is Useful / 这个插件为什么好用

### 1) Search once, compare everywhere / 一次搜索，多引擎对比
- **中文：** 在 Google、Bing、百度、DuckDuckGo 等页面内直接展示跳转栏，保留同一个关键词，无需重复输入。
- **English:** It injects a jump bar directly into Google, Bing, Baidu, DuckDuckGo, and other pages, preserving the same keyword so you do not retype queries.

### 2) Lower switching cost / 降低切换成本
- **中文：** 对比搜索结果时，通常每次能省去 3-5 次操作（复制关键词、打开新标签、粘贴、再搜索）。
- **English:** During result comparison, it typically saves 3-5 actions per switch (copy query, open tab, paste, search again).

### 3) Rule-driven and extensible / 规则驱动，可扩展
- **中文：** 脚本内置大量站点规则（当前测试脚本中约 86 条 `name` 规则），可按规则精细控制插入位置、关键词提取和样式。
- **English:** The script is rule-driven (about 86 `name` rule entries in the test script), allowing precise control of insertion target, keyword extraction, and style.

### 4) Better Google stability in this fork / 本分支强化了 Google 稳定性
- **中文：** 增加了针对 Google DOM 变化的挂载目标回退链，以及热修复脚本，减少跳转栏滚动后错位或消失。
- **English:** This fork adds fallback selectors for changing Google DOM anchors and a hotfix script to reduce toolbar drift/disappearance on scroll.

## Diagram A: User Value Flow / 图 A：用户价值流程

![User value flow / 用户价值流程](docs/images/value-flow.svg)

**中文解读：**
- 用户只输入一次关键词，随后通过跳转栏快速跨引擎对比。
- 结果更全面，尤其适合查证、比价、交叉验证信息来源。

**English interpretation:**
- Users type the keyword once, then switch engines quickly via the jump bar.
- Results become broader and easier to verify across multiple sources.

## Diagram B: Google Positioning Hotfix / 图 B：Google 定位热修复机制

![Google anchoring hotfix flow / Google 定位热修复流程](docs/images/google-hotfix-flow.svg)

**中文解读：**
- 通过 `MutationObserver` + `resize/scroll` 监听 + 定时兜底，持续检测并修正工具栏位置。
- 关键收益是浏览器无需重启，Google 页面结构变动时也能更快自恢复。

**English interpretation:**
- Uses `MutationObserver`, `resize/scroll` listeners, and periodic fallback checks to keep the toolbar aligned.
- Key benefit: no browser restart requirement, with faster self-recovery when Google layout changes.

## Repository Layout / 仓库结构

```text
scripts/
  searchEngineJump_google_anchor_test.user.js   # Maintained test copy with Google anchor improvements
  searchEngineJump_5.26.7_upstream.user.js      # Upstream baseline reference
  SEJ_Google_Position_Hotfix.user.js            # Lightweight Google-only hotfix

docs/images/
  value-flow.svg
  google-hotfix-flow.svg
```

## Which Script Should You Install? / 应该安装哪个脚本？

1. **Main maintained script / 主维护脚本**  
   `scripts/searchEngineJump_google_anchor_test.user.js`  
   - **中文：** 需要完整功能（多搜索站点 + 配置能力）时使用。  
   - **English:** Use this for full functionality (multi-site engine jumping + configuration behavior).

2. **Hotfix overlay / 热修复补丁**  
   `scripts/SEJ_Google_Position_Hotfix.user.js`  
   - **中文：** 仅需修复 Google 页面定位问题时可单独安装；也可叠加在已有 SEJ 脚本上。  
   - **English:** Install this alone for Google positioning fixes, or layer it on top of an existing SEJ install.

## Installation / 安装步骤

1. Install Tampermonkey (or compatible userscript manager). / 安装 Tampermonkey 或兼容脚本管理器。
2. Open one of the `.user.js` files in this repository. / 打开本仓库中的目标 `.user.js` 文件。
3. Click install and refresh search pages. / 点击安装并刷新搜索页面。
4. Verify the jump bar is anchored under the search box on Google result pages. / 在 Google 结果页确认跳转栏贴合搜索框下方。

## Maintenance Scope / 维护范围

- **中文：**
  - 优先处理 Google DOM 变化导致的挂载/定位问题。
  - 保持与主流搜索站点规则的可用性。
  - 尽量以增量热修方式修复，降低用户迁移成本。
- **English:**
  - Prioritize Google DOM-change resilience for mounting/alignment.
  - Keep major search-site rules usable.
  - Favor incremental hotfixes to minimize migration cost.

## Upstream Credit / 上游致谢

- Original project and contributors are credited in script headers.
- This fork is a maintenance continuation focused on practical UX reliability.
