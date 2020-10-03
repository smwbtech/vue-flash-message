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

export default function install(Vue, config = {}, ref) {
	if (install.installed) return;

	install.installed = true;

	config = Object.assign(defaultSettings, config);

	// Set up Event Bus
	const EventBus = createEventbusFallback(config, ref);
	Vue.config.globalProperties[`$${config.name}`] = EventBus;
	// Extend Container component
	let Container = Object.assign(ContainerElem, createContainerMixin(config));

	// Extend Flash Message component
	let FlashMessage = Object.assign(
		FlashMessageElem,
		createMessageMixin(config)
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
