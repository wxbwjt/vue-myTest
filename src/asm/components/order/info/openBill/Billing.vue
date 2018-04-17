/**
* Created by chenhuanlu on 2017/10/21.
*/

<template>
    <div class="containerc table-small-padding big-table">
      <el-card>
        <div slot="header"  class="search-head ">
          <el-row type="flex" class="row-bg" justify="space-between" align="middle">
            <el-col :span="6">
              <i class="el-icon-setting" style="font-size: 14px;">
               开票列表</i>
            </el-col>
            <el-col :span="6">
              <el-row type="flex" justify="end">
                <AuthWraper permission="task_invoice_asm:add"><el-button @click="applayBill">申请开票</el-button></AuthWraper>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-table :data="invoiceList"
                    :row-key="getRowKeys"
                    @expand="expand"
                    :expand-row-keys="expands"
                    v-loading="loading"
                    border>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left">
                  <bill-detail v-model="billDetailShow" :invoiceInfo="props.row.expandList"></bill-detail>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column show-overflow-tooltip type="index" label="序号" min-width="40" align="center"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="applyDate" label="申请时间" min-width="60"  align="center" >
              <span slot-scope="scope">{{new Date(scope.row.applyDate).toString().substring(0,10)}}</span>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="invoice_type_text" label="票据类型"  min-width="40" align="center"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="invoiceNo" label="发票号" width="80" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column show-overflow-tooltip prop="applicant_text" label="申请人" align="center"  min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip prop="billingStaff_text" label="开票人" align="center" min-width="40" ></el-table-column>
            <el-table-column show-overflow-tooltip prop="processor_text" label="处理人" align="center" min-width="40" ></el-table-column>
            <el-table-column show-overflow-tooltip prop="status_text" label="状态" align="center" min-width="40">

            </el-table-column>
            <el-table-column v-if="customerStatus == 1 "   align="center"  label="操作" width="180">
              <template slot-scope="scope" >
                <el-row type="flex" style="width: 100%;" justify="center">
                  <div>
                    <AuthWraper  permission="task_invoice_asm:export"><el-button @click="excel(scope.row,scope.$index)" type="button" size="mini">导出</el-button></AuthWraper>
                    <AuthWraper  permission="task_invoice_asm:view"><el-button @click="detail(scope.row,scope.$index)" type="button" size="mini">详情</el-button></AuthWraper>
                    <el-button @click="print(scope.row,scope.$index)" type="button" size="mini">打印</el-button>
                  </div>
                  <div v-if="scope.row.status == 1">
                    <AuthWraper  permission="task_invoice_asm:mh" v-if="scope.row.orderSource == 2"><el-button  id="mh" @click="openBill(scope.row,scope.$index)" type="button" size="mini">开票</el-button></AuthWraper>
                    <AuthWraper  permission="task_invoice_asm:yc"  v-else><el-button id="yc" @click="openBill(scope.row,scope.$index)" type="button" size="mini">开票</el-button></AuthWraper>
                    <AuthWraper  permission="task_invoice_asm:abolish"> <el-button @click="cancel(scope.row,scope.$index)" type="button" size="mini">取消</el-button></AuthWraper>
                  </div>
                  <div v-else-if="scope.row.status == 2">
                    <AuthWraper  permission="task_invoice_asm:deal"> <el-button @click="deal(scope.row,scope.$index)" type="button" size="mini">处理</el-button></AuthWraper>
                  </div>
                  <div v-if="scope.row.status == 2||scope.row.status == 3">
                    <AuthWraper  permission="task_invoice_asm:cancel"><el-button @click="tovoid(scope.row,scope.$index)" type="button" size="mini">作废</el-button></AuthWraper>
                  </div>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <apply-open-bill  @getInvoiceList="getBillInfoList" v-if="openBillShow" :invoiceInfoSave="invoiceInfoSave"></apply-open-bill>
        </div>
      </el-card>
      <bill-dialog  @getBillList="getBillInfoList" :billData="billData"   @closeBillDialog = "closeBillDialog" :dialogBillVisible="billDialogShow"></bill-dialog>
      <tovoid-dialog @refresh="getBillInfoList" :row="voidInfo" v-model="tovoidIsShow"></tovoid-dialog>
      <deal-dialog @refreshCur="getBillInfoList" :dealBillInfo="dealBillInfo"  v-model="dealDialogIsShow"></deal-dialog>
      <!--<bill-detail v-model="billDetailShow" :invoiceInfo="invoiceInfo"></bill-detail>-->
      <invoice-print :value="printInfo"></invoice-print>
    </div>
</template>

