<template>
  <div class="charts" ref="echarts"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "LineChart",
  props: ["orderList"],
  data() {
    return {
      orderStatus0Num: 0,
      orderStatus1Num: 0,
      orderStatus2Num: 0,
      orderStatus3Num: 0,
      orderStatus4Num: 0,
      orderStatusArray: [],
    };
  },
  created() {
    this.getOrderInfo();
  },
  async mounted() {
    let LineCharts = echarts.init(this.$refs.echarts);
    LineCharts.setOption({
      xAxis: {
        show: true,
        type: "category",
        data: ["未支付", "已支付", "已发货", "已签收", "取消"],
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
          type: "line",
          data: this.orderStatusArray,
          itemStyle: {
            opacity: 0,
          },
          smooth: true,
          lineStyle: {
            color: "purple",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      grid: {
        left: 30,
        top: 0,
        right: 10,
        bottom: 0,
        height: 60,
      },
      tooltip: {},
    });
  },
  methods: {
    //获取订单信息
    getOrderInfo() {
      for (let item of this.orderList) {
        switch (item.status) {
          case 0:
            this.orderStatus0Num++;
            break;
          case 1:
            this.orderStatus1Num++;
            break;
          case 2:
            this.orderStatus2Num++;
            break;
          case 3:
            this.orderStatus3Num++;
            break;
          case 4:
            this.orderStatus4Num++;
            break;
        }
      }
      this.orderStatusArray = [
        this.orderStatus0Num,
        this.orderStatus1Num,
        this.orderStatus2Num,
        this.orderStatus3Num,
        this.orderStatus4Num,
      ];
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
