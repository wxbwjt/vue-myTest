/**
* 客户搜索
*/
<template>
    <div class="card-box">
        <el-card>
            <div slot="header" class="search-head">
                <span><i class="el-icon-search"></i>客户查询</span>
            </div>
            <div class="card-box-inner">
                <el-input  style="width:30%" placeholder="客户名称" size="small" v-model="name"></el-input>
                <el-button type="primary" size="small" @click="setParam">搜索</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
  export default{
    name: 'CustomerSearchBar',
      props:{
          custName:String
      },
      data(){
        return{
            name :this.custName,
        }
      },
      methods: {
          setParam(){
              this.$emit('setParam', this.name)
          }
      }
  }
</script>
<style>
</style>