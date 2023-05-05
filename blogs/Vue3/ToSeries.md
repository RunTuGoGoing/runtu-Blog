---
title: to 系列
date: 2023-02-22
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## toRef()

**toRef()** 函数基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。<br>
**toRef()** 函数一次仅能设置一个数据，接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性。

```vue
<script setup>
    const state = reactive({
        title: '标题',
        name: 'wff'
    })
    
    const name = toRef(state, 'name')

    console.log(state.name)
    console.log(name.value)
</script>

<template>
  <div>
    name:{{name}}
  </div>
</template>
```

## toRefs()

**toRefs()** 函数将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。

```vue
<script setup>
    const state = reactive({
        title: '标题',
        name: 'wff'
    })
    
    const { title } = toRefs(state)

    console.log(state.title)
    console.log(title.value)
</script>

<template>
  <div>
    title:{{title}}
  </div>
</template>
```

::: tip
注：我们使用 **reactive** 创建的对象，如果想在模板中使用，就必须得使用 xxx.xxx 的形式；如果大量用到的话还是很麻烦的，但是使用 **es6解构** 以后，会失去响应式。那么 **toRefs** 的作用就体现在这，利用 **toRefs** 可以将一个响应式 **reactive** 对象的所有原始属性转换为响应式的 **ref属性**。
:::

## toRaw()

**toRaw()** 函数可以返回由 **reactive()**、**readonly()**、**shallowReactive()** 或者 **shallowReadonly()** 创建的代理对应的原始对象（将响应式对象转化为普通对象）。<br>
这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。

```JS
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```

## ref、toRef、toRefs 异同点

- ref、toRef、toRefs 函数都可以将某个对象中的属性变成响应式数据
- ref 函数的本质是拷贝，修改响应式数据，不会影响到原始数据（引用数据类型会有影响），视图会更新
- toRef、toRefs 函数和传入的数据形成引用关系，修改 toRef 会影响这些数据，但是不会更新视图。
    **作用：把一个响应式对象转换成普通对象，该普通对象的每个属性都是一个 ref**
    - toRef 函数一次仅能设置一个数据，接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性
    - toRefs 函数接收一个对象作为参数，它会遍历对象身上的所有属性，然后挨个调用 toRef 执行。用于批量设置多个数据为响应式
- **ref 数据会引起监听行为，而 toRef 不会**