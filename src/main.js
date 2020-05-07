import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import toasts from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue ()/* 事件总线：可以间接的用事件总线来传递事件（解决非父子组件通信的问题） 当然也可以用Vuex状态管理解决*/
// 安装toasts插件
Vue.use(toasts)

//解决移动端300ms延迟 
FastClick.attach(document.body)

// 添加图片懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
