---
title: 前端通过文件流下载文件
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

## 前端通过文件流下载文件

```js
// 文件下载事件
export function downLoadFN(path, name) {
  // 通过后端接口获取文件流
  getDownLoadFile(path).then((res) => {
    let url = window.URL.createObjectURL(res);
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 下载完成移除元素
    window.URL.revokeObjectURL(url); // 释放掉blob对象
    if (res.size) {
      this.$message.success("下载成功");
    } else {
      this.$message.error("下载失败");
    }
  });
}
```
