<template>
  <div>
      <!-- 添加 -->
    <el-button type='primary' @click="willadd" class="add">添加</el-button>
      <!-- 列表 -->
    <v-list @edit='edit'></v-list>
      <!-- 添加组件 -->
     <v-add :info='info' ref="add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from './components/list'
import vAdd from './components/add'
export default {
  props: [],
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      //传给add数据
      info:{
        //添加弹框的状态
        isshow:false,
        //添加和编辑的状态true添加，false编辑
        isAdd:true

      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods:{
    //添加按钮
    willadd(){
        this.info.isshow=true;
        this.info.isAdd=true;
    },
    //编辑
    edit(id){
      this.info.isshow=true;
      this.info.isAdd=false;
      //让add组件发起获取详情请求
      this.$refs.add.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
.add{
  margin: 20px auto;
}
</style>