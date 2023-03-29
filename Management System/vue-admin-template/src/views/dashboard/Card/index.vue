<template>
  <div style="margin-bottom: 50px">
    <el-row>
      <el-col :span="6">
        <el-card>
          <Detail
            title="商城总销售额(元)"
            :count="`￥ ${this.totalSales.toFixed(2)}`"
          >
            <template slot="charts">
              <Clock :orderList="orderList" v-if="orderList.length > 0"></Clock>
            </template>
            <template slot="footer">
              <span
                >今日销售额(元)：<span class="spanCss"
                  >￥{{ daySales.toFixed(2) }}</span
                ></span
              >
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="订单总数量(个)" :count="`${this.orderTotal}`">
            <template slot="charts">
              <LineChart
                :orderList="orderList"
                v-if="orderList.length > 0"
              ></LineChart>
            </template>
            <template slot="footer">
              <span
                >今日订单数(个)：<span class="spanCss">{{
                  dayOrderNum
                }}</span></span
              >
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="用户数量(人)" :count="`${this.userTotal}`">
            <template slot="charts">
              <BarChart
                :userList="userList"
                v-if="userList.length > 0"
              ></BarChart>
            </template>
            <template slot="footer">
              <span
                >商城用户人数(人)：<span class="spanCss">{{
                  userNum
                }}</span></span
              >
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="商城运营利率" count="68%">
            <template slot="charts">
              <ProgressChart></ProgressChart>
            </template>
            <template slot="footer">
              <span>周同比<span class="spanCss">12% </span></span>
              &nbsp;
              <i class="el-icon-s-flag" style="color: red"></i>
              &nbsp;
              <span style="margin-left: 20px"
                >日同比<span class="spanCss">6% </span></span
              >
              &nbsp;
              <i class="el-icon-s-flag" style="color: blue"></i>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Detail from "./Detail";
import LineChart from "./lineChart";
import Clock from "./clock";
import BarChart from "./barChart";
import ProgressChart from "./progressChart";
export default {
  name: "Card",
  components: { Detail, LineChart, BarChart, ProgressChart, Clock },
  data() {
    return {
      totalSales: 0,
      daySales: 0,
      dayOrderNum: 0,
      userNum: 0,
    };
  },
  methods: {
    //获取订单信息
    async getOrderList() {
      let info = { pageSize: 100000, pageNum: 1 };

      try {
        await this.$store.dispatch("order/getOrderList", info);
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
    },
    getOrderInfo() {
      let date = Date.now();
      for (let item of this.orderList) {
        if (item.status != 0 && item.status != 4) {
          this.totalSales += item.total * 1;
          if (
            this.dayjs(item.createdAt).format("YYYY-MM-DD") ==
            this.dayjs(date).format("YYYY-MM-DD")
          ) {
            this.daySales += item.total * 1;
            this.dayOrderNum++;
          }
        }
      }
    },
    //获取用户列表
    async getUserList() {
      let info = { pageSize: 100000, pageNum: 1 };
      try {
        await this.$store.dispatch("user/getUserList", info);
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
    },
    getuserInfo() {
      this.userList.forEach((element) => {
        if (element.role == 0) {
          this.userNum++;
        }
      });
    },
  },

  async mounted() {
    await this.getOrderList();
    await this.getUserList();
    this.getOrderInfo();
    this.getuserInfo();
  },
  computed: {
    ...mapState({
      orderList: (state) => state.order.orderList,
      orderTotal: (state) => state.order.total,
      userList: (state) => state.user.userList,
      userTotal: (state) => state.user.total,
    }),
  },
};
</script>

<style scoped>
.spanCss {
  margin-left: 15px;
  color: #f56c6c;
  font-weight: bold;
  font-size: 18px;
}
</style>
