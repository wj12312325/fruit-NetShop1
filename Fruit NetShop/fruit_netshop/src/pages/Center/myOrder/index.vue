<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%" class="th1">商品</th>
              <th width="30%" class="th2">订单详情</th>
              <th width="12%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table class="order-item" v-for="order in orderList" :key="order.id">
          <thead>
            <tr>
              <th colspan="5" @click="toPay(order)">
                <span class="ordertitle"
                  >{{
                    orderDate(order.createdAt)
                  }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单编号：{{
                    order.order_number
                  }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart, index) in order.goods_info" :key="cart.id">
              <td width="59%" @click="toPay(order)">
                <div class="typographic">
                  <img
                    :src="`http://localhost:8888/${cart.goods_img[0]}`"
                    style="height: 100px; width: 100px"
                  />

                  <a class="block-text">{{ cart.goods_name }}</a>
                  <span class="number">x{{ cart.number }}</span>
                </div>
              </td>
              <td
                :rowspan="order.goods_info.length"
                v-show="index == 0"
                width="9%"
                class="center"
                @click="toPay(order)"
              >
                {{ order.addressInfo.consignee }}
              </td>
              <td
                :rowspan="order.goods_info.length"
                v-show="index == 0"
                width="11%"
                class="center"
              >
                <ul class="unstyled">
                  <li @click="toPay(order)">¥{{ order.total }}</li>
                </ul>
              </td>
              <td
                :rowspan="order.goods_info.length"
                v-show="index == 0"
                width="10%"
                class="center"
              >
                <a @click="toPay(order)" class="btn"
                  >{{ orderStatus(order.status) }}
                </a>
              </td>
              <td
                :rowspan="order.goods_info.length"
                v-show="index == 0"
                width="13%"
                class="center"
              >
                <div style="margin-bottom: 10px">
                  <el-button
                    type="primary"
                    @click="cancelOrder(order)"
                    :disabled="order.status == 4"
                    >取消订单</el-button
                  >
                </div>
                <div class="deletedBtn">
                  <el-popconfirm
                    title="确定要删除吗？"
                    @confirm="deleteOrder(order)"
                  >
                    <el-button slot="reference" type="danger"
                      >删除订单</el-button
                    >
                  </el-popconfirm>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 分页器 -->
      <div class="pagination">
        <div>
          <el-pagination
            :current-page="pageNum"
            :page-sizes="[3, 5, 10]"
            :page-size="pageSize"
            layout=" prev, pager,  next, sizes,jumper,->,total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'myOrder',
  data() {
    return {
      pageNum: 1,
      pageSize: 3
    }
  },
  methods: {
    //获取我的订单数据
    async getMyOrderList() {
      const status = this.$route.params.status
      const { pageNum, pageSize } = this
      let paramsData = { pageNum, pageSize }
      if (status !== undefined) {
        paramsData = { pageNum, pageSize, status }
      }
      await this.$store.dispatch('order/getOrderList', paramsData)
    },
    //切换分页数
    handleSizeChange(val) {
      this.pageSize = val
      this.getMyOrderList()
    },
    //切换页面
    handleCurrentChange(val) {
      this.pageNum = val
      this.getMyOrderList()
    },
    //商品的状态
    orderStatus(status) {
      switch (status) {
        case 0:
          return '未支付'
        case 1:
          return '已支付'
        case 2:
          return '已发货'
        case 3:
          return '已签收'
        case 4:
          return '取消'
      }
    },
    //购物车创建时间
    orderDate(date) {
      return this.dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    },
    //删除订单
    deleteOrder(order) {
      if (order.status == 1 || order.status == 2) {
        this.$message({
          type: 'warning',
          message: '订单正在发货或在运输途中，无法删除该订单'
        })
        return
      }
      try {
        let data = {
          ids: [order.id]
        }
        this.$store.dispatch('order/deleteOrder', data)
        this.pageNum = 1
        this.getMyOrderList()
        this.$message({
          type: 'success',
          message: '删除订单成功'
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },
    //去支付
    toPay(order) {
      if (order.status == 0) {
        this.$router.push(`/pay?orderId=${order.id}&&totalFee=${order.total}`)
      } else {
        return
      }
    },

    //修订商品数量
    async updateGoods(goods_info) {
      for (let item of goods_info) {
        let goods_num = 0
        goods_num = item.goods_num + item.number * 1

        let info = {
          id: item.id,
          goods_num
        }
        try {
          await this.$store.dispatch('goods/updateGoods', info)
        } catch (error) {
          this.$message({
            type: 'error',
            message: error
          })
        }
      }
    },
    //取消订单
    cancelOrder(order) {
      this.$confirm(
        `确定取消订单号'${order.order_number}'这个订单吗?`,
        '提示',
        {
          type: 'warning'
        }
      )
        .then(async () => {
          let datainfo = {
            id: order.id,
            data: {
              status: 4
            }
          }
          await this.$store.dispatch('order/updateOrder', datainfo)
          this.$message({
            type: 'success',
            message: '取消订单成功'
          })
          this.updateGoods(order.goods_info)
          this.getMyOrderList()
        })
        .catch((error) => {
          if (error == 'cancel') {
            this.$message.info('已取消')
          } else {
            this.$message({
              type: 'error',
              message: error
            })
          }
        })
    }
  },
  mounted() {
    this.getMyOrderList()
  },
  computed: {
    ...mapState({
      orderList: (state) => state.order.orderList || [],
      total: (state) => state.order.total || null
    })
  }
}
</script>

<style lang="less" scoped>
//右边
.order-right {
  float: right;
  width: 83.33%;

  //订单部分
  .order-content {
    margin: 0 20px;
    color: #666;

    //标题
    .title {
      margin-bottom: 22px;
      border: 1px solid #ddd;
      background-color: #f1f1f1;
      border-radius: 10px;

      h3 {
        padding: 12px 10px;
        font-size: 18px;
        letter-spacing: 2px;
        margin-left: 10px;
      }
    }

    //表头
    .chosetype {
      margin-bottom: 15px;
      color: #666;
      border-radius: 20px;

      table {
        border: 1px solid #e6e6e6;
        border-radius: 20px;

        border-collapse: separate;
        border-radius: 2px;
        width: 100%;
        max-width: 100%;
        border-spacing: 0;

        th {
          padding: 6px 8px;
          color: #666;
          font-weight: 700;
          vertical-align: bottom;
          background-color: #f4f4f4;

          line-height: 18px;
          border-bottom: 1px solid #e6e6e6;
          font-size: 16px;
          letter-spacing: 2px;
          text-align: left;
          cursor: pointer;
        }
        .th1 {
          text-align: center;
        }
        .th2 {
          text-align: center;
        }
      }
    }

    // 表单内容
    .orders {
      font-size: 12px;
      .ordertitle {
        font-size: 14px;
        margin-right: 10px;
        text-align: center;
      }

      .block-text {
        margin-top: 40px;
        margin-left: 20px;
      }
      a {
        cursor: pointer;
        text-decoration: none;
        font-size: 18px;
        &:hover {
          color: #4cb9fc;
        }
      }

      table {
        border: 1px solid #e6e6e6;
        border-collapse: collapse;
        border-radius: 2px;
        width: 100%;
        margin-bottom: 18px;
        max-width: 100%;

        th {
          padding: 6px 8px;
          line-height: 18px;
          text-align: left;
          vertical-align: bottom;
          background-color: #f4f4f4;
          font-size: 12px;
          color: #666;

          .pull-right {
            float: right;
            cursor: pointer;

            img {
              margin-right: 10px;
              width: 20px;
              vertical-align: middle;
            }
          }
        }

        td {
          font-size: 12px;
          color: #666;
          padding: 6px 8px;
          line-height: 18px;
          text-align: left;
          vertical-align: middle;
          border: 1px solid #e6e6e6;

          &.center {
            text-align: center;
            font-size: 16px;
          }

          .typographic {
            img {
              float: left;
              margin: 10px;
            }

            a {
              float: left;
              min-width: 80px;
              max-width: 250px;
              color: #ca2921;

              &:hover {
                color: #28a3ef;
              }
            }

            span {
              float: left;
              min-width: 80px;
              max-width: 250px;
              text-align: center;
            }

            .number {
              letter-spacing: 3px;
              margin-left: 60px;
              margin-top: 40px;
              font-size: 18px;
            }
          }
        }
      }
    }
  }
  .pagination {
    width: 800px;
    margin: 30px auto;
    min-width: 800px;
    div {
      width: 600px;
      margin: 0 auto;
    }
  }
}
</style>
