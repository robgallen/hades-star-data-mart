// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import '@/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueHighcharts from 'vue-highcharts';
import App from './App';
import router from './router';

Vue.use(BootstrapVue);
Vue.use(VueHighcharts);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
