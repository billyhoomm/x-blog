<template>
  <div class="ball-grid-pulse-loading">
    <div v-for="i in number" :style="divBackgroundColor"></div>
  </div>
</template>
<style scoped lang="scss">
  /*动画*/
  .ball-grid-pulse-loading {
    width: 57px;
    & > div {
      background-color: #fff;
      width: 15px;
      height: 15px;
      border-radius: 100%;
      margin: 2px;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      display: inline-block;
      float: left;
      -webkit-animation-name: ball-grid-pulse-loading;
      animation-name: ball-grid-pulse-loading;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
      -webkit-animation-delay: 0;
      animation-delay: 0;
    }
    & > div:nth-child(1) {
      -webkit-animation-delay: -0.06s;
      animation-delay: -0.06s;
      -webkit-animation-duration: 0.72s;
      animation-duration: 0.72s;
    }
    & > div:nth-child(2) {
      -webkit-animation-delay: 0.25s;
      animation-delay: 0.25s;
      -webkit-animation-duration: 1.02s;
      animation-duration: 1.02s;
    }
    & > div:nth-child(3) {
      -webkit-animation-delay: -0.17s;
      animation-delay: -0.17s;
      -webkit-animation-duration: 1.28s;
      animation-duration: 1.28s;
    }
    & > div:nth-child(4) {
      -webkit-animation-delay: 0.48s;
      animation-delay: 0.48s;
      -webkit-animation-duration: 1.42s;
      animation-duration: 1.42s;
    }
    & > div:nth-child(5) {
      -webkit-animation-delay: 0.31s;
      animation-delay: 0.31s;
      -webkit-animation-duration: 1.45s;
      animation-duration: 1.45s;
    }
    & > div:nth-child(6) {
      -webkit-animation-delay: 0.03s;
      animation-delay: 0.03s;
      -webkit-animation-duration: 1.18s;
      animation-duration: 1.18s;
    }
    & > div:nth-child(7) {
      -webkit-animation-delay: 0.46s;
      animation-delay: 0.46s;
      -webkit-animation-duration: 0.87s;
      animation-duration: 0.87s;
    }
    & > div:nth-child(8) {
      -webkit-animation-delay: 0.78s;
      animation-delay: 0.78s;
      -webkit-animation-duration: 1.45s;
      animation-duration: 1.45s;
    }
    & > div:nth-child(9) {
      -webkit-animation-delay: 0.45s;
      animation-delay: 0.45s;
      -webkit-animation-duration: 1.06s;
      animation-duration: 1.06s;
    }
  }

  @-webkit-keyframes ball-grid-pulse-loading {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      opacity: 0.7;
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes ball-grid-pulse-loading {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      opacity: 0.7;
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
<script type="text/javascript">
  /**
   * loading组件
   * @param number 显示的小球数量，默认为3 :number="3"表示取number类型
   * @param color 小球的颜色 默认为白色
   * @example <loading :number="3" color="#38b7ea" class="topBar--loading" v-if="!articleTop.latest"></loading>
   */
  export default{
    props: {
      // 小球颜色
      color: {
        type: String,
        default: '#fff',
      },
      // 小球数量
      number: {
        type: Number,
        default: 3,
        validator: function (val) {
          return val < 10 && val > 0
        }
      },
    },
    data(){
      return {
        // 颜色组装
        divBackgroundColor: {
          backgroundColor: this.color
        }
      }
    }
  }
</script>
