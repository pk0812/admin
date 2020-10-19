<template>
  <div>
   <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="id" label="编号" sortable width="180">
    </el-table-column>
    <el-table-column prop="title" label="轮播图标题" sortable width="180">
    </el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
        <img v-if="scope.row.img!=''" :src="scope.row.img" alt="">
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
       <del-btn @confirm='dele(scope.row.id)'></del-btn>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqBannerDel} from '../../../utils/request';
import {successAlert,warningAlert} from '../../../utils/alert';
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list:'banner/list',
    }),

  },

  methods: {
    ...mapActions({reqListAction:'banner/reqListAction'}),
    // 编辑
    edit(id){
      this.$emit('edit',id);
    },
    // 删除
    dele(id){
        reqBannerDel(id).then(res=>{
          if(res.data.code==200){
            successAlert(res.data.msg);
            this.reqListAction();
          }else{
            warningAlert(res.data.msg)
          }
        })
    }
  },
  mounted() {
        this.reqListAction();
        // console.log(this.list);
  },
};
</script>
<style scoped>
  img{
    width: 80px;
    height: 80px;
  }
</style>