---
title: 前端的文件预览
date: 2023-06-16
categories:
  - Vue2
  - Vue3
tags:
  - Vue2
  - Vue3
sidebar: "auto"
comment: false
---

## 前端的文件预览

### word 预览

安装依赖

```js
npm i docx-preview -S
```

页面使用方法如下：

```vue
<template>
  <div class="docx-preview-wrap">
    <div id="bodyContainer"></div>
  </div>
</template>

<script>
import { renderAsync } from "docx-preview";
import { fileDownload } from "@/api/index.js";
export default {
  name: "DocxPreview",
  data() {
    return {
      // 文件预览配置参数
      docxOptions: {
        className: "docx", // string：默认和文档样式类的类名/前缀
        inWrapper: true, // boolean：启用围绕文档内容的包装器渲染
        ignoreWidth: false, // boolean：禁用页面的渲染宽度
        ignoreHeight: false, // boolean：禁止渲染页面高度
        ignoreFonts: false, // boolean：禁用字体渲染
        breakPages: true, // boolean：在分页符上启用分页
        ignoreLastRenderedPageBreak: true, // boolean：在 lastRenderedPageBreak 元素上禁用分页
        experimental: false, // boolean：启用实验功能（制表符停止计算）
        trimXmlDeclaration: true, // boolean：如果为true，解析前会从​​ xml 文档中移除 xml 声明
        useBase64URL: false, // boolean：如果为true，图片、字体等会转为base 64 URL，否则使用URL.createObjectURL
        useMathMLPolyfill: false, // boolean：包括用于 chrome、edge 等的 MathML polyfill。
        showChanges: false, // boolean：启用文档更改的实验性渲染（插入/删除）
        debug: false, // boolean：启用额外的日志记录
      },
    };
  },
  mounted() {
    this.initDocx();
  },
  methods: {
    initDocx() {
      // 通过后端接口获取到word文件流
      fileDownload().then((res) => {
        this.renderAsyncFn(res);
      });
    },
    renderAsyncFn(blob) {
      let bodyContainer = document.getElementById("bodyContainer");
      renderAsync(
        blob, // Blob | ArrayBuffer | Uint8Array, 可以是 JSZip.loadAsync 支持的任何类型
        bodyContainer, // HTMLElement 渲染文档内容的元素,
        null, // HTMLElement, 用于呈现文档样式、数字、字体的元素。如果为 null，则将使用 bodyContainer。
        this.docxOptions // 配置
      ).then((res) => {
        console.log("res---->", res);
      });
    },
  },
};
</script>
```

::: tip 注意
docx-preview 只支持 docx 结尾的 word 文件
:::

### execl 预览

安装依赖

```js
npm install exceljs --save
npm install '@handsontable/vue' --save
npm installhandsontable --save
npm install 'handsontable/i18n' --save //这个依赖我没有下成功，不过也能正常运行
```

这里需要在 components 中创建一个公用组件文件夹，我这里叫做 xlsxView，里面我们需要四个文件。<br />

#### 样式文件 color.js

```js
// 样式文件 color.js
export const indexedColors = [
  "000000",
  "FFFFFF",
  "FF0000",
  "00FF00",
  "0000FF",
  "FFFF00",
  "FF00FF",
  "00FFFF",
  "000000",
  "FFFFFF",
  "FF0000",
  "00FF00",
  "0000FF",
  "FFFF00",
  "FF00FF",
  "00FFFF",
  "800000",
  "008000",
  "000080",
  "808000",
  "800080",
  "008080",
  "C0C0C0",
  "808080",
  "9999FF",
  "993366",
  "FFFFCC",
  "CCFFFF",
  "660066",
  "FF8080",
  "0066CC",
  "CCCCFF",
  "000080",
  "FF00FF",
  "FFFF00",
  "00FFFF",
  "800080",
  "800000",
  "008080",
  "0000FF",
  "00CCFF",
  "CCFFFF",
  "CCFFCC",
  "FFFF99",
  "99CCFF",
  "FF99CC",
  "CC99FF",
  "FFCC99",
  "3366FF",
  "33CCCC",
  "99CC00",
  "FFCC00",
  "FF9900",
  "FF6600",
  "666699",
  "969696",
  "003366",
  "339966",
  "003300",
  "333300",
  "993300",
  "993366",
  "333399",
  "333333",
  "b7e0ff",
  "00CCFF",
];
```

#### 主要渲染文件 index.js

