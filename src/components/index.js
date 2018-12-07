import { createEventBus } from './eventbus.js';
import Container from './extends/container.js';
import { createContainerMixin } from './mixins/container.js';
import Message from './extends/message.js';
import { createMessageMixin } from './mixins/message.js';

export default {
    install(Vue, config = {}) {

        const defaultSettings = {
            name: 'flashMessage',
            tag: 'FlashMessage',
            time: 8000,
            strategy: 'single'
        };

        config = Object.assign(defaultSettings, config);

        // Set up Event Bus
        const EventBus = new Vue( createEventBus(config) );
        // Global access to flashMessage property
        Vue.prototype[config.name] = EventBus;
        // Extend Container component
        let ContainerComponent = Container.extend( createContainerMixin(config) );
        // Extend Flash Message component
        let FlashMessage = Message.extend( createMessageMixin(config) );
        //  Set up component
        Vue.component(config.tag, ContainerComponent);
        Vue.component('VueMessageBlock', FlashMessage);
    }
};
