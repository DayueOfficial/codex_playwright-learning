import { test, expect } from '@playwright/test';

// 数据驱动测试（参数化）
// 使用不同的测试数据运行相同的测试逻辑

// 测试数据
const todoItems = [
  { text: '学习 Playwright', expectedCount: 1 },
  { text: '学习 TypeScript', expectedCount: 2 },
  { text: '写自动化测试', expectedCount: 3 },
];

test.describe('数据驱动测试 - 添加多个 todo', () => {
  // 方式 1：使用 for 循环
  for (const item of todoItems) {
    test(`添加 todo: ${item.text}`, async ({ page }) => {
      await page.goto('/todomvc');
      await page.locator('.new-todo').fill(item.text);
      await page.keyboard.press('Enter');
      await expect(page.locator('.todo-list li')).toHaveCount(1);
    });
  }
});

// 方式 2：使用 test.describe 配合数组
const filterTestData = [
  { filter: 'All', expectedVisible: 3 },
  { filter: 'Active', expectedVisible: 2 },
  { filter: 'Completed', expectedVisible: 1 },
];

test.describe('数据驱动测试 - 筛选功能', () => {
  test.beforeEach(async ({ page }) => {
    // 准备测试数据：3 个 todo，完成 1 个
    await page.goto('/todomvc');
    for (const text of ['任务 1', '任务 2', '任务 3']) {
      await page.locator('.new-todo').fill(text);
      await page.keyboard.press('Enter');
    }
    // 完成第一个任务
    await page.locator('.todo-list li').first().locator('.toggle').click();
  });

  for (const data of filterTestData) {
    test(`筛选: ${data.filter} - 显示 ${data.expectedVisible} 项`, async ({ page }) => {
      await page.getByRole('link', { name: data.filter }).click();
      await expect(page.locator('.todo-list li')).toHaveCount(data.expectedVisible);
    });
  }
});

// 方式 3：使用参数化断言
const validationData = [
  { input: '', shouldPass: false, description: '空文本' },
  { input: '   ', shouldPass: false, description: '纯空格' },
  { input: '有效任务', shouldPass: true, description: '有效文本' },
];

test.describe('数据驱动测试 - 输入验证', () => {
  for (const data of validationData) {
    test(`输入验证: ${data.description}`, async ({ page }) => {
      await page.goto('/todomvc');
      await page.locator('.new-todo').fill(data.input);
      await page.keyboard.press('Enter');

      if (data.shouldPass) {
        await expect(page.locator('.todo-list li')).toHaveCount(1);
      } else {
        await expect(page.locator('.todo-list li')).toHaveCount(0);
      }
    });
  }
});
