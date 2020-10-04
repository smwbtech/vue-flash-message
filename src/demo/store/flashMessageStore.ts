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
			return `
<template>
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
		},
		customComponentCodeExample(state) {
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
	  componentName: 'CustomComponent',
  	  clickable: false,
  	  time: 0
    });
  }
}
</script>

<!-- Code of the custom component -->
<!-- You should register it globally https://vuejs.org/v2/guide/components-registration.html#Global-Registration -->
<template lang="html">
  <div class="custom-component">
    <!-- Do not forget provide interface element to close message block -->
      <button
        class="close-btn"
        @click="flashMessage.deleteMessage(messageId)"
      />
      <h2>Meet vue number input</h2>
      <p>
        This is another component I'm working on,
        <a
          target="_blank"
          href="https://smwbtech.github.io/vue-number-input/"
          >vue-number-input</a
        >
      </p>
      <VueNumberInput
        v-model="value"
        class="custom-input"
        :inputClass="'custom-input-class'"
      />
    </div>
</template>

<script>
import VueNumberInput from '@smartweb/vue-number-input';
export default {
  components: {
    VueNumberInput
  },

  props: {
    /*
    * This prop will be passed to your component.
    * Do not forget to declare it
    */
    messageId: {
      type: Number
    }
  },

  data() {
    return {
      value: 0
    };
  }
};
</script>
`;
		},
		rawHtmlCodeExample(state) {
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
        html: "<table>...</table>", // String with html
        blockClass: 'custom_msg',
        time: 10000
    },
  });
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
