<template>
  <!--加我qq、微信的modal-->
  <div class="modal fade" id="socialContact" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <img width="100%" class="socialContact-img" :src="socialImgUrl" alt="来加我!!">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState({
      socialImgUrl: 'socialImgUrl',
    }),
  },
}


</script>

<style lang="scss" scoped>

  /*微信模态框调整*/

  #socialContact .modal-dialog {
  }

  #socialContact .modal-content {
    /*background-color:#333;*/
    padding: 15px 15px 10px 15px;
  }

  #socialContact .modal-header {
    text-align: center;
    padding: 5px;
    font-weight: 500;
    font-size: 24px;
    color: #ff6666;
  }

  #socialContact .modal-body {
    overflow: hidden;
    box-sizing: border-box;
    padding: 0px;
  }

  #socialContact .modal-body img {

  }

  #socialContact .modal-footer {
    text-align: center;
    padding: 5px;
    font-weight: 500;
    font-size: 24px;
    color: #ff6666;
    /*font-weight: bold;*/
    /*color: #fff;*/
  }

  #socialContact .modal-footer span {
    margin-right: 5px;
  }

  @media (min-width: 768px) {
    #socialContact .modal-dialog {
      width: 450px;
      margin: 30px auto;
    }
  }
</style>
