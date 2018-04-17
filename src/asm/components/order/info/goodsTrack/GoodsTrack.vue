/**
* Created by chenhuanlu on 2017/10/21.
*/

<template>
  <div class="new-container table-small-padding big-table">
    <el-form v-if="selectOptions.length>0" ref="form" :model="form" label-width="80px">
      <AuthWraper role="售后服务文员">
      <el-form-item label="领料单号">
        <el-select clearable v-model="form.region" placeholder="请选择">
          <div v-if="selectOptions.length>0" v-for="item in selectOptions">
            <el-option :label="item.text" :value="item.value"></el-option>
          </div>
        </el-select>
      </el-form-item>
      </AuthWraper>

      <div v-if="detailShow">
        <el-form-item label="请选择发货日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"  style="width: 60%"></el-date-picker>
          </el-col>
        </el-form-item>
        <!--多选-->
        <div style="border: solid; border-width: 0.2px;border-color: lightgray" v-if="form.region=='all'" v-for="model in allList">
          <div style="text-align: center;font-size: 14px;margin: 10px 0">领料单号：{{model.barCode}}</div>
          <el-table :data="model.listProduct" border>
            <el-table-column show-overflow-tooltip type="index" label="序号" min-width="40" align="center"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="customerMaterialsId" label="客户物料号" min-width="70"  align="center" > </el-table-column>
            <el-table-column show-overflow-tooltip prop="productName" label="配件名称"  min-width="40" align="center"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="mashineType" label="机型"  min-width="40" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="repertoryName" label="仓库名称" min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip prop="unit" label="单位" min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip prop="orderCount" label="购买数量 " min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip  label="已发数量 " min-width="40">
              <span slot-scope="scope">{{scope.row.deliverAmount + scope.row.realDeliver}}</span>
            </el-table-column>
            <el-table-column show-overflow-tooltip  label="发货数量 " min-width="40">
              <template slot-scope="scope" >
                <el-input  v-model.number="scope.row.requisitionAmount"  :disabled="scope.row.requisitionAmount===0" ></el-input>
              </template>
            </el-table-column>

            <!--<td style="display:none;"><input type="text" class="amount"  name="amount" value="${item.requisitionAmount+item.deliverAmount}" /></td>-->
            <!--<td style="display:none;"><input type="text" class="realDeliver"  name="requisitionAmount" value="${item.realDeliver}" /></td>-->
            <!--<td style="display:none;"><input type="text" class="deliveryMember"  name="deliveryMember" value="pj1234" /></td>-->
          </el-table>
        </div>
        <!--单选-->
          <el-table @current-change="handleCurrentChange" v-if="form.region!='all'" :data="list" border>
            <el-table-column show-overflow-tooltip type="index" label="序号" width="65px" align="center"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="customerMaterialsId" label="客户物料号" width="110px"  align="center" > </el-table-column>
            <el-table-column show-overflow-tooltip prop="productName" label="配件名称"  width="100px" align="center"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="mashineType" label="机型"  align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="repertoryName" label="仓库名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="unit" label="单位"></el-table-column>
            <el-table-column show-overflow-tooltip prop="orderCount" label="购买数量 "></el-table-column>
            <el-table-column show-overflow-tooltip prop="deliverAmount" label="已发数量 " min-width="40">
              <span slot-scope="scope">{{scope.row.deliverAmount + scope.row.realDeliver}}</span>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="发货数量 ">
              <template slot-scope="scope" >
                <el-input  v-model.number="scope.row.requisitionAmount"  :disabled="scope.row.requisitionAmount===0" ></el-input>
              </template>
            </el-table-column>
            <!--<el-table-column v-if="false" prop="realDeliver" label="实发数量 "></el-table-column>-->
            <!--<el-table-column v-if="false" label="已发数量 ">-->
              <!--<span slot-scope="scope">{{scope.row.requisitionAmount+scope.row.deliverAmount}}</span>-->
            <!--</el-table-column>-->
          </el-table>
        <br/>
        <photo-upload v-model="form.photoFileNameList"></photo-upload>

        <br/>
        <el-row type="flex" class="row-bg" justify="end">
          <el-button @click="add">添加记录</el-button>
        </el-row>
        <br/>
        <el-table v-if="form.addRecordList.length>0" :data="form.addRecordList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="65px" align="center"></el-table-column>
          <el-table-column  label="快递单号" min-width="120px"  align="center" >
            <template slot-scope="scope">
              <el-input v-if="scope.row.companyName!='客户自提'&&scope.row.companyName!='人员带走'" v-model="scope.row.deliveryNo"  placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="orderNumber" label="订单号"  min-width="120px" align="center"> </el-table-column>
          <el-table-column prop="companyName" label="快递公司"  align="center"></el-table-column>
          <el-table-column  label="包裹数">
            <template slot-scope="scope">
              <el-input v-model="scope.row.deliveryCount"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="deliveryDate" label="发货日期"></el-table-column>
          <el-table-column  label="操作 ">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row,scope.$index)" type="button" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br/>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="6">
            <el-button type="primary" style="width: 200px" @click="onSubmit">提交</el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <br/>
    <el-card v-if="recordTableData.length<1" class="box-card"  style=" background: #F9FAFC; color:#ccc; text-align: center;line-height: 120px;margin-bottom: 20px">暂无发货记录</el-card>


    <div v-if="userType=='1'">
    <div v-if="expressTableData.length>0" v-for="(item,index) in expressTableData">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <i class="el-icon-setting" style="font-size: 14px;">
            第{{index+1}}次发货</i>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button @click="showDetail(item,index)">查看明细</el-button>
            <el-select placeholder="发货员(查询所有)" @change="refresh(item)" clearable v-model="item.deliveryMember"><el-option :key="i" v-for="i in getDeliver(item.logisticDtos)" :label="i" :value="i"></el-option></el-select>
            <AuthWraper  role="售后服务主管"><el-button  @click="DelDetail(item,index)">删除</el-button></AuthWraper>
          </el-row>
        </el-col>
      </el-row>
      <br/>
      <el-table  :row-key="getRowKeys"
                 @expand="expand"
                 :expand-row-keys="expands"
                 :data="item.logisticDtos"
                 border>
        <el-table-column type="index" label="序号" width="65px" align="center"> </el-table-column>
        <el-table-column prop="deliveryNo" label="快递单号" min-width="120px"  align="center" > </el-table-column>
        <el-table-column prop="orderNo" label="订单号"  min-width="120px" align="center"> </el-table-column>
        <el-table-column prop="company" label="快递公司"  align="center"></el-table-column>
        <el-table-column prop="deliveryCount" label="包裹数"></el-table-column>
        <el-table-column prop="deliveryDate" label="发货日期" min-width="120px"></el-table-column>
        <el-table-column prop="deliveryMember" label="发货员 " width="80px"></el-table-column>
      </el-table>
      <el-card v-if="expands.indexOf(item.requestId)>-1">
        <div slot="header">
          <el-row type="flex" class="row-bg" justify="center">
            <div style="text-align: center">照片凭证</div>
            <upload-file v-if="item.imgStr" :fileslink="item.imgStr"></upload-file>
          </el-row>
        </div>
        <div>
          <el-table :data="item.expressTableDetail" border>
            <el-table-column show-overflow-tooltip type="index" label="序号" min-width="40" align="center"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="customerMaterialsId" label="客户物料号" min-width="80"   align="center" > </el-table-column>
            <el-table-column show-overflow-tooltip prop="partsName" label="配件名称" min-width="70"   align="center"> </el-table-column>
            <el-table-column show-overflow-tooltip prop="specification" label="型号" min-width="70"  align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="unit" label="单位" min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip prop="orderCount" label="数量" min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip prop="singlePrice" label="单价" min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip prop="discount" label="折扣(%)" min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip prop="discountAmount" label="金额" min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip prop="mashineType" label="机型" min-width="40"></el-table-column>
            <el-table-column show-overflow-tooltip  label="仓库" min-width="40">
              <span slot-scope="scope">{{repertoryNameList[scope.row.repertoryId]}}</span>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="deliver" label="实发数" min-width="70" ></el-table-column>
            <el-table-column show-overflow-tooltip prop="deliveryBalance" label="未发数" min-width="70"></el-table-column>
            <el-table-column show-overflow-tooltip prop="thisTimeDeliver" label="本次发货数" min-width="70">
              <span slot-scope="scope">{{scope.row.orderCount - scope.row.deliveryBalance}}</span>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="remark" label="备注" min-width="40"></el-table-column>
          </el-table>
        </div>
      </el-card>
      <br/>
    </div>

    </div>
    <div>


    </div>

  </div>


