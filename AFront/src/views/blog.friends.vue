<template>
  <div class="tagList">
    <div class="cataBox card-shadow">
      <h3 class="cataBox__title">
        <span class="main">Friends</span>
        <span class="tag">友情链接</span>
      </h3>
      <div class="cataBox__content">
        <!--专属于标签库的样式结构-->
        <div class="itemBox">
            <div class="itemBox__name">
            <i class="fa fa-tag hidden-xs"></i>资源
            </div>
            <ul class="itemBox__content">
            <li class="itemBox__content__item">
                <a class="ui tag label" href = "http://chuangzaoshi.com" target="_blank">
                    <img src="http://www.chuangzaoshi.com/assets/images/favicon.png" alt="">
                    <span class="badge">创造狮</span>
                    <div>一个创意工作者的导航</div>
                </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <section class="copyright animated fadeIn">
    <copyright></copyright>
    </section>
    <no-data v-if="!hasData && !isLoading"></no-data>
    <loading v-if="!!isLoading" class="loading" :number=9></loading>
  </div>
</template>

<script type="text/javascript">
  import noData from "../components/nodata.vue"
  import copyright from '../components/copyright.vue'
  import loading from "../components/loading.vue"
  export default{
    data: function () {
      return {
        hasData: true,
        isLoading: false,
      }
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
  .tagList {
    .cataBox{
        border-radius:4px;
    .itemBox {
      padding: 10px 40px;
      margin-bottom: 10px;
      .itemBox__name {
        font-size: 25px;
        border-bottom: 1px solid #ccc;
        padding-left: 15px;
        p {
          margin: 0;
        }

      }
      .itemBox__content {
        flex: 1;
        /*border-left: 1px solid #ddd;*/
        list-style: none;
        padding: 0 0 0 20px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        .itemBox__content__item {
          padding: 0 10px;
          list-style-type: none;
          height: 60px;
          font-size: 16px;
          color: $base-word-color;
          cursor: pointer;
          margin: 10px 0;
          a {
            display:block;
            color: $base-word-color;
            text-decoration: none;
            padding:5px;
            // border:1px solid #b5b3b3;
            border-radius:3px;
            img{
                width:40px;
                height:40px;
            }
            span {
                font-size: 16px;
                vertical-align: middle;
                display: inline-block;
                max-width: 360px;
                transition: color ease 200ms;
            }
            div{
                font-size:14px;
            }
          }
          &:hover {
            .tagName {
              color: $base-theme-color;
            }
            .badge {
              background-color: $base-theme-color;
              color: #fff;
            }

          }
        }
      }
    }}
    @import "../theme/cataBox.scss";
    width: 780px;
    margin: 0 auto;

  }

  @include media("<=tablet") {
    .tagList {
      max-width: 780px;
      width: 100%;
    }
  }

  @include media("<=phone") {
    .tagList {
      .itemBox {
        padding: 3px 10px;
        .itemBox__name {
          padding-left: 10px;
        }
        .itemBox__content {
          padding-left: 0px;
          .itemBox__content__item {
            .tagName, .badge {
              font-size: 14px;
            }

          }
        }
      }
    }

  }

</style>
