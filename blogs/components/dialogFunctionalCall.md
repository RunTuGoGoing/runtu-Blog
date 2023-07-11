---
title: dialog函数式调用组件封装
date: 2023-07-11
categories: 
 - components
tags: 
 - components
sidebar: 'auto'
comment: false
---

## dialog函数式调用组件封装

### vue组件挂载类型

vue中组件的挂载分为两种类型：

- vue.extend()
- render函数

### 组件挂载代码示例

#### vue.extend()

针对 vue.extend() 方法就可以实现dialog函数式调用组件封装<br />

首先我们在项目的components文件夹中新建里一个GConfirm文件，其中有一个index.vue文件编写弹窗样式，一个index.js文件编写逻辑函数

```vue
<!--index.vue-->
<template>
    <transition name="el-zoom-in-center">
        <div v-if="visible" class="GConfirm">
            <div class="GConfirm_box">
                <div class="GConfirm_box_title">
                    <div class="title">
                        <p>{{ title }}</p>
                    </div>
                    <div
                        v-show="type === 'all_displayed'"
                        class="GConfirm_box_title_close"
                        @click="GCancel"
                        style="width: 20px; height: 20px;"
                    >
                    </div>
                </div>
                <div class="GConfirm_box_content">
                    <p>{{ content }}</p>
                </div>
                <div class="GConfirm_box_button">
                      <div v-show="type === 'all_displayed' || type === 'both_displayed'" class="btn cancel-btn" @click="GCancel">
                        <p>取消</p>
                      </div>
                      <div
                          v-show="type === 'all_displayed' || type === 'confirm' || type === 'both_displayed'"
                          class="btn confirm-btn"
                          @click="GConfirm"
                      >
                        <p>确定</p>
                      </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "GConfirm",
    data() {
        return {
            title: "",
            content: "",
            visible: false,
            type: "all_displayed", // 'confirm' 只显示确定  'all_displayed' 全部显示  'not_displayed' 都不显示  'both_displayed' 确认 取消
            success: "",
            cancel: ""
        };
    },
    methods: {
        open({ title, content, type = "all_displayed", success = () => {}, cancel = () => {} }) {
            this.title = title;
            this.visible = true;
            this.type = type;
            this.content = content;
            this.success = success;
            this.cancel = cancel;
        },
        GConfirm() {
            this.visible = false;
            this.success();
        },
        GCancel() {
            this.visible = false;
            this.cancel();
        }
    }
};
</script>

<style scoped lang="scss">
.GConfirm {
    box-sizing: border-box;
    padding: 60px 0;
    width: 100%;
    height: 100%;
    background: rgba(2, 10, 26, 0.5);
    z-index: 999999999;
    position: fixed;
    bottom: 0;
    left: 0;
    .GConfirm_box {
        width: 480px;
        height: 216px;
        background-size: 100%;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .GConfirm_box_title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 12px 10px;
            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-size: 24px;
                    font-family: HYZongYiJ;
                    color: #acfaff;
                    letter-spacing: 4px;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                }
            }
            .GConfirm_box_title_close {
                width: 32px;
                height: 32px;
                cursor: pointer;
            }
        }
        .GConfirm_box_content {
            box-sizing: border-box;
            padding: 14px 20px 20px 30px;
            width: 100%;
            height: 100%;
            p:nth-of-type(1) {
                font-size: 20px;
                font-family: SourceHanSansCN-Bold, SourceHanSansCN;
                font-weight: bold;
                color: #fc4b4a;
            }
            p:nth-of-type(2) {
                margin: 10px 0 0 0;
                font-size: 20px;
                font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.8);
            }
        }
        .GConfirm_box_button {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            box-sizing: border-box;
            padding: 0 24px 18px 20px;
            .btn {
                width: 80px;
                height: 34px;
                font-size: 14px;
                font-family: SourceHanSansCN-Bold, SourceHanSansCN;
                font-weight: bold;
                color: #e5f5ff;
                letter-spacing: 4px;
                text-shadow: 0 3px 20px #1b7898;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                user-select: none;
            }
            .cancel-btn {
                background: linear-gradient(180deg, rgba(0, 62, 200, 0) 0%, #004d86 100%);
                border-radius: 2px;
                border: 1px solid #278aff;
                opacity: 0.7;
            }
            .confirm-btn {
                margin: 0 0 0 12px;
                background: linear-gradient(360deg, rgba(48, 145, 255, 0.8) 0%, #47d2ff 100%);
                box-shadow: inset 0 0 20px 0 rgba(30, 201, 255, 0.5);
                border-radius: 2px;
                border: 2px solid;
                border-image: linear-gradient(332deg, rgba(43, 145, 255, 0), rgba(199, 245, 255, 0.62), rgba(43, 145, 255, 0)) 2 2;
                backdrop-filter: blur(0px);
            }
        }
    }
}
</style>
```

