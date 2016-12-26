<template>
  <div class="modal fade" id="logout" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title"><i class="fa fa-sign-out"></i> 提出提示</h4>
        </div>
        <div class="modal-body">
          <h3 class="text-center deleteConfirmText">确定退出后台管理?</h3>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          <button type="button" data-dismiss="modal" @click="confirmLogout()" class="btn btn-danger">退出</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script type="text/javascript">
  //    import 'bootstrap/js/modal.js'
  import {mapActions} from 'vuex';
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    methods: {
      ...mapActions({
        setLoginState: 'setLoginState',
        setCommentInfoStatus: 'setCommentInfoStatus',
      }),
      confirmLogout: function () {
        const _this = this;
        setTimeout(function () {
          _this.$localStorage.$delete('authorization');
          _this.$localStorage.$delete('commentInfo');
          _this.setLoginState(false);// 登录状态
          _this.setCommentInfoStatus(false);// 评论信息状态

          _this.$router.push({
            name: 'index'
          });
        }, 200);
      },
    },
    created: function () {
      this.$root.doLogout = this.confirmLogout;
    },
  }

</script>
