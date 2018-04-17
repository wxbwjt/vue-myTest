/**
* Created by chenhuanlu on 2017/11/15.
*/

<template>
    <div class="table-small-padding big-table">
      <!--<el-dialog custom-class="el-dialog&#45;&#45;large" @close="closeDialog" title="开票详情"  :visible.sync="show" :close-on-click-modal="true">-->
        <div v-if="invoiceInfo">
          <table class="info-table">
            <tr>
              <td>开票抬头</td>
              <td>{{invoiceInfo.invoiceTitle}}</td>
              <td>发票号</td>
              <td>{{invoiceInfo.invoiceNo}}</td>
            </tr>
            <tr>
              <td>开票类型</td>
              <td>{{invoiceInfo.invoice_type_text}}</td>
              <td>开票金额</td>
              <td>{{invoiceInfo.payAmount}}</td>
            </tr>
            <tr>
              <td>申请人</td>
              <td>{{invoiceInfo.applicant_text}}</td>
              <td>申请时间</td>
              <td>{{invoiceInfo.applyDate?new Date(invoiceInfo.applyDate).toString().substring(0,10):''}}</td>
            </tr>
            <tr>
              <td>开票人</td>
              <td>{{invoiceInfo.billingStaff_Text}}</td>
              <td>开票时间</td>
              <td>{{invoiceInfo.pendingDate?new Date(invoiceInfo.pendingDate).toString().substring(0,10):''}}</td>
            </tr>
            <tr>
              <td>处理人</td>
              <td>{{invoiceInfo.processor_text}}</td>
              <td>寄件时间</td>
              <td>{{invoiceInfo.sendDate?new Date(invoiceInfo.sendDate).toString().substring(0,10):''}}</td>
            </tr>
            <tr>
              <td>联系人</td>
              <td>{{invoiceInfo.contactDto?invoiceInfo.contactDto.contact:''}}</td>
              <td>联系电话</td>
              <td>{{invoiceInfo.contactDto?invoiceInfo.contactDto.conTelephone+'/'+invoiceInfo.contactDto.conMobile:''}}</td>
            </tr>
            <tr>
              <td>邮编</td>
              <td colspan="3">{{invoiceInfo.contactDto?invoiceInfo.contactDto.conPostCode:''}}</td>
            </tr>
            <tr>
              <td>联系人地址</td>
                <el-tooltip v-if="invoiceInfo.contactDto"  effect="dark" :content="invoiceInfo.contactDto.conAddress" placement="top-start">
                  <td>{{invoiceInfo.contactDto ? invoiceInfo.contactDto.conAddress : ''}}</td>
                </el-tooltip>
              <td>公司地址</td>
              <el-tooltip v-if="invoiceInfo.customerDto"  effect="dark" :content="invoiceInfo.customerDto.customerAddress" placement="top-start">
                <td>{{invoiceInfo.customerDto?invoiceInfo.customerDto.customerAddress:''}}</td>
              </el-tooltip>
            </tr>
            <tr>
              <td>快递单号</td>
              <td>{{invoiceInfo.trackingNo}}</td>
              <td>快递公司</td>
              <td>{{invoiceInfo.expressCompany}}</td>
            </tr>
            <tr v-if="invoiceInfo.invoiceType ==2">
              <td>税号</td>
              <td>{{invoiceInfo.customerDto?invoiceInfo.customerDto.taxNo:''}}</td>
              <td>开户银行</td>
              <td>{{invoiceInfo.bankDto?invoiceInfo.bankDto.bankName:''}}</td>
            </tr>
            <tr v-if="invoiceInfo.invoiceType ==2">
              <td>银行账号</td>
              <td>{{invoiceInfo.bankDto?invoiceInfo.bankDto.bankAccount:''}}</td>
              <td>客户电话</td>
              <td>{{invoiceInfo.customerDto?invoiceInfo.customerDto.telephone:''}}</td>
            </tr>
            <tr v-if="invoiceInfo.status ==4">
              <td>作废原因</td>
              <el-tooltip  effect="dark" :content="invoiceInfo.note" placement="top-start">
                <td>{{invoiceInfo.note}}</td>
              </el-tooltip>
            </tr>
          </table>
          <el-row type="flex"  justify="center">
            <el-table :data="invoiceInfo.listOrderDetail"   border>
              <el-table-column show-overflow-tooltip type="index" label="序号" min-width="40" align="center"> </el-table-column>
              <el-table-column show-overflow-tooltip prop="customerMaterialsId" label="客户物料号" min-width="70" width="110px"  align="center" > </el-table-column>
              <el-table-column show-overflow-tooltip prop="partsName" label="配件名称" min-width="50"  width="100px" align="center"> </el-table-column>
              <el-table-column show-overflow-tooltip prop="specification" label="型号" min-width="40"   align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="unit" label="单位" min-width="40" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="orderCount" label="数量"  min-width="40" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="singlePrice" label="单价"  min-width="40" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip  label="折扣(%)" min-width="50" align="center">
                <span slot-scope="scope">{{scope.row.discount?scope.row.discount:'100'}}</span>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="discountAmount" label="金额" min-width="40" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="mashineType" label="机型"  min-width="40" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip prop="remark" label="备注" min-width="40" align="center"></el-table-column>
            </el-table>
          </el-row>
        </div>
        <div v-else>此订单暂无开票数据</div>
      <!--</el-dialog>-->

    </div>
</template>

<script>
    export default{
      props:{
        value:{
          type:Boolean,
          default:false
        },
        invoiceInfo:{
            type:Object,
        }

      },
      data(){
          return{
            show:this.value
          }
      },
      methods:{
        closeDialog(){
          this.show = false
          this.$emit('input', this.show)
        },
      },
      watch:{
        'value'(n){
          this.show=n
        }
      }

    }
</script>

<style scoped>

</style>
