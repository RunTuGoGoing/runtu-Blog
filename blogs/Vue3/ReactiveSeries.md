---
title: reactive 系列
date: 2023-02-21
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## reactive()

reactive() 函数用于返回一个对象的响应式代理。与 ref() 函数定义响应式数据的异同点如下

- ref 函数和 reactive 函数都是用来定义响应式数据的。
- **ref 函数更适合定义基本数据类型（可接收基本数据类型和对象）**
    - 函数参数可以是基本数据类型，也可以接受对象类型
    - 如果参数是对象类型时，其实底层的本质还是 reactive，系统会自动给 ref 传入的值进行转换

```JS
ref(1) -> reactive({ value:1 })
// ref函数只能操作浅层次的数据，把基本数据类型当作自己的属性值；深层次依赖于reactive
```

在 template 中访问，系统会自动添加 .value 。在 js 中需要手动 .value 进行访问

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

    ref 响应式原理是依赖于Object.defineProperty()的get()和set()的

- reactive 函数更适合定义复杂的数据类型（json/arr/obj/map/set）
    - 它的响应式是更加‘深层次’的（会影响对象内部所有嵌套的属性，所有的数据都是响应式的），底层本质是将传入的数据包装成一个 JavaScript Proxy，其行为表现与一般对象相似。不同之处在于 Vue 能够跟踪对响应式对象属性的访问与更改操作。因此不等于源对象，建议只使用响应式代理，避免使用原始对象。

```JS
import { reactive } from 'vue'

let list = reactive([])
const addData = () => {
	setTimeout(() => {
		let arr = ['banana','orange','peal']
		list.push(...arr)
		console.log(list)
	},1000)
}
```

参数必须是对象或者数组，如果要让对象的某个元素实现响应式时比较麻烦。需要使用 toRefs 函数处理

```JS
import { reactive, toRefs } from 'vue'

// 通过 reactive 定义响应式数据
const state = reactive({
    // 定义每一个表单控件的配置项：type类型、label文本、prop绑定字段 等信息
    items: [{
        label: "用户名",
        prop: "name",
        inputwidth: "100%",
    }, {
        password: true,
        label: "密码",
        prop: "pwd",
        inputwidth: "100%",
        rules: [{ required: true, message: "请输入密码", trigger: 'blur' }]
    }, {
        label: "手机号",
        prop: "phone",
        inputwidth: "100%",
        required: true,
        validateType: "phone"
    }],
    // 定义每一个表单绑定字段对应的信息（form表单数据信息）
    formData: {
        name: "",
        pwd: "",
        phone: ""
    },
    // form 元素配置信息
    options: {
        size: "small",
        formWidth: "35%",//表单占父元素的宽度
        labelWidth: "80px",//标签的长度
    },
})

// 通过 toRefs 获取 reactive 中的每一项属性的引用（js中调用使用 .value，template 中直接使用自动解析）
const { items, formData, options } = toRefs(state);

console.log(items,options)
```

获取数据值的时候直接获取，不需要加.value

```JS
import { reactive } from 'vue'

// 响应式状态
const state = reactive({
  count: 0
})

// 打印count的值
console.log(state.count)
```

## readonly()

readonly() 函数接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。本身不能去修改值，但受原始对象改变的影响。

```JS
import { readonly } from "vue"

let obj = reactive({name:"Jack"})

let readObj = readonly(obj)

const change = () => {
	// 不能直接修改只读属性
	// readObj.name = "Lucy";
	
	// 受原始对象改变的影响
	obj.name = "David";
	console.log(obj,readObj);
}
```

::: tip
只读代理是深层的：对任何嵌套属性的访问都将是只读的。它的 ref 解包行为与 reactive() 相同，但解包得到的值是只读的。
:::

## shallowReactive()

reactive() 的浅层作用形式。和 reactive() 不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。

```JS
import { reactive,shallowReactive } from "vue";

const stu = reactive({name:"Jack"})

const obj = shallowReactive({
	foo:{
		bar:{
			num:1
		}
	}
})

const change = () => {
	// reactive() 作用是深层次的，和shallowReactive() 一起使用时，会影响其数据变化
	stu.name = "David"
	// shallowReactive() 作用是浅层的，只能修改第一层的数据。深层次数据无法修改。但是会受reactive数据修改的影响。
	obj.foo.bar.num = 1000;
	console.log(obj)
}
```

## shallowReadonly()

readonly() 的浅层作用形式。和 readonly() 不同，这里没有深层级的转换：只有根层级的属性变为了只读。属性的值都会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。同样会受原始对象数据改变的影响。

```JS
const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性会失败
state.foo++

// ...但可以更改下层嵌套对象
isReadonly(state.nested) // false

// 这是可以通过的
state.nested.bar++
```

## isReactive() 和 isReadonly()
- isReactive() 函数检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。
- isReadonly() 函数检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。
