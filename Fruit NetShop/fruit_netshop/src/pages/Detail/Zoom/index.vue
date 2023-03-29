<template>
  <div class="spec-preview">
    <img :src="`http://localhost:8888/${goodsImageList[this.currentIndex]}`" />
    <div class="event" @mousemove="mouseMoveHandle"></div>
    <div class="big">
      <img
        :src="`http://localhost:8888/${goodsImageList[this.currentIndex]}`"
        ref="big"
      />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
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
  computed: {
    //因为使用props传参时，当数据没到就进行渲染时，goodsImageList[0]是underfine，而underfine.imgUrl会飘红，但程序可以运行（无影响），所以要先将其设置为{}，
    imgObj() {
      return this.goodsImageList[this.currentIndex] || {}
    }
  },
  mounted() {
    this.$bus.$on('getIndex', (index) => {
      this.currentIndex = index
    })
  },
  methods: {
    mouseMoveHandle(event) {
      let { mask, big } = this.$refs
      //offsetX:鼠标坐标到元素的左侧的距离，offsetWidth：像素宽度,宽度包含内边距(padding)和边框(border),不包含外边距(margin),是一个整数,单位是像素 px。
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2
      //给left和top设置范围：
      if (left < 0) left = 0
      if (left > mask.offsetWidth) left = mask.offsetWidth
      if (top < 0) top = 0
      if (top > mask.offsetHeight) top = mask.offsetHeight

      //注意：修改stlye.left 后面一定要加上单位('px')!!!
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      big.style.left = -2 * left + 'px'
      big.style.top = -2 * top + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: #fff;
    opacity: 0.5;
    border: 1px solid green;
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
