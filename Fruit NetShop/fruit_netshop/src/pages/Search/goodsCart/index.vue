<template>
  <div>
    <div class="goodsCart">
      <div class="img">
        <router-link :to="`/detail/${goodsInfo.id}`">
          <img :src="`http://localhost:8888/${goodsInfo.goods_img[0]}`"
        /></router-link>
      </div>

      <div class="goodsName">
        <router-link :to="`/detail/${goodsInfo.id}`">{{
          goodsInfo.goods_name
        }}</router-link>
      </div>

      <div class="goodsintr">
        {{ goodsInfo.goods_introduction }}
      </div>
      <div class="goodsPriceAndTotal">
        <div class="price">￥ {{ goodsInfo.goods_price }}</div>
        <div class="total">库存：{{ goodsInfo.goods_num }}</div>
      </div>
      <div class="numberAndCart">
        <el-input-number
          :min="1"
          :max="goodsInfo.goods_num"
          class="number"
          size="small"
          v-model="num"
          @change="handleChange"
          :disabled="goodsInfo.goods_num == 0"
        ></el-input-number>
        <div class="Cart">
          <div class="sss" v-if="goodsInfo.goods_num > 0">
            <img src="./images/1.png" />
            <div @click="toAddCart">加入购物车</div>
          </div>
          <div v-else>
            <img src="./images/2.png" class="notNum" />
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsCart',
  props: ['goodsInfo'],
  data() {
    return {
      num: 1
    }
  },
  methods: {
    handleChange(cur) {
      this.num = cur
    },
    async toAddCart() {
      try {
        await this.$store.dispatch('cart/addCart', {
          good_id: this.goodsInfo.id * 1,
          number: this.num
        })
        //seesionStorage不能存储对象形式，所以要使用JSON.stringify()将对象转成字符串
        sessionStorage.setItem('goodsInfo', JSON.stringify(this.goodsInfo))
        this.$router.push({
          name: 'addCartSuccess',
          query: { good_id: this.goodsInfo.id * 1, number: this.num }
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goodsCart {
  width: 288px;
  height: 480px;
  background-color: white;
  border: 1px solid #ccc;
  margin-top: 15px;
  margin-left: 10px;

  .img {
    width: 288px;
    height: 288px;
    overflow: hidden;

    img {
      width: 288px;
      height: 288px;
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
  .goodsName {
    height: 35px;
    width: 260px;
    text-align: center;
    margin: 0 auto;
    margin-top: 10px;
    line-height: 35px;
    font-weight: bold;
    font-size: 14px;
    border-bottom: 1px dashed #ccc;
    transition: all 0.5s;
    a {
      text-decoration: none;
    }
  }
  .goodsintr {
    height: 31px;
    width: 260px;

    margin: 0 auto;
    line-height: 31px;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px dashed #ccc;
    overflow: hidden;
  }
  .goodsPriceAndTotal {
    display: flex;
    height: 50px;

    .price {
      margin: auto 0;
      width: 100px;
      height: 26px;
      margin-left: 5px;
      text-align: center;
      line-height: 26px;
      color: #c20000;
      font-size: 22px;
      font-weight: bold;
    }

    .total {
      margin: auto 0;
      width: 100px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      color: #777;
      font-weight: bold;
      font-size: 12px;
      transition: all 0.5s;

      &:hover {
        color: #74be21;
      }
    }
  }
  .numberAndCart {
    width: 260px;
    height: 45px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .number {
      width: 120px;
      height: 32px;
      margin-top: 8px;
    }
    .Cart {
      width: 100px;
      height: 25px;
      margin-top: 13px;

      .sss {
        display: flex;
        transition: all 0.5s;
        background-color: #e23f50;
        border-radius: 8px;
        cursor: pointer;

        img {
          height: 16px;
          width: 16px;
          margin-top: 5px;
          margin-left: 2px;
        }
        div {
          height: 30px;
          width: 100px;
          margin-left: 5px;
          line-height: 30px;
          font-size: 14px;
          color: white;
        }
        &:hover {
          background-color: #74be21;
        }
      }
      .notNum {
        position: relative;
        top: -10px;
        width: 100px;
        z-index: 10;

        @keyframes shake {
          10%,
          90% {
            transform: translate3d(-1px, 0, 0);
          }
          20%,
          80% {
            transform: translate3d(2px, 0, 0);
          }
          30%,
          50%,
          70% {
            transform: translate3d(-4px, 0, 0);
          }
          40%,
          60% {
            transform: translate3d(4px, 0, 0);
          }
        }
        &:hover {
          animation: shake 1.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
