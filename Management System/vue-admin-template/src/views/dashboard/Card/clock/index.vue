<template>
  <div id="main" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Clock",
  props: ["orderList"],
  data() {
    return {
      todaySales: 0,
      yesterdaySales: 0,
      beforeYesterdaySales: 0,
      orderArray: [],
    };
  },
  created() {
    this.getOrderInfo();
  },
  async mounted() {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      yAxis: {
        type: "category",
        data: ["今天", "昨天", "前天"],
        axisTick: {
          show: false,
        },
      },
      xAxis: {
        type: "value",
        show: true,
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          data: this.orderArray,
          type: "bar",
          itemStyle: {
            color: function (params) {
              var colorList = ["#ce5a57", "#78a5a3", "#e1b16a"];
              return colorList[params.dataIndex];
            },
          },
        },
      ],
      grid: {
        left: 35,
        top: 0,
        right: 10,
        bottom: 0,
        height: 60,
      },
    };

    option && myChart.setOption(option);
  },
  methods: {
    getOrderInfo() {
      let today = Date.now();
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      var dayBeforeYesterday = new Date();
      dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
      for (let item of this.orderList) {
        if (item.status != 0 && item.status != 4) {
          this.totalSales += item.total * 1;
          if (
            this.dayjs(item.createdAt).format("YYYY-MM-DD") ==
            this.dayjs(today).format("YYYY-MM-DD")
          ) {
            this.todaySales += item.total * 1;
          }
          if (
            this.dayjs(item.createdAt).format("YYYY-MM-DD") ==
            this.dayjs(yesterday).format("YYYY-MM-DD")
          ) {
            this.yesterdaySales += item.total * 1;
          }
          if (
            this.dayjs(item.createdAt).format("YYYY-MM-DD") ==
            this.dayjs(dayBeforeYesterday).format("YYYY-MM-DD")
          ) {
            this.beforeYesterdaySales += item.total * 1;
          }
        }
      }
      this.orderArray = [
        this.todaySales,
        this.yesterdaySales,
        this.beforeYesterdaySales,
      ];
    },
  },
};
</script>

<style scoped></style>
