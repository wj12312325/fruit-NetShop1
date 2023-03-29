<template>
  <div>
    <el-card>
      <div class="header">
        <span>商品分类占比</span>
      </div>
      <div>
        <div class="echart" ref="echart"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import * as echarts from "echarts";
export default {
  name: "Category",
  props: ["category1List"],
  data() {
    return {
      categoryArray: [],
    };
  },
  async created() {
    this.getCategoryInfo();
  },
  mounted() {
    const echart = echarts.init(this.$refs.echart);
    echart.setOption({
      title: {
        text: this.categoryArray[0].name,
        subtext: this.categoryArray[0].value,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },

      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },

          labelLine: {
            show: true,
          },
          data: this.categoryArray,
        },
      ],
    });
    echart.on("mouseover", (params) => {
      const { value, name } = params.data;
      echart.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
  methods: {
    getCategoryInfo() {
      this.category1List.forEach((item) => {
        let a = {
          value: item.secondaryCategory.length,
          name: item.category_name,
        };
        this.categoryArray.push(a);
      });
    },
  },
  //   computed: {
  //     ...mapState({
  //     }),
  //   },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  height: 40px;
}

.radio {
  margin-top: -10px;
}
.echart {
  width: 100%;
  height: 300px;
}
</style>
