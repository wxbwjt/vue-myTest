/**
* 订单补发
*/
<template>
    <div class="new-container table-small-padding big-table">
        <ex-order-info :detail="detail" :list="list"></ex-order-info>
        <parts-list v-model="form.detailList" @setInfo="setInfo" :name="form.customer.customerName" :tax="form.includedTax" :am="form.amount" :ta="form.totalAmount"></parts-list>
        <order-remark v-model="form.remark"></order-remark>
        <div style="text-align: center">
            <el-button type="success" @click="submit" :disabled="uploading">提交</el-button>
        </div>
    </div>
</template>
<script>
    import ExOrderInfo from "./common/ExOrderInfo";
    import OrderRemark from "./common/OrderRemark";
    import PartsList from "./partsList/PartsList";
    export default{
        components: {
            PartsList,
            OrderRemark,
            ExOrderInfo},
        name: 'Reissue',
        mounted(){
          this.doAjax()
        },
        data(){
            return{
                detail: {
                    customer: {
                        customerName: '',
                        conMobile: '',
                        contact: '',
                        telephone: '',
                        conEmail: '',
                        address: ''
                    },
                    serialId: '',
                    customerOrderId: '',
                    orderType: '',
                    payMethod: '',
                    status: '',
                    createdTime: '',
                    billDate: '',
                    orderSource: '',
                    operatorText: '',
                    remark: '',
                },
                list:[],
                form:{customer:{}},
                uploading:false
            }
        },
        methods:{
            /*请求数据，金额值清零*/
            doAjax(){
                if(this.$route.name == 'reissue'){
                this.$http.post("/task/reissueUi",{param:this.$route.params.id})
                    .then((response)=> {
                        if(response.data.state == '200'){
                            this.detail = JSON.parse(JSON.stringify(response.data.data.orderDetail));
                            this.form = response.data.data.orderDetail;
                            this.form.detailList =  this.form.orderDetailDtos
                            this.form.remark = "" //清空原订单备注，提交为子订单备注
                            this.form.oldOrderId = this.form.id //生成子订单时，原订单为本订单
                            this.list = this.detail.orderDetailDtos
                            this.form.discountAmount=0
                            this.form.totalMoneyWithoutTax=0
                            this.form.totalMoneyWithTax=0
                            this.form.discount=0
                        }else if(response.data.state='400'){
                            console.log('请求取消')
                        }else{
                            console.log('数据请求出错')
                        }
                    })
                    .catch( (error) =>{
                        this.$message({
                            'type':'error',
                            message:"请求服务器发生错误,请重新登陆或联系后台",
                            'showClose':true
                        });
                    });
            }else{
                    this.$http.post("/task/reissueUpdateUi",{param:this.$route.params.id})
                        .then((response)=> {
                            if(response.data.state == '200'){
                                this.detail = JSON.parse(JSON.stringify(response.data.data.oldDetail));
                                this.form = response.data.data.orderDetail;
                                this.form.detailList =  this.form.orderDetailDtos
                                this.list = response.data.data.oldDetail.orderDetailDtos
                                this.form.discountAmount=0
                                this.form.totalMoneyWithoutTax=0
                                this.form.totalMoneyWithTax=0
                                this.form.discount=0
                            }else if(response.data.state='400'){
                                console.log('请求取消')
                            }else{
                                console.log('数据请求出错')
                            }
                        })
                        .catch( (error) =>{
                            this.$message({
                                'type':'error',
                                message:"请求服务器发生错误,请重新登陆或联系后台",
                                'showClose':true
                            });
                        });
                }
            },
            /*提交*/
            submit(){
                this.uploading = true
                if(this.$route.name == 'reissue'){
                    this.$http.post("/task/reissue",{param:JSON.stringify(this.form)})
                        .then((response)=> {
                            if(response.data.data.status == '200'){
                                this.$message({
                                    'type':'success',
                                    message:"补发成功",
                                    'showClose':true
                                });
                                this.$router.push({path:'/order',query:{orderId:response.data.data.message}})
                            }else{
                                this.$message({
                                    'type':'error',
                                    message:"提交失败，,请重试或联系管理",
                                    'showClose':true
                                });
                            }
                        })
                        .catch( (error) =>{
                            this.$message({
                                'type':'error',
                                message:"请求服务器发生错误,请重新登陆或联系后台",
                                'showClose':true
                            });
                        });
                }else{
                    this.$http.post("/task/updateReissue",{param:JSON.stringify(this.form)})
                        .then((response)=> {
                            if(response.data.data.status == '200'){
                                this.$message({
                                    'type':'success',
                                    message:"修改成功",
                                    'showClose':true
                                });
                                this.$router.push('/order/detail/'+this.$route.params.id+'/allDetail/tab1')
                            }else{
                                this.$message({
                                    'type':'error',
                                    message:"提交失败，,请重试或联系管理",
                                    'showClose':true
                                });
                            }
                        })
                        .catch( (error) =>{
                            this.$message({
                                'type':'error',
                                message:"请求服务器发生错误,请重新登陆或联系后台",
                                'showClose':true
                            });
                        });
                }
            },
            setInfo(name,val){
                this.form[name] = val
            },
        },
        watch:{
            '$route'(){
                this.doAjax()
            }
        }
    }
</script>
<style>
</style>