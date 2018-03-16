<template>

  <!--<div class="myinfo" :class="{ 'showMyWords': isShowMyWords}">-->
  <div id="myinfo" class="myinfo">
    <!--我的信息列表-->
    <section class="detail text-center">
      <section class="detail__1">
        <section class="detail__imgBox" @click="setMyWordStatus">
          <div class="imgBox">
            <img class="img-circle" :src="imgPrefix(myinfo.img_url)">
            <!--<img class="img-circle" :src="myinfo.img_url | addImgPrefix" v-err-src.literal="">-->
          </div>
        </section>
        <section class="detail__info">
          <p class="name text-shadow"> {{myinfo.full_name || 'wuSheng'}}</p>
          <p class="job text-shadow"> {{myinfo.position || '前端工程师'}}</p>
          <p class="address text-shadow hidden-xs">
            <span class="fa fa-map-marker"></span> <span>{{myinfo.address || 'DOTA'}}</span>
          </p>
          <p class="motto text-shadow hidden-xs">
            <i class="fa fa-coffee"></i> <span>{{myinfo.motto || '凡有所学，皆成性格'}}</span>
          </p>
        </section>
      </section>
      <section class="detail__2">
        <section class="detail__nav">
          <ul class="tabs text-shadow" :class="{'active':isShowMyWords}">
            <li>
              <router-link :to="{ name: 'artList',query: { listType: 'latest' }}" activeClass="active" tag="a">最新文章
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'historyList'}" activeClass="active" tag="a">归档</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'tagList'}" activeClass="active" tag="a">标签库</router-link>
            </li>
          </ul>
        </section>

        <section class="detail__sns hidden-xs">
          <ul class="SNS">
            <li class="hidden-lg"><a title="GitHub" target="_blank" href="https://github.com/xiangsongtao"><i
              class="fa fa-github"></i></a></li>
            <li @click="showSocialImg()" data-toggle="modal"
                data-target="#socialContact"><i class="fa fa-weixin"></i></li>
            <li><a title="github" target="_blank" href="https://github.com/billyhoomm"><i class="fa fa-github"></i></a></li>
            </li>
          </ul>
        </section>
      </section>
      <section class = "detail__3">
        <ul class="tabs text-shadow">
            <li>
              <router-link :to="{ name: 'friends_link',query: { listType: 'latest' }}" activeClass="active" tag="a">朋友
              </router-link>
            </li>
        </ul>
      </section>
    </section>
    <!--我的称述-->
    <section class="mywords visuallyhidden">
      <article v-html="myinfo.personal_state || '这里主要记录我的感想感言。'"></article>
    </section>
  </div>
</template>

<script type="text/javascript">

  import Vue from "vue";
  import {addImgPrefix} from "../utils/filters.js";
  import {GetMyInfo} from '../api/api_myinfo'
  import {mapState, mapActions} from 'vuex';
  import config from '../config.js'

  export default {
    //replace: true,
    data: function () {
      return {
        myinfo: {},
        socialImg: '',
      }
    },
    watch: {
      // 类添加策略，用于显示我的信息
      isShowMyWords: function (val) {
        var $myinfo = $("#myinfo")
        if (val) {
          //true
          $myinfo.addClass('showMyWords showMyWords-active')
        } else {
          //false
          $myinfo.removeClass('showMyWords-active');
        }
      }
    },
    computed: {
      ...mapState({
        isShowMyWords: 'isShowMyWords',
      }),
      //addImgPrefix,
    },
    methods: {
      imgPrefix: function (val) {
        return addImgPrefix(val)
      },
      showSocialImg: function () {
        this.setSocialImgUrl(config.socialImgUrl)
      },
      ...mapActions({
        // 注意在这里你需要 `getMyInfo` 函数本身而不是它的执行结果 'getMyInfo()'
        setMyWordStatus: 'setMyWordStatus',//toggle我的个人称述显影状态,因为其他组件可能需要这个信息
        setSocialImgUrl: 'setSocialImgUrl',//更改社交的二维码图片
      }),
    },
    created: function () {
      const scope = this;
      GetMyInfo().then((data)=> {
        scope.myinfo = data;
        console.log(data);
      });
    },
    mounted: function () {
      var $myinfo = $("#myinfo")
      var _this = this;
      $myinfo.on('transitionend',function (event) {
        if(event.target.id === 'myinfo' && !_this.isShowMyWords){
          $myinfo.removeClass('showMyWords');
        }
      })
    }
  }

