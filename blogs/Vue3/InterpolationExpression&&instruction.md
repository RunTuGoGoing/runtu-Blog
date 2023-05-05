---
title: 插值表达式&&指令
date: 2023-02-21
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## 模板语法
**插值表达式**可以用于渲染 Vue 中提供的数据。
```vue
<script setup>
    import { ref } from "vue"
    const message = ref("Hello Vue3!!")
    const num = ref(10)
</script>

<template>
  <div class="message">{{ message }} ~ {{ num + 10 }}</div>
  <div>{{ ok ? 'YES' : 'NO' }}</div>
  <div>{{ message.split('').reverse().join('') }}</div>
</template>

<style lang="scss" scoped>
.message {
  color: red;
  font-weight: bold;
  font-family: "楷体","MicroSoft Yahei";
}
</style>
```
::: tip
注：vue中的插值提供了真正的js环境，因此我们可以直接使用 JS 表达式
:::

## 基础指令

### 概述

- 指令是什么
    - 指令就是一个自定义属性，Vue中的指令都是以 v- 开头

- {{}} 插值表达式渲染页面闪烁问题
    - 代码加载的时候先加载 HTML 把插值语法当做 HTML 内容加载到页面上 当加载完 js 后才把插值语法替换掉 所以我们会看到闪烁问题
    
- v-cloak 指令解决插值语法的闪烁问题
    - 原理：先隐藏，替换好值之后再显示最终的值

```vue
    // CSS中提供样式设置
    [v-cloak] {
        display: none;
    }

    // 在插值表达式标签中添加v-cloak指令
    <div id="app" v-cloak>{{ title }} === {{ num + 10 }}</div>
```
### 基础指令

- v-text 更新元素的文本内容
    - v-text 通过设置元素的 textContent 属性来工作，因此它将覆盖元素中所有现有的内容。如果想要替换指定的部分内容，请使用插值表达式（mustache interpolations）代替。

```html
<span v-text="msg"></span>
<!-- 等同于 -->
<span>{{ msg }}</span>
```

- v-html 更新元素的 innerHTML
    - v-html 的内容直接作为普通 HTML 插入—— Vue 模板语法是不会被解析的。如果你发现自己正打算用 v-html 来编写模板，不如重新想想怎么使用组件来代替。

```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

::: tip
在你的站点上动态渲染任意的 HTML 是非常危险的，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要将用户提供的内容作为插值。
:::

- v-once 仅渲染元素和组件一次，并跳过之后的更新
    - 执行一次性的插值（当数据改变时，插值处的内容不会继续更新）

应用场景：显示的信息后续不需要再修改，可以使用 v-once 指令来提高性能

```vue
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 带有子元素的元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<MyComponent v-once :comment="msg" />
<!-- `v-for` 指令 -->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

- v-pre 跳过该元素及其所有子元素的编译
    - 元素内具有 v-pre，所有 Vue 模板语法都会被保留并按原样渲染。最常见的用例就是显示原始双大括号标签及内容。
    
```html
<span v-pre>{{ this will not be compiled }}</span>
```

## 数据双向绑定

### 什么是数据双向绑定？
    - 当数据发生变化的时候，视图会相应的发生变化
    - 当视图发生改变的时候，数据也会相应的同步变化

### 双向绑定的指令
    - v-model 指令实现数据双向绑定

### 双向绑定使用场景
    - 利用 v-model 指令，限制在 input select textarea components (组件) 中使用

## 修饰符

- .lazy 默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据
- .number 如果你想让用户输入自动转换为数字，你可以在 v-model 后添加 .number 修饰符来管理输入
- .trim 如果你想要默认自动去除用户输入内容中两端的空格，你可以在 v-model 后添加 .trim 修饰符

```vue
<div><input type="text" v-model.lazy="data"></div>
<div><input type="text" v-model.number.trim="numData" @change="checkType"></div>
```

## 事件绑定详解

- Vue中的事件绑定指令

```vue
<!--  v-on 指令用法  -->
<button v-on:click="fn">v-on</button>

<!--  指令可以简写为 @ （语法糖）  -->
<button @click="fn2">@语法糖</button>
```

