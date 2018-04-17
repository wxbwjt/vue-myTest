/**
* Created by chenhuanlu on 2017/10/26.
*/

<template>
    <div>
      <el-dialog @close="close" custom-class="headtitle"   :title="totalDeliveryAmount" :visible.sync="show" :close-on-click-modal="true">

        <el-form :model="form"  :rules="rules" ref="form" >
          <el-row type="flex">
            <el-col :span="11">
              <el-form-item prop="invoice_no" label="发票号" :label-width="formLabelWidth">
                <el-input v-model="form.invoice_no"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="8">
              <el-form-item prop="date" label="开票日期" required :label-width="formLabelWidth">
                <el-date-picker
                  v-model="form.date"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <div slot="footer" style="text-align: center">
          <el-button type="primary" style="width: 200px" @click="submit('form')">提交</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  export default{
      mounted(){
      },
    props: {
      dialogBillVisible: {
        type: Boolean,
        default: false
      },
      billData: {
        type: Object
      },

    },
    methods: {
      close(){
        this.$refs['form'].resetFields();
        this.show = false;
        this.$emit('closeBillDialog', this.show);
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param= {
              "order_id": this.billData.orderId,
              "invoice_id": this.billData.id.toString(),
              "status": this.billData.status.toString(),
              "invoice_no": this.form.invoice_no,
              "pendingDate": this.dateFormate
            };
            this.$http.post("/invoice/deal", {param:JSON.stringify(param)})
              .then((response) => {
                let res = response.data;
                if(res.status==200){
                  this.$emit("getBillList",res.orderId);
                  this.$message({
                    type: 'success',
                    message: '操作成功！'
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
            this.close();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    data(){
      return {
        param:{},

        show:this.dialogBillVisible,
        form: {
          date:'',
          invoice_no: '',
          discountAmount:'12'
        },
        rules: {
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          invoice_no: [
            { required: true, message: '请填写发票号', trigger: 'change' },
            { min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur' }
          ],


        },
        formLabelWidth: '120px'
      }
    },
    computed: {
        dateFormate:function () {
              return this.form.date?this.form.date.toString():''
        },
      totalDeliveryAmount:function () {
        return  '已发货金额:'+(this.billData.totalDeliveryAmount?this.billData.totalDeliveryAmount:'0.00');
      }




    },

    watch: {
      'dialogBillVisible': function (val) {
        this.show = val;
      },
      billData:function (val) {

      }
    }
  }
</script>

<style >
  .headtitle .el-dialog__title{
    font-size: 14px !important;
    color: #48576a !important;
  }
</style>
