<template>
  <div class="a">
    <div class="myinfo">
      <div class="info">
        <img class="photo" :src="userImg" />
        <div class="name">
          <div class="n1">名字:</div>
          <div class="n2">{{ userInfo.name }}</div>
        </div>
        <router-link to="/center/myaddress" class="userAddr">
          <div class="userAddr1">
            <img src="../images/我的地址.png" alt="" />
            <span>我的收货地址</span>
          </div>
        </router-link>
        <img class="weather" src="https://api.vvhan.com/api/ipCard" />
      </div>
      <div></div>
      <el-button type="text" @click="openUpdate" class="updateInfo"
        >修改个人信息</el-button
      >

      <el-dialog
        title="修改个人信息"
        :visible.sync="dialogFormVisible"
        width="30%"
        :lock-scroll="false"
        :before-close="closeUpdate"
      >
        <el-form
          :model="userData"
          label-width="80px"
          style="width: 80%"
          ref="updateUserInfo"
          :rules="updateUserInfoRules"
        >
          <el-form-item label="名字" prop="name">
            <el-input
              v-model="userData.name"
              autocomplete="off"
              ref="name"
              name="name"
              type="text"
              maxlength="16"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="userData.password"
              autocomplete="off"
              ref="password"
              name="password"
              type="password"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!--  :http-request="upAvatar" -->
            <el-upload
              class="avatar-uploader"
              action="/api/goods/upload"
              ref="upload"
              :multiple="false"
              :show-file-list="false"
              :auto-upload="false"
              :file-list="fileListt"
              :on-change="change"
            >
              <img
                v-if="userData.user_img"
                :src="userData.user_img"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeUpdate">取 消</el-button>
          <el-button type="primary" @click="updateUserInfo('updateUserInfo')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <div class="myorder">
        <div class="myorder1">
          <router-link to="/center/myorder">
            <img src="../images/我的订单.png" />
            <span>我的订单</span>
          </router-link>
        </div>

        <div class="orderAll">
          <div class="o1" @click="toMyOrder(0)">
            <img src="../images/待支付.png" alt="" />
            <el-badge :value="orderStatues.status0" class="item">
              <el-button size="small">待支付</el-button>
            </el-badge>
          </div>
          <div class="o2" @click="toMyOrder(1)">
            <img src="../images/等待发货.png" alt="" />
            <el-badge :value="orderStatues.status1" class="item">
              <el-button size="small">待发货</el-button>
            </el-badge>
          </div>
          <div class="o3" @click="toMyOrder(2)">
            <img src="../images/配送中.png" alt="" />

            <el-badge :value="orderStatues.status2" class="item">
              <el-button size="small">已发货</el-button>
            </el-badge>
          </div>
          <div class="o4" @click="toMyOrder(3)">
            <img src="../images/已完成.png" alt="" />
            <el-badge :value="orderStatues.status3" class="item">
              <el-button size="small">已完成</el-button>
            </el-badge>
          </div>
          <div class="o5" @click="toMyOrder(4)">
            <img src="../images/已取消.png" alt="" />
            <el-badge :value="orderStatues.status4" class="item">
              <el-button size="small">已取消</el-button>
            </el-badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue'
