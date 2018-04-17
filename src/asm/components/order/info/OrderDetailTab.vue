/**
* Created by chenhuanlu on 2017/10/20.
*/

<template>
    <div>
        <AuthWraper permission="task_asm:view"><div v-if="info.orderType != 6 && info.orderType != 9 && info.status != 7">
          <el-row type="flex" style="margin-right: 10px" justify="space-between">
            <el-row  :span="12" justify="start">
              <el-button @click="quotes" icon="edit">报价单</el-button>
              <el-button @click="senEmail"><i class="el-icon-message"></i> 向客户发送电子报价单</el-button>
                <el-button @click="registration"><i class="fa fa-pencil-square"></i> 登记表</el-button>
                <el-button @click="contract" v-if="info.orderSource!=3"><i class="fa fa-file-text"></i> 合同</el-button>
            </el-row>
            <el-row v-if="info.status == 1"  :span="6" justify="end">
              <el-button @click="placeOrder" type="success" >下单</el-button>
            </el-row>
          </el-row>
        </div></AuthWraper>
      <br/>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-if="info.orderType != 9 && info.status != 7">
                <AuthWraper role="售后服务发货员" nopermission="task_asm:view"><el-tab-pane  label="订单详情" name="tab1"  ></el-tab-pane></AuthWraper>
            <template v-for="item,index in tabsGroup" v-if="info.status != 1 || index == 0">
                <AuthWraper permission="task_asm:view" v-if="item.name == 'tab1'"><el-tab-pane  :label="item.value" :name="item.name"  ></el-tab-pane></AuthWraper>
                <AuthWraper permission="task_asm_invoice:*"  v-else-if="item.name == 'tab7'|| item.name == 'tab8'" ><el-tab-pane  :label="item.value" :name="item.name"  ></el-tab-pane></AuthWraper>
                <AuthWraper permission="task_asm:label" v-else-if="item.name == 'tab3'&&btnshow.deliveryTab == true"><el-tab-pane  :label="item.value" :name="item.name" ></el-tab-pane></AuthWraper>
                <el-tab-pane  :label="item.value" :name="item.name" v-else-if="(item.name == 'tab2' || item.name == 'tab5' || item.name == 'tab6')&&btnshow.deliveryTab == true"></el-tab-pane>
                <AuthWraper permission="task_asm:express" v-else-if="item.name == 'tab4'&&btnshow.deliveryTab == true"><el-tab-pane  :label="item.value" :name="item.name" ></el-tab-pane></AuthWraper>
                <el-tab-pane  :label="item.value" :name="item.name"  v-else></el-tab-pane>
            </template>
        <!--<el-tab-pane label="订单详情" name="orderInfo"></el-tab-pane>-->
        <!--<el-tab-pane label="发货跟踪" name="goodsTrack"></el-tab-pane>-->
        <!--<el-tab-pane label="标签" name="tag"></el-tab-pane>-->
        <!--<el-tab-pane label="快递" name="express"></el-tab-pane>-->
        <!--<el-tab-pane label="领料单" name="materialForm"></el-tab-pane>-->
        <!--<el-tab-pane label="送货单" name="deliverForm"></el-tab-pane>-->
        <!--<el-tab-pane label="开票" name="billing"></el-tab-pane>-->
        <!--<el-tab-pane label="汇款信息" name="remitInfo"></el-tab-pane>-->
        <!--<el-tab-pane label="变更记录" name="changeRecord"></el-tab-pane>-->
      </el-tabs>

      <br/>
      <transition name="fade">
          <AuthWraper permission="task_asm:view" v-if="activeName == 'tab1'"><router-view></router-view></AuthWraper>
          <AuthWraper role="售后服务发货员" v-if="activeName == 'tab1'"><router-view></router-view></AuthWraper>
          <router-view v-else></router-view>
      </transition>
      <quotation></quotation>
      <quo-email></quo-email>
        <registration-form></registration-form>
        <contract></contract>
    </div>

</template>

