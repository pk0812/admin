<template>
  <div class="login">
      <div class="box">
          <h3 class="center">登录</h3>
          <div class="line">
              <el-input placeholder="请输入账号" v-model="form.username" clearable></el-input>
          </div>
          <div class="line">
            <el-input placeholder="请输入密码" v-model="form.password" show-password clearable></el-input>
          </div>
          <div class="center line">
            <el-button type="primary" @click="login">登录</el-button>
          </div>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from '../../utils/alert';
import { reqLogin } from '../../utils/request';
export default {
  props: [],
  components: {},
  data() {
    return {
      form:{
        username:'',
        password:'',
      }
    };
  },
  computed: {
    ...mapGetters({
    
    }),
  }, 
  methods:{
    ...mapActions({
      changeUserInfoAction:"changeUserInfoAction"
      }),
    login(){
      console.log(111);
   
      console.log(this.form);
      reqLogin(this.form).then(res=>{
        console.log(222);
         if(res.data.code==200){
          // 登录成功
          successAlert('登录成功')
          // res.data.list 用户信息，存起来，供多个组件使用
          this.changeUserInfoAction(res.data.list)
          this.$router.push('/')
          
          // 跳转页面
          }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {},
};
</script>
<style scoped>
  .login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#553443,#303D60);
    position: relative;
  }
  .box{
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 20px;
  }
  .center{
  text-align: center;
  font-size: 16px;
  }
  .line{
    margin-top: 20px;
  }
</style>