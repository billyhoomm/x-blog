/**
 * Description: actions主要是为了异步操作，在不进行异步操作的时候可以在组件中直接
 使用mutations进行状态管理
 组件中mutations:this.$store.commit('xxx',载荷)xxx是事件类型，并可传入载荷作为参数
                 或者可以使用mapmutations辅助函数将组件中的method映射为store.commit
                 调用
                 -----组件中使用的辅助函数
                 export default {
                  methods: {
                    ...mapMutations([
                      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
                    ]),
                    ...mapMutations({
                      add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
                    })
                  }
                }
组件中actions:this.$store.dispatch('xxx')xxx是事件类型，并可传入载荷作为参数
              或者可以使用mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
              -----组件中使用的辅助函数
              export default {
                methods: {
                  ...mapActions([
                    'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
                  ]),
                  ...mapActions({
                    add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
                  })
                }
              }

              -----action的注册
                actions: {
                increment ({ commit },载荷) {
                  commit('increment')  increment为mutations的事件类型
                }
              }
              actions是先提交mutations，通过mutations改变全局状态，多此一步是因为actions内部
              可以执行异步操作，而mutations必须同步执行
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
