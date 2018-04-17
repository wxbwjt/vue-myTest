/**
* Created by chenhuanlu on 2017/10/26.
*/

<template>
    <div>
      <el-dialog @close="closeDialog"  title="作废原因" :visible.sync="show" :close-on-click-modal="true">
        <el-form :model="form"  :rules="rules"  ref="form" >
          <el-form-item label="" prop="remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
        <br/>
        <el-row type="flex"  justify="end">
          <el-button  style="margin-left: 10px;" size="small" @click="closeDialog">返回</el-button>
          <el-button type="primary" size="small" @click="submit('form')">确定</el-button>
        </el-row>
      </el-dialog>

    </div>
</template>

<script>
    export default{
      props:{
        value:{
          type:Boolean,
          default:false
        },
        row: {
          type: Object,
          default: {},
        }
      },
        data(){
            return{
              show:false,
              orderId:'',
              invoiceId:'',
              form: {
                remark: ''
              },
              rules: {
                remark: [
                  { required: true, message: '请填写发票作废原因', trigger: 'change' }
                ],
            }}
        },
      methods:{
        closeDialog(){
          this.$refs['form'].resetFields();
          this.show = false
          this.$emit('input', this.show)
        },
        submit(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post("/invoice/cancel", {orderId:this.orderId,invoiceId:this.invoiceId,remark:this.form.remark})
                .then((response) => {
                  let res = response.data;
                  if(res.status==200){
                    this.$emit("refresh",this.orderId);
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
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }


      },
      watch:{
        'value'(n){
          this.show=n
        },
        'row'(nval){
            this.orderId = nval.orderId;
            this.invoiceId = nval.id;

        }
      }
    }
</script>

<style scoped>

</style>