```js
import ExcelJS from "exceljs";
import Vue from "vue";
import Table from "./Table";
import "handsontable/dist/handsontable.full.min.css";

/**
 * 渲染excel
 */
export default async function render(buffer, target) {
  const workbook = await new ExcelJS.Workbook().xlsx.load(buffer);
  console.log(workbook, "workbook");
  return new Vue({
    render: (h) =>
      h(Table, {
        props: {
          workbook,
        },
      }),
  }).$mount(target);
}
```

#### table 组件的文件 Table.vu

```vue
<template>
  <div>
    <div>
      <hot-table ref="table" :settings="hotSettings"></hot-table>
    </div>
    <div class="btn-group">
      <button
        v-for="sheet in sheets"
        :key="sheet.id"
        style="padding: 10px 30px; font-size: 18px"
        :type="sheetIndex === sheet.id ? 'primary' : 'default'"
        @click="handleSheet(sheet.id)"
      >
        {{ sheet.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import Handsontable from "handsontable";
import { registerLanguageDictionary, zhCN } from "handsontable/i18n";
import { indexedColors } from "./color";
import { camelCase, captain, fixMatrix } from "./util";
// 注册中文
registerLanguageDictionary(zhCN);
// 边框类型
const borders = ["left", "right", "top", "bottom"];
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    workbook: Object,
  },
  components: { HotTable },
  data() {
    return {
      sheetIndex: 0,
      selection: {
        style: {},
        ranges: [],
      },
    };
  },
  created() {
    // 注册自定义渲染
    Handsontable.renderers.registerRenderer(
      "styleRender",
      (hotInstance, TD, row, col, prop, value, cell) => {
        Handsontable.renderers.getRenderer("text")(
          hotInstance,
          TD,
          row,
          col,
          prop,
          value,
          cell
        );
        if (this.ws && cell.style) {
          const {
            style: { alignment: { wrapText } = {}, border, fill, font },
          } = cell;
          const style = TD.style;
          if (font) {
            if (font.bold) style.fontWeight = "bold";
            if (font.size) style.fontSize = `${font.size}px`;
          }
          if (fill) {
            if (fill.bgColor) {
              const { argb, indexed } = fill.bgColor;
              style.backgroundColor = `#${argb || indexedColors[indexed]}`;
            }
            if (fill.fgColor) {
              const { theme, indexed } = fill.fgColor;
              if (theme && this.themeColors) {
                const color = this.themeColors[theme + 1];
                if (color) {
                  style.color = `#${color}`;
                }
              }
              if (indexed) {
                style.color = `#${indexedColors[indexed]}`;
              }
            }
          }
          if (border) {
            borders
              .map((key) => ({ key, value: border[key] }))
              .filter((v) => v.value)
              .forEach((v) => {
                const {
                  key,
                  value: { style: borderStyle },
                } = v;
                const prefix = `border${captain(key)}`;
                if (borderStyle === "thin") {
                  style[`${prefix}Width`] = "1px";
                } else {
                  style[`${prefix}Width`] = "2px";
                }
                style[`${prefix}Style`] = "solid";
                style[`${prefix}Color`] = "#000";
              });
          }
        }
        // 启用了内联css，直接赋值
        if (cell.css) {
          const style = TD.style;
          const { css } = cell;
          Object.keys(css).forEach((key) => {
            const k = camelCase(key);
            style[k] = css[key];
          });
        }
      }
    );
  },
  watch: {
    workbook() {
      this.parseTheme();
      this.updateTable();
    },
  },
  computed: {
    hotSettings() {
      return {
        language: "zh-CN",
        readOnly: true,
        data: this.data,
        cell: this.cell,
        mergeCells: this.merge,
        colHeaders: true,
        rowHeaders: true,
        height: "calc(100vh - 107px)",
        contextMenu: true,
        manualRowMove: true,
        // 关闭外部点击取消选中时间的行为
        outsideClickDeselects: false,
        fillHandle: {
          direction: "vertical",
          autoInsertRow: true,
        },
        afterSelectionEnd: this.afterSelectionEnd,
        bindRowsWithHeaders: "strict",
        licenseKey: "non-commercial-and-evaluation",
      };
    },
    ws() {
      const { workbook: { getWorksheet } = {} } = this;
      if (getWorksheet) {
        const index = this.sheetIndex || this.sheets[0].id;
        return this.workbook.getWorksheet(index);
      }
      return null;
    },
    sheets() {
      if (this.workbook.worksheets) {
        return this.workbook.worksheets.filter((sheet) => sheet._rows.length);
      }
      return [];
    },
    merge() {
      const { ws: { _merges: merges = {} } = {} } = this;
      return Object.values(merges).map(({ left, top, right, bottom }) => {
        // 构建区域
        return {
          row: top - 1,
          col: left - 1,
          rowspan: bottom - top + 1,
          colspan: right - left + 1,
        };
      });
    },
    data() {
      return fixMatrix(
        this.ws.getRows(1, this.ws.actualRowCount).map((row) =>
          row._cells.map((item) => {
            const value = item.model.value;
            if (value) {
              return value.richText ? value.richText.text : value;
            }
            return "";
          })
        ),
        this.cols.length
      );
    },
    cols() {
      return this.ws.columns.map((item) => item.letter);
    },
    columns() {
      return this.ws.columns.map((item) => ({
        ...(item.width
          ? { width: item.width < 100 ? 100 : item.width }
          : { width: 100 }),
        className: this.alignToClass(item.alignment || {}),
        renderer: "styleRender",
      }));
    },
    cell() {
      return this.ws.getRows(1, this.ws.actualRowCount).flatMap((row, ri) => {
        return row._cells
          .map((cell, ci) => {
            if (cell.style) {
              return {
                row: ri,
                col: ci,
                ...(cell.alignment
                  ? {
                      className: this.alignToClass(cell.alignment),
                    }
                  : {}),
                style: cell.style,
              };
            }
          })
          .filter((i) => i);
      });
    },
    border() {
      return this.ws.getRows(1, this.ws.actualRowCount).flatMap((row, ri) => {
        return row._cells
          .map((cell, ci) => {
            if (cell.style && cell.style.border) {
              const border = cell.style.border;
              const keys = Object.keys(border);
              if (keys.length) {
                return {
                  row: ri,
                  col: ci,
                  ...keys.reduce((result, key) => {
                    result[key] = {
                      width: 1,
                      color: `#${
                        (border.color && indexedColors[border.color.indexed]) ||
                        border.argb ||
                        "000000"
                      }`,
                    };
                    return result;
                  }, {}),
                };
              }
            }
          })
          .filter((i) => i);
      });
    },
  },
  methods: {
    hotTable() {
      return this.$refs.table.hotInstance;
    },
    updateTable() {
      this.hotTable().updateSettings({
        mergeCells: this.merge,
        data: this.data,
        colHeaders: this.cols,
        columns: this.columns,
        cell: this.cell,
        // customBorders: this.border,
      });
    },
    alignToClass({ horizontal, vertical }) {
      return [horizontal, vertical]
        .filter((i) => i)
        .map((key) => `ht${key.charAt(0).toUpperCase()}${key.slice(1)}`)
        .join(" ");
    },
    parseTheme() {
      const theme = this.workbook._themes.theme1;
      const parser = new DOMParser();
      if (theme) {
        const doc = parser.parseFromString(theme, "text/xml");
        const [{ children = [] } = {}] =
          doc.getElementsByTagName("a:clrScheme");
        this.themeColors = [...children]
          .flatMap((node) => [...node.getElementsByTagName("a:srgbClr")])
          .map((node) => node.getAttribute("val"))
          .filter((i) => i);
      }
    },
    // 切换sheet
    handleSheet(index) {
      if (this.sheetIndex !== index) {
        this.sheetIndex = index;
        this.$nextTick(() => {
          this.updateTable();
        });
      }
    },
    // 处理样式
    handleStyle(style, { type, key }) {
      this.selection.style = style;
      const hot = this.hotTable();
      // 暂停自定义渲染逻辑
      hot.suspendRender();
      this.selection.ranges.forEach(({ r, c }) => {
        const { css = {} } = hot.getCellMeta(r, c);
        const merged = { ...css };
        // 差量赋值，按照excel标准
        if (type === "remove") {
          delete merged[key];
        } else if (type === "add") {
          merged[key] = style[key];
        }
        hot.setCellMetaObject(r, c, {
          css: merged,
        });
      });
      // 手动渲染
      hot.render();
      // 恢复自动渲染逻辑
      hot.resumeRender();
    },
    // 选中区域回调
    afterSelectionEnd(row, column, row2, column2, selectionLayerLevel) {
      const ranges = [];
      for (let r = row; r <= row2; r++) {
        for (let c = column; c <= column2; c++) {
          ranges.push({ r, c });
        }
      }
      // 获得左上角的元数据，初始化一些状态
      const { css = {} } = this.hotTable().getCellMeta(row, column);
      this.selection.style = css;
      this.selection.ranges = ranges;
    },
  },
};
</script>

