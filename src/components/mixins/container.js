export function createContainerMixin(config) {
	return {
		props: {
			position: {
				type: String,
				default: 'right bottom',
				validator: v => {
					return v
						.split(' ')
						.every(
							val =>
								['top', 'left', 'right', 'bottom'].indexOf(
									val
								) >= 0
						);
				}
			}
		},

		computed: {
			// Get strategy
			strategy() {
				return this[config.name].strategy;
			},
			// Get status in single message mode
			showMessage() {
				return this[config.name].active;
			},
			message() {
				return this[config.name].messages[0];
			},
			messages() {
				return this[config.name].messages;
			},
			positionClass() {
				let [x, y] = this.position.split(' ');
				return `_vue-flash-msg-container_${x}-${y}`;
			}
		}
	};
}
