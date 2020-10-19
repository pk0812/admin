<template>
  <div>
      <v-list @edit="edit"></v-list>
      <u-pdata :info='info' ref="detail"></u-pdata>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from './components/list'
import uPdata from './components/updata'
export default {
  props: [],
  components: {
    vList,
    uPdata
  },
  data() {
    return {
      info:{
        isshow:false,
        
      }
    };
  },
  methods:{
      edit(uid){
        this.info.isshow=true;
        this.$refs.detail.look(uid);
        
      }
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    // console.log(this.info.isshow);
  },
};
</script>
<style scoped>
</style>