import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import { createEventBus } from '@/components/eventbus.js';
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
const EventBus = Vue.extend( createEventBus(config) );
// Global access to flashMessage property
Vue.prototype[config.name] = EventBus;

let localVue = createLocalVue();
localVue.use(MyPlugin, config);

describe('Testing EventBus', () => {

    let cmp;

    beforeEach( () => {
        cmp = shallowMount(EventBus, {
            localVue
        });
    });

    describe('Testing data object of mounted EventBus', () => {

        it('EventBus has property "messages" and it empty Array', () => {
                expect(cmp.vm).toHaveProperty('messages');
                expect(Array.isArray(cmp.vm.messages)).toBe(true);
                expect(cmp.vm.messages.length).toBe(0);
        });

        it('EventBus has property "nextMessageId" and it equal to "1"', () => {
                expect(cmp.vm).toHaveProperty('nextMessageId', 1);
        });

        it('EventBus has property "active" and it equal to "false"', () => {
                expect(cmp.vm).toHaveProperty('active', false);
        });

    });

    describe('Testing emitted events', () => {


        it('"deleteMessage" event test', () => {
            cmp.vm.$emit('deleteMessage', 1123);
            expect(cmp.emitted().deleteMessage).toBeTruthy();
            expect(cmp.emitted().deleteMessage.length).toBe(1);
            expect(cmp.emitted().deleteMessage[0]).toEqual([1123]);
        });

        // TODO: Crashes with message 'Cannot read property '$options' of undefined'
        // it('Emitted "deleteMessage" event should invoke "deleteMessage" callback', async () => {
        //     let stub = jest.fn();
        //     cmp.setMethods( {deleteMessage: stub} );
        //     cmp.vm.$emit('deleteMessage', 1123);
        //     await cmp.vm.$nextTick();
        //     expect(stub).toBeCalled();
        // });

    });

    describe('Testing methods', () => {

        it('Method "show()" should add new message object into "messages" array', () => {
            cmp.vm.show({status: 'error', title: 'Error Title', message: 'Message'});
            expect(cmp.vm.messages.length).toBe(1);
            expect(cmp.vm.messages[0]).toEqual({id: 1, status: 'error', title: 'Error Title', message: 'Message'});
        });

        it('Method "deleteMessage()" should delete message object from "messages" array', () => {
            cmp.vm.show({status: 'error', title: 'Error Title', message: 'Message'});
            cmp.vm.$emit('deleteMessage', 1);
            expect(cmp.vm.messages.length).toBe(0);

        });


    });

})
