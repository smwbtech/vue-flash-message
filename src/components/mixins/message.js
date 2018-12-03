export function createMessageMixin(config) {
    //If user choosed 'bus' strategy or didn't pass any args
        return {

            data() {
                return {
                    timeoutId: undefined, // id that will be returned by setTimeout() function
                    time: config.time, // defualt time for timeOut function
                    status: '', // message status: available 'error', 'warning', 'success', 'info'
                    title: '', //  message title
                    message: '', // message text
                    icon: config.icon, // display icon
                    clickable: true, //can be removed by click
                    style: {
                        flashMessageStyle: null,
                        iconStyle: null,
                        contentStyle: null,
                        titleStyle: null,
                        textStyle: null
                    }
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
                 * Set messamge data
                 * @param {Object} data     - message's data object
                 *                          @param {String} data.status     - message status: 'error' || 'warning' || 'success' || 'info'
                 *                          @param {String} [data.title]    - message title
                 *                          @param {String} data.Message    - message text
                 */
                setData(data) {
                    if(!this.message) {
                        this.id = data.id;
                        this.status = data.status;
                        this.title = data.title;
                        this.message = data.message;
                        this.icon = data.icon === undefined ? config.icon : data.icon;
                        this.clickable = data.icon === undefined ? true : false;
                        this.style.flashMessageStyle = data.flashMessageStyle ? data.flashMessageStyle : null;
                        this.style.iconStyle = data.iconStyle ? data.iconStyle : null;
                        this.style.contentStyle = data.contentStyle ? data.contentStyle : null;
                        this.style.titleStyle = data.titleStyle ? data.titleStyle : null;
                        this.style.textStyle = data.textStyle ? data.textStyle : null;
                        this.timeoutId = this.setTimeout(this.clearData, data.time);
                    }
                    else {
                        clearTimeout(this.timeoutId);
                        this.clearData();
                        this.setTimeout(this.setData.bind(this, data), 1000);
                    }
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
                clearData() {
                        if(this.timeoutId) clearTimeout(this.timeoutId);
                        this[config.name].$emit('deleteMessage', this.id);
                },

                clickHandler() {
                    if(this.clickable) this.clearData();
                }
            },

            created() {
                this.setData(this.getMessage);
                this[config.name].$once('clearData', this.clearData);
                console.log('created');
            },


            destroyed() {
                console.log('destroyed')
            }
        }

}
