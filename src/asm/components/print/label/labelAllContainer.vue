/**
* 多标签打印
*/
<template>
    <div id="labelAllContainer" style="display: none">
        <TABLE border=1 cellSpacing=0 cellPadding=0 width="100%">
            <TBODY>
            <tr>
                    <td style="height:55px" v-if="orderDetail.orderSource == 1"><b><font size='3'>杭州永创智能设备股份有限公司</font></b></td>
                        <td style="height:55px" v-if="orderDetail.orderSource == 2"><b><font size='3'>浙江美华包装机械有限公司</font></b></td>
                            <td style="height:55px" v-if="orderDetail.orderSource == 3"><b><font size='3'>佛山市成田司化机械有限公司</font></b></td>
            </tr>
            <tr>
                <td style="height:30px"><span v-if="orderDetail.orderSource == 1">永创</span><span v-if="orderDetail.orderSource == 2">美华</span><span v-if="orderDetail.orderSource == 3">成田司化</span>配件订单号：{{orderDetail.orderNo}}</td>
            </tr>
            <tr>
                <td style="height:30px">客户订单号：{{orderDetail.customerOrderId}}</td>
            </tr>
            <tr>
                <td style="height:30px">订购日期：{{new Date(orderDetail.billDate).pattern("yyyy-MM-dd")}}</td>
            </tr>
            <tr>
                <td style="height:20px"><font size='1'>温馨提醒：快递员送货时，请当面清点，如有异议及时来电</font></td>
            </tr>
            </TBODY></TABLE>
    </div>
</template>
<script>
    export default{
        name: 'labelAllContainer',
        data(){
            return{
            }
        },
        computed: {
            orderDetail(){
                return this.$store.state.moduleOrder.orderDetailData.orderDetail
            }
        },
    }
</script>
<style>
</style>