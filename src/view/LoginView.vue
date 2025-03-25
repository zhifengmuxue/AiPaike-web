<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="login-title">AiPaike 登录</h1>
      <a-form
        :model="formState"
        name="basic"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 18 }"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名！' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码！' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item
          label="角色"
          name="role"
          :rules="[{ required: true, message: '请选择角色！' }]"
        >
          <a-select v-model:value="formState.role" placeholder="请选择角色">
            <a-select-option value="student">学生</a-select-option>
            <a-select-option value="teacher">老师</a-select-option>
            <a-select-option value="admin">管理员</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :wrapperCol="{ offset: 2, span: 22 }">
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'vue-router';

const router = useRouter();

const formState = reactive({
  username: '',
  password: '',
  role: 'admin',
  remember: true,
});

const onFinish = async () => {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: '/login',
      params: {
        username: formState.username,
        password: formState.password,
        role: formState.role,
      }
    });
    if (response.data.code === 200) {
      console.log('登录成功:', response.data.data.token);
      sessionStorage.setItem('token', response.data.data.token);
      console.log('当前的axios配置' , axiosInstance.defaults);
      router.push('/home/dashboard');
    } else {
      console.log('登录失败:', response.data.msg);
    }
  } catch (error) {
    console.error('请求错误:', error);
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
.login-form {
  width: 300px;
  padding: 2rem;
  background-color: #fff;
  border: 1px solid #d8dee4;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}
</style>