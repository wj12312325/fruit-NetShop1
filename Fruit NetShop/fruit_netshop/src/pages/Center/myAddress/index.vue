<template>
  <div class="a">
    <div class="myaddress">
      <div class="headerAdd">我的收货地址</div>
      <el-button class="addAddr" type="primary" @click="openAddAddress"
        >新增收货地址</el-button
      >

      <el-dialog
        title="新增收货地址"
        :visible.sync="dialogFormVisible"
        width="720px"
        :lock-scroll="false"
        :before-close="closeAdd"
      >
        <el-form
          :model="userAddressData"
          label-width="120px"
          style="width: 80%"
          ref="addUserAddress"
          :rules="addUserAddressRules"
        >
          <el-form-item label="收货人姓名：" prop="consignee">
            <el-input
              placeholder="请输入收货人姓名"
              v-model="userAddressData.consignee"
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
              v-model="userAddressData.phone"
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
              v-model="userAddressData.area"
              :data="pcaa"
              size="small"
            ></area-select>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input
              placeholder="请输入收货的详细地址"
              v-model="userAddressData.address"
              autocomplete="off"
              ref="address"
              name="address"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeAdd">取 消</el-button>
          <el-button type="primary" @click="addUserAddress('addUserAddress')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="修改收货地址"
        :visible.sync="dialogFormVisible1"
        width="720px"
        :lock-scroll="false"
        :before-close="closeUpdate"
      >
        <el-form
          :model="userAddressData"
          label-width="120px"
          style="width: 80%"
          ref="updateUserAddress"
          :rules="addUserAddressRules"
        >
          <el-form-item label="收货人姓名：" prop="consignee">
            <el-input
              placeholder="请输入收货人姓名"
              v-model="userAddressData.consignee"
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
              v-model="userAddressData.phone"
              ref="phone"
              name="phone"
              type="text"
              maxlength="11"
            />
          </el-form-item>

          <el-form-item prop="area" label="省市区：">
            <area-select
              v-if="dialogFormVisible1"
              :level="2"
              type="text"
              v-model="userAddressData.area"
              :data="pcaa"
              size="small"
            ></area-select>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input
              placeholder="请输入收货的详细地址"
              v-model="userAddressData.address"
              autocomplete="off"
              ref="address"
              name="address"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeUpdate">取 消</el-button>
          <el-button
            type="primary"
            @click="updateUserAddress('updateUserAddress')"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <div class="addrTable">
        <el-table :data="addressList" border style="width: 100%" stripe>
          <el-table-column prop="consignee" label="收货人" align="center">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            align="center"
            width="115"
          >
          </el-table-column>
          <el-table-column
            prop="area"
            label="所在地区"
            align="center"
            width="180"
          >
            <template slot-scope="{ row }">
              <span>{{ row.area[0] }}&nbsp;&nbsp;</span>
              <span>{{ row.area[1] }}&nbsp;&nbsp;</span>
              <span>{{ row.area[2] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="详细地址"
            align="center"
            width="210"
          >
            <template slot-scope="{ row }">
              <span style="font-size: 14px">{{ row.address }}&nbsp;&nbsp;</span>
            </template>
          </el-table-column>
          <el-table-column label="设置" align="center" width="234">
            <template slot-scope="{ row }">
              <el-button
                :type="row.is_default ? 'success' : 'info'"
                :disabled="row.is_default"
                size="small"
                plain
                @click="setDefault(row)"
                >默认地址</el-button
              >
              <el-button type="primary" size="small" @click="updateAddress(row)"
                >修改</el-button
              >
              <el-popconfirm
                title="确定要删除吗？"
                @confirm="deleteAddress(row)"
              >
                <el-button
                  type="danger"
                  size="small"
                  slot="reference"
                  style="margin-left: 10px"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { pcaa } from 'area-data'
import { mapState } from 'vuex'
export default {
  name: 'MyAddress',
  data() {
    const validateConsignee = (rule, value, callback) => {
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      if (!value) {
        callback(new Error('用户名不能为空！'))
      } else if (!reg.test(value)) {
        callback(new Error('用户名要求1~16之间，不包括特殊字符'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/
      if (!value) {
        callback(new Error('手机号不能为空！'))
      } else if (!reg.test(value)) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    const validateArea = (rule, value, callback) => {
      if (!value) {
        callback(new Error('收货地省市区不能为空'))
      } else {
        callback()
      }
    }
    const validatedetailAddr = (rule, value, callback) => {
      if (!value) {
        callback(new Error('收货地省市区不能为空'))
      } else {
        callback()
      }
    }
    return {
      addressId: 0,
      pageNum: 1,
      pageSize: 1000,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      pcaa: pcaa,
      userAddressData: {
        consignee: '',
        phone: '',
        area: [],
        address: ''
      },
      addUserAddressRules: {
        consignee: [
          { required: true, trigger: 'blur', validator: validateConsignee }
        ],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        area: [{ required: true, trigger: 'blur', validator: validateArea }],
        address: [
          { required: true, trigger: 'blur', validator: validatedetailAddr }
        ]
      }
    }
  },
  methods: {
    //获取用户地址
    async getUserAddressList() {
      let { pageNum, pageSize } = this
      let user_id = this.userInfo.id
      await this.$store.dispatch('address/getAddressList', {
        pageNum,
        pageSize,
        user_id
      })
    },
    //获取用户信息
    async getUserInfo() {
      await this.$store.dispatch('user/getUserInfo')
    },
    //取消添加
    closeAdd() {
      this.dialogFormVisible = false
      this.userAddressData.consignee = ''
      this.userAddressData.phone = ''
      this.userAddressData.area = []

      this.userAddressData.address = ''
      this.$refs.addUserAddress.resetFields()
    },
    //打开添加
    openAddAddress() {
      this.userAddressData.consignee = ''
      this.userAddressData.phone = ''
      this.userAddressData.area = []
      this.userAddressData.address = ''
      this.dialogFormVisible = true
    },
    //确认添加地址
    addUserAddress(formName) {
      this.$refs[formName].validate(async (value) => {
        if (value) {
          let data = {
            consignee: this.userAddressData.consignee,
            phone: this.userAddressData.phone,
            area: `${this.userAddressData.area}`,
            address: this.userAddressData.address
          }
          try {
            await this.$store.dispatch('address/addAddress', data)
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '添加收货地址成功'
            })
            this.getUserAddressList()
          } catch (error) {
            this.$message({
              type: 'error',
              message: error
            })
          }
        }
      })
    },
    //取消修改
    closeUpdate() {
      this.dialogFormVisible1 = false
      this.userAddressData.consignee = ''
      this.userAddressData.phone = ''
      this.userAddressData.address = ''
      this.userAddressData.area = []
      this.$refs.updateUserAddress.resetFields()
    },
    //确认修改地址
    updateUserAddress(formName) {
      this.$refs[formName].validate(async (value) => {
        if (value) {
          let data = {
            consignee: this.userAddressData.consignee,
            phone: this.userAddressData.phone,
            area: `${this.userAddressData.area}`,
            address: this.userAddressData.address
          }
          try {
            await this.$store.dispatch('address/updateAddress', {
              id: this.addressId,
              data
            })
            this.getUserAddressList()
            this.dialogFormVisible1 = false
            this.$message({
              type: 'success',
              message: '修改收货地址成功'
            })
          } catch (error) {
            this.$message({
              type: 'error',
              message: error
            })
          }
        }
      })
    },
    //修改地址
    updateAddress(row) {
      this.dialogFormVisible1 = true
      this.addressId = row.id
      this.userAddressData.consignee = row.consignee
      this.userAddressData.phone = row.phone
      this.userAddressData.area = row.area
      this.userAddressData.address = row.address
    },
    //设置默认
    async setDefault(row) {
      try {
        await this.$store.dispatch('address/updateAddress', {
          id: row.id,
          data: { is_default: true }
        })

        this.getUserAddressList()

        this.$message({
          type: 'success',
          message: '设置为默认地址成功'
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    },
    //删除地址
    async deleteAddress(row) {
      try {
        await this.$store.dispatch('address/deleteAddress', { ids: [row.id] })
        this.getUserAddressList()

        this.$message({
          type: 'success',
          message: '删除收货地址成功'
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
      }
    }
  },
  mounted() {
    this.getUserAddressList()
    this.getUserInfo()
  },
  computed: {
    ...mapState({
      addressList: (state) => state.address.addressList || [],
      userInfo: (state) => state.user.userInfo || {}
    })
  }
}
</script>

<style lang="less" scoped>
.a {
  width: 960px;
  margin-left: 220px;
  border: 1px solid #e3f2fd;
  background-color: #e3f2fd;

  .myaddress {
    width: 900px;
    margin: 20px auto;
    .headerAdd {
      width: 95%;
      height: 50px;
      font-size: 20px;
      font-weight: bold;
      line-height: 50px;
      padding: 0 20px;
      border-radius: 20px;
      background-color: #fafafa;
      transition: all 0.5s;
      &:hover {
        font-size: 22px;
        color: #77b72c;
      }
    }

    .addAddr {
      margin: 20px;
    }

    .addrTable {
      width: 96%;
      margin: 0px auto;
    }
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
