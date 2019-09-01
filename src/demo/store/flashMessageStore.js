export const flashMessage = {
	namespaced: true,

	state: {
		title: '',
		position: 'right bottom',
		strategy: 'single'
	},

	getters: {
		position(state) {
			return state.position;
		},

		strategy(state) {
			return state.strategy;
		}
	},

	mutations: {
		setItem(state, payload) {
			for (const [prop, val] of Object.entries(payload)) {
				state[prop] = val;
			}
		}
	}
};
