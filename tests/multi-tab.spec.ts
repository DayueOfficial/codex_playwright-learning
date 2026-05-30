import { test, expect } from '@playwright/test';

// 多标签页 / 弹窗处理
test.describe('多标签页和弹窗处理', () => {

  test('监听新标签页事件 (popup)', async ({ page }) => {
    // 设置包含 target=_blank 的链接
    await page.setContent('<a href="https://example.com" target="_blank">打开新标签页</a>');
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: '打开新标签页' }).click();
    const popup = await popupPromise;
    await popup.waitForLoadState();

    // 验证新标签页的 URL
    await expect(popup).toHaveURL(/example.com/);
  });

  test('处理 confirm 弹窗 - accept', async ({ page }) => {
    // 注册 dialog 处理器，自动接受
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('确定吗?');
      await dialog.accept();
    });

    // 触发 confirm
    await page.setContent('<button>确认</button>');
    await page.evaluate(() => {
      document.querySelector('button')!.addEventListener('click', () => { confirm('确定吗?'); });
    });
    await page.getByRole('button', { name: '确认' }).click();
  });

  test('处理 alert 弹窗', async ({ page }) => {
    // 捕获 alert
    let alertMessage = '';
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // 触发 alert
    await page.setContent('<button>告警</button>');
    await page.evaluate(() => {
      document.querySelector('button')!.addEventListener('click', () => { alert('这是一个警告'); });
    });
    await page.getByRole('button', { name: '告警' }).click();

    // 验证捕获到了正确的 alert 消息
    expect(alertMessage).toBe('这是一个警告');
  });

  test('处理 confirm 弹窗 - dismiss 取消', async ({ page }) => {
    // 注册 dialog 处理器，点击取消
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });

    // 触发 confirm 并获取结果
    await page.setContent('<button>确认</button><div id="result"></div>');
    await page.evaluate(() => {
      document.querySelector('button')!.addEventListener('click', () => {
        const r = confirm('确定吗?');
        document.getElementById('result')!.textContent = r ? '已确认' : '已取消';
      });
    });
    await page.getByRole('button', { name: '确认' }).click();

    // 验证结果为已取消
    await expect(page.locator('#result')).toHaveText('已取消');
  });
});