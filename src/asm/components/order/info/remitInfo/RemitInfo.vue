/**
* Created by chenhuanlu on 2017/10/21.
*/

<template>
    <div class="containerb table-small-padding big-table">
      <el-card >
        <div slot="header"  class="search-head">
            <span><i class="fa fa-tag"></i>子订单金额</span>
        </div>
        <div>
      <el-table :data="subOrder"   border>
        <el-table-column type="index" label="序号" width="60" align="center"> </el-table-column>
        <el-table-column label="订单号" min-width="160" align="center" prop="orderId"> </el-table-column>
        <el-table-column  label="订单类型"  min-width="160" align="center">
          <span slot-scope="scope">{{orderTypes[scope.row.type-1]}}</span></el-table-column>
        <el-table-column label="总价(含税)" min-width="160"  align="center" prop="totalMoneyWithTax"> </el-table-column>
        <el-table-column label="总价(不含税)" min-width="160" align="center" prop="totalMoneyWithoutTax"> </el-table-column>
      </el-table>
        </div>
      </el-card>
      <br/>
      <el-card >
        <div slot="header"  class="search-head">
          <el-row type="flex" class="row-bg" justify="space-around" align="middle">
            <el-col :span="6"><span><i class="fa fa-tag"></i>汇款记录</span></el-col>
            <el-col :span="6" >总价(含税):{{orderDetail.discountAmount&&orderDetail.totalMoneyWithTax!=0?orderDetail.totalMoneyWithTax:'0.00'}}</el-col>
            <el-col :span="6" >总价(不含税):{{orderDetail.discountAmount&&orderDetail.totalMoneyWithoutTax!=0 ? orderDetail.totalMoneyWithoutTax:'0.00'}}</el-col>
            <el-col :span="6">账户余额:{{orderDetail.customer.accountAmount?orderDetail.customer.accountAmount:'0.00'}}</el-col>
            <el-col v-if="orderDetail.customer.status == 1" :span="6">
              <AuthWraper permission="task_asm:remit"><el-button @click="remitRegist" type="primary">汇款登记</el-button></AuthWraper>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-table :data="tableData"    border>
            <el-table-column type="index" label="序号" min-width="60" align="center"> </el-table-column>
            <el-table-column  label="到款日期" min-width="70"   align="center" >
              <span slot-scope="scope">{{new Date(scope.row.payTime).toString().substring(0,10)}}</span>
            </el-table-column>
            <el-table-column prop="amount" label="到款金额" min-width="70"  align="center"> </el-table-column>
            <el-table-column prop="balance" label="余额" min-width="40"  align="center"></el-table-column>
            <el-table-column  label="付款方式" min-width="70" >
              <span slot-scope="scope">{{payTypes[scope.row.pay_type-1]}}</span>
            </el-table-column>
            <el-table-column  label="是否结清" min-width="70">
              <span slot-scope="scope">{{scope.row.status==0?'未结清':'结清'}}</span>
            </el-table-column>
            <el-table-column prop="operatorName" label="记录人" min-width="70" ></el-table-column>
            <el-table-column prop="note" label="备注"  min-width="70"></el-table-column>
            <AuthWraper permission="task_asm:remit"><el-table-column v-if="orderDetail.customer.status == 1"  label="操作"  min-width="70">
              <!--v-if="this.isPermitted"-->
              <template  slot-scope="scope">
                <el-row type="flex"  justify="center">
                  <el-button @click="edit(scope.row,scope.$index)" type="button" size="small">修改</el-button>
                  <el-col :span="2"></el-col>
                  <el-button @click="deleteRow(scope.row,scope.$index)" type="button" size="small">删除</el-button>
                </el-row>
              </template>
            </el-table-column></AuthWraper>
          </el-table>
        </div>
        <br/>
        <AuthWraper permission="task_asm:remit">
        <el-form v-if="orderDetail.customer.status == 1" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="到款金额" prop="remit_amount">
                <el-input v-model="ruleForm.remit_amount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="到款日期" prop="remit_date">
                <el-form-item prop="remit_date">
                  <el-date-picker type="date"
                                  placeholder="选择日期"
                                  v-model="ruleForm.remit_date">
                  </el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="付款类型" prop="pay_type">
                <el-select clearable v-model="ruleForm.pay_type" placeholder="请选择">
                  <el-option :value="'1'" label="线下支付"></el-option>
                  <el-option :value="'2'" label="余额支付"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注" prop="remit_remark">
                <el-input v-model="ruleForm.remit_remark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button v-if="isAdd" type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button v-else type="primary" @click="submitForm('ruleForm')">更新</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        </AuthWraper>
      </el-card>

    </div>
</template>

