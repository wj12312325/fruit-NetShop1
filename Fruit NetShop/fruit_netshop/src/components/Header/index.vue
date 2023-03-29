<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="a">
        <div class="container">
          <div class="loginList">
            <p>每日鲜果</p>
            &nbsp;
            <p>欢迎您！</p>
            <p v-if="!userInfo">
              <span>请</span>
              <router-link to="/login" style="color: red">登录</router-link>
              <router-link to="/register" class="register"
                >免费注册</router-link
              >
            </p>
            <p v-else>
              <a style="font-size: 14px; font-weight: 800">{{
                userInfo.name
              }}</a>
              <a class="register" @click="logOut">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center">个人中心</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">企业采购</a>
            <a href="###">合作招商</a>
            <a href="###" style="line-height: 30px">商家后台</a>
            <div class="phone">
              <img
                src="../../assets/images/电话.png"
                style="width: 30px; height: 30px"
              />
              <div class="number">138-8888-8888</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="b">
      <div class="c">
        <div class="bottom">
          <h1 class="logoArea">
            <router-link class="logo" to="/home">
              <img src="./images/logo1.png" alt="" />
            </router-link>
          </h1>
          <div class="searchArea">
            <form action="###" class="searchForm">
              <input
                type="text"
                id="autocomplete"
                class="input-error input-xxlarge"
                v-model="keyword"
                @keyup.enter="goSearch"
              />
              <button
                class="sui-btn btn-xlarge btn-danger"
                type="button"
                @click="goSearch"
              >
                搜索
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: ''
    }
  },
  mounted() {
    this.$bus.$on('clearKeyword', () => {
      this.keyword = ''
    })
    try {
      this.$store.dispatch('user/getUserInfo')
    } catch (error) {}
  },
  methods: {
    //退出登录
    logOut() {
      try {
        this.$store.dispatch('user/logOut')
        this.$router.push('/home')

        this.$message({
          type: 'success',
          message: '退出登录成功'
        })
        this.$router.push('/home')
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },
    //跳转到搜索页面
    goSearch() {
      // 路由传参
      let location = {
        name: 'search',
        params: { keyword: this.keyword || undefined }
      }
      if (this.$route.query) {
        location.query = this.$route.query
      }
      this.$router.push(location)
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  }
}
</script>

<style lang="less" scope>
.phone {
  height: 30px;
  width: 150px;
  background-color: #699728;
  float: right;
  line-height: 30px;
  display: flex;
}
.phone .number {
  font-size: 14px;
  color: white;
}
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .a {
      width: 1500px;
      margin: 0 auto;
      .container {
        margin-left: 150px;

        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          cursor: pointer;
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              color: #628e05;
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
              text-decoration: none;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;
            text-decoration: none;

            & + a {
              border-left: 1px solid #b3aeae;
            }
          }
        }
      }
    }
  }

  .b {
    .c {
      width: 1500px;
      margin: 0 auto;
      & > .bottom {
        margin: 0 auto;
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
          float: left;
          .logo {
            img {
              width: 200px;
              margin: 0px 45px;
            }
          }
        }
        .searchArea {
          float: right;
          margin-top: 60px;

          .searchForm {
            overflow: hidden;

            input {
              box-sizing: border-box;
              width: 490px;
              height: 32px;
              padding: 0px 4px;
              border: 2px solid #628e05;
              float: left;

              &:focus {
                outline: none;
              }
            }

            button {
              height: 32px;
              width: 68px;
              background-color: #628e05;
              border: none;
              color: #fff;
              float: left;
              cursor: pointer;

              &:focus {
                outline: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
