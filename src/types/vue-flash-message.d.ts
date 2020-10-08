import { FlashMessagePlugin } from '@/components/FlashMessagePlugin';
import { VNode, Ref, ComponentPublicInstance } from 'vue';

declare module '@smartweb/vue-flash-message';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$flashMessage: FlashMessagePlugin;
	}
}

declare type FlashMessageContainerPosition =
	| 'right bottom'
	| 'right top'
	| 'left bottom'
	| 'left top';

declare type FlashMessageStrategy = 'multiple' | 'single';

declare interface FlashMessageRegisterObject {
	time: number;
	strategy: FlashMessageStrategy;
	position: FlashMessageContainerPosition;
}

declare interface FlashMessageObject {
	title?: string;
	message?: string;
	type?: string;
	image?: string;
	time?: number;
	clickable?: boolean;
	x?: string;
	y?: string;
	component?: VNode;
	props?: object;
	html?: string;
	position?: FlashMessageContainerPosition;
	blockClass?: string;
	imageClass?: string;
	contentClass?: string;
	beforeCreate?: (flashMessageInstance: ComponentPublicInstance) => any;
	created?: (flashMessageInstance: ComponentPublicInstance) => any;
	beforeMount?: (flashMessageInstance: ComponentPublicInstance) => any;
	mounted?: (flashMessageInstance: ComponentPublicInstance) => any;
	beforeUpdate?: (flashMessageInstance: ComponentPublicInstance) => any;
	updated?: (flashMessageInstance: ComponentPublicInstance) => any;
	beforeUnmoutn?: (flashMessageInstance: ComponentPublicInstance) => any;
	unmounted?: (flashMessageInstance: ComponentPublicInstance) => any;
}

declare interface FlashMessageSerializedObject extends FlashMessageObject {
	[x: string]: any;
	id: number;
	group: keyof FlashMessageGroup;
	yAxis: number;
}

declare interface FlashMessageGroupItem {
	timeoutId: number | undefined;
	messages: Ref<FlashMessageSerializedObject[]>;
	strategy: Ref<FlashMessageStrategy>;
	currentHeight: Ref<number>;
	defaultTime: number;
}

declare interface FlashMessageGroup {
	[propName: string]: FlashMessageGroupItem;
}

declare interface FlashMessageDimensionsObject {
	height: number;
	id: number;
	isImgLoaded: boolean;
}
