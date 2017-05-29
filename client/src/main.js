// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import { store } from './store/store'

import 'element-ui/lib/theme-default/index.css'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
