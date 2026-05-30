import { defineConfig, devices } from '@playwright/test';

// Playwright 测试配置
export default defineConfig({
  // 测试目录
  testDir: './tests',

  // 每个测试的超时时间（毫秒）
  timeout: 30000,

  // 断言超时
  expect: {
    timeout: 5000,
  },

  // 测试运行配置
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // 报告器：终端列表 + HTML 报告
  reporter: [
    ['list'],  // 终端输出测试结果
    ['html', {
      outputFolder: 'playwright-report',  // 报告输出目录
      open: 'never',  // 不自动打开浏览器
    }],
  ],

  // 所有测试共享的设置
  use: {
    // 基础 URL，用于 page.goto 等相对路径
    baseURL: 'https://demo.playwright.dev',
    // 失败时收集 trace
    trace: 'on-first-retry',
    // 仅失败时截图
    screenshot: 'only-on-failure',
    // 失败时保留录屏
    video: 'retain-on-failure',
  },

  // 配置浏览器项目
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
