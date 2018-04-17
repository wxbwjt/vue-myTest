/**
* Created by chenhuanlu on 2017/10/26.
*/

<template>
    <div>
      <el-form :inline="true" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="开票类型" labelWidth="100px">
          <el-radio-group  v-model="invoice_type">
            <el-radio :label="1">开普票</el-radio>
            <el-radio :label="2">开税票</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item label="开票抬头" prop="billName" labelWidth="100px">
              <el-input v-model="form.billName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="开票金额" labelWidth="100px">
              <el-input v-model="form.payAmount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item label="联系人" labelWidth="100px">
              <el-input v-model="form.billContacts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="联系人手机 " labelWidth="100px">
              <el-input v-model="form.billMobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="9">
            <el-form-item label="联系人电话" labelWidth="100px">
              <el-input v-model="form.billTelephone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="邮编" labelWidth="100px">
              <el-input v-model="form.zipCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item label="联系人地址" labelWidth="100px">
              <el-input v-model="form.billAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="公司地址" labelWidth="100px">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="this.invoice_type==2">
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item prop="bank_name" label="开户银行" labelWidth="100px">
              <el-input v-model="form.bank_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="银行账号" labelWidth="100px" prop="bank_account">
              <el-input v-model="form.bank_account"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item label="税号" labelWidth="100px">
              <el-input v-model="form.tax_no"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="客户电话" labelWidth="100px">
              <el-input v-model="form.telephone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        </div>
        <el-table :data="form.orderDetailDtos"
                  @select-all="selectAll"
                  @select="selectCurRow"
                  ref="multipleTable"
                  @selection-change="handleSelectionChange"
                  border>
        <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column type="index" label="序号" min-width="40" align="center"> </el-table-column>
          <el-table-column  label="客户物料号" min-width="70"  align="center" >
            <template slot-scope="scope" >
              <el-input v-model="scope.row.customerMaterialsId"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="配件名称"  min-width="70" align="center">
            <template slot-scope="scope" >
              <el-input v-model="scope.row.partsName"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="型号" min-width="40"  align="center">
            <template slot-scope="scope" >
              <el-input v-model="scope.row.specification"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" min-width="40" >
            <template slot-scope="scope" >
              <el-input v-model="scope.row.unit"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量" min-width="40" >
            <template slot-scope="scope" >
              <el-input v-model="scope.row.orderCount"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="单价" min-width="40" >
            <template slot-scope="scope" >
              <el-input v-model="scope.row.singlePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="折扣(%)" min-width="40">
            <template slot-scope="scope" >
              <el-input v-model="scope.row.discount"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="金额" min-width="40" >
            <template slot-scope="scope" >
              <el-input v-model="scope.row.discountAmount"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="机型"  min-width="40">
            <template slot-scope="scope" >
              <el-input v-model="scope.row.mashineType"></el-input>
            </template>
          </el-table-column>
          <el-table-column class-name="remark"  label="备注" min-width="40" >
            <template slot-scope="scope" >
              <el-form-item
                :prop="'orderDetailDtos.'+scope.$index+'.remark'"
                :rules="{
                max: 100, message: '最多输入100个字符', trigger: 'blur'
                }"
              >
              <el-input v-model="scope.row.remark"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <br/>
        <div style="text-align: center">
          <el-button  type="primary" style="width: 200px" @click="doApplyBill('form')">申请开票</el-button>
        </div>

      </el-form>
    </div>
</template>

