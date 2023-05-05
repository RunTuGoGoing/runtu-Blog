---
title: 定义组件别名
date: 2023-02-22
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## 定义组件别名

- 采用选项式API语法多写一个 script 去通过 name 注册一个组件别名，当前组件内调用这个组件别名。

```vue
<script>
	export default {
		name:"OtherComponentName"
	}
</script>

<script setup>
	/* 当前组件式 API 相关代码 */
</script>

<template>
	/* 模板代码 */
</template>

<style lang='scss' scoped>
	/* 样式代码 */
</style>
```

- unplugin-vue-define-options插件定义组件别名

Element Plus 源码使用这个插件来对组件名进行注册，所以我们完全可以放心的使用。<br>

```JS
// 1. 安装插件
npm install unplugin-vue-define-options -D

// 2. vite.config.js 文件添加插件
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
 
import DefineOptions from 'unplugin-vue-define-options/vite';
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOptions()],
});
```

```vue
<!-- 配置完成后，就可以在组件中直接使用了 -->
<template>
  <button> </button>
</template>

<script setup>
  defineOptions({
    name: 'TButton',
  });
</script>

<style scoped></style>
```