---
title: filter函数
date: 2023-02-22
categories: 
 - utils
tags: 
 - utils
sidebar: 'auto'
comment: false
---

## 一些好用的filter函数

```JS
import Vue from "vue";

const dictFuc = {
  // flag=2 1返回16
  numType: function (type, flag = 1) {
    if (!type) return "-";
    let dict = {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
      14: "14",
      15: "15",
    };
    if (flag == 2) {
        dict = {
            ...dict,
            1: "16"
        };
    }
    if (dict[type]) return dict[type];
    return "-";
  },

  /**
   * 匹配单位
   * @param {Number} num 匹配单位源数据
   * @param {Number} decimalDigit 保留几位小数
   * @param {Number} returnType 返回类型 1：数值+单位 400万 2：数值 400 3：单位 万
   * @returns {string}
   */
  matchUnit: function (num, decimalDigit = 2, returnType = 1) {
    if (!num && returnType != 3) return 0;
    let unit = "";
    if (num >= 10000 && num < 100000000) {
      num = num / 10000;
      unit = "万";
    } else if (num >= 100000000) {
      num = num / 100000000;
      unit = "亿";
    }
    if (String(num).indexOf(".") > -1) {
      num = Number(num).newFixed(decimalDigit);
    }
    if (returnType === 1) {
      return num + unit;
    } else if (returnType === 2) {
      return num;
    } else if (returnType === 3) {
      return unit;
    }
  },


  /**
   * 姓名脱敏
   * @param {String} name
   * @returns {String}
   * */
  desensitizeName: function (name) {
    if (!name) return;
    const sign = [",", "，", "、", ".", " "];
    let index = sign.indexOf(name);
    if (index > -1) {
      const nameList = name.split(sign[index]).map((item) => item[0] + "**");
      return nameList.toString();
    }
    return name[0] + "**";
  },


  /**
   * 身份证脱敏
   * @param {String} IDCard
   * @returns {String}
   * */
  desensitizeIDCard: function (IDCard) {
    if (!IDCard) return;
    return IDCard.slice(0, 6) + "********" + IDCard.slice(14);
  },
};

for (let key in dictFuc) {
  Vue.filter(key, dictFuc[key]);
}

export default dictFuc;
```

**页面中使用：**

```JS
import dictFuc from "@/utils/filter.js";

// dictFuc.numType(1) // '1'
```