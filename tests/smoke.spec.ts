import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

// 冒烟测试 - 使用 Page Object 重构
test('页面标题包含 TodoMVC', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // 打开 TodoMVC 页面
  await todoPage.open();

  // 验证页面标题
  await expect(page).toHaveTitle(/TodoMVC/);

  // 验证页面关键元素可见
  await expect(todoPage.heading).toBeVisible();
  await expect(todoPage.input).toBeVisible();
});
