---
title: Vuex
date: 2023-02-21
categories: 
 - Vue2
tags: 
 - Vue2
sidebar: 'auto'
comment: false
---

## 一、Vuex 概述

### 1. Vuex 是什么？
Vuex是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享

### 2. 什么样的数据适合存储到 Vuex 中
一般情况下，只有组件之间共享的数据，才有必要存储到 Vuex 中，对于组件中的私有数据，依旧存储在组件自身的 data 中即可。

## 二、Vuex基本使用

### 1. 安装 Vuex 依赖包
```JavaScript
npm install vuex --save
```

### 2. 导入 Vuex 包
```JavaScript
import Vuex from "vuex"
```

### 3. 创建 store 对象
```JavaScript
const store = new Vuex.Store({
    // state 中存放的就是全局共享的数据
    state: { count: 0 }
})
```

### 4. 将 store 对象挂载到 vue 实例中
```JavaScript
new Vue({
    el: "#app",
    render: h => h(app),
    router,
    // 将创建的共享数据对象，挂载到 Vue 实例中
    // 所有的组件，就可以直接从 store 中获取全局的数据了
    store
})
```
```JavaScript
// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters: {

    },
    modules: {

    }
})
```

## 三、Vuex 的核心概念概述

#### Vuex 中的主要核心概念如下
    - State
    - Mutation
    - Action
    - Getter
    - Module

### 1. State
State 提供唯一的**公共数据源**，所有共享的数据都要统一放到 Store 的 State 中进行存储。
```JavaScript
// 创建 Store 数据源，提供唯一公共数据
const store = new Vuex.Store({
    state: { count: 0 }
})
```
组件访问 State 中数据的**第一种方式**
```JavaScript
this.$store.state.全局数据名称

this.$store.state.count // 0
```
```Vue
<template>
    <div>
        <h3>当前最新的count值为：{{ $store.state.count }}</h3>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>
```
组件访问 State 中数据的**第二种方式**
**mapState 访问，利用展开运算符**
```JavaScript
// 1. 从 vuex 中按需导入 mapState 函数
import { mapState } from "vuex"
```
通过刚才导入的 mapState 函数，将当前组件需要的全局数据，映射为当前组件的 computed 计算属性
```JavaScript
// 2. 将全局数据，映射为当前组件的计算属性
computed: {
    ...mapState(["count"])
}
```

### 2. Mutation
Mutation 用于变更 Store 的数据
 - 只能通过 mutation 变更 Store 中的数据，不可以直接操作 Store 中的数据
 - 通过这种方式虽然操作起来繁琐一些，但是可以集中监控所有数据的变化

```JavaScript
// 定义 Mutation
const store = new Vuex.Store({
    state: {

    },
    mutations: {
        add(state) {
            // 变更状态
            state.count ++ 
        }
    }
})
```
```JavaScript
// 触发 mutation
methods: {
    handle1() {
        // 触发 mutations 的第一种方式
        // commit 的作用就是调用某个 mutation 函数
        this.$store.commit("add")
    }
}
```

同时我们也可以触发 mutations 的时候去传递参数
```JavaScript
// 定义 Mutation
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add(state) {
            // 变更状态
            state.count ++ 
        },
        addN(state, step) {
            // 变更状态
            state.count += step
        }
    }
})
```
```JavaScript
// 触发 mutation
methods: {
    handle1() {
        // 触发 mutations 的第一种方式
        // commit 的作用就是调用某个 mutation 函数
        this.$store.commit("add")
    },
    handle2() {
        // 再调用 commit 函数
        // 触发 mutations 时携带参数
        this.$store.commit("addN", 3)
    }
}
```

this.$store.commit() 是触发 mutations 的**第一种方式**<br>
Mutation 触发的**第二种方式**<br>
```JavaScript
// 1. 从 vuex 中按需导入 mapMutations 函数
import { mapMutations } from "vuex"
```
通过刚才导入的 mapMutations 函数，将需要的 mutations 函数，映射为当前组件的 methods 方法
```JavaScript
// 2. 将指定的 mutations 函数，映射为当前组件的 methods 函数
methods: {
    ...mapMutations(["add", "addN"])
}
```

```
1. mutation 中不能写异步代码
2. 异步代码在 action 中使用
3. dispatch 触发 action 中的异步函数
```

