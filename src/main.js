import Vue from 'vue';
import TextareaAutosize from 'vue-textarea-autosize';
import UUID from 'vue-uuid';
import dateFilter from './filters/date.filter';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(UUID);

Vue.use(TextareaAutosize);

Vue.filter('dateFilter', dateFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
