import mutations from './mutations'
import * as actions from './actions'
const state = {
  orderDetailList: [],//订单明细
  listLabelDto:[],
  orderBaseInfo: {customer: {sendAddress:''},orderType:1,sendAddress:"",billDate:""},//订单基本信息
  orderDetailData: {
    orderDetail: {
      companyBankInfo:{},
        customer: {},
        orderDetailDtos:[],
        payMethod:1,
        includedTax:1
    },
      operator:{},
      btnshow:{}
  },//订单所有信息
  enumsList: {
      payMethod:[],
      orderTypes:[],
      orderStatus:[]
  }, //枚举列表
    pickList:[], //当前订单领料信息
    userList:[],//所有业务员
    pushOn:true,//列表跳转开关
    daTool:false,//配件明细计算开关
}

export default{
  state,
  mutations,
  actions
}
