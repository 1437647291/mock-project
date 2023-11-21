<template>
  <el-dialog
    title="添加响应数据"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <div class="form-item">
      <div class="label">响应描述：</div>
      <el-input v-model="responseDescribe" placeholder="请输入响应描述，如：成功响应" />
    </div>
    <div class="form-item">
      <div class="label">响应数据：</div>
      <div class="edit-response">
        <vue-json-editor
          lang="zh"
          mode="text"
          :showBtns="false"
          :expanded-on-start="true"
          v-model="jsonContent"
        />
      </div>
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
    currentJson: { type: Object },
  },
  components: { vueJsonEditor },
  data() {
    return {
      jsonContent: undefined,
      responseDescribe: undefined
    }
  },
  methods: {
    onSubmit () {
      if (!this.jsonContent || !this.responseDescribe) {
        Message.error('请填全接口信息!');
      } else {
        const params = {
          ...this.currentJson,
          jsonContent: this.jsonContent,
          responseDescribe: this.responseDescribe,
        }
        this.handleOk(params);
      }
    }
  },
  mounted () {
    if (this.currentJson) {
      console.log('currentJson', this.currentJson)
      const { responseDescribe, jsonContent } = this.currentJson;
      this.responseDescribe = responseDescribe;
      this.jsonContent = jsonContent;
    };
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