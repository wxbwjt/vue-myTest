/**
* 订单统计表搜索
*/
<template>
    <div class="card-box">
        <div class="card-box-inner">
          <el-date-picker type="date"
                          style="width:16%"
                          size="small"
                          @change="changeBillSTime"
                          placeholder="下单起始时间"
                          v-model="searchParams.billSTime">
          </el-date-picker>
          <el-date-picker type="date"
                          style="width:16%"
                          size="small"
                          @change="changeBillETime"
                          value-format="yyyy-MM-dd"
                          placeholder="下单结束时间"
                          v-model="searchParams.billETime">
          </el-date-picker>
          <el-date-picker type="date"
                          style="width:16%"
                          size="small"
                          @change="changeStartTime"
                          placeholder="发货起始时间"
                          v-model="searchParams.startTime">
          </el-date-picker>
          <el-date-picker type="date"
                          style="width:16%"
                          size="small"
                          @change="changeEndTime"
                          placeholder="发货结束时间"
                          v-model="searchParams.endTime">
          </el-date-picker>
          <el-date-picker type="date"
                          style="width:16%"
                          size="small"
                          @change="changePaySTime"
                          placeholder="到款起始时间"
                          v-model="searchParams.paySTime">
          </el-date-picker>
          <el-date-picker type="date"
                          style="width:16%"
                          size="small"
                          @change="changePayETime"
                          placeholder="到款结束时间"
                          v-model="searchParams.payETime">
          </el-date-picker>
        </div>
        <div class="card-box-inner">
            <el-input v-model="searchParams.customer_Name"   style="width:16%" placeholder="客户名称" size="small"></el-input>
            <el-input v-model="searchParams.machine_salesman"   style="width:16%" placeholder="机器业务员" size="small"></el-input>
            <el-input v-model="searchParams.parts_Name"   style="width:16%" placeholder="配件名称" size="small"></el-input>
            <el-input v-model="searchParams.specifi_cation"   style="width:16%" placeholder="配件型号" size="small"></el-input>
          <el-select   placeholder="订单来源" size="small" v-model="searchParams.order_source" clearable style="width:16%">
            <el-option value="1" label="永创订单"></el-option>
            <el-option value="2" label="美华订单"></el-option>
            <el-option value="3" label="成田订单"></el-option>
          </el-select>
          <el-select clearable  multiple v-model="searchParams.order_Type" placeholder="订单类型(可多选)" style="width:16%"    size="small">
            <el-option
              v-for="item,index in orderTypes"
              :key="item"
              :label="item"
              :value="index+1">
            </el-option>
          </el-select>
        </div>
        <div class="card-box-inner">
          <el-select multiple  v-model="searchParams.status_o" placeholder="订单状态(可多选)" style="width:16%"     size="small">
            <el-option
              v-for="item,index in orderStatus"
              v-if="index==0 || index==1|| index==2|| index==3|| index==6"
              :key="item"
              :label="item"
              :value="index+1">
            </el-option>
          </el-select>
          <el-select multiple  v-model="searchParams.status_d" placeholder="发货状态（可多选）" style="width:16%"     size="small">
            <el-option
              v-for="item,index in deliveryStatus"
              :key="item"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
          <el-select multiple  v-model="searchParams.status_i" placeholder="开票状态（可多选）" style="width:16%"     size="small">
            <el-option
              v-for="item,index in invoiceStatus"
              v-if="index =='0' || index =='1'"
              :key="item"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
          <el-select multiple  v-model="searchParams.status_p" placeholder="汇款状态（可多选）" style="width:16%"     size="small">
            <el-option
              v-for="item,index in orderStatus"
              v-if="index =='11' || index =='12' || index =='13'"
              :key="item"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
          <el-select clearable   v-model="searchParams.operator_id" placeholder="业务人员" style="width:16%"     size="small">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
            <el-button @click="search" type="primary" size="small">搜索</el-button>
        </div>
    </div>
</template>
<script>
  export default{
    name: 'OrderReportSearchBar',
    mounted(){
      this.searchParams.billSTime = this.lastToday;
      this.searchParams.billETime = this.curDate;
    },
    data(){
        return{
          searchParams:{
            customer_Name: '',
            machine_salesman: '',
            parts_Name: '',
            specifi_cation: '',
            status_o: [],
            status_d: [],
            status_i: [],
            billSTime: '',
            billETime: '',
            startTime: '',
            endTime: '',
            order_source: '',
            order_Type: [],
            operator_id: '',
            paySTime: '',
            payETime: '',
            status_p: []
          },
        }
    },
    computed:{
      curDate () {
        return new Date().toString().substring(0, 10);
      },
      lastToday(){
        let myDate=new Date();
        myDate.setMonth(myDate.getMonth()-1);
       let last= myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate();
       return last;
      },
      user(){//用户数据
        return this.$store.state.user
      },
      orderStatus(){//订单状态
        return this.$store.state.moduleOrder.enumsList.orderStatus
      },
      userList(){//用户数据
        return this.$store.state.moduleOrder.userList
      },
      orderTypes(){//订单类型
        return this.$store.state.moduleOrder.enumsList.orderTypes
      },
      deliveryStatus:function () {//发货状态
        return this.$store.state.moduleOrder.enumsList.deliveryStatus
      },
      invoiceStatus:function () {//开票状态
        return this.$store.state.moduleOrder.enumsList.invoiceStatus
      }
    },
    methods:{
      changeBillSTime(v){
        this.searchParams.billSTime = v;

      },
      changeBillETime(v){
        this.searchParams.billETime = v;
      },
      changeStartTime(v){
        this.searchParams.startTime = v;
      },
      changeEndTime(v){
        this.searchParams.endTime = v;
      },
      changePaySTime(v){
        this.searchParams.paySTime = v;
      },
      changePayETime(v){
        this.searchParams.payETime = v;
      },

      search(){
        this.$emit('setParam',this.searchParams)
      },
    }
  }
</script>
<style>
</style>
