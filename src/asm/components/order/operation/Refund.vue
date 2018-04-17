/**
* 订单退货
*/
<template>
    <div class="new-container table-small-padding big-table">
            <ex-order-info :detail="detail" :list="list" :show="isShow"></ex-order-info>
            <photo-upload v-model="form.photoFileNameList"></photo-upload>
            <div class="parts-box">
                <el-card>
                    <div slot="header"  class="search-head"><span><i class="fa fa-tag"></i>配件列表</span>
                    </div>
                    <el-table border :data="form.detailList" @selection-change="selectParts">
                        <el-table-column type="selection"  width="40"></el-table-column>
                        <el-table-column label="序号" type="index"  width="40"></el-table-column>
                        <el-table-column label="客户物料号"  width="90" prop="customerMaterialsId" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="配件名称" min-width="80" prop="partsName" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="型号"  prop="specification" min-width="50" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="单位"  prop="unit" width="50" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="数量"  prop="orderCount" min-width="150" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-input-number size="small" v-model="scope.row.orderCount" @change="(val) => { changeHandle(val,scope.row)}"  :min="1" :max="scope.row.deliverAmount"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column label="单价" min-width="50"  prop="singlePrice" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="折扣(%)" width="70"  prop="discount" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="金额" min-width="70"  prop="discountAmount" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-input size="small" v-model="scope.row.discountAmount" @blur="daTool"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="机型" min-width="50"  prop="mashineType" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="仓库" min-width="50" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                {{storeList[scope.row.repertoryId]}}
                            </template>
                        </el-table-column>
                        <el-table-column label="备注"min-width="50"  prop="remark" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-input size="small" v-model="scope.row.remark"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="parts-box_footer">
                        <el-row>
                            <el-col :span="10">
                                <span>配件金额总计：</span><span>{{Number(amount).toFixed(2)}}</span>&nbsp;&nbsp;
                                <span>优惠后金额总计：</span><span>{{Number(totalAmount).toFixed(2)}}</span>
                            </el-col>
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="6">
                                <span>抹零金额：</span>
                                <el-input style="width: 50%;" size="small" v-model="discountAmount" @blur="comDiscount"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <span>总体折扣(％)：</span>
                                <el-input style="width: 50%" size="small" v-model="discount" @blur="comAmount"></el-input>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <span>总价（含税）：</span><span>{{Number(partsdiscountAmountFax).toFixed(2)}}</span>&nbsp;&nbsp;
                                <span>总价（不含税）：</span><span>{{Number(partsdiscountAmountNoFax).toFixed(2)}}</span>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </div>
            <order-remark v-model="form.remark"></order-remark>
        <div style="text-align: center">
            <el-button type="success" @click="submit" :disabled="uploading">提交</el-button>
        </div>
    </div>