<script>
    export default{
      name:'RemitInfo',
      mounted(){
        this.orderId = this.$route.params.id;//30792 30801
        this.listInfo(this.orderId);
      },
      data(){
        return {
          orderId: '',
          isAdd:true,
          rowID:'',
          isPermitted:false,
          tableData: [],
            subOrder:[],
          ruleForm: {
            remit_amount: null,
            remit_date: '',
            pay_type: '',
            remit_remark: '',
          },
          rules: {
            remit_amount: [
              { required: true, message: '请输入到款金额', trigger: 'blur' },
              { min: 0, max: 8, message: '长度在8个字符', trigger: 'blur' }
            ],
            remit_date: [
              { type: 'date', required: true, message: '请输入到款日期', trigger: 'change' }
            ],
            pay_type: [
              { required: true, message: '请选择付款方式 ', trigger: 'change' }
            ],
          }
        }
      },
      methods:{
        remitRegist(){//汇款登记
          this.resetForm('ruleForm');
          this.isAdd = true;
        },
        listInfo(orderId){
          this.$http.post("/remintInfo/query", {param:orderId})
            .then((response) => {
              let res = response.data;
              if (res.status === "200") {
                this.tableData = res.result.payments;
                this.isPermitted = res.isPermitted;
                this.subOrder=res.result.orders
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let addParam = {
                "remit_amount": this.ruleForm.remit_amount+'',
                "remit_date": this.ruleForm.remit_date+'',
                "remit_action":this.ruleForm.pay_type,
                "remit_remark": this.ruleForm.remit_remark,
                "orderId": this.orderId
              };

             let  updateParam = {
                "id": this.rowID,
                "remit_amount":this.ruleForm.remit_amount+'',
                "remit_date": this.ruleForm.remit_date+'',
                "remit_action": this.ruleForm.pay_type+'',
                "remit_remark": this.ruleForm.remit_remark,
                "orderId":this.orderId
              }
              if (this.isAdd === true) {
                this.addRemitInfo(addParam);
              } else {
                this.updateRemitInfo(updateParam);
              }

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        addRemitInfo(param){
          this.$http.post("/remintInfo/remitAdd", {param:JSON.stringify(param)})
            .then((response) => {
              let res = response.data;
              if (res.data.result == "success") {
                this.getDetail();
                this.$message({
                  type: 'success',
                  message: '新增成功！'
                });
                this.$refs['ruleForm'].resetFields();
                let custBalance=res.data.data.custBalance;
                this.listInfo(this.orderId)
              }else {
                  if(res.data.errMessage){
                    this.$message({
                      type: 'warning',
                      message: res.data.errMessage
                    });
                  }

              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        updateRemitInfo(param){

          this.$http.post("/remintInfo/remitUpdate", {param:JSON.stringify(param)})
            .then((response) => {
              let res = response.data;
              if (res.data.result == "success") {
                this.getDetail();
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.listInfo(this.orderId);
                this.$refs['ruleForm'].resetFields();
                this.isAdd = true;
              }else {
                if(res.data.errMessage){
                  this.$message({
                    type: 'warning',
                    message: res.data.errMessage
                  });}

              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        getDetail(){
          this.$http.post("/task/detail", {param:this.orderId})
            .then((response) => {
              let res = response.data;
              this.$store.commit("SET_ORDERDETAIL",res);//
              this.$store.commit("SET_ORDERBASEINFO",res.orderBaseInfo);//
              this.$store.commit("SET_ORDERDETAILLIST",res.orderDetailDtos);//
            })
            .catch((error) => {
              console.log(error);
            });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        edit(row){
          this.isAdd = false;
          this.rowID = row.id;
          this.ruleForm.remit_amount = row.amount +'';
          this.ruleForm.remit_date = row.payTime ? new Date(row.payTime) : '';
          this.ruleForm.pay_type = row.pay_type  +'';
          this.ruleForm.remit_remark = row.note;
          console.log(this.ruleForm)
        },
        /*删除*/
        deleteRow(row){
          this.$confirm('你确定需要删除该汇款记录吗？', '温馨提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param =  {"id":row.id,"custId":row.customerId,"orderId":row.orderId}
            this.$http.post("/remintInfo/remitDelete", {param:JSON.stringify(param)})
              .then((response) => {
                let res = response.data;
                if (res.data.result == "success") {
                  this.listInfo(this.orderId);
                  this.$message({
                    type: 'success',
                    message: '删除成功！'
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消删除'
            });
          });
        },
      },
      computed:{
        payTypes:function () {
          return this.$store.state.moduleOrder.enumsList.payTypes;
        },
        orderDetail:function () {
          return this.$store.state.moduleOrder.orderDetailData.orderDetail;
        },
          orderTypes(){
              return this.$store.state.moduleOrder.enumsList.orderTypes
          },
      }
    }
</script>

<style scoped>

   .el-col {
    color: #31708F;
  }
</style>
