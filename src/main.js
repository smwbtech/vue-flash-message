import Vue from 'vue'
import App from './App.vue';
import FlashMessage from '@/components/index.js';

Vue.config.productionTip = false
Vue.use(FlashMessage);

new Vue({
  render: h => h(App),
}).$mount('#app')
