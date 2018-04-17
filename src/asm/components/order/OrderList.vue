<template>
  <el-row>
    <c-lodop-js></c-lodop-js>
    <el-col :span="8" id="leftMainBox" class="table-small-padding" tabindex = "0">
      <search-bar :params="searchParams" @setParam="search"></search-bar>
      <div style="padding: 10px" v-loading="loading" element-loading-text="拼命加载中">
      <el-table :data="tableData"  :row-class-name="highlightCurrent" @row-click="(val) => { $store.commit('SET_LIST_PUSH',true); rowCurrentChange(val)}"  border>
        <el-table-column prop="customerName" label="客户名称" min-width="70" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="orderNo" label="订单号"  min-width="95" :show-overflow-tooltip="true" > </el-table-column>
        <el-table-column prop="billDate" label="下单日期"  :show-overflow-tooltip="true">
          <span slot-scope="scope">{{new Date(scope.row.billDate?scope.row.billDate:scope.row.createdTime).pattern("yyyy-MM-dd")}}</span>
        </el-table-column>
        <el-table-column prop="orderType" label="类型" min-width="50" :show-overflow-tooltip="true">
          <span slot-scope="scope">{{orderTypes[scope.row.orderType-1]}}</span>
        </el-table-column>
        <AuthWraper norole="售后服务汇款登记">
        <el-table-column prop="status" label="状态"  min-width="70" :show-overflow-tooltip="true">
          <span slot-scope="scope">{{orderStatus[scope.row.status-1]}}</span>
        </el-table-column>
        </AuthWraper>
        <AuthWraper role="售后服务汇款登记">
          <el-table-column prop="totalMoneyWithTax" label="总价(含税)" min-width="80" :show-overflow-tooltip="true">
          </el-table-column>
        </AuthWraper>
        <el-table-column  label="操作"  min-width="40">
          <template slot-scope="scope">
            <span v-auth:task_asm:edit>
              <el-button
                      :disabled="showEdit(scope.row)"
                      size="mini"
                      type="text"
                      @click.stop="edit(scope.row)"><i class="el-icon-edit"></i></el-button>
            </span>
            <span v-auth:task_asm:edit.not>
              <el-button
                      size="mini"
                      type="text"
                     disabled><i class="el-icon-edit"></i></el-button>
            </span>
            <span v-auth:task_asm:delete>
             <el-button
                     :disabled="showDelete(scope.row)"
                     size="mini"
                     type="text"
                     @click.stop="deleteOrder(scope.row)"><i class="el-icon-delete"></i></el-button>
            </span>
            <span v-auth:task_asm:delete.not>
             <el-button
                     size="mini"
                     type="text"
                     disabled><i class="el-icon-delete"></i></el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="total">
        </el-pagination>
        </div>
      </div>
    </el-col>
    <el-col id='rightMainBox'  :span="16" tabindex = "0" style="outline: none">
      <slide-bar leftEl='#leftMainBox' rightEl='#rightMainBox'></slide-bar>
      <div class="container-main">
      <transition name="fade">
        <router-view></router-view>
      </transition>
      </div>
    </el-col>

  </el-row>
</template>

