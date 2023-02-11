# vue3-express-content-manage-system

> 一个简单的 vue3 + express 的 monorepo 前端全栈项目

## 1. 快速开始

全局安装`pnpm`：

```
npm i -g pnpm
```

在项目根目录执行：

```
pnpm run dev
```
前端项目运行在：http://127.0.0.1:8080

后端项目运行在：http://localhost:8000

## 2. 项目特点

- 前端、后端基于 TypeScript 编写类型完全可维护代码
- 前端 flex 响应式弹性布局
- 封装通用表单组件 CommonForm，配置生成表单
- 封装表单、表格查询 hooks，快速搭建查询页
- 后端 token 验证，前端通过 axios 请求拦截重定向
- 后端中间件、通用处理方法封装