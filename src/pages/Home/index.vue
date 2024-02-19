<template>
  <div class="home">
    <!-- <div>111</div> -->
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu
            class="el-menu-vertical-demo"
          >
            <router-link to="/welcome">
              <el-menu-item index="1">
                <i class="el-icon-house"></i>
                首页
              </el-menu-item>
            </router-link>

            <router-link to="/interface">
              <el-menu-item index="2">
                <i class="el-icon-notebook-1"></i>
                接口列表
              </el-menu-item>
            </router-link>
            
            <router-link to="/user">
              <el-menu-item index="3">
                <i class="el-icon-user"></i>
                用户列表
              </el-menu-item>
            </router-link>
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
  name: 'Home',
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