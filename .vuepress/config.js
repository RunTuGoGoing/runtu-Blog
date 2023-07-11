// import codeCopyPlugin from "@snippetors/vuepress-plugin-code-copy";
module.exports = {
  // base: "/RunTuBlog/", // 部署github需要的配置
  locales: {
    "/": {
      lang: "zh-CN", // 仅供参考，具体 lang 配置根据自己需求定义
    },
  },
  title: "梦不养人 沉梦昂志",
  description: "my liBlog",
  dest: "public",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    mode: "light", // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    modePicker: true, // 默认 true，false 不显示模式调节按钮，true 则显示
    nav: [
      {
        text: "主页",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "时间线",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "关于",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/RunTuGoGoing",
            icon: "reco-github",
          },
        ],
      },
    ],
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "分类",
      },
      tag: {
        location: 3,
        text: "标签",
      },
    },
    friendLink: [
      {
        title: "vuepress-theme-reco",
        desc: "A simple and beautiful vuepress Blog & Doc theme.",
        avatar:
          "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: "https://vuepress-theme-reco.recoluan.com",
      },
    ],
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "RunTu",
    authorAvatar: "/avatar.png",
    record: "蔬菜萝卜",
    startYear: "2023",
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@assets": "/assets",
      },
    },
  },
  plugins: [
    ['vuepress-plugin-boxx'],
    [
      'meting',
      {
        meting: {
          // 歌单地址 -> 如果输入可忽略server|type|mid
          auto: 'https://music.163.com/#/playlist?id=894025998',
          // // 当前服务为netease -> 网易
          // server: "netease",
          // // 类型为歌单
          // type: "playlist",
          // // 歌单id
          // mid: "2974518382",
        },
        aplayer: {
          // 歌单为随机
          order: 'random',
          // 0为不显示歌词
          lrcType: 0,
          // 音量
          volume: 0.40,
          // 开启迷你模式
          mini: true,
          // 自动播放
          autoplay: true
        },
      },
    ],
    [
      "vuepress-plugin-cursor-effects",
      {
        size: 2, // size of the particle, default: 2
        shape: "circle", // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
    [
      "ribbon-animation",
      {
        size: 90, // 默认数据
        opacity: 0.3, //  透明度
        zIndex: -1, //  层级
        opt: {
          // 色带HSL饱和度
          colorSaturation: "80%",
          // 色带HSL亮度量
          colorBrightness: "60%",
          // 带状颜色不透明度
          colorAlpha: 0.65,
          // 在HSL颜色空间中循环显示颜色的速度有多快
          colorCycleSpeed: 6,
          // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
          verticalPosition: "center",
          // 到达屏幕另一侧的速度有多快
          horizontalSpeed: 200,
          // 在任何给定时间，屏幕上会保留多少条带
          ribbonCount: 2,
          // 添加笔划以及色带填充颜色
          strokeSize: 0,
          // 通过页面滚动上的因子垂直移动色带
          parallaxAmount: -0.5,
          // 随着时间的推移，为每个功能区添加动画效果
          animateSections: true,
        },
        ribbonShow: false, //  点击彩带  true显示  false为不显示
        ribbonAnimationShow: true, // 滑动彩带
      },
    ],
    // 自动生成侧边栏的插件
    [
      "vuepress-plugin-auto-sidebar",
      {
        collapse: {
          open: true,
        },
      },
    ],
    [
      // 支持数学公式
      // https://vuepress.github.io/zh/plugins/mathjax/
      // npm install -D vuepress-plugin-mathjax
      "vuepress-plugin-mathjax",
      {},
    ],
    // 动态标题展示
    [
      "dynamic-title",
      {
        showIcon: "/assets/image/base/favicon.ico",
        showText: "(/≧▽≦/)咦！又好了！",
        hideIcon: "/assets/image/base/favicon.ico",
        hideText: "(●—●)喔哟，崩溃啦！",
        recoverTime: 1000,
      },
    ],
    // 樱花
    [
      "sakura",
      {
        num: 20, // 默认数量
        show: true, //  是否显示
        zIndex: 2, // 层级
        img: {
          replace: false, // false 默认图 true 换图 需要填写httpUrl地址
          httpUrl: "../assets/image/sakura.png", // 绝对路径
        },
      },
    ],
    ["@vuepress/last-updated"],
    // 著作权
    [
      "copyright",
      {
        authorName: "RunTu", // 选中的文字将无法被复制
        minLength: 20, // 如果长度超过  30 个字符
      },
    ],
    // 加载动画
    ["vuepress-reco/vuepress-plugin-loading-page"],
    [
      // 图片放大插件 先安装在配置， npm install vuepress-plugin-dynamic-title --save
      "@vuepress/plugin-medium-zoom",
      {
        selector: ".page img",
        delay: 1000,
        options: {
          margin: 24,
          background: "rgba(25,18,25,0.9)",
          scrollOffset: 40,
        },
      },
    ],
    // messageboard.md
    [
      require("./vuepress-plugin-sakana"),
      {
        character: "takina", // takina chisato
        scale: 0.4,
        canSwitchCharacter: true,
      },
    ],
    // 代码复制
    ["vuepress-plugin-code-copy", true],
    // 公告
    [
      "@vuepress-reco/vuepress-plugin-bulletin-popover",
      {
        title: "更新时间--2023-07-03",
        body: [
          {
            type: 'title',
            content: '欢迎来到我的博客🎉🎉🎉',
            style: 'text-align: center;font-size: 15px;font-weight: bold;'
          },
          {
            type: "text",
            content: "dialog函数式调用组件",
            style: "text-align: center;",
          },
          {
            type: 'text',
            content: '邮箱：runtugo@163.com',
            style: 'text-align: center;font-size: 15px;font-weight: bold;'
          }
        ],
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
    // 支持 task list
    // npm install markdown-it-task-lists -D
    // 除了这个还要在 .vuepress/styles/index.styl 中还要修改
    extendMarkdown: (md) => {
      md.use(require("markdown-it-task-lists"));
    },
  },
};
