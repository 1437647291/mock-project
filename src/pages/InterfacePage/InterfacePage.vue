<template>
  <div class="interface-page">
    <div class="header">
      <div class="search">
        <el-input placeholder="请输入搜索内容" />
        <el-button type="primary">搜索</el-button>
      </div>
      <el-button type="primary" @click="addInterface">添加接口</el-button>
    </div>
    <div class="interface-item" v-for="item in interfaceList" :key="item.id">
      <div class="interface-header">
        <div class="interface-name">
          <div class="name-text">{{ item.interfaceName }}</div>
          <div class="method method-post">{{ item.methodType === '1' ? 'GET' : 'POST' }}</div>
        </div>
        <div class="interface-action">
          <el-tooltip class="item" effect="dark" content="添加" placement="top">
            <i class="el-icon-circle-plus-outline" @click="addJson(item)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="el-icon-edit" @click="editInterface(item)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i class="el-icon-delete" @click="delInterfaceRequest(item.id)"></i>
          </el-tooltip>
        </div>
      </div>

      <div class="chinese-name">{{ item.interfaceDescribe }}</div>

      <div class="json-list">
        <div
          v-for="jsonItem in item.jsonArr"
          :key="jsonItem.jsonId"
          @click="changeDefaultJson(jsonItem.jsonId)"
          class="interface-info"
        >
          <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top">
            <div slot="content">
              <el-button type="text" @click="editJson(jsonItem)">编辑</el-button>
              <el-button type="text" @click="delJson(jsonItem)">删除</el-button>
            </div>
            <div :class="['interface-describe', jsonItem.default ? 'interface-default' : '']">
              <div class="describe-text">{{ jsonItem.responseDescribe }}</div>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>

    <AddInterfaceModal
      v-if="addInterfaceVis"
      :currentInterface="currentInterface"
      :visible="addInterfaceVis"
      :handleClose="closeAddModal"
      :handleOk="onSubmit"
    />
    <AddJsonModal
      v-if="addJsonVis"
      :currentJson="currentJson"
      :visible="addJsonVis"
      :handleClose="closeAddJson"
      :handleOk="onSubmitJson"
    />
  </div> 
</template>

<script>
import AddInterfaceModal from './components/AddInterfaceModal.vue';
import AddJsonModal from './components/AddJsonModal.vue';
import request from '@/utils/request';
import { Message } from 'element-ui';

export default {
  name: "InterfacePage",
  components: { AddInterfaceModal, AddJsonModal },
  data() {
    return {
      addInterfaceVis: false,
      interfaceList: [],
      addJsonVis: false,
      currentInterface: {},
      currentJson: {},
    }
  },
  methods: {
    getInterfaceList () {
      request({
        url: '/interface/list',
      }).then(res => {
        const { list, current, pageSize, total } = res.data;
        this.interfaceList = list;
      });
    },
    addInterfaceRequest (params) {
      request({
        url: '/interface/add',
        data: params,
        method: 'post',
      }).then(res => {
        Message.success('添加成功');
        this.addInterfaceVis = false;
        this.getInterfaceList();
      });
    },
    delInterfaceRequest (id) {
      request({
        url: '/interface/del',
        method: 'post',
        data: { id }
      }).then(res => {
        Message.success(res.msg);
        this.delModalVis = false;
        this.getInterfaceList();
      })
    },
    editInterfaceRequest (params) {
      delete params._id;
      request({
        url: '/interface/edit',
        method: 'post',
        data: params
      }).then(res => {
        Message.success('修改成功');
        this.addInterfaceVis = false;
        this.getInterfaceList();
      })
    },
    changeJsonRequest (params) {
      request({
        url: '/json/change',
        data: params,
        method: 'post'
      }).then(res => {
        this.getInterfaceList();
      });
    },
    delJsonRequest (params) {
      request({
        url: '/json/del',
        method: 'post',
        data: params
      }).then(res => {
        this.getInterfaceList();
      });
    },
    addJsonReuquest (params) {
      request({
        url: '/json/add',
        method: 'post',
        data: params
      }).then(res => {
        Message.success('添加成功');
        this.addJsonVis = false;
        this.getInterfaceList();
      })
    },
    editJsonRequest (params) {
      delete params._id;
      request({
        url: '/json/edit',
        method: 'post',
        data: params
      }).then(res => {
        Message.success('修改成功');
        this.addJsonVis = false;
        this.getInterfaceList();
      })
    },
    addInterface () {
      this.addInterfaceVis = true;
      this.currentInterface = {};
    },
    closeAddModal () {
      this.addInterfaceVis = false;
      // this.currentInterface = {};
    },
    editInterface (interfaceInfo) {
      this.addInterfaceVis = true;
      this.currentInterface = JSON.parse(JSON.stringify(interfaceInfo));
    },
    addJson (interfaceInfo) {
      this.currentInterface = interfaceInfo;
      this.currentJson = {};
      this.addJsonVis = true;
    },
    closeAddJson () {
      this.addJsonVis = false;
      // this.currentInterface = {};
    },
    onSubmit(params) {
      if (params.id) {
        this.editInterfaceRequest(params);
      } else {
        this.addInterfaceRequest(params);
      };
      this.currentInterface = {};
    },
    onSubmitJson (params) {
      if (params?.jsonId) {
        this.editJsonRequest(params);
      } else {
        const { responseDescribe, jsonContent } = params;
        this.addJsonReuquest({ parentId: this.currentInterface.id, responseDescribe, jsonContent });
      };
      this.currentInterface = {};
    },
    editJson (jsonInfo) {
      this.currentJson = jsonInfo;
      this.addJsonVis = true;
    },
    changeDefaultJson (jsonId) {
      this.changeJsonRequest({ jsonId });
    },
    delJson (jsonInfo) {
      this.delJsonRequest({ jsonId: jsonInfo.jsonId });
    },
  },
  mounted() {
    this.getInterfaceList();
  }
}
</script>
<style lang="less" scope>
.interface-page {
  width: 100%;
  height: 100%;
  overflow: auto;

  .header {
    width: 100%;
    padding: 24px;
    border-radius: 3px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    .search {
      display: flex;
      align-items: center;

      .el-button {
        margin-left: 8px;
      }
    }
  }

  .interface-item {
    background: #fff;
    padding: 24px;
    border-radius: 3px;
    margin-top: 24px;

    &:first-child {
      margin-top: 0;
    }

    .interface-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .interface-name {
        font-weight: bold;
        display: flex;
        align-items: center;

        .method {
          margin-left: 8px;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 16px;
          background: pink;
          color: #fff;

          &.method-post {
            background: green;
          }
        }
      }

      .interface-action {
        display: flex;
        align-items: center;

        i {
          font-size: 20px;
          margin: 0 8px;
        }
      }
    }

    .chinese-name {
      text-align: left;
      margin-top: 8px;
      font-weight: bold;
    }

    .json-list {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .interface-info {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 16px;
        margin-right: 24px;

        .interface-describe {
          padding: 8px 14px;
          border: 1px solid #DEDEE0;
          border-radius: 20px;
          cursor: pointer;

          &.interface-default {
            background: #409EFF;
            color: #fff;
            border: 1px solid #409EFF;
          }

          .describe-text {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
