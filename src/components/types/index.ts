// declare module '@smartweb/vue-flash-message' {
	import { FlashMessagePlugin } from '@/components/FlashMessagePlugin';
	import { VNode, Ref, ComponentPublicInstance, Component } from 'vue';
	
	export type FlashMessageContainerPosition =
		| 'right bottom'
		| 'right top'
		| 'left bottom'
		| 'left top';
	
	export type FlashMessageStrategy = 'multiple' | 'single';
	
	export interface FlashMessageRegisterObject {
		time: number;
		strategy: FlashMessageStrategy;
		position: FlashMessageContainerPosition;
	}
	
	export interface FlashMessageObject {
		title?: string;
		text?: string;
		type?: string;
		group?: keyof FlashMessagePlugin['groups'];
		space?: number;
		image?: string;
		time?: number;
		clickable?: boolean;
		x?: string;
		y?: string;
		component?: Component;
		props?: object;
		html?: string;
		position?: FlashMessageContainerPosition;
		blockClass?: string;
		imageClass?: string;
		contentClass?: string;
		beforeCreate?: (
			flashMessageInstance: ComponentPublicInstance,
			messageObj: FlashMessageSerializedObject
		) => any;
		created?: (
			flashMessageInstance: ComponentPublicInstance,
			messageObj: FlashMessageSerializedObject
		) => any;
		beforeMount?: (
			flashMessageInstance: ComponentPublicInstance,
			messageObj: FlashMessageSerializedObject
		) => any;
		mounted?: (
			flashMessageInstance: ComponentPublicInstance,
			messageObj: FlashMessageSerializedObject
		) => any;
		beforeUpdate?: (
			flashMessageInstance: ComponentPublicInstance,
			messageObj: FlashMessageSerializedObject
		) => any;
		updated?: (
			flashMessageInstance: ComponentPublicInstance,
			messageObj: FlashMessageSerializedObject
		) => any;
		beforeUnmount?: (
			flashMessageInstance: ComponentPublicInstance,
			messageObj: FlashMessageSerializedObject
		) => any;
		unmounted?: (
			flashMessageInstance: ComponentPublicInstance,
			messageObj: FlashMessageSerializedObject
		) => any;
	}
	
	export interface FlashMessageSerializedObject extends FlashMessageObject {
		[x: string]: any;
		id: number;
		group: keyof FlashMessageGroup;
		yAxis: number;
	}
	
	export interface FlashMessageGroupItem {
		timeoutId: number | undefined;
		messages: Ref<FlashMessageSerializedObject[]>;
		strategy: Ref<FlashMessageStrategy>;
		currentHeight: Ref<number>;
		defaultTime: number;
	}
	
	export interface FlashMessageGroup {
		[propName: string]: FlashMessageGroupItem;
	}
	
	export interface FlashMessageDimensionsObject {
		height: number;
		id: number;
		isImgLoaded: boolean;
	}
	
// }
