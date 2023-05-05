---
title: ref 系列
date: 2023-02-21
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## ref()

::: tip
**ref()** 方法接受一个内部值，返回一个响应式的、可更改的 **ref** 对象，此对象只有一个指向其内部值的属性 **.value**<br>
**ref** 对象是可更改的，也就是说你可以为 **.value** 赋予新的值。它也是响应式的，即所有对 **.value** 的操作都将被追踪，并且写操作会触发与之相关的副作用。<br>
如果将一个对象赋值给 **ref**，那么这个对象将通过 **reactive()** 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 **ref**，它们将被深层地解包。<br>
若要避免这种深层次的转换，请使用 **shallowRef()** 来替代。
:::

```vue
<script setup>
	import { ref } from 'vue'
	
	// 声明基本数据类型的数据
	// 定义一个非响应式的数据，此数据只能在数据层进行修改，视图层不会同步更新
	let num = 1;
	console.log("num:", num)
	num = 100;
	console.log("num:", num)
	setTimeout(() => {
	    num = 1000
	    console.log("num:", num)
	}, 5000)
	
	// 利用 ref 定义一个响应式数据：数据层数据的修改可以相应到视图层，反之亦可
	let str = ref("Hello Ref!!")
	console.log("str:", str, str.value)
	setTimeout(() => {
	    str.value = "Hello 我是响应式数据！！！"
	    console.log(str.value)
	}, 8000);// 更新时间在非响应式数据之后，会影响后者；在非响应式数据之前更新，则不会影响后者
	// 需要注意的是：非响应式的数据更改后不会更新视图，但是如果非响应式数据更新后，去更新响应式数据，那么更新后的非响应式数据也会受响应式数据更新的影响，视图层响应会重新匹配最新的数据进行更新（响应式和非响应式数据）
	
	// 利用 ref 定义一个复杂的数据类型
	let obj = ref({
	    name: "Jack",
	    age: 23,
	    sex: "男"
	})
	console.log("obj:", obj)
	setTimeout(() => {
	    // obj.value = {}
	    obj.value.name = "Lucy"
	    obj.value.sex = "女"
	},3000)
</script>

<template>
    <div>
        <div>{{ num }}</div>
        <strong>{{ str }}</strong>
        <ul>
            <li v-for="item,key in obj">{{ item }} ~ {{ key }}</li>
        </ul>
    </div>
</template>
```

::: tip
**ref** 接受的数据类型：**基本类型**，**引用类型**。<br>
作用：把参数加工成一个响应式对象，全称为**reference对象(简称为ref对象)** 。<br>
核心原理：如果参数是基本类型那么形成响应式依赖于**Object.defineProperty()**的**get()**和**set()**，如果ref的参数是引用类型，底层ref会借助**reactive**的**proxy**定义响应式变成这样：reactive({value:‘xiaxia’})。
:::

## shallowRef()

**shallowRef()** 方法是 **ref()** 的浅层作用形式<br>
和 **ref()** 不同，浅层 **ref** 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 **.value** 的访问是响应式的。<br>
**shallowRef()** 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。<br>

```vue
<script setup>
	import { ref, shallowRef } from 'vue'
	
	// shallowRef 是 ref 的浅层作用形式，获取原始对象。和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。
	const data = ref({
	    stu: {
	        name: "张三",
	        age: 23,
	        hobby: ['足球', '篮球', '羽毛球']
	    }
	})
	
	const data2 = shallowRef({
	    stu: {
	        name: "张三丰",
	        age: 123,
	        hobby: ['太极', '道教', '武当派']
	    }
	})
	
	// ref 响应式数据是深层次作用（如果是复杂数据类型，最终使用 reactive 处理成 proxy 代理对象）
	console.log("shallowRef.vue数据打印：", data.value)
	console.log("shallowRef.vue数据打印：", data2.value)
	// 第一层数据更新
	const change = () => {
	    data.value = {
	        name: "David",
	        age: 28,
	        sex: "男"
	    }
	    console.log("shallowRef.vue数据打印：", data.value)
	
	    data2.value = {
	        name: "史密斯",
	        age: 87,
	        sex: "男"
	    }
	    console.log("shallowRef.vue数据打印：", data2.value)
	}
	
	const change2 = () => {
	    if (data.value.stu) {
	        data.value.stu = {
	            name: "Lucy",
	            age: 18,
	            sex: "女",
	            eat: ['煎饼果子']
	        }
	    }
	
	    // shallowRef 属于 ref 浅层次的作用。只相应到 .value 层次。但是如果和 ref 一起使用，会受其影响去更新页面数据（注意的是：ref数据必须同步更新到页面上，才可以发起最新数据的扫描行为）。
	    data2.value.stu = {
	        name: "霍去病",
	        age: 887,
	        sex: "男",
	        des: "大汉第一骁将，封狼居胥第一人！！"
	    }
	    console.log("shallowRef.vue数据打印：", data2.value)
	}
	
	const change3 = () => {
	    data.value.stu.hobby.push("橄榄球")
	    data2.value.stu.hobby.push("乒乓球")
	    console.log("shallowRef.vue数据打印：", data2.value)
	}
</script>

<template>
    <div>
        <h3>TheShallowRef页面数据：</h3>
        <ul>
            <li v-for="item in data2.stu">{{ item }}</li>
        </ul>
        <div><em>{{ data }}</em></div>
        <div><em>{{ data2 }}</em></div>
        <button @click="change">第一层（.value）数据更新</button>
        <br>
        <button @click="change2">第二层（.value.stu）数据更新</button>
        <br>
        <button @click="change3">第三层（.value.stu.hobby）数据更新</button>
    </div>
</template>
```