### 3. Action
Action 用于处理异步任务
如果通过异步操作变更数据，必须通过 Action，而不能使用 Mutation，但是在 Action 中还是要通过触发 Mutation 的方式间接变更数据
```JavaScript
// 定义 Action
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add(state) {
            state.count ++
        }
    },
    actions: {
        addAsync(context) {
            setTimeout(() => {
                // 在 actions 中，不能直接修改 state 中的数据
                // 必须用过 context.commit() 触发某个 mutation 才行
                context.commit("add")
            }, 1000)
        }
    }
})
```
```JavaScript
// 触发 Action
methods: {
    handle() {
        // 触发 actions 的第一种方式
        // 这里的 dispatch 函数，专门用来触发 actions
        this.$store.dispatch("addAsync")
    }
}
```

**actions 异步携带参数**<br>
触发 actions 异步任务的时候携带参数
```JavaScript
// 定义 Action
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add(state) {
            state.count ++
        },
        addN(state, step) {
            state.count += step
        }
    },
    actions: {
        addAsync(context) {
            setTimeout(() => {
                // 在 actions 中，不能直接修改 state 中的数据
                // 必须用过 context.commit() 触发某个 mutation 才行
                context.commit("add")
            }, 1000)
        },
        addNAsync(context, step) {
            setTimeout(() => {
                // 在 actions 中，不能直接修改 state 中的数据
                // 必须用过 context.commit() 触发某个 mutation 才行
                context.commit("addN", step)
            }, 1000)
        }
    }
})
```
```JavaScript
// 触发 Action
methods: {
    handle1() {
        // 触发 actions 的第一种方式
        // 这里的 dispatch 函数，专门用来触发 actions
        this.$store.dispatch("addAsync")
    },
    handle2() {
        // 再调用 dispatch 函数
        // 触发 actions 时携带参数
        this.$store.dispatch("addNAsync", 5)
    }
}
```

this.$store.dispatch() 是触发 actions 的**第一种方式**<br>
**Action 触发第二种方式**
```JavaScript
// 1. 从 vuex 中按需导入 mapActions 函数
import { mapActions } from "vuex"
```
通过刚才导入的 mapActions 函数，将需要的actions 函数，映射为当前组件的 methods 方式
```JavaScript
// 2. 将指定的 actions 函数，映射为当前组件的 methods 函数
methods: {
    ...mapActions(["addAsync", "addNAsync"])
}
```

### 4. Getter
Getter 不回修改原数据，类似于 computed 计算属性
Getter 用于对 Store 中的数据进行加工处理形成新的数据
 - Getter 可以对 Store 中已有的数据加工处理之后形成新的数据，类似 Vue 的计算属性
 - Store 中数据发生变化，Getter 的数据也会跟着变化
```JavaScript
// 定义 Getter
const store = new Vuex.Store({
    state: {
        count: 0
    },
    getters: {
        showNum: state => {
            return "当前最新的数量是" + state.count
        }
    }
})
```
使用 getters 的**第一种方式**
```JavaScript
this.$store.getters.名称
```
使用 getters 的**第二种方式**
```JavaScript
import { mapGetters } from "vuex"

computed: {
    ...mapGetters(["showNum"])
}
```

## 四、按功能进行拆分 - Module
根据不同的功能，添加不同的store，每个store里面维护自己的state，以及自己的actions/mutations/getters。
```JavaScript
// 1. 在之前的store上，增加一个新的仓库store2，主要代码如下

// store2.js

const store2 = {
  state: {
    name: '我是store2',
  },
  mutations: {},
  getters: {},
  actions: {},
};

export default store2;
```
```JavaScript
// 2. 然后在store中引入我们新创建的store2模块

import Vue from 'vue';
import Vuex from 'vuex';
import store2 from './store2'; // 引入store2模块

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { store2 }, // 把store2模块挂载到store里面
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});

export default store;
```
```Vue
// 3. 访问state - 我们在App.vue测试访问store2模块中的state中的name，结果如下
<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.store2.name); // 访问store2里面的name属性
  },
};
</script>
```

**我们通过下面的代码可以了解到在不同的属性里是怎么访问 模块内的状态 或者 根状态**
```JavaScript
mutations: {
  changeName(state, payload) {
    // state 局部状态
    console.log(state);
    console.log(payload.where);
  },
},
getters: {
  testGetters(state, getters, rootState) {
    // state 局部状态
    console.log(state);
    // 局部 getters,
    console.log(getters);
    // rootState 根节点状态
    console.log(rootState);
  },
},
actions: {
  increment({ state, commit, rootState }) {
    // state 局部状态
    console.log(state);
    // rootState 根节点状态
    console.log(rootState);
  },
},
```