- 事件函数的调用方式

```vue
<!--  直接绑定函数名  -->
<button v-on:click="fn">v-on</button>

<!--  调用函数  -->
<button v-on:click="fn()">v-on</button>
```

- 事件函数参数传递
    - 直接绑定函数名
    
```vue
<button v-on:click="fn(10,20,30)">v-on</button>
```

::: tip 事件对象
1.如果事件直接绑定函数名称 或者 调用函数并未传递任何参数，那么事件函数会默认传递事件对象作为第一个参数<br>
2.如果事件绑定函数调用时传递了参数，那么事件对象必须作为最后一个参数显式传递，并且事件对象的名称必须是 $event<br>
3.在不考虑兼容性问题，且允许 window 全局对象存在的情况下，可以在函数内直接通过全局对象获取事件对象 window.event 也可，建议使用传参的方式。
:::

## 事件修饰符

- Vue中常用的事件修饰符

::: tip
.stop 阻止冒泡<br>
.prevent 取消默认事件<br>
.self 仅当 event.target 是元素本身时才会触发事件处理器<br>
.capture 添加事件监听器时，使用 capture 捕获模式<br>
.once 事件最多被触发一次<br>
.passive 修饰符一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能。不能和 .prevent 一起使用。
:::

```html
<!--  通过 .stop 修饰符阻止事件冒泡行为  -->
<div class="out" @click="fn2">
    外部容器
    <div class="in" @click.stop="fn">内部容器</div>
</div>

<!--  通过 .prevent 修饰符阻止 a 标签默认跳转功能  -->
<a href="http://www.baidu.com" @click.prevent="cancel">跳转百度</a>

<!--  链式修改  -->
<a @click.stop.prevent="doThat"></a>
```

- 按键修饰符

::: tip
.enter => enter键<br>
.tab => tab键<br>
.delete (捕获“删除”和“退格”按键) => 删除键<br>
.esc => 取消键<br>
.space => 空格键<br>
.up => 上<br>
.down => 下<br>
.left => 左<br>
.right => 右
:::

```vue
<!--  .enter 回车键  -->
<div class="login">
      <p><label>用户名：<input type="text" v-model="username" placeholder="请输入用户名"></label></p>
      <!-- 按键修饰符 .enter 触发回车键 -->
      <p><label>密码：<input type="password" v-model="password" placeholder="请输入密码" @keyup.enter="login"></label></p>
      <button @click="login">登录</button>
</div>

<!--  .delete 删除建  -->
<input @keyup.delete='submit'/>
```

## 属性绑定

v-bind 指令被用来响应地更新 HTML 属性

    语法 v-bind:prop = val
    语法糖 :prop = val

```vue
<!--  属性绑定  -->
<h2 v-bind:title="title">属性绑定演示</h2>
<p :class="ft20">语法糖</p>
<div v-bind="{ id: 'container', class: 'wrapper' }"></div>
```

::: tip
注：语法糖是对某个操作的简化，来提高开发效率
:::

## 类与样式的绑定

### class 类的绑定

- 绑定对象语法
    - v-bind:class = { 类名:类值，类名1:类值1，…，类名n:类值n }
    - 如果类名对应的值为true，则显示这个类名；否则不显示这个类名
    
- 绑定数组语法
    - v-bind:class = [ 值1，值2，…，值n ]
    - 值1、值2对应data中的数据

