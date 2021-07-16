import Vue from 'vue';
import VueGtag from 'vue-gtag';
import VueHead from 'vue-head';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';

// Import the plugin

// Register the plugin
Vue.use(VueHead, {
  separator: '-',
  complement: 'MaLubullule',
});

// Configuration VueAnalytics
Vue.use(VueGtag, {
  config: { id: 'G-CVZ9JDZ040' },
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
