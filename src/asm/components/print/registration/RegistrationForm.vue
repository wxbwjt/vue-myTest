/**
* 售后业务员收货登记表
*/
<template>
    <div class="ys-print-list" style="display: none;">
        <div style="padding:30px;">
            <div id="regDetail">
                <table class="reg-body" border="0" cellspacing="0" cellpadding="0" style="border-bottom:1px #000000 solid;width: 100% ">
                    <tbody>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border: none"> <h2 style="text-align: center">售后业务员收货登记表</h2></td>
                    </tr>
                    <tr>
                        <td style="text-align: right;border: none" :colspan="showDiscount?8:7">
                            订单来源：
                            <span v-if="orderDetail.orderSource==1">永创订单</span>
                            <span v-else-if="orderDetail.orderSource==2">美华订单</span>
                            <span v-else>成田订单</span>
                        </td>
                    </tr>
                   <tr>
                   <td :colspan="showDiscount?8:7" style="border:none">
                   <table border="0" cellspacing="0" cellpadding="0" width="100%">
                    <tbody>
                        <tr style=";text-align: center">
                        <td style="width:12%">业务员</td>
                        <td style="width:18%">{{orderDetail.operatorText}}</td>
                        <td style="width:12%">下单时间</td>
                        <td style="width:12%">{{orderDetail.billDate?new Date(orderDetail.billDate).pattern('yyyy-MM-dd'):"--"}}</td>
                        <td style="width:12%">订单类型</td>
                        <td style="width:10%">{{orderTypes[orderDetail.orderType-1]}}</td>
                        <td style="width:12%">总价(含税)</td>
                        <td style="border-right:1px #000000 solid;width:12% ">{{orderDetail.totalMoneyWithTax?Number(orderDetail.totalMoneyWithTax).toFixed(2):0.00}}</td>
                    </tr>
                    <tr style="text-align: center">
                        <td>配件订单号</td>
                        <td>{{orderDetail.orderNo}}</td>
                        <td>客户名称</td>
                        <td colspan="5" style="border-right:1px #000000 solid ">{{orderDetail.customer.customerName}}</td>
                    </tr>
                   </tbody>
                   </table>
                   </td>
                   </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border-right:1px #000000 solid ">&nbsp;</td>
                    </tr>
                    <tr v-if="!showDiscount">
                        <td style="width:8%">序号</td>
                        <td style="width:18%">规格型号</td>
                        <td style="width:27%">配件名称</td>
                        <td style="width:6%">单位</td>
                        <td style="width:10%">数量</td>
                        <td style="width:19%">单价(元)</td>
                        <td style="width:12%;border-right:1px #000000 solid ">金额(元)</td>
                    </tr>
                    <tr v-else>
                        <td style="width:8%">序号</td>
                        <td style="width:18%">规格型号</td>
                        <td style="width:22%">配件名称</td>
                        <td style="width:6%">单位</td>
                        <td style="width:10%">数量</td>
                        <td style="width:12%">单价(元)</td>
                        <td style="width:12%">折扣(%)</td>
                        <td style="width:12%;border-right:1px #000000 solid ">金额(元)</td>
                    </tr>
                    <tr v-for="(item,index) in orderDetail.orderDetailDtos">
                        <td align="center">{{index + 1}}</td>
                        <td>{{item.specification}}</td>
                        <td>{{item.partsName}}</td>
                        <td align="center">{{item.unit}}</td>
                        <td align="center">{{item.orderCount}}</td>
                        <td align="right">
                            {{fix(item.singlePrice)}}
                        </td>
                        <td align="right" v-if="showDiscount">{{item.discount}}%</td>
                        <td align="right" style="border-right:1px #000000 solid ">{{Number(item.discountAmount).toFixed(2)}}</td>
                    </tr>
                    <tr v-if="showDiscount">
                        <td :colspan="showDiscount?6:5" style='padding-left:200px'>总体折扣</td>
                        <td align="right">{{orderDetail.discount?orderDetail.discount:0}}%</td>
                        <td align="right" style="border-right:1px #000000 solid ">{{sum.toFixed(2)}}</td>
                    </tr>
                    <tr  v-if="orderDetail.includedTax == 2">
                        <td :colspan="showDiscount?7:6" style='padding-left:200px'>总价（不含税）</td>
                        <td align="right" style="border-right:1px #000000 solid ">{{orderDetail.totalMoneyWithoutTax?Number(orderDetail.totalMoneyWithoutTax).toFixed(2):0.00}}</td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?7:6" style='padding-left:200px'>总价（含税）</td>
                        <td align="right" style="border-right:1px #000000 solid ">{{orderDetail.totalMoneyWithTax?Number(orderDetail.totalMoneyWithTax).toFixed(2):0.00}}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;padding:10px 5px;border-right:1px #000000 solid  " :colspan="showDiscount?8:7">备注</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 5px " colspan="3">业务员签字</td>
                        <td style="padding:10px 5px ;border-right:1px #000000 solid " :colspan="showDiscount?5:4">发货日期</td>
                    </tr>
                    <tr>
                        <td style="padding:10px 5px;" colspan="3">经理审核签字</td>
                        <td style="padding:10px 5px ;border-right:1px #000000 solid " :colspan="showDiscount?5:4">发货信息</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'RegistrationForm',
        methods:{
            fix(val){
                if(val){
                    let num = val.toString().split('.')[1]
                    if(num&&num.length>2){
                        return Number(val).toFixed(4)
                    }
                }
                return Number(val).toFixed(2)
            }
        },
        computed:{
            orderTypes(){
                return this.$store.state.moduleOrder.enumsList.orderTypes;
            },
            orderDetail(){
                return this.$store.state.moduleOrder.orderDetailData.orderDetail;
            },
            showDiscount(){
                let discountFlag = true
                if(this.orderDetail.orderDetailDtos){
                this.orderDetail.orderDetailDtos.map((item)=>{
                    if(item.discount != 100 && item.discount){
                        discountFlag = false
                    }
                    }
                )
                }else{
                    return false
                }
                return !(this.orderDetail.discount == 100 && discountFlag)
            },
            sum(){
                let sum = 0
                if(this.orderDetail.orderDetailDtos){
                this.orderDetail.orderDetailDtos.map((item)=>{
                    sum += item.discountAmount
                    }
                )
                }
                return sum
            }
        }
    }
</script>
<style>
</style>