</script>

<style scoped lang="scss">
  @import "../theme/theme.scss";


  $animationTime_1: 500ms;
  $animationTime_2: 200ms;
  .showMyWords {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
  }

  .showMyWords-active {
    @include media(">desktop") {
      width: 100% !important;
      .mywords {
        width: 720px !important;
        opacity: 1 !important;
        overflow: inherit !important;
        transition: width $animationTime_1 ease, opacity $animationTime_2 ease $animationTime_1 !important;
      }
    }
    @include media("<=desktop") {
      width: 100% !important;
      height: 100% !important;
      position: fixed !important;
      .mywords {
        /*height: 230px!important;*/
        height: 230px !important;
        width: 100% !important;
        overflow: inherit !important;
        opacity: 1 !important;
        transition: all $animationTime_1 ease !important;
      }
    }
    @include media("<=desktop_small") {
      padding-right: 0 !important;
      .detail {
        padding-top: 45px !important;
      }
    }
    @include media("<=phone") {
      .detail {
        height: 109px !important; //109
        padding-top: 0 !important;
      }
      .mywords {
        article {
        }
      }
    }
  }

  .myinfo {
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    .detail {
      box-sizing: content-box;
      .detail__1 {
        .detail__imgBox {
          width: 120px;
          height: 120px;
          margin: 0 auto;
          cursor: pointer;

          .imgBox {
            width: 120px;
            height: 120px;
            margin: 0 auto;
            cursor: pointer;
            border-radius: 100%;
            background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNDAwLjc2NCA0MDIuMDEybC0xOC4xNC0xMDguNTloLS4wNTNjLTIuNTE3LTE0LjY4NS0xMi42MTItMjkuODktMjkuOC0zNC43MDMtLjIxLS4wNi0uNDIzLS4xMDgtLjY0LS4xNGwtNDIuMzI0LTYuMzVjLS4yNi0uMDQtLjgxMi0uMDYtMS4wNzctLjA2LTIuNjc4IDAtNC45MzYgMS45OTYtNS4yNiA0LjY1NS0yLjI1NSAxOC4yOTgtMTcuMzg0IDMyLjY2NS0zNi44NSAzNi41OTVoLTIxLjI0M2MtMTkuNDctMy45My0zNC42LTE4LjI5NC0zNi44NDctMzYuNTk0LS4zMzMtMi43MzYtMi43OTctNC43OTQtNS4zOTctNC42NTItLjMxLS4wMTgtLjYxNi4wMDgtLjk0Mi4wNTdsLTQyLjMyIDYuMzUzYy0uMjE4LjAzLS40My4wNzgtLjY0My4xMzctMTcuMTg4IDQuODEtMjcuMjgzIDIwLjAxOC0yOS44IDM0LjdoLS4wNTRsLTE4LjE0IDEwOC41OTJDMTA3LjQ4IDQyMS43MzIgMTIyLjU5NyA0NDAgMTQyLjY3IDQ0MGgyMjYuNjZjMjAuMDczIDAgMzUuMTktMTguMjcgMzEuNDM0LTM3Ljk4OHoiIGZpbGw9IiNGRjRGMTkiLz48cGF0aCBkPSJNMjU2IDI0Ni44N2MtMTguNTIgMC0zNS4zMjItNy45NDctNDcuNzItMjAuNzktLjAwOCA3LjY5Ny0uMjg4IDE4LjgwNy0yLjMzIDI2LjkxNCAxLjM0LjgxOCAyLjM4IDIuMTYyIDIuNTggMy44MzMgMi42NDcgMjEuNTMgMjMuMDUyIDM3Ljc2IDQ3LjQ3IDM3Ljc2IDI0LjQxMyAwIDQ0LjgxOC0xNi4yMzQgNDcuNDctMzcuNzYuMjA1LTEuNjc0IDEuMjItMy4wMTUgMi41OC0zLjgzLTIuMDQtOC4xMDgtMi4zMjItMTkuMjItMi4zMy0yNi45MTgtMTIuMzk4IDEyLjg0Mi0yOS4yIDIwLjc5LTQ3LjcyIDIwLjc5eiIgZmlsbD0iI0ZEQzg4RSIvPjxwYXRoIGQ9Ik0zMDIuNjg0IDIyNy4wNTZDMjkwLjM5IDIzOS4zIDI3NC4wMjQgMjQ2Ljg3IDI1NiAyNDYuODdjLTE4LjUyIDAtMzUuMzIyLTcuOTQ3LTQ3LjcyLTIwLjc5LS4wMDggNy42OTctLjI4OCAxOC44MDctMi4zMyAyNi45MTQgMS4zNC44MTggMi4zOCAyLjE2MiAyLjU4IDMuODMzIDEuMTcgOS41MTYgNS44MTggMTcuOTkgMTIuNzQgMjQuNDkgMzEuOTI0LTQuNDk1IDY4LjE1Ni0zNi4wMTcgODEuNDE0LTU0LjI2eiIgZmlsbD0iI0ZGQjk4MCIvPjxwYXRoIGQ9Ik0zMDMuNzE3IDExNC4zMmgtOTAuMTMzYy0xNC42MTcgMC0yNi41MSAxMS44OTQtMjYuNTEgMjYuNTF2MzEuODEzYzAgNDAuOTMgMzAuOTIgNzQuMjI3IDY4LjkyNSA3NC4yMjdzNjguOTIzLTMzLjI5OCA2OC45MjMtNzQuMjI3VjEzNS41M2MwLTExLjY5NS05LjUxLTIxLjIxLTIxLjIwNy0yMS4yMXoiIGZpbGw9IiNGRkUxQjIiLz48cGF0aCBkPSJNMjkzLjExMyA1NmgtNjguOTI1Yy05Ljk3MiAwLTE4LjM1NSA2LjkxNy0yMC42MTIgMTYuMjA0LTE4LjI1IDIuMzItMzIuNDA3IDE3Ljk0Ni0zMi40MDcgMzYuODE2djI2LjUxYzAgMTMuNjY0IDUuOCAyNi40MSAxNS45MDQgMzUuNDd2LTMwLjE2OGMwLTE0LjYxNyAxMS44OTMtMjYuNTEgMjYuNTEtMjYuNTFoOTAuMTMzYzExLjY5NiAwIDIxLjIwOCA5LjUxNCAyMS4yMDggMjEuMjA4djM1LjQ2NGMxMC4xMDctOS4wNTcgMTUuOTA2LTIxLjgwNCAxNS45MDYtMzUuNDY0di0zMS44MTJjMC0yNi4zMS0yMS40MDUtNDcuNzE4LTQ3LjcyLTQ3LjcxOHoiIGZpbGw9IiM3RTU0NDkiLz48cGF0aCBkPSJNMzUyIDQ0MEgxNjBjLTQuNDE4IDAtOC0zLjU4Mi04LThWMzI4YzAtNC40MTggMy41ODItOCA4LThoMTkyYzQuNDE4IDAgOCAzLjU4MiA4IDh2MTA0YzAgNC40MTgtMy41ODIgOC04IDh6IiBmaWxsPSIjRDhEQ0UxIi8+PHBhdGggZD0iTTUwNCA0NTZIOGMtNC40MjIgMC04LTMuNTgyLTgtOHMzLjU3OC04IDgtOGg0OTZjNC40MjIgMCA4IDMuNTgyIDggOHMtMy41NzggOC04IDh6IiBmaWxsPSIjOUY2NDU5Ii8+PGNpcmNsZSBjeD0iMjU2IiBjeT0iMzg0IiByPSIxNiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==) no-repeat center center/cover;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              max-width: 120px;
              max-height: 120px;
              box-shadow: 0 3px 12px #000;
            }
            &:after {
              content: "\f007";
              font-family: FontAwesome;
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              background-color: rgba(0, 0, 0, 0.5);
              border-radius: 100%;
              font-size: 30px;
              line-height: 100%;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              z-index: 999;
              transition: all ease 200ms;
            }
            &:hover {
              &:after {
                opacity: 1;
              }
            }
          }
        }
        .detail__info {
          overflow: hidden;
          .name {
            color: #fff;
            margin: 20px 0;
            width: 100%;
            font-size: 30px;
            line-height: 100%;
            font-weight: bold;
          }
          .job {
            color: #fff;
            width: 100%;
            font-size: 18px;
            line-height: 100%;
            margin: 20px 0;
          }
          .address {
            color: #fff;
            width: 100%;
            font-size: 14px;
            line-height: 100%;
            margin: 10px 0;
          }
          .motto {
            font-size: 14px;
            color: #fff;
            width: 100%;
            line-height: 230%;
            margin: 0 0;
          }
        }
      }
      .detail__2 {
        .detail__nav {
          .tabs {
            padding: 0;
            list-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 1;
            height: 26px;
            transition: all ease 500ms;
            &.active {
              opacity: 0;
              height: 0;
              overflow: hidden;
              padding: 0;
            }
            & > li {
              margin: 0 3px;
              width: 68px;
              position: relative;
              cursor: pointer;
              box-sizing: border-box;
              a {
                display: block;
                width: 68px;
                line-height: 100%;
                box-sizing: border-box;
                transition: all .2s ease;
                text-align: center;
                font-size: 14px;
                padding: 5px 0;
                text-decoration: none;
                color: inherit;
                border: 1px solid transparent;
              }
              & > .active {
                border: 1px solid #38b7ea;
                background: transparent;
                color: #38b7ea;
                border-radius: 5px;
              }
            }

            & :hover {
              color: #38b7ea;
            }
          }
        }
        .detail__sns {
          .github {
            background: #38b7ea;
            color: #fff;
            text-decoration: none;
            width: 160px;

            background: #38b7ea;
            color: #fff;
            border-radius: 20px;
            text-decoration: none;
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            transition: .2s ease;
            display: block;
            cursor: pointer;
            text-align: center;
            a {
              color: inherit;
            }
            &:hover {
              text-decoration: none;
              background: #49c8fb !important;
              color: #fff;
            }
          }
          .SNS {
            margin: 0;
            list-style: none;
            display: flex;
            font-size: 20px;
            width: 100%;
            justify-content: center;
            align-items: center;
            & > li {
              margin: 0 8px;
              cursor: pointer;
              transition: .2s ease;
              a {
                color: inherit;
              }
              &:hover {
                color: #38b7ea;
              }
            }

          }
        }
      }
      .detail__3 {
         .tabs {
            padding: 0;
            list-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 1;
            height: 26px;
            transition: all ease 500ms;
            &.active {
              opacity: 0;
              height: 0;
              overflow: hidden;
              padding: 0;
            }
            & > li {
              margin: 0 3px;
              width: 68px;
              position: relative;
              cursor: pointer;
              box-sizing: border-box;
              a {
                display: block;
                width: 68px;
                line-height: 100%;
                box-sizing: border-box;
                transition: all .2s ease;
                text-align: center;
                font-size: 14px;
                padding: 5px 0;
                text-decoration: none;
                color: inherit;
                border: 1px solid transparent;
              }
              & > .active {
                border: 1px solid #38b7ea;
                background: transparent;
                color: #38b7ea;
                border-radius: 5px;
              }
            }

            & :hover {
              color: #38b7ea;
            }
          }
      }
    }
    .mywords {
      align-items: center;
      transform: translate3d(0, 0, 0);
      display: flex;
      justify-content: center;
      overflow: visible;
      text-align: left;
      font-size: 16px;
      line-height: 22px;
      max-width: 720px;
      color: #fff;
      user-select: none;
      -webkit-user-select: none;
      position: relative;
      box-sizing: border-box;
    }
  }

  /*响应式处理*/
  @include media(">desktop") {
    .myinfo {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      position: fixed;
      transition: width ease $animationTime_1;
      padding-left: 45px;
      .detail {
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .detail__1 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom:15px;
          .detail__imgBox {
            width: 100%;
          }
          .detail__info {
            width: 100%;
          }
        }
        .detail__2 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .detail__nav {
            .tabs {
              width: 100%;

              box-sizing: content-box;
              padding: 0 0 15px;
              margin-bottom:0;
            }
          }
          .detail__sns {
            width: 265px;
            margin-top:10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .github {
              margin: 0 auto 15px;
            }
            .SNS {
              padding: 0;
            }
          }
        }
        .detail__3{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position:fixed;
          bottom:10px;
        }
      }
      .mywords {
        width: 0;
        justify-content: flex-start;
        align-items: center;
        opacity: 0;
        transition: width $animationTime_1 ease, opacity $animationTime_2 ease;
      }
    }
  }

  @include media("<=desktop") {
    .myinfo {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      transition: height ease $animationTime_1;
      .detail {
        width: 720px;
        min-height: 270px;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        .detail__1 {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .detail__imgBox {
            width: 225px;
          }
          .detail__info {
            width: 265px;
          }
        }
        .detail__2 {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin: 20px 0 0;
          .detail__nav {
            width: 225px;
            .tabs {
              margin: 0;
            }
          }
          .detail__sns {
            width: 265px;
          }
          .detail__sns {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .github {
              margin: 0;
              display: none;
            }
            .SNS {
              padding: 0;
            }
          }
        }
        .detail__3{
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          position:relative;
          top:-27px;
          left:10px;
        }
      }
      .mywords {
        align-items: flex-start;
        justify-content: flex-start;
        height: 0;
        overflow: hidden;
        width: 720px;
        opacity: 0;
        transition: height $animationTime_1 ease, opacity $animationTime_2 ease;
      }
    }
  }

  @include media(">desktop_small", "<=desktop") {
    .myinfo {
      height: 220px;
      .detail {
      }
    }
  }
  @include media("<=desktop_small") {
    .myinfo {
      height: 275px;
      .detail {
        padding: 45px 0 0 0;
        transition: all ease 500ms;
        .detail__3{
          position:relative;
          top:-27px;
          left:150px;
        }
      }
      .mywords {
        padding: 0px 40px !important;
      }
    }
  }
  @include media(">tablet", "<=desktop_small"){
    .myinfo {
      .detail {
        .detail__3{
          position:relative;
          top:-27px;
          left:10px;
        }
      }
    }
  }
   @include media("<=tablet"){
    .myinfo {
      .detail {
        .detail__3{
          display:none;
        }
      }
    }
  }

  @include media("<=phone") {
    .myinfo {
      justify-content: center;
      height: 150px;
      .detail {
        height: 145px;
        width:100%;
        min-height: inherit;
        transition: all ease 500ms;
        .detail__1 {
          margin: 5px 0;
          flex-direction: row;
          .detail__imgBox {
            margin: 0 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            .imgBox {
              width: 70px;
              height: 70px;
              &:hover {
                &:after {
                  opacity: 0;
                }
              }
            }
            width: 80px;
            height: 80px;
          }
          .detail__info {
            margin: 0 5px;
            width: auto;
            .name {
              margin: 10px 0;
              font-size: 24px;
            }
            .job {
              margin: 10px 0;
              font-size: 12px;
            }
          }
        }
        .detail__2 {
          margin: 5px 0;
        }
      }
      .mywords {
        width: 100%;
        font-size: 12px;
        padding: 0 20px !important;
        text-align: center;
        p {
          margin: 0 !important;
        }
        article {
          margin: 10px 0;
        }
      }
    }
  }

</style>
