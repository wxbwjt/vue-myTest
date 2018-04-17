/**
* 打印报价单头部
*/
<template>
    <table  style="width:750px;" cellpadding="3px">
        <tbody>
        <tr>
            <td style="font-size:28px;font-weight:bold;width:50%;text-align:center">销售报价单</td>
            <td><img  v-if="orderDetail.orderSource == 1" style="position:absolute" src="/ys-web-asmservice/static/print/stamp.jpg" /></td>
        </tr>
        <tr>
            <td style="background-color:#C0C0C0;height:70px;font-size:50px;font-weight:bolder;font-style:italic;text-align:center"><span v-if="orderDetail.orderSource == 1">YOUNGSUN</span><span v-if="orderDetail.orderSource == 2">MEIWA</span><span v-if="orderDetail.orderSource == 3">CTSH</span></td>
            <td valign="top" style="font-weight:bold;font-size:22px;"><span v-if="orderDetail.orderSource == 1">永创智能（股票代码：603901）</span><span v-if="orderDetail.orderSource == 2">美华包装</span><span v-if="orderDetail.orderSource == 3">成田司化</span></td>
        </tr>
        <tr>
            <td id="printCustomerName" >全&nbsp;&nbsp;称：{{orderDetail.customer.customerName}}</td>
            <td><span v-if="orderDetail.orderSource == 1">杭州永创智能设备股份有限公司</span><span v-if="orderDetail.orderSource == 2">浙江美华包装机械有限公司</span><span v-if="orderDetail.orderSource == 3">佛山市成田司化机械有限公司</span></td>
        </tr>
        <tr>
            <td>联系人：{{orderDetail.customer.contact}}</td>
            <td>杭州三墩西湖科技园西园七路2号</td>
        </tr>
        <tr>
            <td>联系手机：{{orderDetail.customer.conMobile}}</td>
            <td>报价电话：{{user.mobile}}/{{user.phone}}</td>
        </tr>
        <tr>
            <td>联系电话：{{orderDetail.customer.telephone}}</td>
            <td>传&nbsp;&nbsp;&nbsp;&nbsp;真：0571-81020190/81020191</td>
        </tr>
        <tr>
            <td>传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真：{{orderDetail.customer.fax}}</td>
            <td>电子邮件：{{user.email}}</td>
        </tr>
        <tr>
            <td>电子邮件：{{orderDetail.customer.conEmail}}</td>
            <td>报价人：{{user.name}}</td>
        </tr>
        <tr>
            <td>关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;于：配件报价</td>
            <td>报价时间：{{orderDetail.createdTime?new Date(orderDetail.createdTime).pattern("yyyy-MM-dd"):""}}</td>
        </tr>
        <tr>
            <td colspan='2'>联系地址：{{orderDetail.customer.address}}</td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    export default{
        name: 'Head',
        data(){
            return{
            }
        },
        computed:{
            orderDetail(){
                return this.$store.state.moduleOrder.orderDetailData.orderDetail;
            },
            user(){
                return this.$store.state.moduleOrder.orderDetailData.operator
            }
        }
    }
</script>
<style>
</style>