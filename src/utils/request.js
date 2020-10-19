import axios from 'axios'
import qs from 'qs'
import vue from 'vue'
vue.prototype.$imgPre = 'http://localhost:3000'
let baseUrl = '/api';

//响应拦截
axios.interceptors.response.use(res => {
  console.group('======本次请求路径是：' + res.config.url)
  console.log(res);
  console.groupEnd()

  return res;
})
// 交互接口
// 添加
export const reqMenuAdd = (params) => {
  return axios({
    url: baseUrl + '/api/menuadd',
    method: 'post',
    data: qs.stringify(params)
  })
}
//列表
export const reqMenuList = () => {
  return axios({
    url: baseUrl + '/api/menulist',
    method: 'get',
    params: {
      istree: true
    }
  })
}
//删除
export const reqMenuDel = (id) => {
  return axios({
    url: baseUrl + '/api/menudelete',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}
// 1条
export const reqMenuDetail = (id) => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: 'get',
    params: {
      id: id
    }
  })
}
//修改
export const reqMenuUpdata = (params) => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: 'post',
    data: qs.stringify(params)
  })
}
// 角色管理****************************

// 添加
export const reqRoleAdd = (params) => {
  return axios({
    url: baseUrl + '/api/roleadd',
    method: 'post',
    data: qs.stringify(params)
  })
}
//列表
export const reqRoleList = () => {
  return axios({
    url: baseUrl + '/api/rolelist',
    method: 'get'
  })
}
//修改
export const reqRoleUpdata = (params) => {
  return axios({
    url: baseUrl + '/api/roleedit',
    method: 'post',
    data: qs.stringify(params)
  })
}
//删除
export const reqRoleDel = (id) => {
  return axios({
    url: baseUrl + '/api/roledelete',
    method: 'post',
    data:{
      id
    }
  })
}
//1条
export const reqRoleDetail = (id) => {
  return axios({
    url: baseUrl + '/api/roleinfo',
    method: 'get',
    params: {
      id: id
    }
  })
}
// 管理员管理******************************************
//添加
export const reqManageAdd = (params) => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(params)
  })
}

//管理员总数
export const reqManageCount = () => {
  return axios({
    url: baseUrl + "/api/usercount",
  })
}

//列表 params={page:1,size:10}
export const reqManageList = (params) => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: params
  })
}
//删除
export const reqManageDel = (uid) => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify({
      uid: uid
    })
  })
}

//1条
export const reqManageDetail = (uid) => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}

//修改
export const reqManageUpdate = (params) => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(params)
  })
}
// 管理员登录
export const reqLogin=(params)=>{
  console.log(333);
  console.log(params);
  return axios({
    url:baseUrl+'/api/userlogin',
    method:'post',
    data:params
  })
}