</template>
<script>
    import PhotoUpload from "../../common/PhotoUpload";
    import ExOrderInfo from "./common/ExOrderInfo";
    import OrderRemark from "./common/OrderRemark";
    export default{
        components: {
            OrderRemark,
            ExOrderInfo,
            PhotoUpload},
        name: 'Refund',
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
                form:{photoFileNameList:[]},
                discountAmount:0,
                discount:0,
                uploading:false,
                partsList:[]//已选的配件
            }
        },
        methods:{
            doAjax(){
                if(this.$route.name == 'refund'){
                    this.$http.post("/task/refundUi",{param:this.$route.params.id})
                        .then((response)=> {
                            if(response.data.state == '200'){
                                this.detail = JSON.parse(JSON.stringify(response.data.data.orderDetail));
                                this.form = Object.assign(this.form,response.data.data.orderDetail);
                                this.form.detailList =  this.form.orderDetailDtos.map((item)=>{
                                    item.discountAmount = Number(item.deliverAmount*item.singlePrice*item.discount/100).toFixed(2)
                                    return item
                                })
                                this.form.remark = ""
                                this.form.photoFileNameList = []
                                this.form.oldOrderId = this.form.id
                                this.isShow = false
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
                    this.$http.post("/task/refundUpdateUi",{param:this.$route.params.id})
                        .then((response)=> {
                            if(response.data.state == '200'){
                                this.detail = JSON.parse(JSON.stringify(response.data.data.oldDetail));
                                this.form = response.data.data.orderDetail;
                                this.form.detailList =  response.data.data.orderDetail.orderDetailDtos.map((item)=>{
                                    item.discountAmount = Number(item.deliverAmount*item.singlePrice*item.discount/100).toFixed(2)
                                    return item
                                })
                                this.list = response.data.data.oldDetail.orderDetailDtos
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
                if(this.partsList.length<1){
                    this.$message({
                        'type':'warning',
                        message:"请选择需要退货的配件!",
                        'showClose':true
                    });
                    return false
                }
                this.uploading = true
                let param = JSON.parse(JSON.stringify(this.form))
                param.detailList = this.partsList
                param.discount = this.discount
                param.discountAmount = this.discountAmount
                param.amount = this.amount
                param.totalAmount = this.totalAmount
                if(this.$route.name == 'refund'){
                    this.$http.post("/task/refund",{param:JSON.stringify(param)})
                        .then((response)=> {
                            if(response.data.data.status == '200'){
                                this.$message({
                                    'type':'success',
                                    message:"退货成功",
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
                    this.$http.post("/task/updateRefund",{param:JSON.stringify(param)})
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
            /*折扣改变促发金额改变*/
            comAmount(){
                this.discountAmount = Number((Number( this.amount ) * this.discount *this.tn/10000).toFixed(2))
            },
            /*抹零金额改变触发折扣改变*/
            comDiscount(){
                //折扣
                if(Number(this.discountAmount)==0 || Number( this.amount ) ==0){
                    this.discount = 0
                }else{
                    this.discount=  Number( ( Number( this.discountAmount ) / Number( this.amount )  /this.tn * 10000 ).toFixed(2) )
                }
            },
            /*选择退货配件*/
            selectParts(val){
                this.partsList = val
                this.$nextTick(function(){
                    this.daTool()
                })
            },
            /*计算金额相关*/
            daTool(){
                //列表改变时抹零金额计算
                if(this.form.orderType!=2&&this.form.orderType!=3&&this.form.orderType!=7&&this.form.orderType!=8) {
                    this.discountAmount = Number(Number(this.totalAmount)*this.tn / 100).toFixed(2)
                    if (Number(this.discountAmount) == 0 || Number(this.amount) == 0) {
                        this.discount = 0
                    } else {
                        this.discount = Number(( Number(this.discountAmount) / Number(this.amount) /this.tn * 10000 ).toFixed(2))
                    }
                }
            },
            /*选择配件数量触发*/
            changeHandle(val,row){
                row.discountAmount = Number(val*row.singlePrice*row.discount/100).toFixed(2)
                this.$nextTick(function(){
                    this.daTool()
                })
            }
        },
        computed:{
            tn(){//计算抹零金额时的比例
                if(this.form.includedTax==2){
                    return 117
                }else {
                    return 100
                }
            },
            storeList(){return this.$store.state.moduleOrder.enumsList.repertoryNames},
            /*总价含税*/
            partsdiscountAmountFax(){
                let num = 0
                   num = Number(this.discountAmount).toFixed(2)
                this.form.totalMoneyWithTax = num
                return num
            },
            /*总价不含税*/
            partsdiscountAmountNoFax(){
                let num = 0
                    num = Number(Number(this.discountAmount)/117*100).toFixed(2)
                this.form.totalMoneyWithoutTax = num
                return num
            },
            amount(){
                let amount = 0
                this.partsList.map((item)=>{
                    let price = Number( (Number(item.singlePrice) * Number(item.orderCount)).toFixed(2));
                    amount += price;
                })
                return amount.toFixed(2);

            },//配件金额总计
            totalAmount(){
                let totalAmount = 0
                this.partsList.map((item)=>{
                    let discountPrice = Number(item.discountAmount);
                    totalAmount += discountPrice
                })
                return totalAmount.toFixed(2);
            },//优惠后金额总计
        },
        watch:{
            '$route'(){
                this.doAjax()
            },
        }
    }
</script>
<style>
</style>