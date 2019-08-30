export function createMessageMixin(config) {
	//If user choosed 'bus' strategy or didn't pass any args
	return {
		props: {
			messageObj: {
				type: Object
			},
			positionString: {
				type: String,
				default: 'right bottom'
			}
		},

		data() {
			return {
				timeoutId: undefined, // id that will be returned by setTimeout() function
				yAxis: 0
			};
		},

		computed: {
			classObj() {
				return {
					'_vue-flash-msg-body_success':
						this.messageObj.status === 'success',
					'_vue-flash-msg-body_error':
						this.messageObj.status === 'error',
					'_vue-flash-msg-body_warning':
						this.messageObj.status === 'warning',
					'_vue-flash-msg-body_info':
						this.messageObj.status === 'info',
					'_vue-flash-msg-body_default':
						this.messageObj.status === 'default',
					'_vue-flash-msg-body_unclickabe': !this.messageObj
						.clickable,
					'_vue-flash-msg-body': true
				};
			},

			positionClass() {
				const [x, y] = this.positionString.split(' ');
				return `_vue-flash-msg-_${x}-${y}`;
			},

			positionStyleObj() {
				if (
					this.messageObj.position &&
					typeof this.messageObj.position === 'string' &&
					(this.messageObj.x && this.messageObj.y) &&
					(typeof this.messageObj.x === 'number' &&
						typeof this.messageObj.y === 'number')
				) {
					const style = {
						[this.messageObj.position.split(' ')[0]]: `${
							this.messageObj.x
						}px`,
						[this.messageObj.position.split(' ')[1]]: `${
							this.messageObj.y
						}px`
					};
					return style;
				} else if (this.yAxis) {
					const yPos = this.positionString.split(' ')[1];
					if (yPos === 'bottom') {
						return {
							bottom: `${this.yAxis}px`
						};
					} else {
						return {
							top: `${this.yAxis}px`
						};
					}
				}
			}
		},

		methods: {
			/**
			 * Custom set timeout with default time
			 * @param {Function} callback           - callback function
			 * @param {Number}   [time=this.time]   - time in mileseconds
			 * return {Number}                      - timeout id
			 */
			setTimeout(callback, time = this.messageObj.time) {
				return setTimeout(callback, time);
			},

			/**
			 * Clear timeoutId in "single" strategy
			 * Invoke deleteMessage on EventBus
			 * @param  {Boolean} [clear=true] - true - timeout will be cleared
			 * @return {undefined}
			 */
			clearData(clear = true) {
				if (this.timeoutId && clear) clearTimeout(this.timeoutId);
				this[config.name].$emit('deleteMessage', this.messageObj.id);
			},

			/**
			 * Handle event when user click on message block
			 * @return {undefined}
			 */
			clickHandler() {
				if (this.messageObj.clickable) this.clearData();
			},

			/**
			 * Change message position,
			 * previous message was destroyed
			 * @param  {[Number} height - previous message height
			 * @param  {Number} id      - previous message id
			 * @return {undefined}
			 */
			changePositionHandler({ height, id }) {
				if (this.messageObj.id > id) this.yAxis -= height;
			}
		},

		// Set up data
		created() {
			this.timeoutId = this.setTimeout(
				this.clearData.bind(this, false),
				this.messageObj.time
			);
			this[config.name].$once('clearData', this.clearData);
			this[config.name].$on('changePosition', this.changePositionHandler);
		},

		// Invoke mounted callback function if exist
		mounted() {
			this.yAxis =
				this[config.name].messages.length === 1
					? this[config.name].currentHeight
					: this[config.name].currentHeight + 20;
			this[config.name].$_vueFlashMessage_setDimensions(
				this.$el.offsetHeight
			);
			if (
				this.messageObj.mounted &&
				typeof this.messageObj.mounted === 'function'
			) {
				this.messageObj.mounted();
			}
		},

		beforeDestroy() {
			this.$off('changePosition');
			this[config.name].$emit('destroy', {
				height: -this.$el.offsetHeight,
				id: this.messageObj.id
			});
		},

		// Invoke destroyed callback function if exist
		destroyed() {
			if (
				this.messageObj.destroyed &&
				typeof this.messageObj.destroyed === 'function'
			) {
				this.messageObj.destroyed();
			}
		}
	};
}
