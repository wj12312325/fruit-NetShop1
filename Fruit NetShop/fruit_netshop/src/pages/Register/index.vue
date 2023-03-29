<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <el-form
        label-width="90px"
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="name" label="用户名:" class="content">
          <el-input
            placeholder="请输入你的用户名"
            v-model="registerForm.name"
            ref="name"
            name="name"
            type="text"
            maxlength="16"
            :class="vName ? 'validate' : ''"
            @focus="handlerFocus('name')"
          />
        </el-form-item>
        <el-form-item prop="phone" label="手机号:" class="content">
          <el-input
            placeholder="请输入你的手机号"
            v-model="registerForm.phone"
            ref="phone"
            name="phone"
            type="text"
            maxlength="11"
            :class="vPhone ? 'validate' : ''"
            @focus="handlerFocus('phone')"
          />
        </el-form-item>

        <el-form-item prop="password" label="密码:" class="content">
          <el-input
            placeholder="请输入你的密码"
            v-model="registerForm.password"
            ref="password"
            name="password"
            type="password"
            maxlength="20"
            :class="vPassword ? 'validate' : ''"
            @focus="handlerFocus('password')"
          />
        </el-form-item>
        <el-form-item label="确认密码:" prop="password1" class="content">
          <el-input
            placeholder="请输入确认密码"
            v-model="registerForm.password1"
            ref="password1"
            name="password1"
            type="password"
            maxlength="20"
            :class="vPassword1 ? 'validate' : ''"
            @focus="handlerFocus('password1')"
          />
        </el-form-item>
        <el-form-item
          prop="agree"
          class="controls"
          style="position: relative; left: 400px"
        >
          <el-checkbox
            v-model="registerForm.agree"
            :class="vAgree ? 'validate' : ''"
            ref="agree"
            @focus="handlerFocus('agree')"
            >&nbsp; 同意协议并注册《每日鲜果用户协议》</el-checkbox
          >
        </el-form-item>
        <div class="btn">
          <el-button @click="register('registerForm')">完成注册</el-button>
        </div>
      </el-form>
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
  name: 'Register',
  data() {
    const validateName = (rule, value, callback) => {
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      if (!value) {
        this.vName = true
        callback(new Error('用户名不能为空！'))
      } else if (!reg.test(value)) {
        this.vName = true
        callback(new Error('用户名要求1~16之间，不包括特殊字符'))
      } else {
        this.vName = false
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/
      if (!value) {
        this.vPhone = true
        callback(new Error('手机号不能为空！'))
      } else if (!reg.test(value)) {
        this.vPhone = true
        callback(new Error('手机号格式不正确！'))
      } else {
        this.vPhone = false
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      const reg = /^[0-9A-Za-z]{6,20}$/
      if (value.length < 6) {
        this.vPassword = true
        callback(new Error('密码长度不能少于6位'))
      } else if (!reg.test(value)) {
        this.vPassword = true
        callback(new Error('密码长度要求在6~20之间，不包括特殊字符'))
      } else {
        this.vPassword = false
        callback()
      }
    }
    const validatePassword1 = (rule, value, callback) => {
      if (value === '') {
        this.vPassword1 = true
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        this.vPassword1 = true
        callback(new Error('两次输入密码不一致！'))
      } else {
        this.vPassword = false
        callback()
      }
    }
    const validateAgree = (rule, value, callback) => {
      if (value === false) {
        this.vAgree = true
        callback(new Error('协议需同意！'))
      } else {
        this.vAgree = false
        callback()
      }
    }
    return {
      registerForm: {
        //用户名
        name: '',
        //手机号
        phone: '',
        //密码
        password: '',
        //确认密码
        password1: '',
        //是否同意协议
        agree: true
      },
      registerRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        password1: [
          { required: true, trigger: 'blur', validator: validatePassword1 }
        ],
        agree: [{ required: true, trigger: 'change', validator: validateAgree }]
      },
      vName: false,
      vPhone: false,
      vPassword: false,
      vPassword1: false,
      vAgree: false
    }
  },
  methods: {
    //注册
    register(formName) {
      this.$refs[formName].validate(async (value) => {
        var { phone, password, name } = this.registerForm
        if (value) {
          try {
            await this.$store.dispatch('user/userRegister', {
              name,
              phone,
              password
            })
            this.$message({
              type: 'success',
              message: '注册成功'
            })
            this.$router.push('/login')
          } catch (error) {
            this.$message({
              type: 'error',
              message: error,
              duration: 5 * 1000
            })
          }
        } else {
          if (this.vName) {
            this.$refs.name.focus()
            setTimeout(() => {
              this.vName = false
            }, 1000)
          } else if (this.vPhone) {
            this.$refs.phone.focus()
            setTimeout(() => {
              this.vPhone = false
            }, 1000)
          } else if (this.vPassword) {
            this.$refs.password.focus()
            setTimeout(() => {
              this.vPassword = false
            }, 1000)
          } else if (this.vPassword1) {
            this.$refs.password1.focus()
            setTimeout(() => {
              this.vPassword1 = false
            }, 1000)
          } else if (this.vAgree) {
            setTimeout(() => {
              this.vAgree = false
            }, 1000)
          }
        }
      })
    },
    //获取焦点时
    handlerFocus(value) {
      if (value == 'name') {
        setTimeout(() => {
          this.vName = false
        }, 1000)
      } else if (value == 'phone') {
        setTimeout(() => {
          this.vPhone = false
        }, 1000)
      } else if (value == 'password') {
        setTimeout(() => {
          this.vPassword = false
        }, 1000)
      } else if (value == 'password1') {
        setTimeout(() => {
          this.vPassword1 = false
        }, 1000)
      } else if (value == 'agree') {
        setTimeout(() => {
          this.vAgree = false
        }, 1000)
      }
    }
  }
  // computed: {}
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 406px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #82c720;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;
      height: 38px;
      width: 270px;

      // input {
      //   width: 270px;
      //   height: 38px;
      //   padding-left: 8px;
      //   box-sizing: border-box;
      //   margin-left: 5px;
      //   outline: none;
      //   border: 1px solid #999;
      // }
      // input:hover {
      //   box-shadow: 0 0 0 0.15vw #82c720;
      // }

      // input:focus {
      //   box-shadow: 0 0 0 0.15vw #82c720;
      // }

      img {
        vertical-align: sub;
      }
    }

    .btn {
      position: relative;
      height: 36px;
      left: -40px;
      text-align: center;
      line-height: 36px;
      margin: 40px 0 0 85px;

      button {
        outline: none;
        width: 270px;
        height: 36px;

        background: #628e05;
        color: #fff !important;
        display: inline-block;
        border: #628e05;
        font-size: 16px;
        transition: all 0.3s;
      }
    }
    button:hover {
      height: 36px;
      background-color: #82c720;
    }
  }

  // .copyright {
  //   width: 1200px;
  //   margin: 0 auto;
  //   text-align: center;
  //   line-height: 24px;

  //   ul {
  //     li {
  //       display: inline-block;
  //       border-right: 1px solid #e4e4e4;
  //       padding: 0 20px;
  //       margin: 15px 0;
  //     }
  //   }
  // }
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
  position: relative;
  top: -40px;
  left: -15px;
  width: 270px;
  height: 38px;
  padding-left: 8px;
  box-sizing: border-box;
  margin-left: 5px;
  outline: none;
  border: 1px solid #999;
}

::v-deep .el-input__inner:hover {
  box-shadow: 0 0 0 0.15vw #82c720;
}

::v-deep .el-input__inner:focus {
  box-shadow: 0 0 0 0.15vw #82c720;
}

::v-deep .el-form-item__error {
  position: relative;
  z-index: -5;
  top: -42px;
  left: -7px;
  color: red;
  margin-bottom: -20px;
}

.controls ::v-deep .el-form-item__content {
  left: -20px;
  height: 15px;
}
.controls ::v-deep .el-form-item__error {
  top: -15px;
  left: 32px;
}
::v-deep .el-form-item__label {
  font-size: 14px;
}
::v-deep .el-form-item__content {
  position: relative;
}
</style>
