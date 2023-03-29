<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(img, index) in goodsImageList"
        :key="index"
      >
        <img
          :src="`http://localhost:8888/${img}`"
          :class="{ active: currentIndex == index }"
          @click="changeImage(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    //使用对象的形式，就将接收的数据的形式设置好并赋予一个默认值（空数组），以免飘红
    goodsImageList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    goodsImageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.mySwiper, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          //每页显示的数量
          slidesPerView: 3,
          //每次点击跳转的个数
          slidesPerGroup: 1
        })
      })
    }
  },
  methods: {
    //切换图片
    changeImage(index) {
      this.currentIndex = index
      //将数据给兄弟组件（用$bus）
      this.$bus.$emit('getIndex', index)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  margin-top: 10px;
  height: 56px;
  width: 400px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>
