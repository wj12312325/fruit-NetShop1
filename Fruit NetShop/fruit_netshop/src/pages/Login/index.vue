<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0">扫描登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              auto-complete="on"
              label-position="left"
              class="login-form"
            >
              <div style="height: 95px">
                <el-form-item
                  prop="phone"
                  class="input-text clearFix"
                  :class="validatePHO ? 'validate' : ''"
                >
                  <img class="inputIconfont" src="./images/个人.png" />
                  <el-input
                    class="InputCss"
                    ref="phone"
                    placeholder="手机号"
                    v-model="loginForm.phone"
                    name="phone"
                    type="text"
                    maxlength="11"
                    @keyup.enter.native="login('loginForm')"
                    @focus="handlerFocus('phone')"
                  />
                </el-form-item>
                <el-form-item
                  prop="password"
                  class="input-text clearFix"
                  :class="{ validate: validatePAS }"
                >
                  <img class="inputIconfont" src="./images/密码.png" />
                  <!--  @keyup.enter.native="handleLogin" -->
                  <el-input
                    class="InputCss"
                    :key="passwordType"
                    ref="password"
                    :type="passwordType"
                    placeholder="请输入密码"
                    v-model="loginForm.password"
                    maxlength="20"
                    name="password"
                    @keyup.enter.native="login('loginForm')"
                    @focus="handlerFocus('password')"
                  />
                  <!-- @click="showPwd" -->
                  <!-- <span class="show-pwd">
                  <img
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
                  />
                </span> -->
                </el-form-item>
              </div>

              <div class="setting clearFix">
                <input
                  name="m1"
                  type="checkbox"
                  value="2"
                  checked=""
                  class="checkbox inline"
                />
                &nbsp;自动登录
              </div>
              <el-button
                :loading="loading"
                class="btn"
                @click.native.prevent="login('loginForm')"
              >
                登&nbsp;&nbsp;录
              </el-button>
            </el-form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/weixin.png" alt="" /></li>
                <li><img src="./images/qq.png" alt="" /></li>
                <li><img src="./images/ali.png" alt="" /></li>
              </ul>
              <router-link class="register" to="/register"
                >立即注册</router-link
              >
              <span class="registerSpan">还没有账户？ </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul class="helpLink">
        <li>
          每日鲜果 WWW.XXXXXX.COM.CN 版权所有
          <span class="space"></span>
        </li>
        <li>
          All Rights Reserved©2022-2023
          <span class="space"></span>
        </li>
        <li>公司统一信用码 000000000000000000</li>
      </ul>
      <p>
        <span style="font-weight: 700">地址：</span>
        某某省某某市某某区某某街道XXX号
      </p>
      <p><span style="font-weight: 700">许可证：</span>京ICP备123456789号</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validatePhone = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/
      if (!value) {
        this.validatePHO = true
        callback(new Error('手机号不能为空！'))
      } else if (!reg.test(value)) {
        this.validatePHO = true
        callback(new Error('手机号格式不正确！'))
      } else {
        this.validatePHO = false
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        this.validatePAS = true
        callback(new Error('密码长度不能少于4位'))
      } else {
        this.validatePAS = false
        callback()
      }
    }
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      validatePHO: false,
      validatePAS: false
    }
  },
  methods: {
    //用户登录
    login(formName) {
      //表单全部验证
      this.$refs[formName].validate(async (value) => {
        if (value) {
          let { phone, password } = this.loginForm
          try {
            phone &&
              password &&
              (await this.$store.dispatch('user/login', { password, phone }))
            this.$store.dispatch('user/getUserInfo')
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            let toPath = this.$route.query.redirect || '/home'
            this.$router.push(toPath)
          } catch (error) {
            this.$message({
              type: 'error',
              message: error
            })
          }
        } else {
          if (this.validatePHO) {
            this.$refs.phone.focus()
            setTimeout(() => {
              this.validatePHO = false
            }, 1000)
          }
          if (this.validatePAS) {
            setTimeout(() => {
              this.validatePAS = false
            }, 1000)
            if (!this.validatePHO) {
              this.$refs.password.focus()
            }
          }
        }
      })
    },
    //获取焦点时
    handlerFocus(value) {
      if (value == 'phone') {
        setTimeout(() => {
          this.validatePHO = false
        }, 1000)
      } else {
        setTimeout(() => {
          this.validatePAS = false
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    height: 487px;
    background-color: #eeeff3;

    .login {
      width: 1200px;
      height: 487px;
      margin: 0 auto;
      background: url(./images/bg2.jpg) no-repeat;
    }

    .loginform {
      width: 420px;
      height: 405px;
      box-sizing: border-box;
      background: #fff;
      float: right;
      top: 45px;
      position: relative;
      padding: 20px;
      border-radius: 20px;

      .tab {
        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
            border-radius: 20px 0 0 0;
          }

          .current {
            border-bottom: none;
            border-top-color: #628e05;
            border-top: 2px solid #628e05;
            color: #628e05;
            border-radius: 0 20px 0 0;
          }
        }
      }

      .content {
        width: 380px;
        height: 315px;
        box-sizing: border-box;
        border-top: none;
        padding: 18px;
        border-radius: 0 0 20px 20px;
        border: 1px solid #ddd;

        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            margin-bottom: 16px;

            .inputIconfont {
              float: left;
              width: 37px;
              height: 32px;
              border: 2px solid #ccc;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
              box-shadow: 0 0 0.4vw rgba(0, 0, 0, 0.5), 0 0 0 0.15vw transparent;
              transition: 0.4s;
            }

            .InputCss {
              width: 30px;
              height: 32px;
              box-sizing: border-box;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;
              border-radius: 0 2px 2px 0;
              outline: none;

              margin-bottom: 2px;
            }
            // .InputCss:hover {
            //   box-shadow: 0 0 0 0.15vw #82c720;
            // }

            // .InputCss:focus {
            //   box-shadow: 0 0 0 0.15vw #82c720;
            // }
          }

          .setting {
            margin-top: 30px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            .checkbox {
              height: 20px;
              line-height: 20px;
            }
            label {
              margin-top: 20px;
              margin-bottom: -15px;
              float: left;
            }
          }
          .btn {
            background-color: #628e05;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #628e05;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 5px;
            outline: none;
            z-index: -1;
            transition: all 0.3s;
          }
          .btn:hover {
            background-color: #82c720;
            border: 1px solid #82c720;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }
          .registerSpan {
            float: right;
            line-height: 38px;
            color: #848996;
            margin-right: 5px;
          }
          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .copyright {
    padding: 20px;

    .helpLink {
      text-align: center;

      li {
        display: inline;

        .space {
          border-left: 1px solid #666;
          width: 1px;
          height: 13px;
          background: #666;
          margin: 8px 10px;
        }
      }
    }

    p {
      margin: 10px 0;
      text-align: center;
    }
  }
}
</style>

<style scoped>
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
.validate {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
::v-deep .el-input__inner {
  z-index: 2;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-left: none;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 14px;
  line-height: 22px;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 0 2px 2px 0;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 500;
  box-shadow: 0 0 0.4vw rgba(0, 0, 0, 0.5), 0 0 0 0.15vw transparent;
  transition: 0.4s;

  position: relative;
  top: -5px;
  left: -8px;
  height: 30px;
  width: 300px;
}
::v-deep .el-form-item__content {
  width: 300px;
}
::v-deep .el-form-item.is-error .el-input__inner {
  border: 1px solid red;
}

::v-deep .el-input__inner:hover {
  box-shadow: 0 0 0 0.15vw #82c720;
}

::v-deep .el-input__inner:focus {
  box-shadow: 0 0 0 0.15vw #82c720;
}

::v-deep .el-form-item__error {
  position: relative;
  top: 32px;
  left: -29px;
  color: red;
  margin-bottom: -20px;
}
.login-form {
  position: relative;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  /* // color: $dark_gray; */
  cursor: pointer;
  user-select: none;
}
</style>
