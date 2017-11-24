<template>
  <article>
    <div class="comments animated fadeIn">
      <!--column title-->
      <h3 class="title">
        <i class="fa fa-fw fa-lg fa-comments"></i> 评论管理 / <span class="">COMMENTS</span>
      </h3>
      <!--增加-->
      <section class="commentList">

        <!--筛选-->
        <section class="commentList--dropdown">
          <div class="commentList--dropdown-e">
            <label class="commentList--dropdown-label">子主评论筛选: </label>
            <div class="dropdown commentList--dropdown-div">
              <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                {{btn_filter_mainComm}}
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li @click="Condition_main=0,btn_filter_mainComm='全部'"><a>全部</a></li>
                <li @click="Condition_main=1,btn_filter_mainComm='主评论'"><a>主评论</a></li>
                <li @click="Condition_main=2,btn_filter_mainComm='子评论'"><a>子评论</a></li>
              </ul>
            </div>
          </div>
          <div class="commentList--dropdown-e">
            <label class="commentList--dropdown-label">回复筛选: </label>
            <div class="dropdown commentList--dropdown-div">
              <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                {{btn_filter_reply}}
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li @click="Condition_reply=0,btn_filter_reply='全部'"><a>全部</a></li>
                <li @click="Condition_reply=1,btn_filter_reply='未回复'"><a>未回复</a></li>
                <li @click="Condition_reply=2,btn_filter_reply='已回复'"><a>已回复</a></li>
              </ul>
            </div>
          </div>
          <div class="commentList--dropdown-e">
            <label class="commentList--dropdown-label">审核筛选: </label>
            <div class="dropdown commentList--dropdown-div">
              <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                {{btn_filter_auth}}
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li @click="Condition_auth=0,btn_filter_auth='全部'"><a>全部</a></li>
                <li @click="Condition_auth=1,btn_filter_auth='未审核'"><a>未审核</a></li>
                <li @click="Condition_auth=2,btn_filter_auth='已审核'"><a>已审核</a></li>
              </ul>
            </div>
          </div>
          <button class="btn btn-info"
                  @click="Condition_main=0,Condition_reply=0,Condition_auth=0,btn_filter_mainComm=btn_filter_reply=btn_filter_auth='全部'">
            <i class="fa fa-refresh"></i>
          </button>
        </section>

        <!--评论-->
        <!--v-for="(item,index) in resultList | orderBy 'time' -1" :key="index">-->
        <div class="comments__ask animated fadeIn"
             v-for="(item,index) in resultList" :key="index">
          <div class="comments__ask__title">
            <router-link tag="h3" :to="{ name: 'article',params: { articleId: item.article_id._id }}"
                         activeClass="active">
              <span>原文: </span><span>{{item.article_id.title}}</span></router-link>
            <div class="comments__ask__title--btns">
              <button @click="changeAuthState(item._id),item.state=!item.state;" class="btn btn-default btn-sm"
                      :class="{true:'btn-success',false:'btn-warning'}[!item.state]">
                <i class="fa" :class="{true:'fa-circle-o',false:'fa-ban'}[!item.state]"></i>
              </button>
              <button v-if="!item.isIReplied" class="btn btn-default btn-sm" @click="comment(item)" data-toggle="modal"
                      data-target="#addComm">
                <i class="fa fa-pencil"></i>
              </button>
              <button class="btn btn-default btn-sm btn-danger" @click="delbtn(item)" data-toggle="modal"
                      data-target="#delComm">
                <i class="fa fa-bitbucket"></i>
              </button>
            </div>
          </div>
          <div class="comments__ask__header">
            <span class="name">{{item.name}}</span>
            &ensp;·&ensp;
            <span>{{item.time   | moment("from","now")}}</span>
            &ensp;·&ensp;
            <span>
                     <a :href="'mailto:'+item.email">{{item.email}}</a>
                </span>
            &ensp;·&ensp;
            <span v-if="item.article_id._id.toString() === item.pre_id.toString()" class="alreadyReplied">主评论</span>
            <span v-if="item.article_id._id.toString() !== item.pre_id.toString()" class="alreadyReplied">子评论</span>
            <span v-if="!item.isIReplied">&ensp;·&ensp; <span class="reply">未回复</span></span>
            <span v-if="!!item.isIReplied">&ensp;·&ensp; <span class="alreadyReplied">已回复</span></span>
            &ensp;·&ensp;
            <span v-if="!item.state" class="no-check">审核未通过</span>
            <span v-if="!!item.state" class="checked">审核通过</span>
          </div>
          <div class="comments__ask__content">
            <span>{{item.content}}</span>
          </div>
        </div>
      </section>
      <no-data v-if="!hasData"></no-data>
    </div>
    <!--增加评论 modal-->
    <div class="modal fade comment--replyBox" id="addComm" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title"><i class="fa fa-comments"></i> 进行评论/ADDCOMMENT</h4>
          </div>
          <div class="modal-body comment--replyBox-body">
            <div class="comment--replyBox--textarea">
              <label for="comment--replyBox--textarea">回复 <span>{{replyBox.name}}</span>: </label>
              <textarea autofocus v-model="replyContent" rows="6" id="comment--replyBox--textarea" class="form-control"
                        placeholder="请输入评论内容..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button v-bind:disabled="!replyContent" type="button" data-dismiss="modal"
                    @click="confirmAddComment(replyBox)" class="btn btn-success">
              评论
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--删除评论 modal-->
    <div class="modal fade" id="delComm" tabindex="-1" role="dialog" v-on:keyup.enter="confirmDelCommBtn(delBox)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title"><i class="fa fa-bitbucket"></i> 删除评论/DELCOMMENT</h4>
          </div>
          <div class="modal-body">
            <h3 class="text-center deleteConfirmText">确认删除此评论?</h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" data-dismiss="modal" @click="confirmDelCommBtn(delBox)" class="btn btn-danger">
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<style scoped lang="scss">
  //base
  @import "../theme/theme.scss";

  .deleteConfirmText {
    margin: 10px;
  }

  .comments {
    height: 100%;
    .title {
      width: 100%;
      color: #fff;
      margin-bottom: 20px;
      text-align: left;
    }

    .commentList {
      .commentList--dropdown {
        @include display-flex;
        @include justify-content(space-between);
        @include align-items(center);
        margin-bottom: 10px;
        .commentList--dropdown-e {
          @include display-flex;
          @include justify-content(flex-end);
          @include align-items(center);

          .commentList--dropdown-label {
            color: $base-theme-color;
            //margin-right: 10px;
            font-size: 14px;
            //margin-left:10px;
          }
          .commentList--dropdown-div {
            margin-left: 10px;
            button {
              width: 120px;
            }
            .dropdown-menu {
              width: 120px;
              min-width: auto;
              li {
                text-align: center;
                a {
                  cursor: pointer;
                }
              }

            }

          }
        }

      }
      .comments__ask {
        box-sizing: content-box;
        padding: 10px;
        margin-bottom: 5px;
        border-bottom: 1px solid $border-bottom-dark;
        position: relative;
        &:nth-last-child(1) {
          border-bottom: 1px solid transparent;
        }
        .comments__ask__title {
          color: #fff;
          margin-bottom: 10px;
          @include display-flex;
          @include justify-content(space-between);
          @include align-items(center);
          h3 {
            cursor: pointer;
            color: #fff;
            border-left: 4px solid $base-theme-color;
            padding-left: 10px;
            transition: all ease 200ms;
            max-width: 580px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 0;

            &:hover {
              color: $base-theme-color;

            }
          }
          .comments__ask__title--btns {
            button {

            }
          }

        }
        .comments__ask__header {
          font-size: 14px;
          line-height: 130%;
          padding: 5px 0;
          color: #ececec;
          //cursor: pointer;
          .name {
            font-size: 18px;
            color: $base-theme-color;
          }
          .reply, .no-check {
            color: $base-theme-color-o;
            //transition: all ease 200ms;
          }
          .alreadyReplied, .checked {
            color: green;
          }
          a {
            color: #ececec;
          }
        }
        .comments__ask__content {
          font-size: 14px;
          line-height: 150%;
          padding: 5px 0;
          color: #fff;
          //cursor: pointer;
        }
      }
    }

  }

  .comment--replyBox {
    font-size: 14px;
    .comment--replyBox-body {
      .comment--replyBox--textarea {
        textarea {
          overflow-x: hidden;
          resize: vertical;
        }
      }
    }
  }

