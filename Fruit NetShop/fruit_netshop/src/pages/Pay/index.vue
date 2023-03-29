<template>
  <div class="a">
    <div class="pay-main">
      <div class="pay-container">
        <el-steps
          :active="2"
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

        <div class="checkout-tit">
          <h4 class="tit-txt">
            <span class="success-icon"></span>
            <span class="success-info"
              >订单提交成功，请您及时付款，以便尽快为您发货~~</span
            >
          </h4>
          <div class="paymark">
            <span class="fl"
              >请您在提交订单<em class="orange time">1小时</em
              >之内完成支付，超时订单会自动取消。您的订单号为：<em
                class="orange"
                >{{ orderId }}</em
              ></span
            >
            <span class="fr"
              ><em class="lead">应付金额：</em
              ><em class="orange money">￥{{ totalFee }}</em></span
            >
          </div>
        </div>
        <div class="checkout-info">
          <h4 style="font-size: 16px; font-weight: bold">重要说明：</h4>
          <ol>
            <li>
              每日鲜果支付平台目前支持<span class="zfbwx">支付宝、微信 </span
              >支付方式。
            </li>
            <li>其它支付渠道正在调试中，敬请期待。</li>
          </ol>
        </div>
        <div class="checkout-steps">
          <div class="step-tit">
            <h5>支付平台</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li
                @click="changeoPayWay(1)"
                :class="curIndex == 1 ? 'select' : ''"
              >
                <img src="./images/pay2.jpg" />
              </li>
              <li
                @click="changeoPayWay(2)"
                :class="curIndex == 2 ? 'select' : ''"
              >
                <img src="./images/pay3.jpg" />
              </li>
            </ul>
            <div class="submit">
              <a class="btn" @click="open">立即支付</a>
            </div>
          </div>

          <!-- <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'Pay',
  data() {
    return {
      timer: null,
      curIndex: 1,
      payType: '支付宝',
      codeimg: './images/payCode.png'
    }
  },
  mounted() {},
  computed: {
    orderId() {
      return this.$route.query.orderId
    },
    totalFee() {
      return this.$route.query.totalFee
    }
  },
  methods: {
    //选择支付方式
    changeoPayWay(index) {
      this.curIndex = index
      if (index == 1) {
        this.payType = '支付宝'
      } else {
        this.payType = '微信'
      }
    },
    //确认支付打开
    async open() {
      let url = await QRCode.toDataURL(this.codeimg)
      this.$alert(`<img  src=${url} />`, `请使用${this.payType}支付`, {
        dangerouslyUseHTMLString: true,
        showCancelButton: true,
        showConfirmButton: true,
        lockScroll: false,
        cancelButtonText: '支付遇见问题',
        confirmButtonText: '已成功支付',
        center: true,
        showClose: false,
        beforeClose: async (type, instance, done) => {
          if (type == 'cancel') {
            this.$message({
              type: 'info',
              message: '请联系工作人员'
            })
            done()
          } else {
            this.$msgbox.close()
            let datainfo = {
              id: this.orderId,
              data: {
                status: 1
              }
            }
            await this.$store.dispatch('order/updateOrder', datainfo)
            this.$router.push('/paysuccess')
            this.$message({
              type: 'success',
              message: '支付成功'
            })
          }
        }
      }).catch(() => {})
      // if (!this.timer) {
      //   this.timer = setInterval(async () => {
      //     try {
      //       let result = await this.$API.reqPayStatus(this.orderId)
      //       if (result.data.code == 200) {
      //         clearInterval(this.timer)
      //         this.timer = null
      //         this.code = result.data.code
      //         this.$msgbox.close()
      //         this.$router.push('/paysuccess')
      //       }
      //     } catch (error) {}
      //   }, 1000)
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.a {
  width: 100%;
  .pay-main {
    width: 1500px;
    margin: 20px auto;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
        font-size: 16px;
        font-weight: bold;
      }

      .money {
        font-size: 22px;
      }

      .zfbwx {
        color: #e1251b;
        font-weight: 700;
        font-size: 16px;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            font-size: 18px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;
        margin-bottom: 50px;

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
          font-size: 16px;
        }

        .step-cont {
          margin: 0 10px 12px 20px;
          display: flex;
          justify-content: space-around;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 10px 10px 0px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
              margin-right: 10px;
            }
          }
          .select {
            border: 1px solid red;
            background: url(./images/choosed.png) no-repeat;
            background-position: 131px 39px;
          }

          .submit {
            text-align: center;

            .btn {
              display: inline-block;
              padding: 15px 45px;
              // margin: 0px 0 10px;
              font: 18px '微软雅黑';
              font-weight: 700;
              border-radius: 0;
              background-color: #e1251b;
              color: #fff;
              text-align: center;
              vertical-align: middle;
              cursor: pointer;
              user-select: none;
              text-decoration: none;
              transition: all 0.5s;
              border-radius: 20px;
              &:hover {
                background-color: #91d43e;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style>
::v-deep .el-dialog__wrapper {
  overflow: hidden;
}
</style>
