/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
// router setup
import router from './routes/router';
// axios setup
import axios from 'axios';
// highcharts setup
import Highcharts from 'highcharts';
import highcharts from 'highcharts-vue';
// vuex setup
// import store from './store';
// cookies setup
import cookies from 'vue-cookies';
// moment setup
import moment from 'vue-moment';

// plugin setup
Vue.use(DashboardPlugin);
Vue.prototype.$http = axios;
Highcharts.setOptions({
    lang: {
        decimalPoint: '.',
        thousandsSep: ',',
    }
});
Vue.use(highcharts);
Vue.use(cookies);
// 쿠키 만료 기간 : 7일
Vue.$cookies.config('7d');
Vue.use(moment);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // store,
});
