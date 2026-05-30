# CLAUDE.md - Playwright 学习项目

## 项目简介
- 学习项目：Playwright 自动化测试
- 技术栈：TypeScript + Playwright (Node.js)
- 包管理器：npm

## 任务执行规则

1. 每次会话开始先读 WORKFLOW.md 和 STUDY_PLAN.md，了解当前进度
2. 每次只做一个任务，完成后将对应文件中的 [ ] 改为 [x]
3. 不确定时先问用户，不要擅自行动
4. 遇到报错先分析原因再修复，不要盲目重试

## 代码规范
- 测试文件：tests/
- Page Object：pages/
- 工具函数：utils/
- 配置文件：项目根目录
- 使用中文注释
- 所有提示和输出使用简体中文

## 新会话开场流程

1. 读取本文件（CLAUDE.md）
2. 读取 WORKFLOW.md，了解项目开发进度
3. 读取 STUDY_PLAN.md，了解学习进度
4. 告知用户当前状态，等待指示

## 禁止事项
- 不要跳过 WORKFLOW.md 中的任务顺序
- 不要在用户没要求时修改 CLAUDE.md
- 不要一次生成整个项目的代码

## 测试运行命令
```bash
npx playwright test                    # 运行所有测试
npx playwright test tests/smoke.spec.ts  # 运行单个测试文件
npx playwright test --debug            # 调试模式
npx playwright show-report             # 查看测试报告
```

## 项目结构

```
codex_playwright-learning/
├── tests/          # 测试文件
├── pages/          # Page Object 模式
├── utils/          # 工具函数
├── playwright.config.ts  # Playwright 配置
├── WORKFLOW.md     # 项目开发进度
├── STUDY_PLAN.md   # 学习计划进度
└── CLAUDE.md       # Claude Code 配置（本文件）
```
