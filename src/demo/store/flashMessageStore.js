export const flashMessage = {
	namespaced: true,

	state: {
		title: '',
		position: 'right bottom',
		strategy: 'single',
		shorthand: 'success',
		exampleType: 'standart'
	},

	getters: {
		position(state) {
			return state.position;
		},

		strategy(state) {
			return state.strategy;
		},

		exampleType(state) {
			return state.exampleType;
		},

		standartCodeExample(state) {
			return `<template>
  <FlashMessage :position="'${state.position}'"/>
</template>

<script>
  export default {
    // ... some your code
      methods: {
	    someEventHandler() {
		  /*
		  * You shouldn't set up strategy every time
		  * before "show" method call. It is just an
		  * example.
		  */
		  this.flashMessage.setStrategy('${state.strategy}');
		  this.flashMessage.${state.shorthand}({
		    title: 'Title for ${state.shorthand} message',
		    message: 'Lorem upsum...'
		  });
		}
	  }
  }
</script>`;
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
