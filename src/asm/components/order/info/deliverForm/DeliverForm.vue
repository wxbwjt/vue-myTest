/**
* Created by chenhuanlu on 2017/10/21.
*/

<template>
    <div class="table-small-padding big-table">
      <div v-for="(item,index) in dataArr">
        <span v-if="item.requestId" style="font-size: 14px"><i class="fa fa-paper-plane"></i>发货日期：{{item.requestId.toString().substring(0,4)+'年'+item.requestId.toString().substring(4,6)+'月'+item.requestId.toString().substring(6,8)+'日'}}</span>
        <br/>
        <el-table :data="item.orderDeliverys" border>
          <el-table-column show-overflow-tooltip type="index" label="序号" width="65px" align="center"> </el-table-column>
          <el-table-column show-overflow-tooltip min-width="70" prop="customerMaterialsId" label="客户物料号"   align="center" > </el-table-column>
          <el-table-column show-overflow-tooltip min-width="70" prop="partsName" label="配件名称"   align="center"> </el-table-column>
          <el-table-column show-overflow-tooltip min-width="40" prop="specification" label="型号"  align="center"></el-table-column>
          <el-table-column show-overflow-tooltip min-width="40" prop="unit" label="单位"></el-table-column>
          <el-table-column show-overflow-tooltip min-width="40" prop="orderCount" label="数量"></el-table-column>
          <el-table-column show-overflow-tooltip min-width="40"prop="mashineType" label="机型"></el-table-column>
          <el-table-column show-overflow-tooltip min-width="40"  label="仓库">
            <template slot-scope="scope">
              <span >{{repertoryNameList[scope.row.repertoryId]}} </span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip min-width="40" prop="deliver" label="实发数"></el-table-column>
          <el-table-column show-overflow-tooltip min-width="40" prop="deliveryBalance" label="未发数"></el-table-column>
          <el-table-column show-overflow-tooltip min-width="40" prop="remark" label="备注"></el-table-column>
        </el-table>
        <br/>
      </div>
      <el-card v-if="dataArr.length<1" class="box-card"  style=" background: #F9FAFC; color:#ccc; text-align: center;line-height: 120px;margin-bottom: 20px">暂无发货信息</el-card>
      <el-tooltip  effect="dark" content="温馨提示:打印最近一次发货单" placement="top">
        <el-button @click="printLastTime">打印送货单</el-button>
      </el-tooltip>
      <el-tooltip   effect="dark" content="温馨提示:打印完整的发货单" placement="top">
        <el-button @click="printAll">打印总送货单</el-button>
      </el-tooltip>
      <delivery-print :value="printData" :show="lastTime"></delivery-print>
    </div>
</template>

