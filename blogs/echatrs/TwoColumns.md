---
title: echarts 左右两列图例写法
date: 2023-03-01
categories: 
 - echarts
tags: 
 - echarts
sidebar: 'auto'
comment: false
---

## echarts 左右两列图例写法

做echarts的时候会遇到要求图例在图两边的情况，如下图：

<img src="../../assets/image/echarts/twoColumns.png" alt="" style="display: block; margin: 0 auto;" />

这种时候如果用盒子定位的话就会无法使用原生legend自带的一些方法<br>
其实legend支持数组的写法，其中每一个对象就代表的一边<br>
把原来的data拆成两份放到legend的每个对象当中
代码实现：

```js
let options = {
    legend: [
        {
            show: false,
            top: "12.5%",
            left: "10",
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            orient: "vertical",
            selectedMode: false, // 取消图例上的点击事件
            itemGap: 21,
            textStyle: {
                fontSize: 18,
                fontWeight: 400,
                color: "#FFFFFF"
            },
            data: that.company.slice(0, 4)
        },
        {
            show: false,
            top: "12.5%",
            orient: "vertical",
            right: "40",
            icon: "circle",
            selectedMode: false, // 取消图例上的点击事件
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 21,
            textStyle: {
                fontSize: 18,
                fontWeight: 400,
                color: "#FFFFFF"
            },
            data: that.company.slice(4)
        }
    ],
}
```