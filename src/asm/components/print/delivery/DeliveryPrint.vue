/**
* 打印送货单
*/
<template>
    <div style="display: none">
        <div id="div1">
            <TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
                <TBODY>
                <tr>
                    <td align='left' style="height:25px"> <span v-if="orderDetail.orderSource == 1">永创</span><span v-if="orderDetail.orderSource == 2">美华</span><span v-if="orderDetail.orderSource == 3">成田司化</span>配件订单号：{{orderBaseInfo.orderNo}}</td>
                    <td align='right' style="height:25px"><span tdata='pageNO'>第##页</span><span tdata='pageCount'>共##页</span></td>
                </tr>
                <tr>
                    <td align='center' colspan='2' style="height:25px">
                        <img v-if="orderDetail.orderSource == 1" style="position:absolute;right:150px" src="/ys-web-asmservice/static/print/stamp.jpg" />
                        <font size="5" v-if="orderDetail.orderSource == 1"><b>配件送货单<br/>杭州永创智能设备股份有限公司</b></font>
                        <font size="5" v-if="orderDetail.orderSource == 2"><b>配件送货单<br/>浙江美华包装机械有限公司</b></font>
                        <font size="5" v-if="orderDetail.orderSource == 3"><b>配件送货单<br/>佛山市成田司化机械有限公司</b></font>
                    </td>
                </tr>
                <tr>
                    <td align='left' style="height:25px;width:70%;">客户名称：{{orderBaseInfo.customerName}}
                        <span v-if="orderBaseInfo.sendAddress.length<=20"><br/>客户地址：{{orderBaseInfo.sendAddress }}</span>
                        <span v-else><br/>客户地址：{{orderBaseInfo.sendAddress.substring(0,21) }}
                    <br/>{{orderBaseInfo.sendAddress.substring(21,orderBaseInfo.sendAddress.length) }}</span>
                    </td>
                    <td align='right' style="height:25px">NO：{{orderBaseInfo.serialId }}
                        <br/>{{orderBaseInfo.billDate.substring(0,10) }}</td>
                </tr>
                <tr>
                    <TD style="height:25px" colspan='2'>联系人：{{orderBaseInfo.customer.contact }}&nbsp;&nbsp;
                        手机：{{orderBaseInfo.customer.conMobile }}&nbsp;&nbsp;
                        电话：{{orderBaseInfo.customer.telephone }}</td>
                </tr>
                <tr>
                    <td align='left' style="height:25px">客户订单号：{{orderBaseInfo.customerOrderId }}</td>
                    <td v-if="orderDetail.orderSource!= 2" align='right'>总价(含税)：{{value.rptInfo.includedTaxTotal }}</td>
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
                    <TD width="8%" align=center v-if="orderDetail.orderSource!= 2"><b>单价</b></td>
                    <TD width="5%" align=center v-if="orderDetail.orderSource!= 2&&value.rptInfo.detailDisFlag"><b>折扣</b></td>
                    <TD width="8%" align=center v-if="orderDetail.orderSource!= 2"><b>总金额</b></td>
                    <TD width="8%" align=center ><b>已发数</b></td>
                    <TD width="8%" align=center v-if="show"><b>本次发货数</b></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item,i in value.orderDeliverys">
                    <td align='center'>{{i + 1 }}</td>
                    <td align='center'>{{item.customerMaterialsId }}</td>
                    <td align='center'>{{item.specification }}</td>
                    <td align='center'>{{item.partsName }}</td>
                    <td align='center'>{{item.unit }}</td>
                    <td align='center'>{{item.orderCount }}</td>
                    <td align='right'v-if="orderDetail.orderSource!= 2">{{item.singlePrice.toFixed(value.rptInfo.dotFlag ?4:2) }}</td>
                    <TD width="5%" align=center v-if="orderDetail.orderSource!= 2&&value.rptInfo.detailDisFlag">{{item.discount.toString()+"%" }}</td>
                    <td align='center'v-if="orderDetail.orderSource!= 2">
                        {{(Number(item.singlePrice) * Number(item.orderCount) * Number(item.discount) / 100).toFixed(2) }}
                    </td>
                    <td align='right' v-if="item.cancelAuditCount == 0">0</td>
                    <td align='right' v-else-if="show">{{Number(item.orderCount) - Number(item.deliver) - Number(item.deliveryBalance) }}</td>
                    <td align='right' v-else>{{Number(item.orderCount) - Number(item.deliveryBalance) }}</td>
                    <td align='right'v-if="item.cancelAuditCount == 0&&show">0</td>
                    <td align='right' v-if="item.cancelAuditCount != 0&&show">{{item.deliver }}</td>
                </tr>
                <tr v-if="orderDetail.orderSource!= 2&&value.rptInfo.orderDisFlag">
                    <td align='center' colspan='7' v-if="value.rptInfo.detailDisFlag">总体折扣:</td>
                    <td align='center' colspan='6' v-else>总体折扣:</td>
                    <td align="center">{{value.rptInfo.discount.toString()+"%" }}</td>
                    <td align="center">{{value.rptInfo.detailDisTotal.toFixed(2) }}</td>
                </tr>
                <tr  v-if="orderDetail.orderSource!= 2&&value.rptInfo.includedTax !=1">
                    <td align='center' colspan='8' v-if="value.rptInfo.detailDisFlag">总价(不含税):</td>
                    <td align='center' colspan='7' v-else>总价(不含税):</td>
                    <td align="center" colspan='1'>{{value.rptInfo.totalAmount.toFixed(2) }}</td>
                </tr>
                <tr  v-if="orderDetail.orderSource!= 2">
                    <td align='center' colspan='8' v-if="value.rptInfo.detailDisFlag">总价(含税):</td>
                    <td align='center' colspan='7' v-else>总价(含税):</td>
                    <td align="center" colspan='1'>{{value.rptInfo.includedTaxTotal }}</td>
                </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>
<script>
    export default{
        name: 'DeliveryPrint',
        props:{
            value:{
                type:Object,
                default(){
                    return{
                        orderDeliverys:[],
                        rptInfo:{
                            totalAmount:0,
                            detailDisTotal:0,
                        }
                    }
                },
            },
            show:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return{
            }
        },
        computed:{
            orderDetail(){
                return this.$store.state.moduleOrder.orderDetailData.orderDetail
            },
            orderBaseInfo(){
                return this.$store.state.moduleOrder.orderBaseInfo
            }
        }
    }
</script>
<style>
</style>