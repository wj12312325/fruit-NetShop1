<template>
  <!-- 底部 -->
  <div class="footer">
    <div class="a">
      <div class="footer-container">
        <div class="footer-image">
          <img src="./images/footerImage.jpg" />
        </div>
        <div class="footerList">
          <div class="footerItem">
            <h4>新手指南</h4>
            <ul class="footerItemCon">
              <li><a href="###">订购方式</a></li>
              <li><a href="###">顾客须知</a></li>
              <li><a href="###">积分会员</a></li>
              <li><a href="###">预存款支付</a></li>
              <li><a href="###">用户注册</a></li>
            </ul>
          </div>
          <div class="footerItem">
            <h4>购物指南</h4>
            <ul class="footerItemCon">
              <li><a href="###">联系客服</a></li>
              <li><a href="###">发票说明</a></li>
              <li><a href="###">用户常见问题</a></li>
              <li><a href="###">购物流程</a></li>
              <li><a href="###">手机订购</a></li>
            </ul>
          </div>
          <div class="footerItem">
            <h4>支付配送方式</h4>
            <ul class="footerItemCon">
              <li><a href="###">礼品卡/账户余额</a></li>
              <li><a href="###">支付方式</a></li>
              <li><a href="###">订单出库时间</a></li>
              <li><a href="###">全国标准配送范围</a></li>
              <li><a href="###">货到付款</a></li>
            </ul>
          </div>
          <div class="footerItem">
            <h4>购物条款</h4>
            <ul class="footerItemCon">
              <li><a href="###">隐私保护政策</a></li>
              <li><a href="###">会员注册协议</a></li>
              <li><a href="###">商品退换货政策</a></li>
              <li><a href="###">提货券兑换售后</a></li>
              <li><a href="###">48小时退换货</a></li>
            </ul>
          </div>
          <div class="footerItem">
            <h4>公司简介</h4>
            <ul class="footerItemCon">
              <li><a href="###">招牌信息</a></li>
              <li><a href="###">联系我们</a></li>
              <li><a href="###">业务合作</a></li>
              <li><a href="###">关于我们</a></li>
            </ul>
          </div>
          <div class="footerItem">
            <h4>微信公众号</h4>
            <img src="./images/QRCode.jpg" />
          </div>
        </div>
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
          <p>
            <span style="font-weight: 700">许可证：</span>京ICP备123456789号
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="less" scope>
.footer {
  background-color: white;

  .a {
    width: 1500px;
    margin: 0 auto;
    .footer-container {
      margin-left: 150px;
      width: 1200px;
      margin: 0 auto;
      padding: 0 15px;

      .footer-image {
        border-bottom: 1px solid #e4e1e1;
      }
      .footerList {
        padding: 20px;
        border-bottom: 1px solid #e4e1e1;
        overflow: hidden;
        padding-left: 40px;

        .footerItem {
          width: 16.6666667%;
          float: left;
          h4 {
            font-size: 15px;
            margin-bottom: 8px;
          }
          .footerItemCon {
            li {
              line-height: 18px;
              margin-bottom: 4px;
              a {
                text-decoration: none;
              }
              a:hover {
                color: rgb(219, 65, 65);
              }
            }
          }
          &:last-child img {
            width: 121px;
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
  }
}
</style>
