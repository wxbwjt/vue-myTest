/**
* 订单取消
*/
<template>
    <div class="new-container table-small-padding big-table">
        <ex-order-info  :detail="detail" :list="list" :show="false"></ex-order-info>
        <photo-upload v-model="form.photoFileNameList"></photo-upload>
        <order-remark v-model="form.remark"></order-remark>
        <div style="text-align: center">
            <el-button type="success" @click="submit" :disabled="uploading">提交</el-button>
        </div>
    </div>
</template>
<script>
    import ExOrderInfo from "./common/ExOrderInfo";
    import PhotoUpload from "../../common/PhotoUpload";
    import OrderRemark from "./common/OrderRemark";
    export default{
        components: {
            OrderRemark,
            PhotoUpload,
            ExOrderInfo},
        name: 'Cancel',
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
                form:{
                    photoFileNameList:[]
                },
                uploading:false
            }
        },
        methods:{
            doAjax(){
                    this.$http.post("/task/orderCancelUi",{param:this.$route.params.id})
                        .then((response)=> {
                            if(response.data.state == '200'){
                                this.detail = JSON.parse(JSON.stringify(response.data.data.orderDetail));
                                this.form = Object.assign(this.form,response.data.data.orderDetail);
                                this.form.detailList =  this.form.orderDetailDtos
                                this.form.remark = ""
                                this.form.cancelRemark = ""
                                this.form.oldOrderId = this.form.id
                                this.list = this.detail.orderDetailDtos
                                this.form.photoFileNameList = []
                                this.form.amount=0
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
                },
            submit(){
                let url = 'orderCancel'
                    if(this.isSub){
                      url = 'subCancel'
                        this.form.cancelRemark = this.form.remark
                    }
                this.uploading = true
                    this.$http.post("/task/"+url,{param:JSON.stringify(this.form)})
                        .then((response)=> {
                            if(response.data.data.status == '200'){
                                this.$message({
                                    'type':'success',
                                    message:"取消成功",
                                    'showClose':true
                                });
                                if(this.isSub){
                                    this.$router.push('/order/detail/'+this.$route.params.id+'/allDetail/tab1')
                                }else{
                                this.$router.push({path:'/order',query:{orderId:response.data.data.message}})
                                }
                            }else{
                                this.$message({
                                    'type':'error',
                                    message:response.data.data.message,
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
        computed:{
            isSub(){
                return this.form.orderType == '7' || this.form.orderType == '8'
            }
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