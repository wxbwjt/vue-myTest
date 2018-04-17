/**
* 打印领料单
*/
<template>
    <div style="display: none">
        <div id="pickHeader_top">
            <TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
                <tbody>
                <tr>
                    <td align='left' colspan='2' >
    	                <span style="float:left">
                            <span v-if="orderDetail.orderSource == 1">永创</span><span v-if="orderDetail.orderSource == 2">美华</span><span v-if="orderDetail.orderSource == 3">成田司化</span>配件订单号：{{orderBaseInfo.orderNo}}
		                </span>
                        <span style="float:right;text-align:right">
			                <span tdata='pageNO' style="float:right;text-align:right">第##页</span><span tdata='pageCount'>共##页</span>
		                </span>
                    </td>
                </tr>
                </tbody>
            </TABLE>
        </div>
        <div id="pickHeader_center">
            <TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
                <tbody>
                <tr>
                    <td style="width:40%;height:73px" align='left'>
                      <!--  <img style='margin-top:2px;margin-left:-10px;'/> -->
                    </td>
                    <td align='left' style="height: 73px;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                        <span v-if="orderDetail.orderSource == 1">
                    <font size="6"><b>配件领料单</b></font><br/>
                    <font size="4"><b>杭州永创智能设备股份有限公司</b></font>
                  </span><span v-if="orderDetail.orderSource == 2">
                    <font size="6"><b>美华领料单</b></font><br/>
                    <font size="4"><b>浙江美华包装机械有限公司</b></font>
                  </span><span v-if="orderDetail.orderSource == 3">
                    <font size="6"><b>配件领料单</b></font><br/>
                    <font size="4"><b>佛山市成田司化机械有限公司</b></font>
                </span>
                    </td>
                </tr>
                </tbody>
            </TABLE>
        </div>
        <div id="pickHeader_bottom">
            <TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
                <tbody>
                <tr>
                    <td style="height:25px;" align='left' colspan='2' >
                        <span style="float:left"> 客户名称：{{orderBaseInfo.customerName}}</span>
                        <span style="float:right;text-align:right"> NO：{{orderBaseInfo.serialId}}<br/>
                                     {{orderBaseInfo.billDate?orderBaseInfo.billDate.substring(0,10):""}}
                         </span>
                    </td>
                </tr>
                </tbody>
            </TABLE>
        </div>
        <div :id="'pickDetail'+index" v-for="item,index in data">
            <TABLE border=1 cellSpacing=0 cellPadding=1 width="100%" style="border-collapse:collapse" bordercolor="#333333">
                <thead>
                <tr>
                    <td width="5%" align=center><b>序号</b></td>
                    <td width="9%" align=center><b>客户物料号</b></td>
                    <td width="16%" align=center><b>型号</b></td>
                    <td width="18%" align=center><b>配件名称</b></td>
                    <td width="6%" align=center><b>单位</b></td>
                    <td width="7%" align=center><b>购买<br/>数量</b></td>
                    <td width="6%" align=center><b>实领数</b></td>
                    <td width="6%" align=center><b>未领数</b></td>
                    <td width="10%" align=center><b>机型</b></td>
                    <td width="7%" align=center><b>订单<br/>类型</b></td>
                    <td width="10%" align=center><b>备注</b></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="obj in item.data">
                    <td align='center'>{{ obj.current + 1}}</td>
                    <td align='center'>{{ obj.customerMaterialsId}}</td>
                    <td align='center'>{{ obj.specification}}</td>
                    <td align='left'>{{ obj.partsName}}</td>
                    <td align='center'>{{ obj.unit}}</td>
                    <td align='center'>{{ obj.orderCount}}</td>
                    <td align='center'>{{ obj.requisition}}</td>
                    <td align='center'>{{ obj.unRequisition}}</td>
                    <td align='center'>{{ obj.mashineType}}</td>
                    <td align='center'>{{ orderTypes[orderDetail.orderType-1]}}</td>
                    <td align='center' v-for="model in orderDetail.orderDetailDtos" v-if="model.id == obj.id">{{ model.remark}}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td rowspan='2' colspan='3'>备注：{{orderBaseInfo.remark}}</td>
                    <td rowspan='2' colspan='2'>发货厂区：{{item.data[0].repertoryName}}</td>
                    <td colspan='3' align='right'>发货人签字：</td>
                    <td colspan='3' align='left'></td>
                </tr>
                <tr>
                    <td align='right' colspan='3'>发货时间：</td>
                    <td align='left' colspan='3'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
                </tr>
                <tr>
                    <td colspan='3'>财务主管：</td>
                    <td colspan='2'>下单员：{{orderBaseInfo.userName}}</td>
                    <td colspan='6'>领货人：</td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'PickPrint',
        props:{
          data:{
              type:Array,
              default(){
                  return[]
              }
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
            orderTypes(){
              return this.$store.state.moduleOrder.enumsList.orderTypes
            },
            orderBaseInfo(){
                return this.$store.state.moduleOrder.orderBaseInfo
            }
        }
    }
</script>
<style>
</style>