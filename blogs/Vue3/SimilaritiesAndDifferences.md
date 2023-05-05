---
title: 异同点
date: 2023-02-22
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## ref、toRef、toRefs 异同点

- ref、toRef、toRefs 函数都可以将某个对象中的属性变成响应式数据
- ref 函数的本质是拷贝，修改响应式数据，不会影响到原始数据（引用数据类型会有影响），视图会更新
- oRef、toRefs 函数和传入的数据形成引用关系，修改 toRef 会影响这些数据，但是不会更新视图<br>
**作用：把一个响应式对象转换成普通对象，该普通对象的每个属性都是一个 ref**
    - toRef 函数一次仅能设置一个数据，接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性
    - toRefs 函数接收一个对象作为参数，它会遍历对象身上的所有属性，然后挨个调用 toRef 执行。用于批量设置多个数据为响应式
- **ref 数据会引起监听行为，而 toRef 不会**

```vue
<script setup>
    const state = reactive({
        title: '标题',
        name: 'wff'
    })
    const { title } = toRefs(state)
    const name = toRef(state, 'name')

    console.log(state.title)
    console.log(title.value)
    console.log(name.value)

    const titleState = ref('new')
    const count = ref({
        count: 0
    })
</script>

<template>
  <div>
    name:{{name}}
  </div>
</template>
```

::: tip
注：我们使用 reactive创建的对象，如果想在模板中使用，就必须得使用 xxx.xxx的形式；如果大量用到的话还是很麻烦的，但是使用 es6解构以后，会失去响应式。那么toRefs的作用就体现在这，**利用toRefs可以将一个响应式 reactive 对象的所有原始属性转换为响应式的ref属性。**
:::

## ref 和 reactive 的区别

- ref 函数和 reactive 函数都是用来定义响应式数据的。
- ref 函数更适合定义基本数据类型（可接收基本数据类型和对象）
    - 函数参数可以是基本数据类型，也可以接受对象类型
    - 如果参数是对象类型时，其实底层的本质还是 reactive，系统会自动给 ref 传入的值进行转换

    ```JS
    ref(1) -> reactive({value:1})
    // ref函数只能操作浅层次的数据，把基本数据类型当作自己的属性值；深层次依赖于reactive
    ```

    - 在 template 中访问，系统会自动添加 .value 。在 js 中需要手动 .value 进行访问

    ```JS
    import { ref } from 'vue'

    // 为基本数据类型添加响应式状态
    const name = ref('Neo')

    // 为复杂数据类型添加响应式状态
    const state = ref({
        count: 0
    })

    // 打印name的值
    console.log(name.value)
    // 打印count的值
    console.log(state.value.count)
    ```

    - ref 响应式原理是依赖于Object.defineProperty()的get()和set()的
    - ref 用于获取 dom 节点
    在Vue2中我们通过this.$refs来获取dom节点，但Vue3组合式API中我们需要通过ref来获取节点元素<br>
    首先需要在标签上添加 ref='xxx'，然后再setup中定义一个初始值为null的ref类型，名字要和标签的ref属性一致
    
    ```vue
    <script setup>
    import { onMounted, ref } from 'vue';
    // 利用ref函数获取组件中的标签元素功能实现需求: 让输入框自动获取焦点
    const inputRef = ref(null);

    (() => {
        inputRef.value && inputRef.value.focus()
    })();
    </script>

    <template>
        <h2>App</h2>
        <input type="text" ref="inputRef">
    </template>
    ```

::: tip
ref 接受的数据类型：基本类型，引用类型<br>
作用：把参数加工成一个响应式对象，全称为reference对象(简称为ref对象) <br>
核心原理：如果参数是基本类型那么形成响应式依赖于Object.defineProperty( )的get( )和set( )，如果ref的参数是引用类型，底层ref会借助reactive的proxy 定义响应式变成这样：reactive({value:‘xiaxia’})。
:::

- reactive 函数更适合定义复杂的数据类型（json/arr）
    - 它的响应式是更加‘深层次’的（会影响对象内部所有嵌套的属性，所有的数据都是响应式的），底层本质是将传入的数据包装成一个 Proxy
    - 参数必须是对象或者数组，如果要让对象的某个元素实现响应式时比较麻烦。需要使用 toRefs 函数处理
    - 获取数据值的时候直接获取，不需要加.value

```JS
import { reactive } from 'vue'

// 响应式状态
const state = reactive({
  count: 0
})

// 打印count的值
console.log(state.count)
```