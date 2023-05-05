(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{460:function(t,a,s){"use strict";s.r(a);var e=s(1),r=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"get和post的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get和post的区别"}},[t._v("#")]),t._v(" get和post的区别")]),t._v(" "),a("h3",{attrs:{id:"_1-url可见性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-url可见性"}},[t._v("#")]),t._v(" 1.url可见性")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("get，参数url可见\npost，url参数不可见\n")])])]),a("h3",{attrs:{id:"_2-数据传输上"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-数据传输上"}},[t._v("#")]),t._v(" 2.数据传输上")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("get，通过拼接url进行传递参数\npost，通过body体传输参数\n")])])]),a("h3",{attrs:{id:"_3-缓存性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-缓存性"}},[t._v("#")]),t._v(" 3.缓存性")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("get请求是可以缓存的\npost请求不可以缓存\n")])])]),a("h3",{attrs:{id:"_4-后退页面的反应"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-后退页面的反应"}},[t._v("#")]),t._v(" 4.后退页面的反应")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("get请求页面后退时，不产生影响\npost请求页面后退时，会重新提交请求\n")])])]),a("h3",{attrs:{id:"_5-传输数据的大小"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-传输数据的大小"}},[t._v("#")]),t._v(" 5.传输数据的大小")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("get一般传输数据大小不超过2k-4k（根据浏览器不同，限制不一样，但相差不大）\npost请求传输数据的大小根据php.ini 配置文件设定，也可以无限大。\n")])])]),a("h3",{attrs:{id:"_6-安全性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-安全性"}},[t._v("#")]),t._v(" 6.安全性")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("这个也是最不好分析的，原则上post肯定要比get安全，毕竟传输参数时url不可见，但也挡不住部分人闲的没事在那抓包玩。安全性个人觉得是没多大区别的，防君子不防小人就是这个道理。对传递的参数进行加密，其实都一样。\n\n由于协议规定，就导致get比post更快，原因如下：\n1）post请求包含更多请求头\n2）请求的方式不一样\n\npost请求：\n1）浏览器请求tcp连接（第一次握手）\n2）服务器答应进行tcp连接（第二次握手）\n3）浏览器确认并发送post请求头（第三次握手）\n4）服务器返回100 Continue响应\n5）浏览器发送数据\n6）服务器返回200 OK响应\n\nget请求：\n1）浏览器请求tcp连接（第一次握手）\n2）服务器答应进行tcp连接（第二次握手）\n3）浏览器确认，并发送get请求头和数据（第三次握手）\n4）服务器返回200 OK响应")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);