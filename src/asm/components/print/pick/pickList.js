/**
 * Created by wjt on 2017/11/14.
 */
export default {
    methods:{
        printPickListProcess(_this,data,cb){
        let sdata = JSON.parse(JSON.stringify(data))
        let chosenDatas = [];

        for( var i=0; i<_this.length; i++ ){

            var detailobj = {};
            detailobj['id'] = _this[i].id;
            for(var k = 0; k < sdata.length; k++) {
                var ai = sdata[k];
                if(ai.id==detailobj['id']){
                    ai.realDeliver=ai.requisition;
                    ai.reqCount=ai.unRequisition;//detailobj['amount'];
                    chosenDatas.push(ai);
                    break;
                }
            }
        }

        var sGChosenDatas = this.doGroupPickList(chosenDatas);
        if(sGChosenDatas.length==0){
            return;
        }

        this.doPrintPickList(sGChosenDatas,'direct',cb);
    },
        printMaterialHandle(code,callback){
            let chosenDatas = [];
            this.$http.post("/materil/deliverDetailUi", {barCode: code})
                .then((response) => {
                    if (response.data.status == 200) {
                        let dto = response.data.deliverInfo
                        for (var i = 0; i < dto.listProduct.length; i++) {
                            var detail = dto.listProduct[i];
                            var ai = detail;
                            if (typeof(ai.id) === "undefined")
                                ai.id = ai.detailId;
                            ai.requisition = detail.realDeliver;
                            ai.unRequisition = detail.requisitionAmount;
                            ai.partsName = detail.productName;
                            chosenDatas.push(ai);
                        }
                        var sChosenDatas = this.doGroupPickList(chosenDatas);
                        for (var j = 0; j < sChosenDatas.length; j++) {
                            var dj = sChosenDatas[j];
                            dj['barCode'] = dto.barCode;
                            dj['materialId'] = dto.materialId;
                        }
                        this.doPrintPickList(sChosenDatas, 'repeat',callback);
                    }
                })
                .catch((error) => {
                    this.$message({
                        'type': 'error',
                        message: "请求失败，,请重试或联系管理",
                        'showClose': true
                    });
                });
        },
        doPrintPickList(data,action,cb) {
            //var data = event.data.data;
            var detailList = JSON.parse(JSON.stringify(this.$store.state.moduleOrder.orderDetailList));
            let sdata = JSON.parse(JSON.stringify(data))

            var storeId = null;//$(event.target).data("id");
            //storeId存在，则分类，不存在就统一打印
            if ( storeId ) {
                //将不同仓库的分类
                for( var k=sdata.length-1; k>=0; k-- ) {
                    for( var p=sdata[k].data.length-1; p>=0; p-- ) {
                        if( sdata[k].data[p].repertoryId != storeId-1 ) {
                            sdata[k].data.splice(p,1);
                        }
                    }
                    if ( sdata[k].data.length == 0 ) {
                        sdata.splice(k,1);
                    }
                }
                var num = 0;
                for ( var r=0; r<sdata.length; r++ ) {
                    for( var c=0; c<sdata[r].data.length; c++ ) {
                        sdata[r].data[c].current = num++;
                    }
                }
            } else {
                var odata = [];
                //统一打印，同一机型仍然需要按仓库分类
                //判断有多少厂�?
                var details = JSON.parse(JSON.stringify(this.$store.state.moduleOrder.orderDetailList));
                var stores = [details[0].repertoryId];
                for( var i=1; i<details.length; i++ ){
                    var flag = true;
                    for( var j=0; j<stores.length; j++) {
                        if( details[i].repertoryId == stores[j] ) {
                            flag = false;
                        }
                    }
                    if ( flag ) {
                        stores.push( details[i].repertoryId );
                    }
                }
                for( var k=0; k<sdata.length; k++ ){
                    for( var p=sdata[k].data.length-1; p>=0; p-- ) {

                        var flag = true;
                        for( var j=0; j<stores.length; j++) {
                            if( sdata[k].data[p].repertoryId == stores[j] )
                                flag = false;
                        }
                        if ( flag )
                            stores.push( details[i].repertoryId );
                    }
                }


                for( var i=0; i<stores.length; i++) {
                    var pdata = JSON.parse(JSON.stringify(data));
                    //清空sdata，方便后续覆�?
                    sdata = [];
                    for( var k=pdata.length-1; k>=0; k-- ) {
                        for( var p=pdata[k].data.length-1; p>=0; p-- ) {
                            if( pdata[k].data[p].repertoryId != stores[i] ) {
                                pdata[k].data.splice(p,1);
                            }
                        }
                        if ( pdata[k].data.length == 0 ) {
                            pdata.splice(k,1);
                        }
                    }
                    var num = 0;
                    for ( var r=0; r<pdata.length; r++ ) {
                        for( var c=0; c<pdata[r].data.length; c++ ) {
                            pdata[r].data[c].current = num++;
                        }
                        pdata[r].repertoryId = pdata[r].data[0].repertoryId;
                    }

                    odata = odata.concat(pdata);

                    //覆盖sdata
                    sdata = JSON.parse(JSON.stringify(odata))
                    //保留odata的值进行后续递增和清空处�?
                    odata = JSON.parse(JSON.stringify(sdata))
                    pdata = null;
                }
                //清空
                odata = null;
            }

            if (sdata) {
                var callback = function(obj) {
                    let olist = JSON.parse(obj)
                    if(typeof (sdata[0].barCode)=='undefined'){
                    sdata.map((item,index)=>{
                        item.barCode = olist[index].barCode
                        item.materialId = olist[index].materialId
                    })
                    }
                    var printData = [];
                    for(var j=0;j<sdata.length;j++){
                        var allCols = 0;
                        var supLflag = false;
                        var newArr = [];
                        for( var k=0;k<sdata[j].data.length;k++ ){
                            if( sdata[j].data[k].requisition == 0 ){
                                sdata[j].data[k].requisition = "";
                                sdata[j].data[k].unRequisition = "";
                            }

                            var tempdata = sdata[j].data[k];
                            var newObj = {};
                            var dataCols = 0;
//	          		var custL = tempdata.customerMaterialsId;
                            //取除数，得到已满行的行数
                            var mashineTypeL = Math.ceil(tempdata.mashineType.length/4);
                            var partsNameL = Math.ceil(tempdata.partsName.length/9);
                            var specificationL = Math.ceil(tempdata.specification.length/8);
                            var remarkL = 0;
                            for(let item of detailList){
                                if(item.id == tempdata.id){
                                remarkL = Math.ceil(item.remark.length/4);
                                }
                            }
                            //取行数多的一�?
                            if ( mashineTypeL > partsNameL ) {
                                dataCols = mashineTypeL;
                            } else {
                                dataCols = partsNameL;
                            }
                            if ( dataCols < specificationL  ) {
                                dataCols = specificationL;
                            }
                            if( dataCols < remarkL){
                                dataCols = remarkL;
                            }

                            //当前已经有多少行
                            allCols = allCols + dataCols;
                            //如果出现两条数据�?0行，那我也没辙了！！！！
                            if ( allCols <= 15 && supLflag == false ) {
                                newArr.push(sdata[j].data[k]);
                                if ( k == sdata[j].data.length - 1  ) {
                                    var test = JSON.parse(JSON.stringify(newArr));
                                    newArr = [];
                                    newObj["data"] = test;
                                    newObj["mashineType"] = sdata[j].mashineType;
                                    newObj["barCode"] = sdata[j].barCode;
                                    newObj["materialId"] = sdata[j].materialId;
                                    newObj["repertoryId"] = sdata[j].repertoryId;
                                    printData.push(newObj);
                                }

                            } else if ( allCols <= 15 && supLflag == true ) {
                                //超限截取后，剩下的数�?
                                newArr.push(sdata[j].data[k-1]);
                                newArr.push(sdata[j].data[k]);
                                supLflag = false;
                                if( k == sdata[j].data.length-1 ){
                                    var test = JSON.parse(JSON.stringify(newArr));
                                    newArr = [];
                                    newObj["data"] = test;
                                    newObj["mashineType"] = sdata[j].mashineType;
                                    newObj["barCode"] = sdata[j].barCode;
                                    newObj["materialId"] = sdata[j].materialId;
                                    newObj["repertoryId"] = sdata[j].repertoryId;
                                    printData.push(newObj);
                                    allCols = 0;
                                }

                            } else  if( allCols > 15 && supLflag == false ) {
                                var test = JSON.parse(JSON.stringify(newArr));
                                newArr = [];
                                newObj["data"] = test;
                                newObj["mashineType"] = sdata[j].mashineType;
                                newObj["barCode"] = sdata[j].barCode;
                                newObj["materialId"] = sdata[j].materialId;
                                newObj["repertoryId"] = sdata[j].repertoryId;
                                printData.push(newObj);
                                allCols = dataCols;
                                supLflag = true;
                                if( k == sdata[j].data.length-1 ){
                                    var s = [];
                                    s.push(sdata[j].data[k]);
                                    printData.push({
                                        "data":s,
                                        "mashineType":sdata[j].mashineType,
                                        "barCode":sdata[j].barCode,
                                        "materialId":sdata[j].materialId,
                                        "repertoryId":sdata[j].repertoryId
                                    });
                                    allCols = 0;
                                }
                            }
                            else  if( allCols > 15 && supLflag == true ) {
                                newArr.push(sdata[j].data[k-1]);
                                var test = JSON.parse(JSON.stringify(newArr));
                                newArr = [];
                                newObj["data"] = test;
                                newObj["mashineType"] = sdata[j].mashineType;
                                newObj["barCode"] = sdata[j].barCode;
                                newObj["materialId"] = sdata[j].materialId;
                                newObj["repertoryId"] = sdata[j].repertoryId;
                                printData.push(newObj);
                                allCols = dataCols;
                                supLflag = true;
                                if( k == sdata[j].data.length-1 ){
                                    var s = [];
                                    s.push(sdata[j].data[k]);
                                    printData.push({
                                        "data":s,
                                        "mashineType":sdata[j].mashineType,
                                        "barCode":sdata[j].barCode,
                                        "materialId":sdata[j].materialId,
                                        "repertoryId":sdata[j].repertoryId
                                    });
                                    allCols = 0;
                                }
                            }
                        }
                    }


                    cb(printData);
                }
                if(action==='direct'){
                    var d = JSON.stringify(sdata);
                     this.getMaterialImg(sdata, callback);
                }
                else{
                    var d = JSON.stringify(sdata);
                     callback(d);
                }
            }
        },
        getMaterialImg(data, callback) {
            var d = JSON.stringify(data);
            this.$http.post("/materil/pickImg",{param:d,orderId:this.$route.params.id})
                .then((response) => {
                    if(response.data.state==200){
                        callback(response.data.data.barCode)
                    }
                })
                .catch((error) => {
                    this.$message({
                        'type':'error',
                        message:"请求失败，,请重试或联系管理",
                        'showClose':true
                    });
                });
        },
        doGroupPickList(arr) {
            var map = {},
                dest = [];

            for(var i = 0; i < arr.length; i++) {
                var ai = arr[i];
                ai['current'] = i;
                if(!map[ai.mashineType]){
                    dest.push({
                        mashineType: ai.mashineType,
                        data: [ai]
                    });
                    map[ai.mashineType] = ai;
                }
                else {
                    for(var j = 0; j < dest.length; j++) {
                        var dj = dest[j];
                        if(dj.mashineType == ai.mashineType) {
                            dj.data.push(ai);
                            break;
                        }
                    }
                }
            }
            return dest;
        },
        printPreview(data){
            LODOP.SET_PRINT_PAGESIZE(0,2500,1775,"领料单");
            let newPage = function(item,i,LODOP){
                return new Promise(function(resolve,reject){
                    //图片方式条形码
                    // let oReq = new XMLHttpRequest();
                    // oReq.open("GET", "/ys-web-asm/genbarcode?type=code128&msg="+item.barCode+"&fmt=png&height=8&hrsize=4pt&&mw=0.15mm", true);
                    // oReq.responseType = "arraybuffer";
                    // oReq.send();
                    // oReq.onload = function(oEvent) {
                    //     let blob = new Blob([oReq.response], {type: "image/png"});
                    //     // var url = URL.createObjectURL(blob);
                    //     var a = new FileReader();
                    //     a.readAsDataURL(blob);
                    //     a.onload = function (e) {
                    //         let url = e.target.result;
                    //         if(i!=0)
                    //             LODOP.NewPageA();

                    //         LODOP.ADD_PRINT_TABLE(158,"1%","99%",500,document.getElementById("pickDetail" + i + "").innerHTML);
                    //         LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
                    //         var header=document.getElementById("pickHeader").innerHTML;
                    //         var imgUrl="img border='0' src='" + url + "'";//+ "'/";
                    //         header=header.replace('img',imgUrl);
                    //         LODOP.ADD_PRINT_HTM(18,"1%","99%",200,header);
                    //         LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                    //         LODOP.SET_PRINT_STYLEA(0,"LinkedItem",-1);
                    //         resolve(LODOP);
                    //     }

                    // }
                         if(i!=0)
                                LODOP.NewPageA();

                            LODOP.ADD_PRINT_TABLE(168,"1%","99%",500,document.getElementById("pickDetail" + i + "").innerHTML);
                            LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
                            var top=document.getElementById("pickHeader_top").innerHTML;
                            LODOP.ADD_PRINT_HTM(18,"1%","99%",20,top);
                            var center=document.getElementById("pickHeader_center").innerHTML;
                            LODOP.ADD_PRINT_HTM(40,"1%","99%",73,center);
                            LODOP.ADD_PRINT_BARCODE(40,"2%","35%",60,"128B",item.barCode)
                            var bottom=document.getElementById("pickHeader_bottom").innerHTML;
                            LODOP.ADD_PRINT_HTM(120,"1%","99%",30,bottom)
                            LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                            LODOP.SET_PRINT_STYLEA(0,"LinkedItem",-1);
                            resolve(LODOP);


                });
            }
            let setData = async function() {
                for( var i=0; i<data.length; i++ ) {
                    LODOP = await  newPage(data[i],i,LODOP);
                }
                LODOP.PREVIEW();
            }
            setData();
        },
    }
}