```javascript
// index.js
import GConfirm from "./index.vue";
import Vue from "vue";
const GC = Vue.extend(GConfirm);
const G_Confirm = (options) => {
    // 获取页面做了适配的盒子元素
    const ScreenAdapter = document.querySelector(".ScreenAdapter");
    const g_confirm = new GC();
    g_confirm.$mount();
    // 指向全局dialog组件，为了让全局组件挂在到盒子里，具有页面适配功能，不然他只会挂载到body下，与app同级，不具备页面适配效果
    ScreenAdapter.append(g_confirm.$el);
    g_confirm.open(options);
    // 弹窗关闭后销毁组件
    g_confirm.remove = function () {
        const g_confirmDom = document.getElementById("g_confirm");
        try {
            ScreenAdapter.removeChild(g_confirmDom);
            g_confirm.$destroy();
        } catch (e) {}
    };
};
export default G_Confirm;
```

最后我们去 **main.js**，也就是入口文件中去挂载

```javascript
import G_Confirm from "@/components/GConfirm/index.js";
Vue.prototype.$GConfirm = G_Confirm
```

页面使用方法如下所示

```javascript
this.$GConfirm({
    title: "标题",
    content: "内容",
    success: () => {
        console.log("确认")
    },
    cancel: () => {
        console.log("取消")
    }
});
```

::: tip
这里如果遇到想要自定义content的内容，可以采用v-html的写法。
:::

#### render函数

关于 render 函数，就借用网上的例子<br />

同样是一个vue文件加上js文件处理的形式

```vue
<!--notice.vue-->
<template>
  <div class="box">
    <h3>{{ title }}</h3>
    <div class="box-content">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      iShow: false
    }
  },
  methods: {
    show() {
      this.iShow = true
      setTimeout(this.hide, this.duration)
    },
    hide() {
      this.iShow = false
      this.remove()
    }
  }
}
</script>

<style scoped>
    .box {
        position: fixed;
        width: 300px;
        top: 100px;
        right: 0;
        text-align: center;
        pointer-events: none;
        background-color: #fff;
        border: grey 3px solid;
        box-sizing: border-box;
    }
    .box-content {
        width: 200px;
        margin: 10px auto;
        font-size: 14px;
        padding: 8px 16px;
        background: #fff;
        border-radius: 3px;
        margin-bottom: 8px;
    }
</style>
```

```javascript
// notice.js
import Vue from 'vue'
function notice(Component, props) {
  const vm = new Vue({
    render: h => h(Component, { props })
  }).$mount()
  document.body.appendChild(vm.$el)
  const comp = vm.$children[0]
  // 需要对挂载的组件进行删除
  comp.remove = function() {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp
}
export default notice
```

main.js文件引入

```javascript
import create from './notice'
Vue.prototype.$create = create
```

方法调用

```javascript
import Notice from '../Notice'
// 此处的notice组件需要引入
this.$create(Notice, {
                title: '自己封装弹窗',
                message: '你好，这是自己写的弹窗',
                duration: 1000
            }).show()
```

::: tip
render函数作用：<br />
是vue通过js渲染dom结构的函数createElement，可以简写为h；<br />
这个函数会生成一个虚拟dom节点，render函数得到这个dom节点函数之后，返回给mount函数，渲染为真实的dom节点，并挂载到根节点上。
:::
