import './../assets/css/container.css';
import './../assets/css/message.css';
import {
	FlashMessageContainerPosition,
	FlashMessageStrategy
} from './types/index';
import {
	defineComponent,
	h,
	toRefs,
	computed,
	PropType,
	TransitionGroup
} from 'vue';
import FlashMessagePlugin from './FlashMessagePlugin';
import FlashMessageBlock from './FlashMessageBlock';


const ContainerComponent = defineComponent({
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		transitionName: {
			type: String,
			default: undefined
		},

		position: {
			type: String as PropType<FlashMessageContainerPosition>,
			default: 'right bottom',
			validator: (v: FlashMessageContainerPosition): boolean => {
				return v
					.split(' ')
					.every(
						val =>
							['top', 'left', 'right', 'bottom'].indexOf(val) >= 0
					);
			}
		},
		time: {
			type: Number,
			default: 8000
		},
		strategy: {
			type: String as PropType<FlashMessageStrategy>,
			default: 'multiple'
		},
		group: {
			type: String,
			default: 'default'
		}
	},

	setup(props) {
		const { position, group, time, strategy, transitionName } = toRefs(
			props
		);

		FlashMessagePlugin.registerGroup(group.value, {
			time: time.value,
			strategy: strategy.value,
			position: position.value
		});

		const groupItem = FlashMessagePlugin.groups[group.value];

		const messagesList = computed(() => {
			return groupItem.messages.value;
		});

		const positionClass = computed(() => {
			const [x, y] = position.value.split(' ');
			return `_vue-flash-msg-container_${x}-${y}`;
		});

		return () => {
			return h(
				TransitionGroup,
				{
					tag: 'div',
					name: transitionName.value ?? positionClass.value
				},
				() =>
					messagesList.value.map(messageObject =>
						h(FlashMessageBlock, {
							positionString: position.value,
							messageObj: messageObject,
							key: `${messageObject.id}-vfm`
						})
					)
			);
		};
	}
});

export default ContainerComponent;
