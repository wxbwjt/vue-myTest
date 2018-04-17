/**
 * Created by wjt on 2017/10/30.
 */
exports.express_faces_EMS = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    //四个数值分别表示Top,Left,Width,Height
    LODOP.ADD_PRINT_TEXT('24.5mm','16mm','25mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('54mm','16mm','55mm','5mm','' + data.contact.contact + '');
    LODOP.ADD_PRINT_TEXT('24mm','58mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('54mm','62mm','70mm','5mm','');
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('54mm','62mm','70mm','5mm','' + data.contact.conTelephone);
    }else if(typeof(data.contact.conTelephone) == "undefined" || data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('54mm','62mm','70mm','5mm','' +data.contact.conMobile);
    }
    else{
        LODOP.ADD_PRINT_TEXT('54mm','62mm','70mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }
    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('30.5mm','18.8mm','70mm','5mm','杭州永创智能设备股份有限公司');
    } else if( detail.orderSource == 2){
        LODOP.ADD_PRINT_TEXT('30.5mm','18.8mm','70mm','5mm','浙江美华包装机械有限公司');
    } else{
        LODOP.ADD_PRINT_TEXT('30.5mm','18.8mm','70mm','5mm','佛山市成田司化机械有限公司');
    }

    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('60.69mm','18.8mm','150.01mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('60.69mm','18.8mm','150.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('65.69mm','18.8mm','150.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }

    LODOP.ADD_PRINT_TEXT('35.83mm','14mm','70.01mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('74.62mm','14mm','150.01mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('74.62mm','14mm','150.01mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('79.62mm','14mm','150.01mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('101.2mm','18.8mm','40mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 配件");
    LODOP.ADD_PRINT_TEXT('50mm','164mm','20.78mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('100mm','160mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.express_faces_SF = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('30mm','83mm','15mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('53mm','73mm','55mm','5mm','' + data.contact.contact + '');
    LODOP.ADD_PRINT_TEXT('43mm','16mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','');
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' + data.contact.conTelephone);
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' +data.contact.conMobile);
    }
    else{
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }
    if ( detail.orderSource == 1) {
        LODOP.ADD_PRINT_TEXT('29mm','20mm','71.3mm','5mm','杭州永创智能设备股份有限公司');
    } else if ( detail.orderSource == 2 ) {
        LODOP.ADD_PRINT_TEXT('29mm','20mm','71.3mm','5mm','浙江美华包装机械有限公司');
    } else {
        LODOP.ADD_PRINT_TEXT('29mm','20mm','71.3mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('50mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('50mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('55mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('35mm','10mm','70.77mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('65mm','8mm','100.71mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('65mm','8mm','100.71mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('70mm','8mm','100.71mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('86mm','8mm','41.59mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 配件");
    LODOP.ADD_PRINT_TEXT('108mm','15mm','26.78mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('110mm','110mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.express_faces_SFDF = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('30mm','83mm','15mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('53mm','73mm','55mm','5mm','' + data.contact.contact + '');
    LODOP.ADD_PRINT_TEXT('43mm','16mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','');
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' + data.contact.conTelephone);
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' +data.contact.conMobile);
    }
    else{
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }
    if ( detail.orderSource == 1) {
        LODOP.ADD_PRINT_TEXT('29mm','20mm','71.3mm','5mm','杭州永创智能设备股份有限公司');
    } else if ( detail.orderSource == 2 ) {
        LODOP.ADD_PRINT_TEXT('29mm','20mm','71.3mm','5mm','浙江美华包装机械有限公司');
    } else {
        LODOP.ADD_PRINT_TEXT('29mm','20mm','71.3mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('50mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('50mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('55mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('35mm','10mm','70.77mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('65mm','8mm','100.71mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('65mm','8mm','100.71mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('70mm','8mm','100.71mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('86mm','8mm','41.59mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 配件");
    LODOP.ADD_PRINT_TEXT('108mm','15mm','26.78mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('110mm','110mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.express_faces_ST = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('24.94mm','20.88mm','20.98mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('24.94mm','120.8mm','55mm','5mm','' + data.contact.contact + '');
    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('33.62mm','18.28mm','72.6mm','5mm','杭州永创智能设备股份有限公司');
    } else if( detail.orderSource == 2){
        LODOP.ADD_PRINT_TEXT('33.62mm','18.28mm','72.6mm','5mm','浙江美华包装机械有限公司');
    } else{
        LODOP.ADD_PRINT_TEXT('33.62mm','18.28mm','72.6mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('33.62mm','113.76mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
    }else{
        LODOP.ADD_PRINT_TEXT('33.62mm','113.76mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('38mm','122.76mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }

    LODOP.ADD_PRINT_TEXT('55.48mm','10mm','77.92mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('48.48mm','114.01mm','100.01mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('48.48mm','114.01mm','70.01mm','5mm','' + data.contact.conAddress.substring(0,15) + '');
        LODOP.ADD_PRINT_TEXT('54.48mm','114.01mm','70.01mm','5mm','' + data.contact.conAddress.substring(15,data.contact.conAddress.length) + '');
    }

    LODOP.ADD_PRINT_TEXT('61.21mm','31.57mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('58.21mm','130.96mm','70.16mm','5mm','');
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('58.21mm','130.96mm','70.16mm','5mm','' + data.contact.conTelephone);
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('58.21mm','130.96mm','70.16mm','5mm','' +data.contact.conMobile);
    }
    else{
        LODOP.ADD_PRINT_TEXT('58.21mm','130.96mm','70.16mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }
    LODOP.ADD_PRINT_TEXT('69.83mm','30.14mm','40mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 配件");
    LODOP.ADD_PRINT_TEXT('95.61mm','23mm','25mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('95.61mm','160mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.express_faces_DB = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('20.98mm','80.3mm','20mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('56.06mm','85.41mm','55mm','5mm','' + data.contact.contact + '');
    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','杭州永创智能设备股份有限公司');
    }else if( detail.orderSource == 2) {
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','浙江美华包装机械有限公司');
    }else{
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('56.01mm','16.82mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('56.01mm','16.82mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('62.01mm','12.00mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('28.71mm','36.62mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','');
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' + data.contact.conTelephone);
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' +data.contact.conMobile);
    }
    else{
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }

    LODOP.ADD_PRINT_TEXT('35.38mm','12.96mm','75.01mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('78.29mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('78.29mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('83.30mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }

    LODOP.ADD_PRINT_TEXT('105.76mm','160.73mm','40mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 配件");
    LODOP.ADD_PRINT_TEXT('110.76mm','175.73mm','40mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('98.76mm','160.73mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.express_faces_DBKD = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('20.98mm','80.3mm','20mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('56.06mm','85.41mm','55mm','5mm','' + data.contact.contact + '');
    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','杭州永创智能设备股份有限公司');
    }else if( detail.orderSource == 2) {
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','浙江美华包装机械有限公司');
    }else{
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('56.01mm','16.82mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('56.01mm','16.82mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('62.01mm','12.00mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('28.71mm','36.62mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','');
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' + data.contact.conTelephone);
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' +data.contact.conMobile);
    }
    else{
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }

    LODOP.ADD_PRINT_TEXT('35.38mm','12.96mm','75.01mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('78.29mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('78.29mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('83.30mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }

    LODOP.ADD_PRINT_TEXT('105.76mm','160.73mm','40mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 配件");
    LODOP.ADD_PRINT_TEXT('110.76mm','175.73mm','40mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('98.76mm','160.73mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.express_faces_STDF = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('28mm','16.02mm','20.98mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('28mm','100.49mm','55mm','5mm','' + data.contact.contact + '');
    LODOP.ADD_PRINT_TEXT('28mm','40.69mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('28mm','150mm','70.16mm','5mm','');
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('28mm','150mm','70.16mm','5mm','' + data.contact.conTelephone);
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('28mm','150mm','70.16mm','5mm','' +data.contact.conMobile);
    }
    else{
        LODOP.ADD_PRINT_TEXT('28mm','150mm','70.16mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }

    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('36mm','29.71mm','82.6mm','5mm','杭州永创智能设备股份有限公司');
    } else if( detail.orderSource == 2) {
        LODOP.ADD_PRINT_TEXT('36mm','29.71mm','82.6mm','5mm','浙江美华包装机械有限公司');
    } else {
        LODOP.ADD_PRINT_TEXT('36mm','29.71mm','82.6mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('36mm','107.48mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('36mm','107.48mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('41mm','107.48mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('45.96mm','17.87mm','77.92mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('45.69mm','96.74mm','100.01mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('45.69mm','96.74mm','100.01mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('50.69mm','96.74mm','100.01mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('85.49mm','142.62mm','40mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 配件");
    LODOP.ADD_PRINT_TEXT('85.49mm','120.94mm','20mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('85.49mm','130.94mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.express_faces_KHZT = function(data,detail) {

};

exports.express_faces_ZT = function(data,detail) {

};

exports.invoice_faces_EMS = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('24.44mm','14.91mm','25mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('54mm','15.71mm','55mm','5mm','' + data.contact.contact + '');
    LODOP.ADD_PRINT_TEXT('23.17mm','58.22mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('54mm','62mm','70mm','5mm','');
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('54mm','62mm','70mm','5mm','' +data.contact.conMobile);
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('54mm','62mm','70mm','5mm','' + data.contact.conTelephone);
    }
    else{
        LODOP.ADD_PRINT_TEXT('54mm','62mm','70mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }
    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('30.08mm','18.8mm','70.01mm','5mm','杭州永创智能设备股份有限公司');
    } else if( detail.orderSource == 2) {
        LODOP.ADD_PRINT_TEXT('30.08mm','18.8mm','70.01mm','5mm','浙江美华包装机械有限公司');
    } else {
        LODOP.ADD_PRINT_TEXT('30.08mm','18.8mm','70.01mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('60.69mm','18.8mm','150.01mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('60.69mm','18.8mm','150.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('65.69mm','18.8mm','150.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }

    LODOP.ADD_PRINT_TEXT('35.83mm','14mm','70.01mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('74.62mm','14mm','150.01mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('74.62mm','14mm','150.01mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('79.62mm','14mm','150.01mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('102.21mm','23.35mm','40mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 发票");
    LODOP.ADD_PRINT_TEXT('55.63mm','160.4mm','20.78mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('100mm','160mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.invoice_faces_SF = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    console.log(data);
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('27mm','83mm','15mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('50mm','76mm','55mm','5mm','' + data.contact.contact + '');
    LODOP.ADD_PRINT_TEXT('41mm','12mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','');
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' +data.contact.conMobile);
    }else if(typeof(data.contact.conMobile) == "undefined" || data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' + data.contact.conTelephone);
    }else{
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }

    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('28mm','10mm','71.3mm','5mm','杭州永创智能设备股份有限公司');
    } else if( detail.orderSource == 2) {
        LODOP.ADD_PRINT_TEXT('28mm','10mm','71.3mm','5mm','浙江美华包装机械有限公司');
    } else{
        LODOP.ADD_PRINT_TEXT('28mm','10mm','71.3mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('50mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('50mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('55mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('35mm','10mm','70.77mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('65mm','8mm','100.71mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('65mm','8mm','100.71mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('70mm','8mm','100.71mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('86mm','8mm','41.59mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 发票");
    LODOP.ADD_PRINT_TEXT('106mm','15mm','26.78mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('110mm','110mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.invoice_faces_SFDF = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    console.log(data);
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('27mm','83mm','15mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('50mm','76mm','55mm','5mm','' + data.contact.contact + '');
    LODOP.ADD_PRINT_TEXT('41mm','12mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','');
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' +data.contact.conMobile);
    }else if(typeof(data.contact.conMobile) == "undefined" || data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' + data.contact.conTelephone);
    }else{
        LODOP.ADD_PRINT_TEXT('75mm','15mm','70.31mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }

    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('28mm','10mm','71.3mm','5mm','杭州永创智能设备股份有限公司');
    } else if( detail.orderSource == 2) {
        LODOP.ADD_PRINT_TEXT('28mm','10mm','71.3mm','5mm','浙江美华包装机械有限公司');
    } else{
        LODOP.ADD_PRINT_TEXT('28mm','10mm','71.3mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('50mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('50mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('55mm','6mm','70.07mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('35mm','10mm','70.77mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('65mm','8mm','100.71mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('65mm','8mm','100.71mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('70mm','8mm','100.71mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('86mm','8mm','41.59mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 发票");
    LODOP.ADD_PRINT_TEXT('106mm','15mm','26.78mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('110mm','110mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.invoice_faces_ST = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('27.94mm','20.88mm','20.98mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('27.94mm','120.8mm','55mm','5mm','' + data.contact.contact + '');
    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('36.62mm','18.28mm','72.6mm','5mm','杭州永创智能设备股份有限公司');
    } else if( detail.orderSource == 2) {
        LODOP.ADD_PRINT_TEXT('36.62mm','18.28mm','72.6mm','5mm','浙江美华包装机械有限公司');
    } else{
        LODOP.ADD_PRINT_TEXT('36.62mm','18.28mm','72.6mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('33.62mm','113.76mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
    }else{
        LODOP.ADD_PRINT_TEXT('33.62mm','113.76mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('38mm','122.76mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }

    LODOP.ADD_PRINT_TEXT('55.48mm','10mm','77.92mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('48.48mm','114.01mm','100.01mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('48.48mm','114.01mm','70.01mm','5mm','' + data.contact.conAddress.substring(0,15) + '');
        LODOP.ADD_PRINT_TEXT('54.48mm','114.01mm','70.01mm','5mm','' + data.contact.conAddress.substring(15,data.contact.conAddress.length)+ '');
    }
    LODOP.ADD_PRINT_TEXT('62.21mm','34.57mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('64.21mm','130.96mm','70.16mm','5mm','');
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('64.21mm','130.96mm','70.16mm','5mm','' +data.contact.conMobile);
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('64.21mm','130.96mm','70.16mm','5mm','' + data.contact.conTelephone);
    }
    else{
        LODOP.ADD_PRINT_TEXT('64.21mm','130.96mm','70.16mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }

    LODOP.ADD_PRINT_TEXT('68.83mm','20.14mm','40mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 发票");
    LODOP.ADD_PRINT_TEXT('95.61mm','23mm','25mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('95.61mm','160mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.invoice_faces_DB = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('20.98mm','80.3mm','20mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('56.06mm','85.41mm','55mm','5mm','' + data.contact.contact + '');
    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','杭州永创智能设备股份有限公司');
    }else if( detail.orderSource == 2) {
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','浙江美华包装机械有限公司');
    }else{
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('56.01mm','16.82mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('56.01mm','16.82mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('62.01mm','12.00mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('28.71mm','36.62mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','');
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' +data.contact.conMobile);
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' + data.contact.conTelephone);
    }
    else{
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }

    LODOP.ADD_PRINT_TEXT('35.38mm','12.96mm','75.01mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('78.29mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('78.29mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('83.30mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }

    LODOP.ADD_PRINT_TEXT('105.76mm','160.73mm','40mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 发票");
    LODOP.ADD_PRINT_TEXT('110.76mm','175.73mm','40mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('98.76mm','160.73mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.invoice_faces_DBKD = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('20.98mm','80.3mm','20mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('56.06mm','85.41mm','55mm','5mm','' + data.contact.contact + '');
    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','杭州永创智能设备股份有限公司');
    }else if( detail.orderSource == 2) {
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','浙江美华包装机械有限公司');
    }else{
        LODOP.ADD_PRINT_TEXT('20.51mm','16.82mm','75.01mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('56.01mm','16.82mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('56.01mm','16.82mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('62.01mm','12.00mm','74.19mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('28.71mm','36.62mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','');
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' +data.contact.conMobile);
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' + data.contact.conTelephone);
    }
    else{
        LODOP.ADD_PRINT_TEXT('62.2mm','36.21mm','70.89mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }

    LODOP.ADD_PRINT_TEXT('35.38mm','12.96mm','75.01mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('78.29mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('78.29mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('83.30mm','12.96mm','100.01mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }

    LODOP.ADD_PRINT_TEXT('105.76mm','160.73mm','40mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 发票");
    LODOP.ADD_PRINT_TEXT('110.76mm','175.73mm','40mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('98.76mm','160.73mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.invoice_faces_STDF = function(data,detail) {
    var sdata = data;
    var data = sdata.result;
    var userPhone = sdata.user;
    var userMobile = sdata.mobile;
    LODOP.SET_PRINT_STYLE("FontSize",11);
    LODOP.SET_PRINT_PAGESIZE(0,'230mm','127mm','A4');
    LODOP.ADD_PRINT_TEXT('28mm','16.02mm','20.98mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('28mm','100.49mm','55mm','5mm','' + data.contact.contact + '');
    LODOP.ADD_PRINT_TEXT('28mm','40.69mm','100mm','5mm',userPhone+'/'+userMobile);
    if(typeof(data.contact.conMobile) == "undefined" && typeof(data.contact.conTelephone) == "undefined"){
        LODOP.ADD_PRINT_TEXT('28mm','150mm','70.16mm','5mm','');
    }else if(typeof(data.contact.conTelephone) == "undefined"|| data.contact.conTelephone == ""){
        LODOP.ADD_PRINT_TEXT('28mm','150mm','70.16mm','5mm','' +data.contact.conMobile);
    }else if(typeof(data.contact.conMobile) == "undefined"|| data.contact.conMobile == ""){
        LODOP.ADD_PRINT_TEXT('28mm','150mm','70.16mm','5mm','' + data.contact.conTelephone);
    }
    else{
        LODOP.ADD_PRINT_TEXT('28mm','150mm','70.16mm','5mm','' + data.contact.conMobile + ' '+'/'+data.contact.conTelephone);
    }

    if( detail.orderSource == 1){
        LODOP.ADD_PRINT_TEXT('36mm','29.71mm','82.6mm','5mm','杭州永创智能设备股份有限公司');
    } else if( detail.orderSource == 2) {
        LODOP.ADD_PRINT_TEXT('36mm','29.71mm','82.6mm','5mm','浙江美华包装机械有限公司');
    } else {
        LODOP.ADD_PRINT_TEXT('36mm','29.71mm','82.6mm','5mm','佛山市成田司化机械有限公司');
    }
    if(detail.orderBaseInfo.customerName.length<=20){
        LODOP.ADD_PRINT_TEXT('36mm','107.48mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName + '');
    }else{
        LODOP.ADD_PRINT_TEXT('36mm','107.48mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('41mm','107.48mm','80.01mm','5mm','' + detail.orderBaseInfo.customerName.substring(20,detail.orderBaseInfo.customerName.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('45.96mm','17.87mm','77.92mm','5mm','杭州三墩西湖科技园西园七路2号');
    if(data.contact.conAddress.length<=20){
        LODOP.ADD_PRINT_TEXT('45.69mm','96.74mm','100.01mm','5mm','' + data.contact.conAddress + '');
    }else{
        LODOP.ADD_PRINT_TEXT('45.69mm','96.74mm','100.01mm','5mm','' + data.contact.conAddress.substring(0,20) + '');
        LODOP.ADD_PRINT_TEXT('50.69mm','96.74mm','100.01mm','5mm','' + data.contact.conAddress.substring(20,data.contact.conAddress.length) + '');
    }
    LODOP.ADD_PRINT_TEXT('85.49mm','142.62mm','40mm','5mm','' + detail.orderBaseInfo.orderNo + ''+" 发票");
    LODOP.ADD_PRINT_TEXT('85.49mm','120.94mm','20mm','5mm','' + detail.operator.name + '');
    LODOP.ADD_PRINT_TEXT('80.49mm','130.94mm','40mm','5mm','' + detail.orderBaseInfo.customerOrderId + '');
    LODOP.PREVIEW();
};

exports.invoice_faces_KHZT = function(data,detail) {

};

exports.invoice_faces_ZT = function(data,detail) {

};