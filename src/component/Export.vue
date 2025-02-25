<template>
  <div>
    <a-input-search
      v-model:value="fileName"
      placeholder="input file name here"
      size="large"
      @search="exportFile"
    >
      <template #enterButton>
        <a-button>Export</a-button>
      </template>
    </a-input-search>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axiosInstance from '../utils/axiosInstance';

const fileName = ref('');

const exportFile = async () => {
  if (fileName.value) {
    console.log('当前的axios配置', axiosInstance.defaults);
    console.log(`导出文件: ${fileName.value}`);
    try {
      const response = await axiosInstance.get(`/export`, {
        params: {
          fileName: fileName.value
        },
        responseType: 'blob' // 确保响应类型为 blob
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName.value}.xlsx`); // 设置下载文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('导出文件失败:', error);
    }
  } else {
    console.log('请输入文件名');
  }
};

</script>