<template>
  <div class="user-container">
    <el-form inline class="search">
      <!-- 表单元素 -->
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.phone" placeholder="手机号/账号" />
      </el-form-item>
      <el-form-item>
        <!-- <el-input v-model="searchObj.name" placeholder="用户名" /> -->
        <el-select v-model="searchObj.role" placeholder="请选择身份">
          <el-option
            v-for="item in roleList"
            :key="item.role"
            :label="item.roleName"
            :value="item.role"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 查询与情况的按钮 -->
      <el-button
        type="primary"
        icon="el-icon-search"
        class="btn"
        @click="findUser"
        >查询</el-button
      >
      <el-button type="info" class="btn" @click="resetSearch">清空</el-button>
    </el-form>

    <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      class="addBtn"
      @click="openAdduser"
      >新增用户</el-button
    >
    <el-dialog
      :title="titleName"
      :visible.sync="dialogFormVisible"
      width="35%"
      :lock-scroll="false"
      :before-close="closeDialog"
    >
      <el-form
        :model="userInfo"
        label-width="120px"
        style="width: 80%"
        ref="addOrUpdateUser"
        :rules="addOrUpdateUserRules"
      >
        <el-form-item label="手机号/账号：" prop="phone">
          <el-input
            placeholder="请输入手机号/账号"
            v-model="userInfo.phone"
            autocomplete="off"
            ref="phone"
            name="phone"
            type="text"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="name">
          <el-input
            placeholder="请输入用户名"
            v-model="userInfo.name"
            autocomplete="off"
            ref="name"
            name="name"
            type="text"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input
            :placeholder="placeholder"
            v-model="userInfo.password"
            autocomplete="off"
            ref="password"
            name="password"
            type="password"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码："
          prop="password1"
          v-if="titleName == '新增用户'"
        >
          <el-input
            placeholder="确认密码"
            v-model="userInfo.password1"
            autocomplete="off"
            ref="password1"
            name="password1"
            type="password"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份：" prop="role">
          <el-select v-model="userInfo.role" placeholder="请选择身份">
            <el-option
              v-for="item in roleList"
              :key="item.role"
              :label="item.roleName"
              :value="item.role"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户头像：">
          <el-upload
            class="avatar-uploader"
            action="/api/goods/upload"
            ref="upload"
            :multiple="false"
            :show-file-list="false"
            :auto-upload="false"
            :file-list="fileListt"
            :on-change="onChange"
          >
            <img
              v-if="userInfo.user_img"
              :src="userInfo.user_img"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateUser('addOrUpdateUser')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-table :data="userList" border class="userTable" stripe>
      <el-table-column
        prop="user_img"
        label="用户头像"
        align="center"
        width="200"
      >
        <template slot-scope="{ row }">
          <img
            :src="`http://localhost:8888/${row.user_img}`"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号/账号" align="center">
      </el-table-column>
      <el-table-column prop="role" label="用户身份" align="center">
        <template slot-scope="{ row }"> {{ roleName(row) }} </template>
      </el-table-column>
      <el-table-column label="用户收货地址" align="center" width="170">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-location"
            plain
            @click="toAddress(row)"
            >查看收货地址</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="用户购物车" align="center" width="170">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-shopping-cart-2"
            plain
            @click="toCart(row)"
            >查看购物车</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="用户订单" align="center" width="170">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-s-order"
            plain
            @click="toOrder(row)"
            >查看订单</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="设置" align="center" width="230">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="openUpdateUser(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteUser(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        :current-page="pageNum"
        :pager-count="5"
        :page-sizes="[3, 5, 7]"
        :page-size="pageSize"
        layout=" prev, pager,  next, sizes,jumper,->,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getUserList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "User",
  data() {
    const validateName = (rule, value, callback) => {
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
      if (!value) {
        callback(new Error("用户名不能为空！"));
      } else if (!reg.test(value)) {
        callback(new Error("用户名要求1~16之间，不包括特殊字符"));
      } else {
        callback();
      }
    };

    const validatePassword1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.password) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      const reg = /^[0-9A-Za-z]{4,20}$/;
      if (value.length < 4) {
        callback(new Error("手机号/账号不能少于4位"));
      } else if (!reg.test(value)) {
        callback(new Error("手机号/账号长度要求在4~20之间，不包括特殊字符"));
      } else {
        callback();
      }
    };
    const validateRole = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("身份不能为空"));
      } else {
        callback();
      }
    };
    return {
      searchObj: {
        name: "",
        phone: "",
        role: "",
      },
      tempSearchObj: {
        name: "",
        phone: "",
        role: "",
      },
      roleList: [
        {
          role: 0,
          roleName: "用户",
        },
        {
          role: 1,
          roleName: "商家",
        },
        {
          role: 2,
          roleName: "管理员",
        },
      ],
      userInfo: {
        name: "",
        phone: "",
        role: "",
        user_img: "http://localhost:8888/bda7bfb516d8490e40f8ba500.webp",
        password: "",
        password1: "",
        id: 0,
      },
      fileListt: [],
      avatarImg: "bda7bfb516d8490e40f8ba500.webp",
      pageNum: 1,
      pageSize: 5,
      titleName: "新增用户",
      dialogFormVisible: false,
      addOrUpdateUserRules: {
        name: [{ required: true, trigger: "blur", validator: validateName }],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (this.titleName == "新增用户") {
                const reg = /^[0-9A-Za-z]{4,20}$/;
                if (!value) {
                  callback(new Error("密码不能为空！"));
                } else if (!reg.test(value)) {
                  callback(new Error("密码长度要求在4~20之间，不包括特殊字符"));
                } else {
                  callback();
                }
              } else {
                const reg = /^[0-9A-Za-z]{4,20}$/;
                if (value.length == 0) {
                  callback();
                } else if (value.length > 0 && value.length < 4) {
                  callback(new Error("密码长度不能少于4位"));
                } else if (!reg.test(value)) {
                  callback(new Error("密码长度要求在4~20之间，不包括特殊字符"));
                } else {
                  callback();
                }
              }
            },
          },
        ],
        password1: [
          { required: true, trigger: "blur", validator: validatePassword1 },
        ],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        role: [{ required: true, trigger: "blur", validator: validateRole }],
      },
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    //获取用户列表
    async getUserList(page = 1) {
      this.pageNum = page;
      const { pageSize, pageNum, state = 1 } = this;
      const { name, role, phone } = this.tempSearchObj;
      let info = { pageSize, pageNum, state };
      name && Object.assign(info, { name });
      role && Object.assign(info, { role });
      phone && Object.assign(info, { phone });

      try {
        await this.$store.dispatch("user/getUserList", info);
        this.$message({
          type: "success",
          message: "获取用户列表成功",
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
    },
    //切换每页个数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getUserList();
    },
    //搜索用户
    findUser() {
      const { name, phone, role } = this.searchObj;
      this.tempSearchObj = {
        name,
        phone,
        role: role * 1,
      };
      this.getUserList();
    },
    //清空搜索
    resetSearch() {
      this.searchObj = {
        name: "",
        phone: "",
        role: "",
      };
      this.tempSearchObj = {
        name: "",
        phone: "",
        role: "",
      };
      this.getUserList();
    },
    //关闭Dialog
    closeDialog() {
      this.dialogFormVisible = false;
      this.userInfo.name = "";
      this.userInfo.user_img = "";
      this.userInfo.phone = "";
      this.userInfo.role = "";
      this.userInfo.id = "";
      this.$refs.addOrUpdateUser.resetFields();
    },
    //图片上传状态改变
    onChange(file, fileList) {
      this.userInfo.user_img = URL.createObjectURL(file.raw);
      this.$refs.upload.clearFiles(); // 清空file-list
      let lastFile = fileList[fileList.length - 1]; // 获取最后一张图片
      this.fileListt = [lastFile];
      if (file.response) {
        this.avatarImg = file.response.result.goodsImg;
      }
    },
    //打开新增用户
    openAdduser() {
      this.dialogFormVisible = true;
      this.titleName = "新增用户";
      this.userInfo.name = "";
      this.userInfo.phone = "";
      this.userInfo.password = "";
      this.userInfo.password1 = "";
      this.userInfo.user_img =
        "http://localhost:8888/bda7bfb516d8490e40f8ba500.webp";
    },
    //新增或修改用户信息
    addOrUpdateUser(formName) {
      this.$refs[formName].validate(async (value) => {
        if (value) {
          await this.$refs.upload.submit();
          setTimeout(async () => {
            try {
              this.userInfo.user_img = this.avatarImg;
              var { phone, password, name, role, user_img } = this.userInfo;
              let data = {
                name,
                phone,
                password,
                role,
                user_img,
              };
              if (this.titleName == "新增用户") {
                await this.$store.dispatch("user/addUser", data);
              } else {
                if (data.password == "") {
                  delete data.password;
                }
                let info = { id: this.userInfo.id, ...data };
                await this.$store.dispatch("user/updateUser", info);
              }
              this.$message({
                type: "success",
                message: `${this.titleName}成功`,
              });
              this.getUserList();
            } catch (error) {
              this.$message({
                type: "error",
                message: error,
              });
            }
          }, 500);
          this.dialogFormVisible = false;
        }
      });
    },
    //用户身份
    roleName(row) {
      if (row.role == 0) {
        return "用户";
      } else if (row.role == 1) {
        return "商家";
      } else {
        return "管理员";
      }
    },
    //去收货地址
    toAddress(row) {
      this.$router.push({
        path: "/address/index",
        query: { user_id: row.id },
      });
    },
    //去购物车
    toCart(row) {
      this.$router.push({
        path: "/cart/index",
        query: { user_id: row.id },
      });
    },
    //去订单
    toOrder(row) {
      this.$router.push({
        path: "/order/index",
        query: { user_id: row.id },
      });
    },
    //打开修改用户
    openUpdateUser(row) {
      this.dialogFormVisible = true;
      this.titleName = "修改用户";
      this.userInfo.phone = row.phone;
      this.userInfo.password = "";
      this.userInfo.name = row.name;
      this.userInfo.user_img = "http://localhost:8888/" + row.user_img;
      this.userInfo.role = row.role;
      this.userInfo.id = row.id;
    },
    //软删除用户
    async deleteUser(row) {
      this.$confirm(`确定删除 '${row.name}' 吗?`, "提示", {
        type: "warning",
      })
        .then(async () => {
          const result = await this.$store.dispatch("user/deleteUser", row.id);
          this.getUserList(
            this.userList.length === 1 ? this.pageNum - 1 : this.pageNum
          );
          this.$message.success(result.message || "删除成功!");
        })
        .catch((error) => {
          if (error == "cancel") {
            this.$message.info("已取消删除");
          } else {
            this.$message({
              type: "error",
              message: error,
            });
          }
        });
    },
  },
  computed: {
    ...mapState({
      userList: (state) => state.user.userList,
      total: (state) => state.user.total,
    }),
    placeholder() {
      if (this.titleName == "新增用户") {
        return "请输入密码";
      } else {
        return "为空代表不修改";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user-container {
  .search {
    margin: 30px 40px;
    margin-left: 100px;

    width: 800px;
  }
  .addBtn {
    margin: 0 40px;
    margin-left: 100px;
    font-size: 18px;
  }
  .userTable {
    margin: 30px auto;

    width: 90%;
  }
  .pagination {
    width: 660px;
    margin: 30px auto;
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
