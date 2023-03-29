<template>
  <div class="cart">
    <div class="a">
      <div class="b">
        <h4>全部商品</h4>
        <div class="cart-main">
          <div class="cart-th">
            <div class="cart-th1">全部</div>
            <div class="cart-th2">商品</div>
            <div class="cart-th3">单价（元）</div>
            <div class="cart-th4">数量</div>
            <div class="cart-th5">总计（元）</div>
            <div class="cart-th6">操作</div>
          </div>
          <div class="cart-body">
            <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
              <li class="cart-list-con1">
                <input
                  type="checkbox"
                  name="chk_list"
                  :checked="cart.selected == true"
                  @change="changeIsChecked(cart, $event)"
                />
              </li>
              <li class="cart-list-con2">
                <img
                  :src="`http://localhost:8888/${cart.goods_info.goods_img[0]}`"
                />
                <div class="item-msg">{{ cart.goods_info.goods_name }}</div>
              </li>

              <li class="cart-list-con4">
                <span class="price">{{ cart.goods_info.goods_price }}</span>
              </li>
              <li class="cart-list-con5">
                <el-input-number
                  ref="as"
                  :min="1"
                  :max="cart.goods_info.goods_num"
                  class="number"
                  size="small"
                  v-model="cart.number"
                  @change="handleChange(cart.id, $event)"
                ></el-input-number>
              </li>
              <li class="cart-list-con6">
                <span class="sum">{{ skuAllPrice(cart) }}</span>
              </li>
              <li class="cart-list-con7" @click="deleteCartList(cart)">
                <a class="sindelet">删除</a>
                <br />
              </li>
            </ul>
          </div>
        </div>
        <img
          src="./images/notCart.png"
          class="notCart"
          v-show="cartList.length <= 0"
        />
        <div class="cart-tool" v-show="cartList.length > 0">
          <div class="select-all">
            <input
              class="chooseAll"
              type="checkbox"
              :checked="isAllChecked && cartList.length > 0"
              @change="changeAllcartIsChecked"
            />
            <span>全选</span>
          </div>
          <div class="option">
            <a @click="deleteAllIsChecked">删除选中的商品</a>
          </div>
          <div class="money-box">
            <div class="chosed">
              已选择<span>{{ selectedNum }}</span
              >件商品
            </div>
            <div class="sumprice">
              <div>总价（元） ：</div>
              <div class="summoney">{{ selectedAllMoney }}</div>
            </div>
            <div class="sumbtn" @click="toTrade">
              <a class="sum-btn">结算</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import throttle from 'lodash/throttle'

