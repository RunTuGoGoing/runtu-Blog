---
title: vue刷新当前页面
date: 2023-03-01
categories: 
 - Vue2
 - Vue3
tags: 
 - Vue2
 - Vue3
sidebar: 'auto'
comment: false
---

## 通过provide和inject来实现刷新当前页面

### 场景

项目当中如果做新增/修改/删除等等操作通常情况下都需要刷新数据或者刷新当前页面。<br>
- 如果页面简单，调用接口刷新数据即可。
- 如果页面复杂，需要调用多个接口或者通知多个子组件做刷新，可以采用刷新当前页面的方式，通过provide和inject来实现刷新当前页面是最优的方法

### 概述

通过在父页面的<**router-view**></**router-view**>上添加v-if的控制来销毁和重新创建页面的方式刷新页面,并且用到provide和inject实现多层级组件通信方式,父页面通过provide提供reload方法,子页面通过inject获取reload方法,调用方法做刷新

### 代码实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/2.6.14/vue.js" type="application/javascript"></script>
    <script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue-router/3.5.3/vue-router.min.js" type="application/javascript"></script>
    <style>
    * {padding:0;margin:0;}
    .container { padding: 10px;display: flex;flex-basis: auto;height: 100vh;box-sizing: border-box;}
    .aside{ width:200px;background-color: #d3dce6; }
    .main { flex: 1; }
    </style>
</head>

<body>
    <div id="app">
        <router-view></router-view>
    </div>
</body>

<script>
// 框架页
let Layout = {
    template: `
        <div class="container">
            <div class="aside">左侧菜单</div>    
            <!-- 通过v-if实现销毁和重新创建组件 -->
            <div class="main"><router-view v-if="isRouterAlive"></router-view></div>
        </div>
    `,
    created() {
        console.log('框架页加载')
    },
    // 通过provide提供reload方法给后代组件
    provide(){
        return {
            reload: this.reload
        }
    },
    data(){
        return {
            isRouterAlive: true
        }
    },
    methods: {
        async reload(){
            this.isRouterAlive = false
            //通过this.$nextTick()产生一个微任务,在一次dom事件循环后,重新创建组件
            await this.$nextTick()
            this.isRouterAlive = true
        }
    }
}

// 首页
let Home = {
    template: `
        <div>
            首页
            <button @click="onClick">刷新</button>
        </div>
    `,
    created() {
        console.log('首页加载')
    },
    //通过inject获取祖先元素的reload方法
    inject: ['reload'],
    methods: {
        onClick(){
            this.reload()
        }
    },
}

// 路由配置
let router = new VueRouter({
    routes: [
        {path: '/', component: Layout, children:[
            {path: '', component: Home}
        ]}
    ]
}) 

Vue.use(VueRouter)

// 根组件
new Vue({
    router,
    el: '#app'
})
</script>

</html>
```

