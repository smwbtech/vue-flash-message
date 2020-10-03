const SHORTHANDS = ['error', 'success', 'warning', 'info'];

export function createEventbusFallback(config, ref) {
	if (!ref && typeof ref !== 'function')
		throw new TypeError(
			'You need to pass ref function as third argument in use() method, when you register plugin'
		);

	class EventBus {
		constructor() {
			this.events = {};
		}

		$on(eventName, fn) {
			this.events[eventName] = this.events[eventName] || [];
			this.events[eventName].push(fn.bind(this));
		}

		$off(eventName, fn) {
			if (this.events[eventName]) {
				for (var i = 0; i < this.events[eventName].length; i++) {
					if (this.events[eventName][i] === fn) {
						this.events[eventName].splice(i, 1);
						break;
					}
				}
			}
		}

		$emit(eventName, data) {
			if (this.events[eventName]) {
				this.events[eventName].forEach(function(fn) {
					fn(data);
				});
			}
		}
	}

	class FlashMessage extends EventBus {
		constructor(ref) {
			super();
			this.messages = ref([]); // array of messages object
			this.nextMessageId = ref(1); // id of next inserted message object
			this.strategy = ref(config.strategy);
			this.timeoutId = ref(undefined);
			this.currentHeight = ref(0);
		}
		$_vueFlashMessage_setDimensions({ height, id, img }) {
			this.messages.value.length > 0
				? (this.currentHeight.value += height)
				: (this.currentHeight.value = 0);
			// If we decreasing height
			if (height < 0 && typeof id === 'number') {
				/* istanbul ignore next */
				setTimeout(() => {
					this.$emit('changePosition', {
						height: Math.abs(height),
						id
					});
				}, 500);
			} else {
				this.$emit('changePosition', { height, id, img });
			}
		}
		show(data, callbacks = {}) {
			const strategy = this.strategy.value;
			const messagesLength = this.messages.value.length;
			let message = {
				id: this.nextMessageId.value++,
				time: data.time || config.time,
				status: 'default',
				message: '',
				icon: '',
				clickable: true
			};
			message = Object.assign(message, data, callbacks);
			// If some message is showing
			// clear messages array
			// clear timeout and set new one
			if (strategy === 'single' && messagesLength > 0) {
				clearTimeout(this.timeoutId.value);
				this.messages.value = [];
				/* istanbul ignore next */
				this.timeoutId.value = setTimeout(() => {
					this.messages.length > 0
						? (this.messages.value = [])
						: false;
					this.messages.value.push(message);
				}, 600);
			} else {
				this.messages.value.push(message);
			}

			return message.id;
		}
		setStrategy(strategy) {
			if (/^(single)|(multiple)$/i.test(strategy)) {
				this.strategy.value = strategy;
				return true;
			}
			return false;
		}
		deleteMessage(id) {
			this.messages.value = this.messages.value.filter(v => v.id !== id);
		}
	}

	const eventBus = new FlashMessage(ref);
	eventBus.$on('deleteMessage', eventBus.deleteMessage);
	eventBus.$on('destroy', eventBus.$_vueFlashMessage_setDimensions);
	eventBus.$on('imageLoaded', eventBus.$_vueFlashMessage_setDimensions);

	// Add shorthands
	for (const shorthand of SHORTHANDS) {
		eventBus[shorthand] = function(data, callbacks) {
			return this.show(
				Object.assign(data, { status: shorthand }),
				callbacks
			);
		};
	}

	return eventBus;
}