export default {
  name: 'ShopCart',
  data() {
    return {}
  },
  mounted() {
    this.getShopCartData()
    this.$message({
      type: 'success',
      message: '获取购物车列表成功'
    })
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path.indexOf('/login') !== -1) {
        let pageSize = 100
        let pageNum = 1
        vm.$nextTick(() => {
          let id = localStorage.getItem('ID')
          try {
            vm.$store.dispatch('cart/getCartList', {
              id,
              pageSize,
              pageNum
            })
          } catch (error) {}
        })
      }
    })
  },
  methods: {
    //获取购物车数据
    async getShopCartData() {
      const { id } = this
      let pageSize = 100
      let pageNum = 1
      try {
        await this.$store.dispatch('cart/getCartList', {
          id,
          pageSize,
          pageNum
        })
      } catch (error) {}
    },
    //计算每种商品的总价格
    skuAllPrice(cart) {
      return (cart.number * cart.goods_info.goods_price).toFixed(2)
    },
    //节流+更新商品数量
    handleChange: throttle(async function (id, value) {
      try {
        await this.$store.dispatch('cart/updateCart', {
          id: id,
          number: value
        })
        this.$message({
          type: 'success',
          message: '购物车数量修改成功'
        })
        this.getShopCartData()
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    }, 2000),
    //删除购物车产品
    async deleteCartList(cart) {
      let ids = []
      ids.push(cart.id)
      let data = { ids }

      this.$confirm(
        `确定删除 '${cart.goods_info.goods_name}'这个购物车吗?`,
        '提示',
        {
          type: 'warning'
        }
      )
        .then(async () => {
          await this.$store.dispatch('cart/deleteCart', data),
            this.getShopCartData()
          this.$message({
            type: 'success',
            message: '删除购物车成功'
          })
        })
        .catch((error) => {
          if (error == 'cancel') {
            this.$message.info('已取消删除')
          } else {
            this.$message({
              type: 'error',
              message: error
            })
          }
        })
    },
    // 修改购物车产品勾选状态
    changeIsChecked: throttle(async function (cart, event) {
      let selectd = event.target.checked ? true : false

      try {
        await this.$store.dispatch('cart/updateCart', {
          id: cart.id,
          selected: selectd
        })
        this.$message({
          type: 'success',
          message: '购物车状态修改成功'
        })
        this.getShopCartData()
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    }, 2000),
    //修改全部勾选产品的状态
    async changeAllcartIsChecked(event) {
      try {
        let selectState = event.target.checked ? true : false
        await this.$store.dispatch('cart/selectAllorNull', { selectState })
        this.getShopCartData()
        let message = selectState ? '购物车全选成功' : '购物车全取消成功'
        this.$message({
          type: 'success',
          message
        })
        this.getShopCartData()
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },
    //删除全部勾选的产品
    async deleteAllIsChecked() {
      let ids = []
      for (let item of this.cartList) {
        if (item.selected) {
          ids.push(item.id)
        }
      }
      let data = { ids }

      this.$confirm(`确定删除这'${ids.length}' 条购物车吗?`, '提示', {
        type: 'warning'
      })
        .then(async () => {
          await this.$store.dispatch('cart/deleteCart', data),
            this.getShopCartData()
          this.$message({
            type: 'success',
            message: '删除购物车成功'
          })
        })
        .catch((error) => {
          if (error == 'cancel') {
            this.$message.info('已取消删除')
          } else {
            this.$message({
              type: 'error',
              message: error
            })
          }
        })
    },
    //设置默认
    async setDefault(row) {
      try {
        await this.$store.dispatch('address/updateAddress', {
          id: row.id,
          data: { is_default: true }
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },

    //去结算
    async toTrade() {
      await this.$store.dispatch('address/getAddressList', {
        pageNum: 1,
        pageSize: 10000,
        user_id: this.id
      })
      if (this.addressList.length < 1) {
        this.$message({
          type: 'warning',
          message: '还没有收货地址，请先添加收货地址'
        })
        this.$router.push('/center/myaddress')
      } else if (
        this.addressList.length == 1 &&
        this.addressList[0].is_default == false
      ) {
        this.setDefault(this.addressList[0])
        this.$router.push('/trade')
      } else {
        this.$router.push('/trade')
      }
    }
  },
  computed: {
    ...mapState({
      id: (state) => state.user.userInfo.id,
      cartList: (state) => state.cart.cartList || [],
      addressList: (state) => state.address.addressList || []
    }),
    //计算全选
    isAllChecked() {
      return this.cartList.every((item) => item.selected == true)
    },
    //计算已选商品个数
    selectedNum() {
      let all = 0
      this.cartList.forEach((item) => {
        if (item.selected) {
          all++
        }
      })
      return all
    },
    //计算全部商品的总价之和
    selectedAllMoney() {
      let sum = 0
      this.cartList.forEach((item) => {
        if (item.selected) {
          sum = sum + item.number * item.goods_info.goods_price
        }
      })
      return sum.toFixed(2)
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 100%;
  margin-bottom: 50px;
  // height: 500px;

  .a {
    width: 1500px;
    min-width: 1500px;
    // height: 500px;
    margin: 0 auto;
    .b {
      margin-left: 150px;
      width: 1200px;

      .notCart {
        width: 600px;
        margin-left: 300px;
        margin-bottom: 50px;
      }

      h4 {
        margin: 15px 0;
        font-size: 20px;
        line-height: 21px;
        letter-spacing: 2px;
      }

      .cart-main {
        font-size: 16px;
        letter-spacing: 2px;
        .cart-th {
          background: #f5f5f5;
          border: 1px solid #ddd;
          padding: 10px;
          overflow: hidden;

          & > div {
            float: left;
          }

          .cart-th1 {
            width: 250px;

            input {
              vertical-align: middle;
            }

            span {
              vertical-align: middle;
            }
          }

          .cart-th2 {
            width: 280px;
          }

          .cart-th3 {
            width: 200px;
          }
          .cart-th4 {
            width: 160px;
          }
          .cart-th5 {
            width: 200px;
          }
          .cart-th6 {
            width: 80px;
          }
        }

        .cart-body {
          margin: 15px 0;
          border: 1px dashed #ddd;
          // border: 1px dashed red;

          .cart-list {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            overflow: hidden;

            & > li {
              float: left;
            }

            .cart-list-con1 {
              width: 15%;
              margin-top: 35px;
              input {
                width: 18px;
                height: 18px;
              }
            }

            .cart-list-con2 {
              width: 360px;

              img {
                width: 85px;
                height: 85px;
                float: left;
                transition: all 0.5s;
                &:hover {
                  transform: scale(1.1);
                  -ms-transform: scale(1.1);
                  -webkit-transform: scale(1.1);
                  -o-transform: scale(1.1);
                  -moz-transform: scale(1.1);
                }
              }

              .item-msg {
                float: left;
                width: 150px;
                margin: 0 10px;
                line-height: 18px;
                margin-top: 28px;
                margin-left: 20px;
                font-size: 18px;

                &:hover {
                  color: green;
                }
              }
            }

            .cart-list-con4 {
              width: 140px;
              font-size: 20px;
              margin-top: 25px;
              color: #c81623;
              font-weight: bold;
              transition: all 0.5s;

              &:hover {
                margin-top: 28px;

                font-size: 22px;
              }
            }

            .cart-list-con5 {
              width: 210px;
              margin-top: 20px;
            }

            .cart-list-con6 {
              margin-top: 23px;
              width: 160px;

              .sum {
                font-size: 20px;
                font-weight: bold;
                color: #c81623;
                transition: all 0.5s;
                &:hover {
                  font-size: 22px;
                  margin-top: 18px;
                }
              }
            }

            .cart-list-con7 {
              text-align: center;
              width: 120px;
              height: 35px;
              line-height: 35px;
              background-color: #c81623;
              margin-top: 18px;
              border-radius: 10px;
              transition: all 0.5s;
              font-weight: bold;

              &:hover {
                background-color: #91d43e;
                font-size: 18px;
              }

              .sindelet {
                cursor: pointer;
                text-decoration: none;
                color: white;
                letter-spacing: 3px;
              }
            }
          }
        }
      }

      .cart-tool {
        height: 60px;
        overflow: hidden;
        border: 1px solid #ddd;
        display: flex;
        align-items: center;
        .select-all {
          padding: 10px;
          overflow: hidden;

          span {
            font-size: 16px;
            font-weight: bold;
            margin-left: 15px;
            vertical-align: middle;
            &:hover {
              color: green;
            }
          }

          input {
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }
        }

        .option {
          padding: 10px;
          overflow: hidden;

          a {
            font-size: 16px;
            text-decoration: none;
            padding: 0 10px;
            color: #666;
            margin-left: 20px;
            &:hover {
              color: red;
            }
          }
        }

        .money-box {
          margin-left: 320px;
          width: 610px;
          display: flex;
          height: 50px;
          align-items: center;
          .chosed {
            font-size: 16px;
            line-height: 50px;

            padding: 0 10px;
            span {
              color: red;
              font-size: 18px;
              margin: 0 10px;
            }
          }

          .sumprice {
            width: 220px;
            height: 50px;
            font-size: 16px;
            line-height: 50px;
            padding: 0 10px;
            margin-left: 20px;
            margin-top: 2px;
            display: flex;

            .summoney {
              margin-left: 1px;
              color: #c81623;
              height: 50px;
              line-height: 50px;
              font-size: 24px;
              font-weight: bold;
              transition: all 0.5s;
              &:hover {
                font-size: 26px;
              }
            }
          }

          .sumbtn {
            margin-left: 40px;
            a {
              display: block;
              position: relative;
              width: 150px;
              height: 40px;
              letter-spacing: 8px;
              line-height: 40px;
              color: #fff;
              text-align: center;
              font-size: 18px;
              font-family: 'Microsoft YaHei';
              background: #e1251b;
              border-radius: 20px;
              overflow: hidden;
              transition: all 0.8s;
              cursor: pointer;
              &:hover {
                background: #91d43e;
              }
            }
          }
        }
      }
    }
  }
}
</style>
