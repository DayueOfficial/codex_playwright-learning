import { test, expect } from '@playwright/test';

// 网络拦截与 API Mock
test.describe('网络拦截练习', () => {
  test.beforeEach(async ({ page }) => {
    // 先导航到真实页面，获得 origin，这样 fetch 才能用相对路径
    await page.goto('/todomvc');
  });

  test('拦截请求并 mock 响应', async ({ page }) => {
    // 拦截 /api/data 请求，返回自定义数据
    await page.route('**/api/data', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: '这是 mock 的数据', count: 42 }),
      });
    });

    // 发起 fetch 请求
    await page.evaluate(async () => {
      const res = await fetch('/api/data');
      const data = await res.json();
      document.title = data.message + ' count=' + data.count;
    });

    // 验证页面标题被设为 mock 数据
    await expect(page).toHaveTitle(/这是 mock 的数据 count=42/);
  });

  test('拦截请求并修改请求头', async ({ page }) => {
    const capturedHeaders: string[] = [];

    // 拦截请求并捕获自定义请求头
    await page.route('**/api/test', (route, request) => {
      capturedHeaders.push(request.headers()['x-custom'] || 'not-set');
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    // 发起带自定义请求头的请求
    await page.evaluate(async () => {
      await fetch('/api/test', {
        headers: { 'x-custom': 'playwright-test' },
      });
    });

    // 验证请求头被正确传递
    expect(capturedHeaders[0]).toBe('playwright-test');
  });

  test('拦截请求并返回错误码', async ({ page }) => {
    // 拦截请求并返回 403 错误
    await page.route('**/api/forbidden', (route) => {
      route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Forbidden' }),
      });
    });

    // 发起请求并验证返回 403
    const status = await page.evaluate(async () => {
      const res = await fetch('/api/forbidden');
      return res.status;
    });

    expect(status).toBe(403);
  });

  test('拦截请求并中止请求', async ({ page }) => {
    // 拦截图片请求并中止
    await page.route('**/*.png', (route) => route.abort());

    // 记录失败的请求数
    const failedUrls: string[] = [];
    page.on('requestfailed', (request) => {
      failedUrls.push(request.url());
    });

    // 设置包含图片的页面
    await page.setContent('<img src="https://example.com/image.png" />');
    await page.waitForTimeout(1000);

    // 验证图片请求被中止了
    expect(failedUrls.some((url) => url.includes('image.png'))).toBeTruthy();
  });

  test('等待特定网络请求完成', async ({ page }) => {
    // mock 用户列表 API
    await page.route('**/api/users', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: '张三' },
          { id: 2, name: '李四' },
        ]),
      });
    });

    // 发起请求并验证数据
    const names = await page.evaluate(async () => {
      const res = await fetch('/api/users');
      const users = await res.json();
      return users.map((u: { name: string }) => u.name).join(', ');
    });

    expect(names).toBe('张三, 李四');
  });
});