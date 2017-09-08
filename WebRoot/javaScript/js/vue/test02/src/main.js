// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import home from './components/home.vue'
import hello from './components/hello.vue'
import list from './components/list.vue'

Vue.use(Router)

Vue.config.productionTip = false

var app = Vue.extend(App)

var router = new Router({
  routes:[
    {path:'/home',components:home},
    {path:'/list',components:list},
    {path:'/hello',components:hello},
    { path: "*", redirect: home },
  ]
})
new Vue({ router:router }).$mount('#app');
/*router.redirect({
  '/':'home'
})*/

