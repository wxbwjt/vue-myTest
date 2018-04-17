/**
* 配件详情/修改
*/
<template>
  <div class="card-box">
    <el-card>
      <div slot="header" class="search-head">
        <span><i class="fa fa-pencil-square-o"></i>{{title}}</span>
        <div style="float: right;margin-top: -5px;" v-if="type === 'pedit'">
          <el-button  type="success" size="small"  @click="add"><i class="fa fa-plus-circle"></i> 新增配件</el-button>
        </div>
      </div>
      <el-form :model="formPart" :rules="rules" label-width="80px" ref="formPart" >
        <el-form-item label="配件名称" prop="name">
          <el-input v-model="formPart.name"   placeholder="配件名称"></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="specification">
          <el-input v-model="formPart.specification"   placeholder="型号"></el-input>
        </el-form-item>
        <el-form-item label="机型" prop="mashineType">
          <el-input v-model="formPart.mashineType"   placeholder="机型"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="formPart.unit"   placeholder="单位"></el-input>
        </el-form-item >
        <el-form-item label="单价(元)" prop="basePrice">
          <el-input v-model="formPart.basePrice"   placeholder="单价(元)"></el-input>
        </el-form-item >
        <el-form-item label="售价(元)" prop="salePrice">
          <el-input v-model="formPart.salePrice"   placeholder="售价(元)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="save('formPart')"  style="float: right">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  export default {
    name:"ProductsDetail",
    mounted:function(){
      this.id = this.$route.params.id;
      this.type = this.$route.name;
    },
    data(){
      return {
        id:0,
        type:"",
        formPart: {name: '', specification: '', mashineType: '', unit: '', basePrice: '', salePrice: ''},
        rules:{
          name: [
            { required: true, message: '请输入配件名称', trigger: 'blur' },
            { min: 1, max: 100, message: '最多输入100个字符', trigger: 'blur' }

          ],
          specification: [
            { required: true, message: '请输入型号', trigger: 'blur' },
            { min: 1, max: 100, message: '最多输入100个字符', trigger: 'blur' }
          ],
          mashineType: [
            { required: true, message: '请输入机型', trigger: 'blur' },
            { min: 1, max: 50, message: '最多输入50个字符', trigger: 'blur' }

          ],
          unit: [
            { required: true, message: '请输入单位', trigger: 'blur' },
            { min: 1, max: 20, message: '最多输入20个字符', trigger: 'blur' }

          ],
        },
      }
    },
    methods:{
      add(){
        this.$router.push('/products/add')

      },
      save(formName) {
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = JSON.stringify(self.formPart);
            this.type==='padd' ? self.doAjaxAdd(data):self.doAjaxUpdate(data);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      doAjaxUpdate(data){
        this.$http.post("/products/uptProds", {"param":data})
          .then((response) => {
            let res = response.data.data;
            if (res.result==='success'){
              this.$message({
                showClose: true,
                message: '更新成功！',
                type: 'success'
              });
              this.$emit("setParam")
              this.resetForm('formPart');
              this.type = "padd";
            }else {
              this.$message({
                showClose: true,
                message: '操作失败！',
                type: 'warning'
              });
            }

          })
          .catch((error) => {
            console.log(error);
          });

      },
        doAjaxAdd(data){
          this.$http.post("/products/addProds", {"param":data})
            .then((response) => {
              let res = response.data.data;
              if (res.result==='success'){
                this.$message({
                  showClose: true,
                  message: '新增成功！',
                  type: 'success'
                });
                this.$emit("setParam");
                this.resetForm('formPart');
              }else {
                this.$message({
                  showClose: true,
                  message: '操作失败！',
                  type: 'warning'
                });
              }

            })
            .catch((error) => {
              console.log(error);
            });
        }
    },
      computed:{
          title(){
             return this.type === "padd"?"新增配件":"修改配件"
          }
      },
    components:{
    },
    watch:{
      "$route": function(){
        this.id = this.$route.params.id;
        this.type = this.$route.name;
        this.formPart=this.$route.query;
      }
    }
  }
</script>
<style scoped>

</style>
