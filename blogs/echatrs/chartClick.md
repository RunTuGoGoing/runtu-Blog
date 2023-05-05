---
title: echarts 点击事件
date: 2023-02-23
categories: 
 - echarts
tags: 
 - echarts
sidebar: 'auto'
comment: false
---

## echarts 点击事件

**场景**：多用于折线图以及柱状图，当数据差距过大的时候，原生的点击事件可能不好触发，这个时候就需要点击空白区域也能实现相同的效果

**代码如下：**

```JS
/**
 * echarts 点击事件
 * @param {DOM} dom 注册echarts的dom元素
 * @returns {callback}
 */
export function areaClick(dom, callback) {
  if (!dom) return new Error("Please pass in the dom structure");
  dom.getZr().on("click", (params) => {
    const pointInPixel = [params.offsetX, params.offsetY];
    if (dom.containPixel("grid", pointInPixel)) {
      let xIndex = dom.convertFromPixel({ seriesIndex: 0 }, [
        params.offsetX,
        params.offsetY,
      ])[0];
      const yIndex = dom.convertFromPixel({ seriesIndex: 0 }, pointInPixel)[1];
      var op = dom.getOption();
      const xAxis = op.xAxis;
      const yAxis = op.yAxis;
      const series = op.series;
      let result = {
        xAxis,
        yAxis,
        series,
      };
      callback({ result, clickIndex: xIndex, yIndex, xIndex });
    }
  });
}
```

**页面中的使用方法：**

```JS
import { areaClick } from "@/utils/chartTools";

// 在echarts的init函数中的setOption函数后
// _eachrts是echarts实例
areaClick(_eachrts, (obj) => {
    const index = obj.clickIndex;
    const name = obj.result.xAxis[0].data[index];
    console.log(index, name)
});
```