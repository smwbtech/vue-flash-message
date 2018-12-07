export function createMessageMixin(config) {
    //If user choosed 'bus' strategy or didn't pass any args
        return {

            data() {
                return {
                    id: undefined, // message id
                    timeoutId: undefined, // id that will be returned by setTimeout() function
                    time: config.time, // defualt time for timeOut function
                    status: '', // message status: available 'error', 'warning', 'success', 'info'
                    title: '', //  message title
                    message: '', // message text
                    icon: '', // display icon
                    clickable: true, //can be removed by click
                    flashMessageStyle: null, // styles of flashMessage block
                    iconStyle: null, // styles for icons
                    contentStyle: null, // styles for content block
                    titleStyle: null, // styles for title
                    textStyle: null, // styles for text,
                    mounted: null, // mounted callback function
                    destroyed: null // destroyed hook callback function
                }
            },

            computed: {
                /**
                 * Retutn a title of the message
                 * @return {String}     - user's title or default title that is the same as status
                 */
                getTitle(){
                    return this.title ? this.title : this.status.toUpperCase() || 'HEY, LOOK AT ME';
                },

                getMessage() {
                    return this[config.name].message;
                },

                classObj() {
                    return {
                        success: this.status === 'success',
                        error: this.status === 'error',
                        warning: this.status === 'warning',
                        info: this.status === 'info',
                        unclickable: !this.clickable,
                        '_vue-flash-msg-body': true
                    }
                }
            },

            methods: {

                /**
                 * Set component data
                 * @param {Object} data     - message's data object
                 */
                setData(data) {
                    for(let prop of Object.keys(data)) {
                        switch (prop) {
                            case 'clickable':
                                this.clickable = data.clickable === undefined ? true : false;
                                break;
                            case 'time':
                                this[prop] = data[prop] ? data[prop] : config.time;
                                break;
                            default:
                                this[prop] = data[prop];
                        }
                    }
                    this.timeoutId = this.setTimeout(this.clearData.bind(this, false), data.time ? data.time : this.time);
                },

                /**
                 * Custom set timeout with default time
                 * @param {Function} callback           - callback function
                 * @param {Number}   [time=this.time]   - time in mileseconds
                 * return {Number}                      - timeout id
                 */
                setTimeout(callback, time = this.time) {
                    return setTimeout(callback, time);
                },

                /**
                 * Set up default data
                 */
                clearData(clear = true) {
                        if(this.timeoutId && clear) clearTimeout(this.timeoutId);
                        this[config.name].$emit('deleteMessage', this.id);
                },
                /**
                 * Handle click event
                 */
                clickHandler() {
                    if(this.clickable) this.clearData();
                }
            },

            // Set up data
            created() {
                this.setData(this.getMessage);
                this[config.name].$once('clearData', this.clearData);
            },

            // Invoke mounted callback function if exist
            mounted() {
                if(this.mounted && typeof this.mounted === 'function') {
                    this.mounted();
                }
            },

            // Invoke destroyed callback function if exist
            destroyed() {
                if(this.destroyed && typeof this.destroyed === 'function') {
                    this.destroyed();
                }
            }
        }

}
