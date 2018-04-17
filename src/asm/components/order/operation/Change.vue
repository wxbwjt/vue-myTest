/**
* 订单更换
*/
<template>
    <div class="new-container table-small-padding big-table">
        <ex-order-info :detail="detail" :list="list" :show="isShow"></ex-order-info>
        <parts-list v-model="form.detailList" @setInfo="setInfo" :name="form.customer.customerName" :tax="form.includedTax" :da = "Number(form.discountAmount)" :dis = "Number(form.discount)" :am="form.amount" :ta="form.totalAmount" :orderType="6"></parts-list>
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
        name: 'Change',
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
                isShow:true,
                form:{customer:{}},
                uploading:false
            }
        },
        methods:{
            doAjax(){
                if(this.$route.name == 'change'){
                    this.$http.post("/task/changeUi",{param:this.$route.params.id})
                        .then((response)=> {
                            if(response.data.state == '200'){
                                this.detail = JSON.parse(JSON.stringify(response.data.data.orderDetail));
                                this.form = response.data.data.orderDetail;
                                this.form.detailList =  this.form.orderDetailDtos
                                this.form.remark = ""
                                this.form.oldOrderId = this.form.id
                                this.isShow = false
                                // this.form.discountAmount=0
                                // this.form.totalMoneyWithoutTax=0
                                // this.form.totalMoneyWithTax=0
                                // this.form.discount=0
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
                    this.$http.post("/task/changeUpdateUi",{param:this.$route.params.id})
                        .then((response)=> {
                            if(response.data.state == '200'){
                                this.detail = JSON.parse(JSON.stringify(response.data.data.oldDetail));
                                this.form = response.data.data.orderDetail;
                                this.form.detailList =  this.form.orderDetailDtos
                                this.list = response.data.data.oldDetail.orderDetailDtos
                                // this.form.discountAmount=0
                                // this.form.totalMoneyWithoutTax=0
                                // this.form.totalMoneyWithTax=0
                                // this.form.discount=0
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
            submit(){
                this.uploading = true
                if(this.$route.name == 'change'){
                    this.$http.post("/task/change",{param:JSON.stringify(this.form)})
                        .then((response)=> {
                            if(response.data.data.status == '200'){
                                this.$message({
                                    'type':'success',
                                    message:"更换成功",
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
                    this.$http.post("/task/changeUpdate",{param:JSON.stringify(this.form)})
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