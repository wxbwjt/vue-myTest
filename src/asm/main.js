// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import routermap from './router-config'
import axios from 'axios'
import store from './store/index'
import '@/assets/css/main.css'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome-webpack'
import AuthController from './AuthController'
Vue.config.productionTip = false
import Qs from 'qs' //qs一般装了axios就自带不用再装，如果没有，自己安装下
let instance=axios.create({
    baseURL: '/ys-web-asm',//这里配置你自己的url
    timeout: 600000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'  //请求头
    },
    transformRequest: [function (data) {
        data = Qs.stringify(data)  //序列化参数
        return data
    }]
})
let pending=[];//声明一个数组用于存储每个ajax请求的取消函数和ajax标识

let cancelToken=axios.CancelToken;

let removePending=(config)=>{
    for(let p in pending) {
        if(pending[p].u===config.url+'&'+config.method) {//当当前请求在数组中存在时执行函数体
            pending[p].f();//执行取消操作
            pending.splice(p,1);//把这条记录从数组中移除
        }
    }
}
//添加请求拦截器
instance.interceptors.request.use(config=>{
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken=new cancelToken((c)=>{
//这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({u:config.url+'&'+config.method,f:c});
    });
    return config;
},error=>{
    return Promise.reject(error);
});
//添加响应拦截器
instance.interceptors.response.use(res=>{
    removePending(res.config);//在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    return res;
},error=>{
    return{data:{state:400} };
});
Vue.prototype.$http = instance
Vue.use(VueRouter)
Vue.use(Element)
//时间格式化
Date.prototype.pattern=function(fmt) {
  var o = {
    "M+" : this.getMonth()+1, //月份
    "d+" : this.getDate(), //日
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds() //毫秒
  };
  var week = {
    "0" : "/u65e5",
    "1" : "/u4e00",
    "2" : "/u4e8c",
    "3" : "/u4e09",
    "4" : "/u56db",
    "5" : "/u4e94",
    "6" : "/u516d"
  };
  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  if(/(E+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
  }
  for(var k in o){
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}


Date.prototype.toString=function(){
  return this.pattern("yyyy-MM-dd HH:mm:ss");
}

Number.prototype.toFixed = function(s) {
    var that = this,changenum,index;
    // 负数
    if(this < 0){
        that = -that;
    }
    changenum = (parseInt(that * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
    index = changenum.indexOf(".");
    if (index < 0 && s > 0) {
        changenum = changenum + ".";
        for (var i = 0; i < s; i++) {
            changenum = changenum + "0";
        }


    } else {
        index = changenum.length - index;
        for (var i = 0; i < (s - index) + 1; i++) {
            changenum = changenum + "0";
        }


    }
    if(this<0){
        return -changenum;
    }else{
        return changenum;
    }
}

function getPermissionList(Vue){
    return new Promise((resolve,reject)=>{

        instance.post('/asm/auth_list').then(function(res){
            if(res.data.state == '200'){
                if(sessionStorage)
                    sessionStorage.setItem('permisssion',JSON.stringify(res.data.data.data));

                resolve(res.data.data);

            }else{
                reject([]);
            }

        });

    });

}

Vue.prototype.getBase64Image=function(img){
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}
//图片拖拽
Vue.directive('drag',//自定义指令
        {bind:function (el, binding) {
                let oDiv = el;   //当前元素
                let self = this;  //上下文
                oDiv.onmousedown = function (e) {
                 //鼠标按下，计算当前元素距离可视区的距离
                    let disX = e.clientX - oDiv.offsetLeft;
                    let disY = e.clientY - oDiv.offsetTop;

                    document.onmousemove = function (e) {
                      //通过事件委托，计算移动的距离
                        let l = e.clientX - disX;
                        let t = e.clientY - disY;
                      //移动当前元素
                     if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
                        {
                        let winHeight = document.documentElement.clientHeight;
                        let winWidth = document.documentElement.clientWidth;
                        if(e.clientY<50){
                            return false
                        }else if(e.clientY>0.9*winHeight){
                            return false
                        }else{
                             oDiv.style.top = t + 'px';
                        }
                        if(e.clientX<(winWidth-900)/2){
                           return false
                        }else if(e.clientX>(winWidth+900)/2){
                           return false
                        }else{
                            oDiv.style.left = l + 'px';
                        }
                    }
                         //将此时的位置传出去
                         e.target.style.setProperty("position","absolute");
                    };
                    document.onmouseup = function (e) {

                        document.onmousemove = null;
                        document.onmouseup = null;
                     };
                };
            }
        }
    );

//获取路由配置
const router = new VueRouter({
  routes: routermap
})
/* eslint-disable no-new */
getPermissionList(Vue)
    .then((data)=>{
        Vue.use(AuthController,{'permissionList':data.permissionList,'roleList':data.roleList});
        new Vue({
            router,
            store,
            el: '#app',
            template: '<App/>',
            components: { App }
        })
    })
    .catch((err)=>{
        console.log(err)
    });