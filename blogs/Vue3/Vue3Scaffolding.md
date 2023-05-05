---
title: Vue3脚手架搭建
date: 2023-02-21
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## 环境配置

### 开发环境：Vite3 + Vue3
    - 兼容性：Vite 需要 Node.js版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。
    - Vue3 采用组合式 API

### 官方推荐的 IDE 配置： Visual Studio Code

### Vite 搭建脚手架
执行如下命令初始化项目
```bash
npm init vue@latest
```
这一指令将会安装并执行 create-vue，它是 Vue 官方的项目脚手架工具。你将会看到一些诸如 TypeScript 和测试支持之类的可选功能提示：
```bash
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```
如果不确定是否要开启某个功能，你可以直接按下回车键选择 No。在项目被创建后，通过以下步骤安装依赖并启动开发服务器：
```bash
cd <your-project-name>
npm install
npm run dev
```
注：也可以采用 vite 官方命令配置 vue 项目：
```bash
npm init vite@latest
# or
npm create vite@latest
```
安装 sass 预处理语言：
```bash
npm install --save-dev sass
```

### 脚手架目录介绍
    - public 下面的不会被编译 可以存放静态资源
    - assets 下面可以存放可编译的静态资源
    - components 下面用来存放我们的组件
    - router 存放路由相关文件
    - stores 存放状态管理相关文件
    - App.vue 是全局组件
    - main.js 全局的 js 文件
    - index.html 非常重要的入口文件 （Vite 的入口文件是一个 html 文件，他刚开始不会编译这些 js 文件 只有当你用到的时候 如script src=“xxxxx.js” 会发起一个请求被vite拦截这时候才会解析js文件）
    - vite.config.js 这是vite的配置文件具体配置项

### SFC 语法规范解析
*.vue 件都由三种类型的顶层语法块所组成：
```vue
<template></template>、<script></script>、<style></style>
```

    - <template>
        - 每个 *.vue 文件最多可同时包含一个顶层 <template> 块。
        - 其中的内容会被提取出来并传递给 @vue/compiler-dom，预编译为 JavaScript 的渲染函数，并附属到导出的组件上作为其 render 选项。
    - <script>
        - 每一个*.vue文件可以有多个 <script> 块 (不包括<script setup>)
        - 该脚本将作为 ES Module 来执行。
        - 其默认导出的内容应该是 Vue 组件选项对象，它要么是一个普通的对象，要么是 defineComponent 的返回值。
    - <script setup>
        - 每个 *.vue 文件最多只能有一个 <script setup> 块 (不包括常规的 <script>)
        - 该脚本会被预处理并作为组件的 setup() 函数使用，也就是说它会在每个组件实例中执行。<script setup> 的顶层绑定会自动暴露给模板。更多详情请查看 <script setup> 文档。
    - <style>
        - 一个 *.vue 文件可以包含多个 <style> 标签。
        - <style>标签可以通过 scoped 或 module attribute (更多详情请查看 SFC 样式特性) 将样式封装在当前组件内。多个不同封装模式的 <style> 标签可以在同一个组件中混用。