/**
* 配件新增/编辑
*/
<template>
    <el-dialog v-model="show" @close="closeDialog" :title="isAdd?'新增配件':'修改配件'" size="tiny"  >
        <el-form label-width="90px" :model="form" :rules="rules" ref="form">
            <el-form-item label="客户物料号" prop="customerMaterialsId">
                <el-input size="small" v-model="form.customerMaterialsId"></el-input>
            </el-form-item>
            <el-form-item label="配件名称" prop="partsName">
                <el-autocomplete
                        popperClass="my-popperClass"
                        size="small"
                        style="width: 100%"
                        v-model="form.partsName"
                        :fetch-suggestions="querySearch"
                        :trigger-on-focus="false"
                        custom-item="my-item-part"
                        @select="handleSelect"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="型号" prop="specification">
                <el-input size="small" v-model="form.specification"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-input size="small" v-model="form.unit"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="orderCount">
                <el-input size="small" v-model.number="form.orderCount"></el-input>
            </el-form-item>
            <el-form-item label="单价" prop="singlePrice">
                <el-input size="small" v-model.number="form.singlePrice"></el-input>
            </el-form-item>
            <el-form-item label="折扣(%)" prop="discount">
                <el-input size="small" v-model.number="form.discount"></el-input>
            </el-form-item>
            <el-form-item label="金额" prop="discountAmount">
                <el-input size="small" v-model="form.discountAmount" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="机型" prop="mashineType">
                <el-input size="small" v-model="form.mashineType"></el-input>
            </el-form-item>
            <el-form-item label="仓库" prop="repertoryId">
                <el-select size="small" v-model="form.repertoryId">
                    <el-option :value="0" label="三墩"></el-option>
                    <el-option :value="1" label="临平"></el-option>
                    <el-option :value="2" label="上海DSI"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input size="small" v-model="form.remark"></el-input>
            </el-form-item>
            <div style="text-align: center">
                <el-button type="success" size="small" @click="submit">确定</el-button>
                <el-button  style="margin-left: 10px;" size="small" @click="closeDialog">取消</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>
    import Vue from "vue"
    Vue.component('my-item-part', {
        functional: true,
        render: function (h, ctx) {
            var item = ctx.props.item;
            let specification = item.specification?item.specification:''
            let unit = item.unit?item.unit:''
            let mashineType = item.mashineType?item.mashineType:''
            return h('li', ctx.data, [
                h('div', { attrs: { class: 'name',title:item.name+'/'+specification+'/'+unit+'/'+mashineType } }, [item.name+'/'+specification+'/'+unit+'/'+mashineType]),
            ]);
        },
        props: {
            item: { type: Object, required: true }
        }
    });
    export default{
        name: 'NewParts',
        props:{
            value:{
                type:Boolean,
                default:false
            },
            list:{
                type:Object,
                default(){
                    return {
                        customerMaterialsId:'',
                        specification:'',
                        partsName:'',
                        unit:'',
                        orderCount:'',
                        singlePrice:'',
                        discount:100,
                        discountAmount:'',
                        repertoryId:0,
                        mashineType:'',
                        remark:''
                    }
                }
            },
            name:{
                type:String,
                default:""
            }
        },
        data(){
            //校验整数
            var validatePassInt = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入数量'));
                }
                if (!Number.isInteger(value)) {
                    return callback(new Error('请输入整数'));
                }else{
                    callback()
                }
            };

            //校验数字
            var validatePassNum = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入单价'));
                }
                if (!/^([1-9]\d*\.\d+|0\.\d+|[1-9]\d*)$/.test(value)) {
                    return callback(new Error('请输入正数'));
                }else{
                    callback()
                }
            };

            //校验数字
            var validatePassDis = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入折扣'));
                }
                if (!/^([1-9]\d*\.\d+|0\.\d+|[1-9]\d*)$/.test(value)) {
                    return callback(new Error('请输入正数'));
                }else{
                    if(value>100){
                        return callback(new Error('折扣不能大于100'));
                    }
                    callback()
                }
            };
            return{
                show:this.value,
                form:JSON.parse(JSON.stringify(this.list)),
                rules:{
                    partsName: [
                        { required: true, message: '请输入配件名称', trigger: 'blur' }
                    ],
                    specification: [
                        { required: true, message: '请输入型号', trigger: 'blur' }
                    ],
                    unit: [
                        { required: true, message: '请输入单位', trigger: 'blur' }
                    ],
                    orderCount: [
                        { required: true, validator:validatePassInt, trigger: 'blur' }
                    ],
                    singlePrice: [
                        { required: true, trigger: 'blur' , validator:validatePassNum }
                    ],
                    discount: [
                        { required: true, trigger: 'blur' , validator:validatePassDis }
                    ],
                    mashineType: [
                        { required: true, message: '请输入机型', trigger: 'blur' }
                    ],
                },
            }
        },
        methods:{
            closeDialog(){
//                this.$refs['form'].resetFields();
                this.form=JSON.parse(JSON.stringify(this.list))
                this.show = false
                this.$emit('input', this.show)
            },
            submit(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let form = Object.assign({},this.form);
                        if(this.isAdd){
                        this.$emit("add",form)
                        }else{
                            this.$emit("edit",form)
                        }
                        this.closeDialog()
                    }
                });
            },
            querySearch(queryString, cb) {
                let param = {custName:this.name,partName:queryString}
                this.$http.post("/asm/queryTypes",param)
                    .then((response)=> {
                        if(response.data.state == '200'){
                            let results = response.data.data.queryTypes
                            // 调用 callback 返回建议列表的数据
                            cb(results);
                        }
                    })
            },
            handleSelect(item) {
                    this.form.partsName=item.name
                this.form.specification = item.specification
                this.form.unit = item.unit
                this.form.mashineType = item.mashineType
            },
            amount(){
                let singlePrice =Number( this.form.singlePrice);
                let discount = Number( this.form.discount)
                let orderCount = Number( this.form.orderCount)
                let n =  Number(singlePrice*discount*orderCount/100).toFixed(2);
                this.form.discountAmount = n
            }
        },
        computed:{
          isAdd(){
              return this.list.partsName == "" || this.list.partsName ===undefined
          }
        },
        watch:{
            'value'(n){
                this.show=n
            },
            'list'(n){
                this.form=JSON.parse(JSON.stringify(this.list))
            },
            "form.discount"(){
                this.amount()
            },
            "form.singlePrice"(){
                this.amount()
            },
            "form.orderCount"(){
                this.amount()
            }
        }
    }
</script>
<style>
</style>
