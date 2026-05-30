import { test, expect } from '@playwright/test';

// 断言练习 - toBeVisible / toHaveText / toHaveURL
test.describe('断言练习', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todomvc');
  });

  test('toBeVisible - 元素可见性断言', async ({ page }) => {
    // 输入框应该可见
    const input = page.getByPlaceholder('What needs to be done?');
    await expect(input).toBeVisible();

    // 标题应该可见
    await expect(page.locator('h1')).toBeVisible();
  });

  test('toHaveText - 文本内容断言', async ({ page }) => {
    // 标题文本
    await expect(page.locator('h1')).toHaveText('todos');

    // 添加 todo 后验证列表项文本
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('学习断言');
    await input.press('Enter');
    await input.fill('掌握 toHaveText');
    await input.press('Enter');

    const items = page.locator('.todo-list li');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toHaveText('学习断言');
    await expect(items.nth(1)).toHaveText('掌握 toHaveText');
  });

  test('toHaveURL - URL 断言', async ({ page }) => {
    // 验证当前 URL 包含 todomvc 路径
    await expect(page).toHaveURL(/todomvc/);
  });

  test('组合断言 - 添加并完成 todo', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');

    // 添加一个 todo
    await input.fill('完成断言练习');
    await input.press('Enter');

    // 验证项可见
    const item = page.locator('.todo-list li').first();
    await expect(item).toBeVisible();
    await expect(item).toHaveText('完成断言练习');

    // 点击复选框标记为完成
    await item.locator('.toggle').check();

    // 验证该项被标记为 completed（CSS class）
    await expect(item).toHaveClass('completed');
  });
});
