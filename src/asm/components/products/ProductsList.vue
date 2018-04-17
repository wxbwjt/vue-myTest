/**
* 配件管理列表
*/
<template>
  <el-row>
    <el-col :span="8" id="leftMainBox" class="table-small-padding">
      <search-bar :params="searchParams" @setParam="search"></search-bar>
      <transition name="fade">
        <router-view @setParam="search"></router-view>
      </transition>
    </el-col>
    <el-col id='rightMainBox'  :span="16"  class="table-small-padding">
      <slide-bar leftEl='#leftMainBox' rightEl='#rightMainBox'></slide-bar>
        <div style="padding: 10px 15px">
          <p class="form-title" ><i class="el-icon-setting"></i>配件管理</p>
          <el-table :data="tableData"  border>
            <el-table-column  label="序号" min-width="40" align="center">
              <template slot-scope="scope">
                {{numb(scope.$index)}}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="配件名称" min-width="70" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="specification" label="型号" min-width="70" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="mashineType" label="机型"  min-width="70" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="unit" label="单位" min-width="20" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="basePrice" label="单价" min-width="40" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="salePrice" label="售价"  min-width="40" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column  label="操作"  min-width="40">
              <template slot-scope="scope">
                <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pageBox">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="total">
            </el-pagination>
          </div>
        </div>
    </el-col>

  </el-row>
</template>

<script type="es6">
  import SlideBar from '../common/SlideBar'
  import SearchBar from './ProductsSearchBar'
  export default {
    name: 'ProductsList',
    mounted(){
        this.$router.push('/products/add');
      this.doAjax();


    },
    data () {
      return {
        currentPage: 1,
        total:0,
        searchParams:{
          name:'',
          specification:'',
        },
        tableData:[],
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
            this.$router.push({path:"/products/edit/" + val.id,query:val})
        },
      numb(val){
        return val+1+(this.currentPage-1)*20
      },
      handleDelete(index,row){
        this.$confirm('你确定需要删除该产品吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.doDel(row)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      doDel(row){
        this.$http.post("/products/delProd", {productId:row.id})
          .then((response) => {
            let res = response.data.data;
            if (res.result==='success'){
              this.search();
              this.$message({
                showClose: true,
                message: '删除成功！',
                type: 'success'
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      search(val){
        this.searchParams = val;

        this.doAjax();
      },
      doAjax(){
        let data = {
          "pageNo": this.currentPage,
          "param": this.searchParams
        };
        this.$http.post("/products/productsList", data)
          .then((response) => {
            let res = response.data;
            this.tableData = res.data;
            this.total = res.total;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    components:{
        SearchBar,
      SlideBar
    },
    watch:{


    }
  }
</script>

<style>
</style>
