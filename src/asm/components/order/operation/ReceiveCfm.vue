/**
* 收货确认
*/
<template>
    <div class="new-container table-small-padding big-table">
        <ex-order-info  :detail="detail"  :show="false"></ex-order-info>
        <el-card>
            <div slot="header"  class="search-head"><span><i class="fa fa-tag"></i>收货记录</span></div>
            <div v-for="(item,index) in alreListSize">
                <span style="font-size: 8px;"><i class="el-icon-setting"></i>第{{index+1}}次收货</span>
                <el-table border style="margin-top: 5px" :data = "getlistEcipient(item)">
                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column label="配件名称" prop="partsName" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="型号" prop="specification" min-width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="机型" prop="mashineType" min-width="50" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="数量" prop="takeCount" width="120" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="收货时间" prop="createTime" min-width="80" :show-overflow-tooltip="true">
                        <span slot-scope="scope">{{new Date(scope.row.createTime).pattern("yyyy-MM-dd")}}</span>
                    </el-table-column>
                    <el-table-column label="收货人" prop="operatorName" width="80" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="收货备注"min-width="120" prop="remark" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
            </div>
            <div  v-if="alreListSize.length<=0" style="color: red;text-align: center">
                暂无已收货数据
            </div>
        </el-card>
        <photo-upload  v-model="form.photoFileNameList"></photo-upload>
        <el-card>
            <div slot="header"  class="search-head"><span><i class="fa fa-tag"></i>待收货信息</span></div>
            <el-table border :data="list" @selection-change="selectParts">
                <el-table-column type="selection" :selectable="selectable" >
                </el-table-column>
                <el-table-column label="序号" type="index" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="客户物料号" prop="customerMaterialsId" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="配件名称" prop="partsName" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="型号" prop="specification" min-width="80" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="单位" prop="unit" width="50" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="数量"  min-width="180" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span style="color: red" v-if="!TList&&scope.row.deliverAmount==0">订单{{orderNo}}中该配件未发货</span>
                        <el-input-number size="small" v-else  v-model="scope.row.orderCount"  :min="1" :max="TList?scope.row.changeCount-scope.row.takeCount:scope.row.deliverAmount-scope.row.takeCount"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="机型" prop="mashineType" min-width="80" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="备注"min-width="120" prop="remark" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.remark" :disabled="!selectable(scope.row)"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div style="text-align: center" v-role:售后服务内勤.not>
            <el-button type="success" @click="submit" :disabled="uploading">确认收货</el-button>
        </div>
    </div>
</template>
<script>
    import ExOrderInfo from "./common/ExOrderInfo";
    import PhotoUpload from "../../common/PhotoUpload";
    export default{
        components: {
            PhotoUpload,
            ExOrderInfo},
        name: 'ReceiveCfm',
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
                orderNo:"",
                list:[],
                datamap:{},
                form:{photoFileNameList:[]},
                alreListSize:[],
                TList:true,
                uploading:false
            }
        },
        methods: {
            doAjax(){
                    this.$http.post("/task/receiveCfmUi", {param: this.$route.params.id})
                        .then((response) => {
                            if (response.data.state == '200') {
                                this.detail = JSON.parse(JSON.stringify(response.data.data.orderDetail));
                                this.form = Object.assign(this.form,response.data.data.orderDetail);
                                this.orderNo = response.data.data.oldDetail.orderNo
                                this.form.detailList = []
                                this.alreListSize = response.data.data.alreListSize
                                this.datamap = response.data.data.alreTList?response.data.data.alreTList:response.data.data.alreBList
                                this.TList = response.data.data.alreTList?true:false
                                this.getList()
                                this.form.photoFileNameList = []
                            } else if(response.data.state='400'){
                                console.log('请求取消')
                            }else{
                                console.log('数据请求出错')
                            }
                        })
                        .catch((error) => {
                            this.$message({
                                'type': 'error',
                                message: "请求服务器发生错误,请重新登陆或联系后台",
                                'showClose': true
                            });
                        });
            },
            submit(){
                if(this.form.detailList.length<1){
                    this.$message({
                        'type':'warning',
                        message:"请选择确认收货的配件!",
                        'showClose':true
                    });
                    return false
                }
                this.uploading = true
                    this.$http.post("/task/receiveCfm", {param: JSON.stringify(this.form)})
                        .then((response) => {
                            if (response.data.data.status == '200') {
                                this.$message({
                                    'type': 'success',
                                    message: "收货成功",
                                    'showClose': true
                                });
                                this.$router.push('/order/detail/'+this.$route.params.id+'/allDetail/tab1')
                            } else {
                                this.$message({
                                    'type': 'error',
                                    message: "提交失败，,请重试或联系管理",
                                    'showClose': true
                                });
                            }
                        })
                        .catch((error) => {
                            this.$message({
                                'type': 'error',
                                message: "请求服务器发生错误,请重新登陆或联系后台",
                                'showClose': true
                            });
                        });
            },
            /*根据datamap获取收货配件*/
            getList(){
                if(!this.datamap.mapOrderChangeDetailDto){
                    return false
                }
                this.list = []
                let Obj = JSON.parse(JSON.stringify(this.datamap.mapOrderChangeDetailDto))
                for(var key in Obj){
                    let obj = Obj[key]
                    obj.deliverAmount = obj.deliverAmount-obj.orderCount
                    obj.orderCount = 0
                    obj.remark = ""
                    obj.id =  obj.detailId
                    this.list.push(obj)
                }
            },
            /*根据datamap获取收货记录*/
            getlistEcipient(val){
                if(!this.datamap.listEcipientDetaiDto){
                    return false
                }
                let list = []
                this.datamap.listEcipientDetaiDto.map((item)=>{
                   if(val == item.createTime){
                       let id = item.detailId
                       item.partsName = this.datamap.mapOrderChangeDetailDto[id].partsName
                       item.specification = this.datamap.mapOrderChangeDetailDto[id].specification
                       item.mashineType = this.datamap.mapOrderChangeDetailDto[id].mashineType
                       list.push(item)
                   }
                })
                return list
            },
            /*收货数量判断*/
            selectable(row){
                let changeCount = Number(row.changeCount)
                let takeCount = Number(row.takeCount)
                let deliverAmount = Number(row.deliverAmount)
                if(this.TList){
                return changeCount-takeCount>0
                }
                else{
                    return deliverAmount -takeCount>0
                }
            },
            selectParts(val){
                this.form.detailList = val
            }
        },
        computed:{
        },
        watch:{
            '$route'(){
                this.doAjax()
            },
            'datamap'(){
                    this.getList()
            }
        }
    }
</script>
<style>
</style>