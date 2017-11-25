<!--内容区-->
<template>
  <div class="myInfo animated fadeIn">
    <!--我的信息title-->
    <h3 class="title">
      <i class="fa fa-fw fa-lg fa-user"></i> 我的信息 / <span class="">MYINFO</span>
      <i v-if="!!isSuccess" class="fa fa-check-circle blue"></i>
    </h3>
    <div class="myInfoInner">
      <div class="myInfoInnerFlexBox">
        <!--我的详细信息-->
        <div class="infoDetail">
          <div class="inputGroup clearfix">
            <label class="">
              昵称/Nickname
            </label>
            <div class=" infoDetail__inputGroup">
              <input type="text" class="form-control input-sm  inputContent" id="name" name="name" placeholder="姓名/Name"
                     v-model.trim.lazy="myInfo.full_name">
            </div>
          </div>
          <div class="inputGroup clearfix">
            <label class="">
              职位/Position
            </label>
            <div class=" infoDetail__inputGroup">
              <input type="text" class="form-control input-sm  inputContent" id="position" name="position"
                     placeholder="职位/Position" v-model.trim.lazy="myInfo.position">
            </div>
          </div>
          <div class="inputGroup clearfix">
            <label class="">
              地址/Address
            </label>
            <div class=" infoDetail__inputGroup">
              <input type="text" class="form-control input-sm  inputContent" id="address" name="address"
                     placeholder="地址/Address" v-model.trim.lazy="myInfo.address">
            </div>
          </div>
          <div class="inputGroup clearfix">
            <label class="">
              心情/Motto
            </label>
            <div class=" infoDetail__inputGroup">
              <input type="text" class="form-control input-sm col-sm-6 inputContent" id="mood" name="mood"
                     placeholder="心情/Mood" v-model.trim.lazy="myInfo.motto">
            </div>
          </div>
        </div>
        <!---->
        <!--头像img-->
        <div class="imgBox">
          <div class="imgBoxInner">
            <!--头像上传form-->
            <form id="imgUploadForm" action="" class="dropzone" method="post" enctype="multipart/form-data">
              <input id="imgUpload" type="file">
            </form>
            <img class="img-circle headerImg" :src="addImgPrefix(myInfo.img_url)">
          </div>
        </div>

        <!--我的陈述-->
        <div class="personalState">
          <label>
            我的介绍/MyIntroduce(Markdown)
          </label>
          <div class="personalState__textarea">
            <textarea id="personalState__textarea" v-model.trim.lazy="myInfo.personal_state"
                      placeholder="请填写我的介绍...."></textarea>
          </div>
        </div>
        <!--修改用户名密码-->
        <div style="display:none" class="authorizationBox">
          <div class="inputGroup clearfix">
            <label class="" for="new_password">登录验证信息/Authorization</label>
            <form class="inputBox">
              <div class="" :class="{'has-error':!myInfo.username}">
                <input type="text" class="form-control input-sm  inputContent"
                       placeholder="用户名/Username" name="username" v-model="myInfo.username" required>
                <label>用户名/Username</label>
              </div>
              <div class="" :class="{'has-error':!myInfo.password}">
                <input type="password" class="form-control input-sm  inputContent"
                       placeholder="旧密码/Old Password" name="password" v-model="myInfo.password" required>
                <label>旧密码/Old Password</label>
              </div>
              <div class="" :class="{'has-error':!myInfo.new_password}">
                <input type="password" class="form-control input-sm  inputContent" id="new_password"
                       placeholder="新密码/New Password" name="new_password" v-model="myInfo.new_password" required>
                <label>新密码/New Password</label>
              </div>
              <div class="buttonBox" data-toggle="modal" data-target="#logoutBox">
                <button v-bind:disabled="!myInfo.username||!myInfo.password||!myInfo.new_password"
                        class="btn btn-danger" @click.prevent="changeAuthorizationInfo()">确认
                </button>
                <span class="stateText">{{textState}}</span>
              </div>
            </form>
          </div>
        </div>

        <!--最近登录记录-->
        <div class="loginRecord">
          <label>登录记录/LoginRecord</label>
          <table class="table">
            <thead>
            <tr>
              <th>#</th>
              <th>登录IP</th>
              <th>登录时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in loginInInfo">
              <td>{{index+1}}</td>
              <td>{{item.login_ip}}</td>
              <td>{{item.login_time | moment("YYYY/MM/DD HH:mm:ss dddd")}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from "vue";
  import _ from "lodash";
  import {
    GetMyInfoWithOriginal,
    PostMyInfo,
  } from '../api/api_myinfo'
  import API from '../config'
  import {ChangePassword} from '../api/api_auth'
  import copyright from '../components/copyright.vue'
  import {addImgPrefix} from "../utils/filters.js";
  import {setLoginState} from '../vuex/actions'

  import {ImageUpload} from "../api/api_upload";
  import {mapActions} from 'vuex';


  module.exports = {
    data: function () {
      return {
        myInfo: {},
        textState: 'Submit',
        isSuccess: false,
      }
    },
    computed:{
      loginInInfo: function () {
        if(!!this.myInfo && !!this.myInfo.login_info){
          return _.orderBy(this.myInfo.login_info.slice(0, 15), ['login_time'],['desc'])
        }else{
          return []
        }
      }
    },
    watch: {
      myInfo: {
        handler: function (val) {
          this.save();
        },
        deep: true,
      }
    },
    methods: {
      ...mapActions({
        setLoginState: 'setLoginState'
      }),
      addImgPrefix: function (val) {
        return addImgPrefix(val)
      },
      save: function () {
        const _this = this;
        let params = {
          _id: _this.myInfo._id,
          full_name: _this.myInfo.full_name,
          position: _this.myInfo.position,
          address: _this.myInfo.address,
          motto: _this.myInfo.motto,
          personal_state: _this.myInfo.personal_state,
          img_url: _this.myInfo.img_url
        };
        PostMyInfo(params).then((data)=> {
          _this.isSuccess = true;
          setTimeout(function () {
            _this.isSuccess = false;
          }, 1000);
        })
      },
      //修改登录信息
      changeAuthorizationInfo: function () {
        const _this = this;
        if (!_this.myInfo.username) {
          alert('用户名无效');
          return false;
        }
        if (!_this.myInfo.password) {
          alert('旧密码无效');
          return false;
        }
        if (!_this.myInfo.new_password) {
          alert('新密码无效');
          return false;
        }
        let params = {
          _id: _this.myInfo._id,
          username: _this.myInfo.username,
          password: _this.myInfo.password,
          new_password: _this.myInfo.new_password,
        };
        ChangePassword(params).then((data)=> {
          _this.textState = '成功!';
          //密码修改成功,需要提示用户重新登录,自动退出!
          alert("给出提示,xxs后请从新登陆")
          setTimeout(function () {
            _this.$localStorage.$reset();
            _this.setLoginState(false);//设置全局登录状态
            _this.$router.go({
              name: 'login'
            });//跳转

          }, 1200, true);
        }, ()=> {
          _this.textState = '失败!';
        })
      },
    },
    created: function () {
      const _this = this;
      /**
       * 获取原始个人信息
       * */
      GetMyInfoWithOriginal().then((data)=> {
        _this.myInfo = data;
      }, (code)=> {
        console.log("code:" + code)
      })
    },
    mounted: function () {
      const _this = this;
      /**
       * 1. 选择图片,获得filer信息
       * */
      $("#imgUpload").change(function (e) {
        // 文件句柄
        var file = e.target.files[0];
        // 只处理图片
        if (!file.type.match('image.*')) {
          return null;
        }
        ImageUpload(file).then(function (imageName) {
          _this.myInfo.img_url = imageName;
        }, function () {
          alert("upload error");
        })
      })
    },
    components: {
      copyright
    }
  }
</script>

<style scoped lang="scss">
  //base
  @import "../theme/theme.scss";

  .deleteConfirmText {
    margin: 10px;
  }

  .myInfo {
    overflow: hidden;
    height: 100%;
    .title {
      width: 100%;
      color: #fff;
      margin-bottom: 30px;
    }
    .myInfoInner {
      display: block;
      padding-bottom: 30px;
      //height: calc(100% - 77px);
      //overflow: scroll;
      .myInfoInnerFlexBox {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .imgBox {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          .imgBoxInner {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            box-shadow: 0px 3px 12px #000;
            overflow: hidden;
            cursor: pointer;
            position: relative;

            .headerImg {
              min-width: 100%;
              min-height: 100%;
              width: 100%;
              height: 100%;
              /*position: relative;*/
              /*z-index: 999;*/
            }
            #imgUploadForm {
              position: absolute;
              height: 100%;
              width: 100%;
              opacity: 0;
              padding: 0;
              border: 0;
              background-color: transparent;
              #imgUpload {
                position: absolute;
                height: 100%;
                width: 100%;
                opacity: 0;
                padding: 0;
                border: 0;
                background-color: transparent;
              }
            }
            .dz-default {
              display: none;
            }
            .dz-preview {
              display: none !important;
            }
          }
        }

        //输入盒子 = label+input
        .inputGroup {
          label {
            color: #00b2e2;
            margin-bottom: 5px;
          }
          .infoDetail__inputGroup {
            height: 34px;
            margin-bottom: 10px;
            .inputContent {
              font-size: 16px;
              height: 34px;
              background-color: #fff;
              color: #333;
              //display: none;
              border: 1px solid $base-theme-color;
            }
          }
        }
        //个人基本信息
        .infoDetail {
          width: 50%;
          color: #fff;
          label {
            font-size: 16px;
          }
        }
        //我的心情
        .myMotto {
          width: 100%;
          color: #fff;
        }
        .personalState {
          width: 100%;
          //height: 400px;
          margin-bottom: 30px;
          label {
            font-size: 16px;
            color: #00b2e2;
            font-weight: bold;
            margin-bottom: 10px;
            padding: 0;
          }
          .personalState__textarea {
            width: 100%;
            /*padding: 0 5px;*/
            position: relative;
            textarea {
              background-color: #fff;
              color: #333;
              border-radius: 3px;
              border: 1px solid $base-theme-color;
              padding: 11px;
              line-height: 150%;
              font-size: 16px;
              margin: 0;
              width: 100%;
              height: 300px;
              overflow-x: hidden;
              resize: none;
              outline: none;
              transition: all ease 200ms;
            }
          }
        }

        .authorizationBox {
          width: 100%;
          margin-bottom: 30px;
          .inputGroup {
            label {
              font-size: 16px;
            }
          }
          .inputBox {
            padding-top: 10px;
            width: 100%;
            position: relative;
            padding-right: 60px;
            @include display-flex;
            @include justify-content(center);
            @include align-items(center);
            div {
              flex: 1;
              padding: 0 10px 0 0;
            }
            label {
              margin-top: 5px;
              color: #fff;
              margin-bottom: 5px;
              font-size: 12px;
              text-align: right;
              width: 100%;
            }
            .buttonBox {
              width: 60px;
              position: absolute;
              right: 0;
              padding: 0;
              button {
                width: 100%;
                height: 30px;
                font-size: 14px;
                color: #fff;
                padding: 4px 12px;

              }
              .stateText {
                color: #fff;
                margin-top: 5px;
                margin-bottom: 5px;
                font-size: 12px;
                text-align: right;
                width: 100%;
                display: inline-block;
                max-width: 100%;
                font-weight: 700;
                padding: 0;
                border: 0;
                vertical-align: baseline;

              }
            }
          }
        }

        .loginRecord {
          width: 100%;
          //height: 400px;
          //margin-bottom: 30px;
          label {
            font-size: 16px;
            color: #00b2e2;
            font-weight: bold;
            margin-bottom: 10px;
            padding: 0 15px;
          }
          table {
            th {
              text-align: center;
              color: #fff;
              font-size: 16px;
            }
            td {
              font-size: 14px;
            }
            text-align: center;
            color: #fff;
          }
          .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
            border-top: 1px solid rgba(132, 132, 132, 0.37)
          }
        }
      }
    }
  }


</style>