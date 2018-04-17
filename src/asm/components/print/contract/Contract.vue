/**
* 合同
*/
<template>
    <div class="ys-print-list" style="display: none;font-size: 15px;">
        <div style="padding:30px;">
            <div id="contractDiv">
                <table  border="0" cellspacing="0" cellpadding="0"  class="contract-body" style="width: 100%">
                    <tbody>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border:none">
                            <table border="0" cellspacing="0" cellpadding="0" class="contract-foot">
                                <tbody>
                                <tr>
                                    <td colspan="4" style="text-align: center"> <h2>包装机械配件供销合约</h2></td>
                                </tr>
                                <tr>
                                    <td style="width: 10%">供方：</td>
                                    <td style="width: 50%"><span v-if="orderDetail.orderSource == 1">杭州永创智能设备股份有限公司</span><span v-if="orderDetail.orderSource == 2">浙江美华包装机械有限公司</span><span v-if="orderDetail.orderSource == 3">佛山市成田司化机械有限公司</span></td>
                                    <td style="width: 15%">合约号：</td>
                                    <td>{{orderDetail.serialId}}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>签订日期：</td>
                                    <td>{{orderDetail.createdTime?new Date(orderDetail.createdTime).pattern("yyyy-MM-dd"):""}}</td>
                                </tr>
                                <tr>
                                    <td>需方：</td>
                                    <td>{{orderDetail.customer.customerName}}</td>
                                    <td>签订地点：</td>
                                    <td>杭州</td>
                                </tr>
                                <tr>
                                    <td colspan="4">为加强双方的责任感，加强机械设备的售后保证，双方协商一致，签定本合同。</td>
                                </tr>
                                <tr>
                                    <td colspan="4">一、 品名、规格型号、数量、金额</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr v-if="!showDiscount">
                        <td style="width:8%">序号</td>
                        <td style="width:23%">规格型号</td>
                        <td style="width:27%">配件名称</td>
                        <td style="width:8%">单位</td>
                        <td style="width:10%">数量</td>
                        <td style="width:12%">单价(元)</td>
                        <td style="width:12%;border-right:1px #000000 solid">金额(元)</td>
                    </tr>
                    <tr v-else>
                        <td style="width:8%">序号</td>
                        <td style="width:18%">规格型号</td>
                        <td style="width:22%">配件名称</td>
                        <td style="width:8%">单位</td>
                        <td style="width:10%">数量</td>
                        <td style="width:12%">单价(元)</td>
                        <td style="width:10%">折扣(%)</td>
                        <td style="width:12%;border-right:1px #000000 solid">金额(元)</td>
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
                        <td align="right" style="border-right:1px #000000 solid">{{Number(item.discountAmount).toFixed(2)}}</td>
                    </tr>
                    <tr v-if="showDiscount">
                        <td colspan="6" style='padding-left:200px'>总体折扣</td>
                        <td align="right">{{orderDetail.discount?orderDetail.discount:0}}%</td>
                        <td align="right" style="border-right:1px #000000 solid">{{sum.toFixed(2)}}</td>
                    </tr>
                    <tr  v-if="orderDetail.includedTax == 2">
                        <td :colspan="showDiscount?7:6" style='padding-left:200px'>总价（不含税）</td>
                        <td align="right" style="border-right:1px #000000 solid">{{orderDetail.totalMoneyWithoutTax?Number(orderDetail.totalMoneyWithoutTax).toFixed(2):0.00}}</td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?7:6" style='padding-left:200px'>总价（含税）</td>
                        <td align="right" style="border-right:1px #000000 solid">{{orderDetail.totalMoneyWithTax?Number(orderDetail.totalMoneyWithTax).toFixed(2):0.00}}</td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border:none;padding: 5px 0">
                            <div style="margin-top: 20px">二、交货日期：合同生效后（普通标准件）1-3天内发货，非标准件具体咨询货期。</div>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border:none;padding: 5px 0">三、交货地点：需方国内所在地。</td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border:none;padding: 5px 0">四、运输运费：由供方承担。（注：订单总金额200以上包邮）</td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border:none;padding: 5px 0">五、结算方式及期限：款到发货，报价含<!--17%的-->增值税。</td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border:none;padding: 5px 0">六、合同签定后，双方必须严格履行，任何一方如有违约，必须承担违约责任。</td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border:none;padding: 5px 0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如有争议，到供方所在地依法解决</td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border:none;padding: 5px 0">七、补充条款：本合同三天内经双方签字盖章生效。</td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7"  style="border: none">
                            <table border="0" cellspacing="0" cellpadding="0"  class="contract-foot">
                                <tbody>
                                <tr>
                                    <td style="width: 16%;">需方全称：</td>
                                    <td style="width: 34%;">{{orderDetail.customer.customerName}}</td>
                                    <td style="width: 16%;">供方全称：</td>
                                    <td style="width: 34%;"><span v-if="orderDetail.orderSource == 1">杭州永创智能设备股份有限公司</span><span v-if="orderDetail.orderSource == 2">浙江美华包装机械有限公司</span><span v-if="orderDetail.orderSource == 3">佛山市成田司化机械有限公司</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7"  style="border: none">
                            <table border="0" cellspacing="0" cellpadding="0"  class="contract-foot">
                                <tbody>
                                <tr>
                                    <td style="width: 16%;;">法    人：</td>
                                    <td style="width: 34%;"></td>
                                    <td style="width: 16%;;">法    人：</td>
                                    <td style="width: 34%;"><span v-if="orderDetail.orderSource == 1">罗邦毅</span><span v-else-if="orderDetail.orderSource == 2">查进成</span><span v-else>吕婕</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7"  style="border: none">
                            <table border="0" cellspacing="0" cellpadding="0"   class="contract-foot">
                                <tbody>
                                <tr>
                                    <td style="width: 16%;;">税    号：</td>
                                    <td style="width: 34%;"></td>
                                    <td style="width: 16%;;">税    号：</td>
                                    <td style="width: 34%;"><span v-if="orderDetail.orderSource == 2">91330106753986599E</span><span v-else>91330000744143864U</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7"  style="border: none">
                            <table border="0" cellspacing="0" cellpadding="0"  class="contract-foot">
                                <tbody>
                                <tr>
                                    <td style="width: 16%;;">开户银行账号：</td>
                                    <td style="width: 34%;"></td>
                                    <td style="width: 16%;;">开户银行账号：</td>
                                    <td style="width: 34%;">{{orderDetail.companyBankInfo.bank_name}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7"  style="border: none">
                            <table border="0" cellspacing="0" cellpadding="0"  class="contract-foot">
                                <tbody>
                                <tr>
                                    <td style="width: 16%;;"></td>
                                    <td style="width: 34%;"></td>
                                    <td style="width: 16%;;"></td>
                                    <td style="width: 34%;">{{orderDetail.companyBankInfo.bank_account}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7"  style="border: none">
                            <table border="0" cellspacing="0" cellpadding="0"  class="contract-foot">
                                <tbody>
                                <tr>
                                    <td style="width: 16%;;">地    址：</td>
                                    <td style="width: 34%;">{{orderDetail.customer.address}}</td>
                                    <td style="width: 16%;;">地    址：</td>
                                    <td style="width: 34%;">杭州三墩西湖科技园西园七路2号</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7"  style="border: none">
                            <table border="0" cellspacing="0" cellpadding="0"  class="contract-foot">
                                <tbody>
                                <tr>
                                    <td style="width: 16%;;">电话（TEL）：</td>
                                    <td style="width: 34%;">{{orderDetail.customer.conMobile}}/{{orderDetail.customer.telephone}}</td>
                                    <td style="width: 16%;;">电话（TEL）：</td>
                                    <td style="width: 34%;">{{user.mobile}}/{{user.phone}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7"  style="border: none">
                            <table border="0" cellspacing="0" cellpadding="0"  class="contract-foot">
                                <tbody>
                                <tr>
                                    <td style="width: 16%;;">传真（FAX）：</td>
                                    <td style="width: 34%;">{{orderDetail.customer.fax}}</td>
                                    <td style="width: 16%;;">传真（FAX）：</td>
                                    <td style="width: 34%;">0571-81020190/81020191</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7"  style="border: none">
                            <table border="0" cellspacing="0" cellpadding="0"  class="contract-foot">
                                <tbody>
                                <tr>
                                    <td style="width: 16%;;">经办人：</td>
                                    <td style="width: 34%;">{{orderDetail.customer.contact}}</td>
                                    <td style="width: 16%;;">经办人：</td>
                                    <td style="width: 34%;">{{user.name}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td :colspan="showDiscount?8:7" style="border: none">
                            <table border="0" cellspacing="0" cellpadding="0"  class="contract-foot">
                                <tbody>
                                <tr>
                                    <td style="width: 16%;;">邮    箱：</td>
                                    <td style="width: 34%;">{{orderDetail.customer.conEmail}}</td>
                                    <td style="width: 16%;;">邮    箱：</td>
                                    <td style="width: 34%;">{{user.email}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'Contract',
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
            user(){
                return this.$store.state.moduleOrder.orderDetailData.operator
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