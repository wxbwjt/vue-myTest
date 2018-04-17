/**
* 开票打印
*/
<template>
    <div id="invoicePrintContainer" style="display: none">
    <div id="invoicePrints1">
        <TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">
            <TBODY>
            <tr>
                <td align='left' style="width:70%;height:25px"><span v-if="orderDetail.orderSource == 1">永创</span><span v-if="orderDetail.orderSource == 2">美华</span><span v-if="orderDetail.orderSource == 3">成田司化</span>配件订单号：{{orderBaseInfo.orderNo}}</td>
                <td align='right' style="height:25px"><span tdata='pageNO'>第##页</span><span tdata='pageCount'>共##页</span></td>
            </tr>
            <tr>
                <td align='center' colspan='2' style="height:25px">
                   <span v-if="orderDetail.orderSource == 1">
                    <font size="5"><b>配件开票明细单<br/>杭州永创智能设备股份有限公司</b></font>
                    </span><span v-if="orderDetail.orderSource == 2">
                    <font size="5"><b>配件开票明细单<br/>浙江美华包装机械有限公司</b></font>
                     </span><span v-if="orderDetail.orderSource == 3">
                    <font size="5"><b>配件开票明细单<br/>佛山市成田司化机械有限公司</b></font>
                    </span>
                </td>
            </tr>
            <tr>
                <td align='left' style="height:25px" v-if="value.invoiceDetail.invoiceTitle.length<=20">客户名称：{{value.invoiceDetail.invoiceTitle}}</td>
                <td align='left' style="height:25px" v-else>客户名称：{{value.invoiceDetail.invoiceTitle.substring(0,21)}}
                    <br/>{{value.invoiceDetail.invoiceTitle.substring(21,value.invoiceDetail.invoiceTitle.length)}} </td>
                <td align='right' style="height:25px">NO：{{orderBaseInfo.serialId}}</td>
            </tr>
            <tr>
                <TD style="height:25px">联系人：{{value.invoiceDetail.contactDto.contact}}&nbsp;&nbsp;
                    手机：{{value.invoiceDetail.contactDto.conMobile}}&nbsp;&nbsp;
                    电话：{{value.invoiceDetail.contactDto.conTelephone}}
                </td>
                <td align='right' style="height:25px">下单日期：{{orderBaseInfo.billDate.substring(0,10)}}</td>
            </tr>

            <tr>
                <td align='left' style="height:25px">客户订单号：{{orderBaseInfo.customerOrderId}}</td>
                <td align='right' style="height:25px">开票日期：
                    <span>{{value.invoiceDetail.pendingDate?new Date(value.invoiceDetail.pendingDate).pattern("yyyy-MM-dd"):''}}</span>
                </td>
            </tr>
            <tr>
                <td align='left' style="height:25px">发票号：{{value.invoiceDetail.invoiceNo}}</td>
                <td align='right'>总价(含税): {{includedTaxTotal}}</td>
            </tr>
            </TBODY>
        </TABLE>
    </div>

        <div id="invoicePrints2">
            <TABLE border=1 cellSpacing=0 cellPadding=1 width="100%" style="border-collapse:collapse" bordercolor="#333333">

                <tr>
                    <TD width="5%" align=center><b>序号</b></td>
                    <TD width="9%" align=center><b>客户物料号</b></td>
                    <TD width="18%" align=center><b>规格型号</b></td>
                    <TD width="24%" align=center><b>配件名称</b></td>
                    <TD width="5%" align=center><b>单位</b></td>
                    <TD width="6%" align=center><b>购买<br/>数量</b></td>
                    <TD width="8%" align=center><b>单价</b></td>
                    <TD width="8%" align=center v-if="discountFlag"><b>折扣</b></td>
                    <TD width="8%" align=center><b>总金额</b></td>
                </tr>

                <tr v-for="item,i in value.invoiceDetail.listOrderDetail">
                    <td align='center'>{{i + 1}}</td>
                    <td align='center'>{{item.customerMaterialsId}}</td>
                    <td align='center'>{{item.specification}}</td>
                    <td align='center'>{{item.partsName}}</td>
                    <td align='center'>{{item.unit}}</td>
                    <td align='center'>{{item.orderCount}}</td>
                    <td align='right'>
                        {{parsePrice(item.singlePrice)}}
                    </td>
                    <td align='center' v-if="discountFlag&&item.discount">{{item.discount+"%"}}</td>
                    <td align='center'v-if="discountFlag&&item.discount===undefined">{{100+"%"}}</td>
                    <td align='center'>{{(Number(item.discountAmount)).toFixed(2)}}</td>
                </tr>

                <tr v-if="orderDisCount">
                    <td align='center' :colspan='discountFlag?7:6'>总体折扣:</td>
                    <td align="center">{{value.order.discount.toString()+"%"}}</td>
                    <td align="center">{{detailDisTotal.toFixed(2)}}</td>
                </tr>


                <tr v-if="orderBaseInfo.includedTax !=1">
                    <td align='center' colspan='7' >总价(不含税):</td>
                    <td align="center" :colspan='discountFlag?2:1'>{{totalAmount.toFixed(2)}}</td>
                </tr>

                <tr>
                    <td align='center' colspan='7' >总价(含税):</td>
                    <td align="center" :colspan='discountFlag?2:1'>{{includedTaxTotal}}</td>
                </tr>

        </TABLE>
    </div>
    </div>

