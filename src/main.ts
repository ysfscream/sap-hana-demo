import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import App from './App.vue'

import './styles/base.scss'
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(ElementPlus).use(router).mount('#app')
