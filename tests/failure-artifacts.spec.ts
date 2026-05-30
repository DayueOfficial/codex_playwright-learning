import { test, expect } from '@playwright/test';

// 失败时截图和录屏演示
// 运行此测试文件：npx playwright test tests/failure-artifacts.spec.ts

test.describe('失败时截图和录屏', () => {
  test('手动截图 - 保存当前页面状态', async ({ page }) => {
    await page.goto('/todomvc');
    await page.locator('.new-todo').fill('学习 Playwright 截图');
    await page.keyboard.press('Enter');

    // 手动截图，保存到指定路径
    await page.screenshot({
      path: 'test-results/manual-screenshot.png',
      fullPage: true,
    });

    // 验证 todo 已添加
    await expect(page.locator('.todo-list li')).toHaveCount(1);
  });

  test('故意失败 - 演示自动截图', async ({ page }) => {
    await page.goto('/todomvc');
    await page.locator('.new-todo').fill('这个测试会失败');
    await page.keyboard.press('Enter');

    // 故意断言错误，触发失败截图
    // 配置了 screenshot: 'only-on-failure'，失败时自动截图
    await expect(page.locator('.todo-list li')).toHaveCount(999);
  });

  test('元素截图 - 只截取特定元素', async ({ page }) => {
    await page.goto('/todomvc');
    await page.locator('.new-todo').fill('元素截图示例');
    await page.keyboard.press('Enter');

    // 截取特定元素
    const todoItem = page.locator('.todo-list li').first();
    await todoItem.screenshot({
      path: 'test-results/element-screenshot.png',
    });

    await expect(todoItem).toBeVisible();
  });
});
