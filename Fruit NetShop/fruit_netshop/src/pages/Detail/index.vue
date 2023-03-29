<template>
  <div class="detail">
    <div class="a">
      <TypeNav></TypeNav>

      <div class="detailContainer">
        <div class="conPoin">
          <router-link :to="`/home`">首页 ></router-link>
          <span>商品详情</span>
        </div>
        <div class="mainContainer">
          <div class="leftContainer">
            <!-- 放大镜 -->
            <Zoom :goodsImageList="goodsInfo.goods_img"></Zoom>
            <!-- 小轮播图 -->
            <ImageList :goodsImageList="goodsInfo.goods_img"></ImageList>
          </div>

          <div class="rightContainer">
            <div class="goodsName">{{ goodsInfo.goods_name }}</div>

            <div class="goodsPriceAndNum">
              <div class="priceAndBuy">
                <div class="price">
                  <div class="priceA">价&nbsp;&nbsp;&nbsp;&nbsp;格：</div>
                  <div class="priceB">￥{{ goodsInfo.goods_price }}</div>
                </div>
                <div class="buy">已有<span>65566</span>人购买</div>
              </div>
              <div class="num">
                <div>库&nbsp;&nbsp;&nbsp;&nbsp;存：</div>
                <div class="numB">{{ goodsInfo.goods_num }}</div>
              </div>
            </div>
            <div class="expressage">
              <div class="expressN">快&nbsp;&nbsp;&nbsp;&nbsp;递：</div>
              <img src="./images/2.jpg" />
              <div class="expressM">次日达</div>
            </div>
            <div class="place">
              <div class="placeA">发&nbsp;货&nbsp;地:</div>
              <div class="placeB">广东省</div>
              <div class="placeB">广州市</div>
              <div class="placeB">番禺区</div>
            </div>
            <div class="numberAndCart">
              <div class="numberA">数&nbsp;&nbsp;&nbsp;&nbsp;量：</div>

              <el-input-number
                :min="1"
                :max="goodsInfo.goods_num"
                class="number"
                size="small"
                v-model="num"
                :disabled="goodsInfo.goods_num == 0"
              ></el-input-number>
              <div
                class="cart"
                v-if="goodsInfo.goods_num != 0"
                @click="toAddCart"
              >
                加入购物车
              </div>
              <div v-else class="notNum">
                <img src="./images/3.png" />
              </div>
            </div>

            <div class="goodsintro">
              <div class="goodsintroA">简&nbsp;&nbsp;&nbsp;&nbsp;介：</div>
              <div class="goodsintroB">
                {{ goodsInfo.goods_introduction }}
              </div>
            </div>
            <div class="support">
              <div class="supportA">承&nbsp;&nbsp;&nbsp;&nbsp;诺：</div>
              <div class="supportB">
                <div>支持<span>生果、坏果</span>包换</div>
                <img src="./images/1.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="floorContainer">
          <ul class="choose">
            <li
              :class="currentIndex == 1 ? 'hoverCss' : ''"
              @click="changeCurrentIndex(1)"
            >
              商品详情
            </li>
            <li
              :class="currentIndex == 2 ? 'hoverCss' : ''"
              @click="changeCurrentIndex(2)"
            >
              购买须知
            </li>
            <li
              :class="currentIndex == 3 ? 'hoverCss' : ''"
              @click="changeCurrentIndex(3)"
            >
              配送说明
            </li>
          </ul>
          <!-- <div class="selecd selecdHover"></div> -->
          <div v-if="currentIndex == 1" class="floorMain1">
            <img
              v-for="(img, index) in goodsInfo.goods_img"
              :key="index"
              :src="`http://localhost:8888/${img}`"
              class="floorImg"
            />
          </div>
          <div v-if="currentIndex == 2" class="floorMain2">
            <div class="buy1">购买须知</div>
            <div class="buy2">
              <div>
                1.本店承诺所有水果出售的水果质量均有保证，拒绝假冒伪劣、拒绝缺斤少两；
              </div>
              <div>
                2.水果在运输过程中，由于时间、天气等原因，难免会存在小部分水果碰伤，但并不影响食用哦！
              </div>
              <div>
                3.水果产品，收到后第一时间放入冰箱储存，避免水果腐烂，后熟水果常温保存即可，具体催熟方法可咨询客服
              </div>
            </div>
            <div class="buy3">
              <div class="buy31">
                <div class="content1">温馨提示</div>
                <div>
                  1.凡在本店购买的新鲜水果，到货后请先签收，并开箱检查。如发现损坏、变质、分量严重不足的水果，请于24小时内将坏果连同水果包装一起拍照然后联系在线客服，让客服按照比例给您做出赔偿!
                </div>
                <div class="content2">如有以下情形恕不理赔:</div>
                <div>
                  1:单方面做出拒收行为。新鲜水果保质期短，不能进行二次销售。一旦发出，不能修改地址、拒收。未经协商，不得以物流慢、不新鲜等理由拒收、退款。2:因买家原因不能及时签收。买家电话关机、停机、无人接听、号码不正确或收货人无人在家等原因造成水果变质。3:由于新鲜水果时效性较强，运输途中不能耽误。因此，请您在下单后确认好地址，水果发出后不接受改地址或拒收哦!
                </div>
              </div>
            </div>
          </div>
          <div v-if="currentIndex == 3" class="floorMain3">
            <div class="main1">每日鲜果配送范围和时间</div>
            <div class="main2">
              目前，每日鲜果网上水果商城已开通国内四大仓库，力保水果新鲜安全。
            </div>
            <img src="./images/20150917221139_29366.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageList from './ImageList/index.vue'
