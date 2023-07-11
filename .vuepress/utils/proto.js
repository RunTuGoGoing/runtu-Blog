import Vue from "vue";
Vue.prototype.$isStable = function (data) {
    // 判断一个响应式数据是否稳定的逻辑
    // 可根据具体情况自行定义
    return JSON.stringify(data) === JSON.stringify(Vue.observable(data));
};
