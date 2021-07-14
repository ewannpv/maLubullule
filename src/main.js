import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false;

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: '279366841',
});

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
