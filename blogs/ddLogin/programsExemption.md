---
title: 钉钉小程序免登
date: 2023-08-16
categories: 
 - ddLogin
tags: 
 - ddLogin
sidebar: 'auto'
comment: false
---

## 钉钉小程序免登

::: tip
钉钉小程序的免登逻辑同样是先获取到 authCode ，然后通过 authCode 拿到 token ，全局存储即可。
:::

### authCode 的获取：dd.getAuthCode()

```javascript
login() {
  const that = this
  dd.getAuthCode({
    success: function (res) {
      console.log(res) 
      // {authCode:'xxxxxxxxxx'}
      // 拿到 authCode 后调用后端接口获取token
    },
    fail: function (err) {
      console.log(err)
    }
  });
}
```

### 全局存储：dd.setStorageSync() && dd.getStorageSync()

```javascript
login() {
  const that = this
  dd.getAuthCode({
    success: function (res) {
      getLogin({
          code: res.authCode
        }).then(res => {
          // 全局存储token和用户信息
          dd.setStorageSync({
            key: 'token',
            data: res.result.token
          });
          dd.setStorageSync({
            key: 'userInfo',
            data: res.result.userInfo
          });
        })
    },
    fail: function (err) {
      console.log(err)
    }
  });
}
 
 
// 获取方法
dd.getStorageSync({
  key: 'token'
}).data
```

### 全局存储好token后，再放入请求头当中即可

```javascript
let header = {
  'X-Access-Token': dd.getStorageSync({
    key: 'token'
  }).data,
}；
```
