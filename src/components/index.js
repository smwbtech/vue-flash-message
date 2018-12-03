import { createMixin } from './mixins/message.js';
import Message from './extends/message.js';
import eventBus from './eventbus.js';

export default {
    install(Vue, config = {}) {

        const defaultSettings = {
            name: 'flashMessage',
            tag: 'FlashMessage',
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
        // Global access to flashMessage property
        Vue.prototype[config.name] = EventBus;

        //Extend Flash Message component
        let FlashMessage = Message.extend( createMixin(config) );

        //  Set up component
        Vue.component(config.tag, FlashMessage);


    }
};

export { FlashMessage };
