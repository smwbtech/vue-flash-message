export function createContainerMixin(config, version = 2) {
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
				return this[config.name].strategy.value;
			},
			messages() {
				return this[config.name].messages.value;
			},
			// Firstly it was position class for container,
			// but now it will be usef for message.
			// TODO: user should have method to change it for
			// every next message in a chaing call
			positionClass() {
				let [x, y] = this.position.split(' ');
				return `_vue-flash-msg-container_${x}-${y}`;
			}
		}
	};
}
