// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import tooljs from './tool'
import store from './store'
import { post, get, rootAddress } from './api'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$comm = tooljs
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$rootAddress = rootAddress

/* eslint-disable no-new */
export default new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
