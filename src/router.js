/**
 * Created by Hsiang on 2016/10/12.
 * 路由
 */
'use strict';
import Vue from 'vue';
import store from './vuex/store'
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'index', //命名路由
    component: require('./views/blog.index.vue'),
  },
  {
    path: '/music',
    name: 'music',
    component: require('./views/blog.music.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: function (resolve) {
      require(['./views/blog.login.vue'], resolve)
    },
  },
  {
    path: '/blog',
    name: 'blog',
    // 跳转到文章列表并携带参数
    redirect: {
      name: 'artList',
      query: {
        listType: 'latest'
      }
    },
    component: require('./views/blog.vue'),
    children: [
      {
        path: 'art-list',
        name: 'artList',
        component: require('./views/blog.articleList.vue'),
      },
      {
        path: 'his-list',
        name: 'historyList',
        component: require('./views/blog.historyList.vue'),
      },
      {
        path: 'tag-list',
        name: 'tagList',
        redirect: '/blog/tag-list/classify',
        component: {
          template: '<router-view></router-view>'
        },
        children: [
          {
            path: 'classify',
            name: 'tagListClassify',
            component: require('./views/blog.tagList.vue'),
          },
          {
            path: 'find-by-tag-id',
            name: 'tagListFindByTagId',
            component: require('./views/blog.articleList.vue'),
          },
        ]
      },
    ]
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: function (resolve) {
      require(['./views/blog.article.vue'], resolve)
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: function (resolve) {
      require(['./views/admin.vue'], resolve)
    },
    meta: {requiresAuth: true},
    children: [
      {
        path: 'admin-dashboard',
        name: 'admin-dashboard',
        component: function (resolve) {
          require(['./views/admin.dashboard.vue'], resolve)
        },
        meta: {requiresAuth: true},
      },
      {
        path: 'admin-myinfo',
        name: 'admin-myinfo',
        component: function (resolve) {
          require(['./views/admin.myInfo.vue'], resolve)
        },
        meta: {requiresAuth: true},
      },
      {
        path: 'admin-tag',
        name: 'admin-tag',
        component: function (resolve) {
          require(['./views/admin.tagList.vue'], resolve)
        },
        meta: {requiresAuth: true},
      },
      {
        path: 'admin-articleManager',
        name: 'admin-articleManager',
        redirect: {
          name: 'admin-articleList'
        },
        component: {
          template: '<router-view></router-view>'
        },
        meta: {requiresAuth: true},
        children: [
          {
            path: 'admin-articleList',
            name: 'admin-articleList',
            component: function (resolve) {
              require(['./views/admin.articleList.vue'], resolve)
            },
            meta: {requiresAuth: true},
          },
          {
            path: 'admin-article/:articleId',
            name: 'admin-article',
            component: function (resolve) {
              require(['./views/admin.article.vue'], resolve)
            },
            meta: {requiresAuth: true},
          },
        ]
      },
      {
        path: 'admin-commentList',
        name: 'admin-commentList',
        component: function (resolve) {
          require(['./views/admin.commentList.vue'], resolve)
        },
        meta: {requiresAuth: true},
      },
    ]
  }

];
const router = new VueRouter({
  mode: 'history', //  hash 模式  history 模式
  base: '/',//默认值: "/",应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  routes: routes // （缩写）相当于 routes: routes
});

/**
 * 登录状态检查
 * */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 未登录状态
    if (!store.state.isLogin) {
      //存在authorization信息，则验证下。
      if (!!Vue.$localStorage.authorization) {
        _checkAuth().then(function () {
          next();
        },function () {
          next({
            name: 'login',
          })
        });
      } else {
        next({
          name: 'login',
        })
      }
    } else {
      _checkAuth().then(function () {
        next();
      },function () {
        next({
          name: 'login',
        })
      });
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});


/**
 * Token验证，只是对时间验证过期否
 * */
function _checkAuth() {
  return new Promise(function (resolve, reject) {
    let authorization = Vue.$localStorage.authorization;
    let time = parseInt(authorization.time);
    if ((new Date().getTime() - time) < 1000 * 60 * 60 * 2) {
      //token有效,能进入
      store.dispatch('setLoginState',true);
      // 设置请求的token
      Vue.http.headers.common['authorization'] = "token " + authorization.token;
      resolve();
    } else {
      Vue.$localStorage.$delete('authorization');
      Vue.$localStorage.$delete('commentInfo');
      store.dispatch('setLoginState',false);
      reject();
    }
  })
}

module.exports = router;
