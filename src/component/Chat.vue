<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" :class="['chat-message', message.user === 'Me' ? 'my-message' : 'ai-message']">
        <span class="chat-user">{{ message.user }}:</span>
        <span class="chat-text" v-html="renderMarkdown(message.text)"></span>
      </div>
      <a-spin v-if="isSending" class="loading-spinner" />
    </div>
    <div class="chat-input">
      <a-input-search
        v-model:value="newMessage"
        placeholder="输入消息..."
        enter-button="发送"
        size="large"
        @search="sendMessage"
        :disabled="isSending"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axiosInstance from '../utils/axiosInstance';
import { marked } from 'marked';

const messages = ref([
  { user: 'AIPaike', text: '你好！有什么我可以帮助你的吗？' },
]);

const newMessage = ref('');
const isSending = ref(false);

const renderMarkdown = (text: string) => {
  return marked(text);
};

const sendMessage = async () => {
  if (newMessage.value.trim() !== '') {
    messages.value.push({ user: 'Me', text: newMessage.value });
    isSending.value = true;

    try {
      const response = await axiosInstance.get('/agent/chat', {
        params: {
          query: newMessage.value
        }
      });
      const data = response.data.data;
      console.log(data)
      messages.value.push({ user: 'AIPaike', text: data });
    } catch (error) {
      console.error('Error fetching AI response:', error);
      messages.value.push({ user: 'AIPaike', text: '抱歉，获取回复失败。' });
    } finally {
      isSending.value = false;
    }

    newMessage.value = '';
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 100%;
  margin: 0 auto;
  border: 1px solid #fafafa;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8f8f8;
}

.chat-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.chat-message {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 80%;
}

.my-message {
  align-self: flex-end;
  background-color: #e5f7ef;
}

.ai-message {
  align-self: flex-start;
  background-color: #e4f4ff;
}

.chat-user {
  font-weight: bold;
  margin-right: 0.5rem;
}

.chat-text {
  word-wrap: break-word;
}

.chat-input {
  padding: 1rem;
  border-top: 1px solid #f8f5f5;
  background-color: #fff;
  position: sticky;
  bottom: 0;
  width: 100%;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
</style>