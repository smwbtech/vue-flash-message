const state = {
    title: '', //Message Title
    message: '', //Message Text
    status: '', //Status: 'error', 'success', 'notification', 'info',
    timeoutId: 0
};

const mutations = {

    //Set FlashMessage data
    show(state, payload) {
        // If there is no existing message
        if(state.message.length === 0) {
            state.header = payload.header ? payload.header : '';
            state.message = payload.message;
            state.status = payload.status;
            let tiemouteId = setTimeout( () => {
                state.header = '';
                state.message = '';
                state.status = '';
            }, 8000);
            state.timeoutId = tiemouteId;
        }
        // If some message already exists
        else {
            state.header = '';
            state.message = '';
            setTimeout( () => {
                clearTimeout(state.timeoutId);
                state.header = payload.header ? payload.header : '';
                state.message = payload.message;
                state.status = payload.status;
                let timeoutId = setTimeout( () => {
                    state.header = '';
                    state.message = '';
                    state.status = '';
                }, 8000);
                state.timeoutId = timeoutId;
            }, 1000);
        }
    },

    //Delete Message
    clear(state) {
        state.header = '';
        state.message = '';
        state.status = '';
        clearTimeout(state.timeoutId);
    }
},

export function createFlashMessageStore() {
    return store => {
        store.registerModule('flashMessage', {
            namespaced: true,
            state,
            mutations
        })
    }
}
