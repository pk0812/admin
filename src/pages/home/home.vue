<template>
  <div>
    <h2>首页管理</h2>
    <div id="main" class="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          var myChart = echarts.init(document.getElementById("main"));
        var option = {
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["下级分类数量"],
            },
            xAxis: {
              data: this.list.map(item=>item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "下级分类数量",
                type: "line",
                data: this.list.map(item=>item.children.length),
              },
            ],
          };
          myChart.setOption(option);
        }
      },
      deep:true,
    },
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqListAction",
    }),
  },
  mounted() {
    this.reqList();
  },
};
</script>
<style scoped>
.box {
  width: 80%x;
  height: 500px;
  border: 1px solid mediumaquamarine;
}
</style>