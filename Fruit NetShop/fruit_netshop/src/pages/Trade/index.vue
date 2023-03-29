<template>
  <div class="aa">
    <div class="trade-container">
      <el-steps
        :active="1"
        align-center
        finish-status="success"
        style="margin: 20px 0 30px 0"
      >
        <el-step
          title="核对订单"
          description="请核对订单并选择收货地址"
        ></el-step>
        <el-step
          title="支付订单"
          description="请选择支付方式并进行支付"
        ></el-step>
        <el-step
          title="生成订单"
          description="支付成功，订单已生成，请等待发货，感谢您的支持！"
        ></el-step>
      </el-steps>

      <h3 class="title">填写并核对订单信息</h3>
      <div class="content">
        <h5 class="receive">收件人信息</h5>
        <div
          class="address clearFix"
          v-for="address in addressList"
          :key="address.id"
        >
          <span
            @click="changeAddress(address, addressList)"
            class="username"
            :class="{ selected: address.selected == true }"
            >{{ address.consignee }}</span
          >
          <p @click="changeAddress(address, addressList)">
            <span class="s1">{{ address.fullAddress }}</span>
            <span class="s2">{{ address.phone }}</span>
            <!-- 搞个默认地址，同时用selected来选择 -->
            <span class="s4" v-show="address.is_default == true">默认地址</span>
            <span class="s3" v-show="address.selected == true">已选择</span>
          </p>
          <!-- <div class="ss">
            
          </div> -->
        </div>
        <div class="line"></div>
        <h5 class="pay">支付方式</h5>
        <div class="address clearFix">
          <span class="username selected">在线支付</span>
        </div>
        <div class="line"></div>
        <h5 class="pay">送货清单</h5>
        <div class="way">
          <h5 style="font-size: 16px; letter-spacing: 1px">配送方式</h5>
          <div class="info clearFix">
            <img src="./images/2.jpg" alt="" />
            <p class="time">
              配送时间：<span>{{ `${Estimated()} 9:00~15:00` }}</span> 送达
            </p>
          </div>
        </div>
        <div class="detail">
          <h5 style="font-size: 16px; letter-spacing: 1px">商品清单</h5>
          <ul class="list clearFix" v-for="cart in cartList" :key="cart.id">
            <li>
              <img
                :src="`http://localhost:8888/${cart.goods_info.goods_img[0]}`"
                class="goodsImg"
              />
            </li>
            <li>
              <p>{{ cart.goods_info.goods_name }}</p>
              <h4>7天无理由退货</h4>
            </li>
            <li>
              <h3>￥{{ cart.goods_info.goods_price }}</h3>
            </li>
            <li class="number">X{{ cart.number }}</li>
            <li style="font-size: 16px">有货</li>
          </ul>
        </div>
        <div class="bbs">
          <h5 class="bbs1">买家留言：</h5>
          <el-input
            placeholder="建议留言前先与商家沟通确认"
            class="remarks-cont"
            type="textarea"
            :rows="4"
            v-model="order_remark"
          >
          </el-input>
        </div>
      </div>

      <div class="foo">
        <div class="trade">
          <div class="num">
            商品数量：<span>{{ cartList.length }}</span>
          </div>
          <div class="price">
            应付金额:　<span>¥{{ totalMoney() }}</span>
          </div>
          <div class="receiveInfo">
            <span class="t1"> 寄送至:</span>
            <span class="span1">{{ userDefaultAddress.fullAddress }}</span>
          </div>
          <div class="con">
            <span class="t2">收货人：</span
            ><span class="span2">{{ userDefaultAddress.consignee }}</span>
            <span class="span3">{{ userDefaultAddress.phone }}</span>
          </div>
        </div>
        <div class="sub clearFix">
          <div @click="submitOrder">提交订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Trade',
  data() {
    return {
      pageNum: 1,
      pageSize: 1000,
      order_remark: '',
      address_id: 0,
      goods_id: '',
      goods_number: '',
      total: 0,
      orderId: 0
    }
  },
  async mounted() {
    await this.getAddress()
    await this.getCart()
    await this.getUserInfo()
  },
  methods: {
    //获取地址列表
    async getAddress() {
      await this.$store.dispatch('address/getAddressList', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        user_id: this.userInfo.id
      })
      this.address_id = this.addressList.find((i) => i.is_default == true).id
    },
    //获取已选购物车
    async getCart() {
      await this.$store.dispatch('cart/getCartList', {
        id: this.userInfo.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        selected: 1
      })
      let gid = []
      let gnum = []
      for (let item of this.cartList) {
        gid.push(item.goods_info.id)
        gnum.push(item.number)
      }
      this.goods_id = gid.toString()
      this.goods_number = gnum.toString()
    },
    //获取用户信息
    async getUserInfo() {
      await this.$store.dispatch('user/getUserInfo')
    },
    //切换购物地址
    changeAddress(address, addressList) {
      addressList.forEach((item) => {
        item.selected = false
      })
      address.selected = true
      this.address_id = address.id
    },
    //预计送达时间
    Estimated() {
      let date = new Date()
      var day = date.getDate()
      day += 2
      date.setDate(day)
      return this.dayjs(date).format('YYYY-MM-DD')
    },
    //总价格
    totalMoney() {
      let all = 0
      this.cartList.forEach((item) => {
        all = all + item.number * item.goods_info.goods_price
      })
      this.total = all.toFixed(2)
      return all.toFixed(2)
    },
    //修订商品数量
    async updateGoods() {
      for (let item of this.cartList) {
        let goods_num = 0
        goods_num = item.goods_info.goods_num - item.number

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
    //提交订单
    async submitOrder() {
      try {
        const { goods_id, address_id, goods_number, order_remark, total } = this
        let data = {
          address_id,
          goods_id,
          goods_number,
          total: total * 1,
          order_remark
        }
        if (!data.order_remark) {
          delete data.order_remark
        }
        const res = await this.$store.dispatch('order/addOrder', data)
        let ids = []
        for (let item of this.cartList) {
          ids.push(item.id)
        }
        let data1 = { ids }
        await this.$store.dispatch('cart/deleteCart', data1),
          (this.orderId = res)
        this.$router.push(
          `/pay?orderId=${this.orderId}&&totalFee=${this.total}`
        )
        this.updateGoods()
        this.$message({
          type: 'success',
          message: '生成订单成功'
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    }
  },
  computed: {
    ...mapState({
      addressList: (state) => state.address.addressList || [],
      cartList: (state) => state.cart.cartList || [],
      userInfo: (state) => state.user.userInfo || {}
    }),
    //选择最后的地址
    userDefaultAddress() {
      return (
        this.addressList.find((item) => {
          return item.is_default == true
        }) || {}
      )
    }
  }
}
</script>

<style lang="less" scoped>
.aa {
  width: 100%;
  .trade-container {
    width: 1500px;
    margin: 0 auto;

    .title {
      width: 1200px;
      letter-spacing: 2px;
      margin: 0 auto;
      font-size: 18px;
      line-height: 21px;
    }

    .content {
      width: 1200px;
      margin: 10px auto 0;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      box-sizing: border-box;

      .receive,
      .pay {
        color: #000;
        font-size: 16px;
        line-height: 36px;
        margin: 18px 0;
      }

      .address {
        padding-left: 20px;
        margin-bottom: 15px;

        .username {
          float: left;
          width: 150px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border: 1px solid #ddd;
          font-size: 14px;
          font-weight: bold;
          position: relative;
          color: #575252;
        }

        .username::after {
          content: '';
          display: none;
          width: 13px;
          height: 13px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url(./images/choosed.png) no-repeat;
        }

        .username.selected {
          // display: inline-block;
          // border: inherit;
          // margin-bottom: 0px;
          // box-sizing: border-box;
          border-color: #e1251b;
        }

        .username.selected::after {
          display: block;
        }

        p {
          width: 900px;
          float: left;
          line-height: 30px;
          margin-left: 10px;
          padding: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;

          .s1 {
            font-size: 14px;
            float: left;
            margin-left: 20px;
            color: #628e05;
            transition: all 0.5s;
          }

          .s2 {
            float: left;
            margin-left: 20px;
            font-size: 14px;
            color: #3a8ee6;
          }
          .s3 {
            height: 20px;
            line-height: 20px;
            padding: 3px 12px;
            font-size: 14px;
            border-radius: 10px;
            margin-left: 10px;
            background-color: #f0f9eb;
            border: 1px solid #82c720;
            color: #82c720;
            text-align: center;
            transition: all 0.5s;
            &:hover {
              color: #000;
              // font-size: 16px;
              transform: scale(1.1);
              -ms-transform: scale(1.1);
              -webkit-transform: scale(1.1);
              -o-transform: scale(1.1);
              -moz-transform: scale(1.1);
            }
          }
          .s4 {
            height: 25px;
            line-height: 25px;
            margin-left: 10px;
            font-size: 14px;
            padding: 1px 12px;
            border-radius: 10px;
            background-color: rgb(254, 240, 240);
            border: 1px solid rgb(251, 196, 196);
            color: rgb(245, 108, 108);
            text-align: center;
            transition: all 0.5s;
            &:hover {
              transform: scale(1.1);
              -ms-transform: scale(1.1);
              -webkit-transform: scale(1.1);
              -o-transform: scale(1.1);
              -moz-transform: scale(1.1);
            }
          }
        }

        p:hover {
          background-color: #ddd;
        }

        // .ss {
        // }
      }

      .line {
        height: 1px;
        background-color: #ddd;
      }

      .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;

        .info {
          margin-top: 20px;
          display: flex;

          img {
            border-radius: 10px;
          }
          .time {
            width: 500px;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            margin-left: 20px;
            transition: all 0.5s;
            &:hover {
              font-size: 20px;
              span {
                font-size: 18px;
              }
            }

            span {
              color: #628e05;
              font-size: 16px;
              padding: 0 10px;
              transition: all 0.5s;
            }
          }

          .s1 {
            float: left;
            border: 1px solid #ddd;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }

          p {
            line-height: 30px;
          }
        }
      }

      .detail {
        width: 1080px;

        background: #feedef;
        padding: 15px;
        margin: 2px auto 0;

        h5 {
          line-height: 50px;
        }

        .list {
          display: flex;
          justify-content: space-between;

          .goodsImg {
            height: 120px;
            width: 120px;
            transition: all 0.5s;
            &:hover {
              transform: scale(1.1);
              -ms-transform: scale(1.1);
              -webkit-transform: scale(1.1);
              -o-transform: scale(1.1);
              -moz-transform: scale(1.1);
            }
          }
          .number {
            font-size: 16px;
            letter-spacing: 2px;
            width: 50px;
            transition: all 0.5s;

            &:hover {
              font-size: 20px;
            }
          }

          li {
            line-height: 30px;

            p {
              font-size: 16px;
              margin-bottom: 20px;
              transition: all 0.5s;
              width: 120px;
              &:hover {
                font-size: 18px;
              }
            }

            h4 {
              font-size: 16px;

              color: #c81623;
              font-weight: 400;
            }

            h3 {
              font-size: 20px;
              color: #e12228;
              transition: all 0.5s;
              width: 120px;

              &:hover {
                font-size: 22px;
              }
            }
          }
        }
      }

      .bbs {
        margin-top: 20px;
        margin-bottom: 15px;

        .bbs1 {
          font-size: 16px;
          line-height: 50px;
        }

        .remarks-cont {
          width: 100%;
          border-color: #e4e2e2;
          line-height: 1.8;
          outline: none;
          resize: none;
        }
      }

      .bill {
        h5 {
          line-height: 50px;
        }

        div {
          padding-left: 15px;
        }
      }
    }

    .foo {
      box-sizing: border-box;
      width: 1200px;
      padding: 10px;
      margin: 20px 0;
      margin-left: 150px;
      background-color: #f4f4f4;
      border: 1px solid #ddd;
      display: flex;
      margin-bottom: 80px;
      .trade {
        div {
          line-height: 30px;
        }
        .num {
          font-size: 18px;
          span {
            margin-left: 30px;
            margin-right: 22px;
            font-size: 22px;
            font-weight: 700;
            color: #e12228;
          }
        }

        .price {
          font-size: 18px;
          span {
            color: #e12228;
            font-weight: 700;
            font-size: 20px;
          }
        }

        .receiveInfo {
          color: #999;
          font-size: 14px;
          width: 1000px;
          .t1 {
            color: #000;
            font-size: 18px;
          }
          .span1 {
            margin-left: 20px;
          }
        }

        .con {
          width: 1000px;
          color: #999;
          font-size: 14px;
          .t2 {
            color: #000;
            font-size: 18px;
          }
          .span2 {
            margin-left: 5px;
          }
          .span3 {
            margin-left: 10px;
          }
        }
      }

      .sub {
        margin: 30px;

        div {
          width: 150px;
          height: 50px;
          font-size: 18px;
          color: #fff;
          line-height: 50px;
          text-align: center;
          font-weight: bold;
          letter-spacing: 1px;
          border-radius: 20px;
          background-color: #e12228;
          position: relative;
          left: -50px;
          top: 10px;
          transition: all 0.5s;
          &:hover {
            background-color: #628e05;
          }
        }
      }
    }
  }
}
</style>
