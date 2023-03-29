<template>
  <div class="order-container">
    <el-form inline class="search">
      <!-- 表单元素 -->

      <el-form-item>
        <el-input v-model="searchObj.order_number" placeholder="订单号" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.status" placeholder="订单状态">
          <el-option
            v-for="item in statusList"
            :key="item.status"
            :label="item.statusName"
            :value="item.status"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 查询与情况的按钮 -->
      <el-button
        type="primary"
        icon="el-icon-search"
        class="btn"
        @click="findOrder"
        >查询</el-button
      >
      <el-button type="info" class="btn" @click="resetSearch">清空</el-button>
    </el-form>

    <el-button
      type="danger"
      icon="el-icon-delete"
      class="deleteBtn"
      @click="deleteSelected"
      :disabled="multipleSelection.length <= 0"
      >删除已选</el-button
    >

    <el-table
      :data="orderList"
      border
      class="orderTable"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column
        prop="userInfo.name"
        label="用户名称"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单号"
        width="155"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goods_info.goods_img"
        label="商品信息（图片——名称——数量）"
        align="center"
        width="350"
      >
        <template slot-scope="{ row }">
          <div
            v-for="item in row.goods_info"
            :key="item.id"
            class="goodsInfoContainer"
          >
            <div>
              <el-carousel
                indicator-position="outside"
                arrow="never"
                height="120px"
                style="width: 120px; margin: 0 auto"
              >
                <el-carousel-item
                  v-for="(img, index) in item.goods_img"
                  :key="index"
                >
                  <img
                    :src="`http://localhost:8888/${img}`"
                    style="width: 120px; height: 120px"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="goodsInfoCSS">
              {{ item.goods_name }}
            </div>
            <div class="goodsInfoCSS">x{{ item.number }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="addressInfo.consignee"
        label="收货人"
        align="center"
        width="145"
      >
      </el-table-column>
      <el-table-column prop="total" label="金额(元)" align="center" width="90">
      </el-table-column>
      <el-table-column label="商品状态" prop="status" align="center" width="90">
        <template slot-scope="{ row }">
          <span>{{ orderStatus(row) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="order_remark" label="订单备注" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.order_remark == null || row.order_remark == ""
              ? "无"
              : `${row.order_remark}`
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设置" align="center" width="275">
        <template slot-scope="{ row }">
          <el-button
            icon="el-icon-edit"
            type="primary"
            plain
            :disabled="row.status >= 2"
            @click="updateOrderStatus(row)"
            >修改订单状态</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteOrder(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="修改订单状态"
      :visible.sync="dialogFormVisible"
      width="600px"
      :before-close="closeDialog"
    >
      <el-descriptions border :column="2">
        <el-descriptions-item label="用户名称">{{
          orderInfo.name
        }}</el-descriptions-item>
        <el-descriptions-item label="订单号">{{
          orderInfo.order_number
        }}</el-descriptions-item>
        <el-descriptions-item label="收货人">{{
          orderInfo.consignee
        }}</el-descriptions-item>
        <el-descriptions-item label="金额(元)">{{
          orderInfo.total
        }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">{{
          orderStatus(this.orderInfo)
        }}</el-descriptions-item>
        <el-descriptions-item label="订单备注">{{
          orderInfo.order_remark
        }}</el-descriptions-item>
      </el-descriptions>
      <div class="radio">
        <span>修改到</span>
        <el-radio v-model="orderInfo.newStatus" label="2" border
          >已发货</el-radio
        >
        <el-radio v-model="orderInfo.newStatus" label="3" border
          >已签收</el-radio
        >
        <el-radio v-model="orderInfo.newStatus" label="4" border>取消</el-radio>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="updateOrder">确 定</el-button>
      </div>
    </el-dialog>

    <div class="pagination">
      <el-pagination
        :current-page="pageNum"
        :pager-count="5"
        :page-sizes="[3, 5, 7]"
        :page-size="pageSize"
        layout=" prev, pager,  next, sizes,jumper,->,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getOrderList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Order",
  data() {
    return {
      user_id: 0,
      pageNum: 1,
      pageSize: 5,
      dialogFormVisible: false,
      searchObj: {
        order_number: "",
        status: null,
      },
      tempSearchObj: {
        order_number: "",
        status: null,
      },
      multipleSelection: [],
      statusList: [
        {
          status: 0,
          statusName: "未支付",
        },
        {
          status: 1,
          statusName: "已支付",
        },
        {
          status: 2,
          statusName: "已发货",
        },
        {
          status: 3,
          statusName: "已签收",
        },
        {
          status: 4,
          statusName: "取消",
        },
      ],
      orderInfo: {
        id: null,
        name: "",
        order_number: "",
        consignee: "",
        total: "",
        status: null,
        order_remark: "",
        newStatus: null,
        goods_info: [],
      },
    };
  },
  methods: {
    //获取订单列表
    async getOrderList(page = 1) {
      this.pageNum = page;
      const { pageNum, pageSize, user_id } = this;
      const { order_number, status } = this.tempSearchObj;
      let info = { pageSize, pageNum };
      if (user_id != 0) {
        Object.assign(info, { user_id });
      }
      order_number && Object.assign(info, { order_number });
      if (status !== null) {
        Object.assign(info, { status });
      }
      try {
        await this.$store.dispatch("order/getOrderList", info);

        this.$message({
          type: "success",
          message: "获取订单列表成功",
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
    },
    //查询订单
    findOrder() {
      const { order_number, status } = this.searchObj;
      this.tempSearchObj = {
        order_number,
        status,
      };
      this.getOrderList();
    },
    //清空搜索
    resetSearch() {
      this.searchObj = {
        order_number: "",
        status: null,
      };
      this.tempSearchObj = {
        order_number: "",
        status: null,
      };
      this.getOrderList();
    },
    //删除已选
    async deleteSelected() {
      let ids = [];
      for (let item of this.multipleSelection) {
        ids.push(item.id);
      }
      this.$confirm(
        `确定删除这 ${this.multipleSelection.length} 条订单吗?`,
        "提示",
        {
          type: "warning",
        }
      )
        .then(async () => {
          await this.$store.dispatch("order/deleteOrder", {
            ids,
          });
          await this.getOrderList(
            this.orderList.length === this.multipleSelection.length
              ? this.pageNum - 1
              : this.pageNum
          );
          this.$message({
            type: "success",
            message: "删除订单成功",
          });
        })
        .catch((error) => {
          if (error == "cancel") {
            this.$message.info("已取消删除");
          } else {
            this.$message({
              type: "error",
              message: error,
            });
          }
        });
    },
    //获取已选信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //切换每页个数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getOrderList();
    },
    //订单状态
    orderStatus(row) {
      switch (row.status) {
        case 0:
          return "未支付";
        case 1:
          return "已支付";
        case 2:
          return "已发货";
        case 3:
          return "已签收";
        case 4:
          return "取消";
      }
    },
    //关闭Dialog
    closeDialog() {
      this.dialogFormVisible = false;
      this.orderInfo.id = null;
      this.orderInfo.name = "";
      this.orderInfo.order_number = "";
      this.orderInfo.consignee = "";
      this.orderInfo.total = "";
      this.orderInfo.status = null;
      this.orderInfo.newStatus = null;
      this.orderInfo.order_remark = "";
      this.orderInfo.goods_info = [];

      this.$message({
        type: "info",
        message: "已取消",
      });
    },
    //修订商品数量
    async updateGoods(goods_info) {
      for (let item of goods_info) {
        let goods_num = 0;
        goods_num = item.goods_num + item.number * 1;

        let info = {
          id: item.id,
          goods_num,
        };
        try {
          await this.$store.dispatch("goods/updateGoods", info);
        } catch (error) {
          this.$message({
            type: "error",
            message: error,
          });
        }
      }
    },

    //修改订单状态
    updateOrderStatus(row) {
      this.dialogFormVisible = true;
      this.orderInfo.id = row.id;
      this.orderInfo.name = row.userInfo.name;
      this.orderInfo.order_number = row.order_number;
      this.orderInfo.consignee = row.addressInfo.consignee;
      this.orderInfo.total = row.total;
      this.orderInfo.status = row.status;
      this.orderInfo.newStatus = "2";
      this.orderInfo.goods_info = row.goods_info;
      this.orderInfo.order_remark =
        row.order_remark == null || row.order_remark == ""
          ? "无"
          : `${row.order_remark}`;
    },
    //确定修改订单状态
    async updateOrder() {
      if (this.orderInfo.status == 0) {
        if (this.orderInfo.newStatus == 2 || this.orderInfo.newStatus == 3) {
          this.$message({
            type: "error",
            message: "用户尚未支付，不能发货或签收",
          });
          this.dialogFormVisible = false;
          return;
        }
      }
      try {
        if (this.orderInfo.newStatus == 4) {
          this.updateGoods(this.orderInfo.goods_info);
        }
        let data = { status: this.orderInfo.newStatus * 1 };
        await this.$store.dispatch("order/updateOrder", {
          id: this.orderInfo.id,
          data,
        });
        this.getOrderList(this.pageNum);
        this.$message({
          type: "success",
          message: "修改订单状态成功",
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
      this.dialogFormVisible = false;
    },
    //删除订单
    async deleteOrder(row) {
      this.$confirm(
        `确定删除订单号为 '${row.order_number}' 这个订单吗?`,
        "提示",
        {
          type: "warning",
        }
      )
        .then(async () => {
          await this.$store.dispatch("order/deleteOrder", {
            ids: [row.id],
          });
          this.getOrderList(
            this.orderList.length === 1 ? this.pageNum - 1 : this.pageNum
          );
          this.$message({
            type: "success",
            message: "删除订单成功",
          });
        })
        .catch((error) => {
          if (error == "cancel") {
            this.$message.info("已取消删除");
          } else {
            this.$message({
              type: "error",
              message: error,
            });
          }
        });
    },
  },
  mounted() {
    if (this.$route.query.user_id) {
      this.user_id = this.$route.query.user_id * 1;
      this.getOrderList();
    } else {
      this.getOrderList();
    }
  },
  computed: {
    ...mapState({
      orderList: (state) => state.order.orderList,
      total: (state) => state.order.total,
    }),
  },
};
</script>

<style lang="less" scoped>
.order-container {
  .search {
    margin: 30px 40px;
    margin-left: 100px;

    width: 800px;
  }
  .addBtn {
    margin: 0 10px;
    margin-left: 100px;
    font-size: 18px;
  }
  .deleteBtn {
    margin: 0 10px;
    margin-left: 100px;

    font-size: 18px;
  }
  .orderTable {
    margin: 30px auto;
    width: 90%;

    .goodsInfoContainer {
      display: flex;
      justify-content: space-between;
      .goodsInfoCSS {
        height: 120px;
        line-height: 120px;
        color: #f56c6c;
        font-size: 16px;
        padding: 0 15px;
      }
    }
  }
  .radio {
    border: 1px dashed #ccc;
    height: 80px;
    line-height: 80px;
    position: relative;
    top: 20px;
    span {
      margin-right: 20px;
      color: #f56c6c;
      font-size: 16px;
      margin-left: 55px;
    }
  }
  .pagination {
    width: 660px;
    margin: 30px auto;
  }
}
</style>

<style>
.area-select .area-selected-trigger {
  position: relative;
  top: -4px;
  padding: 0 20px;
}
</style>
