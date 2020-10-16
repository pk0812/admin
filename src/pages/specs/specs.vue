<template>
  <div>
    <el-button type='primary' @click="willAdd" class="box">添加</el-button>
    <!-- 表格 -->
    <v-list @edit='edit'></v-list>
    <!-- 添加组件 -->
    <v-add :info='info' ref="add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from './components/list';
import vAdd from './components/add'
export default {
  props: [],
  components: {
      vList,
      vAdd,
  },
  data() {
    return {
        // 把数据传给add
        info:{
            // 添加弹框状态
            isshow:false,
            // 添加是true，编辑是false
            isAdd:true
        }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods:{
      ...mapActions({}),
    //   点击添加
    willAdd(){
        this.info.isshow=true;
        this.info.isAdd=true
    },
    // 编辑
    edit(id){
        this.info.isshow=true;
        this.info.isAdd=false;
        // 让组件发起获取详情请求
        this.$refs.add.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
.box{
  margin: 20px auto;
}
</style>