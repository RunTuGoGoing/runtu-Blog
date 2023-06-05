---
title: vue项目全局挂载window对象
date: 2023-06-02
categories:
  - utils
  - Vue2
  - Vue3
tags:
  - utils
  - Vue2
  - Vue3
sidebar: "auto"
comment: false
---

## vue 项目全局挂载 window 对象

在项目的 public 文件夹下新建一个 config.js 用来存放全局 window 对象挂载的东西<br />
这里放到 public 只是为了方便打包，但是很不安全

```js
// config.js
// 测试环境请求根地址
window.TEST_API = "";
// 政务外网环境请求根地址
window.OUTLINE_API = "";
// 政务内网环境请求根地址
window.OFFLINE_API = "";

window.BASE_API_URL = window.TEST_API;
// 大屏模式 false内网，true外网
window.IS_OUTER_NET = false;
```

::: tip
我们就能在页面中通过 window.BASE_API_URL 来进行一个使用，以及方便后端发布系统时修改地址
:::
