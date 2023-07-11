---
home: true
heroText: 
heroTextStyle: {
}
tagline: 
# 人类是为了恋爱和革命而诞生的
heroImage: /hero.png
heroImageStyle: {
  maxWidth: '600px',
  width: '100%',
  display: block,
  margin: '-5rem auto 2rem',
  # background: '#fff',
  borderRadius: '1rem',
}
bgImage: bgImg.jpg
bgImageStyle: {
  height: '1000px'
}
isShowTitleInHome: false
actionText: Guide
actionLink: /views/other/guide
features:
- title: Yesterday
  details: 开发一款看着开心、写着顺手的 vuepress 博客主题
- title: Today
  details: 希望帮助更多的人花更多的时间在内容创作上，而不是博客搭建上
- title: Tomorrow
  details: 希望更多的爱好者能够参与进来，帮助这个主题更好的成长
---

<style>
.anchor-down {
  display: block;
  width: 20px;
  height: 20px;
  font-size: 34px;
  text-align: center;
  animation: bounce-in 5s 3s infinite;
  position: absolute;
  left: 50%;
  bottom: 30%;
  margin: 12rem auto 0 -10px;
  cursor: pointer;
}
@-webkit-keyframes bounce-in{
  0%{transform:translateY(0)}
  20%{transform:translateY(0)}
  50%{transform:translateY(-20px)}
  80%{transform:translateY(0)}
  100%{transform: translateY(0)}
}
.anchor-down::before {
    content: "";
    width: 20px;
    height: 20px;
    display: block;
    border-right: 3px solid #fff;
    border-top: 3px solid #fff;
    transform: rotate(135deg);
    position: absolute;
    bottom: 10px;
    opacity: 0.4;
}
/* .anchor-down::after {
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-right: 3px solid #fff;
  border-top: 3px solid #fff;
  transform: rotate(135deg);
  opacity: 0.4;
} */
body{
  /*background-image: url('assets/image/bgGif.gif');*/
}
.info-wrapper{
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, .3) !important;
    background-image: url('assets/image/bgGif.gif') !important;
}
.abstract-item{
    padding: 30px 20px !important;
    /*border-radius: 2rem !important;*/
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, .3) !important;
    background-image: url('assets/image/bgGif.gif') !important;
}

.info-wrapper:hover{
  transform: scale(1.01);
}

.abstract-item:hover{
  transform: scale(1.01);
}
.abstract-item::before, .abstract-item::after {
  box-sizing: inherit;
  position: absolute;
  content: '';
  border: 2px solid transparent;
  width: 0;
  height: 0;
}
.abstract-item::after {
  bottom: 0;
  right: 0;
}
.abstract-item::before {
  top: 0;
  left: 0;
}
.abstract-item:hover::before, .abstract-item:hover::after {
  width: 100%;
  height: 100%;
}
.abstract-item:hover::before {
  border-top-color: #697d9d;
  border-right-color: #697d9d;
  transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
}
.abstract-item:hover::after {
  border-bottom-color: #697d9d;
  border-left-color: #697d9d;
  transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
}

.reco-sticky{
    top: 1px !important;
    right: 1px !important;
}
</style>

<script>
export default {
  mounted () {
    const ifJanchor = document.getElementById("JanchorDown"); 
    ifJanchor && ifJanchor.parentNode.removeChild(ifJanchor);
    let a = document.createElement('a');
    a.id = 'JanchorDown';
    a.className = 'anchor-down';
    document.getElementsByClassName('hero')[0].append(a);
    let targetA = document.getElementById("JanchorDown");
    targetA.addEventListener('click', e => { 
      // 添加点击事件
      this.scrollFn();
    })
  },
  methods: {
    scrollFn() {
      const windowH = document.getElementsByClassName('hero')[0].clientHeight; // 获取窗口高度
      document.documentElement.scrollTop = windowH; // 滚动条滚动到指定位置
    }
  }
}
</script>

