<template>
  <div class="musicBox animated fadeIn">
    <div class="music">

      <!--<div class="heart" @click="setAutoPlay" data-toggle="tooltip" data-placement="right" title="希望能自动播放">-->
      <!--<i class="fa" :class="{true:'fa-heart text-danger',false:'fa-heart-o'}[canAutoPlay]"></i>-->
      <!--</div>-->

      <div class="music--img">
        <img :src="currentMusicInfo.coverUrl">
      </div>
      <div class="music--infoBox">
        <div class="music--info">
          <h1 class="nameBox">
            <span class="name">{{currentMusicInfo.name}}</span>
          </h1>
          <p class="detail">
           <span class="left">
             <span class="player">{{currentMusicInfo.player}}</span>&ensp;
             <span class="blue">@</span>&ensp;<span class="album">{{currentMusicInfo.album}}</span>
           </span>
          </p>
          <div class="indicator">
            <div class="loadingBar">
              <div class="loading" :style="{width:rightPercent+'%'}"></div>
              <div class="bar" :style="{left:rightPercent+'%'}"></div>
            </div>
            <div class="loadingTime">
              <span class="musicLoading" v-show="isLoading&&isPlaying">
                 <i class="fa fa-spin fa-spinner"></i>
              </span>
              <span><span
                class="blue">{{rightNow | secondsConvert}}</span>/<span>{{duration | secondsConvert}}</span></span>
            </div>
          </div>
          <div class="controller">
            <div class="sub circle" @click="preCtrl()">
              <i class="fa  fa-step-backward"></i>
            </div>
            <div class="main circle" @click="playCtrl()">
              <i class="fa" :class="{true:'fa-pause pause-center',false:'fa-play play-center'}[isPlaying]"></i>
            </div>
            <div class="sub circle" @click="nextCtrl()">
              <i class="fa  fa-step-forward"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="index-copyright">
      <copyright></copyright>
    </section>

    <!--<audio src="http://172.20.10.3:8000/Koi.%20-%20Beirut.mp3" controls autoplay> </audio>-->
  </div>
