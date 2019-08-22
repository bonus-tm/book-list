import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import './bootstrap-vue-imports'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
