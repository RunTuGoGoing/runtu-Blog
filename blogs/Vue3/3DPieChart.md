---
title: 3D饼图绘制
date: 2023-09-01
categories: 
 - Vue3
tags: 
 - Vue3
sidebar: 'auto'
comment: false
---

## 3D饼图绘制

### 安装echarts和echarts-gl

```bash
npm install echarts
npm install echarts-gl
// echarts版本5.x的话需要对应echarts-gl版本2.x
// echarts版本4.x的话需要对应echarts-gl版本1.x
```

### 渲染函数

```vue
<template>
    <div class="pieChart" id="pieChart"></div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import * as echarts from "echarts";
import "echarts-gl";

onMounted(() => {
    setTimeout(() => {
        initPieChart();
    }, 50);
});

// 3D饼图
let pieData = reactive([
    {
        name: "信息类",
        value: 2000,
        percent: 50,
        itemStyle: {
            color: "RGBA(30, 217, 204, 0.8)"
        }
    },
    {
        name: "音频类",
        value: 3000,
        percent: 50,
        itemStyle: {
            color: "rgba(73, 184, 255, 0.7)"
        }
    },
    {
        name: "图书类",
        value: 4000,
        percent: 50,
        itemStyle: {
            color: "rgba(255, 176, 103, 0.7)"
        }
    },
    {
        name: "图片类",
        value: 5000,
        percent: 50,
        itemStyle: {
            color: "rgba(132, 52, 189, 0.7)"
        }
    }
]);
let option = reactive([]);

// 构建3d饼状图
const initPieChart = () => {
    let myChart = echarts.init(document.getElementById("pieChart"));
    // 传入数据生成 option ; getPie3D(数据，透明的空心占比（调节中间空心范围的0就是普通饼1就很镂空）)
    option = getPie3D(pieData, 0.7);
    // 将配置项设置进去
    myChart.setOption(option);
    // 鼠标移动上去特效效果
    bindListen(myChart);
};
const getPie3D = (pieData, internalDiameterRatio) => {
    let that = this;
    let series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    let legendData = [];
    let legendBfb = [];
    let k = 1 - internalDiameterRatio;
    pieData.sort((a, b) => {
        return b.value - a.value;
    });
    // 为每一个饼图数据，生成一个 series-surface(参数曲面) 配置
    for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        let seriesItem = {
            // 系统名称
            name: typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
            type: "surface",
            // 是否为参数曲面（是）
            parametric: true,
            // 曲面图网格线（否）上面一根一根的
            wireframe: {
                show: false
            },
            pieData: pieData[i],
            pieStatus: {
                selected: false,
                hovered: false,
                k: k
            }
        };

        //曲面的颜色、不透明度等样式。
        if (typeof pieData[i].itemStyle != "undefined") {
            let itemStyle = {};
            typeof pieData[i].itemStyle.color != "undefined" ? (itemStyle.color = pieData[i].itemStyle.color) : null;
            typeof pieData[i].itemStyle.opacity != "undefined" ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null;
            seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
    }

    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    legendData = [];
    legendBfb = [];
    for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value
        );
        startValue = endValue;
        let bfb = fomatFloat(series[i].pieData.value / sumValue, 4);
        legendData.push({
            name: series[i].name,
            value: bfb
        });
        legendBfb.push({
            name: series[i].name,
            value: bfb
        });
    }
    // (第二个参数可以设置你这个环形的高低程度)
    let boxHeight = getHeight3D(series, 13); // 通过传参设定3d饼/环的高度
    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    let option = {
        //图例组件
        // legend: {
        //     data: legendData,
        //     //图例列表的布局朝向。
        //     orient: "horizontal",
        //     left: 10,
        //     top: 140,
        //     //图例文字每项之间的间隔
        //     itemGap: 15,
        //     textStyle: {
        //         color: "#A1E2FF"
        //     },
        //     show: true,
        //     icon: "circle",
        //     formatter: function (name) {
        //         let target;
        //         for (let i = 0, l = pieData.length; i < l; i++) {
        //             if (pieData[i].name == name) {
        //                 target = pieData[i].value;
        //             }
        //         }
        //         return `${name}: ${target}`;
        //     }
        //     //   formatter: function(param) {
        //     //       let item = legendBfb.filter(item => item.name == param)[0];
        //     //       let bfs = fomatFloat(item.value * 100, 2) + "%";
        //     //       console.log(item.name)
        //     //       return `${item.name} :${bfs}`;
        //     //   }
        // },
        tooltip: {
            axisPointer: {
                type: "shadow",
                crossStyle: {
                    color: "#999"
                }
            },
            borderColor: "rgba(0,0,0,0)",
            backgroundColor: "#001826",
            textStyle: {
                color: "#FFF",
                fontSize: 16
            },
            formatter: (params) => {
                if (params.seriesName !== "mouseoutSeries" && params.seriesName !== "pie2d") {
                    let value = option.series[params.seriesIndex].pieData.value;
                    return (
                        `${params.seriesName}<br/>` +
                        `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
                        `${value}`
                    );
                }
            }
        },
        //这个可以变形
        xAxis3D: {
            min: -1,
            max: 1
        },
        yAxis3D: {
            min: -1,
            max: 1
        },
        zAxis3D: {
            min: -1,
            max: 1
        },
        // 此处是修改样式的重点
        grid3D: {
            show: false,
            boxHeight: boxHeight, //圆环的高度
            //这是饼图的位置
            top: "0",
            left: "-23%",
            viewControl: {
                // 3d效果可以放大、旋转等，请自己去查看官方配置
                alpha: 40, //角度(这个很重要 调节角度的)
                distance: 180, //调整视角到主体的距离，类似调整zoom(这是整体大小)
                rotateSensitivity: 0, //设置为0无法旋转
                zoomSensitivity: 0, //设置为0无法缩放
                panSensitivity: 0, //设置为0无法平移
                autoRotate: false //自动旋转
            }
        },
        series: series
    };
    return option;
};

