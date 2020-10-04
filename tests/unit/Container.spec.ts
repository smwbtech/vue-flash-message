import { shallowMount, createLocalVue } from '@vue/test-utils';
import { createContainerMixin } from '@/components/mixins/container.js';
import { createEventBus } from '@/components/eventbus.js';
import ContainerElem from '@/components/Container.vue';
import Vue from 'vue';

// default config
let config = {
	name: 'flashMessage',
	tag: 'FlashMessage',
	time: 8000,
	icon: true,
	strategy: 'single'
};

const flashMessageStub = '<div class="flash-message-stub"></div>';

const Container = Object.assign(ContainerElem, createContainerMixin(config));
// Create an EventBus
const EventBus = new Vue(createEventBus(config));
// Global access to flashMessage property
Vue.prototype[config.name] = EventBus;

//Set up component

let localVue = createLocalVue();
localVue.use(EventBus);

describe('Test FlashMessage Compoent', () => {
	let cmp;

	beforeEach(() => {
		cmp = shallowMount(Container, {
			localVue,
			stubs: {
				'vue-message-block': flashMessageStub,
				transition: '<div class="transition-stub"><slot></slot></div>'
			}
		});
	});

	it('Component should exist', () => {
		expect(cmp.exists()).toBe(true);
	});

	it('Component has computed property "strategy" and it is equal to "single"', () => {
		expect(cmp.vm).toHaveProperty('strategy', 'single');
	});

	it('Component has computed property "messages" and it is equal to "[]"', () => {
		expect(cmp.vm).toHaveProperty('messages');
		expect(cmp.vm.messages).toEqual([]);
	});

	it('Component has computed property "positionClass" and it is equal to "right bottom" by default', () => {
		expect(cmp.vm).toHaveProperty('positionClass');
		expect(cmp.vm.positionClass).toEqual(
			'_vue-flash-msg-container_right-bottom'
		);
	});
});
