<template>
  <div class="charts" ref="echarts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "BarChart",
  data() {
    return {
      userArray: [],
      user1: 0,
      user2: 0,
      user3: 0,
    };
  },
  props: ["userList"],
  created() {
    this.getUserInfo();
  },
  mounted() {
    let LineCharts = echarts.init(this.$refs.echarts);
    LineCharts.setOption({
      xAxis: {
        show: true,
        type: "category",
        data: ["用户", "商家", "管理员"],
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        show: true,
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          type: "bar",
          data: this.userArray,
        },
      ],
      grid: {
        left: 40,
        top: 5,
        right: 20,
        bottom: 20,
      },
      tooltip: {},
    });
  },
  methods: {
    getUserInfo() {
      this.userList.forEach((e) => {
        if (e.role == 0) {
          this.user1++;
        } else if (e.role == 1) {
          this.user2++;
        } else {
          this.user3++;
        }
      });
      this.userArray = [this.user1, this.user2, this.user3];
    },
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
