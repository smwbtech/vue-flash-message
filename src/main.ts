// import Vue from 'vue';
// import Vuex from 'vuex';
// import App from './App.vue';
// import FlashMessage from '@/components/index.js';
// import VueHighlightJS from 'vue-highlightjs';
// import CustomComponent from '@/demo/components/CustomComponent.vue';
// import Vuescroll from 'vuescroll';
// import store from '@/demo/store/store.js';
// import './assets/css/common.css';

// const config = {
// 	name: 'flashMessage',
// 	tag: 'FlashMessage',
// 	time: 8000
// };

// Vue.config.productionTip = false;
// Vue.use(FlashMessage, config);
// Vue.use(VueHighlightJS);
// Vue.use(Vuescroll, {
// 	ops: {
// 		rail: {
// 			background: '#fff',
// 			opacity: 0.2,
// 			keepShow: false
// 		},
// 		bar: {
// 			onlyShowBarOnScroll: true,
// 			background: '#0092ca'
// 		}
// 	}
// });
// Vue.use(Vuex);

// Vue.component('CustomComponent', CustomComponent);

// new Vue({
// 	store,
// 	render: h => h(App)
// }).$mount('#app');

import { createApp } from 'vue';
import { createStore } from 'vuex'
import FlashMessage from '@/components/index.ts';
import store from '@/demo/store/store.ts';
import App from './App.vue';
import './assets/css/common.css';

const app = createApp(App);
const vuex = createStore(store)
app.use(vuex);
app.use(FlashMessage);
app.mount('#app');
