/**
* 列表
*/
<template>
    <div id="rptdiv" class="rptdiv" >
        <table class="reporTab" cellspacing="0" cellpadding="0">
            <tr class="tabHead">
                <th rowspan="2" style="width:2%">序号</th>
                <th colspan="9" style="width:30%">订单基本信息</th>
                <th colspan="11" style="width:62%">订单发货信息</th>
                <th rowspan="2" style="width:3%">订单状态</th>
                <th rowspan="2">客户订单号</th>
            </tr>
            <tr class="tabHead">
                <th style="width:4%">配件订单号</th>
                <th style="width:3%">下单日期</th>
                <th style="width:6%">客户名称</th>
                <th style="width:4%">订单总价<br>(含税)</th>
                <th style="width:3%">到款金额</th>
                <th style="width:3%">余额</th>
                <th style="width:3%">订单类型</th>
                <th style="width:3%">下单员</th>
                <th style="width:3%">机器业务员</th>

                <th style="width:18%" class='supDeliver'>配件名称</th>
                <th style="width:15%" class='supDeliver'>型号</th>
                <th style="width:2%" class='supDeliver'>单位</th>
                <th style="width:3%" class='supDeliver'>购买数量</th>
                <th style="width:3%" class='supDeliver'>单价</th>
                <th style="width:3%" class='supDeliver'>折扣(%)</th>
                <th style="width:5%" class='supDeliver'>金额</th>
                <th style="width:6%" class='supDeliver'>机型</th>
                <th style="width:3%" class='supDeliver'>仓库</th>
                <th style="width:2%" class='supDeliver'>已发数</th>
                <th style="width:2%" class='supDeliver'>未发数</th>
            </tr>
                <tr style="padding:0px;"  v-for="(ol,index) in data" @click="changeClass">
                    <td>{{index+1}}</td>

                    <td class="l_td">{{ol.orderBaseInfo.orderNo}}</td>
                    <td>{{new Date(ol.orderBaseInfo.billDate).pattern('yyyy-MM-dd')}}</td>
                    <td class="l_td">{{ol.orderBaseInfo.customerName}}</td>
                    <td class="r_td"> {{ol.orderBaseInfo.totalMoneyWithTax?(ol.orderBaseInfo.totalMoneyWithTax).toFixed(2):0.00}}</td>
                    <td class="r_td">{{ol.orderBaseInfo.comeAmount?(ol.orderBaseInfo.comeAmount).toFixed(2):0.00}}</td>
                    <td class="r_td">{{ol.orderBaseInfo.overAmount?(ol.orderBaseInfo.overAmount).toFixed(2):0.00}}</td>
                    <td>{{orderTypes[ol.orderBaseInfo.orderType-1]}}</td>
                    <td>{{ol.orderBaseInfo.operatorText}}</td>
                    <td>{{ol.orderBaseInfo.machineSalesman}}</td>

                    <td colspan="11" style="padding:0px;border-left:0px">
                        <table class="innerTab imtab deliverTab" style="height:200%" cellspacing="0" cellpadding="0">

                                            <tr v-for="od in ol.orderDeliverys">
                                                <td class="l_td partsName" style="width:28.2%">{{od.partsName}}</td>
                                                <td class="l_td specification" style="width:23.55%">{{od.specification}}</td>
                                                <td class="unit" style="width:3.2%">{{od.unit}}</td>
                                                <td class="l_td orderCount" style="width:4.8%">{{od.orderCount}}</td>
                                                <td class="singlePrice" style="width:4.8%">{{od.singlePrice}}</td>
                                                <td class="discount" style="width:4.9%">{{od.discount}}</td>
                                                <td class="discountAmount" style="width:7.95%">{{od.discountAmount}}</td>
                                                <td class="l_td mashineType" style="width:9.55%">{{od.mashineType}}</td>
                                                <td class="l_td repertoryId" style="width:4.85%">{{repertoryNames[od.repertoryId]}}</td>
                                                <td class="l_td alreadydelivery" style="width:3.33%">{{od.deliver}}</td>
                                                <td class="l_td deliveryBalance" style="width:3.33%">{{od.deliveryBalance}}</td>
                                            </tr>
                                        <tr v-if="!ol.orderDeliverys||ol.orderDeliverys.length<=0">
                                            <td class="l_td partsName"></td>
                                            <td class="l_td specification"></td>
                                            <td class="unit"></td>
                                            <td class="l_td orderCount"></td>
                                            <td class="singlePrice"></td>
                                            <td class="discount"></td>
                                            <td class="discountAmount"></td>
                                            <td class="l_td mashineType"></td>
                                            <td class="l_td repertoryId"></td>
                                            <td class="l_td alreadydelivery"></td>
                                            <td class="l_td deliveryBalance"></td>
                                        </tr>
                        </table>
                    </td>
                    <td>{{orderStatus[ol.orderBaseInfo.status-1]}}</td>
                    <td style="min-width:188px;max-width:188px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ol.customerOrderId}}</td>
                </tr>
                <tr class="tabFoot">
                    <td>合计</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td id="totalAmount" class="r_td">{{totalAmount.toFixed(2)}}</td>
                    <td id="totalCome" class="r_td">{{totalCome.toFixed(2)}}</td>
                    <td id="totalOver" class="r_td">{{totalOver.toFixed(2)}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td id="totalY" class="l_td">{{totalY}}</td>
                    <td id="totalW" class="l_td">{{totalW}}</td>
                    <td></td>
                    <td></td>
                </tr>
                    <tr v-if="data.length<=0">
                        <td colspan="22" style="text-align:left;font-size:14px;"><p>未查询到数据！</p></td>
                    </tr>
        </table>
    </div>
</template>
<script>
    export default{
        name: 'OrderReportTable',
        mounted(){
        },
        props:{
          data:Array
        },
        data(){
            return{
                totalCome:0,
                totalOver:0,
                totalW:0,
                totalY:0,
                current:-1
            }
        },
        methods:{
            changeClass(e){
                let node = document.getElementsByClassName('info-row')[0]
                if(node){
                    node.removeAttribute("class");
                }
                e.target.parentNode.setAttribute("class",'info-row')
            }
        },
        computed:{
            orderStatus(){//订单状态
                return this.$store.state.moduleOrder.enumsList.orderStatus
            },
            repertoryNames: function () {//仓库列表
                return this.$store.state.moduleOrder.enumsList.repertoryNames;
            },
            orderTypes(){//订单类型
                return this.$store.state.moduleOrder.enumsList.orderTypes
            },
            totalAmount(){
                let totalAmount = 0
                let totalCome = 0
                let totalOver = 0
                let totalY = 0
                let totalW = 0
              this.data.map((item)=>{
                    if(item.orderBaseInfo.totalMoneyWithTax)
                  totalAmount+=Number(item.orderBaseInfo.totalMoneyWithTax)
                  if(item.orderBaseInfo.comeAmount)
                  totalCome+=Number(item.orderBaseInfo.comeAmount)
                  if(item.orderBaseInfo.overAmount)
                  totalOver+=Number(item.orderBaseInfo.overAmount)
                  if(item.orderDeliverys) {
                      item.orderDeliverys.map((i) => {
                          if (i.deliver)
                              totalY += Number(i.deliver)
                          if (i.deliveryBalance)
                              totalW += Number(i.deliveryBalance)
                      })
                  }
              })
                this.totalCome=totalCome
                this.totalOver=totalOver
                this.totalY = totalY
                this.totalW = totalW
                return totalAmount
            },
        },
    }
</script>
<style scoped>
    body{ height:100%;overflow:scroll}
    .height100{ height:100%;padding-top:10px;margin:5px;}

    .rptdiv{width:98%;margin:30px auto}
    .reporTab{width:100%;margin:0 auto;font-size: 8px!important;    border-top: 1px solid #d3dce6;
        border-right: 1px solid #d3dce6;}
    .reporTab tr th{font-weight:bold}
    .reporTab tr th,.reporTab tr td{padding:3px 3px;  border-left: 1px solid #d3dce6;
        border-bottom: 1px solid #d3dce6;text-align:center;vertical-align:middle}
    /* .reporTab tr td:last-child,.reporTab tr th:last-child{border-right:1px solid #d3dce6;} */
    .reporTab tr:first-child{border-top:1px solid}
    .reporTab tr td.r_td{text-align:right !important;}
    .reporTab tr td.l_td{text-align:left !important;}
    .reporTab tr td.c_td{text-align:center !important;}
    .reporTab tr.sumrow td{font-weight:bold}

    .reporTab tr td .innerTab{width:100%;}
    .reporTab tr td .innerTab tr td{border:none;border-left:1px solid #d3dce6;border-bottom:1px solid #d3dce6;}
    .reporTab tr td .innerTab tr td:last-child{border-right:none}
    .reporTab tr td .innerTab tr:last-child td{border-bottom:none}

    html { height: 100%}
    body {height:100%;margin:0px;padding:0px}
    table{height: 100%;}
    table.imtab{
        table-layout: fixed !important;
    }

    table.imtab tr th{
        text-align:center;
    }

    table.imtab tr td{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }

    table.imtab tr td:first-child{
        text-align:center;
    }
</style>