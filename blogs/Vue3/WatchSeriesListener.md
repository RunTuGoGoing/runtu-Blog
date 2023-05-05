---
title: watch 系列侦听器
date: 2023-02-22
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## watch 侦听器概述

**计算属性** 允许我们声明性地计算衍生值，但是不建议在计算属性中去修改状态或更改DOM。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态，这就用到了 watch 侦听器。<br>

在组合式 API 中，我们可以使用 **watch** 函数在 **每次响应式** 状态发生变化时触发回调函数

```vue
<script setup>
    import { ref, watch } from 'vue'

    const question = ref('')
    const answer = ref('Questions usually contain a question mark. ;-)')

    // 可以直接侦听一个 ref
    watch(question, async (newQuestion, oldQuestion) => {
      if (newQuestion.indexOf('?') > -1) {
        answer.value = 'Thinking...'
        try {
          const res = await fetch('https://yesno.wtf/api')
          answer.value = (await res.json()).answer
        } catch (error) {
          answer.value = 'Error! Could not reach the API. ' + error
        }
      }
    })
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

接口 https://yesno.wtf/api 返回的数据如下：
```JS
{
    answer: "no",
    forced: false,
    image: "https://yesno.wtf/assets/no/10-d5ddf3f82134e781c1175614c0d2bab2.gif"
}
```

## watch 侦听数据源类型

### 概述

**watch()** 函数用于侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。 watch函数接收的参数如下：
- **第一个参数**：侦听器的源，这个来源可以是以下几种：
    - 一个 getter 函数，返回一个值
    - 一个 ref (包括计算属性computed定义)
    - 一个响应式对象（reactive定义）
    - 由以上类型的数据源组成的数组
- **第二个参数**：在发生变化时要调用的回调函数 cb(newVal,oldVal,callback)
这个回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的 **异步请求**。<br>
当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值。
- **第三个参数**：options配置项（一个对象）
    - **immediate**：在侦听器创建时立即触发回调。第一次调用时旧值是 **undefined**
    - **deep**：如果源是对象或数组，则强制深度遍历源，以便在深层级变更时触发回调。参考深层侦听器。
    - **flush**：调整回调函数的刷新时机。参考回调的刷新时机及 **watchEffect()**。值默认为{ flush: 'pre' }，即vue组件更新前触发；若设置为{ flush: 'post' }则回调将在vue组件更新之后触发；此外还可以设置为{ flush: 'sync' }，表示同步触发。
    - **onTrack / onTrigger**：调试侦听器的依赖关系。设置收集依赖时的onTrack和触发更新时的onTrigger两个listener，主要用于debugger （调试 watch 用）。

::: tip
提示：深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。
:::

```JS
{
	immediate: true, //是否立即调用一次
	deep: true //是否开启深度监听,
	onTrigger() {
		
	}
}
```

### 示例代码

```vue
<script setup>
	import { ref, reactive, watch } from 'vue'
	
	// 监听 ref 数据源
	let name = ref("MagnumHou")
	let obj = ref({
	    name: "Magnum",
	    age: 23,
	    sex: "male"
	})
	
	// 定义监听
	watch(name, (newName, oldName) => {
	    console.log("newName:", newName, "oldName:", oldName, "name:", name.value)
	})
	
	watch(obj, (newVal, oldVal) => {
	    // 当通过watch去监听复杂数据类型时，数据发生改变后，监听到的 newVal和 oldVal 都是最新的值
	    console.log("newVal:", newVal, "oldVal:", oldVal);
	}, {
	    deep: true //深度监听
	})
	
	// 监听 reactive 数据源
	let obj2 = reactive({
	    foo: {
	        bar: {
	            num: 1
	        }
	    }
	})
	
	watch(obj2, (newObj, oldObj) => {
	    console.log("newObj:", newObj, "oldObj:", oldObj)
	})
	// 通过reactive定义的复杂的数据类型，会自动开启deep:true深度监听
	
	// 监听对象中的某个属性（监听单一属性）
	let stu = reactive({
	    name: "Jack",
	    age: 18,
	    scores: {
	        chinese: 100,
	        english: 60,
	        japanese: 150
	    }
	})
	// 监听单一属性：需要采用 get 函数，将对应的属性返回。不能直接打点的方式去做数据监听
	watch(() => stu.name, (newName, oldName) => {
	    console.log("newName:", newName, "olsName:", oldName)
	})
	watch(() => stu.scores.chinese, (newScore, oldScore) => {
	    console.log("newScore:", newScore, "oldScore:", oldScore)
	}, {
	    immediate: true,//随着程序的加载立即执行一次，第一次执行 oldVal 是 undefined
	    flush: "post",//组件加载后执行
	})
</script>

<template>
    <div>
        <h3>您最新的笔名：{{ name }}</h3>
        username:<input type="text" v-model.lazy="name">
        <br>
        age:<input type="text" v-model.lazy="obj.age">
        <br>
        num: <input type="text" v-model.lazy="obj2.foo.bar.num" />
        <br>
        stuName: <input type="text" v-model.lazy="stu.name">
        <br>
        chinese~score: <input type="text" v-model.lazy="stu.scores.chinese">
    </div>
</template>
```

## watchEffect 高级侦听器

### 概述

**watchEffect(callback,options)** 用于立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。 函数的参数如下：
- 第一个参数就是要运行的副作用函数。这个副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求 (参见下面的示例)。
- 第二个参数是一个可选的选项（options 对象），可以用来调整副作用的刷新时机或调试副作用的依赖。同 watch 函数中 options 配置项。

::: tip
默认情况下，侦听器将在组件渲染之前执行。设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行。详见回调的触发时机。在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器。这可以通过设置 flush: 'sync' 来实现。然而，该设置应谨慎使用，因为如果有多个属性同时更新，这将导致一些性能和数据一致性的问题。
:::

**watchEffect 函数返回值是一个用来停止该副作用的函数。**

```vue
<script setup>
	import { ref, reactive, watchEffect, watchPostEffect, watchSyncEffect } from 'vue'
	
	// 监听 ref 数据变化
	let name = ref("MagnumHou");
	watchEffect(() => {
	    console.log("watchEffect中的name:", name)
	}, {
	    flush: "post"
	})
	
	// flush:"post" 对应于一个钩子函数  watchPostEffect
	// flush:"sync" 对应于一个钩子函数  watchSyncEffect
	
	// 监听一个 reactive 对象
	let obj = reactive({
	    foo: {
	        bar: {
	            num: 1
	        }
	    }
	})
	watchEffect((callback) => {
	    console.log("watchEffect中的num2:", obj.foo.bar.num)
	    // 这是一个清除副作用的函数 cleanFn，里面是一个回调函数；优先于侦听数据之前之前
	    callback(() => { console.log("在其它watchEffect数据侦听之前调用....") })
	})
	
	setTimeout(() => {
	    name.value = "Lucy"
	    obj.foo.bar.num = 1000
	}, 5000)
</script>
```

### watch 与 watchEffect 区别

**watch** 和 **watchEffect** 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：
- **watch** 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。**watch** 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- **watchEffect**，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

## 停止侦听器

在 **setup()** 或 <**script setup**> 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。<br>
一个关键点是，侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。

```vue
<script setup>
    import { watchEffect } from 'vue'

    // 它会自动停止
    watchEffect(() => {})

    // ...这个则不会！
    setTimeout(() => {
      watchEffect(() => {})
    }, 100)
</script>
```

要手动停止一个侦听器，请调用 **watch** 或 **watchEffect** 返回的函数
```JS
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```

注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑
```JS
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```