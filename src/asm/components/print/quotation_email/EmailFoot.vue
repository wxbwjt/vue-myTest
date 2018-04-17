/**
* 邮件底部
*/
<template>
    <div class="ys-print-footer-container" style="margin-top:20px;">
        <div style="line-height: 30px;"><span v-if="orderDetail.orderSource != '2'">注：报价含<!--17%的-->增值税，200元以上包邮，汇好汇款请回传汇款底单，以便及时发货。</span>
            <span v-else>注：报价含<!--17%的-->增值税，汇好汇款请回传汇款底单，以便及时发货。</span>
        </div>
        <div style="font-size:18px;">
            <strong>汇款资料：</strong><br/>
            <strong>全称：{{orderDetail.companyBankInfo.name}}</strong><br/>
            <strong>开户：{{orderDetail.companyBankInfo.bank_name}}</strong><br/>
            <strong>账号：</strong><strong class="data_formate" data-filter="acct">{{orderDetail.companyBankInfo.bank_account}}</strong><br/>
            <strong>行号：</strong><strong class="data_formate" data-filter="acct">{{orderDetail.companyBankInfo.bank_no}}</strong>
        </div>
        <div style="font-size:30px;font-weight:700;text-align:center">
            <span v-if="orderDetail.payMethod == 2"> 款&nbsp;&nbsp;到&nbsp;&nbsp;发&nbsp;&nbsp;货</span>
            <span v-if="orderDetail.payMethod == 1">     货&nbsp;&nbsp;到&nbsp;&nbsp;付&nbsp;&nbsp;款</span>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'EmailFoot',
        data(){
            return{
            }
        },
        computed:{
            orderDetail(){
                return this.$store.state.moduleOrder.orderDetailData.orderDetail;
            }
        }
    }
</script>
<style>
</style>