</template>

<script>
  import UploadFile from "../../../common/UploadFile";
  import PhotoUpload from "../../../common/PhotoUpload";


  export default{
    name: 'goodsTrack',
    mounted(){
      this.orderId = this.$route.params.id;//30951
      //this.orderId = '30777'
      this.getGoodsTrackRecord();//发货跟踪-记录
      this.getExpressData();//获取面单和已领料单
      console.log(this.selectOptions)
    },
    data(){
        return{
          expands: [], // 要展开的行，数值的元素是row的key值
          orderId:'',
          materialId:'',
          imagesArr:[],
          selectOptions:[],
          recordTableData:[],
          expressTableData:[],
          expressTableDetail:[],
          selectExpressCompony:'',
          selectExpressId:'',
          companyList:[],
          allList:[],
          inputDeliveryNo:'',
          form:{
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            photoFileNameList:[],
            addRecordList:[]
          },
          userType: '1',
          detailShow: false,
          fileList: [],
          detailList:[],
          list:[],
        }
    },
    methods:{
      //附件上传
      handleRemove(file, fileList) {
        this.changepath(fileList);
      },
      handlePreview(file) {
        let acceptSufstr = "jpeg|doc|docx|rar|xls|xlsx|jpg|png|pdf";
        let maxsize = 1024*10*1024;
        let suffix = file.name.substr(file.name.lastIndexOf(".")+1);
        let size = file.size
        if(acceptSufstr.indexOf(suffix)==-1||size>maxsize){
          this.$message({
            type:"error",
            message:"上传文件格式不支持或文件过大"
          });
          this.$refs.upload.uploadFiles.pop();
          console.log(this.$refs.upload);
          return false;
        }
      },
      handleUploadSuccess(response,file,fileList){
        this.changepath(fileList);
      },
      // 获取row的key值
      getRowKeys(row){
        return row.orderId
      },
      expand(row, expanded){
        let index = this.expressTableData.indexOf(row)
        getInfoList(row,index,()=>{
          if(this.expands.indexOf(item.requestId)>-1){
              this.expands.splice(this.expands.indexOf(item.requestId),1);
            }else {
              this.expands.push(item.requestId);
            }
        });
        },
      changepath(flist){
        let pathstr = "";
        flist.forEach(function(fileobj){
          pathstr = pathstr+fileobj.response.url+",";
        });
        pathstr.substring(0,pathstr.length-1);
        this.form.attachPath=pathstr;
      },
      handleCurrentChange(val) {
      },
      onSubmit() {//提交
        console.log(this.form.addRecordList)
        if(this.form.addRecordList.length === 0){
          this.$message({
            message: '请点击添加记录并填写快递信息！',
            type: 'warning'
          });
          return;
        }
        let jsonArr = [];
        let addRecordList = this.form.addRecordList;
        let  deliverys =  [];
        if (this.form.region === 'all') {
          let self = this;
          for (let i = 0; i < this.allList.length; i++) {
            this.allList[i].listProduct.forEach(function (item) {
              if (item.requisitionAmount > 0) {
                item.materialId = self.allList[i].materialId;
                deliverys.push(item);
              }
            });
          }
        } else {
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].requisitionAmount > 0) {
              deliverys.push(this.list[i]);
            }
          }
        }
        let deliver = [];
        let requestId = this.formateDate(this.form.date1);
        let materialId = this.materialId;
        for(let i =0;i<addRecordList.length;i++){
          let data = {
            "deliveryNo": addRecordList[i].deliveryNo,
            "expressId":addRecordList[i].expressId,
            "deliveryCount":addRecordList[i].deliveryCount ,
            "deliveryDate": addRecordList[i].deliveryDate + " 00:00:00",
            "deliveryMember": this.deliveryMember
          }
          console.log(addRecordList)
          if(this.selectExpressCompony=='客户自提'||this.selectExpressCompony=='人员带走'){
              if(!addRecordList[i].deliveryCount){
                this.$message({
                  message: '请点击添加记录并填写快递信息！',
                  type: 'warning'
                });
                return;
              }
          }else {
              if(!addRecordList[i].deliveryNo||!addRecordList[i].deliveryCount){
                this.$message({
                  message: '请点击添加记录并填写快递信息！',
                  type: 'warning'
                });
                return;
              }
          }
          if(isNaN(addRecordList[i].deliveryCount)){
            this.$message({
              message: '包裹数必须为数字！',
              type: 'warning'
            });
              return;
          }
          jsonArr.push(data)
        }
        for(let i =0;i<deliverys.length;i++){
          let data = {
            "materialId": this.form.region==='all'?deliverys[i].materialId:materialId,
            "detailId": deliverys[i].detailId,
            "serialId": deliverys[i].serialId,
            "deliverAmount": deliverys[i].requisitionAmount,
            "amount": Number(deliverys[i].requisitionAmount)+Number(deliverys[i].deliverAmount),
            "requisitionAmount": deliverys[i].realDeliver
          }
          deliver.push(data);
        }
        if (deliver.length <=0) {
          this.$message({
            message: '请输入发货数量！',
            type: 'warning'
          });
          return;
        }
        let deliverStr = JSON.stringify(deliver);
        let imgArr = [];

        if(this.form.photoFileNameList.length>0){
          for (let i = 0; i < this.form.photoFileNameList.length; i++) {
            let obj = {};
            obj.photoFileNameList = this.form.photoFileNameList[i];
            imgArr.push(obj)
          }
        }

        let imgData = JSON.stringify(imgArr);
        let Data =JSON.stringify(jsonArr);
        let data1 = {
          "param": deliverStr,
          "imgParam":imgData,
          "orderId": this.orderId,
          "datas": Data,
          "requestId": requestId
        }
        this.$http.post("/goodsTrack/materialDetailInfo", data1)
          .then((response) => {
            let res = response.data;
            let self = this;
            if(res.status==='200'){
              if(res.data.result==="success"){
                this.getExpressData();
                this.getGoodsTrackRecord();
                this.$store.commit('SET_RELOAD_LEFTLIST');
                this.detailShow = false;
                this.form.region='';
                this.form.photoFileNameList = [];
                this.form.addRecordList = [];
               // self.$refs['form'].resetFields();
                this.$message({
                  message: '信息提交成功',
                  type: 'success'
                });
              }else {
                this.$message({
                  message: '信息提交失败',
                  type: 'warning'
                });
              }
            }else {
                if(res.message){
                  this.$message.error(res.message);
                }

            }

          })
          .catch((error) => {
            console.log(error);
          });


      },
      /*发货录入删除*/
      DelDetail(item){
        this.$confirm('你确定需要删除该条发货记录吗？', '温馨提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("/goodsTrack/deleteDelivery", {orderId: this.orderId, requestId: item.requestId})
            .then((response) => {
              let res = response.data;
              console.log(res);
              if (res.data.result == 'success') {
                this.getExpressData();
                this.getGoodsTrackRecord();
                this.$store.commit('SET_RELOAD_LEFTLIST');
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '删除失败',
                  type: 'warning'
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '暂不取消'
          });
        });

      },
      add(){//添加记录
        let self = this;
        this.$http.post("/goodsTrack/queryExpress", {param:this.orderId})
          .then((response) => {
            let res = response.data.data;
            if(res){
              if(typeof(self.selectExpressCompony) === "undefined"||res.express === 1){
                this.$message({
                  showClose: true,
                  message: '请填写快递信息或添加快递面单！',
                  type: 'warning'
                });
                return;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
        let addRecord = {
          expressId:this.selectExpressId,
          deliveryCount:'',
          deliveryNo:'',
          orderNumber:this.orderDetail.orderNo,
          companyName:this.selectExpressCompony,
          deliveryDate:this.currentDate.substring(0,4)+'-'+self.currentDate.substring(4,6)+'-'+self.currentDate.substring(6,8),
        }
        this.form.addRecordList.push(addRecord);
      },
      getGoodsTrackRecord(){
        this.$http.post("/goodsTrack/query", {orderId:this.orderId})
          .then((response) => {
            let res = response.data;
            this.recordTableData = res.logistic;

          })
          .catch((error) => {
            console.log(error);
          });
      },
      getExpressData(){
        this.selectOptions = [];
        this.$http.post("/goodsTrack/queryExpress", {param:this.orderId})
          .then((response) => {
            let res = response.data.data;
            if(res){
//              $(data.logistic).each(function() {
//                $(this.logisticDtos).each(function() {
//                  this.deliveryDate = this.deliveryDate.split(" ")[0]
//                });
//              });
              this.expressTableData = res.logistic;
              for( let i=0;i<res.materialRequest.length;++i){
                let item = res.materialRequest[i];
                let text="";
                if(item.repertoryId === 0)
                  text=item.sBarCode +" (机型:" + item.mashineType+ "/仓库：三墩)";
                else if(item.repertoryId === 1)
                  text=item.sBarCode +" (机型:" + item.mashineType+ "/仓库：临平)";
                else
                  text=item.sBarCode +" (机型:" + item.mashineType+ "/仓库：上海DSI)";
                this.selectOptions.push({text:text,index:i+1,value:item.sBarCode});
              }
              if(this.selectOptions.length>0){
                this.selectOptions.unshift({text:'全选',index:0,value:'all'});
              }


            }

          })
          .catch((error) => {
            console.log(error);
          });
      },
      getBarCodeInfo(getBarCodeInfo){
          if(getBarCodeInfo==='all'){
            getBarCodeInfo='';
          }
        this.$http.post("/goodsTrack/barCodeInfo", {orderId: this.orderId, barCode: getBarCodeInfo})
          .then((response) => {
            let res = response.data.result;
            let list = response.data.listTemp;
            let temp = response.data.temp;
            if (temp) {
              this.companyList = temp;
              this.selectExpressCompony = temp.expressList[0].company.companyName;
              this.selectExpressId = temp.expressList[0].company.expressId;
            }
            if (list) {
              this.allList = list;
            }
            if (res) {
                this.materialId = res.materialId;
                this.list = res.listProduct;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      handleClick(conent,index){
          console.log(conent);
          this.form.addRecordList.splice(index,1);
      },
      getInfoList(item,index,cb){
        this.$http.post("/goodsTrack/listInfo", {orderId:this.orderId,requestId:item.requestId,deliveryMember:item.deliveryMember})
          .then((response) => {
            let res = response.data;
            console.log(res)
            if (res.result) {
              item.expressTableDetail = res.result;
              item.imgStr = "";
               let imageArr = []
              if (res.images) {
                for (let i = 0; i < res.images.length; i++) {
                  imageArr.push(res.images[i].photo);
                }
                   if (imageArr.length > 1) {
                        item.imgStr = imageArr.join(',');
                    }else{
                      item.imgStr = imageArr[0]
                    }
              }
            }
            cb()
          })
          .catch((error) => {
            console.log(error);
          });

      },
      formateDate:function (date) {
         let datestr = date+'';
        return datestr.substring(0,10).replace(/-/g,'');
      },
      showDetail(item,index){//查看明细
        this.getInfoList(item,index,()=>{
          if(this.expands.indexOf(item.requestId)>-1){
              this.expands.splice(this.expands.indexOf(item.requestId),1);
            }else {
              this.expands.push(item.requestId);
            }
        });

      },
      getDeliver(list){
        let array = []
        if(list&&list.length>0){
        list.map((e)=>{
          if(array.indexOf(e.deliveryMember)==-1){
            array.push(e.deliveryMember)
          }
        })
        }
        return array;
      },
      refresh(item){
        if(this.expands.indexOf(item.requestId)>-1){
              this.expands.splice(this.expands.indexOf(item.requestId),1);
            }
      }
    },
    watch:{
      "form.region":function (navl) {
            if(navl){
              this.form.date1 = new Date().toString();
              this.detailShow = true;
              this.getBarCodeInfo(navl);
            }
      },
      "form.date1": function (navl) {
        if (navl) {
          if(this.form.addRecordList.length>0){
            for (let i = 0; i < this.form.addRecordList.length; i++) {
              this.form.addRecordList[i].deliveryDate = this.form.date1.toString().substring(0,10);
            }
          }
        }
      },
      "form.addRecordList":function (nval) {
          if(nval){
            for (let i = 0; i < this.form.addRecordList.length; i++) {
              this.form.addRecordList[i].deliveryDate = this.form.date1.toString().substring(0,10);
            }
          }
      }





    },
    components:{
      UploadFile,
      PhotoUpload,

    },

    computed: {
      isReloadLeftList(){
        return this.$store.state.isReloadLeftList
      },
      deliveryMember: function () {
        return this.$store.state.moduleOrder.orderBaseInfo.realName;
      },
      orderDetail(){
        return  this.$store.state.moduleOrder.orderDetailData.orderDetail
      },
      currentDate: function () {
        return new Date().toString().substring(0, 10).replace(/-/g, '');
      },
      "detail": function () {
        return "/order/detail/" + this.id + "/info";
      },
      "del": function () {
        return "/order/detail/" + this.id + "/info";
      },
      /**
       * 仓库列表
       */
      repertoryNameList: function () {
        return this.$store.state.moduleOrder.enumsList.repertoryNames;
      }
    },

    }
</script>

<style >
  .el-dialog--large .el-dialog--small {
     width: 80% !important;
  }
</style>
