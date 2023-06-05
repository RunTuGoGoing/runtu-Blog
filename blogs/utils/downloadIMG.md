---
title: 前端下载图片
date: 2023-06-02
categories:
  - utils
  - Vue2
  - Vue3
tags:
  - utils
  - Vue2
  - Vue3
sidebar: "auto"
comment: false
---

## 前端下载图片

```js
// 下载图片事件
export function downUploadFn() {
  let image = new Image();
  let that = this;
  // 解决跨域 Canvas 污染问题
  image.setAttribute("crossOrigin", "anonymous");
  image.onload = function () {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL("image/png");
    // 生成一个a元素
    let a = document.createElement("a");
    // 创建一个单击事件
    let event = new MouseEvent("click");
    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
    a.download = that.imageDownUploadName || "下载图片名称";
    // 将生成的URL设置为a.href属性
    a.href = url;
    // 触发a的单击事件
    a.dispatchEvent(event);
  };
  image.src = document.getElementById("downloadImage").src;
  // window.open(this.imageView)
}
```
