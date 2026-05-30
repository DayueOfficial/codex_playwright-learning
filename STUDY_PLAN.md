# Playwright 学习计划

## 目标

从"能跑通"到"能独立写"，掌握工作级 Playwright 测试能力。

## 当前状态

- **阶段**：阶段一 · 待开始
- **进度**：0/5 任务完成

---

## 阶段一：理解现有代码

目标：能讲清楚每个测试在做什么、为什么这样做。

- [ ] 任务 1：过一遍 smoke.spec.ts + locator.spec.ts
  - 说出每个断言的意图
  - 解释 CSS/Text/Role 选择器的区别和适用场景
  - 验证：能口述测试流程

- [ ] 任务 2：过一遍 form.spec.ts + assertion.spec.ts
  - 解释 fill/click/submit 的区别
  - 说出 toBeVisible/toHaveText/toHaveURL 各自验证什么
  - 验证：能口述测试流程

- [ ] 任务 3：过一遍 network.spec.ts + waiting.spec.ts
  - 解释 route.fulfill 的作用
  - 说出 waitForSelector vs locator 的区别
  - 验证：能口述测试流程

- [ ] 任务 4：过一遍 pages/ 目录
  - 解释 BasePage 和 TodoPage 的关系
  - 说出 Page Object 模式的好处
  - 验证：能画出类图

- [ ] 任务 5：过一遍 playwright.config.ts
  - 解释每个配置项的作用
  - 说出 projects 数组的意义
  - 验证：能修改配置实现不同效果

---

## 阶段二：动手改代码

目标：能修改现有测试，理解改动的影响。

- [ ] 任务 6：修改定位器
  - 把 locator.spec.ts 的 CSS 选择器改成 Role/Text
  - 运行测试，观察差异
  - 记录哪种场景用哪种选择器更好

- [ ] 任务 7：修改断言
  - 把 assertion.spec.ts 的断言改成其他形式
  - 故意写错断言，看错误信息
  - 学会读错误信息定位问题

- [ ] 任务 8：添加新测试用例
  - 在 form.spec.ts 里加一个测试：批量添加 5 个 todo
  - 在 network.spec.ts 里加一个测试：拦截 POST 请求
  - 保持代码风格一致

- [ ] 任务 9：重构测试
  - 把 form.spec.ts 里的重复代码提取成 helper 函数
  - 或者创建一个新的 Page Object 方法
  - 运行测试确保重构不破坏功能

- [ ] 任务 10：调试失败测试
  - 故意让一个测试失败
  - 用 `npx playwright test --debug` 调试
  - 用 `npx playwright test --headed` 观察执行过程
  - 记录调试技巧

---

## 阶段三：独立写测试

目标：能针对真实网站从零写测试。

- [ ] 任务 11：选择目标网站
  - 选一个你熟悉的网站（工作系统、常用工具、公开 Demo）
  - 列出 3-5 个核心功能点
  - 规划测试覆盖范围

- [ ] 任务 12：写冒烟测试
  - 验证页面能打开、标题正确
  - 验证核心元素存在
  - 提交到独立分支

- [ ] 任务 13：写功能测试
  - 测试表单交互（登录、搜索、提交）
  - 测试列表操作（增删改查）
  - 测试页面跳转

- [ ] 任务 14：写边界测试
  - 空输入、特殊字符、超长文本
  - 网络错误、超时处理
  - 并发操作

- [ ] 任务 15：整理和复盘
  - 把测试代码整理成 Page Object 结构
  - 写一份简短的测试说明文档
  - 总结学到的技巧和踩过的坑

---

## 阶段四：工作级能力

目标：能维护团队测试代码，能设计测试架构。

- [ ] 任务 16：学习 fixtures
  - 理解 test.extend 的作用
  - 创建自定义 fixture（如登录状态复用）
  - 重写一个测试使用 fixture

- [ ] 任务 17：学习 CI/CD 集成
  - 理解 .github/workflows/playwright.yml 的每一步
  - 模拟 CI 环境本地运行：`npx playwright test --reporter=github`
  - 学会看 CI 失败日志

- [ ] 任务 18：代码审查练习
  - 回头看自己阶段一的代码，找出可以改进的地方
  - 重构 2-3 个测试文件
  - 记录改进点

- [ ] 任务 19：知识输出
  - 写一篇学习笔记或博客
  - 或者给同事做一个 10 分钟的分享
  - 教是最好的学

- [ ] 任务 20：持续精进
  - 关注 Playwright 更新日志
  - 学习高级技巧（API 测试、组件测试、性能测试）
  - 建立个人测试代码模板库

---

## 学习资源

- [Playwright 官方文档](https://playwright.dev/docs/intro)
- [Playwright GitHub](https://github.com/microsoft/playwright)
- [Playwright Test Examples](https://github.com/microsoft/playwright/tree/main/tests)

---

## 进度记录

| 日期 | 完成任务 | 心得/问题 |
|------|----------|-----------|
|      |          |           |
