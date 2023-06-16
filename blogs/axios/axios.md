---
title: axios封装
date: 2023-02-02
categories:
  - axios
tags:
  - axios
sidebar: "auto"
comment: false
---

## axios 封装

在项目中的 utils 中新建一个 request.js 文件

```js
import axios from "axios";
import qs from "qs";
import store from "@/store";

// window.BASE_API_URL 详细看 vue项目全局挂载window对象
let baseURL = window.BASE_API_URL;
if (process.env.NODE_ENV === "development") {
  baseURL = process.env.VUE_APP_URL;
}
// 白名单
const whiteList = [];
const service = axios.create({
  baseURL,
  // 请求超时时间
  timeout: 60 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
// 错误消息提示停留时间
const duration = 4 * 1000;
let loading = null;
// 请求拦截
service.interceptors.request.use(
  (config) => {
    if (!whiteList.includes(config.url)) {
      // 白名单的判断
    }
    if (config.method === "get") {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }
    if (config.ContentType) {
      config.headers["Content-Type"] = config.ContentType;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    const type = response.request.responseType;
    if (
      response.status === 200 &&
      (response.data.code === 200 || response.data.code === 0)
    ) {
      if (response.data.hasOwnProperty("result")) {
        return Promise.resolve(response.data.result);
      } else {
        return Promise.resolve(response.data.data);
      }
    } else if (response.status === 200 && type === "blob") {
      return Promise.resolve(response.data);
    } else {
      if (response.data.code === 510) {
        this.$message.warning({ message: response.data.message });
      } else {
        this.$message.error({ message: response.data.message });
      }
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.code && error.code === "ERR_CANCELED") {
      console.log("取消了本次的网络请求");
      // return Promise.reject("取消了本次的网络请求1");
    } else if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit("OPEN_LOGIN", true);
          break;
      }
    }
    return Promise.reject(error);
  }
);
export default service;
```

项目中的 api 文件下的使用方法

```js
import axios from "@/utils/request";

// post data , get params
export function getData(data) {
  return axios({
    method: "post",
    url: "",
    data,
  });
}

// 下载或者导出流文件 需要加一段 responseType: "blob"
export function getExport(data) {
  return axios({
    url: "",
    method: "post",
    data,
    responseType: "blob",
  });
}

// 上传文件则是用 formData 格式
export function getUpload(formData) {
  return axios({
    url: "",
    method: "post",
    data: formData,
  });
}
```

页面中引入使用

```vue
<script>
import { getData } from "@/api/index.js";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.getQueryData();
  },
  methods: {
    getQueryData() {
      getData().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
```
