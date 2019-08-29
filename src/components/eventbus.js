export function createEventBus(config) {
	return {
		data() {
			return {
				messages: [], // array of messages object
				nextMessageId: 1, // id of next inserted message object
				strategy: config.strategy,
				timeoutId: undefined
			};
		},

		methods: {
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
					time: config.time,
					status: 'default',
					message: '',
					icon: '',
					clickable: true
				};
				message = Object.assign(message, data, callbacks);

				if (this.messages.length > 0 && this.strategy === 'single') {
					this.messages = [];
					clearTimeout(this.timeoutId);
					this.timeoutId = setTimeout(
						() => this.messages.push(message),
						600
					);
				} else this.messages.push(message);

				return message.id;
			},
			error(data, callbacks) {
				return this.show(
					Object.assign(data, { status: 'error' }),
					callbacks
				);
			},
			warning(data, callbacks) {
				return this.show(
					Object.assign(data, { status: 'warning' }),
					callbacks
				);
			},
			info(data, callbacks) {
				return this.show(
					Object.assign(data, { status: 'info' }),
					callbacks
				);
			},
			success(data, callbacks) {
				return this.show(
					Object.assign(data, { status: 'success' }),
					callbacks
				);
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
		}
	};
}
