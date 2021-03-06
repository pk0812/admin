import {reqBannerList} from '../../utils/request'
const state={
    // 菜单list
    list:[]
}
const mutations={
    // 修改list
    changeList(state,arr){
        state.list=arr;
    }
}
const actions={
    // 请求页面
    reqListAction(context){
        console.log(111);
        // 发请求
        reqBannerList().then(res=>{
            context.commit('changeList',res.data.list)
        })
    }
}
const getters={
    list(state){
        return state.list
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}