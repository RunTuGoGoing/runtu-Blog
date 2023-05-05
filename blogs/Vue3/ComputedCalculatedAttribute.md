---
title: computed 计算属性
date: 2023-02-22
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## 概述

模板中的表达式虽然方便，但也只能用来做简单的操作。如果在模板中写太多逻辑，会让模板变得臃肿，难以维护。因此我们推荐使用计算属性来描述依赖响应式状态的复杂逻辑。<br>
**computed** 计算属性本质是 Vue 中内置的一个函数。用于当依赖的属性值发生改变的时候，触发其数据的更改。如果依赖的值不发生变化，则使用缓存中的属性值。

## 接收一个回调函数作为参数

**computed()** 方法期望接收一个 **getter** 函数，返回值为一个计算属性 ref。和其他一般的 ref 类似，你可以通过 .value 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 .value。

```JS
import { computed, reactive, ref } from 'vue'

let str = ref("Hello Computed!")
 
let mstr = computed(()=>{
   // 反转字符串
   return str.value.split('').reverse().join('')
})
 
str.value = "Welcome to Beijing!"
```

## 接收一个对象作为参数

计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 **getter** 和 **setter** 来创建

```vue
<template>
    <div>{{ str }} ~ {{ mstr }}}</div>
    <div @click="change">修改依赖数据</div>
</template>
 
<script setup>
    import { computed, ref } from "vue";
    let str = ref("Hello Vue!");
    let mstr = computed({
      get: () => {
        return str.value.split("").reverse().join("");
      },
      set: (newValue) => {
        str.value = newValue;
      },
    });

    const change = () => {
      mstr.value = "Welcome to Beijing!";
    };
</script>
```

::: tip
1. 这里尝试修改计算属性，当你运行 mstr.value = 'Welcome to Beijing!' 时，setter 会被调用而 str 会随之更新。<br>
2. 避免直接修改计算属性值。从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。
:::

## 计算属性 VS 方法

一般情况下，在表达式中调用一个函数也会获得和计算属性相同的结果。不同之处在于计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。<br>
这意味着只要 str 不改变，无论多少次访问 mstr 都会立即返回先前的计算结果，而不用重复执行 getter 函数。相比之下，方法调用总是会在重渲染发生时再次执行函数。<br>

**为什么需要缓存呢？**<br>
想象一下我们有一个非常耗性能的计算属性 list，需要循环一个巨大的数组并做许多计算逻辑，并且可能也有其他计算属性依赖于 list。没有缓存的话，我们会重复执行非常多次 list 的 getter，然而这实际上没有必要！如果你确定不需要缓存，那么也可以使用方法调用。

