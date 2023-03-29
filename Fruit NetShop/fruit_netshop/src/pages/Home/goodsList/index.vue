<template>
  <div class="goodsList">
    <div class="goodsListItem">
      <div class="goodsLeft">
        <div class="leftTitle">{{ goodsList.title }}</div>
        <img :src="goodsList.leftImg" />
      </div>
      <div class="goodsMain">
        <div class="goods" v-for="item in goodsList.goodsInfo" :key="item.id">
          <router-link :to="`/detail/${item.id}`">
            <div class="goodsImgCart">
              <img
                :src="`http://localhost:8888/${item.goods_img[0]}`"
                class="goodsImg"
              />
            </div>
            <div class="goodsPrice">￥ {{ item.goods_price }}</div>
            <div class="goodsName">{{ item.goods_name }}</div>
          </router-link>
        </div>
      </div>
      <div class="goodsRight">
        <div class="rightGoodsNameList">
          <div
            class="rightGoodsName"
            v-for="item in goodsList.goodsInfo"
            :key="item.id"
          >
            <router-link :to="`/detail/${item.id}`">{{
              item.goods_name
            }}</router-link>
          </div>
        </div>
        <img :src="goodsList.rightImg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  props: ['goodsList']
}
</script>

<style lang="less" scoped>
.goodsList {
  width: 1500px;
  min-width: 1400px;
  height: 490px;
  margin: 50px auto;

  .goodsListItem {
    width: 1300px;
    height: 480px;
    margin-left: 110px;
    display: flex;

    .goodsLeft {
      width: 250px;
      height: 480px;
      overflow: hidden;

      .leftTitle {
        background-color: #444;
        margin-bottom: 10px;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
        text-align: center;
        color: white;
      }
      img {
        height: 400px;
      }
    }
    .goodsMain {
      width: 800px;
      height: 480px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: space-between;
      .goods {
        width: 180px;
        height: 225px;
        background-color: rgb(248, 248, 248);
        overflow: hidden;

        a {
          text-decoration: none;
        }

        .goodsImgCart {
          width: 180px;
          height: 180px;
          overflow: hidden;

          .goodsImg {
            width: 180px;
            height: 180px;
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

        .goodsPrice {
          height: 22px;
          width: 180px;
          line-height: 22px;
          color: red;
          font-weight: bold;
          text-align: center;
          font-size: 16px;
          transition: all 0.5s;

          &:hover {
            font-size: 18px;
          }
        }
        .goodsName {
          height: 23px;
          width: 180px;
          line-height: 23px;
          color: #333;
          font-size: 14px;
          text-align: center;
          transition: all 0.5s;

          &:hover {
            color: #69a810;
            font-size: 16px;
          }
        }
      }
    }

    .goodsRight {
      width: 250px;
      height: 480px;
      overflow: hidden;
      .rightGoodsNameList {
        width: 250px;
        height: 250px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
        background-color: rgb(248, 248, 248);

        .rightGoodsName {
          background-color: white;
          width: 115px;
          height: 50px;
          color: #333;
          font-size: 14px;
          line-height: 50px;
          text-align: center;
          transition: all 0.5s;
          &:hover {
            a {
              color: #69a810;
              text-decoration: none;
            }
            font-size: 16px;
            font-weight: 600;
          }
        }
      }
      img {
        height: 250px;
      }
    }
  }
}
</style>
