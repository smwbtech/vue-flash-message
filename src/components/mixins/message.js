export function createMessageMixin(config) {
    //If user choosed 'bus' strategy or didn't pass any args
        return {

            props: {
                messageObj: {
                    type: Object,
                    required: true
                }
            },

            data() {
                return {
                    timeoutId: undefined, // id that will be returned by setTimeout() function
                }
            },

            computed: {

                classObj() {
                    return {
                        '_vue-flash-msg-body_success': this.messageObj.status === 'success',
                        '_vue-flash-msg-body_error': this.messageObj.status === 'error',
                        '_vue-flash-msg-body_warning': this.messageObj.status === 'warning',
                        '_vue-flash-msg-body_info': this.messageObj.status === 'info',
                        '_vue-flash-msg-body_default': this.messageObj.status === 'default',
                        '_vue-flash-msg-body_unclickabe': !this.messageObj.clickable,
                        '_vue-flash-msg-body': true,
                    }
                },

                position() {
                    if( (this.messageObj.position && typeof this.messageObj.position === 'string') && (this.messageObj.x && this.messageObj.y) && (typeof this.messageObj.x === 'number' && typeof this.messageObj.y === 'number') ) {

                        return {
                            style: {
                                position: 'fixed',
                                [this.messageObj.position.split(' ')[0]]: `${this.messageObj.x}px`,
                                [this.messageObj.position.split(' ')[1]]: `${this.messageObj.y}px`,
                            },
                            class: {
                                '_vue-flash-msg-body_flying': true
                            }
                        }
                    }
                    else return {style: '', class: ''};
                }
            },

            methods: {

                /**
                 * Custom set timeout with default time
                 * @param {Function} callback           - callback function
                 * @param {Number}   [time=this.time]   - time in mileseconds
                 * return {Number}                      - timeout id
                 */
                setTimeout(callback, time = this.messageObj.time) {
                    return setTimeout(callback, time);
                },

                /**
                 * Set up default data
                 */
                clearData(clear = true) {
                        if(this.timeoutId && clear) clearTimeout(this.timeoutId);
                        this[config.name].$emit('deleteMessage', this.messageObj.id);
                },
                /**
                 * Handle click event
                 */
                clickHandler() {
                    if(this.messageObj.clickable) this.clearData();
                }
            },

            // Set up data
            created() {
                this.timeoutId = this.setTimeout(this.clearData.bind(this, false), this.messageObj.time);
                this[config.name].$once('clearData', this.clearData);
            },

            // Invoke mounted callback function if exist
            mounted() {
                if(this.messageObj.mounted && typeof this.messageObj.mounted === 'function') {
                    this.messageObj.mounted();
                }
            },

            // Invoke destroyed callback function if exist
            destroyed() {
                if(this.messageObj.destroyed && typeof this.messageObj.destroyed === 'function') {
                    this.messageObj.destroyed();
                }
            }
        }

}
