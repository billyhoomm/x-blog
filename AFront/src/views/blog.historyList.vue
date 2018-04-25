<template>
  <div class="historyList">
    <div class="cataBox card-shadow" v-for="cataBox of historyList">
      <h3 class="cataBox__title">
        <span class="main">{{cataBox.year}}</span>
        <span class="tag">归档</span>
      </h3>
      <div class="cataBox__content">
        <div class="itemBox" v-for="monthBox in cataBox.data">
          <div class="itemBox__name">
            <p>{{monthBox.month | num2MMM | uppercase}}</p>
          </div>
          <ul class="itemBox__content">
            <router-link class="itemBox__content__item" v-for="article in monthBox.data" :key="article._id"
                         :to="{ name: 'article',params: { articleId: article._id }}" activeClass="active" tag="li">
              <span class="itemBox__content__item-title">{{article.title}}</span>&ensp;
              <span class="hidden-xs"> <span>(阅读数:</span><span>{{article.read_num}}</span>
                           <span> ,评论数:</span><span>{{article.comment_num}}</span><span>)</span></span>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
    <section class="copyright animated fadeIn" v-if="historyList.length!==0">
      <copyright></copyright>
    </section>
    <no-data v-if="!hasData && !isLoading"></no-data>
    <loading v-if="!!isLoading" class="loading" :number=9></loading>
  </div>
</template>

<script type="text/javascript">
  import Vue from "vue"
  import noData from "../components/nodata.vue"
  import {GetHistoryList} from "../api/api_article"
  import copyright from '../components/copyright.vue'
  import loading from "../components/loading.vue"
  export default{
    data: function () {
      return {
        historyList: [],
        isLoading: true,
        hasData: true,
      }
    },
    methods: {
      // 获取文章历史列表
      getHistoryList:function () {
        const _this = this;
        GetHistoryList().then((data)=> {
          _this.historyList = data;
        }, ()=> {
          _this.hasData = false;
        }).then(function () {
          _this.historyList.length === 0 ? (_this.hasData = false) : (_this.hasData = true);
          _this.isLoading = false;
        });
      }
    },
    created: function () {
      const _this = this;
      $(window).scrollTop(0);// 滚到顶部
      _this.getHistoryList()
    },
    components: {
      noData, copyright, loading
    }
  }

</script>

<style scoped lang="scss">
  //base
  @import "../theme/theme.scss";

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30% !important;
    height: 50px;
    margin: 0 auto;
  }

  .historyList {
    @import "../theme/cataBox.scss";
    width: 780px;
    margin: 0 auto;
    .cataBox{
      border-radius:4px;
    .itemBox {
      @include display-flex;
      @include justify-content(flex-start);
      @include align-items(center);
      flex-direction: row;
      margin: 0 0 15px 0;
      padding: 26px 10px;
      border: 1px solid transparent;
      //padding-left: 85px;
      &:nth-child(n) {
        background-color: #fff;
      }
      &:nth-child(2n) {
        background-color: #f5f5f5;
      }

      .itemBox__name {
        width: 170px;
        height: 100%;
        text-align: right;
        p {
          text-shadow: 1px 1px 0px #ffffff;
          font-size: 24px;
          font-weight: 500;
          line-height: 1.2;
          padding-right: 20px;
          margin: 0;
        }

      }
      .itemBox__content {
        flex: 1;
        padding-left: 32px;
        height: 100%;
        border-left: 1px solid #ddd;
        list-style: square;
        margin: 0;
        .itemBox__content__item {
          height: 28px;
          line-height: 28px;
          font-size: 16px;
          color: $base-word-color;
          cursor: pointer;
          list-style-type: square;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          transition: all ease 200ms;
          &:after {
            content: '';
            position: absolute;
            width: 6px;
            height: 6px;
            background-color: #000;
            left: -18px;
            top: 11px;
            transition: all ease 200ms;
          }
          .itemBox__content__item-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

          }
          span {
            vertical-align: middle;
            display: inline-block;
            max-width: 340px;
          }
          &:hover {
            color: $base-theme-color;
            &:after {
              content: '';
              position: absolute;
              width: 6px;
              height: 6px;
              background-color: $base-theme-color;
              left: -18px;
              top: 11px;
            }
          }

        }
      }
    }}
  }

  @include media("<=tablet") {
    .historyList {
      max-width: 780px;
      width: 100%;
    }
  }

  @include media("<=phone") {
    .historyList {
      .itemBox {
        flex-direction: column;
        margin: 0;
        .itemBox__name {
          width: 100%;
          font-size: 25px;
          border-bottom: 1px solid #ccc;
          p {
            padding-right: 10px;
            line-height: 100%;
            margin-bottom: 2px;
          }
        }
        .itemBox__content {
          padding-left: 32px;
          width: 100%;
          border-left: none;
          .itemBox__content__item {
            margin: 0;
            font-size: 14px;
          }
        }
      }
    }

  }
</style>
