/**
* 订单搜索
*/
<template>
    <div class="card-box">
        <el-card>
            <div slot="header" class="search-head">
                <span><i class="el-icon-search"></i>订单/报价单查询</span>
                <div style="float: right;margin-top: -5px;" v-auth:task_asm:add>
                    <el-button @click="addOrder" type="success" size="small"><i class="fa fa-plus-circle"></i> 新增报价单</el-button>
                </div>
            </div>
            <div class="card-box-inner">
                <el-input  style="width:30%" placeholder="订单号" size="small" v-model="searchParams.orderNo"></el-input>
                <el-date-picker
                        style="width:30%"
                        size="small"
                        v-model="searchParams.startTime"
                        type="date"
                        @change="changeStartTime"
                        placeholder="发货开始">
                </el-date-picker>
                <el-date-picker
                        style="width:30%"
                        size="small"
                        v-model="searchParams.endTime"
                        @change="changeEndTime"
                        type="date"
                        placeholder="发货结束">
                </el-date-picker>
            </div>
            <div class="card-box-inner">
             <el-input  style="width:30%" placeholder="客户名称" size="small" v-model="searchParams.customerName"></el-input>
                <el-input  style="width:30%" placeholder="配件名称" size="small" v-model="searchParams.partsName"></el-input>
                    <el-input style="width:30%" placeholder="配件型号" size="small" v-model="searchParams.specification"></el-input>
            </div>
            <div class="card-box-inner">
            <el-select  style="width:30%" placeholder="订单类型" size="small" clearable  v-model="searchParams.orderType" @change="changeFocus">
                    <el-option v-for="item,index in orderTypes" :value="index+1" :label="item" :key="index+1"></el-option>
                </el-select>
                 <el-select style="width:30%" placeholder="订单状态" size="small" clearable  v-model="searchParams.status" @change="changeFocus">
                    <el-option v-for="item,index in orderStatus" :value="index>=12?index+2:index+1" :label="item" :key="index>12?index+2:index+1"></el-option>
                </el-select>
                <el-select  style="width:30%" placeholder="订单来源" size="small" v-model="searchParams.orderSource" clearable @change="changeFocus">
                    <el-option value="1" label="永创订单"></el-option>
                    <el-option value="2" label="美华订单"></el-option>
                    <el-option value="3" label="成田订单"></el-option>
                </el-select>
            </div>
            <div class="card-box-inner">
                 <el-select  style="width:30%" placeholder="业务员" size="small" clearable filterable  v-model="searchParams.operator" @change="changeFocus">
                    <el-option v-for="item in userList" :value="item.id" :label="item.name" :key="item.id"></el-option>
                </el-select>
                <el-input  style="width:30%" placeholder="机器业务员" size="small" v-model="searchParams.machineSalesman"></el-input>
                <el-select style="width:30%" placeholder="待办事项" size="small" clearable v-model="searchParams.toDo" @change="changeFocus">
                    <el-option value="1" label="待收货"></el-option>
                    <el-option value="2" label="发票待开票"></el-option>
                    <el-option value="3" label="发票待处理"></el-option>
                </el-select>
            </div>
            <div class="card-box-inner">
                <el-input  style="width:30%" placeholder="快递单号" size="small" v-model="searchParams.deliveryNo"></el-input>
                <el-input style="width:30%" placeholder="发票号" size="small" v-model="searchParams.invoiceNo"></el-input>
                <el-input style="width:30%" placeholder="总价（含税）" size="small" v-model="searchParams.totalMoneyWithTax"></el-input>
            </div>
            <div class="card-box-inner">
                <div style="display:inline-block;width: 80%"></div>
            <el-button type="primary" size="small" @click="setParam" >搜索</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
  export default{
      name: 'OrderSearchBar',
      mounted(){
          this.$nextTick(()=>{
              document.getElementById('leftMainBox').focus()
              var _this = this
              document.getElementById('leftMainBox').onkeyup =  function(e){//按键信息对象以函数参数的形式传递进来了，就是那个e
                  var code = e.charCode || e.keyCode;  //取出按键信息中的按键代码(大部分浏览器通过keyCode属性获取按键代码，但少部分浏览器使用的却是charCode)
                  if (code == 13) {
                      _this.setParam()
                  }
              }
          })
      },
      props:{
          params:Object
      },
      data(){
          return {
              searchParams:this.params,
          }
      },
      methods: {
          changeFocus(){
              document.getElementById('leftMainBox').focus()
          },
          setParam(){
              this.$store.commit('SET_LIST_PUSH',true)//打开列表跳转开关
              let obj = this.searchParams;
              let tmwt = obj.totalMoneyWithTax.replace(/\s+/g,"");
              if(!tmwt||isNaN(tmwt)){
                  obj.totalMoneyWithTax=""
              }else{
                  obj.totalMoneyWithTax=Number(tmwt)
              }
            this.$emit('setParam', obj)
          },
          addOrder(){
              this.$store.commit('SET_LIST_PUSH',false)//关闭列表跳转开关
                 this.$router.push('/order/goAdd')
          },
        changeStartTime(v){
          this.searchParams.startTime = v;
            document.getElementById('leftMainBox').focus()
        },
        changeEndTime(v){
          this.searchParams.endTime = v;
            document.getElementById('leftMainBox').focus()
        }
      },
      computed:{
          orderStatus(){
              return this.$store.state.moduleOrder.enumsList.orderStatus
          },
          userList(){
              return this.$store.state.moduleOrder.userList
          },
          orderTypes(){
              return this.$store.state.moduleOrder.enumsList.orderTypes
          },
      },
      watch:{
          'params'(){
              this.searchParams=this.params
          }
      }
  }
</script>
<style>
</style>
