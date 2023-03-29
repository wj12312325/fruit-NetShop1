<template>
  <div>
    <TypeNav></TypeNav>
    <div class="searchMain">
      <div class="headerContainer">
        <!-- 面包屑  -->
        <div class="bread">
          <div
            class="breadcrumb"
            v-show="searchParams.categoryName || searchParams.keyword"
          >
            全部结果:
          </div>
          <ul class="tagContainer">
            <li
              class="tag"
              v-show="searchParams.categoryName"
              :style="{
                backgroundColor: searchParams.goodsId ? '#cfe07b' : '#85cee6'
              }"
              :class="searchParams.keyword ? 'tagCategory' : ''"
            >
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <li
              class="tag"
              v-show="searchParams.keyword"
              style="background-color: #f098be"
            >
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>
          </ul>
        </div>
      </div>
      <div class="mainContainer">
        <GoodsCart
          v-for="(item, index) in searchList"
          :key="index"
          :goodsInfo="item"
        ></GoodsCart>
      </div>

      <div class="notFind" v-show="searchList.length <= 0">
        <div class="a">
          <!-- <img src="./images/1.jpg" alt="" /> -->
          <div class="not">
            <img src="./images/2.png" alt="" />
            <div>没有找到与“{{ searchParams.keyword }}”相关的内容</div>
            <div>你可以尝试：同义关键词、缩短关键词、通过菜单栏查询</div>
          </div>
        </div>
      </div>
      <div v-show="searchList.length > 0" class="pagination">
        <div>
          <el-pagination
            :current-page="searchParams.pageNum"
            :page-sizes="[4, 8, 16]"
            :page-size="searchParams.pageSize"
            layout=" prev, pager,  next, sizes,jumper,->,total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsCart from './goodsCart'
import { mapState } from 'vuex'

export default {
  name: 'Search',
  components: { GoodsCart },
  data() {
    return {
      searchParams: {
        //一级分类id
        category1Id: '',
        //二级分类id
        category2Id: '',
        //商品id
        goodsId: '',
        //分类名字
        categoryName: '',
        //关键字
        keyword: '',
        //分页器用的，代表当前第几页
        pageNum: 1,
        //代表每一页展示数据个数
        pageSize: 4
      },
      searchList: [],
      total: 0
    }
  },
  methods: {
    //获取搜索结果
    async getSearchData() {
      this.searchList = []

      const { pageNum, pageSize } = this.searchParams

      if (this.searchParams.keyword) {
        let goods_name = this.searchParams.keyword
        await this.$store.dispatch('goods/getSearchList', {
          pageNum,
          pageSize,
          goods_name
        })
        this.searchList = this.goodsSearchList
        this.total = this.goodstotal
      } else if (this.searchParams.goodsId) {
        let goodsId = this.searchParams.goodsId
        await this.$store.dispatch('goods/getSearchList', {
          pageNum,
          pageSize,
          goodsId
        })
        this.searchList = this.goodsSearchList
        this.total = this.goodstotal
      } else if (this.searchParams.category1Id) {
        await this.$store.dispatch(
          'category/getSearchListBy1Id',
          this.searchParams
        )
        this.searchList = this.categorySearchList
        this.total = this.categorytotal
      } else if (this.searchParams.category2Id) {
        await this.$store.dispatch(
          'category/getSearchListBy2Id',
          this.searchParams
        )
        this.searchList = this.categorySearchList
        this.total = this.categorytotal
      } else {
        await this.$store.dispatch('goods/getSearchList', {
          pageNum,
          pageSize
        })
        this.searchList = this.goodsSearchList
        this.total = this.goodstotal
      }
    },
    //切换分页数
    handleSizeChange(val) {
      this.searchParams.pageSize = val
      this.getSearchData()
    },
    //切换页面
    handleCurrentChange(val) {
      this.searchParams.pageNum = val
      this.getSearchData()
    },
    //删除分类名称的面包屑
    removeCategoryName() {
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.goodsId = undefined
      this.searchParams.categoryName = undefined

      this.$router.push({ name: 'search', params: this.$route.params })
    },
    //删除分类关键字的面包屑
    removeKeyword() {
      //将关键字删除
      this.searchParams.keyword = undefined
      //修改路径 (自动重新发请求)
      this.$router.push({ name: 'search', query: this.$route.query })
      //删除搜索框中的文本 (涉及兄弟间通信，使用$bus)
      this.$bus.$emit('clearKeyword')
    },
    toA() {
      this.$router.push('/home?to=AAA')
    },
    toB() {
      this.$router.push('/home?to=BBB')
    },
    toC() {
      this.$router.push('/home?to=CCC')
    }
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },
  mounted() {
    this.getSearchData()
  },
  updated() {},
  watch: {
    //监听路由是否发生变化，如果变化，重新更新数据发请求
    $route() {
      //发请求之前，先将三个分类id都变空，以免下次搜索带上
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.goodsId = undefined
      this.searchParams.categoryName = undefined
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
      this.$nextTick(() => {
        this.getSearchData()
      })
    }
  },
  computed: {
    ...mapState({
      goodsSearchList: (state) => state.goods.searchList || [],
      goodstotal: (state) => state.goods.total || null,
      categorySearchList: (state) => state.category.searchList || [],
      categorytotal: (state) => state.category.total || null
    })
  }
}
</script>

