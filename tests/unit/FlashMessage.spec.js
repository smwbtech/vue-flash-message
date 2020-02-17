import { shallowMount } from '@vue/test-utils';
import { createMessageMixin } from '@/components/mixins/message.js';
import FlashMessageElem from '@/components/FlashMessage.vue';

jest.useFakeTimers();

// default config
let config = {
	name: 'flashMessage',
	tag: 'FlashMessage',
	time: 8000,
	icon: true,
	strategy: 'single'
};

const componentStub = '<div class="custom-component-stub"></div>';

const FlashMessage = Object.assign(
	FlashMessageElem,
	createMessageMixin(config)
);

describe('Test FlashMessage Compoent', () => {
	let cmp;

	describe('FlashMesage with "single" strategy', () => {
		beforeEach(() => {
			cmp = shallowMount(FlashMessage, {
				mocks: {
					flashMessage: {
						$emit: jest.fn(),
						$once: jest.fn(),
						$on: jest.fn(),
						$_vueFlashMessage_setDimensions: jest.fn(),
						currentHeight: 0,
						$el: {
							offsetHeight: 200
						}
					}
				},
				propsData: {
					messageObj: {
						id: 1,
						status: 'error',
						title: 'error title',
						message: 'error message',
						clickable: true,
						icon: 'www.icon-link.ru',
						time: 8000,
						blockClass: null,
						iconClass: null,
						contentClass: null,
						mounted: null,
						destroyed: null
					}
				}
			});
		});

		it('Component should exist', () => {
			expect(cmp.exists()).toBe(true);
		});

		describe('Testing data object of mounted component', () => {
			it('FlashMesage has property "id" and it is equal to "1"', () => {
				expect(cmp.vm.messageObj.id).toBe(1);
			});

			it('FlashMesage has property "timeoutId" and it equal to "undefined"', () => {
				expect(typeof cmp.vm.timeoutId).toBe('number');
			});

			it('FlashMesage has property "time" and it is equal to "8000"', () => {
				expect(cmp.vm.messageObj.time).toBe(8000);
			});

			it('FlashMesage has property "status" and it is equal to "error"', () => {
				expect(cmp.vm.messageObj.status).toBe('error');
			});

			it('FlashMesage has property "title" and it is equal to "error title"', () => {
				expect(cmp.vm.messageObj.title).toBe('error title');
			});

			it('FlashMesage has property "message" and it is equal to "error message"', () => {
				expect(cmp.vm.messageObj.message).toBe('error message');
			});

			it('FlashMesage has property "icon" and it is equal to "www.icon-link.ru"', () => {
				expect(cmp.vm.messageObj.icon).toBe('www.icon-link.ru');
			});

			it('FlashMesage has property "clickable" and it is equal to "true"', () => {
				expect(cmp.vm.messageObj.clickable).toBe(true);
			});

			it('FlashMesage has property "blockClass" and it is equal to "null"', () => {
				expect(cmp.vm.messageObj.blockClass).toBe(null);
			});

			it('FlashMesage has property "iconClass" and it is equal to "null"', () => {
				expect(cmp.vm.messageObj.iconClass).toBe(null);
			});

			it('FlashMesage has property "contentClass" and it is equal to "null"', () => {
				expect(cmp.vm.messageObj.contentClass).toBe(null);
			});

			it('FlashMesage has property "mounted" and it is equal to "null"', () => {
				expect(cmp.vm.messageObj.mounted).toBe(null);
			});

			it('FlashMesage has property "destroyed" and it is equal to "null"', () => {
				expect(cmp.vm.messageObj.destroyed).toBe(null);
			});

			it('FlashMesage has computed property "isCustom" and it is equal to "false" by default', () => {
				expect(cmp.vm.isCustom).toBe(false);
			});

			it('FlashMesage has computed property "isCustom" and it is equal to "true" if user pass props.x and props.y', () => {
				cmp.setProps({ messageObj: { x: 10, y: 30 } });
				expect(cmp.vm.isCustom).toBe(true);
			});

			it('FlashMesage has computed property "positionStyleObj" and it should return style object with message positions', () => {
				cmp.setProps({ positionString: 'right top' });
				expect(typeof cmp.vm.positionStyleObj.top).toBe('string');
			});
		});

		describe('Test classes', () => {
			it('When user set "blockClass" element sould have specified class', done => {
				cmp.setProps({
					messageObj: {
						blockClass: 'custom-user-class'
					}
				});
				cmp.vm.$forceUpdate();
				cmp.vm.$nextTick(() => {
					let elem = cmp.find('._vue-flash-msg-body');
					expect(elem.is('div')).toBe(true);
					expect(elem.classes()).toContain('custom-user-class');
					done();
				});
			});

			it('When user set "iconClass" element sould have specified class', done => {
				cmp.setProps({
					messageObj: {
						icon: 'iconUrl',
						iconClass: 'custom-icon-class'
					}
				});
				cmp.vm.$forceUpdate();
				cmp.vm.$nextTick(() => {
					let elem = cmp.find('._vue-flash-msg-body__icon');
					expect(elem.is('div')).toBe(true);
					expect(elem.classes()).toContain('custom-icon-class');
					done();
				});
			});

			it('When user set "contentClass" element sould have specified class', done => {
				cmp.setProps({
					messageObj: {
						contentClass: 'custom-content-class'
					}
				});
				cmp.vm.$forceUpdate();
				cmp.vm.$nextTick(() => {
					let elem = cmp.find('._vue-flash-msg-body__content');
					expect(elem.is('div')).toBe(true);
					expect(elem.classes()).toContain('custom-content-class');
					done();
				});
			});
		});

		describe('Test components methods', () => {
			it('methods.clearData should invoke clearTimeout method if data.timeoutId to be truthly and argument "clear" === true', () => {
				expect(cmp.vm.clearData).toBeInstanceOf(Function);
				cmp.setData({ timeoutId: 1 });
				cmp.vm.clearData();
				expect(clearTimeout).toHaveBeenCalledWith(1);
				clearTimeout.mockClear();
			});

			it('methods.clearData should emit EventBus "deleteMessage" if data.timeoutId or argument "clear" are falsy', () => {
				cmp.setData({ timeoutId: undefined });
				cmp.vm.clearData();
				expect(cmp.vm.flashMessage.$emit).toHaveBeenCalledWith(
					'deleteMessage',
					1
				);
			});

			it('methods.clickHandler should invoke methods.clearData if props.messageObj.clickable is truthly', () => {
				cmp.setMethods({ clearData: jest.fn() });
				cmp.vm.clickHandler();
				expect(cmp.vm.clearData).toHaveBeenCalled();
			});

			it('methods.clickHandler should not invoke methods.clearData if props.messageObj.clickable is falsy', () => {
				cmp.setMethods({ clearData: jest.fn() });
				cmp.setProps({
					messageObj: {
						clickable: false
					}
				});
				cmp.vm.clickHandler();
				expect(cmp.vm.clearData).not.toHaveBeenCalled();
			});

			it('methods.changePositionHandler should decrease data.yAxis if "img" arg is falsy', () => {
				cmp.setData({ yAxis: 30 });
				cmp.vm.changePositionHandler({ height: 10, id: 0 });
				expect(cmp.vm.yAxis).toBe(20);
			});

			it('methods.changePositionHandler should increase data.yAxis if "img" arg is truthly', () => {
				cmp.setData({ yAxis: 30 });
				cmp.setProps({ messageObj: { id: 4 } });
				cmp.vm.changePositionHandler({ height: 10, id: 3, img: true });
				expect(cmp.vm.yAxis).toBe(40);
			});

			it('methods.changePositionHandler should not increase data.yAxis if "img" arg is falsy and id < then current ob id', () => {
				cmp.setData({ yAxis: 30 });
				cmp.setProps({ messageObj: { id: 2 } });
				cmp.vm.changePositionHandler({ height: 10, id: 3 });
				expect(cmp.vm.yAxis).toBe(30);
			});

			it('methods.changePositionHandler should not increase data.yAxis if "img" arg is truthly and id < then current ob id', () => {
				cmp.setData({ yAxis: 30 });
				cmp.setProps({ messageObj: { id: 2 } });
				cmp.vm.changePositionHandler({ height: 10, id: 3, img: true });
				expect(cmp.vm.yAxis).toBe(30);
			});

			it('methods.imageLoadedHandler should invoke imageLoaded event, if computed.isCustom !== true', () => {
				cmp.vm.imageLoadedHandler();
				expect(cmp.vm.flashMessage.$emit).toHaveBeenCalledWith(
					'imageLoaded',
					{
						height: 0,
						id: 1,
						img: true
					}
				);
				cmp.vm.flashMessage.$emit.mockClear();
			});

			it('methods.imageLoadedHandler should not invoke imageLoaded event, if computed.isCustom === true', () => {
				cmp.setProps({ messageObj: { x: 10, y: 20 } });
				expect(cmp.vm.flashMessage.$emit).not.toHaveBeenCalledWith();
				cmp.vm.flashMessage.$emit.mockClear();
			});
		});

		describe("Test component's lifecycle hooks", () => {
			let hooksCmp;
			let mountedSpy = jest.fn();
			let destroyedSpy = jest.fn();

			it('Should not invoke setTimeout in mounted hook if messageObj.time equal to 0', () => {
				// Clear setTimeout mock, before mounting component
				setTimeout.mockClear();
				hooksCmp = shallowMount(FlashMessage, {
					propsData: {
						messageObj: {
							id: 1,
							status: 'error',
							title: 'error title',
							message: 'error message',
							time: 0
						}
					},
					mocks: {
						flashMessage: {
							$emit: jest.fn(),
							$once: jest.fn(),
							$on: jest.fn(),
							$_vueFlashMessage_setDimensions: jest.fn(),
							currentHeight: 0
						},
						$el: {
							offsetHeight: 200
						}
					}
				});
				expect(setTimeout).not.toHaveBeenCalled();
			});

			describe('Message with default position', () => {
				beforeEach(() => {
					hooksCmp = shallowMount(FlashMessage, {
						propsData: {
							messageObj: {
								id: 1,
								status: 'error',
								title: 'error title',
								message: 'error message',
								clickable: true,
								icon: 'www.icon-link.ru',
								time: 8000,
								blockClass: null,
								iconClass: null,
								contentClass: null,
								mounted: mountedSpy,
								destroyed: destroyedSpy
							},
							positionString: 'right bottom'
						},
						mocks: {
							flashMessage: {
								$emit: jest.fn(),
								$once: jest.fn(),
								$on: jest.fn(),
								$_vueFlashMessage_setDimensions: jest.fn(),
								currentHeight: 0
							},
							$el: {
								offsetHeight: 200
							}
						}
					});
				});

				it('If props.messageObj.mounted is Function should invoke props.messageObj.mounted in "mounted" lifecycle hook', () => {
					expect(mountedSpy).toHaveBeenCalled();
					mountedSpy.mockClear();
				});

				it('Should invoke flashMessage.$_vueFlashMessage_setDimensions in "mounted" lifecycle hook', () => {
					expect(
						hooksCmp.vm.flashMessage.$_vueFlashMessage_setDimensions
					).toHaveBeenCalledWith({ height: 20 });
				});

				it('Should emit "destroy" event in "beforeDestroy" lifecycle hook', () => {
					hooksCmp.destroy();
					expect(hooksCmp.vm.flashMessage.$emit).toHaveBeenCalled();
					hooksCmp.vm.flashMessage.$emit.mockClear();
				});

				it('If props.messageObj.destroyed is Function should invoke props.messageObj.destroyed in "destroyed" lifecycle hook', () => {
					hooksCmp.destroy();
					expect(destroyedSpy).toHaveBeenCalled();
					destroyedSpy.mockClear();
				});

				it('If props.messageObj.destroyed is notFunction should not invoke props.messageObj.destroyed in "destroyed" lifecycle hook', () => {
					hooksCmp.setProps({
						messageObj: {
							destroyed: null
						}
					});
					hooksCmp.destroy();
					expect(destroyedSpy).not.toHaveBeenCalled();
					destroyedSpy.mockClear();
				});
			});

			describe('Message with custom position', () => {
				beforeEach(() => {
					hooksCmp = shallowMount(FlashMessage, {
						propsData: {
							messageObj: {
								id: 1,
								status: 'error',
								title: 'error title',
								message: 'error message',
								clickable: true,
								icon: 'www.icon-link.ru',
								time: 8000,
								blockClass: null,
								iconClass: null,
								contentClass: null,
								x: 20,
								y: 20,
								mounted: mountedSpy,
								destroyed: destroyedSpy
							},
							positionString: 'right bottom'
						},
						mocks: {
							flashMessage: {
								$emit: jest.fn(),
								$once: jest.fn(),
								$on: jest.fn(),
								$_vueFlashMessage_setDimensions: jest.fn(),
								currentHeight: 0
							},
							$el: {
								offsetHeight: 200
							}
						}
					});
				});

				it('Should not invoke flashMessage.$_vueFlashMessage_setDimensions in "mounted" lifecycle hook', () => {
					expect(
						hooksCmp.vm.flashMessage.$_vueFlashMessage_setDimensions
					).not.toHaveBeenCalled();
					mountedSpy.mockClear();
				});

				it('Should not emit "destroy" event in "beforeDestroy" lifecycle hook', () => {
					hooksCmp.destroy();
					expect(
						hooksCmp.vm.flashMessage.$emit
					).not.toHaveBeenCalled();
					hooksCmp.vm.flashMessage.$emit.mockClear();
				});
			});
		});

		describe('Test custom position of message', () => {
			it('When user set "x" and "y" props, message block should have inline style with position fixed and coords', done => {
				cmp.setProps({
					messageObj: {
						x: 100,
						y: 200
					}
				});
				cmp.vm.$forceUpdate();
				cmp.vm.$nextTick(() => {
					let elem = cmp.find('._vue-flash-msg-body');
					expect(elem.element.style.right).toBe('100px');
					expect(elem.element.style.bottom).toBe('200px');
					done();
				});
			});
		});

		describe('Test rendering raw html in flash message block', () => {
			const rawHtmlCmp = shallowMount(FlashMessage, {
				propsData: {
					messageObj: {
						id: 1,
						html: '<p class="raw-html"></p>',
						clickable: true,
						time: 8000
					},
					positionString: 'right bottom'
				},
				mocks: {
					flashMessage: {
						$emit: jest.fn(),
						$once: jest.fn(),
						$on: jest.fn(),
						$_vueFlashMessage_setDimensions: jest.fn(),
						currentHeight: 0
					},
					$el: {
						offsetHeight: 200
					}
				}
			});

			it('Should render proper html in message block if user pass messageObj.html property', () => {
				expect(rawHtmlCmp.contains('p.raw-html')).toBe(true);
			});
		});

		describe('Test rendering custom component in flash message block', () => {
			const customComponentCmp = shallowMount(FlashMessage, {
				propsData: {
					messageObj: {
						id: 1,
						componentName: 'TestComponent',
						clickable: true,
						time: 8000
					},
					positionString: 'right bottom'
				},
				stubs: {
					TestComponent: componentStub
				},
				mocks: {
					flashMessage: {
						$emit: jest.fn(),
						$once: jest.fn(),
						$on: jest.fn(),
						$_vueFlashMessage_setDimensions: jest.fn(),
						currentHeight: 0
					},
					$el: {
						offsetHeight: 200
					}
				}
			});

			it('Should render custom element and bind "componentName" property', () => {
				expect(
					customComponentCmp.contains('div.custom-component-stub')
				).toBe(true);
			});
		});
	});
});