::: tip
**注：shallowRef 与 ref 不能一起使用，不然 ref 的变化会影响 shallowRef 造成视图的更新**
:::

## triggerRef()

**triggerRef()** 强制触发依赖于一个**浅层 ref(shallowRef) 的副作用**，这通常在对浅引用的内部值进行深度变更后使用。

```vue
<script setup>
import { ref, shallowRef, triggerRef } from 'vue'

const refData = ref({
    foo: {
        bar: {
            num: 10
        }
    }
})

const swRefData = shallowRef({
    stu: {
        name: {
            firstname: "弗拉基米尔",
            centername: "",
            lastname: "普京"
        }
    }
})

const change = () => {
    console.log("triggerRef...")
    swRefData.value.stu = {
        name: "张三丰",
        age: 23
    }
    // refData.value.foo.bar.num = 1000
    
    // 触发 shallowRef 数据的更新
    triggerRef(swRefData)
    console.log(swRefData)
}
</script>

<template>
    <div>
        <p>{{ refData }}</p>
        <p>{{ swRefData }}</p>
        <button @click="change">更改数据</button>
    </div>
</template>
```

## customRef()

**customRef()** 创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。<br>
**customRef()** 预期接收一个工厂函数作为参数，这个工厂函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象（手动收集依赖并派发更新）。<br>
一般来说，track() 应该在 get() 方法中调用，而 trigger() 应该在 set() 中调用。<br>
**可以用于创建一个防抖 ref**，即只在最近一次 set 调用后的一段固定间隔后再调用<br>

```vue
<script setup>
    import { customRef, ref } from 'vue'

    const refData = ref("呵呵！")

    // 可以通过自定义 ref 实现防抖操作
    const myRef = (value, delay = 500) => {
        let timer;
        return customRef((track, trigger) => {
            return {
                get() {
                    track();//收集相关依赖
                    return value;
                },
                set(newVal) {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        console.log(newVal)
                        trigger();//触发相关的依赖
                        value = newVal;
                    }, delay)
                }
            }
        })
    }
    let result = myRef("Hello customRef!!")
    // let result = myRef({
    //     foo: {
    //         bar: {
    //             num: 1
    //         }
    //     }
    // })
    console.log("customRef中的数据result:", result)
    let count = 1;
    const change = () => {
        // customRef 防抖处理后，指定时间内连续触发，数据不会发生更改。
        result.value = "Hello 我是更新后的数据！！！" + count++
        // result.value.foo.bar.num = 1000

        // refData.value = "哈哈，我会影响customRef深层数据的更新！"
        console.log("customRef中的数据result:", result.value)
    }
</script>

<template>
    <div>
        <h3>customRef数据演示</h3>
        <div>{{ result }}</div>
        <div>{{ refData }}</div>
        <button @click="change">更新数据</button>
    </div>
</template>
```

## isRef()

**isRef()** 方法用于检查某个值是否为 ref

```JavaScript
import { ref, isRef, unref } from 'vue'

const str = "Hello World!"
const refStr = ref("Hello Ref Data!")

// isRef() 方法用于检查某个值是否为 ref
console.log("isRef检测：", isRef(str));//isRef检测： false
console.log("isRef检测：", isRef(refStr));//isRef检测： true
```

## unref()

**unref()** 如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖。

```JS
import { ref, isRef, unref } from 'vue'

const str = "Hello World!"
const refStr = ref("Hello Ref Data!")

// unref() 如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖。
const strResult = unref(str);
const refStrResult = unref(refStr);
console.log("strResult:", strResult, "refStrResult:", refStrResult);//strResult: Hello World! refStrResult: Hello Ref Data!
```

## ref 用于获取 DOM 元素

```vue
<script setup>
	import { ref, onMounted } from 'vue'
	
	// 页面所有的同步组件完成挂载的声明周期钩子
	onMounted(() => {
	    console.log("moutend钩子：所有的同步组件完成挂载完成...")
	})
	// mouted 生命周期钩子，在 setup 入口函数后执行
	
	// setup 模式下（钩子函数）执行时，页面还没有渲染，所以此时是拿不到元素的
	// 原生的方式获取元素：document.getXXX 系列（四个）  document.queryXXX系列（两个）
	const divELe = document.querySelector(".wrapper")
	console.log('setup钩子期间获取元素：', divELe);
	
	// Vue 提供了 ref 的方式来获取相关的元素
	let wrapper = ref()
	console.log(wrapper)
	console.log(wrapper.value)
	
	// 异步函数中获取元素：这个时候元素已经渲染完成，可以获取到
	const getEle = () => {
	    const divELe = document.querySelector(".wrapper")
	    console.log(divELe);
	
	    console.log(wrapper.value)
	}
</script>

<template>
    <div>
        <div class="wrapper" ref="wrapper">演示通过ref的方式，获取Vue模板中的元素！！</div>
        <button @click="getEle">获取wrpper</button>
    </div>
</template>
```