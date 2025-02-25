import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Toast from 'vue-toastification'

import 'ant-design-vue/dist/reset.css'
import type { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  
}

const app = createApp(App)

app.use(Antd)
app.use(router)
app.use(Toast, options)
app.mount('#app')