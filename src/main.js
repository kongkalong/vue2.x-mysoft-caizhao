// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import './mock'

Vue.use(Vuex)

const state = {
  docUrl: ''
}
const store = new Vuex.Store({
  state,
  mutations: {
    UPDATE_URL (state, payload) {
      state.docUrl = payload.url
    }
  },
  actions: {
    updateUrl: ({ commit }, url) => commit({
      type: 'UPDATE_URL',
      url: url
    })
  }
})

FastClick.attach(document.body)

Vue.config.productionTip = false

import { LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin } from 'vux'
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)

Vue.prototype.$scrollB = () => {
  const winH = window.innerHeight
  const scrollTop = document.querySelector('#vux_view_box_body').scrollTop
  const listH = document.querySelector('#vux_view_box_body').firstChild.offsetHeight
  return winH + scrollTop > listH
}

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
