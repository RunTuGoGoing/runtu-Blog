---
title: 透传 Attributes
date: 2023-02-22
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

**“透传 attribute”** 指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 **v-on** 事件监听器。最常见的例子就是 **class**、**style** 和 **id**。

## 根组件继承
默认情况下，当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上（直接自动继承）。<br>
MyButton 组件模板

```vue
<template>
	<button class="btn" style="border:solid 1px #e7e7e7;"  @click="btnClick">click me</button>
</template>
```

一个父组件使用了这个组件，并且传入了 **class**

```vue
<MyButton class="large" style="outline:none;" @click="clickHandle"/>
```

最后渲染出的 DOM 结果是

```vue
<!-- 一个根组件，添加的 class、style 直接作用于根元素上(直接继承) -->
<!-- 如果一个子组件的根元素已经有了 class、style，它会和从父组件上继承的值合并；event 同理，继承和根元素的事件都会执行。 -->
<button class="btn large" style="border:solid 1px #e7e7e7;outline:none;">click me</button>
```

## 深层组件继承

有些情况下，一个组件（如：**MyButton**）会在根节点上渲染另一个组件（如：**BaseButton**）。此时 **MyButton** 接收的透传**attribute**会直接继续传给 **BaseButton**。如下 **MyButton** 组件：

```vue
<template>
	<BaseButton />
</template>
```

## 模板中访问透传 **attribute**

### 禁用 Attributes 继承

如果你不想要一个组件自动地继承 attribute，你可以在组件选项中设置 inheritAttrs: false。

```vue
<script>
    export default {
      inheritAttrs: false
    }
</script>

<script setup>
	// 部分逻辑
</script>
```

**禁用 attribute 继承的场景：attribute 需要应用在根节点以外的其他元素上。**

### 模板中访问透传 attribute

透传进来的 attribute 可以在模板表达式中直接用 **$attrs** 访问到。这个 **$attrs** 对象包含了除组件所声明的 **props** 和 **emits** 之外的所有其他 attribute，例如 **class**，**style**，**v-on** 监听器等等。

```vue
<span>透传属性: {{ $attrs }}</span>
```

**MyButton** 组件模板

```vue
<template>
	<div class="btn-wrapper">
        <button class="btn">click me</button>
    </div>
</template>
```

```JS
<script>
	exports default {
		inheritAttrs:false
	}
<script>

<script setup>
	{/* 组合式 API 代码 */}
</script>

<template>
	<div class="btn-wrapper">
		<button class="btn" v-bind="$attrs">click me</button>
    </div>
</template>
```

### 多根节点的 Attributes 继承

和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为。如果 **$attrs** 没有被显式绑定，Vue 不知道要将 attribute 透传到哪里，所以将会抛出一个运行时警告。

```vue
<BaseLayout id="custom-layout" @click="changeValue" />
```

如下 **BaseLayout** 组件模板：

```vue
<template>
	<header>...</header>
    <main>...</main>
    <footer>...</footer>
</template>
```

如果 **$attrs** 被显式绑定，则不会有警告：

```vue
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## 在 JavaScript 中访问透传 Attributes

如果需要，你可以在 <**script setup**> 中使用 **useAttrs()** API 来访问一个组件的所有透传 attribute：

```vue
<script setup>
    import { useAttrs } from 'vue'
    const attrs = useAttrs()
</script>
```

::: tip
需要注意的是，虽然这里的 **attrs** 对象总是反映为最新的透传 attribute，但它并不是**响应式**的 (考虑到性能因素)。你不能通过侦听器去监听它的变化。如果你需要响应性，可以使用 prop。或者你也可以使用 **onUpdated()** 使得在每次更新时结合最新的 **attrs** 执行副作用。
:::