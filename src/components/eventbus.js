export function createEventBus(config) {
    return {
        data() {
            return {
                mountedCalls: 0, // This property counts calls of msgMounted. VirtualDom update causes the apply of method in which this msgMounted calls
                destroyedCalls: 0, // This property counts calls of msgDestroyed. VirtualDom update causes the apply of method in which this msgDestroyed calls
                mountedCb: [],
                destroyedCb: []
            }
        },

        computed: {
            strategy() {
                if(config.strategy === undefined || (typeof config.strategy === 'string' && config.strategy === 'single' || config.strategy === 'multiple')) {
                    return config.strategy ? config.strategy : 'single';
                }
                throw new Error('[flashMessage] argument "config.strategy" should be an string and be equal to "single" or "multiple"');
            }
        },

        methods: {
            show(data, callbacks = {}) {

                if(typeof data !== 'object' || Array.isArray(data)) {
                    throw new Error('[flashMessage] argument should be an Object');
                }

                callbacks.mounted ? this.mountedCb.push(callbacks.mounted) : false;
                callbacks.destroyed ? this.destroyedCb.push(callbacks.destroyed) : false;
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
                if(this.mountedCalls <= 1 && this.mountedCb.length > 0) {
                    this.mountedCb[0]();
                    setTimeout( () => {
                        this.mountedCalls = 0;
                        this.mountedCb = this.mountedCb.slice(1);
                    }, 0);
                }
            },

            msgDestroyed() {
                this.destroyedCalls++;
                if(this.destroyedCalls <= 1 && this.destroyedCb.length > 0) {
                    this.destroyedCb[0]();
                    setTimeout( () => {
                        this.destroyedCalls = 0;
                        this.destroyedCb = this.destroyedCb.slice(1);
                    }, 0);
                }
            }
        }
    }
}
