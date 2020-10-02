import { createEventBus } from './eventbus.js';
import { createContainerMixin } from './mixins/container.js';
import { createMessageMixin } from './mixins/message.js';
import ContainerElem from './Container.vue';
import FlashMessageElem from './FlashMessage.vue';

const defaultSettings = {
	name: 'flashMessage',
	tag: 'FlashMessage',
	time: 8000,
	strategy: 'miltiple'
};

export default function install(Vue, config = {}, ref) {
	if (install.installed) return;

	const version = Number(Vue.version.split('.')[0]);
	install.installed = true;

	config = Object.assign(defaultSettings, config);

	// Set up Event Bus
	if (version < 3) {
		const EventBus = new Vue(createEventBus(config));
		// Global access to flashMessage property
		Vue.prototype[config.name] = EventBus;
	}
	//TODO: this is for versions compability
	else {
		const EventBus = createEventBus(config, version, ref);
		Vue.config.globalProperties[config.name] = EventBus;
	}
	// Extend Container component
	const Container = Object.assign(
		ContainerElem,
		createContainerMixin(config, version)
	);

	// Extend Flash Message component
	const FlashMessage = Object.assign(
		FlashMessageElem,
		createMessageMixin(config, version)
	);
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
