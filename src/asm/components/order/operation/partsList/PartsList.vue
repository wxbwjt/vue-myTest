/**
* 配件列表
*/
<template>
    <div class="parts-box" id="partList">
        <el-card>
            <div slot="header"  class="search-head"><span><i class="el-icon-setting"></i>配件详情列表</span>
                <div style="float: right;margin-top: -5px;" v-show="route=='oedit'&&status!=1&&status!=4" v-role:售后服务主管>
                    <el-button-group>
                        <el-button @click="" type="success" size="small" @click="canImport=true">导入Excel</el-button>
                        <el-button type="primary" size="small" @click="newPart(true)">新增配件</el-button>
                    </el-button-group>
                </div>
                <div style="float: right;margin-top: -5px;" v-show="!(route=='oedit'&&status!=1&&status!=4)">
                    <el-button-group>
                        <el-button @click="" type="success" size="small" @click="canImport=true">导入Excel</el-button>
                        <el-button type="primary" size="small" @click="newPart(true)">新增配件</el-button>
                    </el-button-group>
                </div>
            </div>
            <el-form :model="form" ref="form">
            <el-table border :data="form.partsList">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="客户物料号" prop="customerMaterialsId" :show-overflow-tooltip="true" width="80">
                   <template slot-scope="scope">
                       <el-form-item  :prop="'partsList.'+scope.$index+'.customerMaterialsId'"  :rules="[{max:20,message:'最多输入20个字',trigger:'blur'}]"  v-if="scope.$index==cIndex">
                       <el-input  size="small" v-model="scope.row.customerMaterialsId" ></el-input>
                       </el-form-item>
                       <span v-else>{{scope.row.customerMaterialsId}}</span>
                   </template>
                </el-table-column>
                <el-table-column label="配件名称"  prop="partsName" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'partsList.'+scope.$index+'.partsName'" :rules="[ { required: true, message: '请输入', trigger: 'blur' },{max:100,message:'最多输入100个字',trigger:'blur'}]"  v-if="scope.$index==cIndex">
                            <el-tooltip :content="scope.row.partsName" :manual="true"  placement="top-start" effect="light" :value="showPart">
                            <el-autocomplete
                                popperClass="my-popperClass"
                                size="small"
                                style="width: 100%"
                                v-model="scope.row.partsName"
                                :fetch-suggestions="querySearch"
                                :trigger-on-focus="false"
                                custom-item="my-item-part"
                                @select="handleSelect"
                                ref="partName"
                                id="partName"
                        ></el-autocomplete>
                            </el-tooltip>
                        </el-form-item>
                        <span v-else>{{scope.row.partsName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="型号" min-width="50" prop="specification" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'partsList.'+scope.$index+'.specification'" :rules="[ { required: true, message: '请输入型号', trigger: 'blur' },{max:100,message:'最多输入100个字',trigger:'blur'}]"  v-if="scope.$index==cIndex">
                            <el-tooltip :content="scope.row.specification" :manual="true"  placement="top-start" effect="light" :value="showSpe">
                            <el-input id="specification"  size="small" v-model="scope.row.specification" @focus="handleFocus" @blur="handleBlur" @change="handleChange"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <span v-else>{{scope.row.specification}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="单位" width="50" prop="unit" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'partsList.'+scope.$index+'.unit'" :rules="[ { required: true, message: '请输入单位', trigger: 'blur' },{max:20,message:'最多输入20个字',trigger:'blur'}]"  v-if="scope.$index==cIndex">
                        <el-input  size="small" v-model="scope.row.unit"></el-input>
                        </el-form-item>
                        <span v-else>{{scope.row.unit}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="数量" width="50" prop="orderCount" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'partsList.'+scope.$index+'.orderCount'" :rules="[  {  validator:validatePassInt, trigger: 'blur' }]"  v-if="scope.$index==cIndex">
                        <el-input  size="small" v-model.number="scope.row.orderCount" @blur="count"></el-input>
                        </el-form-item>
                        <span v-else>{{scope.row.orderCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="单价" min-width="40" prop="singlePrice" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'partsList.'+scope.$index+'.singlePrice'" :rules="[{  trigger: 'blur' , validator:validatePassNum }]"  v-if="scope.$index==cIndex">
                        <el-input  size="small" v-model.number="scope.row.singlePrice" @blur="count"></el-input>
                        </el-form-item>
                        <span v-else>{{scope.row.singlePrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="折扣(%)" width="60" prop="discount" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'partsList.'+scope.$index+'.discount'" :rules="[{  trigger: 'blur' , validator:validatePassDis }]"  v-if="scope.$index==cIndex">
                        <el-input  size="small" v-model.number="scope.row.discount" @blur="count"></el-input>
                        </el-form-item>
                        <span v-else>{{scope.row.discount}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="金额" min-width="40" prop="discountAmount" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-input  size="small" readonly v-model="scope.row.discountAmount" v-if="scope.$index==cIndex"></el-input>
                        <span v-else>{{scope.row.discountAmount}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="机型" width="80" prop="mashineType" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'partsList.'+scope.$index+'.mashineType'" :rules="[{ required: true, message: '请输入机型', trigger: 'blur' },{max:50,message:'最多输入50个字',trigger:'blur'}]"  v-if="scope.$index==cIndex">
                        <el-input  size="small" v-model="scope.row.mashineType"></el-input>
                        </el-form-item>
                        <span v-else>{{scope.row.mashineType}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="仓库" width="80" prop="repertoryId">
                    <template slot-scope="scope">
                        <el-select  v-model="scope.row.repertoryId" @change="currentRChange"  size="small" v-if="scope.$index==cIndex">
                            <el-option :value="0" label="三墩"></el-option>
                            <el-option :value="1" label="临平"></el-option>
                            <el-option :value="2" label="上海DSI"></el-option>
                        </el-select>
                            <span v-else>{{storeList[scope.row.repertoryId]}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="备注"min-width="60" prop="remark" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-form-item  :prop="'partsList.'+scope.$index+'.remark'" :rules="[{max:100,message:'最多输入100个字',trigger:'blur'}]"  v-if="scope.$index==cIndex">
                        <el-input  size="small" v-model="scope.row.remark"></el-input>
                        </el-form-item>
                        <span v-else>{{scope.row.remark}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="60">
                    <template slot-scope="scope">
                        <el-button v-if="scope.$index==cIndex" size="small" @click="confirm">确认</el-button>
                        <el-button-group v-else>
                            <AuthWraper  role="售后服务主管"><el-button type="primary" icon="edit" size="mini" @click="partEdit(scope.row,scope.$index)" :disabled="(scope.$index!=cIndex&&cIndex!=-1&&nod)"></el-button>
                           <el-button type="danger" icon="delete" size="mini" @click="deletePart(scope.$index)"></el-button></AuthWraper>
                            <AuthWraper  norole="售后服务主管"><el-button type="primary" icon="edit" size="mini" :disabled="(route=='oedit'&&status!=1&&status!=4)||(scope.$index!=cIndex&&cIndex!=-1&&nod)"  @click="partEdit(scope.row,scope.$index)"></el-button>
                                <el-button type="danger" icon="delete" size="mini" :disabled="route=='oedit'&&status!=1&&status!=4" @click="deletePart(scope.$index)"></el-button></AuthWraper>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
            </el-form>
            <div class="parts-box_footer">
                <el-row>
                    <el-col :span="10">
                        <span>配件金额总计：</span><span>{{Number(amount).toFixed(2)}}</span>&nbsp;&nbsp;
                        <span>优惠后金额总计：</span><span>{{Number(totalAmount).toFixed(2)}}</span>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="6" v-if="canModify">
                        <span>抹零金额：</span>
                        <el-input style="width: 50%;" size="small" v-model="discountAmount" @blur="comDiscount"></el-input>
                    </el-col>
                    <el-col :span="6" v-else-if="adminModify">
                        <span>抹零金额：</span>
                        <AuthWraper  role="售后服务主管"> <el-input style="width: 50%;" size="small" v-model="discountAmount" @blur="comDiscount"></el-input></AuthWraper>
                        <AuthWraper  norole="售后服务主管">  <el-input style="width: 50%;" size="small" v-model="discountAmount"  readonly></el-input> </AuthWraper>
                    </el-col>
                    <el-col :span="6" v-else>
                        <span>抹零金额：</span>
                        <el-input style="width: 50%;" size="small" v-model="discountAmount"  readonly></el-input>
                    </el-col>
                    <el-col :span="6" v-if="canModify">
                        <span>总体折扣(％)：</span>
                      <el-input style="width: 50%" size="small" v-model="discount" @blur="comAmount"></el-input>
                    </el-col>
                    <el-col :span="6" v-else-if="adminModify">
                        <span>总体折扣(％)：</span>
                        <AuthWraper  role="售后服务主管"><el-input style="width: 50%" size="small" v-model="discount" @blur="comAmount"></el-input></AuthWraper>
                        <AuthWraper  norole="售后服务主管"> <el-input style="width: 50%" size="small"   readonly v-model="discount"></el-input></AuthWraper>
                    </el-col>
                    <el-col :span="6" v-else>
                        <span>总体折扣(％)：</span>
                        <el-input style="width: 50%" size="small" v-model="discount"  readonly></el-input>
                    </el-col>
                </el-row>
                <el-row v-if="showTotal">
                    <el-col :span="24">
                        <span>总价（含税）：</span><span>{{Number(partsdiscountAmountFax).toFixed(2)}}</span>&nbsp;&nbsp;
                        <span>总价（不含税）：</span><span>{{Number(partsdiscountAmountNoFax).toFixed(2)}}</span>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <import-excel v-model="canImport" @getParts="getParts"></import-excel>
    </div>
</template>
<script>
    import ImportExcel from "./ImportExcel";
    import Vue from "vue"
    import NumberUtils from '../../../../NumberUtils'
    //配件名称下拉模板
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
        components: {
            ImportExcel},
        name: 'PartsList',
        props:{
          value:{
              type:Array,
              default(){
                  return []
              }
          },
            name:{
              type:String,
                default:""
            },
            tax:{
                type:Number,
            },
            orderType:{
              type:Number,
            },
            da:{
              type:Number,
                default:0
            },
            dis:{
                type:Number,
                default:0
            },
            am:{
                type:Number,
                default:0
            },
            ta:{
                type:Number,
                default:0
            },
            status:{
              type:Number,
                default:1
            }
        },
        mounted(){
            this.$nextTick(()=>{
                document.getElementById('rightMainBox').focus()
                var _this = this
                document.getElementById('rightMainBox').onkeyup =  function(e){//按键信息对象以函数参数的形式传递进来了，就是那个e
                    var code = e.charCode || e.keyCode;  //取出按键信息中的按键代码(大部分浏览器通过keyCode属性获取按键代码，但少部分浏览器使用的却是charCode)
                    if (code == 13&&_this.cIndex!=-1) {
                        _this.confirm()
                    }
                }
                        let contact = document.getElementById('partList')
                        let input = contact.getElementsByClassName("el-input__inner")[0]
                        input.addEventListener('blur',()=>{
                            this.sycCon()
                        })
            })
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
                if (!value&&value!=0) {
                    return callback(new Error('请输入单价'));
                }
                if (!/^([1-9]\d*\.\d+|0\.\d+|[1-9]\d*|0)$/.test(value)) {
                    return callback(new Error('请输入非负数'));
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
                } else {
                    if (value > 100) {
                        return callback(new Error('折扣不能大于100'));
                    }
                    callback()
                }
            }
            return{
                validatePassInt:validatePassInt,
                validatePassNum:validatePassNum,
                validatePassDis:validatePassDis,
                discountAmount:this.da,//抹零金额
                discount:this.dis,//总体折扣
                form:{
                    partsList:JSON.parse(JSON.stringify(this.value))
                },
                showPartOne:false,//配件名称焦点标识
                showPartTwo:false,//配件名称焦点标识
                showSpeOne:false,//型号焦点标识
                showSpeTwo:false,//型号焦点标识
                canImport:false,
                amount:this.am,
                totalAmount:this.ta,
                cPart:{
                    customerMaterialsId:'',
                    specification:'',
                    partsName:'',
                    unit:'',
                    orderCount:'',
                    singlePrice:'',
                    discount:100,
                    discountAmount:0,
                    repertoryId:0,
                    mashineType:'',
                    remark:''},
                cIndex:-1, //修改行
                nod:true,//新增标识
                currentR:0,//默认仓库
                once:true,//初始新增标识
                daChange:true//金额变化标识
            }
        },
        methods:{
            /*导入配件列表*/
            getParts(val){
              this.form.partsList = val.data.Partslist
                this.$nextTick(function(){
                    this.cIndex=-1 //修改行
                        this.nod=true
                    this.daTool()
                })
            },
            /*删除配件*/
            deletePart(index){
                this.daChange=true
                this.form.partsList.splice(index,1);
                if(this.cIndex!=-1){
                    this.cIndex --
                }
                this.$nextTick(function(){
                    this.daTool()
                })
            },
            /*点击修改*/
            partEdit(val,index){
                if(!this.nod){
                    this.form.partsList.splice(this.form.partsList.length-1,1)
                    this.nod = !this.nod
                }
                this.cPart = val ;
                this.cIndex = index;
                this.daChange=false
            },
            /*点击确认*/
            confirm(){
                this.count()
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.cIndex = -1 ;
                        this.nod=true
                        this.$nextTick(function(){
                            this.daTool()
                            this.newPart(false)
                        })
                    }else{
                        this.$nextTick(()=> {
                         document.getElementById('partList').getElementsByClassName("el-form-item__error")[0].parentNode.getElementsByClassName('el-input__inner')[0].focus()
                        })
                    }
                });
            },
            /*新增配件按钮*/
            newPart(val){
                if(this.cIndex>-1&&((this.nod&&this.cIndex<this.value.length)||(!this.nod&&this.cIndex<this.value.length-1))&&val){
                    this.daTool()
                }
                if(this.nod){
               this.form.partsList.push({
                   customerMaterialsId:'',
                   specification:'',
                   partsName:'',
                   unit:'',
                   orderCount:'',
                   singlePrice:'',
                   discount:100,
                   discountAmount:0,
                   repertoryId:parseInt(this.currentR),
                   mashineType:'',
                   remark:''
               })
                this.cIndex = this.form.partsList.length-1
                }else{
                    this.form.partsList.splice(this.form.partsList.length-1,1)
                    this.cIndex = -1
                }
                this.nod =  !this.nod
            },
            /*配件查询相关*/
            handleSelect(item) {
                this.form.partsList[this.cIndex].partsName=item.name
                this.form.partsList[this.cIndex].specification = item.specification
                this.form.partsList[this.cIndex].unit = item.unit
                this.form.partsList[this.cIndex].mashineType = item.mashineType
            },
            querySearch(queryString, cb) {
                let param = {custName:this.name,partName:queryString}
                this.$http.post("/asm/queryTypes",param)
                    .then((response)=> {
                        if(response.data.state == '200'){
                            let results = response.data.data.queryTypes?response.data.data.queryTypes:[]
                            // 调用 callback 返回建议列表的数据
                            cb(results);
                        }
                    })
            },
            /*型号输入事件*/
            handleFocus(){
                let spe = document.getElementById("specification")
                let input = spe.getElementsByClassName("el-input__inner")[0]
                this.showSpeOne = false
                if(input.scrollWidth>input.clientWidth){
                    this.showSpeOne = true
                }
                this.showSpeTwo=true
            },
            handleBlur(){
                this.showSpeTwo=false
            },
            handleChange(){
                let spe = document.getElementById("specification")
                let input = spe.getElementsByClassName("el-input__inner")[0]
                this.showSpeOne = false
                if(input.scrollWidth>input.clientWidth){
                    this.showSpeOne = true
                }
                },
            /*修改配件折扣触发*/
            count(){
                if(this.cIndex!=-1){
                    let discountAmount = this.form.partsList[this.cIndex].discountAmount
                    let singlePrice =Number( this.form.partsList[this.cIndex].singlePrice);
                    let discount = Number( this.form.partsList[this.cIndex].discount)
                    let orderCount = Number( this.form.partsList[this.cIndex].orderCount)
                    let n =  (NumberUtils.multi(NumberUtils.multi(singlePrice,discount),orderCount)/100).toFixed(2);
                    this.form.partsList[this.cIndex].discountAmount = n
                    if(n != discountAmount){
                        this.daChange=true
                    }
                }
            },
            /*金额计算相关*/
            daTool(){
                //配件金额总计
                if(this.daChange){
                    let amount = 0
                    this.form.partsList.map((item)=>{
                        let price = Number( NumberUtils.multi(Number(item.singlePrice) , Number(item.orderCount)).toFixed(2));
                        amount += price;
                        item.mashineType = item.mashineType.replace(/^\s+|\s+$/g,"");
                    })
                    this.amount = amount.toFixed(2);
                    //优惠后金额总计
                    let totalAmount = 0
                    this.form.partsList.map((item)=>{
                        let discountPrice = Number(item.discountAmount);
                        totalAmount += discountPrice
                    })
                    this.totalAmount = totalAmount.toFixed(2);

                //列表改变时抹零金额计算,抹零金额=总价含税
                if(this.orderType&&this.orderType!=2&&this.orderType!=3&&this.orderType!=7&&this.orderType!=8){
                    this.discountAmount = Number(Number(this.totalAmount) *this.tn / 100).toFixed(2)
                    if(Number(this.discountAmount)==0 || Number( this.amount ) ==0){
                        this.discount = 0
                    }else{
                        this.discount=  Number( ( Number( this.discountAmount ) / Number( this.amount )/this.tn * 10000 ).toFixed(2) )
                    }
                }else{
                    this.discountAmount=0
                    this.discount=0
                }
                }
                this.daChange=true
                this.update()
            },
            /*修改总体折扣触发*/
            comAmount(){
                this.discountAmount = Number((Number( this.amount ) * this.discount *this.tn/10000).toFixed(2))
                this.update()
            },
            /*修改抹零金额触发*/
            comDiscount(){
                //折扣
                if(Number(this.discountAmount)==0 || Number( this.amount ) ==0){
                    this.discount = 0
                }else{
                    this.discount=  Number( ( Number( this.discountAmount ) / Number( this.amount )/this.tn * 10000 ).toFixed(2) )
                }
                this.update()
                //总价含税与不含税计算
//                if(this.tax==1){
//                    this.partsdiscountAmountFax = Number(this.discountAmount).toFixed(2)
//                    this.partsdiscountAmountNoFax = Number(Number(this.discountAmount)/117*100).toFixed(2)
//                }else {
//                    this.partsdiscountAmountFax = Number(Number(this.discountAmount) *117 / 100).toFixed(2)
//                    this.partsdiscountAmountNoFax = Number(this.discountAmount).toFixed(2)
//                }
            },
            /*更新父组件*/
            update(){
                this.$emit('input',this.form.partsList)
                this.$emit("setInfo",
                    'amount',Number(this.amount)//配件金额总计
                )
                this.$emit("setInfo",
                    'totalAmount',Number(this.totalAmount)//优惠后金额总计
                )
                this.$emit("setInfo",
                    'totalMoneyWithTax',this.partsdiscountAmountFax//总价（含税）
                )
                this.$emit("setInfo",
                    'totalMoneyWithoutTax',this.partsdiscountAmountNoFax// 总价（不含税）
                )
                this.$emit("setInfo",
                    'discountAmount',this.discountAmount//抹零金额
                )
                this.$emit("setInfo",
                    'discount',this.discount//总体折扣
                )
            },
            /*仓库变化触发*/
            currentRChange(val){
                this.currentR = val
            }
        },
        computed:{
            tn(){//计算抹零金额时的比例
                if(this.tax==2){
                    return 117
                }else {
                    return 100
                }
            },
            storeList(){return this.$store.state.moduleOrder.enumsList.repertoryNames},
            partsdiscountAmountFax(){
                    return Number(this.discountAmount).toFixed(2)
            },
            partsdiscountAmountNoFax(){
                    return Number(Number(this.discountAmount)/117*100).toFixed(2)
            },
            canModify(){
                return this.$route.name == 'oadd' || (this.$route.name == 'oedit'&&this.status ==1)
            },
            adminModify(){
                return this.$route.name == 'oadd' || (this.$route.name == 'oedit'&&this.status !=1)
            },
            showTotal(){
               return this.$route.name == 'oadd' || this.$route.name == 'oedit'
            },
            route(){
                return this.$route.name
            },
            redaTool(){
               return this.$store.state.moduleOrder.daTool
            },
            /*显示气泡*/
            showPart(){
                return this.showPartOne&&this.showPartTwo
            },
            showSpe(){
                return this.showSpeOne&&this.showSpeTwo
            }
        },
        watch:{
            'value'(n,o){
                this.form.partsList=JSON.parse(JSON.stringify(this.value))
               if(this.once){
                if(!n||n.length<1){
                    this.newPart(false)
                    }
                    this.once = false
                }
            },
            'cIndex'(n,o){
                if(this.cIndex!=-1){
                    //配件输入框绑定事件
                this.$nextTick(()=>{
                    let auto = document.getElementById('partList').getElementsByClassName('el-autocomplete')[0]
                    let input = auto.getElementsByClassName("el-input__inner")[0]
                    input.addEventListener('blur',()=>{
                        this.$refs['partName'].close()
                        this.showPartTwo = false//失去焦点关闭气泡与回显数据
                    })
                    input.addEventListener('focus',()=>{
                        this.showPartTwo = true//焦点事件允许气泡
                        this.showPartOne= false
                        if(input.scrollWidth>input.clientWidth)
                            this.showPartOne= true
                    })
                    input.addEventListener('input',()=>{
                        this.showPartOne= false
                        if(input.scrollWidth>input.clientWidth)
                            this.showPartOne= true
                    })
                })
                }
                // if(o>-1&&o<this.value.length&&this.daChange){
                //      this.$nextTick(function(){
                //     this.daTool()
                // })
                // }
            },
            'amount'(n,o){

            },
            'totalAmount'(n,o){

            },
            'partsdiscountAmountFax'(n,o){
            },
            'partsdiscountAmountNoFax'(n,o){

            },
            'discountAmount'(n,o){

            },
            'discount'(n,o){

            },
            'da'(){
                this.discountAmount = this.da
            },
            'dis'(){
                this.discount = this.dis
            },
            'am'(){
                this.amount = this.am
            },
            'ta'(){
                this.totalAmount = this.ta
            },
            'redaTool'(){
                this.daTool()
            },
            '$route'(){
                 this.cIndex=-1; //修改行
                this.nod=true;//新增标识
                this.currentR=0;//默认仓库
            }
        }
    }
</script>
<style>
    .el-table .el-form-item{
        margin-bottom:0!important;
    }
</style>