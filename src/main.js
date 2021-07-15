import Vue from 'vue';
import VueGtag from 'vue-gtag';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false;

// Configuration VueAnalytics
Vue.use(VueGtag, {
  config: { id: 'G-CVZ9JDZ040' },
});

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
