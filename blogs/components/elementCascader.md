---
title: el-cascader级联选择器选择问题
date: 2023-03-08
categories: 
 - components
tags: 
 - components
sidebar: 'auto'
comment: false
---

## el-cascader级联选择器选择任意一个选项详细解决方案

**el官方提供了props.checkStrictly = true属性可以取消父子节点强关联来达到选择任意选项的目的**

但是存在两个缺陷：
- 只能点击radio的圈圈进行选择
- 选择完了之后级联选择器不会关闭

## 解决方法

添加props配置属性：

```vue
<template>
    <el-cascader
        v-model="fCategoryId"
        :options="option"
        :props="optionProps"
        ref="refHandle"
    >
    </el-cascader>
</template>

<script>
export default{
    data(){
        return{
            optionProps:{
                    value: 'id',    
                    label: 'cName',
                    children: 'childrenList',  // 子元素字段名
                    emitPath : false,
                    checkStrictly:true,
                    expandTrigger: 'hover'  // 设置鼠标悬浮展开，如果点击展开的话，会出现点击父节点后选择器直接关闭，不能选择子节点了
            },
        }
    },
    // 监听v-model数据，不用点击radio圈圈，点击文字也能关闭级联选择器:
    watch: {
        fCategoryId() {
            if (this.$refs.refHandle) {
                this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
            }
        }
    }
}
</script>

<!-- 利用css修改圆圈 -->
<style lang='scss'>
/* 注意此处不能有scoped 否则样式无法生效 */
.el-cascader-panel{
  .el-radio__inner{
    border: 0px;
    background:transparent;
  }
  .el-radio__input.is-checked .el-radio__inner{
    background:none;
  }
  // 这一块的样式自己按照自己的页面调整一下
  .el-radio{
    height: 38px;
    line-height: 38px;
    width: 140px; // 宽度和盒子宽度一样就行
    position: absolute;
    top: 5px;
    z-index: 10;
    left: 5px;
  }
}
</style>
```

::: tip
如果只想解决只能点击radio的圈圈进行选择的问题话，其实单纯修改样式就好了，不需要做配置选项的操作
:::
