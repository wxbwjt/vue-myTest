/**
* Created by chenhuanlu on 2017/10/20.
*/

<template>
    <div class="table-small-padding big-table">
    <AuthWraper permission="task_asm:view">
      <table class="info-table" cellpadding="30px">
        <tr>
          <td>客户名称</td>
          <td> <el-tooltip class="item" effect="dark" :content="orderBaseInfo.customerName" placement="top"><span>{{orderBaseInfo.customerName?orderBaseInfo.customerName:''}}</span></el-tooltip></td>
          <td>客户订单号</td>
          <td>{{orderBaseInfo.customerOrderId}}</td>
          <td>单据流水号</td>
          <td>{{orderBaseInfo.serialId}}</td>
        </tr>
        <tr>
          <td>订单类型</td>
          <td>{{orderTypes[orderBaseInfo.orderType-1]}}</td>
          <td>付款方式</td>
          <td>{{payMethod[info.payMethod-1]}}</td>
          <td>订单来源</td>
          <td v-if="info.orderSource==1">永创订单</td>
          <td v-else-if="info.orderSource==2">美华订单</td>
          <td v-else>成田订单</td>
        </tr>
        <tr v-if="orderBaseInfo.orderType==2||orderBaseInfo.orderType==3||orderBaseInfo.orderType==4||orderBaseInfo.orderType==6||orderBaseInfo.orderType==9">
          <td>机器业务员</td>
          <td>{{info.machineSalesman}}</td>
          <td>凭证</td>
          <td colspan="3" style="white-space: normal">
            <upload-file v-if="imglistStr" :fileslink="imglistStr"></upload-file>
          </td>
        </tr>
        <tr v-else>
          <td>凭证</td>
          <td colspan="5" style="white-space: normal">
            <upload-file v-if="imglistStr" :fileslink="imglistStr"></upload-file>
          </td>
        </tr>
        <tr>
          <td>联系人</td>
          <td>{{customer.contact}}</td>
          <td>手机</td>
          <td>{{customer.conMobile}}</td>
          <td>客户电话</td>
          <td>{{customer.telephone}}</td>
        </tr>
        <tr>
          <td>传真</td>
          <td>{{customer.fax?customer.fax:''}}</td>
          <td>邮箱</td>
          <td>{{customer.conEmail?customer.conEmail:''}}</td>
          <td>状态</td>
          <td>{{orderStatus[info.status-1]}}</td>
          <!--状态 1有效;0无效(已删除)-->
        </tr>
        <tr>
          <td>原价</td>
          <td>{{info.amount}}</td>
          <td>折扣</td>
          <td>{{info.discount?info.discount:'无'}}</td>
          <td>折后价</td>
          <td>{{discountAmount}}</td>
        </tr>
        <tr>
          <td>报价日期</td>
          <td>{{info.createdTime}}</td>
          <td>下单日期</td>
          <td>{{info.billDate?info.billDate:"--"}}</td>
          <td>是否含税</td>
          <td>{{includedTax[info.includedTax - 1]}}</td>
        </tr>
        <tr>
          <td >总价（含税）</td>
          <td colspan="2">{{info.totalMoneyWithTax?info.totalMoneyWithTax:'0.00'}}</td>
          <!--<td colspan="2" v-if="info.includedTax==1">{{info.discountAmount!=0?info.discountAmount:'0.00'}}</td>-->
          <!--<td colspan="2" v-if="info.includedTax==2">{{info.discountAmount!=0?(info.discountAmount*117/100).toFixed(2):'0.00'}}</td>-->
          <td>总价（不含税）</td>
          <td colspan="2">{{info.totalMoneyWithoutTax?info.totalMoneyWithoutTax:'0.00'}}</td>
          <!--<td colspan="2" v-if="info.includedTax == 1">{{info.discountAmount!=0 ? (info.discountAmount/117*100).toFixed(2):'0.00'}}</td>-->
          <!--<td colspan="2" v-if="info.includedTax == 2">{{info.discountAmount!=0?info.discountAmount:'0.00'}}</td>-->
        </tr>
        <tr v-if="customer">
          <td>业务员</td>
          <td>{{info.operatorText}}</td>
          <td>客户地址</td>
          <td colspan="3"><el-tooltip class="item" effect="dark" :content="customer.address" placement="top"><span>{{customer.address}}</span></el-tooltip></td>
        </tr>
        <tr v-if="customer">
        <td>收货联系人</td>
        <td>{{customer.sendContact}}</td>
        <td>手机</td>
        <td>{{customer.sendPhone}}</td>
        <td>收货人电话</td>
        <td>{{customer.sendTelephone}}</td>
      </tr>
        <tr v-if="customer">
          <td>地址</td>
          <td colspan="3"><el-tooltip class="item" effect="dark" :content="customer.sendAddress" placement="top"><span>{{customer.sendAddress}}</span></el-tooltip></td>
          <td>邮箱</td>
          <td>{{customer.sendEmail}}</td>
        </tr>
        <tr v-if="customer">
          <td>收票联系人</td>
          <td>{{customer.billContact}}</td>
          <td>手机</td>
          <td>{{customer.billContactPhone}}</td>
          <td>收票人电话</td>
          <td>{{customer.billConTel}}</td>
        </tr>
        <tr v-if="customer">
          <td>地址</td>
          <td colspan="3"><el-tooltip class="item" effect="dark" :content="customer.invoiceAddress" placement="top"><span>{{customer.invoiceAddress}}</span></el-tooltip></td>
          <td>邮箱</td>
          <td>{{customer.billEmail}}</td>
        </tr>
        <tr v-if="info.companyBankInfo">
          <td>公司名称</td>
          <td>{{info.companyBankInfo.name}}</td>
          <td>开户行</td>
          <td colspan="3">{{info.companyBankInfo.bank_name}}</td>
        </tr>
        <tr v-if="info.companyBankInfo">
          <td>行号</td>
          <td>{{info.companyBankInfo.bank_no}}</td>
          <td>银行账号</td>
          <td colspan="3">{{info.companyBankInfo.bank_account}}</td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="5">{{info.remark}}</td>
        </tr>
      </table>
      <br/>
      <table class="info-table" cellpadding="30px" v-if="info.status == 7 && ( info.orderType == 7 || info.orderType == 8 )">
        <tbody>
        <tr>
          <td>取消凭证</td>
          <td colspan="5" style="white-space: normal">
            <upload-file v-if="cancelImgList" :fileslink="cancelImgList"></upload-file>
          </td>
        </tr>
        <tr>
          <td>取消备注</td>
          <td colspan="5">{{info.cancelRemark}}</td>
        </tr>
        </tbody>
      </table>
      <br/>
       </AuthWraper>
      <div>
      <el-table  :data="orderDetail"    border>
        <el-table-column show-overflow-tooltip type="index" label="序号" width="65px" align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="customerMaterialsId" label="客户物料号" min-width="70"  align="center" > </el-table-column>
        <el-table-column show-overflow-tooltip prop="partsName" label="配件名称"   align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="specification" label="型号" min-width="40"  align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="unit" label="单位"  width="40"></el-table-column>
        <el-table-column show-overflow-tooltip prop="orderCount" label="数量"  width="40"></el-table-column>
        <el-table-column show-overflow-tooltip prop="singlePrice" label="单价"  min-width="40"></el-table-column>
        <el-table-column show-overflow-tooltip prop="discount" label="折扣(%)" width="70" ></el-table-column>
        <el-table-column show-overflow-tooltip prop="discountAmount" label="金额"  min-width="40"></el-table-column>
        <el-table-column show-overflow-tooltip prop="mashineType" label="机型"  min-width="40"></el-table-column>
        <el-table-column show-overflow-tooltip  label="仓库"  min-width="40">
            <span slot-scope="scope">{{repertoryNameList[scope.row.repertoryId]}} </span>
        </el-table-column>
        <el-table-column prop="remark" show-overflow-tooltip label="备注" min-width="40" ></el-table-column>
      </el-table>
        </div>
    </div>
