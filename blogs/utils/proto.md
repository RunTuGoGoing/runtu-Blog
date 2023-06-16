---
title: 拓展原型
date: 2023-06-16
categories: 
 - utils
tags: 
 - utils
sidebar: 'auto'
comment: false
---

## 拓展原型

```JS
/**
 * 四舍五入 解决toFixed精度问题
 * @param {Number} n 保留几位小数
 * @returns {Number}
 */
Number.prototype.newFixed = function (n = 2) {
    let temp = (this + "").split(".");
    if (!temp[1] || temp[1].length <= n) {
        result = this.toFixed(n);
    } else {
        let nlast = temp[1].substring(n, n + 1);
        temp[1] = temp[1].substring(0, n) + (nlast >= 5 ? "9" : "1");
        result = Number([temp[0], temp[1]].join(".")).toFixed(n);
    }
    return result;
};

/**
 * 去除首位空格
 * @returns {String}
 */
String.prototype.trim = function () {
    return this.replace(/^\s+/, '').replace(/\s+$/, '') //利用正则表达式
}
```

**在main.js中引入**

```JS
import "@/utils/proto"; // 拓展原型
```
