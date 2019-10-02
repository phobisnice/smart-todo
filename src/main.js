import Vue from 'vue';
import TextareaAutosize from 'vue-textarea-autosize';
import vSelect from 'vue-select';
import UUID from 'vue-uuid';
import dateFilter from './filters/date.filter';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(UUID);

Vue.use(TextareaAutosize);
Vue.component('v-select', vSelect);

Vue.filter('dateFilter', dateFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