</template>
<style scoped lang="scss">
  //base
  @import "../theme/theme.scss";

  * {
    /*outline: 1px solid #eee;*/
  }

  .blue {
    color: $base-theme-color;
  }

  .musicBox {
    user-select: none;
    -webkit-user-select: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    color: #fff;
    overflow: hidden;
    background: transparent radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
    box-sizing: border-box;
    .music {
      height: 200px;
      width: 700px;
      margin-bottom: 100px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      /*background: rgba(0, 0, 0, 0.5);*/
      position: relative;
      z-index: 999;
      .heart {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 30px;
        z-index: 999;
        height: 30px;
        line-height: 100%;
      }
      .music--img {
        width: 200px;
        height: 200px;
        position: relative;
        overflow: hidden;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        img {
          width: 100%;
          height: 100%;
        }
        &:after {
          content: '';
          position: absolute;
          z-index: 99;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: transparent linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
        }
      }
      .music--infoBox {
        flex: 1;
        height: 100%;
        border-top-right-radius: 5px;
        border-top-left-radius: 0;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 0;

        overflow: hidden;
        background: rgba(0, 0, 0, 0.4);
        .music--info {
          border: 1px solid transparent;
          box-sizing: border-box;
          width: 100%;
          padding: 20px 20px 15px 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;

          .tooltip {
            z-index: 999;
          }
          .nameBox {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 0;
            position: relative;
            .name {
              color: $base-theme-color;
            }
          }
          .detail {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
              .player {

              }
              .album {

              }
            }
            .right {
              .publishTime {

              }
            }
          }
          .indicator {
            $borderRadius: 6px;
            $loadingBarHeight: 6px;
            $barBorder: 4px;
            $barHeight: 2*$barBorder+$loadingBarHeight;
            .loadingBar {
              position: relative;
              height: $loadingBarHeight;
              width: 100%;
              background: #fff;
              border-radius: $borderRadius;
              margin-bottom: 5px;
              .loading {
                position: absolute;
                left: 0;
                top: 0;
                background: $base-theme-color;
                height: 100%;
                border-radius: $borderRadius;
              }
              .bar {
                cursor: pointer;
                position: absolute;
                top: -$barBorder;
                margin-left: -$barHeight/2;
                width: $barHeight;
                height: $barHeight;
                border-radius: 100%;
                background: #fff;
                border: $barBorder solid $base-theme-color;
              }

            }
            .loadingTime {
              width: 100%;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              .musicLoading {
                margin-right: 5px;
              }
            }
          }
          .controller {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;

            & > div {
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              transition: all ease 500ms;
              &:hover {
                color: $base-theme-color;
                border-color: $base-theme-color;
              }
            }
            .sub {
              height: 40px;
              width: 40px;
              font-size: 18px;
              margin: 0 18px;
              box-sizing: border-box;
            }
            .main {
              height: 50px;
              width: 50px;
              font-size: 25px;
              box-sizing: border-box;
              .play-center {
                position: relative;
                left: 3px;
              }
              .pause-center {
                position: relative;
                left: 0px;
              }
            }
            .circle {
              border-radius: 100%;
              border: 2px solid #fff;
            }
          }
        }
      }
    }
  }

  .index-copyright {
    position: absolute;
    bottom: 1%;
    text-align: center;
    width: 100%;
    left: 0;
  }

  @include media("<=phone") {
    .musicBox {
      $musicBoxWidth: 240px;
      .music {
        margin-top: 20px;
        height: $musicBoxWidth*1.74;
        width: $musicBoxWidth;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        border-radius: 5px;
        overflow: hidden;
        /*background: rgba(0, 0, 0, 0.5);*/
        margin-bottom: 0;
        .heart {
          left: 20px;
          right: auto;
        }
        .music--img {
          width: $musicBoxWidth;
          height: $musicBoxWidth;
          position: relative;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;

          img {
            width: 100%;
            height: 100%;
          }
          &:after {
            background: transparent linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%) !important;
          }
        }
        .music--infoBox {
          border-top-right-radius: 0;
          border-top-left-radius: 0;
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
          .music--info {
            border: none;
            box-sizing: border-box;
            width: $musicBoxWidth;
            height: 100%;
            padding: 8px 10px 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            .nameBox {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 0;
              margin-bottom: 3px;
              .name {
                font-size: 24px;
                line-height: 130%;
                display: block; //如果是块儿级元素可以不用加
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .heart {
                display: none;
              }
            }
            .detail {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              height: 38px;
              margin-bottom: 7px;

              .left {
                .player {

                }
                .album {

                }
              }
              .right {
                .publishTime {

                }
              }
            }
            .indicator {
              $borderRadius: 6px;
              $loadingBarHeight: 6px;
              $barBorder: 4px;
              $barHeight: 2*$barBorder+$loadingBarHeight;
              margin-bottom: 0px;
              .loadingBar {
                position: relative;
                height: $loadingBarHeight;
                width: 100%;
                background: #fff;
                border-radius: $borderRadius;
                margin-bottom: 5px;
                .loading {
                  position: absolute;
                  left: 0;
                  top: 0;
                  background: $base-theme-color;
                  height: 100%;
                  border-radius: $borderRadius;
                }
                .bar {
                  cursor: pointer;
                  position: absolute;
                  top: -$barBorder;
                  margin-left: -$barHeight/2;
                  width: $barHeight;
                  height: $barHeight;
                  border-radius: 100%;
                  background: #fff;
                  border: $barBorder solid $base-theme-color;
                }

              }
              .loadingTime {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .musicLoading {
                  margin-right: 5px;
                }
              }
            }
            .controller {
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;

              & > div {
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: all ease 500ms;
                &:hover {
                  color: $base-theme-color;
                  border-color: $base-theme-color;
                }
              }
              .sub {
                height: 40px;
                width: 40px;
                font-size: 18px;
                margin: 0 18px;
              }
              .main {
                height: 50px;
                width: 50px;
                font-size: 25px;
                .play-center {
                  position: relative;
                  left: 3px;
                }
                .pause-center {
                  position: relative;
                  left: 1px;
                }
              }
              .circle {
                border-radius: 100%;
                border: 2px solid #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
<script type="text/javascript">
  import Vue from 'vue'
  import API from "../config";
  import copyright from '../components/copyright.vue'
  import {secondsConvert} from "../utils/filters.js";
  Vue.filter('secondsConvert', secondsConvert);
  import {mapState, mapActions} from 'vuex';
  export default{
    data(){
      return {
        clear: '',
        musicList: API.musicList,
      }
    },
    computed: {
      ...mapState({
        isPlaying: 'isPlaying',
        isLoading: 'isLoading',
        currentMusicInfo: 'currentMusicInfo',
        MusicHandle: 'handle',
        duration: 'duration',
        rightNow: 'rightNow',
        rightPercent: 'rightPercent',
      }),
    },
    methods: {
      ...mapActions({
        setPlayingStatus: 'setPlayingStatus',
        setMusicDuration: 'setMusicDuration',
        setCurrentMusic: 'setCurrentMusic',
        setLoadingStatus: 'setLoadingStatus',
        setMusicRightNow: 'setMusicRightNow',
      }),
      /**
       * music的控制在App.vue中,方便全局管理
       * 只是展示与事件触发,通过vuex操作
       * */
      playCtrl(){
        let _this = this;
        _this.setPlayingStatus(!_this.isPlaying);
        let currentid = _this.musicList.indexOf(_this.currentMusicInfo);
        // _this.indexCtrl(currentid);
        _this._start();
      },
      preCtrl(){
        let _this = this;
        let currentid = _this.musicList.indexOf(_this.currentMusicInfo);
        let index;
        if (currentid !== 0) {
          index = currentid - 1;
        } else {
          index = _this.musicList.length - 1;
        }
        _this.indexCtrl(index);
        _this.setPlayingStatus(true);
      },
      nextCtrl(){
        let _this = this;
        let currentid = _this.musicList.indexOf(_this.currentMusicInfo);
        let index;
        if (currentid !== (_this.musicList.length - 1)) {
          index = currentid + 1;
        } else {
          index = 0;
        }
        _this.indexCtrl(index);
        _this.setPlayingStatus(true);
      },
      // 从第几个开始
      indexCtrl(index){
        let _this = this;
        _this._ended();
        _this.setCurrentMusic(_this.musicList[index]);
        _this._beforeStart();
        _this._start();
      },
      _init(){
        let _this = this;
        _this.setCurrentMusic(_this.musicList[0]);
        _this._beforeStart();
        //_this._start();
      },
      //start之前的准备工作,比如清除上一个的播放数据
      _beforeStart(){
        let _this = this;
        //监听播放完毕状态
        _this.MusicHandle.addEventListener('ended', function () {
          _this._ended();
          _this.nextCtrl();
          //console.log("ended")
        });
        //监听加载状态
        _this.MusicHandle.addEventListener('canplay', function () {
          console.log("music-canplay")
          _this.setLoadingStatus(false);
          _this.setMusicDuration(_this.MusicHandle.duration)
        });
        //开始请求数据
        _this.MusicHandle.addEventListener('loadstart', function () {
          console.log("music-loadstart")
          _this.setLoadingStatus(true);
        });
        //开始请求数据
        _this.MusicHandle.addEventListener('canplaythrough', function () {
          console.log("music-canplaythrough")
          _this.setLoadingStatus(false);
        });
      },
      _start(){
        let _this = this;
        // 播放时间设置
        _this.clear = setInterval(function () {
          _this.setMusicRightNow(_this.MusicHandle.currentTime);
        }, 500)
      },
      _ended(){
        let _this = this;
        clearInterval(_this.clear);
        _this.setPlayingStatus(false);
        _this.setMusicRightNow(0);
      },
    },
    components: {
      copyright
    },
    created: function () {
      let _this = this;
      /**
       * music 初始化
       * */
      if (!_this.MusicHandle) {
        _this._init()
      }
    },
    mounted: function () {

    }
    ,
  }


</script>
