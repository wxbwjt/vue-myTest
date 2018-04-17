<template>
    <div class="container-body">
        <top-nav :id="id"></top-nav>
        <router-view></router-view>
    </div>
</template>
<script>
  import NavBar from './TopNavBtn.vue'
  export default {
    name:"OrderDetail",
    mounted:function(){
      this.id = this.$route.params.id;
      this.getDetail();
    },
    data(){
      return {
        id:0
      }
    },
    methods:{
      getDetail(){
        this.$http.post("/task/detail", {param:this.id})
          .then((response) => {
            if(response.data.status=='200'){
            let res = response.data;
            this.$store.commit("SET_ORDERDETAIL",res);//
            this.$store.commit("SET_ORDERBASEINFO",res.orderBaseInfo);//
            this.$store.commit("SET_ORDERDETAILLIST",res.orderDetailDtos);//
            this.$store.commit("SET_LISTLABELDTO",res.listLabelDto);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    components:{
      "top-nav":NavBar
    },
    computed:{
      isReloadLeftList(){
        return this.$store.state.isReloadLeftList;
      }
    },
    watch:{
      "$route.params.id": function(){
        this.id = this.$route.params.id;
        this.getDetail()
      },
        "$route.name"(){
          if(this.$route.name == 'tab1')
            this.getDetail()
        },
      'isReloadLeftList'(oval,nvl){
        if(oval!=nvl){
          this.getDetail();
        }

      }
    }
  }
</script>
<style scoped>

</style>
