import { createEventBus } from './eventbus.js';
import { createContainerMixin } from './mixins/container.js';
import { createMessageMixin } from './mixins/message.js';
import { createEventbusFallback } from './fallback/eventbus-fallback.js';
import ContainerElem from './Container.vue';
import FlashMessageElem from './FlashMessage.vue';

const defaultSettings = {
	name: 'flashMessage',
	tag: 'FlashMessage',
	time: 8000,
	strategy: 'single'
};

export default function install(Vue, config = {}, ref, defineComponent) {
	if (install.installed) return;

	const version = Number(Vue.version.split('.')[0]);
	install.installed = true;

	config = Object.assign(defaultSettings, config);

	// Set up Event Bus
	if (version < 3) {
		const EventBus = new Vue(createEventBus(config));
		// Global access to flashMessage property
		Vue.prototype[config.name] = EventBus;
		Vue.prototype[`$${config.name}`] = EventBus;
	}
	//TODO: this is for versions compability
	else {
		const EventBus = createEventbusFallback(config, ref);
		Vue.config.globalProperties[config.name] = EventBus;
		Vue.config.globalProperties[`$${config.name}`] = EventBus;
	}
	// Extend Container component
	let Container = Object.assign(
		ContainerElem,
		createContainerMixin(config, version)
	);

	// Extend Flash Message component
	let FlashMessage = Object.assign(
		FlashMessageElem,
		createMessageMixin(config, version)
	);
	// TODO: try to figure out error in final build
	if (version > 2) {
		Container = defineComponent(Container);
		FlashMessage = defineComponent(FlashMessage);
	}
	//  Set up component
	Vue.component(config.tag, Container);
	Vue.component('VueMessageBlock', FlashMessage);
}

const plugin = {
	install
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}
