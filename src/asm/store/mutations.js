import * as types from "./mutations_types"

export default {
    [types.SET_SLIDE_FLAG](state){
        state.slideFlag = !state.slideFlag;
    },
    [types.SET_ROLE](state,data){
        state.role = data;
    },
    [types.SET_USER](state,data){
        state.user = data
    },
  [types.SET_RELOAD_LEFTLIST](state){
    state.isReloadLeftList = !state.isReloadLeftList;
  },
}
