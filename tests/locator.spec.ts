import { test, expect } from '@playwright/test';

// 定位器练习 - 基于 Playwright TodoMVC demo
test.describe('定位器练习', () => {
  test.beforeEach(async ({ page }) => {
    // 每个测试前访问 TodoMVC 页面
    await page.goto('/todomvc');
  });

  test('CSS 选择器定位', async ({ page }) => {
    // CSS 选择器：定位输入框
    const input = page.locator('.new-todo');
    await expect(input).toBeVisible();

    // CSS 选择器：定位标题
    const heading = page.locator('h1');
    await expect(heading).toHaveText('todos');
  });

  test('Text 选择器定位', async ({ page }) => {
    // 按文本内容定位标题
    const heading = page.getByText('todos');
    await expect(heading).toBeVisible();
  });

  test('Role 选择器定位', async ({ page }) => {
    // 按 ARIA role 定位输入框（textbox）
    const input = page.getByPlaceholder('What needs to be done?');
    await expect(input).toBeVisible();
  });

  test('添加 todo 项并用选择器验证', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');

    // 添加第一个 todo
    await input.fill('学习 Playwright');
    await input.press('Enter');

    // 添加第二个 todo
    await input.fill('练习定位器');
    await input.press('Enter');

    // CSS 选择器：定位 todo 列表中的所有项
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(2);

    // 文本断言：验证每项的内容
    await expect(todoItems.nth(0)).toHaveText('学习 Playwright');
    await expect(todoItems.nth(1)).toHaveText('练习定位器');
  });
});
