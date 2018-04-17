import Vue from 'vue'
import Vuex from 'vuex'
import moduleOrder from './order/index'

import mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex)
const state = {
  slideFlag:true, //左侧列表展开与否
    roleList:[],//用户角色列表
    role:{},//当前登入用户角色权限信息
    user:{
        roleNames:[]//当前登陆用户信息
    },
  isReloadLeftList:false,//是否刷新右侧列表

}
export default new Vuex.Store({
  modules:{
    moduleOrder,
  },
  state,
  mutations,
    actions
})