import Zoom from './Zoom/index.vue'
import { mapState } from 'vuex'
export default {
  name: 'Detail',
  data() {
    return {
      num: 1,
      currentIndex: 1
    }
  },
  components: {
    ImageList,
    Zoom
  },
  async mounted() {
    let goodsId = this.$route.params.id
    await this.$store.dispatch('goods/getSearchList', { goodsId })
  },
  computed: {
    ...mapState({
      goodsInfo: (state) => state.goods.goodsInfo || {}
    })
  },
  methods: {
    //切换index
    changeCurrentIndex(value) {
      this.currentIndex = value
    },
    toA() {
      this.$router.push('/home?to=AAA')
    },
    toB() {
      this.$router.push('/home?to=BBB')
    },
    toC() {
      this.$router.push('/home?to=CCC')
    },
    async toAddCart() {
      try {
        await this.$store.dispatch('cart/addCart', {
          good_id: this.$route.params.id * 1,
          number: this.num
        })
        //seesionStorage不能存储对象形式，所以要使用JSON.stringify()将对象转成字符串
        sessionStorage.setItem('goodsInfo', JSON.stringify(this.goodsInfo))
        this.$router.push({
          name: 'addCartSuccess',
          query: { good_id: this.$route.params.id * 1, number: this.num }
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
.detail {
  width: 100%;
  margin-bottom: 50px;

  .a {
    width: 1500px;
    margin: 0 auto;

    .detailContainer {
      width: 1200px;
      margin-left: 150px;

      .conPoin {
        width: 100%;
        height: 30px;
        margin: 10px 0;
        font-size: 14px;
        line-height: 30px;
        margin-left: 20px;
        letter-spacing: 2px;

        a {
          text-decoration: none;

          &:hover {
            color: green;
          }
        }
      }
      .mainContainer {
        overflow: hidden;
        margin: 5px 0 15px;

        .leftContainer {
          float: left;
          width: 400px;
          position: relative;
        }

        .rightContainer {
          float: right;
          width: 700px;
          height: 500px;

          .goodsName {
            width: 100%;
            font-size: 24px;
            height: 30px;
            margin-left: 10px;
            line-height: 30px;
            font-weight: bold;
            letter-spacing: 2px;
          }

          .goodsPriceAndNum {
            margin-top: 5px;
            width: 100%;
            height: 100px;
            background-color: #fee9eb;
            border-radius: 10px;

            .priceAndBuy {
              width: 100%;
              display: flex;
              justify-content: space-between;
              .price {
                display: flex;
                padding: 10px 5px;
                .priceA {
                  height: 35px;
                  line-height: 35px;
                }
                .priceB {
                  margin-left: 20px;
                  height: 35px;
                  line-height: 35px;
                  font-size: 24px;
                  color: #c81623;
                  font-weight: bold;
                }
              }
              .buy {
                height: 35px;
                line-height: 35px;
                padding: 10px 5px;
                margin-right: 15px;
                span {
                  color: green;
                }
              }
            }
            .num {
              display: flex;
              padding: 0px 5px;
              height: 35px;
              line-height: 35px;

              .numB {
                margin-left: 20px;
                font-size: 16px;
                color: #999;
                letter-spacing: 1px;
              }
            }
          }
          .expressage {
            width: 100%;
            height: 50px;
            line-height: 50px;
            margin-top: 10px;
            display: flex;
            border-radius: 8px;
            background-color: #bcee80;

            .expressN {
              margin-left: 5px;
            }
            img {
              margin-top: 8px;
              margin-left: 20px;
              height: 35px;
            }
            .expressM {
              height: 30px;
              letter-spacing: 3px;
              text-align: center;
              width: 80px;
              margin: auto 0;
              margin-left: 20px;
              line-height: 30px;
              background-color: #91d43e;
              color: white;
              font-size: 14px;
              font-weight: bold;
            }
          }
          .place {
            margin-top: 10px;
            height: 40px;
            line-height: 40px;
            display: flex;
            background-color: #fcf6f6;
            border-radius: 10px;

            .placeA {
              margin-left: 5px;

              margin-right: 30px;
            }
            .placeB {
              margin: auto 0;
              margin-right: 20px;
              height: 25px;
              width: 60px;
              line-height: 25px;
              text-align: center;
              letter-spacing: 2px;
              border-radius: 5px;

              background-color: #fff;
            }
          }
          .numberAndCart {
            width: 100%;
            height: 50px;
            display: flex;
            margin-top: 10px;
            line-height: 50px;
            border-radius: 10px;
            background-color: #fcf6f6;

            .numberA {
              margin-left: 5px;
            }
            .number {
              margin-left: 20px;
              margin-top: 10px;
            }
            .cart {
              width: 120px;
              height: 30px;
              margin: auto 0;
              line-height: 30px;
              text-align: center;
              letter-spacing: 1px;
              color: #fff;
              font-weight: bold;
              font-size: 14px;
              background-color: #e23f50;
              transition: all 0.8s;
              margin-left: 20px;
              border-radius: 5px;
              cursor: pointer;

              &:hover {
                background-color: #91d43e;
              }
            }
            .notNum {
              img {
                position: relative;
                left: -120px;
                top: 2px;
                width: 120px;
                z-index: 5;

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
                  animation: shake 1.2s cubic-bezier(0.36, 0.07, 0.19, 0.97)
                    both;
                }
              }
            }
          }
          .goodsintro {
            width: 100%;
            margin-top: 10px;
            background-color: #fcf6f6;
            border-radius: 10px;
            padding: 10px 0;

            .goodsintroA {
              padding-top: 8px;
              margin-left: 5px;
            }
            .goodsintroB {
              margin-left: 72px;
              margin-top: -15px;
              width: 600px;
              font-size: 14px;
            }
          }
          .support {
            width: 100%;
            height: 60px;
            margin-top: 10px;
            display: flex;
            line-height: 60px;
            background-color: #fcf6f6;
            border-radius: 10px;
            .supportA {
              margin-left: 5px;
              margin-right: 15px;
            }
            .supportB {
              width: 80%;
              display: flex;

              div {
                letter-spacing: 2px;
                margin-right: 20px;
                span {
                  color: red;
                }
              }
            }
          }
        }
      }
      .floorContainer {
        margin-top: 20px;
        width: 100%;
        .choose {
          font-size: 18px;
          color: #777;
          display: flex;
          justify-content: center;
          transition: all 0.8s;

          li {
            width: 300px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            z-index: 10;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              font-size: 22px;
              color: #91d43e;
            }
          }
          .hoverCss {
            border-bottom: 5px #91d43e solid;
          }
        }
        .selecd {
          position: relative;
          width: 300px;
          left: 150px;
          border-top: 5px solid red;
          transition: all 0.2s;
        }
        // .selecdHover {
        //   left: v-bind(currentIndex * 300+150);
        // }
        .floorMain1 {
          width: 900px;
          margin: 0 auto;
          margin-top: 10px;

          .floorImg {
            width: 100%;
            margin-bottom: 10px;
          }
        }
        .floorMain2 {
          width: 900px;
          margin: 0 auto;
          margin-top: 10px;
          margin-bottom: 50px;
          .buy1 {
            width: 120px;
            height: 34px;
            line-height: 30px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin: 0 auto;
            margin-top: 10px;
            background-color: #91d43e;
            color: white;
            letter-spacing: 4px;
            border-radius: 5px;
          }
          .buy2 {
            width: 600px;
            margin: 0 auto;
            font-size: 16px;
            margin-top: 15px;
            letter-spacing: 1px;
          }
          .buy3 {
            width: 640px;
            margin: 0 auto;
            background-color: #91d43e;
            color: white;
            margin-top: 15px;
            padding: 20px;
            .buy31 {
              width: 600px;
              margin: 10px auto;
              font-size: 14px;
              font-weight: 600;
              letter-spacing: 2px;

              .content1 {
                font-size: 24px;
                margin-bottom: 5px;
                letter-spacing: 6px;
              }
              .content2 {
                font-size: 24px;
                margin-top: 15px;
                margin-bottom: 5px;
                letter-spacing: 6px;
              }
            }
          }
        }
        .floorMain3 {
          width: 900px;
          margin: 0 auto;
          margin-top: 10px;

          .main1 {
            font-size: 18px;
            font-weight: bold;
            color: #99cc00;
          }
          .main2 {
            font-size: 16px;
            color: #f7ce24;
            margin-bottom: 20px;
          }
          img {
            width: 90%;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
