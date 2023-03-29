<template>
  <div class="container">
    <div class="card-header">
      <span>{{ title }}</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="card-content">{{ count }}</div>
    <div class="card-charts">
      <slot name="charts"> </slot>
    </div>
    <div class="card-footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["title", "count"],
};
</script>

<style lang="less" scoped>
.container {
  min-width: 300px;
  .card-header {
    display: flex;
    justify-content: space-between;
    color: rgb(202, 196, 196);
    font-size: 16px;
  }
  .card-content {
    font-size: 30px;
    margin: 10px 0;
    padding: 10px 0;
    font-weight: 600;
  }
  .card-charts {
    height: 80px;
    font-size: 14px;
  }

  .card-footer {
    margin: 15px 0 10px 0;
    border-top: 1px solid #eee;
    height: 20px;
    padding-top: 10px;
  }
}
</style>
