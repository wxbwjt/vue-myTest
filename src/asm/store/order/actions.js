import * as types from './mutations_types'
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
/*获取相关枚举*/
export const getEnums = ({ commit }) => {
  return new Promise((resolve,reject)=>{
      instance.post('/asm/getEnums').then(function(res){
      if(res.data.state==200){
        commit(types.SET_ENUMS,res.data.data);
        resolve();
      }
    });
  });
};
/*获取业务员列表*/
export const getUserList = ({ commit }) => {
    return new Promise((resolve,reject)=>{
        instance.post('/asm/qryByBusinessDept').then(function(res){
            if(res.data.state==200){
                commit(types.SET_USER_LIST,res.data.data.data);
                resolve();
            }
        });
    });
};