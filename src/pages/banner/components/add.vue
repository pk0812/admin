<template>
  <div class="box">
    <el-dialog
      :title="info.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- 上传elment-ui -->
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="getFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {successAlert,warningAlert} from '../../../utils/alert';
import {reqBannerAdd,reqBannerUpdata,reqBannerDetail} from '../../../utils/request';
export default {
  props: ['info'],
  components: {},
  data() {
    return {
      imgUrl:"",
      form:{
        id:0,
        title:'',
        img:null,
        status:1,
      }
    };
  },
  computed: {
    ...mapGetters({
      list:'banner/list'
    }),
  },
  methods: {
    ...mapActions({
      reqListAction:'banner/reqListAction'
    }),
    getFile(e) {
      let file = e.raw;

      //把文件生成一个地址
      this.imgUrl = URL.createObjectURL(file);
      //把文件保存到form.img
      this.form.img = file;
    },
    // 取消
    cancel(){
        this.info.isshow=false;
    },
    // 弹框消失
    close(){
      // 如果是添加弹框，就不变。如果是编辑弹框，就清除form
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 数据重置
    empty(){
      this.form={
        id:0,
        title:'',
        img:null,
        status:1,
      };
      this.imgUrl=""
    },
    // 添加
    add(){
      reqBannerAdd(this.form).then((res)=>{
        if(res.data.code==200){
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        }else{
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    updata(){
      reqBannerUpdata(this.form).then(res=>{
        if(res.data.code==200){
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        }else{
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取详情1条
    look(id){
      reqBannerDetail(id).then(res=>{
        if(res.data.code==200){
          this.form=res.data.list;
          this.form.id=id;
          this.imgUrl=this.$imgPre+this.form.img;

        }else{
          warningAlert(res.data.msg);
        }
      })
    }
  },
  mounted() {},
};
</script>
<style lang='stylus' scoped>
.box>>>.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>