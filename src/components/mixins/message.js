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
				yAxis: 0,
				heightWithoutImage: 0
			};
		},

		computed: {
			/**
			 * Is it message with custom position or not
			 * @return {Boolean} true - custom | false not custom
			 */
			isCustom() {
				return (
					typeof this.messageObj.x === 'number' &&
					typeof this.messageObj.y === 'number'
				);
			},
			classObj() {
				return {
					status: `_vue-flash-msg-body_${this.messageObj.status}`,
					basic: '_vue-flash-msg-body'
				};
			},

			positionClass() {
				const [x, y] = this.positionString.split(' ');
				return `_vue-flash-msg-_${x}-${y}`;
			},

			/**
			 * Return style object with message block positions
			 * @return {Object}
			 */
			positionStyleObj() {
				const style = {};
				const [x, y] = this.positionString.split(' ');
				if (this.isCustom) {
					style[x] = `${this.messageObj.x}px`;
					style[y] = `${this.messageObj.y}px`;
					return style;
				} else {
					style[y] = `${this.yAxis}px`;
					return style;
				}
			}
		},

		methods: {
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
			changePositionHandler({ height, id, img }) {
				if (this.messageObj.id > id && !img) this.yAxis -= height;
				else if (this.messageObj.id > id && img) this.yAxis += height;
			},

			/**
			 * Will invoke 'imageLoaded' event on EventBus
			 * when image is loaded to change position
			 * of blocks from above
			 * @return {undefined}
			 */
			imageLoadedHandler() {
				if (!this.isCustom) {
					const diff =
						this.$el.offsetHeight - this.heightWithoutImage;
					this[config.name].$emit('imageLoaded', {
						height: diff,
						id: this.messageObj.id,
						img: true
					});
				}
			},
			/**
			 * Invoke callback if it is undefined
			 * and if it is Function
			 * @param  {String} name - cb name 'mounted' or 'destroyed'
			 * @return {undefined}
			 */
			invokeCallback(name) {
				if (
					this.messageObj[name] &&
					typeof this.messageObj[name] === 'function'
				) {
					this.messageObj[name]();
				}
			}
		},

		// Set up data
		created() {
			// If user set up duration time,
			// set timeout, else if duration time == 0
			// message will be shown until user close it
			if (this.messageObj.time) {
				this.timeoutId = setTimeout(
					this.clearData.bind(this, false),
					this.messageObj.time
				);
			}
			this[config.name].$on('changePosition', this.changePositionHandler);
		},

		// Invoke mounted callback function if exist
		mounted() {
			this.heightWithoutImage = this.$el.offsetHeight;
			this.yAxis = this[config.name].currentHeight + 20;

			// If this is not an object with custom position
			if (!this.isCustom) {
				this[config.name].$_vueFlashMessage_setDimensions({
					height: this.$el.offsetHeight + 20
				});
			}

			// If mounted callback was passed in props
			this.invokeCallback('mounted');
		},

		beforeDestroy() {
			this.$off('changePosition', this.changePositionHandler);
			// If this is not message with custom position
			if (!this.isCustom) {
				this[config.name].$emit('destroy', {
					height: -(this.$el.offsetHeight + 20),
					id: this.messageObj.id
				});
			}
		},

		// Invoke destroyed callback function if exist
		destroyed() {
			this.invokeCallback('destroyed');
		}
	};
}
