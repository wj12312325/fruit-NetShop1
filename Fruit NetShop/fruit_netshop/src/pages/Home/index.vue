<template>
  <div>
    <div class="header-container">
      <TypeNav></TypeNav>
      <div class="container">
        <div class="a">
          <el-carousel class="carousel-container" height="503px">
            <el-carousel-item v-for="img in bannerList" :key="img.id">
              <img :src="img.imgUrl" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="advertisting">
        <div>DELICIOUS 新鲜水果每一天，健康生活每一刻</div>
        <div class="advertisting-bottom">
          <div class="line"></div>
          <div class="font">专属你的每日鲜果</div>
          <div class="line lineRight"></div>
        </div>
      </div>
      <div class="recommend">
        <div class="video">
          <div class="videoName">水果宣传片</div>
          <video controls class="itemVideo">
            <source src="../../../public/video/1.mp4" type="video/mp4" />
          </video>
          <div class="videoDesc">
            <span>视频出处：Bilibili</span>
            <br />
            <span>作者：翌度空间</span>
            <a
              href="https://www.bilibili.com/video/BV1uW41167zU/?spm_id_from=333.999.0.0&vd_source=5d4123a4bcd63a754c406ae66de1a917"
              target="_blank"
              >原视频地址>>></a
            >
          </div>
        </div>
        <div class="recommentRight">
          <div class="recommentCart cart1">
            <div class="fontDesc">
              <span>新鲜草莓</span>
              <br />
              <span class="fontSmall">草莓滋味 甜蜜生活</span>
            </div>
            <img src="./images/cart1.png" alt="" />
          </div>
          <div class="recommentCart cart2">
            <div class="fontDesc">
              <span>美味香蕉</span>
              <br />
              <span class="fontSmall">香蕉弯弯 月儿弯弯</span>
            </div>
            <img src="./images/cart2.png" alt="" />
          </div>
          <div class="recommentCart cart3">
            <div class="fontDesc">
              <span>甘甜橙子</span>
              <br />
              <span class="fontSmall">齿间尽是甜蜜和橙香</span>
            </div>
            <img src="./images/cart3.png" alt="" />
          </div>
          <div class="recommentCart cart4">
            <div class="fontDesc">
              <span>可口西瓜</span>
              <br />
              <span class="fontSmall">夏天有了西瓜才完美</span>
            </div>
            <img src="./images/cart4.png" alt="" />
          </div>
        </div>
      </div>
      <div class="transitionImg">
        <div>
          <img
            class="img1"
            src="./images/40A3CE12EEDB06E539EA9646F6E64840.png"
          />
          <img
            class="img2"
            src="./images/91290CB919DB7DCBF0AF0EC08E7CE721.png"
          />
          <img
            src="./images/D0C8921E68D33BF85564E390F1B06CB0.png"
            class="img3"
          />
          <img class="img4" src="./images/300.jpg" />
        </div>
        <div class="imgTitle">
          <div class="word1">
            <span>每日</span>
            <span class="big">鲜</span>
            <span>果</span>
          </div>
          <div class="word2">品味/高端/品质/水果—畅享/美味/健康/生活</div>
          <div class="word3">DAILY FRESH FRUIT</div>
        </div>
      </div>
      <a ref="AAA"></a>
      <GoodsList :goodsList="goodsList1"></GoodsList>
      <GoodsList :goodsList="goodsList2"></GoodsList>
      <div class="transitionImg2">
        <div>
          <img class="backImg" src="./images/m5b3j9M8ve.png" />
        </div>
        <div class="imgTitle">
          <div class="word1">
            <span>每日</span>
            <span class="big">鲜</span>
            <span>果</span>
          </div>
          <div class="word2">品味/高端/品质/水果—畅享/美味/健康/生活</div>
          <div class="word3">DAILY FRESH FRUIT</div>
        </div>
        <div class="join">
          <div class="joinFont">加盟电话:</div>
          <div class="joinPhone">138-8888-8888</div>
        </div>
      </div>
      <a ref="BBB"></a>
      <GoodsList :goodsList="goodsList3"></GoodsList>
      <GoodsList :goodsList="goodsList4"></GoodsList>

      <a ref="CCC"></a>
      <div class="contactUs">
        <div class="contactCon">
          <div class="contactA"></div>
          <div class="contact">联系我们</div>
          <div class="contactB"></div>
        </div>
        <div class="warning">
          <div class="warn1">温馨提示</div>
          <div class="warn2">本网站全部图片、视频、商品等资源都来自网络！</div>
          <div class="warn3">若有<span>侵权</span>，请联系，速删除，谢谢！</div>
        </div>
        <div class="contactImg">
          <div class="img1">
            <img src="./images/电话 .png" />
            <div class="phoA">电话联系</div>
            <div class="phoB">138-8888-8888</div>
          </div>
          <div class="img2">
            <img src="./images/位置.png" />
            <div class="addrA">联系地址</div>
            <div class="addrB">广东省广州市番禺区</div>
          </div>
          <div class="img3">
            <img src="./images/QRCode.jpg" />
            <div class="codeA">微信公众号</div>
            <div class="codeB">扫一扫更多精彩</div>
          </div>
        </div>
        <div class="amap-wrapper">
          <!-- <div class="here">在这里</div> -->

          <el-amap
            class="amap-box"
            vid="amap-vue"
            :zoom="zoom"
            :center="center"
            :options="options"
            :canvas-options="{ willReadFrequently: true }"
          >
            <el-amap-marker
              :position="[113.37015, 23.04073]"
              :icon="icon"
            ></el-amap-marker
          ></el-amap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsList from './goodsList'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: { GoodsList },
  data() {
    return {
      bannerList: [
        {
          id: '1',
          imgUrl: '/images/1.jpg'
        },
        {
          id: '2',
          imgUrl: '/images/2.jpg'
        },
        {
          id: '3',
          imgUrl: '/images/3.jpg'
        },
        {
          id: '4',
          imgUrl: '/images/4.jpg'
        },
        {
          id: '5',
          imgUrl: '/images/5.jpg'
        }
      ],
      zoom: 18,
      center: [113.37035, 23.04073],
      icon: require('./images/here.png'),
      options: { willReadFrequently: true }
    }
  },
  async mounted() {
    try {
      const res = await this.$store.dispatch('goods/getGoodsList', {
        pageNum: 1,
        pageSize: 32
      })
      this.$message({
        type: 'success',
        message: res.message
      })
    } catch (error) {
      this.$message({
        type: 'error',
        message: error
      })
    }

    if (this.$route.query.to) {
      let a = this.$route.query.to
      this.$refs[a].scrollIntoView()
    }
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goods.goodsList || []
    }),
    goodsList1() {
      return {
        title: '限时抢购',
        leftImg: '/images/goodsList22.jpg',
        rightImg: '/images/goodsList11.jpg',
        goodsInfo: this.goodsList.slice(0, 8)
      }
    },
    goodsList2() {
      return {
        title: '当季水果',
        leftImg: '/images/goodsList33.jpg',
        rightImg: '/images/goodsList44.jpg',
        goodsInfo: this.goodsList.slice(8, 16)
      }
    },
    goodsList3() {
      return {
        title: '热卖水果',
        leftImg: '/images/goodsList55.jpg',
        rightImg: '/images/goodsList66.jpg',
        goodsInfo: this.goodsList.slice(16, 24)
      }
    },
    goodsList4() {
      return {
        title: '每天推荐',
        leftImg: '/images/goodsList77.jpg',
        rightImg: '/images/goodsList88.jpg',
        goodsInfo: this.goodsList.slice(24, 32)
      }
    }
  },
  methods: {
    toA() {
      this.$refs.AAA.scrollIntoView()
    },
    toB() {
      this.$refs.BBB.scrollIntoView()
    },
    toC() {
      this.$refs.CCC.scrollIntoView()
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  min-width: 1500px;
  height: 565px;
  .container {
    background-color: #fff;
    width: 100%;
    height: 503px;
    min-width: 1300px;

    .a {
      width: 1050px;
      margin: 0 auto;

      .carousel-container {
        width: 1050px;
        margin-left: 174px;
      }
      img {
        width: 100%;
        height: 503px;
      }
    }
  }
}

.main-container {
  .advertisting {
    min-width: 1500px;
    height: 80px;
    margin-top: 50px;
    font-size: 16px;
    font-weight: bold;
    font-family: Arial Black;

    color: rgb(38, 38, 38);
    letter-spacing: 1px;

    div {
      width: 500px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      margin: 0 auto;
    }
    .advertisting-bottom {
      display: flex;
      border: none;

      .line {
        position: relative;
        top: 15px;
        border-top: 1px solid black;
        width: 60px;
        left: 120px;
      }
      .font {
        margin-top: 5px;
        font-size: 14px;
        font-weight: 100;
        letter-spacing: 3px;
      }
      .lineRight {
        left: -120px;
      }
    }
  }
  .recommend {
    height: 500px;
    width: 1500px;
    margin: 0 auto;
    display: flex;

    .video {
      height: 470px;
      width: 650px;
      margin-left: 50px;
      background-color: rgb(248, 248, 248);

      .videoName {
        font-size: 22px;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        margin-left: 50px;
        transition: all 0.3s;
        &:hover {
          font-size: 24px;
          color: #82c720;
        }
      }
      .videoDesc {
        font-size: 16px;
        font-weight: 600;
        margin-left: 15px;
        a {
          float: right;
          position: relative;
          top: -8px;
          right: 30px;
          text-decoration: none;
          color: red;
          font-size: 14px;
          font-weight: 400;
        }
      }
      .itemVideo {
        width: 96%;
        margin-left: 14px;
      }
    }
    .recommentRight {
      height: 460px;
      background-color: rgb(248, 248, 248);
      margin-left: 20px;
      width: 760px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: space-around;
      .recommentCart {
        width: 360px;
        height: 180px;
        .fontDesc {
          position: relative;
          top: 38px;
          left: 16px;
          font-size: 20px;
          font-weight: bold;
          color: white;

          .fontSmall {
            font-size: 16px;
            font-weight: normal;
          }
        }
      }
      .cart1 {
        background-color: green;
        transition: all 0.8s;
        img {
          position: relative;
          width: 180px;
          top: -45px;
          left: 178px;
          transition: all 0.5s;
          &:hover {
            width: 190px;
            top: -55px;
          }
        }
        &:hover {
          background-color: #619c0d;
        }
      }
      .cart2 {
        background-color: #da5454;
        transition: all 0.8s;

        img {
          position: relative;
          width: 220px;
          top: -45px;
          left: 150px;
          transition: all 0.5s;
          &:hover {
            width: 230px;
            top: -55px;
          }
        }
        &:hover {
          background-color: #ff6666;
        }
      }
      .cart3 {
        background-color: #087e57;

        transition: all 0.8s;

        img {
          position: relative;
          width: 205px;
          top: -57px;
          left: 158px;
          transition: all 0.5s;
          &:hover {
            width: 215px;
            top: -63px;
          }
        }
        &:hover {
          background-color: #009966;
        }
      }
      .cart4 {
        background-color: #b39746;

        transition: all 0.8s;

        img {
          position: relative;
          width: 190px;
          top: -43px;
          left: 173px;
          transition: all 0.5s;
          &:hover {
            width: 200px;
            top: -53px;
          }
        }
        &:hover {
          background-color: #ffcc33;
        }
      }
    }
  }
  .transitionImg {
    width: 1500px;
    min-width: 1440px;
    margin: 0 auto;
    height: 220px;
    overflow: hidden;

    div {
      height: 250px;
      width: 1440px;
      margin-left: 45px;
      display: flex;
      background-color: #eae7f0;

      .img1 {
        height: 175px;
        position: relative;
        left: 10px;
        top: 24px;
        z-index: 1;
        transition: all 0.5s;

        &:hover {
          top: 20px;
        }
      }
      .img2 {
        height: 115px;
        position: relative;
        top: 90px;
        left: 88px;
        z-index: 1;
        transition: all 0.5s;

        &:hover {
          top: 86px;
        }
      }
      .img3 {
        height: 85px;
        position: relative;
        left: -160px;
        top: 15px;
        z-index: 1;
        transition: all 0.5s;

        &:hover {
          top: 11px;
        }
      }

      .img4 {
        position: relative;
        left: -61px;
        transition: all 0.5s;
        top: 0;
        &:hover {
          top: -4px;
        }
      }
    }
    .imgTitle {
      margin-top: 15px;
      display: block;
      position: relative;
      top: -225px;
      left: 520px;
      width: 550px;
      height: 180px;
      z-index: 22222;
      transition: all 0.8s;

      &:hover {
        top: -235px;
      }

      div {
        width: 400px;
        height: 50px;
        line-height: 50px;
        display: flex;

        justify-content: center;
      }
      .word1 {
        font-size: 56px;
        color: #6585a9;
        .big {
          color: #619c0d;
          font-size: 80px;
        }
      }
      .word2 {
        margin-top: 20px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 3px;
      }
      .word3 {
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 6px;
      }
    }
  }
  .transitionImg2 {
    width: 1500px;
    min-width: 1440px;
    height: 500px;
    margin: 0 auto;
    div {
      width: 1440px;
      margin-left: 45px;
      overflow: hidden;
      height: 500px;
      background-color: rgb(246, 246, 246);

      .backImg {
        position: relative;
        left: 210px;
        top: -40px;
        height: 570px;
      }
    }
    .imgTitle {
      margin-top: 55px;
      display: block;
      position: relative;
      top: -505px;
      left: 640px;
      width: 550px;
      height: 250px;
      z-index: 22222;
      transition: all 0.8s;

      &:hover {
        top: -515px;
        box-shadow: 8px 8px 2px 1px rgba(0, 0, 255, 0.2);
      }

      div {
        overflow: visible;
        width: 400px;
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: center;
      }
      .word1 {
        margin-top: 10px;
        font-size: 56px;
        color: #6585a9;
        .big {
          color: #619c0d;
          font-size: 80px;
        }
      }
      .word2 {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 3px;
      }
      .word3 {
        margin-top: -10px;
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 6px;
      }
    }
    .join {
      display: flex;
      position: relative;
      top: -520px;
      left: 600px;
      width: 700px;
      height: 180px;

      .joinFont {
        height: 180px;
        line-height: 180px;
        font-size: 40px;
        color: green;
        text-shadow: 1px 1px 2px green;
      }
      .joinPhone {
        position: relative;
        top: 68px;
        left: -140px;
        height: 50px;
        line-height: 50px;
        font-size: 32px;
        color: green;
        text-align: center;
        background-color: #9beb2b;
      }

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
      }
    }
  }
  .contactUs {
    width: 1500px;
    min-width: 1440px;
    margin: 20px auto;

    .warning {
      width: 500px;
      height: 200px;
      border: 1px solid #eee;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 15px;
      position: relative;
      transition: all 0.8s;
      top: 0;

      &:hover {
        top: -10px;
        box-shadow: 8px 8px 2px 1px rgba(0, 0, 255, 0.2);
      }
      .warn1 {
        width: 160px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        margin: 0 auto;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 22px;
        margin-top: 10px;
        background-color: #39abff;
        color: white;
      }
      .warn2 {
        width: 400px;
        height: 50px;
        font-size: 18px;
        font-weight: bold;
        line-height: 50px;
        margin: 0 auto;
        margin-top: 10px;
      }
      .warn3 {
        width: 360px;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        font-weight: bold;
        text-align: center;
        margin: 0 auto;
        span {
          color: red;
        }
      }
    }
    .contactCon {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;

      .contactA {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: #39abff;
        margin: auto 0;
      }
      .contact {
        height: 60px;
        width: 180px;
        line-height: 60px;
        text-align: center;
        font-size: 30px;
        border-bottom: 1px solid #ededed;
        margin: auto 0;
      }
      .contactB {
        width: 16px;
        height: 16px;
        background-color: #39abff;
        border-radius: 50%;
        margin: auto 0;
      }
    }
    .contactImg {
      margin-top: 20px;
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      .img1 {
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #ededed;
        border-bottom: none;
        margin: 0 10px;
        img {
          width: 40%;
        }
        .phoA {
          width: 100px;
          font-size: 18px;
          letter-spacing: 2px;
          text-align: center;
          margin-top: 30px;
          transition: all 0.5s;
          color: #555;
        }
        .phoB {
          width: 180px;
          text-align: center;
          letter-spacing: 2px;
          font-size: 14px;
          margin-top: 10px;
          transition: all 0.5s;
          color: #888;
        }

        &:hover {
          div {
            color: #82c720;
          }
          .phoA {
            font-size: 20px;
          }
          .phoB {
            font-size: 16px;
          }
        }
      }
      .img2 {
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #ededed;
        border-bottom: none;
        margin: 0 10px;
        img {
          width: 40%;
        }
        .addrA {
          width: 100px;
          font-size: 18px;
          letter-spacing: 2px;
          text-align: center;
          margin-top: 30px;
          transition: all 0.5s;
          color: #555;
        }
        .addrB {
          width: 180px;
          text-align: center;
          letter-spacing: 2px;
          font-size: 14px;
          margin-top: 10px;
          transition: all 0.5s;
          color: #888;
        }

        &:hover {
          div {
            color: #82c720;
          }
          .addrA {
            font-size: 20px;
          }
          .addrB {
            font-size: 16px;
          }
        }
      }
      .img3 {
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #ededed;
        border-bottom: none;
        margin: 0 10px;
        img {
          width: 40%;
        }
        .codeA {
          width: 120px;
          font-size: 18px;
          letter-spacing: 2px;
          text-align: center;
          margin-top: 30px;
          transition: all 0.5s;
          color: #555;
        }
        .codeB {
          width: 180px;
          text-align: center;
          letter-spacing: 2px;
          font-size: 14px;
          margin-top: 10px;
          transition: all 0.5s;
          color: #888;
        }

        &:hover {
          div {
            color: #82c720;
          }
          .codeA {
            font-size: 20px;
          }
          .codeB {
            font-size: 16px;
          }
        }
      }
    }

    .amap-wrapper {
      width: 90%;
      height: 600px;
      margin: 50px auto;
    }
  }
}
</style>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
