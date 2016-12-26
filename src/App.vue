<!--内容区-->
<template>
  <div>
    <div class="app__content">
      <!--导航条-->
      <blog-nav></blog-nav>
      <!-- 路由外链 -->
      <router-view></router-view>
      <!--qq,微信弹出层-->
      <social-info></social-info>
      <!--退出弹层-->
      <do-logout></do-logout>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from "vue";
  import API from "./config";
  import blogNav from "./views/blog.nav";
  import socialInfo from "./components/socialInfo.vue";
  import doLogout from "./components/doLogout.vue";
  import store from './vuex/store'
  import vStorage from './utils/vStorage.js'
  import vueMoment from 'vue-moment';
  import moment from 'moment';
  import VueResource from 'vue-resource';
  import {num2MMM, uppercase, addImgPrefix} from "./utils/filters.js";
  import {Sign} from "./api/api_statistic";
  import {mapActions} from 'vuex';
  /**
   * 设置本地存储
   * */
  Vue.use(vStorage, {
    storageKeyPrefix: 'xst-'
  });

  /**
   * 时间格式化插件-过滤器
   * */
  moment.locale('zh-cn')
  Vue.use(vueMoment);

  /**
   * filter全局注册
   * */
  Vue.filter('num2MMM', num2MMM);
  Vue.filter('uppercase', uppercase);
  Vue.filter('addImgPrefix', addImgPrefix);

  /**
   * vue-resource 配置
   * */
  Vue.use(VueResource);
  Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
  Vue.http.headers.common['Content-Type'] = 'application/json; charset=utf-8';

  export default {
    store,
    data: function () {
      return {}
    },
    methods: {
      //vuex
      ...mapActions({
        setLoginState: 'setLoginState',
      }),
    },
    created: function () {
      const _this = this;
      /**
       * 签到
       * sign 是一个13位时间戳，填写当前签到的时间
       * */
      let sign = parseInt(Vue.$localStorage['sign']);
      let dayStart = parseInt(moment().startOf('day').format('x'));
      if (!sign || sign < dayStart) {
        Sign().then(function () {
          Vue.$localStorage.$set('sign', (new Date().getTime()));
        });
      } else {
        console.log('you have already sign!');
      }


      /**
       * 进入检查是否有token,是否能直接登录
       * */
      if (!!_this.$localStorage.authorization) {
        let authorization = _this.$localStorage.authorization;
        let time = parseInt(authorization.time);
        if ((new Date().getTime() - time) < 1000 * 60 * 60 * 2) {
          //token有效,能进入
          _this.setLoginState(true);
          // 设置请求的token
          Vue.http.headers.common['authorization'] = "token " + authorization.token;
        }
      }

    },
    mounted: function () {
      //更改loading状态,，隐藏index中的loading画面
      window.hideLoadingPage();
    },
    components: {
      //小组件挂载集中挂载
      blogNav,
      socialInfo,
      doLogout,
    },
  }


</script>

<style lang="scss">
  @import "./theme/theme.scss";

  * {
    /*outline: 1px solid #ddd;*/
  }

  /*解决ie下右侧出现滚动条的情况,因为如果使用modal时,会出现抖动*/
  @-ms-viewport {
    width: device-width;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    min-width: 320px;
    min-height: 100%;
    width: 100%;
    box-sizing: border-box;
    font-family: $font-family-sans-serif !important;
    opacity: 1;
    /*transition: all ease 500ms;*/

    &.isLogin {
      .admin_btn {
        display: block;
      }
    }
    .admin_btn {
      display: none;
    }
  }

  @include media(">desktop_small") {
    body {
      /*padding-left: 45px;*/
    }
  }

  @include media("<=desktop_small") {
    body {
      margin-top: 45px;
    }
  }

  @include media("<=phone") {
    html {
      /*background:#fff;*/
    }

  }

  /*内容区*/
  .app__content {
    width: 100%;
  }
</style>