</template>
<script>
    export default{
        name: 'InvoicePrint',
        props:{
          value:{
              type:Object,
              default(){
                  return {
                      order:{
                          discount:""
                      },
                      invoiceDetail:{
                          invoiceTitle:"",
                          listOrderDetail:[],
                          contactDto:{},
                      }
                  }
              }
          }
        },
        data(){
            return{
            }
        },
        methods:{
            parsePrice(val){
              var index = val.toString().indexOf(".");
              var newStr = val.toString().substring( index + 1 );
              if ( ( index != -1 )  && ( newStr.length > 2 ) ){
                  return val.toFixed(4)
              }else{
                  return val.toFixed(2)
              }
          }
        },
        computed:{
            orderDetail(){
                return this.$store.state.moduleOrder.orderDetailData.orderDetail;
            },
            orderBaseInfo(){
                return this.$store.state.moduleOrder.orderBaseInfo
            },
            orderDisCount(){
               return !(this.value.order.discount == 100 || this.value.order.discount == '' || this.value.order.discount ===undefined)
            },
            discountFlag(){
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
            detailDisTotal(){
                let orderTotal = 0
                let detailDisTotal = 0
                for (var i = 0; i < this.value.invoiceDetail.listOrderDetail.length; i++) {
                    var items = this.value.invoiceDetail.listOrderDetail[i];
                    if (items.discount) {
                        var total = Number((Number(items.singlePrice) * Number(items.orderCount) * Number(items.discount) / 100).toFixed(2));
                    } else {
                        var total = Number((Number(items.singlePrice) * Number(items.orderCount) * 100 / 100).toFixed(2));
                    }
                    if (!items.discount) {
                        items.discount = 100;
                    }
                    orderTotal = orderTotal + (Number(items.singlePrice) * Number(items.orderCount));
                    detailDisTotal = detailDisTotal + total;
                }
                return detailDisTotal
            },
            totalAmount(){
                   let totalAmount=this.detailDisTotal;
                if(this.orderDisCount){
                    totalAmount=this.value.order.discountAmount;
                }
                return totalAmount
            },
            includedTaxTotal(){
               let includedTaxTotal = 0
                if(this.orderBaseInfo.includedTax ==1)
                    includedTaxTotal = this.totalAmount.toFixed(2);
                else
                    includedTaxTotal = (Number(this.totalAmount) * 117 / 100).toFixed(2);
                return includedTaxTotal
            }
        }
    }
</script>
<style>
</style>