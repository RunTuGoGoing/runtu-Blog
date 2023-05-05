---
title: AntVG6 关系图
date: 2023-05-05
categories: 
 - AntVG6
tags: 
 - AntVG6
sidebar: 'auto'
comment: false
---

## AntV G6 关系图

当我们平时需要制作关系图谱的时候，**Echarts**同样也具备关系图，但是**AntV G6**的关系图谱功能方面会更加的灵活，更加实用。<br>
这里我稍微介绍一下**AntV G6**当中如何自定义样式以及一些基础的配置项<br>
详细的官网文档中也有很多事例，大伙可以去玩一玩还是很有趣的。<br>
[AntV G6](https://antv-g6.gitee.io/zh)

### 事例

<img src='../../assets/image/AntV G6/xueyuantu.png' alt='' style='display: block; margin: 0 auto'><br>

### 快速上手

```js
// 安装
npm install --save @antv/g6
```

```js
// 引入 G6 的数据源为 JSON 格式的对象。该对象中需要有节点（nodes）和边（edges）字段，分别用数组表示
const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: 'node1', // String，必须，起始点 id
      target: 'node2', // String，必须，目标点 id
    },
  ],
};
```

::: tip 注意
nodes 数组中包含节点对象。每个节点对象中唯一的、必要的 id 以标识不同的节点，x、 y 指定该节点的位置；<br>
edges 数组中包含边对象。source 和 target 是每条边的必要属性，分别代表了该边的起始点 id 与 目标点 id。
:::


### 关于创建AntV G6图实例时的layout参数

当数据中没有节点位置信息，或者数据中的位置信息不满足需求时，需要借助一些布局算法对图进行布局。**AntV G** 提供了 9 种一般图的布局和 4 种树图的布局:<br>

- 一般图：
   - Random Layout：随机布局；
   - Force Layout：经典力导向布局；（布局网络中粒子之间具有引力和斥力，从随机无序的布局不断演变为趋于平衡稳定的布局。适用于描述事物间关系，比如人物关系、计算机网络关系等。）
   - Circular Layout：环形布局；
   - Radial Layout：辐射状布局；
   - MDS Layout：高维数据降维算法布局；
   - Fruchterman Layout：Fruchterman 布局，一种力导布局；
   - Dagre Layout：层次布局；
   - Concentric Layout：同心圆布局，将重要（默认以度数为度量）的节点放置在布局中心；
   - Grid Layout：格子布局，将节点有序（默认是数据顺序）排列在格子上。
- 树图布局：
   - Dendrogram Layout：树状布局（叶子节点布局对齐到同一层）；
   - CompactBox Layout：紧凑树布局；
   - Mindmap Layout：脑图布局；
   - Intended Layout：缩进布局。

### 取消自动适配画布

我们在之前的教程里面，为了能够将超出画布的图适配到视野中，在实例化图时使用了 fitView 配置项。这节开始我们将会去掉这个特性。因为复杂的布局系统会打破适配的规则，反而会造成更多的困扰。让我们将相关的适配代码变为注释：

```js
const graph = new G6.Graph({
  // ...
  // fitView: true,
  // fitViewPadding: [ 20, 40, 50, 20 ]
});
```

### 默认布局

当实例化图时没有配置布局时：
- 若数据中节点有位置信息（x 和 y），则按照数据的位置信息进行绘制；
- 若数据中节点没有位置信息，则默认使用 Random Layout 进行布局。

### 配置布局

G6 使用布局的方式非常简单，在图实例化的时候，加上 layout 配置即可。下面代码在实例化图时设置了布局方法为 type: ‘force’，即经典力导向图布局。并设置了参数 preventOverlap: true ，表示希望节点不重叠。

```js
const graph = new G6.Graph({
  // ...                      // 其他配置项
  layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
    type: 'force',         // 指定为力导向布局
    preventOverlap: true,  // 防止节点重叠
    // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
  }
});
```

### 完整代码

```vue
<template>
    <div ref="graphContainer"></div>
</template>

<script>
// 引入
import G6 from "@antv/g6";
const icon_1 = require("..."); // 每个节点的背景图
const icon_2 = require("..."); // 中间圆形的图片
const data = {
    nodes: [
        {
            id: "1",
            name: "中心节点",
            type: "service",
            x: 500,
            y: 10,
            statistics: {
                trac_num: 数据量(条), 
                duration_avg: "更新时间",
                alert_num: "来源系统",
                situation_num: "数源单位"
            }
        },
        {
            id: "2",
            name: "表中文名",
            type: "service",
            x: 10,
            y: 10,
            statistics: {
                trac_num: 数据量(条), 
                duration_avg: "更新时间",
                alert_num: "来源系统",
                situation_num: "数源单位"
            }
        },
        {
            id: "3",
            name: "表中文名",
            type: "service",
            x: 100,
            y: 500,
            statistics: {
                trac_num: 数据量(条), 
                duration_avg: "更新时间",
                alert_num: "来源系统",
                situation_num: "数源单位"
            }
        },
        {
            id: "4",
            name: "表中文名",
            type: "service",
            x: 200,
            y: 500,
            statistics: {
                trac_num: 数据量(条), 
                duration_avg: "更新时间",
                alert_num: "来源系统",
                situation_num: "数源单位"
            }
        },
        {
            id: "5",
            name: "表中文名",
            type: "service",
            x: 300,
            y: 500,
            statistics: {
                trac_num: 数据量(条), 
                duration_avg: "更新时间",
                alert_num: "来源系统",
                situation_num: "数源单位"
            }
        },
        {
            id: "6",
            name: "表中文名",
            type: "service",
            x: 400,
            y: 500,
            statistics: {
                trac_num: 数据量(条), 
                duration_avg: "更新时间",
                alert_num: "来源系统",
                situation_num: "数源单位"
            }
        },
        {
            id: "7",
            name: "表中文名",
            type: "service",
            x: 500,
            y: 500,
            statistics: {
                trac_num: 数据量(条), 
                duration_avg: "更新时间",
                alert_num: "来源系统",
                situation_num: "数源单位"
            }
        },
        {
            id: "8",
            name: "表中文名",
            type: "service",
            x: 600,
            y: 500,
            statistics: {
                trac_num: 数据量(条), 
                duration_avg: "更新时间",
                alert_num: "来源系统",
                situation_num: "数源单位"
            }
        },
        {
            id: "9",
            name: "表中文名",
            type: "service",
            x: 700,
            y: 500,
            statistics: {
                trac_num: 数据量(条), 
                duration_avg: "更新时间",
                alert_num: "来源系统",
                situation_num: "数源单位"
            }
        },
        {
            id: "10",
            name: "表中文名",
            type: "service",
            x: 800,
            y: 10,
            statistics: {
                trac_num: 数据量(条), 
                duration_avg: "更新时间",
                alert_num: "来源系统",
                situation_num: "数源单位"
            }
        }
    ],
    edges: [
        {
            source: "1",
            target: "2"
        },
        {
            source: "1",
            target: "3"
        },
        {
            source: "1",
            target: "4"
        },
        {
            source: "1",
            target: "5"
        },
        {
            source: "1",
            target: "6"
        },
        {
            source: "1",
            target: "7"
        },
        {
            source: "1",
            target: "8"
        },
        {
            source: "1",
            target: "9"
        },
        {
            source: "1",
            target: "10"
        }
    ]
};
export default {
    data() {
        return {
            // 血缘图实例
            graph: null
        };
    },
    mounted() {
        // 为了确保能够获取到元素
        setTimeout(() => {
            this.renderGraph();
        }, 300);
    },
    methods: {
        renderGraph() {
            const that = this;
            G6.registerNode(
                "service", //第一个参数自定义节点的名字
                // 第二个参数是这个节点的图形分组
                {
                    draw: function (cfg, group) {
                        let keyShape;
                        if (cfg.id == 1) {
                            keyShape = group.addShape("image", {
                                attrs: {
                                    //    相对定位
                                    x: 0,
                                    y: 0,
                                    img: icon_1,
                                    type: "image",
                                    // 代表矩形的一些属性
                                    width: 195,
                                    height: 195
                                },
                                name: "card-node-keyShape" // 起个唯一名字便于识别
                            });
                            // 名字
                            group.addShape("text", {
                                attrs: {
                                    text: cfg.name,
                                    x: 50,
                                    y: 240,
                                    fontSize: 24,
                                    fill: "#fff",
                                    textBaseline: "bottom"
                                },
                                name: "card-node-title"
                            });
                        } else {
                            // 增加一个图像 最外边的虚线框
                            keyShape = group.addShape("image", {
                                attrs: {
                                    //    相对定位
                                    x: 0,
                                    y: 0,
                                    type: "image",
                                    img: icon_2,
                                    // 代表矩形的一些属性
                                    width: 319,
                                    height: 336
                                },
                                name: "card-node-keyShape" // 起个唯一名字便于识别
                            });

                            // 名字
                            group.addShape("text", {
                                attrs: {
                                    text: cfg.name,
                                    x: 116,
                                    y: 52,
                                    fontSize: 22,
                                    fill: "#fff",
                                    textBaseline: "top"
                                },
                                name: "card-node-title"
                            });

                            
                            group.addShape("text", {
                                attrs: {
                                    text: "数据量(条)：",
                                    x: 56,
                                    y: 128,
                                    fontSize: 22,
                                    fill: "#fff"
                                }
                            });
                            group.addShape("text", {
                                attrs: {
                                    text: cfg.statistics.trac_num,
                                    x: 166,
                                    y: 128,
                                    fontSize: 22,
                                    fill: "#fff"
                                }
                            });

                           
                            group.addShape("text", {
                                attrs: {
                                    text: "更新时间：",
                                    x: 56,
                                    y: 177,
                                    fontSize: 22,
                                    fill: "#fff"
                                }
                            });
                            group.addShape("text", {
                                attrs: {
                                    text: cfg.statistics.duration_avg,
                                    x: 166,
                                    y: 177,
                                    fontSize: 22,
                                    fill: "#fff"
                                },
                                name: "card-node-text2"
                            });

                        
                            group.addShape("text", {
                                attrs: {
                                    text: "来源系统：",
                                    x: 56,
                                    y: 226,
                                    fontSize: 22,
                                    fill: "#fff"
                                }
                            });
                            group.addShape("text", {
                                attrs: {
                                    text: cfg.statistics.alert_num,
                                    x: 156,
                                    y: 226,
                                    fontSize: 22,
                                    fill: "#fff"
                                },
                                name: "card-node-text2"
                            });

                        
                            group.addShape("text", {
                                attrs: {
                                    text: "数源单位：",
                                    x: 56,
                                    y: 275,
                                    fontSize: 22,
                                    fill: "#fff"
                                }
                            });
                            group.addShape("text", {
                                attrs: {
                                    text: cfg.statistics.situation_num,
                                    x: 156,
                                    y: 275,
                                    fontSize: 22,
                                    fill: "#fff"
                                },
                                name: "card-node-text2"
                            });
                        }
                        return keyShape;
                    }
                },
                "rect"
            ); 
            // 第三个参数，是如果没有设置样式，会默认继承rect的样式

            // 创建 G6 图实例
            const graph = new G6.Graph({
                container: this.$refs.graphContainer,
                width: 1450,
                height: 670,
                fitView: true, // 自适应屏幕
                fitCenter: true, // 屏幕中间
                layout: {
                    type: "concentric",
                    nodeSize: 336,
                    linkDistance: 300, // 指定边距离为100
                    preventOverlap: true // 防止节点重叠
                },
                modes: {
                    default: [
                        "drag-canvas",
                        "zoom-canvas"
                        // "drag-node"
                    ] //允许拖拽画布、缩放画布、拖拽节点
                },
                defaultNode: {
                    shape: "service"
                },
                defaultEdge: {
                    style: {
                        radius: 10,
                        stroke: "#226DFF",
                        endArrow: true
                    }
                }
            });

            graph.data(data);
            graph.render();
        }
    }
};
</script>

<style lang="scss" scoped>
.bloodline-graph {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
```
