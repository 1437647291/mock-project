<template>
  <div class="home">
    <!-- <div>111</div> -->
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="1">
              <i class="el-icon-house"></i>
              <router-link to="/welcome" slot="title">首页</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-notebook-1"></i>
              <router-link to="/interface" slot="title">接口列表</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-user"></i>
              <router-link to="/user" slot="title">用户列表</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-user"></i>
              <router-link to="/test" slot="title">测试页面</router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scope lang="less">
.home {
  height: 100%;
}
.el-main {
  background: #F0F0F0;
}
.el-container {
  height: 100%;

  .el-menu {
    height: 100%;

    .is-active {
      a {
        color: #409EFF !important;
      }
    }

    .el-menu-item {
      a {
        color: black;
        &:-webkit-any-link {
          text-decoration: none;
        }
      }
    }
  }
}
</style>