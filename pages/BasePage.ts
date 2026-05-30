import { type Page, type Locator } from '@playwright/test';

// Page Object 基类 - 封装通用页面操作
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 导航到指定路径（使用 config 中的 baseURL）
  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  // 获取页面标题
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  // 获取当前 URL
  getCurrentURL(): string {
    return this.page.url();
  }

  // 按文本查找元素
  getByText(text: string): Locator {
    return this.page.getByText(text);
  }

  // 按 placeholder 查找元素
  getByPlaceholder(placeholder: string): Locator {
    return this.page.getByPlaceholder(placeholder);
  }

  // 按 CSS 选择器查找元素
  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  // 等待页面加载完成
  async waitForLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
