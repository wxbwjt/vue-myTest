/**
* Created by chenhuanlu on 2017/10/21.
*/

<template>
    <div class="new-container table-small-padding big-table">
      <el-card>
        <div slot="header"  class="search-head ">
          <span><i class="fa fa-tag"></i>原订单明细</span>
        </div>
          <div>
          <el-table  :data="orderDetail"    border>
            <el-table-column type="index" label="序号" width="65" align="center"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="customerMaterialsId" label="客户物料号" min-width="70"   align="center" > </el-table-column>
            <el-table-column show-overflow-tooltip prop="partsName" label="配件名称" min-width="70"  align="center"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="specification" label="型号" min-width="40"  align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="unit" label="单位" min-width="40" ></el-table-column>
            <el-table-column show-overflow-tooltip prop="orderCount" label="数量" min-width="40" ></el-table-column>
            <el-table-column show-overflow-tooltip prop="singlePrice" label="单价" min-width="40" ></el-table-column>
            <el-table-column show-overflow-tooltip prop="discount" label="折扣(%)"  min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip prop="discountAmount" label="金额" min-width="40" ></el-table-column>
            <el-table-column show-overflow-tooltip prop="mashineType" label="机型" min-width="40" ></el-table-column>
            <el-table-column show-overflow-tooltip prop="remark" label="备注" min-width="40" ></el-table-column>
          </el-table>


        </div>
      </el-card>
      <br/>
      <el-card>
        <div slot="header"  class="search-head ">
          <span><i class="fa fa-tag"></i>变更记录</span>
        </div>
        <div>
          <el-card v-if="orderDetailList.length<1" class="box-card"  style=" background: #F9FAFC; color:#ccc; text-align: center;line-height: 120px;margin-bottom: 20px">暂无变更记录</el-card>

          <div v-for="(item,index) in orderDetailList">
            <i class="el-icon-setting" style="font-size: 14px;">
              第{{index+1}}次变更 {{item.orderTypeString}}</i>
            <br/>
            <el-table v-loading="loading" element-loading-text="拼命加载中"  :data="item.orderDetailDtos"    border>
              <el-table-column type="index" label="序号" width="70" align="center"> </el-table-column>
              <el-table-column show-overflow-tooltip prop="customerMaterialsId" label="客户物料号" min-width="40"   align="center" > </el-table-column>
              <el-table-column show-overflow-tooltip prop="partsName" label="配件名称" min-width="40"  align="center"> </el-table-column>
              <el-table-column show-overflow-tooltip prop="specification" label="型号" min-width="40"  align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="unit" label="单位" width="80" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="orderCount" label="数量" width="40" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="singlePrice" label="单价" width="40" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="discount" label="折扣(%)"  width="40" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="discountAmount" label="金额" min-width="40" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="mashineType" label="机型" min-width="40" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="remark" label="备注" min-width="40" align="center"></el-table-column>
            </el-table>
            <br/>
          </div>



        </div>
      </el-card>

    </div>
</template>

<script>
    export default{
        mounted(){
          this.orderId = this.$route.params.id;
            this.getSublist();
        },
        data(){
            return{
              orderDetailList:[],//变更记录
              loading:true,
              orderId:'',
            }
        },
      computed:{
        orderDetail:function () {
          return this.$store.state.moduleOrder.orderDetailList;
        }
      },
      methods:{
            //获取子订单
        getSublist(){
          this.$http.post("/Change/sublist", {param:this.orderId})
            .then((response) => {
              this.orderDetailList = response.data.orderDetail;
              this.loading = false;
            })
            .catch((error) => {
              console.log(error);
              this.loading = false;
            });
        },
      }
    }
</script>

<style scoped>
.cardBackground{
  background: #F5F5F5;
}
.new-container .el-card__header{
  background-color: #f5f5f5;
  padding: 10px 20px;
}
</style>
