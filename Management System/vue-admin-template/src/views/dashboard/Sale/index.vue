<template>
  <el-card class="box-card" sytle="margin:10px 0 ">
    <div slot="header" class="clearfix">
      <!-- @tab-click="handleClick" -->
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="商品库存" name="num"></el-tab-pane>
        <el-tab-pane label="商品单价" name="price"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">今年</span>
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          style="width: 250px; margin: 0 20px"
          v-model="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row>
        <el-col :span="17">
          <div class="chart" ref="chart"></div>
        </el-col>
        <el-col :span="7">
          <Category
            :category1List="category1List"
            v-if="category1List.length > 0"
          ></Category>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import Category from "./Category";

import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Sale",
  components: { Category },
  data() {
    return {
      activeName: "num",
      echarts: null,
      goods_nameArray: [],
      goods_numArray: [],
      goods_priceArray: [],
      date: [],
    };
  },
  async created() {
    await this.getGoodsList();
    await this.getCategoryList();

    this.getGoodsInfo();
  },
  mounted() {
    this.echarts = echarts.init(this.$refs.chart);
    this.echarts.setOption({
      title: {
        text: "商品库存",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.goods_nameArray,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "50%",
          data: this.goods_numArray,
        },
      ],
    });
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goods.goodsList,
      category1List: (state) => state.category.category1List || [],
    }),
    title() {
      return this.activeName == "num" ? "商品库存" : "商品单价";
    },
  },
  watch: {
    title() {
      this.echarts.setOption({
        title: {
          text: this.title,
        },
        xAxis: [
          {
            data: this.goods_nameArray,
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "50%",
            data:
              this.title == "商品库存"
                ? this.goods_numArray
                : this.goods_priceArray,
          },
        ],
      });
    },
    goods_numArray() {
      this.echarts.setOption({
        xAxis: [
          {
            data: this.goods_nameArray,
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "50%",
            data: this.goods_numArray,
          },
        ],
      });
    },
  },
  methods: {
    //今日
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    //本周
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //本月
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //今年
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //获取商品列表
    async getGoodsList() {
      let info = { pageSize: 12, pageNum: 1 };
      try {
        await this.$store.dispatch("goods/getGoodsList", info);
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
    },
    getGoodsInfo() {
      this.goodsList.forEach((item) => {
        this.goods_nameArray.push(item.goods_name.slice(0, 5));
        this.goods_numArray.push(item.goods_num);
        this.goods_priceArray.push(item.goods_price * 1);
      });
    },
    //获取商品类型列表
    async getCategoryList() {
      try {
        await this.$store.dispatch("category/getCategoryList");
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
    },
  },
};
</script>

<style scoped>
::v-deep .el-card__header {
  border-bottom: none;
}

.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.tab {
  width: 100%;
}

.right {
  position: absolute;
  right: 0;
}

.right span {
  margin: 0 10px;
}

.chart {
  width: 100%;
  height: 300px;
}

ul li {
  list-style: none;
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
}

li div {
  display: flex;
}

li div span:nth-child(1) {
  margin-right: 25px;
  display: block;
  height: 18px;
  width: 18px;
  text-align: center;
}

.SpanBlack {
  background-color: black;
  color: white;
  border-radius: 50%;
}
</style>
