---
title: 微、宏任务，事件循环
date: 2023-02-16
categories: 
 - JavaScript
tags: 
 - JavaScript
sidebar: 'auto'
comment: false
---

## 介绍
js 执行机制是从上至下一条条执行，遇到异步代码会放到消息队列里面，然后再往下走。异步不会进入到主进程，而进入消息队列的任务，只有任务队列通知主进程，该任务可以执行了才会被放到主进程里面。其中异步任务又分为微任务，宏任务，微任务就可以看作是比较紧急的事务，优先级始终比宏任务高。每次微任务执行完毕之后才回去执行宏任务。然后执行完当前的宏任务后会再折返回去看有没有微任务，如果有微任务那么就去执行微任务。当微任务执行完毕之后再去执行下一条宏任务，如此以往就形成了事件循环 Event


## Loop

```JavaScript
//宏任务：
setTimeout，setInterval ...
//微任务
Promise.then catch finally
```

::: tip
其中 async 属于 promise 的语法糖，await 的前面的代码属于同步，而 await 后面的代码则相当于 then，所以 await 后面的代码则是微任务。
:::