<style lang="less" scoped>
.searchMain {
  width: 100%;
  overflow: hidden;
  background-color: #f5f1ee;
  margin-bottom: 80px;

  .headerContainer {
    width: 1200px;
    margin: 0 auto;
    min-width: 1200px;
    height: 60px;
    .bread {
      margin-top: 10px;
      height: 60px;
      display: flex;
      background-color: white;

      .breadcrumb {
        margin: auto 0;
        height: 50px;
        width: 100px;
        margin-left: 50px;
        font-size: 16px;
        line-height: 50px;
        text-align: center;
        font-weight: 500;
        &:hover {
          color: green;
        }
      }
      .tagContainer {
        width: 1000px;
        height: 50px;
        margin: auto 0;

        .tag {
          float: left;
          margin-top: 8px;
          margin-right: 10px;
          font-size: 12px;
          line-height: 25px;
          padding: 5px 5px;
          font-weight: 500;
          height: 25px;
          background: #f7f7f7;
          cursor: pointer;
          transition: all 0.5s;

          i {
            margin-left: 5px;
            padding: 0 5px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: baseline;
          }

          &:hover {
            color: green;
            font-size: 14px;
          }
        }
        .tagCategory {
          text-decoration: line-through;
          letter-spacing: 2px;
          background-color: #a9a9a9 !important;
          color: white;
        }
      }
    }
  }
  .searchImg {
    width: 100%;
    height: 440px;
    min-width: 1200px;
  }
  .mainContainer {
    width: 1200px;
    margin: 0 auto;
    min-width: 1200px;
    display: flex;
    flex-wrap: wrap;
  }
  .notFind {
    height: 500px;
    width: 100%;
    margin: 20px 0;

    .a {
      width: 1500px;
      margin: 0 auto;
      display: flex;

      // img {
      //   margin-left: 150px;
      //   height: 500px;
      // }
      .not {
        height: 500px;
        width: 1200px;
        background-color: #fff;
        margin-left: 150px;

        img {
          height: 400px;
          margin-left: 200px;
        }
        div {
          position: relative;
          top: -50px;
          text-align: center;
          height: 33px;
          line-height: 76px;
          color: #919191;
          font-size: 18px;
        }
      }
    }
  }

  .pagination {
    width: 1200px;
    margin: 30px auto;
    min-width: 1200px;
    div {
      width: 600px;
      margin: 0 auto;
    }
  }
}
</style>
