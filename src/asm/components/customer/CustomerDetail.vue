/**
* 客户详情/编辑
*/
<template>
  <div class="card-box">
    <el-card>
      <div slot="header" class="search-head">
        <span><i class="fa fa-pencil-square-o"></i>{{title}}</span>
        <div style="float: right;margin-top: -5px;" v-if="type != 'cadd'">
          <el-button  type="success" size="small"  @click="add"><i class="fa fa-plus-circle"></i> 新增客户</el-button>
        </div>
      </div>
      <el-form label-width="80px" ref="new" :model="form" :rules="rules">
        <el-form-item label="客户名称" prop="customerName">
          <el-input   placeholder="客户名称"  :readonly="readOnly" v-model="form.customerName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input   placeholder="电话"  :readonly="readOnly" v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input   placeholder="传真"  :readonly="readOnly" v-model="form.fax"></el-input>
        </el-form-item>
        <el-form-item label="税号" prop="taxNo">
          <el-input   placeholder="税号"  :readonly="readOnly" v-model="form.taxNo"></el-input>
        </el-form-item >
        <el-form-item label="客户地址" prop="customerAddress">
          <el-input   placeholder="客户地址"  :readonly="readOnly" v-model="form.customerAddress"></el-input>
        </el-form-item >
        <el-form-item label="账户余额" prop="accountAmount">
          <el-input   placeholder="账户余额"  :readonly="readOnly" v-model="form.accountAmount"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bankName">
          <el-input   placeholder="开户银行"  :readonly="readOnly" v-model="form.bankName"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input   placeholder="银行账号"  :readonly="readOnly" v-model="form.bankAccount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small"  style="float: right" v-if="!readOnly" @click="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  export default {
    name:"CustomerDetail",
    mounted:function(){
      this.id = this.$route.params.id;
      this.type = this.$route.name;
      if(this.type!='cadd'){
          this.doAjax()
      }
    },
    data(){
      return {
          id:0,
          type:"",
          form:{
              id:"",
              customerName:"",
              fax:"",
              telephone:"",
              customerAddress:"",
              taxNo:"",
              bankName:"",
              bankAccount:"",
              bankInfoId:"",
              accountAmount:""
          },
          rules:{
              customerName:[{ required: true, message: '请输入客户名称', trigger: 'blur' },{  max: 50, message: '最多输入50个字', trigger: 'blur' }],
              customerAddress:[{ required: true, message: '请输入客户地址', trigger: 'blur' },{  max: 100, message: '最多输入100个字', trigger: 'blur' }],
              telephone:[{  max: 100, message: '最多输入100个字', trigger: 'blur' }],
              fax:[{  max: 20, message: '最多输入20个字', trigger: 'blur' }]
          }
      }
    },
    methods:{
        add(){
            this.$router.push('/customer/add')
        },
        doAjax(){
            let bankId = this.$route.query.bankId;
            if(typeof(bankId) === undefined||bankId=="undefined"){
                bankId = ""
            }
            let data = {"custId":this.id,"bankId":bankId};
            this.$http.post("/config/qryCustForUpt",data)
                .then((response)=> {
                    if(response.data.state == '200'){
                        let data = response.data.data.custInfo
                        this.form.id = data.id;
                        this.form.customerName = data.customerName;
                        this.form.fax = data.fax;
                        this.form.telephone = data.telephone;
                        this.form.customerAddress = data.customerAddress;
                        this.form.taxNo = data.taxNo;
                        this.form.bankName = data.bankName;
                        this.form.bankAccount = data.bankAccount;
                        this.form.bankInfoId = data.bankInfoId;
                        this.form.accountAmount = data.accountAmount;
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
                    let url = "/config/uptCusts"
                    if(this.type == 'cadd') {
                        url = url.replace("upt","add")
                    }
                    let custInfo = JSON.stringify(this.form);
                    let BankInfo = JSON.stringify({"bankName":this.form.bankName,"bankAccount":this.form.bankAccount,"id":this.form.bankInfoId});
                    let data = {"custInfo":custInfo,"BankInfo":BankInfo}
                    this.$http.post(url,data)
                        .then((response)=> {
                            if(response.data.data.status == '200'){
                                this.$message({
                                    'type':'success',
                                    message:"保存成功",
                                    'showClose':true
                                });
                                this.$router.push('/customer')
                                this.$refs['new'].resetFields();
                            }else{
                                this.$message({
                                    'type':'error',
                                    message:"提交失败，,请重新登陆或联系管理员",
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
                }
            });
        }
    },
      computed:{
        title(){
          return this.type === "cadd"?"新增客户":(this.type === "cedit"?"修改客户":"查看客户")
        },
          readOnly(){ return this.type === "cinfo"}
      },
    components:{
    },
    watch:{
      "$route": function(){
        this.id = this.$route.params.id;
          this.type = this.$route.name;
          this.$refs['new'].resetFields();
          if(this.type!='cadd'){
              this.doAjax()
          }
      }
    }
  }
</script>
<style scoped>
  
</style>