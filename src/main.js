import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'mint-ui/lib/style.css'
import './style/home.scss'
// import 'font-awesome/css/font-awesome.css'
import Mint from 'mint-ui';


Vue.use(Mint);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
