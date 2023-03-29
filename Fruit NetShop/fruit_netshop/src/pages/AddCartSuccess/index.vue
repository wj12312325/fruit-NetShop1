<template>
  <div class="cart-complete-wrap">
    <div class="b">
      <div class="a">
        <div class="cart-complete">
          <h3><i class="icon-pc-right"></i>商品已成功加入购物车！</h3>
          <div class="goods">
            <div class="left-good">
              <div class="left-pic">
                <img :src="`http://localhost:8888/${goodsInfo.goods_img[0]}`" />
              </div>
              <div class="right-info">
                <p class="title">{{ goodsInfo.goods_name }}</p>
                <p class="attr">
                  {{ goodsInfo.goods_introduction }}
                  <span> 数量：{{ $route.query.number || number }}</span>
                </p>
              </div>
            </div>
            <div class="right-gocart">
              <a class="sui-btn btn-xlarge" @click="$router.go(-1)"
                >查看商品详情</a
              >
              <router-link to="/shopCart">去购物车结算 > </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCartSuccess',
  data() {
    return {
      number: 0
    }
  },
  computed: {
    goodsInfo() {
      return JSON.parse(sessionStorage.getItem('goodsInfo'))
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.number = from.query.number
      if (from.path.indexOf('/login') !== -1) {
        vm.$store.dispatch('cart/addCart', {
          good_id: from.query.good_id,
          number: from.query.number
        })
      }
      vm.$message({
        type: 'success',
        message: '添加购物车成功'
      })
    })
  }
}
</script>

<style lang="less" scoped>
.cart-complete-wrap {
  margin-top: 20px;
  width: 100%;
  background-color: #f4f4f4;

  .b {
    width: 1500px;
    min-width: 1500px;
    margin: 0 auto;
    .a {
      width: 1400px;
      margin: 0 auto;
      .cart-complete {
        margin-left: 100px;
        h3 {
          font-weight: 400;
          font-size: 24px;
          color: #6aaf04;
          padding-top: 15px;
          padding-bottom: 15px;
          margin: 0;

          .icon-pc-right {
            background-color: #fff;
            border: 2px solid #6aaf04;
            padding: 3px;
            margin-right: 8px;
            border-radius: 15px;
          }
        }

        .goods {
          padding: 10px 0;

          .left-good {
            width: 1400px;
            display: flex;
            .left-pic {
              border: 1px solid #dfdfdf;
              width: 60px;
              img {
                width: 150px;
                height: 150px;
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

            .right-info {
              color: #444;
              float: left;
              margin-top: 30px;
              margin-left: 150px;

              .title {
                width: 100%;
                line-height: 28px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 20px;
                font-weight: bold;
                transition: all 0.5s;
                &:hover {
                  font-size: 22px;
                }
              }

              .attr {
                margin-top: 20px;
                font-size: 18px;
                color: #aaa;
                width: 600px;
                span {
                  margin-left: 50px;
                  color: red;

                  &:hover {
                    color: #6aaf04;
                  }
                }
              }
            }
          }

          .right-gocart {
            margin-top: -100px;
            margin-left: 200px;
            float: right;
            cursor: pointer;

            a {
              padding: 15px 50px;
              font-size: 17px;
              line-height: 22px;
              border-radius: 0 20px 20px 0;
              color: #333;
              background-color: #eee;
              text-decoration: none;
              box-sizing: border-box;
              border: 1px solid #e1e1e1;
              transition: all 0.5s;
            }

            a:hover {
              background-color: #f7f7f7;
              border: 1px solid #eaeaea;
            }

            a:active {
              background-color: #e1e1e1;
              border: 1px solid #d5d5d5;
            }

            .sui-btn {
              border-radius: 20px 0 0 20px;
              &:hover {
                color: #6aaf04;
              }
            }

            .btn-danger {
              background-color: #e1251b;
              color: #fff;
            }

            .btn-danger:hover {
              background-color: #e1251b;
            }
          }
        }
      }
    }
  }
}
</style>
