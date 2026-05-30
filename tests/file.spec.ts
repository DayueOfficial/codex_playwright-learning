import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// 文件上传/下载测试
test.describe('文件上传和下载测试', () => {

  test('文件上传 - setInputFiles', async ({ page }) => {
    // 设置包含 file input 的页面
    await page.setContent(
      '<input type="file" id="upload" />' +
      '<div id="info"></div>'
    );

    // 创建一个临时测试文件
    const tmpDir = path.join(process.env.TEMP || '/tmp', 'playwright-upload');
    fs.mkdirSync(tmpDir, { recursive: true });
    const filePath = path.join(tmpDir, 'test-upload.txt');
    fs.writeFileSync(filePath, '这是上传测试文件的内容');

    // 使用 setInputFiles 上传文件
    await page.locator('#upload').setInputFiles(filePath);

    // 验证文件已选中
    const fileName = await page.locator('#upload').evaluate((el: HTMLInputElement) => {
      return el.files?.[0]?.name || '';
    });
    expect(fileName).toBe('test-upload.txt');

    // 清理临时文件
    fs.unlinkSync(filePath);
  });

  test('文件上传 - 读取文件内容', async ({ page }) => {
    // 设置包含 file input 和读取逻辑的页面
    await page.setContent(
      '<input type="file" id="file-input" />' +
      '<div id="content"></div>' +
      '<script>' +
      'document.getElementById("file-input").addEventListener("change", function(e) {' +
      '  const file = e.target.files[0];' +
      '  if (file) {' +
      '    const reader = new FileReader();' +
      '    reader.onload = function(ev) {' +
      '      document.getElementById("content").textContent = ev.target.result;' +
      '    };' +
      '    reader.readAsText(file);' +
      '  }' +
      '});' +
      '</script>'
    );

    // 创建临时文件
    const tmpDir = path.join(process.env.TEMP || '/tmp', 'playwright-upload');
    fs.mkdirSync(tmpDir, { recursive: true });
    const filePath = path.join(tmpDir, 'content-test.txt');
    fs.writeFileSync(filePath, 'Playwright 文件读取测试');

    // 上传文件
    await page.locator('#file-input').setInputFiles(filePath);

    // 验证页面正确读取了文件内容
    await expect(page.locator('#content')).toHaveText('Playwright 文件读取测试');

    // 清理
    fs.unlinkSync(filePath);
  });

  test('文件上传 - 多文件上传', async ({ page }) => {
    // 设置支持多文件的 input
    await page.setContent(
      '<input type="file" id="multi" multiple />' +
      '<div id="count"></div>'
    );

    // 创建多个临时文件
    const tmpDir = path.join(process.env.TEMP || '/tmp', 'playwright-upload');
    fs.mkdirSync(tmpDir, { recursive: true });
    const file1 = path.join(tmpDir, 'file1.txt');
    const file2 = path.join(tmpDir, 'file2.txt');
    fs.writeFileSync(file1, '第一个文件');
    fs.writeFileSync(file2, '第二个文件');

    // 多文件上传
    await page.locator('#multi').setInputFiles([file1, file2]);

    // 验证选中了 2 个文件
    const fileCount = await page.locator('#multi').evaluate((el: HTMLInputElement) => {
      return el.files?.length || 0;
    });
    expect(fileCount).toBe(2);

    // 清理
    fs.unlinkSync(file1);
    fs.unlinkSync(file2);
  });

  test('文件下载 - 使用 Blob URL', async ({ page }) => {
    // 设置包含下载链接的页面
    await page.setContent(
      '<a id="download" download="test.txt">下载文件</a>' +
      '<script>' +
      'const blob = new Blob(["这是下载的文件内容"], { type: "text/plain" });' +
      'document.getElementById("download").href = URL.createObjectURL(blob);' +
      '</script>'
    );

    // 监听 download 事件
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download').click();
    const download = await downloadPromise;

    // 验证下载文件名
    expect(download.suggestedFilename()).toBe('test.txt');

    // 保存下载文件并验证内容
    const tmpPath = path.join(process.env.TEMP || '/tmp', 'playwright-download.txt');
    await download.saveAs(tmpPath);
    const content = fs.readFileSync(tmpPath, 'utf8');
    expect(content).toBe('这是下载的文件内容');

    // 清理
    fs.unlinkSync(tmpPath);
  });

  test('文件下载 - 使用 route 提供下载', async ({ page }) => {
    // 用 route 拦截并提供一个可下载的 CSV 文件
    const csvContent = ['id,name,score', '1,张三,95', '2,李四,88'].join('\n');
    await page.route('**/download/report.csv', (route) => {
      route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="report.csv"',
        },
        body: csvContent,
      });
    });

    // 先导航到真实页面
    await page.goto('/todomvc');

    // 动态创建下载链接
    await page.evaluate(() => {
      const a = document.createElement('a');
      a.href = '/download/report.csv';
      a.download = 'report.csv';
      a.id = 'csv-download';
      a.textContent = '下载报表';
      document.body.appendChild(a);
    });

    // 监听下载事件并点击
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#csv-download').click();
    const download = await downloadPromise;

    // 验证文件名
    expect(download.suggestedFilename()).toBe('report.csv');
  });
});