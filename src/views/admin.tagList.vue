<template>
  <div>
    <div class="animated fadeIn tags">
      <h3 class="title">
        <i class="fa fa-fw fa-lg fa-tag"></i> 标签管理 / <span class="">TAGS</span>
      </h3>
      <!--增加-->
      <div class="btnBox text-right">
        <button data-toggle="modal" data-target="#addTag" @click="addNewTagBtn()" class="btn btn-success"><i
          class="fa fa-plus"></i></button>
      </div>
      <div class="tableScrollBox">
        <div class="table-body">
          <table class="table table-condensed" id="table">
            <thead>
            <tr class="text-center">
              <th>#</th>
              <th @click="order('name')">
                标签名称/Name
                <span v-if="predicate == 'name'">
                        <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                        <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                    </span>
              </th>
              <th @click="order('catalogue_name')">
                分类名称/Cat.
                <span v-if="predicate == 'catalogue_name'">
                        <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                        <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                    </span>
              </th>
              <th @click="order('used_num')">引用数/Quote
                <span v-if="predicate == 'used_num'">
                        <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                        <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                    </span></th>
              <th @click="order('create_time')">创建时间/C.T.
                <span v-if="predicate == 'create_time'">
                        <i v-if="reverse==='asc'" class="fa fa-caret-up"></i>
                        <i v-if="reverse==='desc'" class="fa fa-caret-down"></i>
                    </span>
              </th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(tag,index) in orderedTagList">
              <!--<tr v-for="tag in tagLists | orderBy predicate reverse">-->
              <td>{{index+1}}</td>
              <td>{{tag.name}}</td>
              <td>{{tag.catalogue_name}}</td>
              <td>{{tag.used_num}}</td>
              <td>{{tag.create_time | moment("YYYY/MM/DD")}}</td>
              <td>
                <button data-toggle="modal" data-target="#editTag" @click="editTagBtn(tag)"
                        class="btn btn-default btn-sm"><i class="fa fa-pencil"></i></button>
                <button data-toggle="modal" data-target="#delTag" @click="delTagBtn(tag._id)"
                        class="btn btn-danger btn-sm"><i class="fa fa-bitbucket"></i></button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

    <!--弹出层-增加-->
    <div class="modal fade" id="addTag" tabindex="-1" role="dialog"
         v-on:keyup.enter="!!newTag.name&&!!newTag.catalogue_name&&confirmSaveNewTagBtn()">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title"><i class="fa fa-plus-square"></i> 增加标签/ADDTAGS</h4>
          </div>
          <div class="modal-body">
            <form name="addTags">
              <div class="form-group" :class="{true:'has-error',false:''}[!newTag.name]">
                <label class="control-label">标签名/Name</label>
                <input type="text" class="form-control" name="tagname" v-model="newTag.name" placeholder="请输入标签名称"
                       required>
              </div>
              <div class="form-group" :class="{true:'has-error',false:''}[!newTag.catalogue_name]">
                <label class="control-label">分类名/Cat.</label>
                <input type="text" class="form-control" name="catname" v-model="newTag.catalogue_name"
                       placeholder="请输入分类名称" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <span class="submitText">{{submitText}}</span>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button v-bind:disabled="!newTag.name||!newTag.catalogue_name" @click="confirmSaveNewTagBtn()"
                    type="button" class="btn btn-success">保存
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--弹出层-修改-->
    <div class="modal fade" id="editTag" tabindex="-1" role="dialog"
         v-on:keyup.enter="!!editTag.name&&!!editTag.catalogue_name&&confirmEditTagBtn()">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title"><i class="fa fa-pencil"></i> 修改标签/EDITTAGS</h4>
          </div>
          <div class="modal-body">
            <form name="editTags">
              <div class="form-group" :class="{true:'has-error',false:''}[!editTag.name]">
                <label class="control-label">标签名/TagName:</label>
                <input type="text" class="form-control" name="tagname" v-model="editTag.name" required>
              </div>
              <div class="form-group" :class="{true:'has-error',false:''}[!editTag.catalogue_name]">
                <label class="control-label">分类名/Cat.Name:</label>
                <input type="text" class="form-control" name="catname" v-model="editTag.catalogue_name" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <span class="submitText">{{submitText}}</span>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button v-bind:disabled="!editTag.name||!editTag.catalogue_name" @click="confirmEditTagBtn()" type="button"
                    class="btn btn-success">修改
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--弹出层-删除-->
    <div class="modal fade" id="delTag" tabindex="-1" role="dialog" v-on:keyup.enter="confirmDelTagBtn()">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title"><i class="fa fa-bitbucket"></i> 删除标签/DELTAGS</h4>
          </div>
          <div class="modal-body">
            <h3 class="text-center deleteConfirmText">确认删除此标签?</h3>
          </div>
          <div class="modal-footer">
            <span class="submitText">{{submitText}}</span>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" @click="confirmDelTagBtn()" class="btn btn-danger">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
