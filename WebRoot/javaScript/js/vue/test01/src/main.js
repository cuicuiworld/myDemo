// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from './router'

import App from './App'
import home from './components/home.vue'
import hello from './components/hello.vue'
import list from './components/list.vue'

Vue.use(Router)

Vue.config.productionTip = false

var app = Vue.extend(App)

var router = new Router()

router.map({
  '/home':{
    components:home
  },
  '/hello':{
    components:hello
  },
  '/list':{
    components:list
  }
})

router.redirect({
  '/':'home'
})

router.start(app, '#app')
window.router = router
