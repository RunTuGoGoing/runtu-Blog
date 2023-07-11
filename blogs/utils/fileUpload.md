---
title: ant-design-vue和element的文件上传
date: 2023-06-02
categories:
  - utils
tags:
  - utils
sidebar: "auto"
comment: false
---

## ant-design-vue 和 element 的文件上传

### ant-design-vue

```vue
<template>
  <div>
    <a-upload-dragger
      :multiple="false"
      :file-list="fileList"
      :beforeUpload="beforeUpload"
      @change="handleChange"
      accept=".pdf,.jpg,.png,.doc,.xlsx,.xls,.docx"
      :showUploadList="true"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">拖放或点击上传</p>
      <p class="ant-upload-hint">
        仅支持 PDF、JPG 和 PNG、doc、docx、xlsx、xls 格式。文件大小不超过 50
        MB。
      </p>
    </a-upload-dragger>
  </div>
</template>

<script>
import { getUploadingFile } from "@/api/index.js";
export default {
  data() {
    return {
      // 当前文件列表
      fileList: [],
    };
  },
  methods: {
    beforeUpload(file) {
      return false;
    },
    // 当前文件列表
    handleChange({ file, fileList }) {
      const { $message } = this;
      const path = file.name.split(".");
      const pathName = path[path.length - 1].toLowerCase();
      const blockList = ["pdf", "jpg", "png", "doc", "xlsx", "xls", "docx"];
      // 移除清空数组
      if (file.status === "removed") {
        this.fileList = [];
      } else {
        // 判断文件大小
        const isLt30M = file.size / 1024 / 1024 < 50;
        if (!isLt30M) {
          $message.warning("文件大小不超过 50 MB");
        } else {
          if (!blockList.includes(pathName)) {
            $message.error("文件格式不正确");
            return;
          } else if (blockList.includes(pathName)) {
            this.fileList = [file];
          }
          // 判断是否有资源包
          if (this.fileList.length <= 0) {
            $message.warning("请选择上传的资源包");
          } else {
          }
          const fileInfo = this.fileList[0];
          const formData = new FormData();
          formData.append("file", fileInfo);
          // 请求函数
          getUploadingFile(formData)
            .then((res) => {
              console.log(res);
            })
            .finally(() => {})
            .catch((err) => {
              $message.error("添加失败，请稍后重试");
            });
        }
      }
    },
  },
};
</script>
```

### element

```vue
<template>
  <el-upload
    class="upload-demo"
    :http-request="handleUpload"
    action=""
    :show-file-list="false"
    :multiple="false"
    :limit="1"
    :file-list="fileList"
    accept=".xlsx,.xls"
  >
    <el-button size="small" type="primary">上传文件</el-button>
  </el-upload>
</template>

<script>
import { getImport } from "@/api/index.js";
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleUpload({ file }) {
      this.getVerifyDataFunc({ file });
    },
    getVerifyDataFunc({ file }) {
      const { $message } = this;
      const path = file.name.split(".");
      const pathName = path[path.length - 1].toLowerCase();
      const blockList = ["xlsx", "xls"];
      // 判断文件大小
      const isLt30M = file.size / 1024 / 1024 < 100;
      if (!isLt30M) {
        $message.warning("资源包不能超过50MB");
      } else {
        if (!blockList.includes(pathName)) {
          $message.error("文件格式不正确");
          return;
        } else if (blockList.includes(pathName)) {
          this.fileList = [file];
          if (this.fileList.length <= 0) {
            this.$message.warning("请选择上传的资源包");
            return;
          }
          const fileInfo = this.fileList[0];
          const formData = new FormData();
          formData.append("file", fileInfo);
          getImport(formData)
            .then((res) => {
              console.log(res);
            })
            .finally(() => {})
            .catch(() => {});
        }
      }
    },
  },
};
</script>
```
