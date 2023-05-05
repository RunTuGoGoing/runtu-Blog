---
title: 组件中的双向绑定
date: 2023-02-22
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## 基本使用

类似于原生表单控件， **v-model** 也可以在组件上使用以实现数据**双向绑定**，如下父组件代码：

```vue
<CustomInput v-model="searchText"/>
```

<**CustomInput**> 组件内部需要做两件事：
1. 将内部原生 <**input**> 元素的 **value attribute** 绑定到 **modelValue prop**
2. 当原生的 **input** 事件触发时，触发一个携带了新值的 **update:modelValue** 自定义事件

子组件 **CustomInput** 模板代码如下：

```vue
<script setup>
    defineProps(['modelValue'])
    defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

::: tip
这种情况下，子组件内部的 input 不能再使用 v-model 接收传递过来的 props 中的值，否则报错。
:::

## 可写性

可以使用具有 getter 和 setter 的 **computed** 属性在组件内实现 **v-model** 的可写性。

```vue
<script setup>
    import { computed } from 'vue'

    const props = defineProps(['modelValue'])
    const emit = defineEmits(['update:modelValue'])

    const value = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })
</script>

<template>
  <input v-model="value" />
</template>
```

## 参数

可以通过给 **v-model** 指定一个参数来更改默认的名字。

```vue
<MyComponent v-model:title="bookTitle" />
```

MyComponent 子组件：

```vue
<script setup>
    defineProps(['title'])
    defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

::: tip
注：通过指定参数的方式，可以绑定多个 v-model
:::

## 修饰符

组件 **v-model** 上所添加的修饰符，可以通过 **modelModifiers prop** 在组件内访问到。<br>
如下：创建一个自定义的修饰符 **capitalize**，它会自动将 **v-model** 绑定输入的字符串值第一个字母转为大写

```vue
<MyComponent v-model.capitalize="myText" />
```

```vue
<script setup>
    const props = defineProps({
      modelValue: String,
      modelModifiers: { default: () => ({}) }
    })
    const emit = defineEmits(['update:modelValue'])
    function emitValue(e) {
      let value = e.target.value
      // 检查 modelModifiers 对象的键，并编写一个处理函数来改变抛出的值
      if (props.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      emit('update:modelValue', value)
    }
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

::: tip
这里组件的 **modelModifiers prop** 包含了 **capitalize** 且其值为 **true**，因为它在模板中的 **v-model** 绑定 **v-model.capitalize="myText"** 上被使用了
:::