<script>
    import DeliveryPrint from "../../../print/delivery/DeliveryPrint";
    export default{
        components: {DeliveryPrint},
        name:'DeliverForm',
        mounted(){
          this.orderId = this.$route.params.id;
          this.getDeliver(this.orderId);
        },
        data(){
            return{
              dataArr:[],
              orderId:'',//订单号
              tableData:[],
                printData:{
                    orderDeliverys:[],
                    rptInfo: {
                        totalAmount: 0,
                        detailDisTotal: 0,
                    }
                },
                lastTime:true
            }
        },
      computed:{
        repertoryNameList:function(){
          return this.$store.state.moduleOrder.enumsList.repertoryNames;
        },
          orderDetailList(){
            return this.$store.state.moduleOrder.orderDetailList
          },
          orderBaseInfo(){
              return this.$store.state.moduleOrder.orderBaseInfo
          }
      },
      methods:{
        getDeliver(orderId){//根据订单id查询所有发货单(详情)
          this.$http.post("/deliver/deliveryPro", {param:this.$route.params.id})
            .then((response) => {
              let res = response.data.result
              this.dataArr = res;
            })
            .catch((error) => {
              console.log(error);
            });
        },
          /*打印开始*/
        printLastTime(){//打印送货单
            this.lastTime = true
            var data =  JSON.parse(JSON.stringify(this.dataArr));
            if (data && data.length != 0) {
                //debugger;
                var totalPrice = this.getTotalPrice(data[data.length - 1].orderDeliverys);
                data[data.length - 1]["totalPrice"] = totalPrice;
                //处理data合并重复发货的配件
                var dataq = this.getLast(data);
                var datas = [];
                datas=JSON.parse(JSON.stringify(dataq));
                //添加没有发货的配件的信息
                var sdata =  JSON.parse(JSON.stringify(this.orderDetailList));
                for(var i= 0;i<sdata.length;i++){
                    var pickFlag = true;
                    for(var j=0;j<datas.length;j++){
                        if(sdata[i].id == datas[j].detailId){
                            pickFlag = false;
                        }
                    }
                    if ( pickFlag ) {
                        datas.push(sdata[i]);
                    }
                }
                var tickData={};
                tickData.orderDeliverys=datas;
                tickData.rptInfo=this.getRptTotalInfo(tickData.orderDeliverys,
                    JSON.parse(JSON.stringify(this.orderBaseInfo)).discount,
                    JSON.parse(JSON.stringify(this.orderBaseInfo)).discountAmount,
                    JSON.parse(JSON.stringify(this.orderBaseInfo)).includedTax);
                // printPreview();
                this.printData = tickData
                this.$nextTick(()=>{
                   this.printPreview();
                })
            }
        },
        printAll(){//打印总送货单
            this.lastTime = false
            var data =  JSON.parse(JSON.stringify(this.dataArr));
            if (data && data.length != 0) {
                //debugger;
                var totalPrice = this.getTotalPrice(data[data.length - 1].orderDeliverys);
                data[data.length - 1]["totalPrice"] = totalPrice;
                //处理data合并重复发货的配件
                var dataq = this.getLast(data);
                var datas = [];
                datas=JSON.parse(JSON.stringify(dataq));
                //添加没有发货的配件的信息
                var sdata =  JSON.parse(JSON.stringify(this.orderDetailList));
                for(var i= 0;i<sdata.length;i++){
                    var pickFlag = true;
                    for(var j=0;j<datas.length;j++){
                        if(sdata[i].id == datas[j].detailId){
                            pickFlag = false;
                        }
                    }
                    if ( pickFlag ) {
                        datas.push(sdata[i]);
                    }
                }
                var tickData={};
                tickData.orderDeliverys=datas;
                tickData.rptInfo=this.getRptTotalInfo(tickData.orderDeliverys,
                    JSON.parse(JSON.stringify(this.orderBaseInfo)).discount,
                    JSON.parse(JSON.stringify(this.orderBaseInfo)).discountAmount,
                    JSON.parse(JSON.stringify(this.orderBaseInfo)).includedTax);
                // printPreview();
                this.printData = tickData
                this.$nextTick(()=>{
                    this.printPreview();
                })
            }
        },
          getTotalPrice(data) {
              var total = 0;
               if(data){
              data.map((item)=> {
                  var t = 0;
                  t = Number(item.deliver) * Number(item.singlePrice) * Number(item.discount) / 100;
                  total += t;
              });
              }
              return total.toFixed(2);
          },
          getLast(data){
              var model =data[data.length - 1].orderDeliverys?data[data.length - 1].orderDeliverys:[];
              for(var j= data.length - 1 ;  j >=0 ; j--){
                  var temps = data[j].orderDeliverys;
                  if(temps){
                  for(var i= 0 ;  i < temps.length ; i++){
                      var deliFlag = true;
                        for(var k =0 ; k<model.length;k++){
                          if(temps[i].detailId == model[k].detailId){
                              deliFlag = false;
                          }
                      }
                      if(deliFlag){
                          temps[i].deliver = 0;
                          model.push(temps[i]);
                      }
                  }
                  }
              }
              return model;
          },
          getRptTotalInfo (data,discount,discountAmount,includedTax){
              var orderInfo={
                  detailDisTotal : Number(0), //明细折后总额
                  includedTaxTotal : Number(0),//含税总额
                  detailTotalAmount : Number(0),//明细总额
                  totalAmount : Number(0),	//订单总金额
                  discount : discount,
                  includedTax:false,
                  orderDisFlag:false,
                  detailDisFlag : false,
                  dotFlag:false
              };

              if(includedTax ==1 )
                  orderInfo.includedTax=true;
              if (!(discount == 100 || discount == '' ))
                  orderInfo.orderDisFlag=true;
              //invoiceDetail.listOrderDetail
              if(typeof (discount) == "undefined" || discount == '' ){
                  discount=100;
                  orderInfo.discount=discount;
              }
              if(typeof (discountAmount) == "undefined" || discountAmount == '' )
                  discountAmount=0;
              for (var i = 0; i < data.length; i++ ) {
                  var items = data[i];
                  if(typeof (items.discount) == "undefined" || items.discount == '' )
                      items.discount=100;
                  if(typeof (items.singlePrice) == "undefined" || items.singlePrice == '' )
                      items.discount=0;
                  var total = Number((Number(items.singlePrice) * Number(items.orderCount) * Number(items.discount) / 100).toFixed(2));

                  orderInfo.detailTotalAmount =orderInfo.detailTotalAmount + (Number(items.singlePrice) * Number(items.orderCount));
                  orderInfo.detailDisTotal = orderInfo.detailDisTotal +total;
                  if (items.discount != 100 && items.discount!="")
                      orderInfo.detailDisFlag = true;

                  if(orderInfo.dotFlag == false) {
                      var price = items.singlePrice;
                      var index = price.toString().indexOf(".");
                      var newStr = price.toString().substring( index + 1 );
                      if ( ( index != -1 )  && ( newStr.length > 2 ) )
                          orderInfo.dotFlag = true;
                  }
              }
              orderInfo.totalAmount=orderInfo.detailDisTotal;
              if(orderInfo.orderDisFlag){
                  orderInfo.orderTotal = discountAmount;
                  orderInfo.totalAmount=discountAmount;
              }
              if(orderInfo.includedTax)
                  orderInfo.includedTaxTotal = orderInfo.totalAmount.toFixed(2);
              else
                  orderInfo.includedTaxTotal = (Number(orderInfo.totalAmount) * 117 / 100).toFixed(2);

              return orderInfo;
          },
          printPreview() {
        //	LODOP.SET_PRINT_PAGESIZE(3,2500,1770,"A4");
              LODOP.SET_PRINT_PAGESIZE(1,2100, -1, "送货单");
              this.previewTable();
              LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);
              LODOP.PREVIEW();
          },
          previewTable(){
              LODOP.ADD_PRINT_HTM(5,"1%","99%",320,document.getElementById("div1").innerHTML);
              LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
              LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);

              //LODOP.ADD_PRINT_TABLE(220,"1%","99%",300,document.getElementById("div2").innerHTML);
              LODOP.ADD_PRINT_TABLE(180+( Math.ceil(JSON.parse(JSON.stringify(this.orderBaseInfo)).customer.customerName.length/30)+
                      Math.ceil(JSON.parse(JSON.stringify(this.orderBaseInfo)).customer.sendAddress.length/30)
                  )*20,"1%","99%",320,document.getElementById("div2").innerHTML);
              LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
          }
        /*打印结束*/
      },
    watch:{
      "$route":function (val) {
          console.log(val);
      }
    }
    }
</script>

<style scoped>

</style>