<style scoped lang="scss">
  //base
  @import "../theme/theme.scss";

  .deleteConfirmText {
    margin: 10px;
  }

  .tags {
    height: 100%;
    .title {
      width: 100%;
      color: #fff;
      margin-bottom: 10px;
      text-align: left;
    }
    .btnBox {
    }
    table {
      color: #fff;
      th {
        text-align: center;
        color: #00b2e2;
        cursor: pointer;
        position: relative;
        span {
          position: absolute;
          margin-left: 5px;
          top: inherit;
          left: inherit;
        }
      }
      .danger td {
        background-color: rgba(255, 2, 0, 0.53) !important;
      }
      .warning td {
        background-color: rgba(2, 255, 0, 0.35) !important;
      }
      td {
        vertical-align: middle !important;
        font-size: 14px;
        text-align: center;
        border-top-color:transparent;
        border-bottom:1px solid $border-bottom-dark;
      }
    }
  }

</style>
<script type="text/javascript">
  import Vue from "vue";
  import _ from "lodash";
  import {
    GetTagsList,
    AddTag,
    DeleteTag,
    EditTag,
  } from "../api/api_tag";


  module.exports = {
    data: function () {
      return {
        reverse: 'desc',
        predicate: 'used_num',
        tagLists: [],

        newTag: {
          name: '',
          catalogue_name: ''
        },
        editTag: {
          _id: '',
          name: '',
          catalogue_name: ''
        },
        submitText: '',
        delTag: {
          _id: ''
        },
      }
    },
    computed: {
      orderedTagList: function () {
        if (!!this.tagLists) {
          return _.orderBy(this.tagLists, [this.predicate], [this.reverse])
        } else {
          return []
        }
      },
    },
    methods: {
      /**
       * 获取列表
       * */
      getList: function () {
        const scope = this;
        GetTagsList().then((data)=> {
          scope.tagLists = data;
        }, (err) => {
        })
      },
      /**
       * 排序
       * */
      order: function (name) {
        this.predicate = name;
        if (this.reverse === 'asc') {
          this.reverse = 'desc';
        } else {
          this.reverse = 'asc';
        }
      },
      /**
       * 模态框弹出(新增)
       * */
      addNewTagBtn: function () {
        const scope = this;
        scope.submitText = '';
        //init
        scope.newTag = {
          name: null,
          catalogue_name: null
        };
      },
      confirmSaveNewTagBtn: function () {
        const scope = this;
        let params = {
          name: scope.newTag.name,
          catalogue_name: scope.newTag.catalogue_name,
        };
        this.submitText = '正在提交...';
        AddTag(params).then(()=> {
          // 刷新列表
          this.getList();
          //操作提示
          $('#addTag').modal('hide');
          setTimeout(function () {
            scope.submitText = null;
          }, 2000);
        }, (code)=> {
          //操作提示
          switch (parseInt(code)) {
            case 2:
              scope.submitText = '新增失败, 标签名称已存在!';
              break;
            case 9:
              scope.submitText = '您没有修改权限!';
              break;
            default:
              scope.submitText = '修改失败!';
              break;
          }
          setTimeout(function () {
            scope.submitText = null;
          }, 2000);
        });
      },
      /**
       * 模态框弹出(修改)
       * */
      editTagBtn: function (tagInfo) {
        const scope = this;
        scope.submitText = '';
        scope.editTag = {
          _id: tagInfo._id,
          name: tagInfo.name,
          catalogue_name: tagInfo.catalogue_name,
        };
      },
      confirmEditTagBtn: function () {
        const scope = this;
        scope.submitText = '正在提交...';
        EditTag(scope.editTag).then(()=> {
          // 刷新列表
          scope.getList();
          //操作提示
          $('#editTag').modal('hide');
          setTimeout(function () {
            scope.submitText = null;
          }, 2000);
        }, (code)=> {
          //操作提示
          switch (parseInt(code)) {
            case 2:
              scope.submitText = '修改失败, 此标签不存在!';
              break;
            case 3:
              scope.submitText = '修改失败, 标签名称重复!';
              break;
            case 9:
              scope.submitText = '您没有修改权限!';
              break;
            default:
              scope.submitText = '修改失败!';
              break;
          }
          setTimeout(function () {
            scope.submitText = null;
          }, 2000);
        })
      },
      /**
       * 模态框弹出(删除)
       * */
      delTagBtn: function (id) {
        const scope = this;
        scope.submitText = '';
        scope.delTag = {
          _id: id
        };
      },
      confirmDelTagBtn: function () {
        const scope = this;
        scope.submitText = '正在删除...';
        DeleteTag(scope.delTag._id).then(()=> {
          // 刷新列表
          scope.getList();
          //操作提示
          $('#delTag').modal('hide');
          setTimeout(function () {
            scope.submitText = null;
          }, 2000, true);
        }, ()=> {
          //操作提示
          scope.submitText = '删除失败!';
          setTimeout(function () {
            scope.submitText = null;
          }, 2000, true);
        })
      },
    },
    mounted: function () {
      /**
       * GetTagsList
       * */
      this.getList();
    },
  }
</script>
