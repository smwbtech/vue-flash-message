export default {
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

            this.destroyedCb ? this.destroyedCb() : this.destroyedCb = callbacks.destroyed;
            this.mountedCb = callbacks.mounted;
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
                if(this.mountedCb) this.mountedCb();
                setTimeout( () => {
                    this.mountedCalls = 0;
                    this.mountedCb = null;
                }, 0);
            }
        },

        msgDestroyed() {
            this.destroyedCalls++;
            if(this.destroyedCalls <= 1) {
                if(this.destroyedCb) this.destroyedCb();
                setTimeout( () => {
                    this.destroyedCalls = 0;
                    this.destroyedCb = null;
                }, 0);
            }
        }
    }
}
