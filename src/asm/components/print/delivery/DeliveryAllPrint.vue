/**
* 总送货单
*/
<template>
<div>
    <div id="div1">
        <TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
            <TBODY>

            <tr>
                <td align='left' style="height:25px"><span v-if="orderDetail.orderSource == 1">永创</span><span v-if="orderDetail.orderSource == 2">美华</span><span v-if="orderDetail.orderSource == 3">成田司化</span>配件订单号：<%= JSON.parse($orderBaseInfo).orderNo %></td>
                <td align='right' style="height:25px"><span tdata='pageNO'>第##页</span><span tdata='pageCount'>共##页</span></td>
            </tr>
            <tr>
                <td align='center' colspan='2' style="height:25px">
                    <span v-if="orderDetail.orderSource == 1">
                    <font size="5"><b>配件送货单<br/>杭州永创智能设备股份有限公司</b></font>
                     </span><span v-if="orderDetail.orderSource == 2">
                    <font size="5"><b>配件送货单<br/>浙江美华包装机械有限公司</b></font>
                   </span><span v-if="orderDetail.orderSource == 3">
                    <font size="5"><b>配件送货单<br/>佛山市成田司化机械有限公司</b></font>
                     </span>
                </td>
            </tr>

            <tr>
                <td align='left' style="height:25px;width:70%;">客户名称：<%= JSON.parse($orderBaseInfo).customerName %>
                    <!--<br/>客户地址：<%= JSON.parse($orderBaseInfo).sendAddress %></td>-->
                    <!--<br/>客户地址：<%= JSON.parse($orderBaseInfo).sendAddress.substring(0,21) %>-->
                    <!--<br/><%= JSON.parse($orderBaseInfo).sendAddress.substring(21,JSON.parse($orderBaseInfo).sendAddress.length) %> </td>-->
                <td align='right' style="height:25px">NO：<%= JSON.parse($orderBaseInfo).serialId %>
                    <br/><%= JSON.parse($orderBaseInfo).billDate.substring(0,10) %></td>
            </tr>

            <tr>
                <TD style="height:25px" colspan='2'>联系人：<%= JSON.parse($orderBaseInfo).customer.contact %>&nbsp;&nbsp;
                    手机：<%= JSON.parse($orderBaseInfo).customer.conMobile %>&nbsp;&nbsp;
                    电话：<%= JSON.parse($orderBaseInfo).customer.telephone %></td>
            </tr>

            <tr>
                <td align='left' style="height:25px">客户订单号：<%= $customerOrderId %></td>
                <td align='right' v-if="orderDetail.orderSource != 2">总价(含税)：<%= this.rptInfo.includedTaxTotal %></td>
            </tr>
            </TBODY>
        </TABLE>
    </div>

    <div id="div2">

        <TABLE border=1 cellSpacing=0 cellPadding=1 width="100%" style="border-collapse:collapse" bordercolor="#333333">
            <thead>
            <tr>
                <TD width="5%" align=center><b>序号</b></td>
                <TD width="10%" align=center><b>客户物料号</b></td>
                <TD width="18%" align=center><b>规格型号</b></td>
                <TD width="24%" align=center><b>配件名称</b></td>
                <TD width="5%" align=center><b>单位</b></td>
                <TD width="6%" align=center><b>购买<br/>数量</b></td>
                <TD width="8%" align=center v-if="orderDetail.orderSource != 2"><b>单价</b></td>
                <TD width="5%" align=center><b>折扣</b></td>
                <TD width="8%" align=center><b>总金额</b></td>
                <TD width="8%" align=center><b>已发数</b></td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <!--<td align='center'><%= i + 1 %></td>-->
                <!--<td align='center'><%= item.customerMaterialsId %></td>-->
                <!--<td align='center'><%= item.specification %></td>-->
                <!--<td align='center'><%= item.partsName %></td>-->
                <!--<td align='center'><%= item.unit %></td>-->
                <!--<td align='center'><%= item.orderCount %></td>-->
                <!--<td align='right'v-if="orderDetail.orderSource != 2"><%= item.singlePrice.toFixed(this.rptInfo.dotFlag ?4:2) %></td>-->
                <!--<TD width="5%" align=center><%= item.discount.toString()+"%" %></td>-->
                <!--<td align='center'>-->
                <!--<%= detailAmt.toFixed(2) %>-->
                <!--</td>-->
                <!--<td align='right'>0</td>-->
                <!--<td align='right'>0</td>-->
                <!--<td align='right'><%= Number(item.orderCount) - Number(item.deliver) - Number(item.deliveryBalance) %></td>-->
            </tr>
            <tr v-if="orderDetail.orderSource != 2">
                <td align='center' colspan='7' >总体折扣:</td>
                <!--<td align='center' colspan='6' >总体折扣:</td>-->
                <td align="center"><%= this.rptInfo.discount.toString()+"%" %></td>
                <td align="center"><%= this.rptInfo.detailDisTotal.toFixed(2) %></td>
                <td ></td>
            </tr>

            <tr>

                <td align='center' colspan='8' >总价(不含税):</td>
                <!--<td align='center' colspan='7' >总价(不含税):</td>-->
                <td align="center" colspan='1'><%= this.rptInfo.totalAmount.toFixed(2) %></td>
                <td ></td>
            </tr>

            <tr>
                <td align='center' colspan='8' >总价(含税):</td>
                <!--<td align='center' colspan='7' >总价(含税):</td>-->
                <td align="center" colspan='1'><%= this.rptInfo.includedTaxTotal %></td>
                <td ></td>
            </tr>
            </tbody>
        </table>

    </div>

</div>
</template>
<script>
    export default{
        name: 'DeliveryAllPrint',
    }
</script>
<style>
</style>