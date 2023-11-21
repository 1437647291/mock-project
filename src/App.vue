<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="1">
              <i class="el-icon-house"></i>
              <router-link to="/home" slot="title">首页</router-link>
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
  name: 'App',
  components: {
    
  }
}
</script>

<style lang="less">
body {
  height: 100vh;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.el-main {
  background: #F0F0F0;
}
.el-container {
  height: 100%;

  .el-menu {
    height: 100%;
  }
}
</style>
