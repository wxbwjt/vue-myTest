/**
* Created by chenhuanlu on 2017/10/21.
*/

<template>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        empty-text="暂无快递单数据"
        @row-click="rowCurrentChange"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          align="center"
          label="面单">
          <template slot-scope="scope">
            <span>{{scope.row.expressType==0 ? '快递面单':'发票面单'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="company.companyName"
          align="center"
          label="快递公司">
        </el-table-column>
        <el-table-column
          prop="contact.contact"
          align="center"
          label="联系人">
        </el-table-column>
        <el-table-column
          label="联系电话"
          align="center"
          show-overflow-tooltip>
          <span slot-scope="scope" v-if="scope.row.contact">
            {{scope.row.contact.conMobile}}{{scope.row.contact.conTelephone?'/'+scope.row.contact.conTelephone:''}}
          </span>
        </el-table-column>
        <el-table-column
          prop="contact.conAddress"
          align="center"
          show-overflow-tooltip
          label="收货地址">
        </el-table-column>
        <el-table-column
          width="180"
          prop="remark"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-row type="flex" style="width: 100%;" justify="space-between">
              <el-button @click="modify(scope.row,scope.$index)" type="button" size="small">修改</el-button>
              <el-button @click="del(scope.row,scope.$index)" type="button" size="small">删除</el-button>
              <el-button v-if="scope.row.company&&scope.row.company.companyName != '其他'" @click="print(scope.row,scope.$index)" type="button" size="small">打印</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <br/>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="选择面单" prop="expressType">
          <el-radio-group v-model="ruleForm.expressType">
            <el-radio label="0">快递面单</el-radio>
            <el-radio label="1">发票面单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="快递公司" prop="company">
          <el-radio-group v-model="ruleForm.company">
        <span v-for="(item,index) in companyList">
          <el-radio :label="item.expressId">{{item.companyName}}&nbsp;</el-radio>
        </span>
          </el-radio-group>
        </el-form-item>
          <el-row type="flex"  justify="center">
              <el-button v-if="isEditBtn==false" style="width: 200px" type="primary" @click="submitForm('ruleForm')">新增</el-button>
              <el-button v-if="isEditBtn==true" style="width: 200px" type="primary" @click="submitEdit('ruleForm')">修改</el-button>
          </el-row>

      </el-form>

      <br/>


    </div>
</template>

<script>
  import facesFormat from "../../../print/express/facesFormat"
    export default{
        name:'Express',
      mounted(){
        this.orderId = this.$route.params.id;
        this.getexpressList();
      },
        data(){
            return{
              expressType:'',//面单类型
              company:'',//快递公司ID
              expressDeliveryId:'',
              isEditBtn:false,
              ruleForm: {
                expressType: '',
                company: ''
              },
              rules:{
                expressType: [
                  { required: true, message: '请选择面单', trigger: 'change' }
                ],
                company: [
                  { required: true, type:'number', message: '请选择快递公司', trigger: 'change' }
                ],
              },

              contact:{
                "conAddress":"",
                "conEmail":"",
                "conMobile":"",
                "conPostCode":"",
                "conTelephone":"",
                "contact":"",
                "customerId":'',
                "id":'',
              },
              companyList:[],
              tableData: [],
            }
        },
      methods:{
        submitForm(formName) {
            let self = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              self.add(formName);
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        submitEdit(formName) {
          let self = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              self.edit(formName);
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        modify(row,index){
          this.isEditBtn = true;
          this.expressType = row.expressType.toString();
          this.company = row.company.expressId;
          this.ruleForm.expressType = row.expressType.toString();
          this.ruleForm.company = row.company.expressId;
          this.expressDeliveryId = row.expressDeliveryId;
          let param = {
            "id": row.expressDeliveryId,
            "orderId": this.orderId
          }
          this.$http.post("/express/expressSingle", {param:JSON.stringify(param)})
            .then((response) => {
              let res = response.data.result;
              this.contact = res.contact;
//              this.expressType = res.expressType.toString();
//              this.company = res.company.expressId;

            })
            .catch((error) => {
              console.log(error);
            });
        },
        edit(formName){
          let list = this.tableData;
          if(list.length==2){
            for(let i = 0;i<list.length;i++){
              if(list[i].expressType== this.ruleForm.expressType&&this.company==this.ruleForm.company){
                this.$message({
                  type: 'warning',
                  message: '同一类型面单只能添加一个！'
                });
                return;
              }
            }
          }
            this.isEditBtn = false;
          let param = {
            "expressDeliveryId": this.expressDeliveryId,
            "expressType": this.ruleForm.expressType,
            "expressId": this.ruleForm.company,
            "contact": {"customerId": this.customerId},
            "orderId": this.orderId
          }
          let self = this;
          this.$http.post("/express/expressUpdate", {param:JSON.stringify(param)})
            .then((response) => {
              let res  = response.data.data;
              if(res.result==="success"){
                self.getexpressList();
                self.$refs[formName].resetFields();//清空数据
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });

              }
            })
            .catch((error) => {
              console.log(error);
            });

        },
        del(row,index){//删除
          this.$confirm('你确定需要删除该快递单吗？', '温馨提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.doDel(row.expressDeliveryId);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '暂不取消'
            });
          });

        },
          /*打印开始*/
        print(row,index){
            let param = {
                "id": row.expressDeliveryId.toString(),
                "orderId": this.orderId.toString()
            }
            this.$http.post("/express/expressSingle", {param:JSON.stringify(param)})
                .then((response) => {
                 this.doingPrint(response.data,this.orderDetail)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
          doingPrint(data,orderDetail) {

              if (data.result.expressType === 0) {
                  switch(data.result.company.companyName) {
                      case "EMS":
                          facesFormat.express_faces_EMS(data,orderDetail);
                          // createTemplate("express_faces_EMS");
                          break;
                      case "顺丰":
                          facesFormat.express_faces_SF(data,orderDetail);
                          // createTemplate("express_faces_SF");
                          break;
                      case "申通":
                          facesFormat.express_faces_ST(data,orderDetail);
                          // createTemplate("express_faces_ST");
                          break;
                      case "德邦物流":
                          facesFormat.express_faces_DB(data,orderDetail);
                          // createTemplate("express_faces_DB");
                          break;
                      case "申通到付":
                          facesFormat.express_faces_STDF(data,orderDetail);
                          // createTemplate("express_faces_STDF");
                          break;
                      case "客户自提":
                          facesFormat.express_faces_KHZT(data,orderDetail);
                          // createTemplate("express_faces_KHZT");
                          break;
                      case "中通":
                          facesFormat.express_faces_ZT(data,orderDetail);
                          // createTemplate("express_faces_ZT");
                          break;
                      case "顺丰到付":
                          facesFormat.express_faces_SFDF(data,orderDetail);
                          // createTemplate("express_faces_ZT");
                          break;
                      case "德邦快递":
                          facesFormat.express_faces_DBKD(data,orderDetail);
                          // createTemplate("express_faces_ZT");
                          break;
                      case "德邦快递到付":
                          facesFormat.express_faces_DBKD(data,orderDetail);
                          // createTemplate("express_faces_ZT");
                          break;
                  }
              }
              else {
                  switch(data.result.company.companyName) {
                      case "EMS":
                          facesFormat.invoice_faces_EMS(data,orderDetail);
                          // createTemplate("invoice_faces_EMS");
                          break;
                      case "顺丰":
                          facesFormat.invoice_faces_SF(data,orderDetail);
                          // createTemplate("invoice_faces_SF");
                          break;
                      case "申通":
                          facesFormat.invoice_faces_ST(data,orderDetail);
                          // createTemplate("invoice_faces_ST");
                          break;
                      case "德邦物流":
                          facesFormat.invoice_faces_DB(data,orderDetail);
                          // createTemplate("invoice_faces_DB");
                          break;
                      case "申通到付":
                          facesFormat.invoice_faces_STDF(data,orderDetail);
                          // createTemplate("invoice_faces_STDF");
                          break;
                      case "客户自提":
                          facesFormat.invoice_faces_KHZT(data,orderDetail);
                          // createTemplate("invoice_faces_KHZT");
                          break;
                      case "中通":
                          facesFormat.invoice_faces_ZT(data,orderDetail);
                          // createTemplate("invoice_faces_ZT");
                          break;
                      case "顺丰到付":
                          facesFormat.invoice_faces_SFDF(data,orderDetail);
                          // createTemplate("express_faces_ZT");
                          break;
                      case "德邦快递":
                          facesFormat.invoice_faces_SFDF(data,orderDetail);
                          // createTemplate("express_faces_ZT");
                          break;
                      case "德邦快递到付":
                          facesFormat.invoice_faces_SFDF(data,orderDetail);
                          // createTemplate("express_faces_ZT");
                          break;
                  }

              }

          },
          /*结束*/
        doDel(expressDeliveryId){
            let self = this;
          this.$http.post("/express/expressDelete", {param: expressDeliveryId})
            .then((response) => {
              let res = response.data.data;
              if(res.result==='success'){
                self.getexpressList();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else {
                this.$message({
                  type: 'warning',
                  message: '删除失败!'
                });

              }

            })
            .catch((error) => {
              console.log(error);
            });

        },
        add(formName){//
          let list = this.tableData;
          if(list){
              for(let i = 0;i<list.length;i++){
                  if(list[i].expressType== this.ruleForm.expressType){
                    this.$message({
                      type: 'warning',
                      message: '同一类型面单只能添加一个！'
                    });
                    return;
                  }
              }

          }
          if(this.tableData&&this.tableData.length===2){
            this.$refs[formName].resetFields();//清空数据
            return;

          }
          let param = {
            "expressType": this.ruleForm.expressType,
            "expressId": this.ruleForm.company,
            "contact":{"customerId":this.customerId},
            "orderId": this.orderId
          }
          let self = this;
          this.$http.post("/express/expressAdd", {param: JSON.stringify(param)})
            .then((response) => {
              let res = response.data.data;
              if(res.result==="success"){
                self.getexpressList();
                self.$refs[formName].resetFields();//清空数据
                this.$message({
                  type: 'success',
                  message: '新增成功!'
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        rowCurrentChange(val){
          this.currentRow = val;
        },
        highlightCurrent(val){
          return (val.id===this.currentRow.id ? 'info-row' :'');
        },
        getexpressList(){
          this.$http.post("/express/expressList", {param:this.orderId})
            .then((response) => {
              let res = response.data.result;
              this.tableData = res.expressList;
              if (typeof res.expressList==='undefined'||res.expressList.length===0){
                  this.isEditBtn=false;
              }
              this.companyList = res.companyList;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      computed:{
        customerId:function () {
          return this.$store.state.moduleOrder.orderBaseInfo.customer.id;
        },
          orderDetail(){
            return  this.$store.state.moduleOrder.orderDetailData
          }
      },
      watch:{
        "$route":function (val) {
            this.orderId = this.$route.params.id;
            this.getexpressList();
        }
      }


    }
</script>

<style scoped>

</style>
