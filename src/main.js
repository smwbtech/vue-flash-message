import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import FlashMessage from '@/components/index.js';
import store from '@/demo/store/store.js';
import './assets/css/common.css';

const config = {
	name: 'flashMessage',
	tag: 'FlashMessage',
	time: 8000
};

Vue.config.productionTip = false;
Vue.use(FlashMessage, config);
Vue.use(Vuex);

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');