<script>
    export default{
      props:{
        invoiceInfoSave: {
          type: Object,
          default:{},
        },
      },
      mounted(){
        //this.orderId = this.$route.params.id;//3095
       // this.form.invoice_type = 2;
        this.invoice_type=2;

      },
      data(){
        return {
          orderId: '',
          dialogVisible: false,
          selections:[],
          invoice_type:2,
          form: {
            "zipCode":'',
            "invoice_type":2,
            "orderId":'',
            "orderNo":'',
            "billName":"",
            "telephone":"",
            "address":"",
            "tax_no":"",
            "payAmount":0,
            "billContacts":"",
            "billMobile":"",
            "billTelephone":"",
            "billAddress":"",
            "billEmail":"",
            "bank_name":"",
            "bank_account":"",
            "applicant":0,
            "processor":0,
            "operator":0,
            "bankId":'',
            orderDetailDtos:[],
          },
          rules:{
            bank_name: [
              { max: 50, message: '最多输入50个字', trigger: 'blur' }
            ],
            bank_account: [
              { max: 30, message: '最多输入30个字', trigger: 'blur' }
            ],
            billName:[
              {max: 50, message: '最多输入50个字符', trigger: 'blur' }
            ]
          },
          multipleSelection:[],
          applyDetail:{},
          applyList:[],
        }
      },
      computed:{
        repertoryNameList: function () {//仓库列表
          return this.$store.state.moduleOrder.enumsList.repertoryNames;
        },
        orderBaseInfo:function(){
          return this.$store.state.moduleOrder.orderBaseInfo;
        },
        info:function () {
          return this.$store.state.moduleOrder.orderDetailData.orderDetail;
        },

      },
      methods:{

        toggleSelection(rows) {
          if (rows) {
            rows.forEach((row) => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        queryBanks(bankName){
          this.$http.post("/asm/queryBanks", {bankName:bankName,customerId:''})
            .then((response) => {
              let res = response.data;
              let orderId =res.orderId;
              if(res&&res.message==='操作成功！'){
                this.$emit('getInvoiceList', orderId)

                this.$message({
                  message: '操作成功！',
                  type: 'success'
                });

              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        doApplyBill(formName){
            this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.invoice_type = this.invoice_type;
            this.$http.post("/invoice/save", {detail: JSON.stringify(this.selections),param:JSON.stringify(this.form)})
              .then((response) => {
                let res = response.data;
                let orderId =res.orderId;
                if(res&&res.message==='操作成功！'){
                  this.$emit('getInvoiceList', orderId)
                  this.$message({
                    message: '操作成功！',
                    type: 'success'
                  });

                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        },
        selectAll(selection){
            this.selections = selection;
        },
        selectCurRow(selection,row){
          this.selections = selection;
        },
      },
      watch: {
        'invoiceInfoSave':function (nval) {
          if(nval){
            this.form = nval;
            this.form.billTelephone = nval.billConPhone;
            this.form.zipCode = nval.billPostCode;
            this.form.telephone=nval.billPhone;
            //Object.assign(this.form,navl);
            //this.form.invoice_type = 2;

            let billList = nval.orderDetailDtos
            this.form.orderDetailDtos = billList;

          }
        },
        'form.orderDetailDtos':function(){
          this.$nextTick(() => {
            this.selections = this.form.orderDetailDtos
            this.toggleSelection(this.form.orderDetailDtos);
          })
        },
        'form.bank_name':function (nval) {
            if(nval){
              //this.queryBanks(nval);
            }
        },
        selections: {
          handler: function () {

            if(this.selections.length>0){
                if(this.selections.length==this.form.orderDetailDtos.length&&Number(this.info.discountAmount)!=0){
                    /*全选的时候为折扣价*/
                  this.form.payAmount=this.info.discountAmount;
                }else {
                  /*非全选的时候为金额总和乘以总折扣*/
                  let tempCount = 0
                  for(let i = 0;i<this.selections.length;i++){
                    this.selections[i].discountAmount= Number((Number(this.selections[i].singlePrice) * Number(this.selections[i].orderCount) * Number(this.selections[i].discount)/100).toFixed(2));
                    tempCount+=Number((Number(this.selections[i].singlePrice) * Number(this.selections[i].orderCount) * Number(this.selections[i].discount)/100));
                  }
                  if(this.orderBaseInfo.discount){
                    this.form.payAmount = (Number(tempCount)*Number(this.orderBaseInfo.discount)/100).toFixed(2);

                  }else {
                    this.form.payAmount = Number(tempCount).toFixed(2);
                  }
                }
            }else {
              this.form.payAmount = 0;
            }
          },
          deep: true
        }
      }


    }
</script>

<style scoped>
.remark .el-form-item{
  margin-bottom:11px;
  margin-top:11px;
  margin-right: 0;

}
</style>
