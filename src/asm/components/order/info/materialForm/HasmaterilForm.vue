/**
* Created by chenhuanlu on 2017/10/24.
*/

<template>
    <div class="containerb table-small-padding big-table">
      <el-table
        :row-key="getRowKeys"
        @expand="expand"
        :expand-row-keys="expands"
        :data="tableData"
        v-loading="loading"
        border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left">
              <table  class="info-table" >
                <tr id="intro">
                  <td>序号</td>
                  <td style="width: 60px">客户物料号</td>
                  <td style="width: 100px">配件名称</td>
                  <td style="width: 100px">型号</td>
                  <td>单位</td>
                  <td>购买数</td>
                  <td>申领数</td>
                  <td>发货数</td>
                </tr>
                <tr v-for='(item,index) in props.row.expandList' :id="index">
                  <td>{{index+1}}</td>
                  <td>{{item.customerMaterialsId}}</td>
                  <el-tooltip  effect="dark" :content="item.productName" placement="top-start">
                    <td>{{item.productName}}</td>
                  </el-tooltip>
                  <el-tooltip  effect="dark" :content="item.specification" placement="top-start">
                    <td>{{item.specification}}</td>
                  </el-tooltip>
                  <td>{{item.unit}}</td>
                  <td>{{item.orderCount}}</td>
                  <td>{{item.requisitionAmount}}</td>
                  <td>{{item.deliverAmount}}</td>
                </tr>
                <tr v-if="props.row.expandList&&props.row.expandList.length==0||!props.row.expandList">
                  <td colspan="8">暂无数据</td>
                </tr>
                <tr v-else>
                  <td colspan="3">仓库: {{props.row.expandList[0]?repertoryNameList[listProduct[0].repertoryId]:''}}</td>
                  <td colspan="5">机型: {{props.row.expandList[0]?props.row.expandList[0].mashineType:''}}</td>
                </tr>
              </table>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column show-overflow-tooltip type="index" label="序号" width="65px" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="requestId" label="领料批次" min-width="40"   align="center" > </el-table-column>
        <el-table-column show-overflow-tooltip prop="barCode" label="条形码号码"  min-width="70"  align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="createdTime" label="创建时间" min-width="70"  align="center">
          <template slot-scope="scope">
            <span >{{scope.row.createdTime?new Date(scope.row.createdTime).toString():''}} </span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip  label="仓库" min-width="40" align="center">
          <template slot-scope="scope">
            <span>{{repertoryNameList[scope.row.repertoryId]}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="mashineType" label="机型" min-width="40" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip  width="180" align="center" prop="remark" label="操作">
          <template slot-scope="scope" >

            <el-row type="flex" style="width: 100%;" justify="center">
              <el-button @click="look(scope.row,scope.$index)" type="button" size="mini">查看</el-button>
              <el-col :span="2"></el-col>
              <el-button @click="print(scope.row,scope.$index)" type="button" size="mini">打印</el-button>
              <el-col :span="2"></el-col>
              <el-button v-if="scope.row.isFinsh == 0" @click="del(scope.row,scope.$index)" type="button" size="mini">删除</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
  <pick-print :data="pickData"></pick-print>
    </div>
</template>

<script>
    import pickList from '../../../print/pick/pickList'
    import PickPrint from "../../../print/pick/PickPrint";
    export default{
        components: {PickPrint},
        mixins: [pickList],
        mounted(){
          this.id = this.$route.params.id
        this.getHasMaterialList();//获取已领领料单
      },

      data(){
            return{
              loading:true,
              expands: [],// 要展开的行，数值的元素是row的key值
              listProduct:[],
              curBtn:0,
              tableData:[],
                id:0,
                pickData:[]
            }
        },
      methods:{
        del(row,index){
          this.$confirm('你确定需要删除该领料单吗？', '温馨提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.doDelete(row.materialId);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消删除'
            });
          });
        },
        doDelete(materialId){
          this.$http.post("/materil/deleteMaterial", {param: materialId})
            .then((response) => {
              let res = response.data.data;
              console.log(res);
              if(res.result==="success"){
                this.getHasMaterialList();
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
        print(row,index){
            this.curBtn=2;
            this.printMaterialHandle(row.barCode, (data)=>{
                this.pickData = data
                this.$nextTick(()=>{
                    this.printPreview(this.pickData)
                })
            })
        },
        getHasMaterialList(){
          this.$http.post("/materil/materialListUi", {param: this.id})
            .then((response) => {
              let res = response.data;
              this.tableData = res.pickList;
              this.loading=false;
            })
            .catch((error) => {
              console.log(error);
              this.loading=false;
            });
        },
        getHasMaterialDetail(barCode,index){
          this.$http.post("/materil/deliverDetailUi", {barCode: barCode})
            .then((response) => {
              let res = response.data.deliverInfo;
              if(res.listProduct){
                this.listProduct = res.listProduct;
                this.tableData[index].expandList = this.listProduct;
                // console.log(this.tableData)
                if(this.expands.indexOf(barCode)>-1){
                  this.expands.splice(this.expands.indexOf(barCode),1);
                }else {
                  this.expands.push(barCode);
                }

              }

            })
            .catch((error) => {
              console.log(error);
            });
        },
        look(row, index){
            console.log(row);
            this.curBtn=1;

          this.getHasMaterialDetail(row.barCode,index);

         // this.dialogTableVisible=true;

        },
        getRowKeys(row) {// 获取row的key值
          return row.barCode;
        },
        expand(row, expanded){

          let index = this.tableData.indexOf(row);
          this.getHasMaterialDetail(row.barCode,index);
        },
      },
      computed:{
        /**
         * 仓库列表
         */
        repertoryNameList:function () {
          return this.$store.state.moduleOrder.enumsList.repertoryNames;
        }
      },
        watch:{
          '$route'(){
              this.id = this.$route.params.id
              this.getHasMaterialList()
          }
        }
    }
</script>

<style scoped>
  #intro td{
    font-weight:bold;
    background: #EEF1F6;
  }
  .info-table{
    border-collapse: collapse;
    border-spacing: 0;
  }
  .info-table td:nth-child(n){
    text-align: center;
    width:40px;
    padding: 10px;
    color:#666;
  }
  .containerb .el-card__header{
    background-color: #D9EDF7;
    padding: 10px 20px;
  }
  .el-card {
    color: #31708F;
  }
</style>
