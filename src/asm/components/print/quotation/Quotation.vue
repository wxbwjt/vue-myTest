/**
* 打印报价单
*/
<template>
    <div class="ys-print-list" style="display: none;">
        <div style="padding:30px;">
            <div id="divHeader">
                <print-head></print-head>
                <hr style="width:97%;text-align:left;" align="left">
            </div>
            <div id="divDetail">
                <table class="parts-body" border="0" cellspacing="0" cellpadding="0" >
                    <thead>
                    <tr v-if="!showDiscount">
                        <th style="width:8%">序号</th>
                        <th style="width:23%">规格型号</th>
                        <th style="width:27%">配件名称</th>
                        <th style="width:8%">单位</th>
                        <th style="width:10%">数量</th>
                        <th style="width:12%">单价(元)</th>
                        <th style="width:12%">金额(元)</th>
                    </tr>
                    <tr v-else>
                        <th style="width:8%">序号</th>
                        <th style="width:18%">规格型号</th>
                        <th style="width:22%">配件名称</th>
                        <th style="width:8%">单位</th>
                        <th style="width:10%">数量</th>
                        <th style="width:12%">单价(元)</th>
                        <th style="width:10%">折扣(%)</th>
                        <th style="width:12%">金额(元)</th>
                    </tr>
                    </thead>
                    <tbody>
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
                        <td align="right">{{Number(item.discountAmount).toFixed(2)}}</td>
                    </tr>
                    <tr v-if="showDiscount">
                        <td colspan="6" style='padding-left:200px'>总体折扣</td>
                        <td align="right">{{orderDetail.discount?orderDetail.discount:0}}%</td>
                        <td align="right">{{sum.toFixed(2)}}</td>
                    </tr>
                    <tr  v-if="orderDetail.includedTax == 2">
                        <td :colspan="showDiscount?7:6" style='padding-left:200px'>总价（不含税）</td>
                        <td align="right">{{orderDetail.totalMoneyWithoutTax?Number(orderDetail.totalMoneyWithoutTax).toFixed(2):0.00}}</td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?7:6" style='padding-left:200px'>总价（含税）</td>
                        <td align="right">{{orderDetail.totalMoneyWithTax?Number(orderDetail.totalMoneyWithTax).toFixed(2):0.00}}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border:none">
                            <print-foot></print-foot>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import PrintHead from "./PrintHead";
    import PrintFoot from "./PrintFoot";
    export default{
        components: {
            PrintFoot,
            PrintHead},
        name: 'Quotation',
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
    .parts-body{
        border-collapse: collapse;
        width:100%;
    }

    .parts-body thead tr th{
        border-style:solid;
        border-width:1px 1px 1px 1px;
        border-color:#000000;
    }

    .parts-body tbody tr td{
        border-style:solid;
        border-width:0px 1px 1px 1px;
        border-color:#000000;
    }
</style>