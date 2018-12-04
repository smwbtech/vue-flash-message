export function createEventBus(config) {
    return {
        data() {
            return {
                messages: [], // array of messages object
                nextMessageId: 1, // id of next inserted message object
                active: false // switch visibility status of message in 'single' mode
            }
        },

        computed: {
            /**
             * Return strategy
             * @return {String}     - 'single' || 'multiple'
             */
            strategy() {
                if(config.strategy === undefined || (typeof config.strategy === 'string' && config.strategy === 'single' || config.strategy === 'multiple')) {
                    return config.strategy ? config.strategy : 'single';
                }
                throw new Error('[flashMessage] argument "config.strategy" should be an string and be equal to "single" or "multiple"');
            },
            /**
             * Retuen active status in 'single' mode
             * @return {Boolean}
             */
            isActive() {
                return this.active;
            },
            /**
             * Return the first message in messages array in 'single mode'
             * @return {Object}     - message Object
             */
            message() {
                return this.messages.length > 0 ? this.messages[0] : false;
            }
        },

        methods: {
            /**
             * Push new message Object into messages array and merge properties
             * @param  {Object} data            - message object
             * @param  {Object} [callbacks={}]  - object with callback functions
             *
             */
            show(data, callbacks = {}) {

                if(typeof data !== 'object' || Array.isArray(data)) {
                    throw new Error('[flashMessage] argument should be an Object');
                }

                let message = {
                    id: this.nextMessageId++
                };
                message = Object.assign(message, data, callbacks);

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

            /**
             * Delete message from messages array
             * @param  {Number} id      - message id
             */
            deleteMessage(id) {
                if(config.strategy === 'single') {
                    this.active = false;
                    this.messages = this.messages.slice(1);
                    if(this.messages.length > 0) {
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
