---
title: env配置
date: 2023-06-16
categories: 
 - Vue2
tags: 
 - Vue2
sidebar: 'auto'
comment: false
---

## env配置

在package.json文件中配置script，添加vue-cli-service serve --mode 「name」

```js
"scripts": {
    "serve": "vue-cli-service serve",
    "serve:「name」": "vue-cli-service serve --mode 「name」",
    "build": "vue-cli-service build",
    "test:unit": "vue-cli-service test:unit",
    "lint": "vue-cli-service lint"
},
```

与package.json文件同级一层.env.「name」文件夹，内容如下

```js
NODE_ENV=development
VUE_APP_URL=https://*** 
#VUE_APP_URL=https://*** 
```

运行时需要使用 **npm run serve:「name」** 即可
