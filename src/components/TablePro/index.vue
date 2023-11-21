<template>
  <div class="table-pro">
    <el-table
      v-bind="$attrs"
    >
      <slot name="columns"></slot>
    </el-table>

    <el-pagination
      v-if="pagination"
      @size-change="pagination.sizeChange"
      @current-change="pagination.currentChange"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'TablePro',
  props: {
    pagination: {
      default: false,
      type: {
        currentPage: Number,
        pageSize: Number,
        total: Number,
        sizeChange: Function,
        currentChange: Function,
      } | false,
    }
  },
  mounted() {
    console.log('pagination', this.pagination)
  }
}
</script>

<style lang="less" scope>
.table-pro {
  .el-pagination {
    margin-top: 8px;
    text-align: end;
  }
}
</style>