import Vue from 'vue';
import Vuex from 'vuex';
import { flashMessage } from './flashMessageStore.js';
import { app } from './appStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		flashMessage,
		app
	}
});