<style>
.handsontable {
  font-size: 13px;
  color: #222;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sheet-btn.active {
  background-color: aquamarine;
}
.btn-group {
  margin-top: 5px;
  display: block;
  border-bottom: 1px solid grey;
  background-color: lightblue;
}
.table-tool {
  padding: 8px 0;
  border-top: 1px solid black;
}
</style>
```

#### 功能文件 utils.js，深度扁平化 routes

```js
export function flatten(routes) {
  return routes.flatMap((route) =>
    route.children ? [route, ...flatten(route.children)] : [route]
  );
}

// 转化style对象为style字符串
export function toStyleString(style) {
  return [...style].map((key) => `${key}: ${style[key]}`).join(";");
}

// 修复矩阵的宽度
export function fixMatrix(data, colLen) {
  for (const row of data) {
    for (let j = 0; j < colLen; j++) {
      if (!row[j]) {
        row[j] = "";
      }
    }
  }
  return data;
}

// 首字母大写
export function captain(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

// 连字符转驼峰
export function camelCase(str) {
  return str
    .split("-")
    .map((part, index) => {
      if (index !== 0) {
        return captain(part);
      } else {
        return part;
      }
    })
    .join("");
}
```

#### 页面使用方法如下

```vue
<template>
  <div
    class="execl_preview"
    ref="output"
    style="width: 100%; height: 100%; background-color: #fff"
  />
</template>

<script>
import renderSheet from "@/components/xlsxView";
import { fileDownload } from "@/api/index.js";
export default {
  name: "Excel",
  data() {
    return {};
  },
  mounted() {
    this.uploading();
  },
  methods: {
    // 加载文件内容
    uploading() {
      // 这里同样需要通过后端拿到execl文件流
      fileDownload().then((res) => {
        this.displayResult(res);
      });
    },
    displayResult(buffer) {
      // 生成新的dom
      const node = document.createElement("div");
      // 添加孩子，防止vue实例替换dom元素
      if (this.last) {
        this.$refs.output.removeChild(this.last.$el);
        this.last.$destroy();
      }
      const child = this.$refs.output.appendChild(node);
      // 调用渲染方法进行渲染
      return new Promise((resolve, reject) =>
        renderSheet(buffer, child)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.loading = false;
          })
      );
    },
  },
};
</script>

