/**
* 新增报价单
*/
<template>
    <div class="container-body new-container table-small-padding big-table">
        <div class="form-title" ><i class="el-icon-document"></i>{{title}}
        </div>
        <el-form label-width="100px" :model="form" ref="addForm" :rules="rules">
            <el-row>
                <el-col :span="16">
                    <el-form-item label="单据流水号">
                        <el-input :disabled="true"  v-model="form.serialId"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="订单来源">
                <el-radio-group v-model="form.orderSource">
                    <el-radio :label="1" :disabled="modify">永创订单</el-radio>
                    <el-radio :label="2" :disabled="modify">美华订单</el-radio>
                    <el-radio :label="3" :disabled="modify">成田订单</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="订单类型">
                <el-radio-group v-model="form.orderType">
                    <el-radio :label="1" :disabled="modify">购买</el-radio>
                    <el-radio :label="2" :disabled="modify">保内</el-radio>
                    <el-radio :label="3" :disabled="modify">库存</el-radio>
                    <el-radio :label="4" :disabled="modify">赠送</el-radio>
                    <el-radio :label="6" :disabled="modify">退货</el-radio>
                    <el-radio :label="5" :disabled="modify">维修</el-radio>
                    <el-radio :label="10" :disabled="modify">维修费</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="付款方式">
                <el-radio-group v-model="form.payMethod">
                    <el-radio :label="1" :disabled="modify">货到付款</el-radio>
                    <el-radio :label="2" :disabled="modify">款到发货</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否含税">
                <el-radio-group v-model="form.includedTax">
                    <el-radio :label="1" :disabled="modify">含税</el-radio>
                    <el-radio :label="2" :disabled="modify">不含税</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-row>
                <el-col :span="16">
                    <el-form-item label="客户订单号"  prop="customerOrderId">
                        <el-input v-model="form.customerOrderId" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="客户名称" prop="customer.customerName">
                        <el-autocomplete
                          popperClass="my-popperClass"
                                v-model="form.customer.customerName"
                                :fetch-suggestions="querySearch"
                                :trigger-on-focus="false"
                                custom-item="my-item-zh"
                                @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="客户电话" prop="customer.telephone">
                        <el-input   v-model="form.customer.telephone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="联系人" prop="customer.contact">
                        <el-autocomplete
                                ref="contact"
                                id="contact"
                                tabindex="1"
                                @blur="sycCon"
                                popperClass="my-popperClass"
                                v-model="form.customer.contact"
                                :fetch-suggestions="querySearchCon"
                                custom-item="my-item-con"
                                @select="handleSelectCon"
                        ></el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="手机" prop="customer.mobile">
                        <el-input   v-model="form.customer.mobile"  @blur="sycMobile"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="邮箱" prop="customer.email">
                        <el-input   v-model="form.customer.email"  @blur="sycEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="传真" prop="customer.fax">
                        <el-input   v-model="form.customer.fax" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="16">
                    <el-form-item label="客户地址" prop="customer.customerAddress">
                        <el-input   v-model="form.customer.customerAddress"  @blur="sycAdd"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="凭证" class="my-progress" style="margin-bottom: 6px">
                <el-upload
                        action="/ys-web-asm/upload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                        :before-upload="beforeUpload"
                        ref="upload"
                        :file-list="fileList"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="large">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-row v-if="isShow">
                <el-col :span="16">
                    <el-form-item label="机器业务员" :prop="form.orderType!=3?'machineSalesman':''">
                        <el-input   v-model="form.machineSalesman" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="16">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea"  v-model="form.remark" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-card>
                <div slot="header"  class="search-head"><span><i class="fa fa-tag"></i>收货联系人</span></div>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系人" prop="customer.sendContact">
                            <el-autocomplete
                                    ref="sendContact"
                                    popperClass="my-popperClass"
                                    v-model="form.customer.sendContact"
                                    :fetch-suggestions="querySearchCon"
                                    custom-item="my-item-con"
                                    @select="handleSelectSCon"
                            ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机" prop="customer.sendPhone">
                            <el-input   v-model="form.customer.sendPhone" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话" prop="customer.sendTelephone">
                            <el-input   v-model="form.customer.sendTelephone" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="邮箱" prop="customer.sendEmail">
                            <el-input   v-model="form.customer.sendEmail" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="收货地址" prop="customer.sendAddress">
                            <el-input   v-model="form.customer.sendAddress" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card>
                <div slot="header"  class="search-head"><span><i class="fa fa-tag"></i>收票联系人</span></div>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系人" prop="customer.billContact">
                            <el-autocomplete
                                    ref="invoiceContact"
                                    popperClass="my-popperClass"
                                    v-model="form.customer.billContact"
                                    :fetch-suggestions="querySearchCon"
                                    custom-item="my-item-con"
                                    @select="handleSelectBCon"
                            ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机" prop="customer.billContactPhone">
                            <el-input   v-model="form.customer.billContactPhone" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话" prop="customer.billTelephone">
                            <el-input   v-model="form.customer.billTelephone" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="邮箱" prop="customer.billEmail">
                            <el-input   v-model="form.customer.billEmail" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="收货地址" prop="customer.invoiceAddress">
                            <el-input   v-model="form.customer.invoiceAddress" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card>
                <div slot="header"  class="search-head"><span><i class="fa fa-tag"></i>公司账户</span></div>
                <el-table :data="bankList">
                    <el-table-column width="40">
                        <template slot-scope="scope">
                            <el-radio  v-model="form.bankId"  size="small" :label="scope.row.id" :disabled="modify">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" label="序号" ></el-table-column>
                    <el-table-column label="公司名称" prop="name" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="开户行" prop="bank_name" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="银行账号" prop="bank_account" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="行号" prop="bank_no" :show-overflow-tooltip="true"></el-table-column>
                </el-table>
            </el-card>
            <parts-list v-model="form.detailList" @setInfo="setInfo" :name="form.customer.customerName" :tax="form.includedTax" :orderType="form.orderType" :da = "Number(form.discountAmount)" :dis = "Number(form.discount)" :status="form.status" :am="Number(form.amount)" :ta="Number(form.totalAmount)"></parts-list>
            <div style="text-align: center;margin-bottom: 20px" v-if="$route.name == 'oadd'">
                <el-button type="success" @click="submit" :disabled="uploading">提交</el-button>
                <el-button type="primary" style="margin-left: 10px;" @click="saveOrder" :disabled="uploading">保存</el-button>
            </div>
            <div v-else style="text-align: center;margin-bottom: 20px">
                <el-button type="primary" style="margin-left: 10px;" @click="upOrder" :disabled="uploading">更新</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
    import PartsList from "./partsList/PartsList";
    import Vue from "vue"
    //客户名称下拉模板
    Vue.component('my-item-zh', {
        functional: true,
        render: function (h, ctx) {
            var item = ctx.props.item.customer;
            return h('li', ctx.data, [
                h('div', { attrs: { class: 'name',title:item.customerName } }, [item.customerName]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    //联系人下拉模板
    Vue.component('my-item-con', {
        functional: true,
        render: function (h, ctx) {
            var item = ctx.props.item;
            let telephone = item.conTelephone?item.conTelephone:''
            let mobile = item.conMobile?item.conMobile:''
            let email = item.conEmail?item.conEmail:''
            let address = item.conAddress?item.conAddress:''
            return h('li', ctx.data, [
                h('div', { attrs: { class: 'name',title:item.contact+'/'+telephone+'/'+mobile+'/'+email+'/'+address } }, [item.contact+'/'+telephone+'/'+mobile+'/'+email+'/'+address]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    export default{
        components: {PartsList},
        name: 'AddOrder',
        mounted(){
            this.doAjax();
            //联系人输入框注册监听事件
            this.$nextTick(()=>{
                let contact = document.getElementById('contact')
                let input = contact.getElementsByClassName("el-input__inner")[0]
                input.addEventListener('blur',()=>{
                   this.sycCon()
                })
                let group = document.getElementsByClassName('el-radio-group')
                for(let radio of group){
                    radio.addEventListener('click',()=>{
                        this.daTool()
                    })
                }
            })
        },
        data()
        {
            return {
                status:1,
                form: {
                    serialId: "",//单据流水号
                    orderSource: 1,//订单来源
                    orderType: 1,//订单类型
                    payMethod: 2,//付款方式
                    includedTax: 1,//是否含税
                    customerOrderId: "",//客户订单号
                    machineSalesman: '',//机器业务员
                    photoFileNameList: [],//凭证
                    remark: '',//备注
                    customer: {
                        customerName: '',//客户名称
                        telephone: '',//客户电话
                        contact: '',//联系人
                        mobile: '',//手机
                        email: '',//邮箱
                        fax: '',//传真
                        customerAddress: '',//客户地址
                        sendContact: '',//收货联系人
                        sendPhone: '',//收货联系人手机
                        sendTelephone: '',//收货联系人电话
                        sendEmail: '',//收货联系人邮箱
                        sendAddress: '',//收货地址
                        billContact: '',//收票联系人
                        billContactPhone: '',//收票联系人手机
                        billTelephone: '',//收票联系人电话
                        billEmail: '',//收票联系人邮箱
                        invoiceAddress: '',//收票联系人收货地址
                    },
                    bankId: 1,//公司账户
                    detailList: [],//配件详细列表
                    amount: 0,//配件金额总计
                    totalAmount: 0,//优惠后金额总计
                    discountAmount: 0,//抹零金额
                    discount: 0,//总体折扣(％)
                    totalMoneyWithTax: 0,//总价（含税）
                    totalMoneyWithoutTax:0,//总价（不含税）
                },
                dialogImageUrl: '',
                dialogVisible: false,
                fileList:[],
                bankList:[],
                rules:{
                    'customer.customerName':[{ required: true, message: '请输入客户名称', trigger: 'blur' },
                        {  max: 50, message: '最多输入50个字', trigger: 'blur' }],
                    'customer.contact':[{ required: true, message: '请输入联系人', trigger: 'blur' },
                        {  max: 20, message: '最多输入20个字', trigger: 'blur' }],
                    'customer.customerAddress':[{ required: true, message: '请输入客户地址', trigger: 'blur' },
                        {  max: 100, message: '最多输入100个字', trigger: 'blur' }],
                    'customer.sendContact':[{ required: true, message: '请输入联系人', trigger: 'blur' },
                        {  max: 20, message: '最多输入20个字', trigger: 'blur' }],
                    'customer.sendAddress':[{ required: true, message: '请输入收货地址', trigger: 'blur' },
                        {  max: 100, message: '最多输入100个字', trigger: 'blur' }],
                    'customer.billContact':[{ required: true, message: '请输入联系人', trigger: 'blur' },
                        {  max: 20, message: '最多输入20个字', trigger: 'blur' }],
                    'customer.invoiceAddress':[{ required: true, message: '请输入收货地址', trigger: 'blur' },
                        {  max: 100, message: '最多输入100个字', trigger: 'blur' }],
                    'customer.sendEmail':[{type:'email',message:'请输入正确的邮箱', trigger: 'blur'},
                        {  max: 50, message: '最多输入50个字', trigger: 'blur' }],
                    'customer.billEmail':[{type:'email',message:'请输入正确的邮箱', trigger: 'blur'},
                        {  max: 50, message: '最多输入50个字', trigger: 'blur' }],
                    'customer.email':[{type:'email',message:'请输入正确的邮箱', trigger: 'blur'},
                        {  max: 50, message: '最多输入50个字', trigger: 'blur' }],
                    machineSalesman:[{ required: true, message: '请输入机器业务员', trigger: 'blur' },
                        {  max: 50, message: '最多输入50个字', trigger: 'blur' }],
                    remark:[{  max: 100, message: '最多输入100个字', trigger: 'blur' }],
                    'customer.fax':[{  max: 20, message: '最多输入20个字', trigger: 'blur' }],
                    'customer.sendPhone':[{  max: 20, message: '最多输入20个字', trigger: 'blur' }],
                    'customer.billContactPhone':[{  max: 20, message: '最多输入20个字', trigger: 'blur' }],
                    'customer.mobile':[{  max: 20, message: '最多输入20个字', trigger: 'blur' }],
                    'customer.telephone':[{  max: 100, message: '最多输入100个字', trigger: 'blur' }],
                    'customerOrderId':[{  max: 50, message: '最多输入50个字', trigger: 'blur' }],
                },
                currentCont:[],
                uploading:false
            }
        },
        methods:{
            daTool(){
              //刷新配件
                let boo = this.$store.state.moduleOrder.daTool
                this.$store.commit('SET_DATOOL',!boo)
            },
            /**图片相关**/
            handleRemove(file, fileList) {
                if(file){
               this.$http.post('/deletefile',{"path":file.response.data.url})
                   .then((response)=> {
                   console.log(fileList)
                       this.form.photoFileNameList=[]
                       fileList.map((item)=> {
                           this.form.photoFileNameList.push(item.response.data.url)
                       })
                   })
                   .catch( (error) =>{
                       console.log(error);
                   });
                }
            },
            handlePictureCardPreview(file) {
                console.log(file)
                this.dialogImageUrl = file.response.data.url;
                this.dialogVisible = true;
            },
            handleSuccess(response, file, fileList){
                this.form.photoFileNameList=[]
                fileList.map((item)=> {
                    this.form.photoFileNameList.push(item.response.data.url)
                })
                console.log( this.form.photoFileNameList)
            },
            beforeUpload(file){
                var acceptSufstr = "jpeg|jpg|png";
                var suffix = file.name.substr(file.name.lastIndexOf(".")+1).toLowerCase();
                var size = file.size
                if(acceptSufstr.indexOf(suffix)==-1){
                    this.$message({
                        type:"error",
                        message:"上传文件格式错误"
                    });
                    this.$refs.upload.uploadFiles.pop();
                    return false;
                }
            },
            parse(val){
                this.fileList = []
                val.map((item)=> {
                    let obj = {response:{data:{url:item}},url:item}
                    this.fileList.push(obj)
                })
            },
            /**配件相关**/
            setInfo(name,val){
               this.form[name] = val
            },
            /**获取流水号与银行卡**/
            doAjax(){
                if(this.$route.name == 'oadd'){
                this.$http.post("/task/add")
                    .then((response)=> {
                        if(response.data.state == '200'){
                            this.bankList = response.data.data.cbinfo;
                            this.form = {
                                serialId: response.data.data.serialId,//单据流水号
                                    orderSource: 1,//订单来源
                                    orderType: 1,//订单类型
                                    payMethod: 2,//付款方式
                                    includedTax: 1,//是否含税
                                    customerOrderId: "",//客户订单号
                                    machineSalesman: '',//机器业务员
                                    photoFileNameList: [],//凭证
                                    remark: '',//备注
                                    customer: {
                                    customerName: '',//客户名称
                                        telephone: '',//客户电话
                                        contact: '',//联系人
                                        mobile: '',//手机
                                        email: '',//邮箱
                                        fax: '',//传真
                                        customerAddress: '',//客户地址
                                        sendContact: '',//收货联系人
                                        sendPhone: '',//收货联系人手机
                                        sendTelephone: '',//收货联系人电话
                                        sendEmail: '',//收货联系人邮箱
                                        sendAddress: '',//收货地址
                                        billContact: '',//收票联系人
                                        billContactPhone: '',//收票联系人手机
                                        billTelephone: '',//收票联系人电话
                                        billEmail: '',//收票联系人邮箱
                                        invoiceAddress: '',//收票联系人收货地址
                                },
                                bankId: 1,//公司账户
                                    detailList: [],//配件详细列表
                                    amount: 0,//配件金额总计
                                    totalAmount: 0,//优惠后金额总计
                                    discountAmount: 0,//抹零金额
                                    discount: 0,//总体折扣(％)
                                totalMoneyWithTax: 0,//总价（含税）
                                totalMoneyWithoutTax:0,//总价（不含税）
                            }
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
                    this.$http.post("/task/edit",{param:this.$route.params.id})
                        .then((response)=> {
                            if(response.data.state == '200'){
                                this.bankList = response.data.data.cbinfo;
                                if(response.data.data.orderDetail){
                                    this.status = response.data.data.orderDetail.status
                                this.form = Object.assign(this.form,response.data.data.orderDetail)
                                this.form.detailList = response.data.data.orderDetail.orderDetailDtos?response.data.data.orderDetail.orderDetailDtos:[]
                                    this.form.customer.customerAddress = response.data.data.orderDetail.customer.address
                                    this.form.customer.email = response.data.data.orderDetail.customer.conEmail
                                    this.form.customer.mobile = response.data.data.orderDetail.customer.conMobile
                                    this.parse(this.form.photoFileNameList)
                                }
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
            /**客户联系人查询**/
            querySearch(queryString, cb) {
                console.log(queryString)
                this.$http.post("/asm/customerInfos",{param:queryString})
                    .then((response)=> {
                        if(response.data.state == '200'){
                            let results = response.data.data.customerInfos
                            // 调用 callback 返回建议列表的数据
                            cb(results);
                        }
                    })
            },
            querySearchCon(queryString, cb) {
                // 调用 callback 返回建议列表的数据
                var results = queryString ? this.currentCont.filter(this.createFilter(queryString)) : this.currentCont;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (r) => {
                    return (r.contact.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelectCon(item){
                this.form.customer.contact = item.contact?item.contact:""
                this.form.customer.customerAddress = item.conAddress?item.conAddress:""
                this.form.customer.mobile = item.conMobile?item.conMobile:""
                this.form.customer.email = item.conEmail?item.conEmail:""
                this.$refs['sendContact'].handleFocus()
            },
            handleSelect(item) {
             this.form.customer.customerName = item.customer.customerName
                this.form.customer.fax = item.customer.fax
                this.form.customer.telephone = item.customer.telephone
                this.currentCont = item.contact?item.contact:[]
                if(this.currentCont.length==1){
                 let con = this.currentCont[0]
                    this.handleSelectCon(con)
                }else{
                    this.$refs['contact'].handleFocus()
                }
            },
            handleSelectSCon(item){
                this.form.customer.sendContact = item.contact?item.contact:""
                this.form.customer.sendAddress = item.conAddress?item.conAddress:""
                this.form.customer.sendPhone = item.conMobile?item.conMobile:""
                this.form.customer.sendTelephone = item.conTelephone?item.conTelephone:""
                this.form.customer.sendEmail = item.conEmail?item.conEmail:""
                this.$refs['invoiceContact'].handleFocus()
            },
            handleSelectBCon(item){
                this.form.customer.billContact = item.contact?item.contact:""
                this.form.customer.invoiceAddress = item.conAddress?item.conAddress:""
                this.form.customer.billContactPhone = item.conMobile?item.conMobile:""
                this.form.customer.billTelephone = item.conTelephone?item.conTelephone:""
                this.form.customer.billEmail = item.conEmail?item.conEmail:""
            },
            /**保存**/
            saveOrder(){
                if(Number(this.form.discount)>100){
                    this.$message({
                        'type': 'warning',
                        message: "折扣不能大于100%！",
                        'showClose': true
                    });
                    return false
                }
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        this.$store.commit('SET_LIST_PUSH',true)//打开列表跳转开关
                        this.uploading = true
                        this.$http.post("/task/addForm", {param: JSON.stringify(this.form)})
                            .then((response) => {
                                if (response.data.data.status == '200') {
                                    this.$message({
                                        'type': 'success',
                                        message: "操作成功",
                                        'showClose': true
                                    });
                                    this.$router.push({path:'/order',query:{orderId:response.data.data.message}})
                                } else {
                                    this.$message({
                                        'type': 'error',
                                        message: "操作失败，,请重试或联系管理",
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
                    }else{
                        this.$nextTick(()=> {
                            document.getElementsByClassName("el-form-item__error")[0].parentNode.getElementsByClassName('el-input__inner')[0].scrollIntoView()
                            document.getElementsByClassName("el-form-item__error")[0].parentNode.getElementsByClassName('el-input__inner')[0].focus()
                        })
                    }
                })
            },
            /**更新**/
            upOrder(){
                if(Number(this.form.discount)>100){
                    this.$message({
                        'type': 'warning',
                        message: "折扣不能大于100%！",
                        'showClose': true
                    });
                    return false
                }
                if(this.form.orderType==6&&(this.form.detailList===undefined||this.form.detailList==null||this.form.detailList.length<1)){
                    this.$message({
                        'type': 'warning',
                        message: "配件明细最少添加一项！",
                        'showClose': true
                    });
                    return false
                }
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        this.uploading = true
                        this.$http.post("/task/upDateForm", {param: JSON.stringify(this.form)})
                            .then((response) => {
                                if (response.data.data.status == '200') {
                                    this.$message({
                                        'type': 'success',
                                        message: "操作成功",
                                        'showClose': true
                                    });
                                    this.$router.push('/order/detail/'+this.$route.params.id+'/allDetail/tab1')
                                } else {
                                    this.$message({
                                        'type': 'error',
                                        message: "操作失败，,请重试或联系管理",
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
                    }else{
                        this.$nextTick(()=> {
                            document.getElementsByClassName("el-form-item__error")[0].parentNode.getElementsByClassName('el-input__inner')[0].scrollIntoView()
                            document.getElementsByClassName("el-form-item__error")[0].parentNode.getElementsByClassName('el-input__inner')[0].focus()
                        })
                    }
                })
            },
            /**提交**/
            submit(){
                if(Number(this.form.discount)>100){
                    this.$message({
                        'type': 'warning',
                        message: "折扣不能大于100%！",
                        'showClose': true
                    });
                    return false
                }
                if(this.form.detailList===undefined||this.form.detailList==null||this.form.detailList.length<1){
                    this.$message({
                        'type': 'warning',
                        message: "配件明细最少添加一项！",
                        'showClose': true
                    });
                    return false
                }
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        this.$store.commit('SET_LIST_PUSH',true)//打开列表跳转开关
                        this.uploading = true
                        this.$http.post("/task/addForm", {param: JSON.stringify(this.form)})
                            .then((response) => {
                                if (response.data.data.status == '200') {
                                    this.$message({
                                        'type': 'success',
                                        message: "操作成功",
                                        'showClose': true
                                    });
                                    this.$router.push({path:'/order',query:{orderId:response.data.data.message}})
                                } else {
                                    this.$message({
                                        'type': 'error',
                                        message: "操作失败，,请重试或联系管理",
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
                    }else{
                        this.$nextTick(()=> {
                            document.getElementsByClassName("el-form-item__error")[0].parentNode.getElementsByClassName('el-input__inner')[0].scrollIntoView()
                            document.getElementsByClassName("el-form-item__error")[0].parentNode.getElementsByClassName('el-input__inner')[0].focus()
                        })
                    }
                })
            },

            //同步联系人
            sycCon(){
                if (this.form.customer.sendContact == "") {
                    this.form.customer.sendContact = this.form.customer.contact
                }
                if (this.form.customer.billContact == "") {
                    this.form.customer.billContact = this.form.customer.contact
                }
            },
            sycAdd(){
                if(this.form.customer.sendAddress==""){
                    this.form.customer.sendAddress = this.form.customer.customerAddress
                }
                if(this.form.customer.invoiceAddress==""){
                    this.form.customer.invoiceAddress = this.form.customer.customerAddress
                }
            },
            sycMobile(){
                if(this.form.customer.sendPhone==""){
                    this.form.customer.sendPhone = this.form.customer.mobile
                }
                if(this.form.customer.billContactPhone==""){
                    this.form.customer.billContactPhone = this.form.customer.mobile
                }
            },
            sycEmail(){
                if(this.form.customer.sendEmail==""){
                    this.form.customer.sendEmail = this.form.customer.email
                }
                if(this.form.customer.billEmail==""){
                    this.form.customer.billEmail = this.form.customer.email
                }
            },
        },
        computed:{
            isShow(){
                return (this.form.orderType == 2 || this.form.orderType ==3 || this.form.orderType ==4)
            },
            title(){
                return this.$route.name == 'oadd'?"新增报价单":"修改报价单"
            },
            modify(){
                console.log(this.status)
                return (this.$route.name=='oedit' && this.status != 1)
            }
        },
        watch:{
            '$route'(n,o){
              this.doAjax()
            },
            'form.orderType'(){
//                this.form.machineSalesman=''
//                    this.from.photoFileNameList= []
            },
            'form.orderSource'(){
                this.form.bankId = this.form.orderSource
            }
        },
    }
</script>
<style>
</style>