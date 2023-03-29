<template>
  <div class="cart-container">
    <!-- <el-form inline class="search">

      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="商品名称" />
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-search"
        class="btn"
        @click="findCart"
        >查询</el-button
      >
      <el-button type="info" class="btn" @click="resetSearch">清空</el-button>
    </el-form> -->

    <!-- <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="openAddCart"
      class="addBtn"
      >新增购物车</el-button
    > -->

    <el-button
      type="danger"
      icon="el-icon-delete"
      class="deleteBtn"
      @click="deleteSelected"
      :disabled="multipleSelection.length <= 0"
      >删除已选</el-button
    >

    <!-- <el-dialog
      :title="titleName"
      :visible.sync="dialogFormVisible"
      width="700px"
      :lock-scroll="false"
      :before-close="closeDialog"
    >
      <el-form
        :model="cartInfo"
        label-width="120px"
        ref="addOrUpdateCart"
        :rules="addOrUpdateCartRules"
        :inline="true"
      >
        <el-form-item label="一级分类：" prop="category1Id">
          <el-select
            v-model="cartInfo.category1Id"
            placeholder="请选择一级分类"
            @change="getCategory2List"
            style="width: 240%"
          >
            <el-option
              v-for="(item, index) in category1List"
              :key="item.id"
              :label="item.category_name"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类：" prop="category2Id">
          <el-select
            v-model="cartInfo.category2Id"
            placeholder="请选择二级分类"
            :disabled="this.category2List.length < 1"
            @change="getgoodsList"
            style="width: 240%"
          >
            <el-option
              v-for="(item, index) in category2List"
              :key="item.id"
              :label="item.category_name"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：" prop="goods_name" style="width: 100%">
          <el-select
            v-model="cartInfo.goods_name"
            placeholder="请选择商品分类"
            style="width: 240%"
            :disabled="this.goodsList.length < 1"
          >
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goods_name"
              :value="item.goods_name"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <div>
          <el-form-item label="商品单价(元)" prop="goods_price">
            <el-input-number
              v-model="cartInfo.goods_price"
              :precision="2"
              :step="0.1"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商品数量(个/斤)" prop="number">
            <el-input-number
              v-model="cartInfo.number"
              label="商品数量(个/斤)"
            ></el-input-number>
          </el-form-item>
        </div>
        <el-form-item label="总计(元)" prop="sum" style="width: 95%">
          <el-input
            placeholder="请输入总计"
            v-model="cartInfo.sum"
            autocomplete="off"
            ref="sum"
            name="sum"
            type="text"
            style="width: 260%"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品图片" style="width: 95%">
          <el-carousel
            indicator-position="outside"
            arrow="never"
            height="120px"
            style="width: 120px; margin: 0 auto"
          >
            <el-carousel-item
              v-for="(img, index) in cartInfo.goods_img"
              :key="index"
            >
              <img
                :src="`http://localhost:8888/${img}`"
                style="width: 120px; height: 120px"
              />
            </el-carousel-item>
          </el-carousel>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateCart('addOrUpdateCart')"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->

    <el-table
      :data="cartList"
      border
      class="cartTable"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60" align="center">
      </el-table-column>

      <el-table-column
        prop="goods_info.goods_img"
        label="商品图片"
        align="center"
        width="180"
      >
        <template slot-scope="{ row }">
          <el-carousel
            indicator-position="outside"
            arrow="never"
            height="120px"
            style="width: 120px; margin: 0 auto"
          >
            <el-carousel-item
              v-for="(img, index) in row.goods_info.goods_img"
              :key="index"
            >
              <img
                :src="`http://localhost:8888/${img}`"
                style="width: 120px; height: 120px"
              />
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-table-column>
      <el-table-column
        prop="goods_info.goods_name"
        label="商品名称"
        align="center"
      >
      </el-table-column>
      <el-table-column label="商品分类" align="center">
        <template slot-scope="{ row }">
          <span style="margin-right: 5px">{{
            row.goods_info.secondaryCategory.oneCategory.category_name
          }}</span>
          <span style="margin-right: 5px">/</span>
          <span>{{ row.goods_info.secondaryCategory.category_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="goods_info.goods_price"
        label="商品单价(元)"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="number" label="商品数量(个/斤)" align="center">
      </el-table-column>
      <el-table-column label="总计(元)" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.goods_info.goods_price * row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column label="设置" align="center" width="140">
        <template slot-scope="{ row }">
          <!-- <el-button
            type="primary"
            icon="el-icon-edit"
            @click="openUpdateCart(row)"
            >修改</el-button
          > -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteCart(row)"
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
        @current-change="getCartList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Address",
  data() {
    // const validateConsignee = (rule, value, callback) => {
    //   const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
    //   if (!value) {
    //     callback(new Error("用户名不能为空！"));
    //   } else if (!reg.test(value)) {
    //     callback(new Error("用户名要求1~16之间，不包括特殊字符"));
    //   } else {
    //     callback();
    //   }
    // };
    // const validatePhone = (rule, value, callback) => {
    //   const reg = /^1[3456789]\d{9}$/;
    //   if (!value) {
    //     callback(new Error("手机号不能为空！"));
    //   } else if (!reg.test(value)) {
    //     callback(new Error("手机号格式不正确！"));
    //   } else {
    //     callback();
    //   }
    // };
    // const validateArea = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error("收货地省市区不能为空"));
    //   } else {
    //     callback();
    //   }
    // };
    // const validatedetailAddr = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error("收货地省市区不能为空"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      user_id: 0,
      pageNum: 1,
      pageSize: 5,
      multipleSelection: [],
      dialogFormVisible: false,

      // cartInfo: {
      //   id: null,
      //   goods_name: "",
      //   number: null,
      //   goods_price: null,
      //   category1Id: null,
      //   category2Id: null,
      //   goods_id: null,
      //   goods_img: [],
      //   sum: null,
      // },
      // addOrUpdateCartRules: {
      //   // consignee: [
      //   //   { required: true, trigger: "blur", validator: validateConsignee },
      //   // ],
      //   // phone: [{ required: true, trigger: "blur", validator: validatePhone }],
      //   // area: [{ required: true, trigger: "blur", validator: validateArea }],
      //   // address: [
      //   //   { required: true, trigger: "blur", validator: validatedetailAddr },
      //   // ],
      // },
      // titleName: "新增购物车",
      // cartId: null,
      // category2List: [],
      // goodsList: [],
    };
  },
  methods: {
    //获取购物车列表
    async getCartList(page = 1) {
      this.pageNum = page;
      const { pageNum, pageSize, user_id } = this;

      try {
        await this.$store.dispatch("cart/getCartList", {
          pageNum,
          pageSize,
          user_id,
        });

        this.$message({
          type: "success",
          message: "获取购物车列表成功",
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
    },
    //获取商品类型列表
    async getCategoryList() {
      try {
        await this.$store.dispatch("category/getCategoryList");
        this.$message({
          type: "success",
          message: "获取商品分类列表成功",
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
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
          await this.$store.dispatch("cart/deleteCart", {
            ids,
          });
          await this.getCartList(
            this.cartList.length === this.multipleSelection.length
              ? this.pageNum - 1
              : this.pageNum
          );
          this.$message({
            type: "success",
            message: "删除购物车成功",
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
      this.getCartList();
    },
    //删除购物车
    async deleteCart(row) {
      this.$confirm(
        `确定删除 '${row.goods_info.goods_name}' 这条购物车吗?`,
        "提示",
        {
          type: "warning",
        }
      )
        .then(async () => {
          await this.$store.dispatch("cart/deleteCart", {
            ids: [row.id],
          });
          this.getCartList(
            this.cartList.length === 1 ? this.pageNum - 1 : this.pageNum
          );
          this.$message({
            type: "success",
            message: "删除购物车成功",
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
    // //设置默认
    // async setDefault(row) {
    //   try {
    //     await this.$store.dispatch("address/updateAddress", {
    //       id: row.id,
    //       user_id: row.userInfo.id,
    //       data: { is_default: true },
    //     });

    //     this.getAddressList();

    //     this.$message({
    //       type: "success",
    //       message: "设置为默认地址成功",
    //     });
    //   } catch (error) {
    //     this.$message({
    //       type: "error",
    //       message: error,
    //     });
    //   }
    // },
    // //打开添加购物车
    // openAddCart() {
    //   this.dialogFormVisible = true;
    //   this.titleName = "新增购物车";
    //   this.cartInfo.id = null;
    //   this.cartInfo.goods_name = "";
    //   this.cartInfo.number = null;
    //   this.cartInfo.goods_price = null;
    //   this.cartInfo.category1Id = null;
    //   this.cartInfo.category2Id = null;
    //   this.cartInfo.goods_id = null;
    //   this.cartInfo.sum = null;
    //   this.cartInfo.goods_img = [];
    // },
    // //打开修改用户
    // openUpdateCart(row) {
    //   this.dialogFormVisible = true;
    //   this.titleName = "修改收货地址";
    //   this.addressId = row.id;
    //   this.addressInfo.consignee = row.consignee;
    //   this.addressInfo.phone = row.phone;
    //   this.addressInfo.area = row.area;
    //   this.addressInfo.address = row.address;
    // },
    // //关闭Dialog
    // closeDialog() {
    //   this.dialogFormVisible = false;
    //   this.cartInfo.id = null;
    //   this.cartInfo.goods_name = "";
    //   this.cartInfo.number = null;
    //   this.cartInfo.goods_price = null;
    //   this.cartInfo.category1Id = null;
    //   this.cartInfo.category2Id = null;
    //   this.cartInfo.goods_id = null;
    //   this.cartInfo.sum = null;
    //   this.cartInfo.goods_img = [];
    //   this.$refs.addOrUpdateCart.resetFields();
    // },
    // //新增或修改购物车
    // addOrUpdateCart(formName) {
    //   // this.$refs[formName].validate(async (value) => {
    //   //   if (value) {
    //   //     let data = {
    //   //       consignee: this.addressInfo.consignee,
    //   //       phone: this.addressInfo.phone,
    //   //       area: `${this.addressInfo.area}`,
    //   //       address: this.addressInfo.address,
    //   //     };
    //   //     try {
    //   //       if (this.titleName == "新增收货地址") {
    //   //         await this.$store.dispatch("address/addAddress", {
    //   //           user_id: this.user_id,
    //   //           data,
    //   //         });
    //   //       } else {
    //   //         await this.$store.dispatch("address/updateAddress", {
    //   //           id: this.addressId,
    //   //           user_id: this.user_id,
    //   //           data,
    //   //         });
    //   //       }
    //   //       this.dialogFormVisible = false;
    //   //       this.$message({
    //   //         type: "success",
    //   //         message: `${this.titleName}成功`,
    //   //       });
    //   //       this.getAddressList();
    //   //     } catch (error) {
    //   //       this.$message({
    //   //         type: "error",
    //   //         message: error,
    //   //       });
    //   //     }
    //   //   }
    //   // });
    // },
    // //获取二级分类列表
    // getCategory2List(val) {
    //   this.category2List = this.category1List[val].secondaryCategory;
    // },
    // //获取商品列表
    // getgoodsList(val) {
    //   this.goodsList = this.category2List[val].goodsList;
    // },
  },
  mounted() {
    if (this.$route.query.user_id) {
      this.user_id = this.$route.query.user_id * 1;
      this.getCartList();
      // this.getCategoryList();
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
      cartList: (state) => state.cart.cartList,
      total: (state) => state.cart.total,
      // category1List: (state) => state.category.category1List,
    }),
  },
};
</script>

<style lang="less" scoped>
.cart-container {
  .addBtn {
    font-size: 18px;
  }
  .deleteBtn {
    margin-top: 100px;
    margin-left: 100px;

    font-size: 18px;
  }
  .cartTable {
    margin: 30px auto;

    width: 90%;
  }
  .pagination {
    width: 660px;
    margin: 30px auto;
  }
}
</style>
