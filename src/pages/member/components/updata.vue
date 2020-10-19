<template>
  <el-dialog :visible.sync="info.isshow" @closed="close">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="name">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="region">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="region">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="ruleForm.status"
        :active-value="1"
        :inactive-value="2"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updata">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqMemberDetail, reqMemberUpdata } from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      ruleForm: {
        uid:0,
        phone: "",
        nickname: "",
        password: "",
        status:1,
      },
    };
  },
  computed: {
    ...mapGetters({
      memberLsit: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "member/reqListAction",
    }),
    // 编辑
    look(uid) {
      reqMemberDetail(uid).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.ruleForm = res.data.list;
          this.ruleForm.password = "";

          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
      console.log(this.ruleForm);
    },
    // 数据重置
    empty() {
      this.ruleForm = {
        phone: "",
        nickname: "",
        password: "",
        delivery: true,
      };
    },
    // 修改
    updata(uid) {
      reqMemberUpdata(this.ruleForm).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.close();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 弹框消失
    cancel() {
      this.info.isshow = false;
    },
    // 关闭弹框
    close() {
      this.empty();
    },
  },

  mounted() {},
};
</script>
<style scoped>
</style>