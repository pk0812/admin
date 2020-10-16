export const state = {
  // 用户信息
  userInfo: sessionStorage.getItem("userInfo") ?
    JSON.parse(sessionStorage.getItem("userInfo")) : {}
}
export const mutations = {
  changeUserInfo(state, info) {
    state.userInfo = info;
    // 由于状态层刷新，数据就消失，所以需要本地存储
    // 如果info是一个{}，那么代表退出登录。删：如果不是一个空{}代表是登录，并本地存储
    if (info.id) {
      sessionStorage.setItem("userInfo", JSON.stringify(info))
    } else {
      sessionStorage.removeItem("userInfo")
    }
  }
}
export const getters = {
  userInfo(state) {
    return state.userInfo;
  }
}
