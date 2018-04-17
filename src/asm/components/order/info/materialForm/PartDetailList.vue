/**
* Created by chenhuanlu on 2017/10/24.
*/

<template>
    <div class="containerb table-small-padding big-table">
      <el-table :data="tableData" v-loading="loading" border @selection-change="handleSelectionChange" ref="materialTable">
        <el-table-column
          type="selection"
          :selectable="selectableHandle"
          width="55">
        </el-table-column>
        <el-table-column show-overflow-tooltip type="index" label="序号" min-width="40" align="center" > </el-table-column>
        <el-table-column show-overflow-tooltip prop="customerMaterialsId"  label="客户物料号" min-width="70"  align="center" > </el-table-column>
        <el-table-column show-overflow-tooltip prop="partsName" label="配件名称" min-width="70"  align="center"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="specification" label="型号"  min-width="70" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip prop="unit" min-width="40"  label="单位"></el-table-column>
        <el-table-column show-overflow-tooltip prop="orderCount" min-width="40"  label="数量"></el-table-column>
        <el-table-column show-overflow-tooltip prop="mashineType"  label="机型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="repertoryName" label="仓库"></el-table-column>
        <el-table-column show-overflow-tooltip prop="requisition" label="实发数" min-width="40"></el-table-column>
        <el-table-column show-overflow-tooltip prop="unRequisition" label="未领数" min-width="40"></el-table-column>
        <el-table-column show-overflow-tooltip prop="remark"  label="备注"></el-table-column>
      </el-table>
      <br/>
      <span style="font-size: 14px">打印选项</span>
      <el-radio-group v-model="selectOptions" @change="selectRepertory">
          <el-radio v-for="(item,index) in repertoryNameList" :label="index" :key="index">{{item}}</el-radio>
      </el-radio-group>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <el-button type="success" style="width: 200px" @click="print">打印领料单</el-button>
        </el-col>
      </el-row>
      <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        size="tiny"
       >
        <span>请选择需要打印领料的配件!</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
      </el-dialog>
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
            this.pick()
        },
        data(){
            return{
              loading:true,
                id:0,
              selectOptions:-1,
              dialogVisible: false,
              multipleSelection: [],
                pickData:[],
                tableData:[]
            }
        },
      computed:{
        /**
         * 仓库列表
         */
        repertoryNameList:function () {
          return this.$store.state.moduleOrder.enumsList.repertoryNames;
        },
          chosenRepertory(){
              if(this.multipleSelection.length<1){
                  return -1
              }else{
                    return this.multipleSelection[0].repertoryId
              }
          }
      },
      methods:{
          selectableHandle(row,index){
              return this.chosenRepertory==-1||this.chosenRepertory == row.repertoryId
          },
        print(){
          if(this.multipleSelection.length==0){
            this.dialogVisible = true;
          }else {
              this.printPickListProcess(this.multipleSelection, this.tableData, (data) => {
                  this.pickData = data
                  this.pick()
                  this.$nextTick(() => {
                      this.printPreview(this.pickData)
                  })
              })
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
          selectRepertory(val){
              this.tableData.map((row)=>{
                  if(row.repertoryId == val){
                      this.$refs['materialTable'].toggleRowSelection(row,true)
                  }else{
                      this.$refs['materialTable'].toggleRowSelection(row,false)
                  }
              })
          },
        pick(){
          this.$http.post("/materil/pickUi", {param: this.id})
            .then((response) => {
              if (response.data.status == 200) {
                let res = response.data.data
                this.tableData = res
                this.loading = false;
              }
            })
            .catch((error) => {
              console.log(error);
              this.loading = false;
            });
        },
      },
        watch:{
            '$route'(){
                this.id = this.$route.params.id
                this.pick()
            },
        }
    }
</script>

<style>
    .containerb .el-table th .el-checkbox{
        display: none!important;
    }
</style>
