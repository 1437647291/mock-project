<template>
  <div class="user-page">
    <div class="header">
      <div class="search">
        <el-input v-model="searchName" placeholder="请输入姓名" />
        <el-button style="margin-left: 8px" type="primary" @click="onSearch">搜索</el-button>
      </div>
      <el-button @click="onAdd" type="primary">添 加</el-button>
    </div>
    <TablePro
      :data="tableData"
      :border="true"
      :pagination="{
        currentPage,
        pageSize,
        total,
        sizeChange: (val) => handleSizeChange(val),
        currentChange: (val) => handleCurrentChange(val),
      }"

    >
      <template slot="columns">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="time"
          label="注册时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope)" type="text" size="small">编辑</el-button>
            <el-button @click="onDel(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </TablePro>

    <el-dialog
      title="查看"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <div>姓名：{{currentUser.name}}</div>
      <div>年龄：{{currentUser.age}}</div>
      <div>注册时间：{{currentUser.time}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <DelModal :dialogVisible="delModalVis" :currentUser="currentUser" :onOk="onOk" />
    <AddModal v-if="addModalvis" :addModalvis="addModalvis" :onOk="onSubmit" :handleClose="cancelAdd" :currentUser="currentUser" />
  </div>
</template>

<script>
import request from '@/utils/request';
import DelModal from './components/DelModal';
import AddModal from './components/AddModal';
import TablePro from '@/components/TablePro';
import { Message } from 'element-ui';

export default {
  name: 'UserPage',
  components: { DelModal, AddModal, TablePro },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      delModalVis: false,
      addModalvis: false,
      currentUser: {},
      searchName: undefined,
      currentPage: 1,
      pageSize: 10,
      total: 20,
    }
  },
  methods: {
    getUserList (params) {
      request({
        url: '/user/list',
        params
      }).then(res => {
        const { list, current, pageSize, total } = res.data;
        this.tableData = list;
        this.currentPage = Number(current);
        this.pageSize = Number(pageSize);
        this.total = Number(total);
      });
    },
    onEdit (scope) {
      this.addModalvis = true;
      this.currentUser = scope.row;
    },
    handleClose () {
      this.dialogVisible = false;
    },
    onDel (scope) {
      this.currentUser = scope.row;
      this.delModalVis = true;
    },
    onOk () {
      request({
        url: '/user/del',
        method: 'post',
        data: { id: this.currentUser.id }
      }).then(res => {
        Message.success(res.msg);
        this.delModalVis = false;
        this.getUserList();
      })
    },
    onAdd () {
      this.addModalvis = true;
    },
    cancelAdd () {
      this.addModalvis = false;
    },
    onSubmit (name, age, id) {
      if (!name || !age) {
        Message.error('请填全用户信息')
      } else if (id) {
        const params = { id, name, age }
        request({
          url: '/user/update',
          method: 'post',
          data: params,
        }).then(res => {
          Message.success(res.msg);
          this.addModalvis = false;
          this.currentUser = {};
          this.getUserList();
        })
      } else {
        request({
          url: '/user/add',
          method: 'post',
          data: { name, age }
        }).then(res => {
          Message.success(res.msg);
          this.addModalvis = false;
          this.currentUser = {};
          this.getUserList();
        })
      }
    },
    onSearch () {
      this.getUserList(this.searchName ? { name: this.searchName } : {});
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getUserList({ currentPage: this.currentPage, pageSize: this.pageSize });
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.getUserList({ currentPage: this.currentPage, pageSize: this.pageSize });
    },
  },
  mounted() {
    this.getUserList();
  }
}
</script>

<style lang="less" scope>
.user-page {
  padding: 24px;
  background: #fff;
  border-radius: 3px;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .search {
      display: flex;
      align-items: center;
    }
  }
}
</style>