</template>

<script>
  import UploadFile from "../../../common/UploadFile.vue";
    export default{
      name: 'OrderDetailInfo',
      components:{
        UploadFile,
      },
      computed:{
        /**
         * 订单类型
         */
        "orderTypes":function () {
            return this.$store.state.moduleOrder.enumsList.orderTypes;

        },
        /**
         * 订单状态
         */
        "orderStatus":function () {
            return this.$store.state.moduleOrder.enumsList.orderStatus;
        },
        /**
         * 付款方式
         */
        "payMethod":function () {
            return this.$store.state.moduleOrder.enumsList.payMethod;
        },
        info:function () {
          return this.$store.state.moduleOrder.orderDetailData.orderDetail;
        },
          discountAmount(){
            if(this.info.includedTax==1){
                return this.info.totalMoneyWithTax
            }else{
                return this.info.totalMoneyWithoutTax
            }
          },
        orderBaseInfo:function () {
          return this.$store.state.moduleOrder.orderBaseInfo;
        },
        imglistStr:function () {
          let imgList = this.$store.state.moduleOrder.orderDetailData.imglist;
          if(imgList&&imgList.length>1){
              return imgList.join(',');

            }else {
              return imgList[0];
            }

        },
          cancelImgList(){
              let imgList = this.$store.state.moduleOrder.orderDetailData.orderDetail.cancelFileNameList;
              if(imgList&&imgList.length>1){
                  return imgList.join(',');

              }else {
                  return imgList[0];
              }
          },
        orderDetail:function () {
          return this.$store.state.moduleOrder.orderDetailData.orderDetailDtos;
        },
        repertoryNameList:function () {
          return this.$store.state.moduleOrder.enumsList.repertoryNames;
        },
        customer:function () {
          return this.$store.state.moduleOrder.orderBaseInfo.customer;
        },
          includedTax(){
              return this.$store.state.moduleOrder.enumsList.includedTax;
          }
      },
    }
</script>

<style scoped>
  .info-table{
    /*margin-left: 10px;*/
    /*margin-right: 10px;*/
    /*margin-right: 10px;*/
  }

  .info-table td:nth-child(odd) {
    font-weight: bold;
  }

  .info-table td:nth-child(even) {
    /* text-align: center; */
  }
  .info-table td {
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 5px;
    font-size: 15px;
  }



</style>
