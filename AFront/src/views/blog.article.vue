<template>
  <div class="article animated fadeIn container">
    <div class="row">
      <div id="article" class="col-lg-9">
        <div class="article-detail">
          <!--文章-->
          <div class="paper" :class="{'loading':isLoading}">
            <section class="paper__header">
              <ol class="breadcrumb  hidden-xs">
                <li>
                  <router-link :to="{ name: 'index'}" tag="a">首页</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'blog'}" tag="a">博客</router-link>
                </li>
                <li class="active">文章</li>
              </ol>
              <h1>{{article.title}}</h1>
            </section>
            <section class="paper__info">
              <div class="paper__info--span">
                <i class="fa fa-calendar"></i>
                <span>{{article.publish_time  | moment("from","now")}}</span>
              </div>
              <div class="paper__info--span">
                <i class="fa fa-book"></i>
                阅读数
                <span>{{article.read_num}}</span>
              </div>
              <a href="#comment" class="paper__info--span">
                <i class="fa fa-comments"></i>
                评论数
                <span>{{recountCommentNum}}</span>
              </a>
              <!--hidden-xs-->
              <div class="paper__info--span hidden-xs" v-for="tag of article.tags">
                <i class="fa fa-tag"></i> <span>{{tag.name}}</span>
              </div>
            </section>
            <section class="paper__content">
              <div class="paper__content--inner markdown-body hljs" v-html="article.html">
                <!--{{{article.content}}}-->
              </div>
              <!--page-->
            </section>

            <!--the end-->
          </div>
          <!--评论-->
          <section id="comment" class="commentbox">
            <!--标题-->
            <div class="commentbox__header">
              <h3><span class="commentbox__header--Comments">Comments</span><span class="commentbox__header--count">{{recountCommentNum}}</span>
              </h3>
            </div>
            <!--提问题-->
            <!--hidden-xs-->
            <div class="commentBox__question " @click="replyBtn('')">
              <comment-box :article-id="article._id" :pre-id="article._id"></comment-box>
            </div>

            <!--问题盒子-->
            <div class="commentbox__inner">
              <div class="comments" v-for="comment of commentList">
                <!--{{comment._id}}{{'&#45;&#45;'}}{{chain.selectId ==comment._id}}{{'&#45;&#45;'}}{{toggle}}{{'&#45;&#45;'}}{{chain.selectId}}-->
                <div class="comments__ask">
                  <div class="comments__ask__header">
                    <span class="name">{{comment.name}}</span>&ensp;·&ensp;
                    <span>{{comment.time | moment("from","now")}}</span>
                    <!--hidden-xs-->
                    <span class="">&ensp;·&ensp;<span class="reply"
                                                      @click="replyBtn(comment._id)">回复</span></span>
                  </div>
                  <div class="comments__ask__content">
                    <span>{{comment.content}}</span>
                  </div>
                </div>
                <div class="comments__reply" :class="{'active':(comment._id==selectId && toggle)}">
                  <div class="commentBox__question">
                    <comment-box :article-id="comment.article_id" :pre-id="comment._id"></comment-box>
                  </div>
                  <div class="comments__reply__each" v-for="reply of comment.next_id">
                    <div class="comments__reply__header">
                      <span
                        class="name">{{reply.name}}</span>&ensp;·&ensp;
                      <span>{{reply.time | moment("from","now")}}</span>
                    </div>
                    <div class="comments__reply__content">
                      <span>{{reply.content}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        <copyright></copyright>
      </div>
      <div class="col-lg-3 visible-lg clearfix">
        <aside class="article-aside">
          <!--最新排行 for 10-->
          <div class="topBar">
            <div class="topBar--title">
              <h3 class="topBar--title__h3">RECENT
                <small>Top{{3}}</small>
              </h3>
            </div>
            <ul class="topBar--ul three">
              <loading :number="3" color="#38b7ea" class="topBar--loading" v-if="!articleTop.latest"></loading>
              <li v-show="articleTop3.latest.length>0" class="topArticle--li animated fadeIn"
                  v-for="article of articleTop3.latest">
                <router-link :to="{ name: 'article',params: { articleId: article._id }}"
                             activeClass="active" tag="a">{{article.title}}
                </router-link>
                <span>({{article.read_num}})</span>
              </li>
            </ul>
          </div>
          <!--阅读排行 for 10-->
          <div class="topBar">
            <div class="topBar--title">
              <h3 class="topBar--title__h3">READ
                <small>Top{{topNum}}</small>
              </h3>
            </div>
            <ul class="topBar--ul">
              <loading :number="3" color="#38b7ea" class="topBar--loading" v-if="!articleTop.latest"></loading>
              <li v-show="articleTop.read.length>0" class="topArticle--li animated fadeIn"
                  v-for="article of articleTop.read">
                <router-link :to="{ name: 'article',params: { articleId: article._id }}"
                             activeClass="active" tag="a">{{article.title}}
                </router-link>
                <span>({{article.read_num}})</span>
              </li>
            </ul>
          </div>
          <!--标签 最多10个-->
          <div class="topBar">
            <div class="topBar--title">
              <h3 class="topBar--title__h3">TAGS
                <!--<small>Top10</small>-->
              </h3>
            </div>
            <ul class="topBar--ul">
              <loading :number="3" color="#38b7ea" class="topBar--loading" v-if="!articleTop.latest"></loading>
              <li v-show="articleTop.tag.length>0" class="topTag--li animated fadeIn" v-for="tag of articleTop.tag">
                <router-link :to="{ name: 'tagListFindByTagId',query: { listType: 'tagList',tagId: tag._id }}"
                             activeClass="active" tag="a">
                  {{tag.name}}({{tag.used_num}})
                </router-link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
    <!--返回最上层-->
    <div id="toTop" class="backToTop">
      <i class="fa fa-arrow-up"></i>
    </div>
  </div>

</template>

<script type="text/javascript">
  import API from "../config.js"
  import {GetArticleById, GetArticleTop} from "../api/api_article"
  import {GetArticleComments, SendComment} from "../api/api_comment"
  import commentReplyBox from '../components/commentReplyBox.vue'
  import loading from '../components/loading.vue'
  import "../theme/codeHighLight.css";
  import "../theme/markdown.scss";
  import "bootstrap/scss/bootstrap/_breadcrumbs.scss";
  import copyright from '../components/copyright.vue';
  import Toast from 'Toast';
  export default {
    replace: true,
    data: function () {
      return {
        article: {},
        commentList: [],
        articleTop: {},
        articleTop3: {},
        toggle: true,
        selectId: '',
        isLoading: true,
        hasNickName: false,
        name: '',//评论人的昵称
        email: '',//评论人的email
        topNum: 5,//top 榜单
      }
    },
    watch: {
      '$route': function (val) {
        // 获取文章
        this.getArticleById(val.params.articleId);
      },
    },
    computed: {
      //文章是有评论计数的，但是文章缓存后此信息并不准确，但commentList是不缓存的。
      recountCommentNum: function () {
        let _this = this;
        let _count = 0;
        _count = _this.commentList.length;
        for (let i = 0, len = _this.commentList.length; len > i; i++) {
          _count +=_this.commentList[i].next_id.length
        }
        return _count
      }
    },
    methods: {
      replyBtn: function (id) {
        if (this.selectId == id) {
          this.toggle = !this.toggle
        } else {
          this.toggle = true;
          this.selectId = id
        }
      },
      scrollTop: ()=> {
        $(window).scrollTop(0);// 滚到顶部
      },
      /**
       * 获取数据
       * @param articleId 文章id
       * */
      getArticleById: function (articleId) {
        const _this = this;
        //获取文章详情
        GetArticleById(articleId).then(function (data) {
          _this.article = data
          _this.isLoading = false;
        }, function (error) {
          if (error == 2) {
            Toast({
              message: '无法获取文章', iconClass: 'fa fa-warning',
              position: 'center',
              duration: 3000
            });

            setTimeout(function () {
              _this.$router.replace({
                name: 'historyList'
              })
            }, 3000)
          }
        });

        //获取文章评论
        GetArticleComments(articleId).then(function (data) {
          _this.commentList = data;
        }, function (error) {
          Toast({
            message: '无法获取评论', iconClass: 'fa fa-warning',
            position: 'center',
            duration: 3000
          });
        });
      },

      /**
       * 获取文章排行榜，榜单
       * @param topNum 排行榜个数
       * */
      getArticleTop: function (topNum) {
        const _this = this;
        /**
         * 使用环境判断 userAgent 如果不是mobile则搜索top榜单
         * */
        if (!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
          GetArticleTop(topNum).then(function (data) {
            _this.articleTop = data;
          }, function (error) {
            Toast({
              message: '无法获取榜单', iconClass: 'fa fa-warning',
              position: 'center',
              duration: 3000
            });
          });
        }
        if (!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
          GetArticleTop(3).then(function (data) {
            _this.articleTop3 = data;
          }, function (error) {
            Toast({
              message: '无法获取榜单', iconClass: 'fa fa-warning',
              position: 'center',
              duration: 3000
            });
          });
        }
      },

      /**
       * 返回顶部的事件handler(有BUG)
       * */
      backToTopHandler: function () {
        let _width = $(document).width()
        if (_width >= 1200) {
          if ($(this).scrollTop() > 0) {
            $('#toTop').css({
              "opacity": 1,
              'left': $('#article').offset().left + $('#article').width(),
            });
          } else {
            $('#toTop').css({
              "opacity": 1
            });
          }
        } else if (_width < 1200) {
          if ($(this).scrollTop() > 0) {
            $('#toTop').css({
              "opacity": 1,
              'left': $('#article').offset().left + $('#article').width() - $('#toTop').width(),
            });
          } else {
            $('#toTop').css({
              "opacity": 1
            });
          }
        }
      }
    },
    created: function () {
      const _this = this;
      let articleId = _this.$route.params.articleId;

      $(window).scrollTop(0);// 滚到顶部
      // To Top
      $(document)
      .on('scroll', _this.backToTopHandler)
      .on('click', '#toTop', function () {
        $(window).scrollTop(0);
        //$('body, html').animate({scrollTop: 0}, 600);
      });

      // 获取文章
      _this.getArticleById(articleId);
      // 获取文章top榜单
      _this.getArticleTop(_this.topNum);
    },
    mounted: function () {
      this.$emit('notice')
    },
    destroyed: function () {
      $(document).off('scroll')
    },
    components: {
      'comment-box': commentReplyBox,
      copyright,
      loading
    },
  }

</script>

<style scoped lang="scss">
  //base
  @import "../theme/theme.scss";

  * {
    /*outline: 1px solid #eee;*/
  }

  .article {
    padding-top: 35px;
    position: relative;
    .article-detail {

    }
    .article-aside {
      position: fixed;
      /*padding-left: 20px;*/
      width: 350px;
      box-sizing: border-box;
      color: #333;

      .topBar {
        width: 100%;
        /*border: 1px solid transparent;*/
        margin-bottom: 15px;
        box-sizing: border-box;
        .topBar--title {
          border-radius:4px 4px 0 0;
          padding: 12px 0 8px;
          background: rgba(0, 0, 0, 0.5);
          .topBar--title__h3 {
            border-left: 5px solid $base-theme-color;
            padding: 0 0 0 10px;
            margin: 0;
            color: #fff;
            margin-left: 10px;
            @include display-flex;
            @include justify-content(flex-start);
            @include align-items(center);
            transition: all ease 200ms;
            small {
              color: $base-theme-color;
              margin-left: 7px;
            }
          }
        }
        .three{
          min-height:90px !important;
        }
        .topBar--ul {
          padding: 8px 0px 8px 8px;
          background: #fff;
          list-style-type: none;
          position: relative;
          min-height: 150px;
          margin: 0;
          .topBar--loading {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 135px;
          }
          .topArticle--li {
            color: #777;
            position: relative;
            padding: 4px 0;
            font-size: 14px;
            &:before {
              color: #ccc;
              content: "\f0da";
              font-size: 12px;
              margin-right: 6px;
              font-family: FontAwesome;
              transition: all ease 200ms;
            }
            a {
              color: inherit;
              text-decoration: none;
              transition: all ease 200ms;
            }
            span {
              cursor: pointer;
              transition: all ease 200ms;
            }
            &:hover {
              color: $base-theme-color;
              a {
                color: $base-theme-color;
              }
              &:before {
                color: $base-theme-color;
              }
              span {
                color: $base-theme-color;
              }
            }
          }
          .topTag--li {
            border-radius:3px;
            border: 1px solid #ccc;
            display: inline-block;
            margin: 4px;
            color: #777;
            padding: 2px 8px;
            transition: all ease 200ms;
            cursor: pointer;
            a {
              color: #777;
              text-decoration: none;
              transition: all ease 200ms;
              span {
                font-size: 12px;
                color: #fff;
                min-width: 10px;
                padding: 1px 7px;
                font-weight: bold;
                line-height: 1;
                white-space: nowrap;
                text-align: center;
                background-color: #969696;
                border-radius: 10px;
                transition: all ease 200ms;
              }
            }
            &:hover {
              color: $base-theme-color;
              border-color: $base-theme-color;
              a {
                color: $base-theme-color;
                span {
                  background-color: $base-theme-color;
                }
              }
            }
          }
        }
      }

      .tagTop10 {
        width: 100%;
      }
    }

  }

  .article-detail {
    /*width: 780px;*/
    min-width: 850px;
    max-width: 980px;
    /*width: 52%;*/
    margin: 0 auto;
    margin-left:-35px;
    color: $base-word-color;
    box-sizing: border-box;
    position: relative;
    z-index: 999;
    .paper {
      border-radius:4px;
      background-color: transparent;
      /*margin-bottom: 30px;*/
      /*border-radius: 4px;*/
      overflow: hidden;
      margin-bottom: 30px;
      &.loading {
        .paper__header {
          h1 {
            background: #eee;
          }
        }
        .paper__info {
          .paper__info--span {
            opacity: 0.3;
            background: #fff;
            min-width: 70px;
            text-decoration: none;
          }
        }
        .paper__content {
          .paper__content--inner {
            background-image: url(../assets/favicon.png);
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: center top;
            min-height: 834px;
            width: 100%;
          }
        }

      }
      .paper__header {
        border: 1px solid transparent;
        padding: 35px 35px 0;
        background: #fff;
        text-align: right;
        a {
          text-decoration: none;
        }
        h1 {
          min-height: 52px;
          width: 100%;
          box-sizing: border-box;
          font-size: 36px;
          font-weight: 500;
          line-height: 1.2;
          margin: 20px 0 10px;
        }
      }
      .paper__info {
        @include display-flex;
        @include justify-content(flex-end);
        @include align-items(center);
        background: $base-background-color;
        padding: 10px 35px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.8) inset;
        transition: all ease 200ms;
        .paper__info--span {
          color: #eee;
          margin-left: 20px;
          font-size: 14px;
          //min-width: 70px;
          white-space: nowrap;
          text-decoration: none;
        }
        a:hover {
          color: $base-theme-color;
        }
      }
      .paper__content {
        padding: 35px;
        background: #fff;
        //min-height: 800px;
        .paper__content--inner {
          padding: 5px 0 0;
          //border-bottom: 1px dashed #464646;
        }
      }
      .paper__navBox {
        background-color: #fff;
        .paper__navBox__inner {
          padding: 20px 0;
          text-align: center;
          list-style: none;
          color: $base-word-color;
          //border: 1px solid transparent;
          //padding: 35px;
          @include display-flex;
          @include justify-content(center);
          @include align-items(center);
          border-bottom: 1px solid #000;
          div {
            margin: 0 10px;
            //border: 1px solid #464646;
            padding: 5px 20px;
            font-size: 16px;
            //border-radius: 28px;
            //transition: all ease 200ms;
            //cursor: pointer;
            //&:hover {
            //  color: #fff;
            //  border-color: $base-theme-color;
            //  background-color: $base-theme-color;
            //}

          }
        }

      }

    }
    .commentbox {
      background-color: $base-background-color;
      padding: 0;
      border-radius: 3px;
      //border-top: 3px solid $base-theme-color;
      border-bottom: 3px solid $base-theme-color;
      position: relative;
      overflow: hidden;
      margin-bottom: 30px;
      &::after {
        /*content: '';*/
        position: absolute;
        top: 0;
        right: 0;
        border-top: 4px solid $base-theme-color;
        border-top-right-radius: 3px;
        width: 40%;
        height: 0;
      }

      .commentbox__header {
        padding: 0 10px;
        //border-bottom: 1px solid #fff;
        margin-bottom: 0;
        text-align: right;
        h3 {
          margin: 0;
          height: 72px;
          @include display-flex;
          @include justify-content(flex-end);
          @include align-items(center);

          .commentbox__header--Comments {
            font-size: 50px;
            color: #fff;
            margin-right: 10px;
          }
          .commentbox__header--count {
            top: 2px;
            background: $base-theme-color;
            font-size: 20px;
            color: #fff;
            border-radius: 5px;
            padding: 3px 6px;
            position: relative;
            font-weight: 400;
            vertical-align: baseline;
            min-width: 30px;
            min-height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }

      //问题盒子
      .commentBox__question {
        padding: 0 35px;
      }
      //用户评论内容盒子
      .commentbox__inner {
        padding: 0 35px 35px 35px;
        .comments {
          margin-bottom: 10px;
          .comments__ask {
            box-sizing: content-box;
            padding: 10px;
            margin-bottom: 5px;
            cursor: pointer;
            border-bottom: 1px solid #1b1b1b;
            position: relative;

            &:after {
              content: '';
              position: absolute;
              bottom: -2px;
              left: 0;
              width: 100%;
              height: 0px;
              border-top: 1px solid #6f6f6f;

            }

            /*&:hover {*/
            /*.reply {*/
            /*<!--color: $base-theme-color-o;-->*/
            /*}*/
            /*}*/
            .comments__ask__header {
              font-size: 14px;
              line-height: 130%;
              padding: 5px 0;
              color: #ececec;
              .name {
                font-size: 18px;
                color: $base-theme-color;
              }
              .reply {
                transition: all ease 200ms;
                color: $base-theme-color-o;
              }

            }
            .comments__ask__content {
              font-size: 14px;
              line-height: 150%;
              padding: 5px 0;
              color: #fff;
            }
          }
          .comments__reply {
            padding-left: 80px;
            .commentBox__question {
              display: block;
              height: 0;
              opacity: 0;
              overflow: hidden;
              padding: 0;
            }
            &.active {
              //height: 100px;
              //margin-top: 10px;
              .commentBox__question {
                display: block;
                height: auto;
                opacity: 1;
                overflow: visible;
                -webkit-overflow-scrolling: touch;
                //height: 100px;
                margin-top: 10px;
                &.active {
                  height: 100px;
                }
              }
            }
            .comments__reply__each {
              padding: 5px;
              margin-bottom: 0;
              border-bottom: 1px solid #1b1b1b;
              position: relative;
              &:after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 100%;
                height: 0;
                border-top: 1px solid #6f6f6f;

              }
              .comments__reply__header {
                font-size: 14px;
                line-height: 130%;
                padding: 3px 0;
                color: #fff;
                .name {
                  font-size: 14px;
                  color: $base-theme-color;
                }
              }
              .comments__reply__content {
                font-size: 14px;
                line-height: 150%;
                padding: 3px 0;
                color: #fff;
              }
            }
          }

        }
      }

    }
  }

  .backToTop {
    position: fixed;
    left: 700px;
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 100%;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all ease 200ms;
    z-index: 999;
    margin-left: 40px;
    bottom: 20px;
    opacity: 0;
    &:hover {
      background: $base-theme-color;
    }
  }

  @include media("<=desktop") {
    .backToTop {
      margin-left: 0;
    }
    .article-detail{
      margin-left:0px;
    }
  }

  @include media("<=desktop_small") {
    .article {
      padding-top: 60px;
    }
  }

  @include media("<=tablet") {
    .article-detail {
      max-width: 780px;
      min-width: inherit;
      width: auto;
    }
  }

  @include media("<=phone") {
    .article {
      padding-left: 6px;
      padding-right: 6px;
      padding-top: 51px;
      .row {
        margin: 0;
        #article {
          padding: 0;
        }
      }
      .article-detail {
        .paper {
          margin-bottom: 10px;
          .paper__header {
            padding: 30px 10px 10px;
            h1 {
              font-size: 28px;
              font-weight: 500;
              line-height: 120%;
              margin: 0;
              min-height: inherit;
            }
          }
          .paper__info {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 8px 0px;
            background: rgba(0, 0, 0, 0.5);
            .paper__info--span {
              margin: 0 10px;
              font-size: 12px;
            }
          }
          .paper__content {
            padding: 20px 10px 20px;
            .paper__content--inner {
              font-size: 14px !important;
            }
          }
        }
        .commentbox {
          margin-bottom: 10px;
          .commentbox__header {
            h3 {
              .commentbox__header--Comments {
                font-size: 30px;
                margin-right: 8px;
              }
              .commentbox__header--count {
                font-size: 16px;
                min-width: 26px;
                min-height: 26px;
              }
            }
          }
          .commentBox__question {
            padding: 0 10px;
          }

          .commentbox__inner {
            padding: 0 10px 20px 10px;
            .comments {
              .comments__ask {
                .comments__ask__header {
                  padding: 5px 0 0 0;
                }
                .comments__ask__content {
                  padding: 5px 0 0 0;
                  font-size: 14px;
                }
              }
              .comments__reply {
                padding-left: 30px;
                .comments__reply__each {
                  padding: 5px 0 0 0;
                  .comments__reply__header {
                    /*padding: 3px 0 0 0;*/
                  }
                  .comments__reply__content {
                    /*padding: 3px 0 0 0;*/
                    font-size: 14px;
                  }
                }
              }
            }
          }

        }
      }
    }

  }


</style>
