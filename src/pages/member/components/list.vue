<template>
  <div>
    <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="uid" label="用户编号" >
    </el-table-column>
    <el-table-column prop="nickname" label="昵称" >
    </el-table-column>
    <el-table-column label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="密码">
        <template slot-scope="scope">
          <span>{{ scope.row.password}}</span>
        </template>
      </el-table-column> -->
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
       
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqMemberUpdata} from '../../../utils/request';
import {successAlert,warningAlert} from '../../../utils/alert'
export default {
  props: ['info'],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list:'member/list',
    }),
  },
  methods: {
    ...mapActions({
      reqListAction:'member/reqListAction',
      
    }),
    edit(uid){
          this.$emit('edit',uid)
      }
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
</style>