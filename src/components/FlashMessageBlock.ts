import {
	FlashMessageContainerPosition,
	FlashMessageSerializedObject
} from '@/types/vue-flash-message';
import FlashMessagePlugin from '@/components/FlashMessagePlugin';
import { defineComponent, h, PropType, toRefs, computed, toRaw } from 'vue';
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

// TODO: replace this with ResizeObserver for root div element
let heighWithoutImage = 0;
let $el = null as null | HTMLDListElement;

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

		const isCustomPosition = computed(() => {
			return !!messageObj.value.x && !!messageObj.value.y;
		});

		const positionClass = computed(() => {
			const [x, y] = positionString.value.split(' ');
			return `_vue-flash-msg_${x}-${y}`;
		});

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

		// TODO: replace this with ResizeObserver for root div element
		function imageLoadedHandler(e: Event) {
			if (!isCustomPosition.value) {
				const img = e.target as HTMLImageElement;
				FlashMessagePlugin.setDimensions(messageObj.value.group, {
					height: $el
						? $el.offsetHeight - heighWithoutImage
						: img.offsetHeight,
					id: messageObj.value.id,
					isImgLoaded: true
				});
			}
		}

		// Render custom component inside flash message block
		if (props.messageObj.component) {
			const CustomComponent = toRaw(props.messageObj.component);
			const propsData = Object.assign(
				messageObj.value.props ?? {},
				{messageObj: messageObj.value}
			)
			const render = () => {
				return h(
					'div',
					{
						class: flashMessageBlockClasses.value,
						style: positionStyle.value,
						onclick: () => {
							if (messageObj.value.clickable)
								FlashMessagePlugin.remove(
									messageObj.value.id,
									messageObj.value.group
								);
						}
					},
					[
						// @ts-ignore
						h(CustomComponent, toRaw(propsData))
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
					innerHTML: messageObj.value.html,
					onclick: () => {
						if (messageObj.value.clickable)
							FlashMessagePlugin.remove(
								messageObj.value.id,
								messageObj.value.group
							);
					}
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
								FlashMessagePlugin.remove(
									messageObj.value.id,
									messageObj.value.group
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
								],
								style: [
									{display: messageObj.value.image ?? 'none'}
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
									innerText: messageObj.value.text
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
			this.$flashMessage.remove(
				this.messageObj.id,
				this.messageObj.group
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

	beforeMount() {
		const cb = this.messageObj.beforeMount;
		if (cb && typeof cb === 'function') {
			cb(this, this.messageObj);
		}
	},

	mounted() {
		// TODO: replace with ResizeObserver
		$el = this.$el;
		heighWithoutImage = this.$el.offsetHeight;
		const cb = this.messageObj.mounted;
		if (!this.isCustomPosition) {
			this.$flashMessage.setDimensions(this.messageObj.group, {
				id: this.messageObj.id,
				height: this.$el.offsetHeight + this.messageObj.space,
				isImgLoaded: false
			});
		}
		if (cb && typeof cb === 'function') {
			cb(this, this.messageObj);
		}
	},

	beforeUnmount() {
		const cb = this.messageObj.beforeUnmount;
		if (cb && typeof cb === 'function') {
			cb(this, this.messageObj);
		}
	},

	unmounted() {
		const cb = this.messageObj.beforeUnmount;
		if (!this.isCustomPosition) {
			setTimeout(() => {
				this.$flashMessage.setDimensions(this.messageObj.group, {
					id: this.messageObj.id,
					height: -(this.$el.offsetHeight + this.messageObj.space),
					isImgLoaded: false
				});
				if (cb && typeof cb === 'function') {
					cb(this, this.messageObj);
				}
			}, 500);
		}
	}
});

export default FlashMessageBlock;
