import * as types from './mutations_types'
import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs' //qs一般装了axios就自带不用再装，如果没有，自己安装下
let instance=axios.create({
    baseURL: '/ys-web-asm',//这里配置你自己的url
    timeout: 50000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'  //请求头
    },
    transformRequest: [function (data) {
        data = Qs.stringify(data)  //序列化参数
        return data
    }]
})
export const getRole = ({commit}) => {
  return new Promise((resolve,reject)=>{
      Vue.http.get('/ys-web-pms/pms/getRoleInfo').then(function(res){
      if(res.data.status == 'success'){
        // console.log("角色登场，咔咔咔")
        // console.log(res.data.data)
        commit(types.SET_ROLE,res.data.data);
        resolve();
      }
    });
});
};