```vue
<script setup>
import { ref, reactive, computed } from 'vue'

const clsName = "active-link"
// 通过 ref 声明的数据，在 script 中，需要通过 .value 获取和修改值；在 template 模板中使用时，则不需要通过 .value 获取值，模板会自动解析数据
const count = ref(0)

// 注意：这里如果想要在count值修改后，实时响应数据变化，需要采用计算属性
const clsObj = computed(() => ({
    link: true,
    activeLink: count.value % 2 == 0
}))

let fm = ref(true)
</script>
<template>
    <div>
        <!-- 基于 v-bind 指令，增强绑定 class类 与 style样式，这两个属性值除了可以使用字符串外，还可以使用对象和数组的绑定 -->
        <a href="javascript:;" :class="clsName" class="link" style="text-decoration:none;"
            :style="'font-style:italic;'">超链接标签演示字符串类型的class和style绑定</a>
        <hr>
        <a href="javascript:;" :class="clsObj"
            :style="{ 'text-decoration': 'none', fontStyle: count % 2 == 0 ? 'italic' : '' }">采用绑定对象的方式实现class和style的赋值</a>
        <hr>
        <a href="javascript:;" :class="['link', 'active-link', { fm }]"
            :style="['letter-spacing:6px;', { 'text-decoration': 'none', fontStyle: count % 2 == 0 ? 'italic' : '' }]">采用数组绑定的方式实现class和style</a>
    </div>
    <button @click="count++">count++</button>
</template>

<style scoped>
hr {
    margin: 2vh 0;
}
.link {
    color: gray;
}
.active-link,
.activeLink {
    font-weight: bold;
}
.fm {
    font-family: "楷体";
}
</style>
```

### style 样式绑定

- 绑定对象语法
    - v-bind:style = { 样式名:样式值，样式名1:样式值1，…，样式名n:样式值n }

- 绑定数组语法
    - v-bind:style = [值1，值2，…，值n]

::: tip
值1，值2，…，值n 需要在 data 中使用对象定义样式和样式值
:::

```vue
<script setup>
import { ref, reactive, computed } from 'vue'

const clsName = "active-link"
// 通过 ref 声明的数据，在 script 中，需要通过 .value 获取和修改值；在 template 模板中使用时，则不需要通过 .value 获取值，模板会自动解析数据
const count = ref(0)

// 注意：这里如果想要在count值修改后，实时响应数据变化，需要采用计算属性
const clsObj = computed(() => ({
    link: true,
    activeLink: count.value % 2 == 0
}))

let fm = ref(true)
</script>
<template>
    <div>
        <!-- 基于 v-bind 指令，增强绑定 class类 与 style样式，这两个属性值除了可以使用字符串外，还可以使用对象和数组的绑定 -->
        <a href="javascript:;" :class="clsName" class="link" style="text-decoration:none;"
            :style="'font-style:italic;'">超链接标签演示字符串类型的class和style绑定</a>
        <hr>
        <a href="javascript:;" :class="clsObj"
            :style="{ 'text-decoration': 'none', fontStyle: count % 2 == 0 ? 'italic' : '' }">采用绑定对象的方式实现class和style的赋值</a>
        <hr>
        <a href="javascript:;" :class="['link', 'active-link', { fm }]"
            :style="['letter-spacing:6px;', { 'text-decoration': 'none', fontStyle: count % 2 == 0 ? 'italic' : '' }]">采用数组绑定的方式实现class和style</a>
    </div>
    <button @click="count++">count++</button>
</template>

<style scoped>
hr {
    margin: 2vh 0;
}
.link {
    color: gray;
}
.active-link,
.activeLink {
    font-weight: bold;
}
.fm {
    font-family: "楷体";
}
</style>
```

## 条件渲染

**指令 v-if、v-else-if 、v-else**
多个元素，通过条件判断动态的向DOM树内添加或者删除DOM元素，操作的是DOM结构<br>
​应用场景：渲染后变化比较少，建议使用 v-if<br>

**指令 v-show**
通过设置样式 display:none; 控制元素的隐藏和显示，此时元素已经渲染到页面，操作的是样式<br>
​应用场景：渲染后变化比较多，从性能优化的角度来讲建议使用 v-show<br>

