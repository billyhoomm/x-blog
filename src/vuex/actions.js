/**
 * Description: action 是一种专门用来被 component 调用的函数。
 */


import * as types from "./mutation-types";

//-------------------------全局---------------------------
/**
 * 更改我的称述显示状态
 * */
export const setMyWordStatus = function ({commit}) {
  commit(types.SET_SHOWMYWORD_STATUS)
};
/**
 * 更改社交的二维码图片
 * */
export const setSocialImgUrl = function ({commit}, url) {
  commit(types.SET_SOCIALIMG, url)
};
/**
 * 设置是否登录
 * */
export const setLoginState = function ({commit}, status) {
  commit(types.SET_LOGIN_STATUS, status)
};
/**
 * 更改后台管理页面是否展开显示
 * */
export const setShowBigAdminStatus = function ({commit}, status) {
  commit(types.SET_SHOW_BIGADMIN_STATUS, status)
};

/**
 * 设置-文章评论是否设置了昵称和邮箱，全局性质
 * */
export const setCommentInfoStatus = function ({commit}, status) {
  commit(types.SET_COMMENT_INFO_STATUS, status)
};

//-------------------------Music---------------------------
/**
 * 更改播放状态
 * */
export const setPlayingStatus = function ({commit}, status) {
  commit(types.SET_PLAYING_STATUS, status)
};
/**
 * 设置当前音乐的持续时间
 * */
export const setMusicDuration = function ({commit}, duration) {
  commit(types.SET_MUSIC_DURATION, duration)
};
/**
 * 设置当前音乐的进行时间
 * */
export const setMusicRightNow = function ({commit}, rightNow) {
  commit(types.SET_MUSIC_RIGHTNOW, rightNow)
};
/**
 * 设置当前音乐的信息
 * */
export const setCurrentMusic = function ({commit}, currentMusicInfo) {
  commit(types.SET_CURRENT_MUSIC, currentMusicInfo)
};
/**
 * 设置当前音乐的加载状态
 * */
export const setLoadingStatus = function ({commit}, status) {
  commit(types.SET_LOADING_STATUS, status)
};
