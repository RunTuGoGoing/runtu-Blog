---
title: blob流转换成file文件流
date: 2023-06-02
categories:
  - utils
  - Vue2
  - Vue3
tags:
  - utils
  - Vue2
  - Vue3
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
