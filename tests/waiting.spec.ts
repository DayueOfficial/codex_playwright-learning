import { test, expect } from '@playwright/test';

// 动态等待策略
test.describe('动态等待策略', () => {

  test('waitForSelector - 等待元素出现', async ({ page }) => {
    await page.goto('/todomvc');

    // 延迟插入元素
    await page.evaluate(() => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.id = 'dynamic';
        div.textContent = '动态加载的内容';
        document.body.appendChild(div);
      }, 500);
    });

    // waitForSelector 会持续轮询直到元素出现
    const el = await page.waitForSelector('#dynamic');
    expect(el).not.toBeNull();

    const text = await el!.textContent();
    expect(text).toBe('动态加载的内容');
  });

  test('waitForLoadState - 等待页面加载状态', async ({ page }) => {
    await page.goto('/todomvc');

    // waitForLoadState 等待 domcontentloaded 或 load
    await page.waitForLoadState('domcontentloaded');

    // 验证页面标题已加载
    await expect(page.locator('h1')).toBeVisible();
  });

  test('waitForFunction - 等待 JS 表达式为真', async ({ page }) => {
    await page.goto('/todomvc');

    // 动态修改标题文本
    await page.evaluate(() => {
      setTimeout(() => {
        document.title = '页面已准备好';
      }, 300);
    });

    // waitForFunction 持续轮询直到返回值为 truthy
    await page.waitForFunction(() => document.title === '页面已准备好');

    await expect(page).toHaveTitle('页面已准备好');
  });

  test('waitForResponse - 等待特定网络响应', async ({ page }) => {
    await page.goto('/todomvc');

    // 用 route mock 一个 API
    await page.route('**/api/status', (route) => {
      // 模拟延迟响应
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'ok', timestamp: Date.now() }),
        });
      }, 300);
    });

    // 发起请求并等待响应
    const [response] = await Promise.all([
      page.waitForResponse('**/api/status'),
      page.evaluate(() => fetch('/api/status')),
    ]);

    // 验证响应状态和内容
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('ok');
  });

  test('locator 自动等待 - toBeVisible', async ({ page }) => {
    await page.goto('/todomvc');

    // 延迟显示元素
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.id = 'delayed';
      div.textContent = '稍后出现';
      div.style.display = 'none';
      document.body.appendChild(div);

      setTimeout(() => {
        div.style.display = 'block';
      }, 300);
    });

    // Playwright 的 locator 断言自带等待，不需要手动 waitFor
    await expect(page.locator('#delayed')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('#delayed')).toHaveText('稍后出现');
  });

  test('避免 waitForTimeout 硬等待', async ({ page }) => {
    await page.goto('/todomvc');

    // 反面教材：硬等待（不推荐，仅在特殊情况下使用）
    await page.waitForTimeout(100);

    // 推荐做法：用 locator 自动等待
    await expect(page.locator('h1')).toBeVisible();
  });
});