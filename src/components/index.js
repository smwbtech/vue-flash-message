import FlashMessage from './FlashMessage.vue';
import { createMixin } from './mixin.js';
import eventBus from './eventbus.js';

export default {
    install(Vue, config = {}) {

        const defaultSettings = {
            name: 'flashMessage',
            tag: 'FlashMesage',
            time: 8000,
            icon: true
        };

        config = Object.assign(defaultSettings, config);
        // Validate config type
        if(typeof config !== 'object' || Array.isArray(config)) {
            throw new Error('[vue-flash-msg]: cofig must be an Object')
        }

        // Set up Event Bus
        const EventBus = new Vue(eventBus);

        // Set up component data as mixixn
        Vue.mixin( createMixin(config) );

        //  Set up component
        Vue.component(config.tag, FlashMessage);

        // Global access to flashMessage property
        Vue.prototype[config.name] = EventBus;

    }
};

export { FlashMessage };
