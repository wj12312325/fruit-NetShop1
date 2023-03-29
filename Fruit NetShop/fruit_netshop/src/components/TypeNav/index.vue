<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="changeIndexLeave()" @mouseenter="openShow()">
        <!-- 三级联动 -->
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list" @click="goSearch" ref="itemRef">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.id"
              >
                <div class="oneCategory" @mouseenter="changeIndex(index)">
                  <img
                    :src="`${require(`./images/${index + 1}.png`)}`"
                    class="imgs"
                  />
                  <a
                    :data-categoryName="c1.category_name"
                    :data-category1Id="c1.id"
                    >{{ c1.category_name }}</a
                  >
                  <div class="divSpanC">
                    <span
                      class="spanC"
                      v-for="(c2, index) in c1.secondaryCategory"
                      :key="c2.id"
                      v-show="index < 3"
                      :data-categoryName="c2.category_name"
                      :data-category2Id="c2.id"
                      >{{ c2.category_name }}
                    </span>
                  </div>
                </div>
                <!-- 二级分类与其下面的商品 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex == index ? 'block' : 'none',
                    'background-image': `url(${require(`./images/${
                      index + 10
                    }.jpg`)})`
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.secondaryCategory"
                    :key="c2.id"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.category_name"
                          :data-category2Id="c2.id"
                          >{{ c2.category_name }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.goodsList" :key="c3.id">
                          <a
                            :data-categoryName="c3.goods_name"
                            :data-goodsId="c3.id"
                            >{{ c3.goods_name }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- 导航条 -->
      <nav class="nav">
        <div>
          <router-link to="/home">网站首页</router-link>
        </div>
        <div><a @click="toA">限时抢购</a></div>
        <div><a @click="toB">热卖水果</a></div>
        <div><a @click="toC">联系我们</a></div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      show: true
    }
  },
  methods: {
    //使用节流
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    //搜索页面全部商品鼠标移入关闭
    changeIndexLeave() {
      this.currentIndex = -1
      if (this.$route.name == 'search') {
        this.show = false
      }
    },
    //搜索页面全部商品鼠标移入展开
    openShow() {
      if (this.$route.name == 'search') {
        this.show = true
      }
    },
    //跳转搜索页
    goSearch(event) {
      let element = event.target
      let { categoryname, category1id, category2id, goodsid } = element.dataset
      let location = { name: 'search' }
      let query = { categoryName: categoryname }
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.goodsId = goodsid
        }
        //  判断：是否带params参数 有则加上
        if (this.$route.params) {
          location.params = this.$route.params
        }
        location.query = query
        this.$router.push(location)
      }
    },
    toA() {
      this.$parent.toA()
    },
    toB() {
      this.$parent.toB()
    },
    toC() {
      this.$parent.toC()
    }
  },
  async mounted() {
    await this.$store.dispatch('category/getCategoryList')
    if (this.$route.name == 'search' || this.$route.name == 'detail') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.category.categoryList || []
    })
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #628e05;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
  }

  .all {
    width: 250px;
    height: 60px;
    background-color: #628e05;
    color: #fff;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    transition: all 0.3s;
    border-bottom: 1px solid white;

    &:hover {
      background-color: #82c720;
      font-size: 18px;
    }
  }

  .nav {
    display: flex;
    div {
      width: 220px;
      height: 60px;
      text-align: center;
      margin: 0 15px;
      line-height: 60px;

      a {
        cursor: pointer;
        font-size: 20px;
        color: #333;
        text-decoration: none;
        transition: all 0.3s;
      }
      &:hover {
        a {
          color: #82c720;
          font-size: 24px;
        }
        //   transform: scale(2);
        //   -ms-transform: scale(2);
        //   -webkit-transform: scale(2);
        //   -o-transform: scale(2);
        //   -moz-transform: scale(2);
      }
    }
  }

  .sort {
    position: absolute;
    left: 0;
    background-color: #82c720;
    width: 250px;
    height: 505px;
    z-index: 999;

    .all-sort-list {
      height: 500px;
      overflow: hidden;

      .item {
        margin: 0 0 0 15px;
        border-bottom: 1px solid white;
        .imgs {
          width: 25px;
          color: white;
          margin-right: 5px;
          margin-top: 5px;
          position: relative;
          top: 5px;
        }
        .oneCategory {
          line-height: 100px;
          font-size: 22px;
          padding: 0 20px;
          height: 100px;
          background-position: right;
          transition: all 0.5s;
          background-size: 24px;
          background-repeat: no-repeat;

          a {
            cursor: pointer;

            color: white;
          }
          .divSpanC {
            height: 20px;
            position: relative;
            color: white;
            left: 92px;
            top: -72px;
            .spanC {
              cursor: pointer;
              font-size: 14px;
            }
          }

          &:hover {
            margin-left: 10px;
            background-color: white;
            background-image: url('./images/向右1.png');

            a {
              color: #82c720;
            }

            .spanC {
              color: #82c720;
            }
          }
        }
      }

      .item-list {
        position: absolute;
        width: 1050px;
        min-height: 503px;
        background-repeat: no-repeat;
        left: 250px;
        background-size: 1050px 505px;
        border: 1px solid #ddd;
        top: 0;
        z-index: 9999 !important;

        .subitem {
          float: left;
          width: 905px;
          padding: 0 4px 0 20px;
          font-size: 16px;

          dl {
            // border-bottom: 1px solid #333;
            padding: 15px 0px;
            overflow: hidden;
            zoom: 1;

            &:hover {
              background-color: #e0dada;
            }

            dt {
              float: left;
              width: 70px;
              line-height: 22px;
              text-align: right;
              padding: 3px 15px 0 0;
              font-weight: 700;
              transition: all 0.3s;
              a {
                cursor: pointer;
              }

              &:hover {
                font-size: 22px;
                a {
                  color: #628e05;
                }
              }
            }

            dd {
              float: left;
              width: 800px;
              padding: 3px 0 0;
              overflow: hidden;

              em {
                float: left;
                height: 20px;
                line-height: 14px;
                padding: 0 8px;
                margin-top: 5px;
                border-left: 1px solid #ccc;
                font-size: 14px;
                transition: all 0.3s;
                a {
                  cursor: pointer;
                }
                &:hover {
                  font-size: 18px;
                  a {
                    color: #628e05;
                  }
                }
              }
            }
          }
        }
      }
    }

    //全部商品分类展开（开始）过渡动画
    .sort-enter,
    .sort-leave-to {
      height: 0;
    }

    //全部商品分类展开（结束）过渡动画
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }

    //全部商品分类展开 过渡动画的效果
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.3s linear;
      overflow: hidden;
    }
  }
}
</style>
