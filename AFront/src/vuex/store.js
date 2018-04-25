/**
 * Description: 状态存储
 */
import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import {
  SET_SHOWMYWORD_STATUS,
  SET_SOCIALIMG,
  SET_LOGIN_STATUS,
  SET_SHOW_BIGADMIN_STATUS,
  SET_COMMENT_INFO_STATUS,
  SET_PLAYING_STATUS,
  SET_MUSIC_DURATION,
  SET_MUSIC_RIGHTNOW,
  SET_CURRENT_MUSIC,
  SET_LOADING_STATUS,
  // SET_CAN_AUTOPLAY
} from "./mutation-types";
//vuex模块
// 告诉 vue “使用” vuex
Vue.use(Vuex);

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  //全局state状态
  state: {
    isShowMyWords: false,//是否显示我的简介
    isLogin: false,//是否登录
    socialImgUrl: 'http://cdn.billyhu.com/icon/wechat.png',//显示社交图片
    isShowBigAdmin: false,//是否展开后台页面->用于文章编辑预览
    hasCommentInfo:false,//设置-文章评论是否设置了昵称和邮箱，全局性质

    //音乐相关
    isPlaying: false,//是否播放
    isLoading: false,//是否播放
    handle: '',//控制当前音乐的句柄
    currentPercent: 0,//当前音乐播放百分比
    volume: 1,//当前音量
    duration: 0,//当前音乐持续时间
    rightNow: 0,//当前音乐进行时
    rightPercent: 0,//当前音乐进行时百分比
    currentMusicInfo: {},//当前音乐信息
  },
  //全局突变事件处理
  mutations: {
    //toggle我的个人称述信息
    [SET_SHOWMYWORD_STATUS] (state) {
      state.isShowMyWords = !state.isShowMyWords;
    },
    //设置我的社交弹出组件的img
    [SET_SOCIALIMG] (state, url) {
      state.socialImgUrl = url;
    },
    //设置我的社交弹出组件的img
    [SET_LOGIN_STATUS] (state, status) {
      state.isLogin = !!status;
    },
    //设置我的社交弹出组件的img
    [SET_SHOW_BIGADMIN_STATUS] (state, status) {
      state.isShowBigAdmin = !!status;
    },
    //设置-文章评论是否设置了昵称和邮箱，全局性质
    [SET_COMMENT_INFO_STATUS] (state, status) {
      state.hasCommentInfo = !!status;
    },



    // music
    // 设置播放状态,是否播放
    [SET_PLAYING_STATUS] (state, status) {
      state.isPlaying = !!status;
      if (!state.handle) {
        console.log('state.handle=null')
        return;
      }
      console.log(status)
      if (status) {
        state.handle.play()
      } else {
        state.handle.pause()
      }
    },
    [SET_MUSIC_DURATION] (state, duration) {
      state.duration = duration;
    },
    [SET_MUSIC_RIGHTNOW] (state, rightNow) {
      state.rightNow = rightNow;
      state.rightPercent = state.rightNow * 100 / state.duration
    },
    [SET_CURRENT_MUSIC] (state, currentMusicInfo) {
      state.handle = new Audio(currentMusicInfo.musicUrl);
      state.handle.preload = "none";
      // console.log('isPlaying:'+state.isPlaying)
      // if(state.isPlaying){
      //     console.log('willPlaying')
      //     state.handle.load();
      // }
      // state.isLoading = true;
      state.currentMusicInfo = currentMusicInfo;
    },
    [SET_LOADING_STATUS] (state, status) {
      state.isLoading = status;
    },
  },
})
