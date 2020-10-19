<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加活动' : '编辑活动'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

         <el-form-item label="活动期限">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTime"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" placeholder="请选择分类" @change='changeFirst'>
            
            <el-option
            v-for='item in cateList'
            :key='item.id'
            :label='item.catename'
            :value='item.id'
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择分类" @change='changegoods'>
            <el-option 
            v-for="item in sencondSpecsList"
            :key='item.id'
            :label='item.catename'
            :value='item.id'
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option 
            v-for='item in goodsList'
            :key='item.id'
            :label='item.goodsname'
            :value='item.id'
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type='primary' @click="add" v-if='info.isAdd'>添加</el-button>
            <el-button type='primary' @click="updata" v-else>修改</el-button>
        </div>
        
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  reqSeckAdd,
  reqSeckUpdata,
  reqSeckDetail, reqCateList, reqGoodsList
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        id: 0,
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
        value1:"",
        // 二级分类
        sencondSpecsList:[],
        // 商品
         goodsList: [],
    };
  },
  computed: {
    ...mapGetters({
      list: "seck/list",
     // 商品分类list
      cateList: "cate/list",
      // 商品规则list
      specsList: "specs/list",
    //   商品
       goodsAttrList:'goods/list',
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "seck/reqListAction",
      // 请求商品分类list
      reqCateList: "cate/reqListAction",
      // 商品规则list
      reqSpecsList: "specs/reqListAction",
    //   商品
      reqGoodsList:'goods/reqListAction',
    }),
    //   取消
    cancel() {
      this.info.isshow = false;
    },
    //   弹框消失
    close() {
      //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    //   数据重置
    empty() {
        // 二级分类
        this.sencondSpecsList=[];
        // 商品
         this.goodsList=[];
      this.form = {
         id: 0,
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    //点击添加按钮
    add() {
      // console.log(this.form);
      reqSeckAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据刷新
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    changeTime(){
        this.form.begintime=Number(this.value1[0].getTime());
        this.form.endtime=Number(this.value1[0].getTime());
    },
    //获取菜单详情(1条)
    look(id) {
      //发请求
      reqSeckDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.value1=[
              new Date(parseInt(this.form.begintime)),
              new Date(parseInt(this.form.endtime))
          ];
          this.getSecondList();
          this.getGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    updata() {
      reqSeckUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 一级分类
    changeFirst(){
        this.form.sencondSpecsList="";
        this.getSecondList();
    },
    // 二级分类
    getSecondList(){
        reqCateList({pid:this.form.first_cateid}).then((res)=>{
            this.sencondSpecsList=res.data.list;
        })
        console.log(this.sencondSpecsList);
    },
    // 商品
    getGoodsList(){
        reqGoodsList({fid:this.form.first_cateid,sid:this.second_cateid}).then((res)=>{
            this.goodsList=res.data.list;
        })  
    },
    changegoods(){
      this.getGoodsList();
  },
  },
  
  mounted() {
      if (this.cateList.length == 0) {
      this.reqCateList();
      this.reqSpecsList();
    }
  },
};
</script>
<style scoped>
</style>