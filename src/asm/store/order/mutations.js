import * as types from "./mutations_types"

export default {
  [types.ADD_ORDER](state, addModel){
    state.todayplans.plans.push(addModel);
  },

  [types.SET_ORDERDETAIL](state, data){//订单明细（配件明细）
    state.orderDetailData = data;
  },
  [types.SET_ORDERBASEINFO](state, data){//订单基本信息
    state.orderBaseInfo = data;
  },
  [types.SET_ORDERDETAILLIST](state, data){//订单明细（配件明细）
    state.orderDetailList = data;
  },
    [types.SET_LISTLABELDTO](state, data){//订单明细（配件明细）
    state.listLabelDto = data;
  },
  [types.SET_ENUMS](state, data){//枚举类
    state.enumsList = data;
  },
    [types.SET_PICKLIST](state, data){//领料信息
        state.pickList = data;
    },
    [types.SET_USER_LIST](state, data){//领料信息
        state.userList = data;
    },
    [types.SET_LIST_PUSH](state, data){//报价单列表跳转开关
        state.pushOn = data;
    },
    [types.SET_DATOOL](state, data){//报价单列表跳转开关
        state.daTool = data;
    },
}
