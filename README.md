# Playwright 学习项目

从零开始学习 Playwright 自动化测试的完整项目，包含代码示例、学习计划和最佳实践。

## 项目简介

这是一个 Playwright 学习项目，通过实际代码演示如何使用 Playwright 进行 Web 自动化测试。

**技术栈：**
- TypeScript
- Playwright
- Node.js

**学习目标：**
- 掌握 Playwright 核心 API
- 理解 Page Object 模式
- 学会数据驱动测试
- 掌握 CI/CD 集成

## 项目结构

```
codex_playwright-learning/
├── tests/                    # 测试文件
│   ├── smoke.spec.ts         # 冒烟测试
│   ├── locator.spec.ts       # 定位器练习
│   ├── assertion.spec.ts     # 断言练习
│   ├── form.spec.ts          # 表单交互
│   ├── multi-tab.spec.ts     # 多标签页/弹窗
│   ├── network.spec.ts       # 网络拦截
│   ├── file.spec.ts          # 文件上传下载
│   ├── waiting.spec.ts       # 动态等待
│   ├── data-driven.spec.ts   # 数据驱动测试
│   └── failure-artifacts.spec.ts  # 失败截图录屏
├── pages/                    # Page Object 模式
│   ├── BasePage.ts           # 基础页面类
│   └── TodoPage.ts           # Todo 页面对象
├── playwright.config.ts      # Playwright 配置
├── .github/workflows/        # CI/CD 配置
│   └── playwright.yml        # GitHub Actions
├── WORKFLOW.md               # 项目开发进度
├── STUDY_PLAN.md             # 学习计划
└── CLAUDE.md                 # Claude Code 配置
```

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/DayueOfficial/codex_playwright-learning.git
cd codex_playwright-learning
```

### 2. 安装依赖

```bash
npm install
```

### 3. 安装浏览器

```bash
npx playwright install
```

### 4. 运行测试

```bash
# 运行所有测试
npx playwright test

# 运行单个测试文件
npx playwright test tests/smoke.spec.ts

# 调试模式
npx playwright test --debug

# 查看测试报告
npx playwright show-report
```

## 学习路径

### 阶段一：基础搭建
- 配置 Playwright
- 编写第一个测试
- 运行和调试

### 阶段二：核心技能
- 定位器（CSS/Text/Role）
- 断言（toBeVisible/toHaveText/toHaveURL）
- 表单交互（fill/click/submit）
- Page Object 模式

### 阶段三：进阶场景
- 多标签页和弹窗处理
- 网络拦截（API Mock）
- 文件上传下载
- 动态等待策略
- 失败时截图和录屏

### 阶段四：工程化
- 多浏览器配置
- HTML 测试报告
- 数据驱动测试
- CI/CD 集成

## 配置说明

### playwright.config.ts

```typescript
export default defineConfig({
  // 测试目录
  testDir: './tests',

  // 超时设置
  timeout: 30000,
  expect: { timeout: 5000 },

  // 并行执行
  fullyParallel: true,

  // 报告器
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
  ],

  // 浏览器配置
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  // 全局设置
  use: {
    baseURL: 'https://demo.playwright.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

## 示例代码

### 基本测试

```typescript
import { test, expect } from '@playwright/test';

test('页面标题包含 TodoMVC', async ({ page }) => {
  await page.goto('/todomvc');
  await expect(page).toHaveTitle(/TodoMVC/);
});
```

### Page Object 模式

```typescript
// pages/TodoPage.ts
export class TodoPage extends BasePage {
  readonly input = this.page.locator('.new-todo');
  readonly todoList = this.page.locator('.todo-list li');

  async addTodo(text: string) {
    await this.input.fill(text);
    await this.input.press('Enter');
  }
}

// tests/form.spec.ts
test('添加 todo', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();
  await todoPage.addTodo('学习 Playwright');
  await expect(todoPage.todoList).toHaveCount(1);
});
```

### 数据驱动测试

```typescript
const testData = [
  { input: '', expected: 0 },
  { input: '任务1', expected: 1 },
];

for (const data of testData) {
  test(`输入: ${data.input}`, async ({ page }) => {
    await page.goto('/todomvc');
    await page.locator('.new-todo').fill(data.input);
    await page.keyboard.press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(data.expected);
  });
}
```

## 学习资源

- [Playwright 官方文档](https://playwright.dev/docs/intro)
- [Playwright GitHub](https://github.com/microsoft/playwright)
- [Playwright Test Examples](https://github.com/microsoft/playwright/tree/main/tests)

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
