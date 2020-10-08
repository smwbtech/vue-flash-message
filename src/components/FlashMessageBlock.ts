import {
	FlashMessageContainerPosition,
	FlashMessageSerializedObject
} from '@/types/vue-flash-message';
import FlashMessagePlugin from '@/components/FlashMessagePlugin';
import { defineComponent, h, PropType, toRefs, computed } from 'vue';
import '@/assets/css/message.css';

enum HooksName {
	beforeCreate,
	created,
	beforeMount,
	mounted,
	beforeUpdate,
	updated,
	beforeUnmoutn,
	unmounted
}

interface FlashMessagePositionStyle {
	[propName: string]: string | undefined;
}

const FlashMessageBlock = defineComponent({
	props: {
		messageObj: {
			type: Object as PropType<FlashMessageSerializedObject>,
			required: true
		},
		positionString: {
			type: String as PropType<FlashMessageContainerPosition>,
			default: 'right bottom'
		}
	},

	setup(props) {
		const { messageObj, positionString } = toRefs(props);

		// console.log(isProxy(messageObj));
		// console.log(isReactive(messageObj.value.yAxis));

		const isCustomPosition = computed(() => {
			return !!messageObj.value.x && !!messageObj.value.y;
		});

		const positionClass = computed(() => {
			const [x, y] = positionString.value.split(' ');
			return `_vue-flash-msg-_${x}-${y}`;
		});

		// console.log(messageObj.value.yAxis);

		const positionStyle = computed(() => {
			const style = [] as FlashMessagePositionStyle[];
			const [x, y] = positionString.value.split(' ');
			if (isCustomPosition.value) {
				style.push(
					...[
						{ [x]: messageObj.value.x },
						{ [y]: messageObj.value.y }
					]
				);
			} else {
				style.push({
					[y]: `${messageObj.value.yAxis}px`
				});
			}
			return style;
		});

		// console.log(positionStyle.value);

		const flashMessageBlockClasses = computed(() => {
			return [
				'_vue-flash-msg-body',
				`_vue-flash-msg-body_${messageObj.value.type}`,
				messageObj.value.clickable
					? ''
					: '_vue-flash-msg-body_unclickabe',
				positionClass.value,
				messageObj.value.blockClass ?? ''
			];
		});

		function imageLoadedHandler(e: Event) {
			if (!isCustomPosition.value) {
				console.log(e);
				// const diff = this.$el.offsetHeight - this.heightWithoutImage;
				// this.$flashMessage.setDimensions(this.messageObj.group, {
				// 	height: diff,
				// 	id: this.messageObj.id,
				// 	isImgLoaded: true
				// });
			}
		}

		// Render custom component inside flash message block
		if (messageObj.value.component) {
			const render = () => {
				return h(
					'div',
					{
						class: flashMessageBlockClasses.value,
						style: positionStyle.value
					},
					[
						h(
							// TODO: trick to pass TS validation. Need to fix
							messageObj.value.component ?? {},
							messageObj.value.props ?? {}
						)
					]
				);
			};
			return render;
		}

		// Render HTML inside flash message block
		if (messageObj.value.html) {
			const render = () =>
				h('div', {
					class: flashMessageBlockClasses.value,
					style: positionStyle.value,
					innerHTML: messageObj.value.html
				});
			return render;
		}

		// Reder base flash message element
		else {
			const render = () =>
				h(
					'div',
					{
						class: flashMessageBlockClasses.value,
						style: positionStyle.value,
						onclick: () => {
							if (messageObj.value.clickable)
								FlashMessagePlugin.delete(
									messageObj.value.group,
									messageObj.value.id
								);
						}
					},
					[
						h(
							'div',
							{
								class: [
									'_vue-flash-msg-body__image',
									messageObj.value.imageClass
								]
							},
							[
								h('img', {
									load: 'lazy',
									src: messageObj.value.image,
									onLoad: imageLoadedHandler
								})
							]
						),
						h(
							'div',
							{
								class: [
									'_vue-flash-msg-body__content',
									messageObj.value.contentClass
								]
							},
							[
								h('p', {
									class: ['_vue-flash-msg-body__title'],
									innerText: messageObj.value.title
								}),
								h('p', {
									class: ['_vue-flash-msg-body__text'],
									innerText: messageObj.value.message
								})
							]
						)
					]
				);
			return render;
		}
	},

	data() {
		return {
			timeoutId: undefined as number | undefined
		};
	},

	computed: {
		isCustomPosition(): boolean {
			return !!this.messageObj.x && !!this.messageObj.y;
		}
	},

	methods: {
		deleteMessage(clear = true) {
			if (this.timeoutId && clear) clearTimeout(this.timeoutId);
			this.$flashMessage.delete(
				this.messageObj.group,
				this.messageObj.id
			);
		},

		clickHandler() {
			if (this.messageObj.clickable) this.deleteMessage();
		},

		invokeCallback(name: keyof typeof HooksName) {
			if (
				this.messageObj[name] &&
				typeof this.messageObj[name] === 'function'
			) {
				this.messageObj[name]?.call(this, this);
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
				this.deleteMessage.bind(this, false),
				this.messageObj.time
			);
		}
	},

	mounted() {
		if (!this.isCustomPosition) {
			this.$flashMessage.setDimensions(this.messageObj.group, {
				id: this.messageObj.id,
				// TODO: 20 is hardcoded distance, user should have API to change it
				height: this.$el.offsetHeight + 20,
				isImgLoaded: false
			});
		}
	},

	unmounted() {
		if (!this.isCustomPosition) {
			setTimeout(() => {
				this.$flashMessage.setDimensions(this.messageObj.group, {
					id: this.messageObj.id,
					// TODO: 20 is hardcoded distance, user should have API to change it
					height: -(this.$el.offsetHeight + 20),
					isImgLoaded: false
				});
			}, 500);
		}
	}
});

export default FlashMessageBlock;
