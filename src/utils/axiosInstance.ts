import axios from 'axios';
import router from '../router'; // 导入路由实例

const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  // 打印当前的 Authorization 头
  console.log('当前的 Authorization 头:', config.headers['Authorization']);
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    // Token 过期或无效，清除 sessionStorage 并重定向到登录页面
    sessionStorage.removeItem('token');
    router.push('/login'); // 使用路由实例进行重定向
  }
  return Promise.reject(error);
});

export default axiosInstance;