---
title: 大屏适配
date: 2023-06-16
categories: 
 - Vue2
tags: 
 - Vue2
sidebar: 'auto'
comment: false
---

## 大屏适配

### 适配的方法

- 按照设计稿的尺寸，将px按比例计算转为vw和vh
- 通过 scale 属性，根据屏幕大小，对图表进行整体的等比缩放
- 获得 rem 的基准值，动态的计算html根元素的font-size，图表中通过 vw vh 动态计算字体、间距、位移等

这 3 种方案中，最简单的也最容易抽离为下次使用的当属 scale 方案了。<br>
封装成组件后，在需要的地方使用即可

```vue
<template>
  <div class="ScreenAdapter" :style="style">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ScreenAdapter',
  props: {
    width: {
      type: String,
      default: "1920",
    },
    height: {
      type: String,
      default: "1080",
    },
  },
  data() {
    return {
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        transform: 'scale(1) translate(-50%, -50%)',
      },
    };
  },
  mounted() {
    this.setScale();
    window.onresize = this.Debounce(this.setScale, 200);
  },
  methods: {
    Debounce: (fn, t) => {
      const delay = t || 500;
      let timer;
      return function () {
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        const context = this;
        timer = setTimeout(() => {
          timer = null;
          fn.apply(context, args);
        }, delay);
      };
    },
    // 获取放大缩小比例
    getScale() {
      const w = window.innerWidth / this.width;
      const h = window.innerHeight / this.height;
      return w < h ? w : h;
    },
    // 设置比例
    setScale() {
      this.style.transform =
        'scale(' + this.getScale() + ') translate(-50%, -50%)';
    },
  },
};
</script>

<style>
body{
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.ScreenAdapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
}
</style>

```