import { mapState } from 'vuex'
export default {
  name: 'MyInfo',
  data() {
    const validateName = (rule, value, callback) => {
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      if (!value) {
        callback(new Error('用户名不能为空！'))
      } else if (!reg.test(value)) {
        callback(new Error('用户名要求1~16之间，不包括特殊字符'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      const reg = /^[0-9A-Za-z]{4,20}$/
      if (value.length == 0) {
        callback()
      } else if (value.length > 0 && value.length < 4) {
        callback(new Error('密码长度不能少于4位'))
      } else if (!reg.test(value)) {
        callback(new Error('密码长度要求在4~20之间，不包括特殊字符'))
      } else {
        callback()
      }
    }
    return {
      a: '',
      b: '',
      c: '',
      fileListt: [],
      dialogFormVisible: false,
      updated: false,
      avatarImg: '',
      userData: {
        name: '',
        password: '',
        user_img: ''
      },
      updateUserInfoRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      orderStatues: {
        status0: 0,
        status1: 0,
        status2: 0,
        status3: 0,
        status4: 0
      },
      pageNum: 1,
      pageSize: 1000
    }
  },
  methods: {
    //获取用户订单信息
    async getMyOrderList() {
      const { pageNum, pageSize } = this
      let params = { pageNum, pageSize }
      await this.$store.dispatch('order/getOrderList1', params)
    },
    //图片上传状态改变
    change(file, fileList) {
      this.userData.user_img = URL.createObjectURL(file.raw)
      this.$refs.upload.clearFiles() // 清空file-list
      let lastFile = fileList[fileList.length - 1] // 获取最后一张图片
      this.fileListt = [lastFile]
      if (file.response) {
        this.avatarImg = file.response.result.goodsImg
        this.updateInfo()
        this.updated = true
      }
    },
    //打开修改
    openUpdate() {
      this.updated = false
      this.dialogFormVisible = true
      this.userData.name = this.userInfo.name
      this.userData.password = ''
      this.userData.user_img = 'http://localhost:8888/' + this.userInfo.user_img
      this.a = this.userData.name
      this.b = this.userData.user_img
      this.c = this.userData.password
    },
    //取消修改
    closeUpdate() {
      this.dialogFormVisible = false
      this.userData.name = ''
      this.userData.user_img = ''
      this.userData.password = ''
      this.$refs.updateUserInfo.resetFields()
      this.a = ''
      this.b = ''
      this.c = ''
    },
    //修改用户信息
    updateUserInfo(formName) {
      this.$refs[formName].validate(async (value) => {
        if (value) {
          await this.$refs.upload.submit()
          if (
            this.a != this.userData.name ||
            this.c != this.userData.password
          ) {
            this.updated = true
          } else {
            this.dialogFormVisible = false
          }
          if (this.updated) {
            this.updateInfo()
          }
        }
      })
    },
    async updateInfo() {
      try {
        let data = {
          name: this.userData.name,
          password: this.userData.password,
          user_img: this.avatarImg
            ? this.avatarImg
            : this.userData.user_img.split('8888/')[1]
        }
        if (data.password == '') {
          delete data.password
        }
        if (data.user_img !== undefined) {
          if (
            this.a == this.userData.name &&
            this.b == this.userData.user_img &&
            this.userData.password == ''
          ) {
            this.dialogFormVisible = false
          } else {
            await this.$store.dispatch('user/updateUserInfo', data)
            this.$store.dispatch('user/getUserInfo')
            this.$message({
              type: 'success',
              message: '修改用户信息成功'
            })
          }
        }
        this.dialogFormVisible = false
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },
    toMyOrder(value) {
      this.$router.push({
        name: 'myorder',
        params: { status: value }
      })
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch('user/getUserInfo')
      this.getMyOrderList()
    } catch (error) {}
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo || {},
      orderList1: (state) => state.order.orderList1 || []
    }),
    userImg() {
      if (this.userInfo.user_img) {
        return `http://localhost:8888/${this.userInfo.user_img}`
      } else {
        return '../images/默认头像.webp'
      }
    }
  },
  watch: {
    //计算每个订单的状态
    orderList1() {
      this.orderList1.forEach((item) => {
        if (item.status == 0) {
          this.orderStatues.status0++
        } else if (item.status == 1) {
          this.orderStatues.status1++
        } else if (item.status == 2) {
          this.orderStatues.status2++
        } else if (item.status == 3) {
          this.orderStatues.status3++
        } else if (item.status == 4) {
          this.orderStatues.status4++
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.a {
  margin-left: 220px;
  width: 950px;
  height: 550px;
  border: 1px solid #f0f3ef;
  background-color: #f0f3ef;

  .myinfo {
    .info {
      width: 900px;
      margin: 20px auto;
      height: 220px;
      border-radius: 50px;
      display: flex;
      background-color: #fff;
      .photo {
        margin: 20px 10px;
        width: 150px;
        height: 150px;
        border-radius: 20px;
        transition: all 0.5s;
        &:hover {
          transform: scale(1.1);
          -ms-transform: scale(1.1);
          -webkit-transform: scale(1.1);
          -o-transform: scale(1.1);
          -moz-transform: scale(1.1);
        }
      }
      .name {
        display: flex;
        width: 200px;
        height: 100px;
        font-size: 24px;
        line-height: 100px;
        justify-content: center;
        margin-top: 50px;

        .n2 {
          margin-left: 30px;
          font-weight: bold;
          font-size: 26px;
          &:hover {
            color: #c21717;
          }
        }
      }

      .userAddr {
        text-decoration: none;
        .userAddr1 {
          img {
            margin-top: 6px;
            height: 40px;
            margin-right: 15px;
          }
          display: flex;
          width: 180px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          font-size: 18px;
          margin-top: 70px;
          letter-spacing: 1px;
          transition: all 0.5s;
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
            color: #77b72c;
          }
        }
      }
      .weather {
        margin-top: 15px;
        margin-left: 10px;
        height: 190px;
        border-radius: 50px;
      }
    }
  }
  .updateInfo {
    position: relative;
    top: -60px;
    left: 65px;
    font-size: 16px;
    transition: all 0.5s;
    &:hover {
      color: #77b72c;
    }
  }
  .myorder {
    width: 95%;
    height: 240px;
    margin: 10px auto;
    margin-top: -30px;
    background-color: #fff;

    .myorder1 {
      height: 60px;
      a {
        text-decoration: none;
      }

      img {
        width: 50px;
        height: 50px;
        margin: 20px;
      }
      span {
        position: relative;
        top: -35px;
        left: 10px;
        font-size: 24px;
        transition: all 0.5s;
        &:hover {
          font-size: 26px;
          color: #77b72c;
        }
      }
    }
    .orderAll {
      border-top: 1px solid #ccc;
      width: 96%;
      height: 130px;
      margin: 10px auto;
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        width: 60px;
        transition: all 0.5s;
      }

      .o1 {
        width: 80px;
        height: 100px;
        .item {
          margin-top: 50px;
          margin-left: -65px;
          transition: all 0.5s;
        }
        &:hover {
          .item {
            margin-left: -70px;
          }
          img {
            width: 70px;
          }
        }
      }
      .o2 {
        width: 80px;

        height: 100px;
        .item {
          margin-top: 50px;
          margin-left: -65px;
          transition: all 0.5s;
        }
        &:hover {
          .item {
            margin-left: -70px;
          }
          img {
            width: 70px;
          }
        }
      }
      .o3 {
        width: 80px;
        margin-top: 20px;
        height: 100px;
        .item {
          margin-top: 50px;
          margin-left: -65px;
          transition: all 0.5s;
        }
        &:hover {
          .item {
            margin-left: -70px;
          }
          img {
            width: 70px;
          }
        }
      }
      .o4 {
        width: 80px;
        margin-top: 11px;
        height: 100px;
        .item {
          margin-top: 50px;
          margin-left: -65px;
          transition: all 0.5s;
        }
        &:hover {
          .item {
            margin-left: -70px;
          }
          img {
            width: 70px;
          }
        }
      }
      .o5 {
        width: 80px;

        height: 100px;
        .item {
          margin-top: 50px;
          margin-left: -65px;
          transition: all 0.5s;
        }
        &:hover {
          .item {
            margin-left: -70px;
          }
          img {
            width: 70px;
          }
        }
      }
    }
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