//获取3d丙图的最高扇区的高度
const getHeight3D = (series, height) => {
    series.sort((a, b) => {
        return b.pieData.value - a.pieData.value;
    });
    return (height * 25) / series[0].pieData.value;
};

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, h) => {
    // 计算
    let midRatio = (startRatio + endRatio) / 2;
    let startRadian = startRatio * Math.PI * 2;
    let endRadian = endRatio * Math.PI * 2;
    let midRadian = midRatio * Math.PI * 2;
    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
    }
    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== "undefined" ? k : 1 / 3;
    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    let hoverRate = isHovered ? 1.05 : 1;
    // 返回曲面参数方程
    return {
        u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32
        },
        v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20
        },
        x: function (u, v) {
            if (u < startRadian) {
                return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u, v) {
            if (u < startRadian) {
                return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function (u, v) {
            if (u < -Math.PI * 0.5) {
                return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
                return Math.sin(u) * h * 0.1;
            }
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        }
    };
};

//这是一个自定义计算的方法
const fomatFloat = (num, n) => {
    let f = parseFloat(num);
    if (isNaN(f)) {
        return false;
    }
    f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
    let s = f.toString();
    let rs = s.indexOf(".");
    //判定如果是整数，增加小数点再补0
    if (rs < 0) {
        rs = s.length;
        s += ".";
    }
    while (s.length <= rs + n) {
        s += "0";
    }
    return s;
};
// 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
const bindListen = (myChart) => {
    let that = this;
    let selectedIndex = "";
    let hoveredIndex = "";
    // 监听点击事件，实现选中效果（单选）
    myChart.on("click", function (params) {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
        let isSelected = !option.series[params.seriesIndex].pieStatus.selected;
        let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
        let k = option.series[params.seriesIndex].pieStatus.k;
        let startRatio = option.series[params.seriesIndex].pieData.startRatio;
        let endRatio = option.series[params.seriesIndex].pieData.endRatio;
        // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
        if (selectedIndex !== "" && selectedIndex !== params.seriesIndex) {
            option.series[selectedIndex].parametricEquation = getParametricEquation(
                option.series[selectedIndex].pieData.startRatio,
                option.series[selectedIndex].pieData.endRatio,
                false,
                false,
                k,
                option.series[selectedIndex].pieData.value
            );
            option.series[selectedIndex].pieStatus.selected = false;
        }
        // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
        option.series[params.seriesIndex].parametricEquation = getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            option.series[params.seriesIndex].pieData.value
        );
        option.series[params.seriesIndex].pieStatus.selected = isSelected;
        // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
        isSelected ? (selectedIndex = params.seriesIndex) : null;
        // 使用更新后的 option，渲染图表
        myChart.setOption(option);
    });
    // 监听 mouseover，近似实现高亮（放大）效果
    myChart.on("mouseover", function (params) {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
            return;
            // 否则进行高亮及必要的取消高亮操作
        } else {
            // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
            if (hoveredIndex !== "") {
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
                isSelected = option.series[hoveredIndex].pieStatus.selected;
                isHovered = false;
                startRatio = option.series[hoveredIndex].pieData.startRatio;
                endRatio = option.series[hoveredIndex].pieData.endRatio;
                k = option.series[hoveredIndex].pieStatus.k;
                // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                option.series[hoveredIndex].parametricEquation = getParametricEquation(
                    startRatio,
                    endRatio,
                    isSelected,
                    isHovered,
                    k,
                    option.series[hoveredIndex].pieData.value
                );
                option.series[hoveredIndex].pieStatus.hovered = isHovered;
                // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                hoveredIndex = "";
            }
            // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
            if (params.seriesName !== "mouseoutSeries" && params.seriesName !== "pie2d") {
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                isSelected = option.series[params.seriesIndex].pieStatus.selected;
                isHovered = true;
                startRatio = option.series[params.seriesIndex].pieData.startRatio;
                endRatio = option.series[params.seriesIndex].pieData.endRatio;
                k = option.series[params.seriesIndex].pieStatus.k;
                // 对当前点击的扇形，执行高亮操作（对 option 更新）
                option.series[params.seriesIndex].parametricEquation = getParametricEquation(
                    startRatio,
                    endRatio,
                    isSelected,
                    isHovered,
                    k,
                    option.series[params.seriesIndex].pieData.value + 5
                );
                option.series[params.seriesIndex].pieStatus.hovered = isHovered;
                // 记录上次高亮的扇形对应的系列号 seriesIndex
                hoveredIndex = params.seriesIndex;
            }
            // 使用更新后的 option，渲染图表
            myChart.setOption(option);
        }
    });
    // 修正取消高亮失败的 bug
    myChart.on("globalout", function () {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            k = option.series[hoveredIndex].pieStatus.k;
            startRatio = option.series[hoveredIndex].pieData.startRatio;
            endRatio = option.series[hoveredIndex].pieData.endRatio;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[hoveredIndex].parametricEquation = getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                option.series[hoveredIndex].pieData.value
            );
            option.series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(option);
    });
};
</script>

<style lang="scss" scoped>
#pieChart {
    width: 200px;
    height: 200px;
}
</style>
```
