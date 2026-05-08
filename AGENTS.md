# AGENTS.md - codex_playwright-learning

## 项目简介
- 学习项目：Playwright 自动化测试 + Codex 自然语言编程
- 技术栈：TypeScript + Playwright (Node.js)
- 包管理器：npm

## 任务执行规则（Codex 必须遵守）
1. 每次只做一个任务，不要一次生成多个功能
2. 每次会话开始先读 WORKFLOW.md，找到第一个 [ ] 任务，只执行那一个
3. 完成任务后，立即将 WORKFLOW.md 中对应项改为 [x]
4. 不确定时先问用户，不要擅自行动
5. 遇到报错先分析原因再修复，不要盲目重试

## 代码规范
- 测试文件放在 tests/ 目录
- Page Object 放在 pages/ 目录
- 工具函数放在 utils/ 目录
- 配置文件放项目根目录
- 使用中文注释
- 所有提示和输出使用简体中文

## 新会话开场流程
1. 读取本文件（AGENTS.md）
2. 读取 WORKFLOW.md，找到当前进度
3. 告知用户：上次停在第 N 个任务，是否继续？
4. 等用户确认后再行动

## 禁止事项
- 不要跳过 WORKFLOW.md 中的任务顺序
- 不要在用户没要求时修改 AGENTS.md
- 不要一次生成整个项目的代码
