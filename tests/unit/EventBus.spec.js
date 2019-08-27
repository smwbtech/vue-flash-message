import { createLocalVue, shallowMount } from '@vue/test-utils';
import { createEventBus } from '@/components/eventbus.js';
import ContainerElem from '@/components/Container.vue';
import Vue from 'vue';
import MyPlugin from '@/components/index.js';

// default config
let config = {
	name: 'flashMessage',
	tag: 'FlashMessage',
	time: 8000,
	icon: true,
	strategy: 'single'
};

// Create an EventBus
const EventBus = Vue.extend(createEventBus(config));
// Global access to flashMessage property
Vue.prototype[config.name] = EventBus;

let localVue = createLocalVue();
localVue.use(MyPlugin, config);

describe('Testing EventBus', () => {
	let cmp;

	beforeEach(() => {
		cmp = shallowMount(ContainerElem, {
			localVue,
			stubs: {
				'vue-message-block':
					'<div class="message-stub"><slot></slot></div>',
				transition: '<div class="transition-stub"><slot></slot></div>'
			}
		});
	});

	describe('Testing data object of mounted EventBus', () => {
		it('EventBus has property "messages" and it empty Array', () => {
			expect(cmp.vm.flashMessage).toHaveProperty('messages');
			expect(Array.isArray(cmp.vm.flashMessage.messages)).toBe(true);
			expect(cmp.vm.flashMessage.messages.length).toBe(0);
		});

		it('EventBus has property "nextMessageId" and it equal to "1"', () => {
			expect(cmp.vm.flashMessage).toHaveProperty('nextMessageId', 1);
		});

		it('EventBus has property "active" and it equal to "false"', () => {
			expect(cmp.vm.flashMessage).toHaveProperty('active', false);
		});
	});

	// describe('Testing emitted events', () => {
	// it('"deleteMessage" event test', () => {
	// 	cmp.vm.flashMessage.$emit('deleteMessage', 1123);
	// 	expect(cmp.vm.flashMessage.deleteMessage).toBeCalled();
	// });

	// TODO: Crashes with message 'Cannot read property '$options' of undefined'
	// it('Emitted "deleteMessage" event should invoke "deleteMessage" callback', async () => {
	//     let stub = jest.fn();
	//     cmp.setMethods( {deleteMessage: stub} );
	//     cmp.vm.flashMessage.$emit('deleteMessage', 1123);
	//     await cmp.vm.flashMessage.$nextTick();
	//     expect(stub).toBeCalled();
	// });
	// });

	describe('Testing methods', () => {
		it('Method "show()" should add new message object into "messages" array', () => {
			cmp.vm.flashMessage.show({
				status: 'error',
				title: 'Error Title',
				message: 'Message'
			});
			expect(cmp.vm.flashMessage.messages.length).toBe(1);
			expect(cmp.vm.flashMessage.messages[0]).toEqual({
				id: 1,
				status: 'error',
				title: 'Error Title',
				message: 'Message',
				clickable: true,
				time: 8000,
				icon: ''
			});
		});

		it('Method "show()" should return id of the inserted message', () => {
			let id = cmp.vm.flashMessage.show({});
			expect(id).toBeDefined();
			expect(typeof id).toBe('number');
		});

		it('Methods "deleteMessage()" should delete message from "messages" array', () => {
			let id = cmp.vm.flashMessage.show({});
			let n = cmp.vm.flashMessage.messages.length;
			cmp.vm.flashMessage.deleteMessage(id);
			expect(cmp.vm.flashMessage.messages.length).toBe(n - 1);
		});

		it('Method "setStrategy()" should set up strategy if it is equal to "single" or "multiple" and return Boolean as result', () => {
			expect(cmp.vm.flashMessage.setStrategy('multiple')).toBe(true);
			expect(cmp.vm.flashMessage.strategy).toBe('multiple');
		});

		it('Method "setStrategy()" should ignore all other values and return false if they are not equal to "single" or "multiple"', () => {
			expect(cmp.vm.flashMessage.setStrategy('dddddddd')).toBe(false);
			expect(cmp.vm.flashMessage.strategy).toBe('multiple');
		});
	});
});