<script>
  import BillDialog from './BillDialog.vue'
  import TovoidDialog from './TovoidDialog.vue'
  import DealDialog from './DealDialog.vue'
  import ApplyOpenBill from './ApplyOpenBill.vue'
  import BillDetail from './BillDetail.vue'
  import InvoicePrint from "../../../print/invoice/InvoicePrint";


  export default{
      components: {
          InvoicePrint,
          BillDialog,
        TovoidDialog,
        DealDialog,
        ApplyOpenBill,
        BillDetail,
      },
      mounted(){
        this.orderId = this.$route.params.id;//30951
        this.getBillInfoList(this.orderId);
        },
        data(){
            return{
              loading:true,
              customerStatus:0,
              orderId:'',
              curbtn:0,
              billData:{totalDeliveryAmount:0.00},
              expands:[],
              dealBillInfo:{},
              voidInfo:{},
              openBillShow:false,
              tovoidIsShow:false,
              billDialogShow:false,
              dealDialogIsShow:false,
              billDetailShow:false,
              invoiceInfo:{},
              invoiceInfoSave:{},
              billType:'1',
              invoiceList:[],
              multipleSelection:[],
                printInfo:{
                    order:{
                        discount:""
                    },
                    invoiceDetail:{
                        invoiceTitle:"",
                        listOrderDetail:[],
                        contactDto:{},
                    }
                }
            }
        },
        methods:{
          applayBill(){//申请开票
             this.openBillShow=!this.openBillShow
             if(this.openBillShow===true){
                 this.getSaveUI();
             }
          },
          expand(row, expanded){
            let index = this.invoiceList.indexOf(row);
            console.log(index)
            this.getBillDetail(row.id, index)
          },
          getSaveUI(){
            this.$http.post("/invoice/saveUi", {orderId: this.orderId})
              .then((response) => {
                let res = response.data;
                this.invoiceInfoSave = res.invoiceInfo;
              })
              .catch((error) => {
                console.log(error);
              });

          },
          closeBillDialog(){
              this.billDialogShow = false;

          },

          detail(row,index){//详情
            console.log(index)


            this.getBillDetail(row.id,index);


          },
          excel(row,index){
              location.href = "/ys-web-asm/invoice/export_excel?invoiceId="+row.id+"&orderId="+this.orderId;
          },
          openBill(row,index){//开票
            this.billData = Object.assign(this.billData,row);
            this.$http.post("/invoice/addUi", {orderId: this.orderId,id:row.id})
              .then((response) => {
                let res = response.data;
                this.billData.totalDeliveryAmount = res.totalDeliveryAmount;
                this.billDialogShow = true;
              })
              .catch((error) => {
                console.log(error);
              });





          },
          getBillDetail(id,index){
            this.$http.post("/invoice/detail", {orderId: this.orderId,id:id})
              .then((response) => {
                let res = response.data;
                this.invoiceInfo = res.invoiceInfo;
                if (res.invoiceInfo) {
                  this.invoiceInfo = res.invoiceInfo;
                  this.invoiceList[index].expandList = this.invoiceInfo;
                  if (this.expands.indexOf(id) > -1) {
                    this.expands.splice(this.expands.indexOf(id), 1);
                  } else {
                    this.expands.push(id);
                  }
                  this.billDetailShow = true;
                }

              })
              .catch((error) => {
                console.log(error);
              });

          },
          getBillInfoList(orderID){
              this.openBillShow = false;
            this.$http.post("/invoice/query", {orderId: orderID})
              .then((response) => {
                let res = response.data;
                if(res){
                  this.customerStatus = res.customerStatus;
                  this.invoiceList = res.invoiceList?res.invoiceList:[];
                }
                this.loading=false;

              })
              .catch((error) => {
                console.log(error);
                this.loading=false;

              });
          },
          getRowKeys(row) {// 获取row的key值
            return row.id;
          },
          cancel(row){//取消
            this.$confirm('你确定取消开票申请吗', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.post("/invoice/quxiao", {invoiceId: row.id})
                .then((response) => {
                  let res = response.data;
                  let self = this;
                  if(res&&res.status==200){
                    self.getBillInfoList(row.orderId);
                    this.$message({
                      type: 'success',
                      message: '操作成功！'
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '暂不取消'
              });
            });

          },
            /*打印部分*/
          print(row,index){
              let param = {orderId: this.orderId.toString(),id:row.id.toString()}
              this.$http.post("/invoice/print", {param:JSON.stringify(param)})
                  .then((response) => {
                      let res = response.data;
                      if(res.data.state="200"){
                      this.printInfo = res.data;
                      this.$nextTick(()=>{
                          this.printView()
                      })
                      }else{
                          this.$message({
                              type: 'warning',
                              message: '获取打印数据失败，请重新登陆或联系管理员'
                          });
                      }
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          },
          printView(){
              LODOP.SET_PRINT_PAGESIZE(1,1700,1400,"A4");
              LODOP.ADD_PRINT_HTM(18,"1%","99%",320,document.getElementById("invoicePrints1").innerHTML);
              LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
              LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
              LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
              var name= document.getElementById("printCustomerName").innerHTML;
              LODOP.ADD_PRINT_TABLE(205+Math.ceil(name.length/30)*20,"1%","99%",800,document.getElementById("invoicePrints2").innerHTML);
              LODOP.PREVIEW();
          },
          deal(row){//处理
            this.$http.post("/invoice/dealUi", {id:row.id,orderId:row.orderId})
              .then((response) => {
                let res = response.data;
                if(res&&res.status==200){
                    this.dealBillInfo = res.invoiceInfo;
                }
              })
              .catch((error) => {
                console.log(error);
              });
            this.dealDialogIsShow = true;


          },
          tovoid(row){//作废
            this.voidInfo =row;
            this.tovoidIsShow = true;

          },

        },
      computed:{


      },
      watch: {
            "$route":function () {
              this.orderId = this.$route.params.id;
              this.getBillInfoList(this.orderId);

            }
      }
    }

</script>

<style>
  .containerc .el-card__header{
    background-color: #D9EDF7;
    padding: 10px 20px;
  }
  .el-col {
    color: #31708F;
  }
</style>
