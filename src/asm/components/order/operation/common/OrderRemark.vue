/**
* 订单备注
*/
<template>
        <el-card>
            <div slot="header"  class="search-head"><span><i class="fa fa-tag"></i>订单备注</span></div>
            <el-col :span="3" class="my-label">订单备注</el-col>
            <el-col :span="21" class="my-content"><el-input v-model="remark"></el-input></el-col>
        </el-card>
</template>
<script>
    export default{
        name: 'OrderRemark',
        props:{
            value:{
                type:String,
                default:""
            }
        },
        data(){
            return{
                remark:this.value
            }
        },
        watch:{
            'value'(){
                this.remark = this.value
            },
            'remark'(){
                this.$emit('input',this.remark)
            }
        }
    }
</script>
<style>
</style>