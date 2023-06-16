---
title: 过滤对象中的空值
date: 2023-06-16
categories: 
 - utils
tags: 
 - utils
sidebar: 'auto'
comment: false
---

## 过滤对象中的空值

```JS
/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj == "object")) {
    return;
  }
  for (let key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      (obj[key] === null || obj[key] === undefined || obj[key] === "")
    ) {
      delete obj[key];
    }
  }
  return obj;
}
```

**页面中使用：**

```JS
import { filterObj } from '@/utils/filterObj.js'

const obj = {
  a: "",
  b: "",
  c: "2",
}

filterObj(obj)  // { c: "2" }
```
