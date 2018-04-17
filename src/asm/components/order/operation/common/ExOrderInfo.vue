/**
* 原订单信息
*/
<template>
    <el-card>
        <div slot="header"  class="search-head"><span><i class="fa fa-tag"></i>原订单信息</span></div>
        <table class="info-table" style="font-size: 14px;">
            <tbody>
            <tr>
                <td>客户名称:</td>
                <td>
                    {{detail.customer.customerName}}
                </td>
                <td>单据流水号:</td>
                <td>{{detail.serialId}}</td>
                <td>客户订单号:</td>
                <td>{{detail.customerOrderId}}</td>
            </tr>
            <tr>
                <td>订单类型:</td>
                <td>{{orderTypes[detail.orderType-1]}}</td>
                <td>付款方式:</td>
                <td>{{payMethod[detail.payMethod-1] }}</td>
                <td v-if="$route.name=='receiveCfm'">凭证:</td>
                <td v-else>状态:</td>
                <td v-if="$route.name=='receiveCfm'" style="white-space: normal"><upload-file v-if="imglistStr" :fileslink="imglistStr"></upload-file></td>
                <td v-else>{{orderStatus[detail.status-1]}}</td>
            </tr>
            <tr>
                <td>报价日期:</td>
                <td>{{detail.createdTime}}</td>
                <td>下单日期:</td>
                <td>{{detail.billDate}}</td>
                <td>订单来源:</td>
                <td v-if="detail.orderSource==1">永创订单</td>
                <td v-else-if="detail.orderSource==2">美华订单</td>
                <td v-else>成田订单</td>
            </tr>
            <tr>
                <td>业务员:</td>
                <td>{{detail.operatorText}}</td>
                <td>联系人:</td>
                <td>{{detail.customer.contact}}</td>
                <td>手机:</td>
                <td>{{detail.customer.conMobile}}</td>
            </tr>
            <tr>
                <td>电话:</td>
                <td>{{detail.customer.telephone}}</td>
                <td>邮箱:</td>
                <td>{{detail.customer.conEmail}}</td>
                <td>客户地址:</td>
                <td>{{detail.customer.address}}</td>
            </tr>
            <tr>
                <td>备注:</td>
                <td colspan="5">{{detail.remark}}</td>
            </tr>
            </tbody>
        </table>
        <el-table border style="margin-top: 20px" :data="list" v-if="show">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="客户物料号"   prop="customerMaterialsId" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="配件名称" prop="partsName" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="型号" min-width="50" prop="specification" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="单位" width="50" prop="unit" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="数量" width="50" prop="orderCount" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="单价" min-width="50" prop="singlePrice" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="折扣(%)" width="70" prop="discount" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="金额" min-width="60"  prop="discountAmount" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="机型" min-width="60"  prop="mashineType" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="仓库" min-width="50" prop="repertoryId" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{storeList[scope.row.repertoryId]}}
                </template>
            </el-table-column>
            <el-table-column label="备注"min-width="60"  prop="remark"  :show-overflow-tooltip="true"></el-table-column>
        </el-table>
    </el-card>
</template>
<script>
    import UploadFile from "../../../common/UploadFile";
    export default{
        components: {UploadFile},
        name: 'ExOrderInfo',
        props:{
           detail: {
               Object,
               default(){
                   return {
                       customer: {
                           customerName: '',
                           conMobile: '',
                           contact: '',
                           telephone: '',
                           conEmail: '',
                           address: ''
                       },
                       serialId: '',
                       customerOrderId: '',
                       orderType: '',
                       payMethod: '',
                       status: '',
                       createdTime: '',
                       billDate: '',
                       orderSource: '',
                       operatorText: '',
                       remark: '',
                   }
               }
           },
            list:{
               type:Array,
                default(){
                   return []
                }
            },
            show:{
               type :Boolean,
                default:true
            }
        },
        data(){
            return {
            }
        },
        computed:{
            imglistStr:function () {
                let imgList = this.detail.photoFileNameList?this.detail.photoFileNameList:[];
                if(imgList.length>1){
                    return imgList.join(',');

                }else {
                    return imgList[0];
                }

            },
            storeList(){return this.$store.state.moduleOrder.enumsList.repertoryNames},
            orderTypes(){
                return this.$store.state.moduleOrder.enumsList.orderTypes
            },
            orderStatus(){
                return this.$store.state.moduleOrder.enumsList.orderStatus
            },
            payMethod(){
                return this.$store.state.moduleOrder.enumsList.payMethod
            },
            includedTax(){
                return this.$store.state.moduleOrder.enumsList.includedTax
            },
        }
    }
</script>
<style>
</style>