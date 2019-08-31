export const flashMessage = {
	namespaced: true,

	state: {
		title: '',
		containerPosition: 'right bottom'
	},

	getters: {
		currentPosition(state) {
			return state.containerPosition;
		}
	},

	mutations: {
		setPosition(state, payload) {
			state.containerPosition = payload;
		}
	}
};
