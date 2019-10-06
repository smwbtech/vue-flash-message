const SHORTHANDS = ['error', 'success', 'warning', 'info'];

export function createEventBus(config) {
	let eventBus = {
		data() {
			return {
				messages: [], // array of messages object
				nextMessageId: 1, // id of next inserted message object
				strategy: config.strategy,
				timeoutId: undefined,
				currentHeight: 0
			};
		},

		methods: {
			/**
			 * Change data.currentHeight if new message added to array
			 * or if message destroyed
			 * @param {Number} height - height of the element
			 * @param {Number} id     - id of the element
			 * @param {Boolean} img   - some element load image and we need to change positions of all elements above
			 */
			$_vueFlashMessage_setDimensions({ height, id, img }) {
				this.messages.length > 0
					? (this.currentHeight += height)
					: (this.currentHeight = 0);
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
			},

			/**
			 * change the strategy of showing messages
			 * @param {String} strategy     - 'single' or 'multiple'
			 * @return {Boolean}            - if strategy is changed it will return true, otherwise false
			 */
			setStrategy(strategy) {
				if (/^(single)|(multiple)$/i.test(strategy)) {
					this.strategy = strategy;
					return true;
				}
				return false;
			},
			/**
			 * Push new message Object into messages array and merge properties
			 * @param  {Object} data            - message object
			 * @param  {Object} [callbacks={}]  - object with callback functions
			 *
			 */
			show(data, callbacks = {}) {
				let message = {
					id: this.nextMessageId++,
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
				if (this.strategy === 'single' && this.messages.length > 0) {
					clearTimeout(this.timeoutId);
					this.messages = [];
					/* istanbul ignore next */
					this.timeoutId = setTimeout(() => {
						this.messages.length > 0 ? (this.messages = []) : false;
						this.messages.push(message);
					}, 600);
				} else this.messages.push(message);

				return message.id;
			},

			/**
			 * Delete message from messages array
			 * @param  {Number} id      - message id
			 */
			deleteMessage(id) {
				this.messages = this.messages.filter(v => v.id !== id);
			}
		},

		created() {
			this.$on('deleteMessage', this.deleteMessage);
			this.$on('destroy', this.$_vueFlashMessage_setDimensions);
			this.$on('imageLoaded', this.$_vueFlashMessage_setDimensions);
		}
	};

	// Add shorthands
	for (const shorthand of SHORTHANDS) {
		eventBus.methods[shorthand] = function(data, callbacks) {
			return this.show(
				Object.assign(data, { status: shorthand }),
				callbacks
			);
		};
	}

	return eventBus;
}
