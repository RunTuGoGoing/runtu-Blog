---
title: 前端的缓存机制
date: 2023-03-01
categories: 
 - JavaScript
tags: 
 - JavaScript
sidebar: 'auto'
comment: false
---

## 前端的缓存机制

缓存分为强缓存和协商缓存。

强缓存不需要客户端向服务端发送请求，有两种响应头实现方案：

- Expires：值是一个绝时间，在这个时间前缓存有效，但是如果本地时间被修改，会导致缓存失效
- Cache-control：值是一个相对时间，单位为秒，资源在这个时间内有效

强缓存过期之后会使用协商缓存，协商缓存需要客户端向服务端发送请求，资源未过期则服务端返回304否则返回新的资源。 协商缓存也有两种实现方案：

- Last-Modified 和 If-Modified-Since：Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来。但是如果本地文件被打开，会导致Last-Modified 被修改。
- ETag 和 If-None-Match：ETag 类似于文件指纹，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来。并且 ETag 优先级比 Last-Modified 高。