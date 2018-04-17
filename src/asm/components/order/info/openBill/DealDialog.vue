/**
* Created by chenhuanlu on 2017/10/26.
  处理弹窗
*/

<template>
  <el-dialog v-model="show" @close="closeDialog" title="发票面单" size="tiny"  :close-on-click-modal="false">
    <el-form label-width="90px" :model="form" :rules="rules" ref="form">
      <el-form-item label="发票号"  prop="invoiceNo">
        <el-input size="small" :disabled="true" v-model="form.invoiceNo"></el-input>
      </el-form-item>
      <el-form-item label="开票日期"  prop="pendingDate">
        <el-input size="small" :disabled="true" v-model="form.pendingDate"></el-input>
      </el-form-item>
      <el-form-item label="快递公司"  prop="expressCompany">
        <el-input size="small" :disabled="true" v-model="form.expressCompany"></el-input>
      </el-form-item>
      <el-form-item v-if="form.expressCompany!='客户自提'&&form.expressCompany!='人员带走'" label="快递单号" prop="trackingNo">
        <el-input  size="small" v-model="form.trackingNo"></el-input>
      </el-form-item>
      <el-form-item label="寄件日期" prop="sendSate">
        <el-date-picker
          v-model="form.sendSate"
          align="right"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <div style="text-align: center">
        <el-button type="success" size="small" @click="submit">提交</el-button>
        <el-button  style="margin-left: 10px;" size="small" @click="closeDialog">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>

  export default{
    name: 'NewParts',
    props:{
      value:{
        type:Boolean,
        default:false
      },
      dealBillInfo: {
        type: Object,
        default(){
          return {}
        },
      }
    },
    mounted(){


    },
    data(){
      return{
        show:this.value,
        form:{
          invoiceNo:'',
          pendingDate:'',
          expressCompany:'',
          sendSate:'',
          trackingNo:'',
          order_id:'',
          invoice_id:'',
          status:'',
        },
        pendingDate:'',
        rules:{
          invoiceNo: [
        { required: true, message: '请输入发票号', trigger: 'blur' }
      ],
          pendingDate: [
            { required: true, message: '请输入开票日期', trigger: 'change' }
          ],
          expressCompany: [
            { required: true, message: '请先设置发票面单！', trigger: 'blur' }
          ],
          sendSate: [
            {type:'date', required: true, message: '请选择寄件日期！', trigger: 'blur' }
          ],
          trackingNo: [
            { required: true, message: '请输入快递单号', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      closeDialog(){
        this.$refs['form'].resetFields();
        this.show = false
        this.$emit('input', this.show)
      },

      submit(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let param = {
              "order_id": this.form.order_id,
              "invoice_id": this.form.invoice_id,
              "status": this.form.status,
              "invoice_no": this.form.invoiceNo,
              "pendingDate": this.pendingDate,
              "express_company":this.form.expressCompany,
              "tracking_no": this.form.trackingNo,
              "send_date": this.form.sendSate.toString(),
            };
            this.$http.post("/invoice/deal", {param:JSON.stringify(param)})
              .then((response) => {
                let res = response.data;
                if(res.status==200){
                  this.$emit("refreshCur",res.orderId);
                  this.$message({
                    type: 'success',
                    message: '操作成功！'
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
            this.closeDialog();

          }
        });
      }
    },
    computed:{

    },
    watch:{
      'value'(n){
        this.show=n
      },
      dealBillInfo:function (v) {
          if(v){
            this.pendingDate = v.pendingDate?new Date(v.pendingDate).toString():'';
            this.form.pendingDate = v.pendingDate?new Date(v.pendingDate).toString().substring(0,10):'';

            this.form.invoiceNo = v.invoiceNo;
            this.form.order_id = v.orderId;
            this.form.invoice_id = v.id;
            this.form.status = v.status;
            this.form.trackingNo = v.trackingNo;
            this.form.sendSate = v.sendSate;
            this.form.expressCompany = v.expressCompany;
          }

      }
    }
  }
</script>
<style>
</style>
