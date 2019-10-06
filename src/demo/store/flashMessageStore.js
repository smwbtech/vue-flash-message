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
			return `
<template>
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
        message: 'Lorem ipsum...'
      });
    }
  }
}
</script>`;
		},

		unclickableCodeExample(state) {
			return `
<template>
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
      this.flashMessage.error({
        title: 'Message Without Icon',
        message: 'Lorem ipsum...',
        icon: false,
        clickable: false
	  });
    }
  }
}
</script>`;
		},
		customPositionCodeExample(state) {
			return `
<template>
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
      this.flashMessage.show({
        title: 'Custom Position Message',
        message: 'Lorem ipsum...',
        icon: '/custom_position.svg',
        blockClass: 'custom_msg_two',
        position: 'left top',
        x: ${window.innerWidth / 2},
        y: ${window.innerHeight / 2}
      });
    }
  }
}
</script>`;
		},
		customStyleCodeExample(state) {
			return `<template>
  <FlashMessage :position="'${state.position}'"/>
</template>

<script>
export default {
  // ... some your code
  methods: {
    mountedSound() {
      let sound = new Audio('/sounds/message.mp3');
      sound.play();
    },

    destroyedSound() {
      let sound = new Audio('/sounds/delete.mp3');
      sound.play();
    },

    someEventHandler() {
      /*
      * You shouldn't set up strategy every time
      * before "show" method call. It is just an
      * example.
      */
      this.flashMessage.setStrategy('${state.strategy}');
      this.flashMessage.show({
          title: 'Custom Styled Message',
          message: 'Lorem ipsum...',
          icon: '/custom_style.svg',
          blockClass: 'custom_msg'
        },
        {
          mounted: this.mountedSound,
          destroyed: this.destroyedSound
        }
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
