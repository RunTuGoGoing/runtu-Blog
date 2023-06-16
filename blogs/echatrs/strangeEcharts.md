---
title: 那些奇奇怪怪的echarts
date: 2023-06-20
categories: 
 - echarts
tags: 
 - echarts
sidebar: 'auto'
comment: false
---

## 那些奇奇怪怪的echarts（真的折磨人）

<img src='../../assets/image/echarts/echarts01.png' alt="" style='display: block;margin: 0 auto' />

实例代码：

```vue
<template>
  <div class="back0">
    <div id="_echarts1"></div>
  </div>
</template>

<script>
import { fillImg } from "@/utils/fillImg.js";
export default {
  components: {},
  data() {
    return {
      fillImg,
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 10, 10, 10, 10],
      percentdata: [
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
        "0%",
      ],
      leftname: [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "12",
        "13",
        "14",
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // echarts生成
    init() {
      const data = [];
      const totaldata = [];
      const percentdata = [];
      this.data.forEach((item) => {
        totaldata.push(90); // 固定写法push 90
        data.push((81.3 * item) / 100); // 81.3为固定写法。100指的是数组中的最大值，动态获取
        percentdata.push(item);
      });
      let dataX = this.leftname; //翻转
      const _echarts1 = this.$echarts.init(document.getElementById("_echarts1")); // 获取DOM元素
      const option = {
        grid: {
          top: "0%",
          left: "19.55%",
          bottom: 0,
        },
        xAxis: [
          {
            show: false,
          },
        ],
        yAxis: [
          {
            axisTick: "none",
            axisLine: "none",
            offset: "10",
            axisLabel: {
              margin: 10,
              textStyle: {
                color: "#000",
                fontSize: "14",
              },
            },
            // 如果不需要展示左边name属性则将axisLabel属性改成false即可
            // axisLabel: {
            //   show: false,
            // },
            data: dataX,
            // data也可为空数组但是必须得有
          },
          {
            axisTick: "none",
            axisLine: "none",
            type: "category",
            axisLabel: {
              margin: -10,
              textStyle: {
                color: "#000",
                fontSize: "14",
              },
            },
            // 如果不需要展示右边百分比则将axisLabel属性改成false即可
            // axisLabel: {
            //   show: false,
            // },
            data: percentdata,
            // data也可为空数组但是必须得有
          },
          {
            name: "",
            nameGap: "10",
            nameTextStyle: {
              color: "#000",
              fontSize: "18",
            },
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)",
              },
            },
            data: [],
          },
        ],
        series: [
          {
            name: "", // blue bar
            type: "pictorialBar",
            symbol: "image://" + this.fillImg, //特殊样式
            // symbol: "image",
            barWidth: "100%",
            symbolOffset: [5, 0],
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: "#6DE8FA",
              },
            },
            symbolSize: ["79%", 13],
            symbolBoundingData: 100,
            symbolClip: true,
            data: data,
            label: {
              normal: {
                show: false,
              },
            },
            animationDelay: function () {
              return 400;
            },
          },
          {
            name: "外框",
            type: "bar",
            // 如果想要背景框也是同样的形式也可以按照上方数组中的写法使用pictorialBar type
            // type: "pictorialBar",
            // symbol: "image://" + this.fillImg, //特殊样式
            yAxisIndex: 2,
            barGap: "-100%",
            data: totaldata,
            barWidth: 20,
            animation: false,
            // barCategoryGap:'200',
            itemStyle: {
              normal: {
                color: "#001629", //填充色
                barBorderColor: "#5984FF", //边框色
                barBorderWidth: 1, //边框宽度
                barBorderRadius: 0, //圆角半径
                label: {
                  //标签显示位置
                  show: false,
                  position: "top", //insideTop 或者横向的 insideLeft
                },
              },
            },
            z: 0,
          },
        ],
      };
      _echarts1.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.back0 {
  #_echarts1 {
    width: 400px;
    height: 400px;
  }
}
</style>
```

图片资源：

```JS
export const fillImg =
  "data:image/png;base64,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";
```
