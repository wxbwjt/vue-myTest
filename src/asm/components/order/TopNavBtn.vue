<template>
  <div>
    <div class="navbtn-wrapper">
      <div style="float: left;color: red">配件订单<span v-if="detail.orderNo">({{detail.orderNo}})</span></div>
      <router-link :to="info" tag="button" class="el-button el-button--small" active-class="el-button--primary">订单详情
      </router-link>
      <AuthWraper  permission="task_asm:refund"><router-link :to="refund" tag="button" class="el-button el-button--small" active-class="el-button--primary" v-if="btnFlag&&btnshow.refundBtn == true">订单退货
      </router-link></AuthWraper>
      <AuthWraper  permission="task_asm:reissue"><router-link :to="reissue" tag="button" class="el-button el-button--small" active-class="el-button--primary" v-if="btnFlag&&btnshow.reissueBtn == true">订单补发
      </router-link></AuthWraper>
      <AuthWraper  permission="task_asm:change"> <router-link :to="change" tag="button" class="el-button el-button--small" active-class="el-button--primary" v-if="btnFlag&&btnshow.changeBtn == true">订单更换
      </router-link></AuthWraper>
      <AuthWraper  permission="task_asm:cancel"> <router-link :to="cancel" tag="button" class="el-button el-button--small" active-class="el-button--primary" v-if="btnFlag&&btnshow.orderCancelBtn == true">订单取消
      </router-link></AuthWraper>
      <AuthWraper  permission="task_asm:receivecfm"> <router-link :to="receiveCfm" tag="button" class="el-button el-button--small" active-class="el-button--primary" v-if="btnFlag&&btnshow.receiveCfmBtn == true">收货确认
      </router-link></AuthWraper>
    </div>
  </div>

</template>
<script>
  export default {
    name: "TopNavBtn",
    props: ["id"],
    data(){
        return{

        }

    },
    methods: {



    },
    computed: {
        "info": function () {
            return "/order/detail/" + this.id + "/allDetail";
        },
        "refund": function () {
            return "/order/detail/" + this.id + "/refund";
        },
        "reissue": function () {
            return "/order/detail/" + this.id + "/reissue";
        },
        "change": function () {
            return "/order/detail/" + this.id + "/change";
        },
        "cancel": function () {
            return "/order/detail/" + this.id + "/cancel";
        },
        "receiveCfm": function () {
            return "/order/detail/" + this.id + "/receiveCfm";
        },
        btnshow(){
            return this.$store.state.moduleOrder.orderDetailData.btnshow
        },
        detail(){
            return  this.$store.state.moduleOrder.orderDetailData.orderDetail
        },
        btnFlag(){
            let btnFlag = false
            let user = this.$store.state.user
            if(user.id == this.detail.operator&& this.detail.customer.status ==1 ){
                btnFlag = true
            }else if(user.roleNames.indexOf('售后服务主管')!=-1||user.roleNames.indexOf('售后服务文员')!=-1){
                btnFlag = true
            }
            return btnFlag
        }
    },
    components:{

    }
  }
</script>
<style>

</style>
