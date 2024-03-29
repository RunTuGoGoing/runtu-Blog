---
title: js中的内存机制
date: 2023-03-01
categories: 
 - JavaScript
tags: 
 - JavaScript
sidebar: 'auto'
comment: false
---

## js中的内存机制

[js栈内存和堆内存详解—图解基本数据类型和引用数据类型的区别](https://blog.csdn.net/hb13141029/article/details/127819232)<br>

堆栈这种数据结构，具有先进后出，后进先出的特点，先明细几个概念：

- 栈内存： 计算机为浏览器执行js代码，在内部开辟的空间，也被称为执行环境栈。里面存放的是基本数据类型以及对象类型数据的引用地址，地址指向了堆内存里的对象内容。由于栈内存中存放的基础数据类型的大小是固定的，所以栈内存的内存都是操作系统自动分配和释放回收的。
- 堆内存: 堆内存里存放的是除函数的引用类型的值，如数组和对象。由于堆内存所存大小不固定，系统无法自动释放回收，所以需要JS引擎来手动释放这些内存
- 执行上下文： 大致分为三类
    - 全局执行上下文，有一个全局对象window
    - 函数级上下文：任何一个函数都有自己特有的执行上下文(函数里面的区域可以访问到函数外部的变量，但是函数外部的区域，是访问不到函数里面的)
    - 块级上下文： 由let或者const加一个{}所组成的区域，就是一个块级上下文(括号区域外是无法访问到括号区域里面声明的let或者const变量的，但是可以访问到括号区域里面的var变量)
- 变量对象：存储某个区块代码里声明的值和变量
- 真实JS变量在堆栈中的存储：

```js
function foo() {
    var a = 1
    var obj = {
        name: 'xiaoming'
    }
}

foo()
```

原始类型的值会直接存储在上下文中，而上下文则存储在栈内存中<br>
引用类型的值实际上会被存储在堆内存中，每一个值都对应着一个地址，然后在栈内存的执行上下文中将变量的值赋值成对应的地址。

- 栈和堆的溢出：
    - 栈：当递归调用方法时，随着栈深度的增加，JVM维持着一条长长的方法调用轨迹，直到内存不够分配，产生栈溢出。
    - 堆：循环创建对象，通俗点就是不断的new一个对象。