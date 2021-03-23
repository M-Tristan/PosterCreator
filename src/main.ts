import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eleInstall from './lib/elementUI'
import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App)
eleInstall(app)
app.use(store).use(router).mount('#app')