<script>
  import {quotation} from "../../print/printCss.js"
  import Quotation from "../../print/quotation/Quotation";
  import QuoEmail from "../../print/quotation_email/QuoEmail";
  import RegistrationForm from "../../print/registration/RegistrationForm";
  import Contract from "../../print/contract/Contract"
    export default{
        components: {
            RegistrationForm,
            QuoEmail,
            Quotation,
            Contract},
        name:"OrderDetailTab",
      mounted(){
        this.id = this.$route.params.id;

      },
        data(){
          return {
              id:'',
            sourceId:'',
            activeName: 'tab1',
          };
        },
      computed:{
        info:function () {
          return this.$store.state.moduleOrder.orderDetailData.orderDetail;
        },
        btnshow:function () {
          return this.$store.state.moduleOrder.orderDetailData.btnshow;
        },
        tabsGroup:function () {
          return this.$store.state.moduleOrder.enumsList.tabsGroup;
        },
          orderDetailDtos(){
              return this.$store.state.moduleOrder.orderDetailData.orderDetailDtos
          },
         isReloadLeftList(){
        return this.$store.state.isReloadLeftList;
      }
      },
        methods:{
          quotes(){ //报价单
              LODOP.SET_PRINT_PAGESIZE(1, 2100, 2970, "A4");
              LODOP.ADD_PRINT_HTM(28, "2%", "96%", 1200, document.getElementById("divHeader").innerHTML);
              LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
              LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
              var strHTML = document.getElementById("divDetail").innerHTML+quotation;
              LODOP.NewPage()
              var name = document.getElementById("printCustomerName").innerHTML;
              if (name.length > 38)
                  LODOP.ADD_PRINT_TABLE(398, "2%", "96%", 1600, strHTML);
              else
                  LODOP.ADD_PRINT_TABLE(378, "2%", "96%", 1600, strHTML);
              LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
              LODOP.PREVIEW();

//                let _this = this;
//              var image = new Image();
//              image.src = '/ys-web-asm/static/print/stamp.jpg';
//              image.onload = function(){
//                  var base64 = _this.getBase64Image(image);
//                  let header = document.getElementById("divHeader").innerHTML;
////                  header = header.replace('img',"img border='0' src='" + base64 + "'");
//                  LODOP.SET_PRINT_PAGESIZE(1, 2100, 2970, "A4");
//              LODOP.ADD_PRINT_HTM(28, "2%", "96%", 1200, header);
//              LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
//              LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
//              var strHTML = document.getElementById("divDetail").innerHTML+quotation;
//              LODOP.NewPage()
//              var name = document.getElementById("printCustomerName").innerHTML;
//              if (name.length > 38)
//                  LODOP.ADD_PRINT_TABLE(398, "2%", "96%", 1600, strHTML);
//              else
//                  LODOP.ADD_PRINT_TABLE(378, "2%", "96%", 1600, strHTML);
//              LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
//                  LODOP.ADD_PRINT_IMAGE(50,400,"100%","100%",base64);
//                  LODOP.SET_PRINT_STYLEA(0, "TransColor", "#FFFFFF");
//              LODOP.PREVIEW();
//              }

          },
  senEmail(){//向客户发送电子报价单
              let strHTML = document.getElementById("ys-email-list").innerHTML+quotation
              let param = {orderId:this.id}
              this.$http.post("/email/send", {html:strHTML,param:JSON.stringify(param)})
                  .then((response) => {
                      let res = response.data;
                      if(res.result==="success"){
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              'showClose': true
                          });

                      }else {
                          this.$message({
                              message: res.errMessage,
                              type: 'error',
                              'showClose': true
                          });
                      }
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          },
          placeOrder(){//下单
            let  orderDetailDtos =  this.orderDetailDtos;
            if(orderDetailDtos.length === 0){
              this.$alert('下单失败！请检查订单是否填写完整！', '温馨提示', {
                confirmButtonText: 'OK',
                callback: action => {
                }
              });
              return;
            }
            let orderParam = {"orderId":this.id,"sourceId":this.info.orderSource}
            this.$http.post("/task/placeOrder", {param:JSON.stringify(orderParam)})
              .then((response) => {
                let res = response.data;
                if(res.status==="200"){
                  this.$message({
                    message: '下单成功',
                    type: 'success'
                  });
                    this.$router.push({path:'/order',query:{orderId:this.$route.params.id}})
                }else if(res.status=='400'){
                   this.$message({
                    message: '订单号已存在',
                    type: 'warning'
                  });
                   this.$store.commit("SET_RELOAD_LEFTLIST",!this.isReloadLeftList)
                }
                else {
                  this.$message({
                    message: '下单失败',
                    type: 'warning'
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });

          },
          handleClick(tab, event) {
            this.$router.push("/order/detail/" + this.id + "/allDetail/"+tab.name);
            if(tab.name=="tab2"||tab.name=="tab3"||tab.name=="tab4"||tab.name=="tab5"||tab.name=="tab6")
                event.target.style.setProperty('color', 'red')
          },
            registration(){
                LODOP.SET_PRINT_PAGESIZE(1, 2100, 2970, "A4");
                LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
                LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
                var strHTML = document.getElementById("regDetail").innerHTML+quotation;
                LODOP.NewPage()
                    LODOP.ADD_PRINT_TABLE(58, "2%", "96%", 2700, strHTML);
                LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
                LODOP.PREVIEW();
            },
            contract(){
                LODOP.SET_PRINT_PAGESIZE(1, 2100, 2970, "A4");
                LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
                LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
                var strHTML = document.getElementById("contractDiv").innerHTML+quotation;
                LODOP.NewPage()
                LODOP.ADD_PRINT_TABLE(38, "2%", "96%", 2700, strHTML);
                LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
                LODOP.PREVIEW();
            }
        },
      watch:{
            "$route":function () {
                this.id = this.$route.params.id
              this.activeName = this.$route.name;

            },
            "$route.params.id"(){
              let tabs = document.getElementsByClassName("el-tabs__item")
              for(let tab of tabs){
                tab.style.removeProperty('color')
              }
            }
      }

    }
</script>

<style scoped>

</style>
