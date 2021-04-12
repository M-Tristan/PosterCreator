import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eleInstall from './lib/elementUI'
import 'element-plus/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'
const app = createApp(App)
// console.log(app.config)
eleInstall(app)
app.use(store).use(router).mount('#app')
