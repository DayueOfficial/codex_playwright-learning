import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

// 表单交互测试 - fill、click、submit 等操作
test.describe('表单交互测试', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.open();
  });

  test('fill + Enter 添加单个 todo', async ({ page }) => {
    await todoPage.addTodo('学习 fill 方法');

    await expect(todoPage.todoList).toHaveCount(1);
    await expect(todoPage.getTodoItem(0)).toHaveText('学习 fill 方法');
  });

  test('连续添加多个 todo', async ({ page }) => {
    await todoPage.addTodo('第一条');
    await todoPage.addTodo('第二条');
    await todoPage.addTodo('第三条');

    await expect(todoPage.todoList).toHaveCount(3);
    await expect(todoPage.getTodoItem(0)).toHaveText('第一条');
    await expect(todoPage.getTodoItem(1)).toHaveText('第二条');
    await expect(todoPage.getTodoItem(2)).toHaveText('第三条');
  });

  test('click 标记 todo 完成', async ({ page }) => {
    await todoPage.addTodo('待完成的任务');

    // 点击复选框标记完成
    await todoPage.toggleTodo(0);

    // 验证该项获得 completed class
    await expect(todoPage.getTodoItem(0)).toHaveClass('completed');
  });

  test('hover + click 删除 todo', async ({ page }) => {
    await todoPage.addTodo('要删除的任务');
    await expect(todoPage.todoList).toHaveCount(1);

    // 删除操作：hover 显示按钮，然后 click
    await todoPage.deleteTodo(0);

    // 验证列表为空
    await expect(todoPage.todoList).toHaveCount(0);
  });

  test('点击筛选按钮过滤 todo', async ({ page }) => {
    // 添加两个 todo
    await todoPage.addTodo('已完成的任务');
    await todoPage.addTodo('未完成的任务');

    // 标记第一个为完成
    await todoPage.toggleTodo(0);

    // 点击 Active 筛选按钮
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(todoPage.todoList).toHaveCount(1);
    await expect(todoPage.getTodoItem(0)).toHaveText('未完成的任务');

    // 点击 Completed 筛选按钮
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(todoPage.todoList).toHaveCount(1);
    await expect(todoPage.getTodoItem(0)).toHaveText('已完成的任务');

    // 点击 All 筛选按钮
    await page.getByRole('link', { name: 'All' }).click();
    await expect(todoPage.todoList).toHaveCount(2);
  });

  test('双击编辑 todo 文本', async ({ page }) => {
    await todoPage.addTodo('原始文本');

    // 双击进入编辑模式
    await todoPage.getTodoItem(0).dblclick();

    // 清空并输入新文本
    const editInput = todoPage.getTodoItem(0).locator('.edit');
    await editInput.fill('已修改的文本');
    await editInput.press('Enter');

    // 验证文本已修改
    await expect(todoPage.getTodoItem(0)).toHaveText('已修改的文本');
  });
});
