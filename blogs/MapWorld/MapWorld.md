---
title: 天地图
date: 2023-05-05
categories: 
 - MapWorld
tags: 
 - MapWorld
sidebar: 'auto'
comment: false
---

## 天地图
国家地理信息公共服务平台官网——天地图
https://www.tianditu.gov.cn/

没什么好说了，这玩意儿这辈子都难用到一次，太稀有了记录一下。

```vue
<template>
    <div class="mapSbj-box">
        <div
            id="mapDiv"
            style="width: 794px; height: 465px; border-radius: 12px"
        ></div>
        <div class="map-search">
            <input
                type="text"
                v-model="name"
                @input="handleSearchAddr"
                placeholder="请输入"
            />
            <img
                class="map-search-icon"
                src="@/assets/images/gqfc/sbj/map_search.png"
                alt=""
            />
            <transition name="el-zoom-in-top">
                <div v-if="visible" class="map-result-list">
                    <div
                        class="map-result-list-item"
                        v-for="(item, index) in searchList"
                        :key="index"
                        @click="handleChoice(item)"
                    >
                        <img
                            src="@/assets/images/gqfc/sbj/map_search.png"
                            alt=""
                        />
                        <div class="address">{{ item.streetLocated }}</div>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="el-zoom-in-top">
            <div class="map-modal" v-if="mapModalVisible">
                <div class="map-modal-header">
                    <span
                        >楼宇数量<span style="margin-left: 10px">{{
                            mapModalData.length
                        }}</span></span
                    >
                    <img
                        :src="mapCancel"
                        alt=""
                        @click="
                            (mapModalVisible = false),
                                (current = 0),
                                (name = '')
                        "
                    />
                </div>
                <div class="map-modal-building" id="map-modal-building">
                    <div
                        :class="['node', { 'node-active': current === index }]"
                        @click="handleCheckHouse(index)"
                        v-for="(item, index) in mapModalData"
                        :key="index"
                    >
                        <img
                            src="@/assets/images/gqfc/sbj/map_modal_house.png"
                        />
                        <div>{{ item.houseName }}</div>
                    </div>
                </div>
                <transition name="el-zoom-in-top">
                    <div class="map-modal-info">
                        <div class="map-modal-info-title">
                            {{ mapModalData[current].houseName }}
                        </div>
                        <div class="map-modal-info-addrow">
                            <img :src="addressIcon" />
                            <span>{{
                                mapModalData[current].streetLocated
                            }}</span>
                        </div>
                        <div class="map-modal-info-row">
                            <div class="label width_138">管理单位：</div>
                            <div class="value width_300">
                                {{ mapModalData[current].orgName }}
                            </div>
                        </div>
                        <div class="map-modal-info-row">
                            <div class="label">总建筑面积（m²）：</div>
                            <div class="value">
                                {{ mapModalData[current].totalBuildingArea }}
                            </div>
                        </div>
                        <div class="map-modal-info-row">
                            <div class="label">资产价值（元）：</div>
                            <div class="value">
                                {{ mapModalData[current].assetValue }}
                            </div>
                        </div>
                        <div class="map-modal-info-row">
                            <div class="label">房屋用途：</div>
                            <div class="value">
                                {{ mapModalData[current].housePurpose }}
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
import { scatterAndSearch, detailByLonLat } from "@/api/gqfc/sbj/index.js";
const mapCancel = require("@/assets/images/gqfc/sbj/map_modal_cancel.png");
const addressIcon = require("@/assets/images/gqfc/sbj/map_modal_address.png");
const m0 = require("@/assets/images/gqfc/sbj/m0.png");
const m1 = require("@/assets/images/gqfc/sbj/m1.png");
const m2 = require("@/assets/images/gqfc/sbj/m2.png");
const m3 = require("@/assets/images/gqfc/sbj/m3.png");
const m4 = require("@/assets/images/gqfc/sbj/m4.png");
const map_icon4 = require("@/assets/images/gqfc/sbj/map_icon4.png");
export default {
    components: {},
    data() {
        return {
            map_icon4,
            site: [],
            arrayObj: [],
            markers: null,
            mapModalData: [],
            //
            mapCancel,
            addressIcon,
            // 搜索到的地址列表是否显示
            visible: false,
            name: "",
            searchList: [],
            // 坐标经纬度
            coordinate: [],
            current: 0,
            mapModalVisible: false,
            timeTick: null,
            sandian: require("@/assets/images/gqfc/sbj/map_sandian.png"),
            map: null, // 天地图实例
            // 坐标
            position: {
                lon: 120.216357,
                lat: 30.252617
            },
            // 层级
            zoom: 12
        };
    },
    mounted() {
        this.getScatterAndSearch();
    },
    methods: {
        // 获取散点&&搜索列表
        getScatterAndSearch(areaName = "") {
            return new Promise((resolve, reject) => {
                scatterAndSearch({ name: areaName }).then((res) => {
                    if (!areaName) {
                        let arr = [];
                        res.forEach((item) => {
                            arr.push([
                                // item.point.lng,
                                // item.point.lat,
                                item.ordx,
                                item.ordy
                            ]);
                        });
                        this.coordinate = arr;
                        this.initMap();
                        resolve();
                    } else {
                        resolve(res);
                    }
                });
            });
        },
        // 初始化天地图
        initMap() {
            const T = window.T;
            this.map = new T.Map("mapDiv");
            this.map.centerAndZoom(
                new T.LngLat(this.position.lon, this.position.lat),
                this.zoom
            );
            // this.map.disableDrag(); // 禁止拖拽
            this.map.disableInertia(); // 禁止鼠标地图惯性拖拽
            // this.map.disableDoubleClickZoom(); // 禁止双击地图放大
            // this.map.disableKeyboard(); // 禁止双击地图放大
            this.map.disableKeyboard(); // 禁止键盘操作地图
            this.scatterAndSearchData(); // 数据
        },
        handleSearchAddr: _.debounce(function () {
            if (!this.name) {
                this.searchList = [];
                this.visible = false;
                return;
            }
            this.getScatterAndSearch(this.name).then((res) => {
                if (!res.length) return;
                this.visible = true;
                this.searchList = res;
            });
        }, 1000),
        // 点击事件
        handleMarkerClick(marker, item) {
            let that = this;
            marker.addEventListener("click", function () {
                that.current = 0;
                that.getDetailByLonLat(item.ordx, item.ordy).then((res) => {
                    that.map.centerAndZoom(
                        new T.LngLat(item.ordx, item.ordy),
                        18
                    );
                    // let icon = new T.Icon({
                    //     iconUrl:
                    //         "http://api.tianditu.gov.cn/img/map/markerA.png",
                    //     iconSize: new T.Point(30, 40),
                    //     iconAnchor: new T.Point(10, 25)
                    // });
                    // //向地图上添加自定义标注
                    // let marker = new T.Marker(
                    //     new T.LngLat(item.ordx, item.ordy),
                    //     { icon: icon }
                    // );
                    // that.map.addOverLay(marker);
                    that.visible = false;
                    that.mapModalData = res;
                    that.mapModalVisible = true;
                    that.$nextTick(() => {
                        that.scrollInit1();
                        that.scrollInit2();
                    });
                });
            });
        },
        handleChoice(item) {
            this.name = item.streetLocated;
            const lon = item.ordx;
            const lat = item.ordy;
            this.getDetailByLonLat(lon, lat).then((res) => {
                this.visible = false;
                // const point = new T.LngLat(item.ordx, item.ordy);
                this.map.centerAndZoom(new T.LngLat(item.ordx, item.ordy), 18);
                // this.map.panTo(point);
                this.mapModalData = res;
                this.mapModalVisible = true;
            });
        },
        // 坐标地点
        scatterAndSearchData(name) {
            this.site = [];
            scatterAndSearch({
                name
            }).then((res) => {
                res.forEach((item, index) => {
                    this.site[index] = {};
                    this.site[index].lng = item.ordx;
                    this.site[index].lat = item.ordy;
                    this.site[index].houseName = item.houseName;
                    this.site[index].streetLocated = item.streetLocated;
                    this.site[index].id = item.id;
                    this.site[index].ordx = item.ordx;
                    this.site[index].ordy = item.ordy;
                });
                this.markerPoint(this.site);
            });
        },
        // 点击切换
        handleCheckHouse(item) {
            this.current = item;
        },
        // 根据经纬度查详情
        getDetailByLonLat(lon, lat) {
            return new Promise((resolve, reject) => {
                detailByLonLat({ ordx: lon, ordy: lat }).then((res) => {
                    resolve(res);
                });
            });
        },
        // 标点
        markerPoint(site) {
            this.arrayObj = [];
            site.forEach((item, index) => {
                // 创建标注对象
                let marker = new T.Marker(new T.LngLat(item.ordx, item.ordy));
                this.arrayObj.push(marker);
                // 点击事件
                this.handleMarkerClick(marker, item);
            });
            this.markers = new T.MarkerClusterer(this.map, {
                markers: this.arrayObj
            });
            this.markers.setMaxZoom(18);
            this.markers.setStyles([
                {
                    url: map_icon4, // 聚合的图标
                    size: [42, 42], //聚合的图标大小
                    offset: new T.Point(0, 0), //显示图片的偏移量
                    textColor: "#fff", //显示数字的颜色
                    textSize: 15, //显示文字的大小
                    range: [0, 10000]
                }
            ]);
        },
        // 拖拽滚动
        scrollInit1() {
            // 获取要绑定事件的元素
            const nav = document.getElementById("map-modal-building");
            let flag; // 鼠标按下
            let downX; // 鼠标点击的x下标
            let scrollLeft; // 当前元素滚动条的偏移量
            nav.addEventListener("mousedown", function (event) {
                flag = true;
                downX = event.clientX; // 获取到点击的x下标
                scrollLeft = this.scrollLeft; // 获取当前元素滚动条的偏移量
            });
            nav.addEventListener("mousemove", function (event) {
                if (flag) {
                    // 判断是否是鼠标按下滚动元素区域
                    let moveX = event.clientX; // 获取移动的x轴
                    let scrollX = moveX - downX; // 当前移动的x轴下标减去刚点击下去的x轴下标得到鼠标滑动距离
                    this.scrollLeft = scrollLeft - scrollX; // 鼠标按下的滚动条偏移量减去当前鼠标的滑动距离
                }
            });
            // 鼠标抬起停止拖动
            nav.addEventListener("mouseup", function () {
                flag = false;
            });
            // 鼠标离开元素停止拖动
            nav.addEventListener("mouseleave", function (event) {
                flag = false;
            });
        },
        // 鼠标滚轮横向滚动
        // 初始化与绑定监听事件方法
        scrollInit2() {
            // 获取要绑定事件的元素
            const nav = document.getElementById("map-modal-building");
            // document.addEventListener('DOMMouseScroll', handler, false)
            // 添加滚轮滚动监听事件，一般是用下面的方法，上面的是火狐的写法
            nav.addEventListener("mousewheel", handler, false);
            // 滚动事件的出来函数
            function handler(event) {
                // 获取滚动方向
                const detail = event.wheelDelta || event.detail;
                // 定义滚动方向，其实也可以在赋值的时候写
                const moveForwardStep = 1;
                const moveBackStep = -1;
                // 定义滚动距离
                let step = 0;
                // 判断滚动方向,这里的100可以改，代表滚动幅度，也就是说滚动幅度是自定义的
                if (detail < 0) {
                    step = moveForwardStep * 100;
                } else {
                    step = moveBackStep * 100;
                }
                // 对需要滚动的元素进行滚动操作
                nav.scrollLeft += step;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
input::-webkit-input-placeholder {
    color: #76d3ff;
}
.mapSbj-box {
    position: relative;
    .map-search {
        position: absolute;
        z-index: 999999;
        top: 14px;
        left: 15px;
        display: flex;
        align-items: center;
        input {
            padding: 5px;
            color: #76d3ff;
            border: 1px solid #76d3ff;
            border-radius: 6px;
            background: rgba(0, 15, 26, 0.85);
        }
        img {
            width: 20px;
            height: 20px;
            margin-left: -26px;
        }
    }
    .map-result-list {
        position: absolute;
        top: 31px;
        left: -1px;
        width: 180px;
        height: 298px;
        background: rgba(0, 15, 26, 0.85);
        border: 2px solid;
        border-image: linear-gradient(
                214deg,
                rgb(119, 196, 255),
                rgb(92, 255, 254)
            )
            2 2;
        overflow-y: auto;
        .map-result-list-item {
            display: flex;
            align-items: center;
            padding: 7px 18px 7px 36px;
            &:hover {
                background: #0058a9;
            }
            img {
                width: 14px;
                height: 14px;
                opacity: 1;
                margin-right: 9px;
            }
            .address {
                width: 180px;
                font-size: 10px;
                font-weight: 400;
                color: #c0f9ff;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                cursor: pointer;
            }
        }
    }
    .map-modal {
        width: 400px;
        position: fixed;
        top: 541px;
        z-index: 999999;
        left: 735px;
        padding: 10px 20px;
        background: rgba(0, 15, 26, 0.85);
        border-radius: 10px;
        border: 2px solid;
        border-image: linear-gradient(
                214deg,
                rgba(119, 196, 255, 1),
                rgba(92, 255, 254, 1)
            )
            2 2;
        .map-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
                font-size: 20px;
                font-weight: bold;
                color: #e6e6e6;
            }
            img {
                width: 14px;
                height: 14px;
                cursor: pointer;
            }
        }
        .map-modal-building {
            display: flex;
            align-items: center;
            overflow-x: auto;
            width: 384px;
            justify-content: space-between;
            display: -webkit-box;
            padding: 10px 0;
            .node {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                transition: all 0.28s;
                padding: 5px;
                cursor: pointer;
                img {
                    width: 60px;
                    height: 80px;
                }
                div {
                    color: #ffffff;
                    width: 106px;
                    text-align: center;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden; //溢出内容隐藏
                    text-overflow: ellipsis; //文本溢出部分用省略号表示
                    display: -webkit-box; //特别显示模式
                    -webkit-line-clamp: 2; //行数
                    -webkit-box-orient: vertical;
                    font-size: 20px;
                }
            }
            .node-active {
                background: #1a5ab1;
                padding: 5px;
            }
        }
        .map-modal-info {
            .map-modal-info-title {
                font-size: 20px;
                font-weight: bold;
                color: #e6e6e6;
                margin: 8px 0 5px 0;
            }
            .map-modal-info-addrow {
                display: flex;
                align-items: center;
                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                }
                span {
                    font-size: 18px;
                    font-weight: 500;
                    color: #e6e6e6;
                }
            }
            .map-modal-info-row {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: 18px;
                font-weight: 500;
                margin: 8px 0;
                .label {
                    color: #e6e6e6;
                }
                .value {
                    color: #9ed7ff;
                }
                //.width_138 {
                //    width: 138px;
                //}
                .width_300 {
                    width: 300px;
                }
            }
        }
    }
}
</style>
```