</style>
<script type="text/javascript">
  import Vue from "vue";
  import _ from "lodash";
  import API from "../config";
  import {
    GetCommentToArticleList,
    ChangeCommentAuthState,
    DeleteComment,
    ChangeCommentReplyState,
    SendComment,
  } from "../api/api_comment";

  import copyright from '../components/copyright.vue'
  import noData from "../components/nodata.vue"

  import "bootstrap/js/dropdown.js";//放到它出现的位置
  import "bootstrap/scss/bootstrap/_dropdowns.scss";


  module.exports = {
    data: function () {
      return {
        commentList: [],
        btn_filter_mainComm: '全部',//0 全部，1 主评论， 2 子评论
        Condition_main: 0,
        btn_filter_reply: '未回复',//0 全部，1 未回复， 2 已回复
        Condition_reply: 1,
        btn_filter_auth: '未审核',//0 全部，1 未审核， 2 已审核
        Condition_auth: 1,
        replyBox: {},
        delBox: {},
        replyContent: '',
        hasData: true,
        isLoading: true,
      }
    },
    computed: {
      resultList: function () {
        const scope = this;
        let _tmp = [];
        let source = scope.commentList;

        for (let data of source) {
          (filter_main(data) && filter_reply(data) && filter_auth(data)) && _tmp.push(data);
        }

        //子主评论筛选
        function filter_main(data) {
          switch (parseInt(scope.Condition_main)) {
            case 0:
              return true;
              break;
            //主评论
            case 1:
              return data.article_id._id.toString() === data.pre_id.toString();
              break;
            //子评论
            case 2:
              return data.article_id._id.toString() !== data.pre_id.toString();
              break;
            default:
              return true;
              break;
          }
        }

        //是否回复筛选
        function filter_reply(data) {
          switch (parseInt(scope.Condition_reply)) {
            case 0:
              return true;
              break;
            //未回复
            case 1:
              return !data.isIReplied;
              break;
            //已回复
            case 2:
              return !!data.isIReplied;
              break;
            default:
              return true;
              break;
          }
        }

        //是否审核筛选
        function filter_auth(data) {
          switch (parseInt(scope.Condition_auth)) {
            case 0:
              return true;
              break;
            //未审核
            case 1:
              return !data.state;
              break;
            //已审核
            case 2:
              return !!data.state;
              break;
            default:
              return true;
              break;
          }
        }

        _tmp.length === 0 ? (scope.hasData = false) : (scope.hasData = true);

        return  _.orderBy(_tmp, ['time'], ['desc']);
      }
    },
    methods: {
      //获得列表
      getList: function () {
        const scope = this;
        GetCommentToArticleList().then((data)=> {
          scope.commentList = data;
        });
      },
      //改变评论状态
      changeAuthState: function (_id) {
        ChangeCommentAuthState({
          _id: _id
        })
      },
      //打开回复评论弹层
      comment: function (item) {
        //发送数据
        this.replyBox = item;
      },
      confirmAddComment: function (item) {
        const scope = this;
        let params = {
          article_id: item.article_id._id,
          pre_id: item._id,
          next_id: [],
          name: API.MY,
          email: API.EMAIL,
          time: new Date(),
          content: scope.replyContent,
          //这里是增加对主评论的子评论,
          // 既然是我的评论那我没有道理继续评论的理由,
          // 故对自评论显示我已评论,我的评论,审核状态为true
          // 但是主评论需要手动设置
          isIReplied: true,
          state: true
        };
        //如果对用户的文章评论进行了评论,则标记此评论为已阅读
        //此接口只对我有效
        ChangeCommentReplyState({
          _id: item._id
        }).then(function () {
          SendComment(params).then((data)=> {
            scope.replyContent = '';
          }).then(function () {
            scope.getList()
          });
        });
      },
      // 删除评论
      delbtn: function (item) {
        this.delBox = item;
      },
      confirmDelCommBtn: function (item) {
        const scope = this;
        $('#delComm').modal('hide');
        DeleteComment(item._id).then((data)=> {
        }).then(function () {
          //刷新文章列表
          scope.getList()
        })
      },
    },
    created: function () {
      const scope = this;
      /**
       * 获得评论列表
       * */
      scope.getList()
    }
    ,
    destroyed: function () {
    }
    ,
    components: {
      copyright,
      noData,
    }
  }

</script>
