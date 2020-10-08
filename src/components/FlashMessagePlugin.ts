import {
	FlashMessageGroup,
	FlashMessageObject,
	FlashMessageSerializedObject,
	FlashMessageStrategy,
	FlashMessageDimensionsObject,
	FlashMessageGroupItem,
	FlashMessageRegisterObject
} from '@/types/vue-flash-message';
import { reactive, Ref, ref } from 'vue';
import FlashMessageError from './FlashMessageError';

export class FlashMessagePlugin {
	groups: FlashMessageGroup;
	nextMessageId: number;

	constructor() {
		// TODO: default group must me registered in Container mounted hook
		this.groups = {};
		this.nextMessageId = 1;
	}

	registerGroup(groupName: string, group: FlashMessageRegisterObject) {
		// Check group uniq key
		const isGroupRegistered = groupName in this.groups;
		const { time, strategy } = group;
		if (isGroupRegistered) {
			throw new FlashMessageError(
				`FlashMessage group must be an unique key. Group with key "${groupName}" already exists`
			);
		} else {
			this.groups[groupName] = {
				timeoutId: undefined,
				messages: ref([]),
				strategy: ref<FlashMessageStrategy>(strategy),
				currentHeight: ref(20), //TODO: 20 - is hardcoded space between messages
				defaultTime: time
			};
		}
	}

	private changeHeight(
		group: FlashMessageGroupItem,
		id: number,
		height: number
	) {
		const messageIndex = group.messages.value.findIndex(v => v.id > id);
		if (messageIndex >= 0) {
			// group.messages.value
			// 	.slice(messageIndex)
			// 	?.forEach(v => console.log(v.yAxis));
			group.messages.value
				.slice(messageIndex)
				?.forEach(v => (v.yAxis += height));
		}
	}

	setDimensions(
		group: keyof FlashMessagePlugin['groups'],
		options: FlashMessageDimensionsObject
	) {
		console.log(options);
		const currentGroup = this.groups[group];
		const { id, height, isImgLoaded } = options;
		const strategy = currentGroup.strategy;
		const newHeight = currentGroup.currentHeight.value + height;
		this.changeHeight(currentGroup, id, height);
		if (
			strategy.value === 'multiple' &&
			currentGroup.messages.value.length > 0
		) {
			if (newHeight < 0) {
				setTimeout(
					() =>
						(currentGroup.currentHeight.value = Math.abs(
							newHeight
						)),
					500
				);
			} else {
				currentGroup.currentHeight.value = newHeight;
			}
		} else {
			currentGroup.currentHeight.value = 20;
		}
	}

	show(
		messageObject: FlashMessageObject,
		group?: keyof FlashMessagePlugin['groups']
	) {
		const groupName = group ?? 'default';
		const currentGroup = this.groups[groupName];
		const heigh = currentGroup.currentHeight.value;
		const strategy = currentGroup.strategy.value;
		const messagesLength = currentGroup.messages.value.length;
		const timeoutId = currentGroup.timeoutId;
		const defaultTime = currentGroup.defaultTime;
		const id = this.nextMessageId++;
		const clickable =
			messageObject.clickable === undefined
				? true
				: messageObject.clickable;
		const serializedMessage: FlashMessageSerializedObject = Object.assign(
			messageObject,
			{
				id,
				clickable,
				time: messageObject.time ?? defaultTime,
				group: groupName,
				type: messageObject.type ?? 'default',
				yAxis: heigh
			}
		);

		if (strategy === 'single' && messagesLength > 0) {
			console.log('clear messages');
			clearTimeout(timeoutId);
			currentGroup.messages.value = [];
			currentGroup.timeoutId = setTimeout(() => {
				messagesLength > 0 ? (currentGroup.messages.value = []) : false;
				currentGroup.messages.value.push(serializedMessage);
			}, 600);
		} else {
			currentGroup.messages.value = [
				...currentGroup.messages.value,
				serializedMessage
			];
		}

		return serializedMessage;
	}

	changeStrategy(
		group: keyof FlashMessagePlugin['groups'],
		strategy: FlashMessageStrategy
	) {
		this.groups[group].strategy.value = strategy;
	}

	delete(group: keyof FlashMessagePlugin['groups'], id: number) {
		this.groups[group].messages.value = this.groups[
			group
		].messages.value.filter(v => v.id !== id);
	}
}

const plugin = new FlashMessagePlugin();

export default plugin;
