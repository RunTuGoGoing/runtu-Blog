---
title: 浅拷贝深拷贝区别
date: 2023-02-16
categories: 
 - JavaScript
tags: 
 - JavaScript
sidebar: 'auto'
comment: false
---

## 介绍
js数据类型分为基本与引用 当我们创建复制基本数据类型时不会发生什么毛病 一切岁月静好。<br>
因为基本类型的数据都以key，值的形式存在栈内存之中<br>
b复制a的时候栈内存则会开辟一个新的栈来存储b 所以无论b如何变化都干涉不到a

```JavaScript
let a = 'hello'
let b = a
b = 'RunTu'
console.log(a,b) //hello RunTu
```

但是我们以同样方式复制引用类型且试图改变属性的时候就出事了。发现被复制的对象里的属性也会发生变化。

```JavaScript
let a = [1,2,3]
let b = a
b[0] = '0'
console.log(a,b)  // a:['0',2,3]  b:['0',2,3]
```

这是因为我们在直接复制引用类型的数据的时候只是复制了该对象的"堆地址"（引用类型是栈内存中的值存放的是堆内存的地址，这个地址指向的才是value），说白一点就是他俩都指向了一个地方 都从同一个地方读/取 这就直接导致了 其中任何一方修改了堆内存的value的话 他们俩的结果都会发生变化！这个行为与过程就构成了浅拷贝。<br>

```JavaScript
// 而深拷贝则是开辟新的堆内存来存放value，采用便利递归的形式来拷贝对象所有层级
function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断元素是否是object类型，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
} 
let obj = {name:'RunTu'，age:23}
let obj1 = deepClone(obj)
obj1.name = '闰土'
// 这时候就会发现obj1翅膀硬了，已经不受obj的控制了，也有了属于自己的房子了，可以随便造了,这就是深拷贝😳
```

```JavaScript
// 另外 json.parse(json.stringfly(obj)) 也可以实现以上效果，但是此方法并不会实现对对象里的方法的深拷贝，会显示为undefined.
// 如果对象的value都是基本类型的话,直接使用assign也是可以实现深拷贝的效果的
let newObj = Object.assign({},obj)
```