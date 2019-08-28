import { createLocalVue, shallowMount } from '@vue/test-utils';
import ContainerElem from '@/components/Container.vue';
import MyPlugin from '@/components/index.js';

// default config
let config = {
	name: 'flashMessage',
	tag: 'FlashMessage',
	time: 8000,
	icon: true,
	strategy: 'single'
};

jest.useFakeTimers();

// Global access to flashMessage property
const emitSpy = jest.fn();

describe('Testing EventBus', () => {
	let cmp;

	beforeEach(() => {
		let localVue = createLocalVue();
		localVue.use(MyPlugin, config);
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

		it('Method "show()" should $emit "clearData" event in "single" strategy', () => {
			cmp.vm.flashMessage.$emit = emitSpy;
			cmp.vm.flashMessage.messages.push({});
			cmp.vm.flashMessage.show();
			expect(emitSpy).toHaveBeenCalledWith('clearData');
			emitSpy.mockClear();
		});

		it('Method "show()" should not $emit "clearData" event in "multiple" strategy', () => {
			cmp.vm.flashMessage.$emit = emitSpy;
			cmp.vm.flashMessage.strategy = 'multiple';
			cmp.vm.flashMessage.messages.push({});
			cmp.vm.flashMessage.show();
			expect(emitSpy).not.toHaveBeenCalledWith('clearData');
			emitSpy.mockClear();
		});

		it('Method "show()" should set data.active = true and push message to array in "multiple" strategy', () => {
			cmp.vm.flashMessage.strategy = 'multiple';
			cmp.vm.flashMessage.show();
			expect(emitSpy).not.toHaveBeenCalledWith('clearData');
			expect(cmp.vm.flashMessage.active).toBe(true);
			cmp.vm.flashMessage.setStrategy('single');
			emitSpy.mockClear();
		});

		it('Method "error()" should call "show()" method and return message id', () => {
			expect(cmp.vm.flashMessage.error({})).toBe(1);
		});

		it('Method "warning()" should call "show()" method and return message id', () => {
			expect(cmp.vm.flashMessage.warning({})).toBe(1);
		});

		it('Method "info()" should call "show()" method and return message id', () => {
			expect(cmp.vm.flashMessage.info({})).toBe(1);
		});

		it('Method "success()" should call "show()" method and return message id', () => {
			expect(cmp.vm.flashMessage.success({})).toBe(1);
		});

		it('Methods "deleteMessage()" should delete message from "messages" array', () => {
			let id = cmp.vm.flashMessage.show({});
			let n = cmp.vm.flashMessage.messages.length;
			cmp.vm.flashMessage.deleteMessage(id);
			expect(cmp.vm.flashMessage.messages.length).toBe(n - 1);
		});

		it('Methods "deleteMessage()" should invoke setTimeout in "single" strategy', () => {
			cmp.vm.flashMessage.messages.push({});
			cmp.vm.flashMessage.deleteMessage(1);
			expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
		});

		it('Method "setStrategy()" should set up strategy if it is equal to "single" or "multiple" and return Boolean as result', () => {
			expect(cmp.vm.flashMessage.setStrategy('multiple')).toBe(true);
			expect(cmp.vm.flashMessage.strategy).toBe('multiple');
		});

		it('Method "setStrategy()" should ignore all other values and return false if they are not equal to "single" or "multiple"', () => {
			expect(cmp.vm.flashMessage.setStrategy('dddddddd')).toBe(false);
			expect(cmp.vm.flashMessage.strategy).toBe('single');
		});
	});
});
