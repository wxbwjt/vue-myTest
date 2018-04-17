/**
* Created by chenhuanlu on 2017/10/21.
*/

<template>
    <div class="table-small-padding big-table">
      <el-tabs v-model="activeName"  type="card" >
        <el-tab-pane label="配件明细列表" name="partDetailList"></el-tab-pane>
        <el-tab-pane label="已领的领料单" name="materilOrder"></el-tab-pane>
      </el-tabs>
      <hasmateril-form v-if="activeName=='materilOrder'"></hasmateril-form>
      <part-detail-list v-if="activeName=='partDetailList'"></part-detail-list>
    </div>
</template>

<script>
  import  HasmaterilForm from './HasmaterilForm.vue'
  import  PartDetailList from './PartDetailList.vue'

  export default{
      mounted(){
        this.id = this.$route.params.id
      },
      data(){
          return{
            activeName: 'partDetailList',
              id:0
          }
      },
    methods: {
    },

    computed: {

    },
    components: {
      HasmaterilForm,
      PartDetailList
    },
      watch:{
          '$route'(){
              this.id = this.$route.params.id
          },
          'activeName'(){
          }
      }
    }
</script>

<style scoped>

</style>
