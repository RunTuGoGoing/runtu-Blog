---
title: js数组中对象去重的方法
date: 2023-03-16
categories: 
 - JavaScript
tags: 
 - JavaScript
sidebar: 'auto'
comment: false
---

## 一个数组中含有对象，并且去除数组中重复的对象

### 1. id相同的，保留第一个，其它的删除

```js
let arr = [
    { id: 0, name: "张三" },
    { id: 1, name: "李四" },
    { id: 2, name: "王五" },
    { id: 3, name: "赵六" },
    { id: 1, name: "孙七" },
    { id: 2, name: "周八" },
    { id: 2, name: "吴九" },
    { id: 3, name: "郑十" },
];

const removeDuplicateObj = (arr) => {
    let obj = {};
    arr = arr.reduce((newArr, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && newArr.push(next));
        return newArr;
    }, []);
    return arr;
};

console.log(removeDuplicateObj(arr)); // [{ id: 0, name: '张三' },{ id: 1, name: '李四' },{ id: 2, name: '王五' },{ id: 3, name: '赵六' }]
```

### 2. 去除所有重复的--reduce()方法

```js
let arr = [
    { id: 0, name: "张三" },
    { id: 1, name: "李四" },
    { id: 2, name: "王五" },
    { id: 3, name: "赵六" },
    { id: 1, name: "孙七" },
    { id: 2, name: "周八" },
    { id: 2, name: "吴九" },
    { id: 3, name: "郑十" },
];

const removeDuplicateObj = (arr) => {
    let obj = {};
    arr = arr.reduce((newArr, next) => {
        obj[next.key] ? "" : (obj[next.key] = true && newArr.push(next));
        return newArr;
    }, []);
    return arr;
};

console.log(removeDuplicateObj(arr)); // [{ id: 0, name: "张三" }]
```

### 3. 去除所有重复的--for循环方法

```js
let arr = [
    { id: 0, name: "张三" },
    { id: 1, name: "李四" },
    { id: 2, name: "王五" },
    { id: 3, name: "赵六" },
    { id: 1, name: "孙七" },
    { id: 2, name: "周八" },
    { id: 2, name: "吴九" },
    { id: 3, name: "郑十" },
];

const removeDuplicateObj = (arr) => {
    let newArr = []
    let obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i].key]) {
            newArr.push(arr[i]);
            obj[arr[i].key] = true;
        }
    }
    return newArr
};

console.log(removeDuplicateObj(arr)); // [{ id: 0, name: "张三" }]
```

### 4. 判断对象中的每一个属性，若其对应的属性值都相同，则去重

```js
let arr = [
    { id: 0, name: "张三", age: 23 },
    { id: 1, name: "李四", age: 23 },
    { id: 2, name: "王五", age: 24 },
    { id: 3, name: "赵六", age: 25 },
    { id: 1, name: "孙七", age: 23 },
    { id: 2, name: "周八", age: 24 },
    { id: 2, name: "吴九", age: 26 },
    { id: 3, name: "郑十", age: 25 },
];

const removeDuplicateObj = (arr) => {
    // 缓存用于记录
    const newArr = [];
    for (const t of arr) {
        // 检查缓存中是否已经存在
        if (
            newArr.find(
                (c) =>
                c.id === t.id &&
                c.age === t.age 
            )
        ) {
            // 已经存在说明以前记录过，现在这个就是多余的，直接忽略
            continue;
        }
        // 不存在就说明以前没遇到过，把它记录下来
        newArr.push(t);
    }

    // 记录结果就是过滤后的结果
    return newArr;
};

console.log(removeDuplicateObj(arr)); // [{ id: 0, name: "张三", age: 23 },{ id: 1, name: "李四", age: 23 },{ id: 2, name: "王五", age: 24 },{ id: 3, name: "赵六", age: 25 },{ id: 2, name: "吴九", age: 26 },]
```