/**
* 发货统计表
*/
<template>
  <div class="container-main">
      <search-bar :params="searchParams" @setParam="search"></search-bar>
        <div style="padding: 0px 15px;background-color: #fff" class="table-small-padding">
          <h3 style="text-align: center">发货统计表</h3>
          <el-table   empty-text="暂无发货数据"  :data="tableData"  border  :row-class-name="highlightCurrent" @row-click="rowCurrentChange">
            <el-table-column  type="index"   label="序号" min-width="20"></el-table-column>
            <el-table-column prop="customerMaterialsId" label="客户物料号" min-width="70"> </el-table-column>
            <el-table-column prop="partsName" label="配件名称" min-width="70"> </el-table-column>
            <el-table-column prop="unit" label="单位"  min-width="70"> </el-table-column>
            <el-table-column prop="deliver" label="发货数量" min-width="40"> </el-table-column>
            <el-table-column prop="singlePrice" label="单价" min-width="40"></el-table-column>
            <el-table-column  label="发货金额"  width="200">
              <span slot-scope="scope">{{Number(Number(scope.row.singlePrice)*Number(scope.row.deliver)).toFixed(2)}}</span>
            </el-table-column>
          </el-table>
          <table v-if="tableData.length>0" class="delivery-amount">
           <tr>
             <td>发货金额合计</td>
             <td>{{deliverAmount}}</td>
           </tr>
            <tr>
              <td>订单金额合计</td>
              <td>{{discountAmount?discountAmount:'0.00'}}</td>
            </tr>
          </table>
        </div>
  </div>
</template>

<script type="es6">
  import SearchBar from './DeliveryReportSearchBar'
  export default {
    name: 'DeliveryReportList',
    mounted(){
        this.search('');
    },
    data () {
      return {
        searchParams:{
        },
        tableData:[],
        deliverAmount:0,
        discountAmount:0,
          currentRow:{}
      }
    },
    methods:{
        highlightCurrent(val){
            return (val==this.currentRow ? 'info-row' :'');
        },
      search(val){
       // this.searchParams = val;
        this.doAjax(val);
      },
        rowCurrentChange(val,e,c){
            this.currentRow = val;
        },
      doAjax(val){
        this.$http.post("/report/deliveryStatisticReport", {order_No: val})
          .then((response) => {
            let res = response.data;
            let deliveryList = res.deliveryList;
            let deliverAmount = 0;
            let discountAmount=0;
            if(res.status==200){
              if(deliveryList){
                this.tableData= deliveryList.orderDeliverys;
                let orderInfos = deliveryList.orderInfos;
                if(orderInfos){
                  for(let i=0;i<orderInfos.length;i++){
                    discountAmount+=Number(orderInfos[i].discountAmount)
                  }
                }
                this.discountAmount = Number(discountAmount).toFixed(2);
                for(let i=0;i<this.tableData.length;i++){
                  deliverAmount+=(Number(this.tableData[i].deliver)*Number(this.tableData[i].singlePrice))
                }
                this.deliverAmount = Number(deliverAmount).toFixed(2);
              }else {
                this.tableData=[];
              }
            }else {
              this.$message({
                message: res.message,
                type: 'warning'
              });
              this.tableData=[];
              return;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    components:{
        SearchBar,
    },
    computed:{

    },
    watch:{
    }
  }
</script>

<style scoped>
  .info-table td {
    text-align: center;
  }
  .delivery-amount{
    width: 100%;
    border-right: 1px solid #d3dce6;
    border-collapse:collapse;
    font-size: 12px;
    color: #1f2d3d;
    max-width:100%;
  }
  .delivery-amount td{
    border-left: 1px solid #d3dce6;
    border-bottom: 1px solid #d3dce6;
    padding: 5px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .delivery-amount td:nth-child(odd){
    text-align: right;
    padding-right:10px;
    color:#666;
  }
  .delivery-amount td:nth-child(even){
    text-align: center;
    width:201px;
  }
</style>
