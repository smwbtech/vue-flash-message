export function createContainerMixin(config) {
    if(!config.strategy || config.strategy === 'single') {

        return {
            computed: {
                strategy() {
                    return this.flashMessage.strategy;
                },

                showMessage() {
                    return this.flashMessage.strategy;
                }
            }
        }

    }
}
