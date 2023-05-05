---
title: echarts tooltip自动轮播
date: 2023-02-23
categories: 
 - echarts
tags: 
 - echarts
sidebar: 'auto'
comment: false
---

## echarts tooltip自动轮播

**代码如下：**

```JS
/**
 *  echarts tooltip 自动轮播
 *  @param myChart  //初始化echarts的实例
 *  @param option   //指定图表的配置项和数据
 *  @param num      //类目数量(原因：循环时达到最大值后，使其从头开始循环)
 *  @param time     //轮播间隔时长
 */
export function autoHover(myChart, option, num, time) {
  var defaultData = {
    //设置默认值
    time: 1000,
    num: 15,
  };
  if (!time) {
    time = defaultData.time;
  }
  if (!num) {
    num = defaultData.num;
  }
  var count = 0;
  var timeTicket = null;
  timeTicket && clearInterval(timeTicket);
  timeTicket = setInterval(function () {
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: 0, //serieIndex的索引值   可以触发多个
    });
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: count,
    });
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: count,
    });
    count++;
    if (count >= num) {
      count = 0;
    }
  }, time);
  myChart.on("mouseover", function (params) {
    clearInterval(timeTicket);
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
    });
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: params.dataIndex,
    });
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: params.dataIndex,
    });
  });

  myChart.on("mouseout", function (params) {
    timeTicket && clearInterval(timeTicket);
    timeTicket = setInterval(function () {
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0, //serieIndex的索引值   可以触发多个
      });
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: count,
      });
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: count,
      });
      count++;
      if (count >= num) {
        count = 0;
      }
    }, 3000);
  });

  return timeTicket;
}
```

**页面中的使用方法：**

```JS
import chartTools from "@/utils/chartTools.js";

data() {
    return {
        timeTick: null,
    };
},

beforeDestroy() {
    this.timeTick && clearInterval(this.timeTick);
},

// 在echarts的init函数中的setOption函数后
this.timeTick && clearInterval(this.timeTick);
this.timeTick = chartTools.autoHover(
    _echarts, // echarts实例
    option, // 图表的配置项和数据
    option.series[0].data.length, // 类目数量(原因：循环时达到最大值后，使其从头开始循环)
    2000 // 轮播间隔时长
);
```