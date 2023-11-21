<template>
  <el-dialog
    title="删除确认"
    :visible.sync="this.dialogVisible"
    :before-close="handleClose"
  >
    <div>姓名：{{currentUser.name}}</div>
    <div>年龄：{{currentUser.age}}</div>
    <div>注册时间：{{currentUser.time}}</div>
    <div>确认删除该用户吗？</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'DelModal',
  props: {
    dialogVisible: { type: Boolean },
    handleClose: { type: Function },
    currentUser: { type: Object },
    onOk: { type: Function }
  },
  mounted () {
    console.log(this.dialogVisible)
  }
}
</script>

<style>

</style>