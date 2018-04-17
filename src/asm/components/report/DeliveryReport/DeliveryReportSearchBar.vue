/**
* 发货统计表搜索
*/
<template>
    <div class="card-box">
            <div class="card-box-inner">
                <el-input v-model="orderNo"  style="width:30%" placeholder="订单号，多个订单号请用逗号隔开" size="small"></el-input>
                <el-button @click="search" type="primary" size="small" >搜索</el-button>
            </div>
    </div>
</template>
<script>
  export default{
    name: 'DeliveryReportSearchBar',
    data(){
      return{
          orderNo:'',
      }
    },
    methods:{
      search(){
          this.$emit('setParam',this.orderNo);

      }
    }

  }
</script>
<style>
</style>
