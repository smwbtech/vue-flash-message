export function createEventBus(config) {
    return {
        data() {
            return {
                mountedCalls: 0, // This property counts calls of msgMounted. VirtualDom update causes the apply of method in which this msgMounted calls
                destroyedCalls: 0, // This property counts calls of msgDestroyed. VirtualDom update causes the apply of method in which this msgDestroyed calls
                mountedCb: [],
                destroyedCb: [],
                messages: [],
                nextMessageId: 1,
                active: false
            }
        },

        computed: {
            strategy() {
                if(config.strategy === undefined || (typeof config.strategy === 'string' && config.strategy === 'single' || config.strategy === 'multiple')) {
                    return config.strategy ? config.strategy : 'single';
                }
                throw new Error('[flashMessage] argument "config.strategy" should be an string and be equal to "single" or "multiple"');
            },

            isActive() {
                return this.active;
            },

            message() {
                return this.messages.length > 0 ? this.messages[0] : false;
            }
        },

        methods: {
            show(data, callbacks = {}) {

                if(typeof data !== 'object' || Array.isArray(data)) {
                    throw new Error('[flashMessage] argument should be an Object');
                }

                let message = {
                    id: this.nextMessageId++
                };
                message = Object.assign(message, data, callbacks);

                console.log(this.messages);
                if(this.messages.length > 0) {
                    this.messages.push(message);
                    this.$emit('clearData');
                }
                else {
                    this.active = true;
                    this.messages.push(message);
                }
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

            deleteMessage(id) {
                if(config.strategy === 'single') {
                    console.log(`delete message ${id}`);
                    this.active = false;
                    this.messages = this.messages.slice(1);
                    if(this.messages.length > 0) {
                        console.log('show must go on');
                        setTimeout( () => this.active = true, 500);
                    }
                }
            }
        },

        created() {
            this.$on('deleteMessage', this.deleteMessage);
        }
    }
}
