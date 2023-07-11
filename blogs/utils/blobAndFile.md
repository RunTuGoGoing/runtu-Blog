---
title: blob流转换成file文件流
date: 2023-06-16
categories:
  - utils
tags:
  - utils
sidebar: "auto"
comment: false
---

## blob 流转换成 file 文件流

基本上的步骤就是先通过后端接口获取到文件的 blob 流，再用 file 的构造函数去生成 file 文件流

```vue
<script>
export default {
  methods: {
    initFile() {
      getBlob(filePath).then((res) => {
        // type就是文件的类型
        let textContain = new window.File([res], "文件名", {
          type: "image/png",
        });
        console.log(textContain);
      });
    },
  },
};
</script>
```

```bash
常见的Content-Type
text/html  ：HTML格式
text/plain ：纯文本格式
text/xml   ：XML格式

image/gif  ：gif图片格式
image/jpeg ：jpg图片格式
image/png  ：png图片格式

application/xml     ： XML数据格式
application/json    ： JSON数据格式
application/pdf     ： pdf格式
application/msword  ： Word文档格式
application/octet-stream ： 二进制流数据（如文件下载）

.doc
application/msword

.dot
application/msword

.docx
application/vnd.openxmlformats-officedocument.wordprocessingml.document

.dotx
application/vnd.openxmlformats-officedocument.wordprocessingml.template

.docm
application/vnd.ms-word.document.macroEnabled.12

.dotm
application/vnd.ms-word.template.macroEnabled.12

.xls
application/vnd.ms-excel

.xlt
application/vnd.ms-excel

.xla
application/vnd.ms-excel

.xlsx
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

.xltx
application/vnd.openxmlformats-officedocument.spreadsheetml.template

.xlsm
application/vnd.ms-excel.sheet.macroEnabled.12

.xltm
application/vnd.ms-excel.template.macroEnabled.12

.xlam
application/vnd.ms-excel.addin.macroEnabled.12

.xlsb
application/vnd.ms-excel.sheet.binary.macroEnabled.12

.ppt
application/vnd.ms-powerpoint

.pot
application/vnd.ms-powerpoint

.pps
application/vnd.ms-powerpoint

.ppa
application/vnd.ms-powerpoint

.pptx
application/vnd.openxmlformats-officedocument.presentationml.presentation

.potx
application/vnd.openxmlformats-officedocument.presentationml.template

.ppsx
application/vnd.openxmlformats-officedocument.presentationml.slideshow

.ppam
application/vnd.ms-powerpoint.addin.macroEnabled.12

.pptm
application/vnd.ms-powerpoint.presentation.macroEnabled.12

.potm
application/vnd.ms-powerpoint.template.macroEnabled.12

.ppsm
application/vnd.ms-powerpoint.slideshow.macroEnabled.12
```
