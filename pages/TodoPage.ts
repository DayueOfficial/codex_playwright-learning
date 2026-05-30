import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

// TodoMVC 页面对象
export class TodoPage extends BasePage {
  readonly input: Locator;
  readonly todoList: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.input = page.getByPlaceholder('What needs to be done?');
    this.todoList = page.locator('.todo-list li');
    this.heading = page.locator('h1');
  }

  // 打开 TodoMVC 页面
  async open() {
    await this.goto('/todomvc');
  }

  // 添加单个 todo 项
  async addTodo(text: string) {
    await this.input.fill(text);
    await this.input.press('Enter');
  }

  // 获取 todo 项数量
  async getTodoCount(): Promise<number> {
    return await this.todoList.count();
  }

  // 获取指定位置的 todo 项
  getTodoItem(index: number): Locator {
    return this.todoList.nth(index);
  }

  // 标记指定 todo 项为已完成
  async toggleTodo(index: number) {
    await this.todoList.nth(index).locator('.toggle').check();
  }

  // 删除指定 todo 项（hover 后点击删除按钮）
  async deleteTodo(index: number) {
    const item = this.todoList.nth(index);
    await item.hover();
    await item.locator('.destroy').click();
  }
}
