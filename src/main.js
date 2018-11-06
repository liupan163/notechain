import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue(App);
app.$mount();

export default {
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ["^pages/me/main", "pages/index/main", "pages/details/main", "pages/list/main", "pages/newnote/main"],
    "window": {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "七年一疗程",
      navigationBarTextStyle: "black"
    },
    "tabBar": {
      selectedColor: "#EA5149",
      list: [
        {
          pagePath: "pages/index/main",
          text: "Index",
          iconPath: "static/img/list.png",
          selectedIconPath: "static/img/list-active.png"
        },
        {
          pagePath: "pages/me/main",
          text: "Me",
          iconPath: "static/img/me.png",
          selectedIconPath: "static/img/me-active.png"
        }
      ]
    }
  }
};
