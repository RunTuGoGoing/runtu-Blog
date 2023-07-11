---
title: el-table表格样式问题
date: 2023-03-08
categories: 
 - components
tags: 
 - components
sidebar: 'auto'
comment: false
---

## el-table表格样式问题

在使用element组件table的时候会遇到的样式问题：
- 当内容过长出现滚动条时，滚动条相交处会出现白点的样式问题
- 出现滚动条时，table的表头会出现一列空白框

### 解决方法

```js
/* 滚动条相交处 */
::-webkit-scrollbar-corner {
    background-color: #092a46;
}
/* table */
.el-table th.gutter {
    display: none;
    width: 0;
}
.el-table colgroup col[name="gutter"] {
    display: none;
    width: 0;
}
```

::: tip
就是单纯的解决样式问题
:::
