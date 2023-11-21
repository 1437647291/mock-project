<template>
  <el-dialog
    title="添加接口"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <div class="form-item">
      <div class="label">接口名称：</div>
      <el-input v-model="interfaceName" placeholder="请输入接口名称" />
    </div>
    <div class="form-item">
      <div class="label">接口描述：</div>
      <el-input v-model="interfaceDescribe" placeholder="请输入接口描述，如：用户列表接口" />
    </div>
    <div class="form-item">
      <div class="label">请求方式：</div>
      <el-radio v-model="methodType" label="1">GET</el-radio>
      <el-radio v-model="methodType" label="2">POST</el-radio>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui';
import request from '@/utils/request';
import vueJsonEditor from 'vue-json-editor';

export default {
  name: "AddInterfaceModal",
  props: {
    visible: { type: Boolean },
    handleClose: { type: Function },
    handleOk: { type: Function },
    currentInterface: { type: Object },
  },
  components: { vueJsonEditor },
  data() {
    return {
      interfaceName: undefined,
      interfaceDescribe: undefined,
      methodType: undefined,
    }
  },
  methods: {
    onSubmit () {
      if (!this.interfaceName || !this.interfaceDescribe || !this.methodType) {
        Message.error('请填全接口信息!');
      } else {
        const params = {
          ...this.currentInterface,
          interfaceName: this.interfaceName,
          interfaceDescribe: this.interfaceDescribe,
          methodType: this.methodType,
        };
        this.handleOk(params);
      }
    }
  },
  mounted () {
    if (this.currentInterface) {
      const { interfaceName, interfaceDescribe, methodType } = this.currentInterface;
      this.interfaceName = interfaceName;
      this.interfaceDescribe = interfaceDescribe;
      this.methodType = methodType;
    }
  }
}
</script>

<style lang="less" scoped>
.form-item {
  display: flex;
  margin-top: 16px;

  &:first-child {
    margin-top: 0;
  }

  .label {
    white-space: nowrap;
  }

  .edit-response {
    width: 100%;
  }
}
</style>