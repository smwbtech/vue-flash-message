import FlashMessage from './FlashMessage.vue';
import { createMixin } from './mixins.js';

export default {
    install(Vue, config = {}) {
        const defaultSettings = {
            name: 'flashMessage',
            strategy: 'bus'
        };
        config = Object.assign(defaultSettings, config);
        // Validate config type
        if(typeof config !== 'object' || Array.isArray(config)) {
            throw new Error('[vue-flash-msg]: cofig must be an Object')
        }

        const EventBus = new Vue({
            data() {
                return {
                    mountedCalls: 0, // This property counts calls of msgMounted. VirtualDom update causes the apply of method in which this msgMounted calls
                    destroyedCalls: 0, // This property counts calls of msgDestroyed. VirtualDom update causes the apply of method in which this msgDestroyed calls
                    mountedCb: null,
                    destroyedCb: null
                }
            },

            methods: {
                show(data, callbacks = {}) {
                    if(typeof data !== 'object' || Array.isArray(data)) {
                        throw new Error('[flashMessage] argument should be an Object');
                    }
                    this.mountedCb = callbacks.mounted;
                    this.destroyedCb = callbacks.destroyed;
                    this.$emit('show', data);
                },
                error(data, callbacks) {
                    this.show(Object.assign(data, {status: 'error'}), callbacks);
                },
                warning(data, callbacks) {
                    this.show(Object.assign(data, {status: 'warning'}), callbacks);
                },
                info(data, callbacks) {
                    this.show(Object.assign(data, {status: 'info'}), callbacks);
                },
                success(data, callbacks) {
                    this.show(Object.assign(data, {status: 'success'}), callbacks);
                },
                msgMounted() {
                    this.mountedCalls++;
                    if(this.mountedCalls <= 1) {
                        console.log('we are in "msgMounted()"')
                        if(this.mountedCb) this.mountedCb.call(this);
                        setTimeout( () => {
                            this.mountedCalls = 0;
                            this.mountedCb = null;
                        }, 0);
                    }
                },
                msgDestroyed() {
                    this.destroyedCalls++;
                    if(this.destroyedCalls <= 1) {
                        console.log('we are in "msgDestroyed()"')
                        if(this.destroyedCb) this.destroyedCb.call(this);
                        setTimeout( () => {
                            this.destroyedCalls = 0;
                            this.destroyedCb = null;
                        }, 0);
                    }
                }
            }
        });

        // Set up component data as mixixn
        Vue.mixin( createMixin(config) );

        //  Set up component
        Vue.component('FlashMessage', FlashMessage);

        Vue.prototype[config.name] = EventBus;

    }
};

export { FlashMessage };
