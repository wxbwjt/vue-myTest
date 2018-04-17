/**
* 配件搜索
*/
<template>
    <div class="card-box">
        <el-card>
            <div slot="header" class="search-head">
                <span><i class="el-icon-search"></i>配件查询</span>
            </div>
            <div class="card-box-inner">
                <el-input v-model="name"  style="width:30%" placeholder="配件名称" size="small"></el-input>
                <el-input v-model="specification"  style="width:30%" placeholder="配件型号" size="small"></el-input>
                <el-button type="primary" @click="search()" size="small" >搜索</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
  export default{
    name: 'ProductsSearchBar',
    data(){
        return{
          name:'',
          specification:'',
        }
    },
    methods:{
      search(){
        let searchParams = JSON.stringify({name: this.name, specification: this.specification})
        this.$emit('setParam',searchParams);
      }
    }
  }
</script>
<style>
</style>
