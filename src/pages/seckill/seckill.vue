<template>
  <div>
        <el-button type='primary' @click="willAdd" class="box">添加</el-button>
        <v-list @edit='edit'></v-list>
        <v-add :info='info' ref="add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from './components/list';
import vAdd from './components/add';
export default {
  props: [],
  components: {
    vList,
    vAdd
  },
  data() {
    return {
        info:{
          //添加弹框的状态
        isshow:false,
        //添加和编辑的状态true添加，false编辑
        isAdd:true

        }
    };
  },
  computed: {
    ...mapGetters({
       
    }),
  },
  methods:{
    willAdd(){
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
.box{
  margin: 20px auto;
}
</style>