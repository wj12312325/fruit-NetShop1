<template>
  <div class="address-container">
    <el-form inline class="search">
      <!-- 表单元素 -->

      <el-form-item>
        <el-input v-model="searchObj.phone" placeholder="收货人手机号" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.consignee" placeholder="收货人姓名" />
      </el-form-item>

      <!-- 查询与情况的按钮 -->
      <el-button
        type="primary"
        icon="el-icon-search"
        class="btn"
        @click="findAddress"
        >查询</el-button
      >
      <el-button type="info" class="btn" @click="resetSearch">清空</el-button>
    </el-form>

    <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      class="addBtn"
      @click="openAddAddress"
      >新增收货地址</el-button
    >
    <el-button
      type="danger"
      icon="el-icon-delete"
      class="deleteBtn"
      @click="deleteSelected"
      :disabled="multipleSelection.length <= 0"
      >删除已选</el-button
    >
    <el-dialog
      :title="titleName"
      :visible.sync="dialogFormVisible"
      width="720px"
      :lock-scroll="false"
      :before-close="closeDialog"
    >
      <el-form
        :model="addressInfo"
        label-width="120px"
        style="width: 80%"
        ref="addOrUpdateAddress"
        :rules="addOrUpdateAddressRules"
      >
        <el-form-item label="收货人姓名：" prop="consignee">
          <el-input
            placeholder="请输入收货人姓名"
            v-model="addressInfo.consignee"
            autocomplete="off"
            ref="consignee"
            name="consignee"
            type="text"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号：">
          <el-input
            placeholder="请输入你的手机号"
            v-model="addressInfo.phone"
            ref="phone"
            name="phone"
            type="text"
            maxlength="11"
          />
        </el-form-item>

        <el-form-item prop="area" label="省市区：">
          <area-select
            v-if="dialogFormVisible"
            :level="2"
            type="text"
            v-model="addressInfo.area"
            :data="pcaa"
            size="small"
          ></area-select>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input
            placeholder="请输入收货的详细地址"
            v-model="addressInfo.address"
            autocomplete="off"
            ref="address"
            name="address"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="addOrUpdateAddress('addOrUpdateAddress')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-table
      :data="addressList"
      border
      class="addressTable"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="userInfo.name"
        label="用户名"
        align="center"
        width="145"
      >
      </el-table-column>
      <el-table-column
        prop="consignee"
        label="收货人姓名"
        align="center"
        width="145"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="收货人手机号"
        align="center"
        width="145"
      >
      </el-table-column>
      <el-table-column label="收货地区" align="center" width="220">
        <template slot-scope="{ row }">
          <span style="margin-right: 10px">{{ row.area[0] }}</span>
          <span style="margin-right: 10px">{{ row.area[1] }}</span>
          <span>{{ row.area[2] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="收货详细地址" align="center">
      </el-table-column>
      <el-table-column label="设置" align="center" width="340">
        <template slot-scope="{ row }">
          <el-button
            :type="row.is_default ? 'success' : 'info'"
            icon="el-icon-location"
            plain
            :disabled="row.is_default"
            @click="setDefault(row)"
            >默认地址</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="openUpdateAddress(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteAddress(row)"
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
        @current-change="getAddressList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { pcaa } from "area-data";

export default {
  name: "Address",
  data() {
    const validateConsignee = (rule, value, callback) => {
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
      if (!value) {
        callback(new Error("用户名不能为空！"));
      } else if (!reg.test(value)) {
        callback(new Error("用户名要求1~16之间，不包括特殊字符"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/;
      if (!value) {
        callback(new Error("手机号不能为空！"));
      } else if (!reg.test(value)) {
        callback(new Error("手机号格式不正确！"));
      } else {
        callback();
      }
    };
    const validateArea = (rule, value, callback) => {
      if (!value) {
        callback(new Error("收货地省市区不能为空"));
      } else {
        callback();
      }
    };
    const validatedetailAddr = (rule, value, callback) => {
      if (!value) {
        callback(new Error("收货地省市区不能为空"));
      } else {
        callback();
      }
    };
    return {
      user_id: 0,
      pageNum: 1,
      pageSize: 5,
      searchObj: {
        consignee: "",
        phone: "",
      },
      tempSearchObj: {
        consignee: "",
        phone: "",
      },
      addressInfo: {
        consignee: "",
        phone: "",
        address: "",
        area: [],
      },
      addOrUpdateAddressRules: {
        consignee: [
          { required: true, trigger: "blur", validator: validateConsignee },
        ],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        area: [{ required: true, trigger: "blur", validator: validateArea }],
        address: [
          { required: true, trigger: "blur", validator: validatedetailAddr },
        ],
      },
      multipleSelection: [],
      titleName: "新增收货地址",
      dialogFormVisible: false,
      pcaa: pcaa,
      addressId: null,
    };
  },
  methods: {
    //获取地址列表
    async getAddressList(page = 1) {
      this.pageNum = page;
      const { pageNum, pageSize, user_id } = this;
      const { consignee, phone } = this.tempSearchObj;
      let info = { pageSize, pageNum };
      if (user_id != 0) {
        Object.assign(info, { user_id });
      }
      consignee && Object.assign(info, { consignee });
      phone && Object.assign(info, { phone });
      try {
        await this.$store.dispatch("address/getAddressList", info);

        this.$message({
          type: "success",
          message: "获取地址列表成功",
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
    },
    //查询地址
    findAddress() {
      const { phone, consignee } = this.searchObj;
      this.tempSearchObj = {
        phone,
        consignee,
      };
      this.getAddressList();
    },
    //清空搜索
    resetSearch() {
      this.searchObj = {
        phone: "",
        consignee: "",
      };
      this.tempSearchObj = {
        phone: "",
        consignee: "",
      };
      this.getAddressList();
    },
    //删除已选
    async deleteSelected() {
      let ids = [];
      for (let item of this.multipleSelection) {
        ids.push(item.id);
      }

      this.$confirm(
        `确定删除这 ${this.multipleSelection.length} 条地址吗?`,
        "提示",
        {
          type: "warning",
        }
      )
        .then(async () => {
          await this.$store.dispatch("address/deleteAddress", {
            ids,
          });
          await this.getAddressList(
            this.addressList.length === this.multipleSelection.length
              ? this.pageNum - 1
              : this.pageNum
          );
          this.$message({
            type: "success",
            message: "删除地址成功",
          });
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
    //获取已选信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //切换每页个数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getAddressList();
    },
    //设置默认
    async setDefault(row) {
      try {
        await this.$store.dispatch("address/updateAddress", {
          id: row.id,
          user_id: row.userInfo.id,
          data: { is_default: true },
        });

        this.getAddressList();

        this.$message({
          type: "success",
          message: "设置为默认地址成功",
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
    },
    //删除地址
    async deleteAddress(row) {
      this.$confirm(`确定删除 '${row.address}' 这条地址吗?`, "提示", {
        type: "warning",
      })
        .then(async () => {
          await this.$store.dispatch("address/deleteAddress", {
            ids: [row.id],
          });
          this.getAddressList(
            this.addressList.length === 1 ? this.pageNum - 1 : this.pageNum
          );
          this.$message({
            type: "success",
            message: "删除地址成功",
          });
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
    //打开添加地址
    openAddAddress() {
      this.dialogFormVisible = true;
      this.titleName = "新增收货地址";
      this.addressInfo.consignee = "";
      this.addressInfo.phone = "";
      this.addressInfo.area = [];
      this.addressInfo.address = "";
      this.addressId = null;
    },
    //打开修改用户
    openUpdateAddress(row) {
      this.dialogFormVisible = true;
      this.titleName = "修改收货地址";
      this.addressId = row.id;
      this.addressInfo.consignee = row.consignee;
      this.addressInfo.phone = row.phone;
      this.addressInfo.area = row.area;
      this.addressInfo.address = row.address;
    },
    //关闭Dialog
    closeDialog() {
      this.dialogFormVisible = false;
      this.addressInfo.consignee = "";
      this.addressInfo.phone = "";
      this.addressInfo.area = [];
      this.addressInfo.address = "";
      this.addressId = null;
      this.$refs.addOrUpdateAddress.resetFields();
    },
    //新增或修改地址
    addOrUpdateAddress(formName) {
      this.$refs[formName].validate(async (value) => {
        if (value) {
          let data = {
            consignee: this.addressInfo.consignee,
            phone: this.addressInfo.phone,
            area: `${this.addressInfo.area}`,
            address: this.addressInfo.address,
          };
          try {
            if (this.titleName == "新增收货地址") {
              await this.$store.dispatch("address/addAddress", {
                user_id: this.user_id,
                data,
              });
            } else {
              await this.$store.dispatch("address/updateAddress", {
                id: this.addressId,
                user_id: this.user_id,
                data,
              });
            }
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: `${this.titleName}成功`,
            });
            this.getAddressList();
          } catch (error) {
            this.$message({
              type: "error",
              message: error,
            });
          }
        }
      });
    },
  },
  mounted() {
    if (this.$route.query.user_id) {
      this.user_id = this.$route.query.user_id * 1;
      this.getAddressList();
    } else {
      this.$router.push("/user/index");
      this.$message({
        type: "warning",
        message: "请先选择用户",
      });
    }
  },
  computed: {
    ...mapState({
      addressList: (state) => state.address.addressList,
      total: (state) => state.address.total,
    }),
  },
};
</script>

<style lang="less" scoped>
.address-container {
  .search {
    margin: 30px 40px;
    margin-left: 100px;

    width: 800px;
  }
  .addBtn {
    margin: 0 10px;
    margin-left: 100px;
    font-size: 18px;
  }
  .deleteBtn {
    margin: 0 10px;
    font-size: 18px;
  }
  .addressTable {
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
.area-select .area-selected-trigger {
  position: relative;
  top: -4px;
  padding: 0 20px;
}
</style>
