/**
* 联系人
*/
<template>
    <div class="contact-dialog">
        <el-dialog  v-model="show"  :close-on-click-modal="false"  @close="closeDialog">
            <span slot="title" class="dialog-title" ><i class="fa fa-phone"></i> 联系人列表</span>
            <el-button size="small" type="success" style="float: right;margin-bottom: 5px" @click="addCont">新增联系人</el-button>
            <el-table :data="list">
                <el-table-column type="index" label="序号" min-width="20"></el-table-column>
                <el-table-column prop="contact" label="联系人" min-width="70" :show-overflow-tooltip="true"> </el-table-column>
                <el-table-column prop="conTelephone" label="电话" min-width="40" :show-overflow-tooltip="true"> </el-table-column>
                <el-table-column prop="conMobile" label="手机"  min-width="40" :show-overflow-tooltip="true"> </el-table-column>
                <el-table-column prop="conEmail" label="电子邮箱" min-width="70" :show-overflow-tooltip="true"> </el-table-column>
                <el-table-column prop="conPostCode" label="邮编"  min-width="40" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="conAddress" label="地址" min-width="40" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作"  min-width="50">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <transition name="fade">
                <div v-show="add" style="margin-top: 10px;">
                    <el-form label-width="80px" ref="new" :model="form" :rules="rules">
                        <el-form-item label="联系人" prop="customerId" v-show="false">
                        </el-form-item>
                        <el-col :span="11">
                            <el-form-item label="联系人" prop="contact">
                                <el-input placeholder="联系人" size="small" v-model="form.contact"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="电话" prop="conTelephone">
                                <el-input placeholder="电话" size="small" v-model="form.conTelephone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="手机" prop="conMobile">
                                <el-input placeholder="手机" size="small" v-model="form.conMobile"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="邮箱" prop="conEmail">
                                <el-input placeholder="邮箱" size="small" v-model="form.conEmail"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="邮编" prop="conPostCode">
                                <el-input placeholder="邮编" size="small" v-model="form.conPostCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="地址" prop="conAddress">
                                <el-input placeholder="地址" size="small" v-model="form.conAddress"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24"  style="text-align: center;margin-bottom: 20px">
                            <el-button type="primary" @click="submit" size="small">保存</el-button>
                            <el-button @click="closeAdd" size="small" >取 消</el-button>
                        </el-col>
                    </el-form>
                </div>
            </transition>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        name: 'ContactDetail',
        props:{
            value:{
                type:Boolean,
                default:false
            },
            cusId:{
                type:Number
            }
        },
        data(){
            return{
                id:"",
                list:[],
                show:this.value,
                add:false,
                form:{
                    customerId:"",
                    contact:"",
                    conMobile:"",
                    conTelephone:"",
                    conAddress:"",
                    conPostCode:"",
                    conEmail:""
                },
                rules:{
                    contact:[{ required: true, message: '请输入联系人', trigger: 'blur' },{  max: 20, message: '最多输入20个字', trigger: 'blur' }],
                    conMobile:[{ required: true, message: '请输入手机号码', trigger: 'blur' },{  max: 20, message: '最多输入20个字', trigger: 'blur' }],
                    conAddress:[{ required: true, message: '请输入联系地址', trigger: 'blur' },{  max: 100, message: '最多输入100个字', trigger: 'blur' }],
                    conEmail:[{ message: '请输入正确的邮箱', trigger: 'blur' ,type:'email'},{  max: 50, message: '最多输入50个字', trigger: 'blur' }],
                    conTelephone:[{  max: 100, message: '最多输入100个字', trigger: 'blur' }]
                }
            }
        },
        methods:{
            closeDialog(){
                this.closeAdd()
                this.show = false
                this.$emit('input', this.show)
            },
            addCont(){
                this.form={
                    customerId:"",
                    contact:"",
                    conMobile:"",
                    conTelephone:"",
                    conAddress:"",
                    conPostCode:"",
                    conEmail:""
                },
                this.add = true
            },
            closeAdd(){
                this.form={
                    customerId:"",
                    contact:"",
                    conMobile:"",
                    conTelephone:"",
                    conAddress:"",
                    conPostCode:"",
                    conEmail:""
                },
                this.add = false
            },
            handleEdit(val){
              this.form = val
                this.add = true
            },
            handleDelete(val){
                this.$http.get("/config/delConts?id="+val.id)
                    .then((response)=> {
                        if(response.data.data.status == '200'){
                            this.$message({
                                'type':'success',
                                message:"删除成功",
                                'showClose':true
                            });
                            this.doAjax()
                        }else{
                            this.$message({
                                'type':'error',
                                message:"操作失败，,请重试或联系管理",
                                'showClose':true
                            });
                        }
                    })
                    .catch( (error) =>{
                        this.$message({
                            'type':'error',
                            message:"请求服务器发生错误,请重新登陆或联系管理员",
                            'showClose':true
                        });
                    });
            },
            doAjax(){
                this.$http.get("/config/qryContact?id="+this.cusId)
                    .then((response)=> {
                        if(response.data.state == '200'){
                            this.list = response.data.data.custInfo.contact;
                            this.id = response.data.data.custInfo.customer.id
                        }else{
                            this.$message({
                                'type':'error',
                                message:"请求失败，,请重试或联系管理",
                                'showClose':true
                            });
                        }
                    })
                    .catch( (error) =>{
                        this.$message({
                            'type':'error',
                            message:"请求服务器发生错误,请重新登陆或联系管理员",
                            'showClose':true
                        });
                    });
            },
            submit(){
                this.$refs['new'].validate((valid) => {
                    if (valid) {
                        let url = "/config/addConts"
                        if(this.form.id) {
                            url = url.replace("add","upt")
                        }else{
                            this.form.customerId = this.id
                        }
                        console.log(this.form.id)
                        this.$http.post(url,{"param":JSON.stringify(this.form)})
                            .then((response)=> {
                                if(response.data.data.status == '200'){
                                    this.$message({
                                        'type':'success',
                                        message:"保存成功",
                                        'showClose':true
                                    });
                                    this.doAjax()
                                    this.add = false
                                }else{
                                    this.$message({
                                        'type':'error',
                                        message:"提交失败，,请重试或联系管理",
                                        'showClose':true
                                    });
                                }
                                this.form={
                                    customerId:"",
                                    contact:"",
                                    conMobile:"",
                                    conTelephone:"",
                                    conAddress:"",
                                    conPostCode:"",
                                    conEmail:""
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
                });
            }
        },
        computed:{
        },
        watch:{
            'value':function(n) {
                this.show = n
                if(n){
                    this.doAjax()
                }
            }
        }
    }
</script>
<style>
   .contact-dialog .el-dialog-small{
        border-radius: 4px;
    }
   .contact-dialog .dialog-title{
        font-size: 15px;
        color: grey;
    }
   .contact-dialog  .el-dialog__header{
        background-color: #f5f5f5;
        padding: 10px  20px;
        border-radius: 4px;
    }
   .contact-dialog  .el-dialog__body{
        padding: 10px  20px 20px;
    }

</style>