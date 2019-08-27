import Vue from 'vue';
import App from './App.vue';
import FlashMessage from '@/components/index.js';
import './assets/css/common.css';

const config = {
	name: 'flashMessage',
	tag: 'FlashMessage',
	time: 8000
};

Vue.config.productionTip = false;
Vue.use(FlashMessage, config);

new Vue({
	render: h => h(App)
}).$mount('#app');
