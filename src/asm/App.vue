<template>
  <div id="app">
    <el-row >
      <el-col :span="24" >
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
    mounted(){
    this.getLoginUser();
    this.$store.dispatch('getEnums')//获取相关枚举
        this.$store.dispatch('getUserList')//获取业务员列表
      },
    methods:{
        getLoginUser:function(){
            var self = this;
            this.$http.post('/asm/getUserInfo')
                .then(response=>{
                    if(response.data.status==200){
                        this.$store.commit("SET_USER",response.data.data.user);
                    }else{
                        this.errormsg=response.message;
                    }
                },response=>{
                    this.$message({
                        'type':'error',
                        message:'请先登陆',
                        'showClose':true
                    });
                })
        }
    }
}
</script>

<style>
  body{ padding:0; margin: 0px; font-family: 'Microsoft YaHei'; }
</style>