<style lang="scss">
.handsontable {
  font-size: 16px !important;
  height: 100% !important;
  width: 100% !important;
  overflow: auto !important;
}
.wtHolder {
  height: 100% !important;
  width: 100% !important;
}
</style>
```

::: tip 注意
这里没有直接使用 file-viewer，是按照网上搜来的方法，只使用了 file-viewer 的预览 xlsx 的功能<br />
同样也只支持 xlsx 结尾的 execl 文件
:::

### 图片预览

图片预览相当于别的来说就简单很多了，不需要用到什么插件。<br />

页面使用方法如下：

```vue
<template>
  <div class="img-preview">
    <img :src="imgPath" alt="" />
  </div>
</template>

<script>
import { fileDownload } from "@/api/index.js";
export default {
  name: "DocxPreview",
  data() {
    return {
      imgPath: "",
    };
  },
  mounted() {
    this.initImg();
  },
  methods: {
    initImg() {
      // 这里不仅需要文件流，还需要拿到图片的文件类型
      fileDownload().then((res) => {
        this.renderAsyncFn(res, row.fileType);
      });
    },
    renderAsyncFn(res, fileType) {
      const blobImage = new window.Blob([res], {
        type: "image/" + fileType,
      }); // fileType指图片的类型
      // 创造一个地址
      console.log(URL.createObjectURL(blobImage));
      this.imgPath = URL.createObjectURL(blobImage); // img标签的src属性的值
    },
  },
};
</script>

<style lang="scss" scoped>
.img-preview {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 0;
  img {
    width: 90%;
  }
}
</style>
```

### pdf 预览

pdf 预览就不用多说了，游览器自带的 iframe 可以适配大部分环境

```vue
<template>
  <div class="iframe-box">
    <iframe
      :src="iframePath + '#view=FitH,top&toolbar=0'"
      frameborder="0"
      width="100%"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iframePath: "",
    };
  },
};
</script>
```

::: tip 小技巧
这里的 iframe 的 src 我拼接了一个'#view=FitH,top&toolbar=0'，这是为了让 pdf 文件能够撑满整个页面。
:::
