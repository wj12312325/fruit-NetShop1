<template>
  <div class="category-container">
    <el-button
      type="danger"
      icon="el-icon-delete"
      class="deleteBtn"
      @click="deleteSelected"
      :disabled="multipleSelection.length <= 0"
      >删除已选</el-button
    >
    <el-table
      class="categoryTable"
      :data="category1List"
      row-key="id"
      border
      :tree-props="{
        children: 'secondaryCategory',
      }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" :selectable="selectable">
      </el-table-column>
      <el-table-column prop="category_name" label="商品分类名称">
      </el-table-column>
      <el-table-column label="设置" align="center" width="250">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="addCategory(row)"
            v-show="row.parent_id == 0"
            >新增</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="updateCategory(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteCategory(row)"
            v-show="row.parent_id != 0"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="titleName"
      :visible.sync="dialogFormVisible"
      width="600px"
      :before-close="closeDialog"
    >
      <el-form
        :model="categoryInfo"
        label-width="120px"
        ref="addOrUpdateCategory"
        :rules="addOrUpdateCategoryRules"
      >
        <el-form-item label="商品分类名称" prop="category_name">
          <el-input
            placeholder="请输入商品分类名称"
            v-model="categoryInfo.category_name"
            ref="category_name"
            name="category_name"
            autocomplete="off"
            style="width: 90%"
            @keyup.enter.native="addOrUpdateCategory('addOrUpdateCategory')"
          ></el-input>
        </el-form-item>
        <el-form-item label="一级分类：" prop="parent_id">
          <el-select
            v-model="categoryInfo.parent_id"
            placeholder="请选择一级分类"
            :disabled="true"
          >
            <el-option
              v-for="item in category1List"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="addOrUpdateCategory('addOrUpdateCategory')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Category",
  data() {
    const validateCategory_name = (rule, value, callback) => {
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
      if (!value) {
        callback(new Error("商品分类名称不能为空！"));
      } else if (!reg.test(value)) {
        callback(new Error("商品分类名称要求不包括特殊字符"));
      } else {
        callback();
      }
    };
    return {
      titleName: "新增商品分类",
      multipleSelection: [],
      dialogFormVisible: false,
      categoryId: null,
      categoryInfo: {
        category_name: "",
        parent_id: null,
      },
      addOrUpdateCategoryRules: {
        category_name: [
          { required: true, trigger: "blur", validator: validateCategory_name },
        ],
      },
    };
  },
  methods: {
    //设置根目录不可被选中
    selectable(row, index) {
      return row.parent_id != 0;
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
    //获取已选信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除已选
    async deleteSelected() {
      let ids = [];
      for (let item of this.multipleSelection) {
        ids.push(item.id);
      }

      this.$confirm(
        `确定删除这 ${this.multipleSelection.length} 个商品分类吗?`,
        "提示",
        {
          type: "warning",
        }
      )
        .then(async () => {
          await this.$store.dispatch("category/deleteCategory", {
            ids,
          });
          await this.getCategoryList();
          this.$message({
            type: "success",
            message: "删除商品分类成功",
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
    //新增商品分类
    addCategory(row) {
      this.titleName = "新增商品分类";
      this.dialogFormVisible = true;
      this.categoryInfo.category_name = "";
      this.categoryInfo.parent_id = row.id;
      this.categoryId = null;
    },
    //修改商品分类
    updateCategory(row) {
      this.titleName = "修改商品分类";
      this.dialogFormVisible = true;
      this.categoryInfo.category_name = row.category_name;
      this.categoryInfo.parent_id =
        row.parent_id == 0 ? "已是最高类别" : row.parent_id;
      this.categoryId = row.id;
    },
    //删除商品分类
    async deleteCategory(row) {
      this.$confirm(`确定删除 '${row.category_name}' 这个分类吗?`, "提示", {
        type: "warning",
      })
        .then(async () => {
          await this.$store.dispatch("category/deleteCategory", {
            ids: [row.id],
          });
          this.getCategoryList();
          this.$message({
            type: "success",
            message: "删除商品分类成功",
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
    //关闭Dialog
    closeDialog() {
      this.dialogFormVisible = false;
      this.categoryInfo.category_name = "";
      this.categoryInfo.parent_id = null;
      this.categoryId = null;
      this.$refs.addOrUpdateCategory.resetFields();
    },
    //新增或修改商品信息
    addOrUpdateCategory(formName) {
      this.$refs[formName].validate(async (value) => {
        if (value) {
          try {
            if (this.titleName == "新增商品分类") {
              await this.$store.dispatch(
                "category/addCategory",
                this.categoryInfo
              );
            } else {
              let info = { id: this.categoryId, ...this.categoryInfo };
              if (info.parent_id == "已是最高类别") {
                info.parent_id = 0;
              }
              await this.$store.dispatch("category/updateCategory", info);
            }
            this.$message({
              type: "success",
              message: `${this.titleName}成功`,
            });
            this.getCategoryList();
            this.closeDialog();
          } catch (error) {
            this.$message({
              type: "error",
              message: error,
            });
          }
          this.dialogFormVisible = false;
        }
      });
    },
  },
  computed: {
    ...mapState({
      category1List: (state) => state.category.category1List,
    }),
  },
  mounted() {
    this.getCategoryList();
  },
};
</script>
<style lang="less" scoped>
.category-container {
  .deleteBtn {
    margin-top: 100px;
    margin-left: 100px;
    font-size: 18px;
  }
  .categoryTable {
    width: 800px;
    margin: 20px 80px;
  }
}
</style>
