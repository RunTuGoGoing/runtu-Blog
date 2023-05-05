---
title: 纯前端jspdf+html2canvas导出pdf
date: 2023-04-24
categories: 
 - Vue2
 - Vue3
 - components
tags: 
 - Vue2
 - Vue3
 - components
sidebar: 'auto'
comment: false
---

## 纯前端jspdf+html2canvas导出pdf

前几天遇到一个需求，需要把一整页的 **Echarts图表和table列表** 导出成pdf，并且要具备分页功能，一个pdf文件，一页一个图。<br>

[jsPDF官网](https://artskydj.github.io/jsPDF/docs/jsPDF.html)
[html2canvas](https://html2canvas.hertzen.com/)

其实看官网也没啥吊用，直接上代码教程

### 下载安装

```js
1、安装jspdf: npm install jspdf --save
2、安装html2Canvas: npm install --save html2canvas
```

### 页面使用

```js
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

async handleExport() {
    // 让页面处于最顶端防止空白页问题
    document.documentElement.scrollTop = 0
    // 获取所有echarts图表的dom元素
    let echartsDoms = []
    this.DOMList.forEach((item, index) => {
        echartsDoms.push(this.$refs[item.ids].$el)
    })
    pdf = new jsPDF('l', 'mm', 'a4')
    // 第一个参数l代表横页，p带面竖页，第二个参数是单位，第三个参数默认a4大小也可以自定义宽高，想要自定义宽高可以使用数组的方式定义
    currentPageY = 0
    // 遍历所有echarts图表的dom元素
    for (let index = 0; index < echartsDoms.length; index++) {
        const dom = echartsDoms[index]
        // 将dom元素转成canvas
        await this.asyncBuildPdf(dom, index, echartsDoms)
    }
},
async asyncBuildPdf(dom, index, echartsDoms) {
    const canvas = await html2canvas(dom)
    console.log(canvas.toDataURL())
    // 获取canvas的宽度和高度
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    // 计算缩放比例
    const scale = pageWidth / canvasWidth
    // 计算当前页的高度
    const currentPageHeight = canvasHeight * scale
    // 如果当前页的y坐标加上当前页的高度大于页面高度，则新建一页
    if (currentPageY + currentPageHeight > pageHeight) {
        pdf.addPage()
        currentPageY = 0
    }
    // 将canvas添加到pdf中
    pdf.addImage(canvas, 'PNG', 0, currentPageY, pageWidth, currentPageHeight)
    // 更新当前页的y坐标
    currentPageY += currentPageHeight
    setTimeout(() => {
    // 如果是最后一个图表，则导出pdf
        if (index === echartsDoms.length - 1) {
            pdf.save('台账报表.pdf')
            return
            // this.exportLoading = false
        }
    return
    }, 300)
},
```

::: tip
这里使用到了async await的写法以及setTimeout定时器都是为了确保能获取到所有的DOM元素后再进行一个截图导出的效果。不然可能会出现缺失或者在打包的时候样式丢失的问题
:::