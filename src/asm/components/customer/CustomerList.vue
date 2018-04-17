/**
* 客户管理列表
*/
<template>
  <el-row>
    <el-col :span="8" id="leftMainBox" class="table-small-padding">
      <search-bar :params="custName" @setParam="search"></search-bar>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </el-col>
    <el-col id='rightMainBox'  :span="16" class="table-small-padding">
      <slide-bar leftEl='#leftMainBox' rightEl='#rightMainBox'></slide-bar>
        <div style="padding: 10px 15px">
          <p class="form-title" style="padding-top: 6px;margin-bottom: 10px;text-indent: 0"><i class="fa fa-user-circle"></i>客户管理</p>
          <el-table :data="tableData"   border>
            <el-table-column label="序号" min-width="25">
              <template slot-scope="scope">
                {{numb(scope.$index)}}
              </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户名称" min-width="70" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="telephone" label="电话" min-width="40" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="taxNo" label="税号"  min-width="40" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="bankName" label="开户银行" min-width="70" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="customerAddress" label="地址" min-width="40" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="fax" label="传真"  min-width="40" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="progressName" label="操作"  min-width="100">
              <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleInfo(scope.row)">查看</el-button>
                <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                <el-button
                        size="mini"
                        @click="contact( scope.row)">联系人</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pageBox">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="9"
                    layout="total, prev, pager, next"
                    :total="total">
            </el-pagination>
          </div>
          <contact-detail v-model="showConts" :cusId="currentId"></contact-detail>
        </div>
    </el-col>
  </el-row>
</template>

<script type="es6">
  import SlideBar from '../common/SlideBar'
  import SearchBar from './CustomerSearchBar'
  import ContactDetail from "./ContactDetail";
  export default {
    name: 'CustomerList',
    mounted(){
        this.$router.push('/customer/add')
        this.doAjax()
    },
    data () {
      return {
          currentPage: 1,
        total:0,
          custName:"",
        tableData:[],
          showConts:false,
          currentId:0,
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.doAjax();
        },
        handleEdit(val){
          this.$router.push("/customer/edit/"+val.id+"?bankId="+val.bankInfoId)
        },
        handleInfo(val){
            this.$router.push("/customer/info/"+val.id+"?bankId="+val.bankInfoId)
        },
        handleDelete(val){
            console.log(val)
            let data = {"custId":val.id,"bankId":val.bankInfoId}
            this.$http.post("/config//delCust",data)
                .then((response)=> {
                    if(response.data.data.status == '200'){
                        this.$message({
                            'type':'success',
                            message:"删除成功",
                            'showClose':true
                        });
                        this.doAjax()
                    }else{
                        this.$message({
                            'type':'error',
                            message:"提交失败，,请重试或联系管理",
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
        },
        contact(val){
            this.showConts=true;
            this.currentId = val.id
        },
      search(val){
        this.custName = val;
          this.currentPage = 1;
        this.doAjax();
      },
      doAjax(){
          let data = {"page":this.currentPage,"custName":this.custName};
          this.$http.post("/config/customer",data)
              .then((response)=> {
              if(response.data.state == '200'){
                  this.tableData = response.data.data.custList;
                  this.total = response.data.data.total
              }else{
                  this.$message({
                      'type':'error',
                      message:"请求失败，,请重试或联系管理",
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
      },
        numb(val){
          return val+1+(this.currentPage-1)*9
        }
    },
    components:{
        ContactDetail,
        SearchBar,
      SlideBar
    },

    watch:{
        '$route'(n,o){
            console.log(n)
            if(n.name=='customer'){
                this.$router.push('/customer/add')
                if(o.name == "cadd"){
                    this.currentPage = 1
                }
                this.doAjax()
            }
        }
    }
  }
</script>

<style>
</style>
