---
title: 重置data数据
date: 2023-02-22
categories: 
 - Vue2
tags: 
 - Vue2
sidebar: 'auto'
comment: false
---

## 重置data数据

做过后台管理系统项目的小伙伴们肯定遇到过重置这一功能<br>
重置按钮说白了就是把筛选框v-model的值全部清空然后再去请求一遍列表函数<br>
当我们筛选框有很多的时候，我们一般都会创建一个对象去管理这些参数，这个时候就会有一个问题，那么多参数，重置的时候要去一个一个写吗？

```vue
<template>
  <button @click="handleReset">重置</button>
</template>

<script>
export default {
  data() {
    return {
      queryParams: {
        name: "",
        age: "",
        work: "",
      },
    };
  },
  methods: {
    handleReset() {
        this.queryParams.name = ""
        this.queryParams.age = ""
        this.queryParams.work = ""
    },
  },
};
</script>

<style scoped></style>
```

其实我们vue2底层自带了一个重置方法：**this.$options.data().data** <br>
它的作用就是将我们声明的data重新赋予最开始声明的时候的那个值

```vue
<template>
  <button @click="handleReset">重置</button>
</template>

<script>
export default {
  data() {
    return {
      queryParams: {
        name: "",
        age: "",
        work: "",
      },
    };
  },
  methods: {
    handleReset() {
      // 一行就够 十分好用
      this.queryParams = this.$options.data().queryParams;
    },
  },
};
</script>

<style scoped></style>
```
