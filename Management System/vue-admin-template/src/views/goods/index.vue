<template>
  <div class="goods-container">
    <el-form inline class="search">
      <!-- 表单元素 -->
      <el-form-item>
        <el-input v-model="searchObj.goods_name" placeholder="商品名称" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.category1Id" placeholder="一级分类">
          <el-option
            v-for="item in category1List"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.category2Id" placeholder="二级分类">
          <el-option
            v-for="item in category2List"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 查询与情况的按钮 -->
      <el-button
        type="primary"
        icon="el-icon-search"
        class="btn"
        @click="findGoods"
        >查询</el-button
      >
      <el-button type="info" class="btn" @click="resetSearch">清空</el-button>
    </el-form>

    <el-button
      type="primary"
      icon="el-icon-circle-plus-outline"
      class="addBtn"
      @click="openAddGoods"
      >新增商品</el-button
    >
    <el-dialog
      :title="titleName"
      :visible.sync="dialogFormVisible"
      width="700px"
      :lock-scroll="false"
      :before-close="closeDialog"
    >
      <el-form
        :model="goodsInfo"
        label-width="120px"
        ref="addOrUpdateGoods"
        :rules="addOrUpdateGoodsRules"
        :inline="true"
      >
        <el-form-item label="商品名称：" prop="goods_name" style="width: 90%">
          <el-input
            placeholder="请输入商品名称"
            v-model="goodsInfo.goods_name"
            autocomplete="off"
            ref="goods_name"
            name="goods_name"
            type="text"
            maxlength="20"
            style="width: 265%"
          ></el-input>
        </el-form-item>
        <el-form-item label="一级分类：">
          <el-select
            v-model="category11Id"
            placeholder="请选择商品一级分类"
            style="width: 88%"
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
        <el-form-item
          label="二级分类："
          prop="goods_category_id"
          label-width="105px"
        >
          <el-select
            v-model="goodsInfo.goods_category_id"
            placeholder="请选择商品二级分类"
            style="width: 88%"
            :disabled="category22List.length <= 0"
          >
            <el-option
              v-for="item in category22List"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品单价(元)" prop="goods_price">
          <el-input-number
            v-model="goodsInfo.goods_price"
            :precision="2"
            :step="0.1"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="商品库存(个/斤)"
          prop="goods_num"
          label-width="125px"
        >
          <el-input-number
            v-model="goodsInfo.goods_num"
            label="商品库存(个/斤)"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="商品图片" style="width: 95%">
          <el-upload
            action="/api/goods/upload"
            ref="upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :file-list="fileListt"
            :on-success="onSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible" width="500px">
            <img width="100%" :src="goodsImg" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          label="商品描述："
          prop="goods_introduction"
          style="width: 95%"
        >
          <el-input
            placeholder="请输入商品描述"
            v-model="goodsInfo.goods_introduction"
            autocomplete="off"
            ref="goods_introduction"
            name="goods_introduction"
            type="textarea"
            :rows="4"
            style="width: 260%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateGoods('addOrUpdateGoods')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-table :data="goodsList" border class="goodsTable" stripe>
      <el-table-column
        prop="goods_img"
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
              v-for="(img, index) in row.goods_img"
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
        prop="goods_name"
        label="商品名称"
        align="center"
        width="135"
      >
      </el-table-column>
      <el-table-column label="商品分类" align="center" width="125">
        <template slot-scope="{ row }">
          <span style="margin-right: 5px">{{
            row.secondaryCategory.oneCategory.category_name
          }}</span>
          <span style="margin-right: 5px">/</span>
          <span>{{ row.secondaryCategory.category_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品单价(元)"
        align="center"
        width="135"
      >
      </el-table-column>
      <el-table-column
        prop="goods_num"
        label="商品库存(个/斤)"
        align="center"
        width="135"
      >
      </el-table-column>
      <el-table-column
        prop="goods_introduction"
        label="商品描述"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态"
        align="center"
        width="140"
      >
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.goods_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="上架"
            inactive-text="下架"
            @change="changeGoodsStatus(row, $event)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="设置" align="center" width="230">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="openUpdateGoods(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteGoods(row)"
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
        @current-change="getGoodsList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Goods",
  data() {
    const validateGoods_name = (rule, value, callback) => {
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
      if (!value) {
        callback(new Error("商品名称不能为空！"));
      } else if (!reg.test(value)) {
        callback(new Error("商品名称要求不包括特殊字符"));
      } else {
        callback();
      }
    };
    const validateGoods_category = (rule, value, callback) => {
      if (!value) {
        callback(new Error("商品分类不能为空！"));
      } else {
        callback();
      }
    };
    const validateGoods_price = (rule, value, callback) => {
      if (!value) {
        callback(new Error("商品单价不能为空！"));
      } else {
        callback();
      }
    };
    const validateGoods_num = (rule, value, callback) => {
      if (!value) {
        callback(new Error("商品库存不能为空！"));
      } else {
        callback();
      }
    };
    const validateGoods_intro = (rule, value, callback) => {
      if (!value) {
        callback(new Error("商品描述不能为空"));
      } else {
        callback();
      }
    };
    return {
      searchObj: {
        goods_name: "",
        category1Id: null,
        category2Id: null,
      },
      tempSearchObj: {
        goods_name: "",
        category1Id: null,
        category2Id: null,
      },
      goodsInfo: {
        id: null,
        goods_name: "",
        goods_num: null,
        goods_price: null,
        goods_introduction: "",
        goods_category_id: null,
        goods_img: [],
      },
      category11Id: null,

      category22List: [],
      fileListt: [],
      goodsImg: "",
      pageNum: 1,
      pageSize: 5,
      titleName: "新增商品",
      dialogFormVisible: false,
      dialogVisible: false,
      addOrUpdateGoodsRules: {
        goods_name: [
          { required: true, trigger: "blur", validator: validateGoods_name },
        ],
        goods_category_id: [
          {
            required: true,
            trigger: "blur",
            validator: validateGoods_category,
          },
        ],
        goods_price: [
          { required: true, trigger: "blur", validator: validateGoods_price },
        ],
        goods_num: [
          { required: true, trigger: "blur", validator: validateGoods_num },
        ],
        goods_introduction: [
          { required: true, trigger: "blur", validator: validateGoods_intro },
        ],
      },
    };
  },
  mounted() {
    this.getGoodsList();
    this.getCategoryList();
  },
  methods: {
    //获取商品列表
    async getGoodsList(page = 1) {
      this.pageNum = page;
      //goods_state = 1商品状态
      const { pageSize, pageNum } = this;
      const { goods_name, category1Id, category2Id } = this.tempSearchObj;
      let info = { pageSize, pageNum };
      goods_name && Object.assign(info, { goods_name });
      category1Id && Object.assign(info, { category1Id });
      category2Id && Object.assign(info, { goods_category_id: category2Id });
      try {
        if (category1Id && !category2Id) {
          await this.$store.dispatch("goods/getCategorySearchList", info);
        } else {
          await this.$store.dispatch("goods/getGoodsList", info);
        }
        this.$message({
          type: "success",
          message: "获取商品列表成功",
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
    //切换每页个数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getGoodsList();
    },
    //搜索商品
    findGoods() {
      const { goods_name, category1Id, category2Id } = this.searchObj;
      this.tempSearchObj = {
        goods_name,
        category1Id,
        category2Id,
      };
      this.getGoodsList();
    },
    //清空搜索
    resetSearch() {
      this.searchObj = {
        goods_name: "",
        category1Id: null,
        category2Id: null,
      };
      this.tempSearchObj = {
        goods_name: "",
        category1Id: null,
        category2Id: null,
      };
      this.getGoodsList();
    },
    //关闭Dialog
    closeDialog() {
      this.dialogFormVisible = false;
      this.goodsInfo.goods_name = "";
      this.goodsInfo.goods_category_id = null;
      this.goodsInfo.goods_introduction = "";
      this.goodsInfo.goods_price = null;
      this.category11Id = null;
      this.category22List = [];
      this.goodsInfo.goods_num = null;
      this.goodsInfo.goods_img = [];
      this.goodsInfo.id = null;
      this.fileListt = [];
      this.$refs.addOrUpdateGoods.resetFields();
    },
    //图片上传成功
    onSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      // console.log(3, fileList);
      // console.log(4, this.fileListt);
      this.fileListt = fileList;
      this.goodsInfo.goods_img.push(response.result.goodsImg);
    },
    //删除图片
    handleRemove(file, fileList) {
      this.fileListt = fileList;
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.goodsImg = file.url;
      this.dialogVisible = true;
    },
    //打开新增商品
    openAddGoods() {
      this.titleName = "新增商品";
      this.dialogFormVisible = true;
      this.fileListt = [];
      this.category11Id = null;
      this.category22List = [];

      this.goodsInfo.goods_name = "";
      this.goodsInfo.goods_category_id = null;
      this.goodsInfo.goods_introduction = "";
      this.goodsInfo.goods_price = null;
      this.goodsInfo.goods_num = null;
      this.goodsInfo.goods_img = [];
      this.goodsInfo.id = null;
    },
    //打开修改商品
    openUpdateGoods(row) {
      this.dialogFormVisible = true;
      this.titleName = "修改商品";

      for (let i of row.goods_img) {
        let a = {
          name: `${i}`,
          url: `http://localhost:8888/${i}`,
        };
        this.fileListt.push(a);
      }

      this.goodsInfo.goods_name = row.goods_name;
      this.goodsInfo.goods_category_id = row.goods_category_id;
      this.goodsInfo.goods_introduction = row.goods_introduction;
      this.goodsInfo.goods_price = row.goods_price;
      this.goodsInfo.goods_num = row.goods_num;
      this.goodsInfo.goods_img = row.goods_img;
      this.category22List = [];
      this.category11Id = row.secondaryCategory.oneCategory.id;
      this.goodsInfo.id = row.id;
    },
    //新增或修改商品信息
    addOrUpdateGoods(formName) {
      this.$refs[formName].validate(async (value) => {
        if (value) {
          await this.$refs.upload.submit();
          setTimeout(async () => {
            try {
              var {
                goods_name,
                goods_price,
                goods_num,
                goods_introduction,
                goods_category_id,
                goods_img,
              } = this.goodsInfo;
              let data = {
                goods_name,
                goods_price,
                goods_num,
                goods_introduction,
                goods_category_id,
                goods_img: `${goods_img}`,
              };
              if (this.titleName == "新增商品") {
                await this.$store.dispatch("goods/addGoods", data);
              } else {
                data.goods_img = [];
                for (let i of this.fileListt) {
                  if (i.response) {
                    data.goods_img.push(i.response.result.goodsImg);
                  } else {
                    data.goods_img.push(i.name);
                  }
                }
                data.goods_img = `${data.goods_img}`;
                let info = { id: this.goodsInfo.id, ...data };
                await this.$store.dispatch("goods/updateGoods", info);
              }
              this.$message({
                type: "success",
                message: `${this.titleName}成功`,
              });
              this.getGoodsList(this.pageNum);
              this.closeDialog();
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

    async changeGoodsStatus(row, e) {
      let t = "";
      let state = 0;
      if (e) {
        state = 1;
        t = "上架";
      } else {
        t = "下架";
        state = 0;
      }
      let info = {
        id: row.id,
        goods_state: state,
      };
      try {
        await this.$store.dispatch("goods/updateGoodsStatus", info);
        this.$message({
          type: "success",
          message: `${t}成功`,
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error,
        });
      }
    },

    //删除商品
    async deleteGoods(row) {
      this.$confirm(`确定删除商品 '${row.goods_name}' 吗?`, "提示", {
        type: "warning",
      })
        .then(async () => {
          const result = await this.$store.dispatch("goods/deleteGoods", {
            ids: [row.id],
          });
          this.getGoodsList(
            this.goodsList.length === 1 ? this.pageNum - 1 : this.pageNum
          );
          this.$message({
            type: "success",
            message: "删除商品成功",
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
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goods.goodsList,
      total: (state) => state.goods.total,
      category1List: (state) => state.category.category1List,
      category2List: (state) => state.category.category2List,
    }),
  },
  watch: {
    category11Id() {
      this.category22List =
        this.category1List[
          this.category11Id - 1 < 0 ? 0 : this.category11Id - 1
        ].secondaryCategory || [];
    },
  },
};
</script>

<style lang="less" scoped>
.goods-container {
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
  .goodsTable {
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

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
