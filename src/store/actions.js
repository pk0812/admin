export const actions={
    // 组件触发修改userinfo
    changeUserInfoAction(contxet,info){
        contxet.commit('changeUserInfo',info)
    }
}