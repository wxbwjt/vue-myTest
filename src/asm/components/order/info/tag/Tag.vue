/**
* Created by chenhuanlu on 2017/10/21.
*/

<template>
    <div class="table-small-padding big-table">
      <el-table
        ref="multipleTable"
        :data="orderDetailList"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          min-width="40"
          type="index"
          label="序号"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          min-width="40"
          show-overflow-tooltip
          label="仓库">
          <template slot-scope="scope">
            <span >{{repertoryNameList[scope.row.repertoryId]}} </span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="70"
          prop="partsName"
          show-overflow-tooltip
          label="配件名称">
        </el-table-column>
        <el-table-column
          min-width="40"
          show-overflow-tooltip
          prop="specification"
          label="型号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          width="40"
          prop="unit"
          show-overflow-tooltip
          label="单位">
        </el-table-column>
        <el-table-column
                min-width="40"
                prop="orderCount"
                show-overflow-tooltip
                label="数量">
        </el-table-column>
        <el-table-column
          min-width="40"
          prop="singlePrice"
          show-overflow-tooltip
          label="单价">
        </el-table-column>
        <el-table-column
          width="85"
          prop="discount"
          show-overflow-tooltip
          label="折扣（%）">
        </el-table-column>
        <el-table-column
                min-width="40"
          prop="discountAmount"
          show-overflow-tooltip
          label="金额">
        </el-table-column>
        <el-table-column
                min-width="40"
          prop="mashineType"
          show-overflow-tooltip
          label="机型">
        </el-table-column>
        <el-table-column
          prop="remark"
          show-overflow-tooltip
          label="备注">
        </el-table-column>
        <el-table-column
          min-width="40"
          prop="remark"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="printSingle(scope.row)" type="button" size="mini">打印</el-button>
          </template>
        </el-table-column>

      </el-table>
      <br/>
      <div style="padding-left: 40px">
      <span style="font-size: 14px">打印选项</span>
      <el-radio-group v-model="selectOptions" @change="selectRepertory">
          <el-radio  v-for="(item,index) in repertoryNameList" :label="index" :key="index">{{item}}</el-radio>
      </el-radio-group>
      </div>
      <br/>
      <br/>
      <el-button @click="printTagPack">打印标签外包装</el-button>
      <el-button @click="selectPrintOpitons">选择打印项  <span class="badge">{{multipleSelection.length}}</span></el-button>
      <label-all-container></label-all-container>
      <label-print :value="printList"></label-print>
    </div>
</template>

<script>
    import LabelAllContainer from "../../../print/label/labelAllContainer";
    import LabelPrint from "../../../print/label/LabelPrint";
    export default{
        components: {
            LabelPrint,
            LabelAllContainer},
        data(){
            return{
              selectOptions:-1,//打印选项
              multipleSelection: [],
              tableData:[],
              printList:[]
            }
        },
      methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        printSingle(row){
            let list = [row]
            console.log(list)
            this.print(list)
        },
        selectPrintOpitons(){//选择打印项
            this.print(this.multipleSelection)
        },
          print(data){
              for (var k = 0; k < data.length; k++) {
                  if (data[k].specification.length > 19) {
                      data[k].specification = data[k].specification.substr(0, 19) + "...";
                  }
              }
              if (data.length > 1) {
                  for (var k = 0; k < data.length; k++) {
                      if (data[k].partsName.length > 13) {
                          data[k].partsName = data[k].partsName.substr(0, 13) + "...";
                      }
                  }
              } else {
                  for (var k = 0; k < data.length; k++) {
                      if (data[k].partsName.length > 33) {
                          data[k].partsName = data[k].partsName.substr(0, 33) + "...";
                      }
                  }
              }
              this.printList = data
              this.$nextTick(function () {
                  // DOM 现在更新了
                  LODOP.SET_PRINT_PAGESIZE(0,"90mm","60mm","标签");
                  LODOP.SET_PRINT_MODE('PRINT_PAGE_PERCENT',"Full-Height");
                  for (var i = 0; i < data.length; i++) {
                      LODOP.NewPageA();
                      LODOP.ADD_PRINT_HTM(5,"1%","90mm","60mm", document.getElementById("divOrderItem" + i).innerHTML);
                  }
                  LODOP.PREVIEW();
              })
          },
        printTagPack(){//打印标签外包装
            LODOP.SET_PRINT_PAGESIZE(0,"90mm","60mm","A4");
            var strHTML=document.getElementById("labelAllContainer").innerHTML;
            LODOP.ADD_PRINT_HTM(5,"1%","90%","60mm", strHTML);
            LODOP.PREVIEW();
        },
          selectRepertory(val){
              this.orderDetailList.map((row)=>{
                  if(row.repertoryId == val){
                      this.$refs['multipleTable'].toggleRowSelection(row,true)
                  }else{
                      this.$refs['multipleTable'].toggleRowSelection(row,false)
                  }
              })
          }
      },
      computed:{
        /**
         * 配件明细列表
         */
        orderDetailList:function () {
          return this.$store.state.moduleOrder.listLabelDto;

        },
        repertoryNameList:function () {
          return this.$store.state.moduleOrder.enumsList.repertoryNames;
        },
      },
      watch:{

      }
    }
</script>

<style scoped>
.badge{
  /*display: inline-block;*/
  min-width: 10px;
  padding: 1px 4px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background-color: #333;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: 10px;
  top:-2px
}
</style>
