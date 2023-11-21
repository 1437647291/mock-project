<template>
  <el-dialog
    title="添加用户"
    :visible.sync="this.addModalvis"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <div class="form-item">
      <div class="label">姓名：</div>
      <el-input v-model="name" placeholder="请输入姓名" />
    </div>
    <div class="form-item">
      <div class="label">年龄：</div>
      <el-input v-model="age" placeholder="请输入年龄" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="() => onOk(name, age, id)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddModal',
  props: {
    addModalvis: { type: Boolean },
    handleClose: { type: Function },
    currentUser: { type: Object },
    onOk: { type: Function }
  },
  data () {
    return {
      name: undefined,
      age: undefined,
      id: undefined,
    }
  },
  methods: {
  },
  mounted () {
    if (this.currentUser) {
      const { name, age, id } = this.currentUser;
      this.name = name;
      this.age = age;
      this.id = id;
    }
  }
}
</script>

<style lang="less" scoped>
.form-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;

  &:first-child {
    margin: 0;
  }

  .label {
    white-space: nowrap;
  }
}
</style>