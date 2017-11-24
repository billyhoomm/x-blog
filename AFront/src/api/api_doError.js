/**
 * Description:统一的错误处理
 * 统一的错误处理方法: 8-数据库查找错误；9-非admin用户；10-token错误或超时（（Token 2h内有效）
 * 其余由api自己处理: 2~5-失败；
 */
import Vue from "vue";
import store from '../vuex/store';
import Toast from 'Toast';

export const doError = function (code) {
  code = parseInt(code);
  switch (code) {
    case 8:
      window.$router.back();
      Toast({
        message: '数据库查找错误!', iconClass: 'fa fa-warning',
        position: 'center',
        duration: 3000
      });
      return code;
      break;
    case 9:
      Toast({
        message: '您没有操作权限!', iconClass: 'fa fa-warning',
        position: 'center',
        duration: 3000
      });
      return code;
      break;
    case 10:
      Toast({
        message: 'Token超时,请再登陆!', iconClass: 'fa fa-warning',
        position: 'center',
        duration: 3000
      });
      //清空本地数据
      Vue.$localStorage.$delete('authorization');
      Vue.$localStorage.$delete('commentInfo');
      //修改登录状态
      store.dispatch('setLoginState', false);
      // 跳转
      window.$router.replace({
        name:'login'
      });
      return 10;
      break;
    default:
      return code;
      break;
  }
};
