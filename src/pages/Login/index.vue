<template>
  <div class="login">
    <div class="form">
      <div class="title">欢迎登陆MOCK平台</div>
      <!-- 登陆模块 -->
      <div v-if="showLogin">
        <el-form :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="account">
            <el-input placeholder="请输入账号" v-model="ruleForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%">登陆</el-button>
          </el-form-item>
        </el-form>

        <div class="account-set">
          <div class="setting">
            <div class="setting-text">没有账户？</div>
            <el-button type="text" @click="toRegister">去注册</el-button>
          </div>
          <div class="setting">
            <div class="setting-text">忘记密码？</div>
            <el-button type="text">去找回</el-button>
          </div>
        </div>
      </div>

      <!-- 注册模块 -->
      <div v-if="!showLogin">
        <div class="register-header">
          <div>账号注册</div>
          <div class="setting">
            <div class="setting-text">已有账号？</div>
            <el-button type="text" @click="toLogin">去登陆</el-button>
          </div>
        </div>

        <el-form :model="register" status-icon class="demo-ruleForm">
          <el-form-item prop="account">
            <el-input placeholder="请输入账号" v-model="register.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input placeholder="输入密码" type="password" v-model="register.password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input placeholder="确认密码" type="password" v-model="register.confirmPassword" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('register')" style="width: 100%">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="img-body"></div>
  </div>
</template>

<script>
import request from '@/utils/request';
import { Message } from 'element-ui';
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        account: '',
        password: '',
      },
      register: {
        account: '',
        password: '',
        confirmPassword: '',
      },
      checked: false,
      showLogin: true,
    }
  },
  methods: {
    registerRequest (params) {
      request({
        url: '/user/register',
        method: 'post',
        data: params,
      }).then(res => {
        Message.success('注册成功!');
        this.showLogin = true;
      })
    },
    loginRequest (params) {
      request({
        url: '/user/login',
        method: 'post',
        data: params,
      }).then(res => {
        this.$router.push({ path: '/welcome' });
        Cookies.set('mockAuth', res.data, { expires: 1 });
      }).catch(err => {})
    },
    toRegister () {
      this.showLogin = false;
    },
    toLogin () {
      this.showLogin = true;
    },
    submitForm (from) {
      if (from === 'ruleForm') {
        // 登陆
        this.loginRequest(this.ruleForm);
      } else if (from === 'register') {
        // 注册
        this.registerRequest(this.register);
      }
    },
  }
}
</script>

<style scope lang="less">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .form {
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 24px;

    .title {
      margin-top: 80px;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 40px;
      text-align: center;
    }

    .account-set {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .setting {
        display: flex;
        align-items: center;

        .setting-text {
          font-size: 12px;
          color: #909399;
          line-height: 12px;
        }
      }
    }

    .register-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      .setting {
        display: flex;
        align-items: center;

        .setting-text {
          font-size: 12px;
          color: #909399;
          line-height: 12px;
        }
      }
    }
  }

  .img-body {
    flex: 1;
    height: 100%;
    background: pink;
  }
}
</style>