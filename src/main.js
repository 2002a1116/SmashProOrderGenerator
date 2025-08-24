import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import { createI18n } from 'vue-i18n'
import zhCN from './localization/zh.json'
import enUS from './localization/en.json'
// 创建i18n实例并设置初始语言环境和其他配置
const i18n = createI18n({
  locale: 'en-US', // 设置默认语言环境为英语
  globalInjection: true,
  messages: {
    "zh-CN": zhCN,
    "en-US": enUS,
  }
});
const app=createApp(App);
app.use(naive);
app.use(i18n);
app.mount('#app')
