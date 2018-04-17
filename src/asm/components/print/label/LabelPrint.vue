/**
* 标签打印
*/
<template>
    <div style="display: none">
        <div :id="'divOrderItem'+index" v-for="(item,index) in list" >
            <table width="100%" cellspacing="0" cellpadding="0" border="1" style=" font-family: initial;font-size:15px">
                <tr>
                    <td><strong>配件名称：{{ item.partsName }}</strong></td>
                </tr>
                <tr>
                    <td><strong>配件型号：{{ item.specification }}</strong></td>
                </tr>
                <tr>
                    <td><strong>机型：{{ item.mashineType }}</strong></td>
                </tr>
                <tr>
                    <td><strong>客户物料号：{{ item.customerMaterialsId }}</strong></td>
                </tr>
                <tr>
                    <td><strong>数量：{{ item.orderCount }}</strong></td>
                </tr>
                <tr>
                    <td><span v-if="orderSourceId == '1'">永创</span><span v-if="orderSourceId == '2'"> 美华 </span><span v-if="orderSourceId == '3'"> 成田</span>配件订单号：{{ item.orderNo }}<span style="display: inline-block; padding-left: 20px;">({{ operator.businessCode }})</span></td>
                </tr>
                <tr>
                    <td>客户订单号：{{ custOrderId }}</td>
                </tr>
                <tr>
                    <td>产品合格，准予出厂</td>
                </tr>
                <tr v-if="list.length>1">
                    <td align="center">第{{ index+1 }}项</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'LabelPrint',
        props:{
            value:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return{
                list:this.value
            }
        },
        computed:{
            orderBaseInfo(){
                return this.$store.state.moduleOrder.orderBaseInfo
            },
            operator(){
                return this.$store.state.moduleOrder.orderDetailData.operator
            },
            orderSourceId:function () {
                return this.$store.state.moduleOrder.orderDetailData.orderDetail.orderSource;
            },
            custOrderId:function () {
                return this.$store.state.moduleOrder.orderDetailData.orderDetail.customerOrderId;
            },
        },
        watch:{
            'value'(){
                this.list = this.value
            }
        }
    }
</script>
<style>
</style>