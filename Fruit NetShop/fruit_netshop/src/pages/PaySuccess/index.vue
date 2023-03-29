<template>
  <div class="paysuccess">
    <el-steps
      :active="3"
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

    <div class="success">
      <h3>
        <img src="./images/right.png" width="48" height="48" />
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center/myorder"
            >查看订单</router-link
          >
          <router-link class="btn-goshop" to="/">继续购物</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaySuccess',
  beforeRouteEnter: (to, from, next) => {
    if (from.path == '/pay' || from.path == '/') {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style lang="less" scoped>
.paysuccess {
  margin: 20px auto;
  padding: 25px;
  border: 1px solid rgb(211, 211, 211);
  width: 1200px;
  width: 1148px;

  .success {
    width: 500px;
    margin: 0 auto;

    h3 {
      margin: 20px 0;
      margin-left: 85px;
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;

      img {
        max-width: 100%;
        vertical-align: middle;
        border: 0;
        margin-right: 14px;
      }
    }

    .paydetail {
      margin-left: 66px;
      font-size: 15px;

      .button {
        margin: 30px 0;
        line-height: 26px;

        a {
          display: inline-block;
          box-sizing: border-box;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          border-radius: 2px;
          user-select: none;
          font-size: 20px;
          padding: 10px 30px;
          line-height: 22px;
          text-decoration: none;
          border-radius: 20px;
          transition: all 0.5s;

          &.btn-look {
            margin-right: 20px;
            color: #fff;
            background-color: #e1251b;
            border: 1px solid #e1251b;
          }
          &.btn-goshop {
            color: #666;
            background-color: #eee;
            border: 1px solid #e1e1e1;
          }
          &:hover {
            font-size: 22px;
            background-color: #91d43e;
            border: 1px solid #91d43e;
            &.btn-goshop {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
