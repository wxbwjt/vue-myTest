/**
* 订单统计表
*/
<template>
  <div style="width: 100%">
    <search-bar :params="searchParams" @setParam="search"></search-bar>
    <div style="padding: 0px 15px;width: 3200px;background-color: #fff" class="table-small-padding">
      <h2 style="text-align: center">订单统计表</h2>
      <order-report-table :data="tableData" v-loading.fullscreen="loading" element-loading-text="数据量较大，加载中"></order-report-table>
    </div>
  </div>
</template>

<script type="es6">
  import SearchBar from './OrderReportSearchBar'
  import OrderReportTable from "./OrderReportTable";
  var sw = true
  export default {
    name: 'OrderReportList',
    mounted(){
      this.searchParams.billSTime = this.lastToday;
      this.searchParams.billETime = this.curDate
      this.doAjax(this.searchParams);
  },
    data () {
      return {
          loading:true,
        isActive:true,
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
        tableData: [],
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        let userList = this.userList;
        for(let i = 0;i<userList.length;i++){
            if(userList[i].id == value){
                return userList[i].name;
            }
        }
      }
    },
    methods: {
      search(val){
        this.searchParams = val;
        this.doAjax(this.searchParams);
      },
      doAjax(param){
          this.loading=true
        let first = {firstFlag: true};
        let data = JSON.parse(JSON.stringify(param));
          data.order_Type = JSON.stringify(param.order_Type);
        data.status_o = JSON.stringify(param.status_o);
        data.status_d = JSON.stringify(param.status_d);
        data.status_i = JSON.stringify(param.status_i);
        data.status_p = JSON.stringify(param.status_p);
        this.$http.post("/report/orderReport",  data)
          .then((response) => {
            let res = response.data;
            this.tableData = res.mapDetail?res.mapDetail:[];
              this.loading=false
          })
          .catch((error) => {
            console.log(error);
              this.loading=true
          });
      },
    },
    computed: {
      userList(){//用户数据
        return this.$store.state.moduleOrder.userList
      },
      user(){//用户数据
        return this.$store.state.user
      },
      curDate () {
        return new Date().toString().substring(0, 10);
      },
      lastToday(){
        let myDate=new Date();
        myDate.setMonth(myDate.getMonth()-1);
        let last= myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate();
        return last;
      },
    },

    components: {
        OrderReportTable,
        SearchBar,
    },
    watch: {
    }
  }
</script>

<style>
  .bottomBoder{
    border-bottom: 1px solid #dfe6ec
  }

  .partsName .cell {
    padding: 0px !important;
  }

  .specification .cell {
    padding: 0px !important;
  }
  .unit .cell {
    padding: 0px !important;
  }
  .orderCount .cell {
    padding: 0px !important;
  }
  .singlePrice .cell {
    padding: 0px !important;
  }
  .discount .cell {
    padding: 0px !important;
  }
  .discountAmount .cell {
    padding: 0px !important;
  }
  .mashineType .cell {
    padding: 0px !important;
  }
  .repertoryId .cell {
    padding: 0px !important;
  }
  .deliver .cell {
    padding: 0px !important;
  }
  .deliveryBalance .cell {
    padding: 0px !important;
  }
  .orderStatus .cell {
    padding: 0px !important;
  }
</style>
