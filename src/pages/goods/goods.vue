<template>
  <div>
    <el-button type='primary' @click="willAdd" class="box">添加</el-button>
    <!-- 列表 -->
    <v-list @edit='edit '></v-list>
    <!-- 组件添加 -->
    <v-add :info='info' ref="add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from './componnents/list';
import vAdd from './componnents/add'
export default {
  props: [],
  components: {
    vList,vAdd
  },
  data() {
    return {
      info:{
        isshow:false,
        isAdd:true
      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods:{
        willAdd(){
        this.info.isshow=true;
        this.info.isAdd=true;
      },
      // 编辑
      edit(id){
        this.info.isshow=true;
        this.info.isAdd=false;
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