<script type="es6">
  import SlideBar from '../common/SlideBar'
  import SearchBar from './OrderSearchBar'
  export default {
    name: 'OrderList',
    mounted(){
        //内勤默认查询自己负责的报价单
        if(this.currentUser.roleNames){
            if(this.currentUser.roleNames.indexOf("售后服务内勤")!=-1){
                this.searchParams.operator = this.currentUser.id
            }
            this.doAjax(0)
        }
    },
    data () {
      return {
          loading:true,
          turnId:0,//跳转id
        currentPage: 1,
        total:0,
        searchParams:{
            orderNo:'',//订单号
            customerName:'',//客户名称
            status:'',//订单状态
            partsName:'',//配件名称
            orderType:'',//订单类型
            specification:'',//配件型号
            operator:'',//业务员
            machineSalesman:'',//机器业务员
            toDo:'',//待办事项
            orderSource:'',//订单来源
            startTime:'',//发货开始
            endTime:'',//发货结束
            deliveryNo:'',//快递单号
            invoiceNo:'',//发票号
            totalMoneyWithTax:'',//总价含税
        },
        tableData:[
        ],
        currentRow: {
          id:0
        }
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      /*翻页*/
      handleCurrentChange(val) {
        this.currentPage = val;
        this.doAjax(this.turnId);
      },
      /*选择列表某行*/
      rowCurrentChange(val){
        this.currentRow = val;
          if(this.pushOn)
        this.$router.push({path:'/order/detail/'+val.id+'/allDetail',query:{sourceId:val.orderSource}})
          this.$store.commit('SET_LIST_PUSH',true)//打开列表跳转开关
      },
      /*当前行高亮*/
      highlightCurrent(val){
        return (val.id==this.currentRow.id ? 'info-row' :'');
      },
      /*查询操作*/
      search(val){
        this.searchParams = val;
        this.currentPage=1
        this.doAjax(0);
      },
      /*列表请求*/
      doAjax(n){
          this.loading=true
          let obj = JSON.parse(JSON.stringify(this.searchParams))
          if(obj.startTime){
              obj.startTime = obj.startTime+' 00:00:00' ;

          }
          if(obj.endTime){
              obj.endTime =obj.endTime+' 24:00:00' ;

          }
          this.$http.post("/task/query",{param:JSON.stringify(obj),page:this.currentPage})
              .then((response)=> {
                  if(response.data.state == '200'){
                      this.tableData = response.data.data.data.list?response.data.data.data.list:[]
                      this.total = response.data.data.data.count
                      if(this.tableData&&this.tableData.length>0){
                             var firstrow = this.tableData[0];
                         if(n!=0){
                             //子订单定位
                             let sub = false
                            this.tableData.map((item)=>{
                                if(item.id==n){
                                    firstrow = item
                                    sub = true
                                }
                            })
                             if(!sub){
                                 this.currentPage++
                             }else{
                                 this.rowCurrentChange(firstrow);
                                 this.turnId=0
                                 this.loading=false
                             }
                          }else{
                             this.rowCurrentChange(firstrow);
                             this.loading=false
                         }
                      }else{
                          this.loading=false
                      }
                  }else if(response.data.state='400'){
                      console.log('请求取消')
                  }else{
                      console.log('数据请求出错')
                      this.loading=false
                  }
              })
              .catch( (error) =>{
                  this.loading=false
                  this.$message({
                      'type':'error',
                      message:"请求服务器发生错误,请重新登陆或联系后台",
                      'showClose':true
                  });
              });
      },
      /*修改按钮*/
        edit(val){
          this.currentRow = val
          let type = val.orderType
            let  oldType = val.parentOrderId
            if ( type == 7 ) {
                this.$router.push('/order/reissueEdit/'+val.id)
            } else if ( type == 6 ) {
                if( oldType == "" ) {
                    this.$router.push('/order/edit/'+val.id)
                } else {
                    this.$router.push('/order/refundEdit/'+val.id)
                }
            } else if ( type == 9 ) {
                this.$router.push('/order/orderCancelEdit/'+val.id)
            } else if ( type == 8 ) {
                this.$router.push('/order/changeEdit/'+val.id)
            } else {
                this.$router.push('/order/edit/'+val.id)
            }
        },
      /*修改按钮显隐*/
        showEdit(val){
            let boo = true
            if(val.parentOrderId != 0&&val.orderType == 6){
               boo = false
            }else if(val.status == 1 && val.customerStatus == 1 && this.currentUser.Id == val.operator){
                boo = false
            }else if(val.status != 3 && val.status != 7 && val.customerStatus == 1){
                boo = false
            }
            return boo
        },
      /*删除按钮显隐*/
        showDelete(val){
            let boo = true
            if(val.status == 1 && val.customerStatus == 1 && this.currentUser.Id == val.operator){
                boo = false
            }else if(val.status == 1 && val.customerStatus != 1 &&  this.currentUser.Id == val.operator){
                boo = false
            }
            return boo
        },
      /*删除操作*/
        deleteOrder(val){
            this.$confirm('你确定需要删除该订单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post("/task/delete",{param:val.id})
                    .then((response)=> {
                        if(response.data.data.status == '200'){
                            this.$message({
                                'type':'success',
                                message:"删除成功",
                                'showClose':true
                            });
                            this.doAjax(0)
                        }else{
                            this.$message({
                                'type':'error',
                                message:"删除失败，,请重试或联系管理",
                                'showClose':true
                            });
                        }
                    })
                    .catch( (error) =>{
                        this.$message({
                            'type':'error',
                            message:"请求服务器发生错误,请重新登陆或联系后台",
                            'showClose':true
                        });
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
    },
      computed:{
          orderDetail(){
              return this.$store.state.moduleOrder.orderDetailData.orderDetail
          },
          orderStatus(){
              return this.$store.state.moduleOrder.enumsList.orderStatus
          },
          orderTypes(){
              return this.$store.state.moduleOrder.enumsList.orderTypes
          },
          currentUser(){
              return this.$store.state.user
          },
          pushOn(){
              return this.$store.state.moduleOrder.pushOn
          }
      },
    components:{
      SearchBar,
      SlideBar,
      //打印js引入
            'c-lodop-js': {
                render(createElement) {
                    if(this.src){
                         return  createElement('script', { attrs: { type: 'text/javascript', src: this.src }})
                    }
                },
                mounted(){
                    this.getPrintAdd()
                },
                data(){
                    return{
                        src:''
                    }
                },
                methods:{
                    //获取打印js
                    getPrintAdd(){
                        this.$http.post("/asm/queryPrintSrvAddr")
                            .then((response)=> {
                                if(response.data.status == '200'){
                                    this.src = response.data.url+'/CLodopfuncs.js?priority=1'
                                }else{
                                    console.log("获取CLodop.js失败")
                                }
                            })
                            .catch( (error) =>{
                            });
                    }
                }
            },
    },

    watch:{
        //订单操作后刷新与定位
        '$route'(to,from){
//            console.log(to)
           if(to.name=='order'){
                let orderId = to.query.orderId
               if(orderId===undefined){
               }else{
                   Object.assign(this.searchParams,{
                       orderNo:'',//订单号
                       customerName:'',//客户名称
                       status:'',//订单状态
                       partsName:'',//配件名称
                       orderType:'',//订单类型
                       specification:'',//配件型号
                       machineSalesman:'',//机器业务员
                       toDo:'',//待办事项
                       orderSource:'',//订单来源
                       startTime:'',//发货开始
                       endTime:'',//发货结束
                       deliveryNo:'',//快递单号
                       invoiceNo:'',//发票号
                       totalMoneyWithTax:''
                   })
                   this.turnId = orderId
                   if(this.currentPage==1){
                       this.doAjax(this.turnId)
                   }else{
                       this.currentPage=1
                   }
               }
           }
        },
        'orderDetail'(){
            this.currentRow.status = this.orderDetail.status
            this.currentRow.orderType = this.orderDetail.orderType
            this.currentRow.customerName = this.orderDetail.customer.customerName
            this.currentRow.billData = this.orderDetail.billData
            this.currentRow.orderNo = this.orderDetail.orderNo
            this.currentRow.totalMoneyWithTax = this.orderDetail.totalMoneyWithTax
        },
        'currentUser'(){
            if(this.currentUser.roleNames.indexOf("售后服务内勤")!=-1){
                this.searchParams.operator = this.currentUser.id
                this.doAjax(0)
            }
        }
    },
  }
</script>

<style>
</style>