//  商品分类******************************
//  添加
export const reqCateAdd = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/cateadd',
    method: 'post',
    data: data
  })
}
//列表
export const reqCateList = (params) => {
  return axios({
    url: baseUrl + '/api/catelist',
    method: 'get',
    params: params

  })
}
//分类获取1条
export const reqCateDetail = (id) => {
  return axios({
    url: baseUrl + '/api/cateinfo',
    method: 'get',
    params: {
      id: id
    }
  })
}
//修改
export const reqCateUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/cateedit',
    method: 'post',
    data: data
  })

}
//删除
export const reqCateDel = (id) => {
  return axios({
    url: baseUrl + '/api/catedelete',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}

//   商品规格管理*********************************
// 添加
export const reqSpecsAdd = (params) => {
  return axios({
    url: baseUrl + '/api/specsadd',
    method: 'post',
    data: qs.stringify(params)
  })
}
//管理员总数
export const reqSpecsCount = () => {
  return axios({
    url: baseUrl + '/api/specscount',
  })
}
//列表params={page:1,size=10}
export const reqSpecsList = (params) => {
  return axios({
    url: baseUrl + '/api/specslist',
    method: 'get',
    params: params
  })
}
//删除
export const reqSpecsDel = (id) => {
  return axios({
    url: baseUrl + '/api/specsdelete',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}
//数据详情1条
export const reqSpecsDetail = (id) => {
  return axios({
    url: baseUrl + '/api/specsinfo',
    method: 'get',
    params: {
      id: id
    }
  })
}
// 修改
export const reqSpecsUpdate = (params) => {
  return axios({
    url: baseUrl + "/api/specsedit",
    method: 'post',
    data: qs.stringify(params)
  })
}
//商品管理**************************
// 添加
export const reqGoodsAdd=(form)=>{
  let data=new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url:baseUrl+'/api/goodsadd',
    method:'post',
    data:data
  })
}
// 商品总数
export const reqGoodsCount=()=>{
  return axios({
    url:baseUrl+'/api/goodscount',
    method:'get',
    
  })
}
// 商品列表
export const reqGoodsList=(params)=>{
  return axios({
    url:baseUrl+'/api/goodslist',
    method:'get',
    params:params
  })
}
// 商品获取1条
export const reqGoodsDetail=(params)=>{
  return axios({
    url:baseUrl+'/api/goodsinfo',
    method:'get',
    params:params
  })
}
// 商品修改
export const reqGoodsUpdata=(form)=>{
      let data=new FormData()
      for(let i in form){
        data.append(i,form[i])
      }
    return axios({
      url:baseUrl+'/api/goodsedit',
      method:'post',
      data:data
    })
}
// 删除
export const reqGoodsDel=(params)=>{
  return axios({
    url:baseUrl+'/api/goodsdelete',
    method:'post',
    data:qs.stringify(params)
  })
}
// 会员管理****************************
// 列表
export const reqMemberList=()=>{
  return axios({
    url:baseUrl+'/api/memberlist',
    
  })
}
// 会员获取1条
export const reqMemberDetail=(uid)=>{
    return axios({
      url:baseUrl+'/api/memberinfo',
      method:'get',
      params:{
       uid:uid
      }
    })
}
// 会员修改
export const reqMemberUpdata=(params)=>{
  return axios({
    url:baseUrl+'/api/memberedit',
    method:'post',
    data:qs.stringify(params)
  })
}
// 轮播图管理**********************************
// 添加
export const reqBannerAdd=(params)=>{
  return axios({
    url:baseUrl+'/api/banneradd',
    method:'post',
    data:qs.stringify(params),
  })
}
// 列表
export const reqBannerList=()=>{
  console.log(222);
  return axios({
    url:baseUrl+'/api/bannerlist',
    method:'get',
    
  })
}
// 修改
export const reqBannerUpdata=(params)=>{
    return axios({
      url:baseUrl+"/api/banneredit",
      method:"post",
      data:qs.stringify(params)
    })
}
// 删除
export const reqBannerDel=(id)=>{
  return axios({
    url:baseUrl+'/api/bannerdelete',
    method:"post",
    params:{
      id:id
    }
  })
}
// 获取详情1条
export const reqBannerDetail=(id)=>{
  return axios({
    url:baseUrl+'/api/bannerinfo',
    method:'get',
    params:{
        id:id
    }
  })
}
// 秒杀活动管理**********************************
// 添加
export const reqSeckAdd=(params)=>{
  return axios({
    url:baseUrl+'/api/seckadd',
    method:'post',
    data:qs.stringify(params)
  })
}
// 列表
export const reqSeckList=()=>{
  return axios({
    url:baseUrl+'/api/secklist',
  })
}
// 秒杀获取1条
export const reqSeckDetail=(id)=>{
  return axios({
    url:baseUrl+'/api/seckinfo',
    method:'get',
    params:{
        id:id
    }
  })
}
// 修改
export const reqSeckUpdata=(params)=>{
  return axios({
    url:baseUrl+'/api/seckedit',
    method:"post",
    data:qs.stringify(params)
  })
}
// 删除
export const reqSeckDel=(id)=>{
  return axios({
    url:baseUrl+'/api/seckdelete',
    method:'post',
    data:qs.stringify({
        id:id
    })
  })
}