```vue
<script setup>
import { ref } from "vue"
const score = 80;
const obj = {
    name: "Jack",
    age: 23
}
let flag = ref(true)
</script>

<template>
    <div>
        <!-- v-if、v-else-if、v-else 三个条件渲染指令，直接操作dom；使用场景：页面第一次渲染的时候根据条件渲染对应的dom，且对DOM操作频率很低的情况下使用 -->
        <div v-if="score >= 90">学生成绩大于90，优秀</div>
        <div v-else-if="score >= 80">学生成绩大于80，良好</div>
        <div v-else-if="score >= 70">学生成绩大于70，中等</div>
        <div v-else-if="score >= 60">学生成绩大于60，及格</div>
        <div v-else>学生成绩小于60，不及格</div>

        <!-- v-if 可以单独，多次的使用；但是v-else-if、v-else必须要结合v-if去使用 -->

        <hr>
        <hr>
        <!-- v-show 操作的是样式，不管条件是否成立，都会操作dom -->
        <div v-show="score >= 90">学生成绩大于90，优秀</div>
        <div v-show="score >= 80 && score < 90">学生成绩大于80，良好</div>
        <div v-show="score >= 70 && score < 80">学生成绩大于70，中等</div>
        <div v-show="score >= 60 && score < 70">学生成绩大于60，及格</div>
        <div v-show="score <= 60 && score < 60">学生成绩小于60，不及格</div>
        <!-- v-show 是一个单独的指令，类似于 v-if 单独使用一样，每一个条件都是独立。 -->

        <hr>
        <hr>
        <button @click="flag = !flag">切换</button>
        <Transition>
            <div class="box" v-show="flag"></div>
        </Transition>
    </div>
</template>

<style scoped>
.box {
    height: 300px;
    background-color: blue;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

## 列表渲染

### 使用指令 v-for 遍历数组

**语法** v-for = "(item, index) in arr"<br>
**参数** item代表数组中的每一项 index 代表每一项所对应的索引<br>
**key的作用** 为了高效更新虚拟DOM，帮助Vue快速区分不同元素，用 key 来给每个节点做唯一标识

```vue
<script setup>
import { ref, reactive } from 'vue'

const arr = ["banana", "orange", "apple", "kiwi fruit", 'peal']

const stuData = ref([{
        idCard: 1,
        name: "Jack",
        age: 23
    }, 
    {
        idCard: 2,
        name: "Lucy",
        age: 18
    }, 
    {
        idCard: 3,
        name: "David",
        age: 26
    }]
)

const addInfo = () => {
    console.log(stuData.value.length)
    stuData.value.push({
        idCard: stuData.value.length + 1,
        name:"luosi",
        age:23
    })
}
</script>

<template>
    <!-- v-for 指令可以实现数组和对象的列表数据渲染 -->
    <ul>
        <li :key="index" v-for="item,index in arr">{{ item }} ~ {{ index }}</li>
        <!-- <li>{{ arr[1] }}</li> -->
    </ul>
    <hr>
    <button @click="addInfo">添加一个学生信息</button>
    <ul>
        <li :key="item.idCard" v-for="item of stuData">
            编号：{{ item.idCard }}
            姓名：{{ item.name }}
            年龄：{{ item.age }}
        </li>
    </ul>
</template>

<style scoped>

</style>
```

### 使用指令 v-for 遍历对象

**语法** v-for = "(item, key, index) in obj"<br>
**参数** item 代表对象中的每一项，key 代表每一项对应的键名，index 代表每一项对应的索引

```vue
<script setup>
import { ref, reactive } from 'vue'

const obj = reactive({
    idCard: 1,
    name: "张三",
    age: 23,
})

const addAttr = () => {
    console.log(obj)
    obj.sex = "男"
}
</script>
<template>
    <ul>
        <li :key="key" v-for="item,key in obj">{{ item }} ~ {{ key }}</li>
        <!-- <li>{{ obj.age }}</li> -->
    </ul>
    <br>
    <ul>
        <li v-for="item, key of obj">{{ item }} ~ {{ key }}</li>
    </ul>
    <button @click.once="addAttr">增加属性</button>
</template>
<style scoped>

</style>
```

::: tip
注：2.x 版本中在一个元素上同时使用 v-if 和 v-for 时，v-for 会优先作用。而3.x 版本中 v-if 总是优先于 v-for 生效。由于语法上存在歧义，建议避免在同一元素上同时使用两者。
:::