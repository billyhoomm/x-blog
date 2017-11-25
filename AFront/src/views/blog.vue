<template>
  <div class="blog animated fadeIn">
    <my-info></my-info>
    <!-- 路由外链 -->
    <transition name="fade">
      <div class="blog__content" v-show="!isShowMyWords">
        <div class="blog__content--inner">
          <transition name="blogTrans">
              <router-view></router-view>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import Vue from "vue";
  import myInfo from './blog.myInfo.vue'
  import {mapState} from 'vuex';
  module.exports = {
    data: function () {
      return {
      }
    },
    computed: {
      ...mapState({
        isShowMyWords: 'isShowMyWords',
      }),
    },
    components: {
      myInfo
    },
  }


</script>

<style scoped lang="scss">

  //base
  @import "../theme/theme.scss";


  .blog {
    position: relative;
    .blog__content {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      box-sizing: content-box;
      transition: opacity ease 500ms;
      /*opacity:1;*/

      .blog__content--inner {
        max-width: 950px;
        width: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*overflow: hidden;*/
        padding-top: 15px;
        position: relative;
      }
      .copyright {
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 15px;
      }
    }
  }


  @include media(">desktop") {
    .blog {
      width: 100%;
      .blog__content {
        z-index: 2;
        width: 75%;
        padding-left: 25%;
        position: relative;
      }
    }
  }

  @include media(">desktop_small", "<=desktop") {
    .blog {
      .blog__content {
        padding-top: 270px;
        .blog__content--inner {

        }
      }
    }
  }

  @include media("<=desktop_small") {
    .blog {
      /*padding-top: 45px;*/
      .blog__content {
        padding-top: 315px;
        .blog__content--inner {
        }
      }
    }
  }

  @include media("<=tablet") {
    .blog {
      .blog__content {
        padding-left: 15px;
        padding-right: 15px;
        /*padding-top: 270px;*/
        .blog__content--inner {
          
        }
      }
    }
  }

  @include media("<=phone") {
    .blog {
      .blog__content {
        padding-left: 6px;
        padding-right: 6px;
        padding-top: 190px;
        width: 100%;
        /*overflow: hidden;*/
        box-sizing: border-box;
        .blog__content--inner {
          padding-top: 6px;
        }
      }
    }
  }
</style>
