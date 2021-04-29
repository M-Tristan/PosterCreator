import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eleInstall from './lib/elementUI'
import 'element-plus/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'
import inputNumber from './components/inputNumber/inputNumber.vue'
const app = createApp(App)
// console.log(app.config)
eleInstall(app)
console.log(inputNumber)
app.component(inputNumber.name, inputNumber)
app.use(store).use(router).mount('#app')
