import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue ()/* 事件总线：可以间接的用事件总线来传递事件（解决非父子组件通信的问题） 当然也可以用Vuex状态管理解决*/

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
