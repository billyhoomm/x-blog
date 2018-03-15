'use strict';
import Vue from 'vue';
import App from './App';
import router from './router.js';
import "./theme/util.scss";
import "bootstrap/scss/bootstrap.slim.scss";
import "bootstrap/js/tooltip.js";
import "bootstrap/js/modal.js";
import "bootstrap/js/transition.js";
import attachFastClick from "fastclick";
import moment from "moment";
import 'moment/locale/zh-cn'
import ua from './plugin/parseUA';

/**
 * $router全局化，便于外部js调用
 * */
window.$router = router;

/**
 * 浏览环境判断，保存为全局
 * */
window.ua = ua;

moment.locale('zh-cn');
window.moment = moment;
/**
 * 触摸配置
 * */
new attachFastClick(document.body);

/**
 * 发布模式禁用console.log()
 * */
if (process.env.NODE_ENV === 'production') {
  console.log = function () {
  }
  console.warn = function () {
  }
}

new Vue({
  render (h) {
    return h(App)
  },
  router,
  components: {App},
}).